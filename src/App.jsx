import { useState } from "react";
import Home from "./components/Home.jsx";
import Sessions from "./components/Sessions.jsx";
import SessionDetail from "./components/SessionDetail.jsx";
import WorkoutMode from "./components/WorkoutMode.jsx";
import Mobility from "./components/Mobility.jsx";
import useAltChoices from "./hooks/useAltChoices.js";
import usePersistedState from "./hooks/usePersistedState.js";
import { BLOCK } from "./data/programma.js";
import { T1, T4 } from "./styles.js";

const NAV = [
  { key: "home", icon: "🏠", label: "Home" },
  { key: "sessions", icon: "💪", label: "Sessioni" },
  { key: "mobility", icon: "🧘", label: "Mobilità" },
];

const bg = {
  position: "fixed", inset: 0, zIndex: 0,
  background: `
    radial-gradient(ellipse 85% 60% at 12% 0%,  rgba(99,102,241,.12) 0%, transparent 55%),
    radial-gradient(ellipse 65% 55% at 88% 85%, rgba(20,184,166,.11) 0%, transparent 50%),
    radial-gradient(ellipse 55% 45% at 60% 30%, rgba(236,72,153,.08) 0%, transparent 48%),
    linear-gradient(180deg, #f8f9fd 0%, #eef1f8 100%)`,
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
    <div style={{ minHeight: "100vh", background: "#f8f9fd", position: "relative", fontFamily: "system-ui,sans-serif", color: T1 }}>
      <div style={bg} />
      {workout && <WorkoutMode session={alts.resolveSession(workout)} block={block} onExit={exitWorkout} />}
      {!workout && (
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          {nav === "home" && <Home onSelect={goSession} week={week} setWeek={setWeek} block={block} />}
          {nav === "sessions" && !sel && <Sessions onSelect={goSession} />}
          {nav === "detail" && sel && <SessionDetail session={sel} alts={alts} onBack={goBack} onStart={() => setWorkout(sel)} />}
          {nav === "mobility" && <Mobility />}

          {/* bottom nav */}
          <div style={{
            position: "fixed", bottom: "max(20px, env(safe-area-inset-bottom))", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 3, padding: 6, zIndex: 90,
            background: "rgba(255,255,255,.80)",
            backdropFilter: "blur(36px) saturate(200%)",
            WebkitBackdropFilter: "blur(36px) saturate(200%)",
            border: "1px solid rgba(17,21,28,.08)",
            borderRadius: 26,
            boxShadow: "0 12px 40px rgba(17,21,28,.14), inset 0 1px 0 rgba(255,255,255,.9)",
          }}>
            {NAV.map((item) => (
              <button key={item.key}
                onClick={() => { setNav(item.key); if (item.key !== "sessions") setSel(null); }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                  padding: "9px 18px", borderRadius: 20, cursor: "pointer",
                  border: activeNav === item.key ? "1px solid rgba(17,21,28,.1)" : "1px solid transparent",
                  background: activeNav === item.key ? "rgba(17,21,28,.06)" : "transparent",
                  color: activeNav === item.key ? T1 : T4,
                  fontSize: 10, fontWeight: 500, fontFamily: "system-ui,sans-serif", minWidth: 62,
                }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
