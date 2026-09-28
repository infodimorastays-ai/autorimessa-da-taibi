const WHATSAPP_URL =
  'https://wa.me/393281693326';

const PHONE_URL =
  'tel:+393281693326';

const EMAIL_URL =
  'mailto:Autorimessadataibi@gmail.com';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place//data=!4m2!3m1!1s0x47886d20eae2a6d9:0xef1441f915874180?sa=X&ved=1t:8290&ictx=111';

const BRAND_LOGO_URL =
  'https://pub-fd03e0c0deb14bfda1dea88f5eb37f8b.r2.dev/brand/autorimessa-da-taibi-logo.webp';

const contactStyles = `
  .contact-section {
    --transition-progress: 0;

    position: relative;
    z-index: 40;

    width: 100%;
    min-height: 100svh;

    overflow: hidden;

    background: #e7e4dc;
    color: #080808;

    border-radius:
      30px 30px 0 0;

    box-shadow:
      0 -40px 120px
      rgba(0, 0, 0, 0.72);

    transform-origin: 50% 100%;

    transform:
      perspective(1400px)
      translateY(
        calc(
          (1 - var(--transition-progress)) *
          80px
        )
      )
      translateZ(
        calc(
          (1 - var(--transition-progress)) *
          90px
        )
      )
      rotateX(
        calc(
          (1 - var(--transition-progress)) *
          -2.5deg
        )
      );

    will-change: transform;
    backface-visibility: hidden;
  }

  .contact-section::before {
    content: '';

    position: absolute;

    top: 0;
    left: var(--layout-inline);
    right: var(--layout-inline);

    height: 1px;

    background:
      rgba(0, 0, 0, 0.16);
  }

  .contact-section__grid {
    position: absolute;
    inset: 0;

    pointer-events: none;

    opacity: 0.22;

    background-image:
      linear-gradient(
        rgba(0, 0, 0, 0.035) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.035) 1px,
        transparent 1px
      );

    background-size:
      80px 80px;
  }

  .contact-section__inner {
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100svh;

    padding:
      clamp(46px, 5vw, 72px)
      var(--layout-inline)
      26px;
  }

  .contact-section__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .contact-section__section-id {
    display: flex;
    align-items: center;

    gap: 16px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.17em;
  }

  .contact-section__section-id span:first-child {
    color:
      rgba(0, 0, 0, 0.34);
  }

  .contact-section__section-id span:last-child {
    color:
      rgba(0, 0, 0, 0.72);
  }

  .contact-section__status {
    display: flex;
    align-items: center;

    gap: 9px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(0, 0, 0, 0.68);
  }

  .contact-section__status-dot {
    width: 5px;
    height: 5px;

    border-radius: 50%;

    background: #080808;
  }

  .contact-section__main {
    display: grid;

    grid-template-columns:
      minmax(0, 1.4fr)
      minmax(300px, 0.6fr);

    align-items: end;

    gap:
      clamp(50px, 8vw, 140px);

    margin-top: auto;

    padding:
      clamp(50px, 8vh, 100px)
      0
      clamp(34px, 5vh, 60px);
  }

  .contact-section__eyebrow {
    margin:
      0 0 18px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.18em;

    color:
      rgba(0, 0, 0, 0.62);
  }

  .contact-section__title {
    display: flex;
    flex-direction: column;

    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(54px, 7.7vw, 124px);

    font-weight: 400;

    line-height: 0.81;

    letter-spacing: -0.07em;

    text-transform: uppercase;
  }

  .contact-section__title span {
    color: transparent;

    -webkit-text-stroke:
      1.4px
      rgba(8, 8, 8, 0.76);
  }

  .contact-section__side {
    display: flex;
    flex-direction: column;

    align-items: flex-start;

    gap: 26px;
  }

  .contact-section__copy {
    max-width: 350px;

    margin: 0;

    font-size: 13px;
    line-height: 1.65;

    color:
      rgba(0, 0, 0, 0.56);
  }

  .contact-section__copy strong {
    font-weight: 600;

    color:
      rgba(0, 0, 0, 0.9);
  }

  .contact-section__whatsapp {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    gap: 24px;

    padding:
      20px
      22px;

    background: #080808;
    color: #f5f3ed;

    border:
      1px solid #080808;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(15px, 1.5vw, 22px);

    line-height: 1;

    letter-spacing: -0.035em;

    text-transform: uppercase;

    transition:
      transform 200ms ease,
      background 200ms ease,
      color 200ms ease;
  }

  .contact-section__whatsapp:hover,
  .contact-section__whatsapp:focus-visible {
    transform:
      translateY(-3px);

    background: transparent;
    color: #080808;
  }

  .contact-section__whatsapp-arrow {
    font-size: 18px;
  }

  .contact-section__contacts {
    display: grid;

    grid-template-columns:
      repeat(4, minmax(0, 1fr));

    border-top:
      1px solid
      rgba(0, 0, 0, 0.17);

    border-bottom:
      1px solid
      rgba(0, 0, 0, 0.17);
  }

  .contact-card {
    display: flex;
    flex-direction: column;

    min-height: 145px;

    padding:
      20px
      22px;

    border-right:
      1px solid
      rgba(0, 0, 0, 0.17);
  }

  .contact-card:last-child {
    border-right: 0;
  }

  .contact-card__label {
    font-size: 11px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(0, 0, 0, 0.72);
  }

  .contact-card__content {
    display: flex;
    flex-direction: column;

    align-items: flex-start;

    gap: 6px;

    margin-top: auto;
  }

  .contact-card__value {
    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(16px, 1.5vw, 23px);

    font-weight: 400;

    line-height: 1;

    letter-spacing: -0.045em;

    overflow-wrap: anywhere;
  }

  .contact-card__sub {
    font-size: 11px;
    line-height: 1.45;

    letter-spacing: 0.04em;

    color:
      rgba(0, 0, 0, 0.72);
  }

  a.contact-card {
    transition:
      background 200ms ease;
  }

  a.contact-card:hover,
  a.contact-card:focus-visible {
    background:
      rgba(0, 0, 0, 0.045);
  }

  .contact-section__footer {
    display: grid;

    grid-template-columns:
      1fr auto 1fr;

    align-items: end;

    gap: 30px;

    margin-top: auto;

    padding-top: 20px;
  }

  .contact-section__legal {
    display: flex;
    flex-direction: column;

    gap: 5px;

    font-size: 10px;
    font-weight: 500;

    line-height: 1.5;

    letter-spacing: 0.1em;

    color:
      rgba(0, 0, 0, 0.72);
  }

  .contact-section__brand {
    display: block;

    justify-self: center;

    width:
      clamp(140px, 12vw, 188px);
    height: auto;

    filter: invert(1);
  }

  .contact-section__back-top {
    display: inline-flex;
    align-items: center;

    justify-self: end;

    gap: 14px;

    padding-bottom: 6px;

    border-bottom:
      1px solid
      rgba(0, 0, 0, 0.3);

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(0, 0, 0, 0.72);

    transition:
      gap 200ms ease,
      border-color 200ms ease;
  }

  .contact-section__back-top:hover,
  .contact-section__back-top:focus-visible {
    gap: 22px;

    border-color: #080808;
  }

  @media (max-width: 1100px) {
    .contact-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .contact-section__inner {
      padding-left: var(--layout-inline);
      padding-right: var(--layout-inline);
    }

    .contact-section__main {
      gap: 60px;
    }
  }

  @media (min-width: 769px) and (max-height: 800px) {
    .contact-section__inner {
      padding-top: 40px;
      padding-bottom: 18px;
    }

    .contact-section__main {
      padding-top: 28px;
      padding-bottom: 28px;
    }

    .contact-section__title {
      font-size:
        clamp(46px, 6.2vw, 86px);
    }

    .contact-card {
      min-height: 112px;

      padding-top: 16px;
      padding-bottom: 14px;
    }

    .contact-section__whatsapp {
      padding:
        16px
        18px;
    }
  }

  @media (max-width: 768px) {
    .contact-section {
      min-height: 680px;

      border-radius:
        22px 22px 0 0;

      transform:
        perspective(1000px)
        translateY(
          calc(
            (1 - var(--transition-progress)) *
            55px
          )
        )
        translateZ(
          calc(
            (1 - var(--transition-progress)) *
            55px
          )
        )
        rotateX(
          calc(
            (1 - var(--transition-progress)) *
            -2deg
          )
        );
    }

    .contact-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .contact-section__inner {
      min-height: 680px;

      padding:
        48px
        var(--layout-inline)
        22px;
    }

    .contact-section__main {
      display: block;

      margin-top: 0;

      padding:
        52px 0
        30px;
    }

    .contact-section__title {
      font-size:
        clamp(44px, 13vw, 72px);
    }

    .contact-section__side {
      gap: 18px;

      margin-top: 30px;
    }

    .contact-section__copy {
      max-width: 330px;

      font-size: 12px;
    }

    .contact-section__whatsapp {
      max-width: 420px;

      padding:
        16px
        17px;

      font-size: 16px;
    }

    .contact-section__contacts {
      grid-template-columns:
        1fr 1fr;
    }

    .contact-card {
      min-height: 100px;

      padding:
        14px;

      border-bottom:
        1px solid
        rgba(0, 0, 0, 0.14);
    }

    .contact-card:nth-child(2n) {
      border-right: 0;
    }

    .contact-card:nth-last-child(-n + 2) {
      border-bottom: 0;
    }

    .contact-card__value {
      font-size: 16px;
    }

    .contact-section__footer {
      grid-template-columns:
        1fr auto;

      gap:
        12px 20px;
    }

    .contact-section__brand {
      grid-column: 1 / -1;
      grid-row: 1;

      justify-self: start;

      width: 126px;
    }

    .contact-section__legal {
      grid-column: 1;
      grid-row: 2;
    }

    .contact-section__back-top {
      grid-column: 2;
      grid-row: 2;
    }
  }

  @media (max-width: 480px) {
    .contact-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .contact-section__inner {
      padding:
        42px
        var(--layout-inline)
        18px;
    }

    .contact-section__status span:last-child {
      display: none;
    }

    .contact-section__main {
      padding-top: 40px;
      padding-bottom: 24px;
    }

    .contact-section__title {
      font-size:
        clamp(40px, 12.5vw, 58px);
    }

    .contact-section__side {
      margin-top: 24px;
    }

    .contact-card {
      min-height: 90px;

      padding:
        12px;
    }

    .contact-card__value {
      font-size: 14px;
    }

    .contact-card__sub {
      font-size: 10px;
    }

    .contact-section__legal {
      font-size: 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .contact-section {
      transform: none;
    }

    .contact-section__whatsapp,
    a.contact-card,
    .contact-section__back-top {
      transition: none;
    }
  }
`;

export default function ContactSection() {
  return (
    <>
      <section
        id="contatti"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <div
          className="contact-section__grid"
          aria-hidden="true"
        />

        <div className="contact-section__inner">
          <div className="contact-section__top">
            <div className="contact-section__section-id">
              <span>08</span>
              <span>CONTATTI</span>
            </div>

            <div className="contact-section__status">
              <span className="contact-section__status-dot" />
              <span>ACCESSO AUTORIMESSA H24</span>
            </div>
          </div>

          <div className="contact-section__main">
            <div>
              <p className="contact-section__eyebrow">
                PARCHEGGIO · TORINO
              </p>

              <h2
                id="contact-title"
                className="contact-section__title"
              >
                IL POSTO
                <span>È QUI.</span>
              </h2>
            </div>

            <div className="contact-section__side">
              <p className="contact-section__copy">
                Per disponibilità, tariffe e
                prenotazioni scrivici direttamente
                su <strong>WhatsApp</strong>.
              </p>

              <a
                href={WHATSAPP_URL}
                className="contact-section__whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contatta Autorimessa Da Taibi su WhatsApp"
              >
                <span>SCRIVICI SU WHATSAPP</span>

                <span
                  className="contact-section__whatsapp-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className="contact-section__contacts">
            <a
              href={PHONE_URL}
              className="contact-card"
              aria-label="Chiama Autorimessa Da Taibi"
            >
              <span className="contact-card__label">
                TELEFONO
              </span>

              <span className="contact-card__content">
                <strong className="contact-card__value">
                  +39 328 169 3326
                </strong>

                <span className="contact-card__sub">
                  Tocca per chiamare
                </span>
              </span>
            </a>

            <a
              href={EMAIL_URL}
              className="contact-card"
              aria-label="Invia una email ad Autorimessa Da Taibi"
            >
              <span className="contact-card__label">
                EMAIL
              </span>

              <span className="contact-card__content">
                <strong className="contact-card__value">
                  Autorimessadataibi
                  <br />
                  @gmail.com
                </strong>

                <span className="contact-card__sub">
                  Informazioni e richieste
                </span>
              </span>
            </a>

            <a
              href={GOOGLE_MAPS_URL}
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apri Autorimessa Da Taibi su Google Maps"
            >
              <span className="contact-card__label">
                AUTORIMESSA
              </span>

              <span className="contact-card__content">
                <strong className="contact-card__value">
                  VIA BREGLIO 111
                </strong>

                <span className="contact-card__sub">
                  10147 Torino TO · Apri Maps
                </span>
              </span>
            </a>

            <div className="contact-card">
              <span className="contact-card__label">
                PERSONALE
              </span>

              <span className="contact-card__content">
                <strong className="contact-card__value">
                  LUN — SAB
                  <br />
                  08 — 18
                </strong>

                <span className="contact-card__sub">
                  Domenica 08 — 01
                </span>
              </span>
            </div>
          </div>

          <footer className="contact-section__footer">
            <div className="contact-section__legal">
              <span>
                TAIBI IBRAHIM · P.IVA 13003010017
              </span>

              <span>
                REA TO-1338704
              </span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="contact-section__brand"
              src={BRAND_LOGO_URL}
              alt="Autorimessa Da Taibi"
              width="720"
              height="208"
              loading="lazy"
              decoding="async"
            />

            <a
              href="#top"
              className="contact-section__back-top"
            >
              <span>TORNA SU</span>
              <span aria-hidden="true">↑</span>
            </a>
          </footer>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: contactStyles,
        }}
      />
    </>
  );
}
