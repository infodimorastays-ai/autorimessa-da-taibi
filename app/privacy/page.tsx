import Link from 'next/link';

export const metadata = {
  title: 'Privacy e cookie | Autorimessa Da Taibi',
  description: 'Informativa privacy e cookie di Autorimessa Da Taibi.',
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <article>
        <Link href="/">←︎ Torna al sito</Link>
        <p className="eyebrow">AUTORIMESSA DA TAIBI</p>
        <h1>Privacy e cookie</h1>
        <p className="updated">Ultimo aggiornamento: 7 novembre 2026</p>

        <h2>Titolare del trattamento</h2>
        <p>
          Taibi Ibrahim, impresa individuale, P.IVA 13003010017, REA TO-1338704,
          con sede legale in Via Arturo Farinelli 18, 10135 Torino. Per richieste
          relative alla privacy: <a href="mailto:Autorimessadataibi@gmail.com">Autorimessadataibi@gmail.com</a>.
        </p>

        <h2>Dati trattati e finalità</h2>
        <p>
          Il sito non richiede registrazione e non contiene moduli di prenotazione.
          I dati che scegli di comunicare tramite email, telefono o WhatsApp sono
          trattati da Taibi Ibrahim e da eventuali collaboratori autorizzati per
          rispondere alle richieste, fornire informazioni su disponibilità e tariffe
          e gestire il rapporto precontrattuale o contrattuale.
        </p>

        <h2>Conservazione</h2>
        <p>
          Le chat WhatsApp sono conservate per un periodo massimo di 12 mesi, salvo
          necessità di tutela dei diritti o obblighi di legge. Le email e le altre
          richieste sono conservate per il tempo necessario a gestirle e per gli
          eventuali obblighi civilistici e fiscali applicabili.
        </p>

        <h2>Base giuridica e conferimento</h2>
        <p>
          Il trattamento si basa sulla gestione della richiesta dell&apos;interessato,
          sull&apos;esecuzione di misure precontrattuali o contrattuali e sugli obblighi
          di legge. Il conferimento dei dati nei contatti è facoltativo, ma necessario
          per ricevere una risposta.
        </p>

        <h2>Fornitori e trasferimenti</h2>
        <p>
          Il sito è pubblicato tramite Cloudflare Pages e utilizza servizi tecnici
          di Cloudflare, IONOS, GitHub e Cloudflare R2 per hosting, DNS, sicurezza e
          distribuzione degli asset. Quando segui un collegamento, WhatsApp, Google
          Maps, il tuo gestore email o telefonico possono trattare dati secondo le
          rispettive informative.
        </p>

        <h2>Cookie e strumenti di tracciamento</h2>
        <p>
          Il sito non utilizza analytics, pixel pubblicitari, newsletter, profilazione
          o altri strumenti di tracciamento non necessari. Eventuali cookie tecnici o
          di sicurezza eventualmente impostati dall&apos;infrastruttura Cloudflare sono
          utilizzati per il funzionamento e la protezione del servizio. Non viene
          installato un cookie di marketing tramite questo sito.
        </p>

        <h2>Diritti dell&apos;interessato</h2>
        <p>
          Puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione
          o portabilità dei dati, nei casi previsti dalla legge, scrivendo a
          <a href="mailto:Autorimessadataibi@gmail.com"> Autorimessadataibi@gmail.com</a>.
          Hai inoltre diritto di proporre reclamo al Garante per la protezione dei
          dati personali.
        </p>

        <p className="note">
          Questa pagina è una bozza informativa basata sui dati comunicati dal titolare
          e non sostituisce la verifica di un professionista privacy.
        </p>
      </article>
      <style>{`
        :root { color-scheme: dark; }
        body { margin: 0; background: #0b0b0c; color: #f2f0eb; font-family: Arial, sans-serif; }
        .privacy-page { min-height: 100vh; padding: 48px 20px 80px; }
        article { max-width: 760px; margin: 0 auto; line-height: 1.65; }
        a { color: #f2f0eb; }
        .eyebrow { margin-top: 64px; letter-spacing: .14em; font-size: 12px; opacity: .65; }
        h1 { margin: 8px 0; font-size: clamp(42px, 8vw, 84px); line-height: .95; text-transform: uppercase; }
        h2 { margin-top: 42px; font-size: 22px; }
        .updated, .note { opacity: .7; font-size: 14px; }
        .note { margin-top: 56px; border-top: 1px solid #444; padding-top: 20px; }
      `}</style>
    </main>
  );
}
