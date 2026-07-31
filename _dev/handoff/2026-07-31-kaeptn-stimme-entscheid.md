# Käpt'n-Stimme (Paket V2.5) — Nur-Bolle-Entscheid, Rest ist vorbereitet

**Stand 31.07.2026:** Browser-TTS (speechSynthesis) ist tot („Navi 1995", geräteabhängig).
Piper/Thorsten lokal getestet — Bolle: „am ehesten neutral, aber alles nicht gut."
→ Der Qualitätssprung braucht eine **Premium-Cloud-Stimme**. Das ist ein Account-/Key-Entscheid.

## Die zwei Optionen (EIN Klick von Bolle)

| | **ElevenLabs** (Empfehlung Qualität) | **Azure Speech** (vorhandene Infra) |
|---|---|---|
| Klang deutsch | Beste am Markt, echte Charakter-Stimmen (rauer Käpt'n möglich) | Sehr gut (Conrad/Florian Neural), aber „Nachrichtensprecher"-Charakter |
| Kosten für uns | Free 10k Zeichen/Monat; Starter 5 $/Monat = 30k. Piraten-Bibliothek ≈ 15–25k Zeichen → 1 Monat Starter reicht, einmalig | F0-Tier **kostenlos** (500k Zeichen/Monat) |
| Was Bolle tun muss | Account anlegen auf elevenlabs.io → API-Key kopieren → im Chat posten (transient, wie cfut_) | OK geben, dass ich per `az` eine F0-Speech-Resource anlege — **Achtung: Advergy-Subscription für Privatprojekt** (deshalb nicht eigenmächtig gemacht) — oder privaten Azure-Account nennen |
| Skalierung 15 Mottos | ~300–400k Zeichen gesamt → ~2× Starter-Monate | im Free-Tier locker |

## Was schon fertig ist (kein Bolle-Aufwand)

- **Render-Pipeline** (`scratchpad/audio/render.py`): UTF-8-fest (Mojibake-Lektion eingebaut), TTS-Normalisierung (Gedankenstriche→Pausen, typografische Zeichen raus)
- **STT-Gegenhör-Gate** (`stt_check.py`, vosk de): jeder Clip wird maschinell transkribiert und gegen den Soll-Text geprüft, bevor er ins Paket kommt (hat den Mojibake-Bug gefangen)
- **MP3-Encoding** (lameenc, 64 kbps mono, ~10–15 KB je 10 s)
- **Text-Quellen**: Stationstexte (`data/schatzsuche.json` piraten, 3 Altersgruppen), Spielkarten-Texte (`data/motto/piraten-*.json`), Käpt'n-Intro-Skripte mit Piraten-Ton (Arrr/Landratten — von Bolle abgenommene Richtung)
- **Player-Konzept**: `/paket/piraten/audio/<hash>.mp3` + Manifest; 🔊-Knopf spielt Clip, speechSynthesis nur noch Fallback für personalisierte Texte. Einbau ≈ 1 Stunde nach Stimm-Wahl.

## Ablauf nach Bolles Klick

1. Key kommt im Chat (transient, wird nie gespeichert/committet)
2. Ich generiere 2 Hörproben mit der Premium-Stimme → Bolle-Daumen
3. Daumen hoch → komplette Bibliothek rendern + STT-Gate + Player einbauen + Helfer-Gate + Deploy
