import { useState } from "react";
import { PROGRAM_META, BLOCK, SESSIONS, WEEK, SAFETY_RULES } from "../data/programma.js";
import Icon, { iconForSession, iconForDay } from "./Icon.jsx";
import { S, T1, T2, T3, T4, ACCENT, WARN, tint, warnTint } from "../styles.js";

export default function Home({ onSelect, week, setWeek, block }) {
  const [rulesOpen, setRulesOpen] = useState(false);
  const maxWeek = BLOCK.length;
  const isDeload = block.volumeFactor < 1;
  const dayMap = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];
  const todayCode = dayMap[new Date().getDay()];
  const todayEntry = WEEK.find((w) => w.day === todayCode);
  const todaySess = todayEntry?.sid && todayEntry.sid !== "rest" ? SESSIONS.find((s) => s.id === todayEntry.sid) : null;
  const isActiveRest = todayEntry?.sid === "rest";

  return (
    <div style={S.page}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 13, color: T3, marginBottom: 2 }}>Il tuo allenamento personale</p>
        <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-.02em", color: ACCENT }}>{PROGRAM_META.name}</h1>
        <p style={{ color: T4, fontSize: 13, marginTop: 3 }}>{PROGRAM_META.subtitle}</p>
      </div>

      {/* blocco 6 settimane */}
      <div style={{ ...S.glass, padding: "12px 12px 12px 16px", marginBottom: 22, display: "flex", alignItems: "center", gap: 10,
        ...(isDeload ? { background: tint(0.1), borderColor: tint(0.4) } : {}) }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: T1 }}>Settimana {week}/{maxWeek} · {block.label}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, marginTop: 2 }}>
            RIR multi {block.rirMulti} · iso {block.rirIso}{isDeload ? ` · volume ${Math.round(block.volumeFactor * 100)} %` : ""}
          </div>
          <p style={{ fontSize: 12, color: T3, lineHeight: 1.5, marginTop: 3 }}>{block.note}</p>
        </div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          <button aria-label="Settimana precedente" onClick={() => setWeek(Math.max(1, week - 1))} disabled={week <= 1}
            style={{ ...S.iconBtn, opacity: week <= 1 ? .35 : 1 }}><Icon name="chevL" size={20} stroke={2.2} /></button>
          <button aria-label="Settimana successiva" onClick={() => setWeek(Math.min(maxWeek, week + 1))} disabled={week >= maxWeek}
            style={{ ...S.iconBtn, opacity: week >= maxWeek ? .35 : 1 }}><Icon name="chevR" size={20} stroke={2.2} /></button>
        </div>
      </div>

      {/* oggi */}
      <p style={S.sectionLabel}>Oggi — {todayCode}</p>
      {todaySess ? (
        <div style={{ ...S.glass, padding: 22, marginBottom: 22, background: `linear-gradient(150deg, ${tint(0.14)}, rgba(255,255,255,.03))`, borderColor: tint(0.38), cursor: "pointer" }}
          onClick={() => onSelect(todaySess)}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ ...S.pill, marginBottom: 11 }}><Icon name={iconForSession(todaySess)} size={13} stroke={2.2} /> Oggi</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>{todaySess.label}</h2>
              <p style={{ color: T2, fontSize: 14, marginTop: 2 }}>{todaySess.subtitle}</p>
            </div>
            <div style={S.iconTile(60, 20)}><Icon name={iconForSession(todaySess)} size={32} stroke={1.9} /></div>
          </div>
          <div style={{ display: "flex", gap: 7, marginTop: 14, flexWrap: "wrap" }}>
            {[todaySess.tag, `${todaySess.exercises.length} esercizi`].map((t) => <div key={t} style={S.pill}>{t}</div>)}
          </div>
        </div>
      ) : (
        <div style={{ ...S.glass, padding: 22, marginBottom: 22, display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={S.iconTile(52, 17)}><Icon name={isActiveRest ? "rest" : "off"} size={28} /></div>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 5, color: ACCENT }}>{isActiveRest ? "Riposo attivo" : "Riposo completo"}</h2>
            <p style={{ color: T3, fontSize: 13, lineHeight: 1.6 }}>
              {isActiveRest
                ? "Esegui la routine di mobilità cervicale + nerve glide. Camminata o bici leggera in zona 2."
                : "Recupero completo. Calore al trapezio destro se senti tensione."}
            </p>
          </div>
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
              background: isToday ? tint(0.18) : "rgba(255,255,255,.04)",
              borderColor: isToday ? tint(0.55) : "rgba(255,255,255,.08)" }}>
              <div style={{ fontSize: 9, fontWeight: isToday ? 800 : 600, color: isToday ? ACCENT : T4, marginBottom: 5 }}>{w.day}</div>
              <div style={{ height: 22, display: "flex", alignItems: "center", justifyContent: "center", color: s || isToday ? ACCENT : T3 }}>
                <Icon name={iconForDay(w.sid)} size={19} />
              </div>
              <div style={{ fontSize: 8, color: isToday ? T2 : T4, marginTop: 4, lineHeight: 1.3 }}>{s ? s.label : w.sid === "rest" ? "Attivo" : "Riposo"}</div>
            </div>
          );
        })}
      </div>

      {/* tutte le sessioni, nell'ordine della settimana */}
      <p style={S.sectionLabel}>Tutte le sessioni</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginBottom: 20 }}>
        {SESSIONS.map((s) => (
          <div key={s.id} style={{ ...S.glass, padding: 16, cursor: "pointer" }} onClick={() => onSelect(s)}>
            <div style={{ ...S.iconTile(40, 13), marginBottom: 11 }}><Icon name={iconForSession(s)} size={22} /></div>
            <div style={{ fontWeight: 800, fontSize: 15, color: ACCENT }}>{s.label}</div>
            <div style={{ color: T4, fontSize: 10, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", margin: "2px 0 3px" }}>{s.day}</div>
            <div style={{ color: T3, fontSize: 11, lineHeight: 1.4 }}>{s.subtitle}</div>
          </div>
        ))}
      </div>

      {/* promemoria clinico */}
      <div style={{ ...S.glass, padding: 16, marginBottom: 12, background: warnTint(0.07), borderColor: warnTint(0.3) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, marginBottom: 5, color: WARN }}>
          <Icon name="alert" size={16} stroke={2} /> Promemoria clinico
        </div>
        <p style={{ fontSize: 12, color: T2, lineHeight: 1.65 }}>
          Calore al trapezio destro prima di ogni sessione. Prese neutre o pronate privilegiate.
          Stop immediato se compaiono parestesie o formicolio al braccio/mano destra.
        </p>
      </div>

      {/* regole di sicurezza */}
      <div style={{ ...S.glass, padding: 0, overflow: "hidden" }}>
        <button onClick={() => setRulesOpen((o) => !o)} aria-expanded={rulesOpen} aria-controls="regole-sicurezza"
          style={{ width: "100%", minHeight: 56, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
            background: "transparent", border: "none", color: T1, fontFamily: "system-ui,sans-serif", textAlign: "left" }}>
          <div style={S.iconTile(36, 12)}><Icon name="shield" size={19} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: ACCENT }}>Regole di sicurezza</div>
            <div style={{ fontSize: 11, color: T3 }}>{SAFETY_RULES.length} regole · valgono per ogni seduta</div>
          </div>
          <span style={{ color: ACCENT, transform: rulesOpen ? "rotate(90deg)" : "none", transition: "transform .2s" }}><Icon name="chevR" size={18} stroke={2.2} /></span>
        </button>
        {rulesOpen && (
          <ol id="regole-sicurezza" style={{ listStyle: "none", padding: "0 16px 14px", margin: 0 }}>
            {SAFETY_RULES.map((r, i) => (
              <li key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderTop: "1px solid rgba(255,255,255,.07)" }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 7, background: tint(0.14), border: `1px solid ${tint(0.34)}`,
                  color: ACCENT, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <span style={{ fontSize: 12.5, color: T2, lineHeight: 1.55 }}>{r}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
