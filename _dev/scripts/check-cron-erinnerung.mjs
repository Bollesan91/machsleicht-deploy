#!/usr/bin/env node
/**
 * check-cron-erinnerung.mjs — Positivkontrolle fuer den scheduled-Handler in party-worker.js (Erinnerung 7 Tage vorher),
 * ohne Deploy und ohne Netz. Muster wie check-partyseite-render.mjs: Worker als byte-identische Kopie importieren,
 * KV und fetch als Attrappen, Exit 1 bei Abweichung.
 *
 * Szenario A (sechs Partys, ein Lauf): Treffer per Index (P1), Treffer im Altbestand ohne Metadata (P2), Nicht-Treffer
 *   per Index -> darf NICHT gelesen werden (P3), Treffer mit reminded7 -> gelesen, keine Mail (P4), Treffer ohne E-Mail
 *   (P5), Altbestand ohne Treffer -> gelesen und mit Metadata zurueckgeschrieben, Inhalt byte-gleich (P6).
 * Szenario B (205 Altbestand ohne Treffer, drei Laeufe): Deckel MAX_READS greift (200 gelesen, 200 nachgezogen,
 *   gecappt) -> naechster Lauf liest nur den Rest (5) -> danach nichts mehr. Das ist der Beweis, dass "der Rest im
 *   naechsten Lauf" stimmt (Befund Pruefstand 07.09.: vorher blieb Altbestand hinter dem Deckel fuer immer ungeprueft).
 *
 * Aufruf: node _dev/scripts/check-cron-erinnerung.mjs        (Umgebung: MACHSLEICHT_WORKER=<pfad> fuer eine andere Datei)
 */
import { readFileSync, writeFileSync, rmSync, mkdtempSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const WORKER_SRC = process.env.MACHSLEICHT_WORKER || join(ROOT, "party-worker.js");
const tmp = mkdtempSync(join(tmpdir(), "ml-cron-"));
const workerCopy = join(tmp, "party-worker-pruefling.mjs");
const quelle = readFileSync(WORKER_SRC);
writeFileSync(workerCopy, quelle);
if (!readFileSync(workerCopy).equals(quelle)) { console.error("ASSERT: Kopie nicht byte-identisch"); process.exit(2); }

let exitCode = 0;
try {
  const w = (await import(pathToFileURL(workerCopy).href)).default;
  if (typeof w.scheduled !== "function") { console.error("✗ kein scheduled-Export im Worker"); process.exit(1); }

  const tag = n => new Date(Date.now() + n * 86400000).toLocaleDateString("en-CA", { timeZone: "Europe/Berlin" });
  const ziel = tag(7), bald = tag(3);
  const mk = (childName, date, extra = {}) => JSON.stringify({ childName, motto: "Piraten", date, time: "14:00",
    guests: [{ name: "Lina", status: "ja" }, { name: "Tom", status: "nein" }], editToken: "tok_" + childName, ...extra });

  function umgebung(eintraege) {
    const store = new Map(eintraege);
    const gets = [], puts = [], mails = [];
    const env = {
      RESEND_API_KEY: "test-key", RESEND_FROM: "test <t@machsleicht.de>",
      PARTY: {
        async list({ prefix }) { return { keys: [...store.entries()].filter(([k]) => k.startsWith(prefix)).map(([name, v]) => ({ name, metadata: v.metadata })), list_complete: true }; },
        async get(k) { gets.push(k); const v = store.get(k); return v ? v.value : null; },
        async put(k, val, opts) { puts.push({ k, val, opts }); store.set(k, { value: val, metadata: opts && opts.metadata }); },
        async delete() {},
      },
    };
    globalThis.fetch = async (url, init) => { mails.push(JSON.parse(init.body)); return { ok: true, status: 200, async text() { return ""; } }; };
    return { store, gets, puts, mails, env };
  }
  async function lauf(u) {
    u.gets.length = 0; u.puts.length = 0; u.mails.length = 0;
    const logs = []; const orig = console.log; console.log = (...x) => { logs.push(x.join(" ")); };
    try { await w.scheduled({ cron: "0 8 * * *", scheduledTime: Date.now() }, u.env, { waitUntil() {}, passThroughOnException() {} }); }
    finally { console.log = orig; }
    return logs.find(l => l.startsWith("reminder7:")) || "";
  }
  const fail = []; let n = 0;
  const erwarte = (ok, text) => { n++; if (!ok) fail.push(text); };

  // ---- Szenario A ----
  const A = umgebung([
    ["party:p1", { value: mk("Mia", ziel, { email: "p1@test.de" }), metadata: { date: ziel } }],
    ["party:p2", { value: mk("Ben", ziel, { email: "p2@test.de" }), metadata: undefined }],
    ["party:p3", { value: mk("Lars", bald, { email: "p3@test.de" }), metadata: { date: bald } }],
    ["party:p4", { value: mk("Emma", ziel, { email: "p4@test.de", reminded7: "2026-09-06T08:00:00Z" }), metadata: { date: ziel } }],
    ["party:p5", { value: mk("Noah", ziel, {}), metadata: { date: ziel } }],
    ["party:p6", { value: mk("Lea", bald, { email: "p6@test.de" }), metadata: undefined }],
  ]);
  const p6vorher = A.store.get("party:p6").value;
  const logA = await lauf(A);
  const gemailt = A.mails.map(m => m.to[0]).sort();
  erwarte(JSON.stringify(gemailt) === JSON.stringify(["p1@test.de", "p2@test.de"]), `A: gemailt an ${JSON.stringify(gemailt)}, erwartet p1+p2`);
  erwarte(!A.gets.includes("party:p3"), "A: P3 wurde gelesen — der Index hat NICHT gegriffen");
  erwarte(A.gets.includes("party:p2"), "A: P2 (Altbestand) wurde NICHT gelesen");
  erwarte(A.gets.includes("party:p4"), "A: P4 nicht gelesen (Flag verhindert nur die Mail)");
  erwarte(!!JSON.parse(A.store.get("party:p1").value).reminded7, "A: P1 reminded7 nicht gesetzt");
  erwarte(A.store.get("party:p1").metadata && A.store.get("party:p1").metadata.date === ziel, "A: P1 metadata.date nach dem Put verloren");
  erwarte(A.store.get("party:p2").metadata && A.store.get("party:p2").metadata.date === ziel, "A: P2 Altbestand hat nach dem Put KEINE metadata");
  erwarte(A.store.get("party:p6").metadata && A.store.get("party:p6").metadata.date === bald, "A: P6 (Altbestand ohne Treffer) NICHT nachgezogen");
  erwarte(A.store.get("party:p6").value === p6vorher, "A: P6 Inhalt beim Nachziehen veraendert (soll raw sein)");
  erwarte(A.puts.filter(p => p.k === "party:p2").length === 1, "A: P2 doppelt geschrieben (Nachziehen + Treffer)");
  erwarte(A.puts.map(p => p.k).sort().join() === "party:p1,party:p2,party:p6", `A: puts = ${A.puts.map(p => p.k).join()}`);
  const m1 = A.mails.find(m => m.to[0] === "p1@test.de");
  erwarte(!!m1 && /Mia's Piraten-Party/.test(m1.subject), `A: Betreff P1: "${m1 && m1.subject}"`);   // poss(): Name's — Bolle-Konvention
  erwarte(!!m1 && /1<\/strong> Kind zugesagt/.test(m1.html), "A: Gaestezahl falsch");
  erwarte(!!m1 && /edit=tok_Mia/.test(m1.html), "A: Edit-Link fehlt");
  erwarte(A.puts.every(p => p.opts && typeof p.opts.expirationTtl === "number" && p.opts.expirationTtl > 0), "A: Put ohne positive TTL");
  erwarte(/uebersprungen=1 gelesen=5 nachgezogen=1 gesendet=2 fehler=0 gecappt=false/.test(logA), `A: Log "${logA}"`);

  // ---- Szenario B ----
  const B = umgebung(Array.from({ length: 205 }, (_, i) => [`party:alt${String(i).padStart(3, "0")}`, { value: mk("Kind" + i, bald, { email: `alt${i}@test.de` }), metadata: undefined }]));
  const log1 = await lauf(B);
  erwarte(B.gets.length === 200, `B1: ${B.gets.length} Reads statt 200`);
  erwarte(B.puts.length === 200 && B.mails.length === 0, `B1: ${B.puts.length} Puts, ${B.mails.length} Mails`);
  erwarte(/gelesen=200 nachgezogen=200 gesendet=0 fehler=0 gecappt=true/.test(log1), `B1: Log "${log1}"`);
  const log2 = await lauf(B);
  erwarte(B.gets.length === 5, `B2: ${B.gets.length} Reads statt 5 — nachgezogene Keys kosten wieder Reads`);
  erwarte(/per-index-uebersprungen=200 gelesen=5 nachgezogen=5 gesendet=0 fehler=0 gecappt=false/.test(log2), `B2: Log "${log2}"`);
  const log3 = await lauf(B);
  erwarte(B.gets.length === 0 && B.puts.length === 0, `B3: ${B.gets.length} Reads, ${B.puts.length} Puts — Altbestand nicht leer`);
  erwarte(/per-index-uebersprungen=205 gelesen=0 nachgezogen=0/.test(log3), `B3: Log "${log3}"`);

  if (fail.length) { console.log("✗ Cron-Erinnerung: " + fail.length + " von " + n + " Erwartungen verletzt"); fail.forEach(f => console.log("   - " + f)); exitCode = 1; }
  else console.log(`✓ Cron-Erinnerung: ${n}/${n} Erwartungen erfuellt (A: ${logA.replace("reminder7: ", "")} | B: 200/200/gecappt -> 5/5 -> 0)`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
process.exit(exitCode);
