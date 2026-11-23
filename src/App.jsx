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
import { BG, BG_GRADIENT, T1, ACCENT, INK, FONT_BODY, FONT_ARCADE, tint } from "./styles.js";

const NAV = [
  { key: "home", icon: "home", label: "Home" },
  { key: "sessions", icon: "sessions", label: "Sessioni" },
  { key: "progress", icon: "progress", label: "Progressi" },
  { key: "mobility", icon: "mobility", label: "Mobilità" },
];

// Nero con un alone verde in alto e linee di scansione appena visibili, come un monitor CRT.
const bg = {
  position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
  background: `
    repeating-linear-gradient(180deg, rgba(57,255,20,.035) 0px, rgba(57,255,20,.035) 1px, transparent 1px, transparent 3px),
    ${BG_GRADIENT}`,
};

// Barra di navigazione: pannello nero con cornice verde; la voce attiva è piena.
const navBar = {
  position: "fixed", bottom: "max(18px, env(safe-area-inset-bottom))", left: "50%", transform: "translateX(-50%)",
  display: "flex", gap: 4, padding: 5, zIndex: 90,
  background: "#000",
  border: `2px solid ${tint(0.7)}`,
  borderRadius: 6,
  boxShadow: `0 0 0 4px #000, 0 0 22px ${tint(0.3)}`,
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
    <div style={{ minHeight: "100vh", background: BG, position: "relative", fontFamily: FONT_BODY, color: T1 }}>
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
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    padding: "8px 6px 7px", borderRadius: 3, cursor: "pointer", minHeight: 52, minWidth: 64,
                    border: "none",
                    background: active ? ACCENT : "transparent",
                    boxShadow: active ? `0 0 14px ${tint(0.5)}` : "none",
                    color: active ? INK : tint(0.72),
                    fontFamily: FONT_ARCADE, fontSize: 7, letterSpacing: 0,
                  }}>
                  <Icon name={item.icon} size={24} glow={!active} />
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
