import { useState } from "react";
import { MOBILITY } from "../data/programma.js";
import Icon from "./Icon.jsx";
import { S, T1, T2, T3, T4, INK, ACCENT, ACCENT_GRAD, FONT_ARCADE, tint } from "../styles.js";

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

      <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 6, background: "#000", border: `2px solid ${tint(0.4)}`, marginBottom: 18 }}>
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button key={t.key} onClick={() => { setTab(t.key); setChecked({}); }} style={{
              flex: 1, padding: "10px 0", borderRadius: 3, cursor: "pointer", minHeight: 44,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              border: "none",
              background: active ? ACCENT : "transparent",
              boxShadow: active ? `0 0 14px ${tint(0.45)}` : "none",
              color: active ? INK : T3, fontFamily: FONT_ARCADE, fontSize: 10, fontWeight: 400,
            }}><Icon name={t.icon} size={12} glow={!active} /> {t.label}</button>
          );
        })}
      </div>

      <div style={{ ...S.glass, padding: "13px 16px", marginBottom: 16, background: tint(0.09), borderColor: tint(0.3) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={S.iconTile(40, 13)}><Icon name={tabIcon} size={21} /></div>
          <p style={{ fontSize: 13, color: T2, lineHeight: 1.5, flex: 1 }}>{tips[tab]}</p>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: FONT_ARCADE, fontSize: 16, color: ACCENT }}>{doneCount}/{items.length}</div>
            <div style={{ fontSize: 10, color: T4 }}>fatto</div>
          </div>
        </div>
        <div style={{ background: tint(0.12), borderRadius: 0, height: 4, marginTop: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 0, background: ACCENT, width: `${(doneCount / items.length) * 100}%`, transition: "width .5s ease" }} />
        </div>
      </div>

      {items.map((item, i) => {
        const k = `${tab}-${i}`, done = checked[k];
        return (
          <div key={k} style={{ ...S.glass, padding: "14px 16px", marginBottom: 10, opacity: done ? .55 : 1, transition: "opacity .3s" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <button onClick={() => toggle(k)} aria-label={done ? "Segna da fare" : "Segna fatto"} style={{
                width: 44, height: 44, borderRadius: 4, flexShrink: 0, cursor: "pointer", padding: 0,
                border: `2px solid ${done ? ACCENT : tint(0.3)}`,
                background: done ? ACCENT_GRAD : "transparent", color: INK,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {done && <Icon name="check" size={20} />}
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
