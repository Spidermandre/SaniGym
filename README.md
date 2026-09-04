# SaniFit Rev. 5

Web app personale (PWA, mobile-first) per seguire la scheda di allenamento
**SaniFit Rev. 5** — ipertrofia upper body, Push/Pull × 2, 4 giorni a settimana.
Un solo utente, su smartphone, in palestra.

## Comandi

```bash
npm install      # installa le dipendenze
npm run dev      # server di sviluppo (http://localhost:5173, anche in rete locale con --host)
npm run build    # build di produzione in dist/
npm run preview  # serve la build di produzione in locale
```

Stack: Vite + React 18, JavaScript, nessuna libreria UI, nessun backend.
Persistenza in `localStorage` (alternative scelte, settimana del blocco, registro carichi con storico).

Tema scuro: sfondo nero, un colore fluo per sessione (Push A verde chiaro, Push B verde scuro,
Pull A celeste, Pull B tiffany), navigazione e card in stile *liquid glass*. I colori sono in
`src/styles.js` (`THEME`) e non toccano i dati della scheda.

## Indirizzo online

L'app è pubblicata su GitHub Pages:

**https://spidermandre.github.io/SaniGym/**

Il workflow `.github/workflows/deploy.yml` esegue il build e pubblica `dist/`
a ogni push sul branch di sviluppo o su `main`. Si può lanciare anche a mano
dalla tab **Actions** → *Deploy PWA su GitHub Pages* → *Run workflow*.

**Attivazione una tantum:** in *Settings → Pages*, alla voce *Build and
deployment → Source*, scegli **GitHub Actions**. Senza questo passaggio il
deploy fallisce, perché il token del workflow non ha il permesso di creare
il sito Pages.

## Installare la PWA

In alternativa la cartella `dist/` è un sito statico: puoi pubblicarla su
qualsiasi hosting HTTPS oppure servirla in rete locale con `npm run preview`.

**iPhone (Safari)**
1. Apri https://spidermandre.github.io/SaniGym/ in Safari.
2. Tocca il pulsante **Condividi** (il quadrato con la freccia verso l'alto).
3. Scorri e tocca **Aggiungi alla schermata Home**, poi **Aggiungi**.
4. L'icona 💪 SaniFit compare in Home e si apre a schermo intero, anche offline.

**Android (Chrome)**
1. Apri https://spidermandre.github.io/SaniGym/ in Chrome.
2. Menu ⋮ → **Installa app** (oppure **Aggiungi a schermata Home**).

## Struttura

```
src/
  App.jsx                    root + bottom nav
  data/programma.js          scheda Rev. 5 (PROGRAM_META, BLOCK, SESSIONS, MOBILITY, WEEK) — non modificare i valori
  components/
    Home.jsx                 intestazione, blocco 8 settimane, oggi, settimana, sessioni, promemoria clinico
    Sessions.jsx             lista delle 4 sessioni
    SessionDetail.jsx        dettaglio con alternative (↔ Alternativa / ↩ Originale)
    WorkoutMode.jsx          sessione guidata (set, recupero, registro carichi, deload, sicurezza)
    RestTimer.jsx            timer circolare di recupero
    Progress.jsx             progressi: ultimo carico, variazione, massimo per esercizio
    Mobility.jsx             checklist Pre / Post / Riposo
    SafetyOverlay.jsx        overlay "Fermati." non dismissibile
  hooks/
    useTimer.js              timer basato su timestamp (corretto anche dopo il background)
    usePersistedState.js     useState + localStorage
    useAltChoices.js         scelta alternativa per sessione + esercizio
    useWeightLog.js          registro carichi: ultimo valore + storico per giorno
  styles.js                  oggetto S (glassmorphism chiaro) e colori
public/
  manifest.webmanifest, sw.js, icon.svg, icon-maskable.svg
docs/RAZIONALE_SCIENTIFICO.md  perché la scheda è fatta così
reference/SaniFit_rev4.jsx     versione precedente, riferimento visivo e funzionale
```

## Novità Rev. 5 rispetto a Rev. 4

- **Alternative** (`alt`): ogni esercizio non terapeutico può essere sostituito con la sua variante equivalente; la scelta è persistita e vale anche nella sessione guidata. I face pull 🛡 non hanno alternativa.
- **Blocco di 8 settimane** (`BLOCK`): card in Home con settimana, fase e RIR target, avanzamento manuale con ‹ ›. Nella sessione guidata il RIR compare nella pill del tag; alla settimana 7 (Deload) le serie sono dimezzate con un avviso.
- **Focus e tempo**: muscolo target sotto il nome dell'esercizio e cadenza "⏱ tempo 3-1-1" (eccentrica-pausa-concentrica, secondi).
- **Registro carichi**: campo "Peso usato (kg)" precompilato con l'ultimo valore; salvataggio a ogni set; "Ultima volta: X kg · gg/mm".
- **Progressi** (tab 📈): per ogni esercizio allenato mostra ultimo carico, variazione rispetto alla volta precedente, massimo e numero di sessioni. Riepilogo con allenamenti registrati e data dell'ultimo.
- **Sicurezza clinica**: bottone "⚠️ Sintomi al braccio dx" sempre visibile nella sessione guidata; apre un overlay che si chiude solo uscendo dalla sessione.
- Timer di recupero basato su timestamp: continua a contare correttamente se l'app va in background.

Vincoli clinici, protocollo di mobilità e dati della scheda sono in `src/data/programma.js` e non vanno modificati senza il fisiatra.
