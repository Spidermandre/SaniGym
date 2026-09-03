import usePersistedState from "./usePersistedState.js";

export const logKey = (sessionId, exIdx, altUsed) => `${sessionId}:${exIdx}:${altUsed ? "alt" : "main"}`;

export const fmtDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
};

// Registro carichi minimo: per ogni esercizio (e variante) l'ultima voce
// { sessionId, exIdx, altUsed, week, date, weight, sets }.
export default function useWeightLog() {
  const [log, setLog] = usePersistedState("sanifit.log", {});
  const getLast = (sessionId, exIdx, altUsed) => log[logKey(sessionId, exIdx, altUsed)] || null;
  const save = (entry) =>
    setLog((p) => ({ ...p, [logKey(entry.sessionId, entry.exIdx, entry.altUsed)]: entry }));
  return { log, getLast, save };
}
