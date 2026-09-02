# -*- coding: utf-8 -*-
"""machsleicht-Pruefstand · Proben — je eine absichtlich gebrochene Zusage.

Jede Probe bricht GENAU EINE Zusage in der Arbeitskopie und erwartet, dass die
zustaendige Stufe rot wird. Wer eine Stufe ergaenzt, ergaenzt hier eine Probe —
sonst ist die Stufe eine Behauptung.

Auswahlregel fuer neue Proben: nimm den Fehler, der WIRKLICH passiert ist. Die
sechs hier stammen alle aus echten Vorfaellen (Hand-Edit an generierter Seite,
inkonsistentes Eszett, Redaktionsnotiz im Produkt, auseinanderlaufende Kataloge,
vergessene Werbekennzeichnung, freier Bezeichner im Worker-Template).

Bewusst NICHT gemessen: ob eine Stufe zu viel faengt (Fehlalarm). Dafuer ist der
Gegenprueferauftrag da — eine Maschine kann nicht beweisen, dass eine Regel
sinnvoll ist, nur dass sie greift.
"""
from __future__ import annotations

from selbstpruefung import Gate, Probe

ALLE = [

    # --- Stufe 36: "Maschine fixen, nicht das Paket" (Helfer V5, R2) -------------
    # Der Hand-Edit an einer generierten Seite ist die teuerste Fehlerklasse des
    # Projekts: er verschwindet beim naechsten Lauf spurlos, und der Reviewer hat
    # umsonst gelesen. Wenn diese Stufe stumpf ist, ist R2 nur ein Vorsatz.
    Probe(
        name="stufe-36-handedit",
        warum="Eine von Hand geaenderte generierte Seite muss auffallen",
        gate=Gate.skript("_dev/scripts/check-maschinen-stand.py"),
        datei="kindergeburtstag/baustelle-3-5-jahre.html",
        suchen="Baustelle-Kindergeburtstag",
        ersetzen="Baustellen-Kindergeburtstag",
    ),

    # --- Stufe 24: Eszett-Konsistenz -------------------------------------------
    # Aus dem meerjungfrau-Review: dasselbe Blatt trug "draussen" und "draußen".
    # Sichtbare Schludrigkeit auf einem Produkt, das auf dem Kuechentisch liegt.
    Probe(
        name="stufe-24-eszett",
        warum="ss statt Eszett in gedrucktem Text muss auffallen",
        gate=Gate.skript("_dev/scripts/check-eszett.py"),
        datei="data/motto/baustelle-klein.json",
        suchen="draußen",
        ersetzen="draussen",
    ),

    # --- Redaktionsnotizen im Produkt ------------------------------------------
    # "TODO", "SEO", nackte URLs: alles, was im Arbeitsstand normal ist und im
    # gedruckten Blatt eines Elternteils nichts zu suchen hat.
    Probe(
        name="interne-notiz-im-produkt",
        warum="Eine Redaktionsnotiz darf nicht bis ins gedruckte Blatt kommen",
        gate=Gate.skript("_dev/scripts/check-interne-notizen.py"),
        datei="data/motto/baustelle-klein.json",
        suchen="Sand-Bagger-Spiel",
        ersetzen="Sand-Bagger-Spiel (TODO: Namen pruefen)",
    ),

    # --- Stufe 64: Sperrklinke der zwei Spielkataloge ---------------------------
    # Die Stufe entscheidet nichts, sie haelt den Stand fest (137 ohne
    # Entsprechung). Eine Sperrklinke, die nicht einrastet, ist Dekoration.
    Probe(
        name="stufe-64-katalog-driftet",
        warum="Ein Spiel ohne Entsprechung auf der Seite darf die Deckung nicht heimlich senken",
        gate=Gate.skript("_dev/scripts/check-katalog-deckung.py"),
        datei="data/motto/baustelle-klein.json",
        suchen="Bauklotz-Burg gemeinsam bauen",
        ersetzen="Warpkern-Kalibrierung fuer Fortgeschrittene",
        # Alle drei Varianten: check-katalog-deckung.py liest NUR die Variante
        # id=="standard" — und die steht an Position 1, nicht 0. Der erste Lauf
        # mutierte 'minimal' und meldete die Stufe faelschlich als stumpf.
        anzahl=-1,
        erwartete_treffer=3,
    ),

    # --- Stufe 58: Werbekennzeichnung ------------------------------------------
    # 18.08.: einkauf-drucken.py gab sechs Seiten je 19 Affiliate-Links und
    # vergass den Hinweis. Gefunden hat es eine Handpruefung, nicht ein Gate.
    Probe(
        name="stufe-58-werbekennzeichnung",
        warum="Partnerlinks ohne sichtbaren Hinweis muessen auffallen",
        gate=Gate.skript("_dev/scripts/check-werbekennzeichnung.py"),
        datei="kindergeburtstag/detektiv-3-5-jahre.html",
        suchen="* Affiliate-Links. Für dich ändert sich der Preis nicht.",
        ersetzen="* Preisangaben ohne Gewähr.",
        anzahl=-1,
    ),

    # --- Stufe 30: keine Doppelpunkt-Genderformen im Produkt ---------------------
    # Bolle-Entscheidung 06.08.: nicht gendern. Anlass war ein Vorlese-Text —
    # "Ritter:innen" liest ein Kind als "Ritter Doppelpunkt innen".
    Probe(
        name="stufe-30-gendersprache",
        warum="Eine Doppelpunkt-Genderform im Vorlese-Text muss auffallen",
        gate=Gate.skript("_dev/scripts/check-gendersprache.py"),
        datei="data/motto/baustelle-klein.json",
        suchen="Sand-Bagger-Spiel",
        ersetzen="Sand-Bagger-Spiel fuer Bauarbeiter:innen",
        anzahl=1,
        erwartete_treffer=1,
    ),

    # --- Stufe 60: die Gaesteseite rendert ueberhaupt ---------------------------
    # L14 (17.07.): ein freier Bezeichner in einem Template-Literal ist syntaktisch
    # gueltig, faellt in keinem Build auf und macht zur Laufzeit JEDE Gaesteseite
    # zum 500er. Diese Probe ist der teuerste Ausfall des Projekts in klein.
    Probe(
        name="stufe-60-freier-bezeichner",
        warum="Ein freier Bezeichner im Worker-Template macht jede Gaesteseite kaputt",
        gate=Gate.knoten("_dev/scripts/check-partyseite-render.mjs"),
        datei="party-worker.js",
        suchen="Du bist eingeladen!",
        ersetzen="Du bist eingeladen! ${UNBEKANNTER_BEZEICHNER}",
        # Anker aufs <h1>: die erste Fundstelle im File (Zeile 1855, ogTitle) liegt
        # in einem doppelt gequoteten String — dort ist ${...} nur Text und bricht
        # nichts. Ohne Anker prueft diese Probe das Gegenteil von dem, was sie soll.
        anker="<h1",
        erwartete_treffer=1,
    ),
    # --- Der Kordon selbst: faellt eine Naht weg, MUSS scharf() abbrechen ------
    # Fassung 1 tat genau das nicht: sie prueefte je Schicht eine einzige Naht und
    # meldete "Selbsttest bestanden (4 Schichten)", waehrend os.system, UDP, DNS und
    # jeder Repo-Schreibzugriff offen standen (Gegenpruefung 02.09., 6 MAJOR).
    # Diese drei Proben sind diese Lehre als Maschine — je eine Naht raus, Rot erwartet.
    Probe(
        name="kordon-naht-os-system",
        warum="Ohne os.system-Haken startet ein Deploy an der Sperre vorbei",
        gate=Gate.skript("_dev/pruefstand/kordon.py"),
        datei="_dev/pruefstand/kordon.py",
        suchen="    os.system = _system",
        ersetzen="    pass  # Naht entfernt (Probe)",
        erwartete_treffer=1,
    ),
    Probe(
        name="kordon-naht-schreibsperre",
        warum="Ohne open-Haken schreibt der Pruefstand ins Repo, das er messen soll",
        gate=Gate.skript("_dev/pruefstand/kordon.py"),
        datei="_dev/pruefstand/kordon.py",
        suchen="    builtins.open = _open",
        ersetzen="    pass  # Naht entfernt (Probe)",
        erwartete_treffer=1,
    ),
    Probe(
        name="kordon-naht-dns",
        warum="Ohne getaddrinfo-Haken verlaesst die Namensaufloesung den Rechner",
        gate=Gate.skript("_dev/pruefstand/kordon.py"),
        datei="_dev/pruefstand/kordon.py",
        suchen="    socket.getaddrinfo = _getaddrinfo",
        ersetzen="    pass  # Naht entfernt (Probe)",
        erwartete_treffer=1,
    ),
    Probe(
        name="kordon-naht-entquoten",
        warum="Ohne Entquotung zerhackt 'g\"\"it p\"\"ush' den Kommando-Vergleich",
        gate=Gate.skript("_dev/pruefstand/kordon.py"),
        datei="_dev/pruefstand/kordon.py",
        suchen="    text = _entquoten(roh.lower())",
        ersetzen="    text = roh.lower()  # Naht entfernt (Probe)",
        erwartete_treffer=1,
    ),
    Probe(
        name="kordon-naht-udp",
        warum="Ohne sendto-Haken gehen Daten per UDP hinaus, waehrend das Gate gruen meldet",
        gate=Gate.skript("_dev/pruefstand/kordon.py"),
        datei="_dev/pruefstand/kordon.py",
        suchen="    socket.socket.sendto = _sendto",
        ersetzen="    pass  # Naht entfernt (Probe)",
        erwartete_treffer=1,
    ),
    # --- Stufe 18: verhaltensgleiche Zwillinge ---------------------------------
    # Der Kommentar an beiden Fassungen sagt "Stufe 18 prueft das". Ein Kommentar, der
    # eine Stufe zitiert, ist nur so viel wert wie die Stufe — deshalb hier der Beweis,
    # dass sie beisst. Anlass war poss(), das am 05.08. auseinanderlief.
    Probe(
        name="stufe-18-doppelte-helfer",
        warum="Zwei Fassungen derselben Funktion muessen gleich rechnen",
        gate=Gate.skript("_dev/scripts/check-doppelte-helfer.py"),
        datei="paket/core/paket-core.js",
        suchen="/[sßxz]$/i.test(n)",
        ersetzen="/[sxz]$/i.test(n)",
        erwartete_treffer=1,
    ),
    # --- Stufe 65: Liste im Code gegen die Platte -------------------------------
    # Gebaut am 02.09. aus dem prinzessin-Fund: ein fertiges Paket, das niemand
    # aufrufen kann. Die Probe bricht die andere Richtung — ein Eintrag ohne Datei.
    Probe(
        name="stufe-65-freischaltliste",
        warum="Ein Listeneintrag ohne Datei ist ein Link ins Leere und muss auffallen",
        gate=Gate.skript("_dev/scripts/check-freischaltlisten.py"),
        datei="kindergeburtstag.html",
        suchen="piraten:   {emoji:",
        ersetzen="gibtesnicht: {emoji:",
        erwartete_treffer=1,
    ),
    # --- Stufe 62 Fassung 2: Allowlist statt Obergrenze --------------------------
    # Der Mechanismus ist "ein geteilter Satz, der NICHT in der Allowlist steht, ist ein
    # neuer Baustein". Die Probe nimmt einen Eintrag aus der Liste — dann muss genau
    # dieser Satz als neuer Baustein auffallen. Fassung 1 haette hier nichts gemerkt:
    # sie zaehlte nur, und 8 waren erlaubt.
    Probe(
        name="stufe-62-neuer-baustein",
        warum="Ein Satz auf mehreren Motto-Seiten, der nicht begruendet ist, muss auffallen",
        gate=Gate.skript("_dev/scripts/check-motto-eigenanteil.py"),
        datei="_dev/scripts/check-motto-eigenanteil.py",
        suchen='"Der machsleicht-Planer berechnet automatisch Mengen und Kosten pro Kind.":',
        ersetzen='"__aus_der_allowlist_entfernt__":',
        erwartete_treffer=1,
    ),
    # --- Stufe 66: keine neue Waise -------------------------------------------
    Probe(
        name="stufe-66-neue-waise",
        warum="Ein Skript, das ins Repo schreibt und keinen Aufrufer hat, muss auffallen",
        gate=Gate.skript("_dev/scripts/check-waisen-generatoren.py"),
        datei="_dev/scripts/check-waisen-generatoren.py",
        suchen="MAX_WAISEN_MIT_SCHREIBZUGRIFF = 65",
        ersetzen="MAX_WAISEN_MIT_SCHREIBZUGRIFF = 64",
        erwartete_treffer=1,
    ),

    # --- Stufe 67: veralteter Cache-Buster --------------------------------------
    # Die Stufe ist heute rot (vier echte Faelle) und deshalb im Linter nur gelb.
    # Die Probe misst trotzdem, ob sie BEISST — an der umgekehrten Richtung: wenn
    # jeder Buster aktuell waere, muesste sie gruen sein. Dafuer wird das Datum
    # eines Falls nach vorn gesetzt.
    Probe(
        name="stufe-67-cache-buster",
        warum="Ein Cache-Buster aelter als seine Datei liefert Nutzern alten Code",
        gate=Gate.skript("_dev/scripts/check-cache-buster.py", timeout=900),
        datei="_dev/scripts/check-cache-buster.py",
        suchen="if stand and datum < stand:",
        ersetzen="if stand and datum < '19700101':",
        erwartete_treffer=1,
        nicht_beweisbar=(
            "Stufe 67 misst gegen die GIT-HISTORIE. Die Arbeitskopie bekommt beim "
            "Anlegen einen frischen Commit, also ist dort jede Datei 'von heute' und "
            "jeder Buster zu alt — gemessen 02.09.: die Stufe meldet in der Kopie 45 "
            "und 15 Referenzen als veraltet, die es real nicht sind. Ihr Biss ist "
            "stattdessen direkt im Repo belegt: sie hat vier echte Faelle gefunden "
            "(core.js, core.css, paket.css, paket-core.js), die vorher niemand sah."),
    ),
    # --- Stufe 69: Pruefauftrag ohne False-Positive-Liste -----------------------
    Probe(
        name="stufe-69-auftrag-gedaechtnis",
        warum="Ein Pruefauftrag ohne die Widerlegt-Liste kostet eine ganze Gutachten-Runde",
        gate=Gate.skript("_dev/scripts/check-pruefauftrag-gedaechtnis.py"),
        datei="_dev/scripts/check-pruefauftrag-gedaechtnis.py",
        suchen="MAX_OHNE = 3",
        ersetzen="MAX_OHNE = 2",
        erwartete_treffer=1,
    ),

    # --- Stufe 65, vierte Liste: Wizard gegen Worker ----------------------------
    # Der teuerste stille Fehler im Produkt: eine gameId, die der Worker nicht kennt,
    # faellt wortlos auf das Legacy-Spiel zurueck. Das Kind bekommt ein anderes Spiel
    # als die Eltern ausgesucht haben, und nichts meldet sich.
    Probe(
        name="stufe-65-wizard-gegen-worker",
        warum="Ein Spiel, das der Wizard anbietet und der Worker nicht kennt, muss auffallen",
        gate=Gate.skript("_dev/scripts/check-freischaltlisten.py"),
        datei="kindergeburtstag.html",
        suchen='"id":"piraten-klassik"',
        ersetzen='"id":"piraten-klassikk"',
        erwartete_treffer=1,
    ),
]
