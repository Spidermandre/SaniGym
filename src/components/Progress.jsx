import { useMemo, useState } from "react";
import { SESSIONS, BLOCK } from "../data/programma.js";
import useWeightLog, { fmtDate } from "../hooks/useWeightLog.js";
import Icon, { iconForSession } from "./Icon.jsx";
import VolumePage from "./VolumePage.jsx";
import { fmtWeight } from "../lib/weights.js";
import { S, T1, T2, T3, T4, ACCENT, WARN, tint } from "../styles.js";

const SIDE_LABEL = { dx: "destro", sx: "sinistro" };

function Delta({ value }) {
  if (value == null) return <span style={{ fontSize: 11, color: T4 }}>prima volta</span>;
  if (value === 0) return <span style={{ fontSize: 11, color: T3 }}>= stesso carico</span>;
  const up = value > 0;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: up ? ACCENT : WARN }}>
      {up ? "▲" : "▼"} {up ? "+" : ""}{fmtWeight(value)} kg
    </span>
  );
}

function Row({ r }) {
  return (
    <div style={{ ...S.glass, padding: "13px 16px", marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T1, lineHeight: 1.3 }}>
            {r.name}
            {r.variant === "alt" && <span style={{ ...S.pill, marginLeft: 8, padding: "1px 8px", fontSize: 9 }}>alt</span>}
            {r.side && <span style={{ ...S.pill, marginLeft: 8, padding: "1px 8px", fontSize: 9 }}>{SIDE_LABEL[r.side]}</span>}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 5, alignItems: "baseline" }}>
            <Delta value={r.prev ? r.last.weight - r.prev.weight : null} />
            <span style={{ fontSize: 11, color: T4 }}>{fmtDate(r.last.date)} · {r.count} {r.count === 1 ? "sessione" : "sessioni"}</span>
          </div>
          <div style={{ fontSize: 11, color: T4, marginTop: 3 }}>
            Max {fmtWeight(r.best)} kg{r.suggested ? ` · consigliato ${r.suggested}` : ""}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: ACCENT, lineHeight: 1 }}>{fmtWeight(r.last.weight)}</div>
          <div style={{ fontSize: 10, color: T4, letterSpacing: ".05em" }}>KG</div>
        </div>
      </div>
    </div>
  );
}

function summarize(hist, extra) {
  const last = hist[hist.length - 1];
  const prev = hist.length > 1 ? hist[hist.length - 2] : null;
  const best = Math.max(...hist.map((h) => h.weight));
  return { last, prev, best, count: hist.length, ...extra };
}

// Chiavi del registro che appartengono alla scheda attuale.
const CURRENT_KEYS = new Set();
SESSIONS.forEach((s) => s.exercises.forEach((ex, i) => {
  for (const variant of ["main", "alt"]) {
    for (const side of ex.asymmetric ? ["dx", "sx"] : [null]) CURRENT_KEYS.add(`${s.id}:${i}:${variant}${side ? `:${side}` : ""}`);
  }
}));

export default function Progress({ week }) {
  const [tab, setTab] = useState("carichi");
  const { history, historyFor } = useWeightLog();
  const block = BLOCK.find((b) => b.week === week) || BLOCK[0];

  const stats = useMemo(() => {
    const days = new Set(history.map((h) => (h.date || "").slice(0, 10)));
    const names = new Set(history.map((h) => `${h.name || h.key}:${h.side || ""}`));
    const lastDate = history.reduce((m, h) => (h.date > m ? h.date : m), "");
    return { workouts: days.size, exercises: names.size, lastDate };
  }, [history]);

  // Scheda attuale: per ogni sessione gli esercizi con almeno una voce (per variante e lato).
  const sections = SESSIONS.map((s) => {
    const rows = [];
    s.exercises.forEach((ex, i) => {
      for (const variant of ["main", "alt"]) {
        for (const side of ex.asymmetric ? ["dx", "sx"] : [null]) {
          const key = `${s.id}:${i}:${variant}${side ? `:${side}` : ""}`;
          const hist = historyFor(key);
          if (!hist.length) continue;
          const name = hist[hist.length - 1].name || (variant === "alt" && ex.alt ? ex.alt.name : ex.name);
          rows.push(summarize(hist, { key, name, variant, side, suggested: variant === "alt" && ex.alt ? ex.alt.weight : ex.weight }));
        }
      }
    });
    return { session: s, rows };
  }).filter((sec) => sec.rows.length);

  // Voci registrate con una revisione precedente della scheda: restano consultabili.
  const archive = [...new Set(history.map((h) => h.key))]
    .filter((k) => k && !CURRENT_KEYS.has(k))
    .map((key) => {
      const hist = historyFor(key);
      const l = hist[hist.length - 1];
      return summarize(hist, { key, name: l.name || key, variant: key.includes(":alt") ? "alt" : "main", side: l.side || null });
    })
    .sort((a, b) => b.last.date.localeCompare(a.last.date));

  const segBtn = (key, label, icon) => {
    const active = tab === key;
    return (
      <button key={key} onClick={() => setTab(key)} aria-pressed={active} style={{
        flex: 1, minHeight: 44, borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "system-ui,sans-serif",
        border: active ? `1px solid ${tint(0.45)}` : "1px solid transparent",
        background: active ? `linear-gradient(180deg, ${tint(0.24)}, ${tint(0.1)})` : "transparent",
        color: active ? ACCENT : T3,
      }}><Icon name={icon} size={17} /> {label}</button>
    );
  };

  return (
    <div style={S.page}>
      <h1 style={S.h1}>Progressi</h1>
      <p style={{ color: T3, fontSize: 13, marginBottom: 16 }}>Settimana {week}/{BLOCK.length} · {block.label}</p>

      <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 16, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", marginBottom: 18 }}>
        {segBtn("carichi", "Carichi", "progress")}
        {segBtn("volume", "Volume", "sets")}
      </div>

      {tab === "volume" ? <VolumePage /> : (
        <>
          {/* riepilogo */}
          <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
            {[
              ["Allenamenti", stats.workouts],
              ["Esercizi", stats.exercises],
              ["Ultimo", stats.lastDate ? fmtDate(stats.lastDate) : "—"],
            ].map(([k, v]) => (
              <div key={k} style={{ ...S.glassSm, flex: 1, textAlign: "center", padding: "12px 6px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: tint(0.85), textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 19, fontWeight: 800, color: ACCENT }}>{v}</div>
              </div>
            ))}
          </div>

          {!sections.length && !archive.length && (
            <div style={{ ...S.glass, padding: 24, textAlign: "center" }}>
              <div style={{ ...S.iconTile(64, 20), margin: "0 auto 14px" }}><Icon name="progress" size={34} /></div>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: ACCENT }}>Nessun carico registrato</h2>
              <p style={{ fontSize: 13, color: T3, lineHeight: 1.6 }}>
                Durante la sessione guidata regola il peso con <strong style={{ color: T2 }}>−</strong> e <strong style={{ color: T2 }}>+</strong>:
                a ogni set completato viene salvato qui. Vedrai l'ultimo carico, la variazione rispetto alla volta prima e il tuo massimo.
              </p>
            </div>
          )}

          {sections.map(({ session, rows }) => (
            <div key={session.id} style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <div style={S.iconTile(28, 9)}><Icon name={iconForSession(session)} size={16} /></div>
                <div style={{ fontSize: 14, fontWeight: 800, color: ACCENT }}>{session.label}</div>
                <div style={{ fontSize: 12, color: T4, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>· {session.subtitle}</div>
              </div>
              {rows.map((r) => <Row key={r.key} r={r} />)}
            </div>
          ))}

          {archive.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <p style={{ ...S.sectionLabel, marginTop: 6 }}>Revisione precedente della scheda</p>
              <p style={{ fontSize: 12, color: T4, marginBottom: 10, lineHeight: 1.5 }}>Carichi registrati con la Rev. 5. Dove un esercizio è rimasto uguale, la sessione guidata riparte da questi valori.</p>
              {archive.map((r) => <Row key={r.key} r={r} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
