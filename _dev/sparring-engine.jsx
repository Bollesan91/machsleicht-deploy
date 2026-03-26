import { useState, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════
// KONSTANTEN
// ═══════════════════════════════════════════════════════════════════

const PERSPECTIVES = [
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
];

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
];

const SCORE_COLORS = {
  1: "#dc2626", 2: "#dc2626", 3: "#ef4444",
  4: "#f97316", 5: "#f59e0b", 6: "#eab308",
  7: "#84cc16", 8: "#22c55e", 9: "#16a34a", 10: "#15803d"
};

const EXEC_SCORES = [
  { key: "clarity", label: "Clarity", icon: "🎯", desc: "Wie schnell versteht der Nutzer das Angebot?" },
  { key: "conversion_potential", label: "Conversion", icon: "📈", desc: "Wie wahrscheinlich ist gewünschtes Verhalten?" },
  { key: "build_efficiency", label: "Build Efficiency", icon: "⚡", desc: "Wie schnell und sauber umsetzbar?" },
  { key: "risk_level", label: "Risk Level", icon: "⚠️", desc: "Wie viele Risiken bleiben?" },
  { key: "strategic_fit", label: "Strategic Fit", icon: "🧭", desc: "Passt es zu Ziel, Marke, Business?" },
];

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
// KONTEXT-BUILDER & PROMPTS
// ═══════════════════════════════════════════════════════════════════

const BASE_SYSTEM = `Du bist ein Experte für Website-Strategie und bewertest Konzepte aus 11 Perspektiven.
Antworte IMMER als valides JSON. Kein Markdown, keine Backticks, kein Einleitungstext.
Bewerte jede Dimension mit einem Score von 1-10 und einem Satz (max 15 Wörter).`;

function buildContextBlock(crawlData, weights, history, userFeedback) {
  const parts = [];
  if (crawlData?.length) {
    parts.push("AKTUELLER WEBSITE-STAND (gecrawlt):");
    crawlData.forEach(c => parts.push(`[${c.url}]\n${c.text.substring(0, 1500)}`));
  }
  const nonDefault = PERSPECTIVES.filter(p => (weights?.[p.key] || 1) !== 1);
  if (nonDefault.length) {
    parts.push("\nPERSPEKTIV-GEWICHTUNG (Fokus dieses Projekts):");
    parts.push(PERSPECTIVES.map(p => `${p.label}:${weights[p.key]}x`).join(", "));
    parts.push("Gewichte deinen Vorschlag entsprechend. Bewerte aber ALLE Perspektiven ehrlich — nicht inflaten weil gewichtet.");
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

const PROPOSAL_PROMPT = (topic, context, ctxBlock) => `${BASE_SYSTEM}
AUFGABE: Erstelle einen konkreten Strategie-Vorschlag für folgendes Thema und bewerte ihn selbst.
THEMA: ${topic}
${context ? `KONTEXT: ${context}` : ""}${ctxBlock}

Antworte als JSON:
{
  "proposal": {
    "headline": "Dein Vorschlag in einem Satz",
    "details": "Ausführliche Beschreibung (3-5 Sätze)",
    "key_elements": ["Element 1", "Element 2", "Element 3"]
  },
  "scores": {
    "ux_ui": {"d1": {"s": 8, "n": "kurzer Kommentar"}, "d2": {"s": 7, "n": "..."}, "d3": {"s": 6, "n": "..."}},
    "design": {"d1": {"s": 7, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 6, "n": "..."}},
    "seo": {"d1": {"s": 7, "n": "..."}, "d2": {"s": 6, "n": "..."}, "d3": {"s": 8, "n": "..."}},
    "cto": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 7, "n": "..."}, "d3": {"s": 6, "n": "..."}},
    "ceo": {"d1": {"s": 7, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 7, "n": "..."}},
    "coo": {"d1": {"s": 6, "n": "..."}, "d2": {"s": 7, "n": "..."}, "d3": {"s": 8, "n": "..."}},
    "marketing": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 7, "n": "..."}, "d3": {"s": 6, "n": "..."}},
    "product": {"d1": {"s": 7, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 7, "n": "..."}},
    "legal": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 7, "n": "..."}, "d3": {"s": 8, "n": "..."}},
    "qa": {"d1": {"s": 6, "n": "..."}, "d2": {"s": 7, "n": "..."}, "d3": {"s": 6, "n": "..."}},
    "finance": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 7, "n": "..."}, "d3": {"s": 8, "n": "..."}}
  }
}`;

const GAMECHANGER_PROMPT = (topic, proposalA, proposalB, deltas, ctxBlock) => `${BASE_SYSTEM}
Du siehst zwei Vorschläge und ihre Bewertungen. Liefere 3 GAMECHANGER — radikale Ideen die beide Vorschläge besser machen würden.
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
effort muss sein: "quick_win", "medium" oder "heavy"`;

const FINAL_MERGE_PROMPT = (topic, proposalA, proposalB, gcA, gcB, scoresA, scoresB, ctxBlock) => `${BASE_SYSTEM}
Du bist der BOSS. Triff die finale Entscheidung.
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
    "not_building": ["Was bewusst NICHT gebaut wird — 2-3 Punkte"],
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
    "build_readiness": {"s": 6, "n": "Kann Dev direkt loslegen?"},
    "launch_readiness": {"s": 4, "n": "Ist es live-fähig?"}
  },
  "build_verdict": "go|go_with_changes|needs_revision|do_not_build",
  "decision_log": [
    {"dimension": "perspective_key", "decision": "Von A/B/Merge", "reason": "Warum"}
  ],
  "final_scores": {
    "ux_ui": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 7, "n": "..."}},
    "design": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 7, "n": "..."}},
    "seo": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 7, "n": "..."}, "d3": {"s": 8, "n": "..."}},
    "cto": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 7, "n": "..."}},
    "ceo": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 8, "n": "..."}},
    "coo": {"d1": {"s": 7, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 8, "n": "..."}},
    "marketing": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 7, "n": "..."}},
    "product": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 8, "n": "..."}},
    "legal": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 8, "n": "..."}},
    "qa": {"d1": {"s": 7, "n": "..."}, "d2": {"s": 7, "n": "..."}, "d3": {"s": 7, "n": "..."}},
    "finance": {"d1": {"s": 8, "n": "..."}, "d2": {"s": 8, "n": "..."}, "d3": {"s": 8, "n": "..."}}
  }
}`;

const BUILD_OUTPUT_PROMPT = (topic, finalResult, ctxBlock) => `Du bist ein Senior Web-Stratege und erstellst direkt baubare Outputs aus einer finalen Strategie-Entscheidung.
THEMA: ${topic}
FINALE STRATEGIE: ${JSON.stringify(finalResult)}${ctxBlock}

Erstelle einen vollständigen Build-Plan. Antworte als valides JSON. Kein Markdown, keine Backticks.
{
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
  "ux_notes": [
    "CTA mobil sticky",
    "Formular max 3 Felder"
  ],
  "seo_spec": {
    "primary_keyword": "...",
    "secondary_keywords": ["...", "..."],
    "h1": "...",
    "h2_structure": ["H2 1", "H2 2"],
    "internal_links": ["Von wo → wohin"],
    "schema_potential": "FAQ/HowTo/Product",
    "title_tag": "...",
    "meta_description": "..."
  },
  "dev_notes": [
    "Statisch möglich",
    "LCP-Elemente priorisieren"
  ],
  "qa_criteria": [
    "Headline in unter 2 Sekunden erfassbar",
    "CTA ohne Scroll sichtbar",
    "Mobile keine Textwand"
  ]
}`;

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

function parseJson(text) {
  const cleaned = text.replace(/```json\s*|```\s*/g, "").replace(/^\s*\n/, "").trim();
  return JSON.parse(cleaned);
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
    if (res.ok) return stripHtml(await res.text());
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

function getWeightedAvg(scores, weights) {
  if (!scores || !weights) return getAvg(scores);
  let weightedSum = 0, weightSum = 0;
  for (const p of PERSPECTIVES) {
    const ps = scores[p.key];
    const w = weights[p.key] || 1;
    if (!ps) continue;
    const dimAvg = ((ps.d1?.s || 0) + (ps.d2?.s || 0) + (ps.d3?.s || 0)) / 3;
    weightedSum += dimAvg * w;
    weightSum += w;
  }
  return weightSum ? (weightedSum / weightSum).toFixed(1) : 0;
}

function getDeltas(scoresA, scoresB) {
  const deltas = [];
  if (!scoresA || !scoresB) return deltas;
  for (const key of Object.keys(scoresA)) {
    const a = scoresA[key], b = scoresB[key];
    if (!a || !b) continue;
    for (const d of ["d1", "d2", "d3"]) {
      const diff = Math.abs((a[d]?.s || 0) - (b[d]?.s || 0));
      if (diff > 2) {
        const p = PERSPECTIVES.find(p => p.key === key);
        const dimIdx = parseInt(d.replace("d", "")) - 1;
        deltas.push({ perspective: key, dimension: p?.dims[dimIdx] || d, scoreA: a[d]?.s || 0, scoreB: b[d]?.s || 0, delta: diff });
      }
    }
  }
  return deltas.sort((a, b) => b.delta - a.delta);
}

function generateMarkdown(topic, proposalA, proposalB, gamechangersA, gamechangersB, finalResult, deltas, weights, buildOutput) {
  const w = (s) => s ? getWeightedAvg(s, weights) : "–";
  let md = `# Sparring: ${topic}\n_${new Date().toLocaleDateString("de-DE")} — Sparring Engine v2_\n\n`;

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
    for (const e of EXEC_SCORES) {
      const d = finalResult.executive_scores[e.key];
      if (d) md += `- **${e.label}**: ${d.s}/10 (${d.ampel}) — ${d.n}\n`;
    }
    md += "\n";
  }
  if (finalResult?.readiness) {
    md += `**Readiness:** `;
    md += READINESS_KEYS.map(r => { const d = finalResult.readiness[r.key]; return d ? `${r.label}: ${d.s}/10` : ""; }).filter(Boolean).join(" · ");
    md += "\n\n";
  }

  md += `**Finaler Perspektiv-Score:** ${w(finalResult?.final_scores)} (gewichtet)\n\n---\n\n`;
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

function ScoreMatrix({ scores, label, weights }) {
  if (!scores) return null;
  const raw = getAvg(scores);
  const weighted = weights ? getWeightedAvg(scores, weights) : null;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
      <div style={{ display: "grid", gridTemplateColumns: "110px repeat(3, 40px) 46px", gap: 3, alignItems: "start" }}>
        <div />
        {["D1", "D2", "D3"].map(d => <div key={d} style={{ fontSize: 8, color: "#4b5563", textAlign: "center" }}>{d}</div>)}
        <div style={{ fontSize: 8, color: "#4b5563", textAlign: "center" }}>Ø</div>
        {PERSPECTIVES.map(p => {
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

function GamechangerCard({ gc, source }) {
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
            {PERSPECTIVES.find(p => p.key === b)?.label || b}
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
      {history.map((h, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "6px 0", borderBottom: i < history.length - 1 ? "1px solid #1f2937" : "none"
        }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 10, color: "#6b7280", marginRight: 8 }}>{h.date}</span>
            <span style={{ fontSize: 12, color: "#d1d5db", fontWeight: 600 }}>{h.topic}</span>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{h.headline}</div>
          </div>
          <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: SCORE_COLORS[Math.round(h.avgScore)] || "#9ca3af" }}>{h.avgScore}</span>
        </div>
      ))}
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

function ProposalCard({ proposal, scores, label, color, borderColor, tagBg, tagColor, weights }) {
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
        <ScoreMatrix scores={scores} label="Gremium-Score" weights={weights} />
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

function BuildOutputPanel({ buildOutput }) {
  if (!buildOutput) return null;
  const [tab, setTab] = useState("structure");
  const tabs = [
    { key: "structure", label: "Blockstruktur" },
    { key: "copy", label: "Copy Blueprint" },
    { key: "components", label: "Komponenten" },
    { key: "ux", label: "UX Notes" },
    { key: "seo", label: "SEO Spec" },
    { key: "dev", label: "Dev Notes" },
    { key: "qa", label: "QA Criteria" },
  ];
  const sectionStyle = { fontSize: 12, color: "#d1d5db", lineHeight: 1.7 };
  const labelStyle = { fontSize: 10, color: "#6b7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 };
  const itemStyle = { padding: "6px 10px", background: "#111827", borderRadius: 6, marginBottom: 4, border: "1px solid #1f2937" };

  return (
    <div style={{ padding: 16, background: "#0f172a", borderRadius: 10, border: "1px solid #1e3a5f44", marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Build Output</div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none",
            background: tab === t.key ? "#1e3a5f" : "#111827", color: tab === t.key ? "#60a5fa" : "#6b7280",
          }}>{t.label}</button>
        ))}
      </div>

      {tab === "structure" && buildOutput.block_structure && (
        <div>
          {buildOutput.block_structure.map((b, i) => (
            <div key={i} style={{ ...itemStyle, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: "#374151", minWidth: 24 }}>{b.position}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#f3f4f6" }}>{b.name}</div>
                <div style={{ fontSize: 10, color: "#9ca3af" }}>{b.purpose}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "copy" && buildOutput.copy_blueprint && (
        <div>
          {[
            { label: "Headline", val: buildOutput.copy_blueprint.headline },
            { label: "Subheadline", val: buildOutput.copy_blueprint.subheadline },
            { label: "CTA Primary", val: buildOutput.copy_blueprint.cta_primary },
            { label: "CTA Secondary", val: buildOutput.copy_blueprint.cta_secondary },
          ].filter(x => x.val).map((x, i) => (
            <div key={i} style={{ ...itemStyle }}>
              <div style={labelStyle}>{x.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f3f4f6" }}>{x.val.text}</div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{x.val.logic}</div>
            </div>
          ))}
          {buildOutput.copy_blueprint.trust_elements?.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={labelStyle}>Trust-Elemente</div>
              {buildOutput.copy_blueprint.trust_elements.map((t, i) => <div key={i} style={{ ...sectionStyle, padding: "2px 0" }}>• {t}</div>)}
            </div>
          )}
          {buildOutput.copy_blueprint.objection_handling?.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={labelStyle}>Einwandbehandlung</div>
              {buildOutput.copy_blueprint.objection_handling.map((o, i) => <div key={i} style={{ ...sectionStyle, padding: "2px 0" }}>• {o}</div>)}
            </div>
          )}
          {buildOutput.copy_blueprint.proof_points?.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={labelStyle}>Beweisführung</div>
              {buildOutput.copy_blueprint.proof_points.map((p, i) => <div key={i} style={{ ...sectionStyle, padding: "2px 0" }}>• {p}</div>)}
            </div>
          )}
        </div>
      )}

      {tab === "components" && buildOutput.components && (
        <div>
          {buildOutput.components.map((c, i) => (
            <div key={i} style={{ ...itemStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#f3f4f6", fontWeight: 500 }}>{c.name}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: "#1f2937", color: "#9ca3af" }}>{c.type}</span>
                <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: c.priority === "must" ? "#dc262622" : "#f59e0b22", color: c.priority === "must" ? "#ef4444" : "#f59e0b", fontWeight: 600 }}>{c.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "ux" && buildOutput.ux_notes && (
        <div>{buildOutput.ux_notes.map((n, i) => <div key={i} style={{ ...itemStyle, ...sectionStyle }}>• {n}</div>)}</div>
      )}

      {tab === "seo" && buildOutput.seo_spec && (
        <div>
          {buildOutput.seo_spec.primary_keyword && <div style={itemStyle}><div style={labelStyle}>Primary Keyword</div><div style={{ fontSize: 13, fontWeight: 600, color: "#22c55e" }}>{buildOutput.seo_spec.primary_keyword}</div></div>}
          {buildOutput.seo_spec.secondary_keywords?.length > 0 && <div style={itemStyle}><div style={labelStyle}>Secondary</div><div style={sectionStyle}>{buildOutput.seo_spec.secondary_keywords.join(" · ")}</div></div>}
          {buildOutput.seo_spec.h1 && <div style={itemStyle}><div style={labelStyle}>H1</div><div style={sectionStyle}>{buildOutput.seo_spec.h1}</div></div>}
          {buildOutput.seo_spec.h2_structure?.length > 0 && <div style={itemStyle}><div style={labelStyle}>H2 Struktur</div>{buildOutput.seo_spec.h2_structure.map((h, i) => <div key={i} style={{ ...sectionStyle, padding: "1px 0" }}>{i + 1}. {h}</div>)}</div>}
          {buildOutput.seo_spec.title_tag && <div style={itemStyle}><div style={labelStyle}>Title Tag</div><div style={sectionStyle}>{buildOutput.seo_spec.title_tag}</div></div>}
          {buildOutput.seo_spec.meta_description && <div style={itemStyle}><div style={labelStyle}>Meta Description</div><div style={sectionStyle}>{buildOutput.seo_spec.meta_description}</div></div>}
          {buildOutput.seo_spec.schema_potential && <div style={itemStyle}><div style={labelStyle}>Schema</div><div style={sectionStyle}>{buildOutput.seo_spec.schema_potential}</div></div>}
        </div>
      )}

      {tab === "dev" && buildOutput.dev_notes && (
        <div>{buildOutput.dev_notes.map((n, i) => <div key={i} style={{ ...itemStyle, ...sectionStyle }}>• {n}</div>)}</div>
      )}

      {tab === "qa" && buildOutput.qa_criteria && (
        <div>{buildOutput.qa_criteria.map((q, i) => <div key={i} style={{ ...itemStyle, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#6b7280" }}>☐</span>
          <span style={sectionStyle}>{q}</span>
        </div>)}</div>
      )}
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
  // Strategy Mode
  const [mode, setMode] = useState("single"); // single|strategy
  const [strategyDoc, setStrategyDoc] = useState("");
  const [extractedTasks, setExtractedTasks] = useState([]);
  const [extractedProject, setExtractedProject] = useState(null);
  const [selectedTaskIdx, setSelectedTaskIdx] = useState(null);
  const [taskResults, setTaskResults] = useState({});
  const [extracting, setExtracting] = useState(false);
  // Build Output
  const [buildOutput, setBuildOutput] = useState(null);

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
      const result = await callWithRetry(callClaudeRaw, TASK_EXTRACTION_PROMPT(strategyDoc, crawlText), anthropicKey);
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

  // ═══ STAGE MACHINE ═══
  const runFromStage = useCallback(async (fromStage) => {
    abortRef.current = false;
    setError(null);
    setFailedAt(null);
    const hasCrawl = crawlUrls.trim() || manualContent.trim();
    const totalSteps = hasCrawl ? 8 : 7;

    try {
      // ─── CRAWL ───
      if (fromStage === "crawl") {
        if (crawlUrls.trim()) {
          setStage("crawl");
          setStageLabel("Website-Analyse");
          setProgress({ step: 1, total: totalSteps });
          addLog("🌐 Crawle Website(n)...");
          const urls = crawlUrls.split("\n").map(u => u.trim()).filter(Boolean);
          const data = [];
          for (const url of urls) {
            if (abortRef.current) return;
            try {
              const text = await crawlUrl(url);
              data.push({ url, text, ok: true });
              addLog(`✅ ${url} — ${text.length} Z.`);
            } catch (e) {
              data.push({ url, text: "", ok: false, error: e.message });
              addLog(`⚠️ ${url} — ${e.message}`);
            }
          }
          setCrawlResults(data);
          ctxRef.current.crawlData = data;
        }
        if (manualContent.trim()) {
          ctxRef.current.crawlData.push({ url: "Manuell", text: manualContent.trim(), ok: true });
          addLog("📝 Manueller Content hinzugefügt");
        }
        ctxRef.current.ctxBlock = buildContextBlock(ctxRef.current.crawlData.filter(c => c.ok), currentWeights, decisionHistory);
        fromStage = "round1";
      }

      // ─── RUNDE 1: PARALLELE VORSCHLÄGE ───
      if (fromStage === "round1") {
        setStage("round1");
        setStageLabel("Runde 1 — Beide generieren parallel");
        setProgress({ step: hasCrawl ? 2 : 1, total: totalSteps });
        addLog(`🔵 Runde 1 — Claude + ${aiB} generieren parallel, blind, unabhängig`);

        const prompt = PROPOSAL_PROMPT(topic, context, ctxRef.current.ctxBlock);
        const [resA, resB] = await Promise.all([callA(prompt), callB(prompt)]);
        if (abortRef.current) return;

        setProposalA(resA);
        setProposalB(resB);
        addLog("✅ Beide Vorschläge + 66 Scores erhalten");

        const d = getDeltas(resA.scores, resB.scores);
        setDeltas(d);
        addLog(`📊 Delta-Analyse: ${d.length} Abweichungen > 2`);
        setProgress({ step: hasCrawl ? 3 : 2, total: totalSteps });

        // ─── PAUSE FÜR USER FEEDBACK ───
        setStage("feedback");
        setStageLabel("Dein Input — Was ist dir wichtig?");
        addLog("⏸️ Warte auf User-Feedback (optional)...");
        return; // Wird durch handleContinue fortgesetzt
      }

      // ─── RUNDE 2: GAMECHANGER (PARALLEL) ───
      if (fromStage === "round2") {
        // User-Feedback in Kontext injizieren
        const fbCtx = buildContextBlock(ctxRef.current.crawlData.filter(c => c.ok), currentWeights, decisionHistory, userFeedback);
        ctxRef.current.ctxBlock = fbCtx;

        setStage("round2");
        setStageLabel("Runde 2 — Gamechanger parallel");
        setProgress({ step: hasCrawl ? 4 : 3, total: totalSteps });
        addLog("🟡 Runde 2 — beide generieren 3 Gamechanger parallel" + (userFeedback ? " (mit User-Feedback)" : ""));

        const deltaStr = deltas.map(x => `${x.perspective}.${x.dimension}: A=${x.scoreA} B=${x.scoreB}`).join(", ") || "Keine großen Abweichungen";
        const gcPrompt = GAMECHANGER_PROMPT(topic, JSON.stringify(proposalA?.proposal), JSON.stringify(proposalB?.proposal), deltaStr, fbCtx);

        const [gcA, gcB] = await Promise.all([callA(gcPrompt), callB(gcPrompt)]);
        if (abortRef.current) return;

        setGamechangersA(gcA);
        setGamechangersB(gcB);
        addLog(`✅ ${(gcA.gamechangers?.length || 0) + (gcB.gamechangers?.length || 0)} Gamechanger erhalten`);
        setProgress({ step: hasCrawl ? 5 : 4, total: totalSteps });
        fromStage = "round3";
      }

      // ─── RUNDE 3: FINAL MERGE ───
      if (fromStage === "round3") {
        setStage("round3");
        setStageLabel("Runde 3 — Final Merge (Claude = Boss)");
        setProgress({ step: hasCrawl ? 6 : 5, total: totalSteps });
        addLog("🟢 Runde 3 — Claude entscheidet über alles");

        const mergeResult = await callA(FINAL_MERGE_PROMPT(
          topic,
          JSON.stringify(proposalA?.proposal), JSON.stringify(proposalB?.proposal),
          JSON.stringify(gamechangersA?.gamechangers), JSON.stringify(gamechangersB?.gamechangers),
          JSON.stringify(proposalA?.scores), JSON.stringify(proposalB?.scores),
          ctxRef.current.ctxBlock
        ));
        if (abortRef.current) return;

        setFinalResult(mergeResult);
        ctxRef.current.mergeResult = mergeResult;
        setProgress({ step: hasCrawl ? 7 : 6, total: totalSteps });
        addLog("✅ Finale Strategie steht");
        addLog(`📊 Score: ${getAvg(mergeResult.final_scores)} (gewichtet: ${getWeightedAvg(mergeResult.final_scores, currentWeights)})`);
        if (mergeResult.build_verdict) addLog(`🏁 Verdict: ${VERDICT_CONFIG[mergeResult.build_verdict]?.label || mergeResult.build_verdict}`);

        const avgScore = parseFloat(getWeightedAvg(mergeResult.final_scores, currentWeights));
        setDecisionHistory(prev => [...prev, {
          date: new Date().toLocaleDateString("de-DE"),
          topic,
          headline: mergeResult.final?.headline || "–",
          avgScore,
          verdict: mergeResult.build_verdict || "–",
          keyPoints: mergeResult.final?.key_elements?.join(", ") || "",
        }]);

        // Save result back to task in strategy mode
        if (mode === "strategy" && selectedTaskIdx !== null && extractedTasks[selectedTaskIdx]) {
          const taskId = extractedTasks[selectedTaskIdx].id;
          setTaskResults(prev => ({ ...prev, [taskId]: { score: avgScore, headline: mergeResult.final?.headline || "–", verdict: mergeResult.build_verdict, finalResult: mergeResult } }));
          addLog(`📋 Task-Ergebnis gespeichert: ${taskId} → ${avgScore}`);
        }

        fromStage = "round4";
      }

      // ─── RUNDE 4: BUILD OUTPUT ───
      if (fromStage === "round4") {
        setStage("round4");
        setStageLabel("Runde 4 — Build Output generieren");
        setProgress({ step: totalSteps - 1, total: totalSteps });
        addLog("🔧 Runde 4 — Erstelle baubare Outputs (Blockstruktur, Copy, Komponenten, SEO, QA...)");

        const boResult = await callA(BUILD_OUTPUT_PROMPT(topic, ctxRef.current.mergeResult || finalResult, ctxRef.current.ctxBlock));
        if (abortRef.current) return;

        setBuildOutput(boResult);
        setProgress({ step: totalSteps, total: totalSteps });
        addLog(`✅ Build Output komplett: ${boResult.block_structure?.length || 0} Blöcke, ${boResult.components?.length || 0} Komponenten, ${boResult.qa_criteria?.length || 0} QA-Checks`);

        setStage("done");
        setStageLabel("Abgeschlossen");
      }

    } catch (e) {
      setError(e.message || "API-Fehler");
      setFailedAt(fromStage);
      setStage("error");
      addLog(`❌ Fehler in ${fromStage}: ${e.message}`);
    }
  }, [topic, context, crawlUrls, manualContent, currentWeights, decisionHistory, userFeedback, aiB, callA, callB, addLog, deltas, proposalA, proposalB, gamechangersA, gamechangersB, mode, selectedTaskIdx, extractedTasks]);

  const startSparring = () => {
    if (!canStart) return;
    setProposalA(null); setProposalB(null);
    setGamechangersA(null); setGamechangersB(null);
    setFinalResult(null); setBuildOutput(null); setDeltas([]);
    setLog([]); setUserFeedback(""); setCopied(false);
    ctxRef.current = { crawlData: [], ctxBlock: "" };
    runFromStage("crawl");
  };

  const handleContinue = () => { runFromStage("round2"); };
  const handleRetry = () => { if (failedAt) runFromStage(failedAt); };
  const abort = () => { abortRef.current = true; setStage("idle"); addLog("⛔ Abgebrochen"); };

  const handleExport = () => {
    const md = generateMarkdown(topic, proposalA, proposalB, gamechangersA, gamechangersB, finalResult, deltas, currentWeights, buildOutput);
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
    setFinalResult(null); setBuildOutput(null); setDeltas([]);
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
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Multi-AI Strategy Sparring · 11 Perspektiven · 33 Datenpunkte</div>
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
            <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>Projekt-Typ</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {PROJECT_TYPES.map(pt => (
                <button key={pt.key} onClick={() => setProjectType(pt.key)} style={{
                  padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  border: projectType === pt.key ? "1px solid #3b82f6" : "1px solid #1f2937",
                  background: projectType === pt.key ? "#3b82f622" : "#111827",
                  color: projectType === pt.key ? "#60a5fa" : "#9ca3af",
                }}>{pt.label}</button>
              ))}
            </div>
            {projectType !== "custom" && (
              <div style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
                {PERSPECTIVES.filter(p => currentWeights[p.key] !== 1).map(p => (
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
              {[{ key: "single", label: "⚡ Einzelnes Sparring", desc: "Ein Thema, ein Sparring" }, { key: "strategy", label: "📄 Strategie-Import", desc: "Dokument → Tasks → Batch-Sparring" }].map(m => (
                <button key={m.key} onClick={() => setMode(m.key)} style={{
                  flex: 1, padding: "10px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  border: "none", textAlign: "center", transition: "all 0.15s ease",
                  background: mode === m.key ? "linear-gradient(135deg, #3b82f622, #8b5cf622)" : "transparent",
                  color: mode === m.key ? "#60a5fa" : "#6b7280",
                  boxShadow: mode === m.key ? "inset 0 0 0 1px #3b82f644" : "none"
                }}>
                  <div>{m.label}</div>
                  <div style={{ fontSize: 9, marginTop: 2, color: mode === m.key ? "#818cf8" : "#4b5563" }}>{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ═══ SINGLE MODE ═══ */}
          {mode === "single" && (
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
          {mode === "strategy" && (
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
                      const text = await crawlUrl(url);
                      data.push({ url, text, ok: true });
                      addLog(`✅ ${url}`);
                    } catch (e) {
                      data.push({ url, text: "", ok: false, error: e.message });
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
            <ProposalCard proposal={proposalA} scores={proposalA?.scores} label="🔵 CLAUDE — Vorschlag A" color="#3b82f6" borderColor="#1e3a5f" tagBg="#1e3a5f" tagColor="#60a5fa" weights={currentWeights} />
            <ProposalCard proposal={proposalB} scores={proposalB?.scores} label={`🟣 ${aiB} — Vorschlag B`} color="#a855f7" borderColor="#5b2178" tagBg="#3b1764" tagColor="#c084fc" weights={currentWeights} />
          </div>

          {deltas.length > 0 && (
            <div style={{ padding: 14, background: "#1c1917", borderRadius: 8, border: "1px solid #f59e0b33", marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 700, marginBottom: 8 }}>⚡ DELTA-ANALYSE ({deltas.length} Abweichungen)</div>
              {deltas.slice(0, 6).map((d, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < Math.min(deltas.length, 6) - 1 ? "1px solid #292524" : "none" }}>
                  <span style={{ fontSize: 12, color: "#d1d5db" }}>{PERSPECTIVES.find(p => p.key === d.perspective)?.icon} {d.dimension}</span>
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
              {gamechangersA?.gamechangers?.map(gc => <GamechangerCard key={gc.id} gc={gc} source="Claude" />)}
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#a855f7", marginBottom: 6, fontWeight: 600 }}>{aiB.toUpperCase()}</div>
              {gamechangersB?.gamechangers?.map(gc => <GamechangerCard key={gc.id} gc={gc} source={aiB} />)}
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
                    <span style={{ color: "#60a5fa", fontWeight: 600 }}>{PERSPECTIVES.find(p => p.key === d.dimension)?.icon || "📌"} {d.dimension}</span>
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
            <ScoreMatrix scores={finalResult.final_scores} label="Finaler Gremium-Score (11 Perspektiven)" weights={currentWeights} />
          </div>

          {/* Build Output */}
          <BuildOutputPanel buildOutput={buildOutput} />
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
          {mode === "strategy" && extractedTasks.length > 0 && (
            <button onClick={() => {
              setStage("idle");
              setProposalA(null); setProposalB(null);
              setGamechangersA(null); setGamechangersB(null);
              setFinalResult(null); setBuildOutput(null); setDeltas([]);
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
            setGamechangersB(null); setFinalResult(null); setBuildOutput(null); setDeltas([]);
            setExtractedTasks([]); setExtractedProject(null); setTaskResults({}); setSelectedTaskIdx(null);
          }} style={{ padding: "10px 20px", background: "#7f1d1d22", color: "#fca5a5", border: "1px solid #dc262633", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
            🗑️ Komplett zurücksetzen
          </button>
        </div>
      )}
    </div>
  );
}