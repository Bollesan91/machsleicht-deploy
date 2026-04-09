import { useState, useCallback, useRef } from "react";

const MOTTOS = [
  { id: "piraten", emoji: "🏴‍☠️", label: "Piraten", color: "#8B4513" },
  { id: "einhorn", emoji: "🦄", label: "Einhorn", color: "#E040A0" },
  { id: "dino", emoji: "🦕", label: "Dino", color: "#4CAF50" },
  { id: "detektiv", emoji: "🔍", label: "Detektiv", color: "#37474F" },
  { id: "weltraum", emoji: "🚀", label: "Weltraum", color: "#1565C0" },
  { id: "feuerwehr", emoji: "🚒", label: "Feuerwehr", color: "#D32F2F" },
  { id: "meerjungfrau", emoji: "🧜‍♀️", label: "Meerjungfrau", color: "#00ACC1" },
  { id: "safari", emoji: "🦁", label: "Safari", color: "#F57F17" },
];

const LOC_PRESETS = {
  garten: ["Apfelbaum", "Sandkasten", "Gartenhaus", "Schaukel", "Rutsche", "Regentonne", "Blumenbeet", "Zaun", "Terrasse", "Kompost"],
  wohnung: ["Sofa", "Kühlschrank", "Badewanne", "Bücherregal", "Schuhschrank", "Waschmaschine", "Bett", "Balkon", "Garderobe", "Fensterbank"],
  park: ["Große Eiche", "Spielplatz", "Parkbank", "Brunnen", "Mülleimer", "Hecke", "Wiese", "Brücke", "Statue", "Eingangstor"],
};

const DIFF_LABELS = { leicht: "🌱 Leicht", mittel: "🎯 Mittel", knobel: "🧩 Knobel" };
const DIFF_DESC = { leicht: "Offensichtliche Hinweise, Reimform", mittel: "Ein bisschen knifflig, Wortspiele", knobel: "Echte Denksportaufgaben, Codes" };

function extractJSON(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) throw new Error("Kein JSON in der Antwort gefunden");
  return JSON.parse(text.slice(start, end + 1));
}

function compressPhoto(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const max = 600;
        let w = img.width, h = img.height;
        if (w > max || h > max) { const r = Math.min(max / w, max / h); w *= r; h *= r; }
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.6));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function buildPrompt(age, mode, motto, locType, locDesc, stations, difficulty, solutionWord) {
  const mottoLabel = mode === "sofort" ? null : MOTTOS.find(m => m.id === motto)?.label;
  const context = mode === "sofort"
    ? `Spontane Schatzsuche — kein Geburtstag. Kind ist ${age} Jahre alt.`
    : `Geburtstags-Schatzsuche. Das Kind wird ${age} Jahre alt.`;

  const mottoBlock = mottoLabel
    ? `Motto: ${mottoLabel}. Schreibe die Rätsel im Stil des Mottos (Piraten → Seefahrer-Sprache, Einhorn → magisch, Detektiv → Spuren, Dino → Forscher, Weltraum → Astronauten, etc.).`
    : `Kein Motto. Schreibe abenteuerlich und spannend.`;

  const diffBlock = {
    leicht: `SCHWIERIGKEIT LEICHT: Sehr einfache Sprache, max 2 Sätze pro Rätsel, Reimform bevorzugt, offensichtliche Hinweise. Das Kind muss den Ort SEHEN können.`,
    mittel: `SCHWIERIGKEIT MITTEL: Einfache Rätsellogik, 2-3 Sätze, darf knifflig sein, Wortspiele erlaubt. Das Kind muss kurz nachdenken.`,
    knobel: `SCHWIERIGKEIT KNOBEL: Echte Denksportaufgaben, 3-4 Sätze, Kombinationsrätsel, Codes oder Zahlenrätsel möglich. Das Kind muss richtig grübeln.`,
  }[difficulty] || "";

  const solutionBlock = solutionWord
    ? `\nWICHTIG — LÖSUNGSWORT: Die Anfangsbuchstaben der targetLocation-Werte MÜSSEN in der richtigen Reihenfolge das Wort "${solutionWord.toUpperCase()}" ergeben. Wähle die Stationsorte so, dass dies funktioniert. Du darfst die Reihenfolge der Stationen anpassen. Beispiel: Wenn das Lösungswort "SCHATZ" ist, muss Station 1 mit S beginnen, Station 2 mit C usw.`
    : "";

  return `Erstelle eine Schatzsuche mit ${stations.length} Stationen.

${context}
${mottoBlock}
Ort: ${locType === "garten" ? "Garten" : locType === "wohnung" ? "Wohnung" : "Park"}
${locDesc ? `Beschreibung: "${locDesc}"` : ""}
Verfügbare Stationen: ${stations.join(", ")}

${diffBlock}
${solutionBlock}

REGELN:
1. Jedes Rätsel beschreibt den NÄCHSTEN Ort. Station 1 führt zu Station 2 usw.
2. Jedes Rätsel MUSS konkreten Bezug zum realen Ort haben — keine generischen Hinweise.
3. Das letzte Rätsel führt zum Schatz. Baue Spannung auf.
4. Jedes Rätsel braucht einen zusätzlichen Hinweis für den Fall dass die Kinder stocken.

Antworte NUR mit validem JSON, nichts davor oder danach:
{"intro":"Einstiegstext 2-3 Sätze","riddles":[{"station":1,"targetLocation":"Zielort","riddle":"Rätseltext","hint":"Tipp"}],"finalWords":"Glückwunsch 2 Sätze"${solutionWord ? ',"solutionWord":"' + solutionWord.toUpperCase() + '"' : ""}}`;
}

export default function App() {
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(6);
  const [difficulty, setDifficulty] = useState("mittel");
  const [motto, setMotto] = useState("piraten");
  const [locType, setLocType] = useState("wohnung");
  const [locDesc, setLocDesc] = useState("");
  const [stations, setStations] = useState([]);
  const [stationPhotos, setStationPhotos] = useState({});
  const [customStation, setCustomStation] = useState("");
  const [solutionWord, setSolutionWord] = useState("");
  const [useSolutionWord, setUseSolutionWord] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [revealedHints, setRevealedHints] = useState({});
  const [printing, setPrinting] = useState(false);
  const fileRefs = useRef({});

  const mottoObj = mode === "sofort"
    ? { id: "sofort", emoji: "⚡", label: "Abenteuer", color: "#E65100" }
    : MOTTOS.find(m => m.id === motto) || MOTTOS[0];
  const accent = mottoObj.color;
  const presets = LOC_PRESETS[locType] || [];

  const addStation = (s) => { if (!stations.includes(s) && stations.length < 8) setStations(prev => [...prev, s]); };
  const removeStation = (s) => { setStations(prev => prev.filter(x => x !== s)); setStationPhotos(prev => { const n = { ...prev }; delete n[s]; return n; }); };
  const addCustom = () => { const v = customStation.trim(); if (v && !stations.includes(v) && stations.length < 8) { setStations(prev => [...prev, v]); setCustomStation(""); } };

  const handlePhoto = async (stationName, file) => {
    if (!file) return;
    const compressed = await compressPhoto(file);
    setStationPhotos(prev => ({ ...prev, [stationName]: compressed }));
  };

  const generate = useCallback(async () => {
    if (stations.length < 3) return;
    if (useSolutionWord && solutionWord.length !== stations.length) {
      setError(`Lösungswort muss genau ${stations.length} Buchstaben haben (aktuell: ${solutionWord.length})`);
      return;
    }
    setLoading(true); setError(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          system: "Du bist ein kreativer Rätselschreiber für Kinder-Schatzsuchen. Antworte ausschließlich mit validem JSON.",
          messages: [{ role: "user", content: buildPrompt(age, mode, motto, locType, locDesc, stations, difficulty, useSolutionWord ? solutionWord : null) }],
        }),
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error?.message || `API Fehler ${res.status}`); }
      const data = await res.json();
      const text = (data.content || []).map(c => c.text || "").join("");
      if (!text) throw new Error("Leere Antwort");
      const parsed = extractJSON(text);
      if (!parsed.riddles?.length) throw new Error("Keine Rätsel generiert");
      setResult(parsed);
      setStep(4);
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  }, [age, mode, motto, locType, locDesc, stations, difficulty, useSolutionWord, solutionWord]);

  const reset = () => { setMode(null); setStep(0); setResult(null); setStations([]); setStationPhotos({}); setLocDesc(""); setRevealedHints({}); setError(null); setSolutionWord(""); setUseSolutionWord(false); };

  const d = "#2D2319", m = "#8B7D6B", l = "#EDE6DE", card = "#fff", bg = "#FFFCF7";

  // ─── Print View ───
  if (printing && result) {
    return (
      <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: "#fff", padding: 16, color: d }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 32 }}>{mottoObj.emoji}</div>
          <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 20, color: accent }}>
            {mode === "sofort" ? "Schatzsuche" : mottoObj.label + "-Schatzsuche"}
          </h1>
          <p style={{ fontSize: 13, color: m, marginTop: 4 }}>{result.intro}</p>
        </div>
        {result.riddles.map((r, i) => {
          const photo = stationPhotos[r.targetLocation];
          return (
            <div key={i} style={{ border: `2px solid ${accent}`, borderRadius: 12, padding: 16, marginBottom: 12, pageBreakInside: "avoid" }}>
              {photo && <img src={photo} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />}
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 4 }}>STATION {r.station}</div>
              <p style={{ fontSize: 14, lineHeight: 1.5 }}>{r.riddle}</p>
              <div style={{ marginTop: 8, fontSize: 11, color: m }}>Lösung: {r.targetLocation}</div>
              <div style={{ fontSize: 11, color: m }}>Tipp: {r.hint}</div>
            </div>
          );
        })}
        {result.solutionWord && (
          <div style={{ textAlign: "center", padding: 12, background: accent + "10", borderRadius: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: accent }}>LÖSUNGSWORT</div>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Fraunces',serif", color: accent, letterSpacing: 6, marginTop: 4 }}>{result.solutionWord}</div>
          </div>
        )}
        <div style={{ textAlign: "center", padding: 16, background: "#FFD70020", borderRadius: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: accent }}>{result.finalWords}</p>
        </div>
        <div style={{ textAlign: "center", marginTop: 24, display: "flex", gap: 8, justifyContent: "center" }}>
          <button onClick={() => setPrinting(false)} style={{ padding: "10px 24px", background: accent, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Zurück</button>
          <button onClick={() => window.print()} style={{ padding: "10px 24px", background: d, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>🖨 Drucken</button>
        </div>
      </div>
    );
  }

  // ─── Main View ───
  return (
    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: bg, minHeight: "100dvh", color: d }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>

        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: 36 }}>{step === 0 ? "🗺️" : mottoObj.emoji}</div>
          <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 22, marginBottom: 4 }}>Rätsel nach Maß</h1>
          <p style={{ fontSize: 13, color: m }}>
            {mode === "sofort" ? "Sofort-Schatzsuche" : mode === "geburtstag" ? "Geburtstags-Schatzsuche" : "KI-Rätsel für deinen Ort"}
          </p>
        </div>

        {step > 0 && (
          <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            {[1, 2, 3, 4].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: step >= s ? accent : l }} />
            ))}
          </div>
        )}

        {/* ═══ Step 0: Mode ═══ */}
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button onClick={() => { setMode("sofort"); setStep(1); setLocType("wohnung"); }} style={{ background: card, borderRadius: 20, padding: 24, border: `2px solid ${l}`, cursor: "pointer", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 36 }}>⚡</span>
                <div>
                  <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 18, margin: 0 }}>Sofort-Schatzsuche</h2>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#E65100", background: "#FFF3E0", padding: "2px 8px", borderRadius: 100 }}>Jederzeit · Kein Anlass nötig</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: m, lineHeight: 1.5, margin: 0 }}>Sonntag, Regen, Kind langweilt sich? In 2 Minuten steht eine Schatzsuche — Wohnung, Garten oder Park.</p>
            </button>
            <button onClick={() => { setMode("geburtstag"); setStep(1); setLocType("garten"); }} style={{ background: card, borderRadius: 20, padding: 24, border: `2px solid ${l}`, cursor: "pointer", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 36 }}>🎉</span>
                <div>
                  <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 18, margin: 0 }}>Geburtstags-Schatzsuche</h2>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#2E7D32", background: "#E8F5E9", padding: "2px 8px", borderRadius: 100 }}>Mit Motto · Für den Partytag</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: m, lineHeight: 1.5, margin: 0 }}>Piraten, Einhorn, Dino — Rätsel im Motto-Stil, perfekt für den Kindergeburtstag.</p>
            </button>
          </div>
        )}

        {/* ═══ Step 1: Alter + Schwierigkeit + Motto ═══ */}
        {step === 1 && (
          <div style={{ background: card, borderRadius: 20, padding: 20, border: `1px solid ${l}` }}>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 16, marginBottom: 16 }}>
              {mode === "sofort" ? "Für wen?" : "1. Wer feiert?"}
            </h2>

            <label style={{ fontSize: 12, fontWeight: 600, color: m, textTransform: "uppercase", letterSpacing: ".06em" }}>Alter</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4, marginBottom: 20 }}>
              <button onClick={() => setAge(a => Math.max(3, a - 1))} style={{ width: 44, height: 44, borderRadius: 12, border: `2px solid ${l}`, background: card, fontSize: 20, cursor: "pointer" }}>−</button>
              <span style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Fraunces',serif", color: accent, minWidth: 40, textAlign: "center" }}>{age}</span>
              <button onClick={() => setAge(a => Math.min(12, a + 1))} style={{ width: 44, height: 44, borderRadius: 12, border: `2px solid ${l}`, background: card, fontSize: 20, cursor: "pointer" }}>+</button>
              <span style={{ fontSize: 14, color: m }}>Jahre</span>
            </div>

            <label style={{ fontSize: 12, fontWeight: 600, color: m, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6, display: "block" }}>Schwierigkeit</label>
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {["leicht", "mittel", "knobel"].map(dif => (
                <button key={dif} onClick={() => setDifficulty(dif)} style={{
                  flex: 1, padding: "10px 4px", borderRadius: 12, border: `2px solid ${difficulty === dif ? accent : l}`,
                  background: difficulty === dif ? accent + "12" : card, cursor: "pointer", textAlign: "center"
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: difficulty === dif ? accent : d }}>{DIFF_LABELS[dif]}</div>
                  <div style={{ fontSize: 10, color: m, marginTop: 2 }}>{DIFF_DESC[dif]}</div>
                </button>
              ))}
            </div>

            {mode === "geburtstag" && (
              <>
                <label style={{ fontSize: 12, fontWeight: 600, color: m, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6, display: "block" }}>Motto</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 4 }}>
                  {MOTTOS.map(mt => (
                    <button key={mt.id} onClick={() => setMotto(mt.id)} style={{
                      padding: "12px 4px", borderRadius: 14, border: `2px solid ${motto === mt.id ? mt.color : l}`,
                      background: motto === mt.id ? mt.color + "12" : card, cursor: "pointer", textAlign: "center"
                    }}>
                      <div style={{ fontSize: 24 }}>{mt.emoji}</div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: motto === mt.id ? mt.color : m, marginTop: 2 }}>{mt.label}</div>
                    </button>
                  ))}
                </div>
              </>
            )}

            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              <button onClick={() => { setStep(0); setMode(null); }} style={{ flex: 1, padding: 14, background: "transparent", border: `2px solid ${l}`, color: m, borderRadius: 16, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>←</button>
              <button onClick={() => setStep(2)} style={{ flex: 2, padding: 14, background: accent, color: "#fff", border: "none", borderRadius: 16, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Weiter →</button>
            </div>
          </div>
        )}

        {/* ═══ Step 2: Ort ═══ */}
        {step === 2 && (
          <div style={{ background: card, borderRadius: 20, padding: 20, border: `1px solid ${l}` }}>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 16, marginBottom: 16 }}>
              {mode === "sofort" ? "Wo soll's losgehen?" : "2. Wo findet die Schatzsuche statt?"}
            </h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[["wohnung", "🏠", "Wohnung"], ["garten", "🌿", "Garten"], ["park", "🌳", "Park"]].map(([id, emoji, label]) => (
                <button key={id} onClick={() => { setLocType(id); setStations([]); setStationPhotos({}); }} style={{
                  flex: 1, padding: "14px 4px", borderRadius: 14, border: `2px solid ${locType === id ? accent : l}`,
                  background: locType === id ? accent + "12" : card, cursor: "pointer", textAlign: "center"
                }}>
                  <div style={{ fontSize: 22 }}>{emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: locType === id ? accent : m }}>{label}</div>
                </button>
              ))}
            </div>
            <label style={{ fontSize: 12, fontWeight: 600, color: m, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4, display: "block" }}>Beschreibe den Ort</label>
            <textarea value={locDesc} onChange={e => setLocDesc(e.target.value)}
              placeholder={locType === "wohnung" ? "z.B. Kinderzimmer mit Hochbett, offene Küche, langer Flur, Balkon" : locType === "garten" ? "z.B. Alter Apfelbaum, Sandkasten, rotes Gartenhaus, Schaukel" : "z.B. Stadtpark, großer Spielplatz, Teich, alte Eiche am Eingang"}
              rows={3} style={{ width: "100%", padding: "10px 14px", border: `2px solid ${l}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit", color: d, background: "#FAFAF5", resize: "none", outline: "none" }} />
            <p style={{ fontSize: 11, color: m, marginTop: 4, marginBottom: 16 }}>Je genauer, desto besser die Rätsel.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: 14, background: "transparent", border: `2px solid ${l}`, color: m, borderRadius: 16, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>←</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: 14, background: accent, color: "#fff", border: "none", borderRadius: 16, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Weiter →</button>
            </div>
          </div>
        )}

        {/* ═══ Step 3: Stationen + Fotos + Lösungswort ═══ */}
        {step === 3 && (
          <div style={{ background: card, borderRadius: 20, padding: 20, border: `1px solid ${l}` }}>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 16, marginBottom: 4 }}>
              {mode === "sofort" ? "Stationen wählen" : "3. Stationen wählen"}
            </h2>
            <p style={{ fontSize: 13, color: m, marginBottom: 16 }}>3-8 Orte wählen. Optional: Foto pro Station für die Druckversion.</p>

            {/* Route with photos */}
            {stations.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: ".08em" }}>Deine Route ({stations.length})</label>
                <div style={{ marginTop: 6 }}>
                  {stations.map((s, i) => (
                    <div key={s} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 24, height: 24, borderRadius: "50%", background: accent, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{s}</span>
                        <button onClick={() => { const ref = fileRefs.current; if (!ref[s]) { ref[s] = document.createElement("input"); ref[s].type = "file"; ref[s].accept = "image/*"; ref[s].onchange = (e) => handlePhoto(s, e.target.files[0]); } ref[s].click(); }}
                          style={{ background: stationPhotos[s] ? "#E8F5E9" : "none", border: `1px solid ${stationPhotos[s] ? "#4CAF50" : l}`, borderRadius: 8, padding: "2px 8px", fontSize: 12, cursor: "pointer", color: stationPhotos[s] ? "#2E7D32" : m }}>
                          {stationPhotos[s] ? "✅ Foto" : "📷"}
                        </button>
                        <button onClick={() => removeStation(s)} style={{ background: "none", border: "none", fontSize: 18, color: m, cursor: "pointer", padding: "0 2px" }}>×</button>
                      </div>
                      {stationPhotos[s] && (
                        <img src={stationPhotos[s]} style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 8, marginTop: 4, marginLeft: 32 }} />
                      )}
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.5 }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFD700", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🏆</span>
                    <span style={{ fontSize: 13, color: m, fontStyle: "italic" }}>Schatz!</span>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <label style={{ fontSize: 11, fontWeight: 700, color: m, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6, display: "block" }}>Antippen zum Hinzufügen</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {presets.filter(p => !stations.includes(p)).map(p => (
                <button key={p} onClick={() => addStation(p)} style={{ padding: "7px 14px", borderRadius: 100, border: `1px solid ${l}`, background: card, fontSize: 13, color: d, cursor: "pointer", fontWeight: 500 }}>{p}</button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input value={customStation} onChange={e => setCustomStation(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustom()}
                placeholder="Eigene Station..." style={{ flex: 1, padding: "10px 14px", border: `2px solid ${l}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit", outline: "none", color: d, background: "#FAFAF5" }} />
              <button onClick={addCustom} style={{ padding: "10px 18px", background: accent, color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>+</button>
            </div>

            {/* Solution Word */}
            <div style={{ background: "#FAFAF5", borderRadius: 14, padding: 14, marginBottom: 16, border: `1px solid ${l}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setUseSolutionWord(p => !p)}>
                <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${useSolutionWord ? accent : l}`, background: useSolutionWord ? accent : card, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {useSolutionWord && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: d }}>🔤 Lösungswort</div>
                  <div style={{ fontSize: 11, color: m }}>Anfangsbuchstaben der Stationen ergeben ein Wort</div>
                </div>
              </div>
              {useSolutionWord && (
                <div style={{ marginTop: 10 }}>
                  <input value={solutionWord} onChange={e => setSolutionWord(e.target.value.replace(/[^a-zA-ZäöüÄÖÜ]/g, ""))}
                    placeholder={`z.B. SCHATZ (${stations.length} Buchstaben)`} maxLength={stations.length || 8}
                    style={{ width: "100%", padding: "10px 14px", border: `2px solid ${accent}`, borderRadius: 12, fontSize: 18, fontFamily: "'Fraunces',serif", fontWeight: 700, textAlign: "center", letterSpacing: 4, textTransform: "uppercase", color: accent, outline: "none", background: "#fff" }} />
                  {stations.length > 0 && solutionWord && (
                    <p style={{ fontSize: 11, color: solutionWord.length === stations.length ? "#2E7D32" : "#C62828", marginTop: 4, textAlign: "center" }}>
                      {solutionWord.length === stations.length ? `✅ Passt! ${solutionWord.length} Buchstaben = ${stations.length} Stationen` : `${solutionWord.length}/${stations.length} Buchstaben`}
                    </p>
                  )}
                </div>
              )}
            </div>

            {error && (
              <div style={{ background: "#FFEBEE", border: "1px solid #FFCDD2", borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#C62828" }}>
                ⚠️ {error}
                <button onClick={() => setError(null)} style={{ float: "right", background: "none", border: "none", color: "#C62828", cursor: "pointer", fontWeight: 700 }}>×</button>
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: 14, background: "transparent", border: `2px solid ${l}`, color: m, borderRadius: 16, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>←</button>
              <button onClick={generate} disabled={stations.length < 3 || loading} style={{
                flex: 2, padding: 14, background: stations.length < 3 ? l : loading ? accent + "80" : accent,
                color: stations.length < 3 ? m : "#fff", border: "none", borderRadius: 16, fontSize: 15, fontWeight: 600,
                cursor: stations.length < 3 || loading ? "default" : "pointer",
              }}>
                {loading ? "🎯 KI generiert..." : stations.length < 3 ? `Noch ${3 - stations.length} Station${3 - stations.length > 1 ? "en" : ""}` : `🎯 ${stations.length} Rätsel generieren`}
              </button>
            </div>
          </div>
        )}

        {/* ═══ Step 4: Results ═══ */}
        {step === 4 && result && (
          <div>
            <div style={{ background: accent + "10", border: `2px solid ${accent}30`, borderRadius: 20, padding: 20, textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{mottoObj.emoji}</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 18, color: accent, marginBottom: 8 }}>
                {mode === "sofort" ? "Deine Schatzsuche" : mottoObj.label + "-Schatzsuche"}
              </h2>
              <p style={{ fontSize: 14, color: d, lineHeight: 1.6, fontStyle: "italic" }}>{result.intro}</p>
              {result.solutionWord && (
                <div style={{ marginTop: 12, padding: "8px 16px", background: accent + "15", borderRadius: 10, display: "inline-block" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: accent }}>LÖSUNGSWORT: </span>
                  <span style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Fraunces',serif", color: accent, letterSpacing: 4 }}>{result.solutionWord}</span>
                </div>
              )}
            </div>

            {result.riddles.map((r, i) => {
              const photo = stationPhotos[r.targetLocation];
              return (
                <div key={i} style={{ background: card, borderRadius: 20, padding: 20, border: `1px solid ${l}`, marginBottom: 12, overflow: "hidden" }}>
                  {photo && <img src={photo} style={{ width: "calc(100% + 40px)", height: 140, objectFit: "cover", margin: "-20px -20px 12px -20px" }} />}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", background: accent, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{r.station}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: ".06em" }}>Station {r.station}</span>
                    {result.solutionWord && <span style={{ marginLeft: "auto", fontSize: 16, fontWeight: 800, fontFamily: "'Fraunces',serif", color: accent }}>{r.targetLocation[0]?.toUpperCase()}</span>}
                    {!result.solutionWord && <span style={{ marginLeft: "auto", fontSize: 11, color: m }}>→ {r.targetLocation}</span>}
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: d, marginBottom: 10 }}>{r.riddle}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setRevealedHints(p => ({ ...p, [i]: !p[i] }))} style={{
                      padding: "6px 14px", borderRadius: 10, border: `1px solid ${l}`,
                      background: revealedHints[i] ? "#FFF3E0" : card, fontSize: 12, color: revealedHints[i] ? "#E65100" : m, cursor: "pointer", fontWeight: 500
                    }}>
                      {revealedHints[i] ? `💡 ${r.hint}` : "💡 Tipp"}
                    </button>
                    {!result.solutionWord && (
                      <button onClick={() => setRevealedHints(p => ({ ...p, ["loc" + i]: !p["loc" + i] }))} style={{
                        padding: "6px 14px", borderRadius: 10, border: `1px solid ${l}`,
                        background: revealedHints["loc" + i] ? "#E8F5E9" : card, fontSize: 12, color: revealedHints["loc" + i] ? "#2E7D32" : m, cursor: "pointer", fontWeight: 500
                      }}>
                        {revealedHints["loc" + i] ? `📍 ${r.targetLocation}` : "📍 Lösung"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div style={{ background: "#FFD70020", border: `2px solid #FFD70050`, borderRadius: 20, padding: 20, textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🏆</div>
              <p style={{ fontSize: 15, fontWeight: 600, color: d, lineHeight: 1.5 }}>{result.finalWords}</p>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <button onClick={() => setPrinting(true)} style={{ flex: 1, padding: 14, background: accent, color: "#fff", border: "none", borderRadius: 16, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>🖨 Drucken</button>
              <button onClick={() => {
                const t = `${mottoObj.emoji} ${mode === "sofort" ? "Schatzsuche" : mottoObj.label + "-Schatzsuche"}\n\n${result.intro}\n\n` +
                  result.riddles.map(r => `Station ${r.station}:\n${r.riddle}\n`).join("\n") +
                  (result.solutionWord ? `\n🔤 Lösungswort: ${result.solutionWord}\n` : "") + `\n🏆 ${result.finalWords}`;
                if (navigator.share) navigator.share({ text: t }); else navigator.clipboard?.writeText(t);
              }} style={{ flex: 1, padding: 14, background: d, color: "#fff", border: "none", borderRadius: 16, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>📲 Teilen</button>
            </div>

            <button onClick={() => { setResult(null); setRevealedHints({}); generate(); }} style={{
              width: "100%", padding: 14, background: "transparent", border: `2px solid ${accent}`, color: accent, borderRadius: 16, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 8
            }}>🔄 Neue Rätsel</button>

            <button onClick={reset} style={{
              width: "100%", padding: 14, background: "transparent", border: `2px solid ${l}`, color: m, borderRadius: 16, fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}>← Von vorne</button>
          </div>
        )}

        <div style={{ textAlign: "center", padding: "24px 0 12px", fontSize: 11, color: m }}>machsleicht.de · Rätsel nach Maß</div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </div>
  );
}
