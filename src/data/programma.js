// ═══════════════════════════════════════════════════════════════════════════════
//  SANIFIT — SCHEDA REV. 6
//  3 Upper (priorità PETTO + BICIPITI) + 1 Gambe · 55-60 min a seduta
//  Giorni: LUNEDÌ · MERCOLEDÌ · GIOVEDÌ · VENERDÌ
//
//  ORDINE DELLE SEDUTE — non è arbitrario:
//   Lun Upper A (petto + bicipiti) · Mer Upper B (dorso/spalle, zero flessione
//   di gomito) · Gio GAMBE · Ven Upper C (petto + bicipiti).
//   Mer-Gio-Ven sono tre giorni consecutivi: il giorno gambe sta in mezzo
//   perché è l'unico in cui cingolo scapolare e gomito dx non lavorano,
//   e spezza il blocco upper. Le due sedute di bicipiti (Lun e Ven) restano
//   distanti 4 giorni, seguite da 2 giorni pieni di riposo.
// ═══════════════════════════════════════════════════════════════════════════════
//  Soggetto: uomo 41 anni, 178 cm, 73 kg, longilineo, esperienza avanzata.
//
//  VINCOLI CLINICI — NON NEGOZIABILI, PREVALGONO SU OGNI EVIDENZA GENERALE:
//   • trapezio superiore dx / plesso cervicale: niente shrug, niente trazioni
//     dietro la nuca, niente pressate overhead pesanti, calore pre-sessione,
//     face pull 🛡 in ogni seduta upper
//   • nervo mediano dx + gomito dx: prese neutre o prone, zero supinazione sotto
//     carico a destra, gomito dx mai oltre 90° in spinta, MAI cedimento a destra
//   • intensità prescritta dal fisiatra: 60-70 % del massimale stimato
//   • STOP immediato con parestesie o formicolio al braccio/mano dx
//
//  BASE DECISIONALE (ricerca + revisione in contraddittorio, ott. 2026):
//   • Volume: petto 16 serie/sett, bicipiti 14, non prioritari 5-13.
//     Il "tetto di 11 serie per seduta" citato in letteratura è un punto oltre
//     cui il beneficio non è più distinguibile, NON una soglia di danno: qui
//     nessun muscolo supera comunque 7 serie per seduta.
//   • RIR: 2-3 sui multiarticolari, 1-2 sugli isolamenti, MAI 0.
//     Il cedimento non è necessario per l'ipertrofia ed è controindicato con
//     un'irritazione nervosa periferica: massimizza pressione intramuscolare
//     ed edema proprio dove il mediano è vulnerabile.
//   • Il 60-70 % 1RM prescritto NON è in contraddizione con l'ipertrofia:
//     a parità di prossimità al cedimento i range 6-30 rip si equivalgono.
//     Lo è invece con il cedimento: fermarsi a 2 RIR concilia le due cose.
//   • Bicipiti su 2 sedute, non 3: il gomito dx è il collo di bottiglia.
//     La terza seduta upper (Upper B) non ha alcun lavoro diretto di flessione
//     del gomito ed è la "seduta di scarico" dell'articolazione.
//   • Lato destro sempre unilaterale sugli isolamenti di braccio, con una serie
//     in meno e carico indipendente dal sinistro.
//   • Niente drop set, myo-rep, cluster o eccentriche sovraccaricate su nulla
//     che coinvolga il gomito dx: accumulano ripetizioni in fatica massima.
//   • Superset solo tra distretti anatomicamente lontani dal collo. I superset
//     agonista-antagonista push/pull sono esclusi: alzano RPE e fatica, e il
//     primo compensatore sotto fatica è proprio il trapezio superiore dx.
//   • Deload ogni 6 settimane (volume −40 %, stessi carichi), non ogni 8-12:
//     il limite qui è articolare e nervoso, non muscolare.
//
//  I pesi sono PUNTI DI PARTENZA: settimana 1 = calibrazione a RIR 3.
//  Doppia progressione: raggiunto il tetto del range in tutte le serie al RIR
//  previsto → +2.5 kg (macchine/cavi) o +2 kg per manubrio.
// ═══════════════════════════════════════════════════════════════════════════════

export const PROGRAM_META = {
  name: "SaniFit",
  revision: 6,
  subtitle: "Ipertrofia · 3 Upper (petto + bicipiti) + 1 Gambe · Rev. 6",
  split: "Lun Upper A · Mer Upper B · Gio Gambe · Ven Upper C",
  sessionMinutes: 60,
  blockWeeks: 6,
};

// Blocco di 6 settimane — mostrato in Home come "Settimana X/6 · RIR target"
export const BLOCK = [
  { week: 1, rirMulti: 3, rirIso: 3, label: "Calibrazione", volumeFactor: 1,
    note: "Trova i carichi. Nessuna serie oltre RIR 3. Impara i nuovi esercizi." },
  { week: 2, rirMulti: 3, rirIso: 2, label: "Accumulo", volumeFactor: 1,
    note: "Carichi stabiliti. Aumenta solo se il range è pieno in tutte le serie." },
  { week: 3, rirMulti: 2, rirIso: 2, label: "Accumulo", volumeFactor: 1,
    note: "Cerca +1 ripetizione o +2.5 kg rispetto alla settimana scorsa." },
  { week: 4, rirMulti: 2, rirIso: 1, label: "Progressione", volumeFactor: 1,
    note: "Isolamenti a 1 RIR. Il lato destro resta a 2 RIR, sempre." },
  { week: 5, rirMulti: 2, rirIso: 1, label: "Picco", volumeFactor: 1,
    note: "Settimana più dura del blocco. Mai cedimento, mai a destra." },
  { week: 6, rirMulti: 4, rirIso: 4, label: "Deload", volumeFactor: 0.6,
    note: "Volume −40 %, stessi carichi. Serve a tendini e nervi, non è facoltativo." },
];

export const SESSIONS = [
  // ──────────────────────────────────────────────────────────── UPPER A ──────
  {
    id: "upperA", day: "Lunedì", label: "Upper A", subtitle: "Petto + Bicipiti",
    tag: "Priorità", emoji: "🔴", grad: ["#fb7185", "#be123c"],
    sessionNote: "Seduta prioritaria: petto e bicipiti per primi, quando sei fresco e dopo due giorni pieni di recupero. 20 serie, ~55 min.",
    exercises: [
      {
        name: "Chest Press Machine Convergente (presa neutra)",
        focus: "Petto sternale", sets: 4, reps: "10-12", rest: 150, weight: "55–60 kg",
        tempo: "3-1-1", rir: "2-3", type: "multi",
        note: "Primo esercizio della settimana sul muscolo prioritario. Scapole addotte e depresse, schiena aderente. Le braccia convergono: lascia che le mani si avvicinino in chiusura. Gomito dx mai oltre 90°. Recupero pieno 2'30''.",
        alt: { name: "Chest Press Machine Piana (presa neutra)", weight: "55–60 kg", note: "Stessa funzione, percorso non convergente." },
      },
      {
        name: "Croci ai Cavi, Puleggia Media (pausa in allungamento)",
        focus: "Petto (fibre medie)", sets: 3, reps: "12-15", rest: 90, weight: "10–12 kg / lato",
        tempo: "3-2-1", rir: "1-2", type: "iso",
        note: "Il lavoro vero è nell'apertura: 2'' di pausa con il petto in allungamento, mai oltre la soglia del fastidio, poi chiudi. La posizione allungata è il criterio con cui è stato scelto questo esercizio. Braccia quasi tese: il gomito dx non flette sotto carico.",
        alt: { name: "Pec Deck / Butterfly Machine", weight: "45–50 kg", note: "Arco ampio, pausa 2'' in apertura, chiusura lenta." },
      },
      {
        name: "Lat Machine (presa neutra, impugnatura a V)",
        focus: "Gran dorsale", sets: 3, reps: "10-12", rest: 150, weight: "55–62 kg",
        tempo: "3-1-1", rir: "2-3", type: "multi",
        note: "Presa parallela: la più protettiva per il gomito dx. Deprimi le scapole PRIMA di tirare, barra alla parte alta del petto, mai dietro la nuca. Eccentrica lenta fino a braccia quasi distese.",
        alt: { name: "Pulldown Unilaterale al Cavo (presa neutra)", weight: "25–30 kg", note: "Un braccio alla volta, pausa 2'' in allungamento. Inizia dal destro." },
      },
      {
        name: "Incline Hammer Curl (panca 45°)",
        focus: "Brachiale + bicipite (allungato)", sets: 4, reps: "12-15", rest: 90, weight: "12–14 kg / braccio",
        tempo: "3-1-1", rir: "1-2", type: "iso",
        note: "Schienale a 45°, braccia che pendono dietro la linea del busto: bicipite in allungamento. Presa a martello per tutto il ROM, zero supinazione. Esegui un braccio alla volta: il destro parte per primo e usa il SUO carico, non quello del sinistro.",
        alt: { name: "Curl Machine (seduta, presa neutra)", weight: "35–40 kg", note: "Percorso guidato: usala nelle giornate in cui il gomito dx non è al 100%." },
      },
      {
        name: "Curl al Cavo Braccio Singolo (presa neutra) — dx 2 serie",
        focus: "Bicipite (picco)", sets: 3, reps: "12-15", rest: 90, weight: "12–14 kg dx / 16–18 kg sx",
        tempo: "3-1-1", rir: "2 dx / 1-2 sx", type: "iso",
        asymmetric: true,
        note: "Asimmetria terapeutica. A DESTRA: maniglia a presa neutra, 2 serie soltanto, mai sotto RIR 2. A SINISTRA: 3 serie, presa supina consentita. Gomito fermo al fianco, niente slancio.",
        alt: { name: "Cross-Body Hammer Curl (manubrio)", weight: "14–16 kg", note: "Verso la spalla opposta, zero supinazione. Stessa asimmetria dx/sx." },
      },
      {
        name: "Face Pull al Cavo 🛡",
        focus: "Cuffia + deltoide posteriore", sets: 3, reps: "15", rest: 60, weight: "15–18 kg",
        tempo: "2-1-2", rir: "3", type: "iso",
        note: "TERAPEUTICO — non si salta mai, chiude ogni seduta upper. Corda alla puleggia alta, tira verso il viso aprendo i gomiti, rotazione esterna a fine movimento. Mai a cedimento.",
        alt: null,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────── UPPER B ──────
  {
    id: "upperB", day: "Mercoledì", label: "Upper B", subtitle: "Dorso · Spalle · Tricipiti",
    tag: "Scarico gomito", emoji: "🔵", grad: ["#38bdf8", "#0c4a6e"],
    sessionNote: "19 serie, ~55 min. ZERO lavoro diretto di flessione del gomito: apre il blocco di tre giorni consecutivi e fa riposare l'articolazione destra tra Upper A e Upper C.",
    exercises: [
      {
        name: "Lat Machine Presa Larga Prona (al petto)",
        focus: "Gran dorsale (larghezza)", sets: 4, reps: "10-12", rest: 150, weight: "50–55 kg",
        tempo: "3-1-1", rir: "2-3", type: "multi",
        note: "Angolo e presa diversi da Upper A. Larghezza appena oltre le spalle, non di più. Scapole depresse prima di tirare, barra alla parte alta del petto. Mai dietro la nuca.",
        alt: { name: "Pulldown Machine (presa prona)", weight: "50–55 kg", note: "Versione a percorso guidato." },
      },
      {
        name: "Rematore Chest-Supported (presa neutra)",
        focus: "Dorsale + romboidi", sets: 3, reps: "10-12", rest: 150, weight: "55–60 kg",
        tempo: "2-1-2", rir: "2-3", type: "multi",
        note: "Petto appoggiato al supporto: elimina il carico su cervicale e lombari, che è esattamente il motivo per cui questa variante è qui invece del rematore libero. Tira i gomiti indietro e in basso. Collo neutro, non alzare la testa.",
        alt: { name: "Rematore Manubri su Panca Inclinata 30°", weight: "20–22 kg / braccio", note: "Petto sulla panca, presa neutra, ROM più lungo." },
      },
      {
        name: "Chest Press Machine Inclinata (presa neutra)",
        focus: "Petto clavicolare", sets: 3, reps: "10-12", rest: 120, weight: "45–50 kg",
        tempo: "3-1-1", rir: "2-3", type: "multi",
        note: "Dose di mantenimento del petto nella seduta intermedia: 3 serie bastano a tenere alta la frequenza senza affaticare il deltoide anteriore, che lavora già nelle altre due sedute. Schienale a 30-45°.",
        alt: { name: "Panca Inclinata Manubri 30° (presa neutra)", weight: "20–22 kg / braccio", note: "Palmi che si guardano, manubri in linea con il petto." },
      },
      {
        name: "Lateral Raise Machine (seduta)",
        focus: "Deltoide laterale", sets: 3, reps: "12-15", rest: 90, weight: "25–30 kg",
        tempo: "2-1-2", rir: "1-2", type: "iso",
        note: "Cuscinetti sopra il gomito, non sull'avambraccio: niente leva sul gomito dx. Sali fino a braccia parallele al pavimento, mai oltre. Spalle BASSE: se senti il trapezio dx salire, il carico è troppo alto — scendi di peso, non 'stringere i denti'.",
        alt: { name: "Alzate Laterali al Cavo (braccio singolo)", weight: "5–7 kg", note: "Cavo basso dietro il corpo, spalla depressa." },
      },
      {
        name: "Overhead Triceps Extension al Cavo (corda)",
        focus: "Tricipite (capo lungo)", sets: 3, reps: "12-15", rest: 90, weight: "22–26 kg",
        tempo: "3-1-1", rir: "2", type: "iso",
        note: "Il capo lungo lavora in allungamento solo qui: il pushdown non lo allunga. È estensione, non flessione, quindi è l'unico lavoro di gomito ammesso in questa seduta — ma resta a 2 RIR e senza tecniche di intensità. Il gomito dx guida il ROM: fermati dove è comodo.",
        alt: { name: "Pushdown al Cavo (corda, presa neutra)", weight: "26–30 kg", note: "Gomiti fissi al fianco, apri la corda in basso." },
      },
      {
        name: "Face Pull al Cavo 🛡",
        focus: "Cuffia + deltoide posteriore", sets: 3, reps: "15", rest: 60, weight: "15–18 kg",
        tempo: "2-1-2", rir: "3", type: "iso",
        note: "TERAPEUTICO — non si salta mai. Dopo una seduta di sole trazioni è ancora più importante: riequilibra la rotazione della spalla.",
        alt: null,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────── GAMBE ────────
  {
    id: "legs", day: "Giovedì", label: "Gambe", subtitle: "Quadricipiti · Femorali · Polpacci",
    tag: "Full lower", emoji: "🦵", grad: ["#a78bfa", "#4338ca"],
    sessionNote: "17 serie, ~45 min. Collocata al centro del blocco Mer-Gio-Ven: è il giorno in cui il cingolo scapolare e il gomito destro non lavorano affatto. 7 serie di quadricipiti, 6 di femorali e glutei, 4 di polpacci.",
    exercises: [
      {
        name: "Pressa 45° (piedi a media altezza)",
        focus: "Quadricipiti + glutei", sets: 4, reps: "10-12", rest: 150, weight: "da calibrare",
        tempo: "3-1-1", rir: "2-3", type: "multi",
        note: "Esercizio principale della seduta. Schiena e bacino aderenti allo schienale per tutta la discesa: appena il bacino si stacca hai superato il tuo ROM. Non bloccare le ginocchia in alto. Le braccia non fanno nulla: nessun carico sul cingolo scapolare.",
        alt: { name: "Hack Squat Machine", weight: "da calibrare", note: "Stessa funzione, maggiore enfasi sul quadricipite." },
      },
      {
        name: "Leg Curl Seduto",
        focus: "Femorali (allungati)", sets: 4, reps: "10-12", rest: 90, weight: "da calibrare",
        tempo: "3-1-1", rir: "1-2", type: "iso",
        note: "Seduto e non prono: l'anca flessa mette i femorali in allungamento, ed è la ragione per cui questo esercizio è qui. Pausa 1'' in basso, eccentrica controllata. Superset con il leg extension per risparmiare tempo (distretto lontano dal collo: consentito).",
        alt: { name: "Leg Curl Sdraiato (prono)", weight: "da calibrare", note: "Variante se il seduto non è disponibile. Bacino aderente." },
      },
      {
        name: "Leg Extension",
        focus: "Quadricipiti (retto femorale)", sets: 3, reps: "12-15", rest: 90, weight: "da calibrare",
        tempo: "2-1-2", rir: "1-2", type: "iso",
        note: "In superset con il leg curl: alterna le serie con 90'' tra un esercizio e l'altro, così ogni muscolo riposa circa 3 minuti e la seduta si accorcia di 8-10 minuti. Niente drop set.",
        alt: { name: "Sissy Squat alla Macchina", weight: "corpo libero", note: "Solo se le ginocchia sono asintomatiche." },
      },
      {
        name: "Hip Extension 45° (o Cable Pull-Through)",
        focus: "Femorali + glutei (hip hinge)", sets: 2, reps: "12-15", rest: 90, weight: "corpo libero o 10–15 kg",
        tempo: "3-1-1", rir: "2-3", type: "iso",
        note: "Sostituisce lo stacco rumeno: stesso pattern di hip hinge senza carico assiale sulla colonna e senza tenere un bilanciere con le mani — il gomito e la cervicale restano fuori. Schiena neutra, movimento guidato dall'anca.",
        alt: { name: "Cable Pull-Through", weight: "25–30 kg", note: "Corda tra le gambe dalla puleggia bassa, spinta d'anca." },
      },
      {
        name: "Calf alla Pressa (ginocchia quasi tese)",
        focus: "Gastrocnemio + soleo", sets: 4, reps: "12-20", rest: 60, weight: "da calibrare",
        tempo: "2-2-1", rir: "1-2", type: "iso",
        note: "Pausa di 2'' in massimo allungamento a ogni ripetizione: è lì che il polpaccio cresce. Niente rimbalzi. ROM completo, mai parziali veloci.",
        alt: { name: "Calf Raise Machine in Piedi", weight: "da calibrare", note: "Attenzione: se il cuscinetto carica le spalle, usa la versione alla pressa." },
      },
    ],
  },

  // ──────────────────────────────────────────────────────────── UPPER C ──────
  {
    id: "upperC", day: "Venerdì", label: "Upper C", subtitle: "Petto + Bicipiti (volume)",
    tag: "Priorità", emoji: "🟢", grad: ["#34d399", "#065f46"],
    sessionNote: "21 serie prevalentemente di isolamento, ~50 min. Seconda e ultima esposizione settimanale del gomito destro, a 4 giorni da Upper A e seguita da due giorni di riposo.",
    exercises: [
      {
        name: "Panca Piana Manubri (presa neutra)",
        focus: "Petto sternale", sets: 3, reps: "10-12", rest: 150, weight: "22–24 kg / braccio",
        tempo: "3-1-1", rir: "2-3", type: "multi",
        note: "Angolo piano, che manca nelle altre due sedute. Palmi che si guardano per tutto il set. Scendi fino ai manubri all'altezza del petto, mai oltre 90° al gomito dx. Scapole depresse e addotte.",
        alt: { name: "Chest Press Machine Piana (presa neutra)", weight: "55–60 kg", note: "Versione guidata: usala se il gomito dx dà segnali." },
      },
      {
        name: "Croci ai Cavi, Alto → Basso",
        focus: "Petto (fibre inferiori)", sets: 3, reps: "12-15", rest: 90, weight: "12–14 kg / lato",
        tempo: "3-1-1", rir: "1-2", type: "iso",
        note: "Terzo angolo settimanale sul petto. Pulegge alte, mani che si incontrano all'altezza dell'anca. Scapole depresse: non lasciare che le spalle salgano verso il trapezio dx a fine serie.",
        alt: { name: "Croci ai Cavi, Basso → Alto", weight: "12–14 kg / lato", note: "Porzione alta e clavicolare del petto." },
      },
      {
        name: "Pulldown Unilaterale al Cavo (presa neutra)",
        focus: "Gran dorsale (unilaterale)", sets: 3, reps: "10-12", rest: 120, weight: "25–30 kg",
        tempo: "3-2-1", rir: "2-3", type: "multi",
        note: "Lavoro unilaterale: il lato destro usa il proprio carico senza essere trascinato dal sinistro. Lascia salire il braccio e la scapola (allungamento), pausa 2'', poi tira il gomito verso l'anca. Inizia dal destro.",
        alt: { name: "Pullover Machine", weight: "40–48 kg", note: "Dorsale senza flettere i gomiti. Spalle depresse." },
      },
      {
        name: "Curl al Cavo Braccio Singolo (presa neutra) — dx 3 serie",
        focus: "Bicipite", sets: 3, reps: "12-15", rest: 90, weight: "12–14 kg dx / 16–18 kg sx",
        tempo: "3-1-1", rir: "2 dx / 1-2 sx", type: "iso",
        asymmetric: true,
        note: "A DESTRA: 2 serie, presa neutra fissa, mai sotto RIR 2, nessuna tecnica di intensità. A SINISTRA: 3 serie, presa supina consentita. Gomito fermo al fianco. Se compare formicolio alla mano destra, chiudi qui il lavoro di braccio.",
        alt: { name: "Curl Machine (seduta)", weight: "35–40 kg", note: "Percorso guidato, braccio appoggiato al supporto." },
      },
      {
        name: "Cross-Body Hammer Curl (manubrio)",
        focus: "Brachiale + brachioradiale", sets: 3, reps: "12-15", rest: 90, weight: "14–16 kg / braccio",
        tempo: "2-1-2", rir: "2 dx / 1-2 sx", type: "iso",
        asymmetric: true,
        note: "Presa a martello, manubrio verso la spalla opposta: massimo lavoro del brachiale, zero supinazione. Alterna dx e sx. Il destro non va mai a cedimento, nemmeno nell'ultima serie.",
        alt: { name: "Curl al Cavo con Corda (presa neutra)", weight: "20–24 kg", note: "Corda alla puleggia bassa, presa neutra o leggermente prona." },
      },
      {
        name: "Alzate Laterali al Cavo (braccio singolo)",
        focus: "Deltoide laterale", sets: 2, reps: "12-15", rest: 60, weight: "5–7 kg",
        tempo: "2-1-2", rir: "1-2", type: "iso",
        note: "Cavo basso dietro il corpo, busto leggermente inclinato. Sali fino a 80-90°, mai oltre. Spalla depressa: alla prima avvisaglia di compenso del trapezio dx, chiudi la serie.",
        alt: { name: "Lateral Raise Machine", weight: "25–30 kg", note: "Cuscinetti sopra il gomito, schiena appoggiata." },
      },
      {
        name: "Pushdown al Cavo (corda, presa neutra)",
        focus: "Tricipite (capi laterale e mediale)", sets: 2, reps: "12-15", rest: 60, weight: "26–30 kg",
        tempo: "2-1-1", rir: "2", type: "iso",
        note: "Completa l'overhead extension di Upper B sugli altri due capi. Gomiti fissi al fianco, apri la corda in basso. Volume volutamente basso: il tricipite lavora già in tutte le spinte e il gomito dx ha una quota settimanale limitata.",
        alt: { name: "Dip Machine Assistita (busto eretto)", weight: "−15 / −20 kg assist", note: "ROM guidato, mai oltre 90° al gomito dx." },
      },
      {
        name: "Face Pull al Cavo 🛡",
        focus: "Cuffia + deltoide posteriore", sets: 3, reps: "15", rest: 60, weight: "15–18 kg",
        tempo: "2-1-2", rir: "3", type: "iso",
        note: "TERAPEUTICO — non si salta mai. Chiude la settimana: è l'esercizio che tiene insieme tutto il resto.",
        alt: null,
      },
    ],
  },
];

// Protocollo cervicale + plesso brachiale — INVARIATO (protocollo clinico)
export const MOBILITY = {
  pre: [
    { name: "Calore trapezio destro",           dur: "5-8 min",                 tech: "Borsa del calore prima di iniziare — mai saltare" },
    { name: "Rotazioni cervicali lente",        dur: "10 cerchi / lato",        tech: "Cerchio piccolo e controllato — mai forzare il ROM" },
    { name: "Inclinazione laterale cervicale",  dur: "5 × 30'' / lato",         tech: "Orecchio verso spalla, mento neutro" },
    { name: "Chin Tuck (retrazione cervicale)", dur: "2 × 10 rip, tieni 3''",   tech: "Mento indietro — attiva i flessori profondi del collo" },
    { name: "Cerchi con le spalle",             dur: "10 avanti + 10 indietro", tech: "Ampi e lenti — scalda cuffia e scapola" },
    { name: "Scapular Depression Attiva",       dur: "2 × 10 rip, tieni 3''",   tech: "Spingi le spalle verso il basso senza muovere il collo" },
    { name: "Rotazioni esterne spalla",         dur: "2 × 15 rip",              tech: "Gomito 90°, braccio al fianco — attiva i rotatori esterni" },
    { name: "Serie di avvicinamento",           dur: "2 serie leggere",         tech: "Sul primo esercizio: 1 × 12 al 40 % e 1 × 6 al 60 % del carico di lavoro" },
  ],
  post: [
    { name: "Stretching trapezio superiore dx", dur: "3 × 40'' / lato",         tech: "Inclina controlateralmente, mano dietro la schiena" },
    { name: "Stretching SCM destro",            dur: "2 × 40'' / lato",         tech: "Ruota il mento dal lato opposto + lieve estensione" },
    { name: "Stretching scaleni",               dur: "2 × 30'' / lato",         tech: "Inclina lateralmente, mento verso l'alto di 15°" },
    { name: "Doorway Stretch",                  dur: "3 × 30''",                tech: "Avambracci sullo stipite a 90° — un passo avanti" },
    { name: "Child's Pose (braccia laterali)",  dur: "2 × 40''",                tech: "Braccia a lato verso avanti — decomprime la catena" },
    { name: "Thread the Needle",                dur: "5 rip / lato",            tech: "A 4 zampe — mobilizza la colonna toracica" },
    { name: "Chin Tuck + Retrazione Scapolare", dur: "2 × 10 rip, tieni 5''",   tech: "Mento indietro + scapole verso centro e basso" },
    { name: "Respirazione Diaframmatica",       dur: "2 minuti",                tech: "Inspira 4'' · tieni 2'' · espira 6''" },
  ],
  rest: [
    { name: "Slump Test Passivo",               dur: "2 × 30'' / lato",         tech: "Seduto, mento al petto, estendi il ginocchio lentamente" },
    { name: "Nerve Glide (nervo mediano)",      dur: "2 × 10 rip / lato",       tech: "Braccio a 90°, polso in estensione, capo controlaterale" },
    { name: "Wall Angel",                       dur: "2 × 10 rip",              tech: "Schiena al muro — da W a Y mantenendo il contatto" },
    { name: "Foam Rolling trapezio",            dur: "60'' / lato",             tech: "Pressione moderata — niente dolore acuto" },
    { name: "Camminata o bici leggera",         dur: "20-30 min",               tech: "Zona 2, conversazione possibile. Recupero, non allenamento" },
  ],
};

export const WEEK = [
  { day: "LUN", sid: "upperA" }, { day: "MAR", sid: "rest" },   { day: "MER", sid: "upperB" },
  { day: "GIO", sid: "legs" },   { day: "VEN", sid: "upperC" }, { day: "SAB", sid: "rest" },
  { day: "DOM", sid: null },
];

// ── VOLUME SETTIMANALE (serie dirette) ────────────────────────────────────────
export const VOLUME = [
  { muscle: "Petto",             sets: 16, sessions: 3, priority: true,  note: "Gruppo prioritario. 7 + 3 + 6, mai più di 7 per seduta." },
  { muscle: "Bicipiti",          sets: 13, sessions: 2, priority: true,  note: "Gruppo prioritario ma su 2 sedute sole: il gomito dx è il limite. A destra 11 serie effettive." },
  { muscle: "Dorso",             sets: 13, sessions: 3, priority: false, note: "Volume di progressione. Aggiunge serie indirette ai bicipiti." },
  { muscle: "Cuffia / delt. post", sets: 9, sessions: 3, priority: false, note: "Face pull 🛡 in ogni seduta upper. Terapeutico, non negoziabile." },
  { muscle: "Deltoide laterale", sets: 5,  sessions: 2, priority: false, note: "Volume contenuto: il trapezio dx compensa facilmente sulle alzate." },
  { muscle: "Tricipiti",         sets: 5,  sessions: 2, priority: false, note: "Più ~8 serie indirette dalle spinte. Basso per scelta: quota gomito limitata." },
  { muscle: "Quadricipiti",      sets: 7,  sessions: 1, priority: false, note: "Pressa + leg extension." },
  { muscle: "Femorali / glutei", sets: 6,  sessions: 1, priority: false, note: "Leg curl seduto + hip hinge." },
  { muscle: "Polpacci",          sets: 4,  sessions: 1, priority: false, note: "Tutte nel giorno gambe, con pausa di 2'' in allungamento a ogni ripetizione." },
];

// ── REGOLE DI SICUREZZA (mostrate in app) ─────────────────────────────────────
export const SAFETY_RULES = [
  "Mai cedimento muscolare: il minimo è 1 RIR sugli isolamenti, 2 sui multiarticolari.",
  "Il lato destro non va MAI sotto 2 RIR, in nessun esercizio, in nessuna settimana.",
  "Niente drop set, myo-rep, cluster o eccentriche forzate: su nulla, mai.",
  "Prese neutre o prone a destra. Zero supinazione sotto carico.",
  "Gomito destro mai oltre 90° di flessione in spinta.",
  "Se il trapezio destro sale o si irrigidisce durante una serie: chiudi la serie e riduci il carico.",
  "Parestesie o formicolio alla mano destra, durante o nelle 24 h successive: riduci del 30 % il volume di braccio nella settimana seguente e segnala al fisiatra.",
];
