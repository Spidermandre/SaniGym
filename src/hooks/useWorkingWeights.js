import usePersistedState from "./usePersistedState.js";

// Peso di lavoro corrente per esercizio, salvato subito a ogni modifica.
// È separato dal registro (`sanifit.log`), che invece raccoglie lo storico
// degli allenamenti e viene scritto solo quando un set è completato.
export default function useWorkingWeights() {
  const [weights, setWeights] = usePersistedState("sanifit.weights", {});
  return {
    get: (key) => (weights && Object.prototype.hasOwnProperty.call(weights, key) ? weights[key] : null),
    set: (key, value) => setWeights((prev) => ({ ...(prev || {}), [key]: value })),
  };
}
