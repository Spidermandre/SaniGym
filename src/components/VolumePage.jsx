import { VOLUME, PROGRAM_META } from "../data/programma.js";
import { S, T1, T2, T3, T4, ACCENT, tint } from "../styles.js";

// Volume settimanale diretto per gruppo muscolare (dati VOLUME della scheda).
export default function VolumePage() {
  const total = VOLUME.reduce((a, v) => a + v.sets, 0);
  return (
    <div>
      <div style={{ ...S.glassSm, padding: "12px 14px", marginBottom: 14, display: "flex", alignItems: "baseline", gap: 10 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: ACCENT, lineHeight: 1 }}>{total}</div>
        <div style={{ fontSize: 12, color: T3, lineHeight: 1.4 }}>serie dirette a settimana · {PROGRAM_META.split}</div>
      </div>
      {VOLUME.map((v) => (
        <div key={v.muscle} style={{ ...S.glass, padding: "13px 16px", marginBottom: 8, ...(v.priority ? { borderColor: tint(0.4) } : {}) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: T1 }}>{v.muscle}</span>
                {v.priority && <span style={{ ...S.pill, padding: "2px 9px", fontSize: 10, background: tint(0.2), borderColor: tint(0.55) }}>Priorità</span>}
              </div>
              <div style={{ fontSize: 11, color: T4, marginTop: 2 }}>su {v.sessions} {v.sessions === 1 ? "seduta" : "sedute"}</div>
              <p style={{ fontSize: 12, color: T2, lineHeight: 1.5, marginTop: 5 }}>{v.note}</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: ACCENT, lineHeight: 1 }}>{v.sets}</div>
              <div style={{ fontSize: 10, color: T4, letterSpacing: ".04em" }}>SERIE/SETT</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
