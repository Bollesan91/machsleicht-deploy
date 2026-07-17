// ═══════════════════════════════════════════════════════════════
// party.machsleicht.de — Cloudflare Worker + KV (v2)
// KV Namespace binding: PARTY
// Environment Variables:
//   AMAZON_TAG        (z.B. "machsleicht21-21")
//   AWIN_PUBLISHER_ID (z.B. "123456")
// ═══════════════════════════════════════════════════════════════

// P0-Security: CORS Origin-Whitelist (statt Wildcard *).
// Erlaubt: machsleicht.de + party.machsleicht.de Subdomains + localhost für Dev.
const CORS_ALLOWED_ORIGINS = [
  "https://machsleicht.de",
  "https://www.machsleicht.de",
  "https://party.machsleicht.de",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://127.0.0.1:3000",
];
function corsHeaders(request) {
  const origin = request.headers.get("origin") || "";
  const allowed = CORS_ALLOWED_ORIGINS.includes(origin) ? origin : CORS_ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}
// Backwards-compat — Legacy-CORS-Konstante mit Wildcard, NUR für Helpers ohne request-Context.
// Sobald alle Aufrufer corsHeaders(request) nutzen, kann CORS entfernt werden.
const CORS = { "Access-Control-Allow-Origin": "https://machsleicht.de", "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" };
const MAX_GUESTS = 30;
const MAX_WISHES = 20;
const MAX_PHOTO_BYTES = 500000;

// ── Affiliate Config ────────────────────────────────────
const AFFILIATE_RULES = [
  { name: "amazon",      match: /amazon\.de/i,         build: (url, env) => env.AMAZON_TAG ? setParam(url, "tag", env.AMAZON_TAG) : url },
  { name: "mytoys",      match: /mytoys\.de/i,         build: (url, env) => awinRedirect(url, env, "14340") },
  { name: "thalia",      match: /thalia\.de/i,         build: (url, env) => awinRedirect(url, env, "14356") },
  { name: "otto",        match: /otto\.de/i,           build: (url, env) => awinRedirect(url, env, "14336") },
  { name: "jakoo",       match: /jako-o\.de/i,         build: (url, env) => awinRedirect(url, env, "12381") },
  { name: "tausendkind", match: /tausendkind\.de/i,    build: (url, env) => awinRedirect(url, env, "12498") },
  { name: "smyths",      match: /smythstoys\.com/i,    build: (url, env) => awinRedirect(url, env, "15498") },
  { name: "lego",        match: /lego\.com/i,          build: (url, env) => awinRedirect(url, env, "15498") },
];

function setParam(urlStr, key, val) {
  try { const u = new URL(urlStr); u.searchParams.set(key, val); return u.toString(); } catch { return urlStr; }
}
function awinRedirect(urlStr, env, advertiserId) {
  if (!env.AWIN_PUBLISHER_ID) return urlStr;
  return `https://www.awin1.com/cread.php?awinmid=${advertiserId}&awinaffid=${env.AWIN_PUBLISHER_ID}&ued=${encodeURIComponent(urlStr)}`;
}
function affiliateUrl(urlStr, env) {
  for (const rule of AFFILIATE_RULES) {
    if (rule.match.test(urlStr)) return rule.build(urlStr, env);
  }
  return urlStr;
}

// P1-Security: Open-Redirect-Mitigation. Whitelist erlaubter Wunsch-Shop-Domains.
// Wunsch-URLs ausserhalb dieser Liste werden NICHT via /go/ redirected
// (Schutz gegen Phishing-Vektor: boese Partyseite mit Phishing-Link).
// Erweiterung der 8 Affiliate-Shops um typische Eltern-/Spielwaren-Shops.
// Erweitertes Pattern ([a-z0-9-]+\.)? erlaubt Subdomains (m./mobile./www./shop./etc.)
// aber blockt durch $-Anker Suffix-Bypasses wie amazon.de.evil.com.
// awin1.com bewusst NICHT in Liste — wird intern von affiliateUrl() generiert, sollte
// niemals User-Input sein. Falls jemand awin1.com?ued=phish.com einträgt: blockiert.
const SAFE_WISH_DOMAINS = [
  // Affiliate-Shops (Mobile-Subdomains erlaubt)
  /^([a-z0-9-]+\.)?amazon\.(de|com|fr|at|it|es|nl|pl|se)$/i,
  /^([a-z0-9-]+\.)?mytoys\.de$/i,
  /^([a-z0-9-]+\.)?thalia\.de$/i,
  /^([a-z0-9-]+\.)?otto\.de$/i,
  /^([a-z0-9-]+\.)?jako-o\.de$/i,
  /^([a-z0-9-]+\.)?tausendkind\.de$/i,
  /^([a-z0-9-]+\.)?smythstoys\.com$/i,
  /^([a-z0-9-]+\.)?lego\.com$/i,
  // Non-Affiliate, aber vertrauenswürdige Shops (Mobile-Subdomains erlaubt)
  /^([a-z0-9-]+\.)?ebay\.de$/i,
  /^([a-z0-9-]+\.)?weltbild\.de$/i,
  /^([a-z0-9-]+\.)?mueller\.de$/i,
  /^([a-z0-9-]+\.)?dm\.de$/i,
  /^([a-z0-9-]+\.)?rossmann\.de$/i,
  /^([a-z0-9-]+\.)?buecher\.de$/i,
  /^([a-z0-9-]+\.)?spielwaren\.de$/i,
  /^([a-z0-9-]+\.)?spiele-max\.de$/i,
  /^([a-z0-9-]+\.)?etsy\.com$/i,
  /^([a-z0-9-]+\.)?kaufland\.de$/i,
  /^([a-z0-9-]+\.)?bauer-spielwaren\.de$/i,
  /^([a-z0-9-]+\.)?ostheimer\.de$/i,
  /^([a-z0-9-]+\.)?selecta\.de$/i,
  /^([a-z0-9-]+\.)?haba\.de$/i,
  /^([a-z0-9-]+\.)?ravensburger\.de$/i,
  /^([a-z0-9-]+\.)?schleich-s\.com$/i,
];
function isAllowedWishDomain(urlStr) {
  if (!urlStr || typeof urlStr !== "string") return false;
  try {
    const u = new URL(urlStr);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    return SAFE_WISH_DOMAINS.some(re => re.test(u.hostname));
  } catch { return false; }
}

function shopLabel(urlStr) {
  if (!urlStr) return "";
  if (/amazon\.de/i.test(urlStr)) return "bei Amazon";
  if (/mytoys\.de/i.test(urlStr)) return "bei myToys";
  if (/thalia\.de/i.test(urlStr)) return "bei Thalia";
  if (/otto\.de/i.test(urlStr)) return "bei Otto";
  if (/jako-o\.de/i.test(urlStr)) return "bei Jako-o";
  if (/tausendkind\.de/i.test(urlStr)) return "bei tausendkind";
  if (/smythstoys\.com/i.test(urlStr)) return "bei Smyths Toys";
  if (/lego\.com/i.test(urlStr)) return "bei LEGO";
  return "ansehen";
}

// Nur eigene/generische Mottos — lizenzierte Marken (Frozen, Harry Potter, Minecraft,
// Paw Patrol, Pokemon, Spider-Man, Super Mario, Ninjago, Halloween) entfernt:
// per Substring-Match aktiv erreichbar -> Seite haette lizenzierte Marken aktiv gethemed.
const MOTTO_EMOJI = {"piraten":"\u{1F3F4}\u{200D}\u{2620}\u{FE0F}","dino":"\u{1F995}","safari":"\u{1F981}","weltraum":"\u{1F680}","detektiv":"\u{1F50D}","superheld":"\u{1F9B8}","prinzessin":"\u{1F478}","einhorn":"\u{1F984}","meerjungfrau":"\u{1F9DC}\u{200D}\u{2640}\u{FE0F}","feuerwehr":"\u{1F692}","baustelle":"\u{1F3D7}\u{FE0F}","dschungel":"\u{1F334}","feen":"\u{1F9DA}","pferde":"\u{1F434}","ritter":"\u{1F3F0}"};  // L4: identisch zu den Creator-Chips
const MOTTO_COLORS = {
  "piraten":"#1E3A5F","einhorn":"#E040A0","dino":"#4CAF50","feuerwehr":"#D32F2F",
  "weltraum":"#1565C0","meerjungfrau":"#00ACC1","prinzessin":"#E91E63","safari":"#F57F17",
  "detektiv":"#37474F","ritter":"#795548","superheld":"#D32F2F","zirkus":"#FF6F00",
  "baustelle":"#F57F17","pferde":"#A1724E","dschungel":"#33691E","feen":"#9C27B0",
};

// ── Theme System (full palette per motto) ──────────────
const THEMES = {
  piraten:      {a:"#1E3A5F",d:"#0A1A2F",m:"#16304D",l:"#B8C7D9",bg:"#EAF0F6",h1:"#0A1A2F",h2:"#1E3A5F",h3:"#4A6886"},
  dino:         {a:"#4CAF50",d:"#1B5E20",m:"#558B2F",l:"#C5E1A5",bg:"#F1F8E9",h1:"#2E7D32",h2:"#4CAF50",h3:"#81C784"},
  safari:       {a:"#F57F17",d:"#4E3419",m:"#8D6E35",l:"#FFE0B2",bg:"#FFF8E1",h1:"#E65100",h2:"#F57F17",h3:"#FFB74D"},
  weltraum:     {a:"#1565C0",d:"#0D1B2A",m:"#1B3A5C",l:"#BBDEFB",bg:"#E3F2FD",h1:"#0D47A1",h2:"#1565C0",h3:"#64B5F6"},
  detektiv:     {a:"#546E7A",d:"#1B262C",m:"#455A64",l:"#CFD8DC",bg:"#ECEFF1",h1:"#263238",h2:"#455A64",h3:"#90A4AE"},
  superheld:    {a:"#D32F2F",d:"#4A0E0E",m:"#8B2222",l:"#FFCDD2",bg:"#FFEBEE",h1:"#B71C1C",h2:"#D32F2F",h3:"#EF5350"},
  prinzessin:   {a:"#E91E63",d:"#4A0E27",m:"#AD1457",l:"#F8BBD0",bg:"#FCE4EC",h1:"#880E4F",h2:"#C2185B",h3:"#F06292"},
  einhorn:      {a:"#AB47BC",d:"#4A148C",m:"#7B1FA2",l:"#E1BEE7",bg:"#F3E5F5",h1:"#6A1B9A",h2:"#9C27B0",h3:"#BA68C8"},
  meerjungfrau: {a:"#00ACC1",d:"#004D56",m:"#00838F",l:"#B2EBF2",bg:"#E0F7FA",h1:"#006064",h2:"#00ACC1",h3:"#4DD0E1"},
  feuerwehr:    {a:"#D32F2F",d:"#4A0E0E",m:"#C62828",l:"#FFCDD2",bg:"#FFEBEE",h1:"#B71C1C",h2:"#D32F2F",h3:"#E57373"},
  ritter:       {a:"#795548",d:"#3E2723",m:"#5D4037",l:"#D7CCC8",bg:"#EFEBE9",h1:"#4E342E",h2:"#6D4C41",h3:"#A1887F"},
  zirkus:       {a:"#FF6F00",d:"#4A2800",m:"#E65100",l:"#FFE0B2",bg:"#FFF3E0",h1:"#E65100",h2:"#FF6F00",h3:"#FFB74D"},
  baustelle:    {a:"#F57F17",d:"#4A3000",m:"#F9A825",l:"#FFF9C4",bg:"#FFFDE7",h1:"#F57F17",h2:"#FBC02D",h3:"#FFF176"},
  pferde:       {a:"#A1724E",d:"#3E2415",m:"#7A5230",l:"#E6D2BE",bg:"#FBF3EA",h1:"#5C3A20",h2:"#A1724E",h3:"#C99A6E"},
  dschungel:    {a:"#33691E",d:"#1B2E0A",m:"#558B2F",l:"#DCEDC8",bg:"#F1F8E9",h1:"#1B2E0A",h2:"#33691E",h3:"#7CB342"},
  feen:         {a:"#9C27B0",d:"#38006B",m:"#7B1FA2",l:"#E1BEE7",bg:"#F5EEF8",h1:"#4A148C",h2:"#9C27B0",h3:"#CE93D8"},
};
const DEFAULT_THEME = {a:"#D4812A",d:"#2D2319",m:"#8B7D6B",l:"#EDE6DE",bg:"#FFFCF7",h1:"#A0522D",h2:"#D4812A",h3:"#E8A960"};

function getTheme(motto) {
  if (!motto) return DEFAULT_THEME;
  const m = motto.toLowerCase();
  for (const [key, t] of Object.entries(THEMES)) {
    if (m.includes(key)) return t;
  }
  return DEFAULT_THEME;
}

function autoMottoColor(motto) {
  if (!motto) return "#D4812A";
  const m = motto.toLowerCase();
  for (const [key, col] of Object.entries(MOTTO_COLORS)) {
    if (m.includes(key)) return col;
  }
  return "#D4812A";
}

// ── Helpers ─────────────────────────────────────────────
function json(data, status = 200, request = null) {
  const cors = request ? corsHeaders(request) : CORS;
  // W9-7: no-store — API-Antworten tragen Kindnamen/Wuensche und duerfen nicht heuristisch gecacht werden
  return new Response(JSON.stringify(data), { status, headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
function generateId(len = 8) {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  // Gate-K11: Rejection-Sampling — 256 % 31 != 0, sonst Modulo-Bias (Min-Entropie 4.83 statt 4.95 bit/Zeichen)
  let out = "";
  while (out.length < len) {
    for (const b of crypto.getRandomValues(new Uint8Array(len * 2))) {
      if (b >= 248) continue;
      out += chars[b % 31];
      if (out.length >= len) break;
    }
  }
  return out;
}
function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(24))).map(b => b.toString(16).padStart(2, "0")).join("");
}
function calcTTL(partyDate) {
  // Bolle-Regel 13.07.2026: Party + alle Daten (Fotos, Gaeste) verfallen automatisch
  // 14 TAGE NACH DEM PARTYDATUM. Manuell loeschen geht jederzeit vorher (Edit-Link, DELETE).
  // F3: ungueltiges/kaputtes Datum -> Fallback 30 Tage ab jetzt (PATCH mit echtem Datum
  // berechnet die TTL neu; jede Aenderung/RSVP schreibt mit frischer calcTTL). Min 1 Tag.
  let base = partyDate ? new Date(partyDate) : null;
  if (!base || isNaN(base.getTime())) {
    return Math.floor(30 * 24 * 60 * 60); // 30 Tage ab jetzt
  }
  const expiry = new Date(base.getTime() + 14 * 24 * 60 * 60 * 1000);
  // W9-8: Obergrenze 2 Jahre — ein per Direkt-API praepariertes date:"9999-12-31" machte den KV-Eintrag sonst quasi unsterblich
  return Math.min(Math.max(Math.floor((expiry.getTime() - Date.now()) / 1000), 86400), 2 * 365 * 86400);
}
function esc(str) {
  if (!str) return "";
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
// Possessiv-Apostroph (Marken-Stil, Apostroph = ' wie in "mach's"): "Lina's", aber bei
// Zischlaut-Endung (s/ss/ß/x/z) nur Apostroph: "Mats'", "Max'", "Franz'". Eingabe ggf. schon escaped.
function poss(name){ const s = String(name==null?"":name).trim(); if(!s) return s; return s + (/(s|ß|x|z)$/i.test(s) ? "'" : "'s"); }
// Erstes Grapheme-Cluster (ein vollstaendiges Emoji). slice(0,4) zerschnitt ZWJ-Emojis (🏴‍☠️=5 Units, 🧜‍♀️) -> kaputtes Hero-Emoji.
function firstEmoji(s){
  s = (s==null ? "" : String(s)) || "🎉";
  try { const r = new Intl.Segmenter(undefined,{granularity:"grapheme"}).segment(s)[Symbol.iterator]().next(); return r.done ? "🎉" : r.value.segment; }
  catch(e){ return s.slice(0,8); }
}
function escJson(str) {
  if (!str) return "";
  // C1-Security: zusaetzlich < und > als \uXXXX escapen. In JS-String-Kontexten (var CNL="...")
  // verhindert das den </script>-Ausbruch (Stored-XSS auf der oeffentlichen Gaesteseite); der JS-Wert
  // bleibt korrekt (< === '<'). In ICS-Text nur kosmetisch bei seltenem < im Namen.
  return String(str).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/</g,"\\u003C").replace(/>/g,"\\u003E");
}
// P0-Security: Wunsch-URL-Validation. Verhindert javascript:/data:/vbscript:/file:-Protokoll-Injection.
// Whitelist: nur http:/https:. Längenlimit 500. Bei invalid → "" (= kein Link).
function normalizeWishUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return "";
  const trimmed = rawUrl.trim().slice(0, 500);
  if (!trimmed) return "";
  try {
    const u = new URL(trimmed);
    // Nur http und https — javascript:, data:, file:, vbscript:, blob:, etc. blockieren
    if (u.protocol !== "http:" && u.protocol !== "https:") return "";
    // http → https upgrade (Sicherheit + Mixed-Content-Verhinderung)
    if (u.protocol === "http:") u.protocol = "https:";
    return u.toString();
  } catch {
    return ""; // Invalid URL
  }
}
function isSafeUrl(s) {
  return typeof s === "string" && (s.startsWith("https://") || s.startsWith("http://"));
}

// P1-Security: Foto-Upload-Härtung. Base64-Image-Format-Whitelist + Magic-Bytes-Check.
// Erlaubt: data:image/(jpeg|jpg|png|webp);base64,...
// Blockiert: SVG (XSS-Risiko via <script> im SVG), PDF, GIF (animiert + alte CVEs), willkürliche Base64.
// Returns: true wenn safe, false sonst.
function isSafePhoto(b64) {
  if (!b64 || typeof b64 !== "string") return false;
  if (b64.length > MAX_PHOTO_BYTES * 1.37) return false; // Längen-Check (1.37 = Base64-Overhead)
  // Format-Prefix: data:image/jpeg|jpg|png|webp;base64,
  const m = b64.match(/^data:image\/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=]+)$/);
  if (!m) return false;
  const payload = m[2];
  if (payload.length < 100) return false; // Min-Sanity (< 75 Bytes Bild ist unrealistisch)
  // Magic-Bytes-Check via Base64-Anfangs-Decode (erste 6 Bytes reichen)
  try {
    const head = atob(payload.slice(0, 16)); // ~12 decoded Bytes (genug fuer WEBP-Marker bei Offset 8)
    const codes = [head.charCodeAt(0), head.charCodeAt(1), head.charCodeAt(2), head.charCodeAt(3)];
    // JPEG: FF D8 FF
    if (codes[0] === 0xFF && codes[1] === 0xD8 && codes[2] === 0xFF) return true;
    // PNG: 89 50 4E 47
    if (codes[0] === 0x89 && codes[1] === 0x50 && codes[2] === 0x4E && codes[3] === 0x47) return true;
    // WebP: "RIFF"(0-3) + "WEBP"(8-11) — RIFF allein wuerde auch AVI/WAV durchlassen
    if (codes[0] === 0x52 && codes[1] === 0x49 && codes[2] === 0x46 && codes[3] === 0x46
        && head.charCodeAt(8) === 0x57 && head.charCodeAt(9) === 0x45 && head.charCodeAt(10) === 0x42 && head.charCodeAt(11) === 0x50) return true;
    return false; // Anderes Magic = ablehnen
  } catch {
    return false; // Base64-Decode-Fehler
  }
}

// paypalMe gegen Stored-XSS haerten: nur echte paypal.me-Handles, kanonisch normalisiert.
// Der Gaeste-Sink (loadWishes: <a href="...">) konkateniert paypalMe roh -> ohne diese
// Validierung kann paypalMe='"><img src=x onerror=...>' XSS im Browser jedes Gastes ausloesen.
function sanitizePaypal(v) {
  v = (v || "").trim().slice(0, 100);
  if (!v) return "";
  const m = v.match(/^(?:https?:\/\/)?(?:www\.)?paypal\.me\/([A-Za-z0-9_.\-]{1,80})\/?$/i);
  return m ? "https://paypal.me/" + m[1] : "";
}

// RFC-5545 TEXT-Escaping fuer .ics-Werte (SUMMARY/LOCATION/DESCRIPTION):
// Backslash, Semikolon, Komma escapen; echte Newlines -> literal \n (sonst bricht eine
// mehrzeilige Adresse die Kalenderdatei / Property-Injection). escJson taugt dafuer NICHT.
function icsEscape(s) {
  return String(s == null ? "" : s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r\n|\r|\n/g, "\\n");
}

// H2: korruptes KV-JSON darf nicht jeden Read-Pfad mit uncaught throw (500/1101 ohne CORS) abreissen.
// Gibt null zurueck -> Handler antwortet sauber statt zu crashen (und die Party bleibt loeschbar).
async function refreshPhotoTtl(env, id, party, ttl) {
  // K6/L8: Foto-Keys auf die frische TTL heben — bei Datumsaenderung UND bei datumslosen Partys
  // (relativer 30d-Fallback), sonst laufen party:- und Foto-Lebensdauer auseinander (og:image 404).
  if (party.hasPhoto) { const _ph = await env.PARTY.get(`photo:${id}`); if (_ph) await env.PARTY.put(`photo:${id}`, _ph, {expirationTtl:ttl}); }
  if (party.hasGamePhoto) { const _pr = await env.PARTY.get(`invphoto:${id}`); if (_pr) await env.PARTY.put(`invphoto:${id}`, _pr, {expirationTtl:ttl}); }
}
function safeParse(raw) { try { return JSON.parse(raw); } catch (e) { return null; } }
// M1: Nicht-JSON-Body soll 400 geben, nicht 500. Gibt null bei kaputtem Body.
async function safeReqJson(req) { try { return await req.json(); } catch (e) { return null; } }
// #30 Type-Confusion-Schutz: Nicht-Strings ({"name":[]}) wuerfen bei .trim()/.slice() TypeError -> 500.
function asStr(v) { return typeof v === "string" ? v : ""; }
function asArr(v) { return Array.isArray(v) ? v : []; }

// M4: nur echtes ISO-Datum (YYYY-MM-DD) akzeptieren — sonst "Invalid Date"/kaputtes ICS-DTSTART.
function validDate(d) { if(!/^\d{4}-\d{2}-\d{2}$/.test(d || "")) return ""; const t = new Date(d+"T00:00:00Z"); return (!isNaN(t.getTime()) && t.toISOString().slice(0,10)===d) ? d : ""; }  // J9: "2026-99-99" faellt sonst bis in RSVP_EXP durch (NaN -> nie-Ablauf)
// W10-3: nur HH:MM — Zeit-Felder fliessen ungeescaped in DTSTART/DTEND (Zeilenstruktur der ICS).
function validTime(t) { return /^([01]\d|2[0-3]):[0-5]\d$/.test(asStr(t)) ? asStr(t) : ""; }

// ═══════════════════════════════════════════════════════════════
// MAIN ROUTER
// ═══════════════════════════════════════════════════════════════
export default {
  async fetch(request, env) {
   try {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(request) });

    // POST /api/create
    if (path === "/api/create" && request.method === "POST") {
      const body = await safeReqJson(request); if (!body) return json({error:"Ungültige Anfrage"}, 400, request);
      // Abuse-Schutz: IP-basiertes Rate-Limit (KV-Counter, 1h-Fenster) gegen Spam-Erstellung -> KV-Muell/Kosten.
      // Eventual-consistent (KV nicht atomar) -> reicht als Spam-Drossel; bei fehlender IP (lokal/Test) ueberspringen.
      const _ip = request.headers.get("cf-connecting-ip") || "";
      if (_ip) {
        const _rlKey = "rl:create:" + _ip + ":" + Math.floor(Date.now()/3600000);  // W10-4: Stundenfenster im Key (TTL-Reset machte das Limit kumulativ)
        const _cnt = parseInt(await env.PARTY.get(_rlKey) || "0", 10) || 0;
        if (_cnt >= 8) return json({error:"Zu viele Partyseiten in kurzer Zeit. Bitte sp\u00E4ter nochmal."}, 429, request);
        await env.PARTY.put(_rlKey, String(_cnt + 1), {expirationTtl: 7200});
      }
      const id = generateId(12); // Review 2026-07-12: 8 Zeichen ≈ 2^39 — oeffentliche Foto-URLs (invimg/ogimg) haengen an der ID, 12 Zeichen ≈ 2^59; Routen-Regex {6,12} deckt Altbestand
      const editToken = generateToken();
      const party = {
        id, editToken,
        childName: (asStr(body.childName)).trim().slice(0,50),
        age: Math.min(Math.max(parseInt(body.age)||0,0),18)||null,
        motto: (asStr(body.motto)).slice(0,60),
        mottoId: (/^[a-z0-9-]{1,40}$/.test(asStr(body.mottoId)) ? body.mottoId : ""), // J4: strikt — landet u.a. in einem konstruierten RegExp // sauberer Theme-Kontrakt: kanonische ID statt Freitext-Name (getTheme matcht damit exakt, Custom faellt sauber auf Default)
        gameId: /^[a-z0-9-]{1,60}$/.test(asStr(body.gameId)) ? body.gameId : null, // gewaehltes Einladungsspiel (GAME_CATALOG); Serve loest den Pfad auf, null/unbekannt -> Legacy-Default je Motto
        mottoEmoji: firstEmoji(body.mottoEmoji),
        mottoColor: /^#[0-9a-fA-F]{6}$/.test(body.mottoColor)?body.mottoColor:"#D4812A",
        date: validDate(body.date), time: validTime(body.time), endTime: validTime(body.endTime), // W10-3: nur HH:MM — freier Text landete via escJson->LF als RFC-5545-Property-Injection im .ics aller Gaeste
        address: (asStr(body.address)).slice(0,200),
        notes: (asStr(body.notes)).slice(0,500),
        askAllergies: body.askAllergies!==false,
        askPickup: body.askPickup!==false,
        wishes: (asArr(body.wishes)).slice(0,MAX_WISHES).map(w=>({
          id: generateId(6), title:(asStr(w.title)).slice(0,100), url:(()=>{const _u=normalizeWishUrl(w.url);return _u&&isAllowedWishDomain(_u)?_u:"";})(),  // K8: Create strippt still (Wizard nicht brechen), PUT lehnt mit Ansage ab
          price:(asStr(w.price)).slice(0,20), sharedGift:!!w.sharedGift, claimedBy:[]
        })).filter(w=>w.title),
        guests: [],
        paypalMe: sanitizePaypal(body.paypalMe),
        created: new Date().toISOString(),
        ref: /^[a-z0-9]{6,12}$/.test(asStr(body.ref)) ? body.ref : null,  // Virale Attribution (Gast->Host): ID der Party, die diesen neuen Host geseedet hat
      };
      // Party-Pass: optionales invites-Feld (Array von Vornamen) — vorbereiteter Anschluss fuer den Planer.
      party.invites = makeInvites(asArr(body.invites), party.mottoId, []);
      const ttl = calcTTL(party.date);
      // photoRound (Spiel-Foto): raw base64 unter invphoto:<id> ablegen (von /api/invimg ausgeliefert) + Flag setzen.
      // Beim Serve wird daraus eine KURZE /api/invimg-URL gebaut statt das base64 in die iframe-URL zu haengen —
      // das sprengte sonst das ~14KB-URL-Limit (HTTP 414) und brach das Spiel-Foto fuer JEDES reale Foto (#29).
      const _prValid = body.photoRound && isSafePhoto(body.photoRound);
      party.hasGamePhoto = !!_prValid;
      party.hasPhoto = !!(body.photo && isSafePhoto(body.photo)); // og:image-Flag (WhatsApp-Link-Vorschau via /api/ogimg) — vermeidet KV-Read beim Serve
      await env.PARTY.put(`party:${id}`, JSON.stringify(party), {expirationTtl:ttl});
      if (body.photo && isSafePhoto(body.photo)) {
        await env.PARTY.put(`photo:${id}`, body.photo, {expirationTtl:ttl});
      }
      if (_prValid) {
        const _prRaw = body.photoRound.indexOf("data:")===0 ? body.photoRound.split(",")[1] : body.photoRound;
        await env.PARTY.put(`invphoto:${id}`, _prRaw, {expirationTtl:ttl});
      }
      return json({id, editToken, url:`https://party.machsleicht.de/${id}`, editUrl:`https://party.machsleicht.de/${id}?edit=${editToken}`, invites: party.invites.map(i=>({n:i.n, url:`https://party.machsleicht.de/${id}?g=${i.t}`}))}, 200, request);
    }

    // GET /api/party/:id
    if (path.match(/^\/api\/party\/[a-z0-9]+$/) && request.method === "GET") {
      const id = path.split("/")[3];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404, request);
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const edit = url.searchParams.get("edit");
      if (edit === party.editToken) return json(party, 200, request);
      // P0-Security Welle 1C: doiToken aus Public-GET strippen — sonst kann jeder Gast
      // /api/newsletter-confirm?token=... triggern und fremde E-Mails ungewollt bestätigen.
      const {editToken,email,doiToken,ref,address,invites,...safe} = party;   // ref + address + invites (Gast-Tokens!) intern -> nicht im Public-GET leaken
      safe.wishes = (safe.wishes||[]).map(w=>{
        const cb = w.claimedBy||[];
        const claimedAmountTotal = cb.reduce((s,e)=>s+(typeof e==="object" && e && typeof e.amount==="number" ? e.amount : 0),0);
        // W8-7: Altbestands-URL ohne Whitelist-Domain nicht ausliefern — /go bounct sie ohnehin, der Client wuerde einen toten "ansehen"-Link rendern.
        return {...w, url:(w.url && isAllowedWishDomain(w.url)) ? w.url : "", claimedBy:undefined, claimedCount:cb.length, claimedAmountTotal, isFull:!w.sharedGift && cb.length>0};
      });
      safe.guestCount = (Array.isArray(safe.guests)?safe.guests:[]).filter(g=>g&&g.status==="ja").length;  // W13-2: Legacy-Party ohne guests-Feld warf sonst TypeError -> 500 auf dem Public-GET (Wunschliste/Zaehler still tot)
      safe.paypalMe = sanitizePaypal(safe.paypalMe); // Legacy-Parties auch beim Lesen haerten (Gaeste-Sink)
      safe.guests = undefined;
      return json(safe, 200, request);
    }

    // PUT /api/party/:id
    if (path.match(/^\/api\/party\/[a-z0-9]+$/) && request.method === "PUT") {
      const id = path.split("/")[3];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404, request);
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const body = await safeReqJson(request); if (!body) return json({error:"Ungültige Anfrage"}, 400, request);
      // P0-Security Welle 1E: Legacy-Party ohne editToken darf NICHT editierbar sein.
      // Sonst Auth-Bypass: body.editToken=undefined gegen party.editToken=undefined → match.
      if (!party.editToken || body.editToken !== party.editToken) return json({error:"Nicht berechtigt"},403, request);
      // P0-Security: PUT muss DIESELBE Sanitization wie /api/create anwenden — sonst umgeht ein editToken-Inhaber
      // saemtliche create-Limits (Stored-XSS via age/notes/childName etc. auf der oeffentlichen Gaesteseite, Gutachter-HIGH).
      if(body.childName!==undefined) party.childName = (asStr(body.childName)).trim().slice(0,50);
      if(body.age!==undefined) party.age = Math.min(Math.max(parseInt(body.age)||0,0),18)||null;
      if(body.motto!==undefined) party.motto = (asStr(body.motto)).slice(0,60);
      // Gate-G2: Editor-PUT traegt nur Motto-Freitext. Standard-Label (klein geschrieben = Katalog-ID)
      // als mottoId-Wechsel behandeln, damit Theme/Pass/Rollen nicht auseinanderlaufen; Custom-Text bleibt unberuehrt.
      if(body.mottoId===undefined && body.motto!==undefined){
        const _cand=(asStr(body.motto)).trim().toLowerCase();
        if(ROLE_CATALOG[_cand] && _cand!==party.mottoId) body.mottoId=_cand;
        // H6: Standard -> Custom-Freitext darf nicht am alten Theme/Pass/Rollensatz kleben
        else if(!ROLE_CATALOG[_cand] && party.mottoId && !(new RegExp("(^|[^a-z\u00E0-\u00FC])"+party.mottoId).test(_cand))) body.mottoId="";  // I9: Wortgrenze — "superhelden" behaelt superheld, "kaffeenachmittag" klebt nicht an feen
      }
      if(body.mottoId!==undefined){
        const _oldMotto = party.mottoId;
        party.mottoId = (/^[a-z0-9-]{1,40}$/.test(asStr(body.mottoId)) ? body.mottoId : "");  // J4: strikt — landet u.a. in einem konstruierten RegExp
        // Gate-F7: Rollen-IDs sind Katalog-gebunden. Beim Motto-Wechsel per Index uebersetzen,
        // sonst faellt die Gastseite still auf Rolle 1 und das naechste Speichern wuerfelt alles neu.
        if(_oldMotto!==party.mottoId && Array.isArray(party.invites) && party.invites.length){
          const _or = rolesFor(_oldMotto), _nr = rolesFor(party.mottoId);
          party.invites.forEach((inv,i)=>{ if(!inv) return; if(_nr.find(r=>r.id===inv.role)) return; const oi=_or.findIndex(r=>r.id===inv.role); inv.role=_nr[(oi>=0?oi:i)%_nr.length].id; });  // gleiche ID im neuen Katalog gewinnt (Re-Check)
        }
        // L4: Emoji + Farbe ziehen beim Katalog-Wechsel mit — sonst Dino-Theme mit Piraten-Emoji
        if(_oldMotto!==party.mottoId && MOTTO_EMOJI[party.mottoId]){
          if(body.mottoEmoji===undefined) party.mottoEmoji = MOTTO_EMOJI[party.mottoId];
          if(body.mottoColor===undefined && MOTTO_COLORS[party.mottoId]) party.mottoColor = MOTTO_COLORS[party.mottoId];
        }
      }
      if(body.gameId!==undefined) party.gameId = /^[a-z0-9-]{1,60}$/.test(asStr(body.gameId)) ? body.gameId : null;
      if(body.mottoEmoji!==undefined) party.mottoEmoji = firstEmoji(body.mottoEmoji);
      if(body.mottoColor!==undefined) party.mottoColor = /^#[0-9a-fA-F]{6}$/.test(body.mottoColor)?body.mottoColor:"#D4812A";
      if(body.date!==undefined) party.date = validDate(body.date);
      if(body.time!==undefined) party.time = validTime(body.time);  // W10-3: s. create
      if(body.endTime!==undefined) party.endTime = validTime(body.endTime);  // W10-3: s. create
      if(body.address!==undefined) party.address = (asStr(body.address)).slice(0,200);
      if(body.notes!==undefined) party.notes = (asStr(body.notes)).slice(0,500);
      if(body.askAllergies!==undefined) party.askAllergies = body.askAllergies!==false;
      if(body.askPickup!==undefined) party.askPickup = body.askPickup!==false;
      if(body.paypalMe!==undefined) party.paypalMe = sanitizePaypal(body.paypalMe);
      if(body.email!==undefined) party.email = (asStr(body.email)).slice(0,120);
      if (Array.isArray(body.wishes)) {
        // I3: claimedBy kommt IMMER aus dem gespeicherten Stand (Claims aendern sich nur via /claim).
        const _oldWishes = Array.isArray(party.wishes)?party.wishes:[];
        // Gate-K8/L11: Whitelist nur fuer NEUE/geaenderte URLs (Legacy-Bestand darf Add/Delete nicht blockieren),
        // und die Meldung nennt den Verursacher-Wunsch.
        for (const w of body.wishes) {
          const _u = normalizeWishUrl(w && w.url);
          if (!_u || isAllowedWishDomain(_u)) continue;
          const _prev = _oldWishes.find(x=>x && x.id===asStr(w && w.id));
          if (_prev && normalizeWishUrl(_prev.url)===_u) continue;
          return json({error:`"${(asStr(w && w.title)).slice(0,40)||"Dieser Wunsch"}": Der Shop wird nicht unterstützt — nutze einen Link von Amazon, myToys, Thalia, Otto & Co. oder lass das Link-Feld leer.`},400, request);
        }
        party.wishes = body.wishes.slice(0,MAX_WISHES).map(w=>({
          id:(/^[a-z0-9]{1,12}$/.test(asStr(w.id))?w.id:generateId(6)),title:(asStr(w.title)).slice(0,100),url:normalizeWishUrl(w.url),  // H10: id ist onclick-/href-Sink auf der Gastseite — nie ungefiltert uebernehmen
          price:(asStr(w.price)).slice(0,20),sharedGift:!!w.sharedGift,claimedBy:(()=>{const _p=_oldWishes.find(x=>x && x.id===asStr(w.id));return _p && Array.isArray(_p.claimedBy)?_p.claimedBy:[];})()
        }));
      }
      const ttl = calcTTL(party.date);
      // Gate-J1: Datumsaenderung ohne neues Foto-Payload — photo:/invphoto: leben sonst auf der ALTEN TTL
      // (Verschiebung nach hinten: Foto stirbt vor der Party; nach vorn: Foto ueberlebt die 14-Tage-Zusage).
      if (body.date!==undefined || !party.date) await refreshPhotoTtl(env, id, party, ttl);  // K6/L8
      if (body.photo===null) { await env.PARTY.delete(`photo:${id}`); party.hasPhoto = false; }
      else if (body.photo && isSafePhoto(body.photo)) { await env.PARTY.put(`photo:${id}`,body.photo,{expirationTtl:ttl}); party.hasPhoto = true; }
      // Review-MAJOR 2026-07-12: PATCH schrieb photoRound:<id> — einen Key, den der Serve-Pfad NIE liest
      // (Serve nutzt invphoto:<id>, s. /api/invimg). Jetzt derselbe Kontrakt wie CREATE: raw base64 unter
      // invphoto: + hasGamePhoto-Flag pflegen. photoRound:-Altbestand wird beim Entfernen mit abgeraeumt.
      if (body.photoRound===null) { await env.PARTY.delete(`invphoto:${id}`); await env.PARTY.delete(`photoRound:${id}`); party.hasGamePhoto = false; }
      else if (body.photoRound && isSafePhoto(body.photoRound)) {
        const _prRaw = body.photoRound.indexOf("data:")===0 ? body.photoRound.split(",")[1] : body.photoRound;
        await env.PARTY.put(`invphoto:${id}`,_prRaw,{expirationTtl:ttl});
        await env.PARTY.delete(`photoRound:${id}`); // Orphan-Altbestand des frueheren (kaputten) PATCH-Kontrakts mit abraeumen
        party.hasGamePhoto = true;
      }
      await env.PARTY.put(`party:${id}`,JSON.stringify(party),{expirationTtl:ttl});
      return json({ok:true}, 200, request);
    }

    // DELETE /api/party/:id — DSGVO Self-Service-Lösch-Endpoint
    // Auth: editToken NUR via Body (Query würde in Cloudflare-Logs persistieren).
    // Löscht: party + photo + photoRound + doi-Token (falls vorhanden) aus KV.
    if (path.match(/^\/api\/party\/[a-z0-9]+$/) && request.method === "DELETE") {
      const id = path.split("/")[3];
      // P0-Security: Token NUR aus Body — Query-Parameter wäre in CF-Logs persistiert
      let providedToken = null;
      try {
        const body = await safeReqJson(request); if (!body) return json({error:"Ungültige Anfrage"}, 400, request);
        providedToken = body && body.editToken;
      } catch { /* no body */ }
      if (!providedToken) return json({error:"Token fehlt"},400,request);
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404,request);
      // Defensive: robust gegen kaputtes JSON
      let party = null;
      try { party = JSON.parse(raw); } catch { party = null; }
      if (!party) {
        // P0-Security Welle 1C: KEIN Lösch ohne Token-Check.
        // Corrupted JSON darf nicht als Backdoor missbraucht werden (Attack-Vector:
        // KV-Race forcen, dann auth-frei löschen). Statt löschen → 500-Fehler,
        // erfordert Admin-Intervention via Cloudflare-Dashboard.
        return json({error:"Party-Daten korrupt (JSON-Parse fehlgeschlagen) — bitte kontaktiere kontakt@machsleicht.de"}, 500, request);
      }
      if (providedToken !== party.editToken) return json({error:"Nicht berechtigt"},403,request);
      await env.PARTY.delete(`party:${id}`);
      await env.PARTY.delete(`photo:${id}`);
      await env.PARTY.delete(`photoRound:${id}`);
      await env.PARTY.delete(`invphoto:${id}`); // Review-MAJOR 2026-07-12 (DSGVO): Spielfoto blieb sonst nach "endgueltig loeschen" bis TTL unter /api/invimg abrufbar
      if (party.doiToken) await env.PARTY.delete(`doi:${party.doiToken}`);
      return json({ok:true, deleted:true, message:"Party und alle zugehörigen Daten wurden gelöscht."}, 200, request);
    }

// POST /api/party/:id/invites — persoenliche Gast-Einladungen verwalten (Party-Pass Phase 1).
    // Eigener Endpoint statt PUT-Erweiterung: braucht Token-Merge-Logik (Links duerfen beim
    // Editieren nicht invalidieren) — PUT bleibt ein reiner Feld-Patch. Auth wie PUT/DELETE.
    if (path.match(/^\/api\/party\/[a-z0-9]+\/invites$/) && request.method === "POST") {
      const id = path.split("/")[3];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404, request);
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const body = await safeReqJson(request); if (!body) return json({error:"Ungültige Anfrage"}, 400, request);
      if (!party.editToken || body.editToken !== party.editToken) return json({error:"Nicht berechtigt"},403, request);
      party.invites = makeInvites(asArr(body.invites), party.mottoId, Array.isArray(party.invites)?party.invites:[]);
      if (!party.date) await refreshPhotoTtl(env, id, party, calcTTL(party.date));  // W8-5: datumslose Party — Foto-Keys mit auf die frische 30d-TTL heben
      await env.PARTY.put(`party:${id}`,JSON.stringify(party),{expirationTtl:calcTTL(party.date)});
      return json({ok:true, invites: party.invites.map(i=>({t:i.t, n:i.n, role:i.role, url:`https://party.machsleicht.de/${id}?g=${i.t}`}))}, 200, request);
    }

// POST /api/party/:id/rsvp
    if (path.match(/^\/api\/party\/[a-z0-9]+\/rsvp$/) && request.method === "POST") {
      const id = path.split("/")[3];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404, request);
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const body = await safeReqJson(request); if (!body) return json({error:"Ungültige Anfrage"}, 400, request);
      // Abuse-Drossel (anonymer Schreib-Endpoint): IP-Counter gemeinsam mit wish/claim, 90/h gegen Flood/KV-Bloat
      // (W8-11: 30/h drosselte legitime Klassen hinter Schul-WLAN/CGNAT — eine geteilte IPv4 fuer 25 Kinder).
      { const _ip=request.headers.get("cf-connecting-ip")||""; if(_ip){ const _k="rl:guestwrite:"+_ip+":"+Math.floor(Date.now()/3600000); const _c=parseInt(await env.PARTY.get(_k)||"0",10)||0; if(_c>=90) return json({error:"Zu viele Aktionen in kurzer Zeit. Bitte sp\u00E4ter."},429,request); await env.PARTY.put(_k,String(_c+1),{expirationTtl:7200}); } }  // W9-3: Stundenfenster im Key \u2014 TTL-Reset je Increment machte das Limit kumulativ statt 90/h
      // Party-Pass: {g:<token>} statt name — Server loest den Vornamen auf (1-Tipp-Zusage).
      let _invite = null;
      const _g = asStr(body.g);
      if (_g && Array.isArray(party.invites)) _invite = party.invites.find(i=>i && i.t===_g) || null;
      if (_g && !_invite) return json({error:"Einladungslink ungültig"},400, request);
      const name = _invite ? _invite.n : (asStr(body.name)).trim().slice(0,50);
      if (!name) return json({error:"Name fehlt"},400, request);
      if (!Array.isArray(party.guests)) party.guests = []; // L7: Legacy-Party ohne guests-Feld nicht crashen
      // Bewusst (Gate-G6): Token-Gaeste prallen NIE am Cap ab — theoretisches Max = invites (<=30) + Walk-ins (<=30).
      if (!_invite && party.guests.length>=MAX_GUESTS && !party.guests.find(g=>g && String(g.name||"").toLowerCase()===name.toLowerCase()))
        return json({error:"Maximale Gästezahl erreicht"},400, request);
      // Gate-K3: null = explizites Loeschsignal (Art.-16-Berichtigung), "" = nicht angegeben -> Merge erbt
      const _delAllergies = body.allergies===null, _delPickupPerson = body.pickupPerson===null, _delPickupTime = body.pickupTime===null;
      // Gate-K4: Schrott-Status nicht zur Zusage (inkl. Adress-Reveal) defaulten
      if (!["ja","nein","vielleicht"].includes(body.status)) return json({error:"Ungültiger Status"},400, request);
      const guest = {
        name, status: body.status,
        allergies:(asStr(body.allergies)).slice(0,200), pickupTime:(asStr(body.pickupTime)).slice(0,10),
        pickupPerson:(asStr(body.pickupPerson)).slice(0,50), respondedAt:new Date().toISOString()
      };
      if (_invite) guest.inv = _invite.t;   // Zuordnung Zusage <-> persoenliche Einladung (Editor-Anzeige)
      // Gate-G1: Invite-Zusagen sind token-gebunden. Match-Vorrang: eigener Token, dann Name (nur token-lose Eintraege).
      // Walk-ins duerfen Invite-Eintraege NIE ueberschreiben (gleicher Vorname = Normalfall in einer Klasse).
      let existing = -1;
      if (_invite) {
        existing = party.guests.findIndex(g=>g && g.inv===_invite.t);
        // I1: Adoption NUR fuer verwaiste Token-Eintraege (Einladung entfernt + neu angelegt).
        // Echte Walk-ins gleichen Namens bleiben eigener Eintrag — lieber ein sichtbares Duplikat
        // im Editor als eine still geschluckte Zusage eines anderen Kindes.
        if (existing<0) existing = party.guests.findIndex(g=>g && g.inv && !party.invites.find(iv=>iv && iv.t===g.inv) && String(g.name||"").toLowerCase()===name.toLowerCase());
        // I2: fail-safe-Merge bei JEDEM Invite-Match — Zweitgeraet (leere Felder, kein localStorage)
        // darf die Allergie vom Erstgeraet nicht loeschen; leer eingehende Felder erben den Bestand.
        if (existing>=0) { const _old=party.guests[existing];
          if(!guest.allergies && _old.allergies) guest.allergies=_old.allergies;
          if(!guest.pickupPerson && _old.pickupPerson) guest.pickupPerson=_old.pickupPerson;
          if(!guest.pickupTime && _old.pickupTime) guest.pickupTime=_old.pickupTime;
        }
      } else {
        existing = party.guests.findIndex(g=>g && String(g.name||"").toLowerCase()===name.toLowerCase());
        if (existing>=0 && party.guests[existing].inv && Array.isArray(party.invites) && party.invites.find(iv=>iv && iv.t===party.guests[existing].inv))
          return json({error:`Der Name "${name}" ist schon vergeben — häng z. B. einen Buchstaben an ("${name} K.").`},400, request);
        // Gate-K7: stilles Ueberschreiben verhindern — ohne Bestaetigung 409, der Client fragt nach
        if (existing>=0 && !body.confirmUpdate)
          return json({error:`Für "${name}" wurde schon geantwortet.`, exists:true},409, request);  // W8-8: prevStatus entfernt — war ein Status-Orakel fuer Namensrater (Public-GET stript guests bewusst).
          // W10-8 AKZEPTIERT: das verbleibende Existenz-Ja/Nein pro Name ist designbedingt am Kollisionsschutz
          // (Namens-Vertrauensmodell wie RSVP selbst, 90/h gedrosselt) — bewusst so gelassen.
        // Gate-J3: derselbe fail-safe-Merge wie im Invite-Zweig — Zweitgeraet-Antwortaenderung
        // eines Walk-ins darf Allergie-/Abholangaben nicht leer ueberschreiben.
        if (existing>=0) { const _old=party.guests[existing];
          if(!guest.allergies && _old.allergies) guest.allergies=_old.allergies;
          if(!guest.pickupPerson && _old.pickupPerson) guest.pickupPerson=_old.pickupPerson;
          if(!guest.pickupTime && _old.pickupTime) guest.pickupTime=_old.pickupTime;
        }
      }
      if (_delAllergies) guest.allergies = "";
      if (_delPickupPerson) guest.pickupPerson = "";
      if (_delPickupTime) guest.pickupTime = "";
      if (existing>=0) party.guests[existing]=guest; else party.guests.push(guest);
      if (!party.date) await refreshPhotoTtl(env, id, party, calcTTL(party.date));  // L8
      await env.PARTY.put(`party:${id}`,JSON.stringify(party),{expirationTtl:calcTTL(party.date)});
      // Adress-Gating: Adresse NUR an Zusager ("ja") ausliefern. addressIcs = server-escaped fuer Kalender-LOCATION (kein fragiles Client-Escaping).
      const _revealAddr = (guest.status==="ja" && party.address) ? String(party.address) : "";
      return json({ok:true,guestCount:party.guests.filter(g=>g.status==="ja").length, address:_revealAddr, addressIcs: _revealAddr ? icsEscape(_revealAddr) : ""}, 200, request);
    }

    // POST /api/party/:id/wish/:wid/claim
    if (path.match(/^\/api\/party\/[a-z0-9]+\/wish\/[a-z0-9]+\/claim$/) && request.method === "POST") {
      const parts = path.split("/");
      const id=parts[3], wishId=parts[5];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404, request);
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const body = await safeReqJson(request); if (!body) return json({error:"Ungültige Anfrage"}, 400, request);
      // Abuse-Drossel (anonymer Schreib-Endpoint): IP-Counter gemeinsam mit rsvp, 90/h gegen Flood/KV-Bloat (W8-11: Schul-WLAN/CGNAT).
      { const _ip=request.headers.get("cf-connecting-ip")||""; if(_ip){ const _k="rl:guestwrite:"+_ip+":"+Math.floor(Date.now()/3600000); const _c=parseInt(await env.PARTY.get(_k)||"0",10)||0; if(_c>=90) return json({error:"Zu viele Aktionen in kurzer Zeit. Bitte sp\u00E4ter."},429,request); await env.PARTY.put(_k,String(_c+1),{expirationTtl:7200}); } }  // W9-3: Stundenfenster im Key \u2014 TTL-Reset je Increment machte das Limit kumulativ statt 90/h
      const guestName = (asStr(body.name)).trim().slice(0,50); // F4: Laengen-Limit gegen KV-Bloat/XSS-Payload
      if (!guestName) return json({error:"Name fehlt"},400, request);
      // amount nur bei sharedGift relevant; 0 < amount < 9999
      let amount = null;
      if (body.amount !== undefined && body.amount !== null && body.amount !== "") {
        const a = parseFloat(String(body.amount).replace(",","."));
        if (!isNaN(a) && a > 0 && a < 9999) amount = Math.round(a*100)/100;
      }
      const wish = (party.wishes||[]).find(w=>w.id===wishId);
      if (!wish) return json({error:"Wunsch nicht gefunden"},404, request);
      if (!Array.isArray(wish.claimedBy)) wish.claimedBy = [];  // W9-14: Vor-claimedBy-Altbestand warf sonst TypeError -> 500 (PUT heilt erst beim naechsten Editor-Save)
      // Helfer: aus gemischtem Array (Strings + Objects) nur Namen extrahieren
      const getName = (entry) => typeof entry === "string" ? entry : (entry && entry.name) || "";
      if (!wish.sharedGift && wish.claimedBy.length>0 && !wish.claimedBy.find(n=>getName(n).toLowerCase()===guestName.toLowerCase()))
        return json({error:"Bereits vergeben"},400, request);
      const idx = wish.claimedBy.findIndex(n=>getName(n).toLowerCase()===guestName.toLowerCase());
      // W10-2: claimedBy NIE in claim-Responses — der Public-GET stript Schenker-Namen/Betraege bewusst,
      // ein POST mit remove:true (No-op) haette sie sonst pro Wunsch abfragbar gemacht (Response-Orakel).
      const _wishPub = () => ({claimedCount: wish.claimedBy.length, claimedAmountTotal: wish.claimedBy.reduce((s,e)=>s+(typeof e==="object"&&e&&typeof e.amount==="number"?e.amount:0),0)});
      if (idx>=0) {
        // K2/L2: explizites remove = Storno; Betrag = Aenderung; leerer Betrag bei shared laesst den Eintrag stehen
        // (der Prompt verspricht "nur Name" — ein stiller Storno waere das Gegenteil der Eingabe).
        if (body.remove === true) { wish.claimedBy.splice(idx,1); }
        else if (wish.sharedGift && amount !== null) { wish.claimedBy[idx] = {name:guestName, amount}; }
        else if (wish.sharedGift) { return json({ok:true, unchanged:true, ..._wishPub()}, 200, request); }
        // W8-6: non-shared Re-Claim ohne remove-Flag war ein destruktiver Toggle — jeder mit Namens-Treffer
        // konnte fremde Reservierungen abraeumen. Storno jetzt NUR mit explizitem remove:true (Client sendet es).
        else { return json({ok:true, unchanged:true, ..._wishPub()}, 200, request); }
      } else {
        // W8-6b: Storno-Intent auf nicht (mehr) vorhandenen Eintrag darf nicht als Neu-Claim durchrutschen (stale localStorage).
        if (body.remove === true) return json({ok:true, unchanged:true, ..._wishPub()}, 200, request);
        // F4: Anzahl-Cap gegen KV-Value-Bloat (anonym beschreibbarer Endpoint)
        if (wish.claimedBy.length >= 100) return json({error:"Liste voll"},400, request);
        // sharedGift + amount → Object, sonst String wie bisher
        if (wish.sharedGift && amount !== null) wish.claimedBy.push({name:guestName, amount});
        else wish.claimedBy.push(guestName);
      }
      if (!party.date) await refreshPhotoTtl(env, id, party, calcTTL(party.date));  // W9-2: fehlte hier als einzigem party:-Schreibpfad (W8-5-Luecke)
      await env.PARTY.put(`party:${id}`,JSON.stringify(party),{expirationTtl:calcTTL(party.date)});
      return json({ok:true, ..._wishPub()}, 200, request);
    }

    // GET /api/photo/:id
    if (path.match(/^\/api\/photo\/[a-z0-9]+$/) && request.method === "GET") {
      const id = path.split("/")[3];
      const photo = await env.PARTY.get(`photo:${id}`);
      if (!photo) return json({error:"Kein Foto"},404, request);
      return json({photo}, 200, request);
    }

    // GET /api/photoRound/:id — GESTRICHEN (Review 2026-07-12): las photoRound:<id>, einen Key den
    // CREATE nie schreibt; repo-weit 0 Aufrufer. Spielfoto-Auslieferung laeuft ueber /api/invimg/:id.

    // POST /api/invphoto — Einladungs-Foto server-seitig in KV speichern (statt base64-in-URL).
    // Loest das 6KB-URL-Limit: Editor laedt das Foto hoch -> kurze ID -> Link /e/<slug>?fid=<id>.
    // F2 (Wizard-Gate 13.07.): Produkt-Warteliste (Plan-PDF / Komplettpaket). Nur E-Mail + Produkt,
    // KV-TTL 12 Monate (DSGVO-Absatz in datenschutz.html), einmalige Start-Info, kein Newsletter.
    if (path === "/api/waitlist" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const email = (asStr(body.email)).trim().slice(0, 120);
      const product = ["pdf", "print", "magiclink"].includes(body.product) ? body.product : "pdf";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({error:"Bitte gueltige E-Mail angeben"}, 400, request);
      const _ip = request.headers.get("cf-connecting-ip") || "";
      if (_ip) {
        const _rlKey = "rl:wl:" + _ip + ":" + Math.floor(Date.now()/3600000);  // W10-4: Stundenfenster im Key
        const _cnt = parseInt(await env.PARTY.get(_rlKey) || "0", 10) || 0;
        if (_cnt >= 5) return json({error:"Zu viele Eintr\u00E4ge in kurzer Zeit. Bitte sp\u00E4ter nochmal."}, 429, request);
        await env.PARTY.put(_rlKey, String(_cnt + 1), {expirationTtl: 7200});
      }
      await env.PARTY.put("wl:" + Date.now().toString(36) + generateId(6),
        JSON.stringify({email, product, created: new Date().toISOString()}),
        {expirationTtl: 365 * 24 * 60 * 60});
      return json({ok: true}, 200, request);
    }

    // DELETE /api/invphoto/:id — Art.-17-Loeschpfad fuers /e/-Produkt (L1); Token stammt aus der Upload-Response
    if (path.match(/^\/api\/invphoto\/[a-z0-9]+$/) && request.method === "DELETE") {
      const id = path.split("/")[3];
      const body = await safeReqJson(request); if (!body) return json({error:"Ungültige Anfrage"},400, request);
      const tok = await env.PARTY.get(`extimgtok:${id}`);
      if (!tok || asStr(body.deleteToken) !== tok) return json({error:"Nicht berechtigt"},403, request);
      await env.PARTY.delete(`extimg:${id}`);
      await env.PARTY.delete(`extimgtok:${id}`);
      return json({ok:true}, 200, request);
    }

    if (path === "/api/invphoto" && request.method === "POST") {
      const origin = request.headers.get("Origin") || "";
      if (!origin || !/^https:\/\/(www\.|party\.)?machsleicht\.de$/.test(origin)) return json({error:"Nicht autorisiert"},403, request);
      // Abuse-Drossel: anonymer Schreib-Endpoint, 30/h pro IP gegen Flood/KV-Bloat.
      { const _ip=request.headers.get("cf-connecting-ip")||""; if(_ip){ const _k="rl:invphoto:"+_ip+":"+Math.floor(Date.now()/3600000); const _c=parseInt(await env.PARTY.get(_k)||"0",10)||0; if(_c>=30) return json({error:"Zu viele Aktionen in kurzer Zeit. Bitte sp\u00E4ter."},429,request); await env.PARTY.put(_k,String(_c+1),{expirationTtl:7200}); } }  // W9-3: gleiche Fixed-Window-Korrektur wie rl:guestwrite
      const body = await safeReqJson(request); if(!body) return json({error:"Ungueltige Anfrage"},400,request);
      const photo = typeof body.photo === "string" ? body.photo : "";
      if (!photo || photo.length > MAX_PHOTO_BYTES) return json({error:"Foto fehlt oder zu gross"},400,request);
      // Nur reines base64 (kein data:-Prefix, keine Steuerzeichen) -> kein Payload-Injection beim Image-Serve.
      if (!/^[A-Za-z0-9+/]+={0,2}$/.test(photo)) return json({error:"Ungueltiges Bildformat"},400,request);
      // Nur echte JPEGs: base64 von FF D8 FF (JPEG-SOI) beginnt immer mit "/9j/". Verhindert,
      // dass der offene Endpoint als Hoster fuer beliebige Dateitypen unter unserer Domain missbraucht wird.
      if (!photo.startsWith("/9j/")) return json({error:"Nur JPEG erlaubt"},400,request);
      // base64 muss dekodierbar sein (len % 4 != 1), sonst wirft atob beim Serve -> 500.
      if (photo.replace(/=+$/,"").length % 4 === 1) return json({error:"Ungueltiges Bildformat"},400,request);
      const id = generateId(10);
      const deleteToken = generateToken();
      await env.PARTY.put(`extimg:${id}`, photo, {expirationTtl: 7776000}); // K14: eigener Namespace fuers /e/-Produkt (90 Tage) — invphoto: gehoert der Partyseite (14-Tage-Versprechen)
      await env.PARTY.put(`extimgtok:${id}`, deleteToken, {expirationTtl: 7776000}); // L1: Art.-17-Loeschpfad
      return json({id, deleteToken}, 200, request);
    }

    // GET /api/invimg/:id — rohes Einladungs-Bild (image/jpeg), oeffentlich (Gaeste sehen es im Spiel via <img src>).
    if (path.match(/^\/api\/invimg\/[a-z0-9]+$/) && request.method === "GET") {
      const id = path.split("/")[3];
      let b64 = await env.PARTY.get(`invphoto:${id}`);
      if (!b64) b64 = await env.PARTY.get(`extimg:${id}`);  // K14: neue Standalone-IDs; invphoto: bleibt fuer Party-Spielfotos + Altbestand
      if (!b64) return new Response("Not found", {status:404});
      let bytes;
      try { bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0)); }
      catch(e) { return new Response("Not found", {status:404}); } // korruptes/altes KV-Item -> kein 500
      return new Response(bytes, {status:200, headers:{
        "Content-Type": "image/jpeg",
        "X-Content-Type-Options": "nosniff", // kein MIME-Sniffing -> Bytes werden nie als HTML/Script interpretiert
        "Cache-Control": "public, max-age=3600", // Review-MAJOR 2026-07-12 (ChatGPT): 1 Jahr immutable war mit Loeschung/Austausch von KINDERFOTOS unvereinbar — 3600 s = 1 h Nachlauf (W8-9: Kommentar an den echten Wert angeglichen)
        "Access-Control-Allow-Origin": "*"
      }});
    }

    // GET /api/ogimg/:id — Hero-Foto als rohes Bild fuer die WhatsApp/OG-Link-Vorschau (og:image braucht
    // eine Bild-URL, /api/photo liefert JSON). Nur ausgeliefert wenn ein Foto existiert; Format aus dem
    // dataURL-Prefix. Kurzer Cache (Foto ist per Edit aenderbar -> nicht immutable wie invimg).
    if (path.match(/^\/api\/ogimg\/[a-z0-9]+$/) && request.method === "GET") {
      const id = path.split("/")[3];
      const ph = await env.PARTY.get(`photo:${id}`);
      if (!ph) return new Response("Not found", {status:404});
      const m = ph.match(/^data:image\/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=]+)$/);
      if (!m) return new Response("Not found", {status:404});
      let bytes;
      try { bytes = Uint8Array.from(atob(m[2]), c => c.charCodeAt(0)); }
      catch(e) { return new Response("Not found", {status:404}); }
      return new Response(bytes, {status:200, headers:{
        "Content-Type": "image/" + (m[1]==="jpg" ? "jpeg" : m[1]),
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*"
      }});
    }

    // POST /api/party/:id/send-edit-link
    if (path.match(/^\/api\/party\/[a-z0-9]+\/send-edit-link$/) && request.method === "POST") {
      // Origin-Check (CORS-Hardening): nur von machsleicht.de/party.machsleicht.de.
      // W11-1: der Origin-Header ist per curl trivial setzbar — er stoppt nur Browser-CSRF, KEINE
      // Server-to-Server-Calls (frueherer Kommentar behauptete das faelschlich). Der echte Schutz
      // gegen Mail-Bombing/Resend-Reputationsschaden sind die beiden rl:editmail-Drosseln unten.
      const origin = request.headers.get("Origin") || "";
      if (!origin || !/^https:\/\/(www\.|party\.)?machsleicht\.de$/.test(origin)) {
        return json({error:"Nicht autorisiert"},403, request);
      }
      // W11-1/W12-1: Mail-Drossel — IP-Bucket VOR der Auth (Enumeration-Schutz), das Party-Tagesbudget
      // erst NACH bestandener Token-Auth (sonst konnte ein Anonymer mit falschem Token + rotierenden IPs
      // die 10/Tag verbrennen und den echten Host von seinem einzigen Zugangsweg aussperren).
      { const _ip = request.headers.get("cf-connecting-ip") || "";
        if (_ip) { const _k = "rl:editmail:" + _ip + ":" + Math.floor(Date.now()/3600000);
          const _c = parseInt(await env.PARTY.get(_k) || "0", 10) || 0;
          if (_c >= 8) return json({error:"Zu viele Mail-Anfragen in kurzer Zeit. Bitte später nochmal."}, 429, request);
          await env.PARTY.put(_k, String(_c + 1), {expirationTtl: 7200}); } }

      const id = path.split("/")[3];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404, request);
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const body = await safeReqJson(request); if (!body) return json({error:"Ungültige Anfrage"}, 400, request);
      // Legacy-Token-Guard (konsistent mit PUT/DELETE): tokenloser Alt-Eintrag -> undefined!==undefined=false waere Auth-Bypass (Mail-Spam-Vektor).
      if (!party.editToken || body.editToken !== party.editToken) return json({error:"Nicht berechtigt"},403, request);
      const email = (asStr(body.email)).trim().slice(0,200);
      // P0-Security Welle 1E: Control-Chars (NUL, CR, LF, Tab) in Email blocken \u2014 Resend-Header-Injection-Risk.
      if (/[\x00-\x1F\x7F]/.test(email)) return json({error:"Ung\u00FCltige E-Mail"},400, request);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({error:"Ung\u00FCltige E-Mail"},400, request);
      // W12-1/W13-1: Party-Tagesbudget erst NACH Auth + Email-Validierung \u2014 nur echte, versandbereite Sends verbrauchen eins der 10.
      { const _kp = "rl:editmail:party:" + id + ":" + Math.floor(Date.now()/86400000);
        const _cp = parseInt(await env.PARTY.get(_kp) || "0", 10) || 0;
        if (_cp >= 10) return json({error:"F\u00FCr diese Party wurden heute schon viele Mails angefragt. Bitte morgen nochmal."}, 429, request);
        await env.PARTY.put(_kp, String(_cp + 1), {expirationTtl: 172800}); }
      const newsletterOptIn = body.newsletterOptIn === true;

      // Save email to party
      party.email = email;
      if (!party.date) await refreshPhotoTtl(env, id, party, calcTTL(party.date));  // W8-5: datumslose Party — Foto-Keys mit auf die frische 30d-TTL heben
      await env.PARTY.put(`party:${id}`, JSON.stringify(party), {expirationTtl: calcTTL(party.date)});

      // Send email via Resend
      if (!env.RESEND_API_KEY) return json({error:"E-Mail-Versand nicht konfiguriert"},500, request);
      const childName = party.childName || "Kind";
      const editUrl = `https://party.machsleicht.de/${id}?edit=${party.editToken}`;
      const guestUrl = `https://party.machsleicht.de/${id}`;

      // ── DOI-Token für Newsletter (falls Opt-In): Token vor Mailrendering erzeugen,
      //    damit der Bestätigungs-Button direkt in der Edit-Link-Mail landet.
      let confirmUrl = "";
      if (newsletterOptIn) {
        // P0-Security Welle 1C: Verwaisten alten doiToken zuerst löschen (Race-Condition-Schutz).
        // Sonst akkumulieren bei wiederholten send-edit-link-Calls verwaiste doi-Einträge im KV,
        // die nicht mehr über die party referenziert sind.
        if (party.doiToken) {
          await env.PARTY.delete(`doi:${party.doiToken}`);
        }
        const doiToken = generateToken();
        const ip = request.headers.get("cf-connecting-ip") || "";
        const ua = (request.headers.get("user-agent") || "").slice(0,200);
        const doiEntry = {
          email,
          created: new Date().toISOString(),
          ip,
          ua,
          origin,
          source: "partyseite-creator"
        };
        // P0-DSGVO: doiToken in party tracken für späteren Lösch-Cleanup
        party.doiToken = doiToken;
        await env.PARTY.put(`party:${id}`, JSON.stringify(party), {expirationTtl: calcTTL(party.date)});
        await env.PARTY.put(`doi:${doiToken}`, JSON.stringify(doiEntry), {expirationTtl: 7*24*60*60});
        confirmUrl = `https://party.machsleicht.de/api/newsletter-confirm?token=${doiToken}`;
      }

      // Newsletter-Block nur wenn Opt-In: outlined-Button als sekundäre CTA-Hierarchie.
      const newsletterBlock = newsletterOptIn ? `
        <hr style="border:none;border-top:1px solid #eee;margin:28px 0 20px">
        <h2 style="font-size:17px;color:#2D2319;margin:0 0 8px">\u{1F4EC} Newsletter best\u00E4tigen</h2>
        <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 4px">Du hast angekreuzt, dass du Tipps f\u00FCr den Kindergeburtstag und eine Erinnerung 7 Tage vor der Party bekommen m\u00F6chtest. Damit wir dir schreiben d\u00FCrfen, best\u00E4tige bitte kurz:</p>
        <a href="${confirmUrl}" style="display:block;background:#fff;color:#D4812A;text-align:center;padding:13px 24px;border:2px solid #D4812A;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;margin:14px 0 8px;box-sizing:border-box">\u2713 E-Mail-Adresse best\u00E4tigen</a>
        <p style="color:#aaa;font-size:11px;line-height:1.5;margin:10px 0 0">Der Link ist 7 Tage g\u00FCltig. Kein Klick = keine Speicherung, kein Newsletter.</p>
      ` : "";

      const emailHtml = `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
        <p style="color:#8B7D6B;font-size:14px"><strong style="color:#D4812A">mach's</strong> leicht</p>
        <h1 style="font-size:20px;color:#2D2319;margin:16px 0 8px">Dein Edit-Link f\u00FCr ${poss(esc(childName))} Partyseite</h1>
        <p style="color:#555;font-size:14px;line-height:1.6">Mit diesem Link kannst du Zusagen einsehen, die Seite bearbeiten und die Wunschliste verwalten. <strong>Speichere diese E-Mail!</strong></p>
        <a href="${editUrl}" style="display:block;background:#D4812A;color:#fff;text-align:center;padding:14px 24px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;margin:20px 0">\u{1F511} Partyseite bearbeiten</a>
        <p style="color:#888;font-size:13px;margin-top:20px"><strong>G\u00E4ste-Link zum Teilen:</strong><br><a href="${guestUrl}" style="color:#D4812A">${guestUrl}</a></p>
        ${newsletterBlock}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
        <p style="color:#aaa;font-size:11px">Diese E-Mail wurde von <a href="https://machsleicht.de" style="color:#aaa">machsleicht.de</a> gesendet, weil du eine Partyseite erstellt hast.</p>
      </div>`;

      let doiSent = false;
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {"Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json"},
          body: JSON.stringify({
            from: env.RESEND_FROM || "mach's leicht <kontakt@machsleicht.de>",
            reply_to: env.RESEND_REPLY_TO || "kontakt@machsleicht.de",
            to: [email],
            subject: `Dein Edit-Link: ${poss(childName).replace(/[\x00-\x1F\x7F]/g," ")} Partyseite`,  // W13-3: Steuerzeichen im childName raus (Resend-Subject-Header-Injektion, gleiche Klasse wie P0-Welle-1E)
            html: emailHtml
          })
        });
        if (!res.ok) {
          const err = await res.text();
          return json({error:"E-Mail konnte nicht gesendet werden"},500, request);
        }
        // Mail erfolgreich raus — Newsletter-Bestätigungs-Button ist drin, falls Opt-In.
        if (newsletterOptIn) doiSent = true;
      } catch(e) {
        return json({error:"E-Mail-Versand fehlgeschlagen"},500, request);
      }

      return json({ok:true, doiMailSent:doiSent}, 200, request);
    }

    // Affiliate Redirect /go/:partyId/:wishId
    if (path.match(/^\/go\/[a-z0-9]+\/[a-z0-9]+$/) && request.method === "GET") {
      const parts = path.split("/");
      const partyId=parts[2], wishId=parts[3];
      const raw = await env.PARTY.get(`party:${partyId}`);
      if (!raw) return Response.redirect("https://machsleicht.de",302);
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const wish = (party.wishes||[]).find(w=>w.id===wishId);
      if (!wish||!wish.url) return Response.redirect("https://machsleicht.de",302);
      // P0-Security: Defense-in-Depth — auch beim Redirect nochmal Protokoll prüfen,
      // falls alter KV-State noch unsanitierte URLs enthält
      if (!isSafeUrl(wish.url)) return Response.redirect("https://machsleicht.de",302);
      // P1-Security: Open-Redirect-Mitigation. Unbekannte Wunsch-Domain -> zurück zur Partyseite
      // (Schutz gegen Phishing-Vektor: boese Partyseite mit fremdem Link-Target).
      if (!isAllowedWishDomain(wish.url)) {
        return Response.redirect(`https://party.machsleicht.de/${partyId}`, 302);
      }
      return Response.redirect(affiliateUrl(wish.url,env),302);
    }

    // ═══════════════════════════════════════════════════════════════
    // P1-15 Email-Capture: Newsletter-DOI-Confirm
    // (Opt-In selbst erfolgt am Partyseite-Creator über /api/party/:id/send-edit-link
    //  mit newsletterOptIn=true, welcher diese DOI-Mail auslöst.)
    // ═══════════════════════════════════════════════════════════════

    // GET /api/newsletter-confirm?token=<token>
    // Validiert DOI-Token, fügt Email in Resend-Audience ein, zeigt Erfolgsseite.
    if (path === "/api/newsletter-confirm" && request.method === "GET") {
      const token = url.searchParams.get("token") || "";
      if (!/^[a-f0-9]{48}$/.test(token)) {
        return new Response(doiPage("error","Ungültiger Bestätigungslink."), {status:400, headers:{"Content-Type":"text/html;charset=utf-8"}});
      }
      const raw = await env.PARTY.get(`doi:${token}`);
      if (!raw) {
        return new Response(doiPage("error","Dieser Bestätigungslink ist abgelaufen oder wurde bereits verwendet."), {status:410, headers:{"Content-Type":"text/html;charset=utf-8"}});
      }
      let entry;
      try { entry = JSON.parse(raw); } catch { entry = null; }
      if (!entry || !entry.email) {
        await env.PARTY.delete(`doi:${token}`);
        return new Response(doiPage("error","Bestätigung fehlgeschlagen."), {status:500, headers:{"Content-Type":"text/html;charset=utf-8"}});
      }

      // Add Contact zu Resend-Audience (falls konfiguriert)
      if (env.RESEND_AUDIENCE_ID && env.RESEND_API_KEY) {
        try {
          const resp = await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
            method: "POST",
            headers: {"Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json"},
            body: JSON.stringify({email: entry.email, unsubscribed: false})
          });
          // 200/201 = ok, 409 = schon vorhanden → auch ok
          // P0-DSGVO Welle 1C: Status loggen, aber NICHT resp.text() (kann Email enthalten,
          // CF-Worker-Logs sind 7 Tage retained — vermeidet PII-Leak in Logs).
          if (!resp.ok && resp.status !== 409) {
            console.log("Resend audience add error status:", resp.status);
          }
        } catch(e) {
          console.log("Resend audience add exception:", e.message);
        }
      }

      // ── Audit-Trail: dauerhafter Consent-Nachweis für DSGVO-Beweispflicht.
      // Key: consent:<sha256(email)>. Enthält: Opt-In-Kontext + Confirm-Kontext.
      // Kein TTL (muss 3 Jahre nachweisbar sein — Resend-Audience speichert Email selbst).
      try {
        const emailHashBuf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(entry.email.toLowerCase()));
        const emailHash = Array.from(new Uint8Array(emailHashBuf)).map(b=>b.toString(16).padStart(2,"0")).join("");
        const consentRecord = {
          email: entry.email,
          optInAt: entry.created,        // Timestamp Checkbox-Klick
          optInIp: entry.ip || "",       // IP beim Opt-In
          optInUa: entry.ua || "",
          optInOrigin: entry.origin || "",
          optInSource: entry.source || "",
          confirmedAt: new Date().toISOString(),
          confirmedIp: request.headers.get("cf-connecting-ip") || "",
          confirmedUa: (request.headers.get("user-agent") || "").slice(0,200)
        };
        // P0-DSGVO Welle 1E: 3-Jahres-TTL für Consent-Audit (Art-7-Nachweispflicht erfüllt,
        // aber NICHT ewig — Art-17 Recht-auf-Löschung soll nach 3 Jahren greifen).
        await env.PARTY.put(`consent:${emailHash}`, JSON.stringify(consentRecord), {expirationTtl: 3*365*24*60*60});
      } catch(e) {
        console.log("Consent audit-trail write error:", e.message);
      }

      // Token verbrauchen (Replay-Schutz)
      await env.PARTY.delete(`doi:${token}`);
      return new Response(doiPage("success","Deine E-Mail-Adresse ist bestätigt. Du bekommst nichts Uninteressantes — nur Tipps zum Kindergeburtstag und eine Erinnerung 7 Tage vorher. Abbestellen jederzeit per Link in jeder Mail."), {headers:{"Content-Type":"text/html;charset=utf-8"}});
    }

    // Frontend: Home
    if (path==="/"||path==="") return new Response(creatorPage(),{headers:{"Content-Type":"text/html;charset=utf-8"}});

    // Frontend: Party
    // FONTS (self-hosted, H3/DSGVO: kein Google-Kontakt von Gastseiten; SIL-OFL-Fonts aus KV)
    { const _fm = path.match(/^\/fonts\/(baloo2|dmsans|fraunces)\.woff2$/);
      if (_fm && request.method === "GET") {
        const buf = await env.PARTY.get("font:"+_fm[1], {type:"arrayBuffer"});
        if (!buf) return new Response("", {status:404});
        return new Response(buf, {headers:{"Content-Type":"font/woff2","Cache-Control":"public, max-age=31536000, immutable","Access-Control-Allow-Origin":"*"}});
      } }

    if (path.match(/^\/[a-z0-9]{6,12}$/)) {
      const id = path.slice(1);
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return new Response(notFoundPage(),{status:404,headers:{"Content-Type":"text/html;charset=utf-8"}});
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const isEditor = url.searchParams.get("edit")===party.editToken;
      const isPreview = isEditor && url.searchParams.get("preview")==="1";
      // Party-Pass: ?g=<token> personalisiert die Gastansicht. Unbekannter Token -> normale Seite (kein Leak).
      const _gTok = url.searchParams.get("g") || "";
      const invite = (!isEditor && _gTok && Array.isArray(party.invites)) ? (party.invites.find(i=>i && i.t===_gTok) || null) : null;
      // #29-Fix: Spiel-Foto als kurze /api/invimg-URL ausliefern (nicht base64-in-URL -> sonst 414).
      // Die Gast-App nimmt einen http(s)-foto-Param direkt als <img src>. hasGamePhoto vermeidet einen KV-Read.
      let gamePhotoUrl = "";
      if ((!isEditor || isPreview) && party.hasGamePhoto) {
        gamePhotoUrl = `https://party.machsleicht.de/api/invimg/${id}`;
      }
      // frame-ancestors 'self' (Review 2026-07-12): Partyseite war von ueberall framebar; 'self' deckt das eigene Vorschau-/Editor-Modal (same-origin)
      return new Response(partyPage(party,isEditor,gamePhotoUrl,isPreview,invite),{headers:{"Content-Type":"text/html;charset=utf-8","Content-Security-Policy":"frame-ancestors 'self'","Cache-Control":"no-store"}});  // W9-7: Editor-/Gastseite (Gaesteliste, Allergien, Token-URL) nie im BFCache geteilter Geraete
    }

    return new Response("Not found",{status:404});
   } catch (e) {
     // #30c: jeder unbehandelte Throw (z.B. Type-Confusion bei falschem Feld-Typ via Direkt-API) -> sauberer CORS-Fehler statt CF-1101 ohne CORS-Header.
     return json({error:"Serverfehler — bitte Eingaben pruefen"}, 500, request);
   }
  }
};

// ═══════════════════════════════════════════════════════════════
// SPIEL-KATALOG (2026-07-12): welche Einladungsspiele je Motto waehlbar sind.
// path ist Source-of-Truth (Dateiname/Serve-Ort hinter gameId abstrahiert -> Zero-Diff-Promotion).
// status:"go" = im Creator sichtbar + servebar. Kill-Switch: status aendern -> Galerie blendet aus,
// Serve faellt fuer bereits gespeicherte gameIds sauber auf den Legacy-Default je Motto zurueck.
// fam: "legacy" = 200KB-Einzeldatei unter /einladung/<motto>/whatsapp/ (React-inline),
//      "core"   = schlanker ~23KB-Skin der Aufdecken-&-Fangen-Familie unter /spiele/ (Shared-Engine core.js).
// ═══════════════════════════════════════════════════════════════
// Individuelle Spiele je Motto (Bolle 13.07.: volle Auswahl statt nur Klassiker+Schatzjagd).
// wappen-ritter + puzzle-dschungel am 11.07. entparkt (Zahlen-Kacheln, GO/88 + GO/86) -> alle 15 Mottos volle 5 Optionen.
const IND_GAMES = {"piraten":["kanone","flaschenpost","memory"],"dino":["ei","faehrte","fossil"],"safari":["fotosafari","jeep","spuren"],"weltraum":["funk","rakete","sternbild"],"detektiv":["akte","fingerabdruck","wimmel"],"superheld":["signal","stadt","strahl"],"prinzessin":["tatort","tresor","uvschrift"],"einhorn":["regenbogen","sternenstaub","turm"],"meerjungfrau":["korallen","perlen","schatz"],"feuerwehr":["drehleiter","loeschen","notruf"],"baustelle":["bagger","hochhaus","rohre"],"dschungel":["lianen","wildnis","puzzle"],"feen":["gluehwuermchen","laterne","taunetz"],"pferde":["huerden","hufeisen","striegeln"],"ritter":["katapult","schwert","wappen"]};
const GAME_CATALOG = (() => {
  const c = {};
  for (const m of ["piraten","dino","safari","weltraum","detektiv","superheld","prinzessin","einhorn","meerjungfrau","feuerwehr","baustelle","dschungel","feen","pferde","ritter"]) c[m] = [
    {id:`${m}-klassik`,    fam:"legacy", path:`/einladung/${m}/whatsapp/`,        status:"go"},
    ...(IND_GAMES[m]||[]).map(s => ({id:`${s}-${m}`, fam:"core", path:`/spiele/game-${s}-${m}.html`, status:"go"})),
    {id:`${m}-schatzjagd`, fam:"core",   path:`/spiele/game-schatzjagd-${m}.html`, status:"go"},
  ];
  return c;
})();
// Kachel-Metadaten je gameId (Name/Sub/Emoji) — Subs stammen aus den Spiel-Intros selbst.
const GAME_META = {"piraten-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"kanone-piraten":{"t":"Kanonen-Schuss","s":"Die Schatzkarte ist hinter dicken Brettern vernagelt!","e":"💣"},"flaschenpost-piraten":{"t":"Flaschenpost","s":"In der Flasche steckt eine geheime Nachricht.","e":"🍾"},"memory-piraten":{"t":"Schatz-Memory","s":"Hinter den Schatzkarten versteckt sich jemand.","e":"🗺"},"piraten-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"dino-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"ei-dino":{"t":"Dino-Ei","s":"Tippe immer wieder aufs Ei, um es zu wärmen.","e":"🥚"},"faehrte-dino":{"t":"Dino-Fährte","s":"Riesige Fußspuren führen quer durchs Urwald-Tal.","e":"🐾"},"fossil-dino":{"t":"Fossil-Ausgrabung","s":"Etwas Uraltes liegt unter dem Sand — versteinert seit Urzeiten.","e":"🦴"},"dino-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"safari-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"fotosafari-safari":{"t":"Foto-Safari","s":"Die Tiere zeigen sich nur kurz.","e":"📸"},"jeep-safari":{"t":"Jeep-Safari","s":"Steuere mit den Pfeilen nach links und rechts.","e":"🚙"},"spuren-safari":{"t":"Spuren-Pfad","s":"Folge den Pfotenspuren durch die Savanne — welches Tier war hier unterwegs?","e":"🐾"},"safari-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"weltraum-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"funk-weltraum":{"t":"Alien-Funkspruch","s":"Vom fernen Planeten funkt jemand eine Signalfolge — die Zeichen leuchten und piepen.","e":"📡"},"rakete-weltraum":{"t":"Raketen-Schub","s":"Drücke ZÜNDEN, um Schub aufzubauen.","e":"🚀"},"sternbild-weltraum":{"t":"Sternbild","s":"Merk dir die Sterne und tippe sie in der richtigen Reihenfolge — ein Sternbild entsteht.","e":"🌌"},"weltraum-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"detektiv-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"akte-detektiv":{"t":"Akte-Quiz","s":"Drei kniffige Detektiv-Fragen versperren die Akte.","e":"🗂"},"fingerabdruck-detektiv":{"t":"Fingerabdruck","s":"Auf dem Beweisfoto klebt noch Spurenpuder — und darauf liegt der geheime Fingerabdruck.","e":"🔍"},"wimmel-detektiv":{"t":"Tatort-Suche","s":"Im Detektivbüro herrscht Chaos.","e":"🕵"},"detektiv-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"superheld-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"signal-superheld":{"t":"Helden-Signal","s":"Schalte das Helden-Signal — Stück für Stück leuchtet es über der Stadt auf.","e":"🔦"},"stadt-superheld":{"t":"Stadt retten","s":"Vom Hochhaus fallen Sachen herunter!","e":"🏙"},"strahl-superheld":{"t":"Helden-Strahl","s":"Drei Meteore fliegen auf die Stadt zu.","e":"⚡"},"superheld-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"prinzessin-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"tatort-prinzessin":{"t":"Kronjuwelen-Tatort","s":"Die Kronjuwelen sind weg! Sichere die Spuren am Tatort und überführe den Dieb.","e":"💎"},"tresor-prinzessin":{"t":"Tresor-Code","s":"Im königlichen Tresor steckt der Beweis.","e":"🔐"},"uvschrift-prinzessin":{"t":"UV-Geheimschrift","s":"Fahre mit der UV-Lampe übers Pergament und mach die Geheimschrift sichtbar.","e":"🪄"},"prinzessin-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"einhorn-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"regenbogen-einhorn":{"t":"Regenbogen-Brücke","s":"Baue die Regenbogen-Brücke Farbe für Farbe — dann traut sich das Einhorn hinüber.","e":"🌈"},"sternenstaub-einhorn":{"t":"Sternenstaub","s":"Über der Wolken-Wiese schweben funkelnde Sternenstaub-Funken.","e":"✨"},"turm-einhorn":{"t":"Wolken-Turm","s":"Eine Wolke schwebt hin und her — aber Achtung: der Zauberwind schiebt sie mal schneller, mal langsamer!","e":"☁️"},"einhorn-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"meerjungfrau-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"korallen-meerjungfrau":{"t":"Korallen-Slalom","s":"Steuere die Meerjungfrau mit den Pfeilen nach links und rechts.","e":"🐠"},"perlen-meerjungfrau":{"t":"Perlen sortieren","s":"Jede Perle gehört in die Muschel mit dem gleichen Zeichen.","e":"🐚"},"schatz-meerjungfrau":{"t":"Schatz auftauchen","s":"Tief unten im Meer liegt etwas Glänzendes.","e":"🧜"},"meerjungfrau-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"feuerwehr-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"drehleiter-feuerwehr":{"t":"Drehleiter","s":"Die Leiter schwingt hin und her.","e":"🚒"},"loeschen-feuerwehr":{"t":"Feuer löschen","s":"Rubbel die Flammen weg, bevor sie wieder aufflackern — Einsatz für die Feuerwehr!","e":"🧯"},"notruf-feuerwehr":{"t":"Feuerwehr-Funkcode","s":"Die Wache hat einen geheimen Funk-Code.","e":"🚨"},"feuerwehr-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"baustelle-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"bagger-baustelle":{"t":"Bagger-Fahrt","s":"Steuere mit den Pfeilen nach links und rechts.","e":"🚜"},"hochhaus-baustelle":{"t":"Hochhaus stapeln","s":"Der Kran schwenkt eine Etage hin und her.","e":"🏗"},"rohre-baustelle":{"t":"Rohre verbinden","s":"Drehe die Rohre, bis das Wasser durchfließen kann.","e":"🔧"},"baustelle-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"dschungel-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"lianen-dschungel":{"t":"Lianen-Schwung","s":"Schwing von Liane zu Liane — tippe im richtigen Moment für den nächsten Schwung.","e":"🐒"},"wildnis-dschungel":{"t":"Wildnis-Wimmelbild","s":"Fünf bunte Papageien verstecken sich im Dickicht — spür alle auf, dann lichtet sich der Dschungel.","e":"🌿"},"dschungel-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"feen-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"gluehwuermchen-feen":{"t":"Glühwürmchen-Melodie","s":"Spiel die Glühwürmchen-Melodie nach — Ton für Ton wird der Feenwald heller.","e":"🌟"},"laterne-feen":{"t":"Wunsch-Laterne","s":"Im Feenhimmel schweben leuchtende Glühwürmchen.","e":"🏮"},"taunetz-feen":{"t":"Tau-Netz","s":"Auf dem Spinnennetz glitzern Tautropfen.","e":"🕸"},"feen-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"pferde-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"huerden-pferde":{"t":"Hürden-Springen","s":"Tippe im richtigen Moment zum Absprung — Hürde für Hürde bis ins Ziel.","e":"🏇"},"hufeisen-pferde":{"t":"Hufeisen-Wurf","s":"Tippe WERFEN, wenn der Zeiger im grünen Bereich steht — aber Achtung: der Wind verschiebt den Bereich nach jedem Wurf!","e":"🐴"},"striegeln-pferde":{"t":"Pony striegeln","s":"Das Pony hat sich im Schlamm gewälzt und ist ganz staubig.","e":"🧽"},"pferde-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"ritter-klassik":{"t":"Der Klassiker","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","e":"✨"},"katapult-ritter":{"t":"Burg-Katapult","s":"Lade das Katapult und feuere im richtigen Moment — triff den grünen Bereich, dann fliegt der Stein genau aufs Burgtor.","e":"🏰"},"schwert-ritter":{"t":"Schwert schmieden","s":"Hämmere auf die Klinge.","e":"⚔️"},"ritter-schatzjagd":{"t":"Die Schatzjagd","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","e":"🪙"},"wappen-ritter":{"t":"Wappen-Puzzle","s":"Die Wappen-Steine sind durcheinander — jeder trägt eine Zahl.","e":"🛡"},"puzzle-dschungel":{"t":"Dschungel-Puzzle","s":"Die Zahlen-Kacheln sind durcheinander.","e":"🧩"}};
function gameById(gid){ if(!gid) return null; for (const m in GAME_CATALOG){ const g = GAME_CATALOG[m].find(x => x.id===gid && x.status==="go"); if(g) return g; } return null; }

// ═══════════════════════════════════════════════════════════════
// PARTY-PASS (Phase 1, 2026-07-14): persoenliche Gast-Missionen.
// Jeder eingeladene Gast bekommt einen Token-Link (?g=<token>) — der Klarname
// steht NIE in der URL (Links werden in WhatsApp-Gruppen weitergeleitet).
// Rollen sind kuratiert je Motto; Zusagen fliessen ins bestehende guests-Array,
// damit Zaehlung/Allergien/Adress-Gating unveraendert funktionieren.
// ═══════════════════════════════════════════════════════════════
const ROLE_CATALOG = {
  piraten:[{id:"ausguck",n:"Ausguck",m:"Halte die Augen offen — du entdeckst versteckte Hinweise zuerst!"},{id:"kompass",n:"Kompass-Profi",m:"Du sagst der Crew, wo es langgeht."},{id:"schatzwaechter",n:"Schatzwächter",m:"Pass auf, dass der Schatz nicht noch einmal verschwindet."},{id:"flagge",n:"Flaggen-Meister",m:"Du hisst die Flagge und gibst das Startsignal."},{id:"kanonier",n:"Kanonier",m:"Bei den Spielen gibst du das laute Startsignal."}],
  dino:[{id:"spurenleser",n:"Spurenleser",m:"Finde die versteckten Dino-Spuren."},{id:"vulkanforscher",n:"Vulkanforscher",m:"Behalte den Vulkan im Auge — wenn er brodelt, gib Alarm!"},{id:"eierwaechter",n:"Eierwächter",m:"Beschütze das Dino-Ei, bis es schlüpft."},{id:"kartenexperte",n:"Karten-Experte",m:"Du liest die Expeditionskarte und führst das Team."},{id:"dinoretter",n:"Dino-Retter",m:"Wenn ein Dino Hilfe braucht, bist du zur Stelle."}],
  safari:[{id:"faehrtensucher",n:"Fährtensucher",m:"Folge den Tierspuren durch die Savanne."},{id:"fernglas",n:"Fernglas-Profi",m:"Du entdeckst die Tiere zuerst — melde jede Sichtung!"},{id:"tierfotograf",n:"Tier-Fotograf",m:"Halte die besten Momente der Expedition fest."},{id:"proviant",n:"Proviant-Chef",m:"Ohne dich verhungert die Expedition — du bewachst die Snacks."},{id:"navigator",n:"Jeep-Navigator",m:"Du liest die Karte und sagst, wo es langgeht."}],
  weltraum:[{id:"funker",n:"Funker",m:"Du hältst Kontakt zur Bodenstation — wiederhole jeden Funkspruch!"},{id:"navigator",n:"Navigator",m:"Du berechnest den Kurs durchs Sternenmeer."},{id:"treibstoff",n:"Treibstoff-Chef",m:"Behalte die Tankanzeige im Blick."},{id:"sternenkundler",n:"Sternen-Kundler",m:"Du kennst alle Sternbilder — zeig sie der Crew."},{id:"countdown",n:"Countdown-Chef",m:"Du zählst beim Start laut von 10 runter."}],
  detektiv:[{id:"spurensicherer",n:"Spurensicherer",m:"Sichere jede Spur, bevor sie verwischt."},{id:"beobachter",n:"Meister-Beobachter",m:"Dir entgeht kein Detail — merk dir alles Verdächtige."},{id:"aktenwart",n:"Akten-Wart",m:"Du verwaltest die geheimen Fallakten."},{id:"tarnexperte",n:"Tarn-Experte",m:"Niemand bemerkt dich, wenn du ermittelst."},{id:"codeknacker",n:"Code-Knacker",m:"Kein Geheimcode ist vor dir sicher."}],
  superheld:[{id:"signalgeber",n:"Signal-Geber",m:"Wenn die Stadt Hilfe braucht, schaltest du das Helden-Signal."},{id:"stadtwaechter",n:"Stadt-Wächter",m:"Du behältst die Stadt von oben im Blick."},{id:"tempoheld",n:"Tempo-Held",m:"Du bist der Schnellste im Team — bei Eilaufträgen läufst du."},{id:"schutzschild",n:"Schutzschild",m:"Du beschützt das Team, wenn es brenzlig wird."},{id:"funkzentrale",n:"Funk-Zentrale",m:"Du koordinierst alle Helden-Einsätze."}],
  prinzessin:[{id:"kronenwaechter",n:"Kronen-Wächter",m:"Bewache die Kronjuwelen mit Adleraugen."},{id:"zeremonienmeister",n:"Zeremonien-Meister",m:"Du eröffnest das königliche Fest."},{id:"schlossbote",n:"Schloss-Bote",m:"Du überbringst die wichtigen Nachrichten des Hofes."},{id:"tafelchef",n:"Tafel-Chef",m:"Du sorgst dafür, dass die Festtafel perfekt ist."},{id:"gartenhueter",n:"Garten-Hüter",m:"Der Schlossgarten steht unter deinem Schutz."}],
  einhorn:[{id:"regenbogenhueter",n:"Regenbogen-Hüter",m:"Pass auf, dass der Regenbogen nicht verblasst."},{id:"sternenstaub",n:"Sternenstaub-Sammler",m:"Sammle den Sternenstaub für den großen Zauber."},{id:"wolkenspringer",n:"Wolken-Springer",m:"Du testest, welche Wolken tragen — Vorsicht, weich!"},{id:"glitzerwaechter",n:"Glitzer-Wächter",m:"Der Glitzervorrat ist bei dir sicher."},{id:"zauberhelfer",n:"Zauber-Helfer",m:"Beim großen Zauber gibst du das Kommando."}],
  meerjungfrau:[{id:"perlentaucher",n:"Perlen-Taucher",m:"Tauche nach den verlorenen Perlen."},{id:"muschelsammler",n:"Muschel-Sammler",m:"Sammle die schönsten Muscheln des Ozeans."},{id:"stroemungsscout",n:"Strömungs-Scout",m:"Du kennst die Meeresströmungen — führe das Team sicher."},{id:"korallenwaechter",n:"Korallen-Wächter",m:"Das Korallenriff steht unter deinem Schutz."},{id:"leuchtturmwart",n:"Leuchtturm-Wart",m:"Dein Licht zeigt allen den Weg nach Hause."}],
  feuerwehr:[{id:"schlauchchef",n:"Schlauch-Chef",m:"Du rollst den Schlauch aus — Wasser marsch!"},{id:"leiterprofi",n:"Leiter-Profi",m:"Du sicherst die Drehleiter bei jedem Einsatz."},{id:"funker",n:"Einsatz-Funker",m:"Du gibst die Einsatzbefehle über Funk durch."},{id:"wassermarsch",n:"Wassermarsch-Rufer",m:"Auf dein Kommando wird gelöscht!"},{id:"retter",n:"Retter",m:"Wenn jemand Hilfe braucht, bist du zuerst da."}],
  baustelle:[{id:"kranfuehrer",n:"Kran-Führer",m:"Du hebst die schwersten Teile an die richtige Stelle."},{id:"planleser",n:"Plan-Leser",m:"Nur du verstehst den geheimen Bauplan."},{id:"schraubenchef",n:"Schrauben-Chef",m:"Ohne deine Schrauben hält hier gar nichts."},{id:"warnwestenwart",n:"Warnwesten-Wart",m:"Du achtest darauf, dass alle sicher sind."},{id:"richtfest",n:"Richtfest-Rufer",m:"Wenn alles steht, rufst du das Richtfest aus!"}],
  dschungel:[{id:"lianenschwinger",n:"Lianen-Schwinger",m:"Du schwingst voraus und erkundest den Weg."},{id:"pfadfinder",n:"Pfad-Finder",m:"Du findest den Weg durchs dichteste Dickicht."},{id:"tierstimmen",n:"Tierstimmen-Kenner",m:"Du erkennst jedes Tier am Geräusch."},{id:"wasserfallscout",n:"Wasserfall-Scout",m:"Du entdeckst die versteckten Wasserfälle."},{id:"campwaechter",n:"Camp-Wächter",m:"Das Basislager ist bei dir in sicheren Händen."}],
  feen:[{id:"gluehwuermchen",n:"Glühwürmchen-Hüter",m:"Deine Glühwürmchen leuchten den Weg."},{id:"bluetenstaub",n:"Blütenstaub-Sammler",m:"Sammle den Zauberstaub von den Blüten."},{id:"wunschbote",n:"Wunsch-Bote",m:"Du bringst die Wünsche sicher zur Feenkönigin."},{id:"mondlicht",n:"Mondlicht-Wächter",m:"Wenn es dunkel wird, hütest du das Mondlicht."},{id:"zaubertrank",n:"Zaubertrank-Mischer",m:"Nur du kennst das geheime Rezept."}],
  pferde:[{id:"hufeisen",n:"Hufeisen-Glücksbringer",m:"Dein Hufeisen bringt dem ganzen Team Glück."},{id:"striegelprofi",n:"Striegel-Profi",m:"Die Ponys glänzen nur dank dir."},{id:"parcourschef",n:"Parcours-Chef",m:"Du baust den Parcours auf und gibst das Startsignal."},{id:"futtermeister",n:"Futter-Meister",m:"Möhren und Heu sind bei dir in besten Händen."},{id:"stallwaechter",n:"Stall-Wächter",m:"Im Stall geht nichts ohne dein Okay."}],
  ritter:[{id:"bannertraeger",n:"Banner-Träger",m:"Du trägst das Banner beim großen Einzug voran."},{id:"burgtorwaechter",n:"Burgtor-Wächter",m:"Nur wer das Losungswort kennt, kommt an dir vorbei."},{id:"katapultmeister",n:"Katapult-Meister",m:"Du spannst das Katapult für den großen Schuss."},{id:"knappenchef",n:"Knappen-Chef",m:"Du hilfst allen Rittern in die Rüstung."},{id:"drachenspaeher",n:"Drachen-Späher",m:"Du hältst Ausschau — wenn der Drache kommt, warnst du alle!"}]
};
const ROLE_DEFAULT = [{id:"ehrengast",n:"Ehrengast",m:"Du gehörst zum engsten Party-Team!"},{id:"spielescout",n:"Spiele-Scout",m:"Du probierst jedes Spiel als Erstes aus."},{id:"stimmungsmacher",n:"Stimmungs-Macher",m:"Mit dir wird es garantiert nicht langweilig."},{id:"deckungshelfer",n:"Überraschungs-Helfer",m:"Du hilfst bei der großen Überraschung mit."},{id:"jubelchef",n:"Jubel-Chef",m:"Beim Finale jubelst du am lautesten."}];
const PASS_TITLES = {piraten:"PIRATEN-CREW-PASS",dino:"DINO-FORSCHERPASS",safari:"SAFARI-EXPEDITIONSPASS",weltraum:"SPACE-CREW-PASS",detektiv:"DETEKTIV-AUSWEIS",superheld:"HELDEN-LIZENZ",prinzessin:"SCHLOSS-PASS",einhorn:"REGENBOGEN-PASS",meerjungfrau:"MEERES-PASS",feuerwehr:"EINSATZ-AUSWEIS",baustelle:"BAUSTELLEN-AUSWEIS",dschungel:"EXPEDITIONS-PASS",feen:"FEENZAUBER-PASS",pferde:"REITERHOF-PASS",ritter:"RITTER-PASS"};
function rolesFor(mottoId){ return ROLE_CATALOG[mottoId] || ROLE_DEFAULT; }
function passTitleFor(mottoId){ return PASS_TITLES[mottoId] || "PARTY-PASS"; }
// makeInvites: akzeptiert Strings ODER {n, role}. Token-ERHALT fuer bestehende Namen (sonst
// invalidiert jedes Editor-Speichern alle bereits verschickten Gast-Links!). Rollen round-robin.
function makeInvites(wanted, mottoId, existing){
  const roles = rolesFor(mottoId);
  const out = [];
  (Array.isArray(wanted)?wanted:[]).slice(0,MAX_GUESTS).forEach((w,idx)=>{
    const name = (asStr(typeof w==="string" ? w : (w&&w.n))).trim().slice(0,30);
    if(!name) return;
    if(out.find(o=>o.n.toLowerCase()===name.toLowerCase())) return; // Duplikate still verwerfen
    const wantRole = asStr(typeof w==="string" ? "" : (w&&w.role));
    const prev = (Array.isArray(existing)?existing:[]).find(e=>e && e.n && String(e.n).toLowerCase()===name.toLowerCase());
    const role = roles.find(r=>r.id===wantRole) ? wantRole
      : (prev && roles.find(r=>r.id===prev.role)) ? prev.role
      : roles[idx % roles.length].id;
    out.push({ t: (prev && /^[a-z0-9]{10,24}$/.test(String(prev.t||""))) ? prev.t : generateId(16), n: name, role, stamps: (prev && Array.isArray(prev.stamps)) ? prev.stamps : [] });  // 16 Z. ~2^79 (OWASP-Floor); Erhalt-Regex ab 10 (Alt-Token-Generation), Obergrenze 24 (Gate-G3/I4/J8)
  });
  return out;
}

// ═══════════════════════════════════════════════════════════════
// HTML TEMPLATES
// ═══════════════════════════════════════════════════════════════
function baseHead(title, description, color = "#D4812A", ogUrl = "", noTrack = false) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${esc(title)}</title>
${description?`<meta name="description" content="${esc(description)}">`:""}
<meta property="og:title" content="${esc(title)}">
${description?`<meta property="og:description" content="${esc(description)}">`:""}
<meta property="og:type" content="website">
${ogUrl?`<meta property="og:url" content="${esc(ogUrl)}">`:""}
<meta property="og:locale" content="de_DE">
<meta property="og:image" content="https://machsleicht.de/og-home.png">
<meta property="og:site_name" content="mach'sleicht">
<meta name="referrer" content="strict-origin-when-cross-origin">
<style>@font-face{font-family:'Fraunces';font-style:normal;font-weight:100 900;font-display:swap;src:url(/fonts/fraunces.woff2) format('woff2')}@font-face{font-family:'DM Sans';font-style:normal;font-weight:100 1000;font-display:swap;src:url(/fonts/dmsans.woff2) format('woff2')}</style>
<link rel="icon" href="https://machsleicht.de/favicon.ico">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--a:${color};--al:${color}18;--bg:#FFFCF7;--card:#fff;--d:#2D2319;--m:#8B7D6B;--l:#EDE6DE;--f:'DM Sans',system-ui,sans-serif;--fd:'Fraunces','Georgia',serif;--r:16px}
body{font-family:var(--f);color:var(--d);background:var(--bg);min-height:100dvh;-webkit-font-smoothing:antialiased}
.container{max-width:480px;margin:0 auto;padding:16px}
h1,h2,h3{font-family:var(--fd)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:12px 24px;background:var(--a);color:#fff;border:none;border-radius:var(--r);font:600 15px var(--f);cursor:pointer;transition:all .2s;width:100%;text-decoration:none}
.btn:active{transform:scale(.97)}
.btn-outline{background:transparent;border:2px solid var(--a);color:var(--a)}
.btn-sm{padding:8px 16px;font-size:13px;width:auto}
.motto-chip{padding:8px 14px;border-radius:99px;border:2px solid var(--l);background:var(--card);cursor:pointer;font:500 13px var(--f);color:var(--d);transition:all .2s;white-space:nowrap}
.motto-chip:hover{border-color:var(--a);background:var(--al)}
.motto-chip.active{border-color:var(--a);background:var(--a);color:#fff}
.card{background:var(--card);border-radius:20px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.04);border:1px solid var(--l);margin-top:12px}
input,textarea{width:100%;padding:10px 14px;border:2px solid var(--l);border-radius:12px;font:400 15px var(--f);color:var(--d);background:#FAFAF5;outline:none;transition:border .2s}
input:focus,textarea:focus{border-color:var(--a)}
input[type=date],input[type=time]{-webkit-appearance:none;appearance:none;min-width:0;max-width:100%;display:block;min-height:44px;line-height:1.3}
.req{color:#E53935;margin-left:3px;text-transform:none}
.has-error input,.has-error textarea{border-color:#E53935 !important;background:#FFEBEE}
.err-msg{color:#E53935;font-size:11px;margin-top:4px;font-weight:600;text-transform:none;letter-spacing:0}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.78);z-index:9999;display:none;padding:16px;animation:fadeIn .2s ease-out}
.modal-overlay.show{display:flex;align-items:stretch;justify-content:center}
.modal-panel{background:#fff;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;flex:1;max-width:520px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,0.35)}
.modal-bar{background:#fff;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #eee;flex-shrink:0}
.modal-bar-title{font:600 14px var(--f);color:var(--d)}
.modal-close{background:none;border:none;font-size:26px;color:var(--m);cursor:pointer;line-height:1;padding:2px 10px;border-radius:8px}
.modal-close:hover{background:#f5f5f5;color:var(--d)}
.modal-iframe-wrap{flex:1;overflow:auto;-webkit-overflow-scrolling:touch;background:#fff;min-height:0}
.modal-iframe{width:100%;height:100%;border:none;background:#fff;display:block}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
body.modal-open{overflow:hidden}
label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:4px}
.field{margin-bottom:14px}
.logo{font-family:var(--fd);font-size:20px;color:var(--d);text-align:center;padding:12px 0}
.logo a{color:inherit;text-decoration:none}.logo b{color:var(--a)}
.rsvp-btn{padding:14px;border-radius:14px;border:2px solid var(--l);background:var(--card);cursor:pointer;font:600 15px var(--f);color:var(--d);transition:all .2s;text-align:center}
.rsvp-btn.active{border-color:var(--a);background:var(--al)}
.rsvp-btn:active{transform:scale(.97)}
.badge{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:100px;font-size:12px;font-weight:600}
.success{background:#E8F5E9;color:#2E7D32}
.game-pick{position:relative;flex:1;min-width:140px;border:2px solid var(--l);border-radius:14px;background:var(--card);padding:12px;text-align:center;cursor:pointer;transition:all .2s}
.game-pick.active{border-color:var(--a);background:var(--al)}
.game-pick button{border:1px solid var(--l);background:#fff;border-radius:10px;padding:6px 12px;font:600 12px var(--f);color:var(--d);cursor:pointer}
.game-pick button:active{transform:scale(.95)}
.game-pick-check{display:none;font-size:11px;font-weight:700;color:var(--a);margin-top:6px}
.game-pick.active .game-pick-check{display:block}
.share-box{background:var(--al);border:2px dashed var(--a);border-radius:var(--r);padding:16px;text-align:center}
.wish-item{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--l)}
.wish-item:last-child{border-bottom:none}
.wish-claim{padding:6px 14px;border-radius:10px;border:2px solid var(--a);background:transparent;color:var(--a);font:600 12px var(--f);cursor:pointer;white-space:nowrap;transition:all .2s}
.wish-claim.taken{background:var(--l);color:var(--m);border-color:var(--l);cursor:default}
.toggle{display:flex;align-items:center;gap:10px;margin-bottom:10px;cursor:pointer}
.toggle input[type=checkbox]{width:18px;height:18px;accent-color:var(--a)}
.hero-photo{width:100%;max-height:360px;object-fit:cover;border-radius:16px;margin-bottom:12px}
.info-row{display:flex;gap:10px;align-items:flex-start;margin-bottom:10px}
.info-row .icon{font-size:20px;flex-shrink:0;width:28px;text-align:center}
.footer{text-align:center;padding:20px 0;font-size:11px;color:var(--m)}
.footer a{color:var(--m);text-decoration:none}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes cFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}
.fade-up{animation:fadeUp .4s ease both}
#gameFrame{height:min(85vh,700px)}
.hidden{display:none!important}
</style>
${noTrack ? "" : '<script defer src="https://cloud.umami.is/script.js" data-website-id="72b5eb12-dfde-4333-9bc7-0c2880864df2" data-exclude-search="true"></script>'}
<script>window.plausible=function(name,opts){if(window.umami){try{umami.track(name,(opts&&opts.props)||{})}catch(e){}}};window.plausible.init=function(){};window.plausible.q=[];</script>
</head>`;
}

// ═══════════════════════════════════════════════════════════════
// ERSTELLER-SEITE
// ═══════════════════════════════════════════════════════════════
function creatorPage() {
  return `${baseHead("WhatsApp-Partyseite erstellen \u2014 mach\u2019s leicht","Partyseite für den Kindergeburtstag: Spiel-Einladung, Zusagen live, Wunschliste. Kostenlos, per WhatsApp teilen.","#D4812A","https://party.machsleicht.de")}
<body>
<div class="container">
  <div class="logo"><a href="https://machsleicht.de"><b>mach's</b> leicht</a></div>
  <div style="text-align:center;margin:16px 0 24px">
    <div style="font-size:40px;margin-bottom:8px">\u{1F4F1}</div>
    <h1 style="font-size:22px;margin-bottom:4px">Deine WhatsApp-Partyseite</h1>
    <p style="color:var(--m);font-size:14px">Spiel-Einladung, Zusagen live, Wunschliste \u2014 alles auf einer Seite.</p>
  </div>

  <div class="card fade-up" id="step1">
    <h2 style="font-size:16px;margin-bottom:14px">1. Das Geburtstagskind</h2>
    <div class="field"><label>Vorname<span class="req">*</span></label><input type="text" id="childName" placeholder="z.B. Emma" maxlength="50"></div>
    <div class="field"><label>Wird wie alt?<span class="req">*</span></label><input type="number" id="age" min="1" max="18" placeholder="z.B. 6"></div>
    <div class="field"><label>Motto (optional)</label>
      <div id="mottoChips" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">
        <button type="button" class="motto-chip" data-mid="piraten" onclick="pickMotto(this,'Piraten','\u{1F3F4}\u{200D}\u{2620}\u{FE0F}','piraten')">\u{1F3F4}\u{200D}\u{2620}\u{FE0F} Piraten</button>
        <button type="button" class="motto-chip" data-mid="dino" onclick="pickMotto(this,'Dino','\u{1F995}','dino')">\u{1F995} Dino</button>
        <button type="button" class="motto-chip" data-mid="safari" onclick="pickMotto(this,'Safari','\u{1F981}','safari')">\u{1F981} Safari</button>
        <button type="button" class="motto-chip" data-mid="weltraum" onclick="pickMotto(this,'Weltraum','\u{1F680}','weltraum')">\u{1F680} Weltraum</button>
        <button type="button" class="motto-chip" data-mid="detektiv" onclick="pickMotto(this,'Detektiv','\u{1F50D}','detektiv')">\u{1F50D} Detektiv</button>
        <button type="button" class="motto-chip" data-mid="superheld" onclick="pickMotto(this,'Superheld','\u{1F9B8}','superheld')">\u{1F9B8} Superheld</button>
        <button type="button" class="motto-chip" data-mid="prinzessin" onclick="pickMotto(this,'Prinzessin','\u{1F478}','prinzessin')">\u{1F478} Prinzessin</button>
        <button type="button" class="motto-chip" data-mid="einhorn" onclick="pickMotto(this,'Einhorn','\u{1F984}','einhorn')">\u{1F984} Einhorn</button>
        <button type="button" class="motto-chip" data-mid="meerjungfrau" onclick="pickMotto(this,'Meerjungfrau','\u{1F9DC}\u{200D}\u{2640}\u{FE0F}','meerjungfrau')">\u{1F9DC}\u{200D}\u{2640}\u{FE0F} Meerjungfrau</button>
        <button type="button" class="motto-chip" data-mid="feuerwehr" onclick="pickMotto(this,'Feuerwehr','\u{1F692}','feuerwehr')">\u{1F692} Feuerwehr</button>
        <button type="button" class="motto-chip" data-mid="baustelle" onclick="pickMotto(this,'Baustelle','\u{1F3D7}\u{FE0F}','baustelle')">\u{1F3D7}\u{FE0F} Baustelle</button>
        <button type="button" class="motto-chip" data-mid="dschungel" onclick="pickMotto(this,'Dschungel','\u{1F334}','dschungel')">\u{1F334} Dschungel</button>
        <button type="button" class="motto-chip" data-mid="feen" onclick="pickMotto(this,'Feen','\u{1F9DA}','feen')">\u{1F9DA} Feen</button>
        <button type="button" class="motto-chip" data-mid="pferde" onclick="pickMotto(this,'Pferde','\u{1F434}','pferde')">\u{1F434} Pferde</button>
        <button type="button" class="motto-chip" data-mid="ritter" onclick="pickMotto(this,'Ritter','\u{1F3F0}','ritter')">\u{1F3F0} Ritter</button>
        <button type="button" class="motto-chip" id="customMottoBtn" onclick="toggleCustomMotto()">\u{270F}\u{FE0F} Eigenes...</button>
      </div>
      <div id="customMottoRow" style="display:none;gap:8px">
        <input type="text" id="mottoEmojiCustom" style="width:56px;text-align:center;font-size:22px" placeholder="\u{1F389}" maxlength="8" oninput="clearChipSelection()">
        <input type="text" id="mottoCustom" placeholder="z.B. Ritter-Party" style="flex:1" maxlength="60" oninput="clearChipSelection()">
      </div>
      <input type="hidden" id="mottoEmoji" value="">
      <input type="hidden" id="motto" value="">
      <input type="hidden" id="mottoId" value="">
      <input type="hidden" id="gameId" value="">
      <p id="mottoGameHint" class="hidden" style="font-size:11px;color:#4CAF50;margin-top:6px;font-weight:600">\u{1F3AE} Inkl. interaktivem Einladungsspiel f\u00FCr die G\u00E4ste!</p>
      <div id="gameGallery" class="hidden" style="margin-top:10px"></div>
    </div>
    <div class="field"><label>Foto (optional, max 500KB)</label>
      <p style="font-size:11px;color:#1E7B34;margin:0 0 8px">🔒 Du kannst Foto &amp; Daten jederzeit über deinen Edit-Link löschen — spätestens 14 Tage nach der Party wird alles automatisch gelöscht.</p>
      <input type="file" id="photoInput" accept="image/*" style="font-size:13px;display:none">
      <div id="uploadZone" onclick="document.getElementById('photoInput').click()" style="border:2px dashed var(--l);border-radius:12px;padding:20px;text-align:center;cursor:pointer;transition:all .2s;background:var(--bg)">
        <div style="font-size:28px;margin-bottom:6px">\u{1F4F7}</div>
        <div style="font-weight:600;font-size:14px;color:var(--d);margin-bottom:2px">Foto hochladen</div>
        <div style="font-size:12px;color:var(--m)">Klick oder ziehen</div>
      </div>
      <div id="cropUI" class="hidden" style="margin-top:12px">
        <div style="background:var(--card);border:1px solid var(--l);border-radius:12px;padding:14px;margin-bottom:12px">
          <div style="font-weight:600;font-size:13px;color:var(--m);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px">Banner-Ausschnitt</div>
          <div style="font-size:11px;color:var(--m);margin-bottom:8px">So sieht das Foto oben auf deiner Partyseite aus.</div>
          <canvas id="heroCanvas" style="width:100%;max-height:225px;border:1px solid var(--l);border-radius:8px;background:#f5f5f5;cursor:grab;display:block;touch-action:none"></canvas>
          <div style="font-size:11px;color:var(--m);margin-top:6px">Verschieben & zoomen</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
            <button id="heroZoomOut" type="button" style="background:none;border:1px solid var(--l);border-radius:6px;width:28px;height:28px;cursor:pointer;font-size:14px">\u2212</button>
            <div id="heroZoomSlider" style="flex:1;height:28px;cursor:pointer;position:relative;touch-action:none;display:flex;align-items:center">
              <div style="position:absolute;left:0;right:0;height:4px;background:var(--l);border-radius:2px"></div>
              <div id="heroZoomTrack" style="position:absolute;left:0;height:4px;background:var(--a);border-radius:2px"></div>
              <div id="heroZoomThumb" style="position:absolute;width:18px;height:18px;background:#fff;border:2px solid var(--a);border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.2);transform:translateX(-9px);pointer-events:none"></div>
            </div>
            <button id="heroZoomIn" type="button" style="background:none;border:1px solid var(--l);border-radius:6px;width:28px;height:28px;cursor:pointer;font-size:14px">+</button>
          </div>
        </div>
        <div style="background:var(--card);border:1px solid var(--l);border-radius:12px;padding:14px;margin-bottom:12px">
          <div style="font-weight:600;font-size:13px;color:var(--m);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px">Spiel-Ausschnitt</div>
          <div style="font-size:11px;color:var(--m);margin-bottom:8px">Dieses Bild erscheint rund im Einladungsspiel f\u00FCr die G\u00E4ste.</div>
          <div style="text-align:center;padding:12px 0">
            <canvas id="circleCanvas" style="width:120px;height:120px;border:1px solid var(--l);border-radius:50%;background:#f5f5f5;cursor:grab;display:inline-block;touch-action:none"></canvas>
          </div>
          <div style="font-size:11px;color:var(--m);text-align:center;margin-top:6px">Verschieben & zoomen</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
            <button id="circZoomOut" type="button" style="background:none;border:1px solid var(--l);border-radius:6px;width:28px;height:28px;cursor:pointer;font-size:14px">\u2212</button>
            <div id="circZoomSlider" style="flex:1;height:28px;cursor:pointer;position:relative;touch-action:none;display:flex;align-items:center">
              <div style="position:absolute;left:0;right:0;height:4px;background:var(--l);border-radius:2px"></div>
              <div id="circZoomTrack" style="position:absolute;left:0;height:4px;background:var(--a);border-radius:2px"></div>
              <div id="circZoomThumb" style="position:absolute;width:18px;height:18px;background:#fff;border:2px solid var(--a);border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.2);transform:translateX(-9px);pointer-events:none"></div>
            </div>
            <button id="circZoomIn" type="button" style="background:none;border:1px solid var(--l);border-radius:6px;width:28px;height:28px;cursor:pointer;font-size:14px">+</button>
          </div>
        </div>
        <div style="display:flex;gap:8px">
          <button type="button" id="changeFoto" onclick="changeFoto()" style="flex:1;background:none;border:1px solid var(--l);border-radius:8px;padding:10px 12px;font-size:12px;color:var(--d);cursor:pointer;font-weight:600">\u{1F4F7} \u00C4ndern</button>
          <button type="button" id="removeFoto" onclick="removeFoto()" style="flex:1;background:none;border:1px solid var(--l);border-radius:8px;padding:10px 12px;font-size:12px;color:var(--m);cursor:pointer;font-weight:600">\u2717 Entfernen</button>
        </div>
      </div>
    </div>
    <button class="btn" onclick="goStep(2)">Weiter \u2192</button>
  </div>

  <div class="card fade-up hidden" id="step2">
    <h2 style="font-size:16px;margin-bottom:14px">2. Wann & Wo</h2>
    <div class="field"><label>Datum<span class="req">*</span></label><input type="date" id="date"></div>
    <div style="display:flex;gap:8px" class="field">
      <div style="flex:1;min-width:0"><label>Start<span class="req">*</span></label><input type="time" id="time"></div>
      <div style="flex:1;min-width:0"><label>Ende ca.</label><input type="time" id="endTime"></div>
    </div>
    <div class="field"><label>Adresse<span class="req">*</span></label><textarea id="address" rows="2" placeholder="Stra\u00DFe, PLZ Ort" maxlength="200"></textarea><p style="font-size:12px;color:#1E7B34;margin:6px 0 0">\u{1F512} Nicht \u00F6ffentlich sichtbar \u2014 erscheint erst, nachdem ein Gast zugesagt hat.</p></div>
    <div class="field"><label>Hinweise f\u00FCr Eltern (optional)</label><textarea id="notes" rows="3" placeholder="z.B. Bitte Matschsachen mitbringen!" maxlength="500"></textarea><p style="font-size:12px;color:#888;margin:6px 0 0">Tipp: Keine Adresse hier eintragen \u2014 dieses Feld ist \u00F6ffentlich. Nutze daf\u00FCr das Adressfeld oben (erst nach Zusage sichtbar).</p></div>
    <div style="margin-bottom:14px">
      <label style="margin-bottom:8px">Was sollen G\u00E4ste angeben?</label>
      <div class="toggle"><input type="checkbox" id="askAllergies" checked><span style="font-size:14px">Allergien / Unvertr\u00E4glichkeiten</span></div>
      <div class="toggle"><input type="checkbox" id="askPickup" checked><span style="font-size:14px">Abholzeit & Abholer</span></div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-outline" onclick="goStep(1)" style="flex:1">\u2190 Zur\u00FCck</button>
      <button class="btn" onclick="goStep(3)" style="flex:1">Weiter \u2192</button>
    </div>
  </div>

  <div class="card fade-up hidden" id="step3">
    <h2 style="font-size:16px;margin-bottom:4px">3. Wunschliste</h2>
    <p style="font-size:13px;color:var(--m);margin-bottom:14px">Verhindert Doppelgeschenke \u2014 G\u00E4ste reservieren direkt.</p>
    <div id="wishList"></div>
    <div style="display:flex;gap:8px;margin-bottom:14px">
      <button class="btn btn-outline btn-sm" onclick="addWish()" style="flex:1">+ Wunsch hinzuf\u00FCgen</button>
      <button class="btn btn-sm" onclick="createParty()" style="flex:1;background:var(--m)" id="skipBtn">\u00DCberspringen</button>
    </div>
    <div class="field" id="paypalField" style="display:none">
      <label>PayPal.me f\u00FCr \u201EGemeinsam schenken\u201C (optional)</label>
      <input type="text" id="paypalMe" placeholder="z.B. paypal.me/EmmaMama" maxlength="100">
      <p style="font-size:11px;color:var(--m);margin-top:4px">\u{1F4B8} G\u00E4ste sehen ihren Anteil + deinen PayPal-Link</p>
    </div>
    <p style="font-size:11px;color:var(--m);text-align:center;margin-bottom:14px">Links zu Shops enthalten ggf. Affiliate-Links. F\u00FCr dich \u00E4ndert sich nichts am Preis.</p>
    <div style="display:flex;gap:8px">
      <button class="btn btn-outline" onclick="goStep(2)" style="flex:1">\u2190 Zur\u00FCck</button>
      <button class="btn" onclick="createParty()" id="createBtn" style="flex:1">\u{1F389} Erstellen</button>
    </div>
  </div>

  <div class="card fade-up hidden" id="result">
    <div style="text-align:center;margin-bottom:16px">
      <div style="font-size:48px;margin-bottom:8px">\u2705</div>
      <h2 style="font-size:20px">Partyseite ist fertig!</h2>
      <p style="color:var(--m);font-size:13px;margin-top:4px">G\u00E4ste geben den Vornamen \u201E<span id="codeHint" style="font-weight:700;color:var(--a)"></span>\u201C ein, um die Seite zu \u00F6ffnen \u2014 die Adresse zeigen wir erst nach der Zusage.</p>
    </div>
    <div style="background:#FFF3E0;border:2px solid #FFE0B2;border-radius:var(--r);padding:16px;margin-bottom:12px">
      <p style="font-size:14px;font-weight:700;color:#E65100;margin-bottom:4px">\u26A0\uFE0F Edit-Link sichern (Pflicht)</p>
      <p style="font-size:13px;color:#BF360C;margin-bottom:12px;line-height:1.5">Ohne diesen Link kannst du <strong>keine Zusagen sehen</strong> und <strong>nichts mehr \u00E4ndern</strong>. Deshalb schicken wir ihn dir jetzt per E-Mail \u2014 erst danach gibt es Bearbeiten & den G\u00E4ste-Link zum Teilen.</p>
      <div class="field" style="margin-bottom:8px"><label>Deine E-Mail<span class="req">*</span></label><input type="email" id="editEmail" placeholder="deine@email.de" style="font-size:15px"></div>
      <label id="newsletterOptInRow" style="display:flex;align-items:flex-start;gap:8px;margin:0 0 12px;cursor:pointer;user-select:none;padding:8px 2px">
        <input type="checkbox" id="newsletterOptIn" style="flex-shrink:0;width:16px;height:16px;margin-top:2px;accent-color:#E65100;cursor:pointer">
        <span style="font-size:12px;color:#5D4037;line-height:1.45">Au\u00DFerdem: Erinnerung 7 Tage vor der Party + kostenlose Tipps per Mail. Jederzeit abbestellbar. <a href="https://machsleicht.de/datenschutz" target="_blank" style="color:#E65100;text-decoration:underline">Datenschutz</a></span>
      </label>
      <button class="btn" onclick="sendEditEmail()" id="sendEditBtn" style="background:#E65100">\u{1F4E7} Edit-Link per E-Mail erhalten</button>
      <p id="editUrl" style="display:none"></p>
      <p id="editEmailSent" class="hidden" style="font-size:12px;color:#2E7D32;text-align:center;margin-top:8px;font-weight:600">\u2705 Gesendet \u2014 pr\u00FCfe dein Postfach!</p>
    </div>
    <button class="btn" id="previewBtn" onclick="openPreview()" style="background:var(--a);margin-bottom:12px">\u{1F440} Vorschau ansehen</button>
    <div id="resultGated" class="hidden">
    <button class="btn btn-outline" id="editBtn" onclick="openEdit()" style="margin-bottom:12px">\u270F\uFE0F Bearbeiten</button>
    <div class="share-box" style="margin-bottom:12px">
      <p style="font-size:12px;color:var(--a);font-weight:600;margin-bottom:6px">G\u00C4STE-LINK</p>
      <p style="font-size:14px;font-weight:700;word-break:break-all" id="guestUrl"></p>
      <button class="btn" style="margin-top:10px" onclick="shareGuest()">\u{1F4F2} Per WhatsApp teilen</button>
    </div>
    </div>
  </div>

  <div class="footer"><a href="https://machsleicht.de">machsleicht.de</a> \u00B7 <a href="https://machsleicht.de/impressum">Impressum</a> \u00B7 <a href="https://machsleicht.de/datenschutz">Datenschutz</a></div>
</div>
<div id="modalOverlay" class="modal-overlay" onclick="closeModalBackdrop(event)">
  <div class="modal-panel">
    <div class="modal-bar">
      <span class="modal-bar-title" id="modalTitle">Vorschau</span>
      <button class="modal-close" onclick="closeModal()" aria-label="Schlie\u00DFen">\u00D7</button>
    </div>
    <div class="modal-iframe-wrap"><iframe id="modalFrame" class="modal-iframe" src="about:blank" title="Vorschau"></iframe></div>
  </div>
</div>
<script>
const API=location.origin+"/api";
let photoData=null,photoRoundData=null,wishes=[];
let _srcCanvas=null;
let _heroX=0,_heroY=0,_heroScale=1,_heroDragging=false,_heroMinScale=0.05,_heroMaxScale=2;
let _circX=0,_circY=0,_circScale=1,_circDragging=false,_circMinScale=0.05,_circMaxScale=2;
function _clearErrors(){document.querySelectorAll(".field.has-error, .has-error").forEach(function(f){f.classList.remove("has-error");var m=f.querySelector(".err-msg");if(m)m.remove();});}
function _showErr(id,msg){
  var el=document.getElementById(id);if(!el)return;
  var field=el.closest(".field")||el.parentElement;
  field.classList.add("has-error");
  if(!field.querySelector(".err-msg")){var p=document.createElement("p");p.className="err-msg";p.textContent=msg;field.appendChild(p);}
  var clear=function(){field.classList.remove("has-error");var m=field.querySelector(".err-msg");if(m)m.remove();el.removeEventListener("input",clear);el.removeEventListener("change",clear);};
  el.addEventListener("input",clear);el.addEventListener("change",clear);
}
function _validate(fields){
  _clearErrors();
  var firstId=null;
  fields.forEach(function(f){var el=document.getElementById(f.id);var v=el?(el.value||"").trim():"";if(!v){_showErr(f.id,f.msg);if(!firstId)firstId=f.id;}});
  if(firstId){setTimeout(function(){var el=document.getElementById(firstId);if(el&&el.scrollIntoView)el.scrollIntoView({behavior:"smooth",block:"center"});},50);return false;}
  return true;
}
function goStep(n){
  var cur=[1,2,3].find(function(i){return !document.getElementById("step"+i).classList.contains("hidden");});
  if(cur===1&&n>=2){if(!_validate([{id:"childName",msg:"Bitte Vornamen eintragen"},{id:"age",msg:"Bitte Alter eintragen"}]))return;}
  if(cur===2&&n>=3){if(!_validate([{id:"date",msg:"Bitte Datum w\u00E4hlen"},{id:"time",msg:"Bitte Start-Uhrzeit eintragen"},{id:"address",msg:"Bitte Adresse eintragen"}]))return;var t=document.getElementById("time").value,et=document.getElementById("endTime").value;if(t&&et&&et<=t){_showErr("endTime","Ende muss nach dem Start liegen");return;}}
  var steps=[1,2,3];steps.forEach(function(i){document.getElementById("step"+i).classList.toggle("hidden",i!==n);});window.scrollTo({top:0,behavior:"smooth"});
}
function changeFoto(){document.getElementById("photoInput").click();}
function removeFoto(){photoData=null;photoRoundData=null;_srcCanvas=null;document.getElementById("photoInput").value='';document.getElementById("uploadZone").classList.remove("hidden");document.getElementById("cropUI").classList.add("hidden");}
document.getElementById("photoInput").addEventListener("change",function(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=function(ev){
    const img=new Image();img.onload=function(){
      const canvas=document.createElement("canvas");const max=1200;
      let w=img.width,h=img.height;if(w>max||h>max){const r=Math.min(max/w,max/h);w*=r;h*=r;}
      canvas.width=w;canvas.height=h;canvas.getContext("2d").drawImage(img,0,0,w,h);
      _srcCanvas=canvas;
      var heroFillW=300/w,heroFillH=225/h;
      var heroInit=Math.max(heroFillW,heroFillH);
      var heroSmall=Math.min(heroFillW,heroFillH);
      _heroScale=heroInit;_heroX=0;_heroY=0;
      _heroMinScale=heroSmall*0.8;_heroMaxScale=heroInit*3;
      var circFillW=120/w,circFillH=120/h;
      var circInit=Math.max(circFillW,circFillH);
      var circSmall=Math.min(circFillW,circFillH);
      _circScale=circInit;_circX=0;_circY=0;
      _circMinScale=circSmall*0.8;_circMaxScale=circInit*3;
      _redrawHero();_redrawCircle();_updateHeroTrack();_updateCircTrack();
      document.getElementById("uploadZone").classList.add("hidden");
      document.getElementById("cropUI").classList.remove("hidden");
    };img.src=ev.target.result;
  };reader.readAsDataURL(file);
});
function _drawCrop(ctx,outW,outH){
  if(!_srcCanvas)return;
  ctx.fillStyle="#f5f5f5";ctx.fillRect(0,0,outW,outH);
  var sw=_srcCanvas.width,sh=_srcCanvas.height;
  var scale=arguments[3],offX=arguments[4],offY=arguments[5];
  var dw=sw*scale,dh=sh*scale;
  var x=(outW-dw)/2+offX;
  var y=(outH-dh)/2+offY;
  ctx.drawImage(_srcCanvas,x,y,dw,dh);
}
function _redrawHero(){
  if(!_srcCanvas)return;
  var c=document.getElementById("heroCanvas");c.width=300;c.height=225;
  _drawCrop(c.getContext("2d"),300,225,_heroScale,_heroX,_heroY);
}
function _redrawCircle(){
  if(!_srcCanvas)return;
  var c=document.getElementById("circleCanvas");c.width=120;c.height=120;
  _drawCrop(c.getContext("2d"),120,120,_circScale,_circX,_circY);
}
function _exportHero(){
  if(!_srcCanvas)return null;
  var c=document.createElement("canvas");c.width=800;c.height=600;
  var ratio=800/300;
  _drawCrop(c.getContext("2d"),800,600,_heroScale*ratio,_heroX*ratio,_heroY*ratio);
  return c.toDataURL("image/jpeg",0.7);
}
function _exportCircle(){
  if(!_srcCanvas)return null;
  var c=document.createElement("canvas");c.width=120;c.height=120;
  _drawCrop(c.getContext("2d"),120,120,_circScale,_circX,_circY);
  return c.toDataURL("image/jpeg",0.4);   // #27: volle data-URL (mit data:-Prefix) wie _exportHero — sonst droppt isSafePhoto das Spielfoto still
}
document.getElementById("heroCanvas").addEventListener("pointerdown",function(e){_heroDragging=true;this.setPointerCapture(e.pointerId);});
document.getElementById("heroCanvas").addEventListener("pointermove",function(e){if(!_heroDragging||!_srcCanvas)return;_heroX+=e.movementX;_heroY+=e.movementY;_redrawHero();});
document.getElementById("heroCanvas").addEventListener("pointerup",function(){_heroDragging=false;});
document.getElementById("circleCanvas").addEventListener("pointerdown",function(e){_circDragging=true;this.setPointerCapture(e.pointerId);});
document.getElementById("circleCanvas").addEventListener("pointermove",function(e){if(!_circDragging||!_srcCanvas)return;_circX+=e.movementX;_circY+=e.movementY;_redrawCircle();});
document.getElementById("circleCanvas").addEventListener("pointerup",function(){_circDragging=false;});
function _updateHeroTrack(){var pct=Math.max(0,Math.min(1,(_heroScale-_heroMinScale)/(_heroMaxScale-_heroMinScale)));document.getElementById("heroZoomTrack").style.width=(pct*100)+"%";document.getElementById("heroZoomThumb").style.left=(pct*100)+"%";}
function _updateCircTrack(){var pct=Math.max(0,Math.min(1,(_circScale-_circMinScale)/(_circMaxScale-_circMinScale)));document.getElementById("circZoomTrack").style.width=(pct*100)+"%";document.getElementById("circZoomThumb").style.left=(pct*100)+"%";}
var _heroSliderDragging=false,_circSliderDragging=false;
function _heroZoomSliderUpdate(e){if(!_srcCanvas)return;var slider=document.getElementById("heroZoomSlider");var rect=slider.getBoundingClientRect();var pct=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));_heroScale=_heroMinScale+(pct*(_heroMaxScale-_heroMinScale));_redrawHero();_updateHeroTrack();}
function _circZoomSliderUpdate(e){if(!_srcCanvas)return;var slider=document.getElementById("circZoomSlider");var rect=slider.getBoundingClientRect();var pct=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));_circScale=_circMinScale+(pct*(_circMaxScale-_circMinScale));_redrawCircle();_updateCircTrack();}
document.getElementById("heroZoomSlider").addEventListener("pointerdown",function(e){_heroSliderDragging=true;this.setPointerCapture(e.pointerId);_heroZoomSliderUpdate(e);});
document.getElementById("heroZoomSlider").addEventListener("pointermove",function(e){if(!_heroSliderDragging)return;_heroZoomSliderUpdate(e);});
document.getElementById("heroZoomSlider").addEventListener("pointerup",function(){_heroSliderDragging=false;});
document.getElementById("heroZoomSlider").addEventListener("pointercancel",function(){_heroSliderDragging=false;});
document.getElementById("circZoomSlider").addEventListener("pointerdown",function(e){_circSliderDragging=true;this.setPointerCapture(e.pointerId);_circZoomSliderUpdate(e);});
document.getElementById("circZoomSlider").addEventListener("pointermove",function(e){if(!_circSliderDragging)return;_circZoomSliderUpdate(e);});
document.getElementById("circZoomSlider").addEventListener("pointerup",function(){_circSliderDragging=false;});
document.getElementById("circZoomSlider").addEventListener("pointercancel",function(){_circSliderDragging=false;});
document.getElementById("heroZoomOut").addEventListener("click",function(){var step=(_heroMaxScale-_heroMinScale)/15;_heroScale=Math.max(_heroMinScale,_heroScale-step);_redrawHero();_updateHeroTrack();});
document.getElementById("heroZoomIn").addEventListener("click",function(){var step=(_heroMaxScale-_heroMinScale)/15;_heroScale=Math.min(_heroMaxScale,_heroScale+step);_redrawHero();_updateHeroTrack();});
document.getElementById("circZoomOut").addEventListener("click",function(){var step=(_circMaxScale-_circMinScale)/15;_circScale=Math.max(_circMinScale,_circScale-step);_redrawCircle();_updateCircTrack();});
document.getElementById("circZoomIn").addEventListener("click",function(){var step=(_circMaxScale-_circMinScale)/15;_circScale=Math.min(_circMaxScale,_circScale+step);_redrawCircle();_updateCircTrack();});
function _escAttr(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function addWish(){
  if(wishes.length>=20){alert("Max. 20 W\u00FCnsche");return;}
  wishes.push({id:"w"+Date.now().toString(36),title:"",url:"",price:"",sharedGift:false});renderWishes();
}
function removeWish(id){wishes=wishes.filter(w=>w.id!==id);renderWishes();}
function renderWishes(){
  document.getElementById("wishList").innerHTML=wishes.map(function(w,i){
    return '<div style="border:1px solid var(--l);border-radius:12px;padding:12px;margin-bottom:8px;position:relative">'
      +'<button onclick="removeWish(\\x27'+w.id+'\\x27)" style="position:absolute;top:8px;right:8px;background:none;border:none;font-size:18px;cursor:pointer;color:var(--m)">\u00D7</button>'
      +'<div class="field"><label>Geschenk '+(i+1)+'</label><input type="text" placeholder="z.B. LEGO City" oninput="wishes.find(x=>x.id===\\x27'+w.id+'\\x27).title=this.value" value="'+_escAttr(w.title)+'"></div>'
      +'<div class="field"><label>Link (optional)</label><input type="url" placeholder="https://amazon.de/..." oninput="wishes.find(x=>x.id===\\x27'+w.id+'\\x27).url=this.value" value="'+_escAttr(w.url)+'"></div>'
      +'<div style="display:flex;gap:8px">'
      +'<div class="field" style="flex:1"><label>Preis ca.</label><input type="text" placeholder="z.B. 29\u20AC" oninput="wishes.find(x=>x.id===\\x27'+w.id+'\\x27).price=this.value" value="'+_escAttr(w.price)+'"></div>'
      +'<div class="toggle" style="flex:1;margin-top:16px"><input type="checkbox" '+(w.sharedGift?"checked":"")+' onchange="wishes.find(x=>x.id===\\x27'+w.id+'\\x27).sharedGift=this.checked;togglePaypal()"><span style="font-size:12px">Gemeinsam schenken</span></div>'
      +'</div></div>';
  }).join("");
  togglePaypal();
}
function togglePaypal(){
  const hasShared=wishes.some(w=>w.sharedGift);
  const el=document.getElementById("paypalField");
  if(el)el.style.display=hasShared?"block":"none";
}
async function createParty(){
  _clearErrors();
  var missing=[];
  [{id:"childName",step:1,msg:"Bitte Vornamen eintragen"},{id:"age",step:1,msg:"Bitte Alter eintragen"},{id:"date",step:2,msg:"Bitte Datum w\u00E4hlen"},{id:"time",step:2,msg:"Bitte Start-Uhrzeit eintragen"},{id:"address",step:2,msg:"Bitte Adresse eintragen"}].forEach(function(f){var el=document.getElementById(f.id);if(!el||!(el.value||"").trim())missing.push(f);});
  if(missing.length){missing.forEach(function(m){_showErr(m.id,m.msg);});var s=Math.min.apply(null,missing.map(function(m){return m.step;}));[1,2,3].forEach(function(i){document.getElementById("step"+i).classList.toggle("hidden",i!==s);});setTimeout(function(){var f=document.getElementById(missing[0].id);if(f&&f.scrollIntoView)f.scrollIntoView({behavior:"smooth",block:"center"});},50);return;}
  const childName=document.getElementById("childName").value.trim();
  const btn=document.getElementById("createBtn");btn.textContent="\u23F3 Wird erstellt...";btn.disabled=true;
  try{
    photoData=_exportHero();photoRoundData=_exportCircle();
    const body={childName,age:parseInt(document.getElementById("age").value)||null,
      motto:document.getElementById("motto").value,mottoEmoji:document.getElementById("mottoEmoji").value||"\u{1F389}",
      mottoColor:new URLSearchParams(location.search).get("mottoColor")||autoColor(document.getElementById("motto").value),
      mottoId:document.getElementById("mottoId").value||new URLSearchParams(location.search).get("mottoId")||"",
      gameId:document.getElementById("gameId").value||"",
      date:document.getElementById("date").value,time:document.getElementById("time").value,
      endTime:document.getElementById("endTime").value,address:document.getElementById("address").value,
      notes:document.getElementById("notes").value,askAllergies:document.getElementById("askAllergies").checked,
      askPickup:document.getElementById("askPickup").checked,wishes:wishes.filter(w=>w.title.trim()),photo:photoData,photoRound:photoRoundData,
      paypalMe:(document.getElementById("paypalMe")||{}).value||""};
    const res=await fetch(API+"/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    const data=await res.json();if(!res.ok)throw new Error(data.error||"Fehler");
    document.getElementById("guestUrl").textContent=data.url;
    document.getElementById("editUrl").textContent=data.editUrl;
    // previewBtn/editBtn are now <button> elements - URLs used via openPreview()/openEdit() via window._pd
    document.getElementById("codeHint").textContent=childName;
    [1,2,3].forEach(i=>document.getElementById("step"+i).classList.add("hidden"));
    document.getElementById("result").classList.remove("hidden");
    // F8: Conversion-Tracking auch auf dem Creator-Pfad (war nur im Wizard) -> beide Pfade vergleichbar
    try{ if(window.plausible) plausible("party_created",{props:{motto:(document.getElementById("motto").value||"").slice(0,40),game:document.getElementById("gameId").value||"keins",source:"creator"}}); }catch(e){} // game-Prop (Review 2026-07-12): sonst ist "welches Spiel wurde verschickt" unmessbar (Default-Vorselektion feuert kein game_selected)
    window._pd={...data,childName,motto:document.getElementById("motto").value};
    window.scrollTo({top:0,behavior:"smooth"});
  }catch(e){alert("Fehler: "+e.message);btn.textContent="\u{1F389} Erstellen";btn.disabled=false;}
}
function poss(n){var s=String(n==null?"":n).trim();return s?(s+(/(s|ß|x|z)$/i.test(s)?"'":"'s")):s;}
function shareGuest(){const d=window._pd;const hasW=wishes.some(w=>w.title.trim());const t=(d.motto?poss(d.childName)+" "+d.motto:poss(d.childName)+" Geburtstag")+"! \u{1F389}\\n\\n"+(hasW?"Hier sind alle Infos inkl. Wunschliste, damit wir Doppelgeschenke vermeiden:":"Alle Infos & Zusage hier:")+"\\n"+d.url;window.open("https://wa.me/?text="+encodeURIComponent(t));}
function copyEdit(){navigator.clipboard.writeText(window._pd.editUrl).then(()=>{const b=event.target;b.textContent="\u2705 Kopiert!";setTimeout(()=>b.textContent="\u{1F4CB} Kopieren",2000);});}
async function sendEditEmail(){
  _clearErrors();
  var email=document.getElementById("editEmail").value.trim();
  if(!email||email.indexOf("@")<1){_showErr("editEmail","Bitte g\u00FCltige E-Mail eingeben");return;}
  var d=window._pd;
  var newsletter=document.getElementById("newsletterOptIn")&&document.getElementById("newsletterOptIn").checked;
  var btn=document.getElementById("sendEditBtn");
  btn.textContent="\u23F3 Wird gesendet...";btn.disabled=true;
  if(window.plausible){try{window.plausible("edit-link-email-submit");}catch(e){}if(newsletter){try{window.plausible("newsletter-opt-in");}catch(e){}}}
  try{
    var r=await fetch(API+"/party/"+d.id+"/send-edit-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({editToken:d.editToken,email:email,newsletterOptIn:newsletter})});
    if(!r.ok){var err=await r.json();throw new Error(err.error||"Fehler");}
    var resp=await r.json();
    btn.textContent="\u2705 Gesendet!";btn.disabled=true;
    var sentEl=document.getElementById("editEmailSent");
    if(newsletter&&resp.doiMailSent){sentEl.textContent="\u2705 Edit-Link gesendet. In derselben Mail findest du den Best\u00E4tigungs-Link f\u00FCr den Newsletter.";}
    sentEl.classList.remove("hidden");
    var gated=document.getElementById("resultGated");if(gated)gated.classList.remove("hidden");
  }catch(e){_showErr("editEmail","Fehler: "+e.message);btn.textContent="\u{1F4E7} Edit-Link per E-Mail erhalten";btn.disabled=false;}
}
function openPreview(){var d=window._pd;if(!d)return;var f=document.getElementById("modalFrame");f.src=d.url+"?preview=1&edit="+encodeURIComponent(d.editToken);document.getElementById("modalTitle").textContent="Vorschau \u2014 so sehen es deine G\u00E4ste";document.getElementById("modalOverlay").classList.add("show");document.body.classList.add("modal-open");}
function openEdit(){var d=window._pd;if(!d)return;var f=document.getElementById("modalFrame");f.src=d.editUrl;document.getElementById("modalTitle").textContent="Bearbeiten";document.getElementById("modalOverlay").classList.add("show");document.body.classList.add("modal-open");}
function closeModal(){document.getElementById("modalOverlay").classList.remove("show");document.body.classList.remove("modal-open");setTimeout(function(){document.getElementById("modalFrame").src="about:blank";},200);}
function closeModalBackdrop(e){if(e.target&&e.target.id==="modalOverlay")closeModal();}
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&document.getElementById("modalOverlay").classList.contains("show"))closeModal();});
const MC={"piraten":"#8B4513","einhorn":"#E040A0","dino":"#4CAF50","feuerwehr":"#D32F2F","weltraum":"#1565C0","meerjungfrau":"#00ACC1","prinzessin":"#E91E63","safari":"#F57F17","detektiv":"#37474F","superheld":"#D32F2F","zirkus":"#FF6F00","baustelle":"#F57F17","frozen":"#4FC3F7","minecraft":"#4CAF50","ninjago":"#D32F2F","paw patrol":"#1976D2","pokemon":"#FFC107","spider-man":"#D32F2F","super mario":"#D32F2F","halloween":"#E65100"};
function autoColor(m){if(!m)return"#D4812A";m=m.toLowerCase();for(const[k,c]of Object.entries(MC)){if(m.includes(k))return c;}return"#D4812A";}
function pickMotto(btn,name,emoji,mid){
  document.querySelectorAll(".motto-chip").forEach(c=>c.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("motto").value=name;
  document.getElementById("mottoEmoji").value=emoji;
  document.getElementById("mottoId").value=mid||"";
  document.getElementById("customMottoRow").style.display="none";
  document.getElementById("customMottoBtn").classList.remove("active");
  renderGallery(mid||"");
  // Galerie ersetzt den Text-Hint; Hint nur als Fallback wenn (noch) keine Spiele im Katalog
  document.getElementById("mottoGameHint").classList.toggle("hidden",!document.getElementById("gameGallery").classList.contains("hidden"));
}
// ── Spiel-Galerie (GAME_CATALOG, server-injiziert): je Motto waehlbare Einladungsspiele.
// Karte anklicken = waehlen (gameId in den Create-Payload), "Ausprobieren" = spielbare Vorschau im Modal.
const GAMES=${JSON.stringify(GAME_CATALOG).replace(/</g,"\\u003c")};
const META=${JSON.stringify(GAME_META).replace(/</g,"\\u003c")};
function renderGallery(mid){
  var box=document.getElementById("gameGallery");
  var list=(GAMES[mid]||[]).filter(function(g){return g.status==="go";});
  document.getElementById("gameId").value="";
  if(!list.length){box.classList.add("hidden");box.innerHTML="";return;}
  var html='<div style="font-weight:600;font-size:13px;margin-bottom:4px">\u{1F3AE} Einladungsspiel wählen</div><div style="font-size:11px;color:var(--m);margin-bottom:8px">Deine Gäste spielen es in der Einladung — am Ende springt das Foto deines Kindes heraus.</div><div style="display:flex;flex-wrap:wrap;gap:8px">';
  list.forEach(function(g,i){
    var f=META[g.id]||{t:g.id,s:"",e:"\u{1F3AE}"};
    html+='<div class="game-pick'+(i===0?' active':'')+'" data-gid="'+g.id+'" onclick="selectGame(this)">'
      +'<div style="font-size:22px">'+f.e+'</div>'
      +'<div style="font-weight:700;font-size:13px;margin-top:2px">'+f.t+'</div>'
      +'<div style="font-size:11px;color:var(--m);margin:2px 0 8px;line-height:1.35">'+f.s+'</div>'
      +'<button type="button" onclick="event.stopPropagation();previewGame(\\''+g.id+'\\')">▶ Ausprobieren</button>'
      +'<div class="game-pick-check">✓ Gewählt</div></div>';
  });
  box.innerHTML=html+'</div>';
  box.classList.remove("hidden");
  document.getElementById("gameId").value=list[0].id; // Default vorselektiert -> null Extra-Klicks noetig
}
function selectGame(el){
  document.querySelectorAll(".game-pick").forEach(function(c){c.classList.remove("active");});
  el.classList.add("active");
  document.getElementById("gameId").value=el.getAttribute("data-gid");
  try{if(window.plausible)plausible("game_selected",{props:{game:el.getAttribute("data-gid")}});}catch(e){}
}
function previewGame(gid){
  var g=null;for(var m in GAMES){GAMES[m].forEach(function(x){if(x.id===gid)g=x;});}
  if(!g)return;
  var nm=document.getElementById("childName").value.trim()||"Mia";
  var ag=document.getElementById("age").value||"";
  var f=document.getElementById("modalFrame");
  f.src="https://machsleicht.de"+g.path+"?name="+encodeURIComponent(nm)+(ag?"&age="+encodeURIComponent(ag):"")+"&foto=/spiele/core/demo-kid.jpg";
  document.getElementById("modalTitle").textContent="Spiel-Vorschau — mit Demo-Daten";
  document.getElementById("modalOverlay").classList.add("show");
  document.body.classList.add("modal-open");
  try{if(window.plausible)plausible("game_preview",{props:{game:gid}});}catch(e){}
}
function toggleCustomMotto(){
  var row=document.getElementById("customMottoRow");
  var isOpen=row.style.display==="flex";
  document.querySelectorAll(".motto-chip").forEach(c=>c.classList.remove("active"));
  if(!isOpen){
    row.style.display="flex";
    document.getElementById("customMottoBtn").classList.add("active");
    document.getElementById("motto").value="";
    document.getElementById("mottoEmoji").value="";
    document.getElementById("mottoId").value="";
    document.getElementById("gameId").value="";
    document.getElementById("gameGallery").classList.add("hidden");
    document.getElementById("mottoGameHint").classList.add("hidden");
    document.getElementById("mottoCustom").focus();
  }else{
    row.style.display="none";
  }
}
function clearChipSelection(){
  document.getElementById("motto").value=document.getElementById("mottoCustom").value;
  document.getElementById("mottoEmoji").value=document.getElementById("mottoEmojiCustom").value||"\u{1F389}";
  document.getElementById("mottoId").value="";
  document.getElementById("gameId").value="";
  document.getElementById("gameGallery").classList.add("hidden");
}
(function(){
  const p=new URLSearchParams(location.search);
  ["childName","age","motto","mottoEmoji","mottoColor","mottoId"].forEach(k=>{const v=p.get(k);if(v&&document.getElementById(k))document.getElementById(k).value=v;});
  // Highlight matching chip if motto was prefilled (+ Galerie & mottoId aus data-mid mitziehen)
  const prefilled=document.getElementById("motto").value;
  if(prefilled){
    const chips=document.querySelectorAll(".motto-chip");
    let matched=false;
    chips.forEach(c=>{if(c.textContent.trim().toLowerCase().includes(prefilled.toLowerCase())&&c.id!=="customMottoBtn"){c.classList.add("active");matched=true;const mid=c.getAttribute("data-mid")||"";if(mid){document.getElementById("mottoId").value=mid;renderGallery(mid);}document.getElementById("mottoGameHint").classList.toggle("hidden",!document.getElementById("gameGallery").classList.contains("hidden"));}});
    if(!matched&&prefilled){
      document.getElementById("customMottoBtn").classList.add("active");
      document.getElementById("customMottoRow").style.display="flex";
      document.getElementById("mottoCustom").value=prefilled;
      document.getElementById("mottoEmojiCustom").value=document.getElementById("mottoEmoji").value;
    }
  }
})();
</script>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════
// PARTY PAGE (delegates to guest or editor)
// ═══════════════════════════════════════════════════════════════
function partyPage(party, isEditor, gamePhotoUrl, isPreview, invite) {
  const color = /^#[0-9a-fA-F]{6}$/.test(party.mottoColor||"") ? party.mottoColor : "#D4812A";  // L10: Read-Guard wie bei paypalMe — Altbestand landet sonst ungeprueft im <style>
  const name = esc(party.childName);
  const age = party.age || "";
  const motto = esc(party.motto);
  const emoji = esc(party.mottoEmoji || "\u{1F389}");
  const dateStr = party.date ? new Date(party.date+"T00:00:00").toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long",year:"numeric"}) : "";
  const ogUrl = `https://party.machsleicht.de/${party.id}`;

  // Preview mode: editor sees guest view without name-gate
  if (isPreview) {
    return guestPageFull(party, gamePhotoUrl, true);
  }
  // Guest view gets the full themed page
  if (!isEditor) {
    return guestPageFull(party, gamePhotoUrl, false, invite);
  }

  // Editor keeps existing layout
  // OG-Strings aus ROHwerten bauen \u2014 baseHead esc()'t title+description genau einmal (sonst &amp;amp;)
  const ogTitle = party.childName ? `${party.childName}${age?` wird ${age}!`:" feiert Geburtstag!"} ${party.mottoEmoji||"\u{1F389}"}` : "Kindergeburtstag! \u{1F389}";
  const ogDesc = party.motto ? `${party.motto} \u2014 Zu-/Absage, Infos & Wunschliste` : "Alle Party-Infos auf einer Seite";
  return `${baseHead(ogTitle+" \u2014 mach\u2019s leicht", ogDesc, color, ogUrl, true)}  <!-- K1: kein Dritt-Script neben dem editToken -->
<body>
<div class="container">
  <div class="logo"><a href="https://machsleicht.de"><b>mach's</b> leicht</a></div>
  ${editorView(party,color,dateStr,name,age,motto,emoji,ogUrl)}
  <div class="footer"><a href="https://machsleicht.de">machsleicht.de</a> \u00B7 <a href="https://machsleicht.de/impressum">Impressum</a> \u00B7 <a href="https://machsleicht.de/datenschutz">Datenschutz</a></div>
</div>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════
// GUEST PAGE — FULL THEMED (new design)
// ═══════════════════════════════════════════════════════════════
function guestPageFull(party, gamePhotoUrl, isPreview, invite) {
  const inviteRole = invite ? (rolesFor(party.mottoId).find(r=>r.id===invite.role) || rolesFor(party.mottoId)[0]) : null;
  const passTitle = passTitleFor(party.mottoId);
  const t = getTheme(party.mottoId || party.motto); // mottoId (kanonische ID) bevorzugt; Fallback Freitext-Name fuer Legacy-Parties
  const name = esc(party.childName);
  const age = party.age || "";
  const motto = esc(party.motto);
  const emoji = esc(party.mottoEmoji || "\u{1F389}");
  const id = party.id;
  const nameLC = escJson((party.childName||"").toLowerCase().trim()); // Null-Guard: Legacy/fremd-geschriebene Party ohne childName crasht sonst die ganze Gaesteseite
  const dateStr = party.date ? new Date(party.date+"T00:00:00").toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long",year:"numeric"}) : "";
  const hasWishes = party.wishes && party.wishes.length > 0;
  const ogTitle = "Du bist eingeladen! \u{1F389}";
  // ROHwert \u2014 wird unten via esc(ogDesc) genau einmal escaped (sonst &amp;amp;)
  const ogDesc = party.motto ? `${party.motto} \u2014 Zu-/Absage, Infos & Wunschliste` : "Alle Party-Infos auf einer Seite";
  const ogUrl = `https://party.machsleicht.de/${id}`;

  // Game URL
  const GAME_MOTTOS = ["piraten","dino","safari","weltraum","detektiv","superheld","prinzessin","einhorn","meerjungfrau","feuerwehr","baustelle","dschungel","feen","pferde","ritter"];
  const mottoLC = (party.motto||"").toLowerCase();
  const gameMottoId = GAME_MOTTOS.find(m => (party.mottoId||"")===m) || GAME_MOTTOS.find(m => mottoLC.includes(m)) || "piraten"; // M2: exakte mottoId -> Freitext -> #32 Default-Spiel (Custom-Motto bekam sonst KEIN Spiel trotz Stage-4-Versprechen)
  // Adress-Gating: ort NICHT in die Spiel-URL (sichtbar im iframe-src = Leak vor Zusage). Adresse gibt es erst nach RSVP-"ja".
  // P6-1: Gast-App liegt seit 10.06.2026 unter /whatsapp/ (Direktlink spart den Hub-Forwarding-Hop).
  // gameId (2026-07-12): explizit gewaehltes Spiel aus GAME_CATALOG; unbekannt/aus dem Katalog genommen -> Legacy-Default je Motto.
  // &age= fuer alters-adaptive Schwierigkeit der core-Familie (Legacy-Apps ignorieren den Param).
  const _selGame = party.gameId ? gameById(party.gameId) : null;
  const _gamePath = _selGame ? _selGame.path : `/einladung/${gameMottoId}/whatsapp/`;
  const gameUrl = `https://machsleicht.de${_gamePath}?name=${encodeURIComponent(party.childName)}&date=${encodeURIComponent(party.date||"")}&time=${encodeURIComponent(party.time||"")}&ort=&tel=${encodeURIComponent("")}${party.age?`&age=${party.age}`:""}${gamePhotoUrl?"&foto="+encodeURIComponent(gamePhotoUrl):""}`;

  // Countdown days
  const _todayDE = new Date().toLocaleDateString("en-CA",{timeZone:"Europe/Berlin"});
  const daysLeft = party.date ? Math.max(0, Math.round((Date.parse(party.date) - Date.parse(_todayDE)) / 86400000)) : 0;  // K12: Kalendertage in DE-Zeit

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${esc(ogTitle)} \u2014 mach\u2019s leicht</title>
<meta property="og:title" content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(ogDesc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${esc(ogUrl)}">
${party.hasPhoto?`<meta property="og:image" content="https://party.machsleicht.de/api/ogimg/${party.id}">
<meta property="og:image:width" content="800">
<meta property="og:image:height" content="600">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://party.machsleicht.de/api/ogimg/${party.id}">`:`<meta property="og:image" content="https://machsleicht.de/og-home.png">`}
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="mach\u2019sleicht">
<meta name="referrer" content="${(isPreview||invite)?"no-referrer":"strict-origin-when-cross-origin"}">
<style>@font-face{font-family:'Baloo 2';font-style:normal;font-weight:400 800;font-display:swap;src:url(/fonts/baloo2.woff2) format('woff2')}@font-face{font-family:'DM Sans';font-style:normal;font-weight:100 1000;font-display:swap;src:url(/fonts/dmsans.woff2) format('woff2')}</style>
<link rel="icon" href="https://machsleicht.de/favicon.ico">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --a:${t.a};--al:${t.a}18;--ag:linear-gradient(135deg,${t.a},${t.h3});
  --bg:${t.bg};--card:#fff;--d:${t.d};--m:${t.m};--l:${t.l};
  --f:'DM Sans',system-ui,sans-serif;--fd:'Baloo 2','Comic Sans MS',cursive;--r:16px;
}
body{font-family:var(--f);color:var(--d);background:var(--bg);min-height:100dvh;-webkit-font-smoothing:antialiased;overflow-x:hidden}
body::after{content:'';position:fixed;inset:0;background-image:radial-gradient(${t.a}1f 2.5px,transparent 3px),radial-gradient(${t.h3}26 2px,transparent 2.5px);background-size:44px 44px,44px 44px;background-position:0 0,22px 22px;pointer-events:none;z-index:0}
.hero{background:linear-gradient(180deg,${t.h1} 0%,${t.h2} 55%,${t.h3} 100%);padding:20px 16px 48px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'${emoji}';position:absolute;top:50%;left:50%;font-size:220px;transform:translate(-50%,-50%) rotate(-12deg);opacity:0.11;pointer-events:none}
.hero::after{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse at 30% 50%,rgba(255,255,255,.08) 0%,transparent 60%);animation:shimmer 8s ease-in-out infinite alternate;pointer-events:none}
@keyframes shimmer{0%{transform:translateX(-10%) rotate(-5deg)}100%{transform:translateX(10%) rotate(5deg)}}
.hero-inner{max-width:480px;margin:0 auto;position:relative;z-index:1}
.hero-logo{font-family:var(--fd);font-size:16px;color:rgba(255,255,255,.6);margin-bottom:16px}
.bunting{display:block;width:100%;max-width:420px;margin:0 auto 6px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.15))}
.float-deko{position:absolute;pointer-events:none;opacity:.6;animation:bob 3.4s ease-in-out infinite;filter:drop-shadow(0 2px 4px rgba(0,0,0,.2))}
.float-deko.fd1{left:6%;top:38%;font-size:30px;animation-delay:.4s}
.float-deko.fd2{right:7%;top:24%;font-size:24px;animation-delay:1.1s}
.float-deko.fd3{right:14%;bottom:16%;font-size:22px;animation-delay:1.9s;animation-duration:4.2s}
.hero-logo b{color:rgba(255,255,255,.9)}
.hero-photo-wrap{width:100%;max-width:360px;margin:0 auto 16px;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.25);border:3px solid rgba(255,255,255,.2)}
.hero-photo-wrap img{width:100%;display:block;aspect-ratio:4/3;object-fit:cover}
.hero-emoji{font-size:48px;margin-bottom:4px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.2));animation:bob 3s ease-in-out infinite}
.hero h1{font-family:var(--fd);font-size:42px;font-weight:800;color:#fff;margin-bottom:2px;text-shadow:0 2px 16px rgba(0,0,0,.25),0 0 40px rgba(255,255,255,.15);letter-spacing:-0.5px}
.hero h1 .hname{background:linear-gradient(135deg,#fff 30%,${t.l});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-motto{font-size:16px;color:rgba(255,255,255,.8);font-weight:600}
.hero-sub{font-size:13px;color:rgba(255,255,255,.5);margin-top:8px}
.countdown{display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:8px 18px;background:rgba(255,255,255,.15);backdrop-filter:blur(8px);border-radius:100px;border:1px solid rgba(255,255,255,.2);animation:pulse 2s ease-in-out infinite}
.countdown-num{font-family:var(--fd);font-size:24px;font-weight:800;color:#fff}
.countdown-label{font-size:12px;color:rgba(255,255,255,.7);font-weight:600}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.wave-divider{position:relative;margin-top:-40px;z-index:0}
.wave-divider svg{display:block;width:100%}
.content{max-width:480px;margin:0 auto;padding:0 16px;margin-top:-10px;position:relative;z-index:1}
.card{background:var(--card);border-radius:24px;padding:20px;box-shadow:0 3px 14px rgba(0,0,0,.07);border:1px solid var(--l);margin-bottom:16px;position:relative;overflow:hidden}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:6px;background:var(--ag);border-radius:24px 24px 0 0}
@media(hover:hover){.card:not(.game-card):hover{box-shadow:0 4px 20px rgba(0,0,0,.1);transform:translateY(-2px);transition:all .3s ease}}
.card-title{font-size:18px;font-weight:800;color:var(--a);margin-bottom:12px;font-family:var(--fd);display:flex;align-items:center;gap:8px}
.game-card{padding:0;border:3px solid ${t.a}66;background:linear-gradient(180deg,${t.bg},#fff);box-shadow:0 6px 24px ${t.a}30}
.game-header{background:linear-gradient(135deg,${t.h1},${t.h2});padding:14px 16px;display:flex;align-items:center;gap:10px;color:#fff}
.game-header-icon{font-size:22px;filter:drop-shadow(0 1px 3px rgba(0,0,0,.2))}
.game-header-title{font-size:16px;font-weight:800;font-family:var(--fd)}
.play-pill{margin-left:auto;background:#fff;color:${t.a};font-size:12px;font-weight:800;padding:6px 12px;border-radius:100px;animation:pulse 2s ease-in-out infinite;white-space:nowrap}
.game-header-sub{font-size:11px;opacity:.7;margin-top:1px}
#gameFrame{width:100%;height:min(85vh,700px);border:none;display:block}
.info-row{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;padding:10px 14px;background:var(--bg);border-radius:12px}
.info-row:last-child{margin-bottom:0}
.info-icon{font-size:22px;flex-shrink:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--al);border-radius:10px}
.info-label{font-weight:700;font-size:14px;color:var(--d)}
.info-sub{font-size:13px;color:var(--m);margin-top:1px}
.info-link{font-size:12px;color:var(--a);font-weight:600;text-decoration:none}
.rsvp-card{border:2px solid var(--l);background:linear-gradient(180deg,#fff,${t.bg})}
.rsvp-card::before{height:4px}
.guest-counter{display:flex;align-items:center;gap:8px;justify-content:center;padding:10px 16px;background:linear-gradient(135deg,${t.a}08,${t.a}18);border-radius:12px;margin-bottom:14px;border:1px solid ${t.a}30}
.guest-dots{display:flex}
.guest-dot{width:24px;height:24px;border-radius:50%;background:var(--ag);border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:700;margin-left:-6px}
.guest-dot:first-child{margin-left:0}
.guest-counter-text{font-size:13px;font-weight:700;color:var(--a)}
.rsvp-buttons{display:flex;gap:8px;margin-bottom:14px}
.rsvp-btn{flex:1;padding:16px 8px;border-radius:20px;border:3px solid var(--l);background:var(--card);cursor:pointer;font:700 15px var(--f);color:var(--d);transition:all .2s;text-align:center}
.rsvp-btn:active{transform:scale(.93)}
.rsvp-btn.active{border-color:var(--a);background:var(--al);box-shadow:0 2px 12px ${t.a}25}
.rsvp-btn.pop{animation:popBounce .5s cubic-bezier(.18,.89,.32,1.28)}
@keyframes popBounce{0%{transform:scale(.85)}40%{transform:scale(1.08)}70%{transform:scale(.96)}100%{transform:scale(1)}}
.rsvp-emoji{font-size:24px;display:block;margin-bottom:4px}
.rsvp-form{max-height:600px;transition:opacity .4s ease,max-height .5s ease;overflow:hidden}
.rsvp-form.slide-hidden{opacity:0;max-height:0;padding:0;margin:0;pointer-events:none}
.rsvp-success{display:none;text-align:center;padding:24px 16px}
.rsvp-success.show{display:block;animation:fadeUp .5s ease both}
.rsvp-success-emoji{font-size:56px;animation:bob 2.5s ease-in-out infinite}
.rsvp-success h3{font-family:var(--fd);font-size:22px;color:var(--a);margin:8px 0 4px}
.rsvp-success p{font-size:14px;color:var(--m);line-height:1.5}
.wish-progress{margin-bottom:14px}
.wish-progress-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.wish-progress-label{font-size:12px;font-weight:700;color:var(--m)}
.wish-progress-count{font-size:12px;font-weight:800;color:var(--a)}
.wish-progress-bar{height:6px;background:var(--bg);border-radius:100px;overflow:hidden}
.wish-progress-fill{height:100%;border-radius:100px;background:var(--ag);transition:width .8s cubic-bezier(.22,1,.36,1)}
.wish-item{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--bg);border-radius:12px;margin-bottom:8px}
.wish-item:last-child{margin-bottom:0}
.wish-btn{padding:8px 16px;border-radius:12px;border:2px solid var(--a);background:transparent;color:var(--a);font:700 12px var(--f);cursor:pointer;white-space:nowrap;transition:all .2s}
.wish-btn:hover{background:var(--al)}
.wish-btn.taken{background:var(--l);color:var(--m);border-color:var(--l);cursor:default}
.btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 24px;background:var(--ag);color:#fff;border:none;border-radius:var(--r);font:700 15px var(--f);cursor:pointer;transition:all .2s;width:100%;text-decoration:none;box-shadow:0 4px 16px ${t.a}40}
.btn:active{transform:scale(.97)}
.btn-outline{background:transparent;border:2px solid var(--a);color:var(--a);box-shadow:none}
.btn-sm{padding:10px 16px;font-size:13px;width:auto}
input,textarea{width:100%;padding:12px 14px;border:2px solid var(--l);border-radius:14px;font:400 15px var(--f);color:var(--d);background:#fff;outline:none;transition:border .2s}
input:focus,textarea:focus{border-color:var(--a)}
label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:4px}
.field{margin-bottom:14px}
.badge{display:inline-flex;align-items:center;gap:4px;padding:4px 12px;border-radius:100px;font-size:12px;font-weight:700}
.badge-warn{background:#FFF3E0;color:#E65100;border:1px solid #FFE0B2}
.cal-btn{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:${t.a}10;border:1px solid var(--l);border-radius:12px;color:var(--a);font:600 13px var(--f);cursor:pointer;text-decoration:none;transition:all .2s}
.cal-btn:hover{background:var(--al)}
.dsgvo{font-size:11px;color:var(--m);text-align:center;margin-top:8px;line-height:1.5;opacity:.7}
.footer{text-align:center;padding:20px 16px;font-size:11px;color:var(--m);opacity:.5}
.footer a{color:var(--m);text-decoration:none}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.fade-up{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease}
.fade-up.visible{opacity:1;transform:none}
.fade-up-d1{transition-delay:.1s}
.fade-up-d2{transition-delay:.15s}
.fade-up-d3{transition-delay:.2s}
#confettiCanvas{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;display:none}
.hidden{display:none!important}
/* code gate */
.gate-card{background:var(--card);border-radius:24px;padding:32px 24px;box-shadow:0 4px 24px rgba(0,0,0,.08);border:2px solid var(--l);text-align:center;max-width:400px;margin:0 auto}
</style>
${isPreview?"":`<script defer src="https://cloud.umami.is/script.js" data-website-id="72b5eb12-dfde-4333-9bc7-0c2880864df2" data-exclude-search="true"></script>`}
<script>window.plausible=function(name,opts){if(window.umami){try{umami.track(name,(opts&&opts.props)||{})}catch(e){}}};window.plausible.init=function(){};window.plausible.q=[];</script>
</head>
<body>

<!-- CODE GATE: client-seitiger Sichtschutz, KEIN Zugriffsschutz (CNL steht im Quelltext, Content ist nur display:none). Schuetzenswertes IMMER server-gaten wie die Adresse. -->
<div id="codeGate" style="min-height:100dvh;${(isPreview||invite)?'display:none':'display:flex'};align-items:center;justify-content:center;padding:16px;background:linear-gradient(180deg,${t.h1},${t.h2})">
  <div class="gate-card">
    <div style="font-size:56px;margin-bottom:12px">${emoji}</div>
    <h1 style="font-family:var(--fd);font-size:22px;color:var(--d);margin-bottom:4px">Du bist eingeladen!</h1>
    <p style="color:var(--m);font-size:14px;margin-bottom:20px">Wie hei\u00DFt das Geburtstagskind?</p>
    <div class="field"><input type="text" id="codeInput" placeholder="Vorname eingeben" autocomplete="off" style="text-align:center;font-size:18px"></div>
    <button class="btn" onclick="checkCode()">\u{1F513} \u00D6ffnen</button>
    <p id="codeError" class="hidden" style="color:#C62828;font-size:13px;margin-top:10px">Hmm, das stimmt nicht. Frag nochmal die Eltern! \u{1F60A}</p>
  </div>
</div>

<!-- PARTY CONTENT (hidden until code entered) -->
<div id="partyContent" style="display:${(isPreview||invite)?'block':'none'}">

<div class="hero">
<div class="hero-inner">
  <svg class="bunting" viewBox="0 0 420 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0,0 L420,0" stroke="rgba(255,255,255,.55)" stroke-width="2"/><polygon points="10,2 40,2 25,24" fill="rgba(255,255,255,.9)"/><polygon points="70,2 100,2 85,24" fill="${t.l}"/><polygon points="130,2 160,2 145,24" fill="rgba(255,255,255,.75)"/><polygon points="190,2 220,2 205,24" fill="${t.l}"/><polygon points="250,2 280,2 265,24" fill="rgba(255,255,255,.9)"/><polygon points="310,2 340,2 325,24" fill="${t.l}"/><polygon points="370,2 400,2 385,24" fill="rgba(255,255,255,.75)"/></svg>
  <span class="float-deko fd1" aria-hidden="true">\u{1F388}</span><span class="float-deko fd2" aria-hidden="true">${emoji}</span><span class="float-deko fd3" aria-hidden="true">\u2728</span>
  <div class="hero-logo"><b>mach's</b> leicht</div>
  <div class="hero-photo-wrap" id="heroPhoto" style="display:none"></div>
  <div class="hero-emoji">${emoji}</div>
  <h1><span class="hname">${name}</span>${age?` wird ${esc(age)}!`:" feiert Geburtstag!"}</h1>
  ${motto?`<div class="hero-motto">${motto}</div>`:""}
  ${invite?`<div class="hero-sub" style="font-size:16px;color:rgba(255,255,255,.92);font-weight:800">${esc(invite.n)}, deine Mission wartet!</div>`:`<div class="hero-sub">Du bist eingeladen!</div>`}
  ${party.date && daysLeft > 0 ?`<div class="countdown"><span class="countdown-label">Noch</span><span class="countdown-num">${daysLeft}</span><span class="countdown-label">${daysLeft===1?"Tag!":"Tage!"}</span></div>`:""}
</div>
</div>

<div class="wave-divider">
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style="height:50px">
    <path d="M0,0 L0,60 C240,120 480,20 720,60 C960,100 1200,30 1440,60 L1440,0 Z" fill="${t.h3}"/>
    <path d="M0,60 C240,120 480,20 720,60 C960,100 1200,30 1440,60 L1440,120 L0,120 Z" fill="${t.bg}"/>
  </svg>
</div>

<div class="content">

  ${invite?`<style>@media print{body *{visibility:hidden}#partyPass,#partyPass *{visibility:visible}#partyPass{position:fixed;left:24px;top:24px;width:calc(100% - 48px);max-width:420px;box-shadow:none}}</style>
  <div class="card fade-up" id="partyPass" style="border:3px solid ${t.a};background:linear-gradient(180deg,#fff,${t.bg});box-shadow:0 6px 24px ${t.a}35">
    <div style="position:absolute;top:10px;right:14px;font-size:26px;transform:rotate(12deg)" aria-hidden="true">\u{1F39F}\uFE0F</div>
    <div style="text-align:center;padding:2px 0 12px;border-bottom:3px dashed ${t.a}50;margin-bottom:12px">
      <div style="font-size:12px;letter-spacing:.22em;font-weight:800;color:var(--a)">\u2B50 ${esc(passTitle)} \u2B50</div>
      <div style="font-family:var(--fd);font-size:32px;font-weight:800;color:var(--d);margin-top:2px">${esc(invite.n)}</div>
    </div>
    <div style="display:grid;gap:8px;font-size:14px">
      <div><span style="color:var(--m)">Deine Rolle:</span> <strong style="color:var(--a)">${esc(inviteRole.n)}</strong></div>
      <div><span style="color:var(--m)">Deine Mission:</span> ${esc(inviteRole.m)}</div>
      <div><span style="color:var(--m)">Status:</span> <strong id="passStatus">Zusage offen</strong></div>
    </div>
    <button class="btn btn-outline btn-sm" onclick="window.print()" style="margin-top:14px">\u{1F5A8}\uFE0F Pass drucken</button>
  </div>`:""}

  ${party.notes?`<div class="card fade-up" style="text-align:center"><div style="font-size:15px;line-height:1.55;color:var(--d);white-space:pre-line">\u{1F48C} ${esc(party.notes)}</div></div>`:""}

  ${gameUrl?`<div class="card game-card fade-up" id="gameSection">
    <div class="game-header">
      <span class="game-header-icon">\u{1F3AE}</span>
      <div>
        <div class="game-header-title">${poss(name)} ${motto||"Party"}-Einladung</div>
        <div class="game-header-sub">Spiel das Einladungsspiel!</div>
      </div>
      <span class="play-pill">\u25B6 Jetzt spielen!</span>
    </div>
    <iframe id="gameFrame" src="${esc(gameUrl)}" allow="autoplay" loading="lazy" title="Einladungsspiel"></iframe>
  </div>`:""}

  <div class="card fade-up fade-up-d1">
    <div class="card-title">${emoji} Party-Details</div>
    ${party.date?`<div class="info-row"><div class="info-icon">\u{1F4C5}</div><div><div class="info-label">${esc(dateStr)}</div>${party.time?`<div class="info-sub">${esc(party.time)} Uhr${party.endTime?" \u2014 "+esc(party.endTime)+" Uhr":""}</div>`:""}</div></div>`:""}
    ${party.address?`<div class="info-row" id="addrRow"><div class="info-icon">\u{1F4CD}</div><div><div class="info-label" id="addrLabel" style="color:var(--m);font-style:italic">\u{1F512} Adresse erscheint nach deiner Zusage</div><div id="addrLink"></div></div></div>`:""}
  </div>

  <div id="rsvpAnchor"></div>
  <div class="card rsvp-card fade-up fade-up-d2" id="rsvpCard">
    <div class="card-title">\u{1F389} Zu- oder Absage</div>
    <div class="guest-counter hidden" id="guestCounter">
      <div class="guest-dots" id="guestDots"></div>
      <span class="guest-counter-text" id="guestCounterText"></span>
    </div>
    <div id="alreadyRsvp" class="hidden" style="text-align:center;padding:8px 0 12px">
      <p style="font-size:14px;color:var(--m)">Du hast bereits f\u00FCr <strong id="prevName"></strong> geantwortet.</p>
      <button class="btn btn-outline btn-sm" onclick="document.getElementById('alreadyRsvp').classList.add('hidden');document.getElementById('rsvpFields').classList.remove('hidden')" style="margin-top:8px">Antwort \u00E4ndern</button>
    </div>
    <div class="rsvp-form" id="rsvpFields">
      <div class="field"><label>Name deines Kindes</label><input type="text" id="rsvpName" placeholder="z.B. Lina" maxlength="50"></div>
      <div class="rsvp-buttons">
        <button class="rsvp-btn" data-rsvp="ja" onclick="pickStatus('ja',this)"><span class="rsvp-emoji">\u2705</span>Dabei!</button>
        <button class="rsvp-btn" data-rsvp="vielleicht" onclick="pickStatus('vielleicht',this)"><span class="rsvp-emoji">\u{1F914}</span>Vielleicht</button>
        <button class="rsvp-btn" data-rsvp="nein" onclick="pickStatus('nein',this)"><span class="rsvp-emoji">\u274C</span>Nein</button>
      </div>
      ${party.askAllergies?`<div class="field"><label>Allergien / Unvertr\u00E4glichkeiten</label><input type="text" id="rsvpAllergies" placeholder="z.B. Nussallergie" maxlength="200"><span style="display:block;font-size:11px;color:#8B7355;margin-top:4px">Freiwillig \u2014 das sieht nur die Gastgeber-Familie und wird sp\u00E4testens 14 Tage nach der Party gel\u00F6scht.</span></div>`:""}
      ${party.askPickup?`<div class="field"><label>Wer holt ab & wann?</label><div style="display:flex;gap:8px"><input type="text" id="rsvpPickupPerson" placeholder="z.B. Papa" style="flex:1" maxlength="50"><input type="time" id="rsvpPickupTime" style="width:110px"></div></div>`:""}
      <button class="btn" onclick="sendRsvp()" id="rsvpBtn">\u{1F4E8} Absenden</button>
      <p class="dsgvo">Deine Angaben werden nur f\u00FCr diese Party gespeichert und sp\u00E4testens 14 Tage nach der Party automatisch gel\u00F6scht \u2014 die Kopie auf diesem Ger\u00E4t l\u00F6scht sich beim n\u00E4chsten \u00D6ffnen der Seite.</p>
    </div>
    <div class="rsvp-success" id="rsvpSuccess">
      <div class="rsvp-success-emoji">\u{1F389}</div>
      <h3 id="rsvpMsg">Wir freuen uns auf euch!</h3>
      <p id="rsvpSub">Deine Zusage ist gespeichert.</p>
      ${party.date?`<a href="javascript:downloadIcs()" class="cal-btn" style="margin-top:16px;display:inline-flex">\u{1F4C5} Termin speichern</a>`:""}
    </div>
  </div>

  ${hasWishes?`<div class="card fade-up fade-up-d3">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <div class="card-title" style="margin:0">\u{1F381} Wunschliste</div>
      <span class="badge badge-warn" id="wishBadge"></span>
    </div>
    <p style="font-size:12px;color:var(--m);margin-bottom:14px">Reserviere ein Geschenk \u2014 andere G\u00E4ste sehen nur, dass es vergeben ist.</p>
    <div class="wish-progress" id="wishProgress">
      <div class="wish-progress-header">
        <span class="wish-progress-label">Reserviert</span>
        <span class="wish-progress-count" id="wishProgressCount"></span>
      </div>
      <div class="wish-progress-bar"><div class="wish-progress-fill" id="wishProgressFill"></div></div>
    </div>
    <div id="wishListGuest"></div>
    <p style="font-size:10px;color:var(--m);margin-top:12px;text-align:center;opacity:.6">Links enthalten ggf. Affiliate-Links. F\u00FCr dich \u00E4ndert sich nichts am Preis.</p>
  </div>`:""}

  ${party.date?`<div style="text-align:center;margin:8px 0"><a href="javascript:downloadIcs()" class="cal-btn">\u{1F4C5} Termin im Kalender speichern</a></div>`:""}

</div>

${!isPreview?`<div style="max-width:560px;margin:30px auto 8px;padding:22px 20px;border-radius:16px;background:#FFF6EC;border:1px solid #F0DEC8;text-align:center">
  <div style="font-size:26px;line-height:1;margin-bottom:6px">\u{1F388}</div>
  <div style="font-weight:800;font-size:17px;color:#1E3A5F;margin-bottom:4px">Planst du auch bald einen Geburtstag?</div>
  <p style="font-size:14px;color:#555;margin:0 0 14px;line-height:1.45">Erstelle so eine Partyseite + den kompletten Plan \u2014 kostenlos, in 5 Minuten, ohne Anmeldung.</p>
  <a href="https://party.machsleicht.de/?ref=${esc(id)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#FF6F00;color:#fff;font-weight:800;padding:13px 26px;border-radius:12px;text-decoration:none">Eigene Partyseite erstellen \u2192</a>
</div>`:""}

<div class="footer"><a href="https://machsleicht.de">machsleicht.de</a> \u00B7 <a href="https://machsleicht.de/impressum">Impressum</a> \u00B7 <a href="https://machsleicht.de/datenschutz">Datenschutz</a></div>

</div><!-- /partyContent -->

<canvas id="confettiCanvas"></canvas>

<script>
var PID="${id}",CNL="${nameLC}",GID=${JSON.stringify(party.gameId||"legacy-default")};
var INVITE_TOKEN="${escJson(invite?invite.t:"")}",INVITE_NAME="${escJson(invite?invite.n:"")}",INVITE_AUTOSEND=${(party.askAllergies||party.askPickup)?"false":"true"};
var RSVP_EXP=${party.date ? (new Date(party.date+"T00:00:00Z").getTime()+14*86400000) : (Date.now()+30*86400000)};  // I5/L3: identische Basis wie calcTTL (Mitternacht UTC), sonst ueberlebt die Kopie den Server um 24h
var selectedStatus=null,guestName="";
// Funnel-Nenner (Review 2026-07-12): party_view = Einladung geoeffnet. Ohne Nenner sind
// game_complete/rsvp_sent nicht als Konversionsrate lesbar. isPreview laedt kein Umami -> Shim no-op.
window.addEventListener("DOMContentLoaded",function(){try{if(window.plausible)plausible("party_view",{props:{game:GID}});}catch(e){}});
// Adress-Gating (Client): Adresse ist NICHT im Seitenquelltext. Wird erst nach RSVP-"ja" aus der Server-Antwort gesetzt.
var REVEALED_ADDR="",REVEALED_ADDR_ICS="";
function revealAddr(addr,addrIcs){
  if(!addr)return;
  REVEALED_ADDR=addr;REVEALED_ADDR_ICS=addrIcs||"";
  var lbl=document.getElementById("addrLabel");
  if(lbl){lbl.style.fontStyle="normal";lbl.style.color="var(--d)";lbl.style.whiteSpace="pre-line";lbl.textContent=addr;}  // textContent = kein XSS
  var lnk=document.getElementById("addrLink");
  if(lnk&&!lnk.firstChild){var a=document.createElement("a");a.href="https://maps.google.com/?q="+encodeURIComponent(addr);a.target="_blank";a.rel="noopener";a.className="info-link";a.textContent="→ Google Maps";lnk.appendChild(a);}
}
function hideAddr(){  // Wechsel ja->nein/vielleicht: bereits enthuellte Adresse wieder verbergen (sonst bleibt sie bis Reload sichtbar).
  REVEALED_ADDR="";REVEALED_ADDR_ICS="";
  var lbl=document.getElementById("addrLabel");
  if(lbl){lbl.style.fontStyle="italic";lbl.style.color="var(--m)";lbl.style.whiteSpace="";lbl.textContent="\u{1F512} Adresse erscheint nach deiner Zusage";}
  var lnk=document.getElementById("addrLink");if(lnk){while(lnk.firstChild)lnk.removeChild(lnk.firstChild);}
}

// ── CONFETTI ENGINE ──
var confettiColors=["${t.a}","${t.h3}","#FFC107","#FF5722","#E91E63","#2196F3","#9C27B0","#FFEB3B"];
function launchConfetti(dur){
  var cv=document.getElementById("confettiCanvas");cv.style.display="block";
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  var ctx=cv.getContext("2d"),ps=[],st=Date.now(),shapes=["rect","circle","strip"];
  for(var i=0;i<150;i++)ps.push({x:Math.random()*cv.width,y:Math.random()*cv.height*-1,w:Math.random()*8+4,h:Math.random()*4+2,shape:shapes[i%3],color:confettiColors[i%confettiColors.length],vx:(Math.random()-.5)*4,vy:Math.random()*3+1.5,rot:Math.random()*360,rotV:(Math.random()-.5)*15,osc:Math.random()*Math.PI*2});
  function frame(){
    var el=Date.now()-st;ctx.clearRect(0,0,cv.width,cv.height);var alive=false;
    ps.forEach(function(p){p.x+=p.vx+Math.sin(p.osc)*.5;p.y+=p.vy;p.rot+=p.rotV;p.osc+=.03;if(el>dur)p.vy+=.1;
    var alpha=el>dur?Math.max(0,1-(el-dur)/1000):1;if(alpha<=0||p.y>cv.height+20)return;alive=true;
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.globalAlpha=alpha;ctx.fillStyle=p.color;
    if(p.shape==="circle"){ctx.beginPath();ctx.arc(0,0,p.w/2,0,Math.PI*2);ctx.fill();}
    else if(p.shape==="strip"){ctx.fillRect(-p.w/2,-1,p.w,2);}
    else{ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);}ctx.restore();});
    if(alive)requestAnimationFrame(frame);else cv.style.display="none";
  }
  requestAnimationFrame(frame);
}

// ── SCROLL REVEAL ──
(function(){var els=document.querySelectorAll(".fade-up");if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("visible");});return;}
var obs=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target);}});},{threshold:.15});
els.forEach(function(e){obs.observe(e);});})();

// ── CODE GATE ──
function checkCode(){
  var v=document.getElementById("codeInput").value.trim().toLowerCase();
  if(v===CNL){document.getElementById("codeGate").style.display="none";document.getElementById("partyContent").style.display="block";loadPhoto();loadWishes();loadGuestCount();checkPrev();
  // Re-trigger scroll reveal for newly visible elements
  document.querySelectorAll(".fade-up").forEach(function(e){e.classList.add("visible");});
  }else{document.getElementById("codeError").classList.remove("hidden");document.getElementById("codeInput").style.borderColor="#C62828";}
}
document.getElementById("codeInput").addEventListener("keydown",function(e){if(e.key==="Enter")checkCode();});

// ── PHOTO ──
async function loadPhoto(){try{var r=await fetch(location.origin+"/api/photo/"+PID);if(!r.ok)return;var d=await r.json();if(d.photo){var el=document.getElementById("heroPhoto");var im=document.createElement("img");im.src=d.photo;im.alt="";el.textContent="";el.appendChild(im);el.style.display="block";}}catch(e){}}

// ── GUEST COUNT ──
async function loadGuestCount(){try{var r=await fetch(location.origin+"/api/party/"+PID);if(!r.ok)return;var d=await r.json();var c=d.guestCount||0;if(c>0){var el=document.getElementById("guestCounter");el.classList.remove("hidden");var dots=document.getElementById("guestDots");var letters="ABCDEFGHIJKLM";var show=Math.min(c,4);for(var i=0;i<show;i++){var dot=document.createElement("div");dot.className="guest-dot";dot.textContent=i<3?letters[i]:"+"+(c-3);dots.appendChild(dot);}document.getElementById("guestCounterText").textContent="Schon "+c+" "+(c===1?"Kind":"Kinder")+" dabei!";}}catch(e){}}

// ── PREV RSVP ──
function rsvpKey(){return "rsvp_"+PID+(INVITE_TOKEN?"_"+INVITE_TOKEN:"");}  // token-scoped: Geschwister am selben Geraet (Gate-F5)
function checkPrev(){try{var p=localStorage.getItem(rsvpKey());if(p){var d=JSON.parse(p);if(d.exp&&Date.now()>d.exp){localStorage.removeItem(rsvpKey());return;}document.getElementById("prevName").textContent=d.name;document.getElementById("alreadyRsvp").classList.remove("hidden");document.getElementById("rsvpFields").classList.add("hidden");if(!INVITE_TOKEN){document.getElementById("rsvpName").value=d.name;}guestName=d.name;
if(INVITE_TOKEN&&d.status){try{var ps=document.getElementById("passStatus");if(ps)ps.textContent=d.status==="ja"?"\u2705 Du bist dabei!":d.status==="vielleicht"?"\u{1F914} Vielleicht dabei":"Abgesagt";}catch(err){}}
try{var _fa=document.getElementById("rsvpAllergies");if(_fa&&d.allergies)_fa.value=d.allergies;var _fp=document.getElementById("rsvpPickupPerson");if(_fp&&d.pickupPerson)_fp.value=d.pickupPerson;var _ft=document.getElementById("rsvpPickupTime");if(_ft&&d.pickupTime)_ft.value=d.pickupTime;window._pref={a:d.allergies||"",p:d.pickupPerson||"",t:d.pickupTime||""};}catch(err){}
if(d.status==="ja"&&d.address)revealAddr(d.address,d.addressIcs);}}catch(e){}}

// ── RSVP ──
function pickStatus(s,el){
  selectedStatus=s;
  document.querySelectorAll(".rsvp-btn").forEach(function(b){b.classList.remove("active","pop");});
  el.classList.add("active");void el.offsetWidth;el.classList.add("pop");
  if(s==="ja")launchConfetti(1500);
  if(INVITE_TOKEN&&INVITE_AUTOSEND)setTimeout(sendRsvp,250);   // Party-Pass: 1-Tipp nur ohne Zusatzfelder — sonst wuerde der Auto-Send Allergie-/Abholangaben leer ueberschreiben (Gate-F2)
}
// Party-Pass-Init: Namensfeld vorbefuellen + verstecken (Server kennt den Gast ueber den Token)
(function(){ if(!INVITE_TOKEN) return; try{
  var nf=document.getElementById("rsvpName"); if(nf){ nf.value=INVITE_NAME; var fld=nf.closest(".field"); if(fld) fld.style.display="none"; }
}catch(e){} })();
async function sendRsvp(){
  var rn=document.getElementById("rsvpName").value.trim();
  if(INVITE_TOKEN)rn=INVITE_NAME;  // Anzeige-Name = Server-Wahrheit, nicht evtl. fremder localStorage-Rest (Gate-F5)
  if(!rn){alert("Bitte Namen eingeben");return;}
  if(!selectedStatus){alert("Bitte Zu- oder Absage w\\u00E4hlen");return;}
  var btn=document.getElementById("rsvpBtn");btn.textContent="\\u23F3 Wird gesendet...";btn.disabled=true;
  var body={name:rn,status:selectedStatus};
  if(INVITE_TOKEN){body.g=INVITE_TOKEN;delete body.name;}
  var al=document.getElementById("rsvpAllergies");if(al)body.allergies=(al.value===""&&window._pref&&window._pref.a)?null:al.value;
  var pp=document.getElementById("rsvpPickupPerson");if(pp)body.pickupPerson=(pp.value===""&&window._pref&&window._pref.p)?null:pp.value;
  var pt=document.getElementById("rsvpPickupTime");if(pt)body.pickupTime=(pt.value===""&&window._pref&&window._pref.t)?null:pt.value;
  if(!INVITE_TOKEN){try{var _p9=JSON.parse(localStorage.getItem(rsvpKey())||"null");if(_p9&&_p9.name&&String(_p9.name).toLowerCase()===rn.toLowerCase())body.confirmUpdate=true;}catch(e){}}
  try{
    var r=await fetch(location.origin+"/api/party/"+PID+"/rsvp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    if(r.status===409){var d9=await r.json();
      if(d9.exists&&confirm("F\\u00FCr \\u201E"+rn+"\\u201C wurde schon geantwortet \\u2014 vielleicht auf einem anderen Ger\\u00E4t.\\n\\nOK = Antwort \\u00E4ndern\\nAbbrechen = das ist ein anderes Kind (h\\u00E4ng dann z.B. einen Buchstaben an den Namen)")){
        body.confirmUpdate=true;
        // W10-6: bestaetigtes Update eines Bestandseintrags — leere Felder sind hier ein bewusstes Loeschen
        // (Art. 16), auch ohne geraetelokalen _pref-Marker (Cross-Device-Berichtigung war sonst unmoeglich).
        if(al&&al.value==="")body.allergies=null;if(pp&&pp.value==="")body.pickupPerson=null;if(pt&&pt.value==="")body.pickupTime=null;
        r=await fetch(location.origin+"/api/party/"+PID+"/rsvp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      }else{btn.textContent="\\u{1F4E8} Absenden";btn.disabled=false;return;}
    }
    if(!r.ok){var d=await r.json();throw new Error(d.error);}
    var okData={};try{okData=await r.json();}catch(e){}
    localStorage.setItem(rsvpKey(),JSON.stringify({exp:RSVP_EXP,name:rn,status:selectedStatus,address:okData.address||"",addressIcs:okData.addressIcs||"",allergies:al?al.value:"",pickupPerson:pp?pp.value:"",pickupTime:pt?pt.value:""}));  // H1: sonst loescht "Antwort aendern" die Allergie-Angaben
    try{if(window.plausible)plausible("rsvp_sent",{props:{status:selectedStatus,game:GID}});}catch(err){} // Konversions-Event: das Ziel des ganzen Funnels (game-Prop: welche Spiel-Familie konvertiert)

    if(okData.address)revealAddr(okData.address,okData.addressIcs);else hideAddr();  // Adresse erst nach Zusage sichtbar; bei Wechsel auf nein/vielleicht wieder verbergen
    try{var ps=document.getElementById("passStatus");if(ps)ps.textContent=selectedStatus==="ja"?"\u2705 Du bist dabei!":selectedStatus==="vielleicht"?"\u{1F914} Vielleicht dabei":"Abgesagt";}catch(err){}
    guestName=rn;
    var form=document.getElementById("rsvpFields");form.classList.add("slide-hidden");
    var msgs={ja:["\\u{1F389}","Wir freuen uns auf euch!",""+rn+" ist dabei!"],vielleicht:["\\u{1F914}","Alles klar!","Wir hoffen ihr k\\u00F6nnt kommen!"],nein:["\\u{1F622}","Schade!","Vielleicht beim n\\u00E4chsten Mal."]};
    var m=msgs[selectedStatus];
    setTimeout(function(){
      var suc=document.getElementById("rsvpSuccess");
      document.getElementById("rsvpSuccess").querySelector(".rsvp-success-emoji").textContent=m[0];
      document.getElementById("rsvpMsg").textContent=m[1];
      document.getElementById("rsvpSub").textContent=m[2]+(okData.address?" \\u{1F4CD} Die Adresse steht jetzt oben bei den Party-Details.":"");
      suc.classList.add("show");
      if(selectedStatus==="ja")launchConfetti(2500);
    },400);
    loadWishes();
  }catch(e){alert("Fehler: "+e.message);btn.textContent="\\u{1F4E8} Absenden";btn.disabled=false;}
}

// ── ICS DOWNLOAD ──
// W9-6: RFC-5545-Zeilenfaltung (75-Oktett-Limit) — lange LOCATION/SUMMARY brechen sonst strikte Parser (aeltere Outlook-Importe)
function _foldIcs(line){
  var bl=function(s){return new Blob([s]).size};
  if(bl(line)<=74)return line;
  var parts=[],s=line;
  while(bl(s)>74){var i=Math.min(s.length,74);while(bl(s.slice(0,i))>74&&i>1)i--;
    if(s.charCodeAt(i-1)>=0xD800&&s.charCodeAt(i-1)<=0xDBFF)i--;  // W10-7: nie mitten im Surrogate-Paar schneiden (Emoji wuerde zu 2x U+FFFD)
    parts.push(s.slice(0,i));s=s.slice(i);}
  parts.push(s);
  return parts.join("\\r\\n ");
}
function downloadIcs(){
  var date="${escJson(party.date)}",time="${escJson(party.time||"12:00")}",endTime="${escJson(party.endTime||"")}";
  var d=date.replace(/-/g,""),ti=time.replace(/:/g,"")+"00";
  var et;
  if(endTime){ et=endTime.replace(/:/g,"")+"00"; }
  else { var _tp=(time||"12:00").split(":"); var _eh=(parseInt(_tp[0],10)||12)+3; et=_eh>23?"235900":String(_eh).padStart(2,"0")+((_tp[1]||"00")+"").padStart(2,"0")+"00"; }  // +3h Fallback; L5: bei Mitternachts-Wrap auf 23:59 clampen statt DTEND<DTSTART
  if(et<=ti)et="235900";  // W8-4: auch benutzergesetztes Ende <= Start clampen (Editor-Altbestand) — sonst DTEND<DTSTART, Kalender-Import kaputt
  var ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//machsleicht//party//DE","BEGIN:VEVENT","UID:"+PID+"@party.machsleicht.de","DTSTAMP:"+new Date().toISOString().slice(0,19).replace(/[-:]/g,"")+"Z",
    "DTSTART:"+d+"T"+ti,"DTEND:"+d+"T"+et,
    "SUMMARY:"+${JSON.stringify(icsEscape(party.childName?poss(party.childName)+" Geburtstag":"Kindergeburtstag")).replace(/</g,"\\u003C").replace(/>/g,"\\u003E")},
    "LOCATION:"+REVEALED_ADDR_ICS,
    "DESCRIPTION:"+${JSON.stringify(icsEscape(party.motto||"Kindergeburtstag")).replace(/</g,"\\u003C").replace(/>/g,"\\u003E")},
    "END:VEVENT","END:VCALENDAR"].map(_foldIcs).join("\\r\\n");
  var blob=new Blob([ics],{type:"text/calendar"});
  var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="party.ics";a.click();
}

// ── GAME COMPLETE ──
window.addEventListener("message",function(e){
  if(e.origin!=="https://machsleicht.de")return; // Origin-Check (2026-07-12): nur eigene Spiel-iframes duerfen den Zusage-Flow ausloesen
  var gf=document.getElementById("gameFrame");
  if(!gf||e.source!==gf.contentWindow)return; // e.source-Check (Review 2026-07-12): nur DAS Spiel-iframe, nicht irgendein machsleicht.de-Fenster
  if(e.data==="gameComplete"){
    try{if(window.plausible)plausible("game_complete",{props:{game:GID}});}catch(err){}
    var gs=document.getElementById("gameSection");if(gs)gs.style.display="none";
    launchConfetti(3000);
    setTimeout(function(){var a=document.getElementById("rsvpAnchor");if(a)a.scrollIntoView({behavior:"smooth",block:"start"});},1200);
  }
});

// ── WISHES ──
async function loadWishes(){
  var MYCL=[];try{MYCL=JSON.parse(localStorage.getItem("claims_"+PID)||"[]")}catch(e){}
  var el=document.getElementById("wishListGuest");if(!el)return;
  try{
    var r=await fetch(location.origin+"/api/party/"+PID);if(!r.ok)return;
    var data=await r.json();if(!data.wishes||!data.wishes.length)return;
    // W10-5: stale claims_-Eintraege gegen den Serverstand bereinigen (Rueckgabe auf Geraet B liess Geraet A
    // sonst beim naechsten "Schenke ich!" in einen widersinnigen Storno-Dialog laufen)
    try{var MYCL2=MYCL.filter(function(cid){var w=data.wishes.find(function(x){return x.id===cid});return w&&(w.sharedGift?w.claimedCount>0:w.isFull);});
      if(MYCL2.length!==MYCL.length){MYCL=MYCL2;localStorage.setItem("claims_"+PID,JSON.stringify(MYCL));}}catch(e){}
    var pp=data.paypalMe||"";
    var total=data.wishes.length,claimed=0;
    data.wishes.forEach(function(w){if(!w.sharedGift&&w.isFull)claimed++;});
    var free=total-claimed;
    // Update progress
    var pc=document.getElementById("wishProgressCount");if(pc)pc.textContent=claimed+" von "+total;
    var pf=document.getElementById("wishProgressFill");if(pf)pf.style.width=(total?Math.round(claimed/total*100):0)+"%";
    var wb=document.getElementById("wishBadge");if(wb){if(free>0&&free<total){wb.style.display="";wb.textContent="Noch "+free+" frei!";}else if(free===0){wb.style.display="";wb.textContent="Alle vergeben!";}else wb.style.display="none";}  // W11-3: display nach fruehem none wieder herstellen (loadWishes laeuft reload-frei nach jedem Claim)
    // Update guest count
    var gc=data.guestCount||0;if(gc>0){var gel=document.getElementById("guestCounter");if(gel)gel.classList.remove("hidden");document.getElementById("guestCounterText").textContent="Schon "+gc+" "+(gc===1?"Kind":"Kinder")+" dabei!";}

    el.innerHTML=data.wishes.map(function(w){
      var taken=w.isFull,shared=w.sharedGift,hasLink=w.url&&w.url.indexOf("http")===0;
      if(!/^[a-z0-9]{1,12}$/.test(String(w.id||"")))return"";  // I10: id ist onclick-Sink — Altbestand nie einbetten
      var priceNum=parseFloat((w.price||"").replace(/[^0-9.,]/g,"").replace(",","."));
      var collected=Math.round((w.claimedAmountTotal||0)*100)/100;  // W9-5: Float-Summe (3x 10,10 -> 30.299999...) nie roh anzeigen
      var remaining=priceNum?Math.round(Math.max(0,priceNum-collected)*100)/100:0;
      // Auto-Vorschlag: wenn schon Geld da → Rest / (count+1), sonst Preis / (count+1)
      var base=collected>0?remaining:priceNum;
      var share=shared&&w.claimedCount&&base?Math.ceil(base/(w.claimedCount+1)):0;
      if(shared&&!w.claimedCount&&priceNum)share=Math.ceil(priceNum/2); // noch niemand dabei → halbe Zielsumme als Start
      var ppRaw=pp.indexOf("http")===0?pp:"https://"+pp;
      var ppUrl=pp&&share?(ppRaw.charAt(ppRaw.length-1)==="/"?ppRaw.slice(0,-1):ppRaw)+"/"+(share<1?"":share):"";
      var sharedMeta='';
      if(shared){
        sharedMeta='Gemeinsam schenken';
        if(w.claimedCount)sharedMeta+=' ('+w.claimedCount+' dabei';
        if(collected>0)sharedMeta+=(w.claimedCount?', ':' (')+collected+'\\u20AC gesammelt';
        if(w.claimedCount||collected>0)sharedMeta+=')';
      }
      return '<div class="wish-item"><div style="flex:1;min-width:0"><div style="font-weight:600;font-size:14px">'+escC(w.title)+'</div><div style="font-size:12px;color:var(--m)">'
        +(w.price?escC(w.price)+' \\u00B7 ':'')
        +sharedMeta
        +(!shared&&taken?'\\u2705 Vergeben':'')
        +'</div>'
        +(shared&&share?'<div style="font-size:12px;color:var(--a);font-weight:600">\\u{1F4B8} '+(collected>0?'Noch offen: '+remaining+'\\u20AC \\u00B7 Vorschlag: ':'Dein Anteil: ~')+share+'\\u20AC</div>':'')
        +(hasLink?'<a href="'+location.origin+'/go/'+PID+'/'+w.id+'" target="_blank" rel="noopener" style="font-size:12px;color:var(--a);font-weight:600;text-decoration:none">\\u2192 '+shopLbl(w.url)+'</a>':'')
        +'</div>'
        +(taken&&!shared?(MYCL.indexOf(w.id)>=0?'<button class="wish-btn" data-shared="" onclick="claimWish(\\x27'+w.id+'\\x27,this)">Zur\\u00FCckziehen</button>':'<button class="wish-btn taken" onclick="unclaimWish(\\x27'+w.id+'\\x27,this)">Vergeben</button>'):'<button class="wish-btn" data-suggested="'+(share||'')+'" data-shared="'+(shared?'1':'')+'" onclick="claimWish(\\x27'+w.id+'\\x27,this)">'+(shared?(MYCL.indexOf(w.id)>=0?'Beteiligung \\u00E4ndern':'Beteiligen'):'Schenke ich!')+'</button>')
        +(shared&&ppUrl&&w.claimedCount?'<div style="width:100%;margin-top:6px"><a href="'+ppUrl+'" target="_blank" rel="noopener" class="btn btn-sm" style="background:#0070BA;font-size:12px;width:100%">\\u{1F4B8} '+share+'\\u20AC per PayPal senden</a></div>':'')
        +'</div>';
    }).join("");
  }catch(e){}
}
async function claimWish(wid,btn){
  var nm=guestName||document.getElementById("rsvpName").value.trim();
  if(!nm){alert("Bitte zuerst oben deinen Namen eingeben");return;}
  var body={name:nm};
  var isShared=btn.getAttribute("data-shared")==="1";
  var isMine=false;try{isMine=(JSON.parse(localStorage.getItem("claims_"+PID)||"[]")).indexOf(wid)>=0;}catch(e){}
  if(isShared){
    var suggested=btn.getAttribute("data-suggested")||"";
    var input=prompt(isMine?"Neuer Betrag in Euro?\\n(Leer lassen + OK = Beteiligung zur\\u00FCckziehen)":"Mit wie viel Euro beteiligst du dich?\\n(Leer lassen ist ok \\u2013 dann nur Name)", suggested);
    if(input===null)return; // Abbruch
    var amt=input.trim();
    if(!amt&&isMine){ if(!confirm("Beteiligung wirklich zur\\u00FCckziehen?"))return; body.remove=true; }
    if(amt){
      var parsed=parseFloat(amt.replace(",","."));
      if(isNaN(parsed)||parsed<=0||parsed>=9999){alert("Bitte einen g\\u00FCltigen Betrag eingeben");return;}
      body.amount=parsed;
    }
  }
  else if(isMine){ if(!confirm("Geschenk-Reservierung wirklich zur\\u00FCckziehen?"))return; body.remove=true; }  // W8-6: Server storniert nur noch mit explizitem remove-Flag
  var _lbl=btn.textContent;  // W9-12: echtes Vorher-Label merken statt es im Fehlerfall zu raten
  btn.textContent="\\u23F3...";btn.disabled=true;
  try{
    var r=await fetch(location.origin+"/api/party/"+PID+"/wish/"+wid+"/claim",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    if(!r.ok){var d=await r.json().catch(function(){return{}});alert(d.error||"Fehler");loadWishes();return;}  // W9-12: Liste neu laden statt Label raten
    try{var K9="claims_"+PID;var st=JSON.parse(localStorage.getItem(K9)||"[]");var ix=st.indexOf(wid);
      if(body.remove===true){if(ix>=0)st.splice(ix,1);}
      else if(!isShared){if(ix>=0)st.splice(ix,1);else st.push(wid);}
      else if(ix<0){st.push(wid);}
      localStorage.setItem(K9,JSON.stringify(st));}catch(e){}
    loadWishes();
  }catch(e){btn.textContent=_lbl;btn.disabled=false;}
}
async function unclaimWish(wid,btn){
  // W9-11: Zweitgeraet ohne claims_-Eintrag sah die eigene Reservierung nur als toten "Vergeben"-Span —
  // der Server akzeptiert Name-Match + remove:true aber von jedem Geraet (Namens-Vertrauensmodell wie RSVP).
  var nm=guestName||document.getElementById("rsvpName").value.trim();
  if(!nm){alert("Bitte zuerst oben deinen Namen eingeben");return;}
  if(!confirm("Hast du diesen Wunsch reserviert und m\\u00F6chtest ihn zur\\u00FCckgeben?"))return;
  btn.disabled=true;
  try{
    var r=await fetch(location.origin+"/api/party/"+PID+"/wish/"+wid+"/claim",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:nm,remove:true})});
    var d=await r.json().catch(function(){return{}});
    if(!r.ok){alert(d.error||"Fehler");}
    else if(d.unchanged){alert("Der Wunsch wurde unter einem anderen Namen reserviert.");}
    try{var K9="claims_"+PID;var st=JSON.parse(localStorage.getItem(K9)||"[]");var ix=st.indexOf(wid);if(ix>=0){st.splice(ix,1);localStorage.setItem(K9,JSON.stringify(st));}}catch(e){}
    loadWishes();
  }catch(e){btn.disabled=false;alert("Netzwerkfehler \\u2014 bitte nochmal versuchen");}
}
function escC(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML;}
function shopLbl(u){if(!u)return"ansehen";if(/amazon[.]de/i.test(u))return"bei Amazon";if(/mytoys[.]de/i.test(u))return"bei myToys";if(/thalia[.]de/i.test(u))return"bei Thalia";if(/otto[.]de/i.test(u))return"bei Otto";if(/jako-o[.]de/i.test(u))return"bei Jako-o";if(/tausendkind[.]de/i.test(u))return"bei tausendkind";if(/smythstoys/i.test(u))return"bei Smyths Toys";if(/lego[.]com/i.test(u))return"bei LEGO";return"ansehen";}
// Preview-Modus / Invite-Link (partyContent direkt sichtbar): load dynamische Inhalte sofort
${(isPreview || invite) ? "loadPhoto();loadWishes();loadGuestCount();" : ""}${invite ? "checkPrev();" : ""}
</script>
</body></html>`;
}
// ═══════════════════════════════════════════════════════════════
// EDITOR VIEW
// ═══════════════════════════════════════════════════════════════
function editorView(party, color, dateStr, name, age, motto, emoji, guestUrl) {
  if (!Array.isArray(party.guests)) party.guests = []; // L7: Legacy-Party ohne guests-Feld nicht crashen
  const ja = party.guests.filter(g=>g.status==="ja");
  const vielleicht = party.guests.filter(g=>g.status==="vielleicht");
  const nein = party.guests.filter(g=>g.status==="nein");
  const allergies = party.guests.filter(g=>g.allergies);
  const hasWishes = party.wishes && party.wishes.length > 0;

  return `
  <div class="card fade-up" style="text-align:center;padding:28px 20px;border:2px solid ${color}30;background:${color}06;overflow:hidden">
    <div id="heroPhotoEd"></div>
    <div style="font-size:56px;margin-bottom:8px">${emoji}</div>
    <h1 style="font-size:26px;color:${color};margin-bottom:2px">${name?(age?name+" wird "+age+"!":name+" feiert Geburtstag!"):"Kindergeburtstag!"}</h1>
    ${motto?`<p style="font-size:16px;color:var(--m);font-weight:500">${motto}</p>`:""}
    <span class="badge" style="background:${color}15;color:${color};margin-top:8px">\u{1F511} Editor-Ansicht</span>
  </div>

  ${(()=>{
    const __todayDE = new Date().toLocaleDateString("en-CA",{timeZone:"Europe/Berlin"}); const __dateMs = party.date ? Date.parse(party.date) : NaN; const daysToParty = isNaN(__dateMs) ? null : Math.round((__dateMs - Date.parse(__todayDE)) / 86400000);  // K12
    const dayLabel = daysToParty === null ? null : daysToParty === -1 ? "Gestern" : daysToParty < 0 ? `vor ${Math.abs(daysToParty)} Tagen` : daysToParty === 0 ? "Heute!" : daysToParty === 1 ? "Morgen!" : `in ${daysToParty} Tagen`;
    const dayColor = daysToParty === null ? "var(--m)" : daysToParty < 0 ? "#888" : daysToParty <= 1 ? "#C62828" : daysToParty <= 7 ? "#E65100" : color;
    const allergenList = allergies.length ? allergies.map(g=>`${g.name}: ${g.allergies}`).join("\n") : "";  // roh; esc() passiert einmal am Sink (Gate-F9)
    return `<div class="card fade-up" style="background:${color}08;border-left:4px solid ${color}">
    <h2 style="font-size:15px;color:${color};margin-bottom:14px">\u{1F4CA} Status-Übersicht</h2>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px">
      <div style="text-align:center;padding:10px 4px;background:#fff;border-radius:10px"><div style="font-size:24px;font-weight:800;color:#2E7D32">${ja.length}</div><div style="font-size:11px;color:var(--m)">dabei</div></div>
      <div style="text-align:center;padding:10px 4px;background:#fff;border-radius:10px"><div style="font-size:24px;font-weight:800;color:#E65100">${vielleicht.length}</div><div style="font-size:11px;color:var(--m)">vielleicht</div></div>
      <div style="text-align:center;padding:10px 4px;background:#fff;border-radius:10px"><div style="font-size:24px;font-weight:800;color:#C62828">${nein.length}</div><div style="font-size:11px;color:var(--m)">abgesagt</div></div>
      <div style="text-align:center;padding:10px 4px;background:#fff;border-radius:10px"><div style="font-size:24px;font-weight:800;color:${dayColor}">${daysToParty===null?"—":daysToParty<0?"⏳":daysToParty}</div><div style="font-size:11px;color:var(--m)">${dayLabel||"Datum offen"}</div></div>
    </div>
    ${allergies.length?`<div style="background:#FFF3E0;border-left:3px solid #E65100;padding:10px 12px;border-radius:6px;margin-bottom:12px"><p style="font-size:12px;font-weight:700;color:#E65100;margin-bottom:4px">⚠️ ${allergies.length} ${allergies.length===1?"Kind hat":"Kinder haben"} Allergie-Hinweise:</p><pre style="font-size:12px;color:#5D4037;margin:0;white-space:pre-wrap;font-family:inherit">${esc(allergenList)}</pre></div>`:""}
    ${party.guests.length === 0 ? `<p style="font-size:13px;color:var(--m);text-align:center;padding:8px 0">Noch keine Antworten — teile den Gäste-Link, um Zusagen zu sammeln.</p>` : ""}
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button class="btn btn-outline btn-sm" onclick="copyLink(this)" style="flex:1;min-width:140px">\u{1F4CB} Link kopieren</button>
      <button class="btn btn-outline btn-sm" onclick="shareWA()" style="flex:1;min-width:140px">\u{1F4AC} WhatsApp teilen</button>
      <a href="${esc(guestUrl)}" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm" style="flex:1;min-width:140px;text-align:center;text-decoration:none">\u{1F441}️ Gäste-Ansicht</a>
    </div>
  </div>`;
  })()}

  <div class="card fade-up">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <h2 style="font-size:15px;color:${color};margin:0">\u{1F4CB} Party-Details</h2>
      <button class="btn btn-outline btn-sm" onclick="document.getElementById('editForm').classList.toggle('hidden');document.getElementById('detailsView').classList.toggle('hidden')">\u270F\uFE0F Bearbeiten</button>
    </div>
    <div id="detailsView">
      ${party.date?`<div class="info-row"><span class="icon">\u{1F4C5}</span><div><div style="font-weight:700;font-size:14px">${esc(dateStr)}</div>${party.time?`<div style="color:var(--m);font-size:13px">${esc(party.time)} Uhr${party.endTime?" \u2014 "+esc(party.endTime)+" Uhr":""}</div>`:""}</div></div>`:""}
      ${party.address?`<div class="info-row"><span class="icon">\u{1F4CD}</span><div style="color:var(--m);font-size:13px;white-space:pre-line">${esc(party.address)}</div></div>`:""}
      ${party.notes?`<div class="info-row"><span class="icon">\u{1F4AC}</span><div style="color:var(--m);font-size:13px;white-space:pre-line">${esc(party.notes)}</div></div>`:""}
    </div>
    <div id="editForm" class="hidden">
      <div class="field"><label>Name</label><input type="text" id="edName" value="${esc(party.childName)}"></div>
      <div class="field"><label>Alter</label><input type="number" id="edAge" value="${esc(party.age||"")}"></div>
      <div class="field"><label>Motto</label><input type="text" id="edMotto" value="${esc(party.motto)}"></div>
      <div style="display:flex;gap:8px" class="field">
        <div style="flex:1"><label>Datum</label><input type="date" id="edDate" value="${esc(party.date)}"></div>
        <div style="flex:1"><label>Uhrzeit</label><input type="time" id="edTime" value="${esc(party.time)}"></div>
      </div>
      <div class="field"><label>Ende ca.</label><input type="time" id="edEndTime" value="${esc(party.endTime)}"></div>
      <div class="field"><label>Adresse</label><textarea id="edAddress" rows="2">${esc(party.address)}</textarea></div>
      <div class="field"><label>Persönliche Nachricht <span style="font-weight:400;color:var(--m);font-size:12px">(erscheint auf der Partyseite)</span></label><textarea id="edNotes" rows="3">${esc(party.notes)}</textarea></div>
      <button class="btn" id="saveBtn" onclick="saveEdit()" style="background:${color}">\u{1F4BE} Speichern</button>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--l)">
        <p style="font-size:12px;color:var(--m);margin-bottom:8px"><strong>DSGVO:</strong> Diese Party und alle Daten (Gäste, Allergien, Fotos) werden automatisch 14 Tage nach der Party gelöscht. Du kannst sie auch jetzt sofort löschen — die Aktion ist endgültig und kann nicht rückgängig gemacht werden.</p>
        <button class="btn btn-outline btn-sm" id="deleteBtn" onclick="confirmDelete()" style="color:#C62828;border-color:#C62828">\u{1F5D1}️ Party endgültig löschen</button>
      </div>
    </div>
  </div>

  <div class="card fade-up">
    <h2 style="font-size:15px;color:${color};margin-bottom:12px">\u{1F465} Gästeliste</h2>
    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      <span class="badge success">\u2705 ${ja.length} dabei</span>
      ${vielleicht.length?`<span class="badge" style="background:#FFF3E0;color:#E65100">\u{1F914} ${vielleicht.length} vielleicht</span>`:""}
      ${nein.length?`<span class="badge" style="background:#FFEBEE;color:#C62828">\u274C ${nein.length} abgesagt</span>`:""}
    </div>
    ${party.guests.length===0?`<p style="color:var(--m);font-size:13px;text-align:center;padding:12px 0">Noch keine Antworten. Teile den Link!</p>`:""}
    ${party.guests.map(g=>`
      <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--l)">
        <span style="font-size:18px">${g.status==="ja"?"\u2705":g.status==="vielleicht"?"\u{1F914}":"\u274C"}</span>
        <div style="flex:1">
          <div style="font-weight:600;font-size:14px">${esc(g.name)}${g.inv?` <span title="Pers\u00F6nliche Einladung (Party-Pass)">\u{1F39F}\uFE0F</span>`:""}</div>
          ${g.allergies?`<div style="font-size:12px;color:#C62828">\u26A0\uFE0F ${esc(g.allergies)}</div>`:""}
          ${g.pickupPerson||g.pickupTime?`<div style="font-size:12px;color:var(--m)">\u{1F697} ${esc(g.pickupPerson||"")}${g.pickupTime?" um "+esc(g.pickupTime):""}</div>`:""}
        </div>
      </div>`).join("")}
  </div>

  ${allergies.length?`<div class="card fade-up">
    <h2 style="font-size:15px;color:#C62828;margin-bottom:12px">\u26A0\uFE0F Allergien-\u00DCbersicht</h2>
    ${allergies.map(g=>`<div style="padding:6px 0;font-size:14px"><strong>${esc(g.name)}</strong>: ${esc(g.allergies)}</div>`).join("")}
  </div>`:""}

  <div class="card fade-up">
    <h2 style="font-size:15px;color:${color};margin-bottom:6px">\u{1F48C} Persönliche Einladungen <span class="badge" style="background:${color}15;color:${color};font-size:10px;vertical-align:middle">NEU</span></h2>
    <p style="font-size:12px;color:var(--m);margin-bottom:12px">Jedes Kind bekommt einen eigenen Link mit Rolle und geheimer Mission — die Zusage geht damit superschnell. Der Name steht nie im Link.</p>
    <div id="invList"></div>
    <div style="display:flex;gap:8px;margin-top:10px">
      <input type="text" id="invName" placeholder="Vorname, z.B. Emma" maxlength="30" style="flex:1" onkeydown="if(event.key==='Enter')addInvite()">
      <button class="btn btn-sm" style="background:${color}" onclick="addInvite()">+ Einladen</button>
    </div>
    <p id="invHint" style="font-size:11px;color:var(--m);margin-top:8px"></p>
  </div>

  <div class="card fade-up">
    <h2 style="font-size:15px;color:${color};margin-bottom:12px">\u{1F381} Wunschliste</h2>
    ${hasWishes?party.wishes.filter(w=>w&&/^[a-z0-9]{1,12}$/.test(String(w.id||""))).map(w=>`
      <div class="wish-item">
        <div style="flex:1">
          <div style="font-weight:600;font-size:14px">${esc(w.title)}</div>
          <div style="font-size:12px;color:var(--m)">${w.price?esc(w.price):""}${w.sharedGift?" \u00B7 Gemeinsam":""}</div>
          ${w.url?(isAllowedWishDomain(w.url)?`<div style="font-size:11px;color:var(--m)">\u{1F517} ${esc((()=>{try{return new URL(w.url).hostname.replace(/^www\./,"")}catch(e){return ""}})())}</div>`:`<div style="font-size:11px;color:#C62828;font-weight:600">\u26A0\uFE0F Link wird G\u00E4sten nicht angezeigt (Shop nicht unterst\u00FCtzt)</div>`):""}
          ${w.claimedBy&&w.claimedBy.length?(()=>{
            const entries=w.claimedBy.map(e=>typeof e==="string"?{name:e,amount:null}:e);
            const total=Math.round(entries.reduce((s,e)=>s+(typeof e.amount==="number"?e.amount:0),0)*100)/100;  // W11-4: Float-Summe wie W9-5 (Gastseite) runden — 3x 10,10 zeigte sonst 30.2999...
            const label=entries.map(e=>esc(e.name)+(typeof e.amount==="number"?" ("+e.amount+"\u20AC)":"")).join(", ");
            return `<div style="font-size:12px;color:#2E7D32;font-weight:600">\u{1F381} ${label}${total>0?` \u00B7 Gesamt: ${total}\u20AC`:""}</div>`;
          })():`<div style="font-size:12px;color:var(--m);font-style:italic">Noch offen</div>`}
        </div>
        <button onclick="deleteWish('${w.id}')" style="background:none;border:none;font-size:16px;cursor:pointer;color:var(--m);padding:4px 8px" title="L\u00F6schen">\u{1F5D1}</button>
      </div>`).join(""):`<p style="font-size:13px;color:var(--m);font-style:italic;margin-bottom:6px">Noch keine W\u00FCnsche \u2014 f\u00FCg welche hinzu, dann reservieren G\u00E4ste ohne Doppelgeschenke.</p>`}
    ${party.paypalMe?`<div style="font-size:12px;color:var(--m);margin-top:8px;padding:8px 0;border-top:1px solid var(--l)">\u{1F4B8} PayPal: ${esc(party.paypalMe)}</div>`:""}
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px;border-top:1px solid var(--l);padding-top:12px">
      <input id="newWishTitle" placeholder="z.B. Lego-Feuerwehr" maxlength="100" style="padding:10px 12px;border:1px solid var(--l);border-radius:8px;font-size:14px">
      <input id="newWishUrl" type="url" placeholder="Shop-Link (optional · z.B. amazon.de/...)" maxlength="500" style="padding:10px 12px;border:1px solid var(--l);border-radius:8px;font-size:14px">
      <div style="display:flex;gap:8px;align-items:center">
        <input id="newWishPrice" placeholder="ca. 20\u20AC (optional)" maxlength="20" style="flex:1;padding:10px 12px;border:1px solid var(--l);border-radius:8px;font-size:14px">
        <label style="display:flex;align-items:center;gap:5px;font-size:13px;white-space:nowrap;color:var(--m)"><input type="checkbox" id="newWishShared"> Gemeinsam</label>
      </div>
      <button class="btn btn-outline btn-sm" onclick="addWishEd()">+ Wunsch hinzuf\u00FCgen</button>
    </div>
  </div>
  <script>
  function _curWishes(){ return ${JSON.stringify((party.wishes||[]).map(w=>({id:w.id,title:w.title,url:w.url,price:w.price,sharedGift:w.sharedGift,claimedBy:w.claimedBy}))).replace(/</g,"\\u003c").replace(/>/g,"\\u003e").replace(/&/g,"\\u0026")}; }
  async function _putWishes(updated){
    const editToken=new URLSearchParams(location.search).get("edit");
    try{
      const r=await fetch(location.origin+"/api/party/${party.id}",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({editToken,wishes:updated})});
      if(!r.ok){const d=await r.json().catch(function(){return{};});throw new Error(d.error||("HTTP "+r.status));}  // W8-1: Server-Meldung (z.B. Shop-Whitelist) durchreichen statt nacktem "HTTP 400"
      location.reload();
    }catch(e){alert("Fehler: "+e.message);}
  }
  async function deleteWish(wid){
    if(!confirm("Wunsch wirklich l\u00F6schen?"))return;
    _putWishes(_curWishes().filter(w=>w.id!==wid));   // claimedBy der anderen Wuensche bleibt erhalten (PUT spiegelt es)
  }
  async function addWishEd(){
    const t=document.getElementById("newWishTitle").value.trim();
    if(!t){alert("Bitte einen Wunsch eingeben");return;}
    const u=_curWishes();
    if(u.length>=${MAX_WISHES}){alert("Maximal ${MAX_WISHES} W\u00FCnsche.");return;}
    u.push({title:t, url:document.getElementById("newWishUrl").value.trim(), price:document.getElementById("newWishPrice").value.trim(), sharedGift:document.getElementById("newWishShared").checked, claimedBy:[]});
    _putWishes(u);
  }
  </script>

  <div class="card fade-up">
    <h2 style="font-size:15px;color:${color};margin-bottom:12px">\u{1F4F2} Link teilen</h2>
    <p style="font-size:12px;color:var(--m);margin-bottom:8px">G\u00E4ste geben \u201E<strong style="color:var(--a)">${name}</strong>\u201C als Code ein.</p>
    <div class="share-box" style="margin-bottom:10px">
      <p style="font-size:13px;font-weight:600;word-break:break-all;margin-bottom:10px">${esc(guestUrl)}</p>
      <button class="btn" style="background:${color}" onclick="shareWA()">\u{1F4F2} Per WhatsApp teilen</button>
    </div>
    <button class="btn btn-outline" style="margin-top:6px" onclick="copyLink(this)">\u{1F4CB} Link kopieren</button>
  </div>

  <script>
  (async function(){try{const r=await fetch(location.origin+"/api/photo/${party.id}");if(!r.ok)return;const d=await r.json();if(d.photo){const el=document.getElementById("heroPhotoEd");const im=document.createElement("img");im.src=d.photo;im.className="hero-photo";el.textContent="";el.appendChild(im);}}catch{}})();
  function shareWA(){const t="${escJson(party.mottoEmoji||"\u{1F389}")} ${party.childName?escJson(poss(party.childName))+" ":""}${escJson(party.motto)||"Geburtstag"}!\\n\\nAlle Infos & Zusage hier:\\n${escJson(guestUrl)}";window.open("https://wa.me/?text="+encodeURIComponent(t));}
  function copyLink(b){navigator.clipboard.writeText("${escJson(guestUrl)}").then(()=>{b.textContent="\u2705 Kopiert!";setTimeout(()=>b.textContent="\u{1F4CB} Link kopieren",2000);});}
  async function saveEdit(){
    const btn=document.getElementById("saveBtn");btn.textContent="\u23F3 Speichern...";btn.disabled=true;
    const editToken=new URLSearchParams(location.search).get("edit");
    try{
      const body={editToken,childName:document.getElementById("edName").value,
        age:parseInt(document.getElementById("edAge").value)||null,
        motto:document.getElementById("edMotto").value,
        date:document.getElementById("edDate").value,time:document.getElementById("edTime").value,
        endTime:document.getElementById("edEndTime").value,address:document.getElementById("edAddress").value,
        notes:document.getElementById("edNotes").value};
      if(body.time&&body.endTime&&body.endTime<=body.time){alert("Das Party-Ende muss nach dem Start liegen.");btn.textContent="\u{1F4BE} Speichern";btn.disabled=false;return;}  // W8-4: Creator validiert das schon (goStep), der Editor bisher nicht
      const r=await fetch(location.origin+"/api/party/${party.id}",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      if(!r.ok){const d=await r.json();throw new Error(d.error);}
      location.reload();
    }catch(e){alert("Fehler: "+e.message);btn.textContent="\u{1F4BE} Speichern";btn.disabled=false;}
  }
  // ── Party-Pass: persoenliche Einladungen (Editor) ──
  const INVITES=${JSON.stringify((Array.isArray(party.invites)?party.invites:[]).map(i=>({t:i.t,n:i.n,role:i.role}))).replace(/</g,"\\u003c")};
  const INV_ROLES=${JSON.stringify(rolesFor(party.mottoId).map(r=>({id:r.id,n:r.n,m:r.m}))).replace(/</g,"\\u003c")};
  const INV_BASE="https://party.machsleicht.de/${party.id}?g=";
  function invUrl(i){return INV_BASE+INVITES[i].t;}
  function renderInvites(){
    const root=document.getElementById("invList"); if(!root) return;
    root.textContent="";
    INVITES.forEach(function(inv,i){
      const row=document.createElement("div");
      row.style.cssText="display:flex;align-items:center;gap:6px;padding:8px 0;border-bottom:1px solid var(--l);flex-wrap:wrap";
      const nm=document.createElement("div"); nm.style.cssText="font-weight:600;font-size:14px;min-width:72px"; nm.textContent=inv.n;
      const sel=document.createElement("select"); sel.style.cssText="flex:1;min-width:130px;padding:6px;border:1px solid var(--l);border-radius:8px;font-size:12px";
      INV_ROLES.forEach(function(r){ const o=document.createElement("option"); o.value=r.id; o.textContent=r.n; if(r.id===inv.role)o.selected=true; sel.appendChild(o); });
      sel.onchange=function(){ INVITES[i].role=sel.value; saveInvites(); };
      const bC=document.createElement("button"); bC.className="btn btn-outline btn-sm"; bC.textContent="\u{1F4CB}"; bC.title="Link kopieren";
      bC.onclick=function(){ navigator.clipboard.writeText(invUrl(i)).then(function(){ bC.textContent="\u2705"; setTimeout(function(){bC.textContent="\u{1F4CB}";},1500); }); };
      const bW=document.createElement("button"); bW.className="btn btn-outline btn-sm"; bW.textContent="\u{1F4AC}"; bW.title="Per WhatsApp senden";
      bW.onclick=function(){ const t=inv.n+", du bist eingeladen: ${party.childName?escJson(poss(party.childName))+" ":""}${party.motto?escJson(party.motto)+"-Party":"Geburtstag"}! Deine geheime Mission wartet hier:\\n"+invUrl(i); window.open("https://wa.me/?text="+encodeURIComponent(t)); };
      const bX=document.createElement("button"); bX.className="btn btn-outline btn-sm"; bX.textContent="\u2715"; bX.title="Entfernen"; bX.style.color="#C62828";
      bX.onclick=function(){ if(confirm("Einladung für "+inv.n+" entfernen? Der Link wird ungültig.")){ INVITES.splice(i,1); renderInvites(); saveInvites(); } };  // sofort re-rendern: Indizes neu binden (Gate-F10)
      row.appendChild(nm); row.appendChild(sel); row.appendChild(bC); row.appendChild(bW); row.appendChild(bX);
      root.appendChild(row);
    });
    const hint=document.getElementById("invHint");
    if(hint) hint.textContent=INVITES.length?INVITES.length+" persönliche Einladung"+(INVITES.length===1?"":"en")+" — Rolle ändern speichert automatisch.":"Noch keine persönlichen Einladungen.";
  }
  async function saveInvites(){
    const editToken=new URLSearchParams(location.search).get("edit");
    try{
      const r=await fetch(location.origin+"/api/party/${party.id}/invites",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({editToken:editToken,invites:INVITES.map(function(x){return {n:x.n,role:x.role};})})});
      if(!r.ok){const d=await r.json();throw new Error(d.error||"Fehler");}
      const d=await r.json();
      INVITES.length=0; (d.invites||[]).forEach(function(x){INVITES.push({t:x.t,n:x.n,role:x.role});});
      renderInvites();
    }catch(e){ alert("Speichern fehlgeschlagen: "+e.message); }
  }
  function addInvite(){
    const inp=document.getElementById("invName"); const v=(inp.value||"").trim().slice(0,30);
    if(!v) return;
    if(INVITES.some(function(x){return String(x.n).toLowerCase()===v.toLowerCase();})){ alert("\u201E"+v+"\u201C gibt es schon \u2014 h\u00E4ng z.\u202FB. einen Buchstaben an (\u201E"+v+" K.\u201C)."); return; }
    if(INVITES.length>=${MAX_GUESTS}){ alert("Maximal ${MAX_GUESTS} persönliche Einladungen."); return; }
    INVITES.push({t:"",n:v,role:""}); inp.value=""; saveInvites();
  }
  renderInvites();

  function confirmDelete(){
    const childName="${escJson(party.childName||"diese Party")}";
    const confirmed=confirm("Wirklich löschen?\\n\\nDie Party \\""+childName+"\\" und alle zugehörigen Daten (Gäste, Allergien, Fotos, Wünsche) werden ENDGÜLTIG gelöscht.\\n\\nDiese Aktion kann nicht rückgängig gemacht werden.\\n\\nWeiter?");
    if(!confirmed)return;
    const second=confirm("Letzte Bestätigung — wirklich endgültig löschen?");
    if(!second)return;
    deleteParty();
  }
  async function deleteParty(){
    const btn=document.getElementById("deleteBtn");
    if(btn){btn.textContent="⏳ Lösche...";btn.disabled=true;}
    const editToken=new URLSearchParams(location.search).get("edit");
    try{
      const r=await fetch(location.origin+"/api/party/${party.id}",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({editToken:editToken})});
      if(!r.ok){const d=await r.json();throw new Error(d.error||"Lösch-Fehler");}
      alert("Party wurde gelöscht. Du wirst zur Startseite weitergeleitet.");
      location.href="https://machsleicht.de/";
    }catch(e){
      alert("Fehler beim Löschen: "+e.message);
      if(btn){btn.textContent="\u{1F5D1}️ Party endgültig löschen";btn.disabled=false;}
    }
  }
  </script>`;
}

// ═══════════════════════════════════════════════════════════════
// 404
// ═══════════════════════════════════════════════════════════════
function notFoundPage() {
  return `${baseHead("Nicht gefunden \u2014 mach\u2019s leicht","Party nicht gefunden")}
<body>
<div class="container" style="text-align:center;padding:60px 16px">
  <div class="logo"><a href="https://machsleicht.de"><b>mach's</b> leicht</a></div>
  <div style="font-size:56px;margin-bottom:12px">\u{1F50D}</div>
  <h1 style="font-size:22px;margin-bottom:8px">Party nicht gefunden</h1>
  <p style="color:var(--m);font-size:14px;margin-bottom:24px">Der Link ist ung\u00FCltig oder die Party ist abgelaufen.</p>
  <a href="https://machsleicht.de" class="btn" style="display:inline-flex">\u2192 machsleicht.de</a>
  <div class="footer" style="margin-top:24px"><a href="https://machsleicht.de/impressum">Impressum</a> \u00B7 <a href="https://machsleicht.de/datenschutz">Datenschutz</a></div>
</div>
<script>
// W9-1: Das DSGVO-Versprechen der Gastseite ("Kopie auf diesem Geraet loescht sich beim naechsten Oeffnen")
// muss AUCH nach Party-Ablauf halten \u2014 dann rendert genau diese 404-Seite. Ohne den Purge hier blieben
// Name/Allergien/Adresse fuer immer im localStorage jedes Gastgeraets.
try{var m=location.pathname.match(/^\\/([a-z0-9]{6,12})$/);if(m){var p=m[1];for(var i=localStorage.length-1;i>=0;i--){var k=localStorage.key(i);if(k&&(k==="rsvp_"+p||k.indexOf("rsvp_"+p+"_")===0||k==="claims_"+p))localStorage.removeItem(k);}}}catch(e){}
</script>
</body></html>`;
}

function doiPage(kind, msg) {
  const isSuccess = kind === "success";
  const emoji = isSuccess ? "\u2705" : "\u26A0\uFE0F";
  const title = isSuccess ? "Bestätigt \u2014 mach\u2019s leicht" : "Bestätigung fehlgeschlagen \u2014 mach\u2019s leicht";
  const heading = isSuccess ? "Alles klar!" : "Hmm, das hat nicht geklappt";
  return `${baseHead(title, msg)}
<body>
<div class="container" style="text-align:center;padding:60px 16px;max-width:520px;margin:0 auto">
  <div class="logo"><a href="https://machsleicht.de"><b>mach's</b> leicht</a></div>
  <div style="font-size:56px;margin:24px 0 12px">${emoji}</div>
  <h1 style="font-size:22px;margin-bottom:12px">${heading}</h1>
  <p style="color:var(--m);font-size:15px;line-height:1.6;margin-bottom:28px">${esc(msg)}</p>
  <a href="https://machsleicht.de" class="btn" style="display:inline-flex">\u2192 Zur\u00FCck zu machsleicht.de</a>
  <div class="footer" style="margin-top:32px"><a href="https://machsleicht.de/impressum">Impressum</a> \u00B7 <a href="https://machsleicht.de/datenschutz">Datenschutz</a></div>
</div>
</body></html>`;
}
