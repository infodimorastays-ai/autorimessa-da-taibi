# Istruzioni per gli agenti Codex

Prima di analizzare o modificare questo progetto, leggere integralmente
[`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md). Quel documento è la fonte
operativa per requisiti, dati verificati, architettura, diagnosi, priorità e
workflow.

Regole vincolanti:

- preservare architettura, ordine delle sezioni, transizioni 3D, SEO,
  accessibilità e responsive design;
- non fare mass refactor e non riscrivere interi componenti: preferire modifiche
  piccole, isolate e verificabili;
- non alterare o inventare dati commerciali, legali, recensioni o copy;
- non aggiungere componenti, librerie o immagini non necessari; usare R2 per i
  media;
- non rimuovere il CSS locale nei componenti senza una ragione verificata;
- affrontare i gruppi di lavoro nell'ordine di priorità documentato e, prima di
  iniziare, indicare all'utente modello GPT e reasoning effort consigliati;
- verificare build/test/diff e gli scenari di scroll prescritti; separare, quando
  possibile, ogni categoria di cambiamento in un commit piccolo;
- lavorare localmente e sincronizzare con GitHub; evitare modifiche dirette
  nell'editor web salvo emergenza.
