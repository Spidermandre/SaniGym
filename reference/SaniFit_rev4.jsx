import { useState, useEffect, useRef } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────
// Pesi calibrati su: uomo 41 anni, 178 cm, 73 kg, longilineo, avanzato
// Intensità 60-70% del massimale stimato — come da indicazione del fisiatra
// Sono punti di partenza: se arrivi a 12 rip con 2 rip in riserva, aumenta di 2.5 kg
const SESSIONS = [
  {
    id:"pushA", day:"Lunedì", label:"Push A", subtitle:"Petto + Tricipiti", tag:"Volume", emoji:"🔴",
    grad:["#fb7185","#be123c"],
    exercises:[
      {
        name:"Chest Press Machine (piana)",
        sets:4, reps:"10-12", rest:90, weight:"55–60 kg",
        note:"Base del lavoro pettorale. Schiena aderente allo schienale, gomiti a 45° — non aprire a 90°. Impugna con presa neutra o prona.",
      },
      {
        name:"Panca Inclinata con Manubri (30°)",
        sets:4, reps:"10-12", rest:90, weight:"20 kg / braccio",
        note:"Regola la panca a 30° — non oltre. Presa neutra (palmi che si guardano): meno stress sul nervo mediano destro. Manubri in linea con il petto, non le spalle. Peso moderato, controllo totale.",
      },
      {
        name:"Pec Deck / Butterfly Machine",
        sets:3, reps:"12-15", rest:60, weight:"45–50 kg",
        note:"Isolamento pettorale puro. Arco ampio ma non oltre la soglia del fastidio. Contrai in chiusura per 1 secondo.",
      },
      {
        name:"Cavo Croce (puleggia bassa → alto)",
        sets:3, reps:"12-15", rest:60, weight:"12–14 kg / lato",
        note:"Lavora la porzione alta e clavicolare del petto. Contrazione lenta in cima — niente strappi nel destro.",
      },
      {
        name:"Tricipiti Cavo Pushdown (barra dritta)",
        sets:3, reps:"12-15", rest:60, weight:"28–32 kg",
        note:"Gomiti fissi al fianco per tutto il set. ROM completo. Presa prona: meno stress sul nervo mediano rispetto alla supina.",
      },
    ],
  },
  {
    id:"pushB", day:"Giovedì", label:"Push B", subtitle:"Petto basso + Tricipiti", tag:"Intensità", emoji:"🔴",
    grad:["#fb923c","#c2410c"],
    exercises:[
      {
        name:"Chest Press Machine (declinata)",
        sets:4, reps:"8-10", rest:90, weight:"60–65 kg",
        note:"Terzo angolo di lavoro: fibre inferiori e sternali del petto. Carichi leggermente più alti rispetto alla piana.",
      },
      {
        name:"Pec Deck Inverso (Reverse Pec Deck)",
        sets:4, reps:"15", rest:60, weight:"25–30 kg",
        note:"Deltoide posteriore + romboidi: complementa il face pull nel proteggere la zona cervicale. Seduto di fronte alla macchina, braccia aperte lentamente.",
      },
      {
        name:"Face Pull al Cavo 🛡",
        sets:4, reps:"15", rest:60, weight:"15–18 kg",
        note:"TERAPEUTICO — non si salta mai. Corda alla puleggia alta, tira verso il viso aprendo i gomiti. Rinforza rotatori e scarica il plesso cervicale.",
      },
      {
        name:"Cavo Croce (puleggia alta → basso)",
        sets:3, reps:"12-15", rest:60, weight:"12–14 kg / lato",
        note:"Angolo opposto a Push A: lavora il petto basso e la porzione sternale. Mantieni le scapole depresse.",
      },
      {
        name:"Dip Machine Assistita",
        sets:3, reps:"10-12", rest:75, weight:"−15 / −20 kg assist",
        note:"ROM guidato dalla macchina: non oltre 90° di flessione del gomito destro. Busto leggermente inclinato per isolare i tricipiti.",
      },
    ],
  },
  {
    id:"pullA", day:"Martedì", label:"Pull A", subtitle:"Schiena + Bicipiti", tag:"Volume", emoji:"🔵",
    grad:["#38bdf8","#0c4a6e"],
    exercises:[
      {
        name:"Lat Machine (presa neutra stretta)",
        sets:4, reps:"10-12", rest:90, weight:"55–62 kg",
        note:"Deprimi le scapole PRIMA di iniziare il movimento. Presa neutra: riduce lo stress sul gomito destro. Tira verso il petto, non dietro la nuca.",
      },
      {
        name:"Chest Supported Row Machine",
        sets:4, reps:"10-12", rest:90, weight:"55–60 kg",
        note:"Petto appoggiato al supporto: elimina il carico sulla cervicale e sul trapezio superiore. Tira i gomiti indietro e in basso.",
      },
      {
        name:"Seated Cable Row (presa stretta neutra)",
        sets:3, reps:"12", rest:75, weight:"48–55 kg",
        note:"Busto fisso a 90° per tutto il set — non reclini. Tira verso l'ombelico, spremi le scapole in chiusura.",
      },
      {
        name:"Curl Machine (seduta)",
        sets:3, reps:"12", rest:60, weight:"35–40 kg",
        note:"Percorso guidato dalla macchina: stabilità ottimale per il gomito destro. Braccio appoggiato al supporto — niente compensi della spalla.",
      },
      {
        name:"Face Pull al Cavo 🛡",
        sets:3, reps:"15", rest:60, weight:"15–18 kg",
        note:"Chiudi SEMPRE con questo — obbligatorio ogni sessione di pull.",
      },
    ],
  },
  {
    id:"pullB", day:"Venerdì", label:"Pull B", subtitle:"Schiena + Bicipiti", tag:"Intensità", emoji:"🔵",
    grad:["#34d399","#065f46"],
    exercises:[
      {
        name:"Lat Machine (presa supina media)",
        sets:4, reps:"8-12", rest:90, weight:"55–62 kg",
        note:"Angolo diverso da Pull A: presa supina a larghezza spalle. Maggiore coinvolgimento del bicipite come sinergista. Controlla la fase eccentrica.",
      },
      {
        name:"Low Row Machine",
        sets:4, reps:"10-12", rest:90, weight:"55–60 kg",
        note:"Trazione orizzontale bassa: romboidi, trapezio medio e dentato anteriore. Schiena neutra, non arrotondata. Presa neutra.",
      },
      {
        name:"Pullover Machine",
        sets:3, reps:"12-15", rest:60, weight:"40–48 kg",
        note:"Gran dorsale in isolamento senza coinvolgere i gomiti in trazione. Spalle depresse durante tutto il ROM. Ottimo per la larghezza del dorsale.",
      },
      {
        name:"Curl al Cavo (corda, presa neutra-pronata)",
        sets:3, reps:"12-15", rest:60, weight:"20–24 kg",
        note:"Presa neutra o leggermente pronata sulla corda: zero stress di supinazione sul gomito destro. Lavora brachiale e brachioradiale.",
      },
      {
        name:"Hammer Curl dx / Curl al Cavo sx",
        sets:3, reps:"12", rest:60, weight:"14–16 kg dx / 20–22 kg sx",
        note:"Asimmetria terapeutica: martello a destra (presa neutra, niente supinazione) — curl classico al cavo a sinistra.",
      },
    ],
  },
];

const MOBILITY = {
  pre:[
    {name:"Calore trapezio destro",           dur:"5-8 min",                tech:"Borsa del calore prima di iniziare — mai saltare"},
    {name:"Rotazioni cervicali lente",         dur:"10 cerchi / lato",       tech:"Cerchio piccolo e controllato — mai forzare il ROM"},
    {name:"Inclinazione laterale cervicale",   dur:"5 × 30'' / lato",        tech:"Orecchio verso spalla, mento neutro"},
    {name:"Chin Tuck (retrazione cervicale)",  dur:"2 × 10 rip, tieni 3''",  tech:"Mento indietro — attiva i flessori profondi del collo"},
    {name:"Cerchi con le spalle",              dur:"10 avanti + 10 indietro", tech:"Ampi e lenti — scalda cuffia e scapola"},
    {name:"Scapular Depression Attiva",        dur:"2 × 10 rip, tieni 3''",  tech:"Spingi spalle verso il basso senza muovere il collo"},
    {name:"Rotazioni esterne spalla",          dur:"2 × 15 rip",             tech:"Gomito 90°, braccio al fianco — attiva i rotatori esterni"},
    {name:"Arm Circle controllato",            dur:"10 + 10 / lato",         tech:"Un braccio alla volta, aumenta il ROM gradualmente"},
  ],
  post:[
    {name:"Stretching trapezio superiore dx",  dur:"3 × 40'' / lato",        tech:"Inclina controlateralmente, mano dietro la schiena"},
    {name:"Stretching SCM destro",             dur:"2 × 40'' / lato",        tech:"Ruota mento lato opposto + lieve estensione"},
    {name:"Stretching scaleni",                dur:"2 × 30'' / lato",        tech:"Inclina lateralmente, mento verso l'alto di 15°"},
    {name:"Doorway Stretch",                   dur:"3 × 30''",               tech:"Avambracci sullo stipite a 90° — un passo avanti"},
    {name:"Child's Pose (braccia laterali)",   dur:"2 × 40''",               tech:"Braccia a lato verso avanti — decomprime la catena"},
    {name:"Thread the Needle",                 dur:"5 rip / lato",           tech:"A 4 zampe — mobilizza la colonna toracica"},
    {name:"Chin Tuck + Retrazione Scapolare",  dur:"2 × 10 rip, tieni 5''",  tech:"Mento indietro + scapole verso centro e basso"},
    {name:"Respirazione Diaframmatica",        dur:"2 minuti",               tech:"Inspira 4'' · tieni 2'' · espira 6''"},
  ],
  rest:[
    {name:"Slump Test Passivo",                dur:"2 × 30'' / lato",        tech:"Seduto, mento al petto, estendi il ginocchio lentamente"},
    {name:"Nerve Glide (nervo mediano)",       dur:"2 × 10 rip / lato",      tech:"Braccio a 90°, polso in estensione, capo controlaterale"},
    {name:"Wall Angel",                        dur:"2 × 10 rip",             tech:"Schiena al muro — da W a Y mantenendo il contatto"},
    {name:"Foam Rolling trapezio",             dur:"60'' / lato",            tech:"Pressione moderata — niente dolore acuto"},
  ],
};

const WEEK = [
  {day:"LUN",sid:"pushA"},{day:"MAR",sid:"pullA"},{day:"MER",sid:null},
  {day:"GIO",sid:"pushB"},{day:"VEN",sid:"pullB"},{day:"SAB",sid:"rest"},{day:"DOM",sid:"rest"},
];

const T1="#11151c", T2="rgba(17,21,28,.62)", T3="rgba(17,21,28,.45)", T4="rgba(17,21,28,.32)";

// ── Timer ─────────────────────────────────────────────────────────────────────
function useTimer(initial) {
  const [time, setTime] = useState(initial);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (running && time > 0) { ref.current = setInterval(() => setTime(t => t-1), 1000); }
    else { clearInterval(ref.current); if (time===0) setRunning(false); }
    return () => clearInterval(ref.current);
  }, [running, time]);
  return {
    time, running,
    start:(t)=>{ setTime(t??initial); setRunning(true); },
    reset:(t)=>{ clearInterval(ref.current); setTime(t??initial); setRunning(false); },
    done: time===0,
  };
}

function RestTimer({ seconds, onDone }) {
  const {time,running,start,reset,done} = useTimer(seconds);
  const r=40, circ=2*Math.PI*r, offset=circ*(1-time/seconds), hot=time<=10;
  useEffect(()=>{ if(done&&onDone) onDone(); },[done]);
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      <div style={{position:"relative",width:104,height:104}}>
        <svg width="104" height="104" style={{transform:"rotate(-90deg)"}}>
          <circle cx="52" cy="52" r={r} fill="none" stroke="rgba(17,21,28,.08)" strokeWidth="6"/>
          <circle cx="52" cy="52" r={r} fill="none"
            stroke={hot?"#ef4444":"#10b981"} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{transition:"stroke-dashoffset 1s linear"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:26,fontWeight:800,color:hot?"#ef4444":T1,lineHeight:1}}>{time}</span>
          <span style={{fontSize:9,color:T4,letterSpacing:".06em"}}>SEC</span>
        </div>
      </div>
      <div style={{display:"flex",gap:8}}>
        {!running
          ? <button onClick={()=>start()} style={S.btnGreen}>▶ Avvia recupero</button>
          : <button onClick={()=>reset()} style={S.btnGhost}>✕ Reset</button>}
      </div>
    </div>
  );
}

// ── WORKOUT MODE ──────────────────────────────────────────────────────────────
function WorkoutMode({session, onExit}) {
  const [exIdx, setExIdx]     = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [setsDone, setSetsDone] = useState({});
  const [phase, setPhase]     = useState("exercise");
  const ex      = session.exercises[exIdx];
  const curSets = setsDone[exIdx]||0;
  const isReviewing = exIdx < furthest;
  const g = `linear-gradient(135deg,${session.grad[0]},${session.grad[1]})`;
  const totalSets = session.exercises.reduce((a,e)=>a+e.sets,0);
  const doneSets  = Object.values(setsDone).reduce((a,b)=>a+b,0);
  const progress  = doneSets/totalSets;

  const completeSet = () => {
    if(isReviewing) return;
    const next = curSets+1;
    setSetsDone(p=>({...p,[exIdx]:next}));
    if(next>=ex.sets && exIdx===session.exercises.length-1) setPhase("done");
    else setPhase("rest");
  };
  const afterRest = () => {
    const cur = setsDone[exIdx]||0;
    let nxt = exIdx;
    if(cur>=ex.sets && exIdx<session.exercises.length-1) nxt=exIdx+1;
    setExIdx(nxt); setFurthest(nxt); setPhase("exercise");
  };
  const goPrev      = ()=>{ if(exIdx>0){ setExIdx(exIdx-1); setPhase("exercise"); } };
  const goNextReview= ()=>{ if(exIdx<furthest){ setExIdx(exIdx+1); setPhase("exercise"); } };
  const goToCurrent = ()=>{ setExIdx(furthest); setPhase("exercise"); };

  if(phase==="done") return (
    <div style={S.overlay}>
      <div style={{...S.glass,padding:40,maxWidth:320,width:"90%",textAlign:"center"}}>
        <div style={{fontSize:60,marginBottom:16}}>🏆</div>
        <h2 style={{fontSize:26,fontWeight:800,marginBottom:8,color:T1}}>Ottimo lavoro!</h2>
        <p style={{color:T2,marginBottom:6}}>{session.label} completata</p>
        <p style={{color:T3,fontSize:13,lineHeight:1.6,marginBottom:28}}>
          Esegui ora il protocollo di stretching post-allenamento 🧘<br/>
          Applica calore al trapezio destro se senti tensione.
        </p>
        <button style={{...S.btnGrad(g),width:"100%",fontSize:15}} onClick={onExit}>← Torna alla home</button>
      </div>
    </div>
  );

  const nextLabel = (setsDone[exIdx]||0)>=ex.sets && exIdx<session.exercises.length-1
    ? `Prossimo: ${session.exercises[exIdx+1].name}`
    : `Prossimo set ${(setsDone[exIdx]||0)+1}/${ex.sets}`;

  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"linear-gradient(180deg,#f8f9fd 0%,#eef1f8 100%)",display:"flex",flexDirection:"column",fontFamily:"system-ui,sans-serif",color:T1}}>
      <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 18px 16px",overflowY:"auto"}}>

        {/* header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <button style={S.iconBtn} onClick={onExit}>✕</button>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:11,color:T3,letterSpacing:".07em",textTransform:"uppercase"}}>{session.label}</div>
            <div style={{fontSize:14,fontWeight:700}}>{session.subtitle}</div>
          </div>
          <div style={S.pill}>{exIdx+1}/{session.exercises.length}</div>
        </div>

        {/* progress bar */}
        <div style={{background:"rgba(17,21,28,.08)",borderRadius:99,height:4,marginBottom:14,overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:99,background:g,width:`${progress*100}%`,transition:"width .6s ease"}}/>
        </div>

        {/* nav tra esercizi */}
        <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
          <button style={{...S.btnGhost, opacity: exIdx===0?.35:1, pointerEvents: exIdx===0?"none":"auto"}} onClick={goPrev}>‹ Precedente</button>
          {isReviewing && exIdx<furthest && <button style={S.btnGhost} onClick={goNextReview}>Successivo ›</button>}
          {isReviewing && <span style={{...S.pill,background:"rgba(99,102,241,.08)",borderColor:"rgba(99,102,241,.2)",color:"#4338ca",fontSize:10}}>👀 Revisione</span>}
        </div>

        {/* main card */}
        <div style={{...S.glass,padding:22,flex:1,display:"flex",flexDirection:"column"}}>
          {phase==="exercise" ? (
            <>
              <div style={{flex:1}}>
                <div style={{...S.pill,marginBottom:14,display:"inline-flex"}}>{session.tag}</div>
                <h2 style={{fontSize:21,fontWeight:800,lineHeight:1.25,marginBottom:16}}>{ex.name}</h2>

                <div style={{display:"flex",gap:10,marginBottom:16}}>
                  {[["Serie",ex.sets],["Rip",ex.reps],["Set",`${curSets}/${ex.sets}`]].map(([k,v])=>(
                    <div key={k} style={{...S.glassSm,flex:1,textAlign:"center",padding:"11px 6px"}}>
                      <div style={{fontSize:10,color:T4,textTransform:"uppercase",letterSpacing:".05em",marginBottom:3}}>{k}</div>
                      <div style={{fontSize:19,fontWeight:800}}>{v}</div>
                    </div>
                  ))}
                </div>

                {ex.weight && (
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"11px 16px",borderRadius:14,background:"rgba(3,105,161,.07)",border:"1px solid rgba(3,105,161,.15)"}}>
                    <span style={{fontSize:20}}>🏋️</span>
                    <div>
                      <div style={{fontSize:10,color:T4,textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>Peso consigliato</div>
                      <div style={{fontSize:16,fontWeight:800,color:"#0369a1"}}>{ex.weight}</div>
                    </div>
                    <div style={{marginLeft:"auto",fontSize:11,color:T3,lineHeight:1.4,maxWidth:140,textAlign:"right"}}>Aumenta di 2.5 kg se arrivi a 12 rip con 2 in riserva</div>
                  </div>
                )}

                {/* set progress dots */}
                <div style={{display:"flex",gap:5,marginBottom:16}}>
                  {Array.from({length:ex.sets}).map((_,i)=>(
                    <div key={i} style={{flex:1,height:5,borderRadius:3,background:i<curSets?g:"rgba(17,21,28,.08)",transition:"background .3s"}}/>
                  ))}
                </div>

                <div style={{background:"rgba(17,21,28,.04)",borderRadius:14,padding:"12px 14px",border:"1px solid rgba(17,21,28,.06)"}}>
                  <div style={{fontSize:10,color:T3,textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>📋 Nota clinica</div>
                  <p style={{fontSize:13,color:T2,lineHeight:1.6}}>{ex.note}</p>
                </div>
              </div>

              {isReviewing
                ? <button style={{...S.btnGrad(g),width:"100%",marginTop:20,fontSize:15,padding:"16px"}} onClick={goToCurrent}>→ Torna all'esercizio attuale</button>
                : <button style={{...S.btnGrad(g),width:"100%",marginTop:20,fontSize:16,padding:"17px"}} onClick={completeSet}>✓  Set completato — recupero {ex.rest}''</button>
              }
            </>
          ) : (
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18}}>
              <div style={{fontSize:12,color:T3,letterSpacing:".08em",textTransform:"uppercase"}}>Recupero</div>
              <RestTimer seconds={ex.rest} onDone={afterRest}/>
              <p style={{fontSize:13,color:T3,textAlign:"center"}}>{nextLabel}</p>
              <button style={S.btnGhost} onClick={afterRest}>Salta recupero →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SESSION DETAIL ────────────────────────────────────────────────────────────
function SessionDetail({session, onBack, onStart}) {
  const g=`linear-gradient(135deg,${session.grad[0]},${session.grad[1]})`;
  return (
    <div style={{overflowY:"auto",paddingBottom:100}}>
      <div style={{background:g,padding:"52px 20px 28px",borderRadius:"0 0 28px 28px",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.12)",borderRadius:"0 0 28px 28px"}}/>
        <div style={{position:"relative",zIndex:1,color:"#fff"}}>
          <button style={{...S.iconBtnOnColor,marginBottom:18}} onClick={onBack}>←</button>
          <div style={{fontSize:11,color:"rgba(255,255,255,.8)",letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{session.day}</div>
          <h1 style={{fontSize:30,fontWeight:800,marginBottom:4}}>{session.emoji} {session.label}</h1>
          <p style={{color:"rgba(255,255,255,.88)",fontSize:15,marginBottom:14}}>{session.subtitle}</p>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {[session.tag,`${session.exercises.length} esercizi`,`${session.exercises.reduce((a,e)=>a+e.sets,0)} serie totali`].map(t=>(
              <div key={t} style={{...S.pill,background:"rgba(255,255,255,.22)",borderColor:"rgba(255,255,255,.35)",color:"#fff"}}>{t}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{padding:"20px 16px 0"}}>
        <button style={{...S.btnGrad(g),width:"100%",marginBottom:18,fontSize:16,padding:"17px"}} onClick={onStart}>▶  Inizia sessione guidata</button>
        {session.exercises.map((ex,i)=>(
          <div key={i} style={{...S.glass,padding:"15px 16px",marginBottom:10}}>
            <div style={{display:"flex",gap:13,alignItems:"flex-start"}}>
              <div style={{width:36,height:36,borderRadius:10,background:g,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,flexShrink:0,color:"#fff"}}>{i+1}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:5,color:T1}}>{ex.name}</div>
                <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                  <span style={{fontSize:12,color:T3}}>📊 {ex.sets} × {ex.reps}</span>
                  <span style={{fontSize:12,color:T3}}>⏱ {ex.rest}''</span>
                  {ex.weight && <span style={{fontSize:12,fontWeight:700,color:"#0369a1"}}>🏋️ {ex.weight}</span>}
                </div>
                <p style={{fontSize:12,color:T3,lineHeight:1.55}}>{ex.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MOBILITY ──────────────────────────────────────────────────────────────────
function MobilityPage() {
  const [tab,setTab]=useState("pre");
  const [checked,setChecked]=useState({});
  const toggle=k=>setChecked(p=>({...p,[k]:!p[k]}));
  const tabs=[{key:"pre",emoji:"🔥",label:"Pre"},{key:"post",emoji:"🧘",label:"Post"},{key:"rest",emoji:"🌿",label:"Riposo"}];
  const palette={pre:["#fb923c","#9a3412"],post:["#a78bfa","#4338ca"],rest:["#34d399","#065f46"]};
  const tips={
    pre:"Esegui nell'ordine indicato. Movimenti lenti e controllati. Inizia sempre con il calore sul trapezio destro.",
    post:"Mantieni ogni posizione senza rimbalzi. Respira profondamente. Mai oltre la soglia del fastidio.",
    rest:"Solo se assenza totale di sintomi. Il nerve glide va eseguito con la massima delicatezza.",
  };
  const [c0,c1]=palette[tab];
  const g=`linear-gradient(135deg,${c0},${c1})`;
  const items=MOBILITY[tab];
  const doneCount=items.filter((_,i)=>checked[`${tab}-${i}`]).length;

  return (
    <div style={{padding:"20px 16px 100px",overflowY:"auto"}}>
      <h1 style={{fontSize:26,fontWeight:800,marginBottom:4,color:T1}}>Mobilità & Stretching</h1>
      <p style={{color:T3,fontSize:13,marginBottom:20}}>Protocollo cervicale + plesso brachiale</p>

      <div style={{display:"flex",gap:4,padding:4,borderRadius:16,background:"rgba(17,21,28,.04)",border:"1px solid rgba(17,21,28,.07)",marginBottom:18}}>
        {tabs.map(t=>(
          <button key={t.key} onClick={()=>{setTab(t.key);setChecked({})}} style={{
            flex:1,padding:"9px 0",borderRadius:12,cursor:"pointer",fontSize:13,fontWeight:600,
            border:tab===t.key?"1px solid rgba(17,21,28,.1)":"1px solid transparent",
            background:tab===t.key?"#ffffff":"transparent",
            boxShadow:tab===t.key?"0 2px 10px rgba(17,21,28,.08)":"none",
            color:tab===t.key?T1:T3,fontFamily:"system-ui,sans-serif",
          }}>{t.emoji} {t.label}</button>
        ))}
      </div>

      <div style={{...S.glass,padding:"13px 16px",marginBottom:16,background:`${c0}14`,borderColor:`${c0}30`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <p style={{fontSize:13,color:T2,lineHeight:1.5,flex:1}}>{tips[tab]}</p>
          <div style={{marginLeft:12,textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:800,background:g,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{doneCount}/{items.length}</div>
            <div style={{fontSize:10,color:T4}}>fatto</div>
          </div>
        </div>
        <div style={{background:"rgba(17,21,28,.07)",borderRadius:99,height:4,marginTop:10,overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:99,background:g,width:`${(doneCount/items.length)*100}%`,transition:"width .5s ease"}}/>
        </div>
      </div>

      {items.map((item,i)=>{
        const k=`${tab}-${i}`, done=checked[k];
        return (
          <div key={k} style={{...S.glass,padding:"14px 16px",marginBottom:10,opacity:done?.55:1,transition:"opacity .3s"}}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
              <button onClick={()=>toggle(k)} style={{
                width:28,height:28,borderRadius:8,flexShrink:0,cursor:"pointer",marginTop:2,
                border:`2px solid ${done?c0:"rgba(17,21,28,.15)"}`,
                background:done?g:"transparent",
                display:"flex",alignItems:"center",justifyContent:"center",
              }}>
                {done&&<span style={{fontSize:13,color:"#fff",fontWeight:800}}>✓</span>}
              </button>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:4,color:T1,textDecoration:done?"line-through":"none"}}>{item.name}</div>
                <div style={{...S.pill,marginBottom:7}}>⏱ {item.dur}</div>
                <p style={{fontSize:12,color:T3,lineHeight:1.5}}>{item.tech}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomePage({onSelect}) {
  const dayMap=["DOM","LUN","MAR","MER","GIO","VEN","SAB"];
  const todayCode=dayMap[new Date().getDay()];
  const todayEntry=WEEK.find(w=>w.day===todayCode);
  const todaySess=todayEntry?.sid&&todayEntry.sid!=="rest"?SESSIONS.find(s=>s.id===todayEntry.sid):null;

  return (
    <div style={{padding:"20px 16px 100px",overflowY:"auto"}}>
      <div style={{marginBottom:26}}>
        <p style={{fontSize:13,color:T3,marginBottom:2}}>Il tuo allenamento personale 💪</p>
        <h1 style={{fontSize:34,fontWeight:800,letterSpacing:"-.02em",color:T1}}>SaniFit</h1>
        <p style={{color:T4,fontSize:13,marginTop:3}}>Scheda ipertrofia upper body · macchine · Rev. 4</p>
      </div>

      {/* oggi */}
      <p style={{fontSize:11,textTransform:"uppercase",letterSpacing:".07em",color:T4,marginBottom:9}}>Oggi — {todayCode}</p>
      {todaySess ? (
        <div style={{...S.glass,padding:22,marginBottom:22,background:`${todaySess.grad[0]}14`,borderColor:`${todaySess.grad[0]}30`,cursor:"pointer"}} onClick={()=>onSelect(todaySess)}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div>
              <div style={{...S.pill,marginBottom:11}}>{todaySess.emoji} Oggi</div>
              <h2 style={{fontSize:22,fontWeight:800,color:T1}}>{todaySess.label}</h2>
              <p style={{color:T2,fontSize:14,marginTop:2}}>{todaySess.subtitle}</p>
            </div>
            <div style={{fontSize:44}}>{todaySess.emoji}</div>
          </div>
          <div style={{display:"flex",gap:7,marginTop:14}}>
            {[todaySess.tag,`${todaySess.exercises.length} esercizi`].map(t=><div key={t} style={S.pill}>{t}</div>)}
          </div>
        </div>
      ) : (
        <div style={{...S.glass,padding:22,marginBottom:22}}>
          <div style={{fontSize:34,marginBottom:10}}>{todayEntry?.sid==="rest"?"🌿":"💤"}</div>
          <h2 style={{fontSize:18,fontWeight:700,marginBottom:5,color:T1}}>{todayEntry?.sid==="rest"?"Riposo attivo":"Riposo completo"}</h2>
          <p style={{color:T3,fontSize:13,lineHeight:1.6}}>
            {todayEntry?.sid==="rest"
              ?"Esegui la routine di mobilità cervicale + nerve glide. Foam rolling consigliato."
              :"Recupero completo. Calore al trapezio destro se senti tensione."}
          </p>
        </div>
      )}

      {/* settimana */}
      <p style={{fontSize:11,textTransform:"uppercase",letterSpacing:".07em",color:T4,marginBottom:9}}>Settimana</p>
      <div style={{display:"flex",gap:6,marginBottom:24,overflowX:"auto",paddingBottom:4}}>
        {WEEK.map((w,i)=>{
          const s=w.sid&&w.sid!=="rest"?SESSIONS.find(x=>x.id===w.sid):null;
          const isToday=w.day===todayCode;
          return (
            <div key={i} style={{...S.glassSm,flex:"0 0 auto",minWidth:50,padding:"9px 6px",textAlign:"center",
              background:isToday?"#fff":"rgba(255,255,255,.45)",
              borderColor:isToday?"rgba(17,21,28,.16)":"rgba(255,255,255,.6)"}}>
              <div style={{fontSize:9,fontWeight:isToday?800:500,color:isToday?T1:T4,marginBottom:5}}>{w.day}</div>
              <div style={{fontSize:17}}>{s?s.emoji:w.sid==="rest"?"🌿":"💤"}</div>
              <div style={{fontSize:8,color:T4,marginTop:4,lineHeight:1.3}}>{s?s.label:w.sid==="rest"?"Attivo":"Riposo"}</div>
            </div>
          );
        })}
      </div>

      {/* tutte le sessioni */}
      <p style={{fontSize:11,textTransform:"uppercase",letterSpacing:".07em",color:T4,marginBottom:9}}>Tutte le sessioni</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:20}}>
        {SESSIONS.map(s=>{
          const g=`linear-gradient(135deg,${s.grad[0]},${s.grad[1]})`;
          return (
            <div key={s.id} style={{...S.glass,padding:16,cursor:"pointer"}} onClick={()=>onSelect(s)}>
              <div style={{fontSize:28,marginBottom:8}}>{s.emoji}</div>
              <div style={{fontWeight:800,fontSize:14,color:T1}}>{s.label}</div>
              <div style={{color:T3,fontSize:11,marginBottom:10}}>{s.subtitle}</div>
              <div style={{height:3,borderRadius:2,background:g}}/>
            </div>
          );
        })}
      </div>

      {/* reminder */}
      <div style={{...S.glass,padding:16,background:"rgba(220,38,38,.06)",borderColor:"rgba(220,38,38,.18)"}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:5,color:"#b91c1c"}}>⚠️ Promemoria clinico</div>
        <p style={{fontSize:12,color:T2,lineHeight:1.65}}>
          Calore al trapezio destro prima di ogni sessione. Prese neutre o pronate privilegiate.
          Stop immediato se compaiono parestesie o formicolio al braccio/mano destra.
        </p>
      </div>
    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const S = {
  glass:{
    background:"rgba(255,255,255,.62)",
    backdropFilter:"blur(28px) saturate(180%)",
    WebkitBackdropFilter:"blur(28px) saturate(180%)",
    border:"1px solid rgba(255,255,255,.8)",
    borderRadius:22,
    boxShadow:"0 10px 36px rgba(17,21,28,.10), inset 0 1px 0 rgba(255,255,255,.9)",
    color:T1,
  },
  glassSm:{
    background:"rgba(255,255,255,.55)",
    backdropFilter:"blur(18px) saturate(160%)",
    WebkitBackdropFilter:"blur(18px) saturate(160%)",
    border:"1px solid rgba(255,255,255,.7)",
    borderRadius:14,
    boxShadow:"0 4px 18px rgba(17,21,28,.07)",
    color:T1,
  },
  pill:{
    display:"inline-flex",alignItems:"center",
    padding:"4px 12px",borderRadius:99,
    fontSize:11,fontWeight:600,letterSpacing:".04em",
    background:"rgba(17,21,28,.05)",border:"1px solid rgba(17,21,28,.09)",
    backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",
    color:T1,
  },
  iconBtn:{
    width:42,height:42,borderRadius:"50%",
    border:"1px solid rgba(17,21,28,.09)",cursor:"pointer",
    display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,
    background:"rgba(255,255,255,.75)",color:T1,
    backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
    boxShadow:"0 2px 10px rgba(17,21,28,.08)",
  },
  iconBtnOnColor:{
    width:42,height:42,borderRadius:"50%",
    border:"1px solid rgba(255,255,255,.4)",cursor:"pointer",
    display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,
    background:"rgba(255,255,255,.22)",color:"#fff",
    backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
  },
  btnGrad:(g)=>({
    padding:"14px 24px",borderRadius:14,border:"none",cursor:"pointer",
    fontSize:15,fontWeight:700,color:"#fff",background:g,
    boxShadow:"0 8px 22px rgba(17,21,28,.20)",fontFamily:"system-ui,sans-serif",
  }),
  btnGreen:{
    padding:"11px 22px",borderRadius:12,border:"none",cursor:"pointer",
    fontSize:14,fontWeight:700,color:"#fff",
    background:"linear-gradient(135deg,#34d399,#0f766e)",
    boxShadow:"0 6px 18px rgba(17,21,28,.18)",fontFamily:"system-ui,sans-serif",
  },
  btnGhost:{
    padding:"10px 18px",borderRadius:12,
    border:"1px solid rgba(17,21,28,.12)",cursor:"pointer",
    background:"rgba(255,255,255,.6)",color:"#374151",
    fontSize:13,fontWeight:600,fontFamily:"system-ui,sans-serif",
  },
  overlay:{
    position:"fixed",inset:0,zIndex:400,
    display:"flex",alignItems:"center",justifyContent:"center",
    background:"rgba(238,241,248,.92)",backdropFilter:"blur(14px)",padding:20,
  },
};

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function SaniFit() {
  const [nav,setNav]=useState("home");
  const [sel,setSel]=useState(null);
  const [workout,setWorkout]=useState(null);
  const goSession=(s)=>{ setSel(s); setNav("detail"); };
  const goBack=()=>{ setSel(null); setNav("sessions"); };
  const exitWorkout=()=>{ setWorkout(null); setSel(null); setNav("home"); };
  const NAV=[{key:"home",icon:"🏠",label:"Home"},{key:"sessions",icon:"💪",label:"Sessioni"},{key:"mobility",icon:"🧘",label:"Mobilità"}];
  const activeNav=nav==="detail"?"sessions":nav;

  const bg={
    position:"fixed",inset:0,zIndex:0,
    background:`
      radial-gradient(ellipse 85% 60% at 12% 0%,  rgba(99,102,241,.12) 0%, transparent 55%),
      radial-gradient(ellipse 65% 55% at 88% 85%, rgba(20,184,166,.11) 0%, transparent 50%),
      radial-gradient(ellipse 55% 45% at 60% 30%, rgba(236,72,153,.08) 0%, transparent 48%),
      linear-gradient(180deg, #f8f9fd 0%, #eef1f8 100%)`,
  };

  return (
    <div style={{minHeight:"100vh",background:"#f8f9fd",position:"relative",fontFamily:"system-ui,sans-serif",color:T1}}>
      <div style={bg}/>
      {workout && <WorkoutMode session={workout} onExit={exitWorkout}/>}
      {!workout && (
        <div style={{position:"relative",zIndex:1,minHeight:"100vh"}}>
          {nav==="home"     && <HomePage onSelect={goSession}/>}
          {nav==="sessions" && !sel && (
            <div style={{padding:"20px 16px 100px",overflowY:"auto"}}>
              <h1 style={{fontSize:26,fontWeight:800,marginBottom:4,color:T1}}>Sessioni</h1>
              <p style={{color:T3,fontSize:13,marginBottom:24}}>Push / Pull × 2 · 4 giorni a settimana</p>
              {SESSIONS.map(s=>{
                const g=`linear-gradient(135deg,${s.grad[0]},${s.grad[1]})`;
                return (
                  <div key={s.id} style={{...S.glass,padding:"16px 18px",marginBottom:11,cursor:"pointer"}} onClick={()=>goSession(s)}>
                    <div style={{display:"flex",alignItems:"center",gap:15}}>
                      <div style={{width:48,height:48,borderRadius:13,background:g,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{s.emoji}</div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:800,fontSize:15,color:T1}}>{s.label} <span style={{color:T3,fontWeight:400,fontSize:13}}>— {s.subtitle}</span></div>
                        <div style={{fontSize:12,color:T3,marginTop:3}}>{s.day} · {s.exercises.length} esercizi · {s.tag}</div>
                      </div>
                      <span style={{fontSize:18,color:T4}}>›</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {nav==="detail" && sel && <SessionDetail session={sel} onBack={goBack} onStart={()=>setWorkout(sel)}/>}
          {nav==="mobility" && <MobilityPage/>}

          {/* bottom nav */}
          <div style={{
            position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",
            display:"flex",gap:3,padding:6,zIndex:90,
            background:"rgba(255,255,255,.80)",
            backdropFilter:"blur(36px) saturate(200%)",
            WebkitBackdropFilter:"blur(36px) saturate(200%)",
            border:"1px solid rgba(17,21,28,.08)",
            borderRadius:26,
            boxShadow:"0 12px 40px rgba(17,21,28,.14), inset 0 1px 0 rgba(255,255,255,.9)",
          }}>
            {NAV.map(item=>(
              <button key={item.key}
                onClick={()=>{ setNav(item.key); if(item.key!=="sessions") setSel(null); }}
                style={{
                  display:"flex",flexDirection:"column",alignItems:"center",gap:2,
                  padding:"9px 18px",borderRadius:20,cursor:"pointer",
                  border:activeNav===item.key?"1px solid rgba(17,21,28,.1)":"1px solid transparent",
                  background:activeNav===item.key?"rgba(17,21,28,.06)":"transparent",
                  color:activeNav===item.key?T1:T4,
                  fontSize:10,fontWeight:500,fontFamily:"system-ui,sans-serif",minWidth:62,
                }}>
                <span style={{fontSize:20}}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
