#!/usr/bin/env python3
"""
Mottos-Age-Pages-Generator (Welle 2 Mottos-Glättung 2026-05-26).

Generiert HTML-Pages für pferde/ritter/baustelle × klein/mittel/gross (9 Files)
aus den Phase-B-JSONs in _src/elite-motto-data/.

Layout angelehnt an einhorn-9-12-jahre.html (Gold-Standard) — aber Daten-Quelle ist
ausschliesslich Phase-B-JSON. Kein Template-Search&Replace (Einhorn-Kontamination),
sondern Phase-B-natives Rendering.
"""
import json
import re
import html
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSON_DIR = ROOT / "_src" / "elite-motto-data"
OUT_DIR = ROOT / "kindergeburtstag"

# Motto-Branding (Emoji, Display-Name, Hub-Slug)
MOTTO_BRAND = {
    "pferde":    {"emoji": "🐴",   "display": "Pferde",    "hubLabel": "Pferde-Reiterhof",     "ogImg": "og-pferde.png"},
    "ritter":    {"emoji": "🛡️",  "display": "Ritter",    "hubLabel": "Ritter-Burg",          "ogImg": "og-ritter.png"},
    "baustelle": {"emoji": "🏗️",  "display": "Baustelle", "hubLabel": "Baustelle-Bauarbeiter","ogImg": "og-baustelle.png"},
}

AGE_SLUG = {"klein": "3-5-jahre", "mittel": "6-8-jahre", "gross": "9-12-jahre"}
AGE_LABEL = {"klein": "3–5 Jahre", "mittel": "6–8 Jahre", "gross": "9–12 Jahre"}
AGE_RANGE_DISPLAY = {"klein": "3-5", "mittel": "6-8", "gross": "9-12"}

def esc(s):
    """HTML-Escape für User-Content."""
    if s is None: return ""
    return html.escape(str(s), quote=True)

def esc_attr(s):
    """HTML-Escape für Attribut-Werte (z.B. meta-content)."""
    if s is None: return ""
    return html.escape(str(s), quote=True).replace("\n", " ")

CSS = """
:root{--a:#E8873D;--bg:#FFFAF5;--w:#FFF8F0;--d:#2D2319;--m:#6B5D52;--l:#EDE6DE;--g:#4CAF50;--f:'DM Sans',system-ui,sans-serif;--fd:'Fraunces',Georgia,serif}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--f);color:var(--d);background:var(--w);-webkit-font-smoothing:antialiased;line-height:1.7}
a{color:var(--a);text-decoration:none;font-weight:600}
a:hover{text-decoration:underline}
main{max-width:720px;margin:0 auto;padding:24px 16px 80px}
h1{font-family:var(--fd);font-size:clamp(26px,5vw,36px);font-weight:900;line-height:1.2;margin-bottom:16px}
h2{font-family:var(--fd);font-size:22px;font-weight:800;margin:32px 0 12px;color:var(--d)}
h3{font-size:17px;font-weight:700;margin:20px 0 8px}
h4{font-size:15px;font-weight:700;margin:0 0 6px}
p{margin-bottom:12px;color:var(--m);font-size:15px}
.header{display:flex;align-items:center;padding:14px 0 24px;gap:12px}
.header a{text-decoration:none}
.logo{font-family:var(--fd);font-size:22px;font-weight:900;color:var(--d)}
.logo span{color:var(--a)}
.badge{font-size:11px;font-weight:700;letter-spacing:2px;color:var(--a);text-transform:uppercase;margin-bottom:8px}
.cta{display:inline-block;background:var(--a);color:#fff;padding:14px 32px;border-radius:99px;font-weight:700;font-size:15px;text-decoration:none;margin:8px 0}
.cta:hover{background:#C46A1D;text-decoration:none}
.card{background:var(--bg);border:1px solid var(--l);border-radius:14px;padding:20px;margin-bottom:16px}
.tip{background:var(--bg);border:1px solid var(--l);border-left:4px solid var(--a);border-radius:8px;padding:16px 20px;margin:16px 0;font-size:14px}
.breadcrumb{font-size:12px;color:var(--m);margin-bottom:16px}
.breadcrumb a{font-size:12px;font-weight:500}
.age-intro{background:linear-gradient(135deg,#EDE7F6,#E8EAF6);border:2px solid #B39DDB;border-radius:16px;padding:24px;margin:20px 0}
.age-intro h3{margin-top:0;color:#5E35B1}
.variant-tabs{display:flex;gap:0;margin:20px 0 0;border-bottom:2px solid var(--l)}
.variant-tab{flex:1;padding:12px 8px;text-align:center;font-weight:700;font-size:14px;cursor:pointer;border-bottom:3px solid transparent;color:var(--m);transition:all 0.2s}
.variant-tab:hover{color:var(--d)}
.variant-tab.active{color:var(--a);border-bottom-color:var(--a)}
.variant-panel{display:none;padding:20px 0}
.variant-panel.active{display:block}
.timeline-row{display:flex;gap:14px;padding:12px 0;border-bottom:1px solid var(--l)}
.timeline-row:last-child{border-bottom:none}
.timeline-time{min-width:50px;font-weight:800;color:var(--a);font-size:14px;padding-top:2px}
.timeline-what{font-weight:700;color:var(--d);font-size:14px}
.timeline-detail{font-size:13px;color:var(--m);margin-top:4px;line-height:1.6}
.game-detail{background:var(--bg);border:1px solid var(--l);border-radius:14px;padding:20px;margin-bottom:16px}
.faq-item{background:var(--bg);border:1px solid var(--l);border-radius:14px;padding:16px 20px;margin-bottom:10px}
.faq-q{font-weight:700;color:var(--d);font-size:15px;margin-bottom:6px}
.faq-a{font-size:14px;color:var(--m);line-height:1.7}
.cost-bar{display:flex;justify-content:space-between;background:#FFF;border:2px solid var(--a);border-radius:12px;padding:14px 18px;margin:16px 0;font-weight:700}
.cost-label{color:var(--d);font-size:14px}
.cost-value{color:var(--a);font-size:18px;font-family:var(--fd)}
.trait-row{padding:8px 0;border-bottom:1px solid var(--l);font-size:14px}
.trait-row:last-child{border-bottom:none}
.trait-topic{font-weight:700;color:var(--d);display:inline-block;min-width:120px}
.trait-detail{color:var(--m)}
.list-plain li{margin-left:20px;margin-bottom:6px;font-size:14px;color:var(--m);line-height:1.6}
.footer-cta{background:var(--bg);border:1px solid var(--l);border-radius:14px;padding:24px;margin-top:32px;text-align:center}
"""

def render_howto_jsonld(d, motto, age_slug, brand):
    """HowTo JSON-LD aus Phase-B-Daten."""
    variants = d.get("variants", [])
    steps = []
    if variants:
        steps.append({"@type":"HowToStep","name":"Variante wählen","text":f"Wähle zwischen {', '.join(v.get('label','?') for v in variants[:3])}."})
    rit = d.get("signatureRitual", {})
    if rit.get("name"):
        steps.append({"@type":"HowToStep","name":rit["name"],"text":(rit.get("introText","") or rit.get("subtitle",""))[:180]})
    if variants and variants[0].get("schedule"):
        steps.append({"@type":"HowToStep","name":"Zeitplan folgen","text":f"Folge dem minutengenauen Zeitplan ({variants[0].get('timeWindow','3 Std.')})."})
    if d.get("cakeRecipe", {}).get("name"):
        steps.append({"@type":"HowToStep","name":"Kuchen backen","text":f"Backe den {d['cakeRecipe']['name']}."})
    steps.append({"@type":"HowToStep","name":"Party feiern","text":"Hab Spaß mit den Kindern!"})
    obj = {
        "@context":"https://schema.org",
        "@type":"HowTo",
        "name":f"{brand['display']}-Kindergeburtstag für {AGE_LABEL[d['ageGroup']]} planen",
        "description":d.get("metaDescription",""),
        "step":steps,
        "tool":[{"@type":"HowToTool","name":"machsleicht Kindergeburtstag-Planer"}],
        "totalTime":"PT10M"
    }
    return json.dumps(obj, ensure_ascii=False, indent=2)

def render_faqpage_jsonld(d):
    faq = d.get("faq", [])
    if not faq: return None
    obj = {
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[
            {"@type":"Question","name":item.get("q",""),
             "acceptedAnswer":{"@type":"Answer","text":item.get("a","")}}
            for item in faq if item.get("q")
        ]
    }
    return json.dumps(obj, ensure_ascii=False, indent=2)

def render_breadcrumb_jsonld(motto, age_slug, brand, age_label):
    obj = {
        "@context":"https://schema.org",
        "@type":"BreadcrumbList",
        "itemListElement":[
            {"@type":"ListItem","position":1,"name":"Start","item":"https://machsleicht.de/"},
            {"@type":"ListItem","position":2,"name":"Kindergeburtstag","item":"https://machsleicht.de/kindergeburtstag"},
            {"@type":"ListItem","position":3,"name":f"{brand['display']}-Geburtstag","item":f"https://machsleicht.de/kindergeburtstag/{motto}"},
            {"@type":"ListItem","position":4,"name":age_label,"item":f"https://machsleicht.de/kindergeburtstag/{motto}-{age_slug}"}
        ]
    }
    return json.dumps(obj, ensure_ascii=False, indent=2)

def render_age_intro(ageInsight, brand):
    headline = ageInsight.get("headline","") or f"Was {AGE_LABEL[ageInsight.get('ageGroup','klein')]}-Kinder am {brand['display']}-Motto suchen"
    why_headline = ageInsight.get("whyMottoFitsHeadline","")
    why = ageInsight.get("whyMottoFits","")
    traits = ageInsight.get("traits", [])
    rows = "\n".join(
        f'    <div class="trait-row"><span class="trait-topic">{esc(t.get("topic",""))}</span> <span class="trait-detail">{esc(t.get("detail",""))}</span></div>'
        for t in traits if t.get("topic")
    )
    return f"""  <div class="age-intro">
    <h3>{esc(headline)}</h3>
    {f'<p><strong>{esc(why_headline)}</strong></p>' if why_headline else ''}
    {f'<p>{esc(why)}</p>' if why else ''}
{rows}
  </div>"""

def render_ritual(rit, brand):
    if not rit.get("name"): return ""
    name = rit.get("name","")
    subtitle = rit.get("subtitle","")
    intro = rit.get("introText","")
    steps = rit.get("setupSteps", [])
    roles = rit.get("rolesList", [])
    opt = rit.get("optOutNote","")
    mat = rit.get("materialNote","")
    steps_html = ""
    if steps:
        steps_html = "<h4>Setup-Schritte:</h4>\n<ol class=\"list-plain\">\n"
        for s in steps:
            n = s.get("n","")
            sn = s.get("name","")
            sc = s.get("content","")
            steps_html += f'  <li><strong>{esc(sn)}</strong> {esc(sc)}</li>\n'
        steps_html += "</ol>\n"
    roles_html = ""
    if roles:
        roles_html = "<h4>Funktions-Karten:</h4>\n<ul class=\"list-plain\">\n"
        for r in roles:
            em = r.get("emoji","")
            nm = r.get("name","")
            fn = r.get("function","")
            roles_html += f'  <li>{esc(em)} <strong>{esc(nm)}</strong> — {esc(fn)}</li>\n'
        roles_html += "</ul>\n"
    opt_html = f'<div class="tip">💡 <strong>Opt-Out:</strong> {esc(opt)}</div>' if opt else ""
    mat_html = f'<div class="tip">🛒 <strong>Material:</strong> {esc(mat)}</div>' if mat else ""
    return f"""  <h2>✨ Das {esc(name)}-Ritual (für alle 3 Varianten)</h2>
  <div class="card">
    <h3>{esc(subtitle)}</h3>
    <p>{esc(intro)}</p>
    {steps_html}
    {roles_html}
    {mat_html}
    {opt_html}
  </div>"""

def render_variant_panel(variant, idx, brand, motto, active=False):
    vid = variant.get("id", f"v{idx}")
    label = variant.get("label","")
    headline = variant.get("headline","")
    intro = variant.get("intro","")
    twin = variant.get("timeWindow","")
    schedule = variant.get("schedule", [])
    food = variant.get("food", [])
    decoration = variant.get("decoration", [])
    giveaways = variant.get("giveaways", [])
    shopping = variant.get("shoppingList", [])
    cost = variant.get("estimatedCostEur","")
    cost_ctx = variant.get("costContext","")
    saving = variant.get("savingsTip","")

    timeline_rows = "\n".join(
        f"""      <div class="timeline-row">
        <div class="timeline-time">{esc(s.get('time',''))}</div>
        <div><div class="timeline-what">{esc(s.get('title',''))}</div>
        <div class="timeline-detail">{esc(s.get('description',''))}</div></div>
      </div>"""
        for s in schedule if s.get("time")
    )

    food_html = ""
    if food:
        food_html = '<h3>🍕 Essen & Snacks</h3>\n<ul class="list-plain">\n'
        for f in food:
            if isinstance(f, dict):
                em = f.get("emoji","🍽️")
                nm = f.get("item", f.get("name",""))
                am = f.get("amount","")
                food_html += f'  <li>{esc(em)} <strong>{esc(nm)}</strong>{" — " + esc(am) if am else ""}</li>\n'
            else:
                food_html += f'  <li>{esc(f)}</li>\n'
        food_html += "</ul>\n"

    deko_html = ""
    if decoration:
        deko_html = '<h3>🎉 Deko</h3>\n<ul class="list-plain">\n'
        for dk in decoration:
            if isinstance(dk, dict):
                lbl = dk.get("item", dk.get("label",""))
                pr = dk.get("price","")
                nt = dk.get("note","")
                deko_html += f'  <li><strong>{esc(lbl)}</strong>{" (" + esc(pr) + ")" if pr else ""}{" — " + esc(nt) if nt else ""}</li>\n'
            else:
                deko_html += f'  <li>{esc(dk)}</li>\n'
        deko_html += "</ul>\n"

    give_html = ""
    if giveaways:
        give_html = '<h3>🎁 Mitgebsel</h3>\n<ul class="list-plain">\n'
        for g in giveaways:
            give_html += f'  <li>{esc(g if isinstance(g,str) else g.get("item",""))}</li>\n'
        give_html += "</ul>\n"

    shop_html = ""
    if shopping:
        shop_html = '<h3>🛒 Einkaufsliste</h3>\n<ul class="list-plain">\n'
        for it in shopping:
            if isinstance(it, dict):
                lbl = it.get("item", it.get("label",""))
                qty = it.get("quantity","") or it.get("amount","")
                pr = it.get("price","")
                shop_html += f'  <li>{esc(lbl)}{" — " + esc(qty) if qty else ""}{" ({esc(pr)})" if pr else ""}</li>\n'
            else:
                shop_html += f'  <li>{esc(it)}</li>\n'
        shop_html += "</ul>\n"

    cost_html = ""
    if cost:
        cost_html = f"""    <div class="cost-bar">
      <span class="cost-label">Geschätzte Kosten ({esc(label)})</span>
      <span class="cost-value">~{esc(cost)} €</span>
    </div>"""
    cost_ctx_html = f'<div class="tip">📐 {esc(cost_ctx)}</div>' if cost_ctx else ""
    saving_html = f'<div class="tip">💰 <strong>Spar-Tipp:</strong> {esc(saving)}</div>' if saving else ""

    cls = "active" if active else ""
    return f"""  <div class="variant-panel {cls}" id="panel-{esc(vid)}">
    <h3>{esc(headline)}</h3>
    <p>{esc(intro)}</p>
    {f'<p><strong>Zeitfenster:</strong> {esc(twin)}</p>' if twin else ''}
    <h3>⏰ Zeitplan</h3>
    <div class="card">
{timeline_rows}
    </div>
    {food_html}
    {deko_html}
    {give_html}
    {shop_html}
{cost_html}
{cost_ctx_html}
{saving_html}
    <a href="/kindergeburtstag?motto={esc(motto)}&alter={age_alter(d_age=variant.get('_ageGroup','klein'))}#planer" class="cta">{brand['emoji']} {esc(label)}-Plan erstellen →</a>
  </div>"""

def age_alter(d_age):
    return {"klein":"4","mittel":"7","gross":"10"}.get(d_age,"7")

def render_cake(cake, brand):
    if not cake or not cake.get("name"): return ""
    name = cake["name"]
    intro = cake.get("intro","")
    steps = cake.get("steps", [])
    meta = cake.get("meta", {})
    tips = cake.get("tips", [])
    meta_html = ""
    if meta:
        items = []
        for k, v in meta.items():
            items.append(f'<strong>{esc(k)}:</strong> {esc(v)}')
        if items:
            meta_html = '<p>' + " · ".join(items) + '</p>'
    steps_html = ""
    if steps:
        steps_html = '<ol class="list-plain">\n'
        for s in steps:
            if isinstance(s, dict):
                steps_html += f'  <li><strong>{esc(s.get("title",""))}</strong> {esc(s.get("text", s.get("description","")))}</li>\n'
            else:
                steps_html += f'  <li>{esc(s)}</li>\n'
        steps_html += "</ol>\n"
    tips_html = ""
    if tips:
        tips_html = '<h4>Tipps:</h4>\n<ul class="list-plain">\n'
        for t in tips:
            tips_html += f'  <li>{esc(t)}</li>\n'
        tips_html += "</ul>\n"
    return f"""  <h2>🎂 {esc(name)}</h2>
  <div class="card">
    <p>{esc(intro)}</p>
    {meta_html}
    {steps_html}
    {tips_html}
  </div>"""

def render_faq(faq):
    if not faq: return ""
    items = "\n".join(
        f"""  <div class="faq-item">
    <div class="faq-q">{esc(item.get('q',''))}</div>
    <div class="faq-a">{esc(item.get('a',''))}</div>
  </div>"""
        for item in faq if item.get("q")
    )
    return f"""  <h2>❓ Häufige Fragen</h2>
{items}"""

def render_sos(sos):
    """sosScenarios: dict[key -> {icon, label, headline, steps[], fallback, tone}]"""
    if not sos or not isinstance(sos, dict): return ""
    items = ""
    for key, s in sos.items():
        if not isinstance(s, dict): continue
        icon = s.get("icon","🆘")
        label = s.get("label","")
        headline = s.get("headline","")
        steps = s.get("steps", [])
        fallback = s.get("fallback","")
        steps_html = ""
        if steps and isinstance(steps, list):
            steps_html = '<ol class="list-plain">' + "".join(f'<li>{esc(st)}</li>' for st in steps) + '</ol>'
        fallback_html = f'<p><em>Fallback: {esc(fallback)}</em></p>' if fallback else ''
        items += f"""  <div class="faq-item">
    <div class="faq-q">{esc(icon)} {esc(label)}</div>
    <div class="faq-a">
      {f'<p><strong>{esc(headline)}</strong></p>' if headline else ''}
      {steps_html}
      {fallback_html}
    </div>
  </div>
"""
    return f"""  <h2>🆘 SOS — Wenn etwas schiefläuft</h2>
{items}"""

def render_invitation(inv, brand):
    """invitationTemplate is plain string."""
    if not inv: return ""
    body = str(inv)
    return f"""  <h2>💌 Einladungs-Text (zum Kopieren)</h2>
  <div class="card">
    <p style="white-space:pre-wrap">{esc(body)}</p>
  </div>"""

def render_prep(prep):
    """preparationWeeks: dict[key -> {headline, items: [{icon, title, detail}]}]"""
    if not prep or not isinstance(prep, dict): return ""
    # Order weeks: minus4Weeks, minus3Weeks, minus2Weeks, minus1Week, dayBefore, partyDay
    order = ["minus4Weeks","minus3Weeks","minus2Weeks","minus1Week","dayBefore","partyDay"]
    keys = [k for k in order if k in prep] + [k for k in prep.keys() if k not in order]
    blocks = ""
    for k in keys:
        w = prep[k]
        if not isinstance(w, dict): continue
        head = w.get("headline","") or k
        wi = w.get("items", [])
        items_html = ""
        if isinstance(wi, list):
            for it in wi:
                if isinstance(it, dict):
                    icon = it.get("icon","•")
                    title = it.get("title","")
                    detail = it.get("detail","")
                    items_html += f'    <li>{esc(icon)} <strong>{esc(title)}</strong> {esc(detail)}</li>\n'
                else:
                    items_html += f'    <li>{esc(it)}</li>\n'
        blocks += f'  <h4>{esc(head)}</h4>\n  <ul class="list-plain">\n{items_html}  </ul>\n'
    return f"""  <h2>📅 Vorbereitungs-Plan</h2>
  <div class="card">
{blocks}
  </div>"""

def render_parent_tips(tips):
    """parentTips: dict with 'structured' list-of-{topic,detail} + optional 'educationalValue' str."""
    if not tips or not isinstance(tips, dict): return ""
    structured = tips.get("structured", [])
    eduval = tips.get("educationalValue","")
    items = ""
    for t in structured if isinstance(structured, list) else []:
        if isinstance(t, dict):
            items += f'  <li><strong>{esc(t.get("topic",""))}</strong>: {esc(t.get("detail",""))}</li>\n'
    eduval_html = f'<div class="tip">📚 <strong>Lernwert:</strong> {esc(eduval)}</div>' if eduval else ""
    return f"""  <h2>👨‍👩‍👧 Eltern-Tipps</h2>
  <ul class="list-plain">
{items}  </ul>
{eduval_html}"""

def render_bonus_games(bonus):
    """bonusGames: { intro: str, items: [{name, duration, minAge, loudness, indoor, outdoor, material, ...}] }"""
    if not bonus or not isinstance(bonus, dict): return ""
    intro = bonus.get("intro","")
    items = bonus.get("items", [])
    if not items or not isinstance(items, list): return ""
    cards = ""
    for g in items[:8]:
        if not isinstance(g, dict): continue
        name = g.get("name", g.get("title",""))
        rules = g.get("rules", g.get("description",""))
        material = g.get("material","")
        dauer = g.get("duration","")
        if isinstance(dauer,(int,float)): dauer = f"{int(dauer)} Min."
        min_age = g.get("minAge","")
        loud = g.get("loudness","")
        # how_to_play steps if present
        steps = g.get("steps", g.get("howToPlay",[]))
        steps_html = ""
        if isinstance(steps,list) and steps:
            steps_html = '<ol class="list-plain">' + "".join(f'<li>{esc(st)}</li>' for st in steps) + '</ol>'
        tags = []
        if dauer: tags.append(f'<span class="game-tag">{esc(dauer)}</span>')
        if min_age: tags.append(f'<span class="game-tag">Ab {esc(min_age)} J.</span>')
        if loud: tags.append(f'<span class="game-tag">{esc(loud)}</span>')
        tags_html = " ".join(tags)
        cards += f"""  <div class="game-detail">
    <h3>{esc(name)}</h3>
    {f'<div class="game-meta">{tags_html}</div>' if tags_html else ''}
    {f'<p><strong>Material:</strong> {esc(material)}</p>' if material else ''}
    {f'<p>{esc(rules)}</p>' if rules else ''}
    {steps_html}
  </div>
"""
    return f"""  <h2>🎮 Bonus-Spiele (Ersatz oder Erweiterung)</h2>
  {f'<p>{esc(intro)}</p>' if intro else ''}
{cards}"""

def build_page(json_path, motto, age):
    with open(json_path, encoding="utf-8") as f:
        d = json.load(f)
    brand = MOTTO_BRAND[motto]
    age_slug = AGE_SLUG[age]
    age_label = AGE_LABEL[age]
    age_range = AGE_RANGE_DISPLAY[age]

    title = d.get("title", f"{brand['emoji']} {brand['display']}-Kindergeburtstag — {age_label}")
    if not title.startswith(brand['emoji']):
        title = f"{brand['emoji']} {title}"
    meta_desc = d.get("metaDescription", "")[:240]
    intro = d.get("introParagraph", "")

    canonical = f"https://machsleicht.de/kindergeburtstag/{motto}-{age_slug}"
    og_img = f"https://machsleicht.de/{brand['ogImg']}"

    page_title = f"{brand['display']}-Kindergeburtstag {age_range} Jahre — 3 Party-Konzepte"

    howto = render_howto_jsonld(d, motto, age_slug, brand)
    faqpage = render_faqpage_jsonld(d)
    breadcrumb = render_breadcrumb_jsonld(motto, age_slug, brand, age_label)

    # Annotate variants with age for inner planner-link
    variants = d.get("variants", [])
    for v in variants:
        v["_ageGroup"] = age

    age_intro_html = render_age_intro(d.get("ageInsight",{}), brand)
    ritual_html = render_ritual(d.get("signatureRitual",{}), brand)

    variant_tabs = ""
    variant_panels = ""
    for i, v in enumerate(variants):
        vid = v.get("id", f"v{i}")
        lbl = v.get("label","Variante")
        cls = "active" if i == 0 else ""
        variant_tabs += f'    <div class="variant-tab {cls}" onclick="showVariant(\'{esc(vid)}\')">{esc(lbl)}</div>\n'
        variant_panels += render_variant_panel(v, i, brand, motto, active=(i==0)) + "\n"

    cake_html = render_cake(d.get("cakeRecipe",{}), brand)
    faq_html = render_faq(d.get("faq", []))
    sos_html = render_sos(d.get("sosScenarios", []))
    inv_html = render_invitation(d.get("invitationTemplate"), brand)
    prep_html = render_prep(d.get("preparationWeeks", []))
    tips_html = render_parent_tips(d.get("parentTips", []))
    bonus_html = render_bonus_games(d.get("bonusGames", []))

    page = f"""<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(page_title)}</title>
  <meta name="description" content="{esc_attr(meta_desc)}">
  <meta property="og:title" content="{brand['emoji']} {esc_attr(page_title)}">
  <meta property="og:description" content="{esc_attr(meta_desc)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{og_img}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="de_DE">
  <meta property="og:site_name" content="machsleicht">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{brand['emoji']} {esc_attr(page_title)}">
  <meta name="twitter:description" content="{esc_attr(meta_desc)}">
  <meta name="twitter:image" content="{og_img}">
  <meta name="theme-color" content="#FFFAF5">
  <link rel="canonical" href="{canonical}">
  <script type="application/ld+json">
{howto}
  </script>
{f'  <script type="application/ld+json">{chr(10)}{faqpage}{chr(10)}  </script>' if faqpage else ''}
  <script type="application/ld+json">
{breadcrumb}
  </script>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet">
  <style>{CSS}</style>
</head>
<body>
<main>
  <header class="header">
    <a href="/kindergeburtstag"><span class="logo">mach's<span>leicht</span></span></a>
  </header>
  <nav class="breadcrumb"><a href="/kindergeburtstag">Start</a> &rsaquo; <a href="/#mottos">Mottos</a> &rsaquo; <a href="/kindergeburtstag/{motto}">{esc(brand['hubLabel'])}</a> &rsaquo; {esc(age_label)}</nav>

  <p class="badge">{esc(brand['display'])}-Motto &middot; {esc(age_label)}</p>
  <h1>{brand['emoji']} {esc(brand['display'])}-Kindergeburtstag — {esc(age_label)}</h1>

  <p>{esc(intro)}</p>
  <a href="/kindergeburtstag?motto={esc(motto)}&alter={age_alter(age)}#planer" class="cta">{brand['emoji']} {esc(brand['display'])}-Geburtstag planen →</a>

  <!-- === ALTERS-INTRO === -->
{age_intro_html}

  <!-- === RITUAL === -->
{ritual_html}

  <!-- === VARIANTEN === -->
  <h2>Wähle deine Variante</h2>
  <div class="variant-tabs">
{variant_tabs}  </div>

{variant_panels}

  <!-- === KUCHEN === -->
{cake_html}

  <!-- === EINLADUNG === -->
{inv_html}

  <!-- === VORBEREITUNG === -->
{prep_html}

  <!-- === ELTERN-TIPPS === -->
{tips_html}

  <!-- === BONUS-SPIELE === -->
{bonus_html}

  <!-- === FAQ === -->
{faq_html}

  <!-- === SOS === -->
{sos_html}

  <!-- === FOOTER-CTA === -->
  <div class="footer-cta">
    <h3>Bereit für die {esc(brand['display'])}-Party?</h3>
    <p>Der Planer baut deinen kompletten {esc(brand['display'])}-Kindergeburtstag in 10 Minuten — mit deinen Daten, deiner Variante, deinem Budget.</p>
    <a href="/kindergeburtstag?motto={esc(motto)}&alter={age_alter(age)}#planer" class="cta">{brand['emoji']} Jetzt planen →</a>
  </div>

  <nav class="breadcrumb" style="margin-top:30px"><a href="/kindergeburtstag/{motto}">← Zurück zur {esc(brand['display'])}-Übersicht</a> &middot; <a href="/kindergeburtstag">Alle Mottos</a></nav>
</main>

<script>
function showVariant(id) {{
  document.querySelectorAll('.variant-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.variant-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('panel-' + id).classList.add('active');
}}
</script>
</body>
</html>
"""
    return page

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    generated = []
    for motto in MOTTO_BRAND:
        for age in AGE_SLUG:
            jp = JSON_DIR / f"{motto}-{age}.json"
            if not jp.exists():
                print(f"SKIP {jp} (not found)")
                continue
            page = build_page(jp, motto, age)
            out = OUT_DIR / f"{motto}-{AGE_SLUG[age]}.html"
            out.write_text(page, encoding="utf-8")
            generated.append((str(out.relative_to(ROOT)), len(page), page.count("\n")))
            print(f"WROTE {out.relative_to(ROOT)}: {len(page)} bytes, {page.count(chr(10))} lines")
    print(f"\nTotal: {len(generated)} files generated.")
    return generated

if __name__ == "__main__":
    main()
