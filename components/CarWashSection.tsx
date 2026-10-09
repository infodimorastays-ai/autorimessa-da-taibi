'use client';

import { useEffect, useRef } from 'react';
import { subscribeScrollFrame } from '../lib/scrollFrame';

const carWashStyles = `
  .carwash-section {
    --transition-progress: 0;
    --out-progress: 0;

    position: sticky;
    top: 0;
    z-index: 25;

    width: 100%;
    height: var(--viewport-height, 100svh);
    min-height: 620px;

    overflow: hidden;

    background:
      radial-gradient(
        circle at 78% 32%,
        rgba(90, 115, 125, 0.13),
        transparent 32%
      ),
      #080a0a;

    color: #f4f3ef;

    border-radius:
      30px 30px 0 0;

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

  .carwash-section::before {
    content: '';

    position: absolute;

    top: 0;
    left: var(--layout-inline);
    right: var(--layout-inline);

    height: 1px;

    background:
      rgba(255, 255, 255, 0.13);
  }

  .carwash-section__texture {
    position: absolute;
    inset: 0;

    pointer-events: none;

    opacity: 0.28;

    background:
      repeating-linear-gradient(
        115deg,
        transparent 0,
        transparent 100px,
        rgba(255, 255, 255, 0.018) 101px,
        transparent 102px
      );
  }

  .carwash-section__inner {
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding:
      clamp(46px, 5vw, 72px)
      var(--layout-inline)
      24px;
  }

  .carwash-section__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .carwash-section__section-id {
    display: flex;
    align-items: center;

    gap: 16px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.17em;
  }

  .carwash-section__section-id span:first-child {
    color:
      rgba(255, 255, 255, 0.34);
  }

  .carwash-section__section-id span:last-child {
    color:
      rgba(255, 255, 255, 0.74);
  }

  .carwash-section__status {
    display: flex;
    align-items: center;

    gap: 9px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(255, 255, 255, 0.68);
  }

  .carwash-section__status-dot {
    width: 5px;
    height: 5px;

    border-radius: 50%;

    background: #f4f3ef;
  }

  .carwash-section__heading {
    display: grid;

    grid-template-columns:
      minmax(0, 1.4fr)
      minmax(260px, 0.6fr);

    align-items: end;

    gap:
      clamp(50px, 7vw, 120px);

    margin-top: auto;

    padding:
      clamp(30px, 4.5vh, 54px)
      0
      clamp(26px, 3.5vh, 38px);
  }

  .carwash-section__title {
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

  .carwash-section__title span {
    color: transparent;

    -webkit-text-stroke:
      1.3px
      rgba(255, 255, 255, 0.75);
  }

  .carwash-section__intro {
    max-width: 360px;

    margin: 0;

    font-size: 13px;
    line-height: 1.6;

    color:
      rgba(255, 255, 255, 0.56);
  }

  .carwash-section__intro strong {
    font-weight: 600;

    color:
      rgba(255, 255, 255, 0.9);
  }

  .carwash-section__prices {
    display: grid;

    grid-template-columns:
      repeat(5, minmax(0, 1fr));

    border-top:
      1px solid
      rgba(255, 255, 255, 0.14);

    border-bottom:
      1px solid
      rgba(255, 255, 255, 0.14);
  }

  .wash-price {
    position: relative;

    display: flex;
    flex-direction: column;

    min-height: 170px;

    padding:
      20px
      18px
      18px;

    border-right:
      1px solid
      rgba(255, 255, 255, 0.14);

    transition:
      background 220ms ease,
      padding 220ms ease;
  }

  .wash-price:last-child {
    border-right: 0;
  }

  .wash-price:hover {
    padding-top: 16px;

    background:
      rgba(255, 255, 255, 0.035);
  }

  .wash-price__index {
    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(255, 255, 255, 0.62);
  }

  .wash-price__vehicle {
    margin:
      24px 0 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(16px, 1.5vw, 23px);

    font-weight: 400;

    line-height: 0.95;

    letter-spacing: -0.045em;

    text-transform: uppercase;
  }

  .wash-price__amount {
    margin-top: auto;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(28px, 2.6vw, 42px);

    font-weight: 400;

    line-height: 0.9;

    letter-spacing: -0.06em;
  }

  .carwash-section__bottom {
    display: grid;

    grid-template-columns:
      1fr 1fr 1fr;

    align-items: end;

    margin-top: auto;

    padding-top: 18px;
  }

  .carwash-section__note {
    margin: 0;

    font-size: 10px;
    font-weight: 600;

    line-height: 1.45;

    letter-spacing: 0.14em;

    color:
      rgba(255, 255, 255, 0.66);
  }

  .carwash-section__bottom-center {
    justify-self: center;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(255, 255, 255, 0.62);
  }

  .carwash-section__cta {
    display: inline-flex;
    align-items: center;

    justify-self: end;

    gap: 14px;

    padding-bottom: 6px;

    border-bottom:
      1px solid
      rgba(255, 255, 255, 0.3);

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(255, 255, 255, 0.76);

    transition:
      gap 200ms ease,
      border-color 200ms ease;
  }

  .carwash-section__cta:hover,
  .carwash-section__cta:focus-visible {
    gap: 22px;

    border-color: #ffffff;
  }

  @media (max-width: 1100px) {
    .carwash-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .carwash-section__inner {
      padding-left: var(--layout-inline);
      padding-right: var(--layout-inline);
    }
  }

  @media (min-width: 769px) and (max-height: 800px) {
    .carwash-section__inner {
      padding-top: 40px;
      padding-bottom: 18px;
    }

    .carwash-section__heading {
      padding-top: 24px;
      padding-bottom: 22px;
    }

    .carwash-section__title {
      font-size:
        clamp(46px, 6vw, 84px);
    }

    .wash-price {
      min-height: 135px;

      padding-top: 16px;
      padding-bottom: 14px;
    }

    .wash-price__vehicle {
      margin-top: 16px;
    }

    .wash-price__amount {
      font-size:
        clamp(26px, 2.2vw, 34px);
    }
  }

  @media (max-width: 768px) {
    .carwash-section {
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

    .carwash-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .carwash-section__inner {
      padding:
        48px
        var(--layout-inline)
        22px;
    }

    .carwash-section__status {
      font-size: 9px;
    }

    .carwash-section__heading {
      display: block;

      margin-top: 0;

      padding:
        50px 0
        28px;
    }

    .carwash-section__title {
      font-size:
        clamp(42px, 12vw, 68px);
    }

    .carwash-section__intro {
      max-width: 330px;

      margin-top: 22px;

      font-size: 12px;
    }

    .carwash-section__prices {
      grid-template-columns:
        1fr 1fr;
    }

    .wash-price {
      min-height: 105px;

      padding:
        13px
        14px;

      border-bottom:
        1px solid
        rgba(255, 255, 255, 0.12);
    }

    .wash-price:nth-child(2n) {
      border-right: 0;
    }

    .wash-price:last-child {
      grid-column:
        1 / -1;

      border-bottom: 0;
    }

    .wash-price:hover {
      padding-top: 13px;

      background: transparent;
    }

    .wash-price__vehicle {
      margin-top: 10px;

      font-size: 15px;
    }

    .wash-price__amount {
      font-size: 25px;
    }

    .carwash-section__bottom {
      grid-template-columns:
        1fr auto;

      padding-top: 15px;
    }

    .carwash-section__bottom-center {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .carwash-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .carwash-section__inner {
      padding:
        42px
        var(--layout-inline)
        18px;
    }

    .carwash-section__status span:last-child {
      display: none;
    }

    .carwash-section__heading {
      padding-top: 36px;
      padding-bottom: 20px;
    }

    .carwash-section__title {
      font-size:
        clamp(39px, 12vw, 58px);
    }

    .carwash-section__intro {
      margin-top: 18px;
    }

    .wash-price {
      min-height: 94px;
    }
  }

  @media (max-width: 768px) and (max-height: 700px) {
    .carwash-section__inner {
      padding-top: 38px;
      padding-bottom: 16px;
    }

    .carwash-section__heading {
      padding: 26px 0 14px;
    }

    .carwash-section__intro {
      margin-top: 12px;
    }

    .wash-price,
    .wash-price:hover {
      min-height: 86px;

      padding-top: 10px;
      padding-bottom: 10px;
    }

    .wash-price__vehicle {
      margin-top: 6px;
    }

    .carwash-section__bottom {
      padding-top: 8px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .carwash-section {
      transform: none;
      filter: none;
    }

    .wash-price,
    .carwash-section__cta {
      transition: none;
    }
  }
`;

export default function CarWashSection() {
  const carWashRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const carWash =
      carWashRef.current;

    const location =
      document.querySelector<HTMLElement>(
        '#dove-siamo'
      );

    if (!carWash || !location) return;

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

    let locationDocumentTop =
      getDocumentTop(location);

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
        locationDocumentTop =
          getDocumentTop(location);
      }

      const distanceIntoTransition =
        scrollY -
        (
          locationDocumentTop -
          viewportHeight
        );

      const progress = clamp(
        distanceIntoTransition /
          viewportHeight
      );

      carWash.style.setProperty(
        '--out-progress',
        progress.toString()
      );

      location.style.setProperty(
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
        ref={carWashRef}
        id="autolavaggio"
        className="carwash-section"
        aria-labelledby="carwash-title"
      >
        <div
          className="carwash-section__texture"
          aria-hidden="true"
        />

        <div className="carwash-section__inner">
          <div className="carwash-section__top">
            <div className="carwash-section__section-id">
              <span>05</span>
              <span>AUTOLAVAGGIO</span>
            </div>

            <div className="carwash-section__status">
              <span className="carwash-section__status-dot" />
              <span>SERVIZIO SU RICHIESTA</span>
            </div>
          </div>

          <div className="carwash-section__heading">
            <h2
              id="carwash-title"
              className="carwash-section__title"
            >
              ENTRA SPORCA.
              <span>ESCE PULITA.</span>
            </h2>

            <p className="carwash-section__intro">
              Il servizio di autolavaggio
              <strong>
                {' '}non è incluso nel parcheggio
              </strong>{' '}
              ed è disponibile su richiesta.
            </p>
          </div>

          <div className="carwash-section__prices">
            <article className="wash-price">
              <span className="wash-price__index">
                01
              </span>

              <h3 className="wash-price__vehicle">
                MOTO
              </h3>

              <span className="wash-price__amount">
                €5
              </span>
            </article>

            <article className="wash-price">
              <span className="wash-price__index">
                02
              </span>

              <h3 className="wash-price__vehicle">
                AUTO
                <br />
                PICCOLA
              </h3>

              <span className="wash-price__amount">
                €10
              </span>
            </article>

            <article className="wash-price">
              <span className="wash-price__index">
                03
              </span>

              <h3 className="wash-price__vehicle">
                AUTO
                <br />
                MEDIA
              </h3>

              <span className="wash-price__amount">
                €12
              </span>
            </article>

            <article className="wash-price">
              <span className="wash-price__index">
                04
              </span>

              <h3 className="wash-price__vehicle">
                AUTO
                <br />
                GRANDE
              </h3>

              <span className="wash-price__amount">
                €15
              </span>
            </article>

            <article className="wash-price">
              <span className="wash-price__index">
                05
              </span>

              <h3 className="wash-price__vehicle">
                FURGONI /
                <br />
                CAMPER
              </h3>

              <span className="wash-price__amount">
                €25
              </span>
            </article>
          </div>

          <div className="carwash-section__bottom">
            <p className="carwash-section__note">
              SERVIZIO EXTRA
              <br />
              SU RICHIESTA
            </p>

            <span className="carwash-section__bottom-center">
              DA TAIBI · TORINO
            </span>

            <a
              className="carwash-section__cta"
              href="#dove-siamo"
            >
              <span>DOVE SIAMO</span>
              <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: carWashStyles,
        }}
      />
    </>
  );
}
