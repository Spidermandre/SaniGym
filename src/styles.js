// Tema grigio scuro + arancione fluo.
// Sfondo grigio antracite, pulsanti, titoli, valori e icone in arancione fluo,
// card e navigazione in "liquid glass" neutro con accenti arancioni.

// Grigio
export const BG_TOP = "#2a2b30";
export const BG = "#1e1f23";
export const BG_DEEP = "#141518";
export const BG_GRADIENT = `linear-gradient(180deg, ${BG_TOP} 0%, #1c1d21 60%, ${BG_DEEP} 100%)`;

// Arancione fluo e varianti per i gradienti.
export const ACCENT = "#ff7a00";
export const ACCENT_LIGHT = "#ffa24d";
export const ACCENT_DEEP = "#ff5500";
export const ACCENT_GRAD = `linear-gradient(135deg, ${ACCENT_LIGHT} 0%, ${ACCENT} 50%, ${ACCENT_DEEP} 100%)`;

// Testo: chiaro per la lettura, arancione per titoli, valori ed etichette.
export const T1 = "#f4f4f5";
export const T2 = "rgba(244,244,245,.80)";
export const T3 = "rgba(244,244,245,.66)";
export const T4 = "rgba(244,244,245,.56)";
// Inchiostro scuro per il testo sopra i pulsanti arancioni.
export const INK = "#1a1007";
// Avvisi (promemoria clinico, ultimi secondi del recupero): rosso, distinto dall'arancione.
export const WARN = "#ff4d6d";
export const warnTint = (a) => `rgba(255,77,109,${a})`;

// Tinte arancioni trasparenti riutilizzate.
export const tint = (a) => `rgba(255,122,0,${a})`;

// Tutte le sessioni condividono l'arancione: le distingue l'icona di tipologia.
export const grad = () => ACCENT_GRAD;
export const color0 = () => ACCENT;

const glassBase = {
  background: "linear-gradient(180deg, rgba(255,255,255,.065) 0%, rgba(255,255,255,.03) 100%)",
  backdropFilter: "blur(28px) saturate(160%)",
  WebkitBackdropFilter: "blur(28px) saturate(160%)",
  border: "1px solid rgba(255,255,255,.09)",
  boxShadow: "0 12px 34px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.07)",
  color: T1,
};

export const S = {
  glass: { ...glassBase, borderRadius: 22 },
  glassSm: {
    ...glassBase,
    background: "rgba(255,255,255,.045)",
    backdropFilter: "blur(18px) saturate(150%)",
    WebkitBackdropFilter: "blur(18px) saturate(150%)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 14,
    boxShadow: "0 4px 16px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06)",
  },
  pill: {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "4px 12px", borderRadius: 99,
    fontSize: 11, fontWeight: 700, letterSpacing: ".04em",
    background: tint(0.1), border: `1px solid ${tint(0.32)}`,
    color: ACCENT,
  },
  iconBtn: {
    width: 44, height: 44, borderRadius: "50%",
    border: "1px solid rgba(255,255,255,.12)", cursor: "pointer", padding: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.04))",
    color: ACCENT,
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 4px 14px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.12)",
  },
  btnGrad: (g = ACCENT_GRAD, ink = INK) => ({
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: "14px 24px", borderRadius: 16, border: "none", cursor: "pointer",
    fontSize: 15, fontWeight: 800, color: ink, background: g,
    boxShadow: "0 10px 26px rgba(255,100,0,.28), inset 0 1px 0 rgba(255,255,255,.4)",
    fontFamily: "system-ui,sans-serif", minHeight: 44,
  }),
  btnGhost: {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    padding: "10px 18px", borderRadius: 12,
    border: `1px solid ${tint(0.38)}`, cursor: "pointer",
    background: tint(0.08), color: ACCENT,
    fontSize: 13, fontWeight: 700, fontFamily: "system-ui,sans-serif",
    minHeight: 44,
  },
  overlay: {
    position: "fixed", inset: 0, zIndex: 400,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(20,21,24,.9)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", padding: 20,
  },
  sectionLabel: {
    fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: tint(0.88), marginBottom: 9,
  },
  h1: { fontSize: 26, fontWeight: 800, marginBottom: 4, color: ACCENT, letterSpacing: "-.01em" },
  page: { padding: "20px 16px 110px", overflowY: "auto" },
  // Riquadro icona: sfondo arancione tenue, icona arancione.
  iconTile: (size = 44, radius = 14) => ({
    width: size, height: size, borderRadius: radius, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: `linear-gradient(145deg, ${tint(0.24)}, ${tint(0.07)})`,
    border: `1px solid ${tint(0.36)}`,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,.10), 0 0 22px ${tint(0.14)}`,
    color: ACCENT,
  }),
};
