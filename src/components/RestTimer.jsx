import { useEffect } from "react";
import useTimer from "../hooks/useTimer.js";
import Icon from "./Icon.jsx";
import { S, T4, ACCENT, WARN, FONT_ARCADE, GLOW, tint, warnTint } from "../styles.js";

export default function RestTimer({ seconds, onDone }) {
  const { time, running, start, reset, done } = useTimer(seconds);
  const r = 40, circ = 2 * Math.PI * r, offset = circ * (1 - time / seconds), hot = time <= 10;
  const color = hot ? WARN : ACCENT;
  // Il recupero parte da solo: in palestra il set finisce quando premi il pulsante.
  useEffect(() => { start(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (done && onDone) onDone(); }, [done]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div style={{ position: "relative", width: 132, height: 132 }}>
        <svg width="132" height="132" viewBox="0 0 104 104" style={{ transform: "rotate(-90deg)" }}>
          {/* corona a tacche, come un indicatore da cabinato */}
          <circle cx="52" cy="52" r={r} fill="none" stroke={tint(0.2)} strokeWidth="8" strokeDasharray="3 2.24" />
          <circle cx="52" cy="52" r={r} fill="none"
            stroke={color} strokeWidth="8" strokeLinecap="butt"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset .25s linear", filter: `drop-shadow(0 0 5px ${hot ? warnTint(0.6) : tint(0.6)})` }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <span style={{ fontFamily: FONT_ARCADE, fontSize: 24, color, lineHeight: 1, textShadow: hot ? `0 0 8px ${warnTint(0.6)}` : GLOW }}>{time}</span>
          <span style={{ fontFamily: FONT_ARCADE, fontSize: 8, color: T4, letterSpacing: ".1em" }}>SEC</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {running
          ? <button onClick={() => reset()} style={S.btnGhost}><Icon name="restart" size={12} /> Ricomincia</button>
          : <button onClick={() => start()} style={S.btnGrad()}><Icon name="play" size={12} glow={false} /> Riavvia</button>}
      </div>
    </div>
  );
}
