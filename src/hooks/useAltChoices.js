import usePersistedState from "./usePersistedState.js";

export const altKey = (sessionId, exIdx) => `${sessionId}:${exIdx}`;

// Restituisce l'esercizio "effettivo": se l'alternativa è attiva sostituisce
// nome, peso e nota; serie, rip, recupero, tempo e focus restano del principale.
export function resolveExercise(ex, useAlt) {
  if (!useAlt || !ex.alt) return { ...ex, altUsed: false };
  return { ...ex, name: ex.alt.name, weight: ex.alt.weight, note: ex.alt.note, altUsed: true };
}

export default function useAltChoices() {
  const [choices, setChoices] = usePersistedState("sanifit.alt", {});
  const isAlt = (sessionId, exIdx) => !!choices[altKey(sessionId, exIdx)];
  const toggleAlt = (sessionId, exIdx) =>
    setChoices((p) => {
      const k = altKey(sessionId, exIdx);
      const next = { ...p };
      if (next[k]) delete next[k]; else next[k] = true;
      return next;
    });
  const resolveSession = (session) => ({
    ...session,
    exercises: session.exercises.map((ex, i) => resolveExercise(ex, isAlt(session.id, i))),
  });
  return { isAlt, toggleAlt, resolveSession };
}
