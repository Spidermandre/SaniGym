import usePersistedState from "./usePersistedState.js";

export const logKey = (sessionId, exIdx, altUsed) => `${sessionId}:${exIdx}:${altUsed ? "alt" : "main"}`;

export const fmtDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const dayOf = (iso) => (iso || "").slice(0, 10);

// Registro carichi.
//  last:    ultima voce per esercizio (e variante), usata per precompilare il campo peso
//  history: una voce per esercizio per giorno di allenamento, usata dalla pagina Progressi
// Voce: { key, sessionId, exIdx, altUsed, name, week, date, weight, sets }
const EMPTY = { last: {}, history: [] };

// Migrazione dal formato precedente (solo mappa "ultimo valore").
function migrate(raw) {
  if (!raw || typeof raw !== "object") return EMPTY;
  if (raw.last && Array.isArray(raw.history)) return raw;
  const last = {};
  const history = [];
  for (const [key, e] of Object.entries(raw)) {
    if (!e || typeof e !== "object") continue;
    const entry = { ...e, key };
    last[key] = entry;
    history.push(entry);
  }
  history.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  return { last, history };
}

export default function useWeightLog() {
  const [rawLog, setLog] = usePersistedState("sanifit.log", EMPTY);
  const log = migrate(rawLog);

  const getLast = (sessionId, exIdx, altUsed) => log.last[logKey(sessionId, exIdx, altUsed)] || null;

  const save = (partial) => {
    const key = logKey(partial.sessionId, partial.exIdx, partial.altUsed);
    const entry = { ...partial, key };
    setLog((prev) => {
      const cur = migrate(prev);
      const day = dayOf(entry.date);
      const idx = cur.history.findIndex((h) => h.key === key && dayOf(h.date) === day);
      const history = cur.history.slice();
      if (idx >= 0) history[idx] = entry; else history.push(entry);
      return { last: { ...cur.last, [key]: entry }, history };
    });
  };

  // Storico di un esercizio, dal più vecchio al più recente.
  const historyFor = (key) => log.history.filter((h) => h.key === key).sort((a, b) => a.date.localeCompare(b.date));

  return { last: log.last, history: log.history, getLast, save, historyFor };
}
