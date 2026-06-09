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
  return new Response(JSON.stringify(data), { status, headers: { ...cors, "Content-Type": "application/json" } });
}
function generateId(len = 8) {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(len))).map(b => chars[b % chars.length]).join("");
}
function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(24))).map(b => b.toString(16).padStart(2, "0")).join("");
}
function calcTTL(partyDate) {
  // F3: ungueltiges/kaputtes Datum (z.B. "muell") -> new Date(...).getTime()===NaN -> TTL NaN
  // -> KV put mit expirationTtl:NaN wirft / Party ohne Ablauf. Fallback: 90 Tage ab jetzt.
  let base = partyDate ? new Date(partyDate) : new Date();
  if (isNaN(base.getTime())) base = new Date();
  const expiry = new Date(base.getTime() + 90 * 24 * 60 * 60 * 1000);
  return Math.max(Math.floor((expiry.getTime() - Date.now()) / 1000), 86400);
}
function esc(str) {
  if (!str) return "";
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
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
function safeParse(raw) { try { return JSON.parse(raw); } catch (e) { return null; } }
// M1: Nicht-JSON-Body soll 400 geben, nicht 500. Gibt null bei kaputtem Body.
async function safeReqJson(req) { try { return await req.json(); } catch (e) { return null; } }

// M4: nur echtes ISO-Datum (YYYY-MM-DD) akzeptieren — sonst "Invalid Date"/kaputtes ICS-DTSTART.
function validDate(d) { return /^\d{4}-\d{2}-\d{2}$/.test(d || "") ? d : ""; }

// ═══════════════════════════════════════════════════════════════
// MAIN ROUTER
// ═══════════════════════════════════════════════════════════════
export default {
  async fetch(request, env) {
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
        const _rlKey = "rl:create:" + _ip;
        const _cnt = parseInt(await env.PARTY.get(_rlKey) || "0", 10) || 0;
        if (_cnt >= 8) return json({error:"Zu viele Partyseiten in kurzer Zeit. Bitte spaeter nochmal."}, 429, request);
        await env.PARTY.put(_rlKey, String(_cnt + 1), {expirationTtl: 3600});
      }
      const id = generateId();
      const editToken = generateToken();
      const party = {
        id, editToken,
        childName: (body.childName || "").trim().slice(0,50),
        age: Math.min(Math.max(parseInt(body.age)||0,0),18)||null,
        motto: (body.motto||"").slice(0,60),
        mottoId: (body.mottoId||"").slice(0,40), // sauberer Theme-Kontrakt: kanonische ID statt Freitext-Name (getTheme matcht damit exakt, Custom faellt sauber auf Default)
        mottoEmoji: firstEmoji(body.mottoEmoji),
        mottoColor: /^#[0-9a-fA-F]{6}$/.test(body.mottoColor)?body.mottoColor:"#D4812A",
        date: validDate(body.date), time: body.time||"", endTime: body.endTime||"",
        address: (body.address||"").slice(0,200),
        notes: (body.notes||"").slice(0,500),
        askAllergies: body.askAllergies!==false,
        askPickup: body.askPickup!==false,
        wishes: (body.wishes||[]).slice(0,MAX_WISHES).map(w=>({
          id: generateId(6), title:(w.title||"").slice(0,100), url:normalizeWishUrl(w.url),
          price:(w.price||"").slice(0,20), sharedGift:!!w.sharedGift, claimedBy:[]
        })).filter(w=>w.title),
        guests: [],
        paypalMe: sanitizePaypal(body.paypalMe),
        created: new Date().toISOString(),
        ref: /^[a-z0-9]{6,12}$/.test(body.ref||"") ? body.ref : null,  // Virale Attribution (Gast->Host): ID der Party, die diesen neuen Host geseedet hat
      };
      const ttl = calcTTL(party.date);
      await env.PARTY.put(`party:${id}`, JSON.stringify(party), {expirationTtl:ttl});
      if (body.photo && isSafePhoto(body.photo)) {
        await env.PARTY.put(`photo:${id}`, body.photo, {expirationTtl:ttl});
      }
      if (body.photoRound && isSafePhoto(body.photoRound)) {
        await env.PARTY.put(`photoRound:${id}`, body.photoRound, {expirationTtl:ttl});
      }
      return json({id, editToken, url:`https://party.machsleicht.de/${id}`, editUrl:`https://party.machsleicht.de/${id}?edit=${editToken}`}, 200, request);
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
      const {editToken,email,doiToken,ref,address,...safe} = party;   // ref (virale Attribution) + address (nur fuer Zusager, kommt aus rsvp-Antwort) intern -> nicht im Public-GET leaken
      safe.wishes = (safe.wishes||[]).map(w=>{
        const cb = w.claimedBy||[];
        const claimedAmountTotal = cb.reduce((s,e)=>s+(typeof e==="object" && e && typeof e.amount==="number" ? e.amount : 0),0);
        return {...w, claimedBy:undefined, claimedCount:cb.length, claimedAmountTotal, isFull:!w.sharedGift && cb.length>0};
      });
      safe.guestCount = safe.guests.filter(g=>g.status==="ja").length;
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
      if(body.childName!==undefined) party.childName = (body.childName||"").trim().slice(0,50);
      if(body.age!==undefined) party.age = Math.min(Math.max(parseInt(body.age)||0,0),18)||null;
      if(body.motto!==undefined) party.motto = (body.motto||"").slice(0,60);
      if(body.mottoId!==undefined) party.mottoId = (body.mottoId||"").slice(0,40);
      if(body.mottoEmoji!==undefined) party.mottoEmoji = firstEmoji(body.mottoEmoji);
      if(body.mottoColor!==undefined) party.mottoColor = /^#[0-9a-fA-F]{6}$/.test(body.mottoColor)?body.mottoColor:"#D4812A";
      if(body.date!==undefined) party.date = validDate(body.date);
      if(body.time!==undefined) party.time = (body.time||"").slice(0,20);
      if(body.endTime!==undefined) party.endTime = (body.endTime||"").slice(0,20);
      if(body.address!==undefined) party.address = (body.address||"").slice(0,200);
      if(body.notes!==undefined) party.notes = (body.notes||"").slice(0,500);
      if(body.askAllergies!==undefined) party.askAllergies = body.askAllergies!==false;
      if(body.askPickup!==undefined) party.askPickup = body.askPickup!==false;
      if(body.paypalMe!==undefined) party.paypalMe = sanitizePaypal(body.paypalMe);
      if(body.email!==undefined) party.email = (body.email||"").slice(0,120);
      if (Array.isArray(body.wishes)) {
        party.wishes = body.wishes.slice(0,MAX_WISHES).map(w=>({
          id:w.id||generateId(6),title:(w.title||"").slice(0,100),url:normalizeWishUrl(w.url),
          // P0-Security Welle 1E: claimedBy MUSS Array sein. Sonst Type-Confusion bei späterem
          // claim-Call: String-length-Check umgeht Auth bei sharedGift-Wünschen.
          price:(w.price||"").slice(0,20),sharedGift:!!w.sharedGift,claimedBy:Array.isArray(w.claimedBy)?w.claimedBy:[]
        }));
      }
      const ttl = calcTTL(party.date);
      if (body.photo===null) await env.PARTY.delete(`photo:${id}`);
      else if (body.photo && isSafePhoto(body.photo)) await env.PARTY.put(`photo:${id}`,body.photo,{expirationTtl:ttl});
      if (body.photoRound===null) await env.PARTY.delete(`photoRound:${id}`);
      else if (body.photoRound && isSafePhoto(body.photoRound)) await env.PARTY.put(`photoRound:${id}`,body.photoRound,{expirationTtl:ttl});
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
      if (party.doiToken) await env.PARTY.delete(`doi:${party.doiToken}`);
      return json({ok:true, deleted:true, message:"Party und alle zugehörigen Daten wurden gelöscht."}, 200, request);
    }

// POST /api/party/:id/rsvp
    if (path.match(/^\/api\/party\/[a-z0-9]+\/rsvp$/) && request.method === "POST") {
      const id = path.split("/")[3];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404, request);
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const body = await safeReqJson(request); if (!body) return json({error:"Ungültige Anfrage"}, 400, request);
      // Abuse-Drossel (anonymer Schreib-Endpoint): IP-Counter gemeinsam mit wish/claim, 30/h gegen Flood/KV-Bloat.
      { const _ip=request.headers.get("cf-connecting-ip")||""; if(_ip){ const _k="rl:guestwrite:"+_ip; const _c=parseInt(await env.PARTY.get(_k)||"0",10)||0; if(_c>=30) return json({error:"Zu viele Aktionen in kurzer Zeit. Bitte spaeter."},429,request); await env.PARTY.put(_k,String(_c+1),{expirationTtl:3600}); } }
      const name = (body.name||"").trim().slice(0,50);
      if (!name) return json({error:"Name fehlt"},400, request);
      if (!Array.isArray(party.guests)) party.guests = []; // L7: Legacy-Party ohne guests-Feld nicht crashen
      if (party.guests.length>=MAX_GUESTS && !party.guests.find(g=>g.name.toLowerCase()===name.toLowerCase()))
        return json({error:"Maximale Gästezahl erreicht"},400, request);
      const guest = {
        name, status:["ja","nein","vielleicht"].includes(body.status)?body.status:"ja",
        allergies:(body.allergies||"").slice(0,200), pickupTime:(body.pickupTime||"").slice(0,10),
        pickupPerson:(body.pickupPerson||"").slice(0,50), respondedAt:new Date().toISOString()
      };
      const existing = party.guests.findIndex(g=>g.name.toLowerCase()===name.toLowerCase());
      if (existing>=0) party.guests[existing]=guest; else party.guests.push(guest);
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
      // Abuse-Drossel (anonymer Schreib-Endpoint): IP-Counter gemeinsam mit rsvp, 30/h gegen Flood/KV-Bloat.
      { const _ip=request.headers.get("cf-connecting-ip")||""; if(_ip){ const _k="rl:guestwrite:"+_ip; const _c=parseInt(await env.PARTY.get(_k)||"0",10)||0; if(_c>=30) return json({error:"Zu viele Aktionen in kurzer Zeit. Bitte spaeter."},429,request); await env.PARTY.put(_k,String(_c+1),{expirationTtl:3600}); } }
      const guestName = (body.name||"").trim().slice(0,50); // F4: Laengen-Limit gegen KV-Bloat/XSS-Payload
      if (!guestName) return json({error:"Name fehlt"},400, request);
      // amount nur bei sharedGift relevant; 0 < amount < 9999
      let amount = null;
      if (body.amount !== undefined && body.amount !== null && body.amount !== "") {
        const a = parseFloat(String(body.amount).replace(",","."));
        if (!isNaN(a) && a > 0 && a < 9999) amount = Math.round(a*100)/100;
      }
      const wish = (party.wishes||[]).find(w=>w.id===wishId);
      if (!wish) return json({error:"Wunsch nicht gefunden"},404, request);
      // Helfer: aus gemischtem Array (Strings + Objects) nur Namen extrahieren
      const getName = (entry) => typeof entry === "string" ? entry : (entry && entry.name) || "";
      if (!wish.sharedGift && wish.claimedBy.length>0 && !wish.claimedBy.find(n=>getName(n).toLowerCase()===guestName.toLowerCase()))
        return json({error:"Bereits vergeben"},400, request);
      const idx = wish.claimedBy.findIndex(n=>getName(n).toLowerCase()===guestName.toLowerCase());
      if (idx>=0) {
        wish.claimedBy.splice(idx,1);
      } else {
        // F4: Anzahl-Cap gegen KV-Value-Bloat (anonym beschreibbarer Endpoint)
        if (wish.claimedBy.length >= 100) return json({error:"Liste voll"},400, request);
        // sharedGift + amount → Object, sonst String wie bisher
        if (wish.sharedGift && amount !== null) wish.claimedBy.push({name:guestName, amount});
        else wish.claimedBy.push(guestName);
      }
      await env.PARTY.put(`party:${id}`,JSON.stringify(party),{expirationTtl:calcTTL(party.date)});
      return json({ok:true,claimedBy:wish.claimedBy,claimedCount:wish.claimedBy.length}, 200, request);
    }

    // GET /api/photo/:id
    if (path.match(/^\/api\/photo\/[a-z0-9]+$/) && request.method === "GET") {
      const id = path.split("/")[3];
      const photo = await env.PARTY.get(`photo:${id}`);
      if (!photo) return json({error:"Kein Foto"},404, request);
      return json({photo}, 200, request);
    }

    // GET /api/photoRound/:id
    if (path.match(/^\/api\/photoRound\/[a-z0-9]+$/) && request.method === "GET") {
      const id = path.split("/")[3];
      const photo = await env.PARTY.get(`photoRound:${id}`);
      if (!photo) return json({error:"Kein Foto"},404, request);
      return json({photo}, 200, request);
    }

    // POST /api/party/:id/send-edit-link
    if (path.match(/^\/api\/party\/[a-z0-9]+\/send-edit-link$/) && request.method === "POST") {
      // Origin-Check (CORS-Hardening): nur von machsleicht.de/party.machsleicht.de.
      // P0-Security Welle 1C: empty Origin auch ablehnen (Server-to-Server-Bypass via
      // curl wäre Email-Spam-Vector — Angreifer könnte beliebige Edit-Mails triggern).
      const origin = request.headers.get("Origin") || "";
      if (!origin || !/^https:\/\/(www\.|party\.)?machsleicht\.de$/.test(origin)) {
        return json({error:"Nicht autorisiert"},403, request);
      }

      const id = path.split("/")[3];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404, request);
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const body = await safeReqJson(request); if (!body) return json({error:"Ungültige Anfrage"}, 400, request);
      // Legacy-Token-Guard (konsistent mit PUT/DELETE): tokenloser Alt-Eintrag -> undefined!==undefined=false waere Auth-Bypass (Mail-Spam-Vektor).
      if (!party.editToken || body.editToken !== party.editToken) return json({error:"Nicht berechtigt"},403, request);
      const email = (body.email||"").trim().slice(0,200);
      // P0-Security Welle 1E: Control-Chars (NUL, CR, LF, Tab) in Email blocken \u2014 Resend-Header-Injection-Risk.
      if (/[\x00-\x1F\x7F]/.test(email)) return json({error:"Ung\u00FCltige E-Mail"},400, request);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({error:"Ung\u00FCltige E-Mail"},400, request);
      const newsletterOptIn = body.newsletterOptIn === true;

      // Save email to party
      party.email = email;
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
        <h1 style="font-size:20px;color:#2D2319;margin:16px 0 8px">Dein Edit-Link f\u00FCr ${esc(childName)}s Partyseite</h1>
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
            subject: `Dein Edit-Link: ${childName}s Partyseite`,
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
    if (path.match(/^\/[a-z0-9]{6,12}$/)) {
      const id = path.slice(1);
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return new Response(notFoundPage(),{status:404,headers:{"Content-Type":"text/html;charset=utf-8"}});
      const party = safeParse(raw); if (!party) return json({error:"Party-Daten beschädigt"}, 500, request);
      const isEditor = url.searchParams.get("edit")===party.editToken;
      const isPreview = isEditor && url.searchParams.get("preview")==="1";
      let photoRoundB64 = "";
      if (!isEditor || isPreview) {
        const pr = await env.PARTY.get(`photoRound:${id}`);
        if (pr) { photoRoundB64 = pr.indexOf("data:")===0 ? pr.split(",")[1] : pr; }
      }
      return new Response(partyPage(party,isEditor,photoRoundB64,isPreview),{headers:{"Content-Type":"text/html;charset=utf-8"}});
    }

    return new Response("Not found",{status:404});
  }
};

// ═══════════════════════════════════════════════════════════════
// HTML TEMPLATES
// ═══════════════════════════════════════════════════════════════
function baseHead(title, description, color = "#D4812A", ogUrl = "") {
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
<meta property="og:site_name" content="mach'sleicht">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
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
<script defer src="https://cloud.umami.is/script.js" data-website-id="72b5eb12-dfde-4333-9bc7-0c2880864df2"></script>
<script>window.plausible=function(name,opts){if(window.umami){try{umami.track(name,(opts&&opts.props)||{})}catch(e){}}};window.plausible.init=function(){};window.plausible.q=[];</script>
</head>`;
}

// ═══════════════════════════════════════════════════════════════
// ERSTELLER-SEITE
// ═══════════════════════════════════════════════════════════════
function creatorPage() {
  return `${baseHead("WhatsApp-Partyseite erstellen \u2014 mach\u2019s leicht","Kindergeburtstag: Alle Infos auf einer Seite. Kostenlos.","#D4812A","https://party.machsleicht.de")}
<body>
<div class="container">
  <div class="logo"><a href="https://machsleicht.de"><b>mach's</b> leicht</a></div>
  <div style="text-align:center;margin:16px 0 24px">
    <div style="font-size:40px;margin-bottom:8px">\u{1F4F1}</div>
    <h1 style="font-size:22px;margin-bottom:4px">WhatsApp-Partyseite</h1>
    <p style="color:var(--m);font-size:14px">Alle Party-Infos auf einer Seite. Link verschicken, fertig.</p>
  </div>

  <div class="card fade-up" id="step1">
    <h2 style="font-size:16px;margin-bottom:14px">1. Das Geburtstagskind</h2>
    <div class="field"><label>Vorname<span class="req">*</span></label><input type="text" id="childName" placeholder="z.B. Emma" maxlength="50"></div>
    <div class="field"><label>Wird wie alt?<span class="req">*</span></label><input type="number" id="age" min="1" max="18" placeholder="z.B. 6"></div>
    <div class="field"><label>Motto (optional)</label>
      <div id="mottoChips" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">
        <button type="button" class="motto-chip" onclick="pickMotto(this,'Piraten','\u{1F3F4}\u{200D}\u{2620}\u{FE0F}')">\u{1F3F4}\u{200D}\u{2620}\u{FE0F} Piraten</button>
        <button type="button" class="motto-chip" onclick="pickMotto(this,'Dino','\u{1F995}')">\u{1F995} Dino</button>
        <button type="button" class="motto-chip" onclick="pickMotto(this,'Safari','\u{1F981}')">\u{1F981} Safari</button>
        <button type="button" class="motto-chip" onclick="pickMotto(this,'Weltraum','\u{1F680}')">\u{1F680} Weltraum</button>
        <button type="button" class="motto-chip" onclick="pickMotto(this,'Detektiv','\u{1F50D}')">\u{1F50D} Detektiv</button>
        <button type="button" class="motto-chip" onclick="pickMotto(this,'Superheld','\u{1F9B8}')">\u{1F9B8} Superheld</button>
        <button type="button" class="motto-chip" onclick="pickMotto(this,'Prinzessin','\u{1F478}')">\u{1F478} Prinzessin</button>
        <button type="button" class="motto-chip" onclick="pickMotto(this,'Einhorn','\u{1F984}')">\u{1F984} Einhorn</button>
        <button type="button" class="motto-chip" onclick="pickMotto(this,'Meerjungfrau','\u{1F9DC}\u{200D}\u{2640}\u{FE0F}')">\u{1F9DC}\u{200D}\u{2640}\u{FE0F} Meerjungfrau</button>
        <button type="button" class="motto-chip" onclick="pickMotto(this,'Feuerwehr','\u{1F692}')">\u{1F692} Feuerwehr</button>
        <button type="button" class="motto-chip" id="customMottoBtn" onclick="toggleCustomMotto()">\u{270F}\u{FE0F} Eigenes...</button>
      </div>
      <div id="customMottoRow" style="display:none;gap:8px">
        <input type="text" id="mottoEmojiCustom" style="width:56px;text-align:center;font-size:22px" placeholder="\u{1F389}" maxlength="8" oninput="clearChipSelection()">
        <input type="text" id="mottoCustom" placeholder="z.B. Ritter-Party" style="flex:1" maxlength="60" oninput="clearChipSelection()">
      </div>
      <input type="hidden" id="mottoEmoji" value="">
      <input type="hidden" id="motto" value="">
      <p id="mottoGameHint" class="hidden" style="font-size:11px;color:#4CAF50;margin-top:6px;font-weight:600">\u{1F3AE} Inkl. interaktivem Einladungsspiel f\u00FCr die G\u00E4ste!</p>
    </div>
    <div class="field"><label>Foto (optional, max 500KB)</label>
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
    <div class="field"><label>Adresse<span class="req">*</span></label><textarea id="address" rows="2" placeholder="Stra\u00DFe, PLZ Ort" maxlength="200"></textarea><p style="font-size:12px;color:#1E7B34;margin:6px 0 0">\u{1F512} Sehen nur G\u00E4ste, die zugesagt haben \u2014 nicht jeder mit dem Link.</p></div>
    <div class="field"><label>Hinweise f\u00FCr Eltern (optional)</label><textarea id="notes" rows="3" placeholder="z.B. Bitte Matschsachen mitbringen!" maxlength="500"></textarea></div>
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
      <p style="color:var(--m);font-size:13px;margin-top:4px">G\u00E4ste geben den Vornamen \u201E<span id="codeHint" style="font-weight:700;color:var(--a)"></span>\u201C ein, um die Seite zu sehen.</p>
    </div>
    <div style="background:#FFF3E0;border:2px solid #FFE0B2;border-radius:var(--r);padding:16px;margin-bottom:12px">
      <p style="font-size:14px;font-weight:700;color:#E65100;margin-bottom:4px">\u26A0\uFE0F Edit-Link sichern (Pflicht)</p>
      <p style="font-size:13px;color:#BF360C;margin-bottom:12px;line-height:1.5">Ohne diesen Link kannst du <strong>keine Zusagen sehen</strong> und <strong>nichts mehr \u00E4ndern</strong>. Deshalb schicken wir ihn dir jetzt per E-Mail \u2014 erst danach gibt es Bearbeiten & den G\u00E4ste-Link zum Teilen.</p>
      <div class="field" style="margin-bottom:8px"><label>Deine E-Mail<span class="req">*</span></label><input type="email" id="editEmail" placeholder="deine@email.de" style="font-size:15px"></div>
      <label id="newsletterOptInRow" style="display:flex;align-items:flex-start;gap:8px;margin:0 0 12px;cursor:pointer;user-select:none;padding:8px 2px">
        <input type="checkbox" id="newsletterOptIn" style="flex-shrink:0;width:16px;height:16px;margin-top:2px;accent-color:#E65100;cursor:pointer">
        <span style="font-size:12px;color:#5D4037;line-height:1.45">Au\u00DFerdem: Erinnerung 7 Tage vor der Party + kostenlose Tipps per Mail. Jederzeit abbestellbar. <a href="https://machsleicht.de/datenschutz.html" target="_blank" style="color:#E65100;text-decoration:underline">Datenschutz</a></span>
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
    <div class="modal-iframe-wrap"><iframe id="modalFrame" class="modal-iframe" src="about:blank"></iframe></div>
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
  return c.toDataURL("image/jpeg",0.4).split(",")[1];
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
      mottoId:new URLSearchParams(location.search).get("mottoId")||"",
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
    try{ if(window.plausible) plausible("party_created",{props:{motto:(document.getElementById("motto").value||"").slice(0,40),source:"creator"}}); }catch(e){}
    window._pd={...data,childName,motto:document.getElementById("motto").value};
    window.scrollTo({top:0,behavior:"smooth"});
  }catch(e){alert("Fehler: "+e.message);btn.textContent="\u{1F389} Erstellen";btn.disabled=false;}
}
function shareGuest(){const d=window._pd;const hasW=wishes.some(w=>w.title.trim());const t=(d.motto?d.childName+"s "+d.motto:d.childName+"s Geburtstag")+"! \u{1F389}\\n\\n"+(hasW?"Hier sind alle Infos inkl. Wunschliste, damit wir Doppelgeschenke vermeiden:":"Alle Infos & Zusage hier:")+"\\n"+d.url;window.open("https://wa.me/?text="+encodeURIComponent(t));}
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
function pickMotto(btn,name,emoji){
  document.querySelectorAll(".motto-chip").forEach(c=>c.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("motto").value=name;
  document.getElementById("mottoEmoji").value=emoji;
  document.getElementById("customMottoRow").style.display="none";
  document.getElementById("customMottoBtn").classList.remove("active");
  document.getElementById("mottoGameHint").classList.remove("hidden");
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
    document.getElementById("mottoGameHint").classList.add("hidden");
    document.getElementById("mottoCustom").focus();
  }else{
    row.style.display="none";
  }
}
function clearChipSelection(){
  document.getElementById("motto").value=document.getElementById("mottoCustom").value;
  document.getElementById("mottoEmoji").value=document.getElementById("mottoEmojiCustom").value||"\u{1F389}";
}
(function(){
  const p=new URLSearchParams(location.search);
  ["childName","age","motto","mottoEmoji","mottoColor"].forEach(k=>{const v=p.get(k);if(v&&document.getElementById(k))document.getElementById(k).value=v;});
  // Highlight matching chip if motto was prefilled
  const prefilled=document.getElementById("motto").value;
  if(prefilled){
    const chips=document.querySelectorAll(".motto-chip");
    let matched=false;
    chips.forEach(c=>{if(c.textContent.trim().toLowerCase().includes(prefilled.toLowerCase())&&c.id!=="customMottoBtn"){c.classList.add("active");matched=true;document.getElementById("mottoGameHint").classList.remove("hidden");}});
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
function partyPage(party, isEditor, photoRoundB64, isPreview) {
  const color = party.mottoColor || "#D4812A";
  const name = esc(party.childName);
  const age = party.age || "";
  const motto = esc(party.motto);
  const emoji = esc(party.mottoEmoji || "\u{1F389}");
  const dateStr = party.date ? new Date(party.date+"T00:00:00").toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long",year:"numeric"}) : "";
  const ogUrl = `https://party.machsleicht.de/${party.id}`;

  // Preview mode: editor sees guest view without name-gate
  if (isPreview) {
    return guestPageFull(party, photoRoundB64, true);
  }
  // Guest view gets the full themed page
  if (!isEditor) {
    return guestPageFull(party, photoRoundB64);
  }

  // Editor keeps existing layout
  // OG-Strings aus ROHwerten bauen \u2014 baseHead esc()'t title+description genau einmal (sonst &amp;amp;)
  const ogTitle = party.childName ? `${party.childName} wird ${age}! ${party.mottoEmoji||"\u{1F389}"}` : "Kindergeburtstag! \u{1F389}";
  const ogDesc = party.motto ? `${party.motto} \u2014 Zu-/Absage, Infos & Wunschliste` : "Alle Party-Infos auf einer Seite";
  return `${baseHead(ogTitle+" \u2014 mach\u2019s leicht", ogDesc, color, ogUrl)}
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
function guestPageFull(party, photoRoundB64, isPreview) {
  const t = getTheme(party.mottoId || party.motto); // mottoId (kanonische ID) bevorzugt; Fallback Freitext-Name fuer Legacy-Parties
  const name = esc(party.childName);
  const age = party.age || "";
  const motto = esc(party.motto);
  const emoji = esc(party.mottoEmoji || "\u{1F389}");
  const id = party.id;
  const nameLC = escJson((party.childName||"").toLowerCase().trim()); // Null-Guard: Legacy/fremd-geschriebene Party ohne childName crasht sonst die ganze Gaesteseite
  const dateStr = party.date ? new Date(party.date+"T00:00:00").toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long",year:"numeric"}) : "";
  const hasWishes = party.wishes && party.wishes.length > 0;
  const freeWishes = hasWishes ? party.wishes.filter(w => !w.sharedGift && (w.claimedBy||[]).length > 0 ? 0 : 1).length : 0;
  const totalWishes = hasWishes ? party.wishes.length : 0;
  const claimedWishes = hasWishes ? party.wishes.filter(w => (!w.sharedGift && (w.claimedBy||[]).length > 0)).length : 0;
  const ogTitle = "Du bist eingeladen! \u{1F389}";
  // ROHwert \u2014 wird unten via esc(ogDesc) genau einmal escaped (sonst &amp;amp;)
  const ogDesc = party.motto ? `${party.motto} \u2014 Zu-/Absage, Infos & Wunschliste` : "Alle Party-Infos auf einer Seite";
  const ogUrl = `https://party.machsleicht.de/${id}`;

  // Game URL
  const GAME_MOTTOS = ["piraten","dino","safari","weltraum","detektiv","superheld","prinzessin","einhorn","meerjungfrau","feuerwehr"];
  const mottoLC = (party.motto||"").toLowerCase();
  const gameMottoId = GAME_MOTTOS.find(m => (party.mottoId||"")===m) || GAME_MOTTOS.find(m => mottoLC.includes(m)); // M2: erst exakte mottoId, dann Freitext-Fallback
  // Adress-Gating: ort NICHT in die Spiel-URL (sichtbar im iframe-src = Leak vor Zusage). Adresse gibt es erst nach RSVP-"ja".
  const gameUrl = gameMottoId ? `https://machsleicht.de/einladung/${gameMottoId}/?name=${encodeURIComponent(party.childName)}&date=${encodeURIComponent(party.date||"")}&time=${encodeURIComponent(party.time||"")}&ort=&tel=${encodeURIComponent("")}${photoRoundB64?"&foto="+encodeURIComponent(photoRoundB64):""}` : "";

  // Countdown days
  const daysLeft = party.date ? Math.max(0, Math.ceil((new Date(party.date+"T00:00:00") - new Date()) / 86400000)) : 0;

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
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="mach\u2019sleicht">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="icon" href="https://machsleicht.de/favicon.ico">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --a:${t.a};--al:${t.a}18;--ag:linear-gradient(135deg,${t.a},${t.h3});
  --bg:${t.bg};--card:#fff;--d:${t.d};--m:${t.m};--l:${t.l};
  --f:'DM Sans',system-ui,sans-serif;--fd:'Fraunces','Georgia',serif;--r:16px;
}
body{font-family:var(--f);color:var(--d);background:var(--bg);min-height:100dvh;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.hero{background:linear-gradient(180deg,${t.h1} 0%,${t.h2} 55%,${t.h3} 100%);padding:20px 16px 48px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'${emoji}';position:absolute;top:50%;left:50%;font-size:220px;transform:translate(-50%,-50%) rotate(-12deg);opacity:0.07;pointer-events:none}
.hero::after{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse at 30% 50%,rgba(255,255,255,.08) 0%,transparent 60%);animation:shimmer 8s ease-in-out infinite alternate;pointer-events:none}
@keyframes shimmer{0%{transform:translateX(-10%) rotate(-5deg)}100%{transform:translateX(10%) rotate(5deg)}}
.hero-inner{max-width:480px;margin:0 auto;position:relative;z-index:1}
.hero-logo{font-family:var(--fd);font-size:16px;color:rgba(255,255,255,.6);margin-bottom:16px}
.hero-logo b{color:rgba(255,255,255,.9)}
.hero-photo-wrap{width:100%;max-width:360px;margin:0 auto 16px;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.25);border:3px solid rgba(255,255,255,.2)}
.hero-photo-wrap img{width:100%;display:block;aspect-ratio:4/3;object-fit:cover}
.hero-emoji{font-size:48px;margin-bottom:4px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.2));animation:bob 3s ease-in-out infinite}
.hero h1{font-family:var(--fd);font-size:42px;font-weight:900;color:#fff;margin-bottom:2px;text-shadow:0 2px 16px rgba(0,0,0,.25),0 0 40px rgba(255,255,255,.15);letter-spacing:-0.5px}
.hero h1 .hname{background:linear-gradient(135deg,#fff 30%,${t.l});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-motto{font-size:16px;color:rgba(255,255,255,.8);font-weight:600}
.hero-sub{font-size:13px;color:rgba(255,255,255,.5);margin-top:8px}
.countdown{display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:8px 18px;background:rgba(255,255,255,.15);backdrop-filter:blur(8px);border-radius:100px;border:1px solid rgba(255,255,255,.2);animation:pulse 2s ease-in-out infinite}
.countdown-num{font-family:var(--fd);font-size:24px;font-weight:900;color:#fff}
.countdown-label{font-size:12px;color:rgba(255,255,255,.7);font-weight:600}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.wave-divider{position:relative;margin-top:-40px;z-index:0}
.wave-divider svg{display:block;width:100%}
.content{max-width:480px;margin:0 auto;padding:0 16px;margin-top:-10px;position:relative;z-index:1}
.card{background:var(--card);border-radius:20px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.06);border:1px solid var(--l);margin-bottom:14px;position:relative;overflow:hidden}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--ag);border-radius:20px 20px 0 0}
@media(hover:hover){.card:not(.game-card):hover{box-shadow:0 4px 20px rgba(0,0,0,.1);transform:translateY(-2px);transition:all .3s ease}}
.card-title{font-size:15px;color:var(--a);margin-bottom:12px;font-family:var(--fd);display:flex;align-items:center;gap:8px}
.game-card{padding:0;border:2px solid ${t.a}30;background:linear-gradient(180deg,${t.bg},#fff)}
.game-header{background:linear-gradient(135deg,${t.h1},${t.h2});padding:14px 16px;display:flex;align-items:center;gap:10px;color:#fff}
.game-header-icon{font-size:22px;filter:drop-shadow(0 1px 3px rgba(0,0,0,.2))}
.game-header-title{font-size:14px;font-weight:800}
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
.rsvp-btn{flex:1;padding:16px 8px;border-radius:16px;border:2px solid var(--l);background:var(--card);cursor:pointer;font:600 14px var(--f);color:var(--d);transition:all .2s;text-align:center}
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
<script defer src="https://cloud.umami.is/script.js" data-website-id="72b5eb12-dfde-4333-9bc7-0c2880864df2"></script>
<script>window.plausible=function(name,opts){if(window.umami){try{umami.track(name,(opts&&opts.props)||{})}catch(e){}}};window.plausible.init=function(){};window.plausible.q=[];</script>
</head>
<body>

<!-- CODE GATE -->
<div id="codeGate" style="min-height:100dvh;${isPreview?'display:none':'display:flex'};align-items:center;justify-content:center;padding:16px;background:linear-gradient(180deg,${t.h1},${t.h2})">
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
<div id="partyContent" style="display:${isPreview?'block':'none'}">

<div class="hero">
<div class="hero-inner">
  <div class="hero-logo"><b>mach's</b> leicht</div>
  <div class="hero-photo-wrap" id="heroPhoto" style="display:none"></div>
  <div class="hero-emoji">${emoji}</div>
  <h1><span class="hname">${name}</span> wird ${esc(age)}!</h1>
  ${motto?`<div class="hero-motto">${motto}</div>`:""}
  <div class="hero-sub">Du bist eingeladen!</div>
  ${party.date && daysLeft > 0 ?`<div class="countdown"><span class="countdown-label">Noch</span><span class="countdown-num">${daysLeft}</span><span class="countdown-label">Tage!</span></div>`:""}
</div>
</div>

<div class="wave-divider">
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style="height:50px">
    <path d="M0,0 L0,60 C240,120 480,20 720,60 C960,100 1200,30 1440,60 L1440,0 Z" fill="${t.h3}"/>
    <path d="M0,60 C240,120 480,20 720,60 C960,100 1200,30 1440,60 L1440,120 L0,120 Z" fill="${t.bg}"/>
  </svg>
</div>

<div class="content">

  ${gameUrl?`<div class="card game-card fade-up" id="gameSection">
    <div class="game-header">
      <span class="game-header-icon">\u{1F3AE}</span>
      <div>
        <div class="game-header-title">${name}s ${motto||"Party"}-Einladung</div>
        <div class="game-header-sub">Spiel das Einladungsspiel!</div>
      </div>
    </div>
    <iframe id="gameFrame" src="${gameUrl}" allow="autoplay"></iframe>
  </div>`:""}

  <div class="card fade-up fade-up-d1">
    <div class="card-title">${emoji} Party-Details</div>
    ${party.date?`<div class="info-row"><div class="info-icon">\u{1F4C5}</div><div><div class="info-label">${esc(dateStr)}</div>${party.time?`<div class="info-sub">${esc(party.time)} Uhr${party.endTime?" \u2014 "+esc(party.endTime)+" Uhr":""}</div>`:""}</div></div>`:""}
    ${party.address?`<div class="info-row" id="addrRow"><div class="info-icon">\u{1F4CD}</div><div><div class="info-label" id="addrLabel" style="color:var(--m);font-style:italic">\u{1F512} Adresse erscheint nach deiner Zusage</div><div id="addrLink"></div></div></div>`:""}
    ${party.notes?`<div class="info-row"><div class="info-icon">\u{1F4AC}</div><div><div class="info-sub" style="white-space:pre-line">${esc(party.notes)}</div></div></div>`:""}
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
      ${party.askAllergies?`<div class="field"><label>Allergien / Unvertr\u00E4glichkeiten</label><input type="text" id="rsvpAllergies" placeholder="z.B. Nussallergie" maxlength="200"></div>`:""}
      ${party.askPickup?`<div class="field"><label>Wer holt ab & wann?</label><div style="display:flex;gap:8px"><input type="text" id="rsvpPickupPerson" placeholder="z.B. Papa" style="flex:1" maxlength="50"><input type="time" id="rsvpPickupTime" style="width:110px"></div></div>`:""}
      <button class="btn" onclick="sendRsvp()" id="rsvpBtn">\u{1F4E8} Absenden</button>
      <p class="dsgvo">Deine Angaben werden nur f\u00FCr diese Party gespeichert und nach 90 Tagen automatisch gel\u00F6scht.</p>
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
  <a href="https://machsleicht.de/kindergeburtstag.html?ref=${esc(id)}" target="_blank" rel="noopener" style="display:inline-block;background:#FF6F00;color:#fff;font-weight:800;padding:13px 26px;border-radius:12px;text-decoration:none">Eigene Partyseite erstellen \u2192</a>
</div>`:""}

<div class="footer"><a href="https://machsleicht.de">machsleicht.de</a> \u00B7 <a href="https://machsleicht.de/impressum">Impressum</a> \u00B7 <a href="https://machsleicht.de/datenschutz">Datenschutz</a></div>

</div><!-- /partyContent -->

<canvas id="confettiCanvas"></canvas>

<script>
var PID="${id}",CNL="${nameLC}";
var selectedStatus=null,guestName="";
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
function checkPrev(){try{var p=localStorage.getItem("rsvp_"+PID);if(p){var d=JSON.parse(p);document.getElementById("prevName").textContent=d.name;document.getElementById("alreadyRsvp").classList.remove("hidden");document.getElementById("rsvpFields").classList.add("hidden");document.getElementById("rsvpName").value=d.name;guestName=d.name;if(d.status==="ja"&&d.address)revealAddr(d.address,d.addressIcs);}}catch(e){}}

// ── RSVP ──
function pickStatus(s,el){
  selectedStatus=s;
  document.querySelectorAll(".rsvp-btn").forEach(function(b){b.classList.remove("active","pop");});
  el.classList.add("active");void el.offsetWidth;el.classList.add("pop");
  if(s==="ja")launchConfetti(1500);
}
async function sendRsvp(){
  var rn=document.getElementById("rsvpName").value.trim();
  if(!rn){alert("Bitte Namen eingeben");return;}
  if(!selectedStatus){alert("Bitte Zu- oder Absage w\\u00E4hlen");return;}
  var btn=document.getElementById("rsvpBtn");btn.textContent="\\u23F3 Wird gesendet...";btn.disabled=true;
  var body={name:rn,status:selectedStatus};
  var al=document.getElementById("rsvpAllergies");if(al)body.allergies=al.value;
  var pp=document.getElementById("rsvpPickupPerson");if(pp)body.pickupPerson=pp.value;
  var pt=document.getElementById("rsvpPickupTime");if(pt)body.pickupTime=pt.value;
  try{
    var r=await fetch(location.origin+"/api/party/"+PID+"/rsvp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    if(!r.ok){var d=await r.json();throw new Error(d.error);}
    var okData={};try{okData=await r.json();}catch(e){}
    localStorage.setItem("rsvp_"+PID,JSON.stringify({name:rn,status:selectedStatus,address:okData.address||"",addressIcs:okData.addressIcs||""}));
    if(okData.address)revealAddr(okData.address,okData.addressIcs);  // Adresse erst nach Zusage sichtbar
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
function downloadIcs(){
  var date="${escJson(party.date)}",time="${escJson(party.time||"12:00")}",endTime="${escJson(party.endTime||"")}";
  var d=date.replace(/-/g,""),ti=time.replace(/:/g,"")+"00";
  var et;
  if(endTime){ et=endTime.replace(/:/g,"")+"00"; }
  else { var _tp=(time||"12:00").split(":"); var _eh=((parseInt(_tp[0],10)||12)+3)%24; et=String(_eh).padStart(2,"0")+((_tp[1]||"00")+"").padStart(2,"0")+"00"; }  // +3h Fallback OHNE Start-Minuten zu verwerfen (09:30 -> 12:30, nicht 12:00)
  var ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//machsleicht//party//DE","BEGIN:VEVENT",
    "DTSTART:"+d+"T"+ti,"DTEND:"+d+"T"+et,
    "SUMMARY:"+${JSON.stringify(icsEscape(party.childName?party.childName+"s Geburtstag":"Kindergeburtstag"))},
    "LOCATION:"+REVEALED_ADDR_ICS,
    "DESCRIPTION:"+${JSON.stringify(icsEscape(party.motto||"Kindergeburtstag"))},
    "END:VEVENT","END:VCALENDAR"].join("\\r\\n");
  var blob=new Blob([ics],{type:"text/calendar"});
  var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="party.ics";a.click();
}

// ── GAME COMPLETE ──
window.addEventListener("message",function(e){
  if(e.data==="gameComplete"){
    var gs=document.getElementById("gameSection");if(gs)gs.style.display="none";
    launchConfetti(3000);
    setTimeout(function(){var a=document.getElementById("rsvpAnchor");if(a)a.scrollIntoView({behavior:"smooth",block:"start"});},1200);
  }
});

// ── WISHES ──
async function loadWishes(){
  var el=document.getElementById("wishListGuest");if(!el)return;
  try{
    var r=await fetch(location.origin+"/api/party/"+PID);if(!r.ok)return;
    var data=await r.json();if(!data.wishes||!data.wishes.length)return;
    var pp=data.paypalMe||"";
    var total=data.wishes.length,claimed=0;
    data.wishes.forEach(function(w){if(!w.sharedGift&&w.isFull)claimed++;});
    var free=total-claimed;
    // Update progress
    var pc=document.getElementById("wishProgressCount");if(pc)pc.textContent=claimed+" von "+total;
    var pf=document.getElementById("wishProgressFill");if(pf)pf.style.width=(total?Math.round(claimed/total*100):0)+"%";
    var wb=document.getElementById("wishBadge");if(wb){if(free>0&&free<total)wb.textContent="Noch "+free+" frei!";else if(free===0)wb.textContent="Alle vergeben!";else wb.style.display="none";}
    // Update guest count
    var gc=data.guestCount||0;if(gc>0){var gel=document.getElementById("guestCounter");if(gel)gel.classList.remove("hidden");document.getElementById("guestCounterText").textContent="Schon "+gc+" "+(gc===1?"Kind":"Kinder")+" dabei!";}

    el.innerHTML=data.wishes.map(function(w){
      var taken=w.isFull,shared=w.sharedGift,hasLink=w.url&&w.url.indexOf("http")===0;
      var priceNum=parseFloat((w.price||"").replace(/[^0-9.,]/g,"").replace(",","."));
      var collected=w.claimedAmountTotal||0;
      var remaining=priceNum?Math.max(0,priceNum-collected):0;
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
        +(taken&&!shared?'<span class="wish-btn taken">Vergeben</span>':'<button class="wish-btn" data-suggested="'+(share||'')+'" data-shared="'+(shared?'1':'')+'" onclick="claimWish(\\x27'+w.id+'\\x27,this)">'+(shared?'Beteiligen':'Schenke ich!')+'</button>')
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
  if(isShared){
    var suggested=btn.getAttribute("data-suggested")||"";
    var input=prompt("Mit wie viel Euro beteiligst du dich?\\n(Leer lassen ist ok \\u2013 dann nur Name)", suggested);
    if(input===null)return; // Abbruch
    var amt=input.trim();
    if(amt){
      var parsed=parseFloat(amt.replace(",","."));
      if(isNaN(parsed)||parsed<=0||parsed>=9999){alert("Bitte einen g\\u00FCltigen Betrag eingeben");return;}
      body.amount=parsed;
    }
  }
  btn.textContent="\\u23F3...";btn.disabled=true;
  try{
    var r=await fetch(location.origin+"/api/party/"+PID+"/wish/"+wid+"/claim",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    if(!r.ok){var d=await r.json();alert(d.error);btn.textContent=isShared?"Beteiligen":"Schenke ich!";btn.disabled=false;return;}
    loadWishes();
  }catch(e){btn.textContent=isShared?"Beteiligen":"Schenke ich!";btn.disabled=false;}
}
function escC(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML;}
function shopLbl(u){if(!u)return"ansehen";if(/amazon[.]de/i.test(u))return"bei Amazon";if(/mytoys[.]de/i.test(u))return"bei myToys";if(/thalia[.]de/i.test(u))return"bei Thalia";if(/otto[.]de/i.test(u))return"bei Otto";if(/jako-o[.]de/i.test(u))return"bei Jako-o";if(/tausendkind[.]de/i.test(u))return"bei tausendkind";if(/smythstoys/i.test(u))return"bei Smyths Toys";if(/lego[.]com/i.test(u))return"bei LEGO";return"ansehen";}
// Preview-Modus (partyContent direkt sichtbar): load dynamische Inhalte sofort
${isPreview ? "loadPhoto();loadWishes();loadGuestCount();" : ""}
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
    <h1 style="font-size:26px;color:${color};margin-bottom:2px">${name?name+" wird "+age+"!":"Kindergeburtstag!"}</h1>
    ${motto?`<p style="font-size:16px;color:var(--m);font-weight:500">${motto}</p>`:""}
    <span class="badge" style="background:${color}15;color:${color};margin-top:8px">\u{1F511} Editor-Ansicht</span>
  </div>

  ${(()=>{
    const __dateMs = party.date ? new Date(party.date).getTime() : NaN; const daysToParty = isNaN(__dateMs) ? null : Math.ceil((__dateMs - Date.now()) / 86400000);
    const dayLabel = daysToParty === null ? null : daysToParty < 0 ? `vor ${Math.abs(daysToParty)} Tagen` : daysToParty === 0 ? "Heute!" : daysToParty === 1 ? "Morgen!" : daysToParty <= 7 ? `in ${daysToParty} Tagen` : `in ${daysToParty} Tagen`;
    const dayColor = daysToParty === null ? "var(--m)" : daysToParty < 0 ? "#888" : daysToParty <= 1 ? "#C62828" : daysToParty <= 7 ? "#E65100" : color;
    const allergenList = allergies.length ? allergies.map(g=>`${esc(g.name)}: ${esc(g.allergies)}`).join("\n") : "";
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
      <button class="btn btn-outline btn-sm" onclick="copyGuestLink()" style="flex:1;min-width:140px">\u{1F4CB} Link kopieren</button>
      <button class="btn btn-outline btn-sm" onclick="shareWA()" style="flex:1;min-width:140px">\u{1F4AC} WhatsApp teilen</button>
      <a href="${esc(guestUrl)}" target="_blank" class="btn btn-outline btn-sm" style="flex:1;min-width:140px;text-align:center;text-decoration:none">\u{1F441}️ Gäste-Ansicht</a>
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
      <div class="field"><label>Hinweise</label><textarea id="edNotes" rows="3">${esc(party.notes)}</textarea></div>
      <button class="btn" id="saveBtn" onclick="saveEdit()" style="background:${color}">\u{1F4BE} Speichern</button>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--l)">
        <p style="font-size:12px;color:var(--m);margin-bottom:8px"><strong>DSGVO:</strong> Diese Party und alle Daten (Gäste, Allergien, Fotos) werden automatisch nach 90 Tagen gelöscht. Du kannst sie auch jetzt sofort löschen — die Aktion ist endgültig und kann nicht rückgängig gemacht werden.</p>
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
          <div style="font-weight:600;font-size:14px">${esc(g.name)}</div>
          ${g.allergies?`<div style="font-size:12px;color:#C62828">\u26A0\uFE0F ${esc(g.allergies)}</div>`:""}
          ${g.pickupPerson||g.pickupTime?`<div style="font-size:12px;color:var(--m)">\u{1F697} ${esc(g.pickupPerson||"")}${g.pickupTime?" um "+esc(g.pickupTime):""}</div>`:""}
        </div>
      </div>`).join("")}
  </div>

  ${allergies.length?`<div class="card fade-up">
    <h2 style="font-size:15px;color:#C62828;margin-bottom:12px">\u26A0\uFE0F Allergien-\u00DCbersicht</h2>
    ${allergies.map(g=>`<div style="padding:6px 0;font-size:14px"><strong>${esc(g.name)}</strong>: ${esc(g.allergies)}</div>`).join("")}
  </div>`:""}

  ${hasWishes?`<div class="card fade-up">
    <h2 style="font-size:15px;color:${color};margin-bottom:12px">\u{1F381} Wunschliste</h2>
    ${party.wishes.map(w=>`
      <div class="wish-item">
        <div style="flex:1">
          <div style="font-weight:600;font-size:14px">${esc(w.title)}</div>
          <div style="font-size:12px;color:var(--m)">${w.price?esc(w.price):""}${w.sharedGift?" \u00B7 Gemeinsam":""}</div>
          ${w.claimedBy&&w.claimedBy.length?(()=>{
            const entries=w.claimedBy.map(e=>typeof e==="string"?{name:e,amount:null}:e);
            const total=entries.reduce((s,e)=>s+(typeof e.amount==="number"?e.amount:0),0);
            const label=entries.map(e=>esc(e.name)+(typeof e.amount==="number"?" ("+e.amount+"\u20AC)":"")).join(", ");
            return `<div style="font-size:12px;color:#2E7D32;font-weight:600">\u{1F381} ${label}${total>0?` \u00B7 Gesamt: ${total}\u20AC`:""}</div>`;
          })():`<div style="font-size:12px;color:var(--m);font-style:italic">Noch offen</div>`}
        </div>
        <button onclick="deleteWish('${w.id}')" style="background:none;border:none;font-size:16px;cursor:pointer;color:var(--m);padding:4px 8px" title="L\u00F6schen">\u{1F5D1}</button>
      </div>`).join("")}
    ${party.paypalMe?`<div style="font-size:12px;color:var(--m);margin-top:8px;padding:8px 0;border-top:1px solid var(--l)">\u{1F4B8} PayPal: ${esc(party.paypalMe)}</div>`:""}
  </div>`:""}
  <script>
  async function deleteWish(wid){
    if(!confirm("Wunsch wirklich l\u00F6schen?"))return;
    const editToken=new URLSearchParams(location.search).get("edit");
    const currentWishes=${JSON.stringify((party.wishes||[]).map(w=>({id:w.id,title:w.title,url:w.url,price:w.price,sharedGift:w.sharedGift,claimedBy:w.claimedBy}))).replace(/</g,"\\u003c").replace(/>/g,"\\u003e").replace(/&/g,"\\u0026")};
    const updated=currentWishes.filter(w=>w.id!==wid);
    try{
      await fetch(location.origin+"/api/party/${party.id}",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({editToken,wishes:updated})});
      location.reload();
    }catch(e){alert("Fehler: "+e.message);}
  }
  </script>

  <div class="card fade-up">
    <h2 style="font-size:15px;color:${color};margin-bottom:12px">\u{1F4F2} Link teilen</h2>
    <p style="font-size:12px;color:var(--m);margin-bottom:8px">G\u00E4ste geben \u201E<strong style="color:var(--a)">${name}</strong>\u201C als Code ein.</p>
    <div class="share-box" style="margin-bottom:10px">
      <p style="font-size:13px;font-weight:600;word-break:break-all;margin-bottom:10px">${esc(guestUrl)}</p>
      <button class="btn" style="background:${color}" onclick="shareWA()">\u{1F4F2} Per WhatsApp teilen</button>
    </div>
    <button class="btn btn-outline" style="margin-top:6px" onclick="copyLink()">\u{1F4CB} Link kopieren</button>
  </div>

  <script>
  (async function(){try{const r=await fetch(location.origin+"/api/photo/${party.id}");if(!r.ok)return;const d=await r.json();if(d.photo){const el=document.getElementById("heroPhotoEd");const im=document.createElement("img");im.src=d.photo;im.className="hero-photo";el.textContent="";el.appendChild(im);}}catch{}})();
  function shareWA(){const t="${escJson(party.mottoEmoji||"\u{1F389}")} ${party.childName?escJson(party.childName)+"s ":""}${escJson(party.motto)||"Geburtstag"}!\\n\\nAlle Infos & Zusage hier:\\n${escJson(guestUrl)}";window.open("https://wa.me/?text="+encodeURIComponent(t));}
  function copyLink(){navigator.clipboard.writeText("${esc(guestUrl)}").then(()=>{const b=event.target;b.textContent="\u2705 Kopiert!";setTimeout(()=>b.textContent="\u{1F4CB} Link kopieren",2000);});}
  function copyGuestLink(){navigator.clipboard.writeText("${esc(guestUrl)}").then(()=>{const b=event.target;const o=b.textContent;b.textContent="\u2705 Kopiert!";setTimeout(()=>b.textContent=o,2000);});}
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
      const r=await fetch(location.origin+"/api/party/${party.id}",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      if(!r.ok){const d=await r.json();throw new Error(d.error);}
      location.reload();
    }catch(e){alert("Fehler: "+e.message);btn.textContent="\u{1F4BE} Speichern";btn.disabled=false;}
  }
  function confirmDelete(){
    const childName="${escJson(party.childName||"diese Party")}";
    const confirmed=confirm("Wirklich löschen?\\n\\nDie Party \""+childName+"\" und alle zugehörigen Daten (Gäste, Allergien, Fotos, Wünsche) werden ENDGÜLTIG gelöscht.\\n\\nDiese Aktion kann nicht rückgängig gemacht werden.\\n\\nWeiter?");
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
