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
]
