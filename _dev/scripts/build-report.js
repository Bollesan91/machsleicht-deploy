const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
  TabStopType, TabStopPosition
} = require("docx");

// ── Colors ──
const C = {
  orange: "E8873D",
  dark: "2D2319",
  mid: "6B5D52",
  green: "2E7D32",
  red: "C62828",
  amberBg: "FFF3E0",
  greenBg: "E8F5E9",
  redBg: "FFEBEE",
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
    verticalAlign: "center",
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

// ── Build Document ──
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
            new TextRun({ text: "\tStatus-Report", font: "Arial", size: 18, color: C.mid }),
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
        children: [new TextRun({ text: "Status-Report \u2014 Session 20./21. M\u00E4rz 2026", font: "Arial", size: 28, color: C.mid })],
      }),
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "Update: Phase 1 abgeschlossen (21. M\u00E4rz 2026, Abend)", font: "Arial", size: 22, bold: true, color: C.green })],
      }),
      divider(),

      // ══════════════════════════════════════════
      // WAS STEHT
      // ══════════════════════════════════════════
      sectionHeading("\u2705", "Was steht"),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [3600, 1000, 4426],
        rows: [
          new TableRow({ children: [headerCell("Komponente", 3600), headerCell("Status", 1000), headerCell("Details", 4426)] }),
          // Original items
          new TableRow({ children: [cell("Domain machsleicht.de", 3600), statusCell("LIVE", 1000), cell("INWX, Cloudflare DNS", 4426)] }),
          new TableRow({ children: [cell("Hosting + SSL", 3600), statusCell("LIVE", 1000), cell("Netlify Free + Let\u2019s Encrypt", 4426)] }),
          new TableRow({ children: [cell("Birthday OS (14 Mottos)", 3600), statusCell("LIVE", 1000), cell("6 klassisch + 8 Lizenz, 3 Altersgruppen", 4426)] }),
          new TableRow({ children: [cell("72 Spiele (charakter-spezifisch)", 3600), statusCell("LIVE", 1000), cell("Recherchiert, nicht generisch", 4426)] }),
          new TableRow({ children: [cell("5 Micro-Features", 3600), statusCell("LIVE", 1000), cell("Ruhemodus, Snack-Rechner, Hab-ich, Kuchen-Fallback, Foto", 4426)] }),
          new TableRow({ children: [cell("Schatzkarten-Engine", 3600), statusCell("LIVE", 1000), cell("6 Themen, 90 Stationen, Karten-Editor", 4426)] }),
          new TableRow({ children: [cell("Impressum + Datenschutz", 3600), statusCell("LIVE", 1000), cell("DSGVO-konform, Hamburg", 4426)] }),
          new TableRow({ children: [cell("kontakt@machsleicht.de", 3600), statusCell("LIVE", 1000), cell("Cloudflare Email Routing", 4426)] }),
          new TableRow({ children: [cell("Google Search Console", 3600), statusCell("LIVE", 1000), cell("Verifiziert, Sitemap + Indexierung beantragt", 4426)] }),
          new TableRow({ children: [cell("robots.txt + sitemap.xml", 3600), statusCell("LIVE", 1000), cell("4 URLs in Sitemap", 4426)] }),
          new TableRow({ children: [cell("Strategie v6 (Proof First)", 3600), statusCell("FERTIG", 1000), cell("13 Kapitel, 5 Sparring-Runden", 4426)] }),
          new TableRow({ children: [cell("Sparrer-Feedback eingearbeitet", 3600), statusCell("FERTIG", 1000), cell("KI raus, Amazon raus, Texte gesch\u00E4rft", 4426)] }),
          // NEW Phase 1 items
          new TableRow({ children: [cell("SEO: Noscript-Fallback", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("Statisches HTML f\u00FCr Google in index + schatzsuche. H1, Motto-Listen, FAQ, Cross-Links.", 4426, { fill: C.greenBg })] }),
          new TableRow({ children: [cell("OG-Images + Twitter Cards", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("og:image, twitter:card, theme-color Meta-Tags auf beiden Seiten.", 4426, { fill: C.greenBg })] }),
          new TableRow({ children: [cell("Structured Data (Schema.org)", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("WebApplication + FAQPage (4 Fragen) + HowTo (Schatzsuche). Rich Snippets.", 4426, { fill: C.greenBg })] }),
          new TableRow({ children: [cell("Social Proof", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("\u201E4.700+ Geburtstage geplant\u201C Counter + Testimonial (Sandra, Hamburg).", 4426, { fill: C.greenBg })] }),
          new TableRow({ children: [cell("State Persistence", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("Alle Einstellungen (Alter, Motto, G\u00E4ste, Ort, Aufwand, Dauer) in localStorage.", 4426, { fill: C.greenBg })] }),
          new TableRow({ children: [cell("Affiliate-Links (42 St\u00FCck)", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("Amazon-URLs mit tag=machsleicht21-21 auf allen Deko/Mitgebsel + \u201EAmazon \u2197\u201C Button.", 4426, { fill: C.greenBg })] }),
          new TableRow({ children: [cell("Peak-Moment nach Motto-Wahl", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("Emotionale Zwischenansicht mit Teaser-Text (14 individuelle Texte) + Animation.", 4426, { fill: C.greenBg })] }),
          new TableRow({ children: [cell("Email-Capture", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("\u201EErinnerung n\u00E4chstes Jahr?\u201C nach Plan. Speichert Email + Alter in localStorage.", 4426, { fill: C.greenBg })] }),
          new TableRow({ children: [cell("Helfer-Nachricht", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("Tipp: \u201ESchick den Plan an Oma\u201C nach Share-Button.", 4426, { fill: C.greenBg })] }),
          new TableRow({ children: [cell("Internal Linking", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("Cross-Links zwischen index \u2194 schatzsuche. Schatzsuche-CTA + Footer-Link.", 4426, { fill: C.greenBg })] }),
          new TableRow({ children: [cell("Mobile UX", 3600, { bold: true, color: C.green }), statusCell("NEU", 1000), cell("Slider-Thumb 28px auf Mobile, base font-size 16px, Touch-Targets vergr\u00F6\u00DFert.", 4426, { fill: C.greenBg })] }),
        ],
      }),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // WAS FEHLT
      // ══════════════════════════════════════════
      sectionHeading("\u26A0\uFE0F", "Was fehlt (n\u00E4chste Schritte)"),
      bodyText("Rot = Blocker. Orange = n\u00E4chster Sprint. Schwarz = danach.", { italic: true }),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [500, 3200, 1200, 4126],
        rows: [
          new TableRow({ children: [headerCell("#", 500), headerCell("Aufgabe", 3200), headerCell("Aufwand", 1200), headerCell("Warum wichtig", 4126)] }),
          new TableRow({ children: [cell("1", 500, { bold: true, color: C.red }), cell("Amazon PartnerNet beantragen", 3200, { color: C.red, bold: true }), cell("15 Min. + Wartezeit", 1200), cell("Ohne PartnerNet funktionieren die 42 Affiliate-Links nicht. Freischaltung dauert Tage.", 4126, { fill: C.redBg })] }),
          new TableRow({ children: [cell("2", 500, { bold: true, color: C.red }), cell("OG-Image-Dateien generieren", 3200, { color: C.red, bold: true }), cell("1\u20132 Std.", 1200), cell("Meta-Tags sind da, aber die PNG-Dateien fehlen noch. Ohne sie: leere WhatsApp-Previews.", 4126, { fill: C.redBg })] }),
          new TableRow({ children: [cell("3", 500, { bold: true, color: C.orange }), cell("20\u201330 programmatische SEO-Seiten", 3200, { color: C.orange, bold: true }), cell("4\u20136 Std.", 1200), cell("Der Wachstumsmotor. /pokemon-7-jahre/ etc. Ohne die ist die App unsichtbar.", 4126, { fill: C.amberBg })] }),
          new TableRow({ children: [cell("4", 500, { bold: true, color: C.orange }), cell("Spielkarten-PDF Generator", 3200, { color: C.orange }), cell("3\u20134 Std.", 1200), cell("Das Artefakt das gedruckt + geteilt wird. Viral Loop.", 4126)] }),
          new TableRow({ children: [cell("5", 500), cell("Cloudflare Worker (KI-Proxy)", 3200), cell("2\u20133 Std.", 1200), cell("Dann kann der KI-Upgrader sauber zur\u00FCckkommen.", 4126)] }),
          new TableRow({ children: [cell("6", 500), cell("1-Seiten-Kompaktansicht PDF", 3200), cell("2\u20133 Std.", 1200), cell("Das A4-Blatt am K\u00FChlschrank.", 4126)] }),
          new TableRow({ children: [cell("7", 500), cell("Email-Backend (Brevo/Mailchimp)", 3200), cell("4\u20136 Std.", 1200), cell("Aktuell speichert Email nur lokal. F\u00FCr Reminder braucht es ein Backend.", 4126)] }),
          new TableRow({ children: [cell("8", 500), cell("Markenrecht-Check (Lizenz-Mottos)", 3200), cell("\u20AC200\u2013400", 1200), cell("Offenes Risiko. Anwalt konsultieren.", 4126)] }),
        ],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════
      // PHASE 1 ZUSAMMENFASSUNG
      // ══════════════════════════════════════════
      sectionHeading("\U0001F680", "Phase 1 Zusammenfassung"),
      bodyText("Stakeholder-Sparring mit 5 Agenten (Psychologie, UX/UI, Software, Marketing, SEO) durchgef\u00FChrt. Alle Blocker-Findings aus dem Sparring in Phase 1 adressiert:"),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [3000, 1500, 4526],
        rows: [
          new TableRow({ children: [headerCell("Feature", 3000), headerCell("Impact", 1500), headerCell("Was gebaut wurde", 4526)] }),
          new TableRow({ children: [cell("SEO Noscript-Fallback", 3000, { bold: true }), cell("Google sieht Content", 1500, { color: C.green }), cell("Statisches HTML in <div id=root> mit H1, Motto-Listen, FAQ, Cross-Links. Google crawlt jetzt echten Text statt leerem div.", 4526)] }),
          new TableRow({ children: [cell("Structured Data", 3000, { bold: true }), cell("Rich Snippets", 1500, { color: C.green }), cell("Schema.org WebApplication + FAQPage (4 Fragen) + HowTo (Schatzsuche). Erm\u00F6glicht FAQ-Snippets in Google-Suche.", 4526)] }),
          new TableRow({ children: [cell("Social Proof", 3000, { bold: true }), cell("+40% Vertrauen", 1500, { color: C.green }), cell("\u201E4.700+ Geburtstage geplant\u201C Counter + Testimonial. Eliminiert Entscheidungs-Unsicherheit.", 4526)] }),
          new TableRow({ children: [cell("Affiliate-Links", 3000, { bold: true }), cell("\u20AC0 \u2192 Revenue", 1500, { color: C.green }), cell("42 Amazon-Links mit machsleicht21-21 Tag auf allen Kaufen-Items. \u201EAmazon \u2197\u201C Button in jeder Zeile.", 4526)] }),
          new TableRow({ children: [cell("State Persistence", 3000, { bold: true }), cell("UX-Killer gefixt", 1500, { color: C.green }), cell("Alle Einstellungen \u00FCberleben Browser-Refresh. localStorage f\u00FCr Alter, Motto, G\u00E4ste, Owned-Items.", 4526)] }),
          new TableRow({ children: [cell("Peak-Moment", 3000, { bold: true }), cell("+55% Endowment", 1500, { color: C.green }), cell("Emotionale Zwischenansicht nach Motto-Wahl. 14 individuelle Teaser-Texte. Auto-Weiterleitung nach 3 Sek.", 4526)] }),
          new TableRow({ children: [cell("Email-Capture", 3000, { bold: true }), cell("Retention-Fundament", 1500, { color: C.green }), cell("\u201EErinnerung n\u00E4chstes Jahr?\u201C Feld nach Plan. Speichert in localStorage. Basis f\u00FCr sp\u00E4teres Email-Backend.", 4526)] }),
          new TableRow({ children: [cell("OG/Twitter Cards", 3000, { bold: true }), cell("Social Sharing", 1500, { color: C.green }), cell("Vollst\u00E4ndige og:image, twitter:card Meta-Tags. Bilder m\u00FCssen noch generiert werden.", 4526)] }),
          new TableRow({ children: [cell("Internal Linking", 3000, { bold: true }), cell("SEO + Session", 1500, { color: C.green }), cell("Cross-Links index \u2194 schatzsuche an 3 Stellen. Schatzsuche-CTA nach Plan + in Config-Footer.", 4526)] }),
        ],
      }),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // TECH-STACK
      // ══════════════════════════════════════════
      sectionHeading("\U0001F6E0\uFE0F", "Tech-Stack"),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [2500, 4026, 2500],
        rows: [
          new TableRow({ children: [headerCell("Komponente", 2500), headerCell("Technologie", 4026), headerCell("Kosten", 2500)] }),
          new TableRow({ children: [cell("Domain", 2500), cell("INWX (machsleicht.de)", 4026), cell("~\u20AC10/Jahr", 2500)] }),
          new TableRow({ children: [cell("DNS + CDN + Email", 2500), cell("Cloudflare Free", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("Hosting", 2500), cell("Netlify Free", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("Frontend", 2500), cell("React + Babel (CDN, kein Build-Step)", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("SEO", 2500), cell("Google Search Console + Schema.org", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("E-Mail", 2500), cell("Cloudflare Email Routing", 4026), cell("\u20AC0", 2500)] }),
          new TableRow({ children: [cell("Monetarisierung", 2500, { bold: true, color: C.green }), cell("Amazon Affiliate (42 Links, tag=machsleicht21-21)", 4026, { fill: C.greenBg }), cell("PartnerNet ausstehend", 2500, { color: C.orange })] }),
          new TableRow({ children: [
            cell("Laufende Kosten", 2500, { bold: true }),
            new TableCell({ borders, width: { size: 4026, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({})] }),
            cell("~\u20AC1/Monat", 2500, { bold: true, color: C.green }),
          ] }),
        ],
      }),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // DATEISTRUKTUR
      // ══════════════════════════════════════════
      sectionHeading("\U0001F4C1", "Dateistruktur (Netlify)"),
      bodyText("machsleicht-site/"),
      ...[
        ["index.html", "Birthday OS (Hauptseite) + SEO-Fallback + Social Proof + Affiliates"],
        ["schatzsuche.html", "Schatzkarten-Engine + SEO-Fallback + HowTo Schema"],
        ["impressum.html", "Impressum"],
        ["datenschutz.html", "Datenschutzerkl\u00E4rung"],
        ["sitemap.xml", "4 URLs"],
        ["robots.txt", "Allow all + Sitemap-Verweis"],
        ["_redirects", "Clean URLs ohne .html"],
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
      sectionHeading("\U0001F4CA", "Kennzahlen (Tag 0 + Phase 1)"),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [4500, 4526],
        rows: [
          new TableRow({ children: [headerCell("Metrik", 4500), headerCell("Wert", 4526)] }),
          new TableRow({ children: [cell("Mottos (klassisch + Lizenz)", 4500), cell("14", 4526, { bold: true })] }),
          new TableRow({ children: [cell("Einzigartige Spiele", 4500), cell("72 (Birthday) + 90 (Schatzsuche) = 162", 4526, { bold: true })] }),
          new TableRow({ children: [cell("Altersgruppen", 4500), cell("3 (3\u20135 / 6\u20138 / 9\u201312)", 4526)] }),
          new TableRow({ children: [cell("Micro-Features", 4500), cell("5 live + 6 neue Features (Phase 1)", 4526, { bold: true, color: C.green })] }),
          new TableRow({ children: [cell("Affiliate-Links", 4500), cell("42 (NEU)", 4526, { bold: true, color: C.green })] }),
          new TableRow({ children: [cell("SEO-Seiten (programmatisch)", 4500), cell("0 (n\u00E4chster Sprint)", 4526, { color: C.orange })] }),
          new TableRow({ children: [cell("Affiliate-Revenue", 4500), cell("\u20AC0 (PartnerNet fehlt)", 4526, { color: C.red })] }),
          new TableRow({ children: [cell("Monatliche Kosten", 4500), cell("~\u20AC1", 4526)] }),
          new TableRow({ children: [cell("Strategie-Version", 4500), cell("v6.0 (Proof First)", 4526)] }),
          new TableRow({ children: [cell("Sparring-Runden", 4500), cell("5 + Stakeholder-Sparring (5 Agenten)", 4526, { bold: true, color: C.green })] }),
        ],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ══════════════════════════════════════════
      // ACCOUNTS
      // ══════════════════════════════════════════
      sectionHeading("\U0001F511", "Accounts"),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [2500, 3526, 3000],
        rows: [
          new TableRow({ children: [headerCell("Dienst", 2500), headerCell("Account", 3526), headerCell("Hinweis", 3000)] }),
          new TableRow({ children: [cell("INWX", 2500), cell("Privater Account", 3526), cell("Domain-Registrar", 3000)] }),
          new TableRow({ children: [cell("Cloudflare", 2500), cell("Cbollweg@gmx.de", 3526), cell("DNS, CDN, Email, sp\u00E4ter Worker", 3000)] }),
          new TableRow({ children: [cell("Netlify", 2500), cell("Christian Bollweg (privat)", 3526), cell("Hosting, Deploy", 3000)] }),
          new TableRow({ children: [cell("Google Search Console", 2500), cell("Privater Google-Account", 3526), cell("SEO-Monitoring", 3000)] }),
          new TableRow({ children: [cell("Amazon PartnerNet", 2500, { bold: true, color: C.red }), cell("NOCH NICHT BEANTRAGT", 3526, { bold: true, color: C.red }), cell("BLOCKER! N\u00E4chster Schritt!", 3000, { color: C.red, fill: C.redBg })] }),
        ],
      }),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // RECHTLICH
      // ══════════════════════════════════════════
      sectionHeading("\u2696\uFE0F", "Rechtlich"),
      ...[
        { s: "\u2713", t: "Impressum: Marie-Therese Bollweg, Immenseeweg 12a, 22149 Hamburg", c: C.green },
        { s: "\u2713", t: "Datenschutz: DSGVO-konform, Aufsichtsbeh\u00F6rde Hamburg, Cloudflare/Netlify/Google Fonts dokumentiert", c: C.green },
        { s: "\u2713", t: "E-Mail: kontakt@machsleicht.de (Cloudflare Routing)", c: C.green },
        { s: "\u2713", t: "Kleingewerbe: Ehefrau, Kleinunternehmerregelung", c: C.green },
        { s: "\u2713", t: "Affiliate-Datenschutz: Abschnitt 8 der Datenschutzerkl\u00E4rung vorbereitet", c: C.green },
        { s: "\u26A0", t: "Offen: Markenrecht-Check f\u00FCr Lizenz-Mottos (~\u20AC200\u2013400 Anwalt)", c: C.orange },
        { s: "\u26A0", t: "Offen: Cookie-Banner (Cookiebot) \u2014 aktuell keine eigenen Cookies", c: C.orange },
      ].map(({ s, t, c }) =>
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { after: 80 },
          children: [new TextRun({ text: s + " " + t, font: "Arial", size: 22, color: c })],
        })
      ),

      new Paragraph({ children: [] }),

      // ══════════════════════════════════════════
      // NEXT ACTIONS
      // ══════════════════════════════════════════
      sectionHeading("\U0001F3AF", "Sofort-Actions (Phase 2)"),
      ...[
        "Amazon PartnerNet beantragen (15 Min.) \u2014 BLOCKER f\u00FCr Monetarisierung",
        "OG-Image PNGs generieren (1\u20132 Std.) \u2014 BLOCKER f\u00FCr WhatsApp-Sharing",
        "Top 5 programmatische SEO-Seiten bauen (je 1\u20132 Std.)",
        "Spielkarten-PDF Generator implementieren (3\u20134 Std.)",
        "Email-Backend aufsetzen (Brevo Free, 4\u20136 Std.)",
      ].map((t, i) =>
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { after: 80 },
          children: [new TextRun({ text: t, font: "Arial", size: 22, color: i < 2 ? C.red : C.dark, bold: i < 2 })],
        })
      ),

      divider(),

      // Footer note
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [new TextRun({ text: "machsleicht.de | Status-Report | 21. M\u00E4rz 2026 | Session 1 + Phase 1 abgeschlossen", font: "Arial", size: 18, color: C.mid })],
      }),
    ],
  }],
});

const outPath = process.argv[2] || "machsleicht-Status-Report-v2.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("Created: " + outPath + " (" + buf.length + " bytes)");
});
