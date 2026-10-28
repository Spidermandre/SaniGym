import { useState } from "react";
import Home from "./components/Home.jsx";
import Sessions from "./components/Sessions.jsx";
import SessionDetail from "./components/SessionDetail.jsx";
import WorkoutMode from "./components/WorkoutMode.jsx";
import Mobility from "./components/Mobility.jsx";
import Progress from "./components/Progress.jsx";
import Icon from "./components/Icon.jsx";
import useAltChoices from "./hooks/useAltChoices.js";
import usePersistedState from "./hooks/usePersistedState.js";
import { BLOCK } from "./data/programma.js";
import { BG, BG_GRADIENT, T1, T4, ACCENT, tint } from "./styles.js";

const NAV = [
  { key: "home", icon: "home", label: "Home" },
  { key: "sessions", icon: "sessions", label: "Sessioni" },
  { key: "progress", icon: "progress", label: "Progressi" },
  { key: "mobility", icon: "mobility", label: "Mobilità" },
];

// Grigio scuro con aloni arancioni molto tenui.
const bg = {
  position: "fixed", inset: 0, zIndex: 0,
  background: `
    radial-gradient(ellipse 85% 55% at 12% 0%,  rgba(255,122,0,.10) 0%, transparent 55%),
    radial-gradient(ellipse 70% 50% at 92% 96%, rgba(255,85,0,.08) 0%, transparent 55%),
    ${BG_GRADIENT}`,
};

// "Liquid glass" su grigio: vetro neutro, bordo luminoso, riflesso in alto.
const navBar = {
  position: "fixed", bottom: "max(20px, env(safe-area-inset-bottom))", left: "50%", transform: "translateX(-50%)",
  display: "flex", gap: 3, padding: 6, zIndex: 90,
  background: "linear-gradient(180deg, rgba(255,255,255,.13) 0%, rgba(255,255,255,.05) 100%)",
  backdropFilter: "blur(36px) saturate(180%)",
  WebkitBackdropFilter: "blur(36px) saturate(180%)",
  border: "1px solid rgba(255,255,255,.14)",
  borderRadius: 28,
  boxShadow: "0 14px 40px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.2), inset 0 -1px 0 rgba(255,255,255,.04)",
  maxWidth: "calc(100vw - 24px)",
};

export default function App() {
  const [nav, setNav] = useState("home");
  const [sel, setSel] = useState(null);
  const [workout, setWorkout] = useState(null);
  const alts = useAltChoices();
  // Rev. 6: blocco di 6 settimane, nuova chiave così si riparte dalla calibrazione.
  const [rawWeek, setWeek] = usePersistedState("sanifit.r6.week", 1);
  const week = Math.min(BLOCK.length, Math.max(1, Number(rawWeek) || 1));
  const block = BLOCK.find((b) => b.week === week) || BLOCK[0];
  const goSession = (s) => { setSel(s); setNav("detail"); };
  const goBack = () => { setSel(null); setNav("sessions"); };
  const exitWorkout = () => { setWorkout(null); setSel(null); setNav("home"); };
  const activeNav = nav === "detail" ? "sessions" : nav;

  return (
    <div style={{ minHeight: "100vh", background: BG, position: "relative", fontFamily: "system-ui,sans-serif", color: T1 }}>
      <div style={bg} />
      {workout && <WorkoutMode session={alts.resolveSession(workout)} block={block} onExit={exitWorkout} />}
      {!workout && (
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          {nav === "home" && <Home onSelect={goSession} week={week} setWeek={setWeek} block={block} />}
          {nav === "sessions" && !sel && <Sessions onSelect={goSession} />}
          {nav === "detail" && sel && <SessionDetail session={sel} alts={alts} onBack={goBack} onStart={() => setWorkout(sel)} />}
          {nav === "progress" && <Progress week={week} />}
          {nav === "mobility" && <Mobility />}

          {/* bottom nav */}
          <nav style={navBar} aria-label="Navigazione principale">
            {NAV.map((item) => {
              const active = activeNav === item.key;
              return (
                <button key={item.key}
                  aria-current={active ? "page" : undefined}
                  onClick={() => { setNav(item.key); if (item.key !== "sessions") setSel(null); }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    padding: "8px 10px", borderRadius: 22, cursor: "pointer", minHeight: 44,
                    border: active ? `1px solid ${tint(0.38)}` : "1px solid transparent",
                    background: active ? `linear-gradient(180deg, ${tint(0.26)}, ${tint(0.1)})` : "transparent",
                    boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,.25), 0 4px 14px rgba(2,8,23,.35)" : "none",
                    color: active ? ACCENT : T4,
                    fontSize: 10, fontWeight: active ? 700 : 500, fontFamily: "system-ui,sans-serif", minWidth: 60,
                  }}>
                  <Icon name={item.icon} size={22} stroke={active ? 2.1 : 1.8} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
