# Contesto permanente del progetto

Questo documento è la fonte operativa per ogni futura attività Codex sul sito
**Autorimessa Da Taibi**. Va letto integralmente prima di intervenire. Riunisce
requisiti, dati verificati, architettura, diagnosi, priorità e workflow; non
autorizza modifiche indiscriminate al codice.

## 1. Progetto e direzione creativa

- Sito: **Autorimessa Da Taibi**.
- Dominio: <https://autorimessadataibi.com>.
- Direzione visiva: automotive urbano premium, circa **70% street e 30%
  luxury**.
- Evitare tuning, neon, estetica cartoon ed effetti gratuiti.
- Mantenere HTML semantico, accessibilità, SEO, responsive design, `lang="it"`,
  metadata e JSON-LD.

## 2. Stack e architettura

- Next.js 13.5.1, React 18, App Router e TypeScript.
- File principali:
  - `app/fonts/ClashDisplay-Variable.woff2`
  - `app/globals.css`
  - `app/layout.tsx`
  - `app/page.tsx`
- Componenti, nell'ordine attuale: `Navbar`, `Hero`, `IntroSection`,
  `ServicesSection`, `SecuritySection`, `RatesSection`, `CarWashSection`,
  `LocationSection`, `ReviewsSection`, `ContactSection`.
- `app/page.tsx` è un server component semplice che compone le sezioni.
- `Navbar`, `Hero` e le sezioni intermedie sono client component; `Contact`
  resta server perché non usa hook.
- I componenti contengono markup, logica di scroll locale e CSS locale in
  stringhe, iniettato con
  `<style dangerouslySetInnerHTML={{ __html: styles }} />`. Il pattern è
  intenzionale: non rimuoverlo senza una ragione verificata.
- Tailwind è configurato, ma il sito usa prevalentemente CSS nei componenti.
- Evitare riscritture complete dei componenti: in passato hanno già prodotto
  regressioni. Preferire modifiche piccole, isolate e verificabili.

## 3. Media e font

- Video Hero su R2:
  <https://pub-fd03e0c0deb14bfda1dea88f5eb37f8b.r2.dev/hero_video_nu1atx.mp4>.
- Bucket R2: `autorimessa-da-taibi`.
- Possibile dominio media futuro: `media.autorimessadataibi.com`.
- Non esistono residui Cloudinary.
- `Archivo Black` è il font d'impatto.
- `Clash Display` è il font editoriale locale, esposto tramite
  `--font-clash-display`.
- La Navbar può conservare `Barlow Condensed`.
- `Inter` è ancora ereditato in `CarWash`, `Location`, `Reviews`, `Contact` e in
  alcune microcopy della Hero: uniformarlo soltanto durante la fase tipografia.
- Il caricamento remoto di Google Fonts può produrre variazioni metriche.
- Non generare nuove immagini; usare R2 per i media.

## 4. Contenuti e dati verificati

Questi dati non devono essere alterati, reinterpretati o inventati.

### Tariffe parcheggio

- Moto: da **€15**.
- Auto: da **€20**.
- SUV, furgoni e camper: da **€25**.
- Non presentare queste tariffe come "giornaliere" o "24h".
- Sosta minima: **24 ore**.
- Sono disponibili formule giornaliere, settimanali e mensili.

### Lavaggio su richiesta

- Moto: **€5**.
- Auto piccole: **€10**.
- Auto medie: **€12**.
- Auto grandi: **€15**.
- Furgoni e camper: **€25**.

### Sede, accesso e disponibilità

- Sede clienti: **Via Breglio 111, 10147 Torino**.
- Accesso remoto H24.
- Capacità: circa 80 posti per auto/furgoni e 10 posti moto.
- Presenza del personale:
  - lunedì-sabato, 08:00-18:00;
  - domenica, 08:00-01:00.

### Recensioni e contatti

- Valutazione: **4,0/5**, su **4 recensioni**.
- Mostrare tre recensioni positive reali; non inventare recensioni.
- Telefono: **+39 328 169 3326**.
- WhatsApp: <https://wa.me/393281693326>.
- Email: **Autorimessadataibi@gmail.com**.

### Dati legali

- Titolare: **Taibi Ibrahim**, impresa individuale.
- P.IVA: **13003010017**.
- REA: **TO-1338704**.
- PEC: **ibrahimtaibi@pec.it**.
- Sede legale: **Via Arturo Farinelli 18, 10135 Torino**.
- Non confondere mai la sede legale con la sede clienti di Via Breglio 111.

## 5. Layout e transizioni

L'esperienza è costruita come una sequenza di sezioni full-screen sticky
sovrapposte, con profondità 3D.

### Ordine e livelli storici

| Elemento | Livello |
| --- | ---: |
| Hero | 1 |
| Intro | 5 |
| Services | 10 |
| Security | 15 |
| Rates | 20 |
| CarWash | 25 |
| Location | 30 |
| Reviews | 35 |
| Contact | 40 |
| Navbar | 50 |

L'overlay di transizione della Navbar usa un livello molto più alto.

### Geometria indicativa desktop

- Uscita: `translateY(-7vh)`, `translateZ(-240px)`, `rotateX(4deg)`,
  `scale(.925)`, `brightness(.52)`.
- Entrata: `translateY(80px)`, `translateZ(90px)`, `rotateX(-2.5deg)`.
- Esistono varianti mobile.
- Variabili CSS: `--transition-progress` e `--out-progress`.
- L'aggiornamento avviene tramite scroll, `requestAnimationFrame` e
  `getBoundingClientRect()`.

### Navbar, serranda e fari

- La Navbar deve conservare menu e transizione "serranda garage/fari", con una
  resa cinematografica e credibile, non cartoon.
- Sequenza attuale indicativa: chiusura 720 ms, pausa 180 ms, scroll istantaneo
  mentre la scena è coperta, apertura 1500 ms, quindi riabilitazione.
- Elementi che oggi rendono l'effetto cartoon: serranda piatta, righe
  perfettamente regolari, shimmer diagonale, sagoma auto sfocata, fari CSS
  perfettamente simmetrici, flare/bloom/esposizione simultanei, opacità brusche e
  glare a tutto schermo.
- Intervento futuro: preservare le fasi; dare più peso a timing, ombra di
  contatto e materiale; introdurre leggere irregolarità; ridurre shimmer, flare
  e flash; rendere i fari più sottili e asimmetrici; applicare un'esposizione
  graduale. Non aggiungere librerie o immagini.

## 6. Diagnosi tecnica verificata

### Dimensionamento e clipping

- Quasi tutte le sezioni sticky usano `height: 100svh`.
- Il `min-height` è circa 620 px su desktop e 640 px su mobile; `Contact` è circa
  680 px e non è sticky.
- `100svh` insieme a `min-height` può superare il viewport.
- JavaScript usa `innerHeight`, mentre il CSS usa `svh`.
- `svh` non segue bene tutte le variazioni della chrome mobile.
- `overflow: hidden` e `margin-top: auto` possono tagliare contenuti.
- La riduzione 3D aggrava il vuoto percepito.

### Problema centrale dello scroll

- `Hero` usa una catena basata su `offsetTop`.
- Le sezioni successive misurano `nextSection.getBoundingClientRect().top`
  mentre la sezione misurata è già trasformata.
- Questo introduce feedback/frame lag, asimmetria tra discesa e risalita,
  residui o gap quando lo scroll si ferma o inverte rapidamente.

### Prestazioni

- Ogni sezione mantiene listener e RAF propri.
- Letture e scritture geometriche ripetute, `filter: brightness()` a tutto
  schermo e `will-change` permanente hanno un costo significativo.
- Le sezioni coperte continuano a renderizzare.
- La Hero ha una soglia di visibilità intorno a `.995`, che può produrre un pop.

### Gutters e larghezze

- I gutter sono duplicati e fissi, circa 40/28/20/17 px.
- Sono troppo piccoli sugli schermi ampi.
- Manca un token condiviso e un `max-width` coerente, mentre i titoli scalano in
  `vw`.

### Errori runtime e cache

- Non esiste al momento una causa diretta verificata dell'errore
  `Unsupported Server Component`: import, default export e boundary
  client/server risultano coerenti.
- Cause storiche plausibili: export errato o module object, boundary alterato,
  HMR/chunk obsoleti.
- Gli errori 404 relativi a chunk/cache sono distinti dagli errori del codice.
- In passato la pulizia di `.next` ha risolto cache stale.

## 7. Gruppi di lavoro in ordine di priorità

Prima di ogni task o gruppo, indicare all'utente il modello GPT e il reasoning
effort consigliati. Per il gruppo 1 raccomandare il modello più forte disponibile
con effort **high**. GPT-5.6 Sol con effort medium resta utilizzabile, ma non è la
scelta ideale per la geometria accoppiata.

1. **Geometria delle transizioni scroll e metrica viewport/dimensioni delle
   sezioni.** È il prossimo gruppo operativo. Stabilizzare prima il calcolo del
   progresso su coordinate di layout non trasformate; poi unificare la metrica
   CSS/JS e gestire viewport bassi. Non cambiare contemporaneamente estetica o
   layout.
2. **Layout responsive, clipping e distribuzione verticale interna**, incluso
   il blocco CCTV.
3. **Gutters globali, larghezze dei contenuti e allineamenti.**
4. **Performance di rendering e gestione dei layer:** listener/RAF, filter,
   `will-change`, sezioni coperte e soglie di visibilità.
5. **Coerenza tipografica e font.**
6. **Transizione cinematografica Navbar/serranda/fari.**
7. **QA finale cross-device, accessibilità, SEO, runtime e hardening cache.**

### Ordine tecnico obbligatorio per il gruppo 1

1. Raccogliere una baseline visuale e funzionale ai viewport critici, includendo
   reverse scroll rapido.
2. Correggere esclusivamente la geometria del progresso.
3. Unificare la metrica viewport fra CSS e JavaScript e aggiungere il fallback
   per altezze ridotte.
4. Correggere clipping e distribuzione, senza mescolare queste fasi.

## 8. Vincoli operativi e verifiche

- Non fare mass refactor.
- Preservare architettura e ordine delle sezioni.
- Non aggiungere componenti o librerie non necessari.
- Non generare nuove immagini; usare media serviti da R2.
- Non alterare dati commerciali o legali e non inventare copy o recensioni.
- Preservare transizione 3D, SEO e accessibilità.
- Testare sempre:
  - scroll verso il basso;
  - scroll verso l'alto;
  - arresto a metà transizione;
  - inversioni rapide;
  - desktop e mobile.
- Nelle verifiche finali includere reduced motion e navigazione da tastiera.
- Isolare una categoria di cambiamento per commit, quando possibile.

## 9. Ambiente, Git e workflow

- Node e npm non erano inizialmente nel `PATH`, ma runtime Node e pnpm integrati
  di Codex sono disponibili tramite percorsi assoluti.
- Le dipendenze sono installate e una build di produzione è già stata completata
  con successo.
- `.next`, `node_modules` e `.pnpm-store` sono output locali ignorati;
  `.gitignore` include `/.pnpm-store/`.
- Non serve al momento alcun plugin esterno aggiuntivo; GitHub è collegato.
- Repository privato:
  <https://github.com/north2studio-lab/autorimessa-da-taibi>.
- Il branch locale `main` traccia `origin/main`.
- Stato verificato prima dell'introduzione di questi documenti: locale e remoto
  allineati al commit `299e921e174c9cde6c66c04cfe2044dc2f6268a6`, working
  tree pulita.
- Identità Git locale: `Autorimessa da Taibi <north2studio@gmail.com>`.
- Workflow preferito:
  1. lavorare localmente nella task collegata al progetto;
  2. effettuare modifiche piccole e mirate;
  3. verificare build, test e diff in proporzione al rischio;
  4. creare commit piccoli e coerenti;
  5. eseguire il push su GitHub.
- Non modificare file direttamente nell'editor web GitHub salvo emergenza.
