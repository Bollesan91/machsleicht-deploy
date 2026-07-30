# REVIEW-PAKET: Paket V2 (QR + Vorleser + Stationen + Party-Pass-Verzahnung) — 30.07.2026
Repo: Bollesan91/machsleicht-deploy (public), draft HEAD 2628761dbf7df180cd155b2fe9035866921fd13b. Basis: der bereits
gegatete + deployte Piraten-Pilot (2 Reviews, 92/100). Dieses Review prueft NUR die V2-Deltas.

## V2-DELTAS
1. NEU paket/core/qr.js — eigener QR-Encoder (ISO 18004, Byte-Modus, EC M, V1-6, 8 Masken
   mit Penalty). BEREITS deterministisch verifiziert: jsQR-Decode-Roundtrip 9 Faelle gruen
   (inkl. UTF-8, Kapazitaetsgrenzen); Generator-Polynom gegen ISO-Referenz geprueft.
2. paket/piraten/index.html erweitert:
   - Vorleser (speechSynthesis de-DE) auf Spielkarten/Stationskarten/Stations-Modus (nur Screen)
   - Schatzsuche-STATIONSKARTEN aus /data/schatzsuche.json (5 je Altersgruppe) mit QR
     -> Stations-Modus ?s=N (eine Station gross am Handy, Vorlese-Knopf, Prev/Next)
   - BORDPOST verzahnt mit Party-Pass: invites (Name+Rolle+Mission, ROLES_P-Spiegel des
     Worker-ROLE_CATALOG, persoenlicher ?g-Token-QR) > zugesagte Gaeste > Blanko + Hinweis
   - QR auf Spielstation (PARTYURL) + jeder Bordpost-Karte
   - 5 neue Blaetter: Countdown-Poster, Eltern-Handzettel (4x Schnitt + WhatsApp-Text),
     Danke-Karten (mit deterministischem Piraten-Beinamen), Logbuch, Tischkarten mit Rolle/Beiname
   - Demo-invites mit Rollen-IDs+Fake-Tokens (Testpfad)

## VOLLFILES (selbst fetchen)
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2628761dbf7df180cd155b2fe9035866921fd13b/paket/piraten/index.html
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2628761dbf7df180cd155b2fe9035866921fd13b/paket/core/qr.js
Datenbeispiel: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2628761dbf7df180cd155b2fe9035866921fd13b/data/schatzsuche.json

## PRUEFAUFTRAG — verifizieren, je Finding: Zitat + MAJOR/MINOR/UNSICHER + Korrektur.
1. XSS auf den NEUEN Interpolationen: Rollen-IDs/Missionen, Stationstexte (s.name/desc/hint),
   Beinamen, invite-Tokens in URLs (encodeURIComponent?), data-say-Attribute (Attribut-Kontext!),
   Stations-Modus-Rendering. Gastnamen + invites sind FREMDE Eingaben. Payloads durchrechnen.
2. Token-Sicherheit: stationUrl() nimmt bewusst NUR id (kein edit-Token) — stimmt das ueberall?
   Traegt irgendein QR/Link versehentlich den editToken? Bordpost-?g-Token: ok so (Gast-Token
   gehoert auf die Gast-Einladung), aber prueme: leakt er in Umami-Events oder aria?
3. QR-Einbindung: MLQR.svg im String-Kontext (qrBlock) — Groessen, quiet zone, Druckschaerfe
   (shape-rendering crispEdges), Verhalten wenn MLQR fehlt (script-Ladefehler) oder URL >106 Bytes
   (lange ?g-Tokens + demo-Params — rechne die laengste real moegliche URL nach!).
4. Stations-Modus: Param-Parsing (s=0? s=99? nicht-numerisch?), renderStation ohne SCHATZ,
   Navigation-URLs, Legal-Footer versteckt (ok? Impressumspflicht der Unterseite?).
5. speechSynthesis: mlSpeak-Fehlerpfade, mehrfaches Klicken, cancel-Verhalten, iOS-Sicht.
6. Bordpost-Prioritaetslogik: invites > confirmed > blank — Randfaelle (invites vorhanden aber
   Gast hat schon zugesagt: doppelte Karte? Kein Doppel — pruefe die Logik!), roleLabel-Drift.
7. Print: neue Blaetter (Poster/Handzettel/Danke/Logbuch/Stationen) — break-inside, QR im Druck,
   .screen-only-Abdeckung (Vorleser/wacopy duerfen nicht drucken).
8. Blinde Flecken.

Abschluss: MAJORs (0 = deploybar auf Bolle-Wort), MINORs, UNSICHER. Score = Telemetrie.
