'use client';

import { useEffect, useRef } from 'react';
import { subscribeScrollFrame } from '../lib/scrollFrame';

const securityStyles = `
  .security-section {
    --transition-progress: 0;
    --out-progress: 0;

    position: sticky;
    top: 0;
    z-index: 15;

    width: 100%;
    height: var(--viewport-height, 100svh);
    min-height: 620px;

    overflow: hidden;

    background:
      radial-gradient(
        circle at 54% 46%,
        rgba(255, 255, 255, 0.035),
        transparent 34%
      ),
      #070909;

    color: #f2f2ee;

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

  .security-section__grid {
    position: absolute;
    inset: 0;

    pointer-events: none;

    opacity: 0.13;

    background-image:
      linear-gradient(
        rgba(255, 255, 255, 0.045) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.045) 1px,
        transparent 1px
      );

    background-size:
      64px 64px;
  }

  .security-section__inner {
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding:
      clamp(48px, 5vw, 74px)
      var(--layout-inline)
      28px;
  }

  .security-section__top {
    position: relative;
    z-index: 8;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .security-section__section-id {
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

  .security-section__section-id span:first-child {
    color:
      rgba(255, 255, 255, 0.34);
  }

  .security-section__section-id span:last-child {
    color:
      rgba(255, 255, 255, 0.72);
  }

  .security-section__status {
    display: flex;
    align-items: center;

    gap: 9px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(255, 255, 255, 0.48);
  }

  .security-section__status-dot,
  .security-section__rec-dot {
    display: inline-block;

    width: 6px;
    height: 6px;

    border-radius: 50%;

    background: #f1f1ec;

    box-shadow:
      0 0 12px
      rgba(255, 255, 255, 0.45);
  }

  /* =========================================================
     PHOTOREALISTIC SECURITY CAMERA
     ========================================================= */

  .security-camera {
    position: absolute;
    top: clamp(82px, 9vh, 112px);
    right: clamp(20px, 4vw, 72px);
    z-index: 1;
    width: clamp(430px, 48vw, 760px);
    aspect-ratio: 3 / 2;
    pointer-events: none;
  }

  .security-camera::before {
    content: '';
    position: absolute;
    inset: 21% 3% 10% 20%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.76);
    filter: blur(34px);
    transform: translate(3%, 7%);
  }

  .security-camera__image {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: screen;
    filter:
      drop-shadow(0 30px 34px rgba(0, 0, 0, 0.72))
      drop-shadow(0 10px 12px rgba(0, 0, 0, 0.62))
      saturate(0.94)
      contrast(1.04);
    -webkit-mask-image:
      radial-gradient(
        ellipse at 56% 50%,
        #000 53%,
        rgba(0, 0, 0, 0.96) 68%,
        transparent 98%
      );
    mask-image:
      radial-gradient(
        ellipse at 56% 50%,
        #000 53%,
        rgba(0, 0, 0, 0.96) 68%,
        transparent 98%
      );
  }

  .security-section__main {
    position: relative;
    z-index: 3;

    display: grid;

    grid-template-columns:
      minmax(0, 1.35fr)
      minmax(250px, 0.65fr);

    grid-template-areas:
      'eyebrow info'
      'title info';

    align-items: end;

    gap:
      18px
      clamp(50px, 8vw, 140px);

    margin-top: auto;
  }

  .security-section__eyebrow {
    grid-area: eyebrow;

    display: flex;
    align-items: center;

    gap: 28px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.17em;

    color:
      rgba(255, 255, 255, 0.36);
  }

  .security-section__title {
    grid-area: title;

    display: flex;
    flex-direction: column;

    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(52px, 7.4vw, 120px);

    font-weight: 400;

    line-height: 0.81;

    letter-spacing: -0.07em;

    text-transform: uppercase;
  }

  .security-section__title span {
    color: transparent;

    -webkit-text-stroke:
      1.3px
      rgba(255, 255, 255, 0.72);
  }

  .security-section__info {
    grid-area: info;

    display: grid;

    grid-template-columns:
      42px 1fr;

    gap: 16px;

    align-self: end;

    max-width: 420px;

    padding-bottom: 5px;
  }

  .security-section__info-index {
    padding-top: 4px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.14em;

    color:
      rgba(255, 255, 255, 0.3);
  }

  .security-section__info p {
    margin: 0;

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
      rgba(255, 255, 255, 0.62);
  }

  .security-section__monitor {
    position: relative;
    z-index: 3;

    display: flex;
    flex-direction: column;

    justify-content: space-between;

    width: 100%;

    height:
      clamp(145px, 19vh, 210px);

    margin-top:
      clamp(34px, 5vh, 60px);

    padding: 18px 20px;

    border:
      1px solid
      rgba(255, 255, 255, 0.13);

    background:
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.025),
        transparent 40%,
        rgba(255, 255, 255, 0.025)
      );
  }

  .security-section__monitor::before {
    content: '';

    position: absolute;

    inset: 50% 0 auto;

    height: 1px;

    background:
      rgba(255, 255, 255, 0.06);
  }

  .security-section__monitor::after {
    content: '';

    position: absolute;

    top: 0;
    bottom: 0;
    left: 50%;

    width: 1px;

    background:
      rgba(255, 255, 255, 0.06);
  }

  .security-section__monitor-top,
  .security-section__monitor-bottom {
    position: relative;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: space-between;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.17em;

    color:
      rgba(255, 255, 255, 0.66);
  }

  .security-section__monitor-top span:last-child {
    display: flex;
    align-items: center;

    gap: 8px;
  }

  .security-section__rec-dot {
    width: 5px;
    height: 5px;
  }

  .security-section__monitor-center {
    position: absolute;

    top: 50%;
    left: 50%;

    z-index: 3;

    transform:
      translate(-50%, -50%);

    text-align: center;
  }

  .security-section__monitor-center p {
    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(12px, 1.3vw, 18px);

    font-weight: 400;

    line-height: 0.95;

    letter-spacing: 0.03em;

    color:
      rgba(255, 255, 255, 0.24);
  }

  .security-section__crosshair {
    position: absolute;

    top: 50%;
    left: 50%;

    width: 72px;
    height: 72px;

    transform:
      translate(-50%, -50%);

    border:
      1px solid
      rgba(255, 255, 255, 0.07);

    border-radius: 50%;
  }

  .security-section__crosshair span:first-child {
    position: absolute;

    top: 50%;
    left: -20px;
    right: -20px;

    height: 1px;

    background:
      rgba(255, 255, 255, 0.08);
  }

  .security-section__crosshair span:last-child {
    position: absolute;

    top: -20px;
    bottom: -20px;
    left: 50%;

    width: 1px;

    background:
      rgba(255, 255, 255, 0.08);
  }

  .security-section__monitor-corner {
    position: absolute;

    width: 15px;
    height: 15px;

    border-color:
      rgba(255, 255, 255, 0.38);

    border-style: solid;
  }

  .security-section__monitor-corner--tl {
    top: 8px;
    left: 8px;

    border-width:
      1px 0 0 1px;
  }

  .security-section__monitor-corner--tr {
    top: 8px;
    right: 8px;

    border-width:
      1px 1px 0 0;
  }

  .security-section__monitor-corner--bl {
    bottom: 8px;
    left: 8px;

    border-width:
      0 0 1px 1px;
  }

  .security-section__monitor-corner--br {
    right: 8px;
    bottom: 8px;

    border-width:
      0 1px 1px 0;
  }

  .security-section__bottom {
    position: relative;
    z-index: 3;

    display: grid;

    grid-template-columns:
      1fr 1fr 1fr;

    align-items: end;

    gap: 30px;

    padding-top: 18px;
  }

  .security-section__bottom p {
    margin: 0;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    line-height: 1.45;

    letter-spacing: 0.15em;

    color:
      rgba(255, 255, 255, 0.4);
  }

  .security-section__meta {
    display: flex;

    justify-self: center;

    gap: 16px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(255, 255, 255, 0.62);
  }

  .security-section__bottom a {
    display: inline-flex;
    align-items: center;

    justify-self: end;

    gap: 14px;

    padding-bottom: 6px;

    border-bottom:
      1px solid
      rgba(255, 255, 255, 0.3);

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(255, 255, 255, 0.7);

    transition:
      gap 200ms ease,
      border-color 200ms ease;
  }

  .security-section__bottom a:hover,
  .security-section__bottom a:focus-visible {
    gap: 22px;

    border-color: #ffffff;
  }

  @media (max-width: 1100px) {
    .security-section__inner {
      padding-left: var(--layout-inline);
      padding-right: var(--layout-inline);
    }

    .security-section__main {
      gap:
        18px 60px;
    }

    .security-camera {
      right: 10px;
      width: clamp(390px, 48vw, 560px);
    }
  }

  @media (min-width: 769px) and (max-height: 800px) {
    .security-section__inner {
      padding-top: 40px;
      padding-bottom: 20px;
    }

    .security-section__title {
      font-size:
        clamp(46px, 6vw, 82px);
    }

    .security-section__monitor {
      height: 120px;

      margin-top: 25px;
    }

    .security-section__bottom {
      padding-top: 12px;
    }

    .security-camera {
      top: 58px;
      width: 430px;
    }
  }

  @media (max-width: 768px) {
    .security-section {
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

    .security-section__inner {
      padding:
        48px
        var(--layout-inline)
        22px;
    }

    .security-section__status {
      font-size: 9px;
    }

    .security-camera {
      top: 74px;
      right: -70px;
      width: clamp(360px, 86vw, 470px);
      opacity: 0.88;
    }

    .security-section__main {
      display: block;

      margin-top: 72px;
    }

    .security-section__eyebrow {
      margin-bottom: 18px;
    }

    .security-section__title {
      font-size:
        clamp(43px, 13vw, 70px);
    }

    .security-section__info {
      max-width: 370px;

      margin-top: 35px;
    }

    .security-section__info p {
      font-size: 17px;

      line-height: 1.38;
    }

    .security-section__monitor {
      height: 145px;

      margin-top: 38px;
    }

    .security-section__bottom {
      grid-template-columns:
        1fr auto;

      margin-top: auto;
    }

    .security-section__meta {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .security-section__inner {
      padding:
        42px
        var(--layout-inline)
        18px;
    }

    .security-section__status span:last-child {
      display: none;
    }

    .security-camera {
      top: 68px;
      right: -90px;
      width: 360px;
      opacity: 0.82;
    }

    .security-section__main {
      margin-top: 58px;
    }

    .security-section__title {
      font-size:
        clamp(40px, 12.5vw, 58px);
    }

    .security-section__info p {
      font-size: 16px;
    }

    .security-section__monitor {
      height: 130px;

      margin-top: 30px;
    }
  }

  @media (max-width: 768px) and (max-height: 700px) {
    .security-section__inner {
      padding-top: 38px;
      padding-bottom: 16px;
    }

    .security-camera {
      top: 48px;
      right: -74px;
      width: clamp(320px, 74vw, 390px);
    }

    .security-section__main {
      margin-top: 42px;
    }

    .security-section__eyebrow {
      margin-bottom: 12px;
    }

    .security-section__title {
      font-size:
        clamp(38px, 11vw, 58px);
    }

    .security-section__info {
      margin-top: 20px;
    }

    .security-section__monitor {
      flex: 0 0 auto;

      height: 112px;

      margin-top: 20px;
      padding: 14px 16px;
    }

    .security-section__bottom {
      padding-top: 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .security-section {
      transform: none;
      filter: none;
    }

    .security-section__bottom a {
      transition: none;
    }

  }
`;

const securityCameraUrl =
  'https://pub-fd03e0c0deb14bfda1dea88f5eb37f8b.r2.dev/media/security-camera.webp';

export default function SecuritySection() {
  const securityRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const security =
      securityRef.current;

    const rates =
      document.querySelector<HTMLElement>(
        '#tariffe'
      );

    if (!security || !rates) return;

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

    let ratesDocumentTop =
      getDocumentTop(rates);

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
        ratesDocumentTop =
          getDocumentTop(rates);
      }

      const distanceIntoTransition =
        scrollY -
        (
          ratesDocumentTop -
          viewportHeight
        );

      const progress = clamp(
        distanceIntoTransition /
          viewportHeight
      );

      security.style.setProperty(
        '--out-progress',
        progress.toString()
      );

      rates.style.setProperty(
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
        ref={securityRef}
        id="sicurezza"
        className="security-section"
        aria-labelledby="security-title"
      >
        <div
          className="security-section__grid"
          aria-hidden="true"
        />

        <div
          className="security-camera"
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="security-camera__image"
            src={securityCameraUrl}
            alt=""
            width="800"
            height="533"
            decoding="async"
          />
        </div>

        <div className="security-section__inner">
          <div className="security-section__top">
            <div className="security-section__section-id">
              <span>03</span>
              <span>SICUREZZA</span>
            </div>

            <div className="security-section__status">
              <span className="security-section__status-dot" />

              <span>
                VIDEOSORVEGLIANZA
              </span>
            </div>
          </div>

          <div className="security-section__main">
            <div className="security-section__eyebrow">
              <span>
                CAM / SECURITY SYSTEM
              </span>

              <span>
                TORINO
              </span>
            </div>

            <h2
              id="security-title"
              className="security-section__title"
            >
              SEMPRE
              <span>SOTTO</span>
              CONTROLLO.
            </h2>

            <div className="security-section__info">
              <span className="security-section__info-index">
                / 03
              </span>

              <p>
                Un ambiente pensato per custodire
                auto e moto con attenzione, anche
                grazie alla videosorveglianza.
              </p>
            </div>
          </div>

          <div className="security-section__monitor">
            <div className="security-section__monitor-corner security-section__monitor-corner--tl" />
            <div className="security-section__monitor-corner security-section__monitor-corner--tr" />
            <div className="security-section__monitor-corner security-section__monitor-corner--bl" />
            <div className="security-section__monitor-corner security-section__monitor-corner--br" />

            <div className="security-section__monitor-top">
              <span>SECURITY</span>

              <span>
                <span className="security-section__rec-dot" />
                ACTIVE
              </span>
            </div>

            <div className="security-section__monitor-center">
              <div className="security-section__crosshair">
                <span />
                <span />
              </div>

              <p>
                SECURITY
                <br />
                MONITORING
              </p>
            </div>

            <div className="security-section__monitor-bottom">
              <span>
                VIA BREGLIO 111
              </span>

              <span>
                TORINO
              </span>
            </div>
          </div>

          <div className="security-section__bottom">
            <p>
              IL TUO MEZZO.
              <br />
              IL NOSTRO SPAZIO.
            </p>

            <div className="security-section__meta">
              <span>DA TAIBI</span>
              <span>AUTORIMESSA</span>
            </div>

            <a href="#tariffe">
              <span>TARIFFE</span>

              <span aria-hidden="true">
                ↘
              </span>
            </a>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: securityStyles,
        }}
      />
    </>
  );
}
