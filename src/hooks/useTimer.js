import { useCallback, useEffect, useRef, useState } from "react";

// Il tempo residuo si calcola da un timestamp di fine (endAt), non da un
// contatore: se l'app va in background e torna, il valore resta corretto.
export default function useTimer(initial) {
  const [time, setTime] = useState(initial);
  const [running, setRunning] = useState(false);
  const endAt = useRef(null);
  const ref = useRef(null);

  const tick = useCallback(() => {
    if (endAt.current == null) return;
    const left = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000));
    setTime(left);
    if (left === 0) {
      clearInterval(ref.current);
      endAt.current = null;
      setRunning(false);
    }
  }, []);

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(tick, 250);
    const onVis = () => { if (document.visibilityState === "visible") tick(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("focus", onVis);
    return () => {
      clearInterval(ref.current);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("focus", onVis);
    };
  }, [running, tick]);

  return {
    time,
    running,
    start: (t) => {
      const secs = t ?? initial;
      endAt.current = Date.now() + secs * 1000;
      setTime(secs);
      setRunning(true);
    },
    reset: (t) => {
      clearInterval(ref.current);
      endAt.current = null;
      setTime(t ?? initial);
      setRunning(false);
    },
    done: time === 0,
  };
}
