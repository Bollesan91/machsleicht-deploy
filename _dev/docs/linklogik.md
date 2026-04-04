# Interne Linklogik machsleicht.de

**Stand:** 04.04.2026  
**Kernregel:** Links dürfen nicht organisch-chaotisch wachsen. Jede Verlinkung hat eine Richtung und einen Zweck.

---

## Link-Pfade (Standard)

```
Hub → Detail → Tool → Output → nächster Anlass
```

### Konkret:

```
/kindergeburtstag
  ↓ (Motto wählen)
/kindergeburtstag/dino
  ↓ (Alter wählen)
/kindergeburtstag/dino-6-jahre
  ↓ (Planer starten)         ↓ (Schatzsuche)         ↓ (Einladung)
/kindergeburtstag#planer    /schatzsuche/dino        /einladung/dino/
  ↓                           ↓                        ↓
Output: Zeitplan             Output: Schatzkarte      Output: Einladungslink
  ↓                           ↓                        ↓
Cross-Sell: Schatzsuche      Cross-Sell: Einladung    Cross-Sell: Schatzsuche ✅
```

### Baby/Einschulung:

```
/baby → /baby-erstausstattung-checkliste → /kliniktasche-packen → /wochenbett-was-braucht-man
/einschulung → /einschulung-checkliste → /schultuete-fuellen
```

### Ratgeber:

```
/kindergeburtstag/pokemon → /ratgeber/pokemon-fuer-eltern (oder /pokemon-guide)
/ratgeber/pokemon-fuer-eltern → /kindergeburtstag/pokemon
```

---

## Cross-Sell-Matrix

| Von | Nach | Status |
|-----|------|--------|
| Kindergeburtstag-Detail → Schatzsuche | ✅ Vorhanden (in Content verlinkt) |
| Kindergeburtstag-Detail → Einladung | ❌ FEHLT (Task 3 im Backlog) |
| Schatzsuche-Ergebnis → Einladung | ✅ Dynamischer Banner (gerade gebaut) |
| Einladung Won-Screen → Schatzsuche | ✅ Gerade gefixt |
| Schatzsuche-Thema → Kindergeburtstag-Motto | ⚠️ Nur Breadcrumb |
| Ratgeber → Kindergeburtstag-Motto | ❌ FEHLT (Task 44 im Backlog) |
| Saisonal → Kernprodukte | ❌ FEHLT (Task 45/46 im Backlog) |

---

## Verbotene Link-Muster

1. ❌ Tool → Tool ohne Output dazwischen (Nutzer soll erst fertig werden)
2. ❌ Detail → anderes Detail gleicher Ebene als Primär-CTA (nur als Tertiär/Related)
3. ❌ Externe Links (Affiliate) vor internen Cross-Sells
4. ❌ Links ohne Kontext ("Hier klicken", "Mehr")

---

## Anhang: Schnitzeljagd Keyword-Einschätzung (04.04.2026)

**Plausible-Daten:** Nicht abrufbar (kein API-Zugang). Bolle muss Dashboard prüfen.

**Google-Ergebnis für "Schnitzeljagd Kindergeburtstag":**
- Eigene Webshops existieren (schnitzeljagd.shop)
- Etsy hat dutzende Produkte für "Schnitzeljagd Kindergeburtstag" als PDF
- Amazon hat Print-Produkte dafür
- Indikator: Keyword ist kommerziell stark besetzt → hohes Suchvolumen wahrscheinlich

**Empfehlung:** Bolle prüft in Plausible:
1. Traffic auf /schatzsuche und /schatzsuche/* Seiten
2. Google Search Console: Für welche Keywords rankt machsleicht.de im Schatzsuche-Bereich?
3. Taucht "Schnitzeljagd" als Suchterm auf?
