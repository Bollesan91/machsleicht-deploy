# Defekt-Audit aller 45 Spiele — 2026-07-03

Auslöser: Bolle-Feedback (03.07.) nach huerden-Fix — „guckt mal mehr, ob solche Logikfehler drin sind" + „Blickrichtung flächendeckend ändern". Audit als read-only Workflow (45 Agenten, Haiku 4.5) gelaufen; **jeder Befund von Haupt-Claude gegen Code + Design-Absicht trilagiert** (Haiku hat den Attributions-Verdacht überaggressiv geflaggt — Roh: 20 MAJOR; nach Triage deutlich weniger echte MAJOR).

Methoden-Warnung: Haiku flaggt JEDES `kid()` in der Win-Zeile als Fehl-Attribution — auch die gewollte Reveal-Semantik und den Rollentausch-Twist. Beispiel-Fehlflag: **lianen** Beat-2 („kid lacht: Na endlich, [Gast]! Ich hab auf dich gewartet") ist der GEWOLLTE Twist, kein Fehler. Deshalb zählt unten nur die eigene Triage.

---

## Defekt-Klasse 1 — BLICKRICHTUNG (bewegtes Emoji schaut entgegen der Laufrichtung)

Fix generisch: `transform: … scaleX(-1)` in Basis-Regel UND allen betroffenen Keyframes. Muster wie huerden-Pferd (bereits gefixt).

| Spiel | Sprite | Laufrichtung | Befund | Sicherheit |
|---|---|---|---|---|
| jeep-safari | 🚙 #digger | L→R (Lanes) | schaut links → rückwärts | **hoch — Standard-Flip** |
| korallen-meerjungfrau | 🧜 mermaid | L→R (steer) | schaut links → rückwärts | **hoch — Standard-Flip** |
| bagger-baustelle | 🚜 digger | L→R (Lanes 16→83) | schaut links → rückwärts | **hoch — Standard-Flip** |
| stadt-superheld | 🦸 #hero2 | L→R (steer) | Haiku: schaut links | **PRÜFEN — 🦸 ist oft frontal, evtl. kein Flip nötig** |
| hufeisen-pferde | Wurf-Objekt `.fly` | L→R Bogen + rotate 220° | Haiku las „👠" | **PRÜFEN — geworfenes, rotierendes Objekt, evtl. symmetrisch/egal** |
| spuren-safari | 🦁 walker | Trail L→R (14→88), aber gewunden | schaut links | **PRÜFEN — gewundener Pfad: statischer Flip hilft nur der Netto-Richtung** |
| faehrte-dino | 🦖 #dino | Trail gewunden (beidseitig) | hat SCHON scaleX(-1) permanent → auf Links-Segmenten rückwärts | **PRÜFEN — braucht dynamischen Flip ODER scaleX raus, nicht simpel** |

→ 3 sichere Standard-Flips, 4 brauchen Augen (frontales Emoji / geworfenes Objekt / gewundene Pfade, wo statischer Flip nur die Netto-Richtung bedient).

---

## Defekt-Klasse 2 — ATTRIBUTIONS-UMKEHR (systematisch!)

**Das Muster:** Die Win-Zeile schreibt dem Geburtstagskind `${kid()}` die **Spieler-Leistung** zu — „`${kid()} hat den Fall gelöst / die Stadt gerettet / alle sortiert`". Der GAST hat gespielt; das Geburtstagskind saß passiv (nur Foto-Reveal). Am schärfsten im **nofoto-Pfad** (kein Foto → `kid()` ist nur ein Name, der falschen Ruhm kriegt).

**Unabhängig bestätigt:** Der huerden-Opus-Gutachter schrieb ungefragt, superheld/prinzessin „schreibt dem Kind die Spielerleistung zu: `${kid()} hat den Code geknackt`" — und lobte huerden dafür, es via „Der Champion bist DU" zu vermeiden. Das ist genau dieses Muster.

**Design-Prinzip (aus lianen/huerden abgeleitet, das es richtig macht):**
- Gast = Handelnder → wird gelobt („Du hast …"), im Foto-Pfad via Rollentausch mit Gastnamen.
- Geburtstagskind = enthüllter Star/Gastgeber → lädt ein, hat NICHT gespielt.
- Falsch ist nur `kid() + Spiel-Verb`. Richtig bleibt `kid()` als Reveal-Subjekt/Gastgeber („das ist kid!", „kid wartet", „kid lädt dich ein").

### Trilagiert — ECHTE Umkehr (kid + Spiel-Verb, Fix warranted)
gluehwuermchen-feen · loeschen-feuerwehr · regenbogen-einhorn · sternbild-weltraum · tatort-prinzessin · uvschrift-prinzessin · wildnis-dschungel · strahl-superheld · korallen-meerjungfrau · drehleiter-feuerwehr · akte-detektiv · perlen-meerjungfrau · taunetz-feen  **(13)**
- Grenzfall echt: **huerden-pferde** Foto-Beat-1 „Der Champion ist kid" (nofoto ist korrekt „…bist DU"). Fällt in den laufenden huerden-Zyklus.

### Weich / MINOR (kid als Ehren-Rolle/Reveal, geringe Reibung — optional glätten)
ei-dino · puzzle-dschungel · striegeln-pferde · laterne-feen · hochhaus-baustelle · rohre-baustelle · signal-superheld · notruf-feuerwehr · rakete-weltraum · katapult-ritter · turm-einhorn · fingerabdruck-detektiv · funk-weltraum · tresor-prinzessin  **(~14)**

### Sauber (kein Attributions-Problem)
fossil-dino · fotosafari-safari · memory-piraten · wappen-ritter · wimmel-detektiv · sternenstaub-einhorn · schwert-ritter · flaschenpost-piraten · schatz-meerjungfrau · kanone-piraten  **(10)**

### Fehlflag (Haiku-Irrtum)
**lianen-dschungel** — geflaggter Beat-2 ist der gewollte Rollentausch-Twist, kein Fehler.

---

## ENTSCHEIDUNG (Bolle, 03.07.): STRIKT EINZELN
Kein Parallel-Sweep. huerden erst fertig gaten, dann **Spiel für Spiel**: pro Spiel BEIDE Defekte (Blickrichtung + Attribution) mitnehmen und durchs Gate. Dieser Katalog = Arbeitsliste der Einzeln-Schmiede-Pipeline.

**Folge fürs Gate-Prompt-Muster (ab sofort in jedem Spiel-Gate zusätzlich prüfen):**
- Blickrichtung: schaut jedes horizontal bewegte Emoji in Laufrichtung? (scaleX(-1) in Basis + Keyframes)
- Attribution: lobt die Win-Zeile (v.a. nofoto) das Geburtstagskind für die Spieler-Leistung? Prinzip: **Gast wird gelobt („Du hast…"), Kind lädt ein / ist der enthüllte Star** — `kid() + Spiel-Verb` = Fehler; `kid()` als Reveal-Subjekt/Gastgeber = ok.

**Design-Prinzip (kanonisch, gilt set-weit):** Gast = Handelnder (2. Person „Du"/Gastname), Geburtstagskind = enthüllter Gastgeber der einlädt. Foto-Pfad darf via Rollentausch das Kind sprechen lassen (wie lianen Beat 2), aber nie die Spiel-*Handlung* dem Kind zuschreiben.

**Reihenfolge-Hinweis:** Beim jeweiligen Spiel den Katalog-Eintrag oben als Ausgangs-Diagnose nehmen, aber IMMER selbst gegen Code + unabhängigem Gate verifizieren (Haiku-Triage ist nur Vorsortierung).

huerden-Foto-Champion-Beat („Der Champion ist kid") → im laufenden huerden-Re-Gate (Opus 4.8 Max, Chat ae2d2611) mitentscheiden; R1-Opus hatte es narrativ akzeptiert, Haiku als MAJOR — Reviewer-Urteil abwarten.

Status → Task #64 (umgewidmet auf Einzeln-Pipeline-Arbeitsliste).
