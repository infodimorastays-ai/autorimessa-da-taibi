'use client';

import { useEffect, useRef } from 'react';
import { subscribeScrollFrame } from '../lib/scrollFrame';

const ratesStyles = `
  .rates-section {
    --transition-progress: 0;
    --out-progress: 0;

    position: sticky;
    top: 0;
    z-index: 20;

    width: 100%;
    height: var(--viewport-height, 100svh);
    min-height: 620px;

    overflow: hidden;

    background: #f1efe9;
    color: #090909;

    border-radius: 30px 30px 0 0;

    box-shadow:
      0 -40px 120px
      rgba(0, 0, 0, 0.7);

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

  .rates-section::before {
    content: '';

    position: absolute;

    top: 0;
    left: var(--layout-inline);
    right: var(--layout-inline);

    height: 1px;

    background:
      rgba(0, 0, 0, 0.16);
  }

  .rates-section__inner {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding:
      clamp(46px, 5vw, 72px)
      var(--layout-inline)
      24px;
  }

  .rates-section__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rates-section__section-id {
    display: flex;
    align-items: center;

    gap: 16px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.17em;
  }

  .rates-section__section-id span:first-child {
    color:
      rgba(0, 0, 0, 0.35);
  }

  .rates-section__section-id span:last-child {
    color:
      rgba(0, 0, 0, 0.72);
  }

  .rates-section__top-note {
    display: flex;
    align-items: center;

    gap: 14px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(0, 0, 0, 0.68);
  }

  .rates-section__top-dot {
    width: 5px;
    height: 5px;

    border-radius: 50%;

    background: #090909;
  }

  .rates-section__heading {
    display: grid;

    grid-template-columns:
      minmax(0, 1.4fr)
      minmax(260px, 0.6fr);

    align-items: end;

    gap:
      clamp(50px, 7vw, 120px);

    margin-top: auto;

    padding:
      clamp(34px, 5vh, 60px)
      0
      clamp(30px, 4vh, 44px);
  }

  .rates-section__title {
    display: flex;
    flex-direction: column;

    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(52px, 7vw, 112px);

    font-weight: 400;

    line-height: 0.82;

    letter-spacing: -0.07em;

    text-transform: uppercase;
  }

  .rates-section__title span {
    color: transparent;

    -webkit-text-stroke:
      1.4px
      rgba(9, 9, 9, 0.78);
  }

  .rates-section__intro {
    max-width: 360px;

    margin: 0;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 13px;
    line-height: 1.6;

    color:
      rgba(0, 0, 0, 0.58);
  }

  .rates-section__intro strong {
    font-weight: 600;

    color:
      rgba(0, 0, 0, 0.88);
  }

  .rates-section__grid {
    display: grid;

    grid-template-columns:
      repeat(3, minmax(0, 1fr));

    border-top:
      1px solid
      rgba(0, 0, 0, 0.18);

    border-bottom:
      1px solid
      rgba(0, 0, 0, 0.18);
  }

  .rate-card {
    position: relative;

    display: flex;
    flex-direction: column;

    min-height: 220px;

    padding:
      24px
      26px
      22px;

    border-right:
      1px solid
      rgba(0, 0, 0, 0.18);

    transition:
      background 220ms ease,
      padding 220ms ease;
  }

  .rate-card:last-child {
    border-right: 0;
  }

  .rate-card:hover {
    background:
      rgba(0, 0, 0, 0.045);

    padding-top: 20px;
  }

  .rate-card:focus-visible {
    outline: 2px solid #090909;
    outline-offset: -2px;
  }

  .rate-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rate-card__index {
    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(0, 0, 0, 0.6);
  }

  .rate-card__type {
    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(0, 0, 0, 0.6);
  }

  .rate-card__title {
    margin:
      24px 0
      10px;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(22px, 2.2vw, 34px);

    font-weight: 400;

    line-height: 0.95;

    letter-spacing: -0.05em;

    text-transform: uppercase;
  }

  .rate-card__description {
    max-width: 300px;

    margin: 0;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 11px;
    line-height: 1.5;

    color:
      rgba(0, 0, 0, 0.52);
  }

  .rate-card__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 20px;

    margin-top: auto;

    padding-top: 20px;
  }

  .rate-card__price {
    display: flex;
    align-items: baseline;

    gap: 6px;
  }

  .rate-card__from {
    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 11px;
    font-weight: 600;

    letter-spacing: 0.14em;

    color:
      rgba(0, 0, 0, 0.72);
  }

  .rate-card__amount {
    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(30px, 3vw, 46px);

    font-weight: 400;

    line-height: 0.8;

    letter-spacing: -0.06em;
  }

  .rate-card__arrow {
    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;

    transition:
      transform 200ms ease;
  }

  .rate-card:hover
  .rate-card__arrow {
    transform:
      translate(4px, 4px);
  }

  .rates-section__bottom {
    display: grid;

    grid-template-columns:
      1fr 1fr 1fr;

    align-items: end;

    margin-top: auto;

    padding-top: 18px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(0, 0, 0, 0.64);
  }

  .rates-section__bottom-center {
    justify-self: center;
  }

  .rates-section__bottom a {
    display: inline-flex;
    align-items: center;

    justify-self: end;

    gap: 14px;

    padding-bottom: 6px;

    border-bottom:
      1px solid
      rgba(0, 0, 0, 0.32);

    color:
      rgba(0, 0, 0, 0.78);

    transition:
      gap 200ms ease,
      border-color 200ms ease;
  }

  .rates-section__bottom a:hover,
  .rates-section__bottom a:focus-visible {
    gap: 22px;

    border-color: #090909;
  }

  @media (max-width: 1100px) {
    .rates-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .rates-section__inner {
      padding-left: var(--layout-inline);
      padding-right: var(--layout-inline);
    }
  }

  @media (min-width: 769px) and (max-height: 800px) {
    .rates-section__inner {
      padding-top: 40px;
      padding-bottom: 18px;
    }

    .rates-section__heading {
      padding-top: 26px;
      padding-bottom: 24px;
    }

    .rates-section__title {
      font-size:
        clamp(46px, 6vw, 84px);
    }

    .rate-card {
      min-height: 175px;

      padding-top: 18px;
      padding-bottom: 16px;
    }

    .rate-card__title {
      margin:
        14px 0
        7px;
    }

    .rate-card__footer {
      padding-top: 12px;
    }

    .rate-card__amount {
      font-size:
        clamp(28px, 2.5vw, 38px);
    }
  }

  @media (max-width: 768px) {
    .rates-section {
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

    .rates-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .rates-section__inner {
      padding:
        48px
        var(--layout-inline)
        22px;
    }

    .rates-section__top-note {
      font-size: 9px;
    }

    .rates-section__heading {
      display: block;

      margin-top: 0;

      padding:
        45px 0
        26px;
    }

    .rates-section__title {
      font-size:
        clamp(42px, 12vw, 68px);
    }

    .rates-section__intro {
      max-width: 330px;

      margin-top: 22px;

      font-size: 12px;
    }

    .rates-section__grid {
      display: block;
    }

    .rate-card {
      min-height: auto;

      padding:
        15px 0;

      border-right: 0;

      border-bottom:
        1px solid
        rgba(0, 0, 0, 0.14);
    }

    .rate-card:last-child {
      border-bottom: 0;
    }

    .rate-card:hover {
      padding-top: 15px;

      background: transparent;
    }

    .rate-card__title {
      margin:
        9px 0
        6px;

      font-size: 21px;
    }

    .rate-card__description {
      display: none;
    }

    .rate-card__footer {
      margin-top: 8px;

      padding-top: 0;
    }

    .rate-card__amount {
      font-size: 30px;
    }

    .rates-section__bottom {
      grid-template-columns:
        1fr auto;

      padding-top: 15px;
    }

    .rates-section__bottom-center {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .rates-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .rates-section__inner {
      padding:
        42px
        var(--layout-inline)
        18px;
    }

    .rates-section__top-note {
      display: none;
    }

    .rates-section__heading {
      padding-top: 36px;
      padding-bottom: 20px;
    }

    .rates-section__title {
      font-size:
        clamp(39px, 12vw, 58px);
    }

    .rates-section__intro {
      margin-top: 18px;
    }

    .rate-card {
      padding:
        12px 0;
    }

    .rate-card:hover {
      padding-top: 12px;
    }

    .rate-card__title {
      margin:
        7px 0
        4px;

      font-size: 19px;
    }

    .rate-card__amount {
      font-size: 27px;
    }
  }

  @media (max-width: 768px) and (max-height: 700px) {
    .rates-section__inner {
      padding-top: 38px;
      padding-bottom: 16px;
    }

    .rates-section__heading {
      padding: 26px 0 14px;
    }

    .rates-section__intro {
      margin-top: 12px;
    }

    .rate-card,
    .rate-card:hover {
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .rate-card__title {
      margin-top: 5px;
      margin-bottom: 3px;
    }

    .rates-section__bottom {
      padding-top: 8px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .rates-section {
      transform: none;
      filter: none;
    }

    .rate-card,
    .rate-card__arrow,
    .rates-section__bottom a {
      transition: none;
    }
  }
`;

export default function RatesSection() {
  const ratesRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const rates =
      ratesRef.current;

    const carWash =
      document.querySelector<HTMLElement>(
        '#autolavaggio'
      );

    if (!rates || !carWash) return;

    const clamp = (
      value: number,
      min = 0,
      max = 1
    ) => Math.min(Math.max(value, min), max);

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

    let carWashDocumentTop =
      getDocumentTop(carWash);

    const updateAnimation = ({
      scrollY,
      viewportHeight,
      layoutChanged,
    }: {
      scrollY: number;
      viewportHeight: number;
      layoutChanged: boolean;
    }) => {
      if (layoutChanged) {
        carWashDocumentTop =
          getDocumentTop(carWash);
      }

      const distanceIntoTransition =
        scrollY -
        (
          carWashDocumentTop -
          viewportHeight
        );

      const progress = clamp(
        distanceIntoTransition /
          viewportHeight
      );

      rates.style.setProperty(
        '--out-progress',
        progress.toString()
      );

      carWash.style.setProperty(
        '--transition-progress',
        progress.toString()
      );
    };

    const unsubscribe =
      subscribeScrollFrame(
        updateAnimation
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <section
        ref={ratesRef}
        id="tariffe"
        className="rates-section"
        aria-labelledby="rates-title"
      >
        <div className="rates-section__inner">
          <div className="rates-section__top">
            <div className="rates-section__section-id">
              <span>04</span>
              <span>TARIFFE</span>
            </div>

            <div className="rates-section__top-note">
              <span className="rates-section__top-dot" />

              <span>
                SOSTA MINIMA 24 ORE
              </span>
            </div>
          </div>

          <div className="rates-section__heading">
            <h2
              id="rates-title"
              className="rates-section__title"
            >
              IL TUO MEZZO.
              <span>
                IL SUO POSTO.
              </span>
            </h2>

            <p className="rates-section__intro">
              Parcheggio custodito per auto,
              moto, SUV, furgoni e camper.
              Formule{' '}
              <strong>
                giornaliere, settimanali e mensili
              </strong>
              , con sosta minima di 24 ore.
            </p>
          </div>

          <div className="rates-section__grid">
            <a
              className="rate-card"
              href="#contatti"
              aria-label="Chiedi informazioni per il parcheggio moto, da €15"
            >
              <div className="rate-card__top">
                <span className="rate-card__index">
                  01
                </span>

                <span className="rate-card__type">
                  2 RUOTE
                </span>
              </div>

              <h3 className="rate-card__title">
                MOTO
              </h3>

              <p className="rate-card__description">
                Parcheggio custodito per moto
                con formule giornaliere,
                settimanali e mensili.
              </p>

              <div className="rate-card__footer">
                <div className="rate-card__price">
                  <span className="rate-card__from">
                    DA
                  </span>

                  <span className="rate-card__amount">
                    €15
                  </span>
                </div>

                <span
                  className="rate-card__arrow"
                  aria-hidden="true"
                >
                  CHIEDI INFO ↘
                </span>
              </div>
            </a>

            <a
              className="rate-card"
              href="#contatti"
              aria-label="Chiedi informazioni per il parcheggio auto, da €20"
            >
              <div className="rate-card__top">
                <span className="rate-card__index">
                  02
                </span>

                <span className="rate-card__type">
                  AUTO
                </span>
              </div>

              <h3 className="rate-card__title">
                AUTO
              </h3>

              <p className="rate-card__description">
                Parcheggio custodito per auto
                con accesso all&apos;autorimessa
                24 ore su 24.
              </p>

              <div className="rate-card__footer">
                <div className="rate-card__price">
                  <span className="rate-card__from">
                    DA
                  </span>

                  <span className="rate-card__amount">
                    €20
                  </span>
                </div>

                <span
                  className="rate-card__arrow"
                  aria-hidden="true"
                >
                  CHIEDI INFO ↘
                </span>
              </div>
            </a>

            <a
              className="rate-card"
              href="#contatti"
              aria-label="Chiedi informazioni per SUV, furgoni e camper, da €25"
            >
              <div className="rate-card__top">
                <span className="rate-card__index">
                  03
                </span>

                <span className="rate-card__type">
                  LARGE
                </span>
              </div>

              <h3 className="rate-card__title">
                SUV / FURGONI
                <br />
                / CAMPER
              </h3>

              <p className="rate-card__description">
                Spazi dedicati anche a mezzi
                di dimensioni maggiori.
                Contattaci per verificare
                compatibilità e disponibilità.
              </p>

              <div className="rate-card__footer">
                <div className="rate-card__price">
                  <span className="rate-card__from">
                    DA
                  </span>

                  <span className="rate-card__amount">
                    €25
                  </span>
                </div>

                <span
                  className="rate-card__arrow"
                  aria-hidden="true"
                >
                  CHIEDI INFO ↘
                </span>
              </div>
            </a>
          </div>

          <div className="rates-section__bottom">
            <span>
              MIN. 24H
            </span>

            <span className="rates-section__bottom-center">
              GIORNALIERO / SETTIMANALE / MENSILE
            </span>

            <a href="#autolavaggio">
              <span>
                AUTOLAVAGGIO
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
          __html: ratesStyles,
        }}
      />
    </>
  );
}
