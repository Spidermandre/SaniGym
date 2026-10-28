# SaniFit Rev. 6

Web app personale (PWA, mobile-first) per seguire la scheda di allenamento
**SaniFit Rev. 6**: ipertrofia con priorità petto e bicipiti, 3 sedute upper e 1 gambe,
lunedì · mercoledì · giovedì · venerdì. Un solo utente, su smartphone, in palestra.

| | Lun | Mar | Mer | Gio | Ven | Sab | Dom |
|---|---|---|---|---|---|---|---|
| | **Upper A** | riposo attivo | **Upper B** | **Gambe** | **Upper C** | riposo attivo | riposo |
| | Petto + Bicipiti | | Dorso · Spalle · Tricipiti | Full lower | Petto + Bicipiti | | |

Il perché di ogni scelta è in `docs/RAZIONALE_SCIENTIFICO.md`.

## Comandi

```bash
npm install      # installa le dipendenze
npm run dev      # server di sviluppo (http://localhost:5173, anche in rete locale con --host)
npm run build    # build di produzione in dist/
npm run preview  # serve la build di produzione in locale
```

Stack: Vite + React 18, JavaScript, nessuna libreria UI, nessun backend.
Persistenza in `localStorage`: alternative scelte, settimana del blocco, peso di lavoro, registro carichi con storico.

Tema: sfondo grigio scuro, pulsanti, titoli, valori e icone in arancione fluo (#ff7a00),
card e navigazione in stile *liquid glass*. Ogni tipologia di seduta ha la sua icona:
spinta (Upper A e C), trazione (Upper B), squat (Gambe), riposo attivo, riposo completo,
mobilità pre e post. Colori in `src/styles.js`, icone in `src/components/Icon.jsx`.

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

**iPhone (Safari)**
1. Apri https://spidermandre.github.io/SaniGym/ in Safari.
2. Tocca il pulsante **Condividi** (il quadrato con la freccia verso l'alto).
3. Scorri e tocca **Aggiungi alla schermata Home**, poi **Aggiungi**.
4. L'icona SaniFit compare in Home e si apre a schermo intero, anche offline.

Se l'app era già installata, per vedere una nuova icona rimuovila dalla Home e aggiungila di nuovo:
iOS conserva l'icona del momento dell'installazione.

**Android (Chrome)**
1. Apri https://spidermandre.github.io/SaniGym/ in Chrome.
2. Menu ⋮ → **Installa app** (oppure **Aggiungi a schermata Home**).

## Funzioni

- **Blocco di 6 settimane** (`BLOCK`): card in Home con settimana, fase, RIR obiettivo per multiarticolari e isolamenti e nota; avanzamento manuale con ‹ ›. Alla settimana 6 (deload, `volumeFactor` 0.6) le serie sono ridotte con `Math.ceil(serie × 0.6)` e compare l'avviso "Deload: volume ridotto, stessi carichi".
- **RIR per esercizio**: nella sessione guidata una pill mostra il RIR da usare. È il più prudente tra l'obiettivo della settimana (`rirMulti` / `rirIso` in base al `type`) e il minimo del campo `rir` dell'esercizio. I vincoli clinici non scendono mai (il destro resta almeno a 2, i face pull a 3); calibrazione e deload restano rispettati.
- **Esercizi asimmetrici** (`asymmetric: true`): badge "DX ≠ SX", contatori separati Destro / Sinistro, peso separato per lato, e due pulsanti "Destro" e "Sinistro". Il set è completo quando entrambi i lati previsti sono fatti. Le serie del destro sono lette dalla nota dell'esercizio ("A DESTRA: … N serie"); se la nota non le indica, il destro fa le stesse serie del sinistro.
- **Alternative** (`alt`): ogni esercizio non terapeutico può essere sostituito con la sua variante; serie, ripetizioni, recupero, tempo, RIR e asimmetria restano dell'originale. La scelta è persistita. I face pull 🛡 non hanno alternativa.
- **Registro carichi**: il peso si regola con − e + (passo del programma: 2.5 kg su macchine e cavi, 2 kg per manubrio) e con ±0.5 kg. Parte dal peso già in uso, poi dall'ultimo registrato (anche con lo stesso nome nella Rev. 5), poi dal valore più alto consigliato. Ogni modifica è salvata subito; il completamento del set scrive anche lo storico, per lato sugli asimmetrici.
- **Recupero**: il timer parte da solo a set completato, conta da un timestamp (corretto anche dopo il background) e a zero passa al set successivo.
- **Progressi**: due viste. *Carichi*: ultimo carico, variazione, massimo e sessioni per esercizio e lato, più lo storico della Rev. 5. *Volume*: serie settimanali per gruppo muscolare (`VOLUME`), sedute e note, con il badge "Priorità".
- **Regole di sicurezza** (`SAFETY_RULES`): sezione apribile in Home, sotto il promemoria clinico.
- **Mobilità**: checklist Pre / Post / Riposo.

## Struttura

```
src/
  App.jsx                    root + bottom nav
  data/programma.js          scheda Rev. 6 (PROGRAM_META, BLOCK, SESSIONS, MOBILITY, WEEK, VOLUME, SAFETY_RULES) — non modificare i valori
  lib/program.js             regole della scheda: RIR effettivo, serie del lato destro, peso per lato, tipologia di seduta
  lib/weights.js             lettura dei pesi consigliati (range, passo, valori negativi)
  components/
    Home.jsx                 intestazione, blocco 6 settimane, oggi, settimana, sessioni, promemoria e regole di sicurezza
    Sessions.jsx             lista delle 4 sessioni, nell'ordine della settimana
    SessionDetail.jsx        dettaglio con nota di seduta, RIR, asimmetria e alternative
    WorkoutMode.jsx          sessione guidata (RIR, deload, lati dx/sx, registro carichi, recupero)
    RestTimer.jsx            timer circolare di recupero, parte da solo
    Progress.jsx             progressi: carichi e volume
    VolumePage.jsx           volume settimanale per gruppo muscolare
    Mobility.jsx             checklist Pre / Post / Riposo
    Icon.jsx                 icone SVG lineari (tipologie di seduta e interfaccia)
  hooks/
    useTimer.js              timer basato su timestamp (corretto anche dopo il background)
    usePersistedState.js     useState + localStorage
    useAltChoices.js         scelta alternativa per sessione + esercizio
    useWeightLog.js          registro storico: ultimo valore + storico per giorno e lato
    useWorkingWeights.js     peso di lavoro corrente, salvato a ogni modifica
  styles.js                  oggetto S (liquid glass su grigio scuro) e colori
public/
  manifest.webmanifest, sw.js
  icon.svg · apple-touch-icon.png (180) · icon-192.png · icon-512.png · icon-maskable-512.png
  Icona: atleta stilizzato che solleva un bilanciere, arancione fluo su grigio scuro.
  Sorgente in scripts/icon-gen.py (genera gli SVG), PNG con scripts/icon-render.mjs (Chromium/Playwright).
docs/RAZIONALE_SCIENTIFICO.md  perché la scheda è fatta così
reference/SaniFit_rev4.jsx     versione precedente, riferimento visivo e funzionale
```

Vincoli clinici, protocollo di mobilità e dati della scheda sono in `src/data/programma.js` e non vanno modificati senza il fisiatra.
