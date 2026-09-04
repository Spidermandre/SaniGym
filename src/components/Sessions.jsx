import { PROGRAM_META, SESSIONS } from "../data/programma.js";
import { S, T1, T3, T4, grad, color0 } from "../styles.js";

export default function Sessions({ onSelect }) {
  return (
    <div style={S.page}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, color: T1 }}>Sessioni</h1>
      <p style={{ color: T3, fontSize: 13, marginBottom: 24 }}>{PROGRAM_META.split}</p>
      {SESSIONS.map((s) => (
        <div key={s.id} style={{ ...S.glass, padding: "16px 18px", marginBottom: 11, cursor: "pointer" }} onClick={() => onSelect(s)}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div style={{ width: 48, height: 48, borderRadius: 13, background: grad(s), flexShrink: 0, boxShadow: `0 0 20px ${color0(s)}55` }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: T1 }}>{s.label} <span style={{ color: T3, fontWeight: 400, fontSize: 13 }}>— {s.subtitle}</span></div>
              <div style={{ fontSize: 12, color: T3, marginTop: 3 }}>{s.day} · {s.exercises.length} esercizi · {s.tag}</div>
            </div>
            <span style={{ fontSize: 18, color: T4 }}>›</span>
          </div>
        </div>
      ))}
    </div>
  );
}
