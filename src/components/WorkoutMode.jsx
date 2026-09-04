import { useState } from "react";
import RestTimer from "./RestTimer.jsx";
import SafetyOverlay from "./SafetyOverlay.jsx";
import useWeightLog, { fmtDate } from "../hooks/useWeightLog.js";
import { S, T1, T2, T3, T4, INK, grad, color0 } from "../styles.js";

export default function WorkoutMode({ session: rawSession, block, onExit }) {
  const isDeload = block?.label === "Deload";
  // Deload: metà delle serie (arrotondate per eccesso), stessi carichi.
  const session = isDeload
    ? { ...rawSession, exercises: rawSession.exercises.map((e) => ({ ...e, sets: Math.ceil(e.sets / 2) })) }
    : rawSession;
  const [exIdx, setExIdx] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [setsDone, setSetsDone] = useState({});
  const [phase, setPhase] = useState("exercise");
  const [alarm, setAlarm] = useState(false);
  const ex = session.exercises[exIdx];

  // Registro carichi: snapshot all'avvio (per "Ultima volta" e precompilazione),
  // scrittura ad ogni set completato.
  const wlog = useWeightLog();
  const [history] = useState(() => ({ ...wlog.last }));
  const [weights, setWeights] = useState({});
  const lastFor = (i) => history[`${session.id}:${i}:${session.exercises[i].altUsed ? "alt" : "main"}`] || null;
  const weightValue = weights[exIdx] ?? (lastFor(exIdx)?.weight ?? "");
  const setWeightValue = (v) => setWeights((p) => ({ ...p, [exIdx]: v }));
  const last = lastFor(exIdx);
  const curSets = setsDone[exIdx] || 0;
  const isReviewing = exIdx < furthest;
  const g = grad(session);
  const totalSets = session.exercises.reduce((a, e) => a + e.sets, 0);
  const doneSets = Object.values(setsDone).reduce((a, b) => a + b, 0);
  const progress = doneSets / totalSets;

  const completeSet = () => {
    if (isReviewing) return;
    const next = curSets + 1;
    setSetsDone((p) => ({ ...p, [exIdx]: next }));
    const w = parseFloat(String(weightValue).replace(",", "."));
    if (!Number.isNaN(w)) {
      wlog.save({ sessionId: session.id, exIdx, altUsed: !!ex.altUsed, name: ex.name, week: block?.week ?? null, date: new Date().toISOString(), weight: w, sets: next });
    }
    if (next >= ex.sets && exIdx === session.exercises.length - 1) setPhase("done");
    else setPhase("rest");
  };
  const afterRest = () => {
    const cur = setsDone[exIdx] || 0;
    let nxt = exIdx;
    if (cur >= ex.sets && exIdx < session.exercises.length - 1) nxt = exIdx + 1;
    setExIdx(nxt); setFurthest(nxt); setPhase("exercise");
  };
  const goPrev = () => { if (exIdx > 0) { setExIdx(exIdx - 1); setPhase("exercise"); } };
  const goNextReview = () => { if (exIdx < furthest) { setExIdx(exIdx + 1); setPhase("exercise"); } };
  const goToCurrent = () => { setExIdx(furthest); setPhase("exercise"); };

  if (phase === "done") return (
    <div style={S.overlay}>
      <div style={{ ...S.glass, padding: 40, maxWidth: 320, width: "90%", textAlign: "center" }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>🏆</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: T1 }}>Ottimo lavoro!</h2>
        <p style={{ color: T2, marginBottom: 6 }}>{session.label} completata</p>
        <p style={{ color: T3, fontSize: 13, lineHeight: 1.6, marginBottom: 28 }}>
          Esegui ora il protocollo di stretching post-allenamento 🧘<br />
          Applica calore al trapezio destro se senti tensione.
        </p>
        <button style={{ ...S.btnGrad(g), width: "100%", fontSize: 15 }} onClick={onExit}>← Torna alla home</button>
      </div>
    </div>
  );

  const nextLabel = (setsDone[exIdx] || 0) >= ex.sets && exIdx < session.exercises.length - 1
    ? `Prossimo: ${session.exercises[exIdx + 1].name}`
    : `Prossimo set ${(setsDone[exIdx] || 0) + 1}/${ex.sets}`;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#000", display: "flex", flexDirection: "column", fontFamily: "system-ui,sans-serif", color: T1 }}>
      {alarm && <SafetyOverlay onExit={onExit} />}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 18px 8px", paddingTop: "max(20px, env(safe-area-inset-top))", overflowY: "auto" }}>

        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <button style={S.iconBtn} onClick={onExit} aria-label="Esci">✕</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: T3, letterSpacing: ".07em", textTransform: "uppercase" }}>{session.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{session.subtitle}</div>
          </div>
          <div style={S.pill}>{exIdx + 1}/{session.exercises.length}</div>
        </div>

        {/* progress bar */}
        <div style={{ background: "rgba(255,255,255,.10)", borderRadius: 99, height: 4, marginBottom: 14, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 99, background: g, width: `${progress * 100}%`, transition: "width .6s ease" }} />
        </div>

        {/* nav tra esercizi */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
          <button style={{ ...S.btnGhost, opacity: exIdx === 0 ? .35 : 1, pointerEvents: exIdx === 0 ? "none" : "auto" }} onClick={goPrev}>‹ Precedente</button>
          {isReviewing && exIdx < furthest && <button style={S.btnGhost} onClick={goNextReview}>Successivo ›</button>}
          {isReviewing && <span style={{ ...S.pill, background: `${color0(session)}1f`, borderColor: `${color0(session)}55`, color: color0(session), fontSize: 10 }}>👀 Revisione</span>}
        </div>

        {/* main card */}
        <div style={{ ...S.glass, padding: 22, flex: 1, display: "flex", flexDirection: "column" }}>
          {phase === "exercise" ? (
            <>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  <div style={{ ...S.pill, display: "inline-flex" }}>{session.tag}{block ? ` · RIR ${block.rir}` : ""}</div>
                  {isDeload && <div style={{ ...S.pill, display: "inline-flex", background: "rgba(79,245,226,.10)", borderColor: "rgba(79,245,226,.35)", color: "#4ff5e2" }}>🌿 Deload: metà serie, stessi carichi</div>}
                </div>
                <h2 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.25, marginBottom: ex.focus ? 4 : 16 }}>{ex.name}</h2>
                {ex.focus && <div style={{ fontSize: 13, color: T3, marginBottom: 14 }}>{ex.focus}</div>}

                <div style={{ display: "flex", gap: 10, marginBottom: ex.tempo ? 10 : 16 }}>
                  {[["Serie", ex.sets], ["Rip", ex.reps], ["Set", `${curSets}/${ex.sets}`]].map(([k, v]) => (
                    <div key={k} style={{ ...S.glassSm, flex: 1, textAlign: "center", padding: "11px 6px" }}>
                      <div style={{ fontSize: 10, color: T4, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 3 }}>{k}</div>
                      <div style={{ fontSize: 19, fontWeight: 800 }}>{v}</div>
                    </div>
                  ))}
                </div>
                {ex.tempo && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <span style={{ ...S.pill, flexShrink: 0 }} title="eccentrica-pausa-concentrica (secondi)">⏱ tempo {ex.tempo}</span>
                    <span style={{ fontSize: 10, color: T4, lineHeight: 1.3 }}>eccentrica-pausa-concentrica (secondi)</span>
                  </div>
                )}

                {ex.weight && (
                  <div style={{ marginBottom: 16, padding: "11px 16px", borderRadius: 14, background: `${color0(session)}14`, border: `1px solid ${color0(session)}44` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>🏋️</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10, color: T4, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 2 }}>Peso consigliato</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: color0(session) }}>{ex.weight}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: T3, lineHeight: 1.4, marginTop: 6 }}>Aumenta di 2.5 kg se arrivi al tetto delle rip con 2 in riserva</div>
                  </div>
                )}

                {/* registro carichi */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, marginTop: ex.weight ? -6 : 0 }}>
                  <label htmlFor="peso-usato" style={{ fontSize: 12, color: T3, flex: 1 }}>
                    Peso usato (kg)
                    {last && <div style={{ fontSize: 11, color: T4, marginTop: 2 }}>Ultima volta: {last.weight} kg · {fmtDate(last.date)}</div>}
                  </label>
                  <input id="peso-usato" type="number" inputMode="decimal" step="0.5" min="0" placeholder="—"
                    value={weightValue} onChange={(e) => setWeightValue(e.target.value)} disabled={isReviewing}
                    style={{ ...S.input, width: 96, color: color0(session) }} />
                </div>

                {/* set progress dots */}
                <div style={{ display: "flex", gap: 5, marginBottom: 16 }}>
                  {Array.from({ length: ex.sets }).map((_, i) => (
                    <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < curSets ? g : "rgba(255,255,255,.10)", transition: "background .3s" }} />
                  ))}
                </div>

                <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(255,255,255,.08)" }}>
                  <div style={{ fontSize: 10, color: T3, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>📋 Nota clinica</div>
                  <p style={{ fontSize: 13, color: T2, lineHeight: 1.6 }}>{ex.note}</p>
                </div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
              <div style={{ fontSize: 12, color: T3, letterSpacing: ".08em", textTransform: "uppercase" }}>Recupero</div>
              <RestTimer seconds={ex.rest} onDone={afterRest} />
              <p style={{ fontSize: 13, color: T3, textAlign: "center" }}>{nextLabel}</p>
              <button style={S.btnGhost} onClick={afterRest}>Salta recupero →</button>
            </div>
          )}
        </div>
      </div>

      {/* footer fisso: azione principale + sicurezza clinica, sempre sotto il pollice */}
      <div style={{ flexShrink: 0, padding: "10px 18px", paddingBottom: "max(14px, env(safe-area-inset-bottom))", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 30%)" }}>
        {phase === "exercise" && (isReviewing
          ? <button style={{ ...S.btnGrad(g), width: "100%", fontSize: 15, padding: "16px" }} onClick={goToCurrent}>→ Torna all'esercizio attuale</button>
          : <button style={{ ...S.btnGrad(g), width: "100%", fontSize: 16, padding: "17px" }} onClick={completeSet}>✓  Set completato — recupero {ex.rest}''</button>
        )}
        <button onClick={() => setAlarm(true)} style={{ ...S.btnGhost, width: "100%", marginTop: 10, padding: "11px 16px", fontSize: 13, minHeight: 44,
          background: "rgba(255,77,77,.08)", borderColor: "rgba(255,77,77,.3)", color: "#ff6b6b" }}>
          ⚠️ Sintomi al braccio dx
        </button>
      </div>
    </div>
  );
}
