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
      modules: ['planner', 'invitation', 'party'],
      licenseRisk: 'none',
      treasureUrl: null,
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
      modules: ['planner', 'invitation'],
      licenseRisk: 'none',
      treasureUrl: null,
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

  // Browser-Exports
  if (typeof window !== 'undefined') {
    window.MACHSLEICHT_THEMES = THEMES;
    window.MACHSLEICHT_THEME_HELPERS = {
      themesWith: themesWith,
      getTheme: getTheme,
      hasModule: hasModule,
      slugs: Object.keys(THEMES)
    };
  }

  // Node-Exports (fuer Validator + Build-Scripts)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      THEMES: THEMES,
      themesWith: themesWith,
      getTheme: getTheme,
      hasModule: hasModule
    };
  }
})();
