import { PROGRAM_META, SESSIONS, WEEK } from "../data/programma.js";
import { S, T1, T2, T3, T4, grad } from "../styles.js";

export default function Home({ onSelect }) {
  const dayMap = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];
  const todayCode = dayMap[new Date().getDay()];
  const todayEntry = WEEK.find((w) => w.day === todayCode);
  const todaySess = todayEntry?.sid && todayEntry.sid !== "rest" ? SESSIONS.find((s) => s.id === todayEntry.sid) : null;

  return (
    <div style={S.page}>
      <div style={{ marginBottom: 26 }}>
        <p style={{ fontSize: 13, color: T3, marginBottom: 2 }}>Il tuo allenamento personale 💪</p>
        <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-.02em", color: T1 }}>{PROGRAM_META.name}</h1>
        <p style={{ color: T4, fontSize: 13, marginTop: 3 }}>{PROGRAM_META.subtitle}</p>
      </div>

      {/* oggi */}
      <p style={S.sectionLabel}>Oggi — {todayCode}</p>
      {todaySess ? (
        <div style={{ ...S.glass, padding: 22, marginBottom: 22, background: `${todaySess.grad[0]}14`, borderColor: `${todaySess.grad[0]}30`, cursor: "pointer" }} onClick={() => onSelect(todaySess)}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ ...S.pill, marginBottom: 11 }}>{todaySess.emoji} Oggi</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: T1 }}>{todaySess.label}</h2>
              <p style={{ color: T2, fontSize: 14, marginTop: 2 }}>{todaySess.subtitle}</p>
            </div>
            <div style={{ fontSize: 44 }}>{todaySess.emoji}</div>
          </div>
          <div style={{ display: "flex", gap: 7, marginTop: 14 }}>
            {[todaySess.tag, `${todaySess.exercises.length} esercizi`].map((t) => <div key={t} style={S.pill}>{t}</div>)}
          </div>
        </div>
      ) : (
        <div style={{ ...S.glass, padding: 22, marginBottom: 22 }}>
          <div style={{ fontSize: 34, marginBottom: 10 }}>{todayEntry?.sid === "rest" ? "🌿" : "💤"}</div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 5, color: T1 }}>{todayEntry?.sid === "rest" ? "Riposo attivo" : "Riposo completo"}</h2>
          <p style={{ color: T3, fontSize: 13, lineHeight: 1.6 }}>
            {todayEntry?.sid === "rest"
              ? "Esegui la routine di mobilità cervicale + nerve glide. Foam rolling consigliato."
              : "Recupero completo. Calore al trapezio destro se senti tensione."}
          </p>
        </div>
      )}

      {/* settimana */}
      <p style={S.sectionLabel}>Settimana</p>
      <div style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
        {WEEK.map((w, i) => {
          const s = w.sid && w.sid !== "rest" ? SESSIONS.find((x) => x.id === w.sid) : null;
          const isToday = w.day === todayCode;
          return (
            <div key={i} style={{ ...S.glassSm, flex: "1 0 auto", minWidth: 44, padding: "9px 4px", textAlign: "center",
              background: isToday ? "#fff" : "rgba(255,255,255,.45)",
              borderColor: isToday ? "rgba(17,21,28,.16)" : "rgba(255,255,255,.6)" }}>
              <div style={{ fontSize: 9, fontWeight: isToday ? 800 : 500, color: isToday ? T1 : T4, marginBottom: 5 }}>{w.day}</div>
              <div style={{ fontSize: 17 }}>{s ? s.emoji : w.sid === "rest" ? "🌿" : "💤"}</div>
              <div style={{ fontSize: 8, color: T4, marginTop: 4, lineHeight: 1.3 }}>{s ? s.label : w.sid === "rest" ? "Attivo" : "Riposo"}</div>
            </div>
          );
        })}
      </div>

      {/* tutte le sessioni */}
      <p style={S.sectionLabel}>Tutte le sessioni</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginBottom: 20 }}>
        {SESSIONS.map((s) => (
          <div key={s.id} style={{ ...S.glass, padding: 16, cursor: "pointer" }} onClick={() => onSelect(s)}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
            <div style={{ fontWeight: 800, fontSize: 14, color: T1 }}>{s.label}</div>
            <div style={{ color: T3, fontSize: 11, marginBottom: 10 }}>{s.subtitle}</div>
            <div style={{ height: 3, borderRadius: 2, background: grad(s) }} />
          </div>
        ))}
      </div>

      {/* reminder */}
      <div style={{ ...S.glass, padding: 16, background: "rgba(220,38,38,.06)", borderColor: "rgba(220,38,38,.18)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 5, color: "#b91c1c" }}>⚠️ Promemoria clinico</div>
        <p style={{ fontSize: 12, color: T2, lineHeight: 1.65 }}>
          Calore al trapezio destro prima di ogni sessione. Prese neutre o pronate privilegiate.
          Stop immediato se compaiono parestesie o formicolio al braccio/mano destra.
        </p>
      </div>
    </div>
  );
}
