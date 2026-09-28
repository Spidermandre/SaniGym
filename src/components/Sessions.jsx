import { PROGRAM_META, SESSIONS } from "../data/programma.js";
import Icon, { iconForSession } from "./Icon.jsx";
import { S, T3, T4, TIFFANY } from "../styles.js";

export default function Sessions({ onSelect }) {
  return (
    <div style={S.page}>
      <h1 style={S.h1}>Sessioni</h1>
      <p style={{ color: T3, fontSize: 13, marginBottom: 24 }}>{PROGRAM_META.split}</p>
      {SESSIONS.map((s) => (
        <div key={s.id} style={{ ...S.glass, padding: "16px 18px", marginBottom: 11, cursor: "pointer" }} onClick={() => onSelect(s)}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div style={S.iconTile(50, 15)}><Icon name={iconForSession(s)} size={26} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: TIFFANY }}>{s.label} <span style={{ color: T3, fontWeight: 400, fontSize: 13 }}>— {s.subtitle}</span></div>
              <div style={{ fontSize: 12, color: T3, marginTop: 3 }}>{s.day} · {s.exercises.length} esercizi · {s.tag}</div>
            </div>
            <span style={{ color: T4 }}><Icon name="chevR" size={18} /></span>
          </div>
        </div>
      ))}
    </div>
  );
}
