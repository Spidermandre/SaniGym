// Tema arcade: sfondo nero, testo e pulsanti verde fluo, caratteri pixel.
// Press Start 2P per titoli, etichette, numeri e pulsanti; VT323 per i testi lunghi.
// Bordi netti da 2 px, angoli quasi squadrati, bagliore al neon e pulsanti con ombra piena.

export const FONT_ARCADE = '"Press Start 2P", ui-monospace, Menlo, monospace';
export const FONT_BODY = '"VT323", ui-monospace, Menlo, monospace';

// Nero
export const BG_TOP = "#000000";
export const BG = "#000000";
export const BG_DEEP = "#000000";
export const BG_GRADIENT = "radial-gradient(ellipse 120% 70% at 50% 0%, #031a00 0%, #000 60%)";

// Verde fluo e varianti.
export const ACCENT = "#39ff14";
export const ACCENT_LIGHT = "#8cff70";
export const ACCENT_DEEP = "#21c400";
// Leggera smussatura verticale, come un tasto di un cabinato.
export const ACCENT_GRAD = `linear-gradient(180deg, ${ACCENT_LIGHT} 0%, ${ACCENT} 45%, ${ACCENT_DEEP} 100%)`;

// Testo: verde chiaro per la lettura, verde fluo per titoli, valori ed etichette.
export const T1 = "#d6ffcf";
export const T2 = "rgba(214,255,207,.86)";
export const T3 = "rgba(214,255,207,.72)";
export const T4 = "rgba(214,255,207,.6)";
// Inchiostro nero sopra i pulsanti verdi.
export const INK = "#000000";
// Avvisi (ultimi secondi del recupero, calo di carico): rosso arcade, distinto dal verde.
export const WARN = "#ff3b5c";
export const warnTint = (a) => `rgba(255,59,92,${a})`;

// Tinte verdi trasparenti riutilizzate.
export const tint = (a) => `rgba(57,255,20,${a})`;
// Bagliore al neon per titoli e valori.
export const GLOW = `0 0 6px ${tint(0.55)}, 0 0 14px ${tint(0.25)}`;

// Tutte le sessioni condividono il verde: le distingue l'icona di tipologia.
export const grad = () => ACCENT_GRAD;
export const color0 = () => ACCENT;

const panelBase = {
  background: tint(0.035),
  border: `2px solid ${tint(0.3)}`,
  boxShadow: `0 0 16px ${tint(0.07)}, inset 0 0 20px ${tint(0.035)}`,
  color: T1,
};

export const S = {
  arcade: { fontFamily: FONT_ARCADE },
  glass: { ...panelBase, borderRadius: 6 },
  glassSm: {
    ...panelBase,
    background: tint(0.03),
    border: `2px solid ${tint(0.22)}`,
    borderRadius: 4,
    boxShadow: "none",
  },
  pill: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "5px 9px", borderRadius: 3,
    fontFamily: FONT_ARCADE, fontSize: 9, letterSpacing: ".02em", lineHeight: 1.2,
    background: tint(0.08), border: `2px solid ${tint(0.45)}`,
    color: ACCENT,
  },
  iconBtn: {
    width: 44, height: 44, borderRadius: 6,
    border: `2px solid ${tint(0.55)}`, cursor: "pointer", padding: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "#000", color: ACCENT,
    boxShadow: `0 0 10px ${tint(0.2)}`,
  },
  btnGrad: (g = ACCENT_GRAD, ink = INK) => ({
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
    padding: "14px 18px", borderRadius: 4, border: "none", cursor: "pointer",
    fontFamily: FONT_ARCADE, fontSize: 12, letterSpacing: ".02em", lineHeight: 1.3,
    color: ink, background: g,
    boxShadow: `0 4px 0 #0f6b00, 0 0 22px ${tint(0.35)}`,
    minHeight: 48, textTransform: "uppercase",
  }),
  btnGhost: {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: "10px 14px", borderRadius: 4,
    border: `2px solid ${tint(0.6)}`, cursor: "pointer",
    background: "#000", color: ACCENT,
    fontFamily: FONT_ARCADE, fontSize: 10, letterSpacing: ".02em", lineHeight: 1.3,
    minHeight: 44,
  },
  overlay: {
    position: "fixed", inset: 0, zIndex: 400,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(0,0,0,.92)", padding: 20,
  },
  sectionLabel: {
    fontFamily: FONT_ARCADE, fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em",
    color: ACCENT, textShadow: GLOW, marginBottom: 12,
  },
  h1: { fontFamily: FONT_ARCADE, fontSize: 20, lineHeight: 1.3, marginBottom: 8, color: ACCENT, textShadow: GLOW },
  page: { padding: "22px 16px 116px", overflowY: "auto" },
  // Riquadro icona: cornice verde, fondo nero, alone leggero.
  iconTile: (size = 44, radius = 6) => ({
    width: size, height: size, borderRadius: Math.min(radius, 8), flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: tint(0.08),
    border: `2px solid ${tint(0.55)}`,
    boxShadow: `0 0 14px ${tint(0.18)}, inset 0 0 10px ${tint(0.08)}`,
    color: ACCENT,
  }),
};
