// Tema scuro: sfondo nero, colori fluo per sessione, "liquid glass" per nav e card.
export const BG = "#000000";
export const T1 = "#f4f6f8";
export const T2 = "rgba(244,246,248,.72)";
export const T3 = "rgba(244,246,248,.52)";
export const T4 = "rgba(244,246,248,.36)";
// Inchiostro scuro per testi sopra i gradienti fluo (contrasto).
export const INK = "#06110a";
// Accento generico (celeste fluo) per pesi e valori numerici.
export const ACCENT = "#5ce1ff";

// Colori per sessione. Sovrascrivono grad/emoji di programma.js senza toccare i dati.
export const THEME = {
  pushA: { grad: ["#c6ff4d", "#7ddc00"], emoji: "🟢", ink: INK },   // verde fluo chiaro
  pushB: { grad: ["#2eea6a", "#0a9e3f"], emoji: "🟩", ink: INK },   // verde fluo scuro
  pullA: { grad: ["#5ce1ff", "#00a8e0"], emoji: "🔵", ink: INK },   // celeste fluo
  pullB: { grad: ["#4ff5e2", "#0abab5"], emoji: "💠", ink: INK },   // tiffany fluo
};

export const themeOf = (s) => THEME[s.id] || { grad: s.grad, emoji: s.emoji, ink: INK };
export const grad = (s) => { const t = themeOf(s); return `linear-gradient(135deg,${t.grad[0]},${t.grad[1]})`; };
export const color0 = (s) => themeOf(s).grad[0];
export const emojiOf = (s) => themeOf(s).emoji;

const glassBase = {
  background: "rgba(255,255,255,.06)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
  border: "1px solid rgba(255,255,255,.12)",
  boxShadow: "0 10px 36px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.14)",
  color: T1,
};

export const S = {
  glass: { ...glassBase, borderRadius: 22 },
  glassSm: {
    ...glassBase,
    background: "rgba(255,255,255,.05)",
    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter: "blur(18px) saturate(160%)",
    border: "1px solid rgba(255,255,255,.10)",
    borderRadius: 14,
    boxShadow: "0 4px 18px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.10)",
  },
  pill: {
    display: "inline-flex", alignItems: "center",
    padding: "4px 12px", borderRadius: 99,
    fontSize: 11, fontWeight: 600, letterSpacing: ".04em",
    background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)",
    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    color: T1,
  },
  // Pill sopra un gradiente fluo: inchiostro scuro.
  pillOnColor: {
    display: "inline-flex", alignItems: "center",
    padding: "4px 12px", borderRadius: 99,
    fontSize: 11, fontWeight: 700, letterSpacing: ".04em",
    background: "rgba(0,0,0,.16)", border: "1px solid rgba(0,0,0,.18)",
    color: INK,
  },
  iconBtn: {
    width: 44, height: 44, borderRadius: "50%",
    border: "1px solid rgba(255,255,255,.14)", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
    background: "rgba(255,255,255,.10)", color: T1,
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 2px 10px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.16)",
  },
  iconBtnOnColor: {
    width: 44, height: 44, borderRadius: "50%",
    border: "1px solid rgba(0,0,0,.18)", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
    background: "rgba(0,0,0,.16)", color: INK,
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
  },
  btnGrad: (g, ink = INK) => ({
    padding: "14px 24px", borderRadius: 14, border: "none", cursor: "pointer",
    fontSize: 15, fontWeight: 800, color: ink, background: g,
    boxShadow: "0 8px 26px rgba(0,0,0,.55)", fontFamily: "system-ui,sans-serif",
    minHeight: 44,
  }),
  btnGreen: {
    padding: "11px 22px", borderRadius: 12, border: "none", cursor: "pointer",
    fontSize: 14, fontWeight: 800, color: INK,
    background: "linear-gradient(135deg,#4ff5e2,#0abab5)",
    boxShadow: "0 6px 18px rgba(0,0,0,.5)", fontFamily: "system-ui,sans-serif",
    minHeight: 44,
  },
  btnGhost: {
    padding: "10px 18px", borderRadius: 12,
    border: "1px solid rgba(255,255,255,.16)", cursor: "pointer",
    background: "rgba(255,255,255,.07)", color: T2,
    fontSize: 13, fontWeight: 600, fontFamily: "system-ui,sans-serif",
    minHeight: 44,
  },
  overlay: {
    position: "fixed", inset: 0, zIndex: 400,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(0,0,0,.86)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", padding: 20,
  },
  sectionLabel: {
    fontSize: 11, textTransform: "uppercase", letterSpacing: ".07em", color: T4, marginBottom: 9,
  },
  page: { padding: "20px 16px 110px", overflowY: "auto" },
  input: {
    height: 44, borderRadius: 12, border: "1px solid rgba(255,255,255,.16)",
    background: "rgba(255,255,255,.08)", color: ACCENT,
    fontSize: 18, fontWeight: 800, textAlign: "center", outline: "none",
  },
};
