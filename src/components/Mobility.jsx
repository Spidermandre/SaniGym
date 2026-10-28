import { useState } from "react";
import { MOBILITY } from "../data/programma.js";
import Icon from "./Icon.jsx";
import { S, T1, T2, T3, T4, INK, ACCENT, ACCENT_GRAD, tint } from "../styles.js";

export default function Mobility() {
  const [tab, setTab] = useState("pre");
  const [checked, setChecked] = useState({});
  const toggle = (k) => setChecked((p) => ({ ...p, [k]: !p[k] }));
  const tabs = [
    { key: "pre", icon: "warmup", label: "Pre" },
    { key: "post", icon: "stretch", label: "Post" },
    { key: "rest", icon: "rest", label: "Riposo" },
  ];
  const tips = {
    pre: "Esegui nell'ordine indicato. Movimenti lenti e controllati. Inizia sempre con il calore sul trapezio destro.",
    post: "Mantieni ogni posizione senza rimbalzi. Respira profondamente. Mai oltre la soglia del fastidio.",
    rest: "Solo se assenza totale di sintomi. Il nerve glide va eseguito con la massima delicatezza.",
  };
  const items = MOBILITY[tab];
  const doneCount = items.filter((_, i) => checked[`${tab}-${i}`]).length;
  const tabIcon = tabs.find((t) => t.key === tab).icon;

  return (
    <div style={S.page}>
      <h1 style={S.h1}>Mobilità & Stretching</h1>
      <p style={{ color: T3, fontSize: 13, marginBottom: 20 }}>Protocollo cervicale + plesso brachiale</p>

      <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 16, background: "rgba(255,255,255,.04)", border: `1px solid ${tint(0.14)}`, marginBottom: 18 }}>
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button key={t.key} onClick={() => { setTab(t.key); setChecked({}); }} style={{
              flex: 1, padding: "10px 0", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, minHeight: 44,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              border: active ? `1px solid ${tint(0.4)}` : "1px solid transparent",
              background: active ? `linear-gradient(180deg, ${tint(0.24)}, ${tint(0.1)})` : "transparent",
              boxShadow: active ? "0 2px 10px rgba(2,8,23,.35), inset 0 1px 0 rgba(255,255,255,.18)" : "none",
              color: active ? ACCENT : T3, fontFamily: "system-ui,sans-serif",
            }}><Icon name={t.icon} size={17} /> {t.label}</button>
          );
        })}
      </div>

      <div style={{ ...S.glass, padding: "13px 16px", marginBottom: 16, background: tint(0.09), borderColor: tint(0.3) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={S.iconTile(40, 13)}><Icon name={tabIcon} size={21} /></div>
          <p style={{ fontSize: 13, color: T2, lineHeight: 1.5, flex: 1 }}>{tips[tab]}</p>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: ACCENT }}>{doneCount}/{items.length}</div>
            <div style={{ fontSize: 10, color: T4 }}>fatto</div>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 99, height: 4, marginTop: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 99, background: ACCENT_GRAD, width: `${(doneCount / items.length) * 100}%`, transition: "width .5s ease" }} />
        </div>
      </div>

      {items.map((item, i) => {
        const k = `${tab}-${i}`, done = checked[k];
        return (
          <div key={k} style={{ ...S.glass, padding: "14px 16px", marginBottom: 10, opacity: done ? .55 : 1, transition: "opacity .3s" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <button onClick={() => toggle(k)} aria-label={done ? "Segna da fare" : "Segna fatto"} style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0, cursor: "pointer", padding: 0,
                border: `2px solid ${done ? ACCENT : tint(0.3)}`,
                background: done ? ACCENT_GRAD : "transparent", color: INK,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {done && <Icon name="check" size={20} stroke={2.8} />}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 5, color: T1, textDecoration: done ? "line-through" : "none" }}>{item.name}</div>
                <div style={{ ...S.pill, marginBottom: 7 }}><Icon name="clock" size={12} /> {item.dur}</div>
                <p style={{ fontSize: 12, color: T3, lineHeight: 1.5 }}>{item.tech}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
