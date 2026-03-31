#!/usr/bin/env node
/**
 * consolidate-age-pages.js
 *
 * Konsolidiert die einzelnen Motto-Alter-Seiten (z.B. dino-3-jahre.html, dino-4-jahre.html, dino-5-jahre.html)
 * zu Altersgruppen-Seiten (dino-3-5-jahre.html, dino-6-8-jahre.html, dino-9-12-jahre.html).
 *
 * Ablauf:
 * 1. Liest alle Einzel-Alter-Seiten pro Motto
 * 2. Extrahiert die einzigartigen Inhalte (Spiele, Deko, Kuchen)
 * 3. Erstellt konsolidierte Seiten mit mehr Content
 * 4. Generiert 301-Redirects für alte URLs
 */

const fs = require('fs');
const path = require('path');

const KG_DIR = path.join(__dirname, '..', '..', 'kindergeburtstag');
const REDIRECTS_FILE = path.join(__dirname, '..', '..', '_redirects');

// Motto-Konfiguration mit Emojis und Display-Namen
const MOTTOS = {
  'safari':       { emoji: '🦁', display: 'Safari-Abenteuer', ages: [3,4,5,6,7,8,9,10,11,12] },
  'dino':         { emoji: '🦕', display: 'Dino-Abenteuer', ages: [3,4,5,6,7,8,9,10,11,12] },
  'einhorn':      { emoji: '🦄', display: 'Einhorn-Zauber', ages: [3,4,5,6,7,8,9,10,11,12] },
  'feuerwehr':    { emoji: '🚒', display: 'Feuerwehr-Einsatz', ages: [3,4,5,6,7,8,9,10,11,12] },
  'frozen':       { emoji: '❄️', display: 'Frozen-Abenteuer', ages: [3,4,5,6,7,8,9,10,11,12] },
  'harry-potter': { emoji: '⚡', display: 'Harry-Potter-Zauber', ages: [3,4,5,6,7,8,9,10,11,12] },
  'meerjungfrau': { emoji: '🧜‍♀️', display: 'Meerjungfrauen-Welt', ages: [3,4,5,6,7,8,9,10,11,12] },
  'minecraft':    { emoji: '⛏️', display: 'Minecraft-Welt', ages: [3,4,5,6,7,8,9,10,11,12] },
  'ninjago':      { emoji: '🥷', display: 'Ninjago-Action', ages: [3,4,5,6,7,8,9,10,11,12] },
  'pferde':       { emoji: '🐴', display: 'Pferde-Abenteuer', ages: [3,4,5,6,7,8,9,10,11,12] },
  'piraten':      { emoji: '🏴‍☠️', display: 'Piraten-Abenteuer', ages: [3,4,5,6,7,8,9,10,11,12] },
  'pokemon':      { emoji: '⚡', display: 'Pokémon-Abenteuer', ages: [3,4,5,6,7,8,9,10,11,12] },
  'spider-man':   { emoji: '🕷️', display: 'Spider-Man-Action', ages: [3,4,5,6,7,8,9,10,11,12] },
  'super-mario':  { emoji: '🍄', display: 'Super-Mario-Welt', ages: [3,4,5,6,7,8,9,10,11,12] },
  'weltraum':     { emoji: '🚀', display: 'Weltraum-Mission', ages: [3,4,5,6,7,8,9,10,11,12] },
  'detektiv':     { emoji: '🔍', display: 'Detektiv-Fall', ages: [5,6,7,8,9,10,11,12] },
  'ritter':       { emoji: '⚔️', display: 'Ritter-Abenteuer', ages: [4,5,6,7,8,9,10,11,12] },
  'zirkus':       { emoji: '🎪', display: 'Zirkus-Show', ages: [3,4,5,6,7,8,9,10] },
  'baustelle':    { emoji: '🏗️', display: 'Baustelle-Abenteuer', ages: [3,4,5,6,7,8] },
  'paw-patrol':   { emoji: '🐾', display: 'PAW-Patrol-Mission', ages: [3,4,5,6,7] },
};

// Altersgruppen-Definition
const AGE_GROUPS = [
  { id: '3-5', label: '3–5 Jahre', ages: [3, 4, 5], labelShort: '3–5' },
  { id: '6-8', label: '6–8 Jahre', ages: [6, 7, 8], labelShort: '6–8' },
  { id: '9-12', label: '9–12 Jahre', ages: [9, 10, 11, 12], labelShort: '9–12' },
];

// ---- Content Extraction ----

function extractGameCards(html) {
  const games = [];
  const gameCardRegex = /<div class="game-card"[^>]*>([\s\S]*?)<\/div>\s*(?=<div class="game-card"|<\/ul>)/g;
  let match;
  while ((match = gameCardRegex.exec(html)) !== null) {
    const cardHtml = match[1];
    const nameMatch = cardHtml.match(/<h3[^>]*>([^<]+)<\/h3>/);
    const descMatch = cardHtml.match(/<p[^>]*style="font-size:14px[^"]*"[^>]*>([^<]+)<\/p>/);
    if (nameMatch) {
      let desc = descMatch ? descMatch[1].trim() : '';
      desc = desc.replace(/\s*Ein spannendes Spiel.*$/, '').trim();
      games.push({
        name: nameMatch[1].trim(),
        desc: desc,
        fullHtml: '<div class="game-card"' + match[0].substring(match[0].indexOf('>'))
      });
    }
  }
  return games;
}

function extractSection(html, sectionId) {
  // Extract text after a specific h2 section
  const patterns = {
    deko: /Deko f[^<]*<\/h2>\s*<p[^>]*>([^<]+)<\/p>/,
    mitgebsel: /Mitgebsel<\/h2>\s*<p[^>]*>([^<]+)<\/p>/,
    kuchen: /Kuchen-Idee[^<]*<\/h2>\s*<div class="card"><p[^>]*>([^<]+)<\/p>/,
  };
  const m = html.match(patterns[sectionId]);
  return m ? m[1].trim() : '';
}

function readPageContent(motto, age) {
  const filePath = path.join(KG_DIR, `${motto}-${age}-jahre.html`);
  if (!fs.existsSync(filePath)) return null;
  const html = fs.readFileSync(filePath, 'utf-8');
  return {
    age,
    games: extractGameCards(html),
    deko: extractSection(html, 'deko'),
    kuchen: extractSection(html, 'kuchen'),
    mitgebsel: extractSection(html, 'mitgebsel'),
    html
  };
}

// ---- Page Generation ----

function generateConsolidatedPage(motto, mottoConfig, ageGroup) {
  const { emoji, display } = mottoConfig;
  const { id, label, ages, labelShort } = ageGroup;

  // Collect content from all available ages in this group
  const availableAges = ages.filter(a => mottoConfig.ages.includes(a));
  if (availableAges.length === 0) return null;

  const pagesContent = availableAges.map(a => readPageContent(motto, a)).filter(Boolean);
  if (pagesContent.length === 0) return null;

  // Collect all unique games (deduplicate by name)
  const allGames = [];
  const seenGameNames = new Set();
  for (const page of pagesContent) {
    for (const game of page.games) {
      if (!seenGameNames.has(game.name)) {
        seenGameNames.add(game.name);
        allGames.push({ ...game, fromAge: page.age });
      }
    }
  }

  // Collect unique deko ideas
  const dekoIdeas = [...new Set(pagesContent.map(p => p.deko).filter(Boolean))];

  // Collect unique kuchen ideas
  const kuchenIdeas = [...new Set(pagesContent.map(p => p.kuchen).filter(Boolean))];

  // Mitgebsel (usually same)
  const mitgebsel = pagesContent[0].mitgebsel || '';

  // Use first page as style reference
  const refHtml = pagesContent[0].html;
  const styleMatch = refHtml.match(/<style>([\s\S]*?)<\/style>/);
  const css = styleMatch ? styleMatch[1] : '';

  // Determine other age groups for this motto (for cross-linking)
  const otherGroups = AGE_GROUPS.filter(g => {
    if (g.id === id) return false;
    return g.ages.some(a => mottoConfig.ages.includes(a));
  });

  // Pick 4 related mottos deterministically
  const mottoKeys = Object.keys(MOTTOS).filter(m => m !== motto);
  const hash = motto.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const related = [
    mottoKeys[(hash) % mottoKeys.length],
    mottoKeys[(hash + 5) % mottoKeys.length],
    mottoKeys[(hash + 10) % mottoKeys.length],
    mottoKeys[(hash + 15) % mottoKeys.length],
  ];

  const ageRangeText = `${availableAges[0]}–${availableAges[availableAges.length - 1]}`;
  const url = `https://machsleicht.de/kindergeburtstag/${motto}-${id}-jahre`;
  const gameCount = allGames.length;

  // Build game cards HTML — with enriched descriptions
  const gameCardsHtml = allGames.map(game => {
    // Capitalize first letter of description
    let desc = game.desc || '';
    if (desc.length > 0) desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    // Remove trailing period if missing
    if (desc.length > 0 && !desc.endsWith('.') && !desc.endsWith('!') && !desc.endsWith('?')) desc += '.';

    return `
      <div class="game-card" style="padding:16px;margin-bottom:12px;background:var(--bg);border:1px solid var(--l);border-radius:10px">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 6px;color:var(--d)">${game.name}</h3>
        <p style="font-size:14px;color:var(--m);margin:0 0 8px;line-height:1.6">${desc}</p>
        <span class="tag">${game.fromAge} Jahre</span>
      </div>`;
  }).join('\n');

  // Build deko HTML
  const dekoHtml = dekoIdeas.length > 1
    ? '<ul>' + dekoIdeas.map(d => `<li style="color:var(--d)">${d}</li>`).join('') + '</ul>'
    : `<p style="color:var(--d)">${dekoIdeas[0] || 'Passende Deko zum Motto'}</p>`;

  // Build kuchen HTML
  const kuchenHtml = kuchenIdeas.length > 1
    ? kuchenIdeas.map(k => `<div class="card"><p style="font-weight:700;color:var(--d);margin:0">${k}</p></div>`).join('')
    : `<div class="card"><p style="font-weight:700;color:var(--d);margin:0">${kuchenIdeas[0] || 'Passender Kuchen zum Motto'}</p></div>`;

  // Build age-group cross-links
  const crossLinksHtml = otherGroups.map(g =>
    `<a href="/kindergeburtstag/${motto}-${g.id}-jahre" class="cta" style="padding:10px 20px;font-size:13px;margin:4px">${display} — ${g.label}</a>`
  ).join('\n      ');

  // Build related mottos
  const relatedHtml = related.map(m => {
    const mc = MOTTOS[m];
    return `<a href="/kindergeburtstag/${m}" style="text-decoration:none;color:var(--d)">
        <div class="card" style="text-align:center;padding:14px">
          <span style="font-size:28px">${mc.emoji}</span>
          <p style="font-weight:700;margin:4px 0 2px;color:var(--d)">${mc.display}</p>
          <span style="font-size:12px;color:var(--m)">${mc.ages[0]}–${mc.ages[mc.ages.length-1]} Jahre</span>
        </div>
      </a>`;
  }).join('      ');

  // Schatzsuche links - thema mapping
  const themaMap = {
    'einhorn': 'feen', 'safari': 'dschungel', 'dino': 'dino',
    'piraten': 'piraten', 'weltraum': 'weltraum',
  };
  const schatzLink = themaMap[motto] ? `/schatzsuche?thema=${themaMap[motto]}` : '/schatzsuche';

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${display} Kindergeburtstag ${label} — ${gameCount} Spiele &amp; Ideen | machsleicht</title>
  <meta name="description" content="${display} Kindergeburtstag f&uuml;r ${label}: ${gameCount} altersgerechte Spiele, Deko-Ideen, Kuchen und Mitgebsel. Kompletter Plan in 10 Minuten mit machsleicht.">
  <meta property="og:title" content="${emoji} ${display} Kindergeburtstag — ${label}">
  <meta property="og:description" content="${display} Kindergeburtstag f&uuml;r ${label}: ${gameCount} altersgerechte Spiele, Deko-Ideen, Kuchen und Mitgebsel.">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#FFFAF5">
  <link rel="canonical" href="${url}">
  <script type="application/ld+json">
  {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "${display} Kindergeburtstag f&uuml;r ${label} planen",
  "description": "${display} Kindergeburtstag f&uuml;r ${label}: ${gameCount} altersgerechte Spiele, Deko-Ideen, Kuchen und Mitgebsel. Kompletter Plan in 10 Minuten mit machsleicht.",
  "step": [
    {"@type": "HowToStep", "name": "Motto w&auml;hlen", "text": "W&auml;hle ${display} als Motto f&uuml;r den Kindergeburtstag (${label})."},
    {"@type": "HowToStep", "name": "Spiele vorbereiten", "text": "Bereite ${gameCount} altersgerechte ${display}-Spiele f&uuml;r ${label} vor."},
    {"@type": "HowToStep", "name": "Deko &amp; Einkaufsliste", "text": "Besorge die ${display}-Deko und Mitgebsel."},
    {"@type": "HowToStep", "name": "Kuchen backen", "text": "Backe einen ${display}-Kuchen passend zum Motto."},
    {"@type": "HowToStep", "name": "Party feiern", "text": "Folge dem Zeitplan und genie&szlig; die Party!"}
  ],
  "tool": [{"@type": "HowToTool", "name": "machsleicht Kindergeburtstag-Planer"}],
  "totalTime": "PT10M"
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet">
  <style>${css}</style>
  <!-- Privacy-friendly analytics by Plausible -->
  <script async src="https://plausible.io/js/pa-2v7iyzPVQbQ8l6ya79jtE.js"></script>
  <script>
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
  </script>
</head>
<body>
<main>

  <header class="header">
    <a href="/kindergeburtstag"><span class="logo">mach's<span>leicht</span></span></a>
  </header>
  <nav class="breadcrumb"><a href="/kindergeburtstag">Start</a> &rsaquo; <a href="/#mottos">Mottos</a> &rsaquo; <a href="/kindergeburtstag/${motto}">${display}</a> &rsaquo; ${label}</nav>

  <p class="badge">Beliebtes Motto &middot; ${label}</p>
  <h1>${emoji} ${display} Kindergeburtstag — ${label}</h1>

  <p style="font-size:13px;color:var(--a);font-weight:600;margin-bottom:16px">20 Mottos &middot; 3–12 Jahre &middot; Kostenlos</p>
  <p style="font-size:16px;color:var(--d);line-height:1.7">Dein Kind wird ${ageRangeText}? Hier findest du die besten ${display}-Ideen f&uuml;r ${label} — ${gameCount} altersgerechte Spiele, passende Deko und Kuchen-Ideen, die begeistern.</p>

  <a href="/kindergeburtstag" class="cta">${display}-Geburtstag f&uuml;r ${label} planen &rarr;</a>

  <h2>${gameCount} ${display}-Spiele f&uuml;r ${label}</h2>
  <p>Diese Spiele sind genau auf ${label} abgestimmt — vom einfachen Einstieg bis zur echten Herausforderung. Jedes Spiel mit Altersempfehlung.</p>
  <ul>
${gameCardsHtml}
  </ul>

  <h2>Deko f&uuml;r den ${display}-Geburtstag (${label})</h2>
  ${dekoHtml}
  <p>Der machsleicht-Planer zeigt dir die komplette Einkaufsliste mit Preisen — <a href="/kindergeburtstag">jetzt ausprobieren</a>.</p>

  <h2>Mitgebsel</h2>
  <p style="color:var(--d)">${mitgebsel}</p>

  <h2>Kuchen-Ideen f&uuml;r ${label}</h2>
  ${kuchenHtml}

  <h2>Kompletten ${display}-Geburtstag planen — in 10 Minuten</h2>
  <p style="color:var(--d)">Du willst nicht einzelne Ideen zusammensuchen, sondern einen <strong>fertigen Plan</strong>? machsleicht erstellt dir in 10 Minuten einen kompletten ${display}-Geburtstag f&uuml;r ${label}: Zeitplan mit Uhrzeiten, altersgerechte Spiele mit Anleitung, Einkaufsliste mit Preisen und Kosten pro Kind.</p>
  <p style="color:var(--d)">Kostenlos. Ohne Anmeldung. Sofort loslegen.</p>
  <a href="/kindergeburtstag" class="cta">${display}-Geburtstag planen &rarr;</a>

  <a href="https://wa.me/?text=Schau%20mal:%20${encodeURIComponent(display)}%20Kindergeburtstag%20f%C3%BCr%20${encodeURIComponent(label)}%20-%20mit%20${gameCount}%20Spielen%20und%20komplettem%20Plan!%20${encodeURIComponent(url)}" target="_blank" rel="noopener" class="share-btn">&#x1F4AC; Idee per WhatsApp teilen</a>

  <h2>Du brauchst eine Schatzsuche?</h2>
  <p>machsleicht bietet eine eigene <a href="${schatzLink}">Schatzkarten-Engine</a>: Komplette Schatzsuche mit 5 Stationen, Eltern-Tipps und interaktiver Schatzkarte zum Ausdrucken.</p>
  <a href="${schatzLink}" style="display:inline-block;background:#E8873D;color:#fff;padding:10px 24px;border-radius:99px;font-weight:700;font-size:14px;text-decoration:none;margin:8px 0">Schatzsuche entdecken &rarr;</a>

  <h2>${display} f&uuml;r andere Altersgruppen</h2>
  <div style="display:flex;flex-wrap:wrap;gap:4px">
      <a href="/kindergeburtstag/${motto}" class="cta" style="padding:10px 20px;font-size:13px;margin:4px">${display} — &Uuml;bersicht</a>
      ${crossLinksHtml}
  </div>

  <div class="related">
    <h3>Weitere Motto-Ideen</h3>
    <div class="grid">
      ${relatedHtml}
    </div>
    <p style="text-align:center"><a href="/kindergeburtstag">Alle 20 Mottos im Planer ansehen &rarr;</a></p>
  </div>

  <footer>
    <p>&copy; 2026 machsleicht.de &middot; <a href="/impressum">Impressum</a> &middot; <a href="/datenschutz">Datenschutz</a> &middot; <a href="/schatzsuche">Schatzsuche</a></p>
    <p style="margin-top:8px"><a href="/kindergeburtstag">&larr; Zur&uuml;ck zum Planer</a></p>
  <div style="text-align:center;padding:32px 0;max-width:400px;margin:0 auto">
    <p style="font-family:'Fraunces',Georgia,serif;font-size:22px;font-weight:800;margin-bottom:8px">Das reicht. Wirklich.</p>
    <p style="font-size:14px;color:#6B5D52;line-height:1.6;margin-bottom:12px">Du brauchst keinen Pinterest-Marathon. Du brauchst einen Plan.</p>
  </div>
  </footer>

</main>
<script>
document.querySelectorAll('.copy-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    var block=btn.closest('.copy-block');var text=(block.querySelector('.copy-text')||block).textContent.trim();
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){btn.textContent='\\u2713 Kopiert';setTimeout(function(){btn.textContent='Kopieren'},2000)}).catch(function(){fallbackCopy(text,btn)});
    }else{fallbackCopy(text,btn)}
  });
});
function fallbackCopy(text,btn){var ta=document.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.focus();ta.select();try{document.execCommand('copy');btn.textContent='\\u2713 Kopiert'}catch(e){btn.textContent='Fehler'}document.body.removeChild(ta);setTimeout(function(){btn.textContent='Kopieren'},2000)}
</script>
<script>
(function(){
  var p = window.plausible || function(){};
  document.querySelectorAll('.cta, [data-cta="action"]').forEach(function(el){
    el.addEventListener('click', function(){
      p('cta-action', {props:{page:location.pathname, target:el.href||el.textContent.trim().substring(0,40)}});
    });
  });
  document.querySelectorAll('.cta-safety, [data-cta="safety"]').forEach(function(el){
    el.addEventListener('click', function(){
      p('cta-safety', {props:{page:location.pathname, target:el.textContent.trim().substring(0,40)}});
    });
  });
  document.querySelectorAll('a[rel*="sponsored"]').forEach(function(el){
    el.addEventListener('click', function(){
      p('affiliate-click', {props:{page:location.pathname, product:el.textContent.trim().substring(0,40)}});
    });
  });
})();
</script>
<p style="font-size:12px;color:#6B5D52;margin-top:24px;padding-top:12px;border-top:1px solid #EDE6DE;text-align:center;max-width:660px;margin-left:auto;margin-right:auto" class="no-print">
  * Affiliate-Link: Wenn du &uuml;ber diesen Link kaufst, erhalten wir eine kleine Provision. F&uuml;r dich &auml;ndert sich der Preis nicht.
</p>
<div id="sticky-cta" style="position:fixed;bottom:0;left:0;right:0;background:rgba(255,248,240,0.95);backdrop-filter:blur(8px);padding:10px 16px;text-align:center;border-top:1px solid #EDE6DE;z-index:100;display:none" class="no-print">
  <a href="/kindergeburtstag" class="cta" style="padding:10px 24px;font-size:14px">🎂 Jetzt planen →</a>
</div>
<script>if(window.innerWidth<=640){var s=document.getElementById('sticky-cta');window.addEventListener('scroll',function(){s.style.display=window.scrollY>300?'block':'none'})}</script>
</body>
</html>`;
}

// ---- Redirect Generation ----

function generateRedirects(motto, mottoConfig) {
  const redirects = [];
  for (const age of mottoConfig.ages) {
    // Find which age group this age belongs to
    const group = AGE_GROUPS.find(g => g.ages.includes(age));
    if (group) {
      redirects.push(`/kindergeburtstag/${motto}-${age}-jahre  /kindergeburtstag/${motto}-${group.id}-jahre  301`);
    }
  }
  return redirects;
}

// ---- Main ----

function main() {
  let totalCreated = 0;
  let totalRedirects = 0;
  const allRedirects = [];
  const newRedirectEntries = []; // for _redirects file

  console.log('=== Konsolidierung der Motto-Alter-Seiten ===\n');

  for (const [motto, config] of Object.entries(MOTTOS)) {
    console.log(`\n📋 ${config.emoji} ${config.display} (${motto})`);

    for (const ageGroup of AGE_GROUPS) {
      const availableAges = ageGroup.ages.filter(a => config.ages.includes(a));
      if (availableAges.length === 0) {
        console.log(`   ⏭️  ${ageGroup.label}: übersprungen (keine passenden Alter)`);
        continue;
      }

      const html = generateConsolidatedPage(motto, config, ageGroup);
      if (!html) {
        console.log(`   ⚠️  ${ageGroup.label}: konnte nicht generiert werden`);
        continue;
      }

      const filename = `${motto}-${ageGroup.id}-jahre.html`;
      const filePath = path.join(KG_DIR, filename);
      fs.writeFileSync(filePath, html, 'utf-8');
      console.log(`   ✅ ${filename} erstellt (${availableAges.length} Alter zusammengeführt)`);
      totalCreated++;

      // Add redirect entry for new consolidated page
      newRedirectEntries.push(`/kindergeburtstag/${motto}-${ageGroup.id}-jahre  /kindergeburtstag/${filename}  200`);
    }

    // Generate redirects from old individual pages
    const redirects = generateRedirects(motto, config);
    allRedirects.push(...redirects);
    totalRedirects += redirects.length;
    console.log(`   🔀 ${redirects.length} Redirects generiert`);
  }

  // Update _redirects file
  console.log('\n=== Aktualisiere _redirects ===');
  let redirectsContent = fs.readFileSync(REDIRECTS_FILE, 'utf-8');

  // Add new consolidated page routes (200 rewrites)
  const newRoutesBlock = '\n# === Konsolidierte Altersgruppen-Seiten ===\n' + newRedirectEntries.join('\n') + '\n';

  // Add 301 redirects from old individual pages
  const redirectsBlock = '\n# === 301-Redirects: Alte Einzel-Alter-Seiten → Konsolidierte Altersgruppen ===\n' + allRedirects.join('\n') + '\n';

  // Insert before the old individual age routes (we'll keep them commented out)
  // First, find and comment out old individual age routes
  const oldRouteLines = redirectsContent.split('\n');
  const newLines = [];
  let insertedNewRoutes = false;

  for (const line of oldRouteLines) {
    // Check if this is an old individual age route (e.g., /kindergeburtstag/dino-3-jahre)
    const oldAgeMatch = line.match(/^\/kindergeburtstag\/([a-z-]+)-(\d+)-jahre\s/);
    if (oldAgeMatch) {
      if (!insertedNewRoutes) {
        // Insert the new consolidated routes and 301 redirects before old routes
        newLines.push(newRoutesBlock);
        newLines.push(redirectsBlock);
        insertedNewRoutes = true;
      }
      // Skip old individual age routes (they're replaced by 301 redirects above)
      continue;
    }
    newLines.push(line);
  }

  if (!insertedNewRoutes) {
    // If we didn't find any old routes to replace, append at end
    newLines.push(newRoutesBlock);
    newLines.push(redirectsBlock);
  }

  fs.writeFileSync(REDIRECTS_FILE, newLines.join('\n'), 'utf-8');
  console.log(`✅ _redirects aktualisiert`);

  // Summary
  console.log('\n=== ZUSAMMENFASSUNG ===');
  console.log(`📄 ${totalCreated} konsolidierte Seiten erstellt`);
  console.log(`🔀 ${totalRedirects} 301-Redirects generiert`);
  console.log(`🗑️  ${totalRedirects} alte Einzel-Alter-Seiten können gelöscht werden`);
  console.log('\nNächster Schritt: Alte Einzel-Alter-Seiten löschen (separat ausführen)');
}

main();
