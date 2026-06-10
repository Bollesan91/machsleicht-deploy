#!/usr/bin/env node
/**
 * einladung-hub-gen — generiert SEO-Hub + Vorlagen-Seite pro Einladungs-Motto
 * aus kuratierten Daten-Files (P6-1 Rollout, Template = Piraten-Pilot 2026-06-10).
 *
 * Aufruf: node _dev/scripts/einladung-hub-gen/generate.js <data-file.js>
 * Beispiel: node _dev/scripts/einladung-hub-gen/generate.js _dev/scripts/einladung-hub-gen/wave-a.js
 *
 * Erwartet, dass die Gast-App bereits unter einladung/<slug>/whatsapp/index.html liegt
 * (vorher: git mv einladung/<slug>/index.html einladung/<slug>/whatsapp/index.html).
 *
 * Die FAQ wird aus EINEM Array sowohl sichtbar als auch als JSON-LD gerendert —
 * Wortgleichheit ist damit konstruktiv garantiert (Helfer-v3-Lesson HowTo-Drift).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function faqJsonLd(faq) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(q => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.aPlain || q.a }
    }))
  }, null, 2);
}

function breadcrumb(items) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it[0], item: 'https://machsleicht.de' + it[1]
    }))
  }, null, 2);
}

const SHARED_CSS = `*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',system-ui,sans-serif;background:#fdfcf9;color:#2D2319;min-height:100vh;line-height:1.6}
a{color:inherit;text-decoration:none}
header.top{text-align:center;margin-bottom:40px}
header.top a.back{display:inline-block;color:#8a7a6a;font-size:14px;margin-bottom:18px}
header.top a.back:hover{color:#E8873D}
.lead{font-size:17px;color:#4a3f35;max-width:620px;margin:0 auto 10px}
.trust{font-size:13px;color:#8a7a6a;margin-top:6px}
.cta{display:inline-block;background:#E8873D;color:#fff;padding:14px 28px;border-radius:99px;font-weight:600;font-size:15px;transition:background .2s}
.cta:hover{background:#C46A1D}
.info{background:#FFFAF5;border:1px solid #EDE6DE;border-radius:12px;padding:22px 24px;margin:32px 0}
.info h2{font-family:'Fraunces',serif;font-size:22px;font-weight:700;margin-bottom:10px;color:#1a1a1a}
.info p{font-size:15px;color:#4a3f35;margin-bottom:10px}
.info p:last-child{margin-bottom:0}
.info ul,.info ol{margin:10px 0 10px 22px;color:#4a3f35;font-size:15px}
.info li{margin-bottom:6px}
.info a.inline{color:#E8873D;font-weight:600}
footer.bottom{text-align:center;color:#8a7a6a;font-size:13px;margin-top:48px;padding-top:24px;border-top:1px solid #EDE6DE}
footer.bottom a{color:#6a5d50;margin:0 10px}
footer.bottom a:hover{color:#E8873D}`;

const HEAD_COMMON = (m) => `<meta name="theme-color" content="#FFFAF5">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://www.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&display=swap" rel="stylesheet">`;

const ANALYTICS = `<!-- Privacy-friendly analytics by Umami -->
<script defer src="https://cloud.umami.is/script.js" data-website-id="72b5eb12-dfde-4333-9bc7-0c2880864df2"></script>
<script>
// Shim: plausible()-Aufrufe zu umami.track() weiterleiten — Legacy-Code bleibt funktional
window.plausible=function(name,opts){if(window.umami){try{umami.track(name,(opts&&opts.props)||{})}catch(e){}}};
window.plausible.init=function(){};window.plausible.q=[];
</script>`;

function og(m, title, desc, url) {
  return `<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://machsleicht.de${url}">
<meta property="og:image" content="https://machsleicht.de/${m.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="mach'sleicht">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="https://machsleicht.de/${m.ogImage}">`;
}

function hubHtml(m) {
  const url = `/einladung/${m.slug}/`;
  const title = `${m.invName} Kindergeburtstag — mit Mini-Spiel im Handy`;
  const linkCards = [
    `      <a href="/kindergeburtstag/${m.slug}" class="linkcard">
        <strong>${m.emoji} ${m.planerName} planen</strong>
        <span>Spiele, Deko, Kuchen und Zeitplan — der komplette Planer fürs Motto.</span>
      </a>`
  ];
  if (m.hasSchatzsuche) {
    linkCards.push(`      <a href="/schatzsuche/${m.slug}" class="linkcard">
        <strong>🗺️ ${m.szName}</strong>
        <span>Fertige Schatzsuche mit Stationen und druckbarer Schatzkarte.</span>
      </a>`);
  } else {
    linkCards.push(`      <a href="/schatzsuche" class="linkcard">
        <strong>🗺️ Schatzsuche-Themen</strong>
        <span>Fertige Schatzsuchen mit Stationen und druckbarer Schatzkarte.</span>
      </a>`);
  }
  linkCards.push(`      <a href="/einladung" class="linkcard">
        <strong>💌 Alle Einladungs-Mottos</strong>
        <span>${m.otherMottosLine}</span>
      </a>`,
    `      <a href="/kindergeburtstag-einladung-text" class="linkcard">
        <strong>✍️ Einladungstexte allgemein</strong>
        <span>Vorlagen und Tipps für jedes Motto — was in jede Einladung gehört.</span>
      </a>`);

  const faqVisible = m.faq.map(q => `    <details>
      <summary>${q.q}</summary>
      <p>${q.a}</p>
    </details>`).join('\n');

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script>
// Alt-Link-Weiterleitung: frueher lag die Gast-App direkt auf /einladung/${m.slug}/.
// Bereits verschickte Einladungslinks UND Partyseiten-iframes (party-worker gameUrl,
// dort sind ort/tel absichtlich LEER wegen Adress-Gating) leiten sofort zur App weiter.
// Deshalb Praesenz-Check (has) statt Wert-Check.
(function(){var p=new URLSearchParams(location.search);if(p.has("name")&&p.has("date")&&p.has("time")){location.replace("/einladung/${m.slug}/whatsapp/"+location.search+location.hash);}})();
</script>
<title>${title}</title>
<meta name="description" content="${m.metaDesc}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="https://machsleicht.de${url}">
${og(m, title, m.ogDesc, url)}
${HEAD_COMMON(m)}
<script type="application/ld+json">
${breadcrumb([['Start', '/'], ['Einladung', '/einladung/'], [m.invName, url]])}
</script>
<script type="application/ld+json">
${faqJsonLd(m.faq)}
</script>
<style>
${SHARED_CSS}
.wrap{max-width:960px;margin:0 auto;padding:32px 20px 64px}
h1{font-family:'Fraunces',serif;font-size:clamp(30px,5vw,44px);font-weight:700;line-height:1.15;margin-bottom:14px;color:#1a1a1a}
.cta-row{margin:26px 0 10px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.cta-ghost{display:inline-block;background:#fff;color:#2D2319;border:2px solid #EDE6DE;padding:12px 26px;border-radius:99px;font-weight:600;font-size:15px;transition:border-color .2s}
.cta-ghost:hover{border-color:#E8873D}
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:18px 0 6px}
.step{background:#fff;border:1px solid #EDE6DE;border-radius:12px;padding:18px 16px}
.step .num{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:99px;background:#E8873D;color:#fff;font-weight:700;font-size:14px;margin-bottom:10px}
.step h3{font-family:'Fraunces',serif;font-size:17px;font-weight:700;margin-bottom:6px;color:#1a1a1a}
.step p{font-size:14px;color:#6a5d50}
.quote{background:#fff;border:1px dashed #E8873D;border-radius:12px;padding:16px 18px;margin:12px 0;font-size:14.5px;color:#4a3f35}
.quote .src{display:block;margin-top:6px;font-size:12px;color:#8a7a6a}
.faq details{background:#fff;border:1px solid #EDE6DE;border-radius:12px;padding:14px 18px;margin-bottom:10px}
.faq details[open]{border-color:#E8873D}
.faq summary{font-weight:600;font-size:15px;cursor:pointer;color:#1a1a1a}
.faq details p{font-size:14.5px;color:#4a3f35;margin-top:8px}
.linkrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:14px}
.linkcard{display:block;background:#fff;border:2px solid #EDE6DE;border-radius:12px;padding:16px;transition:border-color .2s}
.linkcard:hover{border-color:#E8873D}
.linkcard strong{display:block;font-size:15px;color:#1a1a1a;margin-bottom:4px}
.linkcard span{font-size:13px;color:#6a5d50}
</style>
</head>
<body>
<div class="wrap">
  <header class="top">
    <a href="/einladung" class="back">← Alle Einladungs-Mottos</a>
    <h1>${m.h1}</h1>
    <p class="lead">${m.lead}</p>
    <div class="cta-row">
      <a href="/einladung/erstellen?motto=${m.slug}" class="cta" data-umami-event="einladung-hub-create-cta" data-umami-event-motto="${m.slug}">${m.emoji} ${m.invName} erstellen →</a>
      <a href="/einladung/${m.slug}/whatsapp/" class="cta-ghost" data-umami-event="einladung-hub-demo-cta" data-umami-event-motto="${m.slug}">Demo ansehen</a>
    </div>
    <p class="trust">Die Demo zeigt eine Beispiel-Einladung — genau das sehen deine Gäste.</p>
  </header>

  <section class="info">
    <h2>So funktioniert's</h2>
    <div class="steps">
      <div class="step">
        <span class="num">1</span>
        <h3>Daten eintragen</h3>
        <p>Name des Kindes, Datum, Uhrzeit, Ort und deine WhatsApp-Nummer. Optional: ein Foto vom Geburtstagskind.</p>
      </div>
      <div class="step">
        <span class="num">2</span>
        <h3>Link verschicken</h3>
        <p>Du bekommst einen kurzen Link — den teilst du per WhatsApp, einzeln oder in der Eltern-Gruppe.</p>
      </div>
      <div class="step">
        <span class="num">3</span>
        <h3>Gäste spielen &amp; sagen zu</h3>
        <p>Jeder Gast spielt das ${m.gameShort}, sieht danach alle Party-Infos und sagt mit einem Tipp auf „Bin dabei!" per WhatsApp zu.</p>
      </div>
    </div>
  </section>

  <section class="info">
    <h2>Was deine Gäste erleben</h2>
    <p>${m.gameP1}</p>
    <p>${m.gameP2}</p>
  </section>

  <section class="info">
    <h2>${m.invName}stexte zum Abschreiben</h2>
    <p>Du verschickst lieber eine klassische Einladung auf Papier oder als einfache WhatsApp-Nachricht? Dann nimm einen unserer fertigen ${m.invName}stexte:</p>
    <div class="quote">„${m.quote}"<span class="src">— aus den ${m.mottoLabel}-Vorlagen</span></div>
    <p><a href="/einladung/${m.slug}/vorlagen/" class="inline">Alle ${m.invName}stexte ansehen →</a> — kurz, lang, gereimt und als WhatsApp-Version, zum Kopieren mit einem Klick.</p>
  </section>

  <section class="info">
    <h2>Privat &amp; ohne Konto</h2>
    <p>Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur das optionale Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht. Mehr dazu in der <a href="/datenschutz" class="inline">Datenschutzerklärung</a>.</p>
  </section>

  <section class="info faq">
    <h2>Häufige Fragen</h2>
${faqVisible}
  </section>

  <section class="info">
    <h2>Mehr für deinen ${m.planerName}</h2>
    <div class="linkrow">
${linkCards.join('\n')}
    </div>
  </section>

  <footer class="bottom">
    <a href="/">Start</a>·
    <a href="/einladung">Einladungen</a>·
    <a href="/kindergeburtstag">Kindergeburtstag-Planer</a>·
    <a href="/schatzsuche">Schatzsuche</a>·
    <a href="/datenschutz">Datenschutz</a>·
    <a href="/impressum">Impressum</a>
  </footer>
</div>
${ANALYTICS}
</body>
</html>
`;
}

function vorlagenHtml(m) {
  const url = `/einladung/${m.slug}/vorlagen/`;
  const title = `${m.mottoLabel}-Einladungstexte — 7 Vorlagen zum Kopieren`;

  const articles = m.vorlagen.map((v, i) => `  <article class="tpl">
    <h2>${i + 1}. ${v.h}</h2>
    <p class="meta">${v.meta}</p>
    <pre id="t${i + 1}">${esc(v.text)}</pre>
    <button class="copybtn" data-copy="t${i + 1}">Text kopieren</button>
  </article>`).join('\n\n');

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${m.vorlagenMetaDesc}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="https://machsleicht.de${url}">
${og(m, title, m.vorlagenOgDesc, url)}
${HEAD_COMMON(m)}
<script type="application/ld+json">
${breadcrumb([['Start', '/'], ['Einladung', '/einladung/'], [m.invName, `/einladung/${m.slug}/`], [`${m.mottoLabel}-Einladungstexte`, url]])}
</script>
<style>
${SHARED_CSS}
.wrap{max-width:760px;margin:0 auto;padding:32px 20px 64px}
h1{font-family:'Fraunces',serif;font-size:clamp(28px,5vw,40px);font-weight:700;line-height:1.15;margin-bottom:14px;color:#1a1a1a}
.lead{font-size:16px;color:#4a3f35;max-width:600px;margin:0 auto}
.tpl{background:#FFFAF5;border:1px solid #EDE6DE;border-radius:12px;padding:20px 22px;margin:22px 0}
.tpl h2{font-family:'Fraunces',serif;font-size:20px;font-weight:700;margin-bottom:4px;color:#1a1a1a}
.tpl .meta{font-size:13px;color:#8a7a6a;margin-bottom:12px}
.tpl pre{white-space:pre-wrap;font-family:inherit;font-size:14.5px;color:#4a3f35;background:#fff;border:1px dashed #d9cfc4;border-radius:10px;padding:14px 16px;margin-bottom:12px}
.copybtn{display:inline-block;background:#E8873D;color:#fff;border:none;padding:9px 20px;border-radius:99px;font-weight:600;font-size:13.5px;cursor:pointer;font-family:inherit;transition:background .2s}
.copybtn:hover{background:#C46A1D}
.copybtn.done{background:#3d8a4e}
.ctabox{background:#fff;border:2px solid #E8873D;border-radius:14px;padding:22px 24px;margin:32px 0;text-align:center}
.ctabox h2{font-family:'Fraunces',serif;font-size:21px;font-weight:700;margin-bottom:8px;color:#1a1a1a}
.ctabox p{font-size:14.5px;color:#4a3f35;margin-bottom:14px}
</style>
</head>
<body>
<div class="wrap">
  <header class="top">
    <a href="/einladung/${m.slug}/" class="back">← Zur ${m.invName}</a>
    <h1>${m.mottoLabel}-Einladungstexte zum Kopieren</h1>
    <p class="lead">7 fertige Vorlagen für die Einladung zum ${m.planerName} — kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Ersetze die {Platzhalter} durch eure Angaben, fertig.</p>
  </header>

${articles}

  <section class="info">
    <h2>Das gehört in jede Einladung</h2>
    <ul>
      <li><strong>Wer feiert</strong> — Name und neues Alter des Kindes</li>
      <li><strong>Wann</strong> — Datum und Uhrzeit, inklusive Abholzeit</li>
      <li><strong>Wo</strong> — Adresse oder Treffpunkt, bei Outdoor-Partys mit Schlechtwetter-Plan</li>
      <li><strong>Zusage</strong> — bis wann und auf welchem Weg (Telefonnummer oder WhatsApp)</li>
      <li><strong>Praktisches</strong> — Verkleidung ja/nein, Kleidung die schmutzig werden darf, Allergie-Rückfrage</li>
    </ul>
    <p>Verschick die Einladung etwa <strong>3 bis 4 Wochen vor der Party</strong> — früh genug für volle Terminkalender, kurz genug, dass sie nicht vergessen wird. Eine Zusage-Frist rund eine Woche vor der Party gibt dir Planungssicherheit für Essen und Mitgebsel.</p>
    <p>Mehr Tipps und Vorlagen für andere Mottos findest du unter <a href="/kindergeburtstag-einladung-text" class="inline">Einladungstexte für den Kindergeburtstag</a>.</p>
  </section>

  <div class="ctabox">
    <h2>Oder verschick die Einladung mit eingebautem Spiel</h2>
    <p>${m.ctaBoxText}</p>
    <a href="/einladung/erstellen?motto=${m.slug}" class="cta" data-umami-event="einladung-vorlagen-create-cta" data-umami-event-motto="${m.slug}">${m.emoji} ${m.invName} mit Spiel erstellen →</a>
  </div>

  <footer class="bottom">
    <a href="/">Start</a>·
    <a href="/einladung/${m.slug}/">${m.invName}</a>·
    <a href="/einladung">Alle Mottos</a>·
    <a href="/kindergeburtstag/${m.slug}">${m.planerName} planen</a>·
    <a href="/datenschutz">Datenschutz</a>·
    <a href="/impressum">Impressum</a>
  </footer>
</div>
${ANALYTICS}
<script>
// Copy-Buttons
document.querySelectorAll('.copybtn').forEach(function(btn){
  btn.addEventListener('click', function(){
    var el = document.getElementById(btn.getAttribute('data-copy'));
    if (!el) return;
    var done = function(){
      var old = btn.textContent;
      btn.textContent = '✓ Kopiert';
      btn.classList.add('done');
      window.plausible('vorlage-copy', {props: {motto: '${m.slug}', vorlage: btn.getAttribute('data-copy')}});
      setTimeout(function(){ btn.textContent = old; btn.classList.remove('done'); }, 2000);
    };
    var fallback = function(){
      var r = document.createRange(); r.selectNodeContents(el);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      try { if (document.execCommand('copy')) done(); } catch(e) {}
      s.removeAllRanges();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.textContent).then(done, fallback);
    } else {
      fallback();
    }
  });
});
</script>
</body>
</html>
`;
}

// ── Main ──
const dataFile = process.argv[2];
if (!dataFile) { console.error('Usage: node generate.js <data-file.js>'); process.exit(1); }
const mottos = require(path.resolve(dataFile));

for (const m of mottos) {
  const appOld = path.join(ROOT, 'einladung', m.slug, 'index.html');
  const appNew = path.join(ROOT, 'einladung', m.slug, 'whatsapp', 'index.html');
  if (!fs.existsSync(appNew)) {
    console.error(`SKIP ${m.slug}: App liegt noch nicht unter whatsapp/ — erst git mv ausführen.`);
    continue;
  }
  const vorlagenDir = path.join(ROOT, 'einladung', m.slug, 'vorlagen');
  fs.mkdirSync(vorlagenDir, { recursive: true });
  fs.writeFileSync(appOld, hubHtml(m));
  fs.writeFileSync(path.join(vorlagenDir, 'index.html'), vorlagenHtml(m));
  console.log(`OK ${m.slug}: Hub (${hubHtml(m).length} B) + Vorlagen (${vorlagenHtml(m).length} B)`);
}
