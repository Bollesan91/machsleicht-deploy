import { useState, useCallback } from "react";

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

function extractJSON(text) {
  // Find first { and last } to extract JSON regardless of wrapper text
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) throw new Error("Kein JSON in der Antwort gefunden");
  const jsonStr = text.slice(start, end + 1);
  return JSON.parse(jsonStr);
}

function buildPrompt(age, mode, motto, locType, locDesc, stations) {
  const mottoLabel = mode === "sofort" ? null : MOTTOS.find(m => m.id === motto)?.label;
  const mottoBlock = mottoLabel
    ? `- Motto: ${mottoLabel}\n\n3. MOTTO ${mottoLabel}: Die Rätsel sind im Stil des Mottos geschrieben.\n- Piraten → "Ahoi!", Schatzkarten-Sprache, Seefahrer-Metaphern\n- Einhorn → magisch, glitzernd, verzaubert\n- Detektiv → Hinweise, Spuren, Verdächtige\n- Dino → Urzeitlich, Forscher-Sprache\n- Weltraum → Mission, Planeten, Astronauten-Funksprüche\n- Feuerwehr → Einsatz, Alarm, Rettungsmission\n- Meerjungfrau → Unterwasser, Muscheln, Ozean-Magie\n- Safari → Dschungel, Expedition, wilde Tiere\n- Bei anderen Mottos: passenden Tonfall ableiten`
    : `- Kein spezielles Motto — schreibe die Rätsel abenteuerlich, spannend und kindgerecht. Nutze eine ermutigende Abenteuer-Sprache.`;

  const context = mode === "sofort"
    ? `Dies ist eine spontane Schatzsuche — kein Geburtstag, kein besonderer Anlass. Ein Kind (${age} Jahre) soll jetzt sofort Spaß haben.`
    : `Dies ist eine Geburtstags-Schatzsuche. Das Geburtstagskind wird ${age} Jahre alt.`;

  return `Erstelle eine Schatzsuche mit ${stations.length} Stationen.

KONTEXT:
${context}
${mottoLabel ? `- Motto: ${mottoLabel}` : "- Kein Motto"}
- Ort: ${locType === "garten" ? "Garten" : locType === "wohnung" ? "Wohnung" : "Park"}
${locDesc ? `- Beschreibung der Eltern: "${locDesc}"` : "- Keine weitere Beschreibung"}
- Stationsorte (in Reihenfolge): ${stations.join(", ")}

REGELN:

1. ORTSBEZUG: Jedes Rätsel MUSS einen konkreten Bezug zu einem realen Gegenstand oder Ort aus der Stationsliste haben. Kein generisches "sucht beim nächsten Baum". Sondern: Beschreibungen die NUR an diesem Ort funktionieren.

2. ALTER ${age}:
- 3-5 Jahre: Sehr einfache Sprache, max 2 Sätze, Reimform bevorzugt, offensichtliche Hinweise
- 6-8 Jahre: Einfache Rätsellogik, 2-3 Sätze, darf knifflig sein, Wortspiele erlaubt
- 9-12 Jahre: Echte Denksportaufgaben, Kombinationsrätsel, 3-4 Sätze, Codes möglich

${mottoBlock}

4. ROUTE: Jedes Rätsel beschreibt den NÄCHSTEN Ort, nicht den aktuellen. Station 1 führt zu Station 2 usw.

5. FINALE: Das letzte Rätsel führt zum Versteck des Schatzes. Baue Spannung auf.

Antworte ausschließlich mit validem JSON. Kein Markdown, keine Backticks, kein erklärender Text davor oder danach:
{"intro":"Einstiegstext 2-3 Sätze","riddles":[{"station":1,"targetLocation":"Zielort","riddle":"Rätseltext","hint":"Hinweis falls Kinder stocken"}],"finalWords":"Glückwunsch 2 Sätze"}`;
}

export default function RaetselNachMass() {
  const [mode, setMode] = useState(null); // null, "geburtstag", "sofort"
  const [step, setStep] = useState(0); // 0=mode, 1=alter+motto, 2=ort, 3=stationen, 4=ergebnis
  const [age, setAge] = useState(6);
  const [motto, setMotto] = useState("piraten");
  const [locType, setLocType] = useState("wohnung");
  const [locDesc, setLocDesc] = useState("");
  const [stations, setStations] = useState([]);
  const [customStation, setCustomStation] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [revealedHints, setRevealedHints] = useState({});
  const [printing, setPrinting] = useState(false);

  const mottoObj = mode === "sofort"
    ? { id: "sofort", emoji: "⚡", label: "Abenteuer", color: "#E65100" }
    : MOTTOS.find(m => m.id === motto) || MOTTOS[0];
  const accent = mottoObj.color;
  const presets = LOC_PRESETS[locType] || [];

  const toggleStation = (s) => {
    setStations(prev => prev.includes(s) ? prev.filter(x => x !== s) : prev.length < 8 ? [...prev, s] : prev);
  };
  const addCustom = () => {
    const v = customStation.trim();
    if (v && !stations.includes(v) && stations.length < 8) { setStations(prev => [...prev, v]); setCustomStation(""); }
  };
  const removeStation = (s) => setStations(prev => prev.filter(x => x !== s));

  const generate = useCallback(async () => {
    if (stations.length < 3) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          system: "Du bist ein kreativer Rätselschreiber für Kinder-Schatzsuchen. Du antwortest ausschließlich mit validem JSON.",
          messages: [{ role: "user", content: buildPrompt(age, mode, motto, locType, locDesc, stations) }],
        }),
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error?.message || `API Fehler ${res.status}`); }
      const data = await res.json();
      const text = (data.content || []).map(c => c.text || "").join("");
      if (!text) throw new Error("Leere Antwort von der KI");
      const parsed = extractJSON(text);
      if (!parsed.riddles || !Array.isArray(parsed.riddles)) throw new Error("Ungültiges Format: keine Rätsel gefunden");
      setResult(parsed);
      setStep(4);
    } catch (e) {
      console.error("API Error:", e);
      setError(e.message || "Unbekannter Fehler");
    } finally { setLoading(false); }
  }, [age, mode, motto, locType, locDesc, stations]);

  const reset = () => { setMode(null); setStep(0); setResult(null); setStations([]); setLocDesc(""); setRevealedHints({}); setError(null); };

  // Styles
  const bg = "#FFFCF7", card = "#fff", d = "#2D2319", m = "#8B7D6B", l = "#EDE6DE";

  // Print view
  if (printing && result) {
    return (
      <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: "#fff", padding: 16, color: d }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 32 }}>{mottoObj.emoji}</div>
          <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 20, color: accent }}>{mode === "sofort" ? "Schatzsuche" : mottoObj.label + "-Schatzsuche"}</h1>
          <p style={{ fontSize: 13, color: m, marginTop: 4 }}>{result.intro}</p>
        </div>
        {result.riddles.map((r, i) => (
          <div key={i} style={{ border: `2px solid ${accent}`, borderRadius: 12, padding: 16, marginBottom: 12, pageBreakInside: "avoid" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 4 }}>STATION {r.station}</div>
            <p style={{ fontSize: 14, lineHeight: 1.5 }}>{r.riddle}</p>
            <div style={{ marginTop: 8, fontSize: 11, color: m }}>Lösung: {r.targetLocation}</div>
            <div style={{ fontSize: 11, color: m }}>Tipp: {r.hint}</div>
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: 16, padding: 16, background: accent + "10", borderRadius: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: accent }}>{result.finalWords}</p>
        </div>
        <div style={{ textAlign: "center", marginTop: 24, display: "flex", gap: 8, justifyContent: "center" }}>
          <button onClick={() => setPrinting(false)} style={{ padding: "10px 24px", background: accent, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Zurück</button>
          <button onClick={() => window.print()} style={{ padding: "10px 24px", background: d, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>🖨 Drucken</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: bg, minHeight: "100dvh", color: d }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: 36, marginBottom: 4 }}>{step === 0 ? "🗺️" : mottoObj.emoji}</div>
          <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 22, marginBottom: 4 }}>Rätsel nach Maß</h1>
          <p style={{ fontSize: 13, color: m }}>{mode === "sofort" ? "Sofort-Schatzsuche für zwischendurch" : mode === "geburtstag" ? "Personalisierte Geburtstags-Rätsel" : "KI-generierte Rätsel für deinen Ort"}</p>
        </div>

        {/* Progress (hidden on step 0) */}
        {step > 0 && (
          <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            {(mode === "sofort" ? [1, 2, 3, 4] : [1, 2, 3, 4]).map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: step >= s ? accent : l, transition: "background .3s" }} />
            ))}
          </div>
        )}

        {/* Step 0: Mode Selection */}
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button onClick={() => { setMode("sofort"); setStep(1); setLocType("wohnung"); }} style={{
              background: card, borderRadius: 20, padding: 24, border: `2px solid ${l}`, cursor: "pointer", textAlign: "left",
              transition: "border-color .2s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 36 }}>⚡</span>
                <div>
                  <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 18, margin: 0 }}>Sofort-Schatzsuche</h2>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#E65100", background: "#FFF3E0", padding: "2px 8px", borderRadius: 100 }}>Jederzeit</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: m, lineHeight: 1.5, margin: 0 }}>Sonntag, Regen, Kind langweilt sich? In 2 Minuten steht eine Schatzsuche — in eurer Wohnung, im Garten oder im Park. Kein Motto nötig, kein Anlass.</p>
            </button>

            <button onClick={() => { setMode("geburtstag"); setStep(1); setLocType("garten"); }} style={{
              background: card, borderRadius: 20, padding: 24, border: `2px solid ${l}`, cursor: "pointer", textAlign: "left",
              transition: "border-color .2s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 36 }}>🎉</span>
                <div>
                  <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 18, margin: 0 }}>Geburtstags-Schatzsuche</h2>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#2E7D32", background: "#E8F5E9", padding: "2px 8px", borderRadius: 100 }}>Mit Motto</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: m, lineHeight: 1.5, margin: 0 }}>Piraten, Einhorn, Dino — die Rätsel passen zum Motto und zum Alter. Perfekt als Highlight für den Partytag.</p>
            </button>
          </div>
        )}

        {/* Step 1: Alter (+Motto bei Geburtstag) */}
        {step === 1 && (
          <div style={{ background: card, borderRadius: 20, padding: 20, border: `1px solid ${l}` }}>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 16, marginBottom: 16 }}>
              {mode === "sofort" ? "Wie alt ist dein Kind?" : "1. Wer feiert?"}
            </h2>

            <label style={{ fontSize: 12, fontWeight: 600, color: m, textTransform: "uppercase", letterSpacing: ".06em" }}>Alter</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: mode === "geburtstag" ? 20 : 0, marginTop: 4 }}>
              <button onClick={() => setAge(a => Math.max(3, a - 1))} style={{ width: 44, height: 44, borderRadius: 12, border: `2px solid ${l}`, background: card, fontSize: 20, cursor: "pointer" }}>−</button>
              <span style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Fraunces',serif", color: accent, minWidth: 40, textAlign: "center" }}>{age}</span>
              <button onClick={() => setAge(a => Math.min(12, a + 1))} style={{ width: 44, height: 44, borderRadius: 12, border: `2px solid ${l}`, background: card, fontSize: 20, cursor: "pointer" }}>+</button>
              <span style={{ fontSize: 14, color: m }}>Jahre</span>
            </div>

            {mode === "geburtstag" && (
              <>
                <label style={{ fontSize: 12, fontWeight: 600, color: m, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6, display: "block" }}>Motto</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 4 }}>
                  {MOTTOS.map(mt => (
                    <button key={mt.id} onClick={() => setMotto(mt.id)} style={{
                      padding: "12px 4px", borderRadius: 14, border: `2px solid ${motto === mt.id ? mt.color : l}`,
                      background: motto === mt.id ? mt.color + "12" : card, cursor: "pointer", textAlign: "center", transition: "all .2s"
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

        {/* Step 2: Ort */}
        {step === 2 && (
          <div style={{ background: card, borderRadius: 20, padding: 20, border: `1px solid ${l}` }}>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 16, marginBottom: 16 }}>
              {mode === "sofort" ? "Wo soll's losgehen?" : "2. Wo findet die Schatzsuche statt?"}
            </h2>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[["wohnung", "🏠", "Wohnung"], ["garten", "🌿", "Garten"], ["park", "🌳", "Park"]].map(([id, emoji, label]) => (
                <button key={id} onClick={() => { setLocType(id); setStations([]); }} style={{
                  flex: 1, padding: "14px 4px", borderRadius: 14, border: `2px solid ${locType === id ? accent : l}`,
                  background: locType === id ? accent + "12" : card, cursor: "pointer", textAlign: "center"
                }}>
                  <div style={{ fontSize: 22 }}>{emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: locType === id ? accent : m }}>{label}</div>
                </button>
              ))}
            </div>

            <label style={{ fontSize: 12, fontWeight: 600, color: m, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4, display: "block" }}>
              Beschreibe den Ort {mode === "sofort" ? "(optional)" : "(empfohlen)"}
            </label>
            <textarea
              value={locDesc} onChange={e => setLocDesc(e.target.value)}
              placeholder={locType === "wohnung" ? "z.B. Große Wohnung, Kinderzimmer mit Hochbett, offene Küche, langer Flur, Balkon mit Blumentöpfen" : locType === "garten" ? "z.B. Großer Garten mit altem Apfelbaum links, Sandkasten in der Ecke, rotes Gartenhaus hinten" : "z.B. Stadtpark mit großem Spielplatz, Teich mit Enten, alte Eiche am Eingang"}
              rows={3}
              style={{ width: "100%", padding: "10px 14px", border: `2px solid ${l}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit", color: d, background: "#FAFAF5", resize: "none", outline: "none" }}
            />
            <p style={{ fontSize: 11, color: m, marginTop: 4, marginBottom: 16 }}>Je genauer, desto besser die Rätsel.</p>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: 14, background: "transparent", border: `2px solid ${l}`, color: m, borderRadius: 16, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>←</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: 14, background: accent, color: "#fff", border: "none", borderRadius: 16, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Weiter →</button>
            </div>
          </div>
        )}

        {/* Step 3: Stationen */}
        {step === 3 && (
          <div style={{ background: card, borderRadius: 20, padding: 20, border: `1px solid ${l}` }}>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 16, marginBottom: 4 }}>
              {mode === "sofort" ? "Stationen wählen" : "3. Stationen wählen"}
            </h2>
            <p style={{ fontSize: 13, color: m, marginBottom: 16 }}>Wähle 3-8 Orte. Die Reihenfolge = die Route.</p>

            {stations.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: ".08em" }}>Deine Route ({stations.length})</label>
                <div style={{ marginTop: 6 }}>
                  {stations.map((s, i) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ width: 24, height: 24, borderRadius: "50%", background: accent, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{s}</span>
                      <button onClick={() => removeStation(s)} style={{ background: "none", border: "none", fontSize: 18, color: m, cursor: "pointer", padding: "0 4px" }}>×</button>
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.5 }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFD700", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🏆</span>
                    <span style={{ fontSize: 13, color: m, fontStyle: "italic" }}>Schatz!</span>
                  </div>
                </div>
              </div>
            )}

            <label style={{ fontSize: 11, fontWeight: 700, color: m, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6, display: "block" }}>Antippen zum Hinzufügen</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {presets.filter(p => !stations.includes(p)).map(p => (
                <button key={p} onClick={() => toggleStation(p)} style={{
                  padding: "7px 14px", borderRadius: 100, border: `1px solid ${l}`,
                  background: card, fontSize: 13, color: d, cursor: "pointer", fontWeight: 500
                }}>{p}</button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input
                value={customStation} onChange={e => setCustomStation(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addCustom()}
                placeholder="Eigene Station..."
                style={{ flex: 1, padding: "10px 14px", border: `2px solid ${l}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit", outline: "none", color: d, background: "#FAFAF5" }}
              />
              <button onClick={addCustom} style={{ padding: "10px 18px", background: accent, color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>+</button>
            </div>

            {error && (
              <div style={{ background: "#FFEBEE", border: "1px solid #FFCDD2", borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#C62828" }}>
                ⚠️ {error}
                <button onClick={() => setError(null)} style={{ float: "right", background: "none", border: "none", color: "#C62828", cursor: "pointer", fontWeight: 700 }}>×</button>
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: 14, background: "transparent", border: `2px solid ${l}`, color: m, borderRadius: 16, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>←</button>
              <button
                onClick={generate}
                disabled={stations.length < 3 || loading}
                style={{
                  flex: 2, padding: 14,
                  background: stations.length < 3 ? l : loading ? accent + "80" : accent,
                  color: stations.length < 3 ? m : "#fff",
                  border: "none", borderRadius: 16, fontSize: 15, fontWeight: 600,
                  cursor: stations.length < 3 || loading ? "default" : "pointer",
                }}
              >
                {loading ? (
                  <span>🎯 KI generiert<span style={{ animation: "pulse 1.5s infinite" }}>...</span></span>
                ) : stations.length < 3 ? (
                  `Noch ${3 - stations.length} Station${3 - stations.length > 1 ? "en" : ""}`
                ) : (
                  `🎯 ${stations.length} Rätsel generieren`
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && result && (
          <div>
            <div style={{ background: accent + "10", border: `2px solid ${accent}30`, borderRadius: 20, padding: 20, textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{mottoObj.emoji}</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 18, color: accent, marginBottom: 8 }}>
                {mode === "sofort" ? "Deine Schatzsuche" : mottoObj.label + "-Schatzsuche"}
              </h2>
              <p style={{ fontSize: 14, color: d, lineHeight: 1.6, fontStyle: "italic" }}>{result.intro}</p>
            </div>

            {result.riddles.map((r, i) => (
              <div key={i} style={{ background: card, borderRadius: 20, padding: 20, border: `1px solid ${l}`, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: accent, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{r.station}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: ".06em" }}>Station {r.station}</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, color: m }}>→ {r.targetLocation}</span>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: d, marginBottom: 10 }}>{r.riddle}</p>
                <button onClick={() => setRevealedHints(prev => ({ ...prev, [i]: !prev[i] }))} style={{
                  padding: "6px 14px", borderRadius: 10, border: `1px solid ${l}`,
                  background: revealedHints[i] ? "#FFF3E0" : card, fontSize: 12, color: revealedHints[i] ? "#E65100" : m,
                  cursor: "pointer", fontWeight: 500
                }}>
                  {revealedHints[i] ? `💡 ${r.hint}` : "💡 Tipp anzeigen"}
                </button>
              </div>
            ))}

            <div style={{ background: "#FFD700" + "20", border: `2px solid #FFD70050`, borderRadius: 20, padding: 20, textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🏆</div>
              <p style={{ fontSize: 15, fontWeight: 600, color: d, lineHeight: 1.5 }}>{result.finalWords}</p>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <button onClick={() => setPrinting(true)} style={{ flex: 1, padding: 14, background: accent, color: "#fff", border: "none", borderRadius: 16, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>🖨 Drucken</button>
              <button onClick={() => {
                const text = `${mottoObj.emoji} ${mode === "sofort" ? "Schatzsuche" : mottoObj.label + "-Schatzsuche"}\n\n${result.intro}\n\n` +
                  result.riddles.map(r => `Station ${r.station}:\n${r.riddle}\n(→ ${r.targetLocation})\n`).join("\n") +
                  `\n🏆 ${result.finalWords}`;
                if (navigator.share) navigator.share({ text }); else navigator.clipboard?.writeText(text);
              }} style={{ flex: 1, padding: 14, background: d, color: "#fff", border: "none", borderRadius: 16, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>📲 Teilen</button>
            </div>

            <button onClick={() => { setResult(null); setRevealedHints({}); generate(); }} style={{
              width: "100%", padding: 14, background: "transparent", border: `2px solid ${accent}`,
              color: accent, borderRadius: 16, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 8
            }}>🔄 Neue Rätsel generieren</button>

            <button onClick={reset} style={{
              width: "100%", padding: 14, background: "transparent", border: `2px solid ${l}`,
              color: m, borderRadius: 16, fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}>← Von vorne</button>
          </div>
        )}

        <div style={{ textAlign: "center", padding: "24px 0 12px", fontSize: 11, color: m }}>
          machsleicht.de · Rätsel nach Maß
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </div>
  );
}
