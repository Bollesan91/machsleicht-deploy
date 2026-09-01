#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Was Google an unserer Website auszusetzen hat, das WIR verursacht haben.

Die GSC teilt nicht-indexierte Seiten nach Quelle: "Google-Systeme" (deren Urteil, nicht
verhandelbar) und "Website" (unser Fehler, heute abstellbar). Diese Stufe findet die
zweite Sorte selbst — ohne auf einen Export zu warten und ohne Google zu fragen:

  * Status != 200          -> Serverfehler oder tote Sitemap-Eintraege
  * Weiterleitung          -> eine Sitemap darf nur Endziele nennen, nie Zwischenstationen
  * canonical != self      -> die Seite erklaert sich selbst zur Dublette (GSC: "Alternative
                              Seite mit richtigem kanonischen Tag") und faellt aus dem Index
  * noindex                -> steht in der Sitemap und verbietet gleichzeitig die Indexierung
  * fehlender canonical/h1 -> keine Fehlklasse der GSC, aber dieselbe Ursache

Aufruf:  python _dev/scripts/check-sitemap-live.py [--sitemap URL]
Exit 1, sobald ein Befund der Klasse "Website" vorliegt.
"""
import argparse, concurrent.futures as cf, gzip, io, re, sys, urllib.request, urllib.error

SITEMAP = "https://machsleicht.de/sitemap.xml"
UA = {"User-Agent": "machsleicht-sitemap-check/1.0 (+https://machsleicht.de)"}


def hole(url, folgen=True):
    """Liefert (status, endurl, body). Weiterleitungen werden NICHT automatisch verfolgt,
    damit die Zwischenstation sichtbar bleibt."""
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            return None
    opener = urllib.request.build_opener() if folgen else urllib.request.build_opener(NoRedirect)
    req = urllib.request.Request(url, headers=UA)
    try:
        with opener.open(req, timeout=30) as r:
            roh = r.read()
            if r.headers.get("Content-Encoding") == "gzip":
                roh = gzip.decompress(roh)
            return r.status, r.geturl(), roh.decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        ziel = e.headers.get("Location", "") if e.code in (301, 302, 303, 307, 308) else ""
        return e.code, ziel, ""
    except Exception as e:
        return 0, str(e), ""


def normalisiere(u):
    return u.split("#")[0].rstrip("/") or "/"


def pruefe(url):
    """Ein Befund je URL, oder None. Reihenfolge = Schwere."""
    status, ziel, body = hole(url, folgen=False)
    if status in (301, 302, 303, 307, 308):
        return ("Weiterleitung", f"{status} -> {ziel or '?'}")
    if status >= 500 or status == 0:
        return ("Serverfehler", f"{status} {ziel if status == 0 else ''}".strip())
    if status != 200:
        return ("Status", str(status))

    robots = re.search(r'<meta[^>]+name=["\']robots["\'][^>]*content=["\']([^"\']*)', body, re.I)
    if robots and "noindex" in robots.group(1).lower():
        return ("noindex trotz Sitemap", robots.group(1))

    can = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]*href=["\']([^"\']*)', body, re.I)
    if not can:
        return ("kein canonical", "-")
    if normalisiere(can.group(1)) != normalisiere(url):
        return ("canonical zeigt woanders hin", can.group(1))

    if not re.search(r"<h1[\s>]", body, re.I):
        return ("kein h1", "-")
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sitemap", default=SITEMAP)
    a = ap.parse_args()

    _, _, xml = hole(a.sitemap)
    urls = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)
    if not urls:
        print("FEHLER: keine URLs in der Sitemap gefunden:", a.sitemap)
        return 2
    print(f"Sitemap: {len(urls)} URLs\n")

    befunde = []
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        for url, b in zip(urls, ex.map(pruefe, urls)):
            if b:
                befunde.append((b[0], url, b[1]))

    if not befunde:
        print(f"  0 Befunde — alle {len(urls)} Sitemap-URLs liefern 200, sind selbstkanonisch,")
        print("  indexierbar und haben eine h1.")
        return 0

    nach_art = {}
    for art, url, detail in befunde:
        nach_art.setdefault(art, []).append((url, detail))
    for art in sorted(nach_art, key=lambda k: -len(nach_art[k])):
        print(f"── {art} ({len(nach_art[art])}) ──")
        for url, detail in sorted(nach_art[art]):
            print(f"  {url.replace('https://machsleicht.de', '')}\n      {detail}")
        print()
    print(f"  {len(befunde)} Befunde der Klasse 'Website' — das sind die, die uns gehoeren.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
