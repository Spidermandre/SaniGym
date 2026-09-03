import { useEffect, useState } from "react";

function read(key, initial) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? initial : JSON.parse(raw);
  } catch {
    return initial;
  }
}

export default function usePersistedState(key, initial) {
  const [value, setValue] = useState(() => read(key, initial));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage pieno o non disponibile: si continua in memoria */
    }
  }, [key, value]);
  return [value, setValue];
}
