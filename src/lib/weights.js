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
// Senza numeri: "corpo libero" parte da 0, "da calibrare" da un valore neutro.
export function suggestedMax(text, fallback = 20) {
  const nums = parseWeights(text);
  if (nums.length) return Math.max(...nums);
  return /corpo libero/i.test(String(text || "")) ? 0 : fallback;
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

// Sulle macchine assistite il carico è un'assistenza (negativa): arriva al massimo a 0,
// cioè esercizio a corpo libero. Altrove il tetto è solo una protezione.
export function maxWeight(text) {
  return parseWeights(text).some((n) => n < 0) ? 0 : 400;
}

export const clampWeight = (n, text) => Math.min(maxWeight(text), Math.max(minWeight(text), roundWeight(n)));

// Numero pulito, con il segno meno tipografico (−) come nella scheda.
export const fmtWeight = (n) => {
  if (n == null || Number.isNaN(n)) return "—";
  const abs = Math.abs(n);
  const s = Number.isInteger(abs) ? String(abs) : abs.toFixed(1).replace(/\.0$/, "");
  return n < 0 ? `\u2212${s}` : s;
};
