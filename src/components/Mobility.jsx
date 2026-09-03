import { useState } from "react";
import { MOBILITY } from "../data/programma.js";
import { S, T1, T2, T3, T4 } from "../styles.js";

export default function Mobility() {
  const [tab, setTab] = useState("pre");
  const [checked, setChecked] = useState({});
  const toggle = (k) => setChecked((p) => ({ ...p, [k]: !p[k] }));
  const tabs = [{ key: "pre", emoji: "🔥", label: "Pre" }, { key: "post", emoji: "🧘", label: "Post" }, { key: "rest", emoji: "🌿", label: "Riposo" }];
  const palette = { pre: ["#fb923c", "#9a3412"], post: ["#a78bfa", "#4338ca"], rest: ["#34d399", "#065f46"] };
  const tips = {
    pre: "Esegui nell'ordine indicato. Movimenti lenti e controllati. Inizia sempre con il calore sul trapezio destro.",
    post: "Mantieni ogni posizione senza rimbalzi. Respira profondamente. Mai oltre la soglia del fastidio.",
    rest: "Solo se assenza totale di sintomi. Il nerve glide va eseguito con la massima delicatezza.",
  };
  const [c0, c1] = palette[tab];
  const g = `linear-gradient(135deg,${c0},${c1})`;
  const items = MOBILITY[tab];
  const doneCount = items.filter((_, i) => checked[`${tab}-${i}`]).length;

  return (
    <div style={S.page}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, color: T1 }}>Mobilità & Stretching</h1>
      <p style={{ color: T3, fontSize: 13, marginBottom: 20 }}>Protocollo cervicale + plesso brachiale</p>

      <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 16, background: "rgba(17,21,28,.04)", border: "1px solid rgba(17,21,28,.07)", marginBottom: 18 }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => { setTab(t.key); setChecked({}); }} style={{
            flex: 1, padding: "11px 0", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 600, minHeight: 44,
            border: tab === t.key ? "1px solid rgba(17,21,28,.1)" : "1px solid transparent",
            background: tab === t.key ? "#ffffff" : "transparent",
            boxShadow: tab === t.key ? "0 2px 10px rgba(17,21,28,.08)" : "none",
            color: tab === t.key ? T1 : T3, fontFamily: "system-ui,sans-serif",
          }}>{t.emoji} {t.label}</button>
        ))}
      </div>

      <div style={{ ...S.glass, padding: "13px 16px", marginBottom: 16, background: `${c0}14`, borderColor: `${c0}30` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: T2, lineHeight: 1.5, flex: 1 }}>{tips[tab]}</p>
          <div style={{ marginLeft: 12, textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, background: g, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{doneCount}/{items.length}</div>
            <div style={{ fontSize: 10, color: T4 }}>fatto</div>
          </div>
        </div>
        <div style={{ background: "rgba(17,21,28,.07)", borderRadius: 99, height: 4, marginTop: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 99, background: g, width: `${(doneCount / items.length) * 100}%`, transition: "width .5s ease" }} />
        </div>
      </div>

      {items.map((item, i) => {
        const k = `${tab}-${i}`, done = checked[k];
        return (
          <div key={k} style={{ ...S.glass, padding: "14px 16px", marginBottom: 10, opacity: done ? .55 : 1, transition: "opacity .3s" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <button onClick={() => toggle(k)} aria-label={done ? "Segna da fare" : "Segna fatto"} style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0, cursor: "pointer", padding: 0,
                border: `2px solid ${done ? c0 : "rgba(17,21,28,.15)"}`,
                background: done ? g : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {done && <span style={{ fontSize: 16, color: "#fff", fontWeight: 800 }}>✓</span>}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: T1, textDecoration: done ? "line-through" : "none" }}>{item.name}</div>
                <div style={{ ...S.pill, marginBottom: 7 }}>⏱ {item.dur}</div>
                <p style={{ fontSize: 12, color: T3, lineHeight: 1.5 }}>{item.tech}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
