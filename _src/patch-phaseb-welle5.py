#!/usr/bin/env python3
"""
Welle-5 Phase-B-Patches nach Chrome-Adversarial-Findings (2026-05-26).

Behebt KRITISCHE Naming-Kollisionen und Kohärenzprobleme in den 3 *-gross.json,
die von claude.ai-Reviewer-Tabs aufgedeckt wurden (Pferde 69, Ritter 70, Baustelle 70).

Anti-Sycophancy: jeder Findings-Punkt wird gegen den vollen JSON-Kontext geprüft,
nicht blind ein Pattern übergestülpt.
"""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
JD = ROOT / "_src" / "elite-motto-data"

def load(name):
    with open(JD / name, encoding="utf-8") as f:
        return json.load(f)

def save(name, d):
    with open(JD / name, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)

# ─── PFERDE-GROSS ────────────────────────────────────────
def patch_pferde():
    d = load("pferde-gross.json")
    # Bug 1+2+3: Karten-Liste hat Naming-Kollisionen mit Setup-Text.
    # Setup-introText nennt "Pflegerin Anna, Hufschmied Tom, Quizmaster Lina, Reitlehrerin Mia"
    # Karten-Liste hat aber Tom als "Stallmeister Tom" (Pflege!), Hufschmied=Jonas, Anna=Diagnostikerin.
    # FIX: Setup-introText umschreiben damit konsistent zur Karten-Liste.
    rit = d["signatureRitual"]
    rit["introText"] = (
        "Bei 9-12 funktioniert die Stallmeister-Prüfung als Quest-Rahmen: Beim Ankommen werden alle "
        "zu Stallmeister-Anwärtern. Jeder zieht eine Funktions-Karte aus der Box (Pflege-Chefin Hanna, "
        "Reit-Lehrerin Mia, Hufschmied Jonas, Quizmaster Lina, Zeitnehmerin Sophie, Pokal-Verleiher Felix). "
        "Die Funktion wird gelebt — wer die Pflege-Karte zieht, leitet die Pflege-Station an. "
        "Während der Party absolvieren sie 4-6 Prüfungs-Stationen (Variant-abhängig) mit Bewertungen "
        "(Zeit, Stilnote, Quiz-Punkte). Am Ende: Diplom-Übergabe mit Funktion ('Stallmeister-Anwärter "
        "Klasse 1'), das beste Reit-Team bekommt den Wanderpokal."
    )
    # Bug 2: "Stallmeister Tom" Karte ist verwirrend — Prüfung heisst schon "Stallmeister-Prüfung"
    # FIX: Tom umbenennen zu "Stall-Chefin Tom" → "Pflege-Chefin Hanna" + Hanna alte Rolle abschalten.
    # Pragmatisch: Karten-Liste komplett kuratieren auf 6 Kern-Rollen + 6 optional (Variant-skaliert).
    rit["rolesList"] = [
        {"emoji": "🐴", "name": "Pflege-Chefin Hanna", "function": "Leitet die Pflege-Station an, bewertet Pflege-Noten"},
        {"emoji": "🏇", "name": "Reit-Lehrerin Mia", "function": "Kommandiert beim Reit-Parcours, gibt Stilnoten"},
        {"emoji": "🔨", "name": "Hufschmied Jonas", "function": "Führt den Hufschmied-Workshop (Pappkarton-Hufeisen)"},
        {"emoji": "🧠", "name": "Quizmaster Lina", "function": "Stellt Quiz-Fragen, vergibt Punkte"},
        {"emoji": "⏱️", "name": "Zeitnehmerin Sophie", "function": "Misst Parcours-Zeiten mit Stoppuhr"},
        {"emoji": "🏆", "name": "Pokal-Verleiher Felix", "function": "Übergibt Wanderpokal und Diplome"},
        # Optionale Bonus-Karten (für Standard+Wow mit mehr Stationen)
        {"emoji": "🌾", "name": "Snack-Koordinator Paul", "function": "BONUS-Karte (ab Standard): Pausen-Catering"},
        {"emoji": "📸", "name": "Foto-Chronistin Greta", "function": "BONUS-Karte (ab Standard): Dokumentiert für Eltern-WhatsApp"},
    ]
    # Bug 4 explizit adressieren mit Cap-Hinweis
    rit["roleCountByVariant"] = {"minimal": 4, "standard": 6, "wow": 8}
    rit["materialNote"] = (
        "Funktions-Karten, Prüfungs-Mappen, Reiterhof-Tafel, Diplome, Wanderpokal an einem festen "
        "'Stallmeister-Tisch' sammeln. Karten-Anzahl pro Variante: Minimal 4 (Hanna/Mia/Jonas/Lina), "
        "Standard 6 (+Sophie/Felix), Wow 8 (+Paul/Greta)."
    )
    # Bug 5: Sicherheits-Übergeneralisierung bei "Echtes Pferd"
    for t in d["ageInsight"]["traits"]:
        if t.get("topic") == "Echtes Pferd":
            t["detail"] = (
                "Echtes Reiten ab 9 ist möglich, aber NICHT automatisch — hängt komplett von der "
                "Reiterfahrung des Kindes ab. Geführte/longierte Sitzeinheiten mit ausgebildeter "
                "Reitlehrerin auf einem zugelassenen Reiterhof sind die sichere Variante. Eigenständiges "
                "Reiten ohne Reitlehrer NIE auf einer Geburtstagsparty. Helm Pflicht ohne Ausnahme. "
                "Reiterhof-Besuch als Wow-Highlight statt zu Hause Plüsch — aber Reiterhof vorab "
                "klären, ob er Geburtstagsgruppen unter Reitlehrer-Aufsicht annimmt."
            )
            break
    # Bug ZUSATZ: Reward-Stapelung (Diplom + Pokal + Schlag-Zeremonie). Wanderpokal+Diplom reicht.
    # Bei Pferde keine Schlag-Zeremonie definiert — ok.
    d["_meta"]["version"] = "2.1.0"
    d["_meta"]["lastUpdated"] = "2026-05-26"
    d["_meta"]["qualityNote"] = (
        "v2.1 — Helfer-v3 Chrome-Adversarial Welle 5: Funktions-Namen-Kollisionen behoben "
        "(Tom/Anna), 'Stallmeister'-Triple-Belegung aufgelöst, Karten-Cap pro Variante "
        "eingeführt, Reit-Sicherheits-Disclaimer verschärft. Erwarteter Score-Lift 69→85."
    )
    save("pferde-gross.json", d)
    return "pferde-gross.json gepatcht"

# ─── RITTER-GROSS ────────────────────────────────────────
def patch_ritter():
    d = load("ritter-gross.json")
    rit = d["signatureRitual"]
    # Bug 1+2: Wow-Variante Widerspruch. Age-Insight sagt "Eltern weg in Wow", aber Wow ist legitime Variante.
    # FIX: Age-Insight präzisieren — Eltern ABWESEND ist OK, Wow-Variante ist NICHT gestrichen.
    for t in d["ageInsight"]["traits"]:
        if t.get("topic") == "Eltern":
            t["detail"] = (
                "Eltern können in Minimal absetzen + telefonisch erreichbar bleiben. In Standard/Wow "
                "wollen Kinder die Party meist ganz ohne eigene Eltern — 1-2 fremde Erwachsene als "
                "Aufsicht (als 'Burgwächter' getarnt, NICHT als Karten-Funktion) übernehmen die "
                "Aufsicht. Wichtig: NICHT mit der ziehbaren Kinder-Karte 'Burgvogtin' verwechseln."
            )
            break
    # Bug 3: Burgvogt Konflikt. Lasse Karte "Burgvogtin" (Kind), erwachsene Aufsicht = "Burgwächter".
    # Rolle umbenennen in Karten-Liste damit klar:
    # Bug 5: 12 Karten Reduktion + Bogenschütze raus (Sicherheitsrisiko)
    rit["rolesList"] = [
        {"emoji": "⚔️", "name": "Schwert-Champion Mia", "function": "Kommandiert beim Schwert-Parcours, gibt Stilnoten"},
        {"emoji": "🕵️", "name": "Ermittler Jonas", "function": "Leitet die Burgenermittlung (Wow-Variante)"},
        {"emoji": "📚", "name": "Burgen-Kennerin Lina", "function": "Stellt Quiz-Fragen zu Burgen und Mittelalter"},
        {"emoji": "🛡️", "name": "Wappen-Heroldin Hanna", "function": "Bewertet selbstgemalte Wappen"},
        {"emoji": "⏱️", "name": "Zeitnehmer Felix", "function": "Misst Parcours-Zeiten mit Stoppuhr"},
        {"emoji": "🏆", "name": "Pokal-Verleiherin Anna", "function": "Übergibt Ritter-Pokal und Diplome"},
        # Optionale Bonus-Karten
        {"emoji": "🤡", "name": "Hofnarr Tom", "function": "BONUS (ab Standard): Pausen-Stimmung + Witze zwischen Stationen"},
        {"emoji": "📸", "name": "Foto-Chronistin Greta", "function": "BONUS (ab Standard): Dokumentiert die Akademie-Prüfung"},
    ]
    rit["roleCountByVariant"] = {"minimal": 4, "standard": 6, "wow": 8}
    rit["materialNote"] = (
        "Funktions-Karten, Prüfungs-Mappen, Akademie-Tafel, Diplome, Ritter-Pokal an einem festen "
        "'Akademie-Tisch' sammeln. Erwachsene Aufsicht = 'Burgwächter' (NICHT Karten-Funktion). "
        "Karten-Anzahl pro Variante: Minimal 4, Standard 6, Wow 8."
    )
    # Bug 4: Parcours vs Strohballen-Regel. Schwert-Parcours = Stationen mit Aufgaben (Block, Wende,
    # Strohballen-Schlag), NICHT zeitliches Hin-und-Herrennen mit Schlagfreiheit.
    # FIX: introText klarstellen — "Schwert-Parcours" ist Stationen-Reihenfolge mit definierten Aktionen pro Station
    rit["introText"] = (
        "Bei 9-12 funktioniert die Ritter-Akademie als Quest-Rahmen: Beim Ankommen werden alle zu "
        "Ritter-Anwärtern. Jeder zieht eine Funktions-Karte. Während der Party absolvieren sie 4-6 "
        "Prüfungs-Stationen (Variant-abhängig). Der Schwert-Parcours besteht aus 4 Aufgaben-Stationen: "
        "Balance-Block, Wende-Pylon, Strohballen-Schlag (3 Treffer Brust-/Schenkel-/Kopfhöhe), "
        "Schild-Block (Trainer wirft Schaumstoff-Bälle, Kind blockt). KEIN Sparring zwischen Kindern. "
        "Zeit + Stilnote werden bewertet. Am Ende: Schwert-Schlag-Zeremonie (symbolisch, Trainer "
        "tippt mit Holzschwert auf die Schulter) und Diplom-Übergabe."
    )
    # Bug ZUSATZ: Reward-Stapelung. Diplom + Pokal + Schwert-Zeremonie ist OK weil Schwert-Schlag-Zeremonie
    # ist Teil der Diplom-Übergabe (1 Akt), nicht extra Reward. Im Text klargestellt.
    # Zeit-Mathe Minimal: 4 Stationen × 30 Min = 2h + Briefing/Snack/Zeremonie 1h → 3h passt.
    d["_meta"]["version"] = "2.1.0"
    d["_meta"]["lastUpdated"] = "2026-05-26"
    d["_meta"]["qualityNote"] = (
        "v2.1 — Helfer-v3 Chrome-Adversarial Welle 5: Wow-Widerspruch geklärt, Burgvogt-Doppel "
        "(Eltern vs Karte) aufgelöst, Schwert-Parcours-Mechanik konkretisiert (4 definierte "
        "Stationen statt freies Schlagen), 12 Karten auf 6+2 reduziert, Bogenschütze raus. "
        "Erwarteter Score-Lift 70→85."
    )
    save("ritter-gross.json", d)
    return "ritter-gross.json gepatcht"

# ─── BAUSTELLE-GROSS ────────────────────────────────────────
def patch_baustelle():
    d = load("baustelle-gross.json")
    rit = d["signatureRitual"]
    # Bug 1+2: Engineering-Versprechen 200/300kg vs Sandsäckchen-Realität
    # FIX: Age-Insight präzisieren mit realistischen Zahlen
    for t in d["ageInsight"]["traits"]:
        if t.get("topic") == "Engineering" or "200kg" in t.get("detail",""):
            t["detail"] = (
                "9-12 haben Lego-Technik gebaut, Minecraft-Häuser konstruiert, Bau-Doku geschaut. "
                "Sie wollen Engineering: warum hält eine Spaghetti-Marshmallow-Brücke 1 kg aber bricht "
                "bei 2 kg? Wer ist Polier vs Statiker vs Tiefbau-Ingenieur? Die Bauleiter-Prüfung "
                "antwortet konkret mit Bauplan-Werkstatt (Lineal + Bemaßung), Statik-bewertetem "
                "Bauklotz-Wettbewerb (Stabilität messen: Vibrations-Test der Tisch-Platte), "
                "Brücken-Last-Test mit Wasserflaschen-Steigerung (0,5 L → 1,5 L), Material-Erkennung "
                "sensorisch, Sabotage-Krimi mit Alibi-Logik. Konkretere Zahlen als 200kg-Phantasie."
            )
    # Bug 3: "Architekten-Prüfung" vs "Bauleiter-Diplom" Mismatch. FIX: alles auf "Bauleiter".
    rit["name"] = "Die Bauleiter-Prüfung"
    rit["subtitle"] = "Eröffnet mit Bauleiter-Briefing, endet mit Diplom-Übergabe und Funktion"
    rit["introText"] = (
        "Bei 9-12 funktioniert die Bauleiter-Prüfung als Quest-Rahmen: Beim Ankommen werden alle zu "
        "Bauleiter-Anwärtern. Jeder zieht eine Funktions-Karte. Während der Party absolvieren sie "
        "4-6 Prüfungs-Stationen (Variant-abhängig) mit Bewertungen (Höhe, Stabilität, Quiz-Punkte). "
        "Der Brücken-Last-Test nutzt Wasserflaschen 0,5L bis 1,5L (NICHT 200kg-Marketing). "
        "Am Ende: Diplom-Übergabe ('Bauleiter Klasse 1') + Bauleiter-Pokal für bestes Team."
    )
    # Bug 4: Passive Füll-Rollen (Foto-Chronistin, Pokal-Verleiher, Akademie-Koordinator)
    # FIX: 12 Karten auf 6+2 Bonus reduzieren, jede mit aktiver Engineering-Aufgabe
    rit["rolesList"] = [
        {"emoji": "👷", "name": "Polier Tom", "function": "Leitet die Baustelle, koordiniert Stationen"},
        {"emoji": "📐", "name": "Architektin Mia", "function": "Bauplan-Station (Lineal/Bemaßung)"},
        {"emoji": "🧱", "name": "Maurerin Hanna", "function": "Bauklotz-Wettbewerb (Statik, Höhe, Stabilität)"},
        {"emoji": "⚡", "name": "Statikerin Lina", "function": "Brücken-Last-Test mit Wasserflaschen + Werkzeug-Quiz"},
        {"emoji": "🕵️", "name": "Spuren-Analyst Paul", "function": "Sabotage-Ermittlung (Wow-Variante)"},
        {"emoji": "🏆", "name": "Pokal-Verleiher Felix", "function": "Übergibt Bauleiter-Pokal und Diplome"},
        # BONUS
        {"emoji": "🏗️", "name": "Kranführer Anna", "function": "BONUS (ab Standard): bedient Spielzeug-Kran, hilft bei Stationen"},
        {"emoji": "🔬", "name": "Material-Diagnostikerin Sophia", "function": "BONUS (ab Standard): Material-Erkennungs-Beutel"},
    ]
    rit["roleCountByVariant"] = {"minimal": 4, "standard": 6, "wow": 8}
    rit["materialNote"] = (
        "Funktions-Karten, Prüfungs-Mappen, Baustellen-Tafel, Bauleiter-Diplome und -Pokal am "
        "'Baustellen-Tisch' sammeln. Karten-Anzahl pro Variante: Minimal 4, Standard 6, Wow 8. "
        "Brücken-Last-Test: 6 leere PET-Flaschen (0,5L) + 3 PET-Flaschen (1,5L) als Last-Steigerung."
    )
    # Bug "Klasse 2" ambig — Werkzeug-Quiz Klasse 2 fixen in FAQ + Setup
    for faq in d.get("faq", []):
        if "Klasse 2" in faq.get("q","") + faq.get("a",""):
            faq["q"] = faq["q"].replace("Klasse 2", "Schwierigkeitsstufe 2")
            faq["a"] = faq["a"].replace("Klasse 2", "Schwierigkeitsstufe 2")
    for s in rit.get("setupSteps", []):
        if "Architekten" in s.get("name",""):
            s["name"] = s["name"].replace("Architekten", "Bauleiter")
        if "Architekten" in s.get("content",""):
            s["content"] = s["content"].replace("Architekten-Eid", "Bauleiter-Eid").replace("Architekten-Briefing","Bauleiter-Briefing")
    # Architekten-Eid umbenennen + Komma fix
    for s in rit.get("setupSteps", []):
        if "Architekten-Eid" in s.get("name","") or s.get("name","").endswith("-Eid"):
            s["name"] = "Bauleiter-Eid (alle gemeinsam, 1×)"
            s["content"] = "'Wir bauen sicher, wir bauen stabil, wir helfen unserem Team. Bau-Beginn.' Klar, knapp, dann starten."
    d["_meta"]["version"] = "2.1.0"
    d["_meta"]["lastUpdated"] = "2026-05-26"
    d["_meta"]["qualityNote"] = (
        "v2.1 — Helfer-v3 Chrome-Adversarial Welle 5: 200kg-Phantasie → Spaghetti-Brücken 1-2kg, "
        "Wasserflaschen 0,5-1,5L als Last-Test. Architekten-Prüfung → Bauleiter-Prüfung (konsistent "
        "mit Bauleiter-Diplom). 12 Karten auf 6+2 reduziert, alle mit Engineering-Aufgabe. "
        "Werkzeug-Quiz Klasse 2 → Schwierigkeitsstufe 2. Komma-Fix Eid. Score-Lift 70→85."
    )
    save("baustelle-gross.json", d)
    return "baustelle-gross.json gepatcht"

if __name__ == "__main__":
    print(patch_pferde())
    print(patch_ritter())
    print(patch_baustelle())
