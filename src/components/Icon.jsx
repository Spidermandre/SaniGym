import { PIXELS, GRID, pixelPath } from "./pixelIcons.js";
import { sessionKind } from "../lib/program.js";

// Icone pixel-art (griglia 12×12). La dimensione viene portata al multiplo di 12
// più vicino, così ogni pixel della griglia occupa un numero intero di pixel CSS.
const PATHS = Object.fromEntries(Object.entries(PIXELS).map(([k, rows]) => [k, pixelPath(rows)]));

export default function Icon({ name, size = 24, glow = true, style, title }) {
  const d = PATHS[name];
  if (!d) return null;
  const px = Math.max(GRID, Math.round(size / GRID) * GRID);
  return (
    <svg
      width={px} height={px} viewBox={`0 0 ${GRID} ${GRID}`}
      shapeRendering="crispEdges"
      role={title ? "img" : undefined} aria-hidden={title ? undefined : true}
      style={{ display: "block", flexShrink: 0, ...(glow ? { filter: "drop-shadow(0 0 3px rgba(57,255,20,.5))" } : {}), ...style }}
    >
      {title && <title>{title}</title>}
      <path d={d} fill="currentColor" />
    </svg>
  );
}

// Icona per una voce della settimana o una sessione:
// Upper A/C (petto + bicipiti) → push, Upper B (dorso) → pull, Gambe → legs.
export const iconForSession = (s) => sessionKind(s);
export const iconForDay = (sid) => (sid === "rest" ? "rest" : sid ? sessionKind({ id: sid }) : "off");
