// Regole della scheda Rev. 6 tradotte in funzioni.
// Nessun valore della scheda viene modificato: qui si leggono e si combinano.

import { suggestedMax } from "./weights.js";

// ── RIR ──────────────────────────────────────────────────────────────────────
// Il campo `rir` di un esercizio è una fascia ("2-3", "1-2", "3") oppure una
// fascia per lato ("2 dx / 1-2 sx"). La settimana del blocco dà un obiettivo
// per tipo di esercizio (`rirMulti` / `rirIso`).
//
// RIR mostrato = il più prudente tra obiettivo della settimana e minimo
// dell'esercizio. Così:
//  • i vincoli clinici dell'esercizio (es. "2 dx", face pull "3") non scendono mai;
//  • la calibrazione (sett. 1, RIR 3) e il deload (sett. 6, RIR 4) restano rispettati
//    anche dove la fascia dell'esercizio sarebbe più bassa.

function parseRange(s) {
  const m = String(s || "").match(/(\d+)(?:\s*-\s*(\d+))?/);
  if (!m) return null;
  const a = Number(m[1]);
  const b = m[2] != null ? Number(m[2]) : a;
  return { min: Math.min(a, b), max: Math.max(a, b) };
}

export function parseRir(rir) {
  const text = String(rir || "");
  if (/\bdx\b/i.test(text) && /\bsx\b/i.test(text)) {
    const parts = text.split("/");
    const dx = parseRange(parts.find((p) => /\bdx\b/i.test(p)));
    const sx = parseRange(parts.find((p) => /\bsx\b/i.test(p)));
    if (dx && sx) return { dx, sx };
  }
  const all = parseRange(text);
  return all ? { all } : null;
}

export function weekTarget(ex, block) {
  if (!block) return null;
  return ex.type === "multi" ? block.rirMulti : block.rirIso;
}

// Restituisce { all: n } oppure { dx: n, sx: n }.
export function effectiveRir(ex, block) {
  const t = weekTarget(ex, block);
  const parsed = parseRir(ex.rir);
  if (!parsed) return t == null ? null : { all: t };
  const pick = (range) => (t == null ? range.min : Math.max(t, range.min));
  return parsed.all ? { all: pick(parsed.all) } : { dx: pick(parsed.dx), sx: pick(parsed.sx) };
}

export function fmtRir(r) {
  if (!r) return "";
  return r.all != null ? `RIR ${r.all}` : `RIR ${r.dx} dx · ${r.sx} sx`;
}

// ── Asimmetria destra/sinistra ───────────────────────────────────────────────
// Le serie del lato destro sono scritte nella nota ("A DESTRA: … 2 serie …"):
// si leggono da lì. Se la nota non le indica, il destro fa le stesse serie del sinistro.
export function rightSideSets(note) {
  const m = String(note || "").match(/A DESTRA[^.]*?(\d+)\s+serie/i);
  return m ? Number(m[1]) : null;
}

// Peso consigliato per lato: "12–14 kg dx / 16–18 kg sx" → dx 14, sx 18.
// Se il testo non distingue i lati, entrambi partono dal valore più alto indicato.
export function suggestedForSide(text, side) {
  const parts = String(text || "").split("/");
  const own = parts.find((p) => new RegExp(`\\b${side}\\b`, "i").test(p));
  return suggestedMax(own || text);
}

// ── Tipologia di seduta (per l'icona) ────────────────────────────────────────
export function sessionKind(session) {
  const id = String(session?.id || "");
  if (id === "legs") return "legs";
  if (id === "upperB") return "pull";
  return "push";
}
