// kindergeburtstag.js — JSX/Babel Version
// Daten kommen aus kindergeburtstag-data.js (GENERIC, LICENSE, ALL_MOTTOS, BBL, STATION_SETS, etc.)

const {
  useState,
  useEffect,
  useRef
} = React;

// === UTILITIES ===
const LS_STORE = "machsleicht";
const LS_VARIANTS = {
  sicher_fertig: "",
  morgen_komplett: ""
};
function lsCheckout(variant, ctx = {}) {
  const d = LS_VARIANTS[variant];
  if (!d) {
    alert("Zahlungsintegration wird gerade eingerichtet. Aktuell ist alles kostenlos — viel Spaß!");
    return;
  }
  const v = new URLSearchParams();
  if (ctx.motto) v.set("checkout[custom][motto]", ctx.motto);
  if (ctx.mode) v.set("checkout[custom][mode]", ctx.mode);
  v.set("checkout[custom][source]", "kindergeburtstag");
  const url = `https://${LS_STORE}.lemonsqueezy.com/checkout/buy/${d}?${v.toString()}`;
  window.LemonSqueezy ? window.LemonSqueezy.Url.Open(url) : window.open(url, "_blank");
}
function loadState(key, fallback) {
  try {
    const v = localStorage.getItem("ml_" + key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function saveState(key, val) {
  try {
    localStorage.setItem("ml_" + key, JSON.stringify(val));
  } catch {}
}

// === SMALL COMPONENTS ===
function Pill({
  active,
  onClick,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 16px",
      borderRadius: 99,
      border: `2px solid ${active ? "var(--a)" : "var(--l)"}`,
      background: active ? "var(--al)" : "var(--bg)",
      color: active ? "var(--ad)" : "var(--m)",
      fontSize: 13,
      fontWeight: active ? 700 : 500,
      cursor: "pointer",
      transition: "all .2s",
      fontFamily: "var(--f)"
    }
  }, children);
}
function ItemRow({
  item,
  isOwned,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: isOwned ? "var(--l)" : "var(--bg)",
      borderRadius: "var(--rs)",
      padding: "10px 14px",
      border: "1px solid var(--l)",
      gap: 8,
      flexWrap: "wrap",
      opacity: isOwned ? 0.5 : 1,
      transition: "all .2s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flex: 1,
      minWidth: 0
    }
  }, onToggle && /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: isOwned || false,
    onChange: onToggle,
    style: {
      width: 16,
      height: 16,
      cursor: "pointer",
      accentColor: "var(--g)"
    },
    title: "Hab ich schon"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      flexShrink: 0
    }
  }, item.emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      textDecoration: isOwned ? "line-through" : "none"
    }
  }, item.name), item.eco && /*#__PURE__*/React.createElement("span", {
    title: "Nachhaltig",
    style: {
      fontSize: 12
    }
  }, "\uD83C\uDF3F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      padding: "2px 8px",
      borderRadius: 6,
      background: BBL[item.bbl].c + "15",
      color: BBL[item.bbl].c,
      textTransform: "uppercase",
      flexShrink: 0
    }
  }, BBL[item.bbl].l)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexShrink: 0
    }
  }, item.price > 0 && !isOwned && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: "var(--a)",
      fontSize: 13
    }
  }, "\u20AC", item.price.toFixed(2)), item.price > 0 && isOwned && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--g)",
      fontSize: 12
    }
  }, "\u2713 Hab ich"), item.price === 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--g)",
      fontWeight: 600
    }
  }, "Kostenlos"), item.url && !isOwned && /*#__PURE__*/React.createElement("a", {
    href: item.url,
    target: "_blank",
    rel: "noopener",
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#FF9900",
      textDecoration: "none",
      padding: "4px 10px",
      borderRadius: 6,
      background: "#FFF3E0",
      whiteSpace: "nowrap"
    }
  }, "Amazon \u2197")));
}
function Confetti({
  active
}) {
  if (!active) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      overflow: "hidden"
    }
  }, Array.from({
    length: 20
  }, (_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: "absolute",
      left: `${35 + Math.random() * 30}%`,
      top: "50%",
      width: 7,
      height: 7,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      background: `hsl(${Math.random() * 360},80%,60%)`,
      animation: `confettiBurst 0.8s ${Math.random() * 0.3}s ease-out forwards`,
      "--tx": `${(Math.random() - 0.5) * 120}px`,
      "--ty": `${-50 - Math.random() * 80}px`,
      opacity: 0
    }
  })));
}

// === CONTROL HUB (Fixed Bottom Bar) ===
function ControlHub({
  mottoId
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "no-print",
    style: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 660,
      background: "rgba(253,252,249,0.97)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      padding: "8px 12px",
      borderTop: "1px solid var(--l)",
      display: "flex",
      gap: 6,
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `/einladung/erstellen/?motto=${mottoId || ""}`,
    style: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      background: "var(--a)",
      color: "#fff",
      fontWeight: 700,
      fontSize: 12,
      textAlign: "center",
      textDecoration: "none",
      fontFamily: "var(--f)"
    }
  }, "\uD83D\uDC8C Einladung"), /*#__PURE__*/React.createElement("a", {
    href: "/schatzsuche",
    style: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      background: "var(--bg)",
      color: "var(--d)",
      border: "1px solid var(--l)",
      fontWeight: 700,
      fontSize: 12,
      textAlign: "center",
      textDecoration: "none",
      fontFamily: "var(--f)"
    }
  }, "\uD83D\uDDFA\uFE0F Schatzsuche"), /*#__PURE__*/React.createElement("button", {
    onClick: () => document.querySelector('[data-action="pdf"]')?.scrollIntoView({
      behavior: "smooth"
    }),
    style: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      background: "var(--bg)",
      color: "var(--d)",
      border: "1px solid var(--l)",
      fontWeight: 700,
      fontSize: 12,
      textAlign: "center",
      cursor: "pointer",
      fontFamily: "var(--f)"
    }
  }, "\uD83D\uDCC4 PDF"));
}

// === EINLADUNGS-BLOCK ===
function EinladungBlock({
  motto,
  guests,
  previewName,
  setPreviewName,
  inviteSent,
  setInviteSent
}) {
  const displayName = previewName || "Emma";
  const greeting = (MOTTO_GREETINGS[motto?.id] || "Hey") + " " + displayName + "!";
  const done = inviteSent >= guests;
  return /*#__PURE__*/React.createElement("section", {
    className: "fu",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--d)",
      borderRadius: 16,
      padding: "20px 18px",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      margin: "0 0 4px",
      lineHeight: 1.3
    }
  }, guests, " Kinder einladen \u2014 in 30 Sekunden"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      opacity: 0.6,
      margin: "0 0 16px"
    }
  }, "Jedes Kind bekommt ein interaktives ", motto.name, "-Minispiel als Vorgeschmack."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      opacity: 0.4,
      margin: "0 0 6px"
    }
  }, "Probier's aus \u2014 tippe einen Namen:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: previewName,
    onChange: e => setPreviewName(e.target.value),
    placeholder: "z.B. Emma, Max, Sophie\u2026",
    style: {
      width: "100%",
      padding: "10px 14px",
      borderRadius: 10,
      border: "none",
      background: "rgba(255,255,255,0.12)",
      color: "#fff",
      fontSize: 14,
      fontFamily: "var(--f)",
      outline: "none",
      marginBottom: 12,
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#DCF8C6",
      borderRadius: "12px 12px 12px 0",
      padding: "12px 14px",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "#111",
      margin: 0,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("strong", null, greeting, " "), "Du bist eingeladen zum ", motto.name, "-Geburtstag!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "var(--a)",
      margin: "6px 0 0",
      fontWeight: 600
    }
  }, "\uD83D\uDC46 Tippe hier f\xFCr dein ", motto.name, "-Abenteuer...")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 10,
      opacity: 0.4,
      margin: "0 0 12px"
    }
  }, "So sieht es auf ", displayName, "s Handy aus"), /*#__PURE__*/React.createElement("a", {
    href: `/einladung/erstellen/?motto=${motto?.id || ""}`,
    onClick: () => {
      setInviteSent(guests);
      typeof mlTrack === "function" && mlTrack("cta_einladung_plan", {
        motto: motto?.id
      });
    },
    style: {
      display: "block",
      width: "100%",
      background: done ? "var(--g)" : "var(--a)",
      color: "#fff",
      padding: 14,
      borderRadius: 99,
      fontWeight: 700,
      fontSize: 14,
      textAlign: "center",
      textDecoration: "none",
      boxSizing: "border-box",
      transition: "background .3s"
    }
  }, done ? "✓ Einladung erstellt — bearbeiten →" : `💌 ${motto.name}-Einladung erstellen →`), done && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      opacity: 0.5,
      margin: "6px 0 0",
      textAlign: "center"
    }
  }, "\u2713 Score +11% \u2014 Bereitschafts-Check aktualisiert"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 16,
      marginTop: 10,
      fontSize: 11,
      opacity: 0.3
    }
  }, /*#__PURE__*/React.createElement("span", null, "Kostenlos"), /*#__PURE__*/React.createElement("span", null, "Kein Account"), /*#__PURE__*/React.createElement("span", null, "DSGVO-konform"))));
}

// === SCHATZSUCHE TEASER mit Stationen-Explorer ===
function SchatzsucheTeaser({
  motto,
  guests,
  age,
  location,
  activeStation,
  setActiveStation
}) {
  const stations = (STATION_SETS[motto?.id] || DEFAULT_STATIONS).map((st, i) => ({
    ...st,
    unlocked: i < 2
  }));
  const s = stations[activeStation];
  const locLabel = location === "wohnung" ? "Drinnen" : location === "garten" ? "Garten" : "Park";
  return /*#__PURE__*/React.createElement("section", {
    className: "fu",
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid var(--l)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, #e8d5b7, #d4bc94)",
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: "var(--d)",
      margin: "0 0 2px"
    }
  }, "30 Minuten Abenteuer."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--d)",
      opacity: 0.6,
      margin: "0 0 2px"
    }
  }, "Du trinkst Kaffee. \u2615"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--d)",
      opacity: 0.5,
      margin: 0
    }
  }, motto.name, "-Schatzsuche \xB7 ", guests, " Kinder \xB7 ", age, " J. \xB7 ", locLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 16px",
      background: "var(--bg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 0,
      marginBottom: 12,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 20,
      left: 20,
      right: 20,
      height: 2,
      background: "var(--l)",
      zIndex: 0
    }
  }), stations.map((st, i) => {
    const isA = activeStation === i;
    return /*#__PURE__*/React.createElement("button", {
      key: st.n,
      onClick: () => setActiveStation(i),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        position: "relative",
        zIndex: 1,
        padding: "0 2px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: isA ? "var(--a)" : st.unlocked ? "#fff" : "var(--bg)",
        color: isA ? "#fff" : "var(--d)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        border: `2px solid ${isA ? "var(--a)" : st.unlocked ? "var(--d)" : "var(--l)"}`,
        boxShadow: isA ? "0 2px 8px rgba(232,135,61,0.4)" : "none",
        transition: "all .2s"
      }
    }, st.emoji), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: isA ? "var(--a)" : "var(--m)"
      }
    }, st.n));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 10,
      padding: 14,
      marginBottom: 12,
      borderLeft: "3px solid var(--a)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, s.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: "var(--d)",
      margin: 0
    }
  }, "Station ", s.n, ": ", s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "var(--a)",
      fontWeight: 600,
      margin: 0
    }
  }, "F\xFCr ", age, "-J\xE4hrige angepasst"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--m)",
      margin: 0,
      lineHeight: 1.5,
      fontStyle: "italic"
    }
  }, s.hint), !s.unlocked && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "var(--a)",
      margin: "6px 0 0",
      fontWeight: 600
    }
  }, "\uD83D\uDD12 Erstelle die Schatzsuche um alle Stationen zu sehen")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--al)",
      borderRadius: 8,
      padding: "10px 12px",
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "\uD83D\uDCCB"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--d)",
      margin: 0,
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Passt in deinen Zeitplan: "), "Ersetzt einen Spieleslot \u2014 gleiche Dauer, fertige R\xE4tsel.")), /*#__PURE__*/React.createElement("a", {
    href: "/schatzsuche",
    onClick: () => typeof mlTrack === "function" && mlTrack("cta_schatzsuche_plan", {
      motto: motto?.id
    }),
    style: {
      display: "block",
      width: "100%",
      background: "var(--a)",
      color: "#fff",
      padding: 14,
      borderRadius: 99,
      fontWeight: 700,
      fontSize: 14,
      textAlign: "center",
      textDecoration: "none",
      boxSizing: "border-box"
    }
  }, motto.name, "-Schatzsuche f\xFCr ", guests, " Kinder \u2192"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "var(--m)",
      margin: "8px 0 0",
      textAlign: "center"
    }
  }, "Kostenlos \xB7 5 Stationen \xB7 Druckfertig in 5 Min."))));
}

// === CONNECTOR ===
function Connector() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "0 0 4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 20,
      background: "var(--l)",
      margin: "0 auto"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0",
      fontWeight: 600,
      color: "var(--a)",
      fontSize: 12
    }
  }, "Die Einladung teast die Schatzsuche an"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 20,
      background: "var(--l)",
      margin: "0 auto"
    }
  }));
}

// === ZEITPLAN (Accordion) ===
function Zeitplan({
  timeline,
  mottoColor,
  quietMode,
  setQuietMode,
  ageGroupLabel
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "fu",
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
      flexWrap: "wrap",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: 20,
      fontWeight: 800,
      margin: 0
    }
  }, "\uD83C\uDFAF Zeitplan ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--m)"
    }
  }, "(", ageGroupLabel, ")")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setQuietMode(!quietMode),
    style: {
      padding: "6px 14px",
      borderRadius: 99,
      border: `2px solid ${quietMode ? "var(--g)" : "var(--l)"}`,
      background: quietMode ? "#E8F5E9" : "var(--bg)",
      color: quietMode ? "var(--g)" : "var(--m)",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      transition: "all .2s"
    }
  }, quietMode ? "🧘 Ruhige Spiele aktiv" : "🌪️ Zu wild? Ruhige Spiele")), quietMode && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--g)",
      marginBottom: 12,
      padding: "8px 12px",
      background: "#E8F5E9",
      borderRadius: 10
    }
  }, "\uD83E\uDDD8 Ruhemodus: Alle Action-Spiele wurden durch ruhige Alternativen ersetzt. Kinder kommen runter, du beh\xE4ltst die Kontrolle."), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 20,
      position: "relative"
    }
  }, timeline.map((e, n) => /*#__PURE__*/React.createElement("details", {
    key: n,
    open: n === 0,
    style: {
      position: "relative",
      paddingLeft: 24,
      paddingBottom: 4,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer",
      padding: "8px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -3,
      top: 10,
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: e.photo ? "#F57C00" : mottoColor,
      color: "#FFF",
      fontSize: 8,
      fontWeight: 800,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, e.photo ? "📸" : n + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: e.photo ? "#F57C00" : mottoColor
    }
  }, e.time), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      marginLeft: 8,
      color: "var(--d)"
    }
  }, e.name)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--m)",
      whiteSpace: "nowrap",
      flexShrink: 0
    }
  }, e.dauer, " Min.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 0 8px",
      borderLeft: `2px solid ${mottoColor}20`,
      marginLeft: 5,
      paddingLeft: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--m)",
      marginBottom: 6,
      lineHeight: 1.6
    }
  }, e.desc), e.photo && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#F57C00",
      fontWeight: 600,
      marginBottom: 6
    }
  }, "\uD83D\uDCF8 Foto-Moment!"), e.material && /*#__PURE__*/React.createElement("details", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--a)",
      cursor: "pointer"
    }
  }, "\uD83D\uDCE6 Material-Liste"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--m)",
      marginTop: 4,
      padding: "8px 12px",
      background: "var(--bg)",
      borderRadius: 8,
      lineHeight: 1.6
    }
  }, e.material)), e.anleitung && /*#__PURE__*/React.createElement("details", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--a)",
      cursor: "pointer"
    }
  }, "\uD83D\uDCCB So geht's \u2014 Schritt f\xFCr Schritt"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--m)",
      marginTop: 4,
      padding: "8px 12px",
      background: "var(--bg)",
      borderRadius: 8,
      lineHeight: 1.8
    }
  }, e.anleitung)), e.isKuchen && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, e.rezept && /*#__PURE__*/React.createElement("details", {
    style: {
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--a)",
      cursor: "pointer"
    }
  }, "\uD83D\uDC69\u200D\uD83C\uDF73 Rezept anzeigen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--m)",
      marginTop: 4,
      padding: "8px 12px",
      background: "var(--bg)",
      borderRadius: 8,
      lineHeight: 1.6,
      border: "1px solid var(--l)"
    }
  }, e.rezept)), e.kuchenUrl && /*#__PURE__*/React.createElement("a", {
    href: e.kuchenUrl,
    target: "_blank",
    rel: "noopener",
    style: {
      display: "inline-block",
      fontSize: 12,
      fontWeight: 700,
      color: "#FF9900",
      textDecoration: "none",
      padding: "6px 14px",
      borderRadius: 8,
      background: "#FFF3E0",
      marginBottom: 6
    }
  }, "\uD83D\uDED2 Backdeko bei Amazon \u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 12px",
      background: "var(--bg)",
      borderRadius: 10,
      border: "1px solid var(--l)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--a)",
      marginBottom: 4
    }
  }, "\u23F1\uFE0F Keine Zeit zum Backen?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--m)",
      lineHeight: 1.5
    }
  }, "1) Fertigkuchen + Zuckerguss + Streusel \xB7 2) Backmischung-Muffins (30 Min.) \xB7 3) Donut-Turm statt Torte \u2014 Wow-Effekt, null Aufwand"))))))));
}

// === SCORE CHECK ===
function ScoreCheck({
  score
}) {
  if (!score) return null;
  const n = score.avg >= 80 ? "var(--g)" : score.avg >= 60 ? "var(--am)" : "#C62828";
  const h = score.avg >= 85 ? "Fast fertig — du bist bereit!" : score.avg >= 70 ? "Sieht gut aus — ein paar Kleinigkeiten fehlen noch." : score.avg >= 55 ? "Gute Basis — ein paar Dinge solltest du noch klären." : "Noch etwas Vorbereitung nötig.";
  return /*#__PURE__*/React.createElement("section", {
    className: "fu",
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      borderRadius: 20,
      padding: "24px 20px",
      border: "1px solid var(--l)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 80,
      height: 80,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 36 36",
    style: {
      width: 80,
      height: 80,
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "18",
    r: "15.9",
    fill: "none",
    stroke: "#f0ede8",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "18",
    r: "15.9",
    fill: "none",
    stroke: n,
    strokeWidth: "3",
    strokeDasharray: `${score.avg} ${100 - score.avg}`,
    strokeLinecap: "round",
    style: {
      transition: "stroke-dasharray 0.8s ease"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: 22,
      fontWeight: 900,
      color: n
    }
  }, score.avg), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: "var(--m)",
      fontWeight: 600
    }
  }, "von 100"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: 18,
      fontWeight: 800,
      margin: "0 0 4px"
    }
  }, "Bereitschafts-Check"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--m)",
      lineHeight: 1.5,
      margin: 0
    }
  }, h), score.missing.length > 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--am)",
      marginTop: 4,
      fontWeight: 600
    }
  }, "Noch offen: ", score.missing.join(", ")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 6
    }
  }, score.dims.map((dim, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--w)",
      borderRadius: 10,
      padding: "8px 10px",
      textAlign: "center",
      border: "1px solid var(--l)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      marginBottom: 2
    }
  }, dim.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "var(--m)",
      marginBottom: 2
    }
  }, dim.label), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      borderRadius: 2,
      background: "#f0ede8",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 2,
      width: dim.val + "%",
      transition: "width 0.6s ease",
      background: dim.val >= 80 ? "var(--g)" : dim.val >= 60 ? "var(--am)" : "#C62828"
    }
  })))))));
}

// === MAIN APP ===
function App() {
  // State
  const [view, setView] = useState("config");
  const [age, setAge] = useState(() => loadState("age", 6));
  const [mottoId, setMottoId] = useState(() => loadState("mottoId", null));
  const [guests, setGuests] = useState(() => loadState("guests", 8));
  const [loc, setLoc] = useState(() => loadState("loc", "garten"));
  const [effort, setEffort] = useState(() => loadState("effort", "normal"));
  const [duration, setDuration] = useState(() => loadState("dauer", 3));
  const [mottoTab, setMottoTab] = useState("generic");
  const [quietMode, setQuietMode] = useState(false);
  const [owned, setOwned] = useState(() => loadState("owned", {}));
  const [shoppingMode, setShoppingMode] = useState(() => loadState("shoppingMode", "standard"));
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [locOverride, setLocOverride] = useState(null);
  const [emailSaved, setEmailSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeStation, setActiveStation] = useState(0);
  const [inviteSent, setInviteSent] = useState(0);
  const [previewName, setPreviewName] = useState("");

  // Derived values
  const motto = ALL_MOTTOS.find(m => m.id === mottoId);
  const ag = ageGroup(age);
  const isMinimal = shoppingMode === "minimal" || effort === "minimal";
  const isWow = shoppingMode === "wow";
  const effectiveLoc = locOverride || loc;
  const filteredLicense = LICENSE.filter(m => !m.ages || m.ages.includes(age));

  // Persist state
  useEffect(() => saveState("age", age), [age]);
  useEffect(() => saveState("mottoId", mottoId), [mottoId]);
  useEffect(() => saveState("guests", guests), [guests]);
  useEffect(() => saveState("loc", loc), [loc]);
  useEffect(() => saveState("effort", effort), [effort]);
  useEffect(() => saveState("dauer", duration), [duration]);
  useEffect(() => saveState("owned", owned), [owned]);
  useEffect(() => saveState("shoppingMode", shoppingMode), [shoppingMode]);

  // Hide sticky CTA in plan view
  useEffect(() => {
    const el = document.getElementById("sticky-cta");
    if (el) el.style.display = view === "plan" ? "none" : "";
  }, [view]);

  // URL params
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const m = p.get("motto") || window.__selectedMotto;
    if (m && ALL_MOTTOS.find(x => x.id === m)) setMottoId(m);
    const a = p.get("alter");
    if (a) {
      const v = parseInt(a);
      if (v >= 3 && v <= 12) setAge(v);
    }
    const g = p.get("gaeste");
    if (g) {
      const v = parseInt(g);
      if (v >= 1 && v <= 20) setGuests(v);
    }
  }, []);

  // Confetti on motto select
  useEffect(() => {
    if (mottoId) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 1200);
      return () => clearTimeout(t);
    }
  }, [mottoId]);

  // Track plan creation
  useEffect(() => {
    if (view === "plan" && window.plausible) plausible("plan-created", {
      props: {
        motto: mottoId,
        alter: age,
        gaeste: guests
      }
    });
  }, [mottoId, view]);

  // === COMPUTED: Quiet mode games ===
  const quietGames = {
    klein: [{
      name: "Ausmalen & Stickern",
      desc: "Große Ausmalbilder zum Thema + Sticker-Bögen.",
      dauer: 15
    }, {
      name: "Suchbild-Runde",
      desc: "Wimmelbild zum Thema — wer findet alle versteckten Dinge?",
      dauer: 10
    }, {
      name: "Geschichte vorlesen",
      desc: "Eine kurze Geschichte zum Motto vorlesen. Kinder sitzen im Kreis.",
      dauer: 10
    }],
    mittel: [{
      name: "Rätsel-Runde",
      desc: "Knobel-Aufgaben, Suchbilder und Quiz-Fragen zum Thema.",
      dauer: 15
    }, {
      name: "Bastel-Station",
      desc: "Etwas zum Motto basteln: Masken, Karten, Figuren.",
      dauer: 20
    }, {
      name: "Memory oder Bingo",
      desc: "Motto-Memory oder Bingo-Runde.",
      dauer: 15
    }],
    gross: [{
      name: "Quiz-Duell",
      desc: "Wissensfragen zum Thema in Teams.",
      dauer: 15
    }, {
      name: "Kreativ-Challenge",
      desc: "Zeichne/baue etwas zum Motto in 10 Minuten.",
      dauer: 20
    }, {
      name: "Rätsel-Escape (leise)",
      desc: "Logik-Rätsel, Codes knacken, Geheimschrift — am Tisch.",
      dauer: 25
    }]
  };

  // === COMPUTED: Games for current motto ===
  function getGames() {
    if (!motto) return [];
    if (quietMode) return quietGames[ag] || quietGames.mittel;
    return motto.spiele?.[ag] || motto.spiele?.mittel || [];
  }

  // === COMPUTED: Cake ===
  function getCake() {
    if (!motto) return {
      name: "",
      desc: "",
      rezept: "",
      url: ""
    };
    const c = motto.kuchen?.[ag] || motto.kuchen?.mittel || "";
    return typeof c === "string" ? {
      name: c,
      desc: c,
      rezept: "",
      url: ""
    } : c;
  }

  // === COMPUTED: Timeline ===
  function buildTimeline() {
    const games = getGames();
    const numGames = duration <= 2 ? 2 : 3;
    const selectedGames = games.slice(0, numGames);
    const items = [];
    let elapsed = 0;
    const start = 840; // 14:00
    const fmt = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
    items.push({
      time: fmt(start),
      name: "Ankommen & Freispiel",
      dauer: ag === "klein" ? 20 : 15,
      desc: ag === "klein" ? "Kinder kommen an, gewöhnen sich ein" : "Kinder kommen an, spielen frei"
    });
    elapsed += ag === "klein" ? 20 : 15;
    selectedGames.forEach((g, i) => {
      items.push({
        time: fmt(start + elapsed),
        name: g.name,
        dauer: g.dauer,
        desc: g.desc,
        material: g.material || null,
        anleitung: g.anleitung || null
      });
      elapsed += g.dauer;
      if (i === 0) {
        const cake = getCake();
        items.push({
          time: fmt(start + elapsed),
          name: `🎂 ${cake.name || "Kuchen"} & Geschenke`,
          dauer: ag === "klein" ? 25 : 30,
          desc: cake.desc || "",
          rezept: cake.rezept || "",
          kuchenUrl: cake.url || "",
          photo: true,
          isKuchen: true
        });
        elapsed += ag === "klein" ? 25 : 30;
      }
    });
    items.push({
      time: fmt(start + elapsed),
      name: "📸 Gruppenfoto!",
      dauer: 5,
      desc: "Jetzt! Bevor die ersten abgeholt werden.",
      photo: true
    });
    elapsed += 5;
    items.push({
      time: fmt(start + elapsed),
      name: "Mitgebsel & Tschüss!",
      dauer: 15,
      desc: "Mitgebsel-Tüten verteilen. Eltern holen ab."
    });
    return items;
  }

  // === COMPUTED: Deko + Mitgebsel ===
  function getDeko() {
    if (!motto) return {
      deko: [],
      mitgebsel: [],
      total: 0
    };
    const deko = isMinimal ? motto.dekoMin || [] : motto.deko;
    const mitgebsel = motto.mitgebsel || [];
    const wowExtras = isWow ? [{
      name: "Foto-Hintergrund " + motto.name,
      price: 14.99,
      eco: false,
      bbl: "buy",
      emoji: "📸",
      url: "https://www.amazon.de/s?k=" + encodeURIComponent(motto.name + " foto hintergrund party kinder") + "&tag=machsleicht21-21"
    }, {
      name: "LED-Lichterkette Deko",
      price: 9.99,
      eco: false,
      bbl: "buy",
      emoji: "✨",
      url: "https://www.amazon.de/s?k=led+lichterkette+party+deko+kinder&tag=machsleicht21-21"
    }] : [];
    const allDeko = [...deko, ...wowExtras];
    const total = [...allDeko, ...mitgebsel].reduce((sum, item, i) => sum + (owned[i] ? 0 : item.price), 0);
    return {
      deko: allDeko,
      mitgebsel,
      total
    };
  }

  // === COMPUTED: Snacks ===
  function getSnacks() {
    return [{
      name: "Muffins/Kuchen",
      menge: `${Math.ceil(guests * 1.5)} Stück`,
      emoji: "🧁"
    }, {
      name: "Obst (geschnitten)",
      menge: `${Math.ceil(guests * 0.15)} kg`,
      emoji: "🍎"
    }, {
      name: "Saft/Wasser",
      menge: `${Math.ceil(guests * 0.3 * duration)} Liter`,
      emoji: "🧃"
    }, {
      name: "Salzige Snacks",
      menge: `${Math.ceil(guests / 4)} Tüten`,
      emoji: "🥨"
    }, ...(duration >= 3 ? [{
      name: "Belegte Brote/Würstchen",
      menge: `${Math.ceil(guests * 1.2)} Stück`,
      emoji: "🌭"
    }] : [])];
  }

  // === COMPUTED: Readiness Score ===
  function calcScore() {
    if (!motto) return null;
    const {
      deko,
      mitgebsel,
      total
    } = getDeko();
    const allItems = [...deko, ...mitgebsel];
    const ownedCount = Object.values(owned).filter(Boolean).length;
    const ablauf = 100;
    const machbarkeit = duration <= 2 ? 95 : duration <= 3 ? 85 : 75;
    const material = allItems.length > 0 ? Math.min(100, Math.round(ownedCount / allItems.length * 100) + 30) : 80;
    const wetterfest = effectiveLoc === "wohnung" ? 100 : effectiveLoc === "garten" ? 65 : 40;
    const budget = total < guests * 5 ? 100 : total < guests * 10 ? 75 : 50;
    const mottoErlebnis = isWow ? 95 : isMinimal ? 55 : 80;
    const inviteBonus = inviteSent >= guests ? 11 : inviteSent > 0 ? Math.round(inviteSent / guests * 11) : 0;
    const avg = Math.min(100, Math.round((ablauf + machbarkeit + material + wetterfest + budget + mottoErlebnis) / 6) + inviteBonus);
    const missing = [];
    if (wetterfest < 70) missing.push("Regen-Alternative");
    if (material < 60) missing.push("Material einkaufen");
    if (budget < 60) missing.push("Budget prüfen");
    if (inviteSent === 0) missing.push("Einladungen verschicken");
    return {
      avg,
      missing,
      dims: [{
        label: "Ablauf",
        val: ablauf,
        icon: "📋"
      }, {
        label: "Machbarkeit",
        val: machbarkeit,
        icon: "✅"
      }, {
        label: "Material",
        val: material,
        icon: "📦"
      }, {
        label: "Wetterfest",
        val: wetterfest,
        icon: "🌧️"
      }, {
        label: "Budget",
        val: budget,
        icon: "💰"
      }, {
        label: "Motto-Erlebnis",
        val: mottoErlebnis,
        icon: "🎯"
      }, {
        label: "Einladung",
        val: inviteSent >= guests ? 100 : Math.round(inviteSent / guests * 100),
        icon: "💌"
      }]
    };
  }

  // === ACTIONS ===
  function reset() {
    setView("config");
    setMottoId(null);
    setQuietMode(false);
    setOwned({});
    setShoppingMode("standard");
    setLocOverride(null);
    setEmergencyMode(false);
  }
  function startPlan() {
    if (mottoId) {
      setView("peak");
      window.scrollTo(0, 0);
      setTimeout(() => {
        setView("plan");
        window.scrollTo(0, 0);
      }, 2800);
    }
  }
  function emergencyStart() {
    if (!mottoId) setMottoId("safari");
    setEffort("minimal");
    setDuration(2);
    setView("plan");
    window.scrollTo(0, 0);
  }
  function emergencyFull() {
    setEmergencyMode(true);
    setShoppingMode("minimal");
    setDuration(2);
    if (!mottoId) {
      const g = GENERIC;
      setMottoId(g[Math.floor(Math.random() * g.length)]?.id || "safari");
    }
    setView("plan");
    setLocOverride("wohnung");
    window.scrollTo(0, 0);
  }
  function toggleOwned(idx) {
    setOwned(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  }

  // === MOTTO DESCRIPTIONS ===
  const mottoDescs = {
    safari: "Dein Kind und seine Crew gehen auf Safari-Expedition: Tiere suchen, durch den Dschungel krabbeln und am Ende den Schatz finden!",
    piraten: "Ahoi! Die Crew sticht in See, knackt Codes und findet den vergrabenen Piratenschatz. Das wird legendär!",
    weltraum: "3, 2, 1 ... Start! Die Astronauten fliegen durchs All, entdecken Planeten und landen sicher auf dem Mond.",
    dino: "Achtung, Dinos! Ausgraben, forschen und am Ende jubeln — dein Kind wird zum echten Paläontologen.",
    einhorn: "Glitzer, Regenbogen und pure Magie — dein Kind und seine Freunde tauchen ein in eine zauberhafte Welt.",
    feuerwehr: "Tatütata! Die kleine Feuerwehr-Crew meistert jeden Einsatz. Teamwork, Action und strahlende Kinderaugen.",
    "paw-patrol": "Ryder ruft an! Die Welpen brauchen Hilfe — und dein Kind und seine Freunde retten den Tag!",
    pokemon: "Die Pokémon-Trainer-Prüfung beginnt! Fangen, kämpfen, Orden sammeln — wer wird Pokémon-Meister?",
    minecraft: "Creeper besiegen, Erze abbauen, den Enderdrachen bezwingen — Survival-Modus: aktiviert!",
    frozen: "Elsa braucht Hilfe! Schneezauber, Eispalast und magische Momente warten auf die kleine Crew.",
    mario: "Münzen sammeln, Bowser besiegen, Prinzessin retten — es wird ein Super-Mario-Tag!",
    spiderman: "Spinnennetze spannen, Bösewichte fangen, die Stadt retten — dein Kind wird zum Superhelden!",
    "harry-potter": "Der Hogwarts-Brief ist da! Zauberstäbe, Zaubertränke und magische Prüfungen warten.",
    ninjago: "Die Ninja-Ausbildung beginnt! Geschicklichkeit, Weisheit und Spinjitzu — wer wird Meister?"
  };

  // =============================================
  // PEAK VIEW (transition animation)
  // =============================================
  if (view === "peak" && motto) return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 660,
      margin: "0 auto",
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp",
    style: {
      textAlign: "center",
      padding: "40px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 72,
      marginBottom: 16,
      animation: "scalePop .6s ease both"
    }
  }, motto.emoji), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: "clamp(24px,5vw,32px)",
      fontWeight: 900,
      marginBottom: 12,
      color: "var(--d)"
    }
  }, "Deine ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: motto.color
    }
  }, motto.name), "-Party!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: "var(--m)",
      lineHeight: 1.6,
      maxWidth: 400,
      margin: "0 auto 24px"
    }
  }, mottoDescs[mottoId] || "Das wird ein unvergesslicher Tag!"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 20,
      flexWrap: "wrap",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      borderRadius: 12,
      padding: "12px 16px",
      border: "1px solid var(--l)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--m)"
    }
  }, guests, " Kinder"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: 18,
      fontWeight: 800,
      color: "var(--a)"
    }
  }, duration, " Std. Spa\xDF")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      borderRadius: 12,
      padding: "12px 16px",
      border: "1px solid var(--l)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--m)"
    }
  }, "Altersgerechte Spiele"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: 18,
      fontWeight: 800,
      color: "var(--a)"
    }
  }, ageLabel[ag]))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--m)",
      animation: "pulse 1.5s ease infinite"
    }
  }, "Plan wird erstellt..."), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setView("plan");
      window.scrollTo(0, 0);
    },
    style: {
      marginTop: 16,
      background: "none",
      border: "none",
      fontSize: 12,
      color: "var(--m)",
      cursor: "pointer",
      textDecoration: "underline"
    }
  }, "Direkt zum Plan \u2192")));

  // =============================================
  // PLAN VIEW
  // =============================================
  if (view === "plan" && motto) {
    const timeline = buildTimeline();
    const {
      deko,
      mitgebsel,
      total
    } = getDeko();
    const costPerKid = guests > 0 ? (total / guests).toFixed(2) : "0";
    const score = calcScore();
    const snacks = getSnacks();
    const shareText = `Hey! Unser Kind feiert ${motto.name}-Geburtstag. Hier ist der komplette Plan mit Spielen und Einkaufsliste:\nhttps://machsleicht.de`;
    const locLabel = effectiveLoc === "wohnung" ? "Drinnen" : effectiveLoc === "garten" ? "Garten" : "Park";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 660,
        margin: "0 auto",
        padding: "0 16px 80px"
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 0 18px",
        position: "sticky",
        top: 0,
        background: "var(--w)",
        zIndex: 10,
        borderBottom: "1px solid var(--l)"
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "/",
      style: {
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--fd)",
        fontSize: 22,
        fontWeight: 900,
        color: "var(--d)"
      }
    }, "mach's"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--fd)",
        fontSize: 22,
        fontWeight: 900,
        color: "var(--a)"
      }
    }, "leicht")), /*#__PURE__*/React.createElement("button", {
      onClick: reset,
      style: {
        background: "none",
        border: "1px solid var(--l)",
        borderRadius: "var(--rs)",
        padding: "6px 14px",
        fontSize: 12,
        color: "var(--m)",
        cursor: "pointer"
      }
    }, "\u2190 Neu")), /*#__PURE__*/React.createElement("section", {
      className: "fu",
      style: {
        textAlign: "center",
        padding: "20px 0 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 48,
        marginBottom: 8
      }
    }, motto.emoji), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--fd)",
        fontSize: 26,
        fontWeight: 900,
        marginBottom: 4
      }
    }, motto.name), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        color: "var(--m)"
      }
    }, guests, " Kinder \xB7 ", age, " Jahre \xB7 ", duration, " Std. \xB7 ", locLabel, isMinimal && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--g)",
        fontWeight: 600
      }
    }, " \xB7 \uD83C\uDF3F Minimal"), isWow && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#7B1FA2",
        fontWeight: 600
      }
    }, " \xB7 \u2728 Wow"), emergencyMode && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#C62828",
        fontWeight: 600
      }
    }, " \xB7 \uD83D\uDEA8 Morgen-Modus")), motto.cat === "license" && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--a)",
        marginTop: 4
      }
    }, "Spiele passen zum Thema \u2014 Deko & Mitgebsel sind original ", motto.name, " Produkte.")), /*#__PURE__*/React.createElement(EinladungBlock, {
      motto: motto,
      guests: guests,
      previewName: previewName,
      setPreviewName: setPreviewName,
      inviteSent: inviteSent,
      setInviteSent: setInviteSent
    }), /*#__PURE__*/React.createElement(Connector, null), /*#__PURE__*/React.createElement(SchatzsucheTeaser, {
      motto: motto,
      guests: guests,
      age: age,
      location: effectiveLoc,
      activeStation: activeStation,
      setActiveStation: setActiveStation
    }), /*#__PURE__*/React.createElement(ScoreCheck, {
      score: score
    }), /*#__PURE__*/React.createElement("section", {
      className: "fu",
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        background: "var(--bg)",
        borderRadius: 12,
        padding: 4,
        border: "1px solid var(--l)"
      }
    }, [["minimal", "🌿", "Minimal"], ["standard", "🎯", "Standard"], ["wow", "✨", "Wow"]].map(([val, ico, label]) => /*#__PURE__*/React.createElement("button", {
      key: val,
      onClick: () => {
        setShoppingMode(val);
        setOwned({});
      },
      style: {
        padding: "8px 14px",
        borderRadius: 10,
        border: "none",
        background: shoppingMode === val ? val === "minimal" ? "#E8F5E9" : val === "wow" ? "#EDE7F6" : "var(--al)" : "transparent",
        color: shoppingMode === val ? val === "minimal" ? "var(--g)" : val === "wow" ? "#7B1FA2" : "var(--a)" : "var(--m)",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all .2s",
        whiteSpace: "nowrap"
      }
    }, ico, " ", label))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        background: "var(--bg)",
        borderRadius: 12,
        padding: 4,
        border: "1px solid var(--l)"
      }
    }, [["wohnung", "🏠", "Drinnen"], ["garten", "🌳", "Garten"], ["park", "🏞️", "Park"]].map(([val, ico, label]) => /*#__PURE__*/React.createElement("button", {
      key: val,
      onClick: () => setLocOverride(val),
      style: {
        padding: "8px 12px",
        borderRadius: 10,
        border: "none",
        background: effectiveLoc === val ? "#E3F2FD" : "transparent",
        color: effectiveLoc === val ? "#1565C0" : "var(--m)",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all .2s",
        whiteSpace: "nowrap"
      }
    }, ico, " ", label))))), /*#__PURE__*/React.createElement(Zeitplan, {
      timeline: timeline,
      mottoColor: motto.color,
      quietMode: quietMode,
      setQuietMode: setQuietMode,
      ageGroupLabel: ageLabel[ag]
    }), /*#__PURE__*/React.createElement("section", {
      className: "fu",
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--fd)",
        fontSize: 20,
        fontWeight: 800,
        marginBottom: 12
      }
    }, "\uD83C\uDF7F Was du wirklich an Essen brauchst ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 500,
        color: "var(--m)"
      }
    }, "(f\xFCr ", guests, " Kinder, ", duration, " Std.)")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 8
      }
    }, snacks.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "var(--bg)",
        borderRadius: "var(--rs)",
        padding: "10px 12px",
        border: "1px solid var(--l)",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        marginBottom: 4
      }
    }, s.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--d)"
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 800,
        color: "var(--a)",
        marginTop: 2
      }
    }, s.menge))))), /*#__PURE__*/React.createElement("section", {
      className: "fu",
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--fd)",
        fontSize: 20,
        fontWeight: 800,
        marginBottom: 4
      }
    }, "\uD83C\uDFA8 Deko, die man wirklich sieht ", motto.cat === "license" && `(${motto.name})`), isMinimal && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--g)",
        marginBottom: 10,
        fontWeight: 600
      }
    }, "\uD83C\uDF3F Minimal-Modus: Das reicht v\xF6llig."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: "var(--m)",
        marginBottom: 8
      }
    }, "\u2713 Checkbox = \"Hab ich schon\" \u2014 wird aus Kosten rausgerechnet"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, deko.map((item, i) => /*#__PURE__*/React.createElement(ItemRow, {
      key: i,
      item: item,
      isOwned: owned[i],
      onToggle: () => toggleOwned(i)
    })))), /*#__PURE__*/React.createElement("section", {
      className: "fu",
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--fd)",
        fontSize: 20,
        fontWeight: 800,
        marginBottom: 12
      }
    }, "\uD83C\uDF81 Kleine Mitgebsel, kein unn\xF6tiger Kram"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, mitgebsel.map((item, i) => /*#__PURE__*/React.createElement(ItemRow, {
      key: "m" + i,
      item: item,
      isOwned: owned[deko.length + i],
      onToggle: () => toggleOwned(deko.length + i)
    })))), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        navigator.share ? navigator.share({
          title: `${motto.name} Geburtstag`,
          text: shareText,
          url: "https://machsleicht.de"
        }) : (navigator.clipboard?.writeText(shareText), alert("Kopiert! Einfach in WhatsApp einfügen."));
      },
      style: {
        width: "100%",
        padding: 14,
        background: "#25D366",
        color: "#FFF",
        border: "none",
        borderRadius: "var(--r)",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom: 8
      }
    }, "\uD83D\uDCF1 Plan an Helfer schicken"), /*#__PURE__*/React.createElement("section", {
      className: "fu",
      style: {
        marginBottom: 24
      },
      "data-action": "pdf"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "linear-gradient(135deg,#EDE7F6,#F3E5F5)",
        borderRadius: 20,
        padding: "24px 20px",
        border: "1px solid #CE93D8",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 36,
        marginBottom: 8
      }
    }, "\uD83D\uDCC4"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--fd)",
        fontSize: 20,
        fontWeight: 800,
        marginBottom: 4
      }
    }, "Plan als PDF speichern"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--m)",
        marginBottom: 16
      }
    }, "Zeitplan, Einkaufsliste, Snack-Mengen \u2014 alles auf einem Blatt."), /*#__PURE__*/React.createElement("button", {
      onClick: () => window.print(),
      style: {
        padding: "14px 32px",
        background: "linear-gradient(135deg,#7B1FA2,#9C27B0)",
        color: "#FFF",
        border: "none",
        borderRadius: "var(--r)",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer"
      }
    }, "\uD83D\uDCC4 PDF erstellen & drucken"))), /*#__PURE__*/React.createElement("div", {
      className: "sp",
      style: {
        background: "linear-gradient(135deg,#1B5E20,#2E7D32,#388E3C)",
        borderRadius: 24,
        padding: "48px 24px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 64,
        marginBottom: 12,
        animation: "checkPop .6s ease .3s both"
      }
    }, "\u2713"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--fd)",
        fontSize: "clamp(26px,5vw,34px)",
        fontWeight: 900,
        color: "#FFF",
        marginBottom: 8,
        lineHeight: 1.1
      }
    }, "Das reicht. Wirklich."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 16,
        color: "#C8E6C9",
        marginBottom: 24,
        lineHeight: 1.7,
        maxWidth: 420,
        margin: "0 auto 24px"
      }
    }, "Du musst jetzt nichts mehr optimieren. Dieser Plan funktioniert."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        gap: 32,
        flexWrap: "wrap",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#A5D6A7",
        textTransform: "uppercase",
        letterSpacing: "0.08em"
      }
    }, "Noch einkaufen"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--fd)",
        fontSize: 28,
        fontWeight: 800,
        color: "#FFF"
      }
    }, "ca. \u20AC", Math.round(total))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#A5D6A7",
        textTransform: "uppercase",
        letterSpacing: "0.08em"
      }
    }, "Pro Kind"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--fd)",
        fontSize: 28,
        fontWeight: 800,
        color: "#F7C948"
      }
    }, "ca. \u20AC", guests > 0 ? Math.round(total / guests) : "0"))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#A5D6A7"
      }
    }, "Richtwerte \u2014 tats\xE4chliche Preise variieren"))), /*#__PURE__*/React.createElement("footer", {
      style: {
        textAlign: "center",
        marginTop: 32,
        padding: "16px 0",
        borderTop: "1px solid var(--l)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--m)"
      }
    }, "\xA9 2026 machsleicht.de \xB7 ", /*#__PURE__*/React.createElement("a", {
      href: "/impressum",
      style: {
        color: "var(--m)",
        textDecoration: "none"
      }
    }, "Impressum"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
      href: "/datenschutz",
      style: {
        color: "var(--m)",
        textDecoration: "none"
      }
    }, "Datenschutz"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
      href: "/transparenz",
      style: {
        color: "var(--m)",
        textDecoration: "none"
      }
    }, "Transparenz"))), /*#__PURE__*/React.createElement(ControlHub, {
      mottoId: mottoId
    }));
  }

  // =============================================
  // CONFIG VIEW (Wizard)
  // =============================================
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(253,252,249,0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    style: {
      textDecoration: "none",
      display: "flex",
      alignItems: "baseline",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--fd)",
      fontWeight: 800,
      fontSize: 20,
      color: "var(--a)"
    }
  }, "mach's"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--fd)",
      fontWeight: 800,
      fontSize: 20,
      color: "var(--d)"
    }
  }, "leicht")), /*#__PURE__*/React.createElement("a", {
    href: "/schatzsuche",
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--m)",
      textDecoration: "none"
    }
  }, "\uD83D\uDDFA\uFE0F Schatzsuche")), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "48px 24px 32px",
      background: "linear-gradient(165deg, #fef8f0 0%, #fdfcf9 40%, #f0f4e8 100%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 660,
      margin: "0 auto",
      textAlign: "center",
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "#fff",
      border: "1px solid var(--l)",
      borderRadius: 100,
      padding: "6px 16px",
      fontSize: 12,
      fontWeight: 500,
      color: "#888",
      marginBottom: 20,
      animation: "fadeSlideUp 0.4s ease-out both"
    }
  }, "\uD83C\uDF89 Kindergeburtstag planen \u2014 kostenlos, ohne Anmeldung"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: "clamp(28px,5.5vw,48px)",
      fontWeight: 800,
      lineHeight: 1.12,
      marginBottom: 14,
      color: "var(--d)",
      animation: "fadeSlideUp 0.5s 0.1s ease-out both"
    }
  }, "Kindergeburtstag planen", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--a)"
    }
  }, "in 10 Minuten.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "clamp(14px,2vw,17px)",
      color: "var(--m)",
      lineHeight: 1.6,
      maxWidth: 500,
      margin: "0 auto 24px",
      animation: "fadeSlideUp 0.5s 0.2s ease-out both"
    }
  }, "W\xE4hl Alter, Motto und G\xE4stezahl \u2014 du bekommst sofort einen kompletten Plan mit Spielen, Einkaufsliste und Kosten pro Kind."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center",
      animation: "fadeSlideUp 0.5s 0.3s ease-out both"
    }
  }, [["⏱️", "Zeitplan"], ["🎯", "Altersgerechte Spiele"], ["🛒", "Einkaufsliste"], ["🧮", "Kosten pro Kind"]].map(([ico, label]) => /*#__PURE__*/React.createElement("span", {
    key: label,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "6px 12px",
      background: "rgba(255,255,255,0.7)",
      backdropFilter: "blur(8px)",
      borderRadius: 100,
      fontSize: 12,
      fontWeight: 500,
      color: "#4a4a4a",
      border: "1px solid rgba(0,0,0,0.06)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, ico), label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: 24,
      animation: "fadeSlideUp 0.5s 0.4s ease-out both"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#wizard",
    onClick: e => {
      e.preventDefault();
      document.getElementById("wizard")?.scrollIntoView({
        behavior: "smooth"
      });
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "14px 28px",
      background: "linear-gradient(135deg,var(--a),#d35f1a)",
      color: "#fff",
      borderRadius: 14,
      fontSize: 15,
      fontWeight: 700,
      textDecoration: "none",
      boxShadow: "0 4px 20px rgba(224,122,58,0.3)"
    }
  }, "\uD83C\uDF82 Geburtstag planen"), /*#__PURE__*/React.createElement("button", {
    onClick: emergencyFull,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "14px 28px",
      background: "linear-gradient(135deg,#C62828,#E53935)",
      color: "#fff",
      borderRadius: 14,
      fontSize: 15,
      fontWeight: 700,
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 20px rgba(198,40,40,0.3)",
      animation: "softPulse 2s infinite"
    }
  }, "\uD83D\uDEA8 Morgen ist Geburtstag!")))), emergencyMode && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 700,
      margin: "16px auto",
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#FFEBEE,#FFF3E0)",
      borderRadius: 20,
      padding: 24,
      border: "2px solid #EF5350",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 8
    }
  }, "\uD83D\uDEA8"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: 22,
      fontWeight: 900,
      color: "#C62828",
      marginBottom: 8
    }
  }, "Morgen-Modus aktiv"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--m)",
      lineHeight: 1.6,
      marginBottom: 16
    }
  }, "Schnellster Plan der funktioniert. Drinnen, minimal, 2 Stunden."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEmergencyMode(false),
    style: {
      background: "none",
      border: "none",
      fontSize: 12,
      color: "var(--m)",
      cursor: "pointer",
      textDecoration: "underline"
    }
  }, "Morgen-Modus deaktivieren"))), /*#__PURE__*/React.createElement("div", {
    id: "wizard",
    style: {
      maxWidth: 700,
      margin: "-16px auto 0",
      padding: "0 16px",
      position: "relative",
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 24,
      padding: "32px 28px 28px",
      boxShadow: "0 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      border: "1px solid rgba(0,0,0,0.04)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "#bbb",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--a)",
      marginRight: 6
    }
  }, "\u2460"), " Wie alt wird dein Kind?", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: 18,
      fontWeight: 800,
      color: "var(--a)",
      marginLeft: 8
    }
  }, age, " Jahre"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--m)",
      fontWeight: 500,
      marginLeft: 6
    }
  }, "(", ageLabel[ag], ")")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 3,
    max: 12,
    value: age,
    onChange: e => {
      setAge(+e.target.value);
      setMottoId(null);
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--m)",
      marginTop: 6
    }
  }, age <= 5 ? "Einfache Suchspiele, Stopptanz, kurze Stationen" : age <= 8 ? "Schatzsuchen, Rallyes, Quiz, Basteln" : "Escape-Rooms, Codes knacken, Team-Olympiaden")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "#bbb"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--a)",
      marginRight: 6
    }
  }, "\u2461"), " Motto w\xE4hlen"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, [["generic", "🎨 Klassisch"], ["license", "⭐ Charaktere"]].map(([val, label]) => /*#__PURE__*/React.createElement("button", {
    key: val,
    onClick: () => {
      setMottoTab(val);
      setMottoId(null);
    },
    style: {
      padding: "4px 10px",
      fontSize: 11,
      fontWeight: 600,
      border: "none",
      borderRadius: 100,
      background: mottoTab === val ? "var(--a)" : "#f0ede8",
      color: mottoTab === val ? "#fff" : "#999",
      cursor: "pointer"
    }
  }, label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      overflowX: "auto",
      padding: "4px 2px 8px",
      scrollSnapType: "x mandatory"
    }
  }, (mottoTab === "generic" ? GENERIC : filteredLicense).map(m => /*#__PURE__*/React.createElement("button", {
    key: m.id,
    onClick: () => {
      setMottoId(m.id);
      window.plausible && plausible("motto-selected", {
        props: {
          motto: m.id
        }
      });
    },
    style: {
      position: "relative",
      flex: "0 0 auto",
      minWidth: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      padding: "18px 12px 14px",
      background: mottoId === m.id ? m.color + "12" : "#fff",
      border: `2px solid ${mottoId === m.id ? m.color : "#eee"}`,
      borderRadius: 16,
      cursor: "pointer",
      transition: "all 0.25s",
      transform: mottoId === m.id ? "scale(1.05)" : "scale(1)",
      boxShadow: mottoId === m.id ? `0 4px 20px ${m.color}30` : "0 1px 4px rgba(0,0,0,0.04)",
      scrollSnapAlign: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30
    }
  }, m.emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: mottoId === m.id ? m.color : "#333"
    }
  }, m.name), m.cat === "license" && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: mottoId === m.id ? m.color : "#999",
      background: mottoId === m.id ? m.color + "15" : "#f5f5f5",
      padding: "2px 8px",
      borderRadius: 100
    }
  }, m.ages[0], "\u2013", m.ages[m.ages.length - 1], " J."), mottoId === m.id && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -6,
      right: -6,
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: m.color,
      color: "#fff",
      fontSize: 11,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 2px 8px ${m.color}50`
    }
  }, "\u2713"))), mottoTab === "license" && filteredLicense.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      color: "var(--m)",
      fontSize: 13
    }
  }, "F\xFCr ", age, " Jahre keine Lizenz-Mottos verf\xFCgbar."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "#bbb",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--a)",
      marginRight: 6
    }
  }, "\u2462"), " G\xE4stezahl", guests && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: 18,
      fontWeight: 800,
      color: "var(--a)",
      marginLeft: 8
    }
  }, guests, " Kinder")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, [4, 5, 6, 7, 8, 10, 12, 15].map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => setGuests(n),
    style: {
      width: 48,
      height: 48,
      border: `2px solid ${guests === n ? "var(--a)" : "#f0ede8"}`,
      borderRadius: 14,
      background: guests === n ? "var(--al)" : "#fafaf8",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 16,
      color: guests === n ? "var(--a)" : "#666",
      transition: "all 0.2s"
    }
  }, n))), age <= 5 && guests > 8 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--a)",
      marginTop: 6,
      fontWeight: 600
    }
  }, "\uD83D\uDCA1 F\xFCr ", age, "-J\xE4hrige sind 5\u20138 Kinder ideal.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Confetti, {
    active: showConfetti
  }), /*#__PURE__*/React.createElement("button", {
    onClick: startPlan,
    disabled: !mottoId,
    style: {
      width: "100%",
      padding: "16px 24px",
      background: mottoId ? "linear-gradient(135deg,var(--a),#d35f1a)" : "#e8e6e1",
      color: mottoId ? "#FFF" : "#bbb",
      border: "none",
      borderRadius: 16,
      fontSize: 16,
      fontWeight: 700,
      cursor: mottoId ? "pointer" : "default",
      boxShadow: mottoId ? "0 4px 20px rgba(224,122,58,0.35)" : "none",
      animation: mottoId ? "softPulse 2s infinite" : "none",
      transition: "all 0.3s"
    }
  }, mottoId ? `${motto.emoji} ${motto.name}-Geburtstag planen — los geht's!` : "Wähl Alter, Motto & Gästezahl"), mottoId && /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: "#bbb",
      marginTop: 8
    }
  }, "Kostenlos \xB7 Ohne Anmeldung \xB7 Sofort loslegen")), /*#__PURE__*/React.createElement("button", {
    onClick: emergencyStart,
    style: {
      width: "100%",
      marginTop: 12,
      padding: 10,
      background: "none",
      color: "#C62828",
      border: "1px solid #C6282840",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer"
    }
  }, "\uD83D\uDEA8 Notfallplan in 2 Minuten \u2014 Geburtstag in 48h?"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 700,
      margin: "24px auto",
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/schatzsuche",
    style: {
      textDecoration: "none",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#fef8f0,#fff8e8)",
      borderRadius: 20,
      padding: "24px 28px",
      border: "1px solid #f0ede8",
      display: "flex",
      alignItems: "center",
      gap: 20,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 44,
      flexShrink: 0,
      animation: "float 3s ease-in-out infinite"
    }
  }, "\uD83D\uDDFA\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--fd)",
      fontWeight: 800,
      fontSize: 18,
      color: "var(--d)",
      marginBottom: 4
    }
  }, "Schatzsuche erstellen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--m)",
      lineHeight: 1.5
    }
  }, "6 Themen, interaktive Schatzkarte, Live-Modus f\xFCr den Partytag.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      color: "var(--a)",
      flexShrink: 0
    }
  }, "\u2192")))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 700,
      margin: "40px auto 0",
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--a)",
      background: "var(--al)",
      padding: "4px 14px",
      borderRadius: 100,
      marginBottom: 12
    }
  }, "Alles drin"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--fd)",
      fontSize: 24,
      fontWeight: 800,
      margin: "0 0 8px"
    }
  }, "Was du bekommst"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--m)"
    }
  }, "Ein Plan, der reicht. Wirklich.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))",
      gap: 12
    }
  }, [["📋", "Kompletter Zeitplan", "Von Ankommen bis Tschüss — mit Uhrzeiten und Puffer."], ["🎮", "2–3 Spiele mit Anleitung", "Altersgerecht, material-arm, in 5 Sätzen erklärt."], ["🛒", "Einkaufsliste + Preise", "Kaufen, leihen oder selbst machen. Mit Hab-ich-schon Checkbox."], ["🧮", "Kosten pro Kind", "Sofort sichtbar. Im Minimal-Modus unter 5€ pro Kind."], ["🍕", "Snack-Mengen", "8 Kinder, 3h → 12 Muffins, 1.2kg Obst, 7L Saft."], ["😴", "Ruhemodus", "Kinder zu wild? Ein Klick tauscht Action gegen ruhige Spiele."]].map(([ico, title, desc], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "#fff",
      borderRadius: 20,
      padding: "24px 20px",
      border: "1px solid #f0ede8",
      animation: `fadeSlideUp 0.5s ${i * 0.05}s ease-out both`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      display: "block",
      marginBottom: 6
    }
  }, ico), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--fd)",
      fontWeight: 700,
      fontSize: 15,
      color: "var(--d)",
      display: "block",
      marginBottom: 4
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--m)",
      lineHeight: 1.5
    }
  }, desc))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 700,
      margin: "48px auto 0",
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--a)",
      marginBottom: 6
    }
  }, "F\xFCr Eltern"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--fd)",
      fontWeight: 900,
      fontSize: "clamp(20px,4vw,26px)",
      color: "var(--d)",
      margin: 0
    }
  }, "Motto-Ratgeber"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--m)",
      marginTop: 8
    }
  }, "Du kennst Pok\xE9mon oder Ninjago nicht? Unsere Guides erkl\xE4ren alles.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
      gap: 10
    }
  }, [{
    emoji: "🐾",
    name: "PAW Patrol",
    href: "/paw-patrol-guide"
  }, {
    emoji: "⚡",
    name: "Pokémon",
    href: "/pokemon-guide"
  }, {
    emoji: "⛏️",
    name: "Minecraft",
    href: "/minecraft-guide"
  }, {
    emoji: "❄️",
    name: "Frozen",
    href: "/frozen-guide"
  }, {
    emoji: "🍄",
    name: "Super Mario",
    href: "/super-mario-guide"
  }, {
    emoji: "🕷️",
    name: "Spider-Man",
    href: "/spider-man-guide"
  }, {
    emoji: "⚡",
    name: "Harry Potter",
    href: "/harry-potter-guide"
  }, {
    emoji: "🥷",
    name: "Ninjago",
    href: "/ninjago-guide"
  }].map((g, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: g.href,
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      border: "1px solid var(--l)",
      borderRadius: 12,
      padding: "16px 12px",
      textAlign: "center",
      transition: "all 0.2s",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 6
    }
  }, g.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--d)"
    }
  }, g.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--a)",
      marginTop: 4
    }
  }, "Guide lesen \u2192"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/ratgeber",
    style: {
      fontSize: 13,
      color: "var(--a)",
      fontWeight: 600,
      textDecoration: "none"
    }
  }, "Alle Ratgeber ansehen \u2192"))), /*#__PURE__*/React.createElement("footer", {
    style: {
      maxWidth: 700,
      margin: "40px auto 0",
      padding: "16px 16px",
      textAlign: "center",
      borderTop: "1px solid var(--l)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--m)"
    }
  }, "\xA9 2026 machsleicht.de \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "/schatzsuche",
    style: {
      color: "var(--m)",
      textDecoration: "none"
    }
  }, "Schatzsuche"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "/ratgeber",
    style: {
      color: "var(--m)",
      textDecoration: "none"
    }
  }, "Ratgeber"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "/impressum",
    style: {
      color: "var(--m)",
      textDecoration: "none"
    }
  }, "Impressum"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "/datenschutz",
    style: {
      color: "var(--m)",
      textDecoration: "none"
    }
  }, "Datenschutz"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "/transparenz",
    style: {
      color: "var(--m)",
      textDecoration: "none"
    }
  }, "Transparenz"))));
}

// === MOUNT ===
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));

// Hide SEO content when React mounts
var seo = document.getElementById("seo-content");
if (seo) seo.style.display = "none";
if (location.hash === "#planer") document.getElementById("planer")?.scrollIntoView({
  behavior: "smooth"
});
