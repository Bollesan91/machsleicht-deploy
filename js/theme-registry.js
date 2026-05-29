/**
 * machsleicht Theme-Registry — Single Source of Truth fuer alle Mottos
 *
 * Stand: 2026-05-11 (P1-20)
 *
 * Konvention:
 * - slug:        URL-Param und Datei-Identifier ("?motto=feuerwehr", "/kindergeburtstag/feuerwehr.html")
 * - label:       sichtbarer Name ("Feuerwehr")
 * - emoji:       1-2 Zeichen, in URLs erlaubt
 * - color:       Hex-Format #RRGGBB, fuer Themes/Backgrounds
 * - modules:     wo das Motto verfuegbar ist
 *                  planner    = Kindergeburtstag-Planer (kindergeburtstag.html)
 *                  treasure   = Schatzsuche (schatzsuche/<motto>.html)
 *                  invitation = Einladungs-Tool (einladung/erstellen + einladung/<motto>)
 *                  party      = Partyseite Cloudflare Worker (party.machsleicht.de)
 *                  shopping   = Einkaufsliste-Paket (wenn vorhanden)
 * - licenseRisk: "none" = sicher | "low" = vorsichtig | "high" = nicht offiziell anbieten
 *                Aktueller Stand nach Cut 29.04.2026: alle aktiven Mottos = "none"
 *
 * Browser-Konsumption:
 *     <script src="/js/theme-registry.js"></script>
 *     dann: window.MACHSLEICHT_THEMES[slug]
 *
 * Migrations-Status:
 * - einladung/erstellen/index.html: eigene MOTTO_CONFIG. Slugs UND Farben + Emojis identisch mit Registry (verifiziert 2026-05-11).
 * - party-worker.js: eigene MOTTO_COLORS + THEMES. Slugs identisch, **Farben weichen ab** (bekannte Inkonsistenz):
 *     piraten:   Registry #FFD700 vs Worker #8B4513
 *     einhorn:   Registry #E1BEE7 vs Worker #E040A0
 *     dino:      Registry #66BB6A vs Worker #4CAF50
 *     feuerwehr: Registry #FF7043 vs Worker #D32F2F
 *   Worker zeigt diese Farben in der finalen Partyseite — also user-sichtbar.
 *   Migration: separates Ticket. Bis dahin: Registry-Farben gelten fuer Hauptdomain-Tools (Einladung, Planer).
 * - kindergeburtstag.html: data-motto Attribute, slugs identisch.
 * - schatzsuche.html (MVP P1-19): Quick-Links nutzen Registry-slugs.
 *
 * Aenderungen am Registry erfordern Verifikation/Migration in o.g. Stellen.
 */
(function() {
  'use strict';

  var THEMES = {
    feuerwehr: {
      slug: 'feuerwehr',
      label: 'Feuerwehr',
      emoji: '\u{1F692}',
      color: '#FF7043',
      modules: ['planner', 'treasure', 'invitation', 'party'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/feuerwehr',
      plannerUrl: '/kindergeburtstag/feuerwehr',
      invitationUrl: '/einladung/feuerwehr'
    },
    piraten: {
      slug: 'piraten',
      label: 'Piraten',
      emoji: '\u{1F3F4}‍☠️',
      color: '#FFD700',
      modules: ['planner', 'treasure', 'invitation', 'party'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/piraten',
      plannerUrl: '/kindergeburtstag/piraten',
      invitationUrl: '/einladung/piraten'
    },
    dino: {
      slug: 'dino',
      label: 'Dino',
      emoji: '\u{1F995}',
      color: '#66BB6A',
      modules: ['planner', 'treasure', 'invitation', 'party'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/dino',
      plannerUrl: '/kindergeburtstag/dino',
      invitationUrl: '/einladung/dino'
    },
    safari: {
      slug: 'safari',
      label: 'Safari',
      emoji: '\u{1F981}',
      color: '#FF9800',
      modules: ['planner', 'treasure', 'invitation', 'party'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/safari',
      plannerUrl: '/kindergeburtstag/safari',
      invitationUrl: '/einladung/safari'
    },
    weltraum: {
      slug: 'weltraum',
      label: 'Weltraum',
      emoji: '\u{1F680}',
      color: '#CE93D8',
      modules: ['planner', 'treasure', 'invitation', 'party'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/weltraum',
      plannerUrl: '/kindergeburtstag/weltraum',
      invitationUrl: '/einladung/weltraum'
    },
    detektiv: {
      slug: 'detektiv',
      label: 'Detektiv',
      emoji: '\u{1F50D}',
      color: '#78909C',
      modules: ['planner', 'treasure', 'invitation', 'party'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/detektiv',
      plannerUrl: '/kindergeburtstag/detektiv',
      invitationUrl: '/einladung/detektiv'
    },
    einhorn: {
      slug: 'einhorn',
      label: 'Einhorn',
      emoji: '\u{1F984}',
      color: '#E1BEE7',
      modules: ['planner', 'treasure', 'invitation', 'party'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/einhorn',
      plannerUrl: '/kindergeburtstag/einhorn',
      invitationUrl: '/einladung/einhorn'
    },
    superheld: {
      slug: 'superheld',
      label: 'Superheld',
      emoji: '\u{1F9B8}',
      color: '#EF5350',
      modules: ['invitation'],
      licenseRisk: 'none',
      treasureUrl: null,
      plannerUrl: null,
      invitationUrl: '/einladung/superheld'
    },
    prinzessin: {
      slug: 'prinzessin',
      label: 'Prinzessin',
      emoji: '\u{1F451}',
      color: '#F48FB1',
      modules: ['invitation'],
      licenseRisk: 'none',
      treasureUrl: null,
      plannerUrl: null,
      invitationUrl: '/einladung/prinzessin'
    },
    meerjungfrau: {
      slug: 'meerjungfrau',
      label: 'Meerjungfrau',
      emoji: '\u{1F9DC}‍♀️',
      color: '#4DD0E1',
      modules: ['planner', 'treasure', 'invitation', 'party'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/meerjungfrau',
      plannerUrl: '/kindergeburtstag/meerjungfrau',
      invitationUrl: '/einladung/meerjungfrau'
    },
    dschungel: {
      slug: 'dschungel',
      label: 'Dschungel',
      emoji: '\u{1F334}',
      color: '#43A047',
      modules: ['planner', 'treasure'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/dschungel',
      plannerUrl: '/kindergeburtstag/dschungel',
      invitationUrl: null
    },
    feen: {
      slug: 'feen',
      label: 'Feen',
      emoji: '\u{1F9DA}',
      color: '#CE93D8',
      modules: ['planner', 'treasure'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/feen',
      plannerUrl: '/kindergeburtstag/feen',
      invitationUrl: null
    },
    pferde: {
      slug: 'pferde',
      label: 'Pferde',
      emoji: '\u{1F434}',
      color: '#8D6E63',
      modules: ['planner', 'treasure'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/pferde',
      plannerUrl: '/kindergeburtstag/pferde',
      invitationUrl: null
    },
    ritter: {
      slug: 'ritter',
      label: 'Ritter',
      emoji: '⚔️',
      color: '#607D8B',
      modules: ['planner', 'treasure'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/ritter',
      plannerUrl: '/kindergeburtstag/ritter',
      invitationUrl: null
    },
    baustelle: {
      slug: 'baustelle',
      label: 'Baustelle',
      emoji: '\u{1F3D7}️',
      color: '#FFA726',
      modules: ['planner', 'treasure'],
      licenseRisk: 'none',
      treasureUrl: '/schatzsuche/baustelle',
      plannerUrl: '/kindergeburtstag/baustelle',
      invitationUrl: null
    }
  };

  // Helper-Funktionen
  function themesWith(module) {
    return Object.keys(THEMES).filter(function(s) {
      return THEMES[s].modules.indexOf(module) !== -1;
    }).map(function(s) { return THEMES[s]; });
  }

  function getTheme(slug) {
    return THEMES[slug] || null;
  }

  function hasModule(slug, module) {
    return !!(THEMES[slug] && THEMES[slug].modules.indexOf(module) !== -1);
  }

  // ========================================================================
  // WIZARD-OVERRIDES (P7-0, eingefuehrt 2026-05-29 nach Helfer-v3-Live-Audit)
  // ========================================================================
  //
  // Zweck: Zusatz-Felder die NUR der Wizard-Funnel braucht (Plan-Preview-First,
  // Plan-Editor, Einladung-Live-Preview). Bestehende Tools (Planer/Einladung/
  // Schatzsuche/Worker) NICHT betroffen — die nutzen weiter THEMES + ihre
  // eigenen Datenquellen (SZ_THEMES, GENERIC, MOTTO_CONFIG, MOTTO_COLORS).
  //
  // Wizard liest via getWizardTheme(slug) was {...THEMES[slug], ...WIZARD[slug]}
  // mergt. Inkonsistenz bei Farben: WIZARD-Felder gewinnen fuer Wizard-Display.
  //
  // Felder:
  //   accent:      Hauptakzent fuer Wizard-UI (oft = THEMES.color, aber tunable)
  //   accent2:     Sekundaer-Akzent (Gold, Pastel, etc. fuer Hero-Highlights)
  //   persona:     Singular-Subjekt fuer Plan-Texte ("Pirat", "Detektiv")
  //   darkAccent:  Dark-Background fuer Mini-Spiel-Preview (Live-Einladungs-Optik)
  //   wizardReady: true wenn Motto-Daten (SZ_THEMES, Planer-Spiele etc.) komplett
  //   inviteTpl:   { title, body } mit {name}/{age} Placeholdern
  //
  var WIZARD_OVERRIDES = {
    piraten:      {accent:'#1E3A5F', accent2:'#FFD700', persona:'Pirat',          darkAccent:'#1A1A2E', wizardReady:true,  inviteTpl:{title:'Ahoi, kleiner Pirat!',         body:'{name} wird {age} und feiert seinen Geburtstag als Piraten-Captain. Du bist Teil seiner Crew!'}},
    detektiv:     {accent:'#3D4751', accent2:'#F4B400', persona:'Detektiv',       darkAccent:'#1F2428', wizardReady:true,  inviteTpl:{title:'🤫 Top-Secret!',                body:'Detektiv {name} uebernimmt einen Fall — wir brauchen deine Hilfe!'}},
    einhorn:      {accent:'#C2185B', accent2:'#FCE4EC', persona:'Einhorn-Freund', darkAccent:'#2D0E1F', wizardReady:true,  inviteTpl:{title:'🌈 Magische Einladung',         body:'{name} wird {age} und laedt dich ins Einhorn-Reich ein!'}},
    safari:       {accent:'#795548', accent2:'#FFE0B2', persona:'Ranger',         darkAccent:'#2A1A0E', wizardReady:true,  inviteTpl:{title:'🦁 Safari-Expedition!',         body:'{name} wird {age} — komm mit auf grosse Safari ins Wilde!'}},
    feuerwehr:    {accent:'#C62828', accent2:'#FFCDD2', persona:'Feuerwehrkid',   darkAccent:'#1F0A0A', wizardReady:true,  inviteTpl:{title:'🚨 Alarm!',                     body:'{name} wird {age} — wir brauchen dich im Einsatzteam!'}},
    weltraum:     {accent:'#1A237E', accent2:'#B3E5FC', persona:'Astronaut',      darkAccent:'#0A0E2A', wizardReady:true,  inviteTpl:{title:'🚀 Mission Control',            body:'{name} wird {age} und braucht Crew fuer seine Weltraum-Mission!'}},
    prinzessin:   {accent:'#AD1457', accent2:'#FCE4EC', persona:'Hoheit',         darkAccent:'#2A0E1F', wizardReady:false, inviteTpl:{title:'👑 Koenigliche Einladung',     body:'{name} laedt zur Schloss-Feier ein — Hoheit, wir bitten Sie zur Audienz!'}},
    meerjungfrau: {accent:'#01579B', accent2:'#B3E5FC', persona:'Meerwesen',      darkAccent:'#0A1A2A', wizardReady:true,  inviteTpl:{title:'🧜 Aus der Tiefe',              body:'{name} laedt dich ein — tauch mit ab in das Reich der Meerjungfrauen!'}},
    dino:         {accent:'#2E7D32', accent2:'#C8E6C9', persona:'Dino-Forscher',  darkAccent:'#0E2A0E', wizardReady:true,  inviteTpl:{title:'🦖 Dinos gesichtet!',           body:'{name} wird {age} — Forscher gesucht fuer die Saurier-Expedition!'}},
    superheld:    {accent:'#1565C0', accent2:'#FFD600', persona:'Superheld',      darkAccent:'#0A1A2A', wizardReady:false, inviteTpl:{title:'🦸 Super-Mission!',             body:'{name} wird {age} — die Welt braucht deine Hilfe als Superheld!'}},
    dschungel:    {accent:'#33691E', accent2:'#DCEDC8', persona:'Dschungel-Forscher', darkAccent:'#0E1F0E', wizardReady:true, inviteTpl:{title:'🐒 Dschungel-Abenteuer!',    body:'{name} wird {age} — komm mit auf Expedition!'}},
    feen:         {accent:'#7B1FA2', accent2:'#F3E5F5', persona:'Feen-Freund',    darkAccent:'#1F0A2A', wizardReady:true,  inviteTpl:{title:'🧚 Feenwald laedt ein!',        body:'{name} wird {age} und laedt dich in das Reich der Feen!'}},
    pferde:       {accent:'#5D4037', accent2:'#D7CCC8', persona:'Pferdefreund',   darkAccent:'#1F0E0E', wizardReady:true,  inviteTpl:{title:'🐴 Sattelt die Pferde!',        body:'{name} wird {age} — komm zur grossen Reiter-Party!'}},
    ritter:       {accent:'#37474F', accent2:'#CFD8DC', persona:'Ritter',         darkAccent:'#0E1418', wizardReady:true,  inviteTpl:{title:'⚔️ Ritterschwur',               body:'{name} wird {age} — du wirst zum Ritter geschlagen!'}},
    baustelle:    {accent:'#E65100', accent2:'#FFE0B2', persona:'Bauarbeiter',    darkAccent:'#2A1A0E', wizardReady:true,  inviteTpl:{title:'🚧 Baustelle!',                 body:'{name} wird {age} — du bist im Bautrupp dabei!'}}
  };

  function getWizardTheme(slug) {
    if (!THEMES[slug]) return null;
    var base = THEMES[slug];
    var wiz  = WIZARD_OVERRIDES[slug] || {};
    return {
      slug: base.slug, label: base.label, emoji: base.emoji, color: base.color,
      modules: base.modules, licenseRisk: base.licenseRisk,
      treasureUrl: base.treasureUrl, plannerUrl: base.plannerUrl, invitationUrl: base.invitationUrl,
      // Wizard-Felder (fallback zu base.color wenn nichts da)
      accent:      wiz.accent      || base.color,
      accent2:     wiz.accent2     || base.color,
      persona:     wiz.persona     || base.label,
      darkAccent:  wiz.darkAccent  || '#1A1A2E',
      wizardReady: wiz.wizardReady === true,
      inviteTpl:   wiz.inviteTpl   || {title:base.emoji+' '+base.label+'!', body:'{name} wird {age} und feiert '+base.label+'-Geburtstag!'}
    };
  }

  function wizardReadySlugs() {
    return Object.keys(WIZARD_OVERRIDES).filter(function(s) { return WIZARD_OVERRIDES[s].wizardReady === true; });
  }

  // Browser-Exports
  if (typeof window !== 'undefined') {
    window.MACHSLEICHT_THEMES = THEMES;
    window.MACHSLEICHT_WIZARD_OVERRIDES = WIZARD_OVERRIDES;
    window.MACHSLEICHT_THEME_HELPERS = {
      themesWith: themesWith,
      getTheme: getTheme,
      hasModule: hasModule,
      getWizardTheme: getWizardTheme,
      wizardReadySlugs: wizardReadySlugs,
      slugs: Object.keys(THEMES)
    };
  }

  // Node-Exports (fuer Validator + Build-Scripts)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      THEMES: THEMES,
      WIZARD_OVERRIDES: WIZARD_OVERRIDES,
      themesWith: themesWith,
      getTheme: getTheme,
      hasModule: hasModule,
      getWizardTheme: getWizardTheme,
      wizardReadySlugs: wizardReadySlugs
    };
  }
})();
