import { useState } from "react";
import Home from "./components/Home.jsx";
import Sessions from "./components/Sessions.jsx";
import SessionDetail from "./components/SessionDetail.jsx";
import WorkoutMode from "./components/WorkoutMode.jsx";
import Mobility from "./components/Mobility.jsx";
import Progress from "./components/Progress.jsx";
import useAltChoices from "./hooks/useAltChoices.js";
import usePersistedState from "./hooks/usePersistedState.js";
import { BLOCK } from "./data/programma.js";
import { BG, T1, T4 } from "./styles.js";

const NAV = [
  { key: "home", icon: "🏠", label: "Home" },
  { key: "sessions", icon: "💪", label: "Sessioni" },
  { key: "progress", icon: "📈", label: "Progressi" },
  { key: "mobility", icon: "🧘", label: "Mobilità" },
];

// Nero con aloni fluo molto tenui nei colori delle sessioni.
const bg = {
  position: "fixed", inset: 0, zIndex: 0,
  background: `
    radial-gradient(ellipse 80% 55% at 10% 0%,  rgba(198,255,77,.10) 0%, transparent 55%),
    radial-gradient(ellipse 65% 50% at 90% 90%, rgba(79,245,226,.10) 0%, transparent 50%),
    radial-gradient(ellipse 55% 45% at 60% 35%, rgba(92,225,255,.06) 0%, transparent 48%),
    ${BG}`,
};

// "Liquid glass": vetro scuro, bordo luminoso sottile, riflesso in alto.
const navBar = {
  position: "fixed", bottom: "max(20px, env(safe-area-inset-bottom))", left: "50%", transform: "translateX(-50%)",
  display: "flex", gap: 3, padding: 6, zIndex: 90,
  background: "linear-gradient(180deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.06) 100%)",
  backdropFilter: "blur(36px) saturate(200%)",
  WebkitBackdropFilter: "blur(36px) saturate(200%)",
  border: "1px solid rgba(255,255,255,.18)",
  borderRadius: 28,
  boxShadow: "0 12px 40px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(255,255,255,.06)",
  maxWidth: "calc(100vw - 24px)",
};

export default function App() {
  const [nav, setNav] = useState("home");
  const [sel, setSel] = useState(null);
  const [workout, setWorkout] = useState(null);
  const alts = useAltChoices();
  const [week, setWeek] = usePersistedState("sanifit.week", 1);
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
          <div style={navBar}>
            {NAV.map((item) => {
              const active = activeNav === item.key;
              return (
                <button key={item.key}
                  onClick={() => { setNav(item.key); if (item.key !== "sessions") setSel(null); }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                    padding: "9px 10px", borderRadius: 22, cursor: "pointer", minHeight: 44,
                    border: active ? "1px solid rgba(255,255,255,.22)" : "1px solid transparent",
                    background: active ? "linear-gradient(180deg, rgba(255,255,255,.20), rgba(255,255,255,.10))" : "transparent",
                    boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,.3), 0 4px 14px rgba(0,0,0,.35)" : "none",
                    color: active ? T1 : T4,
                    fontSize: 10, fontWeight: active ? 700 : 500, fontFamily: "system-ui,sans-serif", minWidth: 60,
                  }}>
                  <span style={{ fontSize: 20, filter: active ? "none" : "grayscale(.6) opacity(.75)" }}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
