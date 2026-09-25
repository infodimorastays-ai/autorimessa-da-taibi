'use client';

import { useEffect, useRef } from 'react';

const securityStyles = `
  .security-section {
    --transition-progress: 0;
    --out-progress: 0;

    position: sticky;
    top: 0;
    z-index: 15;

    width: 100%;
    height: 100svh;
    min-height: 620px;

    overflow: hidden;

    background:
      radial-gradient(
        circle at 82% 22%,
        rgba(62, 181, 205, 0.075),
        transparent 24%
      ),
      radial-gradient(
        circle at 68% 48%,
        rgba(110, 135, 145, 0.12),
        transparent 31%
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

    will-change:
      transform,
      filter;

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
      40px
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
     CCTV / DECORATIVE SECURITY CAMERA
     ========================================================= */

  .security-camera {
    position: absolute;

    top:
      clamp(88px, 11vh, 126px);

    right:
      clamp(52px, 7vw, 130px);

    z-index: 1;

    width:
      clamp(230px, 22vw, 380px);

    height:
      clamp(160px, 21vw, 290px);

    pointer-events: none;

    opacity: 0.92;
  }

  .security-camera__ambient {
    position: absolute;

    top: 5%;
    left: 15%;

    width: 90%;
    height: 82%;

    border-radius: 50%;

    background:
      radial-gradient(
        ellipse at center,
        rgba(57, 197, 222, 0.105) 0%,
        rgba(57, 197, 222, 0.04) 34%,
        transparent 72%
      );

    filter: blur(22px);

    transform:
      rotate(-7deg);

    animation:
      securityCameraAmbient 5s
      ease-in-out infinite;
  }

  .security-camera__mount {
    position: absolute;

    top: 8%;
    right: 1%;

    width: 38%;
    height: 10%;

    border:
      1px solid
      rgba(255, 255, 255, 0.13);

    border-radius:
      3px 12px 12px 3px;

    background:
      linear-gradient(
        180deg,
        rgba(125, 137, 140, 0.2),
        rgba(22, 27, 28, 0.55)
      );

    box-shadow:
      inset 0 1px 0
      rgba(255, 255, 255, 0.07),
      0 10px 25px
      rgba(0, 0, 0, 0.25);

    transform:
      rotate(-7deg);
  }

  .security-camera__mount::after {
    content: '';

    position: absolute;

    top: 50%;
    right: -10px;

    width: 11px;
    height: 28px;

    border-radius: 2px;

    background:
      linear-gradient(
        90deg,
        #111617,
        #333d3f
      );

    transform:
      translateY(-50%);
  }

  .security-camera__arm {
    position: absolute;

    top: 19%;
    right: 23%;

    width: 11%;
    height: 30%;

    border-radius: 6px;

    background:
      linear-gradient(
        90deg,
        #111617 0%,
        #3d4749 48%,
        #151a1b 100%
      );

    box-shadow:
      inset 1px 0 0
      rgba(255, 255, 255, 0.09),
      6px 8px 18px
      rgba(0, 0, 0, 0.32);

    transform:
      rotate(30deg);

    transform-origin:
      50% 0%;
  }

  .security-camera__joint {
    position: absolute;

    top: 36%;
    right: 27%;

    width: 13%;
    aspect-ratio: 1;

    border:
      1px solid
      rgba(255, 255, 255, 0.14);

    border-radius: 50%;

    background:
      radial-gradient(
        circle at 38% 32%,
        #596466 0%,
        #272f30 32%,
        #101415 72%
      );

    box-shadow:
      0 8px 22px
      rgba(0, 0, 0, 0.4);
  }

  .security-camera__body {
    position: absolute;

    top: 37%;
    right: 27%;

    width: 56%;
    height: 29%;

    border:
      1px solid
      rgba(255, 255, 255, 0.14);

    border-radius:
      10px 8px 13px 13px;

    background:
      linear-gradient(
        165deg,
        rgba(92, 105, 108, 0.82) 0%,
        rgba(44, 52, 54, 0.94) 31%,
        rgba(18, 23, 24, 0.98) 75%
      );

    box-shadow:
      inset 0 1px 0
      rgba(255, 255, 255, 0.13),
      inset 0 -12px 24px
      rgba(0, 0, 0, 0.24),
      0 24px 45px
      rgba(0, 0, 0, 0.3);

    transform:
      rotate(-7deg)
      skewX(-3deg);

    transform-origin:
      80% 50%;
  }

  .security-camera__body::before {
    content: 'CAM 01';

    position: absolute;

    top: 14px;
    right: 18px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 7px;
    font-weight: 600;

    line-height: 1;

    letter-spacing: 0.18em;

    color:
      rgba(255, 255, 255, 0.25);
  }

  .security-camera__body::after {
    content: '';

    position: absolute;

    left: 19%;
    right: 14%;
    bottom: 9px;

    height: 1px;

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.13),
        transparent
      );
  }

  .security-camera__hood {
    position: absolute;

    top: -9%;
    left: -4%;

    width: 78%;
    height: 19%;

    border-radius:
      7px 3px 2px 5px;

    background:
      linear-gradient(
        180deg,
        #667174,
        #30393b 60%,
        #171c1d
      );

    box-shadow:
      inset 0 1px 0
      rgba(255, 255, 255, 0.13),
      0 4px 9px
      rgba(0, 0, 0, 0.3);
  }

  .security-camera__face {
    position: absolute;

    top: 7%;
    left: -10%;

    width: 31%;
    height: 86%;

    border:
      1px solid
      rgba(255, 255, 255, 0.14);

    border-radius:
      45% 34% 34% 45%;

    background:
      linear-gradient(
        145deg,
        #303a3c,
        #0c1011 70%
      );

    box-shadow:
      inset -7px 0 14px
      rgba(0, 0, 0, 0.46),
      -7px 6px 20px
      rgba(0, 0, 0, 0.25);
  }

  .security-camera__lens {
    position: absolute;

    top: 50%;
    left: 46%;

    width: 64%;
    aspect-ratio: 1;

    transform:
      translate(-50%, -50%);

    border:
      1px solid
      rgba(117, 205, 220, 0.22);

    border-radius: 50%;

    background:
      radial-gradient(
        circle at 39% 34%,
        rgba(219, 251, 255, 0.72) 0%,
        rgba(98, 208, 226, 0.38) 5%,
        rgba(21, 88, 101, 0.42) 15%,
        #071012 34%,
        #020505 62%,
        #11191a 72%,
        #020303 100%
      );

    box-shadow:
      inset 0 0 0 4px
      rgba(0, 0, 0, 0.62),
      inset 0 0 18px
      rgba(67, 197, 220, 0.14),
      0 0 14px
      rgba(66, 202, 225, 0.08);

    animation:
      securityLens 4.8s
      ease-in-out infinite;
  }

  .security-camera__lens::before {
    content: '';

    position: absolute;

    top: 17%;
    left: 20%;

    width: 24%;
    height: 13%;

    border-radius: 50%;

    background:
      rgba(204, 249, 255, 0.35);

    filter: blur(1px);

    transform:
      rotate(-28deg);
  }

  .security-camera__lens::after {
    content: '';

    position: absolute;

    inset: -16%;

    border-radius: 50%;

    border:
      1px solid
      rgba(70, 199, 220, 0.07);
  }

  .security-camera__rec {
    position: absolute;

    right: 12px;
    bottom: 12px;

    display: flex;
    align-items: center;

    gap: 6px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 6px;
    font-weight: 600;

    line-height: 1;

    letter-spacing: 0.16em;

    color:
      rgba(255, 255, 255, 0.34);
  }

  .security-camera__rec-dot {
    width: 4px;
    height: 4px;

    border-radius: 50%;

    background:
      #d8665f;

    box-shadow:
      0 0 7px
      rgba(216, 102, 95, 0.42);

    animation:
      securityRec 2.2s
      ease-in-out infinite;
  }

  .security-camera__beam {
    position: absolute;

    top: 43%;
    left: -26%;

    width: 42%;
    height: 38%;

    opacity: 0.23;

    background:
      linear-gradient(
        90deg,
        rgba(64, 202, 224, 0.12),
        transparent
      );

    clip-path:
      polygon(
        100% 35%,
        0 0,
        0 100%,
        100% 65%
      );

    filter: blur(8px);

    transform:
      rotate(-7deg);
  }

  .security-camera__caption {
    position: absolute;

    right: 3%;
    bottom: 7%;

    display: flex;
    align-items: center;

    gap: 9px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 7px;
    font-weight: 600;

    line-height: 1;

    letter-spacing: 0.17em;

    color:
      rgba(255, 255, 255, 0.25);
  }

  .security-camera__caption::before {
    content: '';

    width: 27px;
    height: 1px;

    background:
      rgba(80, 199, 219, 0.3);
  }

  @keyframes securityLens {
    0%,
    100% {
      box-shadow:
        inset 0 0 0 4px
        rgba(0, 0, 0, 0.62),
        inset 0 0 18px
        rgba(67, 197, 220, 0.12),
        0 0 12px
        rgba(66, 202, 225, 0.06);
    }

    50% {
      box-shadow:
        inset 0 0 0 4px
        rgba(0, 0, 0, 0.62),
        inset 0 0 22px
        rgba(67, 197, 220, 0.2),
        0 0 21px
        rgba(66, 202, 225, 0.12);
    }
  }

  @keyframes securityCameraAmbient {
    0%,
    100% {
      opacity: 0.55;
      transform:
        rotate(-7deg)
        scale(0.98);
    }

    50% {
      opacity: 0.82;
      transform:
        rotate(-7deg)
        scale(1.04);
    }
  }

  @keyframes securityRec {
    0%,
    100% {
      opacity: 0.5;
    }

    50% {
      opacity: 1;
    }
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

    font-size: 8px;
    font-weight: 600;

    letter-spacing: 0.17em;

    color:
      rgba(255, 255, 255, 0.34);
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

    font-size: 8px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(255, 255, 255, 0.28);
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
      padding-left: 28px;
      padding-right: 28px;
    }

    .security-section__main {
      gap:
        18px 60px;
    }

    .security-camera {
      right: 35px;

      width:
        clamp(220px, 25vw, 310px);
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
      top: 70px;

      width: 245px;
      height: 170px;
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
        20px
        22px;
    }

    .security-section__status {
      font-size: 7px;
    }

    .security-camera {
      top: 82px;
      right: -15px;

      width: 205px;
      height: 145px;

      opacity: 0.62;
    }

    .security-camera__caption {
      display: none;
    }

    .security-camera__beam {
      opacity: 0.13;
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
        17px
        18px;
    }

    .security-section__status span:last-child {
      display: none;
    }

    .security-camera {
      top: 72px;
      right: -35px;

      width: 175px;
      height: 125px;

      opacity: 0.48;
    }

    .security-camera__ambient {
      opacity: 0.45;
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
      top: 60px;
      right: -25px;

      width:
        clamp(150px, 27vw, 180px);
      height: 125px;
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

    .security-camera__ambient,
    .security-camera__lens,
    .security-camera__rec-dot {
      animation: none;
    }
  }
`;

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

      const ratesDocumentTop =
        getDocumentTop(rates);

      const distanceIntoTransition =
        window.scrollY -
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
          <div className="security-camera__ambient" />

          <div className="security-camera__mount" />
          <div className="security-camera__arm" />
          <div className="security-camera__joint" />

          <div className="security-camera__body">
            <div className="security-camera__hood" />

            <div className="security-camera__face">
              <div className="security-camera__lens" />
            </div>

            <div className="security-camera__rec">
              <span className="security-camera__rec-dot" />
              <span>REC</span>
            </div>
          </div>

          <div className="security-camera__beam" />

          <div className="security-camera__caption">
            CCTV / ACTIVE
          </div>
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
              <span>CAM 01</span>

              <span>
                <span className="security-section__rec-dot" />
                REC
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
