export const T1 = "#11151c";
export const T2 = "rgba(17,21,28,.62)";
export const T3 = "rgba(17,21,28,.45)";
export const T4 = "rgba(17,21,28,.32)";

export const grad = (s) => `linear-gradient(135deg,${s.grad[0]},${s.grad[1]})`;

export const S = {
  glass: {
    background: "rgba(255,255,255,.62)",
    backdropFilter: "blur(28px) saturate(180%)",
    WebkitBackdropFilter: "blur(28px) saturate(180%)",
    border: "1px solid rgba(255,255,255,.8)",
    borderRadius: 22,
    boxShadow: "0 10px 36px rgba(17,21,28,.10), inset 0 1px 0 rgba(255,255,255,.9)",
    color: T1,
  },
  glassSm: {
    background: "rgba(255,255,255,.55)",
    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter: "blur(18px) saturate(160%)",
    border: "1px solid rgba(255,255,255,.7)",
    borderRadius: 14,
    boxShadow: "0 4px 18px rgba(17,21,28,.07)",
    color: T1,
  },
  pill: {
    display: "inline-flex", alignItems: "center",
    padding: "4px 12px", borderRadius: 99,
    fontSize: 11, fontWeight: 600, letterSpacing: ".04em",
    background: "rgba(17,21,28,.05)", border: "1px solid rgba(17,21,28,.09)",
    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    color: T1,
  },
  iconBtn: {
    width: 44, height: 44, borderRadius: "50%",
    border: "1px solid rgba(17,21,28,.09)", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
    background: "rgba(255,255,255,.75)", color: T1,
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 2px 10px rgba(17,21,28,.08)",
  },
  iconBtnOnColor: {
    width: 44, height: 44, borderRadius: "50%",
    border: "1px solid rgba(255,255,255,.4)", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
    background: "rgba(255,255,255,.22)", color: "#fff",
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
  },
  btnGrad: (g) => ({
    padding: "14px 24px", borderRadius: 14, border: "none", cursor: "pointer",
    fontSize: 15, fontWeight: 700, color: "#fff", background: g,
    boxShadow: "0 8px 22px rgba(17,21,28,.20)", fontFamily: "system-ui,sans-serif",
    minHeight: 44,
  }),
  btnGreen: {
    padding: "11px 22px", borderRadius: 12, border: "none", cursor: "pointer",
    fontSize: 14, fontWeight: 700, color: "#fff",
    background: "linear-gradient(135deg,#34d399,#0f766e)",
    boxShadow: "0 6px 18px rgba(17,21,28,.18)", fontFamily: "system-ui,sans-serif",
    minHeight: 44,
  },
  btnGhost: {
    padding: "10px 18px", borderRadius: 12,
    border: "1px solid rgba(17,21,28,.12)", cursor: "pointer",
    background: "rgba(255,255,255,.6)", color: "#374151",
    fontSize: 13, fontWeight: 600, fontFamily: "system-ui,sans-serif",
    minHeight: 44,
  },
  overlay: {
    position: "fixed", inset: 0, zIndex: 400,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(238,241,248,.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", padding: 20,
  },
  sectionLabel: {
    fontSize: 11, textTransform: "uppercase", letterSpacing: ".07em", color: T4, marginBottom: 9,
  },
  page: { padding: "20px 16px 110px", overflowY: "auto" },
};
