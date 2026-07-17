# W14/W13 Worker-Review-Befunde (Opus 4.8 Max, target-blind, inline-Hunks)

**Datum:** 2026-07-17 · **Reviewer:** claude.ai Opus 4.8 Max, Chat c513b5d5 · **Commit reviewt:** 2080330b (draft)
**Methode:** Inline-Code-Hunks (der Raw-Fetch-Weg scheiterte an claude.ai-Opus-Max-Kapazitätslimit → „Antwort nicht geladen")

## Bestätigte Befunde (Stufe 3 gegen echten Code verifiziert)

### MAJOR-1 (client-erreichbar, SICHERHEITSRELEVANT): Waisen-Adoption + W14-Prefill → stiller Allergie-Verlust
- **Trigger:** Host löscht Invite T1 (Gast „Max", allergies:"Nuss" bleibt als Waise, inv=T1), legt neuen Invite T2 gleichen Namens an. Max öffnet ?g=T2, sagt zu, fasst Allergiefeld nicht an.
- **Kette:** Z.1714 `find(inv===T2)` → undefined (Waise hat T1) → Prefill leer → Z.2109 `(""&&INVITE_TOKEN)` → `body.allergies=null` → Z.561 `_delAllergies=true` → Z.578 adoptiert Waise per Name → Z.582 erbt "Nuss" → Z.603 `_delAllergies` überschreibt zu "" → **"Nuss" weg.**
- **Regress durch W14:** Vor W14 sendete der Client "" (kein null-Signal für Token-Gäste) → Z.582 erbte → Allergie blieb. W14s null-Signal (Z.2109 `INVITE_TOKEN`-Disjunkt) bricht das.
- **Root cause:** Z.2109 macht „leer = löschen" für JEDEN Token-Gast, statt „geleertes vorbefülltes Feld = löschen".

### MAJOR-2: Fail-safe-Merge (Z.581-584) toter Code für Token-Gäste
- Client sendet für Token-Gäste nie "" (nur null oder Wert) → `!guest.allergies` (Z.582) ist genau dann wahr, wenn `_delAllergies` (Z.603) den Merge eine Zeile später kassiert. Merge wirkungslos → Widerspruch zu „fail-safe auf allen Update-Pfaden".
- **Wird durch Fix-1 automatisch geheilt** (Client sendet dann "" für nie-befüllte leere Felder → Merge greift).

### MAJOR-3 (nur per handgebautem Request erreichbar, DSGVO): Cross-Gast-Read via Namens-Adoption
- **Trigger:** `curl -d '{"g":"T2","status":"ja"}'` — Allergiefeld WEGGELASSEN (undefined, nicht null/"") → Z.561 false → Z.566 "" → Z.578 adoptiert fremden gleichnamigen Waisen „Max" → Z.582 erbt dessen Allergie → Z.606 Write → Reload ?g=T2 → Z.1967 `value="Nuss"`. Bei zwei VERSCHIEDENEN Kindern namens „Max" liest T2 fremde Gesundheitsdaten.
- **Client sendet das nie** (2109 sendet immer al.value oder null, nie undefined). W14-Prefill hat die vorbestehende Namens-Adoptions-Schuld von „host-sichtbar" auf „gast-lesbar" eskaliert.

## False-Positives (durch meinen gekürzten Inline-Auszug, im echten Code gedeckt)
- **Z.564 status nicht coerct:** echte Z.563 `if(!["ja","nein","vielleicht"].includes(body.status)) return 400` whitelistet status. KEIN Bug.
- **Z.574/606 kein Array.isArray(party.guests):** echte Z.556 `if(!Array.isArray(party.guests)) party.guests=[]`. KEIN Bug.

## Vom Reviewer sauber bestätigt
- esc() vollständig für Attribut-Kontext (&,<,>,",'; & zuerst; kein Ausbruch). W14-XSS sauber.
- W13: kein Markenname mehr in MC/autoColor/Kommentar (16 generische Keys). Sauber.
- Delete-vs-Erben-Reihenfolge (603 nach 582) korrekt; ===null trennt null/undefined/"" sauber.

## Pre-existing MINORs (nicht W14, teils akzeptierte Schuld)
- Z.588 kein Array.isArray(party.invites) → TypeError-500 möglich (walk-in else-branch, party.invites undefined + Alt-inv).
- Z.554 `_invite.n` ungeprüft (kein asStr/trim/slice) — hängt an makeInvites.
- Z.566 pickupTime keine HH:MM-Validierung → input[type=time] rendert Müll leer → nächster Submit löscht.
- Z.207 esc Falsy-Guard (esc(0)→""), Z.1560 autoColor number.toLowerCase → beide nicht gast-getriggert.

## Fix-Plan
- **Fix-1 (MUSS, Client Z.2109-2111):** `INVITE_TOKEN` → `al.defaultValue!==""` (resp pp/pt). Killt MAJOR-1 + neutralisiert MAJOR-2. Low-risk, chirurgisch.
- **Fix-2 (EMPFOHLEN, Server Z.581, DSGVO): ** Erben (582-584) nur bei EXACT-Token-Match (574), nicht bei Namens-Adoption (578). Killt MAJOR-3. ABER: ändert akzeptierte Adoptions-UX (gleicher Mensch mit neu-verlinktem Invite muss Allergie neu eingeben) → Bolle-Flag.
- Danach: fresh target-blind Opus-Re-Review auf den W14-Diff (L15), Stufe 3, Gate 0 MAJORs.
- Worker-Deploy braucht ohnehin frisches cfut_-Token von Bolle.

---

# W15 Autopilot-Review-Befunde (Opus 4.8 Max, target-blind, inline-Hunks)

**Reviewer:** claude.ai Opus 4.8 Max, Chat f29a87cb · **Commit reviewt:** 0bc38c67 (draft) · **Datei:** einladung/studio/index.html

## Adjudizierte Befunde (Stufe 3 gegen echten Code)

### FALSE-POSITIVE: MAJOR-A (Flag außerhalb try, Z.1997/2010 → Dauer-Freeze)
- Reviewer-Trigger „null-Button → TypeError" widerlegt: echte Z.1999/2012 haben `.filter(Boolean)`.
- Reviewer-Trigger „apActive ReferenceError" widerlegt: echte Z.2039 `let apActive=false` deklariert.
- Kein echter Throw-Pfad zwischen `_sharing=true` und `try` → nur latente Struktur-Fragilität. Defensiver Fix (`_sharing=true` als erste try-Zeile) optional, KEIN aktueller Blocker.

### REAL: MAJOR-B (W15b snapshot-Bedingung misst falschen Zustand, Z.1989 vs 1305/1308)
- `_ov` (1989) misst Overflow im AKTUELLEN Umbruchmodus (pre-wrap). fitDownToWidth setzt DANN nowrap (1305) und schrumpft (1308). Umbrechender Text läuft in pre-wrap nie horizontal über → `_ov=false` → kein Snapshot → Shrink passiert trotzdem un-undo-bar.
- **W15b ist weitgehend WIRKUNGSLOS** (schnappschottet den Shrink im Normalfall NICHT). Bricht nichts (schlimmstenfalls kein Undo-Punkt = wie vor W15b), erreicht aber sein Ziel nicht. W15-attributabel.

### PRE-EXISTING (A5-2, LIVE — nicht W15): MAJOR-C (fitDownToWidth mutiert unbedingt, WYSIWYG-Risiko)
- fitDownToWidth setzt nowrap (1305) + materialisiert fontSize inline (1307) + autoHeight (1309) UNBEDINGT, auch ohne Overflow. Der Header-Kommentar („nur fontSize", „bei Overflow") ist falsch.
- Potenzieller OUTPUT-Schaden: mehrzeiliger mission-Text → im PNG geschrumpfte Einzeile (nowrap). WYSIWYG bricht. ABER: pre-existing seit A5-2 und live → wenn es Exports flächig bräche, wäre es im A5/A6-Playtest aufgefallen. **Braucht Playtest-Bestätigung**, separates Ticket, NICHT W15-Gate.

### REAL: MAJOR-D (W15c Timeout-Zweig stumm + Telemetrie-Skew, Z.2020/2021)
- Bei 30s-Timeout: `err.message==='share-timeout'` → catch überspringt downloadFallback → KEIN Toast/Alert/track. User bekommt nichts, Share-Sheet evtl. offen, Datei weder geteilt noch gespeichert.
- Zweitschaden: Erfolgreiche Shares >30s (User settlet nach Timeout) → track/toast in 2020 laufen nie → Telemetrie unterzeichnet langsame Geräte.
- **Design-Frage:** navigator.share ist pending-BY-DESIGN, solange der Share-Sheet offen ist. Ein 30s-Timeout feuert für JEDEN User, der >30s im Sheet braucht (häufig!) → gibt ihm den stummen Fehlerpfad. Der Watchdog schadet normalen langsamen Shares mehr als er den seltenen iOS-Hang-Fall rettet. **W15c ist fraglich bis net-negativ.**

### UNSICHER
- Z.1992: Watchdog sitzt auf navigator.share (pending-by-design), nicht auf dem echten Hang-Risiko (renderInvitationCanvas → loadImage). ABER loadImage HAT `img.onerror=reject` (Z.1821) → kaputte Bilder rejecten; nur ein nie-antwortender Netz-Request hinge (selten, Studio nutzt Data-URIs). Niedrig-Risiko.
- Z.1809: keydown-Guard redundant (clearSelection Z.1985 setzt selected=null synchron vor jedem await → 1810 returnt ohnehin) UND unvollständig (natives Tippen in fokussiertes contenteditable umgeht den Listener). Harmlos, aber weitgehend zwecklos.
- overflow:visible auf .design-el würde scrollWidth-Check entwerten (prüfbar: getComputedStyle(...).overflowX).

## W15-Verdikt
- **W15a (Guards):** undo/reset-Guards harmlos-ok; keydown-Guard redundant. Kein Regress. MAJOR-A False-Positive.
- **W15b (snapshot):** weitgehend wirkungslos (Bedingung falsch). Bricht nichts, erreicht Ziel nicht.
- **W15c (Watchdog):** fraglich-bis-schädlich (timeoutet legitime langsame Shares stumm).
- **Kein Regress am schnellen Happy-Path** (<30s Share + kein Overflow läuft sauber durch).
- **Empfehlung:** W15b + W15c zurückrollen (ineffektiv/schädlich), W15a-undo/reset-Guards behalten; fitDownToWidth (MAJOR-C, pre-existing-live) separates Playtest-Ticket. → Bolle-Entscheidung.

