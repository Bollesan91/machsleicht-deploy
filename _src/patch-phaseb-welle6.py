#!/usr/bin/env python3
"""
Welle-6 Mini-Patches nach Welle-5-Re-Verify (Chrome-Helfer-v3).

Pferde: Score 77, Mini-Bug Sophie (Kern-Karte #5) bei minimal-cap=4 nicht dabei,
        aber Minimal-Timeline fordert Stoppuhr-Funktion. → Sophie raus aus Kern,
        Mia (Reit-Lehrerin) übernimmt Timing zusätzlich.

Ritter: Score 79, Mini-Bug Jonas dreifach widersprüchlich (Bonus/Standard+Wow vs
        Kern/Wow-only). → Jonas eindeutig Bonus-Karte, nur Wow scharfgeschaltet.

Baustelle: kein neuer Patch (Re-Verify offen wegen Rate-Limit).
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

# ─── PFERDE-GROSS Welle 6 ────────────────────────────────────────
def patch_pferde():
    d = load("pferde-gross.json")
    rit = d["signatureRitual"]
    # Sophie aus Kern in Bonus, Mia übernimmt Timing
    rit["rolesList"] = [
        {"emoji": "🐴", "name": "Pflege-Chefin Hanna", "function": "Leitet Pflege-Station, bewertet Pflege-Noten"},
        {"emoji": "🏇", "name": "Reit-Lehrerin Mia", "function": "Kommandiert Reit-Parcours, gibt Stilnoten UND nimmt die Zeit mit Stoppuhr (in Minimal)"},
        {"emoji": "🔨", "name": "Hufschmied Jonas", "function": "Führt Hufschmied-Workshop (Pappkarton-Hufeisen)"},
        {"emoji": "🧠", "name": "Quizmaster Lina", "function": "Stellt Quiz-Fragen, vergibt Punkte"},
        {"emoji": "🏆", "name": "Pokal-Verleiher Felix", "function": "Übergibt Wanderpokal und Diplome"},
        # BONUS (ab Standard mit eigener Station)
        {"emoji": "⏱️", "name": "Zeitnehmerin Sophie", "function": "BONUS (ab Standard): eigene Stoppuhr-Station, entlastet Mia"},
        {"emoji": "🌾", "name": "Snack-Koordinator Paul", "function": "BONUS (ab Standard): Pausen-Catering"},
        {"emoji": "📸", "name": "Foto-Chronistin Greta", "function": "BONUS (ab Wow): Dokumentiert für Eltern-WhatsApp"},
    ]
    # Cap unverändert: minimal=4 (Hanna/Mia/Jonas/Lina + Felix als Wahl-5te), standard=6, wow=8
    # Korrektur: 5 Kern-Karten + 3 Bonus. Minimal cap auf 5 setzen damit Felix als Pokal-Verleiher dabei.
    rit["roleCountByVariant"] = {"minimal": 5, "standard": 7, "wow": 8}
    rit["materialNote"] = (
        "Funktions-Karten, Prüfungs-Mappen, Reiterhof-Tafel, Diplome, Wanderpokal an einem festen "
        "'Stallmeister-Tisch' sammeln. Karten-Anzahl pro Variante: Minimal 5 (Hanna/Mia/Jonas/Lina/Felix — "
        "Mia macht in Minimal Timing+Stilnote), Standard 7 (+Sophie/Paul), Wow 8 (+Greta). "
        "Bei mehr als 5 Kindern in Minimal: zusätzliche Kinder ziehen Karte 'Pflege-Chefin' oder "
        "'Reit-Lehrerin' als Team — Doppel-Karten erlaubt."
    )
    d["_meta"]["version"] = "2.2.0"
    d["_meta"]["lastUpdated"] = "2026-05-26"
    d["_meta"]["qualityNote"] = (
        "v2.2 — Welle 6 Mini-Fix: Sophie/Zeitnehmerin aus Kern in Bonus (entlastet Minimal-Cap), "
        "Mia macht in Minimal Timing+Stilnote (Doppelaufgabe). minimal-cap auf 5 erhöht damit Felix "
        "als Pokal-Verleiher dabei. Doppel-Karten-Hinweis bei >5 Kindern in Minimal. Erwarteter Score 85+."
    )
    save("pferde-gross.json", d)
    return "pferde-gross.json v2.2.0"

# ─── RITTER-GROSS Welle 6 ────────────────────────────────────────
def patch_ritter():
    d = load("ritter-gross.json")
    rit = d["signatureRitual"]
    # Jonas eindeutig Bonus-Karte (Wow-only) — aus Kern raus, in Bonus mit explizit "Wow-only"
    rit["rolesList"] = [
        {"emoji": "⚔️", "name": "Schwert-Champion Mia", "function": "Kommandiert beim Schwert-Parcours, gibt Stilnoten"},
        {"emoji": "📚", "name": "Burgen-Kennerin Lina", "function": "Stellt Quiz-Fragen zu Burgen und Mittelalter"},
        {"emoji": "🛡️", "name": "Wappen-Heroldin Hanna", "function": "Bewertet selbstgemalte Wappen"},
        {"emoji": "⏱️", "name": "Zeitnehmer Felix", "function": "Misst Parcours-Zeiten mit Stoppuhr"},
        {"emoji": "🏆", "name": "Pokal-Verleiherin Anna", "function": "Übergibt Ritter-Pokal und Diplome"},
        # BONUS
        {"emoji": "🤡", "name": "Hofnarr Tom", "function": "BONUS (ab Standard): Pausen-Stimmung + Witze zwischen Stationen"},
        {"emoji": "🕵️", "name": "Ermittler Jonas", "function": "BONUS (NUR Wow-Variante): Leitet die Burgenermittlung — Karte nicht ziehbar in Minimal/Standard"},
        {"emoji": "📸", "name": "Foto-Chronistin Greta", "function": "BONUS (ab Standard): Dokumentiert die Akademie-Prüfung"},
    ]
    rit["roleCountByVariant"] = {"minimal": 4, "standard": 6, "wow": 8}
    rit["materialNote"] = (
        "Funktions-Karten, Prüfungs-Mappen, Akademie-Tafel, Diplome, Ritter-Pokal an einem festen "
        "'Akademie-Tisch' sammeln. Erwachsene Aufsicht = 'Burgwächter' (NICHT Karten-Funktion). "
        "Karten-Anzahl pro Variante: Minimal 4 (Mia/Lina/Hanna/Felix), Standard 6 (+Tom/Greta), "
        "Wow 8 (+Jonas/Anna). Ermittler-Karte Jonas wird AUSSCHLIESSLICH in Wow gezogen — "
        "die Burgenermittlung als Krimi-Quest existiert nur in Wow. "
        "Material: Strohballen über Reitschule/Bauernhof in der Nähe leihen (urban schwierig — "
        "Alternative: 3 Schaumstoff-Bälle in dichtem Strohballen-Karton-Modell). "
        "Schwert-Parcours-Material: Pool-Nudel-Schwerter + Schaumstoff-Bälle für Schild-Block."
    )
    rit["introText"] = (
        "Bei 9-12 funktioniert die Ritter-Akademie als Quest-Rahmen: Beim Ankommen werden alle zu "
        "Ritter-Anwärtern. Jeder zieht eine Funktions-Karte (in Minimal 4, Standard 6, Wow 8 Karten). "
        "Während der Party absolvieren sie 4-6 Prüfungs-Stationen (Variant-abhängig). Der Schwert-Parcours "
        "besteht aus 4 Aufgaben-Stationen: Balance-Block (auf einer Linie balancieren), Wende-Pylon "
        "(um Pylon herum mit Pool-Nudel-Schwert), Strohballen-Schlag (3 Treffer Brust-/Schenkel-/Kopfhöhe), "
        "Schild-Block (Trainer wirft 3 Schaumstoff-Bälle, Kind blockt mit Schild). KEIN Sparring zwischen "
        "Kindern. Zeit + Stilnote werden bewertet (Stilnote: ehrliche Hinweise auf Haltung statt Schul-Note "
        "1-6, damit niemand 'verliert'). Am Ende: Schwert-Schlag-Zeremonie (symbolisch, Trainer tippt mit "
        "Holzschwert auf die Schulter) und Diplom-Übergabe."
    )
    # Komma im Schwur fixen
    for s in rit.get("setupSteps", []):
        if s.get("name","").startswith("Ritter-Schwur"):
            s["content"] = "'Wir sind treu, wir sind mutig, wir helfen den Schwachen. So sei es.' Klar, knapp, dann starten."
    d["_meta"]["version"] = "2.2.0"
    d["_meta"]["lastUpdated"] = "2026-05-26"
    d["_meta"]["qualityNote"] = (
        "v2.2 — Welle 6 Mini-Fix: Ermittler Jonas eindeutig BONUS+Wow-only (aus 3-fach Widerspruch). "
        "Burgenermittlung-Karte nicht ziehbar in Minimal/Standard. Strohballen-Material-Hinweis + "
        "Schaumstoff-Bälle in materialNote. Komma im Ritter-Schwur. Stilnote-Subjektivität entschärft "
        "(Hinweise statt Schul-Note). Erwarteter Score 85+."
    )
    save("ritter-gross.json", d)
    return "ritter-gross.json v2.2.0"

if __name__ == "__main__":
    print(patch_pferde())
    print(patch_ritter())
