'use client';

import { useEffect, useRef } from 'react';

const servicesStyles = `
  .services-section {
    --transition-progress: 0;
    --out-progress: 0;

    position: sticky;
    top: 0;
    z-index: 10;

    width: 100%;
    height: 100svh;
    min-height: 620px;

    background: #e5e2da;
    color: #080808;

    border-radius: 30px 30px 0 0;

    box-shadow:
      0 -40px 120px rgba(0, 0, 0, 0.68);

    overflow: hidden;

    transform-origin: 50% 15%;

    transform:
      perspective(1400px)
      translateY(
        calc(
          (1 - var(--transition-progress)) * 80px +
          var(--out-progress) * -7vh
        )
      )
      translateZ(
        calc(
          (1 - var(--transition-progress)) * 90px +
          var(--out-progress) * -240px
        )
      )
      rotateX(
        calc(
          (1 - var(--transition-progress)) * -2.5deg +
          var(--out-progress) * 4deg
        )
      )
      scale(
        calc(
          1 -
          var(--out-progress) * 0.075
        )
      );

    filter:
      brightness(
        calc(
          1 -
          var(--out-progress) * 0.48
        )
      );

    will-change: transform;

    backface-visibility: hidden;
  }

  .services-section::before {
    content: '';

    position: absolute;
    top: 0;
    left: var(--layout-inline);
    right: var(--layout-inline);

    height: 1px;

    background:
      rgba(0, 0, 0, 0.16);
  }

  .services-section__inner {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding:
      clamp(46px, 5vw, 72px)
      var(--layout-inline)
      22px;
  }

  .services-section__top {
    display: flex;
    align-items: center;

    gap: 16px;
  }

  .services-section__index {
    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.14em;

    color:
      rgba(0, 0, 0, 0.35);
  }

  .services-section__label {
    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.18em;

    color:
      rgba(0, 0, 0, 0.72);
  }

  .services-section__location {
    margin-left: auto;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(0, 0, 0, 0.35);
  }

  .services-section__heading {
    display: grid;

    grid-template-columns:
      minmax(0, 1.5fr)
      minmax(250px, 0.5fr);

    align-items: end;

    gap:
      clamp(40px, 6vw, 100px);

    margin-top: auto;

    padding:
      clamp(30px, 4vh, 52px)
      0
      clamp(24px, 3.5vh, 38px);
  }

  .services-section__title {
    display: flex;
    flex-direction: column;

    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(50px, 6.8vw, 108px);

    font-weight: 400;

    line-height: 0.82;

    letter-spacing: -0.07em;

    text-transform: uppercase;
  }

  .services-section__title span {
    color: transparent;

    -webkit-text-stroke:
      1.5px
      rgba(8, 8, 8, 0.78);
  }

  .services-section__lead {
    max-width: 380px;

    margin: 0 0 3px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size:
      clamp(
        17px,
        1.3vw,
        20px
      );

    font-weight: 500;

    line-height: 1.38;

    letter-spacing: -0.018em;

    color:
      rgba(0, 0, 0, 0.68);
  }

  .services-section__list {
    width: 100%;

    border-top:
      1px solid
      rgba(0, 0, 0, 0.18);
  }

  .service-row {
    display: grid;

    grid-template-columns:
      60px
      minmax(180px, 0.65fr)
      minmax(260px, 1fr)
      34px;

    align-items: center;

    gap: 20px;

    min-height: 82px;

    border-bottom:
      1px solid
      rgba(0, 0, 0, 0.18);

    transition:
      padding 250ms ease,
      background 250ms ease;
  }

  .service-row:hover {
    padding-left: 16px;
    padding-right: 16px;

    background:
      rgba(0, 0, 0, 0.045);
  }

  .service-row__index {
    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(0, 0, 0, 0.34);
  }

  .service-row h3 {
    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(20px, 2.1vw, 32px);

    font-weight: 400;

    letter-spacing: -0.045em;

    text-transform: uppercase;
  }

  .service-row p {
    max-width: 480px;

    margin: 0;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size:
      clamp(
        14px,
        1vw,
        16px
      );

    font-weight: 500;

    line-height: 1.38;

    letter-spacing: -0.012em;

    color:
      rgba(0, 0, 0, 0.58);
  }

  .service-row__arrow {
    justify-self: end;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 17px;

    transition:
      transform 200ms ease;
  }

  .service-row:hover
  .service-row__arrow {
    transform:
      translate(4px, 4px);
  }

  .services-section__bottom {
    display: grid;

    grid-template-columns:
      1fr
      1fr
      1fr;

    align-items: end;

    padding-top: 16px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(0, 0, 0, 0.38);
  }

  .services-section__bottom-center {
    justify-self: center;
  }

  .services-section__bottom a {
    display: inline-flex;
    align-items: center;

    justify-self: end;

    gap: 14px;

    padding-bottom: 5px;

    border-bottom:
      1px solid
      rgba(0, 0, 0, 0.32);

    color:
      rgba(0, 0, 0, 0.78);

    transition:
      gap 200ms ease,
      border-color 200ms ease;
  }

  .services-section__bottom a:hover,
  .services-section__bottom a:focus-visible {
    gap: 21px;

    border-color:
      #080808;
  }

  @media (max-width: 1100px) {
    .services-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .services-section__inner {
      padding-left: var(--layout-inline);
      padding-right: var(--layout-inline);
    }
  }

  @media (min-width: 769px) and (max-height: 800px) {
    .services-section__inner {
      padding-top: 40px;
      padding-bottom: 18px;
    }

    .services-section__heading {
      padding-top: 24px;
      padding-bottom: 22px;
    }

    .services-section__title {
      font-size:
        clamp(46px, 5.8vw, 82px);
    }

    .service-row {
      min-height: 68px;
    }
  }

  @media (max-width: 768px) {
    .services-section {
      min-height: 640px;

      border-radius:
        22px 22px 0 0;

      transform:
        perspective(1000px)
        translateY(
          calc(
            (1 - var(--transition-progress)) * 55px +
            var(--out-progress) * -5vh
          )
        )
        translateZ(
          calc(
            (1 - var(--transition-progress)) * 55px +
            var(--out-progress) * -140px
          )
        )
        rotateX(
          calc(
            (1 - var(--transition-progress)) * -2deg +
            var(--out-progress) * 2.5deg
          )
        )
        scale(
          calc(
            1 -
            var(--out-progress) * 0.055
          )
        );
    }

    .services-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .services-section__inner {
      padding:
        48px
        var(--layout-inline)
        22px;
    }

    .services-section__location {
      display: none;
    }

    .services-section__heading {
      display: block;

      margin-top: 0;

      padding:
        48px
        0
        30px;
    }

    .services-section__title {
      font-size:
        clamp(42px, 12vw, 68px);
    }

    .services-section__lead {
      max-width: 350px;

      margin-top: 24px;

      font-size: 17px;

      line-height: 1.38;
    }

    .service-row {
      grid-template-columns:
        32px
        minmax(0, 1fr)
        26px;

      gap: 12px;

      min-height: 78px;
    }

    .service-row p {
      display: none;
    }

    .service-row:hover {
      padding-left: 0;
      padding-right: 0;

      background: transparent;
    }

    .services-section__bottom {
      grid-template-columns:
        1fr auto;

      margin-top: auto;

      padding-top: 18px;
    }

    .services-section__bottom-center {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .services-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .services-section__inner {
      padding:
        42px
        var(--layout-inline)
        18px;
    }

    .services-section__heading {
      padding:
        40px
        0
        25px;
    }

    .services-section__title {
      font-size:
        clamp(39px, 12vw, 58px);
    }

    .services-section__lead {
      font-size: 16px;
    }

    .service-row {
      min-height: 72px;
    }
  }

  @media (max-width: 768px) and (max-height: 700px) {
    .services-section__inner {
      padding-top: 38px;
      padding-bottom: 16px;
    }

    .services-section__heading {
      padding: 28px 0 18px;
    }

    .services-section__lead {
      margin-top: 14px;
    }

    .service-row {
      min-height: 64px;
    }

    .services-section__bottom {
      padding-top: 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .services-section {
      transform: none;
      filter: none;
    }

    .service-row,
    .service-row__arrow,
    .services-section__bottom a {
      transition: none;
    }
  }
`;

export default function ServicesSection() {
  const servicesRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const services =
      servicesRef.current;

    const security =
      document.querySelector<HTMLElement>(
        '#sicurezza'
      );

    if (!services || !security) return;

    let frame = 0;

    const clamp = (
      value: number,
      min = 0,
      max = 1
    ) =>
      Math.min(
        Math.max(value, min),
        max
      );

    const getDocumentTop = (
      element: HTMLElement
    ) => {
      let top = 0;
      let current:
        HTMLElement | null = element;

      while (current) {
        top += current.offsetTop;
        current =
          current.offsetParent as HTMLElement | null;
      }

      return top;
    };

    const updateAnimation = () => {
      const viewportHeight =
        window.innerHeight;

      const securityDocumentTop =
        getDocumentTop(security);

      const distanceIntoTransition =
        window.scrollY -
        (
          securityDocumentTop -
          viewportHeight
        );

      const progress = clamp(
        distanceIntoTransition /
          viewportHeight
      );

      services.style.setProperty(
        '--out-progress',
        progress.toString()
      );

      security.style.setProperty(
        '--transition-progress',
        progress.toString()
      );
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);

      frame =
        requestAnimationFrame(
          updateAnimation
        );
    };

    updateAnimation();

    window.addEventListener(
      'scroll',
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      requestUpdate
    );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        'scroll',
        requestUpdate
      );

      window.removeEventListener(
        'resize',
        requestUpdate
      );
    };
  }, []);

  return (
    <>
      <section
        ref={servicesRef}
        id="servizi"
        className="services-section"
        aria-labelledby="services-title"
      >
        <div className="services-section__inner">
          <div className="services-section__top">
            <span className="services-section__index">
              02
            </span>

            <span className="services-section__label">
              SERVIZI
            </span>

            <span className="services-section__location">
              TORINO · VIA BREGLIO 111
            </span>
          </div>

          <div className="services-section__heading">
            <h2
              id="services-title"
              className="services-section__title"
            >
              ENTRA.
              <span>PARCHEGGIA.</span>
              RIPARTI.
            </h2>

            <p className="services-section__lead">
              Soluzioni semplici per chi cerca
              un posto per la propria auto o moto
              a Torino.
            </p>
          </div>

          <div className="services-section__list">
            <article className="service-row">
              <span className="service-row__index">
                01
              </span>

              <h3>AUTO</h3>

              <p>
                Uno spazio dedicato alla tua auto,
                pensato per rendere la sosta
                quotidiana più semplice.
              </p>

              <span
                className="service-row__arrow"
                aria-hidden="true"
              >
                ↘
              </span>
            </article>

            <article className="service-row">
              <span className="service-row__index">
                02
              </span>

              <h3>MOTO</h3>

              <p>
                Una soluzione pratica anche per
                chi si muove ogni giorno su due
                ruote.
              </p>

              <span
                className="service-row__arrow"
                aria-hidden="true"
              >
                ↘
              </span>
            </article>

            <article className="service-row">
              <span className="service-row__index">
                03
              </span>

              <h3>FLESSIBILITÀ</h3>

              <p>
                Soluzioni di parcheggio pensate
                per esigenze e necessità
                differenti.
              </p>

              <span
                className="service-row__arrow"
                aria-hidden="true"
              >
                ↘
              </span>
            </article>
          </div>

          <div className="services-section__bottom">
            <span>
              DA TAIBI
            </span>

            <span className="services-section__bottom-center">
              AUTO / MOTO
            </span>

            <a href="#sicurezza">
              <span>
                SICUREZZA
              </span>

              <span aria-hidden="true">
                ↘
              </span>
            </a>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: servicesStyles,
        }}
      />
    </>
  );
}
