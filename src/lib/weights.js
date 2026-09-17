// Interpretazione del peso consigliato scritto nella scheda.
// I valori sono testo libero: "45–50 kg", "20–22 kg / braccio",
// "−15 / −20 kg assist", "12–14 kg dx / 16–18 kg sx".
// Il trattino di range è un en-dash (–), il segno meno è U+2212 (−).

const NUM = /[−-]?\d+(?:[.,]\d+)?/g;

export function parseWeights(text) {
  if (!text) return [];
  return (String(text).match(NUM) || [])
    .map((t) => parseFloat(t.replace("−", "-").replace(",", ".")))
    .filter((n) => !Number.isNaN(n));
}

// Punto di partenza: il valore più alto indicato per l'esercizio.
export function suggestedMax(text, fallback = 20) {
  const nums = parseWeights(text);
  return nums.length ? Math.max(...nums) : fallback;
}

// I carichi negativi esistono solo per le macchine assistite ("−15 kg assist"):
// lì scendere sotto zero è legittimo, altrove no.
export function minWeight(text) {
  return parseWeights(text).some((n) => n < 0) ? -100 : 0;
}

// Progressione della scheda: +2.5 kg su macchine e cavi, +2 kg per manubrio.
export function stepFor(text) {
  return /braccio|manubri/i.test(String(text || "")) ? 2 : 2.5;
}

export const roundWeight = (n) => Math.round(n * 10) / 10;

export const clampWeight = (n, text) => Math.min(400, Math.max(minWeight(text), roundWeight(n)));

export const fmtWeight = (n) =>
  n == null || Number.isNaN(n) ? "—" : (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, ""));
