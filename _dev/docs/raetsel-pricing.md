# Rätsel nach Maß — Pricing & Credit-System

**Stand:** 09.04.2026
**Status:** Entschieden, noch nicht implementiert

---

## Preismodell

| Produkt | Preis | Credits | Use Case |
|---------|-------|---------|----------|
| Geburtstags-Schatzsuche | 2,99€ einmalig | 1 | Motto-Stil, 5-8 Stationen, für den Partytag |
| Sofort-Schatzsuche (einzeln) | 0,99€ | 1 | Impuls, Rainy Sunday, spontan |
| Sofort 5er-Pack | 3,99€ | 5 | Rabatt, kein Abo, kein Ablaufdatum |

**API-Kosten:** ~5ct pro Generierung → Marge 94-98%

---

## Credit-System (Option A: eigener Worker)

### Flow

1. Eltern kaufen via **Lemon Squeezy** (Checkout-Button im Tool)
2. Lemon Squeezy Webhook → **Cloudflare Worker** (`raetsel-worker`)
3. Worker generiert einen **License Key** (z.B. `rnm_a7x9k2m4`)
4. Key wird im **localStorage** des Browsers gespeichert
5. Beim Rätsel-Generieren:
   - Frontend schickt Key an Worker
   - Worker prüft: Key gültig? Credits übrig?
   - Ja → Claude API Call → Rätsel zurück → Credit runterzählen
   - Nein → "Keine Credits mehr. Nachkaufen?"
6. **Credit zählt erst runter** wenn Rätsel erfolgreich generiert und angezeigt werden (nicht beim Klick auf "Generieren")

### KV-Struktur

```
Key: license:{key}
Value: {
  "key": "rnm_a7x9k2m4",
  "type": "single" | "birthday" | "pack5",
  "creditsTotal": 1 | 5,
  "creditsUsed": 0,
  "created": "2026-04-09T...",
  "lastUsed": null,
  "lemonSqueezyOrderId": "..."
}
TTL: 365 Tage (kein Ablaufdatum versprochen, aber Aufräum-TTL)
```

### Gegen versehentliches Einlösen

- Nach Generierung: Bestätigungsscreen "Schatzsuche gespeichert! (3 von 5 übrig)"
- Credit zählt erst nach erfolgreicher API-Antwort runter
- Bei API-Fehler: kein Credit verbraucht
- "Neue Rätsel generieren" (Regenerate) verbraucht KEINEN neuen Credit — nur komplett neuer Durchlauf

### Vorteile vs. Lemon Squeezy native Aktivierungen

- Volle UX-Kontrolle
- Credits sichtbar im Tool ("Du hast noch 3 Schatzsuchen")
- Claude API Call serverseitig (Key nicht im Frontend)
- Gleiche Infrastruktur wie party-worker (Cloudflare Worker + KV)

---

## Lemon Squeezy Webhook

Worker empfängt Webhook bei Kauf:

```
POST /webhook
{
  "event": "order_completed",
  "data": {
    "product_id": "raetsel-single" | "raetsel-birthday" | "raetsel-pack5",
    "order_id": "...",
    "customer_email": "..." (optional)
  }
}
→ Worker erstellt License Key in KV
→ Antwortet mit { "key": "rnm_a7x9k2m4" }
→ Frontend speichert Key in localStorage
```

---

## Offene Fragen

1. Soll der Key per E-Mail geschickt werden (Recovery wenn localStorage gelöscht)?
2. Soll der Claude API Key im Worker als ENV var liegen oder als Lemon Squeezy Custom Field?
3. Geburtstags-Schatzsuche: Kauf im Planer-Flow oder auf eigener Checkout-Seite?
