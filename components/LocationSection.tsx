'use client';

import { useEffect, useRef } from 'react';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place//data=!4m2!3m1!1s0x47886d20eae2a6d9:0xef1441f915874180?sa=X&ved=1t:8290&ictx=111';

const locationStyles = `
  .location-section {
    --transition-progress: 0;
    --out-progress: 0;

    position: sticky;
    top: 0;
    z-index: 30;

    width: 100%;
    height: 100svh;
    min-height: 620px;

    overflow: hidden;

    background: #e4e1d9;
    color: #080808;

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

    will-change:
      transform,
      filter;

    backface-visibility: hidden;
  }

  .location-section::before {
    content: '';

    position: absolute;

    top: 0;
    left: 40px;
    right: 40px;

    height: 1px;

    background:
      rgba(0, 0, 0, 0.16);
  }

  .location-section__grid {
    position: absolute;
    inset: 0;

    pointer-events: none;

    opacity: 0.25;

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

  .location-section__inner {
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding:
      clamp(46px, 5vw, 72px)
      40px
      24px;
  }

  .location-section__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .location-section__section-id {
    display: flex;
    align-items: center;

    gap: 16px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.17em;
  }

  .location-section__section-id span:first-child {
    color:
      rgba(0, 0, 0, 0.34);
  }

  .location-section__section-id span:last-child {
    color:
      rgba(0, 0, 0, 0.72);
  }

  .location-section__availability {
    display: flex;
    align-items: center;

    gap: 9px;

    font-size: 8px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(0, 0, 0, 0.46);
  }

  .location-section__availability-dot {
    width: 5px;
    height: 5px;

    border-radius: 50%;

    background: #080808;
  }

  .location-section__main {
    display: grid;

    grid-template-columns:
      minmax(0, 1.4fr)
      minmax(290px, 0.6fr);

    align-items: end;

    gap:
      clamp(50px, 8vw, 140px);

    margin-top: auto;

    padding:
      clamp(45px, 7vh, 90px)
      0
      clamp(32px, 4.5vh, 52px);
  }

  .location-section__eyebrow {
    margin:
      0 0 18px;

    font-size: 8px;
    font-weight: 600;

    letter-spacing: 0.18em;

    color:
      rgba(0, 0, 0, 0.38);
  }

  .location-section__title {
    display: flex;
    flex-direction: column;

    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(54px, 7.8vw, 126px);

    font-weight: 400;

    line-height: 0.81;

    letter-spacing: -0.07em;

    text-transform: uppercase;
  }

  .location-section__title span {
    color: transparent;

    -webkit-text-stroke:
      1.4px
      rgba(8, 8, 8, 0.76);
  }

  .location-section__side {
    display: flex;
    flex-direction: column;

    gap: 28px;

    padding-bottom: 4px;
  }

  .location-section__address-label {
    display: block;

    margin-bottom: 10px;

    font-size: 8px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(0, 0, 0, 0.34);
  }

  .location-section__address {
    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(23px, 2.5vw, 38px);

    line-height: 0.95;

    letter-spacing: -0.05em;

    text-transform: uppercase;
  }

  .location-section__maps {
    display: inline-flex;
    align-items: center;

    align-self: flex-start;

    gap: 14px;

    padding-bottom: 7px;

    border-bottom:
      1px solid
      rgba(0, 0, 0, 0.35);

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.14em;

    color:
      rgba(0, 0, 0, 0.76);

    transition:
      gap 200ms ease,
      border-color 200ms ease;
  }

  .location-section__maps:hover,
  .location-section__maps:focus-visible {
    gap: 21px;

    border-color: #080808;
  }

  .location-section__details {
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

  .location-detail {
    display: flex;
    flex-direction: column;

    min-height: 125px;

    padding:
      18px
      20px;

    border-right:
      1px solid
      rgba(0, 0, 0, 0.17);
  }

  .location-detail:last-child {
    border-right: 0;
  }

  .location-detail__label {
    font-size: 7px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(0, 0, 0, 0.34);
  }

  .location-detail__value {
    margin-top: auto;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(18px, 1.8vw, 28px);

    font-weight: 400;

    line-height: 0.95;

    letter-spacing: -0.045em;

    text-transform: uppercase;
  }

  .location-detail__sub {
    margin-top: 7px;

    font-size: 8px;
    line-height: 1.4;

    letter-spacing: 0.05em;

    color:
      rgba(0, 0, 0, 0.44);
  }

  .location-section__bottom {
    display: grid;

    grid-template-columns:
      1fr 1fr 1fr;

    align-items: end;

    margin-top: auto;

    padding-top: 18px;

    font-size: 8px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(0, 0, 0, 0.38);
  }

  .location-section__bottom-center {
    justify-self: center;
  }

  .location-section__bottom a {
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

  .location-section__bottom a:hover,
  .location-section__bottom a:focus-visible {
    gap: 22px;

    border-color: #080808;
  }

  @media (max-width: 1100px) {
    .location-section::before {
      left: 28px;
      right: 28px;
    }

    .location-section__inner {
      padding-left: 28px;
      padding-right: 28px;
    }

    .location-section__main {
      gap: 60px;
    }
  }

  @media (min-width: 769px) and (max-height: 800px) {
    .location-section__inner {
      padding-top: 40px;
      padding-bottom: 18px;
    }

    .location-section__main {
      padding-top: 30px;
      padding-bottom: 28px;
    }

    .location-section__title {
      font-size:
        clamp(48px, 6.3vw, 88px);
    }

    .location-detail {
      min-height: 100px;
    }
  }

  @media (max-width: 768px) {
    .location-section {
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

    .location-section::before {
      left: 20px;
      right: 20px;
    }

    .location-section__inner {
      padding:
        48px
        20px
        22px;
    }

    .location-section__main {
      display: block;

      margin-top: 0;

      padding:
        55px 0
        32px;
    }

    .location-section__title {
      font-size:
        clamp(44px, 13vw, 72px);
    }

    .location-section__side {
      gap: 20px;

      margin-top: 36px;
    }

    .location-section__address {
      font-size: 24px;
    }

    .location-section__details {
      grid-template-columns:
        1fr 1fr;
    }

    .location-detail {
      min-height: 90px;

      padding:
        13px
        14px;

      border-bottom:
        1px solid
        rgba(0, 0, 0, 0.14);
    }

    .location-detail:nth-child(2n) {
      border-right: 0;
    }

    .location-detail:nth-last-child(-n + 2) {
      border-bottom: 0;
    }

    .location-detail__value {
      font-size: 18px;
    }

    .location-section__bottom {
      grid-template-columns:
        1fr auto;

      padding-top: 15px;
    }

    .location-section__bottom-center {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .location-section::before {
      left: 17px;
      right: 17px;
    }

    .location-section__inner {
      padding:
        42px
        17px
        18px;
    }

    .location-section__availability span:last-child {
      display: none;
    }

    .location-section__main {
      padding-top: 42px;
      padding-bottom: 24px;
    }

    .location-section__title {
      font-size:
        clamp(40px, 12.5vw, 58px);
    }

    .location-section__side {
      margin-top: 28px;
    }

    .location-detail {
      min-height: 82px;
    }
  }

  @media (max-width: 768px) and (max-height: 700px) {
    .location-section__inner {
      padding-top: 38px;
      padding-bottom: 16px;
    }

    .location-section__main {
      padding: 26px 0 16px;
    }

    .location-section__side {
      gap: 14px;

      margin-top: 18px;
    }

    .location-detail {
      min-height: 76px;

      padding-top: 10px;
      padding-bottom: 10px;
    }

    .location-section__bottom {
      padding-top: 8px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .location-section {
      transform: none;
      filter: none;
    }

    .location-section__maps,
    .location-section__bottom a {
      transition: none;
    }
  }
`;

export default function LocationSection() {
  const locationRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const location =
      locationRef.current;

    const reviews =
      document.querySelector<HTMLElement>(
        '#recensioni'
      );

    if (!location || !reviews) return;

    let frame = 0;

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

    const updateAnimation = () => {
      const viewportHeight =
        window.innerHeight;

      const reviewsDocumentTop =
        getDocumentTop(reviews);

      const distanceIntoTransition =
        window.scrollY -
        (
          reviewsDocumentTop -
          viewportHeight
        );

      const progress = clamp(
        distanceIntoTransition /
          viewportHeight
      );

      location.style.setProperty(
        '--out-progress',
        progress.toString()
      );

      reviews.style.setProperty(
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
        ref={locationRef}
        id="dove-siamo"
        className="location-section"
        aria-labelledby="location-title"
      >
        <div
          className="location-section__grid"
          aria-hidden="true"
        />

        <div className="location-section__inner">
          <div className="location-section__top">
            <div className="location-section__section-id">
              <span>06</span>
              <span>DOVE SIAMO</span>
            </div>

            <div className="location-section__availability">
              <span className="location-section__availability-dot" />
              <span>ACCESSO 24 / 24</span>
            </div>
          </div>

          <div className="location-section__main">
            <div>
              <p className="location-section__eyebrow">
                AUTORIMESSA DA TAIBI · TORINO
              </p>

              <h2
                id="location-title"
                className="location-section__title"
              >
                VIA BREGLIO
                <span>111.</span>
              </h2>
            </div>

            <div className="location-section__side">
              <div>
                <span className="location-section__address-label">
                  INDIRIZZO AUTORIMESSA
                </span>

                <p className="location-section__address">
                  Via Breglio, 111
                  <br />
                  10147 Torino TO
                </p>
              </div>

              <a
                href={GOOGLE_MAPS_URL}
                className="location-section__maps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apri Autorimessa Da Taibi su Google Maps"
              >
                <span>APRI SU GOOGLE MAPS</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="location-section__details">
            <div className="location-detail">
              <span className="location-detail__label">
                ACCESSO
              </span>

              <span className="location-detail__value">
                24 / 24
              </span>

              <span className="location-detail__sub">
                Accesso con telecomando
              </span>
            </div>

            <div className="location-detail">
              <span className="location-detail__label">
                POSTI AUTO / VAN
              </span>

              <span className="location-detail__value">
                80 POSTI
              </span>

              <span className="location-detail__sub">
                Auto, SUV, furgoni e van
              </span>
            </div>

            <div className="location-detail">
              <span className="location-detail__label">
                POSTI MOTO
              </span>

              <span className="location-detail__value">
                10 POSTI
              </span>

              <span className="location-detail__sub">
                Spazi dedicati alle due ruote
              </span>
            </div>

            <div className="location-detail">
              <span className="location-detail__label">
                PERSONALE
              </span>

              <span className="location-detail__value">
                08 — 18
              </span>

              <span className="location-detail__sub">
                Lun–Sab · Dom 08–01
              </span>
            </div>
          </div>

          <div className="location-section__bottom">
            <span>TORINO · 10147</span>

            <span className="location-section__bottom-center">
              AUTORIMESSA DA TAIBI
            </span>

            <a href="#recensioni">
              <span>RECENSIONI</span>
              <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: locationStyles,
        }}
      />
    </>
  );
}
