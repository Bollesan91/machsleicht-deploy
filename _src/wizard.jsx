// wizard.jsx — P7-1 Wizard-MVP
//
// Stage 1 (Motto-Picker) + Stage 2 (Alter-Picker) + Stage 3 (Bridge zum Planer).
// Liest aus window.MACHSLEICHT_THEME_HELPERS (theme-registry.js).
// Speichert in window.BirthdayProject (birthday-project.js).
// Nach Stage 2: redirect zu /kindergeburtstag?motto=X&age=Y mit pre-set State.
//
// Spaeter (P7-2): Stage 3 wird Inline-Plan-Preview-First statt Redirect.
// Spaeter (P7-3..5): Stage 4 Einladung-Editor + Stage 5 Partyseite + Stage 6 Conversion.

const { useState, useEffect } = React;

// === DATA ACCESSORS ===
const TH    = window.MACHSLEICHT_THEMES || {};
const TH_H  = window.MACHSLEICHT_THEME_HELPERS || {};
const BP    = window.BirthdayProject || null;

// Alle Mottos die wizardReady=true sind (Datenwahrheit komplett),
// danach die nicht-ready (mit visual "in Arbeit"-Badge).
function orderedMottos() {
  const all = Object.values(TH);
  const ready = all.filter(m => {
    const wt = TH_H.getWizardTheme && TH_H.getWizardTheme(m.slug);
    return wt && wt.wizardReady;
  });
  const pending = all.filter(m => {
    const wt = TH_H.getWizardTheme && TH_H.getWizardTheme(m.slug);
    return !(wt && wt.wizardReady);
  });
  return [...ready, ...pending];
}

const AGE_OPTIONS = [
  {key:'3-5', range:'3–5', title:'Kindergartenkinder', desc:'Kurze Spiele, viel Mitmachen, einfache Schatzsuche-Reime', features:['Tagesplan 14:00–16:30','5 einfache Spiele','3 Schatzsuche-Stationen'], plannerAge:5},
  {key:'6-8', range:'6–8', title:'Vorschule + 1. Klasse', desc:'Aktiv, kompetitiv — perfekte Zielgruppe', features:['Tagesplan 14:00–17:00','7 Spiele zur Auswahl','5 Schatzsuche-Stationen'], plannerAge:7},
  {key:'9-12', range:'9–12', title:'Grundschulkinder', desc:'Anspruchsvollere Rätsel, komplexere Spiele', features:['Tagesplan 14:00–18:00','9 Spiele zur Auswahl','7 Stationen + Geheimschrift'], plannerAge:10}
];

// === SMALL COMPONENTS ===
function ProgressDots({ stage }) {
  const dots = [1, 2, 3, 4, 5, 6];
  return (
    <div style={{display:'flex',alignItems:'center',gap:6}}>
      {dots.map(n => (
        <span key={n} style={{
          width: n === stage ? 10 : 7,
          height: n === stage ? 10 : 7,
          borderRadius:'50%',
          background: n < stage ? '#FF6F00' : n === stage ? '#FF6F00' : '#E6D4BD',
          boxShadow: n === stage ? '0 0 0 3px #FFE0C2' : 'none',
          transition: 'all .25s'
        }}/>
      ))}
    </div>
  );
}

function TopNav({ stage, onBrandClick, onLaterClick }) {
  return (
    <nav style={{
      background:'#fff', borderBottom:'1px solid #F0E6D8', padding:'12px 20px',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      position:'sticky', top:0, zIndex:30, gap:14
    }}>
      <a href="#" onClick={(e) => { e.preventDefault(); onBrandClick(); }} style={{
        fontFamily:"'Fraunces', Georgia, serif", fontSize:18, color:'#1a1a1a', textDecoration:'none',
        display:'flex', alignItems:'center', gap:4, fontWeight:800
      }}>mach's <em style={{fontStyle:'normal', color:'#FF6F00'}}>leicht</em></a>
      <ProgressDots stage={stage}/>
      <button onClick={onLaterClick} style={{
        background:'none', border:'1px solid #F0E6D8', color:'#666', fontWeight:700, fontSize:12,
        cursor:'pointer', padding:'7px 12px', borderRadius:8, fontFamily:'DM Sans, system-ui, sans-serif',
        whiteSpace:'nowrap', transition:'all .15s'
      }}
      onMouseEnter={(e) => { e.target.style.background='#FFF3E6'; e.target.style.color='#FF6F00'; e.target.style.borderColor='#FF6F00'; }}
      onMouseLeave={(e) => { e.target.style.background='none'; e.target.style.color='#666'; e.target.style.borderColor='#F0E6D8'; }}>
        💾 Später
      </button>
    </nav>
  );
}

// === STAGE 1: MOTTO PICKER ===
function Stage1Motto({ onPick }) {
  const mottos = orderedMottos();
  return (
    <div style={{maxWidth:1080, margin:'0 auto', padding:'48px 20px 80px'}}>
      <header style={{textAlign:'center', marginBottom:36}}>
        <h1 style={{
          fontFamily:"'Fraunces', Georgia, serif", fontWeight:800, fontSize:'clamp(30px,4.5vw,46px)',
          lineHeight:1.15, margin:0
        }}>
          Welches <em style={{fontStyle:'normal', color:'#FF6F00'}}>Motto</em> soll's werden?
        </h1>
        <p style={{color:'#666', fontSize:17, maxWidth:580, margin:'14px auto 0'}}>
          Such ein Motto aus — wir bauen drum herum den kompletten Plan, die Einladung, die Schatzsuche und die Partyseite. Alles in einem Flow.
        </p>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'#F0FDF4', border:'1px solid #C8E6C9', color:'#1a1a1a',
          padding:'10px 16px', borderRadius:999, fontSize:13, marginTop:18, fontWeight:600
        }}>
          <span style={{color:'#FFC107', fontSize:11, letterSpacing:1}}>⭐⭐⭐⭐⭐</span>
          <strong>Über 4.700 Geburtstage</strong> mit machsleicht geplant · kostenlos · ohne Anmeldung
        </div>
      </header>

      <div style={{
        display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:14
      }}>
        {mottos.map(m => {
          const wt = TH_H.getWizardTheme ? TH_H.getWizardTheme(m.slug) : null;
          const accent = (wt && wt.accent) || m.color || '#FF6F00';
          const ready = wt && wt.wizardReady;
          return (
            <div key={m.slug}
              onClick={() => onPick(m.slug)}
              style={{
                background:'#fff', border:`2px solid ${ready ? '#F0E6D8' : '#F0E6D8'}`, borderRadius:16,
                padding:'20px 16px', cursor:'pointer', textAlign:'center', position:'relative',
                transition:'all .2s', opacity: ready ? 1 : 0.85
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform='translateY(-3px)';
                e.currentTarget.style.boxShadow=`0 12px 32px rgba(0,0,0,.08)`;
                e.currentTarget.style.borderColor=accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform='translateY(0)';
                e.currentTarget.style.boxShadow='none';
                e.currentTarget.style.borderColor='#F0E6D8';
              }}>
              {!ready && (
                <span style={{
                  position:'absolute', top:8, right:8, background:'#FFF3CD', color:'#856404',
                  fontSize:10, fontWeight:800, padding:'3px 7px', borderRadius:8, letterSpacing:'.4px'
                }}>in Arbeit</span>
              )}
              <span style={{fontSize:48, lineHeight:1, marginBottom:8, display:'block'}}>{m.emoji}</span>
              <div style={{fontFamily:"'Fraunces', Georgia, serif", fontSize:17, fontWeight:800}}>{m.label}</div>
              <span style={{
                display:'block', marginTop:6, fontSize:11, color:accent,
                fontWeight:800, letterSpacing:'.4px', textTransform:'uppercase'
              }}>3–12 Jahre</span>
            </div>
          );
        })}
        {/* "Eigenes Motto"-Karte */}
        <div onClick={() => onPick('__custom__')}
          style={{
            background:'#FFF8F0', border:'2px dashed #C8B9A6', borderRadius:16,
            padding:'20px 16px', cursor:'pointer', textAlign:'center', transition:'all .2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background='#FFF3E6'; e.currentTarget.style.borderColor='#FF6F00'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background='#FFF8F0'; e.currentTarget.style.borderColor='#C8B9A6'; }}>
          <span style={{fontSize:48, lineHeight:1, marginBottom:8, display:'block'}}>✏️</span>
          <div style={{fontFamily:"'Fraunces', Georgia, serif", fontSize:17, fontWeight:800}}>Eigenes…</div>
          <span style={{
            display:'block', marginTop:6, fontSize:11, color:'#666',
            fontWeight:800, letterSpacing:'.4px', textTransform:'uppercase'
          }}>selbst eintragen</span>
        </div>
      </div>
    </div>
  );
}

// === STAGE 2: AGE PICKER ===
function Stage2Age({ motto, onPick }) {
  const wt = motto ? (TH_H.getWizardTheme ? TH_H.getWizardTheme(motto.slug) : null) : null;
  const accent = (wt && wt.accent) || (motto && motto.color) || '#FF6F00';
  return (
    <div style={{maxWidth:880, margin:'0 auto', padding:'48px 20px 80px'}}>
      <header style={{textAlign:'center', marginBottom:36}}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:`${accent}15`, border:`1px solid ${accent}`, color:accent,
          padding:'8px 16px', borderRadius:999, fontWeight:800, fontSize:14, marginBottom:12
        }}>
          <span>{motto?.emoji}</span> <span>{motto?.label}</span>
        </div>
        <h1 style={{
          fontFamily:"'Fraunces', Georgia, serif", fontWeight:800, fontSize:'clamp(28px,4.2vw,42px)',
          lineHeight:1.15, margin:0
        }}>Wie alt wird das Geburtstagskind?</h1>
        <p style={{color:'#666', fontSize:17, marginTop:12}}>Spiele, Rätsel und Texte werden alters-angepasst.</p>
      </header>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16}}>
        {AGE_OPTIONS.map(a => (
          <div key={a.key}
            onClick={() => onPick(a)}
            style={{
              background:'#fff', border:'2px solid #F0E6D8', borderRadius:18,
              padding:'28px 22px', cursor:'pointer', transition:'all .2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform='translateY(-3px)';
              e.currentTarget.style.boxShadow=`0 12px 32px rgba(0,0,0,.08)`;
              e.currentTarget.style.borderColor=accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform='translateY(0)';
              e.currentTarget.style.boxShadow='none';
              e.currentTarget.style.borderColor='#F0E6D8';
            }}>
            <div style={{fontFamily:"'Fraunces', Georgia, serif", fontSize:42, color:accent, lineHeight:1, fontWeight:800}}>
              {a.range}<small style={{fontSize:18, color:'#1a1a1a', fontWeight:800}}> Jahre</small>
            </div>
            <div style={{fontFamily:"'Fraunces', Georgia, serif", fontSize:18, marginTop:6, fontWeight:800}}>{a.title}</div>
            <div style={{color:'#555', fontSize:14, marginTop:8}}>{a.desc}</div>
            <ul style={{margin:'14px 0 0', paddingLeft:18, fontSize:13, color:'#666'}}>
              {a.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// (Stage 3 ENTFERNT — direkter Redirect aus Stage 2 nach Alter-Klick.
//  Auto-Redirect via setTimeout war in manchen Browsers/Sandboxes unzuverlaessig,
//  jetzt User-Geste-getriggerter location.assign() statt.)

// === MAIN APP ===
function WizardApp() {
  // Stage state
  const [stage, setStage] = useState(1);
  const [motto, setMotto] = useState(null);
  const [age, setAge] = useState(null);

  // BirthdayProject-Sync — beim Mount Resume-Check
  useEffect(() => {
    if (BP && BP.isAvailable()) {
      const existing = BP.get();
      if (existing && existing.theme && existing.theme.slug && TH[existing.theme.slug]) {
        // Wenn Resume sinnvoll: nicht auto-resume, sondern Banner zeigen (P7-2)
        // Vorerst: nichts tun, User startet frisch
      }
    }
  }, []);

  function pickMotto(slug) {
    if (slug === '__custom__') {
      const customName = prompt('Wie soll dein Motto heißen?', 'Pferde-Hof');
      if (!customName) return;
      const customEmoji = prompt('Welches Emoji passt?', '🎉') || '🎉';
      const m = { slug:'__custom_'+Date.now(), label:customName.trim(), emoji:customEmoji, color:'#666', modules:[] };
      setMotto(m);
    } else {
      const m = TH[slug];
      if (!m) return;
      setMotto(m);
    }
    setStage(2);
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function pickAge(a) {
    setAge(a);
    // BirthdayProject seeden (fuer Cross-Tool-Persistenz)
    if (BP && BP.isAvailable() && motto) {
      try {
        BP.create({
          source: 'wizard',
          theme: {
            slug: motto.slug,
            label: motto.label,
            emoji: motto.emoji,
            color: motto.color || '#FF6F00'
          },
          child: { firstName: '', age: a.plannerAge }
        });
      } catch (e) {}
    }
    // FIX 29.05.2026: Planer liest 'ml_age' aus localStorage, nicht aus URL-Param.
    // Direkt setzen bevor Redirect, damit Planer auf korrektem Alter startet.
    try {
      if (motto && motto.slug && !motto.slug.startsWith('__custom_')) {
        localStorage.setItem('ml_mottoId', JSON.stringify(motto.slug));
      }
      localStorage.setItem('ml_age', JSON.stringify(a.plannerAge));
    } catch (e) {}
    // Direkter Redirect — kein Stage 3 Zwischenschritt mehr (Auto-Redirect war unzuverlaessig).
    proceedToPlanner(motto, a);
  }

  function proceedToPlanner(m, a) {
    const params = new URLSearchParams();
    if (m && m.slug && !m.slug.startsWith('__custom_')) {
      params.set('motto', m.slug);
    }
    if (a) params.set('age', String(a.plannerAge));
    const url = '/kindergeburtstag?' + params.toString();
    // location.assign statt href= — funktioniert zuverlaessiger bei Sandboxes
    window.location.assign(url);
  }

  function brandClick() {
    if (stage > 1) {
      if (confirm('Möchtest du wirklich von vorne starten? Dein bisheriger Stand bleibt gespeichert.')) {
        setStage(1);
        setMotto(null);
        setAge(null);
      }
    }
  }

  function saveLaterClick() {
    alert('💾 Save-Later kommt in P7-2 (Magic-Link via Resend-Worker). Aktuell speichert localStorage automatisch.');
  }

  return (
    <div style={{
      fontFamily:"'DM Sans', system-ui, sans-serif",
      background:'#FFF8F0', color:'#1a1a1a', minHeight:'100vh'
    }}>
      <TopNav stage={stage} onBrandClick={brandClick} onLaterClick={saveLaterClick}/>
      {stage === 1 && <Stage1Motto onPick={pickMotto}/>}
      {stage === 2 && <Stage2Age motto={motto} onPick={pickAge}/>}
      {/* Demo-Badge (entfernen wenn deployed) */}
      <div style={{
        position:'fixed', bottom:20, left:20, background:'#1E3A5F', color:'#fff',
        padding:'10px 16px', borderRadius:999, fontSize:12, fontWeight:700,
        zIndex:90, boxShadow:'0 4px 12px rgba(0,0,0,.2)'
      }}>
        🧪 Wizard-MVP · Stage {stage}/6
        <div style={{fontWeight:400, opacity:.8, marginTop:2, fontSize:10}}>P7-1 Stage 1+2 + Planer-Bridge</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('wizard-root')).render(React.createElement(WizardApp));
