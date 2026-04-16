const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
  TabStopType, TabStopPosition, ExternalHyperlink
} = require("docx");

// ── Colors ──
const C = {
  orange: "E8873D",
  dark: "2D2319",
  mid: "6B5D52",
  green: "2E7D32",
  red: "C62828",
  blue: "1565C0",
  greenBg: "E8F5E9",
  redBg: "FFEBEE",
  blueBg: "E3F2FD",
  orangeBg: "FFF3E0",
  grayBg: "F5F5F5",
  headerBg: "2D2319",
  white: "FFFFFF",
  lightBorder: "EDE6DE",
};

// ── Helpers ──
const border = { style: BorderStyle.SINGLE, size: 1, color: C.lightBorder };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };
const W = 9026; // A4 content width

function headerCell(text, width) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: { fill: C.headerBg, type: ShadingType.CLEAR },
    margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: C.white, font: "Arial", size: 20 })] })],
  });
}

function cell(text, width, opts = {}) {
  const children = [];
  if (opts.emoji) children.push(new TextRun({ text: opts.emoji + " ", font: "Arial", size: 20 }));
  children.push(new TextRun({ text, font: "Arial", size: 20, bold: !!opts.bold, color: opts.color || C.dark }));
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    children: [new Paragraph({ children })],
  });
}

function statusCell(status, width) {
  const map = {
    "LIVE": { fill: C.greenBg, color: C.green },
    "NEU": { fill: C.greenBg, color: C.green },
    "OFFEN": { fill: C.redBg, color: C.red },
    "NEXT": { fill: C.orangeBg, color: C.orange },
    "SEO": { fill: C.blueBg, color: C.blue },
  };
  const s = map[status] || map["LIVE"];
  return cell(status, width, { bold: true, fill: s.fill, color: s.color });
}

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ heading: level, children: [new TextRun({ text, font: "Arial" })] });
}

function text(t, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after || 120 },
    children: [new TextRun({ text: t, font: "Arial", size: 22, color: opts.color || C.dark, bold: !!opts.bold, italics: !!opts.italics })],
  });
}

function spacer() {
  return new Paragraph({ spacing: { after: 80 }, children: [] });
}

// ── Table builder ──
function buildTable(headers, rows, colWidths) {
  const tableWidth = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: tableWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({ children: headers.map((h, i) => headerCell(h, colWidths[i])) }),
      ...rows.map(r => new TableRow({
        children: r.map((c, i) => {
          if (typeof c === "object" && c._status) return statusCell(c._status, colWidths[i]);
          if (typeof c === "object" && c._cell) return c._cell;
          return cell(String(c), colWidths[i], c && typeof c === "object" ? c : {});
        }),
      })),
    ],
  });
}

// ============================================================
// DOCUMENT
// ============================================================
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: C.dark },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: C.orange },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: C.dark },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "machsleicht", font: "Arial", size: 18, bold: true, color: C.dark }),
            new TextRun({ text: " Status Report", font: "Arial", size: 18, color: C.mid }),
            new TextRun({ text: "\t21. Marz 2026", font: "Arial", size: 18, color: C.mid }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.orange, space: 4 } },
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Seite ", font: "Arial", size: 16, color: C.mid }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: C.mid }),
          ],
        })],
      }),
    },
    children: [
      // ── TITLE ──
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({ text: "mach's", font: "Arial", size: 48, bold: true, color: C.dark }),
          new TextRun({ text: "leicht", font: "Arial", size: 48, bold: true, color: C.orange }),
        ],
      }),
      text("Status Report v3 \u2014 Stand: 21. Marz 2026", { bold: true, color: C.mid }),
      text("Kindergeburtstag-Planer \u2014 machsleicht.de", { color: C.mid, italics: true }),
      spacer(),

      // ── ZUSAMMENFASSUNG ──
      heading("Zusammenfassung", HeadingLevel.HEADING_1),
      text("machsleicht.de ist ein kostenloser Kindergeburtstag-Planer (React 18 SPA). Der Nutzer wahlt Alter, Motto und Gastezahl \u2014 in 10 Minuten steht der komplette Plan: Zeitplan, Spiele, Einkaufsliste, Kosten pro Kind."),
      text("Phase 1 (Conversion + SEO Foundation) ist abgeschlossen. Phase 2 (SEO Gamechanger) ist ebenfalls abgeschlossen \u2014 20 neue statische SEO-Seiten, erweiterte Schemas und ein vollstandig verlinktes Content-Netzwerk.", { bold: true }),
      spacer(),

      // ── WAS STEHT ──
      heading("Was steht (LIVE)", HeadingLevel.HEADING_1),
      heading("Kern-Features", HeadingLevel.HEADING_2),
      buildTable(
        ["Feature", "Details", "Status"],
        [
          ["14 Mottos", "6 klassische + 8 Lizenz-Mottos (Paw Patrol, Pokemon, Minecraft, Frozen, Super Mario, Spider-Man, Harry Potter, Ninjago)", {_status:"LIVE"}],
          ["72 Spiele", "3 Spiele x 3 Altersgruppen x 14 Mottos + 9 Calm-Mode Alternativen (= 135 total)", {_status:"LIVE"}],
          ["Altersgruppen", "3\u20135 Jahre, 6\u20138 Jahre, 9\u201312 Jahre \u2014 mit eigenen Spielen, Deko und Kuchen", {_status:"LIVE"}],
          ["Zeitplan-Generator", "2h / 3h / 4h Modi mit Uhrzeiten, Foto-Momenten und Pausen", {_status:"LIVE"}],
          ["Einkaufsliste", "Deko + Mitgebsel mit Preisen, Kaufen/Leihen/DIY Markierung", {_status:"LIVE"}],
          ["Snack-Rechner", "Mengen pro Kind automatisch berechnet (Kuchen, Obst, Saft)", {_status:"LIVE"}],
          ["Kosten pro Kind", "Sofort sichtbar, aktualisiert sich bei Anderungen", {_status:"LIVE"}],
          ["Ruhemodus", "Tauscht Action-Spiele gegen ruhige Alternativen (Ausmalen, Ratsel, Memory)", {_status:"LIVE"}],
          ["Kuchen-Fallback", "Fertigkuchen, Backmischung oder Donut-Turm als Alternative", {_status:"LIVE"}],
          ["Hab-ich-schon Toggle", "Checkbox pro Item, rechnet Preis und Liste neu", {_status:"LIVE"}],
          ["Share-Funktion", "Plan als Text teilen (WhatsApp, Clipboard)", {_status:"LIVE"}],
          ["Schatzsuche", "Eigene Seite: 6 Themen, 90 Stationen, interaktive Schatzkarte", {_status:"LIVE"}],
        ],
        [3200, 4826, 1000]
      ),
      spacer(),

      heading("Phase 1: Conversion + SEO Foundation", HeadingLevel.HEADING_2),
      buildTable(
        ["Feature", "Details", "Status"],
        [
          ["Social Proof", "4.700+ Geburtstage geplant, 162 Spiele, Testimonial", {_status:"NEU"}],
          ["State Persistence", "localStorage speichert alle Eingaben (Alter, Motto, Gaste etc.)", {_status:"NEU"}],
          ["Peak-Moment View", "Emotionaler Ubergangs-Screen zwischen Konfig und Plan (2.8s)", {_status:"NEU"}],
          ["Amazon Affiliate Links", "42 Links auf Deko/Mitgebsel (tag=machsleicht-21)", {_status:"NEU"}],
          ["Email-Capture", "Erinnerung nachstes Jahr? Widget nach Plan-Erstellung", {_status:"NEU"}],
          ["Helfer-Nachricht", "Tipp nach Share-Button fur Nachricht an Helfer", {_status:"NEU"}],
          ["Mobile Touch Targets", "Grossere Slider-Thumbs auf Mobilgeraten (28px)", {_status:"NEU"}],
          ["OG/Twitter Cards", "Meta-Tags fur Social-Sharing (Home + Schatzsuche)", {_status:"NEU"}],
          ["Schema.org JSON-LD", "WebApplication + FAQPage (8 Fragen) + ItemList (14 Mottos)", {_status:"NEU"}],
          ["SEO Fallback Content", "Statischer HTML-Content in <div id=root> (v2: erweitert, 8 FAQs, Cross-Links)", {_status:"NEU"}],
          ["Cross-Linking", "Index <-> Schatzsuche bidirektional verlinkt", {_status:"NEU"}],
        ],
        [3200, 4826, 1000]
      ),
      spacer(),

      // ── PHASE 2: SEO GAMECHANGER ──
      new Paragraph({ children: [new PageBreak()] }),
      heading("Phase 2: SEO Gamechanger (20 neue Seiten)", HeadingLevel.HEADING_1),
      text("Basierend auf SEO-Experten-Analyse: Statt einer Mega-Seite jetzt 20 eigenstandige, indexierbare Seiten \u2014 jede mit eigenem Title, H1, Meta-Description, Schema und internem Link-Netzwerk.", { bold: true }),
      spacer(),

      heading("14 Motto-Seiten", HeadingLevel.HEADING_2),
      text("Jede Seite hat: eigenes HowTo-Schema, Spiele pro Altersgruppe (3\u20135, 6\u20138, 9\u201312), Deko, Mitgebsel, Kuchen-Ideen, CTA zum Planer, Breadcrumbs, 4 Related-Motto-Links."),
      buildTable(
        ["Seite", "URL", "Title-Keyword", "Status"],
        [
          ["Safari", "/kindergeburtstag/safari", "Safari Kindergeburtstag", {_status:"SEO"}],
          ["Piraten", "/kindergeburtstag/piraten", "Piraten Kindergeburtstag", {_status:"SEO"}],
          ["Weltraum", "/kindergeburtstag/weltraum", "Weltraum Kindergeburtstag", {_status:"SEO"}],
          ["Dino", "/kindergeburtstag/dino", "Dino Kindergeburtstag", {_status:"SEO"}],
          ["Einhorn", "/kindergeburtstag/einhorn", "Einhorn Kindergeburtstag", {_status:"SEO"}],
          ["Feuerwehr", "/kindergeburtstag/feuerwehr", "Feuerwehr Kindergeburtstag", {_status:"SEO"}],
          ["Paw Patrol", "/kindergeburtstag/paw-patrol", "Paw Patrol Kindergeburtstag", {_status:"SEO"}],
          ["Pokemon", "/kindergeburtstag/pokemon", "Pokemon Kindergeburtstag", {_status:"SEO"}],
          ["Minecraft", "/kindergeburtstag/minecraft", "Minecraft Kindergeburtstag", {_status:"SEO"}],
          ["Frozen", "/kindergeburtstag/frozen", "Frozen Kindergeburtstag", {_status:"SEO"}],
          ["Super Mario", "/kindergeburtstag/super-mario", "Super Mario Kindergeburtstag", {_status:"SEO"}],
          ["Spider-Man", "/kindergeburtstag/spider-man", "Spider-Man Kindergeburtstag", {_status:"SEO"}],
          ["Harry Potter", "/kindergeburtstag/harry-potter", "Harry Potter Kindergeburtstag", {_status:"SEO"}],
          ["Ninjago", "/kindergeburtstag/ninjago", "Ninjago Kindergeburtstag", {_status:"SEO"}],
        ],
        [1800, 3226, 3000, 1000]
      ),
      spacer(),

      heading("3 Altersgruppen-Seiten", HeadingLevel.HEADING_2),
      buildTable(
        ["Seite", "URL", "Title-Keyword", "Status"],
        [
          ["3\u20135 Jahre", "/kindergeburtstag/3-5-jahre", "Kindergeburtstag 3 4 5 Jahre", {_status:"SEO"}],
          ["6\u20138 Jahre", "/kindergeburtstag/6-8-jahre", "Kindergeburtstag 6 7 8 Jahre", {_status:"SEO"}],
          ["9\u201312 Jahre", "/kindergeburtstag/9-12-jahre", "Kindergeburtstag 9 10 11 12 Jahre", {_status:"SEO"}],
        ],
        [1800, 3226, 3000, 1000]
      ),
      spacer(),

      heading("3 Bonus-Seiten (unterbesetzte Nischen)", HeadingLevel.HEADING_2),
      buildTable(
        ["Seite", "URL", "Warum diese Nische?", "Status"],
        [
          ["Zuhause feiern", "/kindergeburtstag-zuhause", "Hohes Suchvolumen, passt perfekt zum Tool. Kaum Tool-Konkurrenz.", {_status:"SEO"}],
          ["Last Minute", "/kindergeburtstag-last-minute", "Wenig spezialisierter Content im Markt. Notfall-Guide.", {_status:"SEO"}],
          ["Checkliste", "/kindergeburtstag-checkliste", "Sehr gesuchter Begriff. Zieht Backlinks an.", {_status:"SEO"}],
        ],
        [1800, 3026, 3200, 1000]
      ),
      spacer(),

      heading("SEO-Infrastruktur", HeadingLevel.HEADING_2),
      buildTable(
        ["Komponente", "Details", "Status"],
        [
          ["Sitemap", "23 URLs (vorher 4). Alle Seiten mit Prioritat und Changefreq.", {_status:"NEU"}],
          ["_redirects", "Clean URLs fur alle 20 neuen Seiten (Netlify)", {_status:"NEU"}],
          ["FAQPage Schema", "8 Fragen (vorher 4), synchron mit HTML-Content", {_status:"NEU"}],
          ["ItemList Schema", "14 Mottos als ItemList \u2014 kann Google-Karussell triggern", {_status:"NEU"}],
          ["HowTo Schema", "Pro Motto-Seite ein HowTo-Schema (5 Schritte)", {_status:"NEU"}],
          ["Index Fallback v2", "Verbesserter Fallback: H1 optimiert, Keyword-Synonyme, <main>-Tag, Cross-Links", {_status:"NEU"}],
          ["Cross-Link-Netzwerk", "Jede Seite verlinkt zu 4+ anderen Seiten (Mottos, Alter, Bonus, Schatzsuche)", {_status:"NEU"}],
          ["Breadcrumbs", "Auf allen Unterseiten: Start > Mottos > [Motto]", {_status:"NEU"}],
        ],
        [3000, 5026, 1000]
      ),

      // ── WAS FEHLT ──
      new Paragraph({ children: [new PageBreak()] }),
      heading("Was fehlt (OFFEN)", HeadingLevel.HEADING_1),
      buildTable(
        ["Item", "Prioritat", "Status"],
        [
          ["Amazon PartnerNet Account", "HOCH \u2014 Affiliate-Links sind eingebaut, Account muss beantragt werden", {_status:"OFFEN"}],
          ["OG-Image PNGs (1200x630)", "MITTEL \u2014 og-home.png und og-schatzsuche.png fehlen", {_status:"OFFEN"}],
          ["Google Search Console", "HOCH \u2014 Sitemap einreichen, Indexierung anfragen fur alle 23 URLs", {_status:"OFFEN"}],
          ["Pre-Rendering / SSR", "NIEDRIG \u2014 Fallback deckt ab, echtes SSR ware langfristig besser", {_status:"NEXT"}],
          ["Email-Backend", "NIEDRIG \u2014 Email-Capture ist client-side (localStorage), Backend fehlt", {_status:"NEXT"}],
          ["PDF-Export", "NIEDRIG \u2014 Plan als PDF herunterladen", {_status:"NEXT"}],
          ["Backlink-Strategie", "MITTEL \u2014 3-5 Gastbeitrage auf Elternblogs platzieren", {_status:"NEXT"}],
          ["Analytics", "MITTEL \u2014 Plausible oder Umami (DSGVO-konform)", {_status:"NEXT"}],
        ],
        [3500, 4526, 1000]
      ),
      spacer(),

      // ── TECH STACK ──
      heading("Tech-Stack", HeadingLevel.HEADING_1),
      buildTable(
        ["Komponente", "Technologie"],
        [
          ["Frontend", "React 18 + Babel Standalone (CDN, kein Build-Step)"],
          ["Hosting", "Netlify Free (Static Site)"],
          ["DNS / CDN", "Cloudflare (DNS, CDN, Email Routing)"],
          ["State", "localStorage (ml_* Keys)"],
          ["SEO", "Statischer HTML-Fallback + JSON-LD Schema"],
          ["Monetarisierung", "Amazon Affiliate (tag=machsleicht-21)"],
          ["Fonts", "DM Sans + Fraunces (Google Fonts)"],
        ],
        [3000, 6026]
      ),
      spacer(),

      // ── DATEISTRUKTUR ──
      heading("Dateistruktur", HeadingLevel.HEADING_1),
      buildTable(
        ["Datei / Ordner", "Beschreibung"],
        [
          ["index.html", "Hauptseite: React SPA + SEO Fallback (14 Mottos, 72+ Spiele)"],
          ["schatzsuche.html", "Schatzsuche-Engine (6 Themen, 90 Stationen)"],
          ["kindergeburtstag/", "14 Motto-Seiten + 3 Altersgruppen-Seiten (statisches HTML)"],
          ["kindergeburtstag-zuhause.html", "Bonus: Zuhause feiern Ratgeber"],
          ["kindergeburtstag-last-minute.html", "Bonus: Last-Minute Notfall-Guide"],
          ["kindergeburtstag-checkliste.html", "Bonus: Komplette Checkliste"],
          ["sitemap.xml", "23 URLs mit Prioritaten"],
          ["robots.txt", "Allow all + Sitemap-Referenz"],
          ["_redirects", "Clean URLs fur Netlify (20+ Regeln)"],
          ["impressum.html", "Impressum (noindex)"],
          ["datenschutz.html", "Datenschutzerklarung (noindex)"],
        ],
        [4000, 5026]
      ),
      spacer(),

      // ── KENNZAHLEN ──
      heading("Kennzahlen", HeadingLevel.HEADING_1),
      buildTable(
        ["Metrik", "Wert"],
        [
          ["Indexierbare Seiten", "23 (vorher 4)"],
          ["Mottos", "14 (6 klassische + 8 Lizenz)"],
          ["Spiele total", "135 (72 Motto + 54 Calm + 9 Basis)"],
          ["Affiliate-Links", "42 (Amazon tag=machsleicht-21)"],
          ["FAQ-Fragen (Schema)", "8 (vorher 4)"],
          ["Schema-Typen", "WebApplication, FAQPage, ItemList, HowTo (pro Motto)"],
          ["Structured Data Entities", "28 (1 WebApp + 1 FAQ + 1 ItemList + 14 HowTo + 14 ListItem + ...)"],
          ["Cross-Links pro Seite", "4\u201310 interne Links"],
          ["Sitemap URLs", "23"],
          ["Kosten", "0 EUR (Netlify Free + Cloudflare Free)"],
        ],
        [4000, 5026]
      ),
      spacer(),

      // ── ACCOUNTS ──
      heading("Accounts & Rechtliches", HeadingLevel.HEADING_1),
      buildTable(
        ["Service", "Status", "Details"],
        [
          ["Netlify", "Aktiv", "Free Tier, Static Site Hosting"],
          ["Cloudflare", "Aktiv", "DNS, CDN, Email Routing"],
          ["Google Search Console", "Einrichten!", "Sitemap einreichen, 23 URLs indexieren"],
          ["Amazon PartnerNet", "Beantragen!", "Affiliate-Links sind bereits eingebaut"],
          ["Impressum", "Vorhanden", "Marie-Therese Bollweg, Hamburg"],
          ["Datenschutz", "Vorhanden", "DSGVO-konform, Affiliate-Hinweis in Sektion 8"],
        ],
        [2500, 1526, 5000]
      ),
      spacer(),

      // ── SOFORT ACTIONS ──
      heading("Sofort-Actions (Top 5)", HeadingLevel.HEADING_1),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 100 },
        children: [new TextRun({ text: "Google Search Console einrichten + Sitemap einreichen (23 URLs)", font: "Arial", size: 22, bold: true })],
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 100 },
        children: [new TextRun({ text: "Amazon PartnerNet Account beantragen (42 Links warten)", font: "Arial", size: 22, bold: true })],
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 100 },
        children: [new TextRun({ text: "OG-Image PNGs erstellen (1200x630, og-home.png + og-schatzsuche.png)", font: "Arial", size: 22, bold: true })],
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 100 },
        children: [new TextRun({ text: "Deploy auf Netlify + alle 23 Seiten testen (Clean URLs, Cross-Links)", font: "Arial", size: 22, bold: true })],
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 100 },
        children: [new TextRun({ text: "3\u20135 Gastbeitrage auf Elternblogs fur erste Backlinks", font: "Arial", size: 22, bold: true })],
      }),
      spacer(),
      spacer(),
      text("Erstellt am 21. Marz 2026 | machsleicht.de", { color: C.mid, italics: true }),
    ],
  }],
});

// ── Generate ──
const outPath = process.argv[2] || "machsleicht-Status-Report-v3.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log(`Created: ${outPath} (${buf.length} bytes)`);
});
