#!/usr/bin/env node
/**
 * STUFE 60 — Die Gaesteseite rendert, und sie haelt ihre Zusagen.
 *
 * Warum als Gate und nicht als Review-Punkt (Helfer V5, R1 "Klasse vor Fall"):
 * L14 (17.07.) forderte nach JEDEM Template-Edit im Worker einen Render-Smoke von Hand — ein
 * freier Bezeichner in einem Template-Literal ist syntaktisch gueltig, faellt in keinem Build auf
 * und macht zur Laufzeit JEDE Gaesteseite zu einem 500er. Eine Pflicht, die an Disziplin haengt,
 * ist keine Pflicht. Welle 3 (19.08.) brachte die zweite Klasse: oeffentliche Versprechen ohne
 * Deckung im Datensatz.
 *
 * Fassung 2 (Gutachten 27.08., M2/M3). Die erste Fassung hatte zwei Loecher, beide ausgefuehrt
 * belegt: (a) die Adresspruefung lief nur gegen die erste Testparty — ein Leak, der nur bei
 * fehlendem Grobort greift, blieb gruen; (b) sie kannte nur Partys MIT Datum und Adresse, ihre
 * Regeln waeren an legalen Partys ohne beides rot geworden. Deshalb jetzt: eine Sammlung von
 * Party-Formen, und jedes Geheimnis wird gegen JEDES gerenderte Dokument geprueft.
 *
 * Geprueft wird:
 *   (a) jede Party-Form rendert in jeder Ansicht mit Status 200,
 *   (b) jeder gerenderte <script>-Block parst (node --check),
 *   (c) keine Adresse steht in irgendeinem oeffentlichen Dokument — roh oder prozent-kodiert,
 *   (d) kein Versprechen ohne Deckung (Wunschliste, Treffpunkt, Datum),
 *   (e) der Spiel-URL-Vertrag je Spielfamilie (core bekommt ISO, Legacy fertigen Text).
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

// Jedes Dokument, das je gerendert wurde, landet hier — und wird am Ende gegen JEDES
// Geheimnis geprueft. Das ist der Fix fuer M2: vorher lief die Adresspruefung nur gegen
// die erste Party, jeder nur-bei-leerem-Grobort-Leak blieb unsichtbar.
const docs = {};
const SECRETS = [];
const deurl = s => s.replace(/%[0-9a-fA-F]{2}/g, m => { try { return decodeURIComponent(m); } catch { return m; } });

async function render(name, path) {
  const r = await call(path);
  const html = await r.text();
  docs[name] = html;
  ok(r.status === 200, `${name} rendert (Status 200)`);
  ok(html.length > 2000, `${name} rendert vollstaendig`);
  return html;
}
function gameParams(html) {
  const src = (html.match(/<iframe[^>]+id="gameFrame"[^>]+src="([^"]*)"/) || [])[1] || "";
  if (!src) return null;
  try { return new URL(src.replace(/&amp;/g, "&")); } catch { return null; }   // esc() macht aus & ein &amp;
}
async function create(body) {
  const r = await post("/api/create", body);
  const j = await r.json().catch(() => ({}));
  ok(r.status === 200 && j.url, "POST /api/create antwortet mit einer Party");
  const id = (j.url || "").split("/").pop();
  return { id, rec: JSON.parse(KV.get("party:" + id) || "{}") };
}

try {
  // ══ Form 1: alles gesetzt — Gaesteliste, Wunschliste, Grobort, Absender, Adresse ══
  SECRETS.push("Gartenweg");
  const P1 = await create({
    childName: "Tino", age: 7, motto: "Ritter", mottoId: "ritter", mottoEmoji: "🏰",
    date: "2026-09-12", time: "15:00", endTime: "18:00", address: "Gartenweg 12, 22301 Hamburg",
    hostName: "Familie Berger — Anna", hostPhone: "0170 1234567",
    areaHint: "Bei uns zuhause in Hamburg-Winterhude", notes: "Wir freuen uns auf euch!",
    invites: ["Mats", "Lina"], wishes: [{ title: "Ritterburg", url: "https://www.amazon.de/dp/B0TEST123", price: "30 EUR" }],
  });
  ok(P1.rec.hostName && P1.rec.hostPhone && P1.rec.areaHint, "Absender + Grobort landen im Datensatz");
  const gTok = P1.rec.invites[0].t, editToken = P1.rec.editToken;

  await render("creator", "/");
  const h1 = await render("voll_public", "/" + P1.id);
  await render("voll_token", "/" + P1.id + "?g=" + gTok);
  await render("voll_editor", "/" + P1.id + "?edit=" + editToken);
  await render("voll_preview", "/" + P1.id + "?edit=" + editToken + "&preview=1");
  ok((await call("/gibtsnicht99")).status === 404, "unbekannte Party -> 404");

  ok(h1.includes("Es lädt ein:"), "Absenderzeile steht auf der Gaesteseite");
  ok(h1.includes('href="tel:01701234567"'), "Handynummer als tel:-Link");
  ok(h1.includes("Bei uns zuhause in Hamburg-Winterhude"), "Grobort ist oeffentlich sichtbar");
  ok(/id="addrHint">[^<]+Weiterleitungen/.test(h1), "die Adress-Sperre nennt ihren Grund");
  ok(/<title>Tino wird 7!/.test(h1), "Chat-/Seitentitel ist personalisiert");
  ok(/og:description" content="[^"]*Wunschliste/.test(h1), "Wunschliste wird versprochen, wenn es eine gibt");

  // Spiel-URL, Legacy-Familie (kein gameId -> /einladung/<motto>/whatsapp/): fertiger Text
  const g1 = gameParams(h1);
  ok(!!g1, "Spiel-URL steht auf der Gaesteseite");
  ok(/whatsapp/.test(g1 ? g1.pathname : ""), "ohne gameId laeuft die Legacy-Familie");
  ok(!/^\d{4}-\d{2}-\d{2}$/.test(g1?.searchParams.get("date") || ""), "Legacy-Spiel bekommt KEIN ISO-Rohdatum");
  ok(/^[A-Za-zÄÖÜäöü]+,/.test(g1?.searchParams.get("date") || ""), "Legacy-Spiel bekommt ein lesbares Datum");
  ok((g1?.searchParams.get("ort") || "") === "Bei uns zuhause in Hamburg-Winterhude", "das Spiel bekommt den Grobort");
  // Umgekehrte Richtung, bewusst: mit ?tel= baut die Legacy-Familie einen WhatsApp-Knopf auf den
  // Sieg-Bildschirm — eine Zusage am Formular vorbei, ohne Allergie, ohne Gaesteliste.
  ok(g1?.searchParams.get("tel") === null, "keine Telefonnummer in der eingebetteten Spiel-URL");

  // ══ Form 2: core-Spiel — dieselbe Party, anderer Vertrag (Gutachten M1) ══
  const P5 = await create({
    childName: "Tom", age: 8, motto: "Ritter", mottoId: "ritter", gameId: "ritter-schatzjagd",
    date: "2026-09-12", time: "15:00", address: "Gartenweg 12, 22301 Hamburg", hostName: "Familie Tom",
  });
  const h5 = await render("core_public", "/" + P5.id);
  const g5 = gameParams(h5);
  ok(/\/spiele\/game-/.test(g5 ? g5.pathname : ""), "gameId aus dem Katalog laeuft in die core-Familie");
  // core.js formatiert ISO selbst. Ein deutscher Datumsstring wird von V8 LAX geparst
  // ("Samstag, 12. September" -> 2001-09-12, isNaN false) -> falscher Wochentag in 8 von 12 Monaten.
  ok(g5?.searchParams.get("date") === "2026-09-12", "core-Spiel bekommt das ISO-Datum (sonst falscher Wochentag)");

  // ══ Form 3: Bestandsparty ohne die neuen Felder ══
  SECRETS.push("Musterweg");
  const P2 = await create({ childName: "Mia", age: 6, motto: "Einhorn", mottoId: "einhorn",
    date: "2026-10-03", time: "14:00", address: "Musterweg 3, 20095 Hamburg" });
  const h2 = await render("bestand_public", "/" + P2.id);
  ok(!/og:description" content="[^"]*Wunschliste/.test(h2), "ohne Wunschliste kein Wunschlisten-Versprechen");
  ok(!h2.includes("Es lädt ein:"), "ohne Absender kein leerer Absender-Block");
  ok(/<title>Mia wird 6!/.test(h2), "Titel auch ohne die neuen Felder personalisiert");
  ok(/id="addrHint">So wandert sie nicht durch Weiterleitungen/.test(h2), "auch ohne Grobort nennt die Sperre ihren Grund");

  // ══ Form 4: Party ohne Datum und ohne Uhrzeit (deklariert unterstuetzt, s. calcTTL) ══
  const P4 = await create({ childName: "Nils", age: 5, motto: "Dino", mottoId: "dino", hostName: "Familie Nils" });
  const h4 = await render("ohneDatum_public", "/" + P4.id);
  const g4 = gameParams(h4);
  ok(!/(^|&)[a-z]+=(&|$)/.test(g4 ? g4.search.slice(1) : "x=1"), "keine leeren Parameter in der Spiel-URL");
  ok((g4?.searchParams.get("date") || "") === "Termin folgt", "Legacy-Spiel bekommt statt eines Demo-Datums die Wahrheit");
  ok((g4?.searchParams.get("time") || "") === "Uhrzeit folgt", "dasselbe fuer die Uhrzeit");
  ok(!h4.includes("addrRow"), "ohne Adresse keine Ortszeile");

  // ══ Form 4b: core-Spiel ohne Datum — die Kombination, in der ein leerer Parameter entsteht ══
  const P7 = await create({ childName: "Ruby", age: 9, motto: "Dino", mottoId: "dino",
    gameId: "dino-schatzjagd", hostName: "Familie Ruby" });
  const h7 = await render("coreOhneDatum_public", "/" + P7.id);
  const g7 = gameParams(h7);
  ok(!/(^|&)[a-z]+=(&|$)/.test(g7 ? g7.search.slice(1) : "x=1"), "core-Spiel ohne Datum: keine leeren Parameter");
  ok(g7?.searchParams.get("date") === null, "core-Spiel ohne Datum bekommt gar keinen date-Parameter (core blendet die Zeile aus)");

  // ══ Form 5: Gaesteliste, aber keine Adresse — hier darf NICHTS einen Treffpunkt versprechen ══
  const P3 = await create({ childName: "Jara", age: 7, motto: "Feen", mottoId: "feen",
    date: "2026-11-07", time: "15:00", hostName: "Familie Jara", invites: ["Ida"] });
  const h3 = await render("ohneAdresse_public", "/" + P3.id);
  ok(h3.includes("HAS_ADDR=false"), "ohne Adresse weiss der Client, dass es nichts zu versprechen gibt");
  ok(!h3.includes("addrRow"), "ohne Adresse und ohne Grobort keine Ortszeile");

  // ══ Form 6: Grobort ohne Adresse ══
  const P6 = await create({ childName: "Ben", age: 6, motto: "Piraten", mottoId: "piraten",
    date: "2026-12-05", time: "15:00", areaHint: "Im Stadtpark, Nordeingang", hostName: "Familie Ben" });
  const h6 = await render("grobortOhneAdresse_public", "/" + P6.id);
  ok(h6.includes("Im Stadtpark, Nordeingang"), "Grobort steht auch ohne Adresse auf der Seite");
  ok(!/id="addrHint"/.test(h6), "ohne Adresse verspricht die Ortszeile nichts nach");
  ok(h6.includes("HAS_ADDR=false"), "auch hier kennt der Client den Stand");

  // ══ Zusage: erst danach gibt es die Adresse ══
  const rsvp = await post(`/api/party/${P1.id}/rsvp`, { g: gTok, status: "ja", allergies: "Erdnuss, schwer" });
  ok(rsvp.status === 200, "Zusage wird angenommen");
  ok((await rsvp.json()).address === "Gartenweg 12, 22301 Hamburg", "Adresse kommt mit der Zusage");
  const hAfter = await render("voll_token_nachZusage", "/" + P1.id + "?g=" + gTok);
  ok(hAfter.includes('SELF_ADDR="Gartenweg 12, 22301 Hamburg"'), "Zusager sieht die Adresse geraeteunabhaengig");
  // Das eigene Dokument des Zusagers traegt die Adresse zu Recht -> aus der Geheimnis-Pruefung nehmen.
  const zusagerDoc = docs["voll_token_nachZusage"]; delete docs["voll_token_nachZusage"];
  ok(zusagerDoc.length > 2000, "Dokument des Zusagers ist gerendert");
  await render("voll_public_nachFremderZusage", "/" + P1.id);

  // ══ Telefon-Whitelist: der Wert landet in einem tel:-href ══
  const rBad = await put(`/api/party/${P1.id}`, { editToken, hostPhone: "0170 1234567 (Anna)" });
  ok(rBad.status === 400, "PUT lehnt eine unbrauchbare Nummer MIT ANSAGE ab (kein stiller Verlust)");
  ok(JSON.parse(KV.get("party:" + P1.id)).hostPhone === "0170 1234567", "die alte Nummer bleibt dabei stehen");
  await put(`/api/party/${P1.id}`, { editToken, hostPhone: "+49 170 1234567" });
  ok(JSON.parse(KV.get("party:" + P1.id)).hostPhone === "+49 170 1234567", "gueltige Telefonnummer bleibt");
  const hEd = await render("voll_editor2", "/" + P1.id + "?edit=" + editToken);
  ok(hEd.includes('id="edHostName"') && hEd.includes('id="edHostPhone"') && hEd.includes('id="edAreaHint"'), "Editor hat die drei Felder");

  // ══ (c) Kein Geheimnis in irgendeinem OEFFENTLICHEN Dokument ══
  // Zwei Dokumentarten duerfen die Adresse tragen, weil sie ein Credential verlangen: die
  // Editor-Ansicht (editToken) und die Seite eines Token-Gastes NACH eigener Zusage (oben aus
  // docs genommen). Beide werden positiv geprueft, alles andere negativ.
  ok(hEd.includes("Gartenweg 12"), "der Gastgeber sieht im Editor seine eigene Adresse");
  for (const [name, doc] of Object.entries(docs)) {
    if (/editor/.test(name)) continue;
    for (const secret of SECRETS) {
      ok(!doc.includes(secret) && !deurl(doc).includes(secret), `${name}: keine Adresse im Dokument (${secret})`);
    }
  }

  // ══ (b) jeder gerenderte Script-Block parst (L14) ══
  let n = 0, scripts = 0;
  for (const [name, doc] of Object.entries({ ...docs, zusager: zusagerDoc })) {
    for (const m of doc.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (/\bsrc=/.test(m[1]) || /ld\+json/.test(m[1])) continue;
      const f = join(TMP, `s_${n++}.js`);
      scripts++;
      writeFileSync(f, m[2]);
      try { execFileSync(process.execPath, ["--check", f]); }
      catch (e) { ok(false, `${name}: gerenderter Script-Block parst nicht — ${String(e.stderr || e).split("\n")[1] || ""}`); }
    }
  }
  ok(scripts >= 15, "Script-Bloecke wurden ueberhaupt gefunden");

  const seiten = Object.keys(docs).length + 1;
  if (fails.length) {
    console.log(`Stufe 60: ${fails.length} FAIL — ${seiten} Dokumente, ${scripts} Script-Bloecke, ${checks} Pruefungen`);
    fails.forEach(f => console.log("   ✗ " + f));
    process.exitCode = 1;
  } else {
    console.log(`Stufe 60: 0 FAIL — ${seiten} Dokumente aus 6 Party-Formen gerendert, ${scripts} Script-Bloecke geparst, ${checks} Pruefungen`);
  }
} catch (e) {
  console.log("Stufe 60: 1 FAIL — Render-Smoke geworfen: " + (e && e.stack ? e.stack.split("\n").slice(0, 3).join(" | ") : String(e)));
  process.exitCode = 1;
} finally {
  try { rmSync(TMP, { recursive: true, force: true }); } catch (e) { /* Temp-Reste sind kein Gate-Grund */ }
}
