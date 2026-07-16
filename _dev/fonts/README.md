# Self-hosted Fonts (party.machsleicht.de)

Variable-Font-WOFF2 (latin-Subset, via Google-Fonts-CDN bezogen), lizenziert unter SIL Open Font License 1.1:
- Baloo 2 (Ek Type) — Gast-Partyseite Display
- DM Sans (Colophon Foundry/Google) — Fliesstext ueberall
- Fraunces (Undercase Type) — Editor/Creator/404/DOI Display

Ausgeliefert vom party-worker unter /fonts/<name>.woff2 aus KV (Keys `font:<name>`).
**Deploy-Schritt (einmalig + bei Font-Updates), Reihenfolge egal (Route faellt sonst auf 404 -> font-display:swap):**
```
npx wrangler kv key put "font:baloo2"   --path _dev/fonts/baloo2.woff2   --binding PARTY --remote
npx wrangler kv key put "font:dmsans"   --path _dev/fonts/dmsans.woff2   --binding PARTY --remote
npx wrangler kv key put "font:fraunces" --path _dev/fonts/fraunces.woff2 --binding PARTY --remote
```
Grund (Gate-H3, 16.07.2026): Google-Fonts-Remote = IP-Uebermittlung ohne Einwilligung (LG Muenchen I, 3 O 17493/20).
