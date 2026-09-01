// =====================================================================
// gen-ablauf.mjs — der Beispiel-Ablauf einer Motto-Seite wird ABGELEITET,
// nicht getippt.
//
// WARUM DIESE DATEI EXISTIERT (01.09.2026):
// Acht unabhaengige Gutachten zu vier handgeschriebenen Ablauf-Kaesten, acht Mal NO-GO
// (54/46/42/58, dann 64/54/54/54). Kein einziger Befund lautete "schlecht geschrieben" —
// alle waren Widersprueche zwischen dem getippten Kasten und dem, was dieselbe Seite oder
// dieselben Daten an anderer Stelle sagen. Der teuerste: der Kasten machte drei Stempel zur
// BEDINGUNG fuer den Ritterschlag, waehrend data/motto/ritter-mittel.json seit jeher das
// Gegenteil festhaelt — "Wer nur zuschauen will, bekommt trotzdem alle Stempel".
//
// Die Ursache war nicht Unachtsamkeit, sondern die Methode. Der Zeitplan EXISTIERT bereits:
// 45 Dateien unter data/motto/ mit Spielen, Dauern, Mindestalter, Material und
// Sicherheitsregel — und buildTimeline() in paket/core/paket-core.js rechnet daraus seit dem
// 31.07. den Zeitplan des Planers. Etwas zu tippen, was sich ableiten laesst, ist genau das,
// was Helfer V5 Regel 4 verbietet ("Gedrucktes leitet sich ab").
//
// Diese Datei ruft deshalb DIESELBE Funktion auf, die der Planer benutzt. Der Ablauf auf der
// Seite kann dem Planer danach nicht mehr widersprechen, weil er dieselbe Rechnung IST.
// Nebenwirkung, die keine ist: der Planer bringt in drei Stunden nur drei der fuenf Spiele
// unter und legt zwei in die Reserve. Alle vier handgeschriebenen Kaesten hatten fuenf
// hineingequetscht — und genau darueber sind die Gutachten gestolpert.
//
// Der Repo-Stand von paket-core.js wird NIE beschrieben: die Setter-Zeile, die den Zustand
// von aussen setzbar macht, lebt nur in der geladenen Zeichenkette (gleiche Disziplin wie die
// Gegenprobe zu Stufe 60).
//
// Aufruf:
//   node _dev/scripts/gen-ablauf.mjs <motto>            zeigt den erzeugten Block
//   node _dev/scripts/gen-ablauf.mjs <motto> --write    schreibt ihn in die Seite (idempotent)
//   node _dev/scripts/gen-ablauf.mjs --alle --write     alle Motto-Seiten, die Daten haben
// =====================================================================
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import vm from "node:vm";

const ALTER = [
  { datei: "klein",  label: "3&ndash;5 Jahre",  filter: "3–5"  },
  { datei: "mittel", label: "6&ndash;8 Jahre",  filter: "6–8"  },
  { datei: "gross",  label: "9&ndash;12 Jahre", filter: "9–12" },
];

// ---------- paket-core.js kopflos laden ----------
function ladeCore() {
  let src = readFileSync("paket/core/paket-core.js", "utf8");
  const anker = "  parseDur, buildTimeline\n};";
  if (!src.includes(anker)) throw new Error("paket-core.js: Export-Anker nicht gefunden — hat sich die Datei geaendert?");
  src = src.replace(anker, "  parseDur, buildTimeline,\n  __setState:(p,d,v)=>{PARTY=p;DATA=d;VARIANT=v;}\n};");

  const el = new Proxy({}, { get: (_t, k) =>
    k === "querySelectorAll" ? () => [] :
    k === "querySelector" ? () => null :
    k === "addEventListener" || k === "forEach" ? () => {} :
    k === "classList" ? { add(){}, remove(){}, toggle(){}, contains(){ return false; } } :
    k === "dataset" || k === "style" ? {} : undefined });
  const sandbox = {
    window: { PAKET_CFG: { timeline: {} }, location: { href: "https://machsleicht.de/", search: "" },
              addEventListener: () => {}, localStorage: { getItem: () => null, setItem: () => {} } },
    document: { querySelector: () => null, querySelectorAll: () => [], getElementById: () => null,
                createElement: () => el, addEventListener: () => {}, body: el, documentElement: el },
    console, navigator: { userAgent: "node" }, setTimeout, clearTimeout,
    fetch: async () => { throw new Error("kein Netz beim Erzeugen"); },
  };
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox.window;
  vm.runInNewContext(src + "\n;globalThis.__PC = PaketCore;", sandbox, { timeout: 15000 });
  return sandbox.__PC;
}

const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const hm = s => { const m = /(\d+):(\d+)/.exec(s || ""); return m ? +m[1] * 60 + +m[2] : null; };
const rel = min => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;

// ---------- ein Ablauf je Altersgruppe ----------
function ablaufFuer(PC, motto, alter) {
  const pfad = `data/motto/${motto}-${alter.datei}.json`;
  if (!existsSync(pfad)) return null;
  const DATA = JSON.parse(readFileSync(pfad, "utf8"));
  const v = (DATA.variants || []).find(x => x.id === "standard") || (DATA.variants || [])[0] || {};
  const tw = String(v.timeWindow || "");
  const zeiten = tw.match(/(\d+):(\d+)/g) || [];
  if (zeiten.length < 2) return { fehler: `${pfad}: timeWindow "${tw}" nennt keine zwei Uhrzeiten` };

  const PARTY = { childName: DATA.childName || "das Geburtstagskind", age: (DATA.ageRange || [])[0] || null,
                  time: zeiten[0], endTime: zeiten[1], date: "", guests: [],
                  ambition: "standard", motto };
  PC.__setState(PARTY, DATA, "standard");
  const { rows, reserve } = PC.buildTimeline();
  if (!rows || !rows.length) return { fehler: `${pfad}: buildTimeline liefert keine Zeilen` };

  // Absolute Uhrzeiten in Dauern umrechnen: die Seite beschreibt keine konkrete Party.
  const start = hm(rows[0].t);
  const bloecke = rows.map((r, i) => {
    const von = hm(r.t) - start;
    const bis = i + 1 < rows.length ? hm(rows[i + 1].t) - start : von;
    return { von, bis, titel: r.tit, sub: r.sub };
  }).filter(b => b.bis > b.von);

  const gesamt = hm(rows[rows.length - 1].t) - start;
  const kinder = (tw.match(/(\d+(?:[–-]\d+)?)\s*Kinder/) || [])[1] || null;
  return { alter, bloecke, gesamt, kinder,
           reserve: (reserve || []).map(g => g && g.name).filter(Boolean),
           ritual: DATA.signatureRitual || {} };
}

function karte(a) {
  const li = a.bloecke.map(b =>
    `          <li><strong>${rel(b.von)}&ndash;${rel(b.bis)}</strong> ${esc(b.titel)}</li>`).join("\n");
  const std = (a.gesamt / 60).toFixed(1).replace(".", ",").replace(",0", "");
  const res = a.reserve.length
    ? `\n          <p style="font-size:12px;color:var(--m);margin:10px 0 0">In Reserve, falls Zeit bleibt: ${esc(a.reserve.join(", "))}.</p>`
    : "";
  // Jede Altersgruppe hat ihr EIGENES Ritual — es in den gemeinsamen Vorspann zu heben waere
  // derselbe Fehler, der die handgeschriebenen Fassungen gekostet hat: eine Aussage, die fuer
  // eine Gruppe stimmt und fuer die anderen zwei nicht.
  const rit = a.ritual && a.ritual.name
    ? `\n          <p style="font-size:12px;color:var(--m);margin:6px 0 0">Roter Faden: ${esc(a.ritual.name)}.</p>`
    : "";
  return `        <div class="u-card">
          <div class="u-card-label">${a.alter.label}</div>
          <p style="font-size:13px;color:var(--m);margin:0 0 8px"><strong>${std} Stunden</strong>${a.kinder ? `, ausgelegt auf ${esc(a.kinder)} Kinder` : ""}</p>
          <ul style="font-size:14px;color:var(--d);padding-left:20px;margin-bottom:0">
${li}
          </ul>${rit}${res}
        </div>`;
}

function abschnitt(motto, ablaeufe) {
  // Die Opt-out-Zusage steht in den Daten jeder Altersgruppe. Sie wird nur uebernommen, wenn
  // ALLE vorhandenen Gruppen sie tragen — sonst gilt sie nicht fuer jeden Leser dieses Kastens.
  const outs = ablaeufe.map(a => (a.ritual && a.ritual.optOutNote) || "");
  const optOut = outs.every(Boolean) && new Set(outs).size === 1 ? outs[0] : "";
  return `  <section class="u-mt32">
    <h2>Beispiel-Ablauf</h2>
    <p>Die Zeiten sind Dauern ab dem Eintreffen des ersten Kindes, keine Uhrzeiten &mdash; gerechnet hat sie derselbe Zeitplaner, der dir im Planer den fertigen Ablauf f&uuml;r deine Kinderzahl erstellt.</p>
    <div class="u-grid-cards">
${ablaeufe.map(karte).join("\n")}
    </div>
${optOut ? `    <p style="font-size:13px;color:var(--m)">${esc(optOut)}</p>\n` : ""}  </section>

`;
}

// ---------- in die Seite schreiben ----------
function schreibe(motto, block) {
  const pfad = `kindergeburtstag/${motto}.html`;
  let s = readFileSync(pfad, "utf8");
  const alt = /  <section class="u-mt32">\s*<h2>Beispiel-Ablauf[\s\S]*?<\/section>\n\n/;
  if (alt.test(s)) s = s.replace(alt, block);
  else {
    // Der Ablauf steht vor der FAQ. Die Seiten kapseln sie unterschiedlich, deshalb wird nicht
    // auf eine feste Zeichenkette gematcht, sondern die umschliessende <section> gesucht.
    const faq = s.search(/<h2>H&auml;ufige Fragen/);
    if (faq < 0) throw new Error(`${pfad}: keine FAQ-Ueberschrift als Einfuegepunkt gefunden`);
    const sek = s.lastIndexOf("<section", faq);
    if (sek < 0) throw new Error(`${pfad}: FAQ liegt in keiner <section>`);
    const zeile = s.lastIndexOf("\n", sek) + 1;      // Einrueckung der Section mitnehmen
    s = s.slice(0, zeile) + block + s.slice(zeile);
  }
  writeFileSync(pfad, s, "utf8");
}

// ---------- Hauptlauf ----------
const args = process.argv.slice(2);
const write = args.includes("--write");
const alle = args.includes("--alle");
const pruefe = args.includes("--pruefe");
const mottos = args.filter(a => !a.startsWith("--"));

const PC = ladeCore();
const liste = (alle || (pruefe && !mottos.length))
  ? [...new Set((await import("node:fs")).readdirSync("data/motto")
      .filter(f => f.endsWith(".json"))
      .map(f => f.replace(/-(klein|mittel|gross)\.json$/, "")))]
      .filter(m => existsSync(`kindergeburtstag/${m}.html`))
  : mottos;

let fehler = 0;
// --pruefe: Idempotenz-Beweis (Helfer V5, Regel 2). Der Kasten auf der Seite MUSS das sein, was
// die Daten heute ergeben. Weicht er ab, hat entweder jemand von Hand hineingeschrieben oder
// die Daten haben sich geaendert, ohne dass neu erzeugt wurde. Beides ist ein Fehler, und diese
// eine Pruefung ersetzt jede Regel darueber, was in so einem Kasten stehen darf.
if (pruefe) {
  let geprueft = 0;
  for (const motto of liste) {
    const pfad = `kindergeburtstag/${motto}.html`;
    if (!existsSync(pfad)) continue;
    const s = readFileSync(pfad, "utf8");
    const m = /  <section class="u-mt32">\s*<h2>Beispiel-Ablauf[\s\S]*?<\/section>\n\n/.exec(s);
    if (!m) continue;
    geprueft++;
    const ablaeufe = [];
    for (const alter of ALTER) {
      const a = ablaufFuer(PC, motto, alter);
      if (a && !a.fehler) ablaeufe.push(a);
    }
    if (!ablaeufe.length) { console.log(`  FAIL ${motto}: hat einen Ablauf, aber keine verwertbaren Daten`); fehler++; continue; }
    if (abschnitt(motto, ablaeufe) !== m[0]) {
      console.log(`  FAIL ${motto}: der Ablauf auf der Seite ist nicht das, was die Daten ergeben `
                + `— von Hand geaendert oder nach einer Datenaenderung nicht neu erzeugt`);
      fehler++;
    }
  }
  console.log(fehler
    ? `\n  ${fehler} FAIL — "node _dev/scripts/gen-ablauf.mjs --alle --write" erzeugt sie neu.`
    : `  0 FAIL — alle ${geprueft} Ablauf-Kaesten sind reproduzierbar aus data/motto/.`);
  process.exit(fehler ? 1 : 0);
}

for (const motto of liste) {
  const ablaeufe = [];
  for (const alter of ALTER) {
    const a = ablaufFuer(PC, motto, alter);
    if (!a) continue;
    if (a.fehler) { console.log(`  FEHLER ${a.fehler}`); fehler++; continue; }
    ablaeufe.push(a);
  }
  if (!ablaeufe.length) { console.log(`  ${motto}: keine verwertbaren Daten`); fehler++; continue; }
  const block = abschnitt(motto, ablaeufe);
  if (write) { schreibe(motto, block); console.log(`  geschrieben: ${motto} (${ablaeufe.length} Altersgruppen)`); }
  else {
    console.log(`\n=== ${motto} ===`);
    for (const a of ablaeufe) {
      console.log(`  ${a.alter.filter.padEnd(5)} ${a.gesamt} Min, ${a.bloecke.length} Bloecke` +
                  (a.reserve.length ? `, Reserve: ${a.reserve.length}` : ""));
      for (const b of a.bloecke) console.log(`      ${rel(b.von)}-${rel(b.bis)}  ${b.titel}`);
    }
  }
}
process.exit(fehler ? 1 : 0);
