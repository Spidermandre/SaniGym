import { S, T1, T2 } from "../styles.js";

// Non dismissibile: l'unica uscita è chiudere la sessione.
export default function SafetyOverlay({ onExit }) {
  return (
    <div role="alertdialog" aria-modal="true" aria-labelledby="safety-title" style={{ ...S.overlay, zIndex: 500, background: "rgba(254,242,242,.94)" }}>
      <div style={{ ...S.glass, padding: 32, maxWidth: 340, width: "92%", textAlign: "center", borderColor: "rgba(220,38,38,.35)", boxShadow: "0 16px 48px rgba(185,28,28,.22)" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>⚠️</div>
        <h2 id="safety-title" style={{ fontSize: 26, fontWeight: 800, marginBottom: 12, color: "#b91c1c" }}>Fermati.</h2>
        <p style={{ color: T1, fontSize: 15, fontWeight: 700, lineHeight: 1.5, marginBottom: 10 }}>
          Parestesie o formicolio = stop immediato.
        </p>
        <p style={{ color: T2, fontSize: 14, lineHeight: 1.6, marginBottom: 26 }}>
          Applica calore al trapezio dx e segnala al fisiatra.
        </p>
        <button onClick={onExit} style={{ ...S.btnGrad("linear-gradient(135deg,#ef4444,#991b1b)"), width: "100%", fontSize: 16, padding: "17px" }}>
          Esci dalla sessione
        </button>
      </div>
    </div>
  );
}
