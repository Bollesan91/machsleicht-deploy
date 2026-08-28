#!/usr/bin/env node
/**
 * STUFE 60 — Die Gaesteseite rendert, und sie haelt ihre Zusagen.
 *
 * Warum als Gate und nicht als Review-Punkt (Helfer V5, R1 "Klasse vor Fall"):
 * L14 (17.07.) forderte nach jedem Template-Edit im Worker einen Render-Smoke von Hand — ein
 * freier Bezeichner in einem Template-Literal ist syntaktisch gueltig, faellt in keinem Build auf
 * und macht zur Laufzeit JEDE Gaesteseite zu einem 500er. Eine Pflicht, die an Disziplin haengt,
 * ist keine Pflicht. Welle 3 (19.08.) brachte die zweite Klasse: oeffentliche Versprechen ohne
 * Deckung im Datensatz.
 *
 * FASSUNG 4 (nach dem vierten Gutachten, 27.08.). Die drei Vorfassungen sind alle an derselben
 * Sache gescheitert: sie pruefte BENANNTE Faelle statt INVARIANTEN. Jedes Mal hat ein Gutachter
 * einen Defekt gebaut, der eine Achse daneben lag — mal die API, mal eine Party-Form, mal ein
 * Zustand nach einer Zusage, mal ein Dokument, das die Regel nicht abfragte. Deshalb jetzt:
 *
 *   1. Jede Party-Form wird als Datensatz MIT ERWARTUNG angelegt (hat sie ein Datum? eine
 *      Wunschliste? eine Adresse? eine Gaesteliste? ist sie voll?).
 *   2. Jede Ansicht jeder Form landet in einer Sammlung — Seiten, Editor-Seiten UND API-Antworten,
 *      auch noch einmal NACH jeder Zusage.
 *   3. Die Regeln laufen anschliessend ueber ALLE gesammelten Dokumente. Wer eine neue Ansicht
 *      oder Form ergaenzt, bekommt alle Regeln automatisch mit.
 *
 * Geprueft wird je Dokument:
 *   (a) rendert es ueberhaupt (Status 200, Mindestlaenge),
 *   (b) parst jeder gerenderte <script>-Block (node --check),
 *   (c) steht dort eine Adresse, die dieser Leser nicht haben darf — roh oder prozent-kodiert,
 *   (d) verspricht es etwas, das der Datensatz nicht deckt: Wunschliste, Treffpunkt, Loeschfrist.
 * Laeuft ohne wrangler (Miniflare crasht auf Windows sporadisch, s. L14).
 */
import { readFileSync, writeFileSync, rmSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const TMP = mkdtempSync(join(tmpdir(), "ml-render-"));

// MACHSLEICHT_WORKER zeigt auf eine ANDERE Worker-Datei — dafuer gibt es genau einen Grund:
// die Gegenprobe (check-partyseite-render-gegenprobe.py) baut Defekte in eine Kopie ein und
// prueft, ob diese Stufe rot wird. Der Repo-Stand wird dabei nie angefasst.
const WORKER_SRC = process.env.MACHSLEICHT_WORKER || join(ROOT, "party-worker.js");
const workerCopy = join(TMP, "worker.mjs");
writeFileSync(workerCopy, readFileSync(WORKER_SRC));
const worker = (await import(pathToFileURL(workerCopy).href)).default;

const KV = new Map();
const env = {
  PARTY: {
    async get(k, opts) { const v = KV.get(k); if (v === undefined) return null;
      if (opts && opts.type === "arrayBuffer") return new TextEncoder().encode(v).buffer; return v; },
    async put(k, v) { KV.set(k, v); },
    async delete(k) { KV.delete(k); },
  },
  AMAZON_TAG: "machsleicht21-21",
};

const fails = [];
let checks = 0;
function ok(cond, label) { checks++; if (!cond) fails.push(label); }

const call = (p, init) => worker.fetch(new Request("https://party.machsleicht.de" + p, init), env);
const post = (p, body) => call(p, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const put = (p, body) => call(p, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

const deurl = s => s.replace(/%[0-9a-fA-F]{2}/g, m => { try { return decodeURIComponent(m); } catch { return m; } });
const HONEST_ORT = "Den Ort verrät dir die Gastgeber-Familie";
const MAX_GUESTS = 30;   // Spiegel von party-worker.js:33 — die Stufe prueft die Kapazitaetsgrenze mit

// Jedes gerenderte Dokument mit seiner Erwartung. `form` traegt die Wahrheit ueber die Party,
// `kind` die Frage "wer schaut hier?" — public | token | preview | editor | api | apiToken.
const docs = [];

function reachable(form, kind) {
  if (!form.address) return false;
  if (kind === "token" || kind === "apiToken") return true;          // Token-Gast: Kapazitaet gilt fuer ihn nicht
  // Die Vorschau ist die Sicht des GASTGEBERS auf die Gaesteseite: dort darf stehen, was seine
  // Token-Kinder bekommen. Unzulaessig ist nur die Zusage an jemanden, der sie nie bekommt.
  if (kind === "preview") return form.hasInvites || !form.voll;
  return !form.hasInvites && !form.voll;                             // Walk-in: nur ohne Liste und mit Platz
}

// Runde 5 (MAJOR 2): die Stufe kannte nur await r.text(). Ein Adress-Leak im Set-Cookie ging
// gruen durch — ausgefuehrt belegt. Header sind Teil des ausgelieferten Dokuments, also gehoeren
// sie in dieselbe Pruefung. Und (MINOR 7) der Zusage-Zustand wird beim Push EINGEFROREN, sonst
// gelten Dokumente rueckwirkend als berechtigt, die vor der Zusage entstanden sind.
const kopfzeilen = r => [...r.headers].map(([k, v]) => k + ": " + v).join(" | ");

async function render(form, kind, path, label) {
  const r = await call(path);
  const body = await r.text();
  ok(r.status === 200, `${label}: rendert (Status 200)`);
  ok(body.length > 2000, `${label}: rendert vollstaendig`);
  docs.push({ form, kind, label, body, kopf: kopfzeilen(r), zusage: !!form.zusage, html: true });
  return body;
}
async function api(form, kind, path, label, init) {
  const r = await call(path, init);
  const body = await r.text();
  docs.push({ form, kind, label, body, kopf: kopfzeilen(r), zusage: !!form.zusage, html: false });
  return { status: r.status, body };
}

async function makeParty(name, body, erwartung) {
  const r = await post("/api/create", body);
  const j = await r.json().catch(() => ({}));
  ok(r.status === 200 && j.url, `${name}: /api/create antwortet mit einer Party`);
  const id = (j.url || "").split("/").pop();
  const rec = JSON.parse(KV.get("party:" + id) || "{}");
  const form = {
    name, id, rec, secret: erwartung.secret || null,
    hasDate: !!body.date, hasWishes: !!(body.wishes && body.wishes.length),
    address: body.address || "", hasInvites: !!(body.invites && body.invites.length),
    voll: false, ...erwartung,
  };
  return form;
}

// Alle Ansichten einer Form auf einen Schlag — wer eine Form ergaenzt, bekommt sie automatisch.
async function alleAnsichten(form, suffix = "") {
  const t = form.rec.invites && form.rec.invites[0] ? form.rec.invites[0].t : null;
  await render(form, "public", "/" + form.id, `${form.name}${suffix} public`);
  if (t) await render(form, "token", `/${form.id}?g=${t}`, `${form.name}${suffix} token`);
  await render(form, "preview", `/${form.id}?edit=${form.rec.editToken}&preview=1`, `${form.name}${suffix} preview`);
  await render(form, "editor", `/${form.id}?edit=${form.rec.editToken}`, `${form.name}${suffix} editor`);
  await api(form, "api", "/api/party/" + form.id, `${form.name}${suffix} publicGET`);
  await api(form, "api", `/api/party/${form.id}?edit=falsch`, `${form.name}${suffix} publicGET mit falschem Token`);
  // Runde 6 (M3): Es gibt Gast-Routen, deren ganze Ausgabe ein HEADER ist — der /go/-Redirect
  // zur Wunschliste ist die wichtigste. Sie stand in keiner Sammlung, also lief die
  // Header-Lesung aus Runde 5 dort ins Leere. Bilder und Kurzlinke gehoeren aus demselben
  // Grund dazu: jede Route, die ein Gast aufrufen kann, ist ein Dokument.
  const w0 = (form.rec.wishes && form.rec.wishes[0]) ? form.rec.wishes[0].id : null;
  if (w0) await api(form, "api", `/go/${form.id}/${w0}`, `${form.name}${suffix} go-Redirect`);
  await api(form, "api", `/api/ogimg/${form.id}`, `${form.name}${suffix} ogimg`);
  await api(form, "api", `/api/invimg/${form.id}`, `${form.name}${suffix} invimg`);
  return t;
}

try {
  // ══ Die Party-Formen ══════════════════════════════════════════════════════
  const F = [];
  F.push(await makeParty("voll_ausgestattet", {
    childName: "Tino", age: 7, motto: "Ritter", mottoId: "ritter", mottoEmoji: "🏰",
    date: "2026-09-12", time: "15:00", endTime: "18:00", address: "Gartenweg 12, 22301 Hamburg",
    hostName: "Familie Berger — Anna", hostPhone: "0170 1234567",
    areaHint: "Bei uns zuhause in Hamburg-Winterhude", notes: "Wir freuen uns auf euch!",
    invites: ["Mats", "Lina"], wishes: [{ title: "Ritterburg", url: "https://www.amazon.de/dp/B0TEST123", price: "30 EUR" }],
  }, { secret: "Gartenweg" }));

  F.push(await makeParty("liste_ohne_grobort", {
    childName: "Nia", age: 7, motto: "Feen", mottoId: "feen", date: "2026-09-19", time: "15:00",
    address: "Lindenallee 4, 22301 Hamburg", hostName: "Familie Nia", invites: ["Ida", "Rosa"],
  }, { secret: "Lindenallee" }));

  F.push(await makeParty("bestand_ohne_neue_felder", {
    childName: "Mia", age: 6, motto: "Einhorn", mottoId: "einhorn",
    date: "2026-10-03", time: "14:00", address: "Musterweg 3, 20095 Hamburg",
  }, { secret: "Musterweg" }));

  F.push(await makeParty("core_spiel", {
    childName: "Tom", age: 8, motto: "Ritter", mottoId: "ritter", gameId: "ritter-schatzjagd",
    date: "2026-09-12", time: "15:00", address: "Kirchsteig 9, 22301 Hamburg", hostName: "Familie Tom",
  }, { secret: "Kirchsteig" }));

  F.push(await makeParty("ohne_datum", {
    childName: "Nils", age: 5, motto: "Dino", mottoId: "dino", hostName: "Familie Nils",
  }, {}));

  F.push(await makeParty("core_ohne_datum", {
    childName: "Ruby", age: 9, motto: "Dino", mottoId: "dino", gameId: "dino-schatzjagd", hostName: "Familie Ruby",
  }, {}));

  F.push(await makeParty("liste_ohne_adresse", {
    childName: "Jara", age: 7, motto: "Feen", mottoId: "feen", date: "2026-11-07", time: "15:00",
    hostName: "Familie Jara", invites: ["Ida"],
  }, {}));

  F.push(await makeParty("grobort_ohne_adresse", {
    childName: "Ben", age: 6, motto: "Piraten", mottoId: "piraten", date: "2026-12-05", time: "15:00",
    areaHint: "Im Stadtpark, Nordeingang", hostName: "Familie Ben",
  }, {}));

  // Die volle Party — die Form, an der zwei Gutachter-Defekte hingen (Kapazitaetsgrenze).
  const vollForm = await makeParty("volle_party", {
    childName: "Emil", age: 8, motto: "Weltraum", mottoId: "weltraum", date: "2026-09-26", time: "15:00",
    address: "Sternweg 7, 22301 Hamburg", hostName: "Familie Emil",
  }, { secret: "Sternweg" });
  for (let i = 0; i < MAX_GUESTS; i++) {
    await post(`/api/party/${vollForm.id}/rsvp`, { name: "Gast" + i, status: "ja" });
  }
  const _voll31 = await post(`/api/party/${vollForm.id}/rsvp`, { name: "Zuspaet", status: "ja" });
  ok(_voll31.status === 400, "volle_party: der 31. Walk-in wird abgewiesen");
  vollForm.voll = true;
  vollForm.rec = JSON.parse(KV.get("party:" + vollForm.id));
  F.push(vollForm);

  // Runde 6 (M2): dreissig ABSAGEN sind keine volle Party. Vorher zaehlte die Kappe jeden
  // Eintrag, die Seite behauptete "voll", waehrend ein Kind kam — und wies echte Gaeste ab.
  const absagenForm = await makeParty("dreissig_absagen", {
    childName: "Pia", age: 7, motto: "Einhorn", mottoId: "einhorn", date: "2026-10-17", time: "15:00",
    address: "Absageweg 1, 22301 Hamburg", hostName: "Familie Pia",
  }, { secret: "Absageweg" });
  for (let i = 0; i < MAX_GUESTS; i++) {
    await post(`/api/party/${absagenForm.id}/rsvp`, { name: "Absager" + i, status: "nein" });
  }
  absagenForm.rec = JSON.parse(KV.get("party:" + absagenForm.id));
  const nachAbsagen = await post(`/api/party/${absagenForm.id}/rsvp`, { name: "Echtes Kind", status: "ja" });
  ok(nachAbsagen.status === 200, "dreissig Absagen sperren die Party nicht");
  absagenForm.rec = JSON.parse(KV.get("party:" + absagenForm.id));
  F.push(absagenForm);

  for (const form of F) await alleAnsichten(form);
  ok(!docs.find(d => d.label === "dreissig_absagen public").body.includes("steliste ist voll"),
     "eine Party mit dreissig Absagen behauptet nicht, voll zu sein");
  ok((await call("/gibtsnicht99")).status === 404, "unbekannte Party -> 404");
  const creatorDoc = await call("/");
  const creatorHtml = await creatorDoc.text();
  ok(creatorDoc.status === 200 && creatorHtml.length > 2000, "creator rendert");
  docs.push({ form: null, kind: "creator", label: "creator", body: creatorHtml, html: true });

  // ══ Zustandswechsel: nach JEDER Zusage wird alles erneut geholt ═══════════
  // (Der vierte Gutachter hat genau hier zugeschlagen: die API wurde nur direkt nach dem
  //  Anlegen geprueft, also immer mit leerer Gaesteliste.)
  const f0 = F[0], tok0 = f0.rec.invites[0].t;
  const rsvp = await post(`/api/party/${f0.id}/rsvp`, { g: tok0, status: "ja", allergies: "Erdnuss, schwer" });
  ok(rsvp.status === 200, "Zusage wird angenommen");
  const rsvpData = await rsvp.json();
  ok(rsvpData.address === "Gartenweg 12, 22301 Hamburg", "Adresse kommt mit der Zusage");
  f0.zusage = true;   // ab jetzt darf SEIN Token-Dokument die Adresse tragen
  await alleAnsichten(f0, " nachZusage");
  const hTok = await render(f0, "token", `/${f0.id}?g=${tok0}`, "voll_ausgestattet token nachZusage(2)");
  ok(hTok.includes('SELF_ADDR="Gartenweg 12, 22301 Hamburg"'), "Zusager sieht die Adresse geraeteunabhaengig");

  const walkIn = await api(F[1], "api", `/api/party/${F[1].id}/rsvp`, "liste_ohne_grobort rsvpWalkIn",
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Fremdkind", status: "ja" }) });
  ok(walkIn.status === 200 && !/Lindenallee/.test(walkIn.body), "Walk-in an einer Listen-Party bekommt die Adresse nicht");
  F[1].rec = JSON.parse(KV.get("party:" + F[1].id));
  await alleAnsichten(F[1], " nachWalkIn");

  // ══ Vertrag der Spiel-URL je Familie ═════════════════════════════════════
  const gp = doc => { const s = (doc.body.match(/<iframe[^>]+id="gameFrame"[^>]+src="([^"]*)"/) || [])[1] || "";
    try { return s ? new URL(s.replace(/&amp;/g, "&")) : null; } catch { return null; } };
  const d = name => docs.find(x => x.label === name);
  const gLegacy = gp(d("voll_ausgestattet public"));
  ok(/whatsapp/.test(gLegacy?.pathname || ""), "ohne gameId laeuft die Legacy-Familie");
  ok(/^[A-Za-zÄÖÜäöü]+,/.test(gLegacy?.searchParams.get("date") || ""), "Legacy-Spiel bekommt ein lesbares Datum");
  ok((gLegacy?.searchParams.get("ort") || "") === "Bei uns zuhause in Hamburg-Winterhude", "das Spiel bekommt den Grobort");
  ok(gLegacy?.searchParams.get("tel") === null, "keine Telefonnummer in der eingebetteten Spiel-URL");
  const gCore = gp(d("core_spiel public"));
  ok(/\/spiele\/game-/.test(gCore?.pathname || ""), "gameId aus dem Katalog laeuft in die core-Familie");
  // core.js formatiert ISO selbst; ein deutscher Datumstext wird von V8 lax geparst
  // ("Samstag, 12. September" -> 2001-09-12, isNaN false) -> falscher Wochentag in 8 von 12 Monaten.
  ok(gCore?.searchParams.get("date") === "2026-09-12", "core-Spiel bekommt das ISO-Datum (sonst falscher Wochentag)");
  const gOhneDatum = gp(d("ohne_datum public"));
  ok((gOhneDatum?.searchParams.get("date") || "") === "Termin folgt", "Legacy-Spiel bekommt statt eines Demo-Datums die Wahrheit");
  ok((gOhneDatum?.searchParams.get("time") || "") === "Uhrzeit folgt", "dasselbe fuer die Uhrzeit");
  ok(gp(d("core_ohne_datum public"))?.searchParams.get("date") === null, "core-Spiel ohne Datum bekommt gar keinen date-Parameter");

  // ══ Telefon-Whitelist (der Wert landet in einem tel:-href) ═══════════════
  const rBad = await put(`/api/party/${f0.id}`, { editToken: f0.rec.editToken, hostPhone: "0170 1234567 (Anna)" });
  ok(rBad.status === 400, "PUT lehnt eine unbrauchbare Nummer MIT ANSAGE ab (kein stiller Verlust)");
  ok(JSON.parse(KV.get("party:" + f0.id)).hostPhone === "0170 1234567", "die alte Nummer bleibt dabei stehen");
  const rLeer = await put(`/api/party/${f0.id}`, { editToken: f0.rec.editToken, childName: "  " });
  ok(rLeer.status === 400, "PUT lehnt einen leeren Vornamen ab (sonst Demo-Name im Legacy-Spiel)");
  const cLeer = await post("/api/create", { childName: "  ", motto: "Dino", mottoId: "dino", date: "2026-09-12", time: "15:00" });
  const cLeerId = (await cLeer.json()).url.split("/").pop();
  ok(JSON.parse(KV.get("party:" + cLeerId)).childName === "Geburtstagskind", "Create ersetzt einen leeren Vornamen");

  // ══ INVARIANTEN ueber ALLE gesammelten Dokumente ═════════════════════════
  const alleSecrets = F.map(f => f.secret).filter(Boolean);
  for (const doc of docs) {
    const { form, kind, label, body } = doc;
    const roh = body + " | " + (doc.kopf || ""), dek = deurl(roh);
    if (!form) continue;   // der Creator zeigt ein leeres Formular, keine Party

    // (c) Adressen: der Editor darf seine eigene sehen, sonst niemand — und FREMDE Adressen nie.
    for (const s of alleSecrets) {
      const eigene = s === form.secret;
      const darf = eigene && (kind === "editor" || (kind === "token" && doc.zusage));
      if (darf) continue;
      ok(!roh.includes(s) && !dek.includes(s), `${label}: keine Adresse "${s}" im Dokument`);
    }
    if (!doc.html) continue;

    // (d) Versprechen nur mit Deckung
    if (!form.hasWishes && kind !== "editor")
      ok(!roh.includes("Wunschliste"), `${label}: ohne Wunschliste wird keine versprochen`);
    const frist14 = roh.includes("14 Tage nach der Party"), frist30 = roh.includes("30 Tage nach der letzten");
    if (form.hasDate) ok(frist14 && !frist30, `${label}: Party MIT Datum nennt die 14-Tage-Frist`);
    else ok(frist30 && !frist14, `${label}: Party OHNE Datum nennt die 30-Tage-Frist`);

    if (kind === "editor") continue;   // ab hier: was ein Gast liest

    // Die Treffpunkt-Zusage der Quittung steht in einem <script>-Block und wird erst nach dem
    // Absenden sichtbar — sie muss deshalb strukturell an HAS_ADDR haengen. node --check beweist
    // nur, dass der Block PARST; ohne diese Zeile faellt die Wache beim naechsten Edit lautlos raus.
    if (roh.includes(String.raw`" \u{1F4CD} Den genauen Treffpunkt`))
      ok(roh.includes(String.raw`&&HAS_ADDR?" \u{1F4CD} Den genauen Treffpunkt`),
         `${label}: die Treffpunkt-Zusage der Quittung haengt an HAS_ADDR`);

    // Runde 5 (MAJOR 3): vorher stand hier eine Allowlist aus vier Saetzen — jede Umformulierung
    // derselben Zusage war unsichtbar. Jetzt sucht die Regel das MUSTER "Ort + Zusage in einem
    // Satz", egal wie es formuliert ist.
    // Gesucht wird, was ein Elternteil LIEST. Skript-Bloecke und HTML-Kommentare fliegen raus —
    // sie tragen Code-Kommentare ueber genau dieses Thema ("Adresse erst nach Zusage sichtbar")
    // und wuerden die Regel unbrauchbar machen. Die Zusagen IM Skript deckt die HAS_ADDR-Wache
    // oben strukturell ab.
    //
    // Runde 6 (M4/M6): Die Vorfassung schnitt an JEDEM Tag — ein <strong> mitten im Satz machte
    // das Versprechen unsichtbar. Und der Verneinungs-Filter sah den ganzen Satz an, also reichte
    // ein angehaengtes "vorher nicht", um durchzukommen. Jetzt: Tags raus, Fliesstext, und Ort und
    // Zusage muessen nah beieinander stehen; die Verneinung zaehlt nur ZWISCHEN den beiden.
    // "Ort" braucht Wortgrenzen, sonst trifft es viewport, Antwort und geantwortet.
    const sichtbar = roh.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ");
    const text = sichtbar.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const MUSTER = /(Adresse|Treffpunkt|\bOrt\b)([^.!?]{0,120}?)(zusagst|zusagt|Zusage)|(zusagst|zusagt|Zusage)([^.!?]{0,120}?)(Adresse|Treffpunkt|\bOrt\b)/gi;
    const verspricht = [];
    for (const m of text.matchAll(MUSTER)) {
      const zwischen = m[2] || m[5] || "";
      if (/\b(nicht|nie|kein|keine|keinen)\b/i.test(zwischen)) continue;      // "bekommst du NICHT die Adresse"
      if (/(von der Gastgeber-Familie|durch Weiterleitungen|verrät dir)/i.test(m[0])) continue;
      verspricht.push(m[0].slice(0, 100));
    }
    if (!reachable(form, kind)) {
      ok(verspricht.length === 0, `${label}: verspricht keine Adresse, die dieser Leser nie bekommt (${verspricht[0] || ""})`);
      const o = gp(doc)?.searchParams.get("ort");
      ok(!form.areaHintText ? (o === HONEST_ORT || o === form.rec.areaHint || (o === null && !form.address)) : true,
         `${label}: auch das Spiel verspricht keinen Ort, den es nicht gibt (ort=${o})`);
    }
  }

  // ══ (b) jeder gerenderte Script-Block parst (L14) ════════════════════════
  // Gleiche Ansichten liefern denselben Block — jeden nur EINMAL an node --check geben.
  // Ohne die Entdopplung startet die Stufe rund 90 Prozesse, und die Gegenprobe faehrt sie
  // neunzehnmal hintereinander.
  let n = 0, scripts = 0;
  const gesehen = new Set();
  for (const doc of docs) {
    if (!doc.html) continue;
    for (const m of doc.body.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (/\bsrc=/.test(m[1]) || /ld\+json/.test(m[1])) continue;
      scripts++;
      const key = m[2].length + ":" + m[2].slice(0, 200) + m[2].slice(-200);
      if (gesehen.has(key)) continue;
      gesehen.add(key);
      const f = join(TMP, `s_${n++}.js`);
      writeFileSync(f, m[2]);
      try { execFileSync(process.execPath, ["--check", f]); }
      catch (e) { ok(false, `${doc.label}: gerenderter Script-Block parst nicht — ${String(e.stderr || e).split("\n")[1] || ""}`); }
    }
  }
  ok(scripts >= 20, "Script-Bloecke wurden ueberhaupt gefunden");

  if (fails.length) {
    console.log(`Stufe 60: ${fails.length} FAIL — ${docs.length} Dokumente aus ${F.length} Party-Formen, ${scripts} Script-Bloecke, ${checks} Pruefungen`);
    fails.forEach(f => console.log("   ✗ " + f));
    process.exitCode = 1;
  } else {
    console.log(`Stufe 60: 0 FAIL — ${docs.length} Dokumente aus ${F.length} Party-Formen gerendert, ${scripts} Script-Bloecke geparst, ${checks} Pruefungen`);
  }
} catch (e) {
  console.log("Stufe 60: 1 FAIL — Render-Smoke geworfen: " + (e && e.stack ? e.stack.split("\n").slice(0, 3).join(" | ") : String(e)));
  process.exitCode = 1;
} finally {
  try { rmSync(TMP, { recursive: true, force: true }); } catch (e) { /* Temp-Reste sind kein Gate-Grund */ }
}
