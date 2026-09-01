#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Eingehende CONTENT-Links je Seite — Diagnose fuer Crawl-/Discovery-Probleme.

Verfahren aus der machsruhig-Uebergabe (01.09.2026), dort war interne Verlinkung der Hebel:
Friedhofs-Cluster haing an EINEM Hub mit 2 Content-Links; nach dem Fix (66 neue Links)
stiegen die indexierten Seiten in 8 Tagen von 92 auf 142.

Gezaehlt wird NUR redaktionelle Verlinkung: <header>, <nav> und <footer> fliegen vorher raus,
sonst zaehlt Boilerplate jede Seite kuenstlich hoch. Grundmenge sind die URLs der sitemap.xml.

Aufruf:  python _dev/scripts/check-interne-verlinkung.py [--alle]
"""
import io, os, re, sys, collections

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
BASE = "https://machsleicht.de"

def norm(u):
    """URL auf den Sitemap-Stil bringen: absolut, ohne Query/Anker, ohne Trailing Slash."""
    u = (u or "").strip()
    if u.startswith(BASE):
        u = u[len(BASE):]
    if not u.startswith("/"):
        return None                      # extern, mailto:, tel:, javascript:
    u = u.split("#")[0].split("?")[0]
    if u.endswith("/index.html"):
        u = u[: -len("index.html")]
    if len(u) > 1 and u.endswith("/"):
        u = u[:-1]
    return u or "/"

def datei_fuer(url):
    """Sitemap-URL -> Datei im Repo."""
    p = url.lstrip("/")
    for kandidat in ([os.path.join(ROOT, "index.html")] if url == "/" else
                     [os.path.join(ROOT, p + ".html"), os.path.join(ROOT, p, "index.html"), os.path.join(ROOT, p)]):
        if os.path.isfile(kandidat):
            return kandidat
    return None

# ── Grundmenge: die Sitemap ────────────────────────────────────────────────
sitemap = io.open(os.path.join(ROOT, "sitemap.xml"), encoding="utf-8").read()
urls = [norm(u) for u in re.findall(r"<loc>([^<]+)</loc>", sitemap)]
urls = [u for u in urls if u]
seiten = {u: datei_fuer(u) for u in urls}
fehlend = [u for u, f in seiten.items() if not f]

# ── Links einsammeln ───────────────────────────────────────────────────────
BOILERPLATE = re.compile(r"<(header|nav|footer)\b.*?</\1>", re.S | re.I)
eingehend = collections.Counter({u: 0 for u in urls})
ausgehend = {}
quellen = collections.defaultdict(set)

for u, f in seiten.items():
    if not f:
        continue
    html = io.open(f, encoding="utf-8", errors="replace").read()
    body = BOILERPLATE.sub(" ", html)
    ziele = set()
    for href in re.findall(r'href="([^"]+)"', body):
        z = norm(href)
        if z and z in eingehend and z != u:
            ziele.add(z)
    ausgehend[u] = ziele
    for z in ziele:
        eingehend[z] += 1
        quellen[z].add(u)

# ── Auswertung ─────────────────────────────────────────────────────────────
werte = sorted(eingehend.values())
median = werte[len(werte) // 2] if werte else 0
null = [u for u in urls if eingehend[u] == 0]
schwach = [u for u in urls if 1 <= eingehend[u] <= 2]

print("Seiten in der Sitemap: %d  (im Repo gefunden: %d)" % (len(urls), len(urls) - len(fehlend)))
if fehlend:
    print("  ! ohne Datei im Repo: " + ", ".join(fehlend[:8]) + ("" if len(fehlend) <= 8 else " …"))
print("Eingehende Content-Links je Seite: Median %d, Minimum %d, Maximum %d" % (median, werte[0], werte[-1]))
print("  0 eingehende Links: %d Seiten" % len(null))
print("  1-2 eingehende Links: %d Seiten" % len(schwach))

print("\n── Hubs ──")
for hub in ["/kindergeburtstag", "/einladung", "/schatzsuche", "/spielkarten"]:
    if hub in eingehend:
        print("  %-22s %3d eingehend, %3d ausgehend" % (hub, eingehend[hub], len(ausgehend.get(hub, ()))))

print("\n── Motto-Paare: verlinken sich Ratgeber- und Tool-Seite gegenseitig? ──")
mottos = ["baustelle","detektiv","dino","dschungel","einhorn","feen","feuerwehr","meerjungfrau",
          "pferde","piraten","prinzessin","ritter","safari","superheld","weltraum"]
paare_ok = 0
for m in mottos:
    a, b = "/kindergeburtstag/" + m, "/einladung/" + m
    if a not in eingehend or b not in eingehend:
        print("  %-14s fehlt in der Sitemap (%s / %s)" % (m, a in eingehend, b in eingehend)); continue
    hin = b in ausgehend.get(a, ())
    zurueck = a in ausgehend.get(b, ())
    if hin and zurueck: paare_ok += 1
    print("  %-14s Ratgeber->Tool: %-5s   Tool->Ratgeber: %-5s   (eingehend: %d / %d)"
          % (m, "ja" if hin else "NEIN", "ja" if zurueck else "NEIN", eingehend[a], eingehend[b]))
print("  %d von %d Paaren sind gegenseitig verlinkt" % (paare_ok, len(mottos)))

if null:
    print("\n── Seiten ohne einen einzigen eingehenden Content-Link ──")
    for u in sorted(null):
        print("  " + u)

if "--alle" in sys.argv:
    print("\n── Alle Seiten nach eingehenden Links ──")
    for u, n in sorted(eingehend.items(), key=lambda kv: (kv[1], kv[0])):
        print("  %3d  %s" % (n, u))
