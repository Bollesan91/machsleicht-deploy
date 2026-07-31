# Paket-Palette — Vertrag zwischen Motto-File und `paket/core/paket.css`

Jedes `paket/<motto>/index.html` deklariert **alle** Variablen unten in einem `:root{}`.
Der Kern enthaelt keine Farbwerte; fehlt eine Variable, bricht die Stelle sichtbar.

| Variable | Rolle | Piraten |
|---|---|---|
| `--paper` | Blatt-Grundton | `#F3E7C9` |
| `--paper2` | Blatt, zweite Ebene | `#EAD9B2` |
| `--ink` | Fliesstext | `#2A2013` |
| `--muted` | Text gedaempft | `#6E5C43` |
| `--line` | Trennlinien | `#D6C295` |
| `--navy` | Dunkelton (Cover, Marke) | `#12324A` |
| `--navy-deep` | Dunkelton tiefer (Werkzeugleiste) | `#0C2233` |
| `--gold` | Zierfarbe | `#B98724` |
| `--gold-lt` | Zierfarbe hell | `#E4C567` |
| `--rust` | Akzent (Rollen, Banderole) | `#A5402B` |
| `--sea` | Zweitakzent (Vorleser aktiv) | `#2E7C86` |
| `--ok` | Bestaetigung | `#2E6E4F` |
| `--on-gold` | Text auf Gold-Flaeche (aktiver Varianten-Knopf) | `#1a1305` |
| `--cover-top` | Cover-Verlauf oben | `#1c4a63` |
| `--app-bg` | Seitenhintergrund ausserhalb der Blaetter | `#394456` |
| `--ink-soft` | Fliesstext gedaempft (Rezept/Vorlagen) | `#4a3d2b` |
| `--ink-soft2` | Notiz-Kaesten | `#5a4a34` |
| `--cover-brand` | Cover: Wortmarke | `#C9AE6E` |
| `--foot-ink` | Blattfuss | `#CBB88A` |
| `--tool-ink` | Werkzeugleiste: inaktiver Knopf | `#CFC1A0` |
| `--cover-kind` | Cover: Untertitel kursiv | `#D9C79A` |
| `--cover-meta` | Cover: Eckdaten-Zeile | `#E7D3A0` |
| `--tool-fg` | Werkzeugleiste: Text | `#EBDFC4` |
| `--pilot-ink` | Werkzeugleiste: Pilot-Abzeichen | `#F0C9BC` |
| `--cover-fg` | Cover: Grundfarbe Text | `#F1E4C4` |
| `--tool-brand` | Werkzeugleiste: Wortmarke | `#F4E9CE` |
| `--on-rust` | Text auf Akzent-Flaeche (Banderole) | `#F7E9CB` |
| `--cover-h1` | Cover: Titelzeile | `#F7ECCB` |
| `--legal-ink` | Rechtszeile | `#b9b3a4` |
| `--legal-link` | Rechtszeile: Link | `#d8cba6` |

`--sans` und `--serif` sind Schriftfamilien und in jedem Motto gleich.
