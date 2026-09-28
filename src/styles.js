// Tema navy + tiffany.
// Sfondo blu navy profondo, pulsanti e testi di accento color tiffany,
// card e navigazione in "liquid glass" leggermente tinto di tiffany.

// Navy
export const NAVY_TOP = "#0d2449";
export const NAVY = "#0a1b3b";
export const NAVY_DEEP = "#06122a";
export const BG = NAVY;
export const BG_GRADIENT = `linear-gradient(180deg, ${NAVY_TOP} 0%, #081733 60%, ${NAVY_DEEP} 100%)`;

// Tiffany (1837 Blue) e variante più satura per i gradienti.
export const TIFFANY = "#81d8d0";
export const TIFFANY_DEEP = "#0abab5";
export const TIFFANY_GRAD = `linear-gradient(135deg, #9ae6df 0%, ${TIFFANY} 45%, ${TIFFANY_DEEP} 100%)`;
export const ACCENT = TIFFANY;

// Testo: chiaro per la lettura, tiffany per titoli, valori ed etichette.
export const T1 = "#eef6f8";
export const T2 = "rgba(238,246,248,.80)";
export const T3 = "rgba(238,246,248,.66)";
export const T4 = "rgba(238,246,248,.56)";
// Inchiostro navy per il testo sopra i pulsanti tiffany.
export const INK = "#06203a";
// Avvisi (promemoria clinico, ultimi secondi del recupero).
export const WARN = "#ff8f8f";

// Tutte le sessioni condividono il tiffany: le distingue l'icona di tipologia.
export const kindOf = (s) => (String(s?.id || "").startsWith("pull") ? "pull" : "push");
export const grad = () => TIFFANY_GRAD;
export const color0 = () => TIFFANY;

// Tinte tiffany trasparenti riutilizzate.
export const tint = (a) => `rgba(129,216,208,${a})`;

const glassBase = {
  background: "linear-gradient(180deg, rgba(255,255,255,.07) 0%, rgba(255,255,255,.035) 100%)",
  backdropFilter: "blur(28px) saturate(170%)",
  WebkitBackdropFilter: "blur(28px) saturate(170%)",
  border: `1px solid ${tint(0.16)}`,
  boxShadow: "0 12px 34px rgba(2,8,23,.45), inset 0 1px 0 rgba(255,255,255,.09)",
  color: T1,
};

export const S = {
  glass: { ...glassBase, borderRadius: 22 },
  glassSm: {
    ...glassBase,
    background: "rgba(255,255,255,.045)",
    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter: "blur(18px) saturate(160%)",
    border: `1px solid ${tint(0.13)}`,
    borderRadius: 14,
    boxShadow: "0 4px 16px rgba(2,8,23,.35), inset 0 1px 0 rgba(255,255,255,.07)",
  },
  pill: {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "4px 12px", borderRadius: 99,
    fontSize: 11, fontWeight: 600, letterSpacing: ".04em",
    background: tint(0.09), border: `1px solid ${tint(0.24)}`,
    color: TIFFANY,
  },
  iconBtn: {
    width: 44, height: 44, borderRadius: "50%",
    border: `1px solid ${tint(0.24)}`, cursor: "pointer", padding: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.04))",
    color: TIFFANY,
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 4px 14px rgba(2,8,23,.4), inset 0 1px 0 rgba(255,255,255,.14)",
  },
  btnGrad: (g = TIFFANY_GRAD, ink = INK) => ({
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: "14px 24px", borderRadius: 16, border: "none", cursor: "pointer",
    fontSize: 15, fontWeight: 800, color: ink, background: g,
    boxShadow: `0 10px 26px rgba(10,186,181,.28), inset 0 1px 0 rgba(255,255,255,.45)`,
    fontFamily: "system-ui,sans-serif", minHeight: 44,
  }),
  btnGhost: {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    padding: "10px 18px", borderRadius: 12,
    border: `1px solid ${tint(0.34)}`, cursor: "pointer",
    background: tint(0.08), color: TIFFANY,
    fontSize: 13, fontWeight: 700, fontFamily: "system-ui,sans-serif",
    minHeight: 44,
  },
  overlay: {
    position: "fixed", inset: 0, zIndex: 400,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(6,18,42,.9)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", padding: 20,
  },
  sectionLabel: {
    fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: tint(0.72), marginBottom: 9,
  },
  h1: { fontSize: 26, fontWeight: 800, marginBottom: 4, color: TIFFANY, letterSpacing: "-.01em" },
  page: { padding: "20px 16px 110px", overflowY: "auto" },
  // Riquadro icona: sfondo tiffany tenue, icona tiffany.
  iconTile: (size = 44, radius = 14) => ({
    width: size, height: size, borderRadius: radius, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: `linear-gradient(145deg, ${tint(0.22)}, ${tint(0.07)})`,
    border: `1px solid ${tint(0.32)}`,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,.12), 0 0 22px ${tint(0.14)}`,
    color: TIFFANY,
  }),
};
