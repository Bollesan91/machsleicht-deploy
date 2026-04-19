// ═══════════════════════════════════════════════════════════════
// party.machsleicht.de — Cloudflare Worker + KV (v2)
// KV Namespace binding: PARTY
// Environment Variables:
//   AMAZON_TAG        (z.B. "machsleicht-21")
//   AWIN_PUBLISHER_ID (z.B. "123456")
// ═══════════════════════════════════════════════════════════════

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
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

const MOTTO_COLORS = {
  "piraten":"#8B4513","einhorn":"#E040A0","dino":"#4CAF50","feuerwehr":"#D32F2F",
  "weltraum":"#1565C0","meerjungfrau":"#00ACC1","prinzessin":"#E91E63","safari":"#F57F17",
  "detektiv":"#37474F","ritter":"#795548","superheld":"#D32F2F","zirkus":"#FF6F00",
  "baustelle":"#F57F17","frozen":"#4FC3F7","harry potter":"#7B1FA2","minecraft":"#4CAF50",
  "ninjago":"#D32F2F","paw patrol":"#1976D2","pokemon":"#FFC107","spider-man":"#D32F2F",
  "super mario":"#D32F2F","halloween":"#E65100",
};

function autoMottoColor(motto) {
  if (!motto) return "#D4812A";
  const m = motto.toLowerCase();
  for (const [key, col] of Object.entries(MOTTO_COLORS)) {
    if (m.includes(key)) return col;
  }
  return "#D4812A";
}

// ── Helpers ─────────────────────────────────────────────
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}
function generateId(len = 8) {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(len))).map(b => chars[b % chars.length]).join("");
}
function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(24))).map(b => b.toString(16).padStart(2, "0")).join("");
}
function calcTTL(partyDate) {
  const base = partyDate ? new Date(partyDate) : new Date();
  const expiry = new Date(base.getTime() + 90 * 24 * 60 * 60 * 1000);
  return Math.max(Math.floor((expiry.getTime() - Date.now()) / 1000), 86400);
}
function esc(str) {
  if (!str) return "";
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
function escJson(str) {
  if (!str) return "";
  return String(str).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r");
}

// ═══════════════════════════════════════════════════════════════
// MAIN ROUTER
// ═══════════════════════════════════════════════════════════════
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    // POST /api/create
    if (path === "/api/create" && request.method === "POST") {
      const body = await request.json();
      const id = generateId();
      const editToken = generateToken();
      const party = {
        id, editToken,
        childName: (body.childName || "").trim().slice(0,50),
        age: Math.min(Math.max(parseInt(body.age)||0,0),18)||null,
        motto: (body.motto||"").slice(0,60),
        mottoEmoji: (body.mottoEmoji||"🎉").slice(0,4),
        mottoColor: /^#[0-9a-fA-F]{6}$/.test(body.mottoColor)?body.mottoColor:"#D4812A",
        date: body.date||"", time: body.time||"", endTime: body.endTime||"",
        address: (body.address||"").slice(0,200),
        notes: (body.notes||"").slice(0,500),
        askAllergies: body.askAllergies!==false,
        askPickup: body.askPickup!==false,
        wishes: (body.wishes||[]).slice(0,MAX_WISHES).map(w=>({
          id: generateId(6), title:(w.title||"").slice(0,100), url:(w.url||"").slice(0,500),
          price:(w.price||"").slice(0,20), sharedGift:!!w.sharedGift, claimedBy:[]
        })).filter(w=>w.title),
        guests: [],
        paypalMe: (body.paypalMe||"").slice(0,100),
        created: new Date().toISOString(),
      };
      const ttl = calcTTL(party.date);
      await env.PARTY.put(`party:${id}`, JSON.stringify(party), {expirationTtl:ttl});
      if (body.photo && body.photo.length <= MAX_PHOTO_BYTES*1.37) {
        await env.PARTY.put(`photo:${id}`, body.photo, {expirationTtl:ttl});
      }
      return json({id, editToken, url:`https://party.machsleicht.de/${id}`, editUrl:`https://party.machsleicht.de/${id}?edit=${editToken}`});
    }

    // GET /api/party/:id
    if (path.match(/^\/api\/party\/[a-z0-9]+$/) && request.method === "GET") {
      const id = path.split("/")[3];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404);
      const party = JSON.parse(raw);
      const edit = url.searchParams.get("edit");
      if (edit === party.editToken) return json(party);
      const {editToken,...safe} = party;
      safe.wishes = (safe.wishes||[]).map(w=>({...w,claimedBy:undefined,claimedCount:(w.claimedBy||[]).length,isFull:!w.sharedGift&&(w.claimedBy||[]).length>0}));
      safe.guestCount = safe.guests.filter(g=>g.status==="ja").length;
      safe.guests = undefined;
      return json(safe);
    }

    // PUT /api/party/:id
    if (path.match(/^\/api\/party\/[a-z0-9]+$/) && request.method === "PUT") {
      const id = path.split("/")[3];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404);
      const party = JSON.parse(raw);
      const body = await request.json();
      if (body.editToken !== party.editToken) return json({error:"Nicht berechtigt"},403);
      ["childName","age","motto","mottoEmoji","mottoColor","date","time","endTime","address","notes","askAllergies","askPickup","paypalMe"].forEach(f=>{if(body[f]!==undefined)party[f]=body[f];});
      if (Array.isArray(body.wishes)) {
        party.wishes = body.wishes.slice(0,MAX_WISHES).map(w=>({
          id:w.id||generateId(6),title:(w.title||"").slice(0,100),url:(w.url||"").slice(0,500),
          price:(w.price||"").slice(0,20),sharedGift:!!w.sharedGift,claimedBy:w.claimedBy||[]
        }));
      }
      const ttl = calcTTL(party.date);
      if (body.photo===null) await env.PARTY.delete(`photo:${id}`);
      else if (body.photo && body.photo.length<=MAX_PHOTO_BYTES*1.37) await env.PARTY.put(`photo:${id}`,body.photo,{expirationTtl:ttl});
      await env.PARTY.put(`party:${id}`,JSON.stringify(party),{expirationTtl:ttl});
      return json({ok:true});
    }

    // POST /api/party/:id/rsvp
    if (path.match(/^\/api\/party\/[a-z0-9]+\/rsvp$/) && request.method === "POST") {
      const id = path.split("/")[3];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404);
      const party = JSON.parse(raw);
      const body = await request.json();
      const name = (body.name||"").trim().slice(0,50);
      if (!name) return json({error:"Name fehlt"},400);
      if (party.guests.length>=MAX_GUESTS && !party.guests.find(g=>g.name.toLowerCase()===name.toLowerCase()))
        return json({error:"Maximale Gästezahl erreicht"},400);
      const guest = {
        name, status:["ja","nein","vielleicht"].includes(body.status)?body.status:"ja",
        allergies:(body.allergies||"").slice(0,200), pickupTime:(body.pickupTime||"").slice(0,10),
        pickupPerson:(body.pickupPerson||"").slice(0,50), respondedAt:new Date().toISOString()
      };
      const existing = party.guests.findIndex(g=>g.name.toLowerCase()===name.toLowerCase());
      if (existing>=0) party.guests[existing]=guest; else party.guests.push(guest);
      await env.PARTY.put(`party:${id}`,JSON.stringify(party),{expirationTtl:calcTTL(party.date)});
      return json({ok:true,guestCount:party.guests.filter(g=>g.status==="ja").length});
    }

    // POST /api/party/:id/wish/:wid/claim
    if (path.match(/^\/api\/party\/[a-z0-9]+\/wish\/[a-z0-9]+\/claim$/) && request.method === "POST") {
      const parts = path.split("/");
      const id=parts[3], wishId=parts[5];
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return json({error:"Party nicht gefunden"},404);
      const party = JSON.parse(raw);
      const body = await request.json();
      const guestName = (body.name||"").trim();
      if (!guestName) return json({error:"Name fehlt"},400);
      const wish = (party.wishes||[]).find(w=>w.id===wishId);
      if (!wish) return json({error:"Wunsch nicht gefunden"},404);
      if (!wish.sharedGift && wish.claimedBy.length>0 && !wish.claimedBy.find(n=>n.toLowerCase()===guestName.toLowerCase()))
        return json({error:"Bereits vergeben"},400);
      const idx = wish.claimedBy.findIndex(n=>n.toLowerCase()===guestName.toLowerCase());
      if (idx>=0) wish.claimedBy.splice(idx,1); else wish.claimedBy.push(guestName);
      await env.PARTY.put(`party:${id}`,JSON.stringify(party),{expirationTtl:calcTTL(party.date)});
      return json({ok:true,claimedBy:wish.claimedBy,claimedCount:wish.claimedBy.length});
    }

    // GET /api/photo/:id
    if (path.match(/^\/api\/photo\/[a-z0-9]+$/) && request.method === "GET") {
      const id = path.split("/")[3];
      const photo = await env.PARTY.get(`photo:${id}`);
      if (!photo) return json({error:"Kein Foto"},404);
      return json({photo});
    }

    // Affiliate Redirect /go/:partyId/:wishId
    if (path.match(/^\/go\/[a-z0-9]+\/[a-z0-9]+$/) && request.method === "GET") {
      const parts = path.split("/");
      const partyId=parts[2], wishId=parts[3];
      const raw = await env.PARTY.get(`party:${partyId}`);
      if (!raw) return Response.redirect("https://machsleicht.de",302);
      const party = JSON.parse(raw);
      const wish = (party.wishes||[]).find(w=>w.id===wishId);
      if (!wish||!wish.url) return Response.redirect("https://machsleicht.de",302);
      return Response.redirect(affiliateUrl(wish.url,env),302);
    }

    // Frontend: Home
    if (path==="/"||path==="") return new Response(creatorPage(),{headers:{"Content-Type":"text/html;charset=utf-8"}});

    // Frontend: Party
    if (path.match(/^\/[a-z0-9]{6,12}$/)) {
      const id = path.slice(1);
      const raw = await env.PARTY.get(`party:${id}`);
      if (!raw) return new Response(notFoundPage(),{status:404,headers:{"Content-Type":"text/html;charset=utf-8"}});
      const party = JSON.parse(raw);
      const isEditor = url.searchParams.get("edit")===party.editToken;
      return new Response(partyPage(party,isEditor),{headers:{"Content-Type":"text/html;charset=utf-8"}});
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
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
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
.card{background:var(--card);border-radius:20px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.04);border:1px solid var(--l);margin-top:12px}
input,textarea{width:100%;padding:10px 14px;border:2px solid var(--l);border-radius:12px;font:400 15px var(--f);color:var(--d);background:#FAFAF5;outline:none;transition:border .2s}
input:focus,textarea:focus{border-color:var(--a)}
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
.hero-photo{width:100%;max-height:240px;object-fit:cover;border-radius:16px;margin-bottom:12px}
.info-row{display:flex;gap:10px;align-items:flex-start;margin-bottom:10px}
.info-row .icon{font-size:20px;flex-shrink:0;width:28px;text-align:center}
.footer{text-align:center;padding:20px 0;font-size:11px;color:var(--m)}
.footer a{color:var(--m);text-decoration:none}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes cFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}
.fade-up{animation:fadeUp .4s ease both}
#gameFrame{height:min(70vh,560px)}
.hidden{display:none!important}
</style>
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
    <div class="field"><label>Vorname</label><input type="text" id="childName" placeholder="z.B. Emma" maxlength="50"></div>
    <div class="field"><label>Wird wie alt?</label><input type="number" id="age" min="1" max="18" placeholder="z.B. 6"></div>
    <div class="field"><label>Motto (optional)</label>
      <div style="display:flex;gap:8px">
        <input type="text" id="mottoEmoji" style="width:56px;text-align:center;font-size:22px" placeholder="\u{1F389}" maxlength="4">
        <input type="text" id="motto" placeholder="z.B. Piraten-Party" style="flex:1" maxlength="60">
      </div>
    </div>
    <div class="field"><label>Foto (optional, max 500KB)</label>
      <input type="file" id="photoInput" accept="image/*" style="font-size:13px">
      <img id="photoPreview" class="hidden" style="width:100%;max-height:200px;object-fit:cover;border-radius:12px;margin-top:8px">
      <button id="photoRemove" class="hidden" onclick="photoData=null;document.getElementById('photoInput').value='';document.getElementById('photoPreview').classList.add('hidden');this.classList.add('hidden')" style="background:none;border:1px solid var(--l);border-radius:8px;padding:6px 12px;font-size:12px;color:var(--m);cursor:pointer;margin-top:6px">\u00D7 Foto entfernen</button>
    </div>
    <button class="btn" onclick="goStep(2)">Weiter \u2192</button>
  </div>

  <div class="card fade-up hidden" id="step2">
    <h2 style="font-size:16px;margin-bottom:14px">2. Wann & Wo</h2>
    <div style="display:flex;gap:8px" class="field">
      <div style="flex:1"><label>Datum</label><input type="date" id="date"></div>
      <div style="flex:1"><label>Uhrzeit</label><input type="time" id="time"></div>
    </div>
    <div class="field"><label>Ende ca.</label><input type="time" id="endTime"></div>
    <div class="field"><label>Adresse</label><textarea id="address" rows="2" placeholder="Stra\u00DFe, PLZ Ort" maxlength="200"></textarea></div>
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
    <div class="share-box" style="margin-bottom:12px">
      <p style="font-size:12px;color:var(--a);font-weight:600;margin-bottom:6px">G\u00C4STE-LINK</p>
      <p style="font-size:14px;font-weight:700;word-break:break-all" id="guestUrl"></p>
      <button class="btn" style="margin-top:10px" onclick="shareGuest()">\u{1F4F2} Per WhatsApp teilen</button>
    </div>
    <div style="margin-bottom:12px">
      <p style="font-size:12px;color:var(--m);font-weight:600;margin-bottom:6px">DEIN EDIT-LINK (nur f\u00FCr dich!)</p>
      <p style="font-size:13px;color:var(--m);word-break:break-all" id="editUrl"></p>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="btn btn-outline btn-sm" onclick="copyEdit()" style="flex:1">\u{1F4CB} Kopieren</button>
        <a class="btn btn-outline btn-sm" id="mailtoLink" href="#" style="flex:1">\u{1F4E7} Per E-Mail</a>
      </div>
    </div>
    <p style="font-size:12px;color:var(--m);text-align:center;margin-top:12px">\u26A0\uFE0F Speichere den Edit-Link! Nur damit kannst du Zusagen sehen.</p>
  </div>

  <div class="footer"><a href="https://machsleicht.de">machsleicht.de</a> \u00B7 <a href="https://machsleicht.de/impressum">Impressum</a> \u00B7 <a href="https://machsleicht.de/datenschutz">Datenschutz</a></div>
</div>
<script>
const API=location.origin+"/api";
let photoData=null,wishes=[];
function goStep(n){
  if(n===3){var t=document.getElementById("time").value,et=document.getElementById("endTime").value;if(t&&et&&et<=t){alert("Ende-Uhrzeit muss nach der Startzeit liegen");return;}}
  var steps=[1,2,3];steps.forEach(function(i){document.getElementById("step"+i).classList.toggle("hidden",i!==n);});window.scrollTo({top:0,behavior:"smooth"});
}
document.getElementById("photoInput").addEventListener("change",function(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=function(ev){
    const img=new Image();img.onload=function(){
      const canvas=document.createElement("canvas");const max=800;
      let w=img.width,h=img.height;if(w>max||h>max){const r=Math.min(max/w,max/h);w*=r;h*=r;}
      canvas.width=w;canvas.height=h;canvas.getContext("2d").drawImage(img,0,0,w,h);
      photoData=canvas.toDataURL("image/jpeg",0.7);
      const prev=document.getElementById("photoPreview");prev.src=photoData;prev.classList.remove("hidden");
      document.getElementById("photoRemove").classList.remove("hidden");
    };img.src=ev.target.result;
  };reader.readAsDataURL(file);
});
function addWish(){
  if(wishes.length>=20){alert("Max. 20 W\u00FCnsche");return;}
  wishes.push({id:"w"+Date.now().toString(36),title:"",url:"",price:"",sharedGift:false});renderWishes();
}
function removeWish(id){wishes=wishes.filter(w=>w.id!==id);renderWishes();}
function renderWishes(){
  document.getElementById("wishList").innerHTML=wishes.map(function(w,i){
    return '<div style="border:1px solid var(--l);border-radius:12px;padding:12px;margin-bottom:8px;position:relative">'
      +'<button onclick="removeWish(\\x27'+w.id+'\\x27)" style="position:absolute;top:8px;right:8px;background:none;border:none;font-size:18px;cursor:pointer;color:var(--m)">\u00D7</button>'
      +'<div class="field"><label>Geschenk '+(i+1)+'</label><input type="text" placeholder="z.B. LEGO City" oninput="wishes.find(x=>x.id===\\x27'+w.id+'\\x27).title=this.value" value="'+w.title+'"></div>'
      +'<div class="field"><label>Link (optional)</label><input type="url" placeholder="https://amazon.de/..." oninput="wishes.find(x=>x.id===\\x27'+w.id+'\\x27).url=this.value" value="'+w.url+'"></div>'
      +'<div style="display:flex;gap:8px">'
      +'<div class="field" style="flex:1"><label>Preis ca.</label><input type="text" placeholder="z.B. 29\u20AC" oninput="wishes.find(x=>x.id===\\x27'+w.id+'\\x27).price=this.value" value="'+w.price+'"></div>'
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
  const childName=document.getElementById("childName").value.trim();
  if(!childName){alert("Bitte Vornamen eingeben");goStep(1);return;}
  const btn=document.getElementById("createBtn");btn.textContent="\u23F3 Wird erstellt...";btn.disabled=true;
  try{
    const body={childName,age:parseInt(document.getElementById("age").value)||null,
      motto:document.getElementById("motto").value,mottoEmoji:document.getElementById("mottoEmoji").value||"\u{1F389}",
      mottoColor:new URLSearchParams(location.search).get("mottoColor")||autoColor(document.getElementById("motto").value),
      date:document.getElementById("date").value,time:document.getElementById("time").value,
      endTime:document.getElementById("endTime").value,address:document.getElementById("address").value,
      notes:document.getElementById("notes").value,askAllergies:document.getElementById("askAllergies").checked,
      askPickup:document.getElementById("askPickup").checked,wishes:wishes.filter(w=>w.title.trim()),photo:photoData,
      paypalMe:(document.getElementById("paypalMe")||{}).value||""};
    const res=await fetch(API+"/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    const data=await res.json();if(!res.ok)throw new Error(data.error||"Fehler");
    document.getElementById("guestUrl").textContent=data.url;
    document.getElementById("editUrl").textContent=data.editUrl;
    document.getElementById("codeHint").textContent=childName;
    document.getElementById("mailtoLink").href="mailto:?subject="+encodeURIComponent("Edit-Link: "+childName+"s Partyseite")+"&body="+encodeURIComponent("Dein Edit-Link:\\n"+data.editUrl+"\\n\\nG\u00E4ste-Link:\\n"+data.url);
    [1,2,3].forEach(i=>document.getElementById("step"+i).classList.add("hidden"));
    document.getElementById("result").classList.remove("hidden");
    window._pd={...data,childName,motto:document.getElementById("motto").value};
    window.scrollTo({top:0,behavior:"smooth"});
  }catch(e){alert("Fehler: "+e.message);btn.textContent="\u{1F389} Erstellen";btn.disabled=false;}
}
function shareGuest(){const d=window._pd;const hasW=wishes.some(w=>w.title.trim());const t=(d.motto?d.childName+"s "+d.motto:d.childName+"s Geburtstag")+"! \u{1F389}\\n\\n"+(hasW?"Hier sind alle Infos inkl. Wunschliste, damit wir Doppelgeschenke vermeiden:":"Alle Infos & Zusage hier:")+"\\n"+d.url;window.open("https://wa.me/?text="+encodeURIComponent(t));}
function copyEdit(){navigator.clipboard.writeText(window._pd.editUrl).then(()=>{const b=event.target;b.textContent="\u2705 Kopiert!";setTimeout(()=>b.textContent="\u{1F4CB} Kopieren",2000);});}
const MC={"piraten":"#8B4513","einhorn":"#E040A0","dino":"#4CAF50","feuerwehr":"#D32F2F","weltraum":"#1565C0","meerjungfrau":"#00ACC1","prinzessin":"#E91E63","safari":"#F57F17","detektiv":"#37474F","superheld":"#D32F2F","zirkus":"#FF6F00","baustelle":"#F57F17","frozen":"#4FC3F7","minecraft":"#4CAF50","ninjago":"#D32F2F","paw patrol":"#1976D2","pokemon":"#FFC107","spider-man":"#D32F2F","super mario":"#D32F2F","halloween":"#E65100"};
function autoColor(m){if(!m)return"#D4812A";m=m.toLowerCase();for(const[k,c]of Object.entries(MC)){if(m.includes(k))return c;}return"#D4812A";}
(function(){const p=new URLSearchParams(location.search);["childName","age","motto","mottoEmoji"].forEach(k=>{const v=p.get(k);if(v&&document.getElementById(k))document.getElementById(k).value=v;});})();
</script>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════
// PARTY PAGE (delegates to guest or editor)
// ═══════════════════════════════════════════════════════════════
function partyPage(party, isEditor) {
  const color = party.mottoColor || "#D4812A";
  const name = esc(party.childName);
  const age = party.age || "";
  const motto = esc(party.motto);
  const emoji = esc(party.mottoEmoji || "\u{1F389}");
  const dateStr = party.date ? new Date(party.date+"T00:00:00").toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long",year:"numeric"}) : "";
  const ogTitle = name ? `${name} wird ${age}! ${emoji}` : "Kindergeburtstag! \u{1F389}";
  const ogDesc = motto ? `${motto} \u2014 Zu-/Absage, Infos & Wunschliste` : "Alle Party-Infos auf einer Seite";
  const ogUrl = `https://party.machsleicht.de/${party.id}`;

  return `${baseHead(ogTitle+" \u2014 mach\u2019s leicht", ogDesc, color, ogUrl)}
<body>
<div class="container">
  <div class="logo"><a href="https://machsleicht.de"><b>mach's</b> leicht</a></div>
  ${isEditor ? editorView(party,color,dateStr,name,age,motto,emoji,ogUrl) : guestView(party,color,dateStr,name,age,motto,emoji)}
  <div class="footer"><a href="https://machsleicht.de">machsleicht.de</a> \u00B7 <a href="https://machsleicht.de/impressum">Impressum</a> \u00B7 <a href="https://machsleicht.de/datenschutz">Datenschutz</a></div>
</div>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════
// GUEST VIEW (with code gate)
// ═══════════════════════════════════════════════════════════════
function guestView(party, color, dateStr, name, age, motto, emoji) {
  const id = party.id;
  const nameLC = escJson(party.childName.toLowerCase().trim());
  const hasWishes = party.wishes && party.wishes.length > 0;
  const freeWishes = hasWishes ? party.wishes.filter(w => !w.isFull || w.sharedGift).length : 0;

  // Embedded game: map motto to game URL
  const GAME_MOTTOS = ["piraten","dino","safari","weltraum","detektiv","superheld","prinzessin","einhorn","meerjungfrau","feuerwehr"];
  const mottoLC = (party.motto||"").toLowerCase();
  const gameMottoId = GAME_MOTTOS.find(m => mottoLC.includes(m));
  const gameUrl = gameMottoId ? `/einladung/${gameMottoId}/?name=${encodeURIComponent(party.childName)}&date=${encodeURIComponent(party.date||"")}&time=${encodeURIComponent(party.time||"")}&ort=${encodeURIComponent(party.address||"")}&tel=${encodeURIComponent("")}${party.foto?"&foto="+encodeURIComponent(party.foto):""}` : "";

  return `
  <div class="card fade-up" id="codeGate" style="text-align:center;padding:28px 20px">
    <div style="font-size:48px;margin-bottom:12px">${emoji}</div>
    <h1 style="font-size:20px;margin-bottom:4px">Du bist eingeladen!</h1>
    <p style="color:var(--m);font-size:14px;margin-bottom:20px">Wie hei\u00DFt das Geburtstagskind?</p>
    <div class="field"><input type="text" id="codeInput" placeholder="Vorname eingeben" autocomplete="off" style="text-align:center;font-size:18px"></div>
    <button class="btn" style="background:${color}" onclick="checkCode()">\u{1F513} \u00D6ffnen</button>
    <p id="codeError" class="hidden" style="color:#C62828;font-size:13px;margin-top:10px">Hmm, das stimmt nicht. Frag nochmal die Eltern! \u{1F60A}</p>
  </div>

  <div id="partyContent" class="hidden">
    <div class="card fade-up" style="text-align:center;padding:28px 20px;border:2px solid ${color}30;background:${color}06;overflow:hidden">
      <div id="heroPhoto"></div>
      <div style="font-size:56px;margin-bottom:8px">${emoji}</div>
      <h1 style="font-size:26px;color:${color};margin-bottom:2px">${name?name+" wird "+age+"!":"Kindergeburtstag!"}</h1>
      ${motto?`<p style="font-size:16px;color:var(--m);font-weight:500">${motto}</p>`:""}
      <p style="font-size:13px;color:var(--m);margin-top:8px;opacity:0.8">Spiel spielen, zusagen${hasWishes?", Geschenk reservieren":""} \u2014 alles hier.</p>
    </div>

    ${gameUrl?`<div class="card fade-up" id="gameSection" style="padding:0;overflow:hidden;border:2px solid ${color}20">
      <div style="background:${color}12;padding:10px 16px;display:flex;align-items:center;gap:8px">
        <span style="font-size:18px">\u{1F3AE}</span>
        <div style="flex:1"><div style="font-size:13px;font-weight:800">${esc(party.childName)}s ${motto||"Party"}-Einladung</div>
        <div style="font-size:11px;color:var(--m);opacity:.6">Spiel das Einladungsspiel!</div></div>
      </div>
      <iframe id="gameFrame" src="${gameUrl}" style="width:100%;height:min(70vh,560px);border:none;display:block" allow="autoplay"></iframe>
    </div>
    <div class="card fade-up hidden" id="gameComplete" style="text-align:center;padding:20px;border:2px solid ${color}30;background:${color}06">
      <div style="font-size:44px;margin-bottom:6px">${emoji}</div>
      <h2 style="font-size:16px;color:${color};font-weight:800;margin-bottom:4px">Geschafft! \u{1F389}</h2>
      <p style="font-size:13px;color:var(--m);opacity:.7">Jetzt noch zusagen und ein Geschenk reservieren \u2193</p>
    </div>`:""}

    <div id="rsvpAnchor"></div>
    <div class="card fade-up">
      <h2 style="font-size:15px;color:${color};margin-bottom:12px">\u{1F4CB} Party-Details</h2>
      ${party.date?`<div class="info-row"><span class="icon">\u{1F4C5}</span><div><div style="font-weight:700;font-size:14px">${esc(dateStr)}</div>${party.time?`<div style="color:var(--m);font-size:13px">${esc(party.time)} Uhr${party.endTime?" \u2014 "+esc(party.endTime)+" Uhr":""}</div>`:""}</div></div>`:""}
      ${party.address?`<div class="info-row"><span class="icon">\u{1F4CD}</span><div><div style="color:var(--m);font-size:13px;white-space:pre-line">${esc(party.address)}</div><a href="https://maps.google.com/?q=${encodeURIComponent(party.address)}" target="_blank" rel="noopener" style="font-size:12px;color:${color};font-weight:600;text-decoration:none">\u2192 Google Maps</a></div></div>`:""}
      ${party.notes?`<div class="info-row"><span class="icon">\u{1F4AC}</span><div style="color:var(--m);font-size:13px;white-space:pre-line">${esc(party.notes)}</div></div>`:""}
    </div>

    <div class="card fade-up" id="rsvpForm">
      <h2 style="font-size:15px;color:${color};margin-bottom:12px">\u{1F389} Zu- oder Absage</h2>
      <div id="alreadyRsvp" class="hidden" style="text-align:center;padding:8px 0 12px">
        <p style="font-size:14px;color:var(--m)">Du hast bereits f\u00FCr <strong id="prevName"></strong> geantwortet.</p>
        <button class="btn btn-outline btn-sm" onclick="document.getElementById('alreadyRsvp').classList.add('hidden');document.getElementById('rsvpFields').classList.remove('hidden')" style="margin-top:8px">Antwort \u00E4ndern</button>
      </div>
      <div id="rsvpFields">
        <div class="field"><label>Name deines Kindes</label><input type="text" id="rsvpName" placeholder="z.B. Lina" maxlength="50"></div>
        <div style="display:flex;gap:8px;margin-bottom:14px">
          <button class="rsvp-btn" style="flex:1" onclick="pickStatus('ja',this)">\u2705 Dabei!</button>
          <button class="rsvp-btn" style="flex:1" onclick="pickStatus('vielleicht',this)">\u{1F914} Vielleicht</button>
          <button class="rsvp-btn" style="flex:1" onclick="pickStatus('nein',this)">\u274C Nein</button>
        </div>
        ${party.askAllergies?`<div class="field"><label>Allergien / Unvertr\u00E4glichkeiten</label><input type="text" id="rsvpAllergies" placeholder="z.B. Nussallergie" maxlength="200"></div>`:""}
        ${party.askPickup?`<div class="field"><label>Wer holt ab & wann?</label><div style="display:flex;gap:8px"><input type="text" id="rsvpPickupPerson" placeholder="z.B. Papa" style="flex:1" maxlength="50"><input type="time" id="rsvpPickupTime" style="width:110px"></div></div>`:""}
        <button class="btn" onclick="sendRsvp()" id="rsvpBtn" style="background:${color}">\u{1F4E8} Absenden</button>
        <p style="font-size:11px;color:var(--m);text-align:center;margin-top:8px;line-height:1.5">Deine Angaben werden nur f\u00FCr diese Party gespeichert und nach 90 Tagen automatisch gel\u00F6scht.</p>
      </div>
    </div>
    <div class="card fade-up hidden" id="rsvpDone" style="text-align:center;padding:24px">
      <div style="font-size:48px;margin-bottom:8px" id="rsvpDoneEmoji">\u{1F389}</div>
      <h2 style="font-size:18px" id="rsvpMsg">Danke!</h2>
      <p style="color:var(--m);font-size:13px;margin-top:4px" id="rsvpSub"></p>
      ${party.date?`<button class="btn btn-outline btn-sm" style="margin-top:16px" onclick="downloadIcs()">\u{1F4C5} Termin speichern</button>`:""}
    </div>

    ${hasWishes?`<div class="card fade-up">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <h2 style="font-size:15px;color:${color};margin-bottom:0">\u{1F381} Wunschliste</h2>
        ${freeWishes>0&&freeWishes<(party.wishes||[]).length?`<span style="padding:3px 10px;background:#FF704320;border:1px solid #FF704340;border-radius:99px;font-size:11px;font-weight:700;color:#FF7043">Noch ${freeWishes} frei!</span>`:""}
      </div>
      <p style="font-size:12px;color:var(--m);margin-bottom:12px">Reserviere ein Geschenk \u2014 andere G\u00E4ste sehen nur, dass es vergeben ist.</p>
      <div id="wishListGuest"></div>
    </div>`:""}
  </div>

  <script>
  const PID="${id}",CNL="${nameLC}";
  let selectedStatus=null,guestName="";
  // Game complete listener
  window.addEventListener("message",function(e){
    if(e.data==="gameComplete"){
      var gs=document.getElementById("gameSection");if(gs)gs.style.display="none";
      var gc=document.getElementById("gameComplete");if(gc)gc.classList.remove("hidden");
      setTimeout(function(){var a=document.getElementById("rsvpAnchor");if(a)a.scrollIntoView({behavior:"smooth",block:"start"});},800);
    }
  });
  // Confetti
  function fireConfetti(){
    var c=document.createElement("div");c.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden";
    for(var i=0;i<35;i++){var p=document.createElement("div");var colors=["#66BB6A","#FFD700","#FF7043","#42A5F5","#E040FB","#FF5252","#4DD0E1"];
    p.style.cssText="position:absolute;top:-10px;left:"+Math.random()*100+"%;width:"+(5+Math.random()*6)+"px;height:"+(5+Math.random()*6)+"px;background:"+colors[i%7]+";border-radius:"+(Math.random()>.5?"50%":"2px")+";animation:cFall "+(1.8+Math.random()*1.2)+"s ease-in "+Math.random()*0.5+"s forwards";
    c.appendChild(p);}document.body.appendChild(c);setTimeout(function(){c.remove()},4000);
  }
  function checkCode(){
    const v=document.getElementById("codeInput").value.trim().toLowerCase();
    if(v===CNL){document.getElementById("codeGate").classList.add("hidden");document.getElementById("partyContent").classList.remove("hidden");loadPhoto();loadWishes();checkPrev();}
    else{document.getElementById("codeError").classList.remove("hidden");document.getElementById("codeInput").style.borderColor="#C62828";}
  }
  document.getElementById("codeInput").addEventListener("keydown",e=>{if(e.key==="Enter")checkCode();});
  async function loadPhoto(){try{const r=await fetch(location.origin+"/api/photo/"+PID);if(!r.ok)return;const d=await r.json();if(d.photo)document.getElementById("heroPhoto").innerHTML='<img src="'+d.photo+'" class="hero-photo">';}catch{}}
  function checkPrev(){try{const p=localStorage.getItem("rsvp_"+PID);if(p){const d=JSON.parse(p);document.getElementById("prevName").textContent=d.name;document.getElementById("alreadyRsvp").classList.remove("hidden");document.getElementById("rsvpFields").classList.add("hidden");document.getElementById("rsvpName").value=d.name;guestName=d.name;}}catch{}}
  function pickStatus(s,el){selectedStatus=s;document.querySelectorAll(".rsvp-btn").forEach(b=>b.classList.remove("active"));el.classList.add("active");}
  async function sendRsvp(){
    const name=document.getElementById("rsvpName").value.trim();
    if(!name){alert("Bitte Namen eingeben");return;}
    if(!selectedStatus){alert("Bitte Zu- oder Absage w\u00E4hlen");return;}
    const btn=document.getElementById("rsvpBtn");btn.textContent="\u23F3...";btn.disabled=true;
    const body={name,status:selectedStatus};
    const al=document.getElementById("rsvpAllergies");if(al)body.allergies=al.value;
    const pp=document.getElementById("rsvpPickupPerson");if(pp)body.pickupPerson=pp.value;
    const pt=document.getElementById("rsvpPickupTime");if(pt)body.pickupTime=pt.value;
    try{
      const r=await fetch(location.origin+"/api/party/"+PID+"/rsvp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      if(!r.ok){const d=await r.json();throw new Error(d.error);}
      localStorage.setItem("rsvp_"+PID,JSON.stringify({name,status:selectedStatus}));
      guestName=name;
      document.getElementById("rsvpForm").classList.add("hidden");
      document.getElementById("rsvpDone").classList.remove("hidden");
      const msgs={ja:["\u{1F389}","Super, "+name+" ist dabei!","Wir freuen uns!"],vielleicht:["\u{1F914}","Alles klar!","Wir hoffen ihr k\u00F6nnt kommen!"],nein:["\u{1F622}","Schade!","Vielleicht beim n\u00E4chsten Mal."]};
      const m=msgs[selectedStatus];
      document.getElementById("rsvpDoneEmoji").textContent=m[0];
      document.getElementById("rsvpMsg").textContent=m[1];
      document.getElementById("rsvpSub").textContent=m[2];
      if(selectedStatus==="ja")fireConfetti();
      loadWishes();
    }catch(e){alert("Fehler: "+e.message);btn.textContent="\u{1F4E8} Absenden";btn.disabled=false;}
  }
  function downloadIcs(){
    const date="${escJson(party.date)}",time="${escJson(party.time||"12:00")}",endTime="${escJson(party.endTime||"")}";
    const d=date.replace(/-/g,""),t=time.replace(/:/g,"")+"00";
    const et=endTime?endTime.replace(/:/g,"")+"00":(parseInt(time)+3+"").padStart(2,"0")+"0000";
    const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//machsleicht//party//DE","BEGIN:VEVENT",
      "DTSTART:"+d+"T"+t,"DTEND:"+d+"T"+et,
      "SUMMARY:${escJson(party.childName?party.childName+"s Geburtstag":"Kindergeburtstag")}",
      "LOCATION:${escJson(party.address||"")}",
      "DESCRIPTION:${escJson(party.motto||"Kindergeburtstag")}",
      "END:VEVENT","END:VCALENDAR"].join("\\r\\n");
    const blob=new Blob([ics],{type:"text/calendar"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="party.ics";a.click();
  }
  async function loadWishes(){
    const el=document.getElementById("wishListGuest");if(!el)return;
    try{
      const r=await fetch(location.origin+"/api/party/"+PID);if(!r.ok)return;
      const data=await r.json();if(!data.wishes||!data.wishes.length)return;
      const pp=data.paypalMe||"";
      el.innerHTML=data.wishes.map(w=>{
        const taken=w.isFull,shared=w.sharedGift,hasLink=w.url&&w.url.startsWith("http");
        const priceNum=parseFloat((w.price||"").replace(/[^\d.,]/g,"").replace(",","."));
        const share=shared&&w.claimedCount&&priceNum?Math.ceil(priceNum/(w.claimedCount+1)):0;
        const ppRaw=pp.startsWith("http")?pp:"https://"+pp;
        const ppUrl=pp&&share?ppRaw.replace(/\/$/,"")+"/"+(share<1?"":share):"";
        return '<div class="wish-item" style="flex-wrap:wrap"><div style="flex:1;min-width:0"><div style="font-weight:600;font-size:14px">'+escC(w.title)+'</div><div style="font-size:12px;color:var(--m)">'
          +(w.price?escC(w.price)+' \u00B7 ':'')
          +(shared?'Gemeinsam schenken'+(w.claimedCount?' ('+w.claimedCount+' dabei)':''):'')
          +(!shared&&taken?'\u2705 Vergeben':'')
          +'</div>'
          +(shared&&share?'<div style="font-size:12px;color:var(--a);font-weight:600">\u{1F4B8} Dein Anteil: ~'+share+'\u20AC</div>':'')
          +(hasLink?'<a href="'+location.origin+'/go/'+PID+'/'+w.id+'" target="_blank" rel="noopener" style="font-size:12px;color:var(--a);font-weight:600">\u2192 '+shopLbl(w.url)+'</a>':'')
          +'</div>'
          +(taken&&!shared?'<span class="wish-claim taken">Vergeben</span>':'<button class="wish-claim" onclick="claimWish(\''+w.id+'\',this)">'+(shared?'Beteiligen':'Schenke ich!')+'</button>')
          +(shared&&ppUrl&&w.claimedCount?'<div style="width:100%;margin-top:6px"><a href="'+ppUrl+'" target="_blank" rel="noopener" class="btn btn-sm" style="background:#0070BA;font-size:12px;width:100%">\u{1F4B8} '+share+'\u20AC per PayPal senden</a></div>':'')
          +'</div>';
      }).join("");
      el.innerHTML+=\`<p style="font-size:10px;color:var(--m);margin-top:10px;text-align:center">Links enthalten ggf. Affiliate-Links. F\u00FCr dich \u00E4ndert sich nichts am Preis.</p>\`;
    }catch{}
  }
  async function claimWish(wid,btn){
    const name=guestName||document.getElementById("rsvpName").value.trim();
    if(!name){alert("Bitte zuerst oben deinen Namen eingeben");return;}
    btn.textContent="\u23F3...";btn.disabled=true;
    try{
      const r=await fetch(location.origin+"/api/party/"+PID+"/wish/"+wid+"/claim",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name})});
      if(!r.ok){const d=await r.json();alert(d.error);btn.textContent="Schenke ich!";btn.disabled=false;return;}
      loadWishes();
    }catch{btn.textContent="Schenke ich!";btn.disabled=false;}
  }
  function escC(s){const d=document.createElement("div");d.textContent=s;return d.innerHTML;}
  function shopLbl(u){if(!u)return"ansehen";if(/amazon\.de/i.test(u))return"bei Amazon";if(/mytoys\.de/i.test(u))return"bei myToys";if(/thalia\.de/i.test(u))return"bei Thalia";if(/otto\.de/i.test(u))return"bei Otto";if(/jako-o\.de/i.test(u))return"bei Jako-o";if(/tausendkind\.de/i.test(u))return"bei tausendkind";if(/smythstoys/i.test(u))return"bei Smyths Toys";if(/lego\.com/i.test(u))return"bei LEGO";return"ansehen";}
  </script>`;
}

// ═══════════════════════════════════════════════════════════════
// EDITOR VIEW
// ═══════════════════════════════════════════════════════════════
function editorView(party, color, dateStr, name, age, motto, emoji, guestUrl) {
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
      <div class="field"><label>Alter</label><input type="number" id="edAge" value="${party.age||""}"></div>
      <div class="field"><label>Motto</label><input type="text" id="edMotto" value="${esc(party.motto)}"></div>
      <div style="display:flex;gap:8px" class="field">
        <div style="flex:1"><label>Datum</label><input type="date" id="edDate" value="${esc(party.date)}"></div>
        <div style="flex:1"><label>Uhrzeit</label><input type="time" id="edTime" value="${esc(party.time)}"></div>
      </div>
      <div class="field"><label>Ende ca.</label><input type="time" id="edEndTime" value="${esc(party.endTime)}"></div>
      <div class="field"><label>Adresse</label><textarea id="edAddress" rows="2">${esc(party.address)}</textarea></div>
      <div class="field"><label>Hinweise</label><textarea id="edNotes" rows="3">${esc(party.notes)}</textarea></div>
      <button class="btn" id="saveBtn" onclick="saveEdit()" style="background:${color}">\u{1F4BE} Speichern</button>
    </div>
  </div>

  <div class="card fade-up">
    <h2 style="font-size:15px;color:${color};margin-bottom:12px">\u{1F4CA} Zusagen</h2>
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
          ${w.claimedBy&&w.claimedBy.length?`<div style="font-size:12px;color:#2E7D32;font-weight:600">\u{1F381} ${w.claimedBy.map(n=>esc(n)).join(", ")}</div>`:`<div style="font-size:12px;color:var(--m);font-style:italic">Noch offen</div>`}
        </div>
        <button onclick="deleteWish('${w.id}')" style="background:none;border:none;font-size:16px;cursor:pointer;color:var(--m);padding:4px 8px" title="L\u00F6schen">\u{1F5D1}</button>
      </div>`).join("")}
    ${party.paypalMe?`<div style="font-size:12px;color:var(--m);margin-top:8px;padding:8px 0;border-top:1px solid var(--l)">\u{1F4B8} PayPal: ${esc(party.paypalMe)}</div>`:""}
  </div>`:""}
  <script>
  async function deleteWish(wid){
    if(!confirm("Wunsch wirklich l\u00F6schen?"))return;
    const editToken=new URLSearchParams(location.search).get("edit");
    const currentWishes=${JSON.stringify((party.wishes||[]).map(w=>({id:w.id,title:w.title,url:w.url,price:w.price,sharedGift:w.sharedGift,claimedBy:w.claimedBy})))};
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
  (async function(){try{const r=await fetch(location.origin+"/api/photo/${party.id}");if(!r.ok)return;const d=await r.json();if(d.photo)document.getElementById("heroPhotoEd").innerHTML='<img src="'+d.photo+'" class="hero-photo">';}catch{}})();
  function shareWA(){const t="${esc(party.mottoEmoji||"\u{1F389}")} ${name?name+"s ":""}${motto||"Geburtstag"}!\\n\\nAlle Infos & Zusage hier:\\n${esc(guestUrl)}";window.open("https://wa.me/?text="+encodeURIComponent(t));}
  function copyLink(){navigator.clipboard.writeText("${esc(guestUrl)}").then(()=>{const b=event.target;b.textContent="\u2705 Kopiert!";setTimeout(()=>b.textContent="\u{1F4CB} Link kopieren",2000);});}
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
