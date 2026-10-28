import { sessionKind } from "../lib/program.js";

// Icone lineari 24×24, tratto arrotondato, colore ereditato (currentColor).
// Tipologie di allenamento: push, pull, legs, rest (riposo attivo), off (riposo completo),
// warmup (mobilità pre), stretch (mobilità post). Il resto è interfaccia.

const PATHS = {
  // Spinta: manubrio con freccia verso l'alto (distensione).
  push: (
    <>
      <path d="M6.5 16h11" />
      <path d="M4 14v4M6.5 12.5v7M17.5 12.5v7M20 14v4" />
      <path d="M12 3.5v6.5M9 6.5l3-3 3 3" />
    </>
  ),
  // Trazione: barra lat con freccia verso il basso (tirata al petto).
  pull: (
    <>
      <path d="M4 5h16" />
      <path d="M4 5l1.6 2.6M20 5l-1.6 2.6" />
      <path d="M12 8.5v8M9 13.5l3 3 3-3" />
      <path d="M7.5 20.5h9" />
    </>
  ),
  // Gambe: squat visto di fronte, bilanciere sulle spalle e ginocchia piegate.
  legs: (
    <>
      <circle cx="12" cy="4.2" r="1.9" />
      <path d="M5 7h14M3.6 5.6v2.8M20.4 5.6v2.8" />
      <path d="M12 6.4v5.6" />
      <path d="M12 12l-3.8 2.6.8 5M12 12l3.8 2.6-.8 5" />
    </>
  ),
  rest: (
    <>
      <path d="M5 19.5C5 11 10.5 5 19.5 4.5 19.5 13.5 14 19.5 5 19.5Z" />
      <path d="M5 19.5l8-8" />
    </>
  ),
  off: <path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.2 6.2 0 0 0 10 10Z" />,
  warmup: (
    <path d="M12 3.2c.9 3.4 5.2 5.3 5.2 10.1a5.2 5.2 0 0 1-10.4 0c0-2.3 1-3.8 2.3-4.8.1 1.8 1 2.9 2.4 3.2-.8-2.9-.9-5.6.5-8.5Z" />
  ),
  stretch: (
    <>
      <circle cx="12" cy="4.8" r="1.9" />
      <path d="M12 7.6v6.2" />
      <path d="M12 9.6 6.4 6.2M12 9.6l5.6-3.4" />
      <path d="M12 13.8 7.6 20.2M12 13.8l4.4 6.4" />
    </>
  ),
  // Navigazione
  home: (
    <>
      <path d="M3.5 11 12 4.2l8.5 6.8" />
      <path d="M5.8 9.4V20h12.4V9.4" />
      <path d="M10 20v-5.2h4V20" />
    </>
  ),
  sessions: (
    <>
      <path d="M6.5 12h11" />
      <path d="M4 9.5v5M6.5 7.5v9M17.5 7.5v9M20 9.5v5" />
    </>
  ),
  progress: (
    <>
      <path d="M4 19.5h16" />
      <path d="M5 15.5l4.5-4.5 3.5 3 6-6.5" />
      <path d="M15.2 7.5H19v3.8" />
    </>
  ),
  mobility: (
    <>
      <circle cx="12" cy="4.8" r="1.9" />
      <path d="M12 7.6v6.2" />
      <path d="M12 9.6 6.4 6.2M12 9.6l5.6-3.4" />
      <path d="M12 13.8 7.6 20.2M12 13.8l4.4 6.4" />
    </>
  ),
  // Dettagli esercizio
  // Kettlebell: maniglia larga quanto il corpo e base piatta (per non sembrare un lucchetto).
  weight: (
    <>
      <path d="M8.93 20.2A6.3 6.3 0 1 1 15.07 20.2Z" />
      <path d="M7.3 10.4 6.8 7A1.8 1.8 0 0 1 8.6 4.9h6.8a1.8 1.8 0 0 1 1.8 2.1l-.5 3.4" />
    </>
  ),
  sets: (
    <>
      <path d="M4 8.5 12 4.5l8 4-8 4-8-4Z" />
      <path d="M4 12.5l8 4 8-4" />
      <path d="M4 16.5l8 4 8-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12.5" r="8" />
      <path d="M12 8.2v4.3l2.8 2" />
    </>
  ),
  tempo: (
    <>
      <path d="M8 4h8" />
      <path d="M12 4v2.2" />
      <circle cx="12" cy="13.5" r="7" />
      <path d="M12 13.5l3.2-3.2" />
    </>
  ),
  note: (
    <>
      <rect x="5" y="4.5" width="14" height="16" rx="2.2" />
      <path d="M9 4.5V3.3h6v1.2" />
      <path d="M8.5 10h7M8.5 13.5h7M8.5 17h4.5" />
    </>
  ),
  // Azioni
  swap: (
    <>
      <path d="M4 8h14.5M15.5 5l3 3-3 3" />
      <path d="M20 16H5.5M8.5 13l-3 3 3 3" />
    </>
  ),
  undo: (
    <>
      <path d="M9 13.5 4.5 9 9 4.5" />
      <path d="M4.5 9H14a5.5 5.5 0 0 1 0 11h-3" />
    </>
  ),
  back: <path d="M15 5l-7 7 7 7" />,
  close: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  chevL: <path d="M14.5 6l-6 6 6 6" />,
  chevR: <path d="M9.5 6l6 6-6 6" />,
  arrowR: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  play: <path d="M8 5.5v13l10.5-6.5Z" fill="currentColor" />,
  restart: (
    <>
      <path d="M4.8 12a7.2 7.2 0 1 0 2.1-5.1" />
      <path d="M4.8 4.6v4.2H9" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4 21.2 19.5H2.8Z" />
      <path d="M12 10v4.4M12 17.1v.1" />
    </>
  ),
  // Asimmetria destra/sinistra: bilancia con piatti a quote diverse.
  balance: (
    <>
      <path d="M12 4v16M8 20h8" />
      <path d="M5 8.5 19 6" />
      <path d="M5 8.5 2.8 13.5h4.4Z" />
      <path d="M19 6l-2.2 5h4.4Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6Z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5.2a4 4 0 0 1-8 0Z" />
      <path d="M8 6H5.2a3 3 0 0 0 3 4.2M16 6h2.8a3 3 0 0 1-3 4.2" />
      <path d="M12 13.2v3.3M8.5 20h7M9.8 16.5h4.4" />
    </>
  ),
};

// Manubrio generico per il peso nelle righe piccole (a 14 px il kettlebell è ambiguo).
PATHS.dumbbell = PATHS.sessions;

export default function Icon({ name, size = 22, stroke = 1.9, style, title }) {
  const p = PATHS[name];
  if (!p) return null;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round"
      role={title ? "img" : undefined} aria-hidden={title ? undefined : true}
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      {title && <title>{title}</title>}
      {p}
    </svg>
  );
}

// Icona per una voce della settimana o una sessione:
// Upper A/C (petto + bicipiti) → push, Upper B (dorso) → pull, Gambe → legs.
export const iconForSession = (s) => sessionKind(s);
export const iconForDay = (sid) => (sid === "rest" ? "rest" : sid ? sessionKind({ id: sid }) : "off");
