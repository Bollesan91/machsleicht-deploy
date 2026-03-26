import React, { useState, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════
// KONSTANTEN
// ═══════════════════════════════════════════════════════════════════

// ── SPARRING MODI ──
const SPARRING_MODES = [
  { key: "page", label: "Page", icon: "🌐", desc: "Einzelne Seite bewerten & baubar machen" },
  { key: "strategy", label: "Strategie", icon: "♟️", desc: "Grundsatzentscheidungen sparren" },
  { key: "funnel", label: "Funnel", icon: "🔄", desc: "Conversion-Pfade optimieren" },
  { key: "content", label: "Content", icon: "✍️", desc: "Inhaltsstücke sparren & verbessern" },
  { key: "motto", label: "Motto-Seite", icon: "🎂", desc: "Machsleicht Motto-Seite bewerten & optimieren" },
];

const MODE_PERSPECTIVES = {
  page: [
    { key: "ux_ui", label: "UX/UI", icon: "👤", dims: ["Klarheit", "User Flow", "Accessibility"] },
    { key: "design", label: "Design", icon: "🎨", dims: ["Hierarchie", "Brand", "Emotion"] },
    { key: "seo", label: "SEO", icon: "🔍", dims: ["Keywords", "Technik", "Struktur"] },
    { key: "cto", label: "CTO", icon: "🛠️", dims: ["Skalierung", "Performance", "Wartung"] },
    { key: "ceo", label: "CEO", icon: "👔", dims: ["Alignment", "ROI", "Vision"] },
    { key: "coo", label: "COO", icon: "⚙️", dims: ["Machbarkeit", "Ressourcen", "Zeitplan"] },
    { key: "marketing", label: "Marketing", icon: "📣", dims: ["Conversion", "Clarity", "Channels"] },
    { key: "product", label: "Product", icon: "📋", dims: ["User Stories", "MVP", "Iteration"] },
    { key: "legal", label: "Legal", icon: "⚖️", dims: ["Compliance", "Datenschutz", "AGB"] },
    { key: "qa", label: "QA", icon: "🧪", dims: ["Testbarkeit", "Edge Cases", "Errors"] },
    { key: "finance", label: "Finance", icon: "💰", dims: ["Kosten", "Revenue", "Budget"] },
  ],
  strategy: [
    { key: "market", label: "Markt", icon: "🌍", dims: ["Marktgröße", "Wachstum", "Timing"] },
    { key: "competition", label: "Wettbewerb", icon: "⚔️", dims: ["Differenzierung", "Eintrittsbarrieren", "Positionierung"] },
    { key: "customer", label: "Kunde", icon: "🎯", dims: ["Schmerzpunkt", "Zahlungsbereitschaft", "Erreichbarkeit"] },
    { key: "finance_strat", label: "Finanzen", icon: "💰", dims: ["Investition", "ROI-Horizont", "Cashflow"] },
    { key: "team", label: "Team", icon: "👥", dims: ["Kompetenz", "Kapazität", "Kultur-Fit"] },
    { key: "timing", label: "Timing", icon: "⏰", dims: ["Dringlichkeit", "Abhängigkeiten", "Opportunitätskosten"] },
    { key: "risk", label: "Risiko", icon: "⚠️", dims: ["Eintrittsrisiko", "Schadenshöhe", "Mitigation"] },
    { key: "scalability", label: "Skalierung", icon: "📈", dims: ["Wachstumspfad", "Automatisierung", "Bottlenecks"] },
    { key: "brand", label: "Marke", icon: "✨", dims: ["Passung", "Wahrnehmung", "Langfristwirkung"] },
  ],
  funnel: [
    { key: "awareness", label: "Awareness", icon: "📢", dims: ["Reichweite", "Kanalmix", "Erstkontakt-Qualität"] },
    { key: "interest", label: "Interest", icon: "🔍", dims: ["Hook-Stärke", "Content-Relevanz", "Verweildauer"] },
    { key: "consideration", label: "Consideration", icon: "🤔", dims: ["Vertrauensaufbau", "Vergleichbarkeit", "Social Proof"] },
    { key: "decision", label: "Decision", icon: "✅", dims: ["CTA-Klarheit", "Einwandbehandlung", "Dringlichkeit"] },
    { key: "action", label: "Action", icon: "🎯", dims: ["Conversion-Flow", "Formular-UX", "Zahlungsprozess"] },
    { key: "retention", label: "Retention", icon: "🔄", dims: ["Onboarding", "Re-Engagement", "Loyalty"] },
    { key: "referral", label: "Referral", icon: "📣", dims: ["Empfehlbarkeit", "Sharing-Trigger", "Viralität"] },
    { key: "analytics", label: "Analytics", icon: "📊", dims: ["Tracking-Setup", "KPI-Klarheit", "Optimierungspotential"] },
  ],
  content: [
    { key: "relevance", label: "Relevanz", icon: "🎯", dims: ["Zielgruppen-Fit", "Aktualität", "Suchintention"] },
    { key: "quality", label: "Qualität", icon: "✍️", dims: ["Tiefe", "Originalität", "Quellenlage"] },
    { key: "structure", label: "Struktur", icon: "📐", dims: ["Gliederung", "Scanbarkeit", "Lesefluss"] },
    { key: "seo_content", label: "SEO", icon: "🔍", dims: ["Keyword-Integration", "Interne Verlinkung", "Snippet-Optimierung"] },
    { key: "tonality", label: "Tonalität", icon: "🎭", dims: ["Brand Voice", "Zielgruppen-Ansprache", "Emotionalität"] },
    { key: "cta_content", label: "CTA", icon: "📈", dims: ["Handlungsaufforderung", "Platzierung", "Relevanz zum Content"] },
    { key: "shareability", label: "Teilbarkeit", icon: "📣", dims: ["Headline-Stärke", "Visual-Potential", "Diskussionswert"] },
    { key: "trust", label: "Vertrauen", icon: "🛡️", dims: ["Expertenstatus", "Belege", "Transparenz"] },
  ],
  motto: [
    { key: "seo_discover", label: "SEO & Discoverability", icon: "🔍", dims: ["Onpage Strength", "Search Intent Fit", "Internal Linking Value"] },
    { key: "content_trust", label: "Content & Trust", icon: "📝", dims: ["Elternnähe", "Motto-Tiefe", "Konkretheit"] },
    { key: "ux_conversion", label: "UX & Conversion", icon: "📱", dims: ["Scanbarkeit", "CTA-Klarheit", "Output-Verständlichkeit"] },
    { key: "budget_reality", label: "Budget & Reality", icon: "💰", dims: ["Kostenklarheit", "Spar-Hebel sichtbar", "Realistische Umsetzbarkeit"] },
  ],
};

function getPerspectives(sparringMode) {
  return MODE_PERSPECTIVES[sparringMode] || MODE_PERSPECTIVES.page;
}

const PROJECT_TYPES = [
  { key: "custom", label: "Alle gleich",
    weights: { ux_ui: 1, design: 1, seo: 1, cto: 1, ceo: 1, coo: 1, marketing: 1, product: 1, legal: 1, qa: 1, finance: 1 } },
  { key: "seo_relaunch", label: "SEO Relaunch",
    weights: { ux_ui: 1, design: 0.7, seo: 1.5, cto: 1.2, ceo: 0.8, coo: 1, marketing: 1.3, product: 0.8, legal: 0.7, qa: 1, finance: 0.8 } },
  { key: "conversion", label: "Conversion",
    weights: { ux_ui: 1.5, design: 1.3, seo: 1, cto: 0.8, ceo: 1, coo: 0.8, marketing: 1.5, product: 1.2, legal: 0.7, qa: 1, finance: 1 } },
  { key: "redesign", label: "Redesign",
    weights: { ux_ui: 1.5, design: 1.5, seo: 1, cto: 1.2, ceo: 1, coo: 1, marketing: 1, product: 1.2, legal: 0.7, qa: 1, finance: 0.8 } },
  { key: "compliance", label: "DSGVO / Legal",
    weights: { ux_ui: 0.8, design: 0.5, seo: 0.7, cto: 1.2, ceo: 0.8, coo: 1, marketing: 0.7, product: 0.8, legal: 1.5, qa: 1.3, finance: 1 } },
  { key: "new_feature", label: "Neues Feature",
    weights: { ux_ui: 1.3, design: 1, seo: 0.8, cto: 1.3, ceo: 1, coo: 1.2, marketing: 1, product: 1.5, legal: 1, qa: 1.3, finance: 1 } },
  { key: "content", label: "Content-Strategie",
    weights: { ux_ui: 1, design: 0.8, seo: 1.5, cto: 0.6, ceo: 1, coo: 0.8, marketing: 1.5, product: 1, legal: 0.8, qa: 0.7, finance: 0.8 } },
  { key: "machsleicht_motto", label: "Machsleicht Motto",
    weights: { seo_discover: 1.2, content_trust: 1.3, ux_conversion: 1.4, budget_reality: 1.1 } },
];

const SCORE_COLORS = {
  1: "#dc2626", 2: "#dc2626", 3: "#ef4444",
  4: "#f97316", 5: "#f59e0b", 6: "#eab308",
  7: "#84cc16", 8: "#22c55e", 9: "#16a34a", 10: "#15803d"
};

const SCORE_COLORS_5 = {
  1: "#dc2626", 2: "#f97316", 3: "#f59e0b", 4: "#84cc16", 5: "#22c55e"
};

const EXEC_SCORES = [
  { key: "clarity", label: "Clarity", icon: "🎯", desc: "Wie schnell versteht der Nutzer das Angebot?" },
  { key: "conversion_potential", label: "Conversion", icon: "📈", desc: "Wie wahrscheinlich ist gewünschtes Verhalten?" },
  { key: "build_efficiency", label: "Build Efficiency", icon: "⚡", desc: "Wie schnell und sauber umsetzbar?" },
  { key: "risk_level", label: "Risk Level", icon: "⚠️", desc: "Wie viele Risiken bleiben?" },
  { key: "strategic_fit", label: "Strategic Fit", icon: "🧭", desc: "Passt es zu Ziel, Marke, Business?" },
];

const MOTTO_EXEC_SCORES = [
  { key: "parent_utility", label: "Parent Utility", icon: "👨‍👩‍👧", desc: "Ist die Seite für echte Eltern sofort brauchbar?" },
  { key: "seo_readiness", label: "SEO Readiness", icon: "🔍", desc: "Ist die Seite technisch und inhaltlich für Google bereit?" },
  { key: "conversion_readiness", label: "Conversion Readiness", icon: "📈", desc: "Führt die Seite zu einer Handlung?" },
  { key: "production_readiness", label: "Production Readiness", icon: "🚀", desc: "Kann die optimierte Version direkt live gehen?" },
];

function getExecScores(sparringMode) {
  return sparringMode === "motto" ? MOTTO_EXEC_SCORES : EXEC_SCORES;
}

const READINESS_KEYS = [
  { key: "decision_readiness", label: "Decision Ready", desc: "Kann man jetzt entscheiden?" },
  { key: "build_readiness", label: "Build Ready", desc: "Kann Dev/Design direkt loslegen?" },
  { key: "launch_readiness", label: "Launch Ready", desc: "Ist es live-fähig?" },
];

const VERDICT_CONFIG = {
  go: { label: "GO", color: "#22c55e", bg: "#16a34a22", border: "#16a34a44", desc: "Direkt bauen." },
  go_with_changes: { label: "GO WITH CHANGES", color: "#f59e0b", bg: "#f59e0b22", border: "#f59e0b44", desc: "Bauen, aber Änderungen einarbeiten." },
  needs_revision: { label: "NEEDS REVISION", color: "#f97316", bg: "#f9731622", border: "#f9731644", desc: "Nochmal überarbeiten vor Build." },
  do_not_build: { label: "DO NOT BUILD", color: "#ef4444", bg: "#dc262622", border: "#dc262644", desc: "Grundrichtung überdenken." },
};

const AMPEL = { green: "#22c55e", yellow: "#f59e0b", red: "#ef4444" };

const OWNER_TYPES = {
  copy: { label: "Copy", color: "#f59e0b" }, design: { label: "Design", color: "#ec4899" },
  dev: { label: "Dev", color: "#3b82f6" }, seo: { label: "SEO", color: "#22c55e" },
  legal: { label: "Legal", color: "#a855f7" }, qa: { label: "QA", color: "#06b6d4" },
  founder: { label: "Founder", color: "#f97316" },
};

// ═══════════════════════════════════════════════════════════════════
// DETERMINISTIC RULE ENGINE
// ═══════════════════════════════════════════════════════════════════

const RULE_SEVERITY = { critical: { label: "Kritisch", color: "#ef4444", icon: "🔴" }, warning: { label: "Warnung", color: "#f59e0b", icon: "🟡" }, info: { label: "Tipp", color: "#3b82f6", icon: "🔵" } };

const RULE_CHECKS = [
  // ── Crawl-basiert (IST-Zustand) — nur page & funnel ──
  { id: "h1_exists", label: "H1 vorhanden", severity: "critical", source: "crawl", modes: ["page", "funnel", "content"],
    check: (crawl) => { const m = crawl.match(/<h1[\s>]/gi); return { pass: m && m.length >= 1, detail: m ? `${m.length} H1 gefunden` : "Keine H1 gefunden" }; } },
  { id: "h1_single", label: "Nur eine H1", severity: "warning", source: "crawl", modes: ["page", "funnel", "content"],
    check: (crawl) => { const m = crawl.match(/<h1[\s>]/gi); return { pass: !m || m.length <= 1, detail: m ? `${m.length} H1 Tags` : "Keine H1" }; } },
  { id: "title_exists", label: "Title-Tag vorhanden", severity: "critical", source: "crawl", modes: ["page", "funnel", "content"],
    check: (crawl) => { const m = crawl.match(/<title[^>]*>([^<]+)<\/title>/i); return { pass: !!m, detail: m ? `"${m[1].substring(0, 60)}"` : "Kein Title-Tag" }; } },
  { id: "title_length", label: "Title-Tag Länge (50-60 Z.)", severity: "warning", source: "crawl", modes: ["page", "content"],
    check: (crawl) => { const m = crawl.match(/<title[^>]*>([^<]+)<\/title>/i); if (!m) return { pass: false, detail: "Kein Title" }; const len = m[1].trim().length; return { pass: len >= 50 && len <= 60, detail: `${len} Zeichen${len < 50 ? " (zu kurz)" : len > 60 ? " (zu lang)" : ""}` }; } },
  { id: "meta_desc_exists", label: "Meta-Description vorhanden", severity: "critical", source: "crawl", modes: ["page", "content"],
    check: (crawl) => { const m = crawl.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || crawl.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i); return { pass: !!m, detail: m ? `${m[1].length} Zeichen` : "Keine Meta-Description" }; } },
  { id: "meta_desc_length", label: "Meta-Description Länge (120-160 Z.)", severity: "warning", source: "crawl", modes: ["page", "content"],
    check: (crawl) => { const m = crawl.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || crawl.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i); if (!m) return { pass: false, detail: "Keine Meta-Description" }; const len = m[1].length; return { pass: len >= 120 && len <= 160, detail: `${len} Zeichen${len < 120 ? " (zu kurz)" : len > 160 ? " (zu lang)" : ""}` }; } },
  { id: "img_alt", label: "Bilder mit Alt-Text", severity: "warning", source: "crawl", modes: ["page"],
    check: (crawl) => { const imgs = crawl.match(/<img[^>]*>/gi) || []; const noAlt = imgs.filter(i => !i.match(/alt=["'][^"']+["']/i)); return { pass: noAlt.length === 0, detail: imgs.length === 0 ? "Keine Bilder" : `${noAlt.length} von ${imgs.length} ohne Alt-Text` }; } },
  { id: "form_fields", label: "Formularfelder ≤ 7", severity: "warning", source: "crawl", modes: ["page", "funnel"],
    check: (crawl) => { const inputs = crawl.match(/<input[^>]+type=["'](?!hidden|submit|button)[^"']*["'][^>]*>/gi) || []; const textareas = crawl.match(/<textarea/gi) || []; const total = inputs.length + textareas.length; return { pass: total <= 7, detail: `${total} sichtbare Felder${total > 7 ? " (zu viele → Conversion sinkt)" : ""}` }; } },
  { id: "viewport_meta", label: "Viewport Meta (Mobile)", severity: "critical", source: "crawl", modes: ["page", "funnel"],
    check: (crawl) => { const m = crawl.match(/<meta[^>]+name=["']viewport["']/i); return { pass: !!m, detail: m ? "Viewport gesetzt" : "Kein Viewport Meta → nicht mobil-optimiert" }; } },
  { id: "canonical", label: "Canonical-Tag vorhanden", severity: "info", source: "crawl", modes: ["page", "content"],
    check: (crawl) => { const m = crawl.match(/<link[^>]+rel=["']canonical["']/i); return { pass: !!m, detail: m ? "Canonical gesetzt" : "Kein Canonical-Tag" }; } },
  { id: "lang_attr", label: "HTML lang-Attribut", severity: "info", source: "crawl", modes: ["page"],
    check: (crawl) => { const m = crawl.match(/<html[^>]+lang=["']([^"']+)["']/i); return { pass: !!m, detail: m ? `lang="${m[1]}"` : "Kein lang-Attribut" }; } },

  // ── Page Build-Output ──
  { id: "bo_headline", label: "Headline vorhanden", severity: "critical", source: "build", modes: ["page", "funnel", "content"],
    check: (_, bo) => { const h = bo?.copy_blueprint?.headline; return { pass: !!(h?.text?.trim()), detail: h?.text ? `"${h.text.substring(0, 50)}"` : "Keine Headline definiert" }; } },
  { id: "bo_headline_length", label: "Headline ≤ 70 Zeichen", severity: "warning", source: "build", modes: ["page", "content"],
    check: (_, bo) => { const t = bo?.copy_blueprint?.headline?.text || ""; return { pass: t.length <= 70, detail: `${t.length} Zeichen${t.length > 70 ? " (zu lang für H1)" : ""}` }; } },
  { id: "bo_cta_primary", label: "Primärer CTA definiert", severity: "critical", source: "build", modes: ["page", "funnel", "content"],
    check: (_, bo) => { const c = bo?.copy_blueprint?.cta_primary; return { pass: !!(c?.text?.trim()), detail: c?.text ? `"${c.text}"` : "Kein primärer CTA" }; } },
  { id: "bo_blocks_exist", label: "Blockstruktur definiert (≥ 3)", severity: "critical", source: "build", modes: ["page"],
    check: (_, bo) => { const len = bo?.block_structure?.length || 0; return { pass: len >= 3, detail: `${len} Blöcke${len < 3 ? " (zu wenig)" : ""}` }; } },
  { id: "bo_hero_first", label: "Erster Block ist Hero/Above-the-fold", severity: "warning", source: "build", modes: ["page"],
    check: (_, bo) => { const first = bo?.block_structure?.[0]; if (!first) return { pass: false, detail: "Keine Blöcke" }; const name = (first.name || first.block_name || "").toLowerCase(); const isHero = name.includes("hero") || name.includes("above") || name.includes("header") || first.position === 1; return { pass: isHero, detail: `Erster Block: "${first.name || first.block_name || "?"}"` }; } },
  { id: "bo_seo_keyword", label: "SEO: Primary Keyword definiert", severity: "warning", source: "build", modes: ["page", "content"],
    check: (_, bo) => { const kw = bo?.seo_spec?.primary_keyword; return { pass: !!(kw?.trim()), detail: kw ? `"${kw}"` : "Kein Primary Keyword" }; } },
  { id: "bo_seo_title", label: "SEO: Title-Tag definiert", severity: "warning", source: "build", modes: ["page", "content"],
    check: (_, bo) => { const t = bo?.seo_spec?.title_tag || ""; return { pass: t.trim().length > 0, detail: t ? `${t.length} Z. — "${t.substring(0, 50)}"` : "Kein Title-Tag im SEO-Spec" }; } },
  { id: "bo_seo_title_length", label: "SEO Title ≤ 60 Zeichen", severity: "info", source: "build", modes: ["page", "content"],
    check: (_, bo) => { const t = bo?.seo_spec?.title_tag || ""; if (!t) return { pass: false, detail: "Kein Title" }; return { pass: t.length <= 60, detail: `${t.length} Zeichen` }; } },
  { id: "bo_seo_meta_length", label: "SEO Meta-Description 120-160 Z.", severity: "info", source: "build", modes: ["page", "content"],
    check: (_, bo) => { const d = bo?.seo_spec?.meta_description || ""; if (!d) return { pass: false, detail: "Keine Meta-Description" }; return { pass: d.length >= 120 && d.length <= 160, detail: `${d.length} Zeichen` }; } },
  { id: "bo_qa_criteria", label: "QA-Kriterien definiert (≥ 3)", severity: "warning", source: "build", modes: ["page", "strategy", "funnel", "content"],
    check: (_, bo) => { const len = bo?.qa_criteria?.length || 0; return { pass: len >= 3, detail: `${len} QA-Checks` }; } },
  { id: "bo_trust_elements", label: "Trust-Elemente vorhanden", severity: "warning", source: "build", modes: ["page", "funnel"],
    check: (_, bo) => { const len = bo?.copy_blueprint?.trust_elements?.length || 0; return { pass: len >= 1, detail: len ? `${len} Trust-Elemente` : "Keine Trust-Elemente → Conversion leidet" }; } },
  { id: "bo_briefs_complete", label: "Implementation Briefs für alle Rollen", severity: "info", source: "build", modes: ["page"],
    check: (_, bo) => { const briefs = bo?.implementation_briefs || []; const roles = new Set(briefs.map(b => b.role)); const expected = ["copy", "design", "dev"]; const missing = expected.filter(r => !roles.has(r)); return { pass: missing.length === 0, detail: missing.length ? `Fehlend: ${missing.join(", ")}` : `${briefs.length} Briefs (alle Rollen)` }; } },

  // ── Cross-Check: Crawl + Build ──
  { id: "cross_keyword_in_title", label: "Primary Keyword in SEO-Title", severity: "warning", source: "cross", modes: ["page", "content"],
    check: (crawl, bo) => { const kw = (bo?.seo_spec?.primary_keyword || "").toLowerCase(); const title = (bo?.seo_spec?.title_tag || "").toLowerCase(); if (!kw) return { pass: false, detail: "Kein Keyword definiert" }; return { pass: title.includes(kw), detail: title.includes(kw) ? `"${kw}" in Title ✓` : `"${kw}" fehlt im Title` }; } },
  { id: "cross_keyword_in_h1", label: "Primary Keyword in Headline", severity: "info", source: "cross", modes: ["page", "content"],
    check: (crawl, bo) => { const kw = (bo?.seo_spec?.primary_keyword || "").toLowerCase(); const h1 = (bo?.copy_blueprint?.headline?.text || "").toLowerCase(); if (!kw) return { pass: false, detail: "Kein Keyword definiert" }; return { pass: h1.includes(kw), detail: h1.includes(kw) ? `"${kw}" in Headline ✓` : `"${kw}" fehlt in Headline` }; } },

  // ── Strategy-spezifisch ──
  { id: "strat_action_plan", label: "Action Plan vorhanden (≥ 3 Schritte)", severity: "critical", source: "build", modes: ["strategy"],
    check: (_, bo) => { const len = bo?.action_plan?.length || 0; return { pass: len >= 3, detail: `${len} Schritte${len < 3 ? " (zu wenig für Umsetzung)" : ""}` }; } },
  { id: "strat_success_criteria", label: "Messbare Erfolgskriterien definiert", severity: "critical", source: "build", modes: ["strategy"],
    check: (_, bo) => { const len = bo?.success_criteria?.length || 0; return { pass: len >= 2, detail: len ? `${len} Kriterien` : "Keine messbaren Erfolgskriterien" }; } },
  { id: "strat_risk_mitigation", label: "Risiko-Mitigation vorhanden", severity: "warning", source: "build", modes: ["strategy"],
    check: (_, bo) => { const len = bo?.risk_mitigation?.length || 0; return { pass: len >= 1, detail: len ? `${len} Risiken mit Mitigation` : "Keine Risiko-Mitigation definiert" }; } },
  { id: "strat_timeline", label: "Gesamtzeitrahmen definiert", severity: "warning", source: "build", modes: ["strategy"],
    check: (_, bo) => { const t = bo?.resource_requirements?.timeline_total; return { pass: !!(t?.trim()), detail: t ? `"${t}"` : "Kein Zeitrahmen definiert" }; } },
  { id: "strat_review_points", label: "Review-Checkpoints vorhanden", severity: "info", source: "build", modes: ["strategy"],
    check: (_, bo) => { const len = bo?.review_points?.length || 0; return { pass: len >= 1, detail: len ? `${len} Checkpoints` : "Keine Review-Punkte → kein Korrekturfenster" }; } },
  { id: "strat_decision_clear", label: "Entscheidung klar formuliert", severity: "critical", source: "build", modes: ["strategy"],
    check: (_, bo) => { const d = bo?.decision_summary; return { pass: !!(d?.trim()) && d.length >= 20, detail: d ? `${d.length} Zeichen` : "Keine klare Entscheidungsformulierung" }; } },
  { id: "strat_dependencies", label: "Abhängigkeiten identifiziert", severity: "info", source: "build", modes: ["strategy"],
    check: (_, bo) => { const len = bo?.dependencies?.length || 0; return { pass: len >= 1, detail: len ? `${len} Abhängigkeiten` : "Keine Abhängigkeiten identifiziert" }; } },

  // ── Funnel-spezifisch ──
  { id: "funnel_stages_complete", label: "Funnel-Stages definiert (≥ 4)", severity: "critical", source: "build", modes: ["funnel"],
    check: (_, bo) => { const len = bo?.funnel_stages?.length || 0; return { pass: len >= 4, detail: `${len} Stages${len < 4 ? " (Funnel unvollständig)" : ""}` }; } },
  { id: "funnel_bottlenecks", label: "Conversion-Bottlenecks identifiziert", severity: "warning", source: "build", modes: ["funnel"],
    check: (_, bo) => { const len = bo?.conversion_bottlenecks?.length || 0; return { pass: len >= 1, detail: len ? `${len} Bottlenecks mit Lösungsansatz` : "Keine Bottlenecks identifiziert" }; } },
  { id: "funnel_tracking", label: "Tracking-Plan vorhanden", severity: "warning", source: "build", modes: ["funnel"],
    check: (_, bo) => { const len = bo?.tracking_plan?.length || 0; return { pass: len >= 2, detail: len ? `${len} Tracking-Events` : "Kein Tracking-Plan → kein Messen möglich" }; } },
  { id: "funnel_ab_tests", label: "A/B-Test-Ideen vorhanden", severity: "info", source: "build", modes: ["funnel"],
    check: (_, bo) => { const len = bo?.ab_test_ideas?.length || 0; return { pass: len >= 1, detail: len ? `${len} Test-Ideen` : "Keine A/B-Test-Ideen" }; } },
  { id: "funnel_kpis", label: "Jede Stage hat KPI", severity: "warning", source: "build", modes: ["funnel"],
    check: (_, bo) => { const stages = bo?.funnel_stages || []; const noKpi = stages.filter(s => !s.kpi?.trim()); return { pass: noKpi.length === 0, detail: noKpi.length ? `${noKpi.length} Stages ohne KPI` : `Alle ${stages.length} Stages haben KPI` }; } },

  // ── Content-spezifisch ──
  { id: "content_brief_complete", label: "Content Brief vollständig", severity: "critical", source: "build", modes: ["content"],
    check: (_, bo) => { const b = bo?.content_brief; if (!b) return { pass: false, detail: "Kein Content Brief" }; const fields = ["title", "angle", "target_audience", "search_intent"]; const missing = fields.filter(f => !b[f]?.trim()); return { pass: missing.length === 0, detail: missing.length ? `Fehlend: ${missing.join(", ")}` : "Brief komplett" }; } },
  { id: "content_outline", label: "Outline mit ≥ 3 Abschnitten", severity: "critical", source: "build", modes: ["content"],
    check: (_, bo) => { const len = bo?.outline?.length || 0; return { pass: len >= 3, detail: `${len} Abschnitte${len < 3 ? " (zu dünn)" : ""}` }; } },
  { id: "content_distribution", label: "Distributionsplan vorhanden", severity: "warning", source: "build", modes: ["content"],
    check: (_, bo) => { const len = bo?.distribution_plan?.length || 0; return { pass: len >= 1, detail: len ? `${len} Kanäle` : "Kein Distributionsplan → Content versandet" }; } },
  { id: "content_visuals", label: "Visual-Bedarf definiert", severity: "info", source: "build", modes: ["content"],
    check: (_, bo) => { const len = bo?.visual_needs?.length || 0; return { pass: len >= 1, detail: len ? `${len} Visuals geplant` : "Keine Visuals geplant" }; } },
  // ── Machsleicht Motto-spezifisch ──
  { id: "motto_title_format", label: "Title: Motto + Kindergeburtstag (<60 Z.)", severity: "critical", source: "crawl", modes: ["motto"],
    check: (crawl) => { const m = crawl.match(/<title[^>]*>([^<]+)<\/title>/i); if (!m) return { pass: false, detail: "Kein Title-Tag" }; const t = m[1].trim(); const hasMottoKW = /kindergeburtstag/i.test(t); return { pass: hasMottoKW && t.length <= 60, detail: `${t.length} Z. — ${hasMottoKW ? "enthält Kindergeburtstag" : "FEHLT: Kindergeburtstag"}` }; } },
  { id: "motto_meta_desc", label: "Meta-Description 140-155 Z. mit CTA", severity: "critical", source: "crawl", modes: ["motto"],
    check: (crawl) => { const m = crawl.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || crawl.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i); if (!m) return { pass: false, detail: "Keine Meta-Description" }; const len = m[1].length; return { pass: len >= 140 && len <= 155, detail: `${len} Zeichen${len < 140 ? " (zu kurz)" : len > 155 ? " (zu lang)" : " ✓"}` }; } },
  { id: "motto_single_h1", label: "Genau eine H1 mit Hauptkeyword", severity: "critical", source: "crawl", modes: ["motto"],
    check: (crawl) => { const m = crawl.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi); if (!m) return { pass: false, detail: "Keine H1" }; return { pass: m.length === 1, detail: `${m.length} H1 gefunden` }; } },
  { id: "motto_h2_structure", label: "Klare H2-Struktur vorhanden", severity: "warning", source: "crawl", modes: ["motto"],
    check: (crawl) => { const m = crawl.match(/<h2[^>]*>/gi); return { pass: m && m.length >= 4, detail: m ? `${m.length} H2-Tags` : "Keine H2-Tags" }; } },
  { id: "motto_faq_section", label: "FAQ-Sektion (min. 4 Fragen)", severity: "warning", source: "crawl", modes: ["motto"],
    check: (crawl) => { const faqs = crawl.match(/<details|itemtype.*FAQPage|class=["'][^"']*faq/gi) || []; const questionMarks = (crawl.match(/\?<\//g) || []).length; return { pass: questionMarks >= 4 || faqs.length >= 1, detail: `${questionMarks} Fragezeichen in Tags, ${faqs.length} FAQ-Elemente` }; } },
  { id: "motto_schema", label: "Schema Markup (HowTo + FAQPage)", severity: "warning", source: "crawl", modes: ["motto"],
    check: (crawl) => { const howto = /HowTo/i.test(crawl); const faq = /FAQPage/i.test(crawl); return { pass: howto && faq, detail: `HowTo: ${howto ? "✓" : "✗"}, FAQPage: ${faq ? "✓" : "✗"}` }; } },
  { id: "motto_internal_links", label: "Min. 3 interne Links (Planer, Schatzsuche, Mottos)", severity: "warning", source: "crawl", modes: ["motto"],
    check: (crawl) => { const links = crawl.match(/href=["'][^"']*machsleicht[^"']*["']/gi) || crawl.match(/href=["']\/[^"']+["']/gi) || []; return { pass: links.length >= 3, detail: `${links.length} interne Links` }; } },
  { id: "motto_cta_exists", label: "CTA vorhanden", severity: "critical", source: "crawl", modes: ["motto"],
    check: (crawl) => { const cta = crawl.match(/class=["'][^"']*cta[^"']*["']|class=["'][^"']*btn[^"']*["']|<button/gi) || []; return { pass: cta.length >= 1, detail: cta.length ? `${cta.length} CTA-Elemente` : "Kein CTA gefunden" }; } },
  { id: "motto_budget_section", label: "Budget-Abschnitt vorhanden", severity: "critical", source: "crawl", modes: ["motto"],
    check: (crawl) => { const budget = /budget|kosten|preis|euro|€/i.test(crawl); return { pass: budget, detail: budget ? "Budget-Infos gefunden" : "Kein Budget-Abschnitt" }; } },
  { id: "motto_output_clear", label: "Output klar beschrieben (Checkliste, Ausdrucken, etc.)", severity: "warning", source: "crawl", modes: ["motto"],
    check: (crawl) => { const output = /checkliste|ausdrucken|download|vorlage|template|planer/i.test(crawl); return { pass: output, detail: output ? "Output-Kommunikation gefunden" : "Kein klarer Output beschrieben" }; } },
  { id: "motto_word_count", label: "Wortanzahl >1200", severity: "warning", source: "crawl", modes: ["motto"],
    check: (crawl) => { const text = crawl.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); const words = text.split(" ").length; return { pass: words >= 1200, detail: `~${words} Wörter${words < 1200 ? " (zu wenig)" : ""}` }; } },
  { id: "motto_no_generic_intro", label: "Kein generischer Einstieg (motto-spezifisch)", severity: "warning", source: "crawl", modes: ["motto"],
    check: (crawl) => { const body = crawl.match(/<body[\s\S]*?<\/body>/i)?.[0] || crawl; const firstText = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().substring(0, 300); const generic = /willkommen|herzlich|auf dieser seite|hier findest du/i.test(firstText); return { pass: !generic, detail: generic ? "Generischer Einstieg erkannt" : "Einstieg scheint motto-spezifisch" }; } },
  { id: "motto_no_text_walls", label: "Kein Textblock >150 Wörter ohne Struktur", severity: "warning", source: "crawl", modes: ["motto"],
    check: (crawl) => { const paragraphs = crawl.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || []; const long = paragraphs.filter(p => p.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length > 150); return { pass: long.length === 0, detail: long.length ? `${long.length} Textblöcke >150 Wörter` : "Keine Textwände" }; } },
  { id: "motto_images_alt", label: "Bilder mit Alt-Tags", severity: "warning", source: "crawl", modes: ["motto"],
    check: (crawl) => { const imgs = crawl.match(/<img[^>]*>/gi) || []; const noAlt = imgs.filter(i => !i.match(/alt=["'][^"']+["']/i)); return { pass: noAlt.length === 0, detail: imgs.length === 0 ? "Keine Bilder" : `${noAlt.length} von ${imgs.length} ohne Alt-Text` }; } },
  { id: "motto_mobile_scannable", label: "Mobile Scanbarkeit (kurze Absätze, Listen)", severity: "info", source: "crawl", modes: ["motto"],
    check: (crawl) => { const lists = (crawl.match(/<ul|<ol/gi) || []).length; const shortParas = (crawl.match(/<p[^>]*>[^<]{1,300}<\/p>/gi) || []).length; return { pass: lists >= 2 && shortParas >= 5, detail: `${lists} Listen, ${shortParas} kurze Absätze` }; } },

];

// ═══════════════════════════════════════════════════════════════════
// MACHSLEICHT MOTTO CONTEXT & DEFAULTS
// ═══════════════════════════════════════════════════════════════════

const MACHSLEICHT_CONTEXT = {
  mottos: ["Baustelle", "Detektiv", "Dino", "Einhorn", "Feuerwehr", "Frozen", "Harry Potter", "Meerjungfrau", "Minecraft", "Ninjago", "Paw Patrol", "Pferde", "Piraten", "Pokémon", "Ritter", "Safari", "Spider-Man", "Super Mario", "Weltraum", "Zirkus"],
  paths: { main: "/kindergeburtstag/{motto}.html", age: "/kindergeburtstag/{motto}-{alter}-jahre.html", ageGroups: ["/kindergeburtstag/3-5-jahre.html", "/kindergeburtstag/6-8-jahre.html", "/kindergeburtstag/9-12-jahre.html"] },
  budgetLevels: ["Minimal machbar", "Sinnvoller Standard", "Sweet Spot", "Kür (optional)"],
  budgetCategories: ["Deko & Material", "Essen & Trinken", "Mitgebsel", "Aktivitäten"],
  seoTemplate: { title: "{Emoji} {Motto}-Kindergeburtstag — Spiele, Deko & Ablauf | machsleicht", h1: "{Emoji} {Motto}-Kindergeburtstag — Spiele, Deko & Ablauf", schema: ["HowTo", "FAQPage"] },
  design: { colors: { accent: "#E8873D", bg: "#FFFAF5", dark: "#2D2319" }, fonts: { body: "DM Sans", headlines: "Fraunces" }, cards: "border-radius: 14px", cta: "Orange #E8873D, pill-shape border-radius: 99px" },
  tonality: "Du-Ansprache, direkt und warm. Kurze Sätze, aktive Sprache. Ehrlich bei Aufwand und Kosten.",
  parentModes: {
    stress: "Sonntagabend, Geburtstag am Samstag. Wenig Zeit, will schnelle Klarheit, sofort einsetzbare Lösung.",
    ambition: "Will etwas Besonderes, aber mit Struktur, Budget und wenig Risiko. Sucht das Wow mit Sicherheitsnetz."
  },
  gates: ["Value Proposition — Was bekomme ich hier?", "Entlastung — Spart die Seite aktiv Arbeit?", "Umsetzbarkeit — Kann ein Elternteil damit eine Party vorbereiten?", "Budget-Klarheit — Ist klar was es kostet?", "Output-Gefühl — Was habe ich am Ende in der Hand?"],
  sections16: ["Header + Breadcrumb", "Motto-Badge + H1", "Intro-Text", "Social Proof", "CTA zum Planer", "Spiele-Sektion mit Altersfilter", "Schatzsuche-Verlinkung", "Budget-Übersicht (4 Ebenen, 4 Kategorien)", "Deko & Atmosphäre", "Essen & Kuchen", "Material & Einkaufsliste", "Zeitplan-Vorschlag", "FAQ-Sektion", "Finaler CTA", "Verwandte Mottos", "Footer"]
};

function runRuleChecks(crawlHtml, buildOutput, sparringMode) {
  const activeRules = RULE_CHECKS.filter(r => !r.modes || r.modes.includes(sparringMode || "page"));
  return activeRules.map(rule => {
    try {
      const result = rule.check(crawlHtml || "", buildOutput);
      return { id: rule.id, label: rule.label, severity: rule.severity, source: rule.source, ...result };
    } catch (e) {
      return { id: rule.id, label: rule.label, severity: rule.severity, source: rule.source, pass: false, detail: `Prüfung fehlgeschlagen: ${e.message}` };
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// KONTEXT-BUILDER & PROMPTS
// ═══════════════════════════════════════════════════════════════════

const MODE_SYSTEM = {
  page: "Du bist ein Experte für Website-Strategie und bewertest Seiten-Konzepte.",
  strategy: "Du bist ein Strategie-Berater und bewertest Geschäftsentscheidungen.",
  funnel: "Du bist ein Conversion-Experte und bewertest Customer-Journey-Konzepte.",
  content: "Du bist ein Content-Stratege und bewertest Inhaltsstücke.",
  motto: `Du bist ein Experte für Kindergeburtstag-Planung und bewertest Motto-Seiten auf machsleicht.de.
KONTEXT: machsleicht.de hilft Eltern, Kindergeburtstage stressfrei zu planen.
ZIELGRUPPE: Gestresste Eltern (Stress-Modus: wenig Zeit, Sonntagabend) und ambitionierte Eltern (Ambitions-Modus: will Wow mit Sicherheitsnetz).
BEWERTUNGSPRINZIP: Nicht "schöner Content" sondern NUTZBARKEIT im echten Leben, sofortige Umsetzbarkeit, Klarheit + Entlastung.
BUDGET-SYSTEM: 4 Ebenen (Minimal machbar / Sinnvoller Standard / Sweet Spot / Kür) × 4 Kategorien (Deko, Essen, Mitgebsel, Aktivitäten).
DESIGN: Farben #E8873D (Accent), #FFFAF5 (Bg), Fonts DM Sans + Fraunces, Orange CTAs pill-shape.
TONALITÄT: Du-Ansprache, direkt und warm, ehrlich bei Aufwand und Kosten.
SEITEN-STRUKTUR: 16 Sektionen (Header, Motto-Badge+H1, Intro, Social Proof, CTA Planer, Spiele mit Altersfilter, Schatzsuche-Link, Budget-Übersicht, Deko, Essen, Einkaufsliste, Zeitplan, FAQ, Finaler CTA, Verwandte Mottos, Footer).`,
};

function getBaseSystem(sparringMode, perspectives) {
  const base = MODE_SYSTEM[sparringMode] || MODE_SYSTEM.page;
  return `${base} Bewerte aus ${perspectives.length} Perspektiven.
Antworte IMMER als valides JSON. Kein Markdown, keine Backticks, kein Einleitungstext.
Bewerte jede Dimension mit einem Score von 1-10 und einem Satz (max 15 Wörter).`;
}

function buildScoreExample(perspectives) {
  const lines = perspectives.map(p => `    "${p.key}": {"d1": {"s": 7, "n": "..."}, "d2": {"s": 7, "n": "..."}, "d3": {"s": 7, "n": "..."}}`);
  return "{\n" + lines.join(",\n") + "\n  }";
}

function buildContextBlock(crawlData, weights, history, userFeedback, sparringMode) {
  const parts = [];
  if (crawlData?.length) {
    parts.push("AKTUELLER WEBSITE-STAND (gecrawlt):");
    crawlData.forEach(c => parts.push(`[${c.url}]\n${c.text.substring(0, 1500)}`));
  }
  // Weights only apply to page mode where PROJECT_TYPES keys match perspective keys
  if (sparringMode === "page") {
    const pagePersp = MODE_PERSPECTIVES.page;
    const nonDefault = pagePersp.filter(p => (weights?.[p.key] || 1) !== 1);
    if (nonDefault.length) {
      parts.push("\nPERSPEKTIV-GEWICHTUNG (Fokus dieses Projekts):");
      parts.push(pagePersp.map(p => `${p.label}:${weights[p.key]}x`).join(", "));
      parts.push("Gewichte deinen Vorschlag entsprechend. Bewerte aber ALLE Perspektiven ehrlich — nicht inflaten weil gewichtet.");
    }
  }
  if (history?.length) {
    parts.push("\nBISHERIGE PROJEKT-ENTSCHEIDUNGEN:");
    history.forEach((h, i) => parts.push(`${i + 1}. ${h.topic}: "${h.headline}"`));
    parts.push("Berücksichtige diese. Widersprich nur mit guter Begründung.");
  }
  if (userFeedback?.trim()) {
    parts.push(`\nUSER-RICHTUNG (nach Sichtung beider Vorschläge):\n${userFeedback}`);
    parts.push("Der User hat diese Richtung vorgegeben — gewichte das stark in deiner Antwort.");
  }
  return parts.length ? "\n\n" + parts.join("\n") : "";
}

const PROPOSAL_PROMPT = (topic, context, ctxBlock, sparringMode, perspectives) => `${getBaseSystem(sparringMode, perspectives)}
AUFGABE: Erstelle einen konkreten Vorschlag für folgendes Thema und bewerte ihn selbst aus ${perspectives.length} Perspektiven.
PERSPEKTIVEN: ${perspectives.map(p => `${p.label} (${p.key}): ${p.dims.join(", ")}`).join(" | ")}
THEMA: ${topic}
${context ? `KONTEXT: ${context}` : ""}${ctxBlock}
${sparringMode === "motto" ? `
MACHSLEICHT MOTTO-KONTEXT:
- 20 Mottos: ${MACHSLEICHT_CONTEXT.mottos.join(", ")}
- Budget: 4 Ebenen (${MACHSLEICHT_CONTEXT.budgetLevels.join(" / ")}) × 4 Kategorien (${MACHSLEICHT_CONTEXT.budgetCategories.join(", ")})
- SEO-Template: Title "${MACHSLEICHT_CONTEXT.seoTemplate.title}", Schema: ${MACHSLEICHT_CONTEXT.seoTemplate.schema.join(" + ")}
- 16-Sektionen-Struktur: ${MACHSLEICHT_CONTEXT.sections16.join(" → ")}
- Eltern-Perspektive: Stress-Modus (${MACHSLEICHT_CONTEXT.parentModes.stress}) UND Ambitions-Modus (${MACHSLEICHT_CONTEXT.parentModes.ambition})

PARENT UTILITY GATE (VOR dem Scoring — Kill-Criteria):
Bewerte diese 5 Gates (Ja/Teilweise/Nein):
${MACHSLEICHT_CONTEXT.gates.map((g, i) => `${i + 1}. ${g}`).join("\n")}
Gate-Ergebnis: PASS (alle mind. Teilweise) / WEAK (1-2x Nein) / FAIL (3+ Nein)
Wenn FAIL → Verdict maximal NEEDS REVISION.

DIFFERENZIERUNGS-CHECK:
- Was unterscheidet diese Seite von den anderen 19 Mottos?
- Könnte man den Motto-Namen austauschen? → Dann FAIL.
Bewertung: Schwach / Mittel / Stark

Füge in deinem JSON zusätzlich ein "parent_utility_gate" Objekt hinzu:
{
  "parent_utility_gate": {
    "gates": [{"name": "...", "result": "ja|teilweise|nein", "note": "..."}],
    "stress_mode": {"klarheit": 1-5, "vertrauen": 1-5, "nutzbarkeit": 1-5},
    "ambition_mode": {"klarheit": 1-5, "vertrauen": 1-5, "nutzbarkeit": 1-5},
    "gate_result": "PASS|WEAK|FAIL"
  },
  "differenzierung": {"bewertung": "schwach|mittel|stark", "note": "..."},
  "budget_analysis": {
    "levels": [{"name": "Minimal machbar", "total": "XX€", "pro_kopf": "X€"}, ...],
    "spar_hebel": ["...", "...", "..."],
    "kostenfallen": ["...", "...", "..."],
    "bestes_preis_leistung": "..."
  }
}
` : ""}

Antworte als JSON:
{
  "proposal": {
    "headline": "Dein Vorschlag in einem Satz",
    "details": "Ausführliche Beschreibung (3-5 Sätze)",
    "key_elements": ["Element 1", "Element 2", "Element 3"]
  },
  "scores": ${buildScoreExample(perspectives)}
}`;

const GAMECHANGER_PROMPT = (topic, proposalA, proposalB, deltas, ctxBlock, sparringMode, perspectives) => `${getBaseSystem(sparringMode, perspectives)}
Du siehst zwei Vorschläge und ihre Bewertungen. Liefere 3 GAMECHANGER — radikale Ideen die beide Vorschläge besser machen würden.
PERSPEKTIVEN: ${perspectives.map(p => p.key).join(", ")}
THEMA: ${topic}
VORSCHLAG A: ${proposalA}
VORSCHLAG B: ${proposalB}
GRÖSSTE ABWEICHUNGEN: ${deltas}${ctxBlock}

Antworte als JSON:
{
  "gamechangers": [
    { "id": "gc1", "title": "Max 5 Worte", "description": "Was genau? Max 2 Sätze.", "benefits": ["perspective_key1", "perspective_key2"], "impact": 8, "effort": "quick_win" },
    { "id": "gc2", "title": "...", "description": "...", "benefits": ["..."], "impact": 7, "effort": "medium" },
    { "id": "gc3", "title": "...", "description": "...", "benefits": ["..."], "impact": 9, "effort": "heavy" }
  ]
}
effort muss sein: "quick_win", "medium" oder "heavy"
benefits müssen Perspective Keys sein: ${perspectives.map(p => p.key).join(", ")}`;

const FINAL_MERGE_PROMPT = (topic, proposalA, proposalB, gcA, gcB, scoresA, scoresB, ctxBlock, sparringMode, perspectives) => `${getBaseSystem(sparringMode, perspectives)}
Du bist der BOSS. Triff die finale Entscheidung.
PERSPEKTIVEN: ${perspectives.map(p => `${p.label} (${p.key})`).join(", ")}
THEMA: ${topic}
VORSCHLAG A (Claude): ${proposalA}
VORSCHLAG B (Gegner): ${proposalB}
GAMECHANGER A: ${gcA}
GAMECHANGER B: ${gcB}
SCORES A: ${scoresA}
SCORES B: ${scoresB}${ctxBlock}

Erstelle den finalen Merge: Das Beste aus beiden Vorschlägen + die besten Gamechanger.
Antworte als JSON:
{
  "final": {
    "headline": "Finaler Vorschlag in einem Satz",
    "details": "Ausführliche finale Strategie (5-8 Sätze)",
    "key_elements": ["Element 1", "Element 2", "Element 3", "Element 4"],
    "not_building": ["Was bewusst NICHT gemacht wird — 2-3 Punkte"],
    "open_risks": ["Risiko/offener Punkt 1", "Risiko 2"],
    "adopted_gamechangers": [
      {"id": "gc_id", "source": "A oder B", "decision": "adopt/modified/rejected", "reason": "1 Satz"}
    ]
  },
  "executive_scores": {
    "clarity": {"s": 8, "ampel": "green", "n": "Warum dieser Score — 1 Satz"},
    "conversion_potential": {"s": 7, "ampel": "yellow", "n": "..."},
    "build_efficiency": {"s": 6, "ampel": "yellow", "n": "..."},
    "risk_level": {"s": 5, "ampel": "red", "n": "..."},
    "strategic_fit": {"s": 8, "ampel": "green", "n": "..."}
  },
  "readiness": {
    "decision_readiness": {"s": 8, "n": "Kann man jetzt entscheiden?"},
    "build_readiness": {"s": 6, "n": "Kann direkt losgelegt werden?"},
    "launch_readiness": {"s": 4, "n": "Ist es umsetzbar?"}
  },
  "build_verdict": "go|go_with_changes|needs_revision|do_not_build",
  "decision_log": [
    {"dimension": "perspective_key", "decision": "Von A/B/Merge", "reason": "Warum"}
  ],
  "final_scores": ${buildScoreExample(perspectives)}
}`;

const BUILD_OUTPUT_TEMPLATES = {
  page: `{
  "block_structure": [
    {"position": 1, "name": "Hero", "purpose": "1 Satz: Warum dieser Block an dieser Position"},
    {"position": 2, "name": "Trust Bar", "purpose": "..."}
  ],
  "copy_blueprint": {
    "headline": {"text": "Vorschlag", "logic": "Warum diese Headline funktioniert"},
    "subheadline": {"text": "Vorschlag", "logic": "..."},
    "cta_primary": {"text": "CTA Text", "logic": "..."},
    "cta_secondary": {"text": "Optionaler zweiter CTA", "logic": "..."},
    "trust_elements": ["Element 1", "Element 2", "Element 3"],
    "objection_handling": ["Einwand 1 → Entkräftung", "Einwand 2 → Entkräftung"],
    "proof_points": ["Beweis 1", "Beweis 2"]
  },
  "components": [
    {"name": "Hero mit CTA", "type": "section", "priority": "must"},
    {"name": "Logo-Leiste", "type": "element", "priority": "should"}
  ],
  "ux_notes": ["CTA mobil sticky", "Formular max 3 Felder"],
  "seo_spec": {
    "primary_keyword": "...", "secondary_keywords": ["...", "..."], "h1": "...",
    "h2_structure": ["H2 1", "H2 2"], "internal_links": ["Von wo → wohin"],
    "schema_potential": "FAQ/HowTo/Product", "title_tag": "...", "meta_description": "..."
  },
  "dev_notes": ["Statisch möglich", "LCP-Elemente priorisieren"],
  "qa_criteria": ["Headline in unter 2 Sekunden erfassbar", "CTA ohne Scroll sichtbar", "Mobile keine Textwand"],
  "implementation_briefs": [
    {"role": "copy", "brief": "Konkreter Auftrag für Texter"},
    {"role": "design", "brief": "Konkreter Auftrag für Designer"},
    {"role": "dev", "brief": "Konkreter Auftrag für Entwickler"}
  ],
  "acceptance_checks_by_block": [
    {"block": "Hero", "checks": ["CTA above fold", "Headline klar in 2 Sekunden"]}
  ]
}`,
  strategy: `{
  "decision_summary": "Klare Formulierung der Entscheidung in 1-2 Sätzen",
  "action_plan": [
    {"position": 1, "action": "Erster konkreter Schritt", "owner": "Wer", "timeline": "Bis wann", "success_metric": "Woran messen"},
    {"position": 2, "action": "...", "owner": "...", "timeline": "...", "success_metric": "..."}
  ],
  "resource_requirements": {
    "budget": "Geschätzter Bedarf",
    "team": ["Rolle 1", "Rolle 2"],
    "tools": ["Tool/System 1"],
    "timeline_total": "Gesamtzeitrahmen"
  },
  "risk_mitigation": [
    {"risk": "Risiko-Beschreibung", "probability": "high/medium/low", "mitigation": "Gegenmaßnahme", "fallback": "Plan B"}
  ],
  "success_criteria": ["Messbares Kriterium 1", "Messbares Kriterium 2", "Messbares Kriterium 3"],
  "dependencies": ["Abhängigkeit 1", "Abhängigkeit 2"],
  "review_points": [
    {"milestone": "Checkpoint-Name", "date": "Wann", "criteria": "Was muss erreicht sein"}
  ],
  "communication_plan": "Wer muss wann worüber informiert werden",
  "qa_criteria": ["Ist die Entscheidung reversibel?", "Gibt es einen klaren Exit-Plan?", "Sind alle Stakeholder eingebunden?"]
}`,
  funnel: `{
  "funnel_stages": [
    {"stage": "Awareness", "touchpoints": ["Touchpoint 1"], "content_needed": ["Content-Typ"], "kpi": "Messbare Metrik", "drop_off_risk": "Wo verlieren wir Leute?", "optimization": "Konkreter Hebel"},
    {"stage": "Interest", "touchpoints": ["..."], "content_needed": ["..."], "kpi": "...", "drop_off_risk": "...", "optimization": "..."}
  ],
  "conversion_bottlenecks": [
    {"location": "Wo im Funnel", "problem": "Was passiert", "impact": "high/medium/low", "fix": "Konkreter Lösungsansatz"}
  ],
  "tracking_plan": [
    {"event": "Event-Name", "trigger": "Wann wird getrackt", "tool": "GA4/GTM/Custom", "kpi_link": "Welcher KPI profitiert"}
  ],
  "ab_test_ideas": [
    {"element": "Was testen", "hypothesis": "Wir glauben dass...", "metric": "Gemessen an", "effort": "quick_win/medium/heavy"}
  ],
  "copy_blueprint": {
    "headline": {"text": "Haupt-Hook", "logic": "Warum"},
    "subheadline": {"text": "Untertitel", "logic": "..."},
    "cta_primary": {"text": "Primärer CTA", "logic": "..."},
    "cta_secondary": {"text": "Sekundärer CTA", "logic": "..."},
    "trust_elements": ["Trust 1", "Trust 2"],
    "objection_handling": ["Einwand → Antwort"],
    "proof_points": ["Beweis 1"]
  },
  "qa_criteria": ["Funnel durchgängig messbar", "Keine toten Links", "Mobile optimiert"]
}`,
  content: `{
  "content_brief": {
    "title": "Arbeitstitel",
    "angle": "Konkreter Blickwinkel / Unique Angle",
    "target_audience": "Für wen genau",
    "search_intent": "informational/transactional/navigational",
    "content_type": "Blogpost/Case Study/Guide/Newsletter/etc.",
    "target_length": "Wortanzahl-Range"
  },
  "outline": [
    {"position": 1, "section": "H2-Überschrift", "key_points": ["Punkt 1", "Punkt 2"], "purpose": "Warum dieser Abschnitt"}
  ],
  "seo_spec": {
    "primary_keyword": "...", "secondary_keywords": ["...", "..."],
    "h1": "...", "h2_structure": ["H2 1", "H2 2"],
    "internal_links": ["Von wo → wohin"], "schema_potential": "FAQ/HowTo/Article",
    "title_tag": "...", "meta_description": "..."
  },
  "copy_blueprint": {
    "headline": {"text": "Headline", "logic": "Warum die funktioniert"},
    "subheadline": {"text": "Sub", "logic": "..."},
    "cta_primary": {"text": "CTA", "logic": "..."},
    "cta_secondary": {"text": "", "logic": ""},
    "trust_elements": ["Expertise-Signal"],
    "objection_handling": ["Warum sollte ich das lesen → Antwort"],
    "proof_points": ["Daten", "Beispiel"]
  },
  "distribution_plan": [
    {"channel": "Kanal", "format": "Wie anpassen", "timing": "Wann posten"}
  ],
  "visual_needs": ["Bild/Grafik-Beschreibung 1"],
  "qa_criteria": ["Kein Fachsimpeln ohne Erklärung", "Jeder Abschnitt hat einen klaren Takeaway", "CTA passt zum Content"]
}`,
  motto: `{
  "block_structure": [
    {"position": 1, "name": "Header + Breadcrumb", "purpose": "Navigation + Verortung"},
    {"position": 2, "name": "Motto-Badge + H1", "purpose": "Sofortige Motto-Erkennung"},
    {"position": 3, "name": "Intro-Text", "purpose": "Motivierender Einstieg (2-3 Sätze, motto-spezifisch)"},
    {"position": 4, "name": "Social Proof", "purpose": "Vertrauen aufbauen"},
    {"position": 5, "name": "CTA zum Planer", "purpose": "Erste Handlungsaufforderung"},
    {"position": 6, "name": "Spiele-Sektion mit Altersfilter", "purpose": "Kerninhalt: Spiele für 4-5, 6-8, 9-12"},
    {"position": 7, "name": "Schatzsuche-Verlinkung", "purpose": "Highlight-Box zu Schatzsuche"},
    {"position": 8, "name": "Budget-Übersicht", "purpose": "4 Ebenen × 4 Kategorien mit Gesamtkosten"},
    {"position": 9, "name": "Deko & Atmosphäre", "purpose": "Motto-spezifische Deko-Ideen"},
    {"position": 10, "name": "Essen & Kuchen", "purpose": "Motto-passende Essensideen"},
    {"position": 11, "name": "Material & Einkaufsliste", "purpose": "Konkrete Liste zum Abhaken"},
    {"position": 12, "name": "Zeitplan-Vorschlag", "purpose": "Ablauf für den Tag"},
    {"position": 13, "name": "FAQ-Sektion", "purpose": "Mind. 4 häufige Fragen"},
    {"position": 14, "name": "Finaler CTA zum Planer", "purpose": "Abschluss-Handlungsaufforderung"},
    {"position": 15, "name": "Verwandte Mottos", "purpose": "Interne Verlinkung zu ähnlichen Mottos"},
    {"position": 16, "name": "Footer", "purpose": "Standard-Footer"}
  ],
  "copy_blueprint": {
    "headline": {"text": "Motto-spezifischer H1", "logic": "Enthält Emoji + Motto + Kindergeburtstag"},
    "subheadline": {"text": "Nutzenversprechen", "logic": "Was bekommen Eltern hier?"},
    "cta_primary": {"text": "Jetzt Party planen →", "logic": "Zum Planer-Tool"},
    "cta_secondary": {"text": "Schatzsuche entdecken", "logic": "Zum Schatzsuche-Produkt"},
    "trust_elements": ["Über X Geburtstage geplant", "Eltern-getestet", "Kostenlose Checklisten"],
    "objection_handling": ["Zu aufwändig? → Minimal-Version zeigen", "Zu teuer? → Budget-Übersicht", "Keine Ideen? → Fertige Spieleliste"],
    "proof_points": ["Zeitersparnis quantifiziert", "Echte Kostenbeispiele", "Checklisten zum Download"]
  },
  "budget_box": {
    "levels": [
      {"name": "Minimal machbar", "total_8_kids": "XX€", "pro_kopf": "X€", "beschreibung": "..."},
      {"name": "Sinnvoller Standard", "total_8_kids": "XX€", "pro_kopf": "X€", "beschreibung": "..."},
      {"name": "Sweet Spot", "total_8_kids": "XX€", "pro_kopf": "X€", "beschreibung": "..."},
      {"name": "Kür", "total_8_kids": "XX€", "pro_kopf": "X€", "beschreibung": "..."}
    ],
    "categories": ["Deko & Material", "Essen & Trinken", "Mitgebsel", "Aktivitäten"],
    "spar_hebel": ["Spar-Hebel 1", "Spar-Hebel 2", "Spar-Hebel 3"],
    "kostenfallen": ["Kostenfalle 1", "Kostenfalle 2", "Kostenfalle 3"],
    "bestes_preis_leistung": "..."
  },
  "seo_spec": {
    "primary_keyword": "[Motto] Kindergeburtstag",
    "secondary_keywords": ["[Motto] Geburtstag Spiele", "[Motto] Party Deko", "[Motto] Kindergeburtstag Ideen"],
    "h1": "Emoji + [Motto]-Kindergeburtstag — Spiele, Deko & Ablauf",
    "h2_structure": ["Spiele", "Deko", "Essen", "Budget", "FAQ"],
    "title_tag": "Emoji [Motto]-Kindergeburtstag — Spiele, Deko & Ablauf | machsleicht",
    "meta_description": "140-155 Zeichen mit CTA",
    "schema_potential": "HowTo + FAQPage",
    "internal_links": ["Planer-Tool", "Schatzsuche", "Verwandtes Motto 1", "Verwandtes Motto 2", "Altersgruppen-Seite"]
  },
  "parent_utility_gate_summary": {
    "gate_result": "PASS|WEAK|FAIL",
    "stress_mode_score": 0,
    "ambition_mode_score": 0
  },
  "differenzierung": {"bewertung": "schwach|mittel|stark", "note": "..."},
  "components": [
    {"name": "Altersfilter-Tabs", "type": "component", "priority": "must"},
    {"name": "Budget-Rechner", "type": "component", "priority": "should"},
    {"name": "Motto-Badge", "type": "element", "priority": "must"},
    {"name": "Schatzsuche-Highlight-Box", "type": "element", "priority": "must"}
  ],
  "qa_criteria": [
    "Alle 16 Sektionen vorhanden und befüllt",
    "Budget-Übersicht mit 4 Ebenen + 4 Kategorien korrekt",
    "Mindestens 4 FAQ-Fragen mit Schema-Markup",
    "CTA-Buttons funktional und sichtbar",
    "Interne Links zu Planer, Schatzsuche und mind. 2 Mottos",
    "Kein generischer, austauschbarer Content",
    "Mobile: Keine Textwände, Listen vorhanden, Buttons klickbar"
  ]
}`
};

const BUILD_OUTPUT_INTRO = {
  page: "Du bist ein Senior Web-Stratege und erstellst direkt baubare Outputs aus einer finalen Strategie-Entscheidung.",
  strategy: "Du bist ein Senior Strategie-Berater und erstellst einen konkreten Umsetzungsplan aus einer finalen Entscheidung.",
  funnel: "Du bist ein Senior Conversion-Stratege und erstellst einen detaillierten Funnel-Plan aus einer finalen Entscheidung.",
  content: "Du bist ein Senior Content-Stratege und erstellst einen konkreten Content-Plan aus einer finalen Entscheidung.",
  motto: "Du bist ein Kindergeburtstag-Experte für machsleicht.de und erstellst ein komplettes Seiten-Optimierungspaket für eine Motto-Seite. Dein Output muss die 16-Sektionen-Struktur, Budget-Box mit 4 Ebenen, und die Machsleicht Design-Sprache berücksichtigen.",
};

const BUILD_OUTPUT_PROMPT = (topic, finalResult, ctxBlock, sparringMode) => `${BUILD_OUTPUT_INTRO[sparringMode] || BUILD_OUTPUT_INTRO.page}
THEMA: ${topic}
FINALE STRATEGIE: ${JSON.stringify(finalResult)}${ctxBlock}

Erstelle einen vollständigen Plan. Antworte als valides JSON. Kein Markdown, keine Backticks.
${BUILD_OUTPUT_TEMPLATES[sparringMode] || BUILD_OUTPUT_TEMPLATES.page}`;

const TASK_EXTRACTION_PROMPT = (strategyDoc, crawlData) => `Du bist ein erfahrener Product Owner für Web-Projekte.
Extrahiere aus dem folgenden Strategie-Dokument konkrete, abarbeitbare Tasks für die Website-Entwicklung.
Jeder Task muss ein klares, sparring-fähiges Thema sein — kein Overhead, kein Projekt-Management.

STRATEGIE-DOKUMENT:
${strategyDoc}
${crawlData ? `\nAKTUELLER WEBSITE-STAND:\n${crawlData}` : ""}

Antworte als valides JSON. Kein Markdown, keine Backticks.
{
  "project": {
    "name": "Projektname",
    "summary": "1-2 Sätze Zusammenfassung",
    "goal": "Was soll erreicht werden?"
  },
  "tasks": [
    {
      "id": "task_1",
      "title": "Kurzer, prägnanter Titel (3-7 Worte)",
      "description": "Was genau zu tun ist (2-3 Sätze). Konkret genug für ein Sparring.",
      "category": "content|design|dev|seo|legal|analytics",
      "priority": "must|should|could",
      "effort": "xs|s|m|l|xl",
      "dependencies": [],
      "auto_eligible": true,
      "auto_reason": "Warum kann/kann nicht automatisch gesparrt werden",
      "owner_type": "dev",
      "definition_of_done": "Konkret: Wann ist dieser Task erledigt? 1-2 Sätze."
    }
  ]
}
Regeln:
- Jeder Task muss unabhängig sparring-fähig sein
- Sortiere nach Priorität (must zuerst)
- auto_eligible = true wenn: klar definiert, kein subjektiver Brand-Input nötig, keine offenen Fragen
- auto_eligible = false wenn: Brand-Entscheidung, strategische Weichenstellung, oder User-Input nötig
- category muss exakt einer der Werte sein: content, design, dev, seo, legal, analytics
- priority muss exakt einer der Werte sein: must, should, could
- effort muss exakt einer der Werte sein: xs, s, m, l, xl
- owner_type muss exakt einer der Werte sein: copy, design, dev, seo, legal, qa, founder
- definition_of_done muss konkret und prüfbar sein — kein "ist fertig" sondern messbare Kriterien
- Realistisch 5-15 Tasks, nicht mehr`;

// ═══════════════════════════════════════════════════════════════════
// API & CRAWL FUNKTIONEN (mit Retry + Timeout)
// ═══════════════════════════════════════════════════════════════════

function extractFirstJson(text) {
  // Strip markdown fences
  let cleaned = text.replace(/```json\s*|```\s*/g, "").trim();
  // Try direct parse first
  try { return JSON.parse(cleaned); } catch (_) {}
  // Find first { ... } or [ ... ] block
  const start = cleaned.search(/[{[]/);
  if (start === -1) throw new Error("No JSON object found in response");
  let depth = 0, inStr = false, escape = false;
  for (let i = start; i < cleaned.length; i++) {
    const c = cleaned[i];
    if (escape) { escape = false; continue; }
    if (c === "\\") { escape = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === "{" || c === "[") depth++;
    if (c === "}" || c === "]") { depth--; if (depth === 0) return JSON.parse(cleaned.substring(start, i + 1)); }
  }
  throw new Error("Incomplete JSON object in response");
}

// Enum normalizer + defaults
const VALID_VERDICTS = ["go", "go_with_changes", "needs_revision", "do_not_build"];
const VALID_AMPELS = ["green", "yellow", "red"];
const VALID_PRIORITIES = ["must", "should", "could"];
const VALID_EFFORTS = ["xs", "s", "m", "l", "xl"];
const VALID_CATEGORIES = ["content", "design", "dev", "seo", "legal", "analytics"];
const VALID_OWNERS = ["copy", "design", "dev", "seo", "legal", "qa", "founder"];

function normalizeEnum(val, validSet, fallback) {
  if (!val) return fallback;
  const lower = String(val).toLowerCase().trim().replace(/\s+/g, "_");
  if (validSet.includes(lower)) return lower;
  // Fuzzy: find closest
  const match = validSet.find(v => lower.includes(v) || v.includes(lower));
  return match || fallback;
}

function sanitizeScores(scores, perspectives) {
  const persp = perspectives || MODE_PERSPECTIVES.page;
  if (!scores || typeof scores !== "object") {
    const empty = {};
    for (const p of persp) { empty[p.key] = { d1: { s: 5, n: "" }, d2: { s: 5, n: "" }, d3: { s: 5, n: "" } }; }
    return empty;
  }
  const out = {};
  for (const p of persp) {
    const ps = scores[p.key];
    out[p.key] = {};
    for (const d of ["d1", "d2", "d3"]) {
      const dim = ps && ps[d];
      if (dim && typeof dim === "object") {
        out[p.key][d] = { s: Math.max(1, Math.min(10, Math.round(Number(dim.s) || 5))), n: String(dim.n || "") };
      } else {
        out[p.key][d] = { s: 5, n: "" };
      }
    }
  }
  return out;
}

function sanitizeExecScores(exec, sparringMode) {
  const src = (exec && typeof exec === "object") ? exec : {};
  const out = {};
  const execScoresForMode = getExecScores(sparringMode);
  for (const e of execScoresForMode) {
    const d = src[e.key];
    if (d && typeof d === "object") {
      const maxScore = sparringMode === "motto" ? 5 : 10;
      const defaultScore = sparringMode === "motto" ? 3 : 5;
      out[e.key] = { s: Math.max(1, Math.min(maxScore, Math.round(Number(d.s) || defaultScore))), ampel: normalizeEnum(d.ampel, VALID_AMPELS, "yellow"), n: String(d.n || "") };
    } else {
      const defaultScore = sparringMode === "motto" ? 3 : 5;
      out[e.key] = { s: defaultScore, ampel: "yellow", n: "" };
    }
  }
  return out;
}

const VALID_GC_EFFORTS = ["quick_win", "medium", "heavy"];
const VALID_GC_DECISIONS = ["adopt", "modified", "rejected"];
const VALID_COMP_PRIORITIES = ["must", "should", "could"];
const VALID_COMP_TYPES = ["section", "element", "component", "layout"];
const VALID_BRIEF_ROLES = ["copy", "design", "dev"];

function sanitizeGamechangers(raw, perspectives) {
  if (!raw) return raw;
  const persp = perspectives || MODE_PERSPECTIVES.page;
  const out = { ...raw };
  if (Array.isArray(out.gamechangers)) {
    out.gamechangers = out.gamechangers.map((g, i) => ({
      id: g.id || `gc${i + 1}`,
      title: String(g.title || "Gamechanger " + (i + 1)),
      description: String(g.description || ""),
      benefits: Array.isArray(g.benefits) ? g.benefits.filter(b => persp.some(p => p.key === b)) : [],
      impact: Math.max(1, Math.min(10, Math.round(Number(g.impact) || 5))),
      effort: normalizeEnum(g.effort, VALID_GC_EFFORTS, "medium"),
    }));
  } else {
    out.gamechangers = [];
  }
  return out;
}

function sanitizeProposal(raw, perspectives) {
  if (!raw) return raw;
  const out = { ...raw };
  out.scores = sanitizeScores(out.scores, perspectives);
  if (!out.proposal) out.proposal = { headline: "–", details: "", key_elements: [] };
  if (!out.proposal.headline) out.proposal.headline = "–";
  if (!out.proposal.details) out.proposal.details = "";
  if (!Array.isArray(out.proposal.key_elements)) out.proposal.key_elements = [];
  return out;
}

function sanitizeFinalResult(raw, perspectives, sparringMode) {
  if (!raw) return raw;
  const persp = perspectives || MODE_PERSPECTIVES.page;
  const out = { ...raw };
  out.final_scores = sanitizeScores(out.final_scores, persp);
  out.executive_scores = sanitizeExecScores(out.executive_scores, sparringMode);
  out.build_verdict = normalizeEnum(out.build_verdict || "", VALID_VERDICTS, "needs_revision");
  // Readiness: ensure all three keys exist with defaults
  const rd = (out.readiness && typeof out.readiness === "object") ? out.readiness : {};
  for (const key of ["decision_readiness", "build_readiness", "launch_readiness"]) {
    const r = rd[key];
    if (r && typeof r === "object") rd[key] = { s: Math.max(1, Math.min(10, Math.round(Number(r.s) || 5))), n: String(r.n || "") };
    else rd[key] = { s: 5, n: "" };
  }
  out.readiness = rd;
  if (!out.final) out.final = { headline: "–", details: "", key_elements: [] };
  if (!out.final.headline) out.final.headline = "–";
  if (!out.final.details) out.final.details = "";
  if (!Array.isArray(out.final.key_elements)) out.final.key_elements = [];
  if (!Array.isArray(out.final.not_building)) out.final.not_building = [];
  if (!Array.isArray(out.final.open_risks)) out.final.open_risks = [];
  // Normalize adopted_gamechangers
  if (Array.isArray(out.final.adopted_gamechangers)) {
    out.final.adopted_gamechangers = out.final.adopted_gamechangers.map(gc => ({
      id: gc.id || "",
      source: String(gc.source || "–"),
      decision: normalizeEnum(gc.decision, VALID_GC_DECISIONS, "modified"),
      reason: String(gc.reason || ""),
    }));
  } else {
    out.final.adopted_gamechangers = [];
  }
  // Normalize decision_log — validate dimension against known perspective keys
  const VALID_DIMENSIONS = new Set(persp.map(p => p.key));
  if (Array.isArray(out.decision_log)) {
    out.decision_log = out.decision_log.map(d => {
      const rawDim = String(d.dimension || "").toLowerCase().trim();
      const dimension = VALID_DIMENSIONS.has(rawDim) ? rawDim : "unknown";
      return { dimension, decision: String(d.decision || "–"), reason: String(d.reason || "") };
    });
  } else {
    out.decision_log = [];
  }
  return out;
}

function sanitizeTasks(raw) {
  if (!raw) return raw;
  const out = { ...raw };
  if (Array.isArray(out.tasks)) {
    out.tasks = out.tasks.map((t, i) => ({
      ...t,
      id: t.id || `task_${i + 1}`,
      title: t.title || "Unbenannter Task",
      description: t.description || "",
      category: normalizeEnum(t.category, VALID_CATEGORIES, "dev"),
      priority: normalizeEnum(t.priority, VALID_PRIORITIES, "should"),
      effort: normalizeEnum(t.effort, VALID_EFFORTS, "m"),
      owner_type: normalizeEnum(t.owner_type, VALID_OWNERS, "dev"),
      dependencies: Array.isArray(t.dependencies) ? t.dependencies : [],
      auto_eligible: typeof t.auto_eligible === "boolean" ? t.auto_eligible : false,
      auto_reason: t.auto_reason || "",
      definition_of_done: t.definition_of_done || "",
    }));
  }
  return out;
}

function sanitizeBuildOutput(raw) {
  if (!raw) return raw;
  const out = { ...raw };
  // Block structure: ensure position is number, name/purpose are strings
  out.block_structure = Array.isArray(out.block_structure) ? out.block_structure.map((b, i) => ({
    position: typeof b.position === "number" ? b.position : i + 1,
    name: String(b.name || `Block ${i + 1}`),
    purpose: String(b.purpose || ""),
  })) : [];
  // Copy blueprint: ensure nested text/logic structure
  const cb = (out.copy_blueprint && typeof out.copy_blueprint === "object") ? out.copy_blueprint : {};
  // Ensure all text/logic fields exist with defaults
  for (const key of ["headline", "subheadline", "cta_primary", "cta_secondary"]) {
    const val = cb[key];
    if (val && typeof val === "string") cb[key] = { text: val, logic: "" };
    else if (val && typeof val === "object") cb[key] = { text: String(val.text || ""), logic: String(val.logic || "") };
    else cb[key] = { text: "", logic: "" };
  }
  for (const key of ["trust_elements", "objection_handling", "proof_points"]) {
    if (!Array.isArray(cb[key])) cb[key] = [];
    else cb[key] = cb[key].map(String);
  }
  out.copy_blueprint = cb;
  // Components: normalize priority and type
  out.components = Array.isArray(out.components) ? out.components.map(c => ({
    name: String(c.name || ""),
    type: normalizeEnum(c.type, VALID_COMP_TYPES, "element"),
    priority: normalizeEnum(c.priority, VALID_COMP_PRIORITIES, "should"),
  })) : [];
  // String arrays
  out.ux_notes = Array.isArray(out.ux_notes) ? out.ux_notes.map(String) : [];
  out.dev_notes = Array.isArray(out.dev_notes) ? out.dev_notes.map(String) : [];
  out.qa_criteria = Array.isArray(out.qa_criteria) ? out.qa_criteria.map(String) : [];
  // SEO spec
  if (out.seo_spec && typeof out.seo_spec === "object") {
    for (const key of ["primary_keyword", "h1", "title_tag", "meta_description", "schema_potential"]) {
      if (out.seo_spec[key]) out.seo_spec[key] = String(out.seo_spec[key]);
    }
    for (const key of ["secondary_keywords", "h2_structure", "internal_links"]) {
      if (!Array.isArray(out.seo_spec[key])) out.seo_spec[key] = [];
      else out.seo_spec[key] = out.seo_spec[key].map(String);
    }
  } else {
    out.seo_spec = {};
  }
  // Implementation briefs: normalize role
  out.implementation_briefs = Array.isArray(out.implementation_briefs) ? out.implementation_briefs.map(b => ({
    role: normalizeEnum(b.role, VALID_BRIEF_ROLES, "dev"),
    brief: String(b.brief || ""),
  })) : [];
  // Acceptance checks by block
  out.acceptance_checks_by_block = Array.isArray(out.acceptance_checks_by_block) ? out.acceptance_checks_by_block.map(b => ({
    block: String(b.block || ""),
    checks: Array.isArray(b.checks) ? b.checks.map(String) : [],
  })) : [];
  return out;
}

function parseJson(text) {
  return extractFirstJson(text);
}

async function callClaudeRaw(prompt, apiKey) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Claude API ${res.status}`);
  }
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("") || "";
}

async function callGPTRaw(prompt, apiKey) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `GPT API ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

async function callWithRetry(rawFn, prompt, apiKey) {
  let text = await rawFn(prompt, apiKey);
  try {
    return parseJson(text);
  } catch (e) {
    // 1 Retry: Sag der AI dass JSON kaputt war
    const retryPrompt = prompt + `\n\n[WICHTIG: Deine letzte Antwort war kein valides JSON (${e.message}). Antworte NUR mit reinem JSON. Kein Text davor, kein Text danach, keine Backticks.]`;
    text = await rawFn(retryPrompt, apiKey);
    return parseJson(text);
  }
}

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  ["script", "style", "nav", "footer", "iframe", "noscript", "svg", "header"].forEach(tag =>
    doc.querySelectorAll(tag).forEach(el => el.remove())
  );
  return (doc.body?.textContent || "").replace(/\s+/g, " ").trim().substring(0, 3000);
}

async function crawlUrl(url) {
  const cleanUrl = url.startsWith("http") ? url : `https://${url}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  const tryFetch = async (fetchUrl) => {
    const res = await fetch(fetchUrl, { signal: controller.signal });
    if (res.ok) {
      const htmlRaw = await res.text();
      return { htmlRaw, textClean: stripHtml(htmlRaw) };
    }
    throw new Error(`HTTP ${res.status}`);
  };

  try {
    // Versuch 1: direkt
    try { return await tryFetch(cleanUrl); } catch (_) {}
    // Versuch 2: allorigins proxy
    try { return await tryFetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(cleanUrl)}`); } catch (_) {}
    // Versuch 3: corsproxy
    try { return await tryFetch(`https://corsproxy.io/?${encodeURIComponent(cleanUrl)}`); } catch (_) {}
    throw new Error("CORS blockiert — bitte manuell einfügen");
  } finally {
    clearTimeout(timeout);
  }
}

// ═══════════════════════════════════════════════════════════════════
// UTILITY FUNKTIONEN
// ═══════════════════════════════════════════════════════════════════

function getAvg(scores) {
  if (!scores) return 0;
  let total = 0, count = 0;
  for (const persp of Object.values(scores)) {
    for (const dim of Object.values(persp)) {
      if (dim?.s) { total += dim.s; count++; }
    }
  }
  return count ? (total / count).toFixed(1) : 0;
}

function getWeightedAvg(scores, weights, perspectives) {
  if (!scores || !weights || !perspectives) return getAvg(scores);
  let weightedSum = 0, weightSum = 0;
  for (const p of perspectives) {
    const ps = scores[p.key];
    const w = weights[p.key] || 1;
    if (!ps) continue;
    const dimAvg = ((ps.d1?.s || 0) + (ps.d2?.s || 0) + (ps.d3?.s || 0)) / 3;
    weightedSum += dimAvg * w;
    weightSum += w;
  }
  return weightSum ? (weightedSum / weightSum).toFixed(1) : 0;
}

function getDeltas(scoresA, scoresB, perspectives) {
  const deltas = [];
  if (!scoresA || !scoresB) return deltas;
  for (const key of Object.keys(scoresA)) {
    const a = scoresA[key], b = scoresB[key];
    if (!a || !b) continue;
    for (const d of ["d1", "d2", "d3"]) {
      const diff = Math.abs((a[d]?.s || 0) - (b[d]?.s || 0));
      if (diff > 2) {
        const p = perspectives?.find(p => p.key === key);
        const dimIdx = parseInt(d.replace("d", "")) - 1;
        deltas.push({ perspective: key, dimension: p?.dims[dimIdx] || d, scoreA: a[d]?.s || 0, scoreB: b[d]?.s || 0, delta: diff });
      }
    }
  }
  return deltas.sort((a, b) => b.delta - a.delta);
}

function generateMarkdown(topic, proposalA, proposalB, gamechangersA, gamechangersB, finalResult, deltas, weights, buildOutput, ruleResults, perspectives, sparringMode) {
  const persp = perspectives || MODE_PERSPECTIVES.page;
  const useWeights = sparringMode === "page" && weights;
  const w = (s) => s ? (useWeights ? getWeightedAvg(s, weights, persp) : getAvg(s)) : "–";
  let md = `# Sparring: ${topic}\n_${new Date().toLocaleDateString("de-DE")} — Sparring Engine v2 · ${SPARRING_MODES.find(m => m.key === sparringMode)?.label || "Page"}_\n\n`;

  // Build Verdict
  if (finalResult?.build_verdict) {
    const v = VERDICT_CONFIG[finalResult.build_verdict];
    md += `## 🏁 Build Verdict: ${v?.label || finalResult.build_verdict}\n${v?.desc || ""}\n\n`;
  }

  // Final Decision
  md += `## Finale Strategie\n**${finalResult?.final?.headline || "–"}**\n\n${finalResult?.final?.details || ""}\n\n`;
  md += `**Key Elements:** ${finalResult?.final?.key_elements?.join(" · ") || "–"}\n\n`;
  if (finalResult?.final?.not_building?.length) {
    md += `**Bewusst nicht gebaut:** ${finalResult.final.not_building.join(" · ")}\n\n`;
  }
  if (finalResult?.final?.open_risks?.length) {
    md += `**Offene Risiken:** ${finalResult.final.open_risks.join(" · ")}\n\n`;
  }

  // Executive Scores
  if (finalResult?.executive_scores) {
    md += `## Executive Scores\n`;
    const execScoresForMode = getExecScores(sparringMode);
    const maxScore = sparringMode === "motto" ? 5 : 10;
    for (const e of execScoresForMode) {
      const d = finalResult.executive_scores[e.key];
      if (d) md += `- **${e.label}**: ${d.s}/${maxScore} (${d.ampel}) — ${d.n}\n`;
    }
    md += "\n";
  }
  if (finalResult?.readiness) {
    md += `**Readiness:** `;
    md += READINESS_KEYS.map(r => { const d = finalResult.readiness[r.key]; return d ? `${r.label}: ${d.s}/10` : ""; }).filter(Boolean).join(" · ");
    md += "\n\n";
  }

  md += `**Finaler Perspektiv-Score:** ${w(finalResult?.final_scores)}${useWeights ? " (gewichtet)" : ""}\n\n---\n\n`;
  md += `## Vorschlag A (Claude) — Score: ${w(proposalA?.scores)}\n**${proposalA?.proposal?.headline || "–"}**\n${proposalA?.proposal?.details || ""}\n\n`;
  md += `## Vorschlag B (Gegner) — Score: ${w(proposalB?.scores)}\n**${proposalB?.proposal?.headline || "–"}**\n${proposalB?.proposal?.details || ""}\n\n---\n\n`;
  if (deltas?.length) {
    md += `## Delta-Analyse\n${deltas.map(d => `- **${d.dimension}**: A:${d.scoreA} vs B:${d.scoreB} (Δ${d.delta})`).join("\n")}\n\n`;
  }
  const allGc = [...(gamechangersA?.gamechangers || []).map(g => ({ ...g, src: "Claude" })), ...(gamechangersB?.gamechangers || []).map(g => ({ ...g, src: "Gegner" }))];
  if (allGc.length) {
    md += `## Gamechanger\n${allGc.map(g => `- **${g.title}** (${g.src}, Impact: ${g.impact}, ${g.effort}) — ${g.description}`).join("\n")}\n\n`;
  }
  if (finalResult?.final?.adopted_gamechangers?.length) {
    md += `## Gamechanger-Entscheidungen\n${finalResult.final.adopted_gamechangers.map(g => `- ${g.decision === "adopt" ? "✅" : g.decision === "modified" ? "🔄" : "❌"} ${g.source}: ${g.reason}`).join("\n")}\n\n`;
  }
  if (finalResult?.decision_log?.length) {
    md += `## Decision Log\n${finalResult.decision_log.map(d => `- **${d.dimension}** → ${d.decision}: ${d.reason}`).join("\n")}\n\n`;
  }

  // Build Output
  if (buildOutput) {
    md += `---\n\n## Build Output\n\n`;
    if (buildOutput.block_structure?.length) {
      md += `### Blockstruktur\n${buildOutput.block_structure.map(b => `${b.position}. **${b.name}** — ${b.purpose}`).join("\n")}\n\n`;
    }
    if (buildOutput.copy_blueprint) {
      const cb = buildOutput.copy_blueprint;
      md += `### Copy Blueprint\n`;
      if (cb.headline) md += `- **Headline:** "${cb.headline.text}" — ${cb.headline.logic}\n`;
      if (cb.subheadline) md += `- **Subheadline:** "${cb.subheadline.text}" — ${cb.subheadline.logic}\n`;
      if (cb.cta_primary) md += `- **CTA:** "${cb.cta_primary.text}" — ${cb.cta_primary.logic}\n`;
      if (cb.trust_elements?.length) md += `- **Trust:** ${cb.trust_elements.join(", ")}\n`;
      if (cb.objection_handling?.length) md += `- **Einwände:** ${cb.objection_handling.join("; ")}\n`;
      if (cb.proof_points?.length) md += `- **Beweise:** ${cb.proof_points.join(", ")}\n`;
      md += "\n";
    }
    if (buildOutput.components?.length) {
      md += `### Komponenten\n${buildOutput.components.map(c => `- ${c.name} (${c.type}, ${c.priority})`).join("\n")}\n\n`;
    }
    if (buildOutput.ux_notes?.length) {
      md += `### UX Notes\n${buildOutput.ux_notes.map(n => `- ${n}`).join("\n")}\n\n`;
    }
    if (buildOutput.seo_spec) {
      const s = buildOutput.seo_spec;
      md += `### SEO Spec\n`;
      if (s.primary_keyword) md += `- **Primary:** ${s.primary_keyword}\n`;
      if (s.secondary_keywords?.length) md += `- **Secondary:** ${s.secondary_keywords.join(", ")}\n`;
      if (s.h1) md += `- **H1:** ${s.h1}\n`;
      if (s.title_tag) md += `- **Title:** ${s.title_tag}\n`;
      if (s.meta_description) md += `- **Meta:** ${s.meta_description}\n`;
      md += "\n";
    }
    if (buildOutput.dev_notes?.length) {
      md += `### Dev Notes\n${buildOutput.dev_notes.map(n => `- ${n}`).join("\n")}\n\n`;
    }
    if (buildOutput.qa_criteria?.length) {
      md += `### QA Criteria\n${buildOutput.qa_criteria.map(q => `- [ ] ${q}`).join("\n")}\n\n`;
    }
    if (buildOutput.implementation_briefs?.length) {
      md += `### Implementation Briefs\n`;
      for (const b of buildOutput.implementation_briefs) {
        md += `**${(OWNER_TYPES[b.role]?.label || b.role).toUpperCase()}:**\n${b.brief}\n\n`;
      }
    }
    if (buildOutput.acceptance_checks_by_block?.length) {
      md += `### Acceptance Checks per Block\n`;
      for (const block of buildOutput.acceptance_checks_by_block) {
        md += `**${block.block}:**\n${(block.checks || []).map(c => `- [ ] ${c}`).join("\n")}\n\n`;
      }
    }

    // Strategy-spezifisch
    if (buildOutput.decision_summary) md += `### Entscheidung\n${buildOutput.decision_summary}\n\n`;
    if (buildOutput.action_plan?.length) md += `### Action Plan\n${buildOutput.action_plan.map((a, i) => `${i + 1}. ${typeof a === "string" ? a : a.title || a.action || JSON.stringify(a)}`).join("\n")}\n\n`;
    if (buildOutput.resource_requirements) md += `### Ressourcen\n${typeof buildOutput.resource_requirements === "string" ? buildOutput.resource_requirements : JSON.stringify(buildOutput.resource_requirements, null, 2)}\n\n`;
    if (buildOutput.risk_mitigation?.length) md += `### Risiko-Mitigation\n${buildOutput.risk_mitigation.map(r => `- ${typeof r === "string" ? r : r.risk || JSON.stringify(r)}`).join("\n")}\n\n`;
    if (buildOutput.success_criteria?.length) md += `### Erfolgskriterien\n${buildOutput.success_criteria.map(s => `- ${s}`).join("\n")}\n\n`;
    if (buildOutput.dependencies?.length) md += `### Abhängigkeiten\n${buildOutput.dependencies.map(d => `- ${d}`).join("\n")}\n\n`;
    if (buildOutput.review_points?.length) md += `### Review Points\n${buildOutput.review_points.map(r => `- ${r}`).join("\n")}\n\n`;
    if (buildOutput.communication_plan) md += `### Kommunikationsplan\n${buildOutput.communication_plan}\n\n`;

    // Funnel-spezifisch
    if (buildOutput.funnel_stages?.length) md += `### Funnel Stages\n${buildOutput.funnel_stages.map((s, i) => `${i + 1}. ${typeof s === "string" ? s : s.name || s.stage || JSON.stringify(s)}`).join("\n")}\n\n`;
    if (buildOutput.conversion_bottlenecks?.length) md += `### Conversion Bottlenecks\n${buildOutput.conversion_bottlenecks.map(b => `- ${typeof b === "string" ? b : b.issue || JSON.stringify(b)}`).join("\n")}\n\n`;
    if (buildOutput.tracking_plan?.length) md += `### Tracking Plan\n${buildOutput.tracking_plan.map(t => `- ${typeof t === "string" ? t : t.event || JSON.stringify(t)}`).join("\n")}\n\n`;
    if (buildOutput.ab_test_ideas?.length) md += `### A/B Test Ideas\n${buildOutput.ab_test_ideas.map(t => `- ${typeof t === "string" ? t : t.hypothesis || JSON.stringify(t)}`).join("\n")}\n\n`;

    // Content-spezifisch
    if (buildOutput.content_brief) md += `### Content Brief\n${typeof buildOutput.content_brief === "string" ? buildOutput.content_brief : JSON.stringify(buildOutput.content_brief, null, 2)}\n\n`;
    if (buildOutput.outline?.length) md += `### Outline\n${buildOutput.outline.map((o, i) => `${i + 1}. ${typeof o === "string" ? o : o.title || o.section || JSON.stringify(o)}`).join("\n")}\n\n`;
    if (buildOutput.distribution_plan?.length) md += `### Distribution Plan\n${buildOutput.distribution_plan.map(d => `- ${typeof d === "string" ? d : d.channel || JSON.stringify(d)}`).join("\n")}\n\n`;
    if (buildOutput.visual_needs?.length) md += `### Visual Needs\n${buildOutput.visual_needs.map(v => `- ${typeof v === "string" ? v : JSON.stringify(v)}`).join("\n")}\n\n`;

    // Motto-spezifisch
    if (sparringMode === "motto") {
      if (buildOutput?.budget_box) {
        md += `### Budget-Box\n`;
        if (buildOutput.budget_box.levels?.length) {
          md += `| Ebene | Gesamt (8 Kinder) | Pro Kopf |\n|-------|------------------|----------|\n`;
          for (const l of buildOutput.budget_box.levels) {
            md += `| ${l.name} | ${l.total_8_kids} | ${l.pro_kopf} |\n`;
          }
          md += "\n";
        }
        if (buildOutput.budget_box.spar_hebel?.length) md += `**Spar-Hebel:** ${buildOutput.budget_box.spar_hebel.join(" · ")}\n`;
        if (buildOutput.budget_box.kostenfallen?.length) md += `**Kostenfallen:** ${buildOutput.budget_box.kostenfallen.join(" · ")}\n`;
        if (buildOutput.budget_box.bestes_preis_leistung) md += `**Bestes Preis-Leistung:** ${buildOutput.budget_box.bestes_preis_leistung}\n`;
        md += "\n";
      }
      if (buildOutput?.parent_utility_gate_summary) {
        const pg = buildOutput.parent_utility_gate_summary;
        md += `### Parent Utility Gate\n`;
        md += `**Ergebnis:** ${pg.gate_result}\n`;
        md += `Stress-Modus: ${pg.stress_mode_score}/5 · Ambitions-Modus: ${pg.ambition_mode_score}/5\n\n`;
      }
      if (buildOutput?.differenzierung) {
        md += `### Differenzierung\n**${buildOutput.differenzierung.bewertung}** — ${buildOutput.differenzierung.note}\n\n`;
      }
    }
  }

  // Rule Engine Results
  if (ruleResults?.length) {
    const failed = ruleResults.filter(r => !r.pass);
    const passed = ruleResults.filter(r => r.pass);
    const score = Math.round((passed.length / ruleResults.length) * 100);
    md += `## 📏 Rule Engine — ${score}%\n`;
    md += `${passed.length}/${ruleResults.length} bestanden\n\n`;
    if (failed.length) {
      md += `### Nicht bestanden\n${failed.map(r => `- ${RULE_SEVERITY[r.severity]?.icon || "⚪"} **${r.label}** — ${r.detail}`).join("\n")}\n\n`;
    }
    if (passed.length) {
      md += `### Bestanden\n${passed.map(r => `- ✅ ${r.label} — ${r.detail}`).join("\n")}\n\n`;
    }
  }

  return md;
}

// ═══════════════════════════════════════════════════════════════════
// UI KOMPONENTEN
// ═══════════════════════════════════════════════════════════════════

function ScoreCell({ score, note, dimName }) {
  const s = score || 0;
  const bg = SCORE_COLORS[s] || "#374151";
  const tip = dimName ? `${dimName}: ${note || "–"}` : (note || "");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <div title={tip} style={{
        width: 36, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: bg + "22", color: bg, border: `1px solid ${bg}55`,
        borderRadius: 4, fontSize: 13, fontWeight: 700, cursor: tip ? "help" : "default",
        fontFamily: "'JetBrains Mono', monospace"
      }}>{s || "–"}</div>
      {dimName && <div style={{ fontSize: 7, color: "#4b5563", textAlign: "center", lineHeight: 1, maxWidth: 36, overflow: "hidden" }}>{dimName}</div>}
    </div>
  );
}

function ScoreMatrix({ scores, label, weights, perspectives }) {
  const persp = perspectives || MODE_PERSPECTIVES.page;
  if (!scores) return null;
  const raw = getAvg(scores);
  const weighted = weights ? getWeightedAvg(scores, weights, persp) : null;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
      <div style={{ display: "grid", gridTemplateColumns: "110px repeat(3, 40px) 46px", gap: 3, alignItems: "start" }}>
        <div />
        {["D1", "D2", "D3"].map(d => <div key={d} style={{ fontSize: 8, color: "#4b5563", textAlign: "center" }}>{d}</div>)}
        <div style={{ fontSize: 8, color: "#4b5563", textAlign: "center" }}>Ø</div>
        {persp.map(p => {
          const ps = scores[p.key];
          if (!ps) return null;
          const avg = ((ps.d1?.s || 0) + (ps.d2?.s || 0) + (ps.d3?.s || 0)) / 3;
          const w = weights?.[p.key] || 1;
          return (
            <React.Fragment key={p.key}>
              <div style={{ fontSize: 11, color: "#d1d5db", display: "flex", alignItems: "center", gap: 3, minHeight: 36 }}>
                <span>{p.icon}</span><span>{p.label}</span>
                {w !== 1 && <span style={{ fontSize: 8, color: w > 1 ? "#22c55e" : "#f59e0b", fontWeight: 600 }}>{w}x</span>}
              </div>
              <ScoreCell score={ps.d1?.s} note={ps.d1?.n} dimName={p.dims[0]} />
              <ScoreCell score={ps.d2?.s} note={ps.d2?.n} dimName={p.dims[1]} />
              <ScoreCell score={ps.d3?.s} note={ps.d3?.n} dimName={p.dims[2]} />
              <div style={{
                fontSize: 12, fontWeight: 700, textAlign: "center", minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center",
                color: SCORE_COLORS[Math.round(avg)] || "#9ca3af", fontFamily: "'JetBrains Mono', monospace"
              }}>{avg.toFixed(1)}</div>
            </React.Fragment>
          );
        })}
      </div>
      <div style={{ marginTop: 8, padding: "6px 10px", background: "#111827", borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#6b7280" }}>GESAMT</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {weighted && weighted !== raw && (
            <span style={{ fontSize: 11, color: "#4b5563" }}>roh: <span style={{ color: SCORE_COLORS[Math.round(raw)] || "#9ca3af", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{raw}</span></span>
          )}
          <span style={{ fontSize: 18, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: SCORE_COLORS[Math.round(weighted || raw)] || "#9ca3af" }}>{weighted || raw}</span>
        </div>
      </div>
    </div>
  );
}

function GamechangerCard({ gc, source, perspectives }) {
  const persp = perspectives || MODE_PERSPECTIVES.page;
  const effortColors = { quick_win: "#22c55e", medium: "#f59e0b", heavy: "#ef4444" };
  const effortLabels = { quick_win: "Quick Win", medium: "Medium", heavy: "Heavy" };
  return (
    <div style={{ padding: 14, background: "#111827", borderRadius: 8, border: `1px solid ${effortColors[gc.effort] || "#374151"}33`, marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f3f4f6" }}>🚀 {gc.title}</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: effortColors[gc.effort] + "22", color: effortColors[gc.effort], fontWeight: 600 }}>
            {effortLabels[gc.effort] || gc.effort}
          </span>
          <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: SCORE_COLORS[gc.impact] || "#9ca3af" }}>{gc.impact}</span>
        </div>
      </div>
      <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>{gc.description}</div>
      <div style={{ marginTop: 6, display: "flex", gap: 4, flexWrap: "wrap" }}>
        <span style={{ fontSize: 9, color: "#6b7280" }}>{source}</span>
        {gc.benefits?.map(b => (
          <span key={b} style={{ fontSize: 9, padding: "1px 6px", borderRadius: 8, background: "#1e3a5f", color: "#60a5fa" }}>
            {persp.find(p => p.key === b)?.label || b}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ stage, step, total }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1 }}>{stage}</span>
        <span style={{ fontSize: 11, color: "#60a5fa", fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: "#1f2937", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

function Sparkline({ values, width = 80, height = 20 }) {
  if (!values || values.length < 2) return null;
  const min = Math.min(...values) - 0.5;
  const max = Math.max(...values) + 0.5;
  const range = max - min || 1;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * width},${height - ((v - min) / range) * height}`).join(" ");
  const lastX = width;
  const lastY = height - ((values[values.length - 1] - min) / range) * height;
  return (
    <svg width={width} height={height} style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 8 }}>
      <polyline points={pts} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="2.5" fill="#3b82f6" />
    </svg>
  );
}

function HistoryPanel({ history }) {
  if (!history.length) return null;
  const scores = history.map(h => h.avgScore);
  return (
    <div style={{ padding: 12, background: "#0f172a", borderRadius: 8, border: "1px solid #1e3a5f33", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
          📋 Projekt-Historie ({history.length})
        </div>
        <Sparkline values={scores} />
      </div>
      {history.map((h, i) => {
        const vcfg = h.verdict && VERDICT_CONFIG[h.verdict];
        return (
          <div key={i} style={{ padding: "8px 0", borderBottom: i < history.length - 1 ? "1px solid #1f2937" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: "#6b7280" }}>{h.date}</span>
                  <span style={{ fontSize: 12, color: "#d1d5db", fontWeight: 600 }}>{h.topic}</span>
                  {vcfg && <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: vcfg.bg, color: vcfg.color, fontWeight: 700 }}>{vcfg.label}</span>}
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{h.headline}</div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: SCORE_COLORS[Math.round(h.avgScore)] || "#9ca3af" }}>{h.avgScore}</span>
            </div>
            {/* Exec score mini-bar */}
            {h.execScores && (
              <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                {EXEC_SCORES.map(e => {
                  const d = h.execScores[e.key];
                  if (!d) return null;
                  return <span key={e.key} style={{ fontSize: 9, padding: "1px 5px", borderRadius: 3, background: (AMPEL[d.ampel] || "#6b7280") + "22", color: AMPEL[d.ampel] || "#6b7280" }}>{e.label.substring(0, 5)} {d.s}</span>;
                })}
              </div>
            )}
            {h.topRisks?.length > 0 && (
              <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 4 }}>⚠ {h.topRisks.join(" · ")}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CrawlResults({ results }) {
  if (!results?.length) return null;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Gecrawlte Seiten</div>
      {results.map((r, i) => (
        <div key={i} style={{ padding: "6px 10px", background: r.ok ? "#111827" : "#7f1d1d22", borderRadius: 6, marginBottom: 4, border: `1px solid ${r.ok ? "#1f2937" : "#dc262644"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: r.ok ? "#60a5fa" : "#fca5a5" }}>{r.url}</span>
            <span style={{ fontSize: 10, color: r.ok ? "#22c55e" : "#ef4444" }}>{r.ok ? `${r.text.length} Z.` : r.error || "Fehler"}</span>
          </div>
          {r.ok && <div style={{ fontSize: 10, color: "#6b7280", marginTop: 4, maxHeight: 36, overflow: "hidden" }}>{r.text.substring(0, 200)}...</div>}
        </div>
      ))}
    </div>
  );
}

function ProposalCard({ proposal, scores, label, color, borderColor, tagBg, tagColor, weights, perspectives }) {
  if (!proposal) return null;
  return (
    <div style={{ padding: 14, background: "#0f172a", borderRadius: 8, border: `1px solid ${borderColor}` }}>
      <div style={{ fontSize: 11, color, fontWeight: 700, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#f3f4f6", marginBottom: 6 }}>{proposal.proposal?.headline}</div>
      <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.6 }}>{proposal.proposal?.details}</div>
      {proposal.proposal?.key_elements && (
        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
          {proposal.proposal.key_elements.map((el, i) => (
            <span key={i} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: tagBg, color: tagColor }}>{el}</span>
          ))}
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        <ScoreMatrix scores={scores} label="Gremium-Score" weights={weights} perspectives={perspectives} />
      </div>
    </div>
  );
}

const CAT_COLORS = { content: "#f59e0b", design: "#ec4899", dev: "#3b82f6", seo: "#22c55e", legal: "#a855f7", analytics: "#06b6d4" };
const PRIO_COLORS = { must: "#dc2626", should: "#f59e0b", could: "#6b7280" };
const EFFORT_LABELS = { xs: "XS", s: "S", m: "M", l: "L", xl: "XL" };

function TaskCard({ task, index, isActive, result, onSelect }) {
  const cat = CAT_COLORS[task.category] || "#6b7280";
  const prio = PRIO_COLORS[task.priority] || "#6b7280";
  const done = !!result;
  return (
    <div onClick={() => onSelect(index)} style={{
      padding: 12, background: isActive ? "#1e3a5f22" : done ? "#16a34a0a" : "#111827",
      borderRadius: 8, cursor: "pointer", marginBottom: 6,
      border: `1px solid ${isActive ? "#3b82f6" : done ? "#16a34a33" : "#1f2937"}`,
      transition: "all 0.15s ease"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 6, background: prio + "22", color: prio, fontWeight: 700, textTransform: "uppercase" }}>{task.priority}</span>
            <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 6, background: cat + "22", color: cat, fontWeight: 600 }}>{task.category}</span>
            <span style={{ fontSize: 10, color: "#6b7280" }}>{EFFORT_LABELS[task.effort] || task.effort}</span>
            {task.owner_type && OWNER_TYPES[task.owner_type] && (
              <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 4, background: OWNER_TYPES[task.owner_type].color + "22", color: OWNER_TYPES[task.owner_type].color, fontWeight: 600 }}>
                {OWNER_TYPES[task.owner_type].label}
              </span>
            )}
            {task.auto_eligible && <span style={{ fontSize: 9, color: "#22c55e" }} title={task.auto_reason}>AUTO</span>}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f3f4f6" }}>{task.title}</div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, lineHeight: 1.4 }}>{task.description}</div>
          {task.definition_of_done && (
            <div style={{ fontSize: 10, color: "#6b7280", marginTop: 4, fontStyle: "italic" }}>DoD: {task.definition_of_done}</div>
          )}
          {task.dependencies?.length > 0 && (
            <div style={{ fontSize: 9, color: "#6b7280", marginTop: 4 }}>Abhängig von: {task.dependencies.join(", ")}</div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 40 }}>
          {done ? (
            <>
              <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: SCORE_COLORS[Math.round(result.score)] || "#9ca3af" }}>{result.score}</span>
              <span style={{ fontSize: 8, color: "#22c55e" }}>DONE</span>
            </>
          ) : (
            <span style={{ fontSize: 20, color: "#374151" }}>›</span>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskList({ tasks, taskResults, activeIdx, onSelect, project }) {
  if (!tasks?.length) return null;
  const done = Object.keys(taskResults).length;
  const musts = tasks.filter(t => t.priority === "must").length;
  const autoCount = tasks.filter(t => t.auto_eligible).length;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ padding: 12, background: "#0f172a", borderRadius: 8, border: "1px solid #1e3a5f33", marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#f3f4f6", marginBottom: 4 }}>{project?.name || "Projekt"}</div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8 }}>{project?.summary}</div>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: 11, color: "#6b7280" }}>{tasks.length} Tasks</span>
          <span style={{ fontSize: 11, color: "#dc2626" }}>{musts} Must</span>
          <span style={{ fontSize: 11, color: "#22c55e" }}>{autoCount} Auto</span>
          <span style={{ fontSize: 11, color: "#3b82f6" }}>{done}/{tasks.length} Done</span>
        </div>
      </div>
      {tasks.map((t, i) => (
        <TaskCard key={t.id} task={t} index={i} isActive={activeIdx === i} result={taskResults[t.id]} onSelect={onSelect} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EXECUTIVE SCORE & BUILD OUTPUT KOMPONENTEN
// ═══════════════════════════════════════════════════════════════════

function BuildVerdictBadge({ verdict }) {
  const cfg = VERDICT_CONFIG[verdict] || VERDICT_CONFIG.needs_revision;
  return (
    <div style={{ padding: "14px 20px", background: cfg.bg, border: `2px solid ${cfg.border}`, borderRadius: 10, textAlign: "center", marginBottom: 16 }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: cfg.color, letterSpacing: 2, fontFamily: "'JetBrains Mono', monospace" }}>{cfg.label}</div>
      <div style={{ fontSize: 11, color: cfg.color, opacity: 0.8, marginTop: 4 }}>{cfg.desc}</div>
    </div>
  );
}

function ExecScoreRow({ config, data }) {
  if (!data) return null;
  const ampelColor = AMPEL[data.ampel] || "#6b7280";
  const scoreColor = SCORE_COLORS[data.s] || "#6b7280";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #1f2937" }}>
      <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{config.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#e5e7eb" }}>{config.label}</div>
        <div style={{ fontSize: 10, color: "#9ca3af", lineHeight: 1.4 }}>{data.n}</div>
      </div>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: ampelColor, flexShrink: 0 }} title={data.ampel} />
      <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: scoreColor, minWidth: 28, textAlign: "right" }}>{data.s}</div>
    </div>
  );
}

function ExecutiveScoresPanel({ execScores, readiness }) {
  if (!execScores) return null;
  const avgExec = EXEC_SCORES.reduce((sum, e) => sum + (execScores[e.key]?.s || 0), 0) / EXEC_SCORES.length;
  return (
    <div style={{ padding: 16, background: "#0f172a", borderRadius: 10, border: "1px solid #1e3a5f44", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", textTransform: "uppercase", letterSpacing: 1 }}>Executive Scores</div>
        <div style={{ fontSize: 20, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: SCORE_COLORS[Math.round(avgExec)] || "#9ca3af" }}>{avgExec.toFixed(1)}</div>
      </div>
      {EXEC_SCORES.map(e => <ExecScoreRow key={e.key} config={e} data={execScores[e.key]} />)}
      {readiness && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1e3a5f44" }}>
          <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Readiness</div>
          <div style={{ display: "flex", gap: 12 }}>
            {READINESS_KEYS.map(r => {
              const d = readiness[r.key];
              if (!d) return null;
              const c = d.s >= 7 ? "#22c55e" : d.s >= 5 ? "#f59e0b" : "#ef4444";
              return (
                <div key={r.key} style={{ flex: 1, padding: "8px 10px", background: "#111827", borderRadius: 6, border: `1px solid ${c}33` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600 }}>{r.label}</span>
                    <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: c }}>{d.s}</span>
                  </div>
                  <div style={{ fontSize: 9, color: "#6b7280", lineHeight: 1.3 }}>{d.n}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function RuleResultsPanel({ ruleResults }) {
  if (!ruleResults || !ruleResults.length) return null;
  const [showPassed, setShowPassed] = useState(false);
  const failed = ruleResults.filter(r => !r.pass);
  const passed = ruleResults.filter(r => r.pass);
  const criticalFail = failed.filter(r => r.severity === "critical").length;
  const warningFail = failed.filter(r => r.severity === "warning").length;
  const score = Math.round((passed.length / ruleResults.length) * 100);
  const scoreColor = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444";

  const renderRule = (r) => (
    <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #111827", fontSize: 12 }}>
      <span style={{ width: 20, textAlign: "center" }}>{r.pass ? "✅" : RULE_SEVERITY[r.severity]?.icon || "⚪"}</span>
      <span style={{ flex: 1, color: r.pass ? "#6b7280" : "#d1d5db" }}>{r.label}</span>
      <span style={{ color: r.pass ? "#4ade80" : RULE_SEVERITY[r.severity]?.color || "#9ca3af", fontSize: 11, maxWidth: 220, textAlign: "right" }}>{r.detail}</span>
      <span style={{ fontSize: 9, color: "#4b5563", width: 40, textAlign: "right" }}>
        {r.source === "crawl" ? "IST" : r.source === "build" ? "SOLL" : "CROSS"}
      </span>
    </div>
  );

  return (
    <div style={{ background: "#0d1117", borderRadius: 10, padding: 16, border: `1px solid ${scoreColor}33` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#f9fafb" }}>📏 Rule Engine</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: scoreColor }}>{score}%</span>
        </div>
        <div style={{ display: "flex", gap: 8, fontSize: 11 }}>
          {criticalFail > 0 && <span style={{ background: "#ef444422", color: "#ef4444", padding: "2px 8px", borderRadius: 6 }}>🔴 {criticalFail} kritisch</span>}
          {warningFail > 0 && <span style={{ background: "#f59e0b22", color: "#f59e0b", padding: "2px 8px", borderRadius: 6 }}>🟡 {warningFail} Warnungen</span>}
          <span style={{ background: "#22c55e22", color: "#22c55e", padding: "2px 8px", borderRadius: 6 }}>✅ {passed.length} bestanden</span>
        </div>
      </div>
      {failed.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4, fontWeight: 600 }}>Nicht bestanden</div>
          {failed.map(renderRule)}
        </div>
      )}
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setShowPassed(!showPassed)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 11, cursor: "pointer", padding: 0 }}>
          {showPassed ? "▼" : "▶"} {passed.length} bestandene Regeln {showPassed ? "ausblenden" : "anzeigen"}
        </button>
        {showPassed && passed.map(renderRule)}
      </div>
    </div>
  );
}

function BuildOutputPanel({ buildOutput, sparringMode }) {
  if (!buildOutput) return null;
  const mode = sparringMode || "page";

  const MODE_TABS = {
    page: [
      { key: "structure", label: "Blockstruktur" },
      { key: "copy", label: "Copy Blueprint" },
      { key: "components", label: "Komponenten" },
      { key: "ux", label: "UX Notes" },
      { key: "seo", label: "SEO Spec" },
      { key: "dev", label: "Dev Notes" },
      { key: "qa", label: "QA Criteria" },
      { key: "briefs", label: "Briefs" },
      { key: "checks", label: "Block-Checks" },
    ],
    strategy: [
      { key: "decision", label: "Entscheidung" },
      { key: "action_plan", label: "Action Plan" },
      { key: "resources", label: "Ressourcen" },
      { key: "risk", label: "Risiko-Mitigation" },
      { key: "success", label: "Erfolgskriterien" },
      { key: "deps", label: "Abhängigkeiten" },
      { key: "review", label: "Review Points" },
      { key: "comms", label: "Kommunikation" },
      { key: "qa", label: "QA Criteria" },
    ],
    funnel: [
      { key: "stages", label: "Funnel Stages" },
      { key: "bottlenecks", label: "Bottlenecks" },
      { key: "tracking", label: "Tracking Plan" },
      { key: "abtests", label: "A/B Tests" },
      { key: "copy", label: "Copy Blueprint" },
      { key: "qa", label: "QA Criteria" },
    ],
    content: [
      { key: "brief", label: "Content Brief" },
      { key: "outline", label: "Outline" },
      { key: "seo", label: "SEO Spec" },
      { key: "copy", label: "Copy Blueprint" },
      { key: "distribution", label: "Distribution" },
      { key: "visuals", label: "Visuals" },
      { key: "qa", label: "QA Criteria" },
    ],
  };

  const tabs = MODE_TABS[mode] || MODE_TABS.page;
  const [tab, setTab] = useState(tabs[0]?.key || "structure");

  const sectionStyle = { fontSize: 12, color: "#d1d5db", lineHeight: 1.7 };
  const labelStyle = { fontSize: 10, color: "#6b7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 };
  const itemStyle = { padding: "6px 10px", background: "#111827", borderRadius: 6, marginBottom: 4, border: "1px solid #1f2937" };

  // Hilfsfunktion: Array-Elemente robust rendern (string oder object)
  const renderItem = (item, fallbackKeys) => {
    if (typeof item === "string") return item;
    for (const k of fallbackKeys) { if (item[k]) return String(item[k]); }
    return JSON.stringify(item);
  };

  const ListSection = ({ items, fallbackKeys = ["title", "name", "action", "issue"] }) => (
    <div>{items.map((item, i) => <div key={i} style={{ ...itemStyle, ...sectionStyle }}>• {renderItem(item, fallbackKeys)}</div>)}</div>
  );

  const NumberedSection = ({ items, fallbackKeys = ["title", "name", "stage"] }) => (
    <div>{items.map((item, i) => (
      <div key={i} style={{ ...itemStyle, display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: "#374151", minWidth: 24 }}>{i + 1}</span>
        <div style={{ fontSize: 12, color: "#f3f4f6" }}>{renderItem(item, fallbackKeys)}</div>
      </div>
    ))}</div>
  );

  const TextBlock = ({ text }) => {
    if (!text) return null;
    const content = typeof text === "string" ? text : JSON.stringify(text, null, 2);
    return <div style={{ ...itemStyle, ...sectionStyle, whiteSpace: "pre-wrap" }}>{content}</div>;
  };

  // Gemeinsame Sektionen (kommen in mehreren Modi vor)
  const CopyBlueprint = () => {
    const cb = buildOutput.copy_blueprint;
    if (!cb) return <div style={sectionStyle}>Keine Copy-Daten vorhanden</div>;
    return (
      <div>
        {[
          { label: "Headline", val: cb.headline },
          { label: "Subheadline", val: cb.subheadline },
          { label: "CTA Primary", val: cb.cta_primary },
          { label: "CTA Secondary", val: cb.cta_secondary },
        ].filter(x => x.val?.text).map((x, i) => (
          <div key={i} style={itemStyle}>
            <div style={labelStyle}>{x.label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#f3f4f6" }}>{x.val.text}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{x.val.logic}</div>
          </div>
        ))}
        {cb.trust_elements?.length > 0 && <div style={{ marginTop: 8 }}><div style={labelStyle}>Trust-Elemente</div>{cb.trust_elements.map((t, i) => <div key={i} style={{ ...sectionStyle, padding: "2px 0" }}>• {t}</div>)}</div>}
        {cb.objection_handling?.length > 0 && <div style={{ marginTop: 8 }}><div style={labelStyle}>Einwandbehandlung</div>{cb.objection_handling.map((o, i) => <div key={i} style={{ ...sectionStyle, padding: "2px 0" }}>• {o}</div>)}</div>}
        {cb.proof_points?.length > 0 && <div style={{ marginTop: 8 }}><div style={labelStyle}>Beweisführung</div>{cb.proof_points.map((p, i) => <div key={i} style={{ ...sectionStyle, padding: "2px 0" }}>• {p}</div>)}</div>}
      </div>
    );
  };

  const SeoSpec = () => {
    const s = buildOutput.seo_spec;
    if (!s) return <div style={sectionStyle}>Keine SEO-Daten vorhanden</div>;
    return (
      <div>
        {s.primary_keyword && <div style={itemStyle}><div style={labelStyle}>Primary Keyword</div><div style={{ fontSize: 13, fontWeight: 600, color: "#22c55e" }}>{s.primary_keyword}</div></div>}
        {s.secondary_keywords?.length > 0 && <div style={itemStyle}><div style={labelStyle}>Secondary</div><div style={sectionStyle}>{s.secondary_keywords.join(" · ")}</div></div>}
        {s.h1 && <div style={itemStyle}><div style={labelStyle}>H1</div><div style={sectionStyle}>{s.h1}</div></div>}
        {s.h2_structure?.length > 0 && <div style={itemStyle}><div style={labelStyle}>H2 Struktur</div>{s.h2_structure.map((h, i) => <div key={i} style={{ ...sectionStyle, padding: "1px 0" }}>{i + 1}. {h}</div>)}</div>}
        {s.title_tag && <div style={itemStyle}><div style={labelStyle}>Title Tag</div><div style={sectionStyle}>{s.title_tag}</div></div>}
        {s.meta_description && <div style={itemStyle}><div style={labelStyle}>Meta Description</div><div style={sectionStyle}>{s.meta_description}</div></div>}
        {s.schema_potential && <div style={itemStyle}><div style={labelStyle}>Schema</div><div style={sectionStyle}>{s.schema_potential}</div></div>}
      </div>
    );
  };

  const QaCriteria = () => {
    const qa = buildOutput.qa_criteria;
    if (!qa?.length) return <div style={sectionStyle}>Keine QA-Kriterien vorhanden</div>;
    return <div>{qa.map((q, i) => <div key={i} style={{ ...itemStyle, display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 12, color: "#6b7280" }}>☐</span><span style={sectionStyle}>{q}</span></div>)}</div>;
  };

  // Tab-Content-Rendering
  const renderTabContent = () => {
    // ── PAGE ──
    if (mode === "page") {
      if (tab === "structure" && buildOutput.block_structure) return (
        <div>{buildOutput.block_structure.map((b, i) => (
          <div key={i} style={{ ...itemStyle, display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: "#374151", minWidth: 24 }}>{b.position}</span>
            <div><div style={{ fontSize: 12, fontWeight: 600, color: "#f3f4f6" }}>{b.name}</div><div style={{ fontSize: 10, color: "#9ca3af" }}>{b.purpose}</div></div>
          </div>
        ))}</div>
      );
      if (tab === "copy") return <CopyBlueprint />;
      if (tab === "components" && buildOutput.components) return (
        <div>{buildOutput.components.map((c, i) => (
          <div key={i} style={{ ...itemStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#f3f4f6", fontWeight: 500 }}>{c.name}</span>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: "#1f2937", color: "#9ca3af" }}>{c.type}</span>
              <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: c.priority === "must" ? "#dc262622" : "#f59e0b22", color: c.priority === "must" ? "#ef4444" : "#f59e0b", fontWeight: 600 }}>{c.priority}</span>
            </div>
          </div>
        ))}</div>
      );
      if (tab === "ux" && buildOutput.ux_notes) return <ListSection items={buildOutput.ux_notes} />;
      if (tab === "seo") return <SeoSpec />;
      if (tab === "dev" && buildOutput.dev_notes) return <ListSection items={buildOutput.dev_notes} />;
      if (tab === "qa") return <QaCriteria />;
      if (tab === "briefs" && buildOutput.implementation_briefs) return (
        <div>{buildOutput.implementation_briefs.map((b, i) => {
          const ot = OWNER_TYPES[b.role];
          return (
            <div key={i} style={{ ...itemStyle, borderLeft: `3px solid ${ot?.color || "#6b7280"}` }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: (ot?.color || "#6b7280") + "22", color: ot?.color || "#6b7280", fontWeight: 700, textTransform: "uppercase" }}>{ot?.label || b.role}</span>
              </div>
              <div style={{ fontSize: 12, color: "#d1d5db", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{b.brief}</div>
            </div>
          );
        })}</div>
      );
      if (tab === "checks" && buildOutput.acceptance_checks_by_block) return (
        <div>{buildOutput.acceptance_checks_by_block.map((block, i) => (
          <div key={i} style={{ ...itemStyle, marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#f3f4f6", marginBottom: 6 }}>{block.block}</div>
            {block.checks?.map((c, j) => (
              <div key={j} style={{ display: "flex", gap: 8, alignItems: "center", padding: "3px 0" }}>
                <span style={{ fontSize: 11, color: "#6b7280" }}>☐</span><span style={{ fontSize: 11, color: "#d1d5db" }}>{c}</span>
              </div>
            ))}
          </div>
        ))}</div>
      );
    }

    // ── STRATEGY ──
    if (mode === "strategy") {
      if (tab === "decision") return <TextBlock text={buildOutput.decision_summary} />;
      if (tab === "action_plan" && buildOutput.action_plan?.length) return <NumberedSection items={buildOutput.action_plan} fallbackKeys={["title", "action", "step"]} />;
      if (tab === "resources") return <TextBlock text={buildOutput.resource_requirements} />;
      if (tab === "risk" && buildOutput.risk_mitigation?.length) return <ListSection items={buildOutput.risk_mitigation} fallbackKeys={["risk", "mitigation", "title"]} />;
      if (tab === "success" && buildOutput.success_criteria?.length) return <ListSection items={buildOutput.success_criteria} />;
      if (tab === "deps" && buildOutput.dependencies?.length) return <ListSection items={buildOutput.dependencies} />;
      if (tab === "review" && buildOutput.review_points?.length) return <ListSection items={buildOutput.review_points} />;
      if (tab === "comms") return <TextBlock text={buildOutput.communication_plan} />;
      if (tab === "qa") return <QaCriteria />;
    }

    // ── FUNNEL ──
    if (mode === "funnel") {
      if (tab === "stages" && buildOutput.funnel_stages?.length) return <NumberedSection items={buildOutput.funnel_stages} fallbackKeys={["name", "stage", "title"]} />;
      if (tab === "bottlenecks" && buildOutput.conversion_bottlenecks?.length) return <ListSection items={buildOutput.conversion_bottlenecks} fallbackKeys={["issue", "bottleneck", "title"]} />;
      if (tab === "tracking" && buildOutput.tracking_plan?.length) return <ListSection items={buildOutput.tracking_plan} fallbackKeys={["event", "metric", "title"]} />;
      if (tab === "abtests" && buildOutput.ab_test_ideas?.length) return <ListSection items={buildOutput.ab_test_ideas} fallbackKeys={["hypothesis", "title", "test"]} />;
      if (tab === "copy") return <CopyBlueprint />;
      if (tab === "qa") return <QaCriteria />;
    }

    // ── CONTENT ──
    if (mode === "content") {
      if (tab === "brief") return <TextBlock text={buildOutput.content_brief} />;
      if (tab === "outline" && buildOutput.outline?.length) return <NumberedSection items={buildOutput.outline} fallbackKeys={["title", "section", "heading"]} />;
      if (tab === "seo") return <SeoSpec />;
      if (tab === "copy") return <CopyBlueprint />;
      if (tab === "distribution" && buildOutput.distribution_plan?.length) return <ListSection items={buildOutput.distribution_plan} fallbackKeys={["channel", "platform", "title"]} />;
      if (tab === "visuals" && buildOutput.visual_needs?.length) return <ListSection items={buildOutput.visual_needs} fallbackKeys={["type", "description", "title"]} />;
      if (tab === "qa") return <QaCriteria />;
    }

    return <div style={{ fontSize: 11, color: "#6b7280", fontStyle: "italic" }}>Keine Daten für diesen Tab vorhanden</div>;
  };

  return (
    <div style={{ padding: 16, background: "#0f172a", borderRadius: 10, border: "1px solid #1e3a5f44", marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
        Build Output · {SPARRING_MODES.find(m => m.key === mode)?.label || "Page"}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none",
            background: tab === t.key ? "#1e3a5f" : "#111827", color: tab === t.key ? "#60a5fa" : "#6b7280",
          }}>{t.label}</button>
        ))}
      </div>
      {renderTabContent()}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HAUPT-KOMPONENTE
// ═══════════════════════════════════════════════════════════════════

export default function SparringEngine() {
  // Config
  const [anthropicKey, setAnthropicKey] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [projectType, setProjectType] = useState("custom");
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [crawlUrls, setCrawlUrls] = useState("");
  const [manualContent, setManualContent] = useState("");
  const [crawlResults, setCrawlResults] = useState([]);
  // Sparring State
  const [stage, setStage] = useState("idle"); // idle|crawl|round1|feedback|round2|round3|done|error
  const [stageLabel, setStageLabel] = useState("");
  const [progress, setProgress] = useState({ step: 0, total: 1 });
  const [proposalA, setProposalA] = useState(null);
  const [proposalB, setProposalB] = useState(null);
  const [gamechangersA, setGamechangersA] = useState(null);
  const [gamechangersB, setGamechangersB] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [deltas, setDeltas] = useState([]);
  const [error, setError] = useState(null);
  const [failedAt, setFailedAt] = useState(null);
  const [log, setLog] = useState([]);
  // User Feedback
  const [userFeedback, setUserFeedback] = useState("");
  // Persistenz
  const [decisionHistory, setDecisionHistory] = useState([]);
  // Export
  const [copied, setCopied] = useState(false);
  // Sparring Mode (page|strategy|funnel|content) + Import Mode (single|strategy)
  const [sparringMode, setSparringMode] = useState("page");
  const [runMode, setRunMode] = useState("single"); // single|strategy
  const [strategyDoc, setStrategyDoc] = useState("");
  const [extractedTasks, setExtractedTasks] = useState([]);
  const [extractedProject, setExtractedProject] = useState(null);
  const [selectedTaskIdx, setSelectedTaskIdx] = useState(null);
  const [taskResults, setTaskResults] = useState({});
  const [extracting, setExtracting] = useState(false);
  // Build Output
  const [buildOutput, setBuildOutput] = useState(null);
  const [ruleResults, setRuleResults] = useState(null);

  const abortRef = useRef(false);
  const ctxRef = useRef({ crawlData: [], ctxBlock: "" });
  const currentWeights = PROJECT_TYPES.find(p => p.key === projectType)?.weights || PROJECT_TYPES[0].weights;
  const aiB = openaiKey ? "GPT-4o" : "Claude-B";
  const canStart = topic.trim() && anthropicKey.trim();

  const addLog = useCallback((msg) => {
    setLog(prev => [...prev, { time: new Date().toLocaleTimeString(), msg }]);
  }, []);

  const callA = useCallback((prompt) => callWithRetry(callClaudeRaw, prompt, anthropicKey), [anthropicKey]);
  const callB = useCallback((prompt) => {
    if (openaiKey) return callWithRetry(callGPTRaw, prompt, openaiKey);
    const mod = prompt.replace("Du bist ein Experte", "Du bist ein KRITISCHER Gegenpart. Du denkst anders, provokanter, und hinterfragst Konventionen. Du bist ein Experte");
    return callWithRetry(callClaudeRaw, mod, anthropicKey);
  }, [openaiKey, anthropicKey]);

  // ═══ STRATEGY: TASK EXTRACTION ═══
  const extractTasks = useCallback(async () => {
    if (!strategyDoc.trim() || !anthropicKey.trim()) return;
    setExtracting(true);
    setError(null);
    addLog("📄 Extrahiere Tasks aus Strategie-Dokument...");
    try {
      const crawlText = ctxRef.current.crawlData.filter(c => c.ok).map(c => `[${c.url}]\n${c.text.substring(0, 1000)}`).join("\n\n") || "";
      const rawResult = await callWithRetry(callClaudeRaw, TASK_EXTRACTION_PROMPT(strategyDoc, crawlText), anthropicKey);
      const result = sanitizeTasks(rawResult);
      setExtractedProject(result.project || null);
      setExtractedTasks(result.tasks || []);
      setTaskResults({});
      setSelectedTaskIdx(null);
      addLog(`✅ ${(result.tasks || []).length} Tasks extrahiert — ${(result.tasks || []).filter(t => t.auto_eligible).length} auto-eligible`);
    } catch (e) {
      setError("Task-Extraktion fehlgeschlagen: " + e.message);
      addLog("❌ " + e.message);
    } finally {
      setExtracting(false);
    }
  }, [strategyDoc, anthropicKey, addLog]);

  // ═══ STAGE MACHINE — Clean Round Functions ═══
  const hasCrawl = crawlUrls.trim() || manualContent.trim();
  const totalSteps = hasCrawl ? 8 : 7;
  const step = (n) => ({ step: n, total: totalSteps });

  const runCrawl = useCallback(async () => {
    if (crawlUrls.trim()) {
      setStage("crawl"); setStageLabel("Website-Analyse"); setProgress(step(1));
      addLog("🌐 Crawle Website(n)...");
      const urls = crawlUrls.split("\n").map(u => u.trim()).filter(Boolean);
      const data = [];
      for (const url of urls) {
        if (abortRef.current) return null;
        try {
          const { htmlRaw, textClean } = await crawlUrl(url);
          data.push({ url, text: textClean, htmlRaw, ok: true });
          addLog(`✅ ${url} — ${textClean.length} Z.`);
        } catch (e) {
          data.push({ url, text: "", htmlRaw: "", ok: false, error: e.message });
          addLog(`⚠️ ${url} — ${e.message}`);
        }
      }
      setCrawlResults(data);
      ctxRef.current.crawlData = data;
    }
    if (manualContent.trim()) {
      ctxRef.current.crawlData.push({ url: "Manuell", text: manualContent.trim(), htmlRaw: "", ok: true });
      addLog("📝 Manueller Content hinzugefügt");
    }
    ctxRef.current.ctxBlock = buildContextBlock(ctxRef.current.crawlData.filter(c => c.ok), currentWeights, decisionHistory, null, sparringMode);
    return true;
  }, [crawlUrls, manualContent, currentWeights, decisionHistory, addLog, totalSteps]);

  const runProposalRound = useCallback(async () => {
    setStage("round1"); setStageLabel("Runde 1 — Beide generieren parallel");
    setProgress(step(hasCrawl ? 2 : 1));
    addLog(`🔵 Runde 1 — Claude + ${aiB} generieren parallel, blind, unabhängig`);

    const activePerspectives = getPerspectives(sparringMode);
    ctxRef.current.perspectives = activePerspectives;
    const prompt = PROPOSAL_PROMPT(topic, context, ctxRef.current.ctxBlock, sparringMode, activePerspectives);
    const [rawA, rawB] = await Promise.all([callA(prompt), callB(prompt)]);
    if (abortRef.current) return null;

    const resA = { ...sanitizeProposal(rawA, activePerspectives), perspectivesSnapshot: activePerspectives };
    const resB = { ...sanitizeProposal(rawB, activePerspectives), perspectivesSnapshot: activePerspectives };
    setProposalA(resA); setProposalB(resB);
    addLog("✅ Beide Vorschläge + 66 Scores erhalten");

    const d = getDeltas(resA.scores, resB.scores, activePerspectives);
    setDeltas(d);
    addLog(`📊 Delta-Analyse: ${d.length} Abweichungen > 2`);
    setProgress(step(hasCrawl ? 3 : 2));
    return { resA, resB, deltas: d };
  }, [topic, context, aiB, callA, callB, addLog, hasCrawl, totalSteps, sparringMode]);

  const runGamechangerRound = useCallback(async () => {
    const fbCtx = buildContextBlock(ctxRef.current.crawlData.filter(c => c.ok), currentWeights, decisionHistory, userFeedback, sparringMode);
    ctxRef.current.ctxBlock = fbCtx;

    setStage("round2"); setStageLabel("Runde 2 — Gamechanger parallel");
    setProgress(step(hasCrawl ? 4 : 3));
    addLog("🟡 Runde 2 — beide generieren 3 Gamechanger parallel" + (userFeedback ? " (mit User-Feedback)" : ""));

    const deltaStr = deltas.map(x => `${x.perspective}.${x.dimension}: A=${x.scoreA} B=${x.scoreB}`).join(", ") || "Keine großen Abweichungen";
    const gcPrompt = GAMECHANGER_PROMPT(topic, JSON.stringify(proposalA?.proposal), JSON.stringify(proposalB?.proposal), deltaStr, fbCtx, sparringMode, ctxRef.current.perspectives);

    const [gcA, gcB] = await Promise.all([callA(gcPrompt), callB(gcPrompt)]);
    if (abortRef.current) return null;

    const rp = ctxRef.current.perspectives;
    const sGcA = { ...sanitizeGamechangers(gcA, rp), perspectivesSnapshot: rp };
    const sGcB = { ...sanitizeGamechangers(gcB, rp), perspectivesSnapshot: rp };
    setGamechangersA(sGcA); setGamechangersB(sGcB);
    addLog(`✅ ${(sGcA.gamechangers?.length || 0) + (sGcB.gamechangers?.length || 0)} Gamechanger erhalten`);
    setProgress(step(hasCrawl ? 5 : 4));
    return { gcA: sGcA, gcB: sGcB };
  }, [topic, currentWeights, decisionHistory, userFeedback, deltas, proposalA, proposalB, callA, callB, addLog, hasCrawl, totalSteps, sparringMode]);

  const runMergeRound = useCallback(async () => {
    setStage("round3"); setStageLabel("Runde 3 — Final Merge (Claude = Boss)");
    setProgress(step(hasCrawl ? 6 : 5));
    addLog("🟢 Runde 3 — Claude entscheidet über alles");

    const rawMerge = await callA(FINAL_MERGE_PROMPT(
      topic,
      JSON.stringify(proposalA?.proposal), JSON.stringify(proposalB?.proposal),
      JSON.stringify(gamechangersA?.gamechangers), JSON.stringify(gamechangersB?.gamechangers),
      JSON.stringify(proposalA?.scores), JSON.stringify(proposalB?.scores),
      ctxRef.current.ctxBlock, sparringMode, ctxRef.current.perspectives
    ));
    if (abortRef.current) return null;
    const mergeResult = { ...sanitizeFinalResult(rawMerge, ctxRef.current.perspectives, sparringMode), perspectivesSnapshot: ctxRef.current.perspectives };

    setFinalResult(mergeResult);
    ctxRef.current.mergeResult = mergeResult;
    setProgress(step(hasCrawl ? 7 : 6));
    addLog("✅ Finale Strategie steht");
    const rp = ctxRef.current.perspectives;
    const pageWeights = sparringMode === "page" ? currentWeights : null;
    const avgScoreStr = pageWeights ? getWeightedAvg(mergeResult.final_scores, pageWeights, rp) : getAvg(mergeResult.final_scores);
    addLog(`📊 Score: ${avgScoreStr}${pageWeights ? " (gewichtet)" : ""}`);
    if (mergeResult.build_verdict) addLog(`🏁 Verdict: ${VERDICT_CONFIG[mergeResult.build_verdict]?.label || mergeResult.build_verdict}`);

    const avgScore = parseFloat(avgScoreStr);
    const topGc = [...(gamechangersA?.gamechangers || []), ...(gamechangersB?.gamechangers || [])]
      .sort((a, b) => (b.impact || 0) - (a.impact || 0)).slice(0, 3).map(g => g.title);
    setDecisionHistory(prev => [...prev, {
      date: new Date().toLocaleDateString("de-DE"), topic,
      headline: mergeResult.final?.headline || "–", avgScore,
      verdict: mergeResult.build_verdict || "–",
      keyPoints: mergeResult.final?.key_elements?.join(", ") || "",
      execScores: mergeResult.executive_scores ? EXEC_SCORES.reduce((acc, e) => {
        const d = mergeResult.executive_scores[e.key]; if (d) acc[e.key] = { s: d.s, ampel: d.ampel }; return acc;
      }, {}) : null,
      topRisks: (mergeResult.final?.open_risks || []).slice(0, 3),
      topGamechangers: topGc,
      sparringMode,
      perspectivesSnapshot: rp,
    }]);

    if (runMode === "import" && selectedTaskIdx !== null && extractedTasks[selectedTaskIdx]) {
      const taskId = extractedTasks[selectedTaskIdx].id;
      setTaskResults(prev => ({ ...prev, [taskId]: { score: avgScore, headline: mergeResult.final?.headline || "–", verdict: mergeResult.build_verdict, finalResult: mergeResult, sparringMode, perspectivesSnapshot: rp } }));
      addLog(`📋 Task-Ergebnis gespeichert: ${taskId} → ${avgScore}`);
    }
    return mergeResult;
  }, [topic, proposalA, proposalB, gamechangersA, gamechangersB, currentWeights, callA, addLog, hasCrawl, totalSteps, runMode, selectedTaskIdx, extractedTasks, decisionHistory, sparringMode]);

  const runBuildOutputRound = useCallback(async () => {
    setStage("round4"); setStageLabel("Runde 4 — Build Output generieren");
    setProgress(step(totalSteps - 1));
    addLog("🔧 Runde 4 — Erstelle baubare Outputs (Blockstruktur, Copy, Komponenten, SEO, QA...)");

    const rawBo = await callA(BUILD_OUTPUT_PROMPT(topic, ctxRef.current.mergeResult || finalResult, ctxRef.current.ctxBlock, sparringMode));
    if (abortRef.current) return null;
    const boResult = sanitizeBuildOutput(rawBo);

    setBuildOutput(boResult);
    setProgress(step(totalSteps));
    addLog(`✅ Build Output komplett: ${boResult.block_structure?.length || 0} Blöcke, ${boResult.components?.length || 0} Komponenten, ${boResult.qa_criteria?.length || 0} QA-Checks`);
    return boResult;
  }, [topic, finalResult, callA, addLog, totalSteps, sparringMode]);

  // ═══ ORCHESTRATOR ═══
  const runFromStage = useCallback(async (fromStage) => {
    abortRef.current = false;
    setError(null);
    setFailedAt(null);

    try {
      if (fromStage === "crawl") {
        const ok = await runCrawl();
        if (!ok) return;
        fromStage = "round1";
      }
      if (fromStage === "round1") {
        const result = await runProposalRound();
        if (!result) return;
        // Pause for feedback
        setStage("feedback"); setStageLabel("Dein Input — Was ist dir wichtig?");
        addLog("⏸️ Warte auf User-Feedback (optional)...");
        return;
      }
      if (fromStage === "round2") {
        const gcResult = await runGamechangerRound();
        if (!gcResult) return;
        fromStage = "round3";
      }
      if (fromStage === "round3") {
        const mergeResult = await runMergeRound();
        if (!mergeResult) return;
        fromStage = "round4";
      }
      if (fromStage === "round4") {
        const bo = await runBuildOutputRound();
        if (!bo) return;
        // Deterministic Rule Engine — runs after AI, no API call needed
        const crawlHtml = ctxRef.current.crawlData?.filter(c => c.ok).map(c => c.htmlRaw || "").join("\n") || "";
        const rules = runRuleChecks(crawlHtml, bo, sparringMode);
        setRuleResults(rules);
        const failed = rules.filter(r => !r.pass);
        const critical = failed.filter(r => r.severity === "critical");
        addLog(`📏 Rule Engine: ${rules.length - failed.length}/${rules.length} bestanden${critical.length ? ` — ${critical.length} kritisch` : ""}`);
        setStage("done"); setStageLabel("Abgeschlossen");
      }
    } catch (e) {
      setError(e.message || "API-Fehler");
      setFailedAt(fromStage);
      setStage("error");
      addLog(`❌ Fehler in ${fromStage}: ${e.message}`);
    }
  }, [runCrawl, runProposalRound, runGamechangerRound, runMergeRound, runBuildOutputRound, addLog]);

  const startSparring = () => {
    if (!canStart) return;
    setProposalA(null); setProposalB(null);
    setGamechangersA(null); setGamechangersB(null);
    setFinalResult(null); setBuildOutput(null); setRuleResults(null); setDeltas([]);
    setLog([]); setUserFeedback(""); setCopied(false);
    ctxRef.current = { crawlData: [], ctxBlock: "" };
    runFromStage("crawl");
  };

  const handleContinue = () => { runFromStage("round2"); };
  const handleRetry = () => { if (failedAt) runFromStage(failedAt); };
  const abort = () => { abortRef.current = true; setStage("idle"); addLog("⛔ Abgebrochen"); };

  const handleExport = () => {
    const exportPersp = finalResult?.perspectivesSnapshot || proposalA?.perspectivesSnapshot || getPerspectives(sparringMode);
    const md = generateMarkdown(topic, proposalA, proposalB, gamechangersA, gamechangersB, finalResult, deltas, currentWeights, buildOutput, ruleResults, exportPersp, sparringMode);
    navigator.clipboard?.writeText(md).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const startTaskSparring = useCallback((taskIndex) => {
    const task = extractedTasks[taskIndex];
    if (!task) return;
    setSelectedTaskIdx(taskIndex);
    setTopic(task.title);
    setContext(`Task aus Strategie-Import: ${task.description}\nKategorie: ${task.category} | Priorität: ${task.priority} | Aufwand: ${task.effort}${task.auto_reason ? `\nAuto-Info: ${task.auto_reason}` : ""}`);
    setProposalA(null); setProposalB(null);
    setGamechangersA(null); setGamechangersB(null);
    setFinalResult(null); setBuildOutput(null); setRuleResults(null); setDeltas([]);
    setLog([]); setUserFeedback(""); setCopied(false);
    ctxRef.current = { crawlData: ctxRef.current.crawlData, ctxBlock: "" };
    addLog(`🎯 Starte Sparring für Task: ${task.title}`);
    runFromStage("crawl");
  }, [extractedTasks, addLog, runFromStage]);

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════

  const inputStyle = {
    width: "100%", padding: "8px 12px", background: "#111827", border: "1px solid #1f2937",
    borderRadius: 6, color: "#e5e7eb", fontSize: 13, outline: "none", fontFamily: "inherit"
  };
  const isRunning = !["idle", "done", "error", "feedback"].includes(stage);

  // Zentrales Perspectives-Rendering: immer aus Snapshot, Fallback auf aktuellen Modus
  const renderPerspectives =
    finalResult?.perspectivesSnapshot ||
    proposalA?.perspectivesSnapshot ||
    proposalB?.perspectivesSnapshot ||
    getPerspectives(sparringMode);

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", background: "#0a0f1a", color: "#e5e7eb", minHeight: "100vh", padding: "0 8px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea, select { font-family: inherit; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111827; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
      `}</style>

      {/* ═══ HEADER ═══ */}
      <div style={{ padding: "20px 0 16px", borderBottom: "1px solid #1f2937", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            SPARRING ENGINE
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Multi-AI Strategy Sparring · {SPARRING_MODES.find(s => s.key === sparringMode)?.icon} {SPARRING_MODES.find(s => s.key === sparringMode)?.label} · {(MODE_PERSPECTIVES[sparringMode] || []).length} Perspektiven · {(MODE_PERSPECTIVES[sparringMode] || []).length * 3} Datenpunkte</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ fontSize: 10, padding: "4px 10px", borderRadius: 10, background: openaiKey ? "#16a34a22" : "#f59e0b22", color: openaiKey ? "#22c55e" : "#f59e0b", fontWeight: 600 }}>
            {openaiKey ? "Claude vs GPT-4o" : "Claude vs Claude-B"}
          </div>
          {projectType !== "custom" && (
            <div style={{ fontSize: 10, padding: "4px 10px", borderRadius: 10, background: "#8b5cf622", color: "#a78bfa", fontWeight: 600 }}>
              {PROJECT_TYPES.find(p => p.key === projectType)?.label}
            </div>
          )}
        </div>
      </div>

      {/* ═══ HISTORIE ═══ */}
      {stage === "idle" && <HistoryPanel history={decisionHistory} />}

      {/* ═══ CONFIG ═══ */}
      {stage === "idle" && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>Anthropic API Key *</label>
              <input type="password" value={anthropicKey} onChange={e => setAnthropicKey(e.target.value)} placeholder="sk-ant-..." style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>OpenAI API Key (optional)</label>
              <input type="password" value={openaiKey} onChange={e => setOpenaiKey(e.target.value)} placeholder="sk-..." style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>Sparring-Modus</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {SPARRING_MODES.map(sm => (
                <button key={sm.key} onClick={() => { setSparringMode(sm.key); }} style={{
                  padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  border: sparringMode === sm.key ? "1px solid #8b5cf6" : "1px solid #1f2937",
                  background: sparringMode === sm.key ? "#8b5cf622" : "#111827",
                  color: sparringMode === sm.key ? "#a78bfa" : "#9ca3af",
                }}>{sm.icon} {sm.label}</button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8 }}>
              {SPARRING_MODES.find(s => s.key === sparringMode)?.desc} — {(MODE_PERSPECTIVES[sparringMode] || []).length} Perspektiven
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>Projekt-Typ {sparringMode !== "page" && <span style={{ color: "#4b5563" }}>(nur Page-Modus)</span>}</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {PROJECT_TYPES.map(pt => (
                <button key={pt.key} onClick={() => sparringMode === "page" && setProjectType(pt.key)} style={{
                  padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                  cursor: sparringMode === "page" ? "pointer" : "not-allowed",
                  opacity: sparringMode !== "page" ? 0.4 : 1,
                  border: projectType === pt.key ? "1px solid #3b82f6" : "1px solid #1f2937",
                  background: projectType === pt.key ? "#3b82f622" : "#111827",
                  color: projectType === pt.key ? "#60a5fa" : "#9ca3af",
                }}>{pt.label}</button>
              ))}
            </div>
            {projectType !== "custom" && (
              <div style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
                {renderPerspectives.filter(p => currentWeights[p.key] !== 1).map(p => (
                  <span key={p.key} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 6, background: currentWeights[p.key] > 1 ? "#16a34a22" : "#f59e0b22", color: currentWeights[p.key] > 1 ? "#22c55e" : "#f59e0b", fontWeight: 600 }}>
                    {p.icon} {p.label} {currentWeights[p.key]}x
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ═══ MODE TOGGLE ═══ */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 4, background: "#111827", borderRadius: 8, padding: 3, border: "1px solid #1f2937" }}>
              {[{ key: "single", label: "⚡ Einzelnes Sparring", desc: "Ein Thema, ein Sparring" }, { key: "import", label: "📄 Strategie-Import", desc: "Dokument → Tasks → Batch-Sparring" }].map(m => (
                <button key={m.key} onClick={() => setRunMode(m.key)} style={{
                  flex: 1, padding: "10px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  border: "none", textAlign: "center", transition: "all 0.15s ease",
                  background: runMode === m.key ? "linear-gradient(135deg, #3b82f622, #8b5cf622)" : "transparent",
                  color: runMode === m.key ? "#60a5fa" : "#6b7280",
                  boxShadow: runMode === m.key ? "inset 0 0 0 1px #3b82f644" : "none"
                }}>
                  <div>{m.label}</div>
                  <div style={{ fontSize: 9, marginTop: 2, color: runMode === m.key ? "#818cf8" : "#4b5563" }}>{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ═══ SINGLE MODE ═══ */}
          {runMode === "single" && (
            <>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>Thema / Block *</label>
                <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="z.B. Hero Section für machsleicht.de" style={{ ...inputStyle, fontSize: 14, fontWeight: 600, padding: "10px 12px" }} />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>Kontext (optional)</label>
                <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="Zielgruppe, bestehende Seite, Constraints..." rows={2} style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              <div style={{ padding: 12, background: "#0f172a", borderRadius: 8, border: "1px solid #1e3a5f33", marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 700, marginBottom: 8 }}>🌐 WEBSITE-KONTEXT (optional)</div>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>URLs zum Crawlen (eine pro Zeile)</label>
                  <textarea value={crawlUrls} onChange={e => setCrawlUrls(e.target.value)} placeholder={"https://machsleicht.de\nhttps://machsleicht.de/about"} rows={2} style={{ ...inputStyle, fontSize: 12 }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>Oder: manuell einfügen</label>
                  <textarea value={manualContent} onChange={e => setManualContent(e.target.value)} placeholder="Website-Text hier reinkopieren..." rows={2} style={{ ...inputStyle, fontSize: 12 }} />
                </div>
              </div>

              <button onClick={startSparring} disabled={!canStart} style={{
                width: "100%", padding: "12px", background: canStart ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" : "#1f2937",
                color: canStart ? "#fff" : "#6b7280", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700,
                cursor: canStart ? "pointer" : "default", letterSpacing: 0.5
              }}>
                {!anthropicKey.trim() ? "🔑 Anthropic API Key eingeben" : !topic.trim() ? "📝 Thema eingeben" : "⚡ SPARRING STARTEN"}
              </button>
            </>
          )}

          {/* ═══ STRATEGY MODE ═══ */}
          {runMode === "import" && (
            <>
              <div style={{ padding: 12, background: "#0f172a", borderRadius: 8, border: "1px solid #1e3a5f33", marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 700, marginBottom: 8 }}>🌐 WEBSITE-KONTEXT (optional — wird vor Extraktion gecrawlt)</div>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>URLs zum Crawlen (eine pro Zeile)</label>
                  <textarea value={crawlUrls} onChange={e => setCrawlUrls(e.target.value)} placeholder={"https://machsleicht.de\nhttps://machsleicht.de/about"} rows={2} style={{ ...inputStyle, fontSize: 12 }} />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>Strategie-Dokument *</label>
                <textarea value={strategyDoc} onChange={e => setStrategyDoc(e.target.value)}
                  placeholder={"Füge hier dein Strategie-Dokument ein...\n\nBeispiel:\n# Projekt: Relaunch machsleicht.de\n## Ziel: Conversion-Rate um 30% steigern\n\n### Maßnahmen:\n1. Hero Section komplett neu...\n2. Pricing Page optimieren...\n..."}
                  rows={10} style={{ ...inputStyle, fontSize: 12, resize: "vertical", lineHeight: 1.6 }} />
                <div style={{ fontSize: 10, color: "#4b5563", marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                  <span>{strategyDoc.length} Zeichen</span>
                  <span>Claude extrahiert sparring-fähige Tasks automatisch</span>
                </div>
              </div>

              <button onClick={async () => {
                // Pre-crawl if URLs provided
                if (crawlUrls.trim()) {
                  addLog("🌐 Crawle Website vor Task-Extraktion...");
                  const urls = crawlUrls.split("\n").map(u => u.trim()).filter(Boolean);
                  const data = [];
                  for (const url of urls) {
                    try {
                      const { htmlRaw, textClean } = await crawlUrl(url);
                      data.push({ url, text: textClean, htmlRaw, ok: true });
                      addLog(`✅ ${url}`);
                    } catch (e) {
                      data.push({ url, text: "", htmlRaw: "", ok: false, error: e.message });
                      addLog(`⚠️ ${url} — ${e.message}`);
                    }
                  }
                  setCrawlResults(data);
                  ctxRef.current.crawlData = data;
                }
                extractTasks();
              }} disabled={!strategyDoc.trim() || !anthropicKey.trim() || extracting} style={{
                width: "100%", padding: "12px", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, letterSpacing: 0.5, cursor: (!strategyDoc.trim() || !anthropicKey.trim() || extracting) ? "default" : "pointer",
                background: (strategyDoc.trim() && anthropicKey.trim() && !extracting) ? "linear-gradient(135deg, #f59e0b, #f97316)" : "#1f2937",
                color: (strategyDoc.trim() && anthropicKey.trim() && !extracting) ? "#fff" : "#6b7280",
              }}>
                {extracting ? "⏳ Extrahiere Tasks..." : !anthropicKey.trim() ? "🔑 Anthropic API Key eingeben" : !strategyDoc.trim() ? "📄 Strategie-Dokument einfügen" : "📋 TASKS EXTRAHIEREN"}
              </button>

              {/* ═══ EXTRACTED TASKS ═══ */}
              {extractedTasks.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <TaskList tasks={extractedTasks} taskResults={taskResults} activeIdx={selectedTaskIdx} onSelect={(idx) => setSelectedTaskIdx(idx)} project={extractedProject} />

                  {selectedTaskIdx !== null && extractedTasks[selectedTaskIdx] && (
                    <div style={{ padding: 14, background: "#111827", borderRadius: 8, border: "1px solid #3b82f633", marginTop: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#f3f4f6", marginBottom: 4 }}>
                        {extractedTasks[selectedTaskIdx].title}
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.5, marginBottom: 8 }}>
                        {extractedTasks[selectedTaskIdx].description}
                      </div>
                      {extractedTasks[selectedTaskIdx].auto_reason && (
                        <div style={{ fontSize: 10, color: extractedTasks[selectedTaskIdx].auto_eligible ? "#22c55e" : "#f59e0b", marginBottom: 8 }}>
                          {extractedTasks[selectedTaskIdx].auto_eligible ? "🤖" : "👤"} {extractedTasks[selectedTaskIdx].auto_reason}
                        </div>
                      )}
                      {taskResults[extractedTasks[selectedTaskIdx].id] ? (
                        <div style={{ padding: 10, background: "#16a34a11", borderRadius: 6, border: "1px solid #16a34a33" }}>
                          <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 600, marginBottom: 4 }}>✅ Abgeschlossen — Score: {taskResults[extractedTasks[selectedTaskIdx].id].score}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af" }}>{taskResults[extractedTasks[selectedTaskIdx].id].headline}</div>
                        </div>
                      ) : (
                        <button onClick={() => startTaskSparring(selectedTaskIdx)} style={{
                          width: "100%", padding: "10px", background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                          color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer"
                        }}>
                          ⚡ SPARRING FÜR DIESEN TASK STARTEN
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ═══ RUNNING ═══ */}
      {isRunning && (
        <div>
          <ProgressBar stage={stageLabel} step={progress.step} total={progress.total} />
          <button onClick={abort} style={{ padding: "6px 16px", background: "#7f1d1d", color: "#fca5a5", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer", marginBottom: 12 }}>⛔ Abbrechen</button>
        </div>
      )}

      {/* ═══ ERROR MIT RECOVERY ═══ */}
      {error && (
        <div style={{ padding: 12, background: "#7f1d1d22", border: "1px solid #dc262644", borderRadius: 8, color: "#fca5a5", fontSize: 12, marginBottom: 16 }}>
          ❌ {error}
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            {failedAt && (
              <button onClick={handleRetry} style={{ padding: "6px 16px", background: "#1e3a5f", color: "#60a5fa", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                🔄 Fortsetzen ab {failedAt === "round1" ? "Runde 1" : failedAt === "round2" ? "Runde 2" : failedAt === "round3" ? "Runde 3" : failedAt === "round4" ? "Build Output" : "Crawl"}
              </button>
            )}
            <button onClick={() => { setStage("idle"); setError(null); }} style={{ padding: "6px 16px", background: "#1f2937", color: "#e5e7eb", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>Zurück</button>
          </div>
        </div>
      )}

      {/* ═══ CRAWL RESULTS ═══ */}
      {stage !== "idle" && crawlResults.length > 0 && <CrawlResults results={crawlResults} />}

      {/* ═══ VORSCHLÄGE ═══ */}
      {(proposalA || proposalB) && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <ProposalCard proposal={proposalA} scores={proposalA?.scores} label="🔵 CLAUDE — Vorschlag A" color="#3b82f6" borderColor="#1e3a5f" tagBg="#1e3a5f" tagColor="#60a5fa" weights={sparringMode === "page" ? currentWeights : null} perspectives={renderPerspectives} />
            <ProposalCard proposal={proposalB} scores={proposalB?.scores} label={`🟣 ${aiB} — Vorschlag B`} color="#a855f7" borderColor="#5b2178" tagBg="#3b1764" tagColor="#c084fc" weights={sparringMode === "page" ? currentWeights : null} perspectives={renderPerspectives} />
          </div>

          {deltas.length > 0 && (
            <div style={{ padding: 14, background: "#1c1917", borderRadius: 8, border: "1px solid #f59e0b33", marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 700, marginBottom: 8 }}>⚡ DELTA-ANALYSE ({deltas.length} Abweichungen)</div>
              {deltas.slice(0, 6).map((d, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < Math.min(deltas.length, 6) - 1 ? "1px solid #292524" : "none" }}>
                  <span style={{ fontSize: 12, color: "#d1d5db" }}>{renderPerspectives.find(p => p.key === d.perspective)?.icon} {d.dimension}</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#3b82f6", fontFamily: "'JetBrains Mono', monospace" }}>A:{d.scoreA}</span>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>vs</span>
                    <span style={{ fontSize: 12, color: "#a855f7", fontFamily: "'JetBrains Mono', monospace" }}>B:{d.scoreB}</span>
                    <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 8, background: "#f59e0b22", color: "#f59e0b", fontWeight: 700 }}>Δ{d.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ USER FEEDBACK PAUSE ═══ */}
      {stage === "feedback" && (
        <div style={{ padding: 16, background: "linear-gradient(135deg, #0f172a, #1a1a0f)", borderRadius: 10, border: "1px solid #f59e0b33", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b", marginBottom: 8 }}>💬 DEINE STIMME — Bevor die Gamechanger kommen</div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12, lineHeight: 1.5 }}>
            Du hast beide Vorschläge gesehen. Was ist dir wichtig? Welche Richtung soll es gehen? Dein Input fließt in Runde 2 + 3 ein.
          </div>
          <textarea value={userFeedback} onChange={e => setUserFeedback(e.target.value)}
            placeholder="z.B. 'Fokus auf Mobile-First, Budget unter 5k, Vorschlag A hat die bessere Struktur aber B die bessere Copy...'"
            rows={3} style={{ ...inputStyle, fontSize: 12, marginBottom: 12, resize: "vertical" }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleContinue} style={{
              padding: "10px 24px", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#fff",
              border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer"
            }}>
              {userFeedback.trim() ? "⚡ Weiter mit Feedback" : "⏩ Weiter ohne Feedback"}
            </button>
            <button onClick={abort} style={{ padding: "10px 16px", background: "#1f2937", color: "#9ca3af", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Abbrechen</button>
          </div>
        </div>
      )}

      {/* ═══ GAMECHANGER ═══ */}
      {(gamechangersA || gamechangersB) && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f3f4f6", marginBottom: 10 }}>
            🚀 GAMECHANGER ({((gamechangersA?.gamechangers?.length || 0) + (gamechangersB?.gamechangers?.length || 0))} total)
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: "#3b82f6", marginBottom: 6, fontWeight: 600 }}>CLAUDE</div>
              {gamechangersA?.gamechangers?.map(gc => <GamechangerCard key={gc.id} gc={gc} source="Claude" perspectives={renderPerspectives} />)}
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#a855f7", marginBottom: 6, fontWeight: 600 }}>{aiB.toUpperCase()}</div>
              {gamechangersB?.gamechangers?.map(gc => <GamechangerCard key={gc.id} gc={gc} source={aiB} perspectives={renderPerspectives} />)}
            </div>
          </div>
        </div>
      )}

      {/* ═══ FINAL RESULT ═══ */}
      {finalResult && (
        <>
          {/* Build Verdict */}
          {finalResult.build_verdict && <BuildVerdictBadge verdict={finalResult.build_verdict} />}

          <div style={{ padding: 16, background: "linear-gradient(135deg, #0f172a, #1a0f2e)", borderRadius: 10, border: "1px solid #3b82f644", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 800, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                FINALE STRATEGIE
              </div>
              <button onClick={handleExport} style={{
                padding: "4px 12px", background: copied ? "#16a34a22" : "#1f2937", color: copied ? "#22c55e" : "#9ca3af",
                border: `1px solid ${copied ? "#16a34a44" : "#374151"}`, borderRadius: 6, fontSize: 11, cursor: "pointer", fontWeight: 600
              }}>{copied ? "✅ Kopiert!" : "📋 Als Markdown kopieren"}</button>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#f3f4f6", marginBottom: 8 }}>{finalResult.final?.headline}</div>
            <div style={{ fontSize: 12, color: "#d1d5db", lineHeight: 1.7, marginBottom: 12 }}>{finalResult.final?.details}</div>
            {finalResult.final?.key_elements && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {finalResult.final.key_elements.map((el, i) => (
                  <span key={i} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 8, background: "#1e3a5f", color: "#60a5fa", fontWeight: 500 }}>{el}</span>
                ))}
              </div>
            )}
            {/* Not Building */}
            {finalResult.final?.not_building?.length > 0 && (
              <div style={{ padding: 10, background: "#7f1d1d11", borderRadius: 6, border: "1px solid #dc262622", marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: "#ef4444", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Bewusst NICHT gebaut</div>
                {finalResult.final.not_building.map((nb, i) => (
                  <div key={i} style={{ fontSize: 11, color: "#fca5a5", padding: "2px 0" }}>✗ {nb}</div>
                ))}
              </div>
            )}
            {/* Open Risks */}
            {finalResult.final?.open_risks?.length > 0 && (
              <div style={{ padding: 10, background: "#f59e0b0a", borderRadius: 6, border: "1px solid #f59e0b22", marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: "#f59e0b", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Offene Risiken</div>
                {finalResult.final.open_risks.map((r, i) => (
                  <div key={i} style={{ fontSize: 11, color: "#fbbf24", padding: "2px 0" }}>⚠ {r}</div>
                ))}
              </div>
            )}
            {finalResult.final?.adopted_gamechangers?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Gamechanger-Entscheidungen</div>
                {finalResult.final.adopted_gamechangers.map((gc, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 0", borderBottom: "1px solid #1f2937" }}>
                    <span style={{
                      fontSize: 10, padding: "2px 8px", borderRadius: 8, fontWeight: 600,
                      background: gc.decision === "adopt" ? "#16a34a22" : gc.decision === "modified" ? "#f59e0b22" : "#dc262622",
                      color: gc.decision === "adopt" ? "#22c55e" : gc.decision === "modified" ? "#f59e0b" : "#ef4444"
                    }}>{gc.decision === "adopt" ? "✅" : gc.decision === "modified" ? "🔄" : "❌"} {gc.decision}</span>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{gc.source}</span>
                    <span style={{ fontSize: 11, color: "#d1d5db" }}>{gc.reason}</span>
                  </div>
                ))}
              </div>
            )}
            {finalResult.decision_log?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Decision Log</div>
                {finalResult.decision_log.map((d, i) => (
                  <div key={i} style={{ fontSize: 11, color: "#9ca3af", padding: "4px 0", borderBottom: "1px solid #111827" }}>
                    <span style={{ color: d.dimension === "unknown" ? "#6b7280" : "#60a5fa", fontWeight: 600 }}>{renderPerspectives.find(p => p.key === d.dimension)?.icon || "❓"} {d.dimension === "unknown" ? "Unbekannte Dimension" : (renderPerspectives.find(p => p.key === d.dimension)?.label || d.dimension)}</span>
                    {" → "}<span style={{ color: "#d1d5db" }}>{d.decision}</span>{" — "}{d.reason}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Executive Scores */}
          <ExecutiveScoresPanel execScores={finalResult.executive_scores} readiness={finalResult.readiness} />

          {/* Perspektiven-Scores */}
          <div style={{ padding: 16, background: "#0f172a", borderRadius: 10, border: "1px solid #1e3a5f44", marginBottom: 16 }}>
            <ScoreMatrix scores={finalResult.final_scores} label={`Finaler Gremium-Score (${renderPerspectives.length} Perspektiven)`} weights={sparringMode === "page" ? currentWeights : null} perspectives={renderPerspectives} />
          </div>

          {/* Build Output */}
          <BuildOutputPanel buildOutput={buildOutput} sparringMode={sparringMode} />

          {/* Rule Engine Results */}
          <RuleResultsPanel ruleResults={ruleResults} />
        </>
      )}

      {/* ═══ LOG ═══ */}
      {log.length > 0 && (
        <div style={{ padding: 12, background: "#111827", borderRadius: 8, marginBottom: 16, maxHeight: 200, overflowY: "auto" }}>
          <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Sparring Log</div>
          {log.map((l, i) => (
            <div key={i} style={{ fontSize: 11, color: "#9ca3af", padding: "2px 0", fontFamily: "'JetBrains Mono', monospace" }}>
              <span style={{ color: "#374151" }}>{l.time}</span> {l.msg}
            </div>
          ))}
        </div>
      )}

      {/* ═══ DONE ═══ */}
      {stage === "done" && (
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          {runMode === "import" && extractedTasks.length > 0 && (
            <button onClick={() => {
              setStage("idle");
              setProposalA(null); setProposalB(null);
              setGamechangersA(null); setGamechangersB(null);
              setFinalResult(null); setBuildOutput(null); setRuleResults(null); setDeltas([]);
              setTopic(""); setContext("");
            }} style={{ padding: "10px 20px", background: "linear-gradient(135deg, #f59e0b22, #f9731622)", color: "#f59e0b", border: "1px solid #f59e0b44", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
              📋 Zurück zur Task-Liste ({Object.keys(taskResults).length}/{extractedTasks.length} done)
            </button>
          )}
          <button onClick={() => setStage("idle")} style={{ padding: "10px 20px", background: "#1f2937", color: "#e5e7eb", border: "1px solid #374151", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
            🔄 Neues Sparring (Historie bleibt)
          </button>
          <button onClick={() => {
            setStage("idle"); setDecisionHistory([]); setCrawlResults([]);
            setProposalA(null); setProposalB(null); setGamechangersA(null);
            setGamechangersB(null); setFinalResult(null); setBuildOutput(null); setRuleResults(null); setDeltas([]);
            setExtractedTasks([]); setExtractedProject(null); setTaskResults({}); setSelectedTaskIdx(null);
          }} style={{ padding: "10px 20px", background: "#7f1d1d22", color: "#fca5a5", border: "1px solid #dc262633", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
            🗑️ Komplett zurücksetzen
          </button>
        </div>
      )}
    </div>
  );
}