const { useState, useEffect } = React;
const TH = window.MACHSLEICHT_THEMES || {};
const TH_H = window.MACHSLEICHT_THEME_HELPERS || {};
const BP = window.BirthdayProject || null;
function orderedMottos() {
  const all = Object.values(TH);
  const ready = all.filter((m) => {
    const wt = TH_H.getWizardTheme && TH_H.getWizardTheme(m.slug);
    return wt && wt.wizardReady;
  });
  const pending = all.filter((m) => {
    const wt = TH_H.getWizardTheme && TH_H.getWizardTheme(m.slug);
    return !(wt && wt.wizardReady);
  });
  return [...ready, ...pending];
}
const AGE_OPTIONS = [
  { key: "3-5", range: "3\u20135", title: "Kindergartenkinder", desc: "Kurze Spiele, viel Mitmachen, einfache Schatzsuche-Reime", features: ["Tagesplan 14:00\u201316:30", "5 einfache Spiele", "3 Schatzsuche-Stationen"], plannerAge: 5 },
  { key: "6-8", range: "6\u20138", title: "Vorschule + 1. Klasse", desc: "Aktiv, kompetitiv \u2014 perfekte Zielgruppe", features: ["Tagesplan 14:00\u201317:00", "7 Spiele zur Auswahl", "5 Schatzsuche-Stationen"], plannerAge: 7 },
  { key: "9-12", range: "9\u201312", title: "Grundschulkinder", desc: "Anspruchsvollere R\xE4tsel, komplexere Spiele", features: ["Tagesplan 14:00\u201318:00", "9 Spiele zur Auswahl", "7 Stationen + Geheimschrift"], plannerAge: 10 }
];
function ProgressDots({ stage }) {
  const dots = [1, 2, 3, 4, 5, 6];
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, dots.map((n) => /* @__PURE__ */ React.createElement("span", { key: n, style: {
    width: n === stage ? 10 : 7,
    height: n === stage ? 10 : 7,
    borderRadius: "50%",
    background: n < stage ? "#FF6F00" : n === stage ? "#FF6F00" : "#E6D4BD",
    boxShadow: n === stage ? "0 0 0 3px #FFE0C2" : "none",
    transition: "all .25s"
  } })));
}
function TopNav({ stage, onBrandClick, onLaterClick }) {
  return /* @__PURE__ */ React.createElement("nav", { style: {
    background: "#fff",
    borderBottom: "1px solid #F0E6D8",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 30,
    gap: 14
  } }, /* @__PURE__ */ React.createElement("a", { href: "#", onClick: (e) => {
    e.preventDefault();
    onBrandClick();
  }, style: {
    fontFamily: "'Fraunces', Georgia, serif",
    fontSize: 18,
    color: "#1a1a1a",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontWeight: 800
  } }, "mach's ", /* @__PURE__ */ React.createElement("em", { style: { fontStyle: "normal", color: "#FF6F00" } }, "leicht")), /* @__PURE__ */ React.createElement(ProgressDots, { stage }), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onLaterClick,
      style: {
        background: "none",
        border: "1px solid #F0E6D8",
        color: "#666",
        fontWeight: 700,
        fontSize: 12,
        cursor: "pointer",
        padding: "7px 12px",
        borderRadius: 8,
        fontFamily: "DM Sans, system-ui, sans-serif",
        whiteSpace: "nowrap",
        transition: "all .15s"
      },
      onMouseEnter: (e) => {
        e.target.style.background = "#FFF3E6";
        e.target.style.color = "#FF6F00";
        e.target.style.borderColor = "#FF6F00";
      },
      onMouseLeave: (e) => {
        e.target.style.background = "none";
        e.target.style.color = "#666";
        e.target.style.borderColor = "#F0E6D8";
      }
    },
    "\u{1F4BE} Sp\xE4ter"
  ));
}
function Stage1Motto({ onPick }) {
  const mottos = orderedMottos();
  return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1080, margin: "0 auto", padding: "48px 20px 80px" } }, /* @__PURE__ */ React.createElement("header", { style: { textAlign: "center", marginBottom: 36 } }, /* @__PURE__ */ React.createElement("h1", { style: {
    fontFamily: "'Fraunces', Georgia, serif",
    fontWeight: 800,
    fontSize: "clamp(30px,4.5vw,46px)",
    lineHeight: 1.15,
    margin: 0
  } }, "Welches ", /* @__PURE__ */ React.createElement("em", { style: { fontStyle: "normal", color: "#FF6F00" } }, "Motto"), " soll's werden?"), /* @__PURE__ */ React.createElement("p", { style: { color: "#666", fontSize: 17, maxWidth: 580, margin: "14px auto 0" } }, "Such ein Motto aus \u2014 wir bauen drum herum den kompletten Plan, die Einladung, die Schatzsuche und die Partyseite. Alles in einem Flow."), /* @__PURE__ */ React.createElement("div", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#F0FDF4",
    border: "1px solid #C8E6C9",
    color: "#1a1a1a",
    padding: "10px 16px",
    borderRadius: 999,
    fontSize: 13,
    marginTop: 18,
    fontWeight: 600
  } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#FFC107", fontSize: 11, letterSpacing: 1 } }, "\u2B50\u2B50\u2B50\u2B50\u2B50"), /* @__PURE__ */ React.createElement("strong", null, "\xDCber 4.700 Geburtstage"), " mit machsleicht geplant \xB7 kostenlos \xB7 ohne Anmeldung")), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
    gap: 14
  } }, mottos.map((m) => {
    const wt = TH_H.getWizardTheme ? TH_H.getWizardTheme(m.slug) : null;
    const accent = wt && wt.accent || m.color || "#FF6F00";
    const ready = wt && wt.wizardReady;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: m.slug,
        onClick: () => onPick(m.slug),
        style: {
          background: "#fff",
          border: `2px solid ${ready ? "#F0E6D8" : "#F0E6D8"}`,
          borderRadius: 16,
          padding: "20px 16px",
          cursor: "pointer",
          textAlign: "center",
          position: "relative",
          transition: "all .2s",
          opacity: ready ? 1 : 0.85
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,.08)`;
          e.currentTarget.style.borderColor = accent;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "#F0E6D8";
        }
      },
      !ready && /* @__PURE__ */ React.createElement("span", { style: {
        position: "absolute",
        top: 8,
        right: 8,
        background: "#FFF3CD",
        color: "#856404",
        fontSize: 10,
        fontWeight: 800,
        padding: "3px 7px",
        borderRadius: 8,
        letterSpacing: ".4px"
      } }, "in Arbeit"),
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 48, lineHeight: 1, marginBottom: 8, display: "block" } }, m.emoji),
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, fontWeight: 800 } }, m.label),
      /* @__PURE__ */ React.createElement("span", { style: {
        display: "block",
        marginTop: 6,
        fontSize: 11,
        color: accent,
        fontWeight: 800,
        letterSpacing: ".4px",
        textTransform: "uppercase"
      } }, "3\u201312 Jahre")
    );
  }), /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => onPick("__custom__"),
      style: {
        background: "#FFF8F0",
        border: "2px dashed #C8B9A6",
        borderRadius: 16,
        padding: "20px 16px",
        cursor: "pointer",
        textAlign: "center",
        transition: "all .2s"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.background = "#FFF3E6";
        e.currentTarget.style.borderColor = "#FF6F00";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.background = "#FFF8F0";
        e.currentTarget.style.borderColor = "#C8B9A6";
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 48, lineHeight: 1, marginBottom: 8, display: "block" } }, "\u270F\uFE0F"),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, fontWeight: 800 } }, "Eigenes\u2026"),
    /* @__PURE__ */ React.createElement("span", { style: {
      display: "block",
      marginTop: 6,
      fontSize: 11,
      color: "#666",
      fontWeight: 800,
      letterSpacing: ".4px",
      textTransform: "uppercase"
    } }, "selbst eintragen")
  )));
}
function Stage2Age({ motto, onPick }) {
  const wt = motto ? TH_H.getWizardTheme ? TH_H.getWizardTheme(motto.slug) : null : null;
  const accent = wt && wt.accent || motto && motto.color || "#FF6F00";
  return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 880, margin: "0 auto", padding: "48px 20px 80px" } }, /* @__PURE__ */ React.createElement("header", { style: { textAlign: "center", marginBottom: 36 } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: `${accent}15`,
    border: `1px solid ${accent}`,
    color: accent,
    padding: "8px 16px",
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 14,
    marginBottom: 12
  } }, /* @__PURE__ */ React.createElement("span", null, motto?.emoji), " ", /* @__PURE__ */ React.createElement("span", null, motto?.label)), /* @__PURE__ */ React.createElement("h1", { style: {
    fontFamily: "'Fraunces', Georgia, serif",
    fontWeight: 800,
    fontSize: "clamp(28px,4.2vw,42px)",
    lineHeight: 1.15,
    margin: 0
  } }, "Wie alt wird das Geburtstagskind?"), /* @__PURE__ */ React.createElement("p", { style: { color: "#666", fontSize: 17, marginTop: 12 } }, "Spiele, R\xE4tsel und Texte werden alters-angepasst.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 } }, AGE_OPTIONS.map((a) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: a.key,
      onClick: () => onPick(a),
      style: {
        background: "#fff",
        border: "2px solid #F0E6D8",
        borderRadius: 18,
        padding: "28px 22px",
        cursor: "pointer",
        transition: "all .2s"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,.08)`;
        e.currentTarget.style.borderColor = accent;
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#F0E6D8";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 42, color: accent, lineHeight: 1, fontWeight: 800 } }, a.range, /* @__PURE__ */ React.createElement("small", { style: { fontSize: 18, color: "#1a1a1a", fontWeight: 800 } }, " Jahre")),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, marginTop: 6, fontWeight: 800 } }, a.title),
    /* @__PURE__ */ React.createElement("div", { style: { color: "#555", fontSize: 14, marginTop: 8 } }, a.desc),
    /* @__PURE__ */ React.createElement("ul", { style: { margin: "14px 0 0", paddingLeft: 18, fontSize: 13, color: "#666" } }, a.features.map((f) => /* @__PURE__ */ React.createElement("li", { key: f }, f)))
  ))));
}
function Stage3Bridge({ motto, age, onProceed }) {
  const wt = motto ? TH_H.getWizardTheme ? TH_H.getWizardTheme(motto.slug) : null : null;
  const accent = wt && wt.accent || motto && motto.color || "#FF6F00";
  useEffect(() => {
    const timer = setTimeout(onProceed, 2e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 680, margin: "0 auto", padding: "80px 20px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 64, marginBottom: 18, animation: "pulse 1.5s infinite" } }, motto?.emoji), /* @__PURE__ */ React.createElement("h1", { style: {
    fontFamily: "'Fraunces', Georgia, serif",
    fontSize: "clamp(26px,4vw,36px)",
    fontWeight: 800,
    margin: "0 0 12px"
  } }, "Plan f\xFCr ", /* @__PURE__ */ React.createElement("span", { style: { color: accent } }, motto?.label), " \xB7 ", age?.range, " Jahre wird vorbereitet\u2026"), /* @__PURE__ */ React.createElement("p", { style: { color: "#666", fontSize: 16, margin: "12px 0 28px" } }, "Wir holen jetzt die altersgerechten Spiele, Schatzsuche und Einkaufsliste aus dem Planer. Einen Moment."), /* @__PURE__ */ React.createElement("div", { style: {
    display: "inline-block",
    background: accent,
    color: "#fff",
    padding: "14px 28px",
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 14,
    boxShadow: `0 4px 12px ${accent}40`,
    cursor: "pointer"
  }, onClick: onProceed }, "Plan jetzt sofort \xF6ffnen \u2192"), /* @__PURE__ */ React.createElement("p", { style: { color: "#999", fontSize: 12, marginTop: 18 } }, "Bringt dich auf den machsleicht-Planer mit Motto + Alter schon ausgew\xE4hlt."));
}
function WizardApp() {
  const [stage, setStage] = useState(1);
  const [motto, setMotto] = useState(null);
  const [age, setAge] = useState(null);
  useEffect(() => {
    if (BP && BP.isAvailable()) {
      const existing = BP.get();
      if (existing && existing.theme && existing.theme.slug && TH[existing.theme.slug]) {
      }
    }
  }, []);
  function pickMotto(slug) {
    if (slug === "__custom__") {
      const customName = prompt("Wie soll dein Motto hei\xDFen?", "Pferde-Hof");
      if (!customName) return;
      const customEmoji = prompt("Welches Emoji passt?", "\u{1F389}") || "\u{1F389}";
      const m = { slug: "__custom_" + Date.now(), label: customName.trim(), emoji: customEmoji, color: "#666", modules: [] };
      setMotto(m);
    } else {
      const m = TH[slug];
      if (!m) return;
      setMotto(m);
    }
    setStage(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function pickAge(a) {
    setAge(a);
    if (BP && BP.isAvailable() && motto) {
      try {
        BP.create({
          source: "wizard",
          theme: {
            slug: motto.slug,
            label: motto.label,
            emoji: motto.emoji,
            color: motto.color || "#FF6F00"
          },
          child: { firstName: "", age: a.plannerAge }
        });
      } catch (e) {
      }
    }
    setStage(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function proceedToPlanner() {
    const params = new URLSearchParams();
    if (motto && motto.slug && !motto.slug.startsWith("__custom_")) {
      params.set("motto", motto.slug);
    }
    if (age) params.set("age", String(age.plannerAge));
    const url = "/kindergeburtstag?" + params.toString();
    window.location.href = url;
  }
  function brandClick() {
    if (stage > 1) {
      if (confirm("M\xF6chtest du wirklich von vorne starten? Dein bisheriger Stand bleibt gespeichert.")) {
        setStage(1);
        setMotto(null);
        setAge(null);
      }
    }
  }
  function saveLaterClick() {
    alert("\u{1F4BE} Save-Later kommt in P7-2 (Magic-Link via Resend-Worker). Aktuell speichert localStorage automatisch.");
  }
  return /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    background: "#FFF8F0",
    color: "#1a1a1a",
    minHeight: "100vh"
  } }, /* @__PURE__ */ React.createElement(TopNav, { stage, onBrandClick: brandClick, onLaterClick: saveLaterClick }), stage === 1 && /* @__PURE__ */ React.createElement(Stage1Motto, { onPick: pickMotto }), stage === 2 && /* @__PURE__ */ React.createElement(Stage2Age, { motto, onPick: pickAge }), stage === 3 && /* @__PURE__ */ React.createElement(Stage3Bridge, { motto, age, onProceed: proceedToPlanner }), /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    bottom: 20,
    left: 20,
    background: "#1E3A5F",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    zIndex: 90,
    boxShadow: "0 4px 12px rgba(0,0,0,.2)"
  } }, "\u{1F9EA} Wizard-MVP \xB7 Stage ", stage, "/6", /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 400, opacity: 0.8, marginTop: 2, fontSize: 10 } }, "P7-1 Stage 1+2 + Planer-Bridge")));
}
ReactDOM.createRoot(document.getElementById("wizard-root")).render(React.createElement(WizardApp));
