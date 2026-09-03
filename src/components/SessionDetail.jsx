import { S, T1, T3, T4, grad } from "../styles.js";
import { resolveExercise } from "../hooks/useAltChoices.js";

export default function SessionDetail({ session, alts, onBack, onStart }) {
  const g = grad(session);
  const totalSets = session.exercises.reduce((a, e) => a + e.sets, 0);
  return (
    <div style={{ overflowY: "auto", paddingBottom: 110 }}>
      <div style={{ background: g, padding: "52px 20px 28px", borderRadius: "0 0 28px 28px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.12)", borderRadius: "0 0 28px 28px" }} />
        <div style={{ position: "relative", zIndex: 1, color: "#fff" }}>
          <button style={{ ...S.iconBtnOnColor, marginBottom: 18 }} onClick={onBack} aria-label="Indietro">←</button>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.8)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 5 }}>{session.day}</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 4 }}>{session.emoji} {session.label}</h1>
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: 15, marginBottom: 14 }}>{session.subtitle}</p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {[session.tag, `${session.exercises.length} esercizi`, `${totalSets} serie totali`].map((t) => (
              <div key={t} style={{ ...S.pill, background: "rgba(255,255,255,.22)", borderColor: "rgba(255,255,255,.35)", color: "#fff" }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 16px 0" }}>
        <button style={{ ...S.btnGrad(g), width: "100%", marginBottom: 18, fontSize: 16, padding: "17px" }} onClick={onStart}>▶  Inizia sessione guidata</button>
        {session.exercises.map((raw, i) => {
          const useAlt = alts.isAlt(session.id, i);
          const ex = resolveExercise(raw, useAlt);
          return (
          <div key={i} style={{ ...S.glass, padding: "15px 16px", marginBottom: 10, borderColor: useAlt ? "rgba(99,102,241,.35)" : undefined }}>
            <div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: g, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0, color: "#fff" }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, color: T1 }}>{ex.name}</div>
                {ex.focus && <div style={{ fontSize: 12, color: T4, marginBottom: 6 }}>{ex.focus}</div>}
                <div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: T3 }}>📊 {ex.sets} × {ex.reps}</span>
                  <span style={{ fontSize: 12, color: T3 }}>⏱ {ex.rest}''</span>
                  {ex.tempo && <span style={{ fontSize: 12, color: T3 }} title="eccentrica-pausa-concentrica (secondi)">🎵 tempo {ex.tempo}</span>}
                  {ex.weight && <span style={{ fontSize: 12, fontWeight: 700, color: "#0369a1" }}>🏋️ {ex.weight}</span>}
                </div>
                <p style={{ fontSize: 12, color: T3, lineHeight: 1.55 }}>{ex.note}</p>
                {raw.alt && (
                  <button onClick={() => alts.toggleAlt(session.id, i)} style={{ ...S.btnGhost, marginTop: 10, padding: "8px 14px", fontSize: 12, minHeight: 44,
                    ...(useAlt ? { background: "rgba(99,102,241,.08)", borderColor: "rgba(99,102,241,.25)", color: "#4338ca" } : {}) }}>
                    {useAlt ? "↩ Originale" : "↔ Alternativa"}
                  </button>
                )}
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
