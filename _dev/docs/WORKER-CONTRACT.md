# Party-Worker API-Vertrag (P1-24)

Stand: 2026-05-11. Verifikation der Cloudflare-Worker-Endpunkte gegen V5.1-Vertrag.

**Worker-Code:** `party-worker.js` (1757 Z.)
**Live-Endpoint:** `https://party.machsleicht.de`
**Deploy-Mechanismus:** TBD (vermutlich manuelles Cloudflare Dashboard, kein wrangler.toml im Repo)

## Code-Verifikation gegen V5.1 (statisch)

### POST /api/create

**Worker-Code:** `party-worker.js` Z.127-161

| V5.1-Feld | Worker akzeptiert? | Notiz |
|---|---|---|
| `childName` | ✓ Z.134 | trim + slice(0,50) |
| `age` | ✓ Z.135 | parseInt, clamp 0-18, `null` fallback |
| `motto` | ✓ Z.136 | slice(0,60) |
| `mottoEmoji` | ✓ Z.137 | slice(0,4) default "🎉" |
| `mottoColor` | ✓ Z.138 | Hex-Regex check, default `#D4812A` |
| `date` | ✓ Z.139 | pass-through |
| `time` | ✓ Z.139 | pass-through |
| `endTime` | ✓ Z.139 | pass-through |
| `address` | ✓ Z.140 | slice(0,200) |
| `notes` | ✓ Z.141 | slice(0,500) |
| `askAllergies` | ✓ Z.142 | default true (≠false) |
| `askPickup` | ✓ Z.143 | default true |
| `wishes[]` | ✓ Z.144-147 | max MAX_WISHES, title required, slice limits |
| `paypalMe` | ✓ Z.149 | slice(0,100) |
| **Extra**: `photo` (Base64) | ✓ Z.154-156 | in separates KV-Key |
| **Extra**: `photoRound` (Base64) | ✓ Z.157-159 | in separates KV-Key |

**Response (Z.160):**
```json
{
  "id": "<8-char-id>",
  "editToken": "<32-char-token>",
  "url": "https://party.machsleicht.de/<id>",
  "editUrl": "https://party.machsleicht.de/<id>?edit=<token>"
}
```

→ **Vertrag erfuellt.** Keine Worker-Aenderung fuer P1-25 noetig.

### CORS

**Worker-Code:** Z.9 + Z.125

```js
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
```

→ **CORS-Preflight funktioniert** fuer Cross-Domain-POST von `machsleicht.de`.

**Hinweis P1-29:** `Allow-Origin: *` ist offen. Spaeter auf `https://machsleicht.de` einengen.

### Weitere Endpoints (fuer spaetere Tickets)

| Endpoint | Methode | Zweck | Code |
|---|---|---|---|
| `/api/party/:id` | GET | Party-Daten holen (mit/ohne edit-Token) | Z.163-176 |
| `/api/party/:id` | PUT | Party-Daten aendern (editToken erforderlich) | Z.178-200 |
| `/api/party/:id/rsvp` | POST | RSVP von Gast | Z.202-222 |
| `/api/party/:id/wish/:wid/claim` | POST | Geschenk reservieren | Z.224-258 |
| `/api/party/:id/send-edit-link` | POST | Edit-Link per Email (Resend) | Z.260-350 |
| `/go/:partyId/:wishId` | GET | Affiliate-Redirect | Z.352-365 |

## Live-Verifikations-Commands (manuell)

### Test 1: CORS-Preflight
```bash
curl -i -X OPTIONS https://party.machsleicht.de/api/create \
  -H "Origin: https://machsleicht.de" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"
# Erwartet: 200 + CORS-Header
```

### Test 2: Minimal-Create
```bash
curl -i -X POST https://party.machsleicht.de/api/create \
  -H "Origin: https://machsleicht.de" \
  -H "Content-Type: application/json" \
  -d '{"childName":"Test","age":5,"motto":"Feuerwehr","mottoEmoji":"🚒","mottoColor":"#FF7043"}'
# Erwartet: 200 + JSON mit {id, editToken, url, editUrl}
# Achtung: legt ECHTE Partyseite an. Nur fuer einmalige Verifikation.
```

### Test 3: Pflichtfeld leer
```bash
curl -i -X POST https://party.machsleicht.de/api/create \
  -H "Content-Type: application/json" \
  -d '{}'
# Erwartet: 200 (Worker akzeptiert leere Defaults) ODER 4xx
# Vertragslogik: Felder sind alle defensiv (slice/clamp/default) - kein Hard-Fail
```

### Test 4: Riesiges Payload
```bash
curl -i -X POST https://party.machsleicht.de/api/create \
  -H "Content-Type: application/json" \
  -d "{\"notes\":\"$(printf 'X%.0s' {1..10000})\"}"
# Erwartet: 200 + notes intern auf 500 Z. getrimmt
# Hinweis P1-29: Worker hat noch kein Payload-Size-Limit oben.
```

## Lessons fuer P1-25 (Cockpit-Uebergabe)

1. **Bauen** ein `BirthdayProject.toPartyPayload()` (existiert bereits in `js/birthday-project.js`) und schick es an `https://party.machsleicht.de/api/create`.
2. **Behalten** ist sicher — der Worker akzeptiert alle Felder, hat sinnvolle Defaults.
3. **Response verarbeiten**: `editUrl` ist der "Manage"-Link, `url` ist der Gaeste-Link. **Beide dem User zeigen.**
4. **Fehlerfaelle** (V5.1) konkret:
   - Network-Error: `BirthdayProject` lokal behalten, Retry anbieten
   - 4xx/5xx-Response: Inline-Fehler-UI, "Partyseite konnte gerade nicht erstellt werden", Plan bleibt erhalten
   - localStorage leer: manueller Create-Flow auf party.machsleicht.de (User wird mit URL-Params dorthin geschickt)

## Offene Klaerungen fuer P1-26+

- **Wie wird der Worker deployed?** wrangler.toml fehlt im Repo. Vor Worker-Patches muss Bolle Deploy-Mechanismus bestaetigen.
- **Resend-Email-Versand-Logik:** Worker-Code Z.260-350 nutzt Resend. Bevor DSGVO-Hinweis (P1-26) eingebaut wird, Logik im Detail pruefen.
- **`/e/<slug>`-Flow vs. direkte `/einladung/<motto>/`-Links:** wie verbindet sich der Einladungs-Flow (Netlify Function `serve-invite.mjs`) mit dem Worker?

## Status

**Vertrag: BESTAETIGT.** Worker erfuellt V5.1-API vollstaendig. P1-25 (Cockpit-Uebergabe) kann starten ohne Worker-Patch.

Empfohlene Live-Test-Reihenfolge bevor P1-25-Code deployed wird:
1. Test 1 (CORS) ✓ 
2. Test 2 (Minimal-Create) — produziert echte Test-Partyseite, danach `editUrl` manuell pruefen und Partyseite ggf. wieder loeschen
