import { useEffect } from "react";
import useTimer from "../hooks/useTimer.js";
import Icon from "./Icon.jsx";
import { S, T1, T4, ACCENT, WARN, tint, warnTint } from "../styles.js";

export default function RestTimer({ seconds, onDone }) {
  const { time, running, start, reset, done } = useTimer(seconds);
  const r = 40, circ = 2 * Math.PI * r, offset = circ * (1 - time / seconds), hot = time <= 10;
  // Il recupero parte da solo: in palestra il set finisce quando premi il pulsante.
  useEffect(() => { start(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (done && onDone) onDone(); }, [done]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", width: 112, height: 112 }}>
        <svg width="112" height="112" viewBox="0 0 104 104" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="52" cy="52" r={r} fill="none" stroke={tint(0.16)} strokeWidth="6" />
          <circle cx="52" cy="52" r={r} fill="none"
            stroke={hot ? WARN : ACCENT} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset .25s linear", filter: `drop-shadow(0 0 6px ${hot ? warnTint(0.5) : tint(0.45)})` }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: hot ? WARN : T1, lineHeight: 1 }}>{time}</span>
          <span style={{ fontSize: 9, color: T4, letterSpacing: ".06em" }}>SEC</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {running
          ? <button onClick={() => reset()} style={S.btnGhost}><Icon name="restart" size={16} stroke={2.1} /> Ricomincia</button>
          : <button onClick={() => start()} style={{ ...S.btnGrad(), padding: "11px 22px", fontSize: 14 }}><Icon name="play" size={14} /> Riavvia recupero</button>}
      </div>
    </div>
  );
}
