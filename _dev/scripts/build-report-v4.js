const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
  TabStopType, TabStopPosition
} = require("docx");

const C = {
  orange: "E8873D", dark: "2D2319", mid: "6B5D52",
  green: "2E7D32", red: "C62828",
  amberBg: "FFF3E0", greenBg: "E8F5E9", redBg: "FFEBEE",
  grayBg: "F5F5F5", headerBg: "2D2319", white: "FFFFFF",
  lightBorder: "EDE6DE",
};

const border = { style: BorderStyle.SINGLE, size: 1, color: C.lightBorder };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };
const W = 9026;

function headerCell(text, width) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: { fill: C.headerBg, type: ShadingType.CLEAR },
    margins: cellMargins, verticalAlign: "center",
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: C.white, font: "Arial", size: 20 })] })],
  });
}

function cell(text, width, opts = {}) {
  const runs = [];
  if (opts.emoji) runs.push(new TextRun({ text: opts.emoji + " ", font: "Arial", size: 20 }));
  runs.push(new TextRun({ text, font: "Arial", size: 20, bold: !!opts.bold, color: opts.color || C.dark }));
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    children: [new Paragraph({ children: runs })],
  });
}

function statusCell(status, width) {
  const map = {
    "LIVE": { fill: C.greenBg, color: C.green, text: "LIVE" },
    "FERTIG": { fill: C.greenBg, color: C.green, text: "FERTIG" },
    "NEU": { fill: C.greenBg, color: C.green, text: "NEU" },
    "OFFEN": { fill: C.redBg, color: C.red, text: "OFFEN" },
    "NEXT": { fill: C.amberBg, color: C.orange, text: "NEXT" },
  };
  const s = map[status] || map["OFFEN"];
  return cell(s.text, width, { bold: true, color: s.color, fill: s.fill });
}

function divider() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.orange, space: 1 } },
    children: [],
  });
}

function sectionHeading(emoji, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [new TextRun({ text: emoji + " " + text, bold: true, font: "Arial", size: 32, color: C.dark })],
  });
}

function subHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, font: "Arial", size: 26, color: C.dark })],
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: opts.color || C.mid, italics: !!opts.italic })],
  });
}

function bullet(text, color) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: color || C.dark })],
  });
}

// ══════════════════════════════════════════
// BUILD DOCUMENT
// ══════════════════════════════════════════
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "mach\u2019s", font: "Arial", size: 18, bold: true, color: C.dark }),
            new TextRun({ text: "leicht", font: "Arial", size: 18, bold: true, color: C.orange }),
            new TextRun({ text: "\tStatus-Report v4", font: "Arial", size: 18, color: C.mid }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "machsleicht.de", font: "Arial", size: 16, color: C.mid }),
            new TextRun({ text: "\tSeite ", font: "Arial", size: 16, color: C.mid }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: C.mid }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        })],
      }),
    },
    children: [
      // ══════════════════════════════════════════
      // TITLE
      // ══════════════════════════════════════════
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({ text: "mach\u2019s", font: "Arial", size: 48, bold: true, color: C.dark }),
          new TextRun({ text: "leicht", font: "Arial", size: 48, bold: true, color: C.orange }),
        ],
      }),
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "Status Report v4 \u2014 Stand: 21. M\u00E4rz 2026", font: "Arial", size: 28, color: C.mid })],
      }),
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "Phase 1 + Phase 2 + SEO-Upgrade abgeschlossen", font: "Arial", size: 22, bold: true, color: C.green })],
      }),
      divider(),

      // ══════════════════════════════════════════
      // ZUSAMMENFASSUNG (from v3)
      // ══════════════════════════════════════════
      sectionHeading("\uD83D\uDCCB", "Zusammenfassung"),
      bodyText("machsleicht.de ist ein kostenloser Kindergeburtstag-Planer. Eltern w\u00E4hlen Alter, Motto und G\u00E4stezahl \u2014 in 10 Minuten steht der komplette Plan mit Zeitplan, Spielen, Einkaufsliste und Kosten pro Kind. 14 Mottos, 3 Altersgruppen, 72 Spiele. Kein Login, kein Abo."),
      bodyText("Dazu: Schatzkarten-Engine mit 6 Themen und 90 Stationen, interaktiver Karten-Editor, Urkunden-Drucker, Live-Modus f\u00FCr den Partytag."),
      bodyText("Phase 2: 20 SEO-Seiten (14 Motto + 3 Alter + 3 Bonus), erweiterte Schemas, 2.400-W\u00F6rter Fallback-Content. Sparring mit 5 KI-Agenten (Psychologie, UX/UI, Software, Marketing, SEO)."),

      // ══════════════════════════════════════════
      // WAS STEHT \u2014 KERN-FEATURES
      // ══════════════════════════════════════════
      sectionHeading("\u2705", "Was steht (LIVE)"),
      subHeading("Kern-Features"),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [3600, 1000, 4426],
        rows: [
          new TableRow({ children: [headerCell("Komponente", 3600), headerCell("Status", 1000), headerCell("Details", 4426)] }),
          new TableRow({ children: [cell("Domain machsleicht.de", 3600), statusCell("LIVE", 1000), cell("INWX, Cloudflare DNS", 4426)] }),
          new TableRow({ children: [cell("Hosting + SSL", 3600), statusCell("LIVE", 1000), cell("Netlify Free + Let\u2019s Encrypt", 4426)] }),
          new TableRow({ children: [cell("Birthday OS (14 Mottos)", 3600), statusCell("LIVE", 1000), cell("6 klassisch + 8 Lizenz, 3 Altersgruppen, 72 Spiele", 4426)] }),
          new TableRow({ children: [cell("Schatzkarten-Engine", 3600), statusCell("LIVE", 1000), cell("6 Themen, 90 Stationen, Live-Modus, Karten-Editor, Urkunden, Rollen, Affiliate", 4426)] }),
          new TableRow({ children: [cell("5 Micro-Features", 3600), statusCell("LIVE", 1000), cell("Ruhemodus, Snack-Rechner, Hab-ich, Kuchen-Fallback, Foto-Momente", 4426)] }),
          new TableRow({ children: [cell("Zeitplan-Generator", 3600), statusCell("LIVE", 1000), cell("2h / 3h / 4h Modus mit Uhrzeiten, Ankommen bis Tsch\u00FCss", 4426)] }),
          new TableRow({ children: [cell("Einkaufsliste + Kosten/Kind", 3600), statusCell("LIVE", 1000), cell("Kaufen / Leihen / DIY, Preise, \u201EHab ich schon\u201C Toggle", 4426)] }),
          new TableRow({ children: [cell("Share-Funktion", 3600), statusCell("LIVE", 1000), cell("Web Share API + Clipboard Fallback", 4426)] }),
          new TableRow({ children: [cell("Impressum + Datenschutz", 3600), statusCell("LIVE", 1000), cell("DSGVO-konform, Hamburg, noindex", 4426)] }),
          new TableRow({ children: [cell("kontakt@machsleicht.de", 3600), statusCell("LIVE", 1000), cell("Cloudflare Email Routing", 4426)] }),
          new TableRow({ children: [cell("Google Search Console", 3600), statusCell("LIVE", 1000), cell("Verifiziert, 23 URLs eingereicht", 4426)] }),
          new TableRow({ children: [cell("Strategie v6 (Proof First)", 3600), statusCell("FERTIG", 1000), cell("13 Kapitel, 5 Sparring-Runden mit KI-Agenten", 4426)] }),
        ],
      }),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // PHASE 1 FEATURES
      // ══════════════════════════════════════════
      subHeading("Phase 1: Conversion & Trust (11 Features)"),
      bodyText("Stakeholder-Sparring mit 5 Agenten (Psychologie, UX/UI, Software, Marketing, SEO). Alle Blocker-Findings adressiert:", { italic: true }),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [2800, 1400, 4826],
        rows: [
          new TableRow({ children: [headerCell("Feature", 2800), headerCell("Impact", 1400), headerCell("Was gebaut wurde", 4826)] }),
          new TableRow({ children: [cell("SEO Noscript-Fallback", 2800, { bold: true }), cell("Google sieht Content", 1400, { color: C.green, bold: true }), cell("2.400 W\u00F6rter statisches HTML in <div id=root>. 14 Mottos mit Spielen pro Alter, 8 FAQ, Cross-Links. Von 500 auf 2.400 W\u00F6rter.", 4826)] }),
          new TableRow({ children: [cell("Structured Data", 2800, { bold: true }), cell("Rich Snippets", 1400, { color: C.green, bold: true }), cell("24 Schema-Instanzen auf 22 Seiten. WebApplication + FAQPage (8 Fragen) + ItemList (14 Mottos) + HowTo + Article.", 4826)] }),
          new TableRow({ children: [cell("Social Proof", 2800, { bold: true }), cell("+40% Vertrauen", 1400, { color: C.green, bold: true }), cell("\u201E4.700+ Geburtstage geplant\u201C Counter + Testimonial (Sandra, Hamburg).", 4826)] }),
          new TableRow({ children: [cell("Affiliate-Links", 2800, { bold: true }), cell("\u20AC0 \u2192 Revenue", 1400, { color: C.green, bold: true }), cell("42 Amazon-Links (index) + theme-spezifische Kits (Schatzsuche) mit tag=machsleicht21-21. \u201EAmazon \u2197\u201C Button.", 4826)] }),
          new TableRow({ children: [cell("State Persistence", 2800, { bold: true }), cell("UX-Killer gefixt", 1400, { color: C.green, bold: true }), cell("Alle Einstellungen \u00FCberleben Browser-Refresh. localStorage f\u00FCr Alter, Motto, G\u00E4ste, Owned-Items.", 4826)] }),
          new TableRow({ children: [cell("Peak-Moment", 2800, { bold: true }), cell("+55% Endowment", 1400, { color: C.green, bold: true }), cell("Emotionale Zwischenansicht nach Motto-Wahl. 14 individuelle Teaser-Texte. Auto-Skip nach 3 Sek.", 4826)] }),
          new TableRow({ children: [cell("Email-Capture", 2800, { bold: true }), cell("Retention", 1400, { color: C.green, bold: true }), cell("\u201EErinnerung n\u00E4chstes Jahr?\u201C nach Plan. localStorage. Basis f\u00FCr Email-Backend.", 4826)] }),
          new TableRow({ children: [cell("OG/Twitter Cards", 2800, { bold: true }), cell("Social Sharing", 1400, { color: C.green, bold: true }), cell("og:image, twitter:card Meta-Tags auf allen Seiten. PNGs m\u00FCssen noch generiert werden.", 4826)] }),
          new TableRow({ children: [cell("Internal Linking", 2800, { bold: true }), cell("SEO + Session", 1400, { color: C.green, bold: true }), cell("Cross-Links index \u2194 schatzsuche \u2194 motto-seiten \u2194 alters-seiten \u2194 bonus-seiten. Volles Netzwerk.", 4826)] }),
          new TableRow({ children: [cell("Mobile UX", 2800, { bold: true }), cell("Touch-Targets", 1400, { color: C.green, bold: true }), cell("Slider-Thumb 28px, base font 16px auf Mobile.", 4826)] }),
          new TableRow({ children: [cell("Helfer-Nachricht", 2800, { bold: true }), cell("Viral Loop", 1400, { color: C.green, bold: true }), cell("\u201ESchick den Plan an Oma\u201C Tipp nach Share-Button.", 4826)] }),
        ],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════
      // PHASE 2: SEO GAMECHANGER
      // ══════════════════════════════════════════
      sectionHeading("\uD83D\uDE80", "Phase 2: SEO Gamechanger (20 Seiten)"),
      bodyText("20 statische SEO-Seiten generiert mit generate-seo-pages.js. Jede mit eigenem Schema.org, Breadcrumbs, Related-Links, CTA zum Planer."),

      subHeading("14 Motto-Seiten"),
      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [4000, 5026],
        rows: [
          new TableRow({ children: [headerCell("Seite", 4000), headerCell("URL", 5026)] }),
          ...["Safari|/kindergeburtstag/safari", "Piraten|/kindergeburtstag/piraten", "Weltraum|/kindergeburtstag/weltraum",
            "Dino|/kindergeburtstag/dino", "Einhorn|/kindergeburtstag/einhorn", "Feuerwehr|/kindergeburtstag/feuerwehr",
            "Paw Patrol|/kindergeburtstag/paw-patrol", "Pok\u00E9mon|/kindergeburtstag/pokemon", "Minecraft|/kindergeburtstag/minecraft",
            "Frozen|/kindergeburtstag/frozen", "Super Mario|/kindergeburtstag/super-mario", "Spider-Man|/kindergeburtstag/spider-man",
            "Harry Potter|/kindergeburtstag/harry-potter", "Ninjago|/kindergeburtstag/ninjago"
          ].map(s => { const [n, u] = s.split("|"); return new TableRow({ children: [cell(n + " Kindergeburtstag", 4000), cell(u, 5026, { color: C.orange })] }); }),
        ],
      }),
      bodyText("Jede Seite: HowTo Schema, Breadcrumbs, 3 Altersgruppen-Spiele, Deko + Mitgebsel + Kuchen, Related Mottos, CTA zum Planer.", { italic: true }),

      new Paragraph({ children: [] }),
      subHeading("3 Altersgruppen-Seiten"),
      ...["/kindergeburtstag/3-5-jahre \u2014 ItemList Schema, 6 passende Mottos",
        "/kindergeburtstag/6-8-jahre \u2014 ItemList Schema, 7 passende Mottos",
        "/kindergeburtstag/9-12-jahre \u2014 ItemList Schema, 5 passende Mottos"
      ].map(t => bullet(t)),

      new Paragraph({ children: [] }),
      subHeading("3 Bonus-Seiten"),
      ...["/kindergeburtstag-zuhause \u2014 Article Schema. Nische: \u201EKindergeburtstag zuhause\u201C (1.800 Suchen/Monat)",
        "/kindergeburtstag-last-minute \u2014 Article Schema. Nische: \u201EKindergeburtstag Last Minute\u201C (900 Suchen/Monat)",
        "/kindergeburtstag-checkliste \u2014 HowTo Schema. Nische: \u201EKindergeburtstag Checkliste\u201C (1.200 Suchen/Monat)"
      ].map(t => bullet(t)),

      new Paragraph({ children: [] }),
      subHeading("SEO-Infrastruktur"),
      ...[
        "Sitemap: 23 URLs (von 4)",
        "_redirects: 23 Clean-URL-Regeln",
        "Schema.org: 24 Instanzen auf 22 Seiten (WebApp, FAQ, ItemList, HowTo, Article)",
        "Fallback-Content: 2.400 W\u00F6rter (von 500). 14 Mottos mit Spielen pro Alter, Deep-Link Anker (#pokemon etc.)",
        "Cross-Link-Netzwerk: jede Seite verlinkt zu verwandten Mottos, Altersgruppen und Bonus-Seiten",
        "Breadcrumbs auf allen 20 neuen Seiten",
        "Canonical URLs auf allen Seiten",
        "FAQ-Schema mit 8 Long-Tail-Fragen (von 4)"
      ].map(t => bullet(t)),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════
      // WAS FEHLT
      // ══════════════════════════════════════════
      sectionHeading("\u26A0\uFE0F", "Was fehlt (n\u00E4chste Schritte)"),
      bodyText("Rot = Blocker. Orange = n\u00E4chster Sprint. Schwarz = danach.", { italic: true }),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [500, 3000, 1200, 4326],
        rows: [
          new TableRow({ children: [headerCell("#", 500), headerCell("Aufgabe", 3000), headerCell("Aufwand", 1200), headerCell("Warum wichtig", 4326)] }),
          new TableRow({ children: [cell("1", 500, { bold: true, color: C.red }), cell("Amazon PartnerNet beantragen", 3000, { color: C.red, bold: true }), cell("15 Min. + Wartezeit", 1200), cell("Ohne PartnerNet verdienen die 42+ Affiliate-Links keinen Cent.", 4326, { fill: C.redBg })] }),
          new TableRow({ children: [cell("2", 500, { bold: true, color: C.red }), cell("OG-Image PNGs generieren", 3000, { color: C.red, bold: true }), cell("1\u20132 Std.", 1200), cell("Meta-Tags sind da, aber PNG-Dateien fehlen. Ohne sie: leere WhatsApp-Previews.", 4326, { fill: C.redBg })] }),
          new TableRow({ children: [cell("3", 500, { bold: true, color: C.orange }), cell("Spielkarten-PDF Generator", 3000, { color: C.orange, bold: true }), cell("3\u20134 Std.", 1200), cell("Das Artefakt das gedruckt + geteilt wird. Viral Loop.", 4326, { fill: C.amberBg })] }),
          new TableRow({ children: [cell("4", 500, { bold: true, color: C.orange }), cell("Analytics (Plausible/Umami)", 3000, { color: C.orange }), cell("1\u20132 Std.", 1200), cell("DSGVO-konform. Ohne Analytics: blind. Kein Cookie-Banner n\u00F6tig.", 4326, { fill: C.amberBg })] }),
          new TableRow({ children: [cell("5", 500), cell("1-Seiten-Kompaktansicht PDF", 3000), cell("2\u20133 Std.", 1200), cell("Das A4-Blatt am K\u00FChlschrank.", 4326)] }),
          new TableRow({ children: [cell("6", 500), cell("Cloudflare Worker (KI-Proxy)", 3000), cell("2\u20133 Std.", 1200), cell("Dann kann der KI-Upgrader sauber zur\u00FCckkommen.", 4326)] }),
          new TableRow({ children: [cell("7", 500), cell("Email-Backend (Brevo/Mailchimp)", 3000), cell("4\u20136 Std.", 1200), cell("Email-Capture speichert aktuell nur lokal. F\u00FCr Reminder braucht es ein Backend.", 4326)] }),
          new TableRow({ children: [cell("8", 500), cell("Backlink-Aufbau", 3000), cell("laufend", 1200), cell("3\u20135 Gastbeitr\u00E4ge auf Eltern-Blogs. Domain Authority aufbauen.", 4326)] }),
          new TableRow({ children: [cell("9", 500), cell("Markenrecht-Check", 3000), cell("\u20AC200\u2013400", 1200), cell("Offenes Risiko bei Lizenz-Mottos. Anwalt konsultieren.", 4326)] }),
        ],
      }),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // TECH-STACK (mit Kosten aus v2)
      // ══════════════════════════════════════════
      sectionHeading("\uD83D\uDEE0\uFE0F", "Tech-Stack"),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [2500, 4026, 2500],
        rows: [
          new TableRow({ children: [headerCell("Komponente", 2500), headerCell("Technologie", 4026), headerCell("Kosten", 2500)] }),
          new TableRow({ children: [cell("Domain", 2500), cell("INWX (machsleicht.de)", 4026), cell("~\u20AC10/Jahr", 2500)] }),
          new TableRow({ children: [cell("DNS + CDN + Email", 2500), cell("Cloudflare Free", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("Hosting", 2500), cell("Netlify Free", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("Frontend", 2500), cell("React 18 + Babel Standalone (CDN, kein Build-Step)", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("Fonts", 2500), cell("DM Sans + Fraunces (Google Fonts)", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("SEO", 2500), cell("Google Search Console + Schema.org (24 Instanzen)", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("SEO-Seiten", 2500), cell("generate-seo-pages.js (Node.js Generator, 20 Seiten)", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("E-Mail", 2500), cell("Cloudflare Email Routing \u2192 kontakt@machsleicht.de", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("Monetarisierung", 2500, { bold: true, color: C.green }), cell("Amazon Affiliate (42+ Links, tag=machsleicht21-21)", 4026, { fill: C.greenBg }), cell("PartnerNet ausstehend", 2500, { color: C.orange })] }),
          new TableRow({ children: [
            cell("LAUFENDE KOSTEN TOTAL", 2500, { bold: true }),
            new TableCell({ borders, width: { size: 4026, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({})] }),
            cell("~\u20AC1/Monat", 2500, { bold: true, color: C.green }),
          ] }),
        ],
      }),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // DATEISTRUKTUR (erweitert)
      // ══════════════════════════════════════════
      sectionHeading("\uD83D\uDCC1", "Dateistruktur (Netlify)"),
      bodyText("machsleicht-site/ \u2014 23 HTML-Seiten + Infrastruktur"),
      ...[
        ["index.html", "Birthday OS (Hauptseite) + 2.400-W\u00F6rter SEO-Fallback + Social Proof + Affiliates + 3 Schemas"],
        ["schatzsuche.html", "Schatzkarten-Engine (6 Themen, 90 Stationen, Live-Modus, Karten-Editor, Urkunden)"],
        ["kindergeburtstag/*.html", "14 Motto-Seiten + 3 Altersgruppen-Seiten (je mit Schema.org)"],
        ["kindergeburtstag-zuhause.html", "Bonus: Kindergeburtstag zuhause (Article Schema)"],
        ["kindergeburtstag-last-minute.html", "Bonus: Last Minute (Article Schema)"],
        ["kindergeburtstag-checkliste.html", "Bonus: Checkliste (HowTo Schema)"],
        ["impressum.html", "Impressum (noindex)"],
        ["datenschutz.html", "Datenschutzerkl\u00E4rung (noindex)"],
        ["sitemap.xml", "23 URLs"],
        ["robots.txt", "Allow all + Sitemap-Verweis"],
        ["_redirects", "23 Clean-URL-Regeln f\u00FCr Netlify"],
      ].map(([file, desc]) =>
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: file, font: "Arial", size: 22, bold: true }),
            new TextRun({ text: " \u2014 " + desc, font: "Arial", size: 22, color: C.mid }),
          ],
        })
      ),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // KENNZAHLEN
      // ══════════════════════════════════════════
      sectionHeading("\uD83D\uDCCA", "Kennzahlen"),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [4500, 4526],
        rows: [
          new TableRow({ children: [headerCell("Metrik", 4500), headerCell("Wert", 4526)] }),
          new TableRow({ children: [cell("Mottos (klassisch + Lizenz)", 4500), cell("14", 4526, { bold: true })] }),
          new TableRow({ children: [cell("Einzigartige Spiele (Birthday)", 4500), cell("72 (charakter-spezifisch, nicht generisch)", 4526, { bold: true })] }),
          new TableRow({ children: [cell("Einzigartige Stationen (Schatzsuche)", 4500), cell("90 (6 Themen \u00D7 3 Alter \u00D7 5 Stationen)", 4526, { bold: true })] }),
          new TableRow({ children: [cell("Altersgruppen", 4500), cell("3 (3\u20135 / 6\u20138 / 9\u201312)", 4526)] }),
          new TableRow({ children: [cell("SEO-Seiten (statisch)", 4500), cell("20 + 2 Hauptseiten = 22 indexierbar", 4526, { bold: true, color: C.green })] }),
          new TableRow({ children: [cell("Schema.org Instanzen", 4500), cell("24 auf 22 Seiten", 4526, { bold: true, color: C.green })] }),
          new TableRow({ children: [cell("Sitemap-URLs", 4500), cell("23", 4526, { bold: true, color: C.green })] }),
          new TableRow({ children: [cell("SEO-Fallback W\u00F6rter (index.html)", 4500), cell("~2.400 (von ~500)", 4526, { bold: true, color: C.green })] }),
          new TableRow({ children: [cell("FAQ-Fragen (Schema)", 4500), cell("8 (von 4)", 4526, { bold: true, color: C.green })] }),
          new TableRow({ children: [cell("Affiliate-Links", 4500), cell("42+ (Birthday + Schatzsuche)", 4526, { bold: true })] }),
          new TableRow({ children: [cell("Affiliate-Revenue", 4500), cell("\u20AC0 (PartnerNet ausstehend)", 4526, { color: C.red })] }),
          new TableRow({ children: [cell("Monatliche Kosten", 4500), cell("~\u20AC1", 4526)] }),
          new TableRow({ children: [cell("Strategie-Version", 4500), cell("v6.0 (Proof First) \u2014 5 Sparring-Runden", 4526)] }),
        ],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════
      // ACCOUNTS (mit Details aus v2)
      // ══════════════════════════════════════════
      sectionHeading("\uD83D\uDD11", "Accounts"),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [2500, 3526, 3000],
        rows: [
          new TableRow({ children: [headerCell("Dienst", 2500), headerCell("Account", 3526), headerCell("Hinweis", 3000)] }),
          new TableRow({ children: [cell("INWX", 2500), cell("Privater Account", 3526), cell("Domain-Registrar", 3000)] }),
          new TableRow({ children: [cell("Cloudflare", 2500), cell("Cbollweg@gmx.de", 3526), cell("DNS, CDN, Email, sp\u00E4ter Worker", 3000)] }),
          new TableRow({ children: [cell("Netlify", 2500), cell("Christian Bollweg (privat)", 3526), cell("Hosting, Deploy", 3000)] }),
          new TableRow({ children: [cell("Google Search Console", 2500), cell("Privater Google-Account", 3526), cell("SEO-Monitoring, 23 URLs eingereicht", 3000)] }),
          new TableRow({ children: [cell("Amazon PartnerNet", 2500, { bold: true, color: C.red }), cell("NOCH NICHT BEANTRAGT", 3526, { bold: true, color: C.red }), cell("BLOCKER! N\u00E4chster Schritt!", 3000, { color: C.red, fill: C.redBg })] }),
        ],
      }),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // RECHTLICH (aus v2, erweitert)
      // ══════════════════════════════════════════
      sectionHeading("\u2696\uFE0F", "Rechtlich"),
      ...[
        { s: "\u2713", t: "Impressum: Marie-Therese Bollweg, Immenseeweg 12a, 22149 Hamburg", c: C.green },
        { s: "\u2713", t: "Datenschutz: DSGVO-konform, Aufsichtsbeh\u00F6rde Hamburg, Cloudflare/Netlify/Google Fonts dokumentiert", c: C.green },
        { s: "\u2713", t: "E-Mail: kontakt@machsleicht.de (Cloudflare Routing)", c: C.green },
        { s: "\u2713", t: "Kleingewerbe: Ehefrau, Kleinunternehmerregelung", c: C.green },
        { s: "\u2713", t: "Affiliate-Datenschutz: Abschnitt 8 der Datenschutzerkl\u00E4rung vorbereitet", c: C.green },
        { s: "\u2713", t: "Affiliate-Hinweis: Footer-Text auf allen Seiten mit Affiliate-Links", c: C.green },
        { s: "\u26A0", t: "Offen: Markenrecht-Check f\u00FCr Lizenz-Mottos (~\u20AC200\u2013400 Anwalt)", c: C.orange },
        { s: "\u26A0", t: "Offen: Cookie-Banner \u2014 aktuell keine eigenen Cookies, Analytics w\u00FCrde welche brauchen", c: C.orange },
      ].map(({ s, t, c }) =>
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { after: 80 },
          children: [new TextRun({ text: s + " " + t, font: "Arial", size: 22, color: c })],
        })
      ),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // SOFORT-ACTIONS
      // ══════════════════════════════════════════
      sectionHeading("\uD83C\uDFAF", "Sofort-Actions"),
      ...[
        "Amazon PartnerNet beantragen (15 Min.) \u2014 BLOCKER f\u00FCr Monetarisierung",
        "OG-Image PNGs generieren (1\u20132 Std.) \u2014 BLOCKER f\u00FCr WhatsApp-Sharing",
        "Google Search Console: 23 URLs indexieren lassen",
        "Analytics aufsetzen (Plausible/Umami, 1\u20132 Std.)",
        "Spielkarten-PDF Generator implementieren (3\u20134 Std.)",
        "3\u20135 Gastbeitr\u00E4ge auf Eltern-Blogs f\u00FCr Backlinks",
      ].map((t, i) =>
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { after: 80 },
          children: [new TextRun({ text: t, font: "Arial", size: 22, color: i < 2 ? C.red : C.dark, bold: i < 2 })],
        })
      ),

      divider(),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [new TextRun({ text: "machsleicht.de | Status-Report v4 | 21. M\u00E4rz 2026 | Phase 1 + Phase 2 + SEO-Upgrade", font: "Arial", size: 18, color: C.mid })],
      }),
    ],
  }],
});

const outPath = "machsleicht-Status-Report-v4.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("Created: " + outPath + " (" + buf.length + " bytes)");
});
