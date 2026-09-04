import { useMemo } from "react";
import { SESSIONS, BLOCK } from "../data/programma.js";
import useWeightLog, { fmtDate } from "../hooks/useWeightLog.js";
import { S, T1, T2, T3, T4, ACCENT, grad, color0 } from "../styles.js";

const fmtKg = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, ""));

function Delta({ value, color }) {
  if (value == null) return <span style={{ fontSize: 11, color: T4 }}>prima volta</span>;
  if (value === 0) return <span style={{ fontSize: 11, color: T3 }}>= stesso carico</span>;
  const up = value > 0;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: up ? color : "#ff8a8a" }}>
      {up ? "▲" : "▼"} {up ? "+" : ""}{fmtKg(value)} kg
    </span>
  );
}

export default function Progress({ week }) {
  const { history, historyFor } = useWeightLog();
  const block = BLOCK.find((b) => b.week === week) || BLOCK[0];

  const stats = useMemo(() => {
    const days = new Set(history.map((h) => (h.date || "").slice(0, 10)));
    const keys = new Set(history.map((h) => h.key));
    const lastDate = history.reduce((m, h) => (h.date > m ? h.date : m), "");
    return { workouts: days.size, exercises: keys.size, lastDate };
  }, [history]);

  // Per ogni sessione, gli esercizi che hanno almeno una voce nel registro.
  const sections = SESSIONS.map((s) => {
    const rows = [];
    s.exercises.forEach((ex, i) => {
      for (const variant of ["main", "alt"]) {
        const key = `${s.id}:${i}:${variant}`;
        const hist = historyFor(key);
        if (!hist.length) continue;
        const last = hist[hist.length - 1];
        const prev = hist.length > 1 ? hist[hist.length - 2] : null;
        const best = Math.max(...hist.map((h) => h.weight));
        const name = last.name || (variant === "alt" && ex.alt ? ex.alt.name : ex.name);
        rows.push({ key, name, variant, last, prev, best, count: hist.length, suggested: variant === "alt" && ex.alt ? ex.alt.weight : ex.weight });
      }
    });
    return { session: s, rows };
  }).filter((sec) => sec.rows.length);

  return (
    <div style={S.page}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, color: T1 }}>Progressi</h1>
      <p style={{ color: T3, fontSize: 13, marginBottom: 20 }}>Registro carichi · Settimana {week}/{BLOCK.length} · {block.label}</p>

      {/* riepilogo */}
      <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
        {[
          ["Allenamenti", stats.workouts],
          ["Esercizi", stats.exercises],
          ["Ultimo", stats.lastDate ? fmtDate(stats.lastDate) : "—"],
        ].map(([k, v]) => (
          <div key={k} style={{ ...S.glassSm, flex: 1, textAlign: "center", padding: "12px 6px" }}>
            <div style={{ fontSize: 10, color: T4, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 3 }}>{k}</div>
            <div style={{ fontSize: 19, fontWeight: 800, color: ACCENT }}>{v}</div>
          </div>
        ))}
      </div>

      {!sections.length && (
        <div style={{ ...S.glass, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📈</div>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: T1 }}>Nessun carico registrato</h2>
          <p style={{ fontSize: 13, color: T3, lineHeight: 1.6 }}>
            Durante la sessione guidata scrivi il peso nel campo <strong style={{ color: T2 }}>Peso usato (kg)</strong>:
            a ogni set completato viene salvato qui. Vedrai l'ultimo carico, la variazione rispetto alla volta prima e il tuo massimo.
          </p>
        </div>
      )}

      {sections.map(({ session, rows }) => {
        const c = color0(session);
        return (
          <div key={session.id} style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 14, height: 14, borderRadius: 5, background: grad(session), boxShadow: `0 0 12px ${c}66` }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: T1 }}>{session.label}</div>
              <div style={{ fontSize: 12, color: T4 }}>· {session.subtitle}</div>
            </div>

            {rows.map((r) => (
              <div key={r.key} style={{ ...S.glass, padding: "13px 16px", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T1, lineHeight: 1.3 }}>
                      {r.name}
                      {r.variant === "alt" && <span style={{ ...S.pill, marginLeft: 8, padding: "1px 8px", fontSize: 9, color: c, borderColor: `${c}55`, background: `${c}1a` }}>alt</span>}
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 5, alignItems: "baseline" }}>
                      <Delta value={r.prev ? r.last.weight - r.prev.weight : null} color={c} />
                      <span style={{ fontSize: 11, color: T4 }}>{fmtDate(r.last.date)} · {r.count} {r.count === 1 ? "sessione" : "sessioni"}</span>
                    </div>
                    <div style={{ fontSize: 11, color: T4, marginTop: 3 }}>
                      Max {fmtKg(r.best)} kg{r.suggested ? ` · consigliato ${r.suggested}` : ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: c, lineHeight: 1 }}>{fmtKg(r.last.weight)}</div>
                    <div style={{ fontSize: 10, color: T4, letterSpacing: ".05em" }}>KG</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
