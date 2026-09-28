import { useState } from "react";
import RestTimer from "./RestTimer.jsx";
import Icon from "./Icon.jsx";
import useWeightLog, { fmtDate } from "../hooks/useWeightLog.js";
import useWorkingWeights from "../hooks/useWorkingWeights.js";
import { suggestedMax, stepFor, clampWeight, fmtWeight } from "../lib/weights.js";
import { S, T1, T2, T3, T4, TIFFANY, TIFFANY_GRAD, BG_GRADIENT, NAVY_DEEP, tint } from "../styles.js";

// Regolazione fine: mezzo chilo in più o in meno su qualsiasi esercizio.
const FINE_STEP = 0.5;

const stepBtn = {
  width: 60, height: 60, borderRadius: 20, flexShrink: 0,
  border: `1px solid ${tint(0.38)}`, cursor: "pointer", padding: 0,
  background: `linear-gradient(180deg, ${tint(0.22)}, ${tint(0.08)})`,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.22), 0 6px 18px rgba(2,8,23,.45)",
  color: TIFFANY, fontSize: 30, fontWeight: 700, lineHeight: 1,
  fontFamily: "system-ui,sans-serif", display: "flex", alignItems: "center", justifyContent: "center",
};

const fineBtn = {
  minWidth: 84, height: 44, borderRadius: 14, padding: "0 14px",
  border: `1px solid ${tint(0.28)}`, cursor: "pointer",
  background: tint(0.07), color: TIFFANY,
  fontSize: 14, fontWeight: 700, fontFamily: "system-ui,sans-serif",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const labelSm = { fontSize: 10, fontWeight: 700, color: tint(0.72), textTransform: "uppercase", letterSpacing: ".06em" };

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
  const ex = session.exercises[exIdx];
  const curSets = setsDone[exIdx] || 0;
  const isReviewing = exIdx < furthest;

  // Registro storico: snapshot all'avvio (per "Ultima volta"), scrittura a set completato.
  const wlog = useWeightLog();
  const [history] = useState(() => ({ ...wlog.last }));
  // Peso di lavoro: salvato subito a ogni tocco, così non si perde
  // uscendo dalla sessione o ricaricando l'app prima di completare il set.
  const working = useWorkingWeights();
  const keyOf = (i) => `${session.id}:${i}:${session.exercises[i].altUsed ? "alt" : "main"}`;
  const exKey = keyOf(exIdx);
  const last = history[exKey] || null;
  const step = stepFor(ex.weight);
  // Partenza: il peso già in uso, altrimenti l'ultimo registrato,
  // altrimenti il valore più alto consigliato nella scheda.
  const stored = working.get(exKey);
  const weightValue = clampWeight(stored ?? last?.weight ?? suggestedMax(ex.weight), ex.weight);
  const bump = (delta) => {
    if (isReviewing) return;
    working.set(exKey, clampWeight(weightValue + delta, ex.weight));
  };
  const totalSets = session.exercises.reduce((a, e) => a + e.sets, 0);
  const doneSets = Object.values(setsDone).reduce((a, b) => a + b, 0);
  const progress = doneSets / totalSets;

  const completeSet = () => {
    if (isReviewing) return;
    const next = curSets + 1;
    setSetsDone((p) => ({ ...p, [exIdx]: next }));
    wlog.save({ sessionId: session.id, exIdx, altUsed: !!ex.altUsed, name: ex.name, week: block?.week ?? null, date: new Date().toISOString(), weight: weightValue, sets: next });
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
        <div style={{ ...S.iconTile(84, 26), margin: "0 auto 18px" }}><Icon name="trophy" size={46} stroke={1.7} /></div>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: TIFFANY }}>Ottimo lavoro!</h2>
        <p style={{ color: T2, marginBottom: 6 }}>{session.label} completata</p>
        <p style={{ color: T3, fontSize: 13, lineHeight: 1.6, marginBottom: 28 }}>
          Esegui ora il protocollo di stretching post-allenamento.<br />
          Applica calore al trapezio destro se senti tensione.
        </p>
        <button style={{ ...S.btnGrad(), width: "100%", fontSize: 15 }} onClick={onExit}>Torna alla home</button>
      </div>
    </div>
  );

  const nextLabel = (setsDone[exIdx] || 0) >= ex.sets && exIdx < session.exercises.length - 1
    ? `Prossimo: ${session.exercises[exIdx + 1].name}`
    : `Prossimo set ${(setsDone[exIdx] || 0) + 1}/${ex.sets}`;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: BG_GRADIENT, display: "flex", flexDirection: "column", fontFamily: "system-ui,sans-serif", color: T1 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 18px 8px", paddingTop: "max(20px, env(safe-area-inset-top))", overflowY: "auto" }}>

        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
          <button style={S.iconBtn} onClick={onExit} aria-label="Esci"><Icon name="close" size={20} stroke={2.2} /></button>
          <div style={{ textAlign: "center", minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: tint(0.75), letterSpacing: ".08em", textTransform: "uppercase" }}>{session.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{session.subtitle}</div>
          </div>
          <div style={S.pill}>{exIdx + 1}/{session.exercises.length}</div>
        </div>

        {/* progress bar */}
        <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 99, height: 4, marginBottom: 14, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 99, background: TIFFANY_GRAD, width: `${progress * 100}%`, transition: "width .6s ease" }} />
        </div>

        {/* nav tra esercizi */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
          <button style={{ ...S.btnGhost, opacity: exIdx === 0 ? .35 : 1, pointerEvents: exIdx === 0 ? "none" : "auto" }} onClick={goPrev}>
            <Icon name="chevL" size={16} stroke={2.2} /> Precedente
          </button>
          {isReviewing && exIdx < furthest && (
            <button style={S.btnGhost} onClick={goNextReview}>Successivo <Icon name="chevR" size={16} stroke={2.2} /></button>
          )}
          {isReviewing && <span style={{ ...S.pill, fontSize: 10 }}><Icon name="eye" size={13} /> Revisione</span>}
        </div>

        {/* main card */}
        <div style={{ ...S.glass, padding: 22, flex: 1, display: "flex", flexDirection: "column" }}>
          {phase === "exercise" ? (
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                <div style={S.pill}>{session.tag}{block ? ` · RIR ${block.rir}` : ""}</div>
                {isDeload && <div style={{ ...S.pill, background: tint(0.16), borderColor: tint(0.45) }}><Icon name="rest" size={13} /> Deload: metà serie, stessi carichi</div>}
              </div>
              <h2 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.25, marginBottom: ex.focus ? 4 : 16 }}>{ex.name}</h2>
              {ex.focus && <div style={{ fontSize: 13, color: tint(0.82), marginBottom: 14 }}>{ex.focus}</div>}

              <div style={{ display: "flex", gap: 10, marginBottom: ex.tempo ? 10 : 16 }}>
                {[["Serie", ex.sets], ["Rip", ex.reps], ["Set", `${curSets}/${ex.sets}`]].map(([k, v]) => (
                  <div key={k} style={{ ...S.glassSm, flex: 1, textAlign: "center", padding: "11px 6px" }}>
                    <div style={{ ...labelSm, marginBottom: 3 }}>{k}</div>
                    <div style={{ fontSize: 19, fontWeight: 800, color: T1 }}>{v}</div>
                  </div>
                ))}
              </div>
              {ex.tempo && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...S.pill, flexShrink: 0 }} title="eccentrica-pausa-concentrica (secondi)"><Icon name="tempo" size={13} /> tempo {ex.tempo}</span>
                  <span style={{ fontSize: 10, color: T4, lineHeight: 1.3 }}>eccentrica-pausa-concentrica (secondi)</span>
                </div>
              )}

              {ex.weight && (
                <div style={{ marginBottom: 16, padding: "12px 16px", borderRadius: 16, background: tint(0.08), border: `1px solid ${tint(0.26)}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={S.iconTile(38, 12)}><Icon name="weight" size={23} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ ...labelSm, marginBottom: 2 }}>Peso consigliato</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: TIFFANY }}>{ex.weight}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: T3, lineHeight: 1.4, marginTop: 8 }}>Aumenta di {fmtWeight(step)} kg se arrivi al tetto delle rip con 2 in riserva</div>
                </div>
              )}

              {/* peso usato: passo del programma con − / +, regolazione fine ±0.5 */}
              <div style={{ marginBottom: 16, marginTop: ex.weight ? -4 : 0 }}>
                <div style={{ ...labelSm, marginBottom: 8 }}>Peso usato</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button type="button" aria-label={`Togli ${fmtWeight(step)} kg`} onClick={() => bump(-step)} disabled={isReviewing}
                    style={{ ...stepBtn, opacity: isReviewing ? .35 : 1 }}>−</button>
                  <div style={{ flex: 1, textAlign: "center", minWidth: 0 }}>
                    <div data-testid="weight-value" style={{ fontSize: 32, fontWeight: 800, color: TIFFANY, lineHeight: 1.05 }}>
                      {fmtWeight(weightValue)}<span style={{ fontSize: 14, fontWeight: 700, marginLeft: 3, color: T3 }}>kg</span>
                    </div>
                    <div style={{ fontSize: 10, color: T4, marginTop: 2 }}>passo {fmtWeight(step)} kg</div>
                  </div>
                  <button type="button" aria-label={`Aggiungi ${fmtWeight(step)} kg`} onClick={() => bump(step)} disabled={isReviewing}
                    style={{ ...stepBtn, opacity: isReviewing ? .35 : 1 }}>+</button>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 10 }}>
                  <button type="button" aria-label={`Togli ${fmtWeight(FINE_STEP)} kg`} onClick={() => bump(-FINE_STEP)} disabled={isReviewing}
                    style={{ ...fineBtn, opacity: isReviewing ? .35 : 1 }}>−0.5</button>
                  <button type="button" aria-label={`Aggiungi ${fmtWeight(FINE_STEP)} kg`} onClick={() => bump(FINE_STEP)} disabled={isReviewing}
                    style={{ ...fineBtn, opacity: isReviewing ? .35 : 1 }}>+0.5</button>
                </div>
                {last && <div style={{ fontSize: 11, color: T4, marginTop: 9, textAlign: "center" }}>Ultima volta: {fmtWeight(last.weight)} kg · {fmtDate(last.date)}</div>}
              </div>

              {/* set progress dots */}
              <div style={{ display: "flex", gap: 5, marginBottom: 16 }}>
                {Array.from({ length: ex.sets }).map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < curSets ? TIFFANY_GRAD : "rgba(255,255,255,.08)", transition: "background .3s" }} />
                ))}
              </div>

              <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 14, padding: "12px 14px", border: `1px solid ${tint(0.12)}` }}>
                <div style={{ ...labelSm, display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><Icon name="note" size={14} /> Nota clinica</div>
                <p style={{ fontSize: 13, color: T2, lineHeight: 1.6 }}>{ex.note}</p>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
              <div style={{ ...labelSm, fontSize: 12, letterSpacing: ".1em" }}>Recupero</div>
              <RestTimer seconds={ex.rest} onDone={afterRest} />
              <p style={{ fontSize: 13, color: T3, textAlign: "center" }}>{nextLabel}</p>
              <button style={S.btnGhost} onClick={afterRest}>Salta recupero <Icon name="arrowR" size={16} stroke={2.1} /></button>
            </div>
          )}
        </div>
      </div>

      {/* footer fisso: azione principale sempre sotto il pollice */}
      {phase === "exercise" && (
        <div style={{ flexShrink: 0, padding: "10px 18px", paddingBottom: "max(14px, env(safe-area-inset-bottom))", background: `linear-gradient(180deg, rgba(6,18,42,0) 0%, ${NAVY_DEEP} 35%)` }}>
          {isReviewing
            ? <button style={{ ...S.btnGrad(), width: "100%", fontSize: 15, padding: "16px" }} onClick={goToCurrent}>Torna all'esercizio attuale <Icon name="arrowR" size={17} stroke={2.2} /></button>
            : <button style={{ ...S.btnGrad(), width: "100%", fontSize: 16, padding: "17px" }} onClick={completeSet}><Icon name="check" size={19} stroke={2.6} /> Set completato</button>
          }
        </div>
      )}
    </div>
  );
}
