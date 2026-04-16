#!/usr/bin/env python3
"""
Tiefen-Audit ALLER Seiten der Site.

Kategorien (seitentyp-bewusst):
  - ratgeber          : 18 Haupt-Ratgeber (kindergeburtstag-*.html im Root)
  - motto-guide       : 9 Lizenz-Motto-Ratgeber (ratgeber/*-fuer-eltern.html)
  - schatzsuche-motto : 8 Schatzsuche-Themen (schatzsuche/*.html)
  - motto-matrix      : Kindergeburtstag Motto×Alter-Seiten (kindergeburtstag/*.html)
  - motto-hub         : Motto-Hub-Seiten (kindergeburtstag/piraten.html, ritter.html etc. ohne -jahre)
  - guide-hub         : *-guide.html im Root (frozen-guide.html etc.)
  - schnitzeljagd     : schnitzeljagd-*.html (Content-Seiten, nicht der Redirect)
  - schatzsuche-hub   : schatzsuche-*.html Content (-drinnen, -kindergeburtstag)
  - nachbarnische     : baby-erstausstattung, halloween-kinder-zuhause etc.
  - tool              : Planer/Tools (index, kindergeburtstag, einladung/, kreuzwortraetsel, spielkarten)
  - redirect          : Meta-Refresh-only Seiten (schatzsuche.html, schnitzeljagd.html)
  - druckvorlage      : noindex-Druckseiten
  - legal             : impressum, datenschutz, transparenz
  - 404               : 404.html
  - unknown           : nicht eingeordnet

Scoring pro Kategorie angepasst.
Seiten mit Kategorie druckvorlage/redirect/legal/404 werden NICHT im Zufriedenheits-Score gemittelt,
sondern separat aufgelistet (sanity-check).
"""
import re
from pathlib import Path
from collections import defaultdict

REPO = Path(__file__).parent.parent

# ------------------------------------------------------------------
# Seitenerkennung & Kategorisierung
# ------------------------------------------------------------------

def discover_pages():
    """Alle HTML-Dateien unterhalb REPO finden, ohne _dev, .git, node_modules."""
    exclude_dirs = {'.git', 'node_modules', '_dev', '_src', '_build', 'css', 'js', 'netlify'}
    for p in REPO.rglob('*.html'):
        rel = p.relative_to(REPO)
        parts = rel.parts
        if any(part in exclude_dirs for part in parts):
            continue
        yield str(rel).replace('\\', '/')


RATGEBER_ROOT = {
    "kindergeburtstag-5-jahre.html", "kindergeburtstag-6-jahre.html", "kindergeburtstag-7-jahre.html",
    "kindergeburtstag-bei-regen.html", "kindergeburtstag-checkliste.html", "kindergeburtstag-draussen.html",
    "kindergeburtstag-drinnen.html", "kindergeburtstag-einladung-text.html", "kindergeburtstag-essen.html",
    "kindergeburtstag-kosten.html", "kindergeburtstag-last-minute.html", "kindergeburtstag-mitgebsel.html",
    "kindergeburtstag-spiele-draussen.html", "kindergeburtstag-spiele-drinnen.html",
    "kindergeburtstag-torte-einfach.html", "kindergeburtstag-wenig-aufwand.html",
    "kindergeburtstag-zeitplan.html", "kindergeburtstag-zuhause.html",
}

NACHBARNISCHE = {
    "baby.html", "baby-erstausstattung-checkliste.html", "babyparty-checkliste.html",
    "einschulung.html", "einschulung-checkliste.html", "schultuete-fuellen.html",
    "kita-start-checkliste.html", "kliniktasche-packen.html", "wochenbett-was-braucht-man.html",
    "familienreise-packliste.html", "autofahrt-kinder-checkliste.html", "umzug-mit-kind-checkliste.html",
    "adventskalender-fuellen.html", "halloween-kinder-zuhause.html", "oster-eiersuche.html",
}

TOOLS = {
    "index.html", "kindergeburtstag.html", "kreuzwortraetsel.html", "spielkarten.html",
    "einladung/index.html", "einladung/erstellen/index.html",
    "einladung/detektiv/index.html", "einladung/dino/index.html", "einladung/einhorn/index.html",
    "einladung/feuerwehr/index.html", "einladung/meerjungfrau/index.html", "einladung/prinzessin/index.html",
    "einladung/safari/index.html", "einladung/superheld/index.html", "einladung/weltraum/index.html",
}

LEGAL = {"impressum.html", "datenschutz.html", "transparenz.html"}


def categorize(path, content):
    """Kategorie ableiten."""
    # Redirect (meta refresh + kein Body-Content)
    if 'http-equiv="refresh"' in content and path in ("schatzsuche.html", "schnitzeljagd.html"):
        return "redirect"
    # Druckvorlage (noindex)
    if 'name="robots"' in content and 'noindex' in content:
        return "druckvorlage"
    # Legal
    if path in LEGAL:
        return "legal"
    # 404
    if path == "404.html":
        return "404"
    # Tools/Planer
    if path in TOOLS:
        return "tool"
    # Ratgeber-Haupt
    if path in RATGEBER_ROOT:
        return "ratgeber"
    # Nachbarnische
    if path in NACHBARNISCHE:
        return "nachbarnische"
    # Motto-Guide (Lizenz)
    if path.startswith("ratgeber/") and path.endswith("-fuer-eltern.html"):
        return "motto-guide"
    if path == "ratgeber/index.html":
        return "tool"  # Ratgeber-Hub ist eher eine Listen-Seite
    # Schatzsuche-Motto
    if path.startswith("schatzsuche/"):
        return "schatzsuche-motto"
    # Guide-Hub (frozen-guide.html etc.)
    if re.match(r'^[a-z-]+-guide\.html$', path):
        return "guide-hub"
    # Kindergeburtstag-Matrix
    if path.startswith("kindergeburtstag/"):
        filename = path.split("/", 1)[1]
        if re.match(r'^[a-z-]+-\d+(-\d+)?-?jahre?\.html$', filename) or re.match(r'^[a-z-]+-\d+-\d+-jahre\.html$', filename):
            return "motto-matrix"
        # /kindergeburtstag/3-5-jahre.html etc. sind Alters-Hubs
        if re.match(r'^\d+(-\d+)?-jahre\.html$', filename):
            return "motto-hub"  # Alters-Hub ähnlich zu Motto-Hub
        # /kindergeburtstag/piraten.html etc. sind Motto-Hubs
        return "motto-hub"
    # Schnitzeljagd / Schatzsuche Content (nicht der Redirect)
    if path.startswith("schnitzeljagd-"):
        return "schnitzeljagd"
    if path.startswith("schatzsuche-"):
        return "schatzsuche-hub"
    return "unknown"


# ------------------------------------------------------------------
# Basis-Analyse
# ------------------------------------------------------------------

def analyze(path):
    content = (REPO / path).read_text(encoding="utf-8", errors="replace")
    stats = {"path": path}
    stats["category"] = categorize(path, content)

    stats["size_kb"] = len(content) // 1024

    # Text ohne Tags
    text = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)
    text = re.sub(r'<style.*?</style>', '', text, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    stats["word_count"] = len(text.split())

    # Struktur
    stats["h1"] = len(re.findall(r'<h1[^>]*>', content))
    stats["h2"] = len(re.findall(r'<h2[^>]*>', content))
    stats["h3"] = len(re.findall(r'<h3[^>]*>', content))

    # Meta
    title_m = re.search(r'<title>(.*?)</title>', content, flags=re.DOTALL)
    stats["title"] = (title_m.group(1).strip() if title_m else "")
    stats["title_len"] = len(stats["title"])
    desc_m = re.search(r'<meta\s+name="description"\s+content="(.*?)"', content, flags=re.DOTALL)
    stats["desc"] = (desc_m.group(1).strip() if desc_m else "")
    stats["desc_len"] = len(stats["desc"])
    stats["has_canonical"] = 'rel="canonical"' in content
    # Canonical-Ziel extrahieren (für Self-Canonical-Check)
    canon_m = re.search(r'rel="canonical"[^>]*href="([^"]+)"', content)
    stats["canonical_url"] = canon_m.group(1) if canon_m else ""
    # Erwarteter URL-Pfad für Self-Canonical: /path/ohne/.html
    expected_path = "/" + path.replace("index.html", "").replace(".html", "")
    expected_path = expected_path.rstrip("/")
    stats["is_self_canonical"] = expected_path in stats["canonical_url"] if stats["canonical_url"] else True
    # Canonical zeigt auf andere Seite = diese Seite ist Keyword-Variante
    stats["is_canonical_variant"] = bool(stats["canonical_url"]) and not stats["is_self_canonical"]
    stats["has_og_image"] = 'og:image' in content
    stats["custom_og_image"] = 'og:image' in content and 'og-home.png' not in content
    stats["has_plausible"] = 'plausible' in content.lower()
    stats["has_noindex"] = 'noindex' in content.lower()
    stats["is_redirect"] = 'http-equiv="refresh"' in content

    # Schemas
    schema_types = set(re.findall(r'"@type":\s*"([^"]+)"', content))
    core_types = {"FAQPage", "HowTo", "BreadcrumbList", "Article", "Recipe", "ItemList", "WebApplication"}
    stats["schemas"] = sorted(schema_types & core_types)
    stats["has_faq"] = "FAQPage" in schema_types
    stats["has_howto"] = "HowTo" in schema_types
    stats["has_breadcrumb"] = "BreadcrumbList" in schema_types
    stats["faq_count"] = len(re.findall(r'"@type":\s*"Question"', content))
    stats["howto_count"] = len(re.findall(r'"@type":\s*"HowToStep"', content))

    # Links
    stats["internal_links"] = len(re.findall(r'href="(?:/|https://machsleicht\.de)', content))
    stats["cta_to_planner"] = len(re.findall(r'href="[^"]*kindergeburtstag[^"]*#planer', content))
    stats["cta_to_einladung"] = len(re.findall(r'href="[^"]*einladung', content))
    stats["cta_to_partyseite"] = len(re.findall(r'href="[^"]*party\.machsleicht\.de', content))

    # Affiliate
    stats["affiliate_links"] = len(re.findall(r'amzn\.to|amazon\.de[^"]*tag=', content))

    # Content-Signale
    stats["has_tables"] = '<table' in content
    stats["has_lists"] = '<ul' in content or '<ol' in content
    stats["has_tip_boxes"] = 'class="tip"' in content or 'class="info"' in content
    stats["has_sticky_cta"] = 'position:fixed' in content.lower() or 'sticky' in content.lower()
    stats["has_footer"] = '<footer' in content

    # Duplicate-Signale (für Matrix)
    stats["h1_text"] = ''
    h1_m = re.search(r'<h1[^>]*>(.*?)</h1>', content, flags=re.DOTALL)
    if h1_m:
        stats["h1_text"] = re.sub(r'<[^>]+>', ' ', h1_m.group(1)).strip()[:80]

    return stats


# ------------------------------------------------------------------
# Scoring pro Kategorie
# ------------------------------------------------------------------

def score_ratgeber(s):
    """Ratgeber & Motto-Guide & Nachbarnische: volle Härte, Content-Queen."""
    score, max_score = 0, 0
    # Meta (10)
    max_score += 10
    if s["has_canonical"]: score += 2
    if 40 <= s["title_len"] <= 65: score += 2
    elif s["title_len"]: score += 1
    if 120 <= s["desc_len"] <= 160: score += 2
    elif s["desc_len"]: score += 1
    if s["has_og_image"]: score += 2
    if s["custom_og_image"]: score += 2
    # Struktur (15)
    max_score += 15
    if s["h1"] == 1: score += 5
    if s["h2"] >= 5: score += 5
    elif s["h2"] >= 3: score += 3
    if s["has_footer"]: score += 3
    # Schemas (25)
    max_score += 25
    if s["has_breadcrumb"]: score += 5
    if s["has_faq"] and s["faq_count"] >= 5: score += 10
    elif s["has_faq"]: score += 6
    if s["has_howto"] and s["howto_count"] >= 5: score += 10
    elif s["has_howto"]: score += 6
    # Content-Volume (15)
    max_score += 15
    if s["word_count"] >= 1500: score += 10
    elif s["word_count"] >= 800: score += 6
    elif s["word_count"] >= 400: score += 3
    if s["has_tables"]: score += 3
    if s["has_tip_boxes"]: score += 2
    # Funnel (15)
    max_score += 15
    if s["cta_to_planner"] >= 2: score += 5
    elif s["cta_to_planner"] >= 1: score += 3
    if s["cta_to_einladung"] >= 1: score += 3
    if s["cta_to_partyseite"] >= 1: score += 3
    if s["affiliate_links"] >= 3: score += 4
    elif s["affiliate_links"] >= 1: score += 2
    # Technik (10)
    max_score += 10
    if s["has_plausible"]: score += 3
    if s["has_sticky_cta"]: score += 3
    if s["internal_links"] >= 8: score += 4
    elif s["internal_links"] >= 4: score += 2
    return score, max_score


def score_motto_matrix(s):
    """Motto×Alter-Matrix.
    WICHTIG: Die Einzel-Alter-Seiten (z.B. piraten-3-jahre) haben per Design canonical auf die Gruppenseite
    (piraten-3-5-jahre). Deshalb: Bei Canonical-Varianten wird NUR technisch/Funnel gescored (Content egal).
    Bei Canonical-Zielen (Gruppenseiten) voller Content-Score.
    """
    score, max_score = 0, 0
    # Meta (15)
    max_score += 15
    if s["has_canonical"]: score += 3
    if 40 <= s["title_len"] <= 65: score += 3
    elif s["title_len"]: score += 1
    if 120 <= s["desc_len"] <= 160: score += 3
    elif s["desc_len"]: score += 1
    if s["has_og_image"]: score += 3
    if s["custom_og_image"]: score += 3
    # Struktur (20)
    max_score += 20
    if s["h1"] == 1: score += 8
    if s["h2"] >= 3: score += 6
    elif s["h2"] >= 2: score += 3
    if s["has_footer"]: score += 3
    if s["has_breadcrumb"]: score += 3

    if s["is_canonical_variant"]:
        # Keyword-Landingpage: Content nicht relevant, Funnel + Technik gewichten
        max_score += 30  # Funnel
        if s["cta_to_planner"] >= 2: score += 12
        elif s["cta_to_planner"] >= 1: score += 7
        if s["cta_to_einladung"] >= 1: score += 6
        if s["cta_to_partyseite"] >= 1: score += 6
        if s["affiliate_links"] >= 1: score += 6
        max_score += 15  # Technik
        if s["has_plausible"]: score += 5
        if s["internal_links"] >= 8: score += 6
        elif s["internal_links"] >= 4: score += 3
        if s["has_sticky_cta"]: score += 4
    else:
        # Canonical-Ziel / Self-Canonical: voller Content-Score
        max_score += 20  # Content
        if s["word_count"] >= 800: score += 12
        elif s["word_count"] >= 500: score += 8
        elif s["word_count"] >= 300: score += 4
        if s["has_lists"]: score += 4
        if s["has_tables"]: score += 4
        max_score += 25  # Funnel
        if s["cta_to_planner"] >= 2: score += 10
        elif s["cta_to_planner"] >= 1: score += 6
        if s["cta_to_einladung"] >= 1: score += 5
        if s["cta_to_partyseite"] >= 1: score += 5
        if s["affiliate_links"] >= 1: score += 5
        max_score += 10  # Technik
        if s["has_plausible"]: score += 3
        if s["has_sticky_cta"]: score += 3
        if s["internal_links"] >= 8: score += 4
        elif s["internal_links"] >= 4: score += 2
    # Schema (10) — Breadcrumb Pflicht, Rest optional
    max_score += 10
    if s["has_breadcrumb"]: score += 6
    if s["schemas"]: score += 4
    return score, max_score


def score_tool(s):
    """Tool-/Planer-Seiten: Meta + Technik + Struktur. Content irrelevant."""
    score, max_score = 0, 0
    # Meta (30)
    max_score += 30
    if s["has_canonical"]: score += 6
    if 40 <= s["title_len"] <= 65: score += 6
    elif s["title_len"]: score += 3
    if 120 <= s["desc_len"] <= 160: score += 6
    elif s["desc_len"]: score += 3
    if s["has_og_image"]: score += 6
    if s["custom_og_image"]: score += 6
    # Struktur (25)
    max_score += 25
    if s["h1"] == 1: score += 10
    if s["h2"] >= 2: score += 8
    if s["has_footer"]: score += 7
    # Schema (15)
    max_score += 15
    if s["has_breadcrumb"]: score += 8
    if s["schemas"]: score += 7
    # Technik (30)
    max_score += 30
    if s["has_plausible"]: score += 10
    if s["internal_links"] >= 8: score += 10
    elif s["internal_links"] >= 4: score += 5
    if s["has_sticky_cta"]: score += 5
    if s["affiliate_links"] >= 1 or s["has_og_image"]: score += 5  # OG-Image als Ersatz-Signal
    return score, max_score


def score_hub(s):
    """Motto-Hub/Guide-Hub/Schatzsuche-Hub/Schnitzeljagd: Mix aus Ratgeber & Tool."""
    score, max_score = 0, 0
    # Meta (15)
    max_score += 15
    if s["has_canonical"]: score += 3
    if 40 <= s["title_len"] <= 65: score += 3
    elif s["title_len"]: score += 1
    if 120 <= s["desc_len"] <= 160: score += 3
    elif s["desc_len"]: score += 1
    if s["has_og_image"]: score += 3
    if s["custom_og_image"]: score += 3
    # Struktur (20)
    max_score += 20
    if s["h1"] == 1: score += 6
    if s["h2"] >= 4: score += 6
    elif s["h2"] >= 2: score += 3
    if s["has_footer"]: score += 4
    if s["has_breadcrumb"]: score += 4
    # Content (20)
    max_score += 20
    if s["word_count"] >= 1000: score += 8
    elif s["word_count"] >= 500: score += 5
    elif s["word_count"] >= 200: score += 2
    if s["has_lists"]: score += 4
    if s["has_tables"]: score += 4
    if s["has_tip_boxes"]: score += 4
    # Funnel (25)
    max_score += 25
    if s["cta_to_planner"] >= 2: score += 8
    elif s["cta_to_planner"] >= 1: score += 5
    if s["cta_to_einladung"] >= 1: score += 5
    if s["cta_to_partyseite"] >= 1: score += 5
    if s["affiliate_links"] >= 2: score += 7
    elif s["affiliate_links"] >= 1: score += 4
    # Schema (10)
    max_score += 10
    if s["schemas"]: score += 5
    if s["has_faq"] or s["has_howto"]: score += 5
    # Technik (10)
    max_score += 10
    if s["has_plausible"]: score += 3
    if s["internal_links"] >= 6: score += 4
    elif s["internal_links"] >= 3: score += 2
    if s["has_sticky_cta"]: score += 3
    return score, max_score


def score_excluded(s):
    """Druckvorlage / Redirect / Legal / 404 — nicht im Haupt-Score gewichtet."""
    # Trotzdem sanity-check Score zurückgeben
    score, max_score = 0, 0
    max_score += 10
    if s["title_len"]: score += 3
    if s["desc_len"]: score += 3
    if s["has_canonical"]: score += 4
    return score, max_score


SCORE_FUNCS = {
    "ratgeber": score_ratgeber,
    "motto-guide": score_ratgeber,
    "nachbarnische": score_ratgeber,
    "schatzsuche-motto": score_hub,
    "motto-matrix": score_motto_matrix,
    "motto-hub": score_hub,
    "guide-hub": score_hub,
    "schnitzeljagd": score_hub,
    "schatzsuche-hub": score_hub,
    "tool": score_tool,
    "redirect": score_excluded,
    "druckvorlage": score_excluded,
    "legal": score_excluded,
    "404": score_excluded,
    "unknown": score_hub,
}

EXCLUDE_FROM_AGGREGATE = {"redirect", "druckvorlage", "legal", "404"}


# ------------------------------------------------------------------
# Main
# ------------------------------------------------------------------

def main():
    pages = sorted(discover_pages())
    results = []
    for p in pages:
        try:
            s = analyze(p)
        except Exception as e:
            print(f"FEHLER bei {p}: {e}")
            continue
        score_fn = SCORE_FUNCS.get(s["category"], score_hub)
        score, max_score = score_fn(s)
        s["score"] = score
        s["max_score"] = max_score
        s["pct"] = round(100 * score / max_score) if max_score else 0
        results.append(s)

    # Gruppierung pro Kategorie
    by_cat = defaultdict(list)
    for r in results:
        by_cat[r["category"]].append(r)

    CAT_ORDER = [
        "ratgeber", "motto-guide", "nachbarnische", "schatzsuche-motto",
        "motto-hub", "guide-hub", "schnitzeljagd", "schatzsuche-hub",
        "motto-matrix", "tool",
        "redirect", "druckvorlage", "legal", "404", "unknown",
    ]

    print("=" * 90)
    print(f"AUDIT ALL PAGES — {len(results)} Seiten")
    print("=" * 90)

    # Aggregat (ohne excluded)
    agg_list = [r for r in results if r["category"] not in EXCLUDE_FROM_AGGREGATE]
    if agg_list:
        total_pct = sum(r["pct"] for r in agg_list) / len(agg_list)
        worst_20 = sorted(agg_list, key=lambda r: r["pct"])[:20]
        print(f"\nDurchschnitts-Score (ohne redirect/druck/legal/404): {total_pct:.1f}% über {len(agg_list)} Seiten\n")

    # Tabelle pro Kategorie
    for cat in CAT_ORDER:
        if cat not in by_cat:
            continue
        group = by_cat[cat]
        avg = sum(r["pct"] for r in group) / len(group) if group else 0
        print(f"\n─── {cat.upper()} ({len(group)} Seiten, ⌀ {avg:.1f}%) ───")
        # Top 3 + Bottom 3 pro Kategorie (bei größeren Gruppen), sonst alle
        if len(group) > 8:
            sorted_grp = sorted(group, key=lambda r: r["pct"])
            print("  Schlechtesten 5:")
            for r in sorted_grp[:5]:
                print(f"    {r['pct']:>3}%  {r['word_count']:>5}W  {r['path']}")
            print("  Besten 3:")
            for r in sorted_grp[-3:]:
                print(f"    {r['pct']:>3}%  {r['word_count']:>5}W  {r['path']}")
            # Score-Verteilung
            dist = defaultdict(int)
            for r in group:
                bucket = (r['pct'] // 10) * 10
                dist[bucket] += 1
            print("  Verteilung:")
            for b in sorted(dist.keys()):
                bar = '█' * min(40, dist[b])
                print(f"    {b:>3}-{b+9:<3}%: {dist[b]:>3}  {bar}")
        else:
            for r in sorted(group, key=lambda r: r["pct"]):
                print(f"  {r['pct']:>3}%  {r['word_count']:>5}W  {r['path']}")

    # Top 20 Worst Overall (ohne excluded)
    print("\n" + "=" * 90)
    print("TOP 20 WORST-CASE SEITEN (die brennen am meisten):")
    print("=" * 90)
    for r in worst_20:
        print(f"  {r['pct']:>3}%  [{r['category']:<18}]  {r['word_count']:>5}W  {r['path']}")

    # Meta-Probleme: Title zu lang / Desc zu lang
    print("\n" + "=" * 90)
    print("META-PROBLEME:")
    print("=" * 90)
    long_titles = [r for r in results if r["title_len"] > 65]
    long_descs = [r for r in results if r["desc_len"] > 160]
    no_desc = [r for r in results if not r["desc_len"] and r["category"] not in EXCLUDE_FROM_AGGREGATE]
    print(f"  Title > 65 Zeichen: {len(long_titles)} Seiten")
    print(f"  Description > 160 Zeichen: {len(long_descs)} Seiten")
    print(f"  Keine Description (ohne excluded): {len(no_desc)} Seiten")


if __name__ == "__main__":
    main()
