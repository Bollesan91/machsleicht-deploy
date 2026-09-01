#!/usr/bin/env bash
# Live-Verify der Partyseite NACH einem Worker-Deploy (npx -y wrangler deploy).
#
# Regel (24.06. hart gelernt): "Ist es live?" wird an der echten URL geprueft, mit Greps auf
# NEUE und auf ENTFERNTE Strings — ein Deploy, der nur den neuen String findet, kann trotzdem
# ein alter Stand mit zufaellig passendem Text sein.
#
# Das Skript legt eine Wegwerf-Party an, prueft die ausgelieferte Gaesteseite und LOESCHT sie
# wieder (DSGVO). Es schreibt nichts ins Repo. Aufruf:
#     bash _dev/scripts/live-verify-partyseite.sh
set -u
API="https://party.machsleicht.de"
FAILS=0
ok()   { echo "  ok    $1"; }
fail() { echo "  FAIL  $1"; FAILS=$((FAILS+1)); }
# "Mindestens ein Treffer", nicht "genau einer": grep -c zaehlt Zeilen, und derselbe String
# darf mehrfach auf der Seite stehen. Die Vorfassung verglich mit "1" und machte aus drei
# Treffern ein FAIL — der Grobort steht in der Ortszeile, in der Spiel-URL und in der Vorschau.
chk()  { case "${1:-0}" in ''|*[!0-9]*) fail "$2";; 0) fail "$2";; *) ok "$2";; esac }

echo "── Wegwerf-Party anlegen ──"
CREATE=$(curl -s -X POST "$API/api/create" -H "Content-Type: application/json" -d '{
  "childName":"Livecheck","age":7,"motto":"Ritter","mottoId":"ritter","mottoEmoji":"🏰",
  "date":"2099-09-12","time":"15:00","endTime":"18:00",
  "address":"Pruefstrasse 12, 22301 Hamburg",
  "hostName":"Familie Livecheck","hostPhone":"0170 1234567",
  "areaHint":"Bei uns zuhause in Hamburg-Winterhude",
  "wishes":[{"title":"Ritterburg","url":"https://www.amazon.de/dp/B0TEST123","price":"30 EUR"}]
}')
URL=$(echo "$CREATE"  | sed -n 's/.*"url":"\([^"]*\)".*/\1/p')
EDIT=$(echo "$CREATE" | sed -n 's/.*"editToken":"\([^"]*\)".*/\1/p')
ID=$(basename "$URL")
if [ -z "$ID" ] || [ -z "$EDIT" ]; then
  echo "  FAIL  /api/create lieferte keine Party: $CREATE"; exit 1
fi
echo "  Party: $URL"

HTML=$(curl -s "$URL")
DEC=$(printf '%s' "$HTML" | python -c "import sys,urllib.parse;sys.stdout.write(urllib.parse.unquote(sys.stdin.read()))" 2>/dev/null || printf '%s' "$HTML")

echo "── NEUE Strings muessen da sein ──"
chk "$(echo "$HTML" | grep -c 'Es lädt ein:'                       | head -1)" "Absenderzeile"
chk "$(echo "$HTML" | grep -c 'href="tel:01701234567"'             | head -1)" "Handynummer als tel:-Link"
chk "$(echo "$HTML" | grep -c 'Bei uns zuhause in Hamburg-Winterhude' | head -1)" "Grobort oeffentlich"
chk "$(echo "$HTML" | grep -c 'Weiterleitungen'                    | head -1)" "Sperre nennt ihren Grund"
chk "$(echo "$HTML" | grep -c '<title>Livecheck wird 7!'           | head -1)" "personalisierter Titel"
chk "$(echo "$HTML" | grep -c 'Wunschliste'                        | head -1)" "Wunschliste versprochen (ist vorhanden)"
chk "$(echo "$HTML" | grep -c 'Deine Antwort ist angekommen'       | head -1)" "Quittungs-Wortlaut"
chk "$(echo "$HTML" | grep -c 'date=Samstag'                       | head -1)" "lesbares Datum in der Spiel-URL"

echo "── ENTFERNTE Strings duerfen NICHT mehr da sein ──"
chk "$(echo "$HTML" | grep -c 'Deine Zusage ist gespeichert' | grep -c '^0$')" "kein 'ist gespeichert' mehr"
chk "$(echo "$HTML" | grep -c 'date=2099-09-12'              | grep -c '^0$')" "kein Rohdatum in der Spiel-URL"
chk "$(echo "$HTML" | grep -c 'ort=&tel='                    | grep -c '^0$')" "keine leeren Spiel-Parameter"
chk "$(echo "$HTML" | grep -c 'in 5 Minuten'                 | grep -c '^0$')" "kein widersprüchliches Zeitversprechen"

echo "── Adress-Gating (der harte Teil) ──"
chk "$(echo "$DEC"  | grep -c 'Pruefstrasse' | grep -c '^0$')" "Adresse steht NICHT im oeffentlichen HTML (auch nicht kodiert)"

echo "── Reparaturweg (neu): der Gastgeber bekommt die Liste wieder auf ──"
# Erst der Gast, dann der Editor: ohne Eintrag gibt es keine Zeile und keinen Knopf.
curl -s -X POST "$API/api/party/$ID/rsvp" -H "Content-Type: application/json" \
     -d '{"name":"Livecheck-Gast","status":"ja"}' > /dev/null
EDHTML=$(curl -s "$URL?edit=$EDIT")
chk "$(echo "$EDHTML" | grep -c 'onclick="removeGuest(this)"')" "Editor bietet das Entfernen an"
chk "$(echo "$EDHTML" | grep -c 'data-i='                    )" "der Knopf kennt seine Zeile (nicht nur den Namen)"
WEG=$(curl -s -X PUT "$API/api/party/$ID" -H "Content-Type: application/json" \
      -d "{\"editToken\":\"$EDIT\",\"removeGuests\":[{\"i\":0,\"name\":\"Livecheck-Gast\"}]}")
chk "$(echo "$WEG" | grep -c '"entfernt":1' | head -1)" "genau EINE Zeile entfernt (Antwort meldet die Zahl)"
NACH=$(curl -s "$URL?edit=$EDIT")
chk "$(echo "$NACH" | grep -c 'Livecheck-Gast' | grep -c '^0$')" "der Eintrag ist wirklich weg"

echo "── Kapazitaets-Kasten behauptet nichts an einer leeren Party ──"
chk "$(echo "$HTML" | grep -cE 'steliste ist voll|sehr viele Antworten' | grep -c '^0$')" "kein Voll-Kasten ohne Gaeste"

echo "── Party wieder loeschen (DSGVO) ──"
DEL=$(curl -s -X DELETE "$API/api/party/$ID" -H "Content-Type: application/json" -d "{\"editToken\":\"$EDIT\"}")
GONE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
chk "$(echo "$GONE" | grep -c '^404$')" "Wegwerf-Party ist geloescht (404)"

echo ""
if [ "$FAILS" -gt 0 ]; then echo "  $FAILS FAIL — Deploy NICHT als live verifiziert melden"; exit 1; fi
echo "  Alles gruen — Partyseite ist live verifiziert"
