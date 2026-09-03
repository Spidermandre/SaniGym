// ═══════════════════════════════════════════════════════════════════════════════
//  SANIFIT — SCHEDA REV. 5  (Ipertrofia upper body · Push/Pull × 2 · 4 gg/sett)
// ═══════════════════════════════════════════════════════════════════════════════
//  Soggetto: uomo 41 anni, 178 cm, 73 kg, longilineo, esperienza avanzata.
//  Vincoli clinici (INVARIATI da Rev. 4 — non negoziabili):
//   • trapezio superiore dx / plesso cervicale: niente shrug, niente trazioni dietro
//     la nuca, niente pressate overhead pesanti, calore pre-sessione, face pull 🛡
//   • nervo mediano dx + gomito dx: prese neutre o prone, zero supinazione forzata
//     sotto carico a destra, ROM gomito dx mai oltre 90° in spinta
//   • intensità: 60-70 % del massimale stimato (indicazione del fisiatra)
//   • stop immediato se parestesie / formicolio braccio o mano dx
//
//  Novità Rev. 5:
//   • rotazione degli esercizi (stimolo nuovo + motivazione)
//   • enfasi sulla posizione allungata (stretch-mediated hypertrophy)
//   • deltoide laterale inserito (assente in Rev. 4)
//   • tricipiti in overhead (capo lungo allungato) al posto del solo pushdown
//   • ogni esercizio ha un'ALTERNATIVA equivalente (campo `alt`) selezionabile
//     in app: stessa funzione, pattern diverso — per variare quando serve
//   • campo `focus` (muscolo target) e `tempo` (cadenza) per ogni esercizio
//   • progressione a doppia progressione + blocco di 8 settimane con deload
//
//  I pesi sono PUNTI DI PARTENZA: settimana 1 = calibrazione a RIR 3.
//  Regola: se completi il tetto del range di rip con ≥2 rip in riserva
//  in tutte le serie → +2.5 kg (macchine/cavi) o +2 kg per manubrio.
// ═══════════════════════════════════════════════════════════════════════════════

export const PROGRAM_META = {
  name: "SaniFit",
  revision: 5,
  subtitle: "Scheda ipertrofia upper body · macchine & cavi · Rev. 5",
  split: "Push / Pull × 2 · 4 giorni a settimana",
  blockWeeks: 8,
};

// Blocco di 8 settimane — mostrato nella Home come "Settimana X/8 · RIR target"
export const BLOCK = [
  { week: 1, rir: 3,   label: "Calibrazione",  note: "Trova i carichi giusti. Nessuna serie a cedimento." },
  { week: 2, rir: 2,   label: "Accumulo",      note: "Carichi stabiliti. Aumenta solo se il range è pieno." },
  { week: 3, rir: 2,   label: "Accumulo",      note: "Stessa intensità, cerca +1 rip o +2.5 kg." },
  { week: 4, rir: 1.5, label: "Progressione",  note: "Ultima serie di ogni esercizio a RIR 1." },
  { week: 5, rir: 1,   label: "Progressione",  note: "Vicino al cedimento tecnico, mai oltre." },
  { week: 6, rir: 1,   label: "Picco",         note: "Settimana più dura del blocco." },
  { week: 7, rir: 4,   label: "Deload",        note: "Metà delle serie, stessi pesi. Recupero attivo." },
  { week: 8, rir: 3,   label: "Nuova rev.",    note: "Ruota gli esercizi (usa le alternative) e riparti." },
];

export const SESSIONS = [
  // ───────────────────────────────────────────────────────────────── PUSH A ──
  {
    id: "pushA", day: "Lunedì", label: "Push A", subtitle: "Petto alto · Spalle · Tricipiti",
    tag: "Volume", emoji: "🔴", grad: ["#fb7185", "#be123c"],
    exercises: [
      {
        name: "Incline Chest Press Machine (presa neutra)",
        focus: "Petto clavicolare", sets: 4, reps: "8-12", rest: 120, weight: "45–50 kg",
        tempo: "3-1-1", 
        note: "Sostituisce la chest press piana di Rev. 4. Schienale a 30-45°, gomiti a 45° dal busto, scapole depresse e addotte. Eccentrica in 3 secondi, fermati 1'' in basso senza perdere la tensione. Presa neutra: gomito dx protetto.",
        alt: { name: "Panca Inclinata Manubri 30° (presa neutra)", weight: "20–22 kg / braccio", note: "Stessa funzione con manubri. Regola 30°, non oltre. Manubri in linea con il petto." },
      },
      {
        name: "Panca Piana Manubri (presa neutra)",
        focus: "Petto sternale", sets: 3, reps: "10-12", rest: 90, weight: "22–24 kg / braccio",
        tempo: "2-1-1",
        note: "Al posto della macchina piana: i manubri chiedono più stabilizzazione e permettono un ROM naturale. Palmi che si guardano per tutto il set. Scendi fino a manubri all'altezza del petto, non oltre 90° al gomito dx.",
        alt: { name: "Chest Press Machine piana (presa neutra)", weight: "55–60 kg", note: "Versione guidata: usala se il gomito dx dà segnali." },
      },
      {
        name: "Cavo Croce a Puleggia Media (enfasi allungamento)",
        focus: "Petto (fibre medie)", sets: 3, reps: "12-15", rest: 60, weight: "10–12 kg / lato",
        tempo: "3-2-1",
        note: "Pulegge all'altezza del petto. Il lavoro importante è nell'apertura: 2'' di pausa con petto in allungamento (mai oltre la soglia del fastidio), poi chiudi. La contrazione in cima conta meno dell'allungamento controllato.",
        alt: { name: "Pec Deck / Butterfly Machine", weight: "45–50 kg", note: "Arco ampio, pausa 2'' in apertura, chiusura lenta." },
      },
      {
        name: "Alzate Laterali al Cavo (braccio singolo, cavo basso)",
        focus: "Deltoide laterale", sets: 3, reps: "12-15", rest: 60, weight: "5–7 kg",
        tempo: "2-1-2",
        note: "NUOVO in Rev. 5: il deltoide laterale era assente. Cavo dietro il corpo, busto leggermente inclinato lontano dalla colonna. Sali fino a 80-90°, mai oltre. Spalla depressa: se il trapezio dx si attiva e senti risalire la spalla, riduci il carico. Presa neutra sulla maniglia.",
        alt: { name: "Lateral Raise Machine (seduta)", weight: "25–30 kg", note: "Cuscinetti sopra il gomito, schiena appoggiata. Spalle basse per tutto il set." },
      },
      {
        name: "Overhead Triceps Extension al Cavo (corda)",
        focus: "Tricipite (capo lungo)", sets: 3, reps: "10-12", rest: 75, weight: "22–26 kg",
        tempo: "3-1-1",
        note: "Al posto del pushdown: allunga il capo lungo, che con il pushdown non lavora in allungamento. Corda dalla puleggia bassa, schiena al cavo, gomiti vicino alla testa. Estendi con presa neutra. Il gomito dx guida il ROM: ferma l'estensione dove è comodo.",
        alt: { name: "Tricipiti Pushdown al Cavo (corda, presa neutra)", weight: "26–30 kg", note: "Gomiti fissi al fianco, apri la corda in basso." },
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────── PULL A ──
  {
    id: "pullA", day: "Martedì", label: "Pull A", subtitle: "Dorsali · Schiena alta · Bicipiti",
    tag: "Volume", emoji: "🔵", grad: ["#38bdf8", "#0c4a6e"],
    exercises: [
      {
        name: "Lat Machine Presa Larga Prona (al petto)",
        focus: "Gran dorsale (larghezza)", sets: 4, reps: "8-12", rest: 120, weight: "50–55 kg",
        tempo: "3-1-1",
        note: "Presa diversa da Rev. 4 (era neutra stretta). Larghezza appena oltre le spalle — non esagerare. Deprimi le scapole PRIMA di tirare, porta la barra alla parte alta del petto. Eccentrica lenta fino a braccia quasi distese, con dorsale in allungamento.",
        alt: { name: "Lat Machine Presa Neutra Stretta", weight: "55–62 kg", note: "Impugnatura a V: la più protettiva per il gomito dx." },
      },
      {
        name: "Rematore Manubri su Panca Inclinata 30° (petto appoggiato)",
        focus: "Dorsale + romboidi", sets: 4, reps: "8-12", rest: 120, weight: "20–22 kg / braccio",
        tempo: "2-1-2",
        note: "Sostituisce la Chest Supported Row Machine: stesso principio (zero carico su cervicale e lombari) ma ROM libero e più lungo. Petto sulla panca, presa neutra, tira i gomiti verso il fianco. Non alzare la testa: guarda in basso, collo neutro.",
        alt: { name: "Chest Supported Row Machine", weight: "55–60 kg", note: "Versione guidata: gomiti indietro e in basso." },
      },
      {
        name: "Pulldown a Braccio Singolo al Cavo (presa neutra)",
        focus: "Gran dorsale (unilaterale)", sets: 3, reps: "10-12", rest: 60, weight: "25–30 kg",
        tempo: "3-2-1",
        note: "NUOVO: lavoro unilaterale in allungamento. In ginocchio o seduto di lato al cavo alto, lascia che il braccio salga e la scapola si elevi leggermente (allungamento dorsale), pausa 2'', poi tira il gomito verso l'anca. Inizia con il lato dx: il sx fa le stesse rip.",
        alt: { name: "Pullover Machine", weight: "40–48 kg", note: "Gran dorsale senza flettere i gomiti. Spalle depresse." },
      },
      {
        name: "Incline Hammer Curl (panca 45°)",
        focus: "Brachiale + bicipite (allungato)", sets: 3, reps: "10-12", rest: 60, weight: "12–14 kg / braccio",
        tempo: "3-1-1",
        note: "Al posto della curl machine. Seduto con schienale a 45°, braccia che pendono dietro la linea del busto: il bicipite lavora in allungamento. Presa a martello per tutto il ROM — nessuna supinazione, il gomito dx ringrazia. Eccentrica in 3''.",
        alt: { name: "Curl Machine (seduta, presa neutra se disponibile)", weight: "35–40 kg", note: "Percorso guidato: usala nelle giornate in cui il gomito dx non è al 100%." },
      },
      {
        name: "Face Pull al Cavo 🛡",
        focus: "Cuffia + deltoide posteriore", sets: 3, reps: "15", rest: 60, weight: "15–18 kg",
        tempo: "2-1-2",
        note: "TERAPEUTICO — non si salta mai, chiude ogni sessione di pull. Corda alla puleggia alta, tira verso il viso aprendo i gomiti, ruota esternamente le spalle a fine movimento.",
        alt: null,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────── PUSH B ──
  {
    id: "pushB", day: "Giovedì", label: "Push B", subtitle: "Petto · Spalle · Tricipiti",
    tag: "Intensità", emoji: "🟠", grad: ["#fb923c", "#c2410c"],
    exercises: [
      {
        name: "Chest Press Machine Piana Convergente (presa neutra)",
        focus: "Petto sternale", sets: 4, reps: "8-10", rest: 150, weight: "60–65 kg",
        tempo: "3-1-1",
        note: "Esercizio principale della giornata, carico più alto. Le braccia della macchina convergono: lascia che le mani si avvicinino in chiusura. Scapole addotte e depresse, schiena aderente. Recupero pieno: 2'30''.",
        alt: { name: "Chest Press Machine Declinata", weight: "60–65 kg", note: "Fibre inferiori e sternali. Stesso schema." },
      },
      {
        name: "Cavo Croce Alto → Basso",
        focus: "Petto (fibre inferiori)", sets: 3, reps: "12-15", rest: 60, weight: "12–14 kg / lato",
        tempo: "3-1-1",
        note: "Angolo opposto alla croce di Push A. Pulegge alte, mani che si incontrano all'altezza dell'anca. Scapole depresse, non lasciare che le spalle salgano verso il trapezio dx.",
        alt: { name: "Cavo Croce Basso → Alto", weight: "12–14 kg / lato", note: "Porzione alta e clavicolare." },
      },
      {
        name: "Dip Machine Assistita (busto inclinato, tricipiti)",
        focus: "Tricipite + petto basso", sets: 3, reps: "8-10", rest: 90, weight: "−15 / −20 kg assist",
        tempo: "3-1-1",
        note: "ROM guidato: non oltre 90° di flessione al gomito dx. Busto leggermente inclinato in avanti, gomiti vicino al corpo. Pausa in basso 1'', spingi con controllo.",
        alt: { name: "Tricipiti Pushdown al Cavo (barra dritta, presa prona)", weight: "28–32 kg", note: "Gomiti fissi al fianco, ROM completo." },
      },
      {
        name: "Lateral Raise Machine (seduta)",
        focus: "Deltoide laterale", sets: 3, reps: "12-15", rest: 60, weight: "25–30 kg",
        tempo: "2-1-2",
        note: "Variante guidata delle alzate al cavo di Push A. Cuscinetti sopra il gomito, non sull'avambraccio: meno stress sul gomito dx. Sali fino a braccia parallele al pavimento. Spalle basse, collo neutro.",
        alt: { name: "Alzate Laterali Manubri (seduto)", weight: "8–10 kg / braccio", note: "Seduto per togliere lo slancio. Lento in discesa." },
      },
      {
        name: "Reverse Pec Deck",
        focus: "Deltoide posteriore + romboidi", sets: 3, reps: "15", rest: 60, weight: "25–30 kg",
        tempo: "2-1-2",
        note: "Protegge la cervicale insieme al face pull. Seduto di fronte alla macchina, apri le braccia leggermente flesse e stringi le scapole senza alzarle. Presa neutra.",
        alt: { name: "Rear Delt Fly ai Cavi (incrociati)", weight: "6–8 kg / lato", note: "Cavi alti incrociati, braccia quasi tese, apri verso l'esterno." },
      },
      {
        name: "Face Pull al Cavo 🛡",
        focus: "Cuffia + deltoide posteriore", sets: 3, reps: "15", rest: 60, weight: "15–18 kg",
        tempo: "2-1-2",
        note: "TERAPEUTICO — non si salta mai. Corda alla puleggia alta, tira verso il viso aprendo i gomiti, rotazione esterna a fine movimento.",
        alt: null,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────── PULL B ──
  {
    id: "pullB", day: "Venerdì", label: "Pull B", subtitle: "Dorsali · Schiena media · Bicipiti",
    tag: "Intensità", emoji: "🟢", grad: ["#34d399", "#065f46"],
    exercises: [
      {
        name: "Lat Machine Presa Neutra Media (impugnatura parallela)",
        focus: "Gran dorsale (spessore)", sets: 4, reps: "8-10", rest: 150, weight: "55–62 kg",
        tempo: "3-1-1",
        note: "Presa parallela a larghezza spalle: la più forte e la più protettiva per il gomito dx. Carico più alto del Pull A. Scapole depresse prima di iniziare, barra al petto. Recupero 2'30''.",
        alt: { name: "Lat Machine Presa Supina Media", weight: "55–62 kg", note: "Solo se il gomito dx è asintomatico: la supinazione statica sotto carico va valutata." },
      },
      {
        name: "High Row Machine (presa neutra, gomiti alti)",
        focus: "Trapezio medio + deltoide posteriore", sets: 4, reps: "8-10", rest: 120, weight: "45–50 kg",
        tempo: "2-1-2",
        note: "Sostituisce la Low Row: trazione alta con gomiti a 60-70° dal busto → schiena alta e deltoide posteriore, la zona che stabilizza la scapola e scarica la cervicale. Petto appoggiato, collo neutro, non alzare la testa.",
        alt: { name: "Seated Cable Row Presa Larga Prona", weight: "45–50 kg", note: "Barra larga, gomiti alti, tira verso lo sterno." },
      },
      {
        name: "Straight-Arm Pulldown al Cavo (corda)",
        focus: "Gran dorsale (isolamento)", sets: 3, reps: "12-15", rest: 60, weight: "25–30 kg",
        tempo: "3-2-1",
        note: "Sostituisce la Pullover Machine. In piedi, busto inclinato 30°, braccia quasi tese: porta la corda dalla posizione alta (dorsale allungato, pausa 2'') fino alle cosce. Nessuna flessione del gomito → gomito dx a riposo. Spalle depresse per tutto il ROM.",
        alt: { name: "Pullover Machine", weight: "40–48 kg", note: "Versione guidata. Spalle depresse." },
      },
      {
        name: "Face Pull al Cavo 🛡",
        focus: "Cuffia + deltoide posteriore", sets: 3, reps: "15", rest: 60, weight: "15–18 kg",
        tempo: "2-1-2",
        note: "TERAPEUTICO — non si salta mai. Nel Pull B lo fai a metà sessione, prima dei bicipiti, così arrivi con le spalle 'aperte' agli ultimi esercizi.",
        alt: null,
      },
      {
        name: "Cross-Body Hammer Curl (manubri, in piedi)",
        focus: "Brachiale + brachioradiale", sets: 3, reps: "10-12", rest: 60, weight: "14–16 kg / braccio",
        tempo: "2-1-2",
        note: "Al posto del curl con corda. Presa a martello, porta il manubrio verso la spalla opposta: massimo lavoro del brachiale, zero supinazione. Alterna dx e sx. Gomiti fermi al fianco.",
        alt: { name: "Curl al Cavo con Corda (presa neutra)", weight: "20–24 kg", note: "Corda alla puleggia bassa, presa neutra o leggermente prona." },
      },
      {
        name: "Curl al Cavo Braccio Singolo — asimmetrico",
        focus: "Bicipite (dx neutro / sx supino)", sets: 2, reps: "12-15", rest: 60, weight: "12–14 kg dx / 16–18 kg sx",
        tempo: "3-1-1",
        note: "Asimmetria terapeutica invariata da Rev. 4: a dx maniglia con presa neutra (nessuna supinazione), a sx maniglia con presa supina per il picco del bicipite. Volume ridotto (2 serie): il bicipite ha già lavorato in tutte le trazioni.",
        alt: { name: "Hammer Curl dx / Curl Manubrio sx (seduto)", weight: "14–16 kg dx / 12–14 kg sx", note: "Stessa asimmetria, con i manubri." },
      },
    ],
  },
];

// Protocollo cervicale + plesso brachiale — INVARIATO da Rev. 4 (protocollo clinico)
export const MOBILITY = {
  pre: [
    { name: "Calore trapezio destro",           dur: "5-8 min",                tech: "Borsa del calore prima di iniziare — mai saltare" },
    { name: "Rotazioni cervicali lente",         dur: "10 cerchi / lato",       tech: "Cerchio piccolo e controllato — mai forzare il ROM" },
    { name: "Inclinazione laterale cervicale",   dur: "5 × 30'' / lato",        tech: "Orecchio verso spalla, mento neutro" },
    { name: "Chin Tuck (retrazione cervicale)",  dur: "2 × 10 rip, tieni 3''",  tech: "Mento indietro — attiva i flessori profondi del collo" },
    { name: "Cerchi con le spalle",              dur: "10 avanti + 10 indietro", tech: "Ampi e lenti — scalda cuffia e scapola" },
    { name: "Scapular Depression Attiva",        dur: "2 × 10 rip, tieni 3''",  tech: "Spingi spalle verso il basso senza muovere il collo" },
    { name: "Rotazioni esterne spalla",          dur: "2 × 15 rip",             tech: "Gomito 90°, braccio al fianco — attiva i rotatori esterni" },
    { name: "Arm Circle controllato",            dur: "10 + 10 / lato",         tech: "Un braccio alla volta, aumenta il ROM gradualmente" },
    { name: "Serie di avvicinamento",            dur: "2 serie leggere",        tech: "NUOVO: sul primo esercizio della sessione, 1 × 12 al 40 % e 1 × 6 al 60 % del carico di lavoro" },
  ],
  post: [
    { name: "Stretching trapezio superiore dx",  dur: "3 × 40'' / lato",        tech: "Inclina controlateralmente, mano dietro la schiena" },
    { name: "Stretching SCM destro",             dur: "2 × 40'' / lato",        tech: "Ruota mento lato opposto + lieve estensione" },
    { name: "Stretching scaleni",                dur: "2 × 30'' / lato",        tech: "Inclina lateralmente, mento verso l'alto di 15°" },
    { name: "Doorway Stretch",                   dur: "3 × 30''",               tech: "Avambracci sullo stipite a 90° — un passo avanti" },
    { name: "Child's Pose (braccia laterali)",   dur: "2 × 40''",               tech: "Braccia a lato verso avanti — decomprime la catena" },
    { name: "Thread the Needle",                 dur: "5 rip / lato",           tech: "A 4 zampe — mobilizza la colonna toracica" },
    { name: "Chin Tuck + Retrazione Scapolare",  dur: "2 × 10 rip, tieni 5''",  tech: "Mento indietro + scapole verso centro e basso" },
    { name: "Respirazione Diaframmatica",        dur: "2 minuti",               tech: "Inspira 4'' · tieni 2'' · espira 6''" },
  ],
  rest: [
    { name: "Slump Test Passivo",                dur: "2 × 30'' / lato",        tech: "Seduto, mento al petto, estendi il ginocchio lentamente" },
    { name: "Nerve Glide (nervo mediano)",       dur: "2 × 10 rip / lato",      tech: "Braccio a 90°, polso in estensione, capo controlaterale" },
    { name: "Wall Angel",                        dur: "2 × 10 rip",             tech: "Schiena al muro — da W a Y mantenendo il contatto" },
    { name: "Foam Rolling trapezio",             dur: "60'' / lato",            tech: "Pressione moderata — niente dolore acuto" },
    { name: "Camminata / bici leggera",          dur: "20-30 min",              tech: "NUOVO: zona 2, conversazione possibile. Favorisce il recupero senza sottrarre energie all'ipertrofia" },
  ],
};

export const WEEK = [
  { day: "LUN", sid: "pushA" }, { day: "MAR", sid: "pullA" }, { day: "MER", sid: "rest" },
  { day: "GIO", sid: "pushB" }, { day: "VEN", sid: "pullB" }, { day: "SAB", sid: "rest" }, { day: "DOM", sid: null },
];

// Volume settimanale risultante (serie dirette + indirette ≈)
//  Petto 20 · Dorsali 18 · Schiena alta/deltoide post. 16 (con face pull) ·
//  Deltoide laterale 6 · Tricipiti 6 dirette (+ 14 indirette) · Bicipiti 8 dirette (+ 18 indirette)
