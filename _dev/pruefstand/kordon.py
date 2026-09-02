# -*- coding: utf-8 -*-
r"""machsleicht-Pruefstand · Kordon — was hier wirklich schuetzt.

WARUM DER ASKER-KORDON HIER NICHT PASST
ASKERs Kordon riegelt das Netz ab, weil dort die Nebenwirkung im Prozess entsteht:
`proactive.send` schreibt einem Menschen in Teams. Bei machsleicht entsteht die
gefaehrliche Nebenwirkung fast nie im Python-Prozess, sondern im UNTERPROZESS:
`git push`, `git merge`, `npx wrangler deploy`. Genau diese Luecke benennt ASKERs
eigene README als seinen blinden Fleck. Deshalb vier Schichten mit anderer Gewichtung.

FASSUNG 2 (02.09.2026, nach der ersten Gegenpruefung — `befunde/2026-09-02-kordon.md`).
Fassung 1 meldete „Selbsttest bestanden (4 Schichten)" und liess trotzdem alles durch,
was nicht durch `subprocess` ging. Sechs MAJOR, alle mit eigenem Lauf bestaetigt:

  · `os.system("git push …")` startete den Prozess — nur `subprocess` war gepatcht.
  · `g""it p""ush` (shell=True) zerhackte den Substring-Matcher.
  · DNS (`getaddrinfo`) und UDP (`sendto`) gingen unter Profil `dicht` hinaus.
  · `open(repo_datei, "w")` schrieb ins Repo — `nur_kopie` war eine FREIWILLIGE
    Funktion, kein Haken. Die Zusage war stroker formuliert als der Code.
  · `\\?\C:\…`-Praefixe liefen an `nur_kopie` vorbei.
  · Der Selbsttest prueefte je Schicht eine einzige Naht und meldete vier gruen.

Die Lehre steht ueber dem Code: **ein Selbsttest, der eine Naht prueft und fuer eine
Schicht gruen meldet, ist keiner.** Jede Schicht wird jetzt an jeder ihrer Naehte
nachgewiesen, und was nicht nachgewiesen werden kann, steht unter „Was er nicht kann".

  1. UNTERPROZESS-SPERRE — `subprocess.run/Popen`, `os.system/popen/exec*/spawn*`.
  2. BRANCH-WACHE — nie auf `main`.
  3. REPO-SCHREIBSPERRE — `open()` im Schreibmodus, `os.remove/rename/replace` auf
     Repo-Pfade. Kein Appell mehr, ein Haken.
  4. NETZ-SPERRE — TCP (`connect`), asyncio (TCP + Datagramm), UDP (`sendto/sendmsg`),
     Namensaufloesung (`getaddrinfo`), urllib. Loopback bleibt frei.

WAS ER NICHT KANN — benannt statt still:
  · Was Claude selbst ins Bash-Tool tippt, laeuft an allen vier Schichten vorbei. Der
    Kordon schuetzt den PRUEFSTAND, nicht die Sitzung.
  · Ein Kommando, das sich erst zur Laufzeit zusammensetzt (`$(echo git) push`, ein
    Shell-Skript, `ctypes.CreateProcess`), wird an seiner Zeile nicht erkannt. Die
    Entquotung faengt die Zerhack-Varianten, nicht die Verschleierung.
  · Ein Unterprozess schreibt ins Repo, ohne dass Schicht 3 ihn sieht — sie haengt am
    `open` DIESES Interpreters.
"""
from __future__ import annotations

import asyncio
import builtins
import os
import socket
import subprocess
import sys
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent


class KordonSperre(RuntimeError):
    """Ein Versuch, der nicht stattfinden darf. Fail-closed: im Zweifel zu."""


# --------------------------------------------------------------------- Protokoll

@dataclass
class Versuch:
    art: str
    ziel: str
    erlaubt: bool


@dataclass
class Protokoll:
    versuche: list = field(default_factory=list)

    def durchgelassen(self, art: str) -> list:
        return [v for v in self.versuche if v.art == art and v.erlaubt]


PROTOKOLL = Protokoll()

VERBOTENE_KOMMANDOS = (
    ("git", "push"),
    ("git", "merge"),
    ("wrangler", "deploy"),
    ("wrangler", "publish"),
    ("netlify", "deploy"),
    ("gh", "pr merge"),
    ("gh", "release"),
)

# `wrangler deploy --dry-run` baut nur lokal und ist in LEKTIONEN.md als Pruefschritt
# dokumentiert. Ein Gate, das den dokumentierten Pruefschritt blockiert, wird umgangen
# statt befolgt — deshalb ausdruecklich frei. `git push --dry-run` bleibt zu: es
# kontaktiert das Remote und ist als Ausbruchsprobe genau das, was hier nie laufen soll.
AUSNAHMEN = (("wrangler", "deploy", "--dry-run"),)

PROFILE = {
    "dicht": set(),                 # nichts nach draussen
    "lesen": {"GET"},               # GET auf beliebige Hosts (Live-Gegenproben)
}

_AKTIV = None
_ORIG = {}


# ------------------------------------------------------------- Schicht 1: Prozess

def _kommando_text(cmd) -> str:
    if isinstance(cmd, (list, tuple)):
        return " ".join(str(t) for t in cmd)
    return str(cmd)


def _entquoten(text: str) -> str:
    """`g""it p""ush` und `git pu^sh` sind fuer die Shell dasselbe Kommando, fuer einen
    Substring-Vergleich nicht. Anfuehrungszeichen und Caret raus, dann vergleichen."""
    for zeichen in ('"', "'", "^", "`", "\\"):
        text = text.replace(zeichen, "")
    return text


def _pruefe_kommando(cmd) -> None:
    roh = _kommando_text(cmd)
    text = _entquoten(roh.lower())
    for regel in AUSNAHMEN:
        if all(teil in text for teil in regel):
            PROTOKOLL.versuche.append(Versuch("unterprozess", roh[:200], True))
            return
    for kopf, tat in VERBOTENE_KOMMANDOS:
        if kopf in text and tat in text:
            PROTOKOLL.versuche.append(Versuch("unterprozess", roh[:200], False))
            raise KordonSperre(
                "Kordon: '" + kopf + " ... " + tat + "' ist im Pruefstand gesperrt — "
                "Deploy und Push sind Bolles Entscheidung, nicht die eines Gates.\n"
                "  Kommando: " + roh[:200])
    PROTOKOLL.versuche.append(Versuch("unterprozess", roh[:200], True))


# ------------------------------------------------------ Schicht 3: Repo-Schreibsperre

_SCHREIBMODI = set("wax+")
# Python legt beim Import .pyc-Dateien im Repo an. Die zu sperren wuerde den Kordon
# beim eigenen Import zerlegen — ein Gate, das sich selbst blockiert, wird abgeschaltet.
_ERLAUBT_IM_REPO = ("__pycache__",)


def _normal(pfad) -> str:
    """`\\\\?\\C:\\…` und `\\\\localhost\\C$\\…` zeigen auf dieselbe Datei wie `C:\\…`.
    Fassung 1 verglich die Praefixform und hielt sie fuer 'ausserhalb des Repos'."""
    s = str(pfad)
    for praefix in ("\\\\?\\UNC\\", "\\\\?\\", "\\\\.\\"):
        if s.startswith(praefix):
            s = s[len(praefix):]
    if s.lower().startswith("\\\\localhost\\") or s.lower().startswith("\\\\127.0.0.1\\"):
        rest = s.split("\\", 3)[-1]
        laufwerk = s.split("\\")[3] if len(s.split("\\")) > 3 else ""
        if laufwerk.endswith("$"):
            s = laufwerk[0] + ":\\" + rest.split("\\", 1)[-1] if "\\" in rest else s
    try:
        return os.path.normcase(os.path.abspath(s))
    except Exception:  # noqa: BLE001
        return os.path.normcase(s)


def _im_repo(pfad) -> bool:
    p = _normal(pfad)
    wurzel = _normal(REPO)
    if not (p == wurzel or p.startswith(wurzel + os.sep)):
        return False
    return not any(teil in p for teil in _ERLAUBT_IM_REPO)


def nur_kopie(pfad) -> Path:
    """Explizite Wache fuer Mutations-Code. Schicht 3 haelt auch ohne sie — diese
    Funktion macht die Absicht im Aufrufer lesbar und liefert den Pfad zurueck."""
    if _im_repo(pfad):
        raise KordonSperre(
            "Kordon: Mutation zielt ins Repo (" + str(pfad) + "). "
            "Mutiert wird ausschliesslich in der Arbeitskopie.")
    return Path(pfad)


def _schreibsperre(pfad, was: str) -> None:
    if _im_repo(pfad):
        PROTOKOLL.versuche.append(Versuch("datei", str(pfad)[:200], False))
        raise KordonSperre(
            "Kordon: " + was + " auf eine Repo-Datei (" + str(pfad)[:160] + "). "
            "Der Pruefstand veraendert das Repo nicht — mutiert wird in der Arbeitskopie.")


def _open(file, mode="r", *a, **kw):
    if _SCHREIBMODI & set(str(mode)):
        _schreibsperre(file, "Schreibzugriff")
    return _ORIG["open"](file, mode, *a, **kw)


# ------------------------------------------------------------- Schicht 4: Netz

def _ist_loopback(host) -> bool:
    h = str(host or "").lower()
    return (h in ("127.0.0.1", "localhost", "::1", "0.0.0.0", "")
            or h.startswith("127.") or h.endswith(".localhost"))


def _netz_pruefen(art: str, ziel: str, methode) -> None:
    erlaubt = bool(_AKTIV and methode and methode.upper() in PROFILE.get(_AKTIV, set()))
    PROTOKOLL.versuche.append(Versuch(art, ziel, erlaubt))
    if not erlaubt:
        zusatz = ("[" + str(methode) + "]") if methode else "[Methode unbekannt -> kein Ticket]"
        raise KordonSperre(
            "Kordon (" + str(_AKTIV) + "): " + art + " nach " + ziel + " gesperrt " + zusatz)


def _urlopen(self, fullurl, data=None, timeout=None):
    url = fullurl.full_url if hasattr(fullurl, "full_url") else str(fullurl)
    if hasattr(fullurl, "get_method"):
        methode = fullurl.get_method()
    else:
        methode = "POST" if data else "GET"
    host = urllib.parse.urlparse(url).hostname or ""
    if _ist_loopback(host):
        return _ORIG["urlopen"](self, fullurl, data, timeout)
    _netz_pruefen("http", url[:200], methode)
    return _ORIG["urlopen"](self, fullurl, data, timeout)


def _connect(self, adresse):
    host = adresse[0] if isinstance(adresse, tuple) else str(adresse)
    if _ist_loopback(host):
        return _ORIG["connect"](self, adresse)
    port = adresse[1] if isinstance(adresse, tuple) and len(adresse) > 1 else "?"
    _netz_pruefen("socket", str(host) + ":" + str(port), None)
    return _ORIG["connect"](self, adresse)


def _connect_ex(self, adresse):
    host = adresse[0] if isinstance(adresse, tuple) else str(adresse)
    if _ist_loopback(host):
        return _ORIG["connect_ex"](self, adresse)
    _netz_pruefen("socket", str(host), None)
    return _ORIG["connect_ex"](self, adresse)


def _sendto(self, daten, *a):
    ziel = a[-1] if a else None
    host = ziel[0] if isinstance(ziel, tuple) else str(ziel)
    if not _ist_loopback(host):
        _netz_pruefen("udp", str(host), None)
    return _ORIG["sendto"](self, daten, *a)


def _sendmsg(self, *a, **kw):
    ziel = a[3] if len(a) > 3 else kw.get("address")
    host = ziel[0] if isinstance(ziel, tuple) else (str(ziel) if ziel else "")
    if ziel is not None and not _ist_loopback(host):
        _netz_pruefen("udp", str(host), None)
    return _ORIG["sendmsg"](self, *a, **kw)


def _getaddrinfo(host, port, *a, **kw):
    """Namensaufloesung IST Netzverkehr — sie verlaesst den Rechner und verraet dem
    Resolver, wonach hier gesucht wird. Fassung 1 liess sie offen."""
    if not _ist_loopback(host):
        _netz_pruefen("dns", str(host), None)
    return _ORIG["getaddrinfo"](host, port, *a, **kw)


async def _create_connection(self, protocol_factory, host=None, port=None, **kw):
    if host is not None and not _ist_loopback(host):
        _netz_pruefen("asyncio", str(host) + ":" + str(port), None)
    return await _ORIG["create_connection"](self, protocol_factory, host, port, **kw)


async def _create_datagram_endpoint(self, protocol_factory, local_addr=None,
                                    remote_addr=None, **kw):
    ziel = remote_addr[0] if isinstance(remote_addr, tuple) else None
    if ziel is not None and not _ist_loopback(ziel):
        _netz_pruefen("asyncio-udp", str(ziel), None)
    return await _ORIG["create_datagram_endpoint"](self, protocol_factory, local_addr,
                                                   remote_addr, **kw)


# ----------------------------------------------------------------- Scharfschalten

def _branch() -> str:
    try:
        roh = _ORIG.get("run", subprocess.run)
        aus = roh(["git", "-C", str(REPO), "rev-parse", "--abbrev-ref", "HEAD"],
                  capture_output=True, text=True, timeout=30)
        return aus.stdout.strip()
    except Exception:  # noqa: BLE001
        return "?"


def _haken_setzen() -> None:
    if _ORIG:
        return
    _ORIG["urlopen"] = urllib.request.OpenerDirector.open
    _ORIG["connect"] = socket.socket.connect
    _ORIG["connect_ex"] = socket.socket.connect_ex
    _ORIG["sendto"] = socket.socket.sendto
    # sendmsg existiert auf Windows nicht — fehlt die Naht, wird sie nicht
    # behauptet. Eine Naht, die man nicht setzen kann, darf nicht mitgezaehlt werden.
    if hasattr(socket.socket, "sendmsg"):
        _ORIG["sendmsg"] = socket.socket.sendmsg
    _ORIG["getaddrinfo"] = socket.getaddrinfo
    _ORIG["create_connection"] = asyncio.base_events.BaseEventLoop.create_connection
    _ORIG["create_datagram_endpoint"] = asyncio.base_events.BaseEventLoop.create_datagram_endpoint
    _ORIG["run"] = subprocess.run
    _ORIG["popen_init"] = subprocess.Popen.__init__
    _ORIG["open"] = builtins.open
    _ORIG["remove"] = os.remove
    _ORIG["rename"] = os.rename
    _ORIG["replace"] = os.replace
    _ORIG["system"] = os.system
    _ORIG["ospopen"] = os.popen

    urllib.request.OpenerDirector.open = _urlopen
    socket.socket.connect = _connect
    socket.socket.connect_ex = _connect_ex
    socket.socket.sendto = _sendto
    if "sendmsg" in _ORIG:
        socket.socket.sendmsg = _sendmsg
    socket.getaddrinfo = _getaddrinfo
    asyncio.base_events.BaseEventLoop.create_connection = _create_connection
    asyncio.base_events.BaseEventLoop.create_datagram_endpoint = _create_datagram_endpoint
    builtins.open = _open

    def _run(*a, **kw):
        if a:
            _pruefe_kommando(a[0])
        elif "args" in kw:
            _pruefe_kommando(kw["args"])
        return _ORIG["run"](*a, **kw)

    def _popen_init(self, args, *a, **kw):
        _pruefe_kommando(args)
        return _ORIG["popen_init"](self, args, *a, **kw)

    def _system(befehl):
        _pruefe_kommando(befehl)
        return _ORIG["system"](befehl)

    def _ospopen(befehl, *a, **kw):
        _pruefe_kommando(befehl)
        return _ORIG["ospopen"](befehl, *a, **kw)

    def _remove(pfad, *a, **kw):
        _schreibsperre(pfad, "Loeschen")
        return _ORIG["remove"](pfad, *a, **kw)

    def _rename(alt, neu, *a, **kw):
        _schreibsperre(alt, "Umbenennen")
        _schreibsperre(neu, "Umbenennen")
        return _ORIG["rename"](alt, neu, *a, **kw)

    def _replace(alt, neu, *a, **kw):
        _schreibsperre(alt, "Ersetzen")
        _schreibsperre(neu, "Ersetzen")
        return _ORIG["replace"](alt, neu, *a, **kw)

    subprocess.run = _run
    subprocess.Popen.__init__ = _popen_init
    os.system = _system
    os.popen = _ospopen
    os.remove = _remove
    os.unlink = _remove
    os.rename = _rename
    os.replace = _replace

    # os.exec*/os.spawn* ersetzen den Prozess bzw. starten einen neuen, ohne durch
    # subprocess zu gehen. Sie werden nur selten gebraucht; hier sind sie ganz zu.
    for name in ("execv", "execve", "execvp", "execvpe", "execl", "execle", "execlp",
                 "spawnv", "spawnve", "spawnvp", "spawnvpe", "spawnl", "spawnle", "spawnlp"):
        if hasattr(os, name):
            _ORIG[name] = getattr(os, name)

            def _sperre(*a, _n=name, **kw):
                raise KordonSperre(
                    "Kordon: os." + _n + " ist im Pruefstand gesperrt — es startet einen "
                    "Prozess an der Unterprozess-Sperre vorbei.")
            setattr(os, name, _sperre)


def scharf(profil: str = "dicht") -> str:
    """Schaltet alle vier Schichten scharf und weist JEDE NAHT an einem echten Versuch
    nach. Jede Luecke ist ein Abbruch."""
    global _AKTIV
    if profil not in PROFILE:
        raise KordonSperre("Unbekanntes Profil " + repr(profil) + " (bekannt: "
                           + str(sorted(PROFILE)) + ")")
    zweig = _branch()
    if zweig == "main":
        raise KordonSperre(
            "Kordon: Repo steht auf 'main'. Der Pruefstand laeuft auf 'draft' — "
            "auf dem Deploy-Branch ist jeder Fehlgriff sofort live.")
    _haken_setzen()
    _AKTIV = profil
    _selbsttest(zweig)
    return zweig


def _erwarte_sperre(luecken: list, name: str, fn) -> None:
    """Ein Versuch, der KordonSperre werfen muss. Alles andere ist eine Luecke — auch
    ein anderer Fehler: dann hat nicht der Kordon gehalten, sondern der Zufall."""
    try:
        fn()
    except KordonSperre:
        return
    except Exception as e:  # noqa: BLE001
        luecken.append(name + ": nicht der Kordon hat gestoppt, sondern "
                       + type(e).__name__ + " — Zufall ist kein Gate")
        return
    luecken.append(name + ": durchgelassen")


def _selbsttest(zweig: str) -> None:
    luecken: list = []
    unerreichbar = ("203.0.113.9", 80)          # TEST-NET-3, nie geroutet

    # --- Schicht 1: jede Naht einzeln
    _erwarte_sperre(luecken, "subprocess.run(list)",
                    lambda: subprocess.run(["git", "push", "--dry-run", "x", "y"],
                                           capture_output=True))
    _erwarte_sperre(luecken, "subprocess.run(shell)",
                    lambda: subprocess.run("npx wrangler deploy", shell=True,
                                           capture_output=True))
    _erwarte_sperre(luecken, "subprocess.run(zerhackt)",
                    lambda: subprocess.run('g""it p""ush x y', shell=True,
                                           capture_output=True))
    _erwarte_sperre(luecken, "os.system", lambda: os.system("git push x y"))
    _erwarte_sperre(luecken, "os.popen", lambda: os.popen("git push x y"))
    _erwarte_sperre(luecken, "os.execv", lambda: os.execv("git", ["git", "push"]))
    # ... und Erlaubtes muss durch, sonst ist die Sperre nur ein Totalausfall.
    try:
        aus = subprocess.run([sys.executable, "-c", "print('ok')"],
                             capture_output=True, text=True)
        if "ok" not in aus.stdout:
            luecken.append("Unterprozess-Sperre blockiert auch erlaubte Kommandos")
    except KordonSperre:
        luecken.append("Unterprozess-Sperre blockiert auch erlaubte Kommandos")

    # --- Schicht 2
    if zweig == "main":
        luecken.append("Branch-Wache hat 'main' durchgelassen")

    # --- Schicht 3: Haken UND explizite Wache, inkl. Praefixform
    _erwarte_sperre(luecken, "open(repo,'w')",
                    lambda: builtins.open(REPO / "_kordon_selbsttest.tmp", "w"))
    _erwarte_sperre(luecken, "open(\\\\?\\-Praefix,'w')",
                    lambda: builtins.open("\\\\?\\" + str(REPO / "_kordon_selbsttest.tmp"), "w"))
    _erwarte_sperre(luecken, "os.remove(repo)",
                    lambda: os.remove(REPO / "index.html"))
    _erwarte_sperre(luecken, "nur_kopie(repo)", lambda: nur_kopie(REPO / "index.html"))
    try:
        ausserhalb = Path(os.environ.get("TEMP", ".")) / "_kordon_ok.tmp"
        with builtins.open(ausserhalb, "w", encoding="utf-8") as fh:
            fh.write("ok")
        _ORIG["remove"](ausserhalb)
    except KordonSperre:
        luecken.append("Schreibsperre blockiert auch ausserhalb des Repos")

    # --- Schicht 4: jede Naht, und KEINE davon gegen ein echtes Ziel.
    # Fassung 1 rief hier machsleicht.de auf — unter Profil 'lesen' waere das ein
    # echter Live-Abruf als Nebenwirkung des Selbsttests gewesen.
    _erwarte_sperre(luecken, "urllib(POST)", lambda: urllib.request.urlopen(  # noqa: S310
        urllib.request.Request("https://203.0.113.9/", data=b"x", method="POST"), timeout=2))
    _erwarte_sperre(luecken, "getaddrinfo", lambda: socket.getaddrinfo("example.invalid", 80))

    def _tcp():
        s = socket.socket()
        s.settimeout(0.4)
        try:
            s.connect(unerreichbar)
        finally:
            s.close()
    _erwarte_sperre(luecken, "socket.connect", _tcp)

    def _udp():
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            s.sendto(b"probe", unerreichbar)
        finally:
            s.close()
    _erwarte_sperre(luecken, "socket.sendto", _udp)

    async def _tcp_async():
        loop = asyncio.get_running_loop()
        await loop.create_connection(asyncio.Protocol, *unerreichbar)
    _erwarte_sperre(luecken, "asyncio.create_connection",
                    lambda: asyncio.run(asyncio.wait_for(_tcp_async(), timeout=3)))

    async def _udp_async():
        loop = asyncio.get_running_loop()
        await loop.create_datagram_endpoint(asyncio.DatagramProtocol,
                                            remote_addr=unerreichbar)
    _erwarte_sperre(luecken, "asyncio.create_datagram_endpoint",
                    lambda: asyncio.run(asyncio.wait_for(_udp_async(), timeout=3)))

    # Loopback muss frei bleiben — sonst kommt auf Windows kein Event-Loop hoch.
    try:
        asyncio.run(asyncio.sleep(0))
    except Exception as e:  # noqa: BLE001
        luecken.append("Loopback ist mitgesperrt worden (" + type(e).__name__ + ")")

    # Profil 'lesen' verspricht GET. Das muss OHNE echten Abruf nachweisbar sein:
    # geprueft wird die Entscheidung, nicht die Verbindung.
    if _AKTIV == "lesen":
        try:
            _netz_pruefen("selbsttest", "beispiel.invalid", "GET")
        except KordonSperre:
            luecken.append("Profil 'lesen' verspricht GET, sperrt es aber")
        # Und die methodenlosen Naehte sperren auch unter 'lesen' — das ist Absicht
        # (sie sehen die Methode nicht), muss aber in der Meldung stehen.

    if luecken:
        raise KordonSperre("Kordon-Selbsttest gescheitert:\n  · " + "\n  · ".join(luecken))


NAEHTE = 13


def zusammenfassung() -> str:
    n = len(PROTOKOLL.versuche)
    gesperrt = len([v for v in PROTOKOLL.versuche if not v.erlaubt])
    zusatz = ""
    if _AKTIV == "lesen":
        zusatz = (" · ACHTUNG Profil 'lesen': GET nur ueber urllib erlaubt; "
                  "socket/asyncio/UDP/DNS sehen keine Methode und bleiben zu")
    return ("Kordon '" + str(_AKTIV) + "' scharf auf Branch '" + _branch()
            + "' · Selbsttest bestanden (" + str(NAEHTE) + " Naehte) · "
            + str(n) + " Versuche gesehen, " + str(gesperrt) + " gesperrt" + zusatz)


if __name__ == "__main__":
    scharf(os.environ.get("KORDON_PROFIL", "dicht"))
    print(zusammenfassung())
