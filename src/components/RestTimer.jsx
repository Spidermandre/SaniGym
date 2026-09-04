import { useEffect } from "react";
import useTimer from "../hooks/useTimer.js";
import { S, T1, T4 } from "../styles.js";

export default function RestTimer({ seconds, onDone }) {
  const { time, running, start, reset, done } = useTimer(seconds);
  const r = 40, circ = 2 * Math.PI * r, offset = circ * (1 - time / seconds), hot = time <= 10;
  useEffect(() => { if (done && onDone) onDone(); }, [done]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", width: 104, height: 104 }}>
        <svg width="104" height="104" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="52" cy="52" r={r} fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="6" />
          <circle cx="52" cy="52" r={r} fill="none"
            stroke={hot ? "#ff4d4d" : "#4ff5e2"} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset .25s linear" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: hot ? "#ff4d4d" : T1, lineHeight: 1 }}>{time}</span>
          <span style={{ fontSize: 9, color: T4, letterSpacing: ".06em" }}>SEC</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {!running
          ? <button onClick={() => start()} style={S.btnGreen}>▶ Avvia recupero</button>
          : <button onClick={() => reset()} style={S.btnGhost}>✕ Reset</button>}
      </div>
    </div>
  );
}
