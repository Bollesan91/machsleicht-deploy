#!/usr/bin/env node
/**
 * STUFE 60 — Die Gaesteseite rendert, und sie haelt ihre Zusagen.
 *
 * Warum als Gate und nicht als Review-Punkt (Helfer V5, R1 "Klasse vor Fall"):
 * L14 (17.07.) forderte nach JEDEM Template-Edit im Worker einen Render-Smoke von Hand — ein
 * freier Bezeichner in einem Template-Literal ist syntaktisch gueltig, faellt in keinem Build auf
 * und macht zur Laufzeit JEDE Gaesteseite zu einem 500er. Eine Pflicht, die an Disziplin haengt,
 * ist keine Pflicht. Dieselbe Runde brachte die zweite Klasse: oeffentliche Versprechen ohne
 * Deckung im Datensatz (Wunschliste ohne Wunschliste, Rohdatum neben formatiertem Datum,
 * Adress-Versprechen an Gaeste, die die Adresse nie bekommen).
 *
 * Diese Stufe rendert deshalb ALLE Seitenvarianten gegen einen KV-Mock und prueft
 *   (a) Status 200 + Marker,
 *   (b) dass jeder gerenderte <script>-Block wirklich parst,
 *   (c) dass die Adresse NIE im oeffentlichen HTML steht (Adress-Gating),
 *   (d) dass kein Versprechen ohne Deckung gerendert wird.
 * Laeuft ohne wrangler (Miniflare crasht auf Windows sporadisch, s. L14).
 */
import { readFileSync, writeFileSync, rmSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const TMP = mkdtempSync(join(tmpdir(), "ml-render-"));

// Der Worker ist ESM, package.json traegt kein "type":"module" -> als .mjs-Kopie importieren.
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

try {
  // ── Party mit allen Feldern (Liste + Wunschliste + Grobort + Absender) ────
  const c1 = await post("/api/create", {
    childName: "Tino", age: 7, motto: "Ritter", mottoId: "ritter", mottoEmoji: "🏰",
    date: "2026-09-12", time: "15:00", endTime: "18:00", address: "Gartenweg 12, 22301 Hamburg",
    hostName: "Familie Berger — Anna", hostPhone: "0170 1234567",
    areaHint: "Bei uns zuhause in Hamburg-Winterhude", notes: "Wir freuen uns auf euch!",
    invites: ["Mats", "Lina"], wishes: [{ title: "Ritterburg", url: "https://www.amazon.de/dp/B0TEST123", price: "30 EUR" }],
  });
  ok(c1.status === 200, "POST /api/create antwortet 200");
  const id = ((await c1.json()).url || "").split("/").pop();
  const rec = JSON.parse(KV.get("party:" + id));
  const editToken = rec.editToken, gTok = rec.invites[0].t;
  ok(rec.hostName && rec.hostPhone && rec.areaHint, "Absender + Grobort landen im Datensatz");

  // ── (a) alle Seitenvarianten rendern ─────────────────────────────────────
  const pages = {
    creator: "/", gast: "/" + id, gastToken: "/" + id + "?g=" + gTok,
    editor: "/" + id + "?edit=" + editToken, preview: "/" + id + "?edit=" + editToken + "&preview=1",
  };
  const html = {};
  for (const [k, p] of Object.entries(pages)) {
    const r = await call(p);
    html[k] = await r.text();
    ok(r.status === 200, `${k} rendert (Status 200)`);
    ok(html[k].length > 2000, `${k} rendert vollstaendig`);
  }
  ok((await call("/gibtsnicht99")).status === 404, "unbekannte Party -> 404");

  // ── (c) Adress-Gating: die Strasse steht NIE im oeffentlichen HTML ───────
  // Gegenprobe 27.08. hat hier zwei Loecher gezeigt: ein Leak in der Spiel-URL steht dort
  // PROZENT-kodiert ("Gartenweg%2012") und die Parameter sind mit &amp; getrennt — ein
  // Test auf den Klartext bzw. auf /[?&]ort=/ lief beidesmal ins Leere. Deshalb: einmal
  // prozent-dekodiert suchen und die Spiel-URL echt als URL auswerten.
  const deurl = s => s.replace(/%[0-9a-fA-F]{2}/g, m => { try { return decodeURIComponent(m); } catch { return m; } });
  ok(!deurl(html.gast).includes("Gartenweg"), "keine Adresse im oeffentlichen Gast-HTML");
  ok(!deurl(html.gastToken).includes("Gartenweg"), "keine Adresse im Token-HTML vor der Zusage");

  const iframeSrc = (html.gast.match(/<iframe[^>]+id="gameFrame"[^>]+src="([^"]*)"/) || [])[1] || "";
  ok(iframeSrc !== "", "Spiel-URL steht auf der Gaesteseite");
  // Nicht werfen, wenn die Seite kaputt ist: dann steht der eigentliche Grund schon als
  // Status-FAIL oben, und ein "Invalid URL"-Stacktrace wuerde ihn nur verdecken.
  let gp = new URLSearchParams();
  if (iframeSrc) {
    try { gp = new URL(iframeSrc.replace(/&amp;/g, "&")).searchParams; }   // esc() macht aus & ein &amp;
    catch { ok(false, "Spiel-URL ist keine gueltige URL"); }
  }
  ok(!(gp.get("ort") || "").includes("Gartenweg"), "keine Adresse in der Spiel-URL");

  // ── (d) Versprechen nur mit Deckung ──────────────────────────────────────
  ok(!/^\d{4}-\d{2}-\d{2}$/.test(gp.get("date") || ""), "kein Rohdatum in der Spiel-URL");
  ok(/^[A-Za-zÄÖÜäöü]+,/.test(gp.get("date") || ""), "das Spiel bekommt ein lesbares Datum");
  ok((gp.get("ort") || "") === "Bei uns zuhause in Hamburg-Winterhude", "das Spiel bekommt den Grobort");
  // Umgekehrte Richtung, bewusst: mit ?tel= baut die Legacy-Spielfamilie einen WhatsApp-Knopf
  // auf den Sieg-Bildschirm — eine Zusage am Formular vorbei, ohne Allergie, ohne Gaesteliste.
  ok(gp.get("tel") === null, "keine Telefonnummer in der eingebetteten Spiel-URL");
  ok(!/(^|&)[a-z]+=(&|$)/.test(iframeSrc.replace(/&amp;/g, "&").split("?")[1] || "x=1"),
     "keine leeren Parameter in der Spiel-URL");
  ok(/og:description" content="[^"]*Wunschliste/.test(html.gast), "Wunschliste wird versprochen, wenn es eine gibt");
  ok(/id="addrHint">[^<]+/.test(html.gast), "die Adress-Sperre nennt ihren Grund");
  ok(html.gast.includes("Es lädt ein:"), "Absenderzeile steht auf der Gaesteseite");

  // Party ohne die optionalen Felder: keine leeren Versprechen
  const c2 = await post("/api/create", { childName: "Mia", age: 6, motto: "Einhorn", mottoId: "einhorn",
    date: "2026-10-03", time: "14:00", address: "Musterweg 3, 20095 Hamburg" });
  const id2 = (await c2.json()).url.split("/").pop();
  const h2 = await (await call("/" + id2)).text();
  html.bestand = h2;
  ok(!/og:description" content="[^"]*Wunschliste/.test(h2), "ohne Wunschliste kein Wunschlisten-Versprechen");
  ok(!h2.includes("Es lädt ein:"), "ohne Absender kein leerer Absender-Block");
  ok(!h2.includes("ort=&tel="), "keine leeren Anzeige-Parameter an das Spiel");
  ok(/<title>Mia wird 6!/.test(h2), "Chat-/Seitentitel ist personalisiert");

  // ── Zusage: erst danach gibt es die Adresse ──────────────────────────────
  const rsvp = await post(`/api/party/${id}/rsvp`, { g: gTok, status: "ja", allergies: "Erdnuss, schwer" });
  ok(rsvp.status === 200, "Zusage wird angenommen");
  ok((await rsvp.json()).address === "Gartenweg 12, 22301 Hamburg", "Adresse kommt mit der Zusage");
  const hAfter = await (await call("/" + id + "?g=" + gTok)).text();
  html.nachZusage = hAfter;
  ok(hAfter.includes('SELF_ADDR="Gartenweg 12, 22301 Hamburg"'), "Zusager sieht die Adresse geraeteunabhaengig");
  ok(!(await (await call("/" + id)).text()).includes("Gartenweg 12"), "fremdes Public-HTML bleibt ohne Adresse");

  // ── Telefon-Whitelist (der Wert landet in einer URL) ─────────────────────
  await put(`/api/party/${id}`, { editToken, hostPhone: "javascript:alert(1)" });
  ok(JSON.parse(KV.get("party:" + id)).hostPhone === "", "unplausible Telefonnummer wird verworfen");
  await put(`/api/party/${id}`, { editToken, hostPhone: "+49 170 1234567" });
  ok(JSON.parse(KV.get("party:" + id)).hostPhone === "+49 170 1234567", "gueltige Telefonnummer bleibt");

  // ── (b) jeder gerenderte Script-Block parst (L14) ────────────────────────
  let n = 0, scripts = 0;
  for (const [k, doc] of Object.entries(html)) {
    for (const m of doc.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (/\bsrc=/.test(m[1]) || /ld\+json/.test(m[1])) continue;
      const f = join(TMP, `s_${k}_${n++}.js`);
      scripts++;
      writeFileSync(f, m[2]);
      try { execFileSync(process.execPath, ["--check", f]); }
      catch (e) { ok(false, `${k}: gerenderter Script-Block parst nicht — ${String(e.stderr || e).split("\n")[1] || ""}`); }
    }
  }
  ok(scripts >= 10, "Script-Bloecke wurden ueberhaupt gefunden");

  const seiten = Object.keys(html).length;
  if (fails.length) {
    console.log(`Stufe 60: ${fails.length} FAIL — ${seiten} Seitenvarianten, ${scripts} Script-Bloecke, ${checks} Pruefungen`);
    fails.forEach(f => console.log("   ✗ " + f));
    process.exitCode = 1;
  } else {
    console.log(`Stufe 60: 0 FAIL — ${seiten} Seitenvarianten gerendert, ${scripts} Script-Bloecke geparst, ${checks} Pruefungen`);
  }
} catch (e) {
  console.log("Stufe 60: 1 FAIL — Render-Smoke geworfen: " + (e && e.stack ? e.stack.split("\n").slice(0, 3).join(" | ") : String(e)));
  process.exitCode = 1;
} finally {
  try { rmSync(TMP, { recursive: true, force: true }); } catch (e) { /* Temp-Reste sind kein Gate-Grund */ }
}
