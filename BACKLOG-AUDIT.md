# machsleicht.de — Backlog

**Letzte Aktualisierung:** 14.07.2026 (Komplett-Neuaufbau nach Studio-Launch; alte Fassung vom 26.05. unverändert in `_dev/archive/BACKLOG-AUDIT-2026-05-26.md`)
**Zweck:** Einzige Quelle für offene PBIs. Strategie-Kontext in `STRATEGIE.md`, Tages-Stand in `SESSION-NOTES.md`.
**Struktur:** JETZT → NEXT → PREMIUM-PIPELINE → SPÄTER → WARTUNG/SCHULDEN → Auflösung der Alt-Items.

---

## Realitäts-Abgleich: Was sich seit 26.05. fundamental geändert hat

Das alte Backlog kannte weder den Wizard-Funnel noch das Studio. Faktenlage heute:

1. **Wizard-Funnel LIVE** — nicht als geplante `/wizard`-React-App (P7), sondern als Scroll-Funnel in `kindergeburtstag.html` (Motto → Eckdaten → Einladung & Partyseite → Plan → Fertig), inkl. E-Mail-Pflicht mit Vertrauens-Copy, Warteliste (`/api/waitlist`), Plan-Folds mit 100% Affiliate-Einkaufsliste, Magic-Moment-Teaser. **P7-1..7 damit faktisch anders gelöst.**
2. **Einladungs-Refactor KOMPLETT** (ex P6-1/G7): alle 15 Motto-Hubs + `/vorlagen/` + App-Moves nach `/whatsapp/`, App-Shells noindex.
3. **60 Spiele auf Core-Engine, alle durchs Einzel-Gate**; alle 15 Mottos × 5 Spiel-Optionen in der Partyseiten-Galerie; Demo-Kinderfoto in allen Previews + Demo-Modus (toter `/birthday-photo.jpg` repariert).
4. **Einladung Studio LIVE** (`/einladung/studio/`, Soft Launch, noindex): Canva-artiger Bild-Editor, Planer-Prefill (localStorage-Kontrakt), lokaler QR (mathematisch verifiziert), Canvas-Export 1260×2238, doppelt extern begutachtet + V14-gehardened (10 Fixes, auf draft — **Deploy ausstehend**).
5. **Partyseite:** 14-Tage-Auto-Löschung nach Partydatum + DSGVO-DELETE-Endpoint + DSE-Rewrite. Adress-Gating (nur nach Zusage) existiert.
6. **Cloudflare:** HTML-Cache-Regel am 24.06. ENTFERNT (AQ8 im Alt-Backlog ist damit überholt) — Deploys sofort live, `cf-cache-status: DYNAMIC`, kein Purge.
7. **Strategie-Docs 14.07.** (ChatGPT + Claude-Triage): Kurs = Erlebnisplattform statt Canva-Klon. Autopilot/Party-Pass/Audio als Pipeline. Prinzipien: PNG bleibt Bild, alles Interaktive auf die Partyseite; keine freie KI mit Kindern; Vorname reicht; „automatisch fertig, optional anpassbar".

---

## 🔥 JETZT (diese Woche)

| # | Status | Ticket | Kurzbeschreibung | Aufwand |
|---|--------|--------|------------------|---------|
| J1 | ⏳ | P8-0a | `[KERN]` **Studio-V14-Deploy** — Hardening liegt fertig auf draft (`deef140`); Live-Stand hat noch den Mobile-Clipping-Bug. Nur Bolles „deploy" nötig. | 10 Min |
| J2 | ⏳ | P8-0b | `[KERN]` **iPhone-Realtest Studio** (Bolle, am Live-System nach J1): Export, Teilen/Share-Sheet, QR-Scan mit Kamera, Prefill aus Planer, Speichern/Reload. Gerät+iOS-Version notieren. | 20 Min |
| J3 | ⏳ | P8-0c | `[KERN]` **15-Motto-Sichtprüfung Studio** — jedes Theme einmal durch alle 3 Layouts, Export-Stichproben (Screenshots-Serie machbar durch Claude, Abnahme Bolle). | 1–2 Std |
| J4 | ⏳ | P8-1 | `[KERN]` **Einladungs-Autopilot** — „Deine Einladung ist fertig 🎉"-Screen als erste Ebene: 3 kuratierte Varianten (klassisch / Foto-emotional / modern) aus Planer-Daten, Wischen/Wechseln, „Fein anpassen" öffnet den Editor. Größter Conversion-Hebel; Prefill + 3 Layouts existieren bereits. | 1 Session |
| J5 | ⏳ | P8-2 | `[KERN]` **Share-Paket** — vorformulierte WhatsApp-Nachricht (Name/Alter/Link), „Nachricht kopieren", Erinnerungs- und Änderungs-Textbausteine; Status-Hochformat später. | 2–3 Std |
| J6 | ⏳ | P8-3 | `[KERN]` **Adressschutz-Toggle** aufs PNG: „Hamburg-Eimsbüttel · genaue Adresse nach Zusage" — konsistent mit existierendem Worker-Gating. | 1–2 Std |
| J7 | ⏳ | P5-Q7 | `[KERN]` **Umami-Funnel-Konfiguration** (aus Alt-Backlog AQ7, jetzt dringlicher): Goals/Funnel im Dashboard (wizard_stage → plan_ready → psActivate → studio_open → studio_export/share), Events als Tracked markieren, Affiliate-Click-Event. Ohne Messung keine Autopilot-/Monetarisierungs-Validierung. | 3–4 Std |

Regel für J4–J6: ein gemeinsames Review-Gate (Gist + ChatGPT-Winkel wie etabliert), dann ein Deploy.

## 🎯 NEXT (2–4 Wochen)

| # | Status | Ticket | Kurzbeschreibung | Aufwand |
|---|--------|--------|------------------|---------|
| N1 | ⏳ | P8-4 | `[KERN]` **Design-Check-MVP** — Pre-Export-Overlay: Datum/Zeit leer? Foto leer? Kontrast? (Vieles verhindert die Engine konstruktiv — kein „Automatisch schön machen"-Versprechen.) | 0,5 Tag |
| N2 | ⏳ | P8-5 | `[KERN]` **Gast-Missionen + Party-Pass** (DER Differenzierer): personalisierte Gast-Links via **Token** (nie Klarname in URL), Rolle je Kind, 1-Tipp-Zusage, Party-Pass verbindet Einladung→Zusage→Rolle→Stationen→Urkunde. Worker: Gast-Token-Routen + RSVP-Verknüpfung. | 3–5 Tage |
| N3 | ⏳ | P8-6 | `[KERN]` **Emoji-Schnellleiste mobil** (− / Größe / + / Deckkraft / Fertig am unteren Rand statt großem Panel) — aus Gutachten #3, Feature nicht Hardening. | 0,5 Tag |
| N4 | ⏳ | P8-7 | `[KERN]` **Wizard-Re-Gate** — frischer Reviewer-Tab auf den Stage-Tausch-Stand (61er-Gate ist vor Phase A/B). Danach ehrliche Zahl statt Schätzung. | 1 Gate |
| N5 | ⏳ | P1-60 | `[KERN]` **Reminder-System Partyseite** (7-Tage-vorher-Mail, Unsubscribe; DOI-Text verspricht es bereits!) — Cron im Worker. | 5–7 Std |
| N6 | ⏳ | P8-8 | `[KERN]` **Audio-Einladung auf Partyseite** (Strategie-Doc #1, Phase 2): geskriptete Motto-Stimmen (Professor Rex & Co.), Play-Teaser aufs PNG, Audio nur auf Partyseite, MVP ohne personenbezogene Daten. | 2–3 Tage |

## 💰 PREMIUM-PIPELINE (Monetarisierung, ersetzt „Welle Alpha" von 26.05.)

Der Alt-Plan (statisches Canva-PDF + Stripe, P5-1..9) ist überholt: **Das Studio ist jetzt die Design-Engine.** Neue Kette:

| # | Status | Ticket | Kurzbeschreibung | Trigger |
|---|--------|--------|------------------|---------|
| M1 | ⏳ | P8-9 | **Design-Gesamtpaket** aus einem Studio-Design (paintCard-Engine, andere Formate): Willkommensschild, Namensschilder, Tischkarten, Stationskarten, Urkunden, Danke-Karte … Upsell ~9,90 € oder im Stressfrei-Paket. | nach J4 + N2 |
| M2 | ⏳ | P8-10 | **Audio-Stationen Dino 6–8** (QR-Audios pro Station im Druckpaket — „geführte Party", stärkstes Stressfrei-Feature laut beiden Docs). | nach N6 |
| M3 | ⏳ | P8-11 | **Geburtstagssong-Beta** (nur offizielle API; Vorname+Alter+Motto+max. 3–6 Gäste-Vornamen; 6,90–9,90 €). | nach M2 |
| M4 | ⏳ | P5-4 | **Payment-Provider** (Stripe Payment Link o. Lemon Squeezy) — wird gebraucht, sobald M1 steht. Erfolgskriterium bleibt: ≥3 Käufe in 3 Wochen, sonst Hypothese überarbeiten. | mit M1 |

Preisleiter (aus Strategie-Doc, Richtwerte): Free (Bild-Einladung+Partyseite+RSVP) → Plus (Audio-Einladung 2,90–4,90) → Stressfrei (Druckpaket) → Deluxe (+Stationen/Song/Trailer 19,90–29,90).

## 🌙 SPÄTER (strategisch, nicht anfangen)

- **Party-Day-Modus / Kommandozentrale** (kindspezifisch: Abholung, Foto-Erlaubnis, Geschwister, Notfallnummer — Allergien existieren im RSVP) `P8-12`
- **Party-Rückblick / Danke-Karte** (Gast-Fotos, Erinnerungsseite, Wiederkehr nächstes Jahr) `P8-13`
- **Einladungs-Trailer** (15-Sek-Video) + **Kinder-Kreativmodus** (5 sichere Entscheidungen) `P8-14`
- **Interaktives Portal-Feinschliff**: Gast-Personalisierung in den Spiel-Einladungen (Kern existiert: 60 Spiele + QR→Partyseite) `P8-15`
- machsruhig.de-Launch (P3-6, inkl. Resend-Domain-Pflichten — Details im Archiv) · Adventskalender/Geschenkeberater (P1-13/14, Herbst) · Standalone /wunschliste (P2-17, Weihnachts-Peak) · Pinterest (Trigger 5.000 Besucher/Monat)

## 🔧 WARTUNG & SCHULDEN

| # | Ticket | Kurzbeschreibung |
|---|--------|------------------|
| W1 | P0-GSC | **GSC-Recovery beobachten** — 410er/Sitemap-Fixes seit 08.06. live, De-Index-Erholung braucht Monate. Nächster Messpunkt: GSC-Indexierungszahlen prüfen (Bolle). |
| W2 | P5-Q5 | Ahrefs-SEO-Hygiene (Meta-Längen, Canonical-Chains, interne Redirect-Links) — 6–10 Std, Status seit 27.05. unklar → vor Start re-auditieren. |
| W3 | P8-W1 | Wizard-Zombie-UI (~200 Z. Drawer/openWizard/setInviteType tot) + aria-modal/Fokus-Traps + U1-Vollkollaps (aus Wizard-Gate, P2). |
| W4 | P8-W2 | .ics-Kalender-Datei + party-spezifisches OG-Bild + Referrer/Umami-Query-Pass auf Gast-URLs (Gate-Reste). |
| W5 | P8-W3 | Terminologie-/Zahlen-Konsistenz-Sweep Funnel (Task #76) + Plan-Redundanz-Dedup Schatzsuche↔Zeitstrahl (Task #75). |
| W6 | P8-W4 | Spiele-Feinschliff-Reste: Juice-Pass Top-Cluster (#58), Blickrichtungs-Sweep (#64), Re-Score-Welle als Bestätigung (#78), Magic-Moment-Flächen-Verify gegen SESSION-NOTES (#80), Test-Party-Audit Wunschliste/Gast-Sicht (#79). |
| W7 | P8-W5 | Studio-Export-Treue-MINORs (Emoji-/Badge-Schatten im Export, Clean-Adress-Wrap) — dokumentiert-akzeptiert, bei Gelegenheit. |
| W8 | P8-W6 | wappen + puzzle-dschungel: reveal-last-Konflikt konzeptionell lösen (geparkt seit 10.07.). |
| W9 | P1-8 | Motto-Hauptseiten-Elite-Ausbau (Einhorn/Feuerwehr/Safari-6-8 fertig; Rest via `motto-optimizer`-Skill) — kontinuierlich. |
| W10 | P8-W7 | **KV-Race auf `party:<id>` (bewusste Schuld, Gate-F3 16.07.)**: Read-modify-write ohne CAS — wenn mehrere Eltern im selben Sekundenfenster zusagen (30 Pass-Links in Klassen-WhatsApp!), gewinnt der letzte Write, Zusagen inkl. Allergien gehen lautlos verloren. Bei aktuellem Traffic akzeptiert. Fix-Optionen wenn Traffic kommt: Durable Object pro Party als Schreib-Serialisierer (sauber) oder Gäste als Einzelkeys `guest:<id>:<token>` + list()-Aggregation (pragmatisch). **Ziehen BEVOR die erste echte Klassen-Chat-Welle kommt** (Re-Check-Mahnung 16.07.). |
| W11 | P8-W8 | Invite-Entfernen-Fehlerpfad (Re-Check-Rest zu Gate-F10): schlägt `saveInvites` nach dem optimistischen Entfernen fehl (Netz), zeigt die UI die Zeile weg, Server hat sie noch — im catch Eintrag zurück-pushen oder Liste neu laden. Kosmetik, kein Blocker. |

---

## Auflösung der Alt-Items (26.05. → heute)

| Alt | Verdikt | Begründung |
|---|---|---|
| P0-GSC | → W1 | Fixes live, Geduldsphase; Messpunkt offen |
| P6-1 / G7 (Einladungs-Refactor) | ✅ ERLEDIGT | 15 Hubs + Vorlagen + App-Moves, Juni/Juli |
| P7-0 (Motto-Single-Source) | ✅ faktisch erledigt | 15 Mottos überall einheitlich; theme-registry.js existiert. Rest-Konsolidierung nur bei Bedarf |
| P7-1..7 (/wizard-React-App) | ✅ ANDERS GELÖST | Scroll-Funnel in kindergeburtstag.html inkl. Stage-Logik, Save/Resume, Conversion-Netz. Kein separates /wizard |
| P5-1..3, P5-5..9 (Welle Alpha statisch) | ♻️ ERSETZT durch M1–M4 | Studio-Engine statt Canva-Statik; Erfolgskriterium (≥3 Käufe/3 Wochen) übernommen |
| P5-4 (Payment) | → M4 | unverändert nötig, Zeitpunkt an M1 gekoppelt |
| AQ8 (CF-HTML-Cache-Regel) | ⚠️ ÜBERHOLT | Regel am 24.06. bewusst ENTFERNT (Ahrefs-Artefakt-Diagnose); heute DYNAMIC, kein Purge — siehe CLAUDE.md |
| AQ7 (Umami-Funnel) | → J7 | dringlicher geworden (Studio-Events live, Validierung braucht Messung) |
| AQ5 (Ahrefs-Hygiene) | → W2 | Status re-auditieren |
| AQ4 (Planer-Daten pferde/ritter/baustelle) | ✅ ERLEDIGT | Spiele-Merge/Elite-Plan-Engine: alle 15 Mottos im Picker |
| Planer-Frisur S5 (Einkaufsliste) | ✅ anders gelöst | Plan-Folds + 100%-Affiliate-Einkaufsliste (13.07.) |
| Planer-Frisur S0–S4, S6–S9 | ⏸️ GEPARKT | Cockpit/SOS/KI-Rätsel/RSVP-Bridge: gute Ideen, aber Studio-/Erlebnis-Pipeline hat Vorrang; RSVP-Bridge-Gedanke lebt in N2/P8-12 weiter |
| P1-15 (Email-Capture) | ✅ WEITGEHEND ERLEDIGT | Wizard-E-Mail-Pflicht + Warteliste + autoSendEditLink; offen: Resend-Audience/Env prüfen (Rest in N5 bündeln) |
| P1-60 (Reminder) | → N5 | unverändert offen, DOI-Versprechen! |
| P1-17 A+C (DSGVO Worker-Hinweis/Auto-Delete) | ✅ ERLEDIGT | 14-Tage-TTL nach Partydatum + DELETE-Endpoint + DSE-Rewrite (13.07.) |
| P1-12 (Einschulung) | ✅ LIVE | einschulung.html + checkliste; Traffic-Trigger-Review im Juli offen |
| P2-13 (Gumroad) | ♻️ obsolet | Monetarisierung läuft über M1–M4 |
| P2-15 (Awin) | ⏳ unverändert | 30 Min + Warten; bei Gelegenheit |
| P1-8 (Motto-Elite) | → W9 | kontinuierlich |
| P2-17/P1-13/P1-14/P3-6/P3-11 | → SPÄTER | unverändert |
| P1-21/P1-8b (Kill-List/Content-Inseln) | ⏸️ wartet auf GSC-Daten (W1) | |
| G1–G6 (Welle Gamma) | ♻️ aufgegangen in PREMIUM-PIPELINE + SPÄTER | Pro-Schatzsuche≈M2-Nachbar, Video-Teaser=P8-14, White-Label bleibt ZUKUNFT |
| Übrige P2/P3-Detailtickets | siehe Archiv | nichts davon blockiert; bei Bedarf reaktivieren |
