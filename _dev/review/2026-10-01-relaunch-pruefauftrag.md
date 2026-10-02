# Pruefauftrag: Relaunch-Plan (Fassung v1) — frischer Pruefer

Du prüfst einen Relaunch-Plan (Site-Umzug auf neue Domain ohne Weiterleitungen, Schwerpunkt Google-Indexierung) gegen die mitgelieferte Ist-Analyse und die Google-Referenzliste. Du bist Gegengutachter, kein Lektor: Lob ist wertlos, jeder Befund braucht ein wörtliches Zitat aus dem Plan, eine Einstufung MAJOR / MINOR / UNSICHER und den Beleg (Google-URL oder Zahl aus der Ist-Analyse). Score 0–100 nur als letzte Zeile, ohne Begründung.

Prüfwinkel, nummeriert — zu jedem mindestens ein Satz Befund oder „kein Befund, geprüft an <Stelle>":
1. **Vagheit:** Suche jeden Schritt ohne Kommando/Datei/Dashboard-Pfad, ohne Kontrollzahl im Beleg, ohne Stopp-Kriterium. Zähle sie. Zitiere die drei schlimmsten.
2. **Verbotene Verbindung:** Diffe den Plan gegen die Signal-Matrix (3.3). Findet sich irgendwo ein Redirect, Canonical, Link, geteiltes Bild, geteilter Text, ein Mail-Template oder Trailer-Wasserzeichen, das alt und neu verbindet? Auch indirekt (Impressum-Link „weitere Projekte", Footer, ICS-UID, QR auf Paket-Drucken).
3. **Duplikat-Cluster:** Für jede Launch-Set-URL mit Quelle „neu geschrieben aus alter Seite X": steht eine messbare Überlappungsgrenze und ein Skript dafür? Rechne nach, ob die Grenze unter der heutigen Mottoseiten-Überlappung (7,7 %) liegt.
4. **Google-Aussagen:** Jede Behauptung über Google-Verhalten gegen die Referenzliste prüfen; recherchiere selbst nach, wenn der Plan eine URL nennt, die nicht in der Liste steht. Markiere Zeitangaben ohne ANNAHME.
5. **Hypothesen-Gate:** Trennt der Plan die beiden Hypothesen (Selbstabriss vs. Qualitätsklassifikator) mit einem frühen, billigen Test? Was genau wird gemessen, bis wann, mit welcher Schwelle? Rechne das Launch-Set gegen das Tageslimit der URL-Prüfung — Google nennt keine Zahl, Sekundärquellen einstellig bis etwa zehn; prüfe, ob der Plan das als ANNAHME führt.
6. **Alte Domain:** Enthält der Plan irgendeinen Deploy, noindex, Redirect, Sitemap-Änderung oder Löschung auf machsleicht.de? Jeder Fund ist MAJOR.
7. **Altkunden:** Partyseiten (TTL +14 Tage), Magic-Links (90 Tage), `/e/`-Slugs (kein Ablauf), Pakete, Wartelisten, Erinnerungs-Cron — läuft jedes davon im Plan nachweislich weiter, steht der Funktionsnachweis VOR dem Livegang, und wer zahlt wofür wie lange? Gibt es einen Rollback-Weg je Komponente mit Kommando?
8. **Bolle-Entscheidungen:** Verletzt der Plan eine der bindenden Entscheidungen aus 1.6 (Paket aus dem Plan, Motto-für-Motto, alle 45 Spiele, Plan vor Einladung, Lizenz-Cut, unique content, 14-Tage-Löschung)? Zitat + Stelle.
9. **Spam-Richtlinien:** Doorway (Motto×Alter-Matrix als URLs?), scaled content, site reputation — gibt es im Plan Seiten ohne eigenes Werkzeug-Element?
10. **Kapazität:** Summiere die Stunden je Phase. Passt Phase 1–4 in die genannte Kapazität bis zum ersten Gate? Nenne die Rechnung.
11. **Infrastruktur:** Stimmen Kommandos und Dashboard-Pfade (wrangler-Syntax für Custom Domain, KV-Anlage, Netlify „Add a domain you already own", DNS-Record-Typen für Netlify/Resend/GSC)? Prüfe gegen M5–M9.
12. **„Braucht es das?":** Welche Schritte oder Seiten sind nur Volumen? Welche Phase würde ohne sie genauso ans Gate kommen?
13. **Fehlendes:** Was fehlt, das ein Ausführender am Tag 1 bräuchte (Reihenfolge, Vorbedingung, Secret-Name, Dateipfad)?

Respektiere die False-Positive-Liste (OFFENE-REVIEW-PUNKTE.md), falls mitgeliefert. Ausgabe: Befund-Tabelle (Nr | Winkel | Zitat | Einstufung | Beleg | Fix-Vorschlag in einem Satz), dann drei Sätze Gesamturteil, dann die Score-Zeile.
