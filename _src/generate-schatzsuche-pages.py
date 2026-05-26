#!/usr/bin/env python3
"""
Schatzsuche-Pages Generator für Pferde/Ritter/Baustelle (Welle 4, 2026-05-26).
Template angelehnt an schatzsuche/einhorn.html (262 LOC).
"""
import html
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "schatzsuche"

def esc(s):
    return html.escape(str(s), quote=True) if s else ""

MOTTOS = {
    "pferde": {
        "emoji": "🐴",
        "title": "Pferde-Schatzsuche — Stallmeister-Prüfung & Hufeisen-Jagd",
        "h1": "🐴 Pferde-Abenteuer — Schatzsuche &amp; Stallmeister-Prüfung",
        "subtitle": "Hufeisen finden, Stallpflege üben und über den Hindernis-Parcours zum verlorenen Schatz des Reiterhofs — perfekt für kleine und große Pferdefans.",
        "intro_short": "Pferde-Abenteuer Schatzsuche für den Kindergeburtstag: 5 fertige Stationen mit Anleitung, Eltern-Tipps und interaktiver Schatzkarte. Kostenlos bei machsleicht.",
        "og_img": "https://machsleicht.de/og-pferde.png",
        "stations": [
            ("Hufeisen-Spurensuche", "5 Pappkarton-Hufeisen im Garten verstecken, Kinder finden + sammeln (jedes mit Buchstabe = STALL)"),
            ("Stallpflege-Station", "Plüsch-Pony bürsten, mähnen flechten, Hufe auskratzen (Spachtel) — wer bekommt Note 1?"),
            ("Pferde-Quiz", "5 Fragen zu Rassen, Gangarten, Farben. Mit Bildkarten (für 3-5) oder Fachfragen (für 9-12)"),
            ("Hindernis-Parcours", "Steckenpferd-Galopp durch 5 Hindernisse (Hütchen, Stange, Reifen) — Zeit stoppen"),
            ("Stallmeister-Schatz", "Schatztruhe mit Stallmeister-Diplomen + Pferde-Stickern + Karotten-Süßigkeiten"),
        ],
        "elt_tipp": "Plüsch-Ponys vorher organisieren (Kinder bringen mit). Heu/Stroh als Deko aus Spielzeugladen ~3 €.",
        "amazon_query": "ponyhof+geburtstag+deko",
        "age_note": "3–5 Jahre: Plüsch-Pflege & Hufeisen-Suche. 6–8: Quiz + Parcours mit Stoppuhr. 9–12: Stallmeister-Prüfung mit Diplom.",
    },
    "ritter": {
        "emoji": "⚔️",
        "title": "Ritter-Schatzsuche — Knappen-Prüfung & Burg-Schatz",
        "h1": "⚔️ Ritter-Burg — Schatzsuche & Knappen-Prüfung",
        "subtitle": "Schwertkampf-Übung, Drachen-Quiz und durch die Burg zum Königsschatz — Knappen-Prüfung mit Schwertübergabe am Ende.",
        "intro_short": "Ritter-Burg Schatzsuche für den Kindergeburtstag: 5 fertige Stationen mit Anleitung, Eltern-Tipps und interaktiver Schatzkarte. Kostenlos bei machsleicht.",
        "og_img": "https://machsleicht.de/og-ritter.png",
        "stations": [
            ("Burg-Wachposten", "Passwort knacken: 5 Symbol-Karten (Schwert, Schild, Krone, Drache, Burg) richtige Reihenfolge"),
            ("Schwertkampf-Übung", "Schaumstoff-Schwerter, 3 Trefferzonen am Stroh-Sack (oben, mitte, unten) — Punkte sammeln"),
            ("Drachen-Quiz", "5 Fragen zu Drachen, Burgen, Rittern. Visualisierung mit Bildkarten für 3-5"),
            ("Wappen-Werkstatt", "Eigenes Wappen auf Pappschild malen (Farben, Tier, Buchstabe) — als Mitgebsel"),
            ("Königsschatz", "Schatztruhe mit Knappen-Diplomen + Edelsteinen (Glas-Steinchen) + Krone-Süßigkeiten"),
        ],
        "elt_tipp": "Pappkarton-Schwerter selber basteln (10 Min) oder Schaumstoff-Schwerter ~3 €/Stk. Burg-Deko: Stoffbahnen + Wappen.",
        "amazon_query": "ritter+burg+deko+geburtstag",
        "age_note": "3–5 Jahre: Wappen malen, Symbol-Karten. 6–8: Schwertkampf + Quiz. 9–12: Komplette Knappen-Prüfung mit Schwertschlag.",
    },
    "baustelle": {
        "emoji": "🏗️",
        "title": "Baustellen-Schatzsuche — Bauarbeiter-Prüfung & Werkzeug-Jagd",
        "h1": "🏗️ Baustellen-Abenteuer — Schatzsuche & Bauarbeiter-Prüfung",
        "subtitle": "Helm-Test, Bagger-Wettrennen und durch die Baustelle zum verschütteten Werkzeug-Schatz — Bauarbeiter-Diplom am Ende.",
        "intro_short": "Baustellen-Abenteuer Schatzsuche für den Kindergeburtstag: 5 fertige Stationen mit Anleitung, Eltern-Tipps und interaktiver Schatzkarte. Kostenlos bei machsleicht.",
        "og_img": "https://machsleicht.de/og-baustelle.png",
        "stations": [
            ("Helm-Check", "Bauhelme aufsetzen, Sicherheitsregeln üben (5 Stationen-Symbole: Helm, Weste, Sand, Werkzeug, Stopp)"),
            ("Bagger-Wettrennen", "Sand-Eimer mit Spielzeug-Bagger füllen, schnellste Zeit gewinnt (Stoppuhr) — Tisch oder Sandkasten"),
            ("Mauer-Bau", "Schuhkarton-Steine stapeln nach Bauplan (Skizze auf Papier) — wer baut am höchsten?"),
            ("Werkzeug-Quiz", "5 Werkzeuge raten (Hammer, Säge, Bohrer, Schraubenzieher, Wasserwaage) — Bilder oder echt"),
            ("Werkzeug-Schatz", "Sand-Truhe (Eimer) ausgraben: Mini-Werkzeuge + Bauarbeiter-Diplom + Süßigkeiten in Werkzeug-Form"),
        ],
        "elt_tipp": "Bauhelme im Spielzeugladen ~4 €/Stk oder Pappkarton selber basteln. Mini-Schaufeln + Eimer aus Strandbedarf nutzen.",
        "amazon_query": "bauarbeiter+geburtstag+deko",
        "age_note": "3–5 Jahre: Sand-Bagger + Helm-Spiele. 6–8: Mauer-Bau + Werkzeug-Quiz. 9–12: Komplette Bauarbeiter-Prüfung mit Echt-Werkzeug-Workshop.",
    },
}

CSS = """  :root{--a:#E8873D;--bg:#FFFAF5;--w:#FFF8F0;--d:#2D2319;--m:#6B5D52;--l:#EDE6DE;--f:'DM Sans',system-ui,sans-serif;--fd:'Fraunces',Georgia,serif}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:var(--f);color:var(--d);background:var(--w);-webkit-font-smoothing:antialiased;line-height:1.7}
  a{color:var(--a);text-decoration:none;font-weight:600}
  a:hover{text-decoration:underline}
  main{max-width:720px;margin:0 auto;padding:24px 16px 60px}
  h1{font-family:var(--fd);font-size:clamp(26px,5vw,36px);font-weight:900;line-height:1.2;margin-bottom:16px}
  h2{font-family:var(--fd);font-size:22px;font-weight:800;margin:32px 0 12px;color:var(--d)}
  h3{font-size:17px;font-weight:700;margin:20px 0 8px}
  p{margin-bottom:12px;font-size:15px}
  .header{display:flex;align-items:center;padding:14px 0 24px;gap:12px}
  .logo{font-family:var(--fd);font-size:22px;font-weight:900;color:var(--d)}
  .logo span{color:var(--a)}
  .badge{font-size:11px;font-weight:700;letter-spacing:2px;color:var(--a);text-transform:uppercase;margin-bottom:8px}
  .cta{display:inline-block;background:var(--a);color:#fff;padding:14px 32px;border-radius:99px;font-weight:700;font-size:15px;text-decoration:none;margin:8px 0}
  .cta:hover{background:#C46A1D;text-decoration:none}
  .card{background:var(--bg);border:1px solid var(--l);border-radius:14px;padding:20px;margin-bottom:16px}
  .breadcrumb{font-size:12px;color:var(--m);margin-bottom:16px}
  .breadcrumb a{font-size:12px;font-weight:500}
  .related{margin-top:32px;padding:20px;background:var(--bg);border:1px solid var(--l);border-radius:14px}
  .related .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-top:12px}
  .u-link{text-decoration:none;color:inherit}
  .u-emoji-cell{text-align:center;padding:14px 8px}
  .u-fs28{font-size:28px}
  .u-emoji-label{font-size:13px;font-weight:700;color:var(--d);margin-top:4px}
  .u-intro-sub{font-size:13px;color:var(--m);margin-bottom:8px}
  .u-body{color:var(--m)}
  .u-clr-d{color:var(--m)}
  .u-tac{text-align:center;font-size:13px;margin-top:12px}
  .u-mt8{margin-top:8px}
  .share-btn{display:inline-block;background:#25D366;color:#fff;padding:10px 20px;border-radius:99px;font-size:13px;font-weight:700;text-decoration:none;margin:12px 0}
  footer{margin-top:32px;padding-top:20px;border-top:1px solid var(--l);font-size:12px;color:var(--m);text-align:center}
  footer a{font-size:12px;color:var(--m);font-weight:500}
"""

def build(motto, data):
    stations = data["stations"]
    stations_html = "\n".join(
        f'      <li class="u-clr-d"><strong>Station {i+1}:</strong> {esc(name)} — {esc(desc)}</li>'
        for i,(name,desc) in enumerate(stations)
    )
    canonical = f"https://machsleicht.de/schatzsuche/{motto}"
    return f"""<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(data['title'])}</title>
  <meta name="description" content="{esc(data['intro_short'])}">
  <meta property="og:title" content="{data['emoji']} {esc(data['title'])}">
  <meta property="og:description" content="{esc(data['intro_short'])}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{data['og_img']}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{data['emoji']} {esc(data['title'])}">
  <meta name="twitter:description" content="{esc(data['intro_short'])}">
  <meta name="twitter:image" content="{data['og_img']}">
  <meta name="theme-color" content="#FFFAF5">
  <link rel="canonical" href="{canonical}">
  <script type="application/ld+json">
  {{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "{esc(data['title'])} fuer den Kindergeburtstag",
  "description": "{esc(data['intro_short'])}",
  "step": [
    {{"@type": "HowToStep", "name": "Thema waehlen", "text": "Waehle das {esc(motto.capitalize())}-Motto als Schatzsuche-Thema."}},
    {{"@type": "HowToStep", "name": "Stationen vorbereiten", "text": "Bereite die 5 Stationen mit Material vor."}},
    {{"@type": "HowToStep", "name": "Schatzkarte erstellen", "text": "Erstelle eine interaktive Schatzkarte mit machsleicht."}},
    {{"@type": "HowToStep", "name": "Hinweise verstecken", "text": "Verstecke die Hinweise an den 5 Stationen."}},
    {{"@type": "HowToStep", "name": "Schatzsuche starten", "text": "Nutze den Live-Modus fuer die Party!"}}
  ],
  "tool": [{{"@type": "HowToTool", "name": "machsleicht Schatzkarten-Engine"}}],
  "totalTime": "PT10M"
  }}
  </script>
  <script type="application/ld+json">
{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"Start","item":"https://machsleicht.de/"}},{{"@type":"ListItem","position":2,"name":"Schatzsuche","item":"https://machsleicht.de/schatzsuche"}},{{"@type":"ListItem","position":3,"name":"{esc(motto.capitalize())}","item":"{canonical}"}}]}}
  </script>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet">
  <style>{CSS}</style>
  <link rel="stylesheet" href="/css/utility.css">
</head>
<body>
<main>
  <header class="header">
    <a href="/"><span class="logo">mach's<span>leicht</span></span></a>
  </header>
  <nav class="breadcrumb"><a href="/">Start</a> &rsaquo; <a href="/schatzsuche">Schatzsuche</a> &rsaquo; {esc(motto.capitalize())}-Abenteuer</nav>

  <p class="badge">Schatzsuche-Thema</p>
  <h1>{data['h1']}</h1>

  <p class="u-intro-sub">12 Mottos &middot; 3–12 Jahre &middot; Kostenlos</p>
  <p class="u-body">{esc(data['subtitle'])}</p>

  <a href="/kindergeburtstag?modus=schatzsuche&amp;thema={motto}#planer" class="cta">{esc(motto.capitalize())}-Schatzsuche jetzt erstellen &rarr;</a>

  <h2>Die 5 Stationen</h2>
  <p>Jede Station hat eine eigene Aufgabe, Eltern-Tipps und Materialliste. Der machsleicht Schatzsuche-Generator erstellt alles automatisch.</p>
  <ol style="padding-left:20px;margin-bottom:16px">
{stations_html}
  </ol>

  <h2>Eltern-Tipps</h2>
  <p class="u-clr-d">{esc(data['elt_tipp'])}</p>
  <p style="text-align:center;margin:12px 0"><a href="https://www.amazon.de/s?k={data['amazon_query']}&amp;tag=machsleicht-21" target="_blank" rel="noopener sponsored" style="font-size:13px;color:#E8873D;font-weight:600">🛒 Schatz-Zubehör bei Amazon*</a></p>

  <h2>F&uuml;r welches Alter?</h2>
  <p class="u-clr-d">{esc(data['age_note'])}</p>

  <h2>Komplette {esc(motto.capitalize())}-Schatzsuche erstellen — in 10 Minuten</h2>
  <p class="u-clr-d">machsleicht erstellt dir eine <strong>personalisierte {esc(motto.capitalize())}-Schatzsuche</strong> mit dem Namen deines Kindes, 5 altersgerechten Stationen, interaktiver Schatzkarte zum Ausdrucken und Live-Modus f&uuml;r den Partytag.</p>
  <p class="u-clr-d">Kostenlos. Ohne Anmeldung. Sofort loslegen.</p>
  <a href="/kindergeburtstag?modus=schatzsuche&amp;thema={motto}#planer" class="cta">{esc(motto.capitalize())}-Schatzsuche erstellen &rarr;</a>

  <a href="https://wa.me/?text=Schau%20mal:%20{esc(motto.capitalize())}-Schatzsuche%20f%C3%BCr%20den%20Kindergeburtstag%20-%205%20fertige%20Stationen!%20https://machsleicht.de/schatzsuche/{motto}" target="_blank" rel="noopener" class="share-btn">&#x1F4AC; Schatzsuche-Idee teilen</a>

  <h2>Auch einen Geburtstag planen?</h2>
  <p>machsleicht hat neben der Schatzsuche auch einen kompletten <a href="/kindergeburtstag/{motto}">{esc(motto.capitalize())}-Kindergeburtstag-Planer</a>: altersgerechte Spiele, Einkaufsliste und Zeitplan.</p>
  <p style="text-align:center;margin-top:12px"><a href="/kindergeburtstag/{motto}" class="cta" style="font-size:14px;padding:10px 24px">{data['emoji']} {esc(motto.capitalize())}-Geburtstag planen &rarr;</a></p>

  <div class="related">
    <h3>Weitere Schatzsuche-Themen</h3>
    <div class="grid">
      <a href="/schatzsuche/piraten" class="u-link">
        <div class="card u-emoji-cell">
          <span class="u-fs28">🏴‍☠️</span>
          <p class="u-emoji-label">Piraten-Schatzsuche</p>
        </div>
      </a>
      <a href="/schatzsuche/einhorn" class="u-link">
        <div class="card u-emoji-cell">
          <span class="u-fs28">🦄</span>
          <p class="u-emoji-label">Einhorn-Abenteuer</p>
        </div>
      </a>
      <a href="/schatzsuche/weltraum" class="u-link">
        <div class="card u-emoji-cell">
          <span class="u-fs28">🚀</span>
          <p class="u-emoji-label">Weltraum-Mission</p>
        </div>
      </a>
      <a href="/schatzsuche/detektiv" class="u-link">
        <div class="card u-emoji-cell">
          <span class="u-fs28">🔍</span>
          <p class="u-emoji-label">Detektiv-Ermittlung</p>
        </div>
      </a>
    </div>
    <p class="u-tac"><a href="/schatzsuche">Alle Schatzsuche-Themen &rarr;</a></p>
  </div>

  <footer>
    <p>&copy; 2026 machsleicht.de &middot; <a href="/impressum">Impressum</a> &middot; <a href="/datenschutz">Datenschutz</a> &middot; <a href="/schatzsuche">Schatzsuche</a></p>
    <p class="u-mt8"><a href="/">&larr; Zur&uuml;ck zum Planer</a></p>
  </footer>
</main>
</body>
</html>
"""

def main():
    generated = []
    for motto, data in MOTTOS.items():
        page = build(motto, data)
        out = OUT / f"{motto}.html"
        out.write_text(page, encoding="utf-8")
        generated.append((str(out.relative_to(ROOT)), len(page)))
        print(f"WROTE {out.relative_to(ROOT)}: {len(page)} bytes")
    print(f"\nTotal: {len(generated)} schatzsuche pages.")

if __name__ == "__main__":
    main()
