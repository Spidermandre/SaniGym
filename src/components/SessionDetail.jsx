import Icon, { iconForSession } from "./Icon.jsx";
import { S, T1, T2, T3, INK, TIFFANY, TIFFANY_GRAD, NAVY_TOP, tint } from "../styles.js";
import { resolveExercise } from "../hooks/useAltChoices.js";

const meta = { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: T3 };

export default function SessionDetail({ session, alts, onBack, onStart }) {
  const totalSets = session.exercises.reduce((a, e) => a + e.sets, 0);
  return (
    <div style={{ overflowY: "auto", paddingBottom: 110 }}>
      {/* header navy con alone tiffany e icona di tipologia */}
      <div style={{
        background: `radial-gradient(ellipse 90% 80% at 85% 10%, ${tint(0.28)} 0%, transparent 60%), linear-gradient(170deg, #143a6b 0%, ${NAVY_TOP} 100%)`,
        padding: "52px 20px 26px", borderRadius: "0 0 28px 28px", position: "relative",
        borderBottom: `1px solid ${tint(0.22)}`, boxShadow: "0 12px 30px rgba(2,8,23,.4)",
      }}>
        <div style={{ position: "absolute", right: 18, top: 50, ...S.iconTile(76, 24) }}>
          <Icon name={iconForSession(session)} size={42} stroke={1.8} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <button style={{ ...S.iconBtn, marginBottom: 18 }} onClick={onBack} aria-label="Indietro"><Icon name="back" size={20} stroke={2.2} /></button>
          <div style={{ fontSize: 11, fontWeight: 700, color: tint(0.75), letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 5 }}>{session.day}</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 4, color: TIFFANY }}>{session.label}</h1>
          <p style={{ color: T2, fontSize: 15, marginBottom: 14, paddingRight: 70 }}>{session.subtitle}</p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {[session.tag, `${session.exercises.length} esercizi`, `${totalSets} serie totali`].map((t) => (
              <div key={t} style={S.pill}>{t}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 16px 0" }}>
        <button style={{ ...S.btnGrad(), width: "100%", marginBottom: 18, fontSize: 16, padding: "17px" }} onClick={onStart}>
          <Icon name="play" size={16} /> Inizia sessione guidata
        </button>
        {session.exercises.map((raw, i) => {
          const useAlt = alts.isAlt(session.id, i);
          const ex = resolveExercise(raw, useAlt);
          return (
          <div key={i} style={{ ...S.glass, padding: "15px 16px", marginBottom: 10, ...(useAlt ? { borderColor: tint(0.45) } : {}) }}>
            <div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: TIFFANY_GRAD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0, color: INK }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, color: T1 }}>{ex.name}</div>
                {ex.focus && <div style={{ fontSize: 12, color: tint(0.8), marginBottom: 7 }}>{ex.focus}</div>}
                <div style={{ display: "flex", gap: 11, marginBottom: 7, flexWrap: "wrap" }}>
                  <span style={meta}><Icon name="sets" size={14} />{ex.sets} × {ex.reps}</span>
                  <span style={meta}><Icon name="clock" size={14} />{ex.rest}''</span>
                  {ex.tempo && <span style={meta} title="eccentrica-pausa-concentrica (secondi)"><Icon name="tempo" size={14} />tempo {ex.tempo}</span>}
                  {ex.weight && <span style={{ ...meta, fontWeight: 700, color: TIFFANY }}><Icon name="dumbbell" size={14} />{ex.weight}</span>}
                </div>
                <p style={{ fontSize: 12, color: T3, lineHeight: 1.55 }}>{ex.note}</p>
                {raw.alt && (
                  <button onClick={() => alts.toggleAlt(session.id, i)} style={{ ...S.btnGhost, marginTop: 10, padding: "8px 14px", fontSize: 12,
                    ...(useAlt ? { background: tint(0.2), borderColor: tint(0.55) } : {}) }}>
                    <Icon name={useAlt ? "undo" : "swap"} size={15} /> {useAlt ? "Originale" : "Alternativa"}
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
