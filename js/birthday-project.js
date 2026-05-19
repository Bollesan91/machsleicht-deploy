/**
 * birthdayProject — lokaler State im Browser (machsleicht.de Hauptdomain)
 *
 * Stand: 2026-05-11 (P1-21)
 *
 * Zweck: Geburtstagsprojekt als gemeinsamer Kontext zwischen Planer, Schatzsuche,
 * Einladung und Partyseite. Wird im localStorage gehalten — kein Account, kein
 * Server-Token, keine Cross-Device-Synchronisation in Sprint 1.
 *
 * Wichtig:
 * - localStorage gilt nur fuer machsleicht.de. Die Partyseite (party.machsleicht.de)
 *   ist eine ANDERE Origin und kann NICHT auf birthdayProject zugreifen.
 *   Uebergabe an Partyseite erfolgt explizit per partyPayload an POST /api/create.
 * - Wenn localStorage blockiert oder voll: alle Tools funktionieren weiterhin OHNE
 *   Projekt-Persistenz. Kein Tool blockiert.
 *
 * Schema:
 *   {
 *     version: "1.0",
 *     createdAt, updatedAt, source,
 *     theme: { slug, label, emoji, color },
 *     child: { firstName, age },
 *     party: { guestCount, date, startTime, endTime, locationType, address },
 *     preferences: { durationMinutes, budgetLevel, materialLevel, indoorOutdoor },
 *     modules: {
 *       planner:    { status: "open"|"done"|"ready" },
 *       treasure:   { status: "open"|"suggested"|"done" },
 *       invitation: { status: "open"|"done" },
 *       partyPage:  { status: "open"|"done" },
 *       shopping:   { status: "ready"|"done" }
 *     }
 *   }
 *
 * API:
 *   BP.get()                      → Project | null
 *   BP.save(project)              → boolean (false wenn localStorage blockiert)
 *   BP.update(partial)            → Project (deep-merged + updatedAt aktualisiert)
 *   BP.create(initialData)        → Project (frische Defaults + Override)
 *   BP.reset()                    → void
 *   BP.toPartyPayload()           → Object fuer POST /api/create
 *   BP.isAvailable()              → boolean (localStorage funktional?)
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'machsleicht.birthdayProject.v1';

  function isAvailable() {
    try {
      var testKey = '__ml_test_' + Date.now();
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  function defaultProject() {
    var now = new Date().toISOString();
    return {
      version: '1.0',
      createdAt: now,
      updatedAt: now,
      source: 'planner',
      theme: { slug: '', label: '', emoji: '', color: '' },
      child: { firstName: '', age: null },
      party: {
        guestCount: null,
        date: '',
        startTime: '',
        endTime: '',
        locationType: '',
        address: ''
      },
      preferences: {
        durationMinutes: null,
        budgetLevel: '',
        materialLevel: '',
        indoorOutdoor: ''
      },
      modules: {
        planner:    { status: 'open' },
        treasure:   { status: 'open' },
        invitation: { status: 'open' },
        partyPage:  { status: 'open' },
        shopping:   { status: 'open' }
      }
    };
  }

  function get() {
    if (!isAvailable()) return null;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var p = JSON.parse(raw);
      if (!p || p.version !== '1.0') return null;
      return p;
    } catch (e) {
      return null;
    }
  }

  function save(project) {
    if (!isAvailable()) return false;
    if (!project || typeof project !== 'object') return false;
    try {
      project.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      return true;
    } catch (e) {
      return false;
    }
  }

  // Deep-merge (1 Level — fuer flache Sub-Objekte wie theme, child, party reicht das)
  function mergeDeep(target, source) {
    if (!source || typeof source !== 'object') return target;
    Object.keys(source).forEach(function(key) {
      var val = source[key];
      if (val && typeof val === 'object' && !Array.isArray(val) && target[key] && typeof target[key] === 'object') {
        mergeDeep(target[key], val);
      } else {
        target[key] = val;
      }
    });
    return target;
  }

  function update(partial) {
    var current = get() || defaultProject();
    mergeDeep(current, partial || {});
    save(current);
    return current;
  }

  function create(initialData) {
    var fresh = defaultProject();
    if (initialData) mergeDeep(fresh, initialData);
    save(fresh);
    return fresh;
  }

  function reset() {
    if (!isAvailable()) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  // Mapping: birthdayProject → partyPayload fuer POST /api/create
  function toPartyPayload() {
    var p = get();
    if (!p) return null;
    return {
      childName:  p.child.firstName || '',
      age:        p.child.age || null,
      motto:      p.theme.label || '',
      mottoEmoji: p.theme.emoji || '🎉',
      mottoColor: p.theme.color || '#D4812A',
      date:       p.party.date || '',
      time:       p.party.startTime || '',
      endTime:    p.party.endTime || '',
      address:    p.party.address || '',
      notes:      p.theme.slug ? (p.theme.label + '-Geburtstag von machsleicht') : '',
      askAllergies: true,
      askPickup:    true,
      wishes:       []
    };
  }

  // Browser-Export
  if (typeof window !== 'undefined') {
    window.BirthdayProject = {
      get: get,
      save: save,
      update: update,
      create: create,
      reset: reset,
      toPartyPayload: toPartyPayload,
      isAvailable: isAvailable,
      defaultProject: defaultProject,
      STORAGE_KEY: STORAGE_KEY
    };
  }

  // Node-Export (Tests)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      get: get,
      save: save,
      update: update,
      create: create,
      reset: reset,
      toPartyPayload: toPartyPayload,
      isAvailable: isAvailable,
      defaultProject: defaultProject,
      STORAGE_KEY: STORAGE_KEY
    };
  }
})();
