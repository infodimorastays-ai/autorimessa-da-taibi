'use client';

import {
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

const CLOSE_MS = 720;
const CLOSED_HOLD_MS = 180;
const OPEN_MS = 1500;

const links = [
  {
    number: '01',
    label: 'Autorimessa',
    href: '#autorimessa',
  },
  {
    number: '02',
    label: 'Servizi',
    href: '#servizi',
  },
  {
    number: '03',
    label: 'Sicurezza',
    href: '#sicurezza',
  },
  {
    number: '04',
    label: 'Tariffe',
    href: '#tariffe',
  },
  {
    number: '05',
    label: 'Dove siamo',
    href: '#dove-siamo',
  },
  {
    number: '06',
    label: 'Contatti',
    href: '#contatti',
  },
];

const navbarStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,500;0,600;0,700;0,800;1,700;1,800&display=swap');

  /* =========================================================
     NAVBAR
  ========================================================= */

  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 24px 40px;

    pointer-events: none;
  }

  .navbar a,
  .navbar button {
    pointer-events: auto;
  }

  /* =========================================================
     BRAND
  ========================================================= */

  .navbar__brand {
    display: flex;
    align-items: center;

    gap: 13px;

    flex-shrink: 0;

    color: #ffffff;
  }

  .navbar__brand-mark {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 38px;
    height: 38px;

    border:
      1px solid
      rgba(255, 255, 255, 0.38);

    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size: 15px;
    font-style: italic;
    font-weight: 800;

    letter-spacing: -0.04em;

    transform: skewX(-8deg);

    background:
      rgba(0, 0, 0, 0.2);

    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .navbar__brand-mark span {
    transform: skewX(8deg);
  }

  .navbar__brand-copy {
    display: flex;
    flex-direction: column;
  }

  .navbar__brand-name {
    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size: 20px;
    font-style: italic;
    font-weight: 800;

    line-height: 0.9;
    letter-spacing: -0.025em;

    text-transform: uppercase;
  }

  .navbar__brand-subtitle {
    margin-top: 6px;

    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size: 8px;
    font-weight: 600;

    line-height: 1;
    letter-spacing: 0.28em;

    color:
      rgba(255, 255, 255, 0.52);
  }

  /* =========================================================
     DESKTOP MENU
  ========================================================= */

  .navbar__menu {
    display: flex;
    align-items: stretch;

    height: 42px;

    border-top:
      1px solid
      rgba(255, 255, 255, 0.22);

    border-bottom:
      1px solid
      rgba(255, 255, 255, 0.22);

    background:
      rgba(0, 0, 0, 0.16);

    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .navbar__link {
    position: relative;

    display: flex;
    align-items: center;

    gap: 7px;

    height: 100%;

    padding:
      0
      clamp(
        12px,
        1.35vw,
        22px
      );

    overflow: hidden;

    border-left:
      1px solid
      rgba(255, 255, 255, 0.13);

    color:
      rgba(255, 255, 255, 0.82);

    transition:
      color 180ms ease;
  }

  .navbar__link:last-child {
    border-right:
      1px solid
      rgba(255, 255, 255, 0.13);
  }

  .navbar__link::before {
    content: '';

    position: absolute;
    inset: 0;

    z-index: -1;

    background: #f2f0e9;

    transform: translateY(105%);

    transition:
      transform 220ms
      cubic-bezier(
        0.76,
        0,
        0.24,
        1
      );
  }

  .navbar__number {
    position: relative;
    z-index: 1;

    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size: 8px;
    font-weight: 600;

    line-height: 1;
    letter-spacing: 0.06em;

    color:
      rgba(255, 255, 255, 0.38);

    transition:
      color 180ms ease;
  }

  .navbar__label {
    position: relative;
    z-index: 1;

    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size: 13px;
    font-style: italic;
    font-weight: 700;

    line-height: 1;
    letter-spacing: 0.045em;

    text-transform: uppercase;

    transition:
      transform 200ms ease;
  }

  .navbar__link:hover,
  .navbar__link:focus-visible {
    color: #080808;
  }

  .navbar__link:hover::before,
  .navbar__link:focus-visible::before {
    transform: translateY(0);
  }

  .navbar__link:hover
  .navbar__number,
  .navbar__link:focus-visible
  .navbar__number {
    color:
      rgba(0, 0, 0, 0.42);
  }

  .navbar__link:hover
  .navbar__label,
  .navbar__link:focus-visible
  .navbar__label {
    transform: skewX(-7deg);
  }

  /* =========================================================
     MOBILE TOGGLE
  ========================================================= */

  .navbar__toggle {
    display: none;

    width: 48px;
    height: 42px;

    padding: 0;

    border:
      1px solid
      rgba(255, 255, 255, 0.3);

    background:
      rgba(0, 0, 0, 0.22);

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    color: #ffffff;

    cursor: pointer;
  }

  .navbar__toggle-inner {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 5px;

    width: 100%;
    height: 100%;
  }

  .navbar__toggle-line {
    display: block;

    width: 21px;
    height: 1px;

    background: currentColor;

    transform-origin: center;

    transition:
      transform 220ms ease,
      opacity 180ms ease;
  }

  .navbar__toggle--open
  .navbar__toggle-line:nth-child(1) {
    transform:
      translateY(6px)
      rotate(45deg);
  }

  .navbar__toggle--open
  .navbar__toggle-line:nth-child(2) {
    opacity: 0;
  }

  .navbar__toggle--open
  .navbar__toggle-line:nth-child(3) {
    transform:
      translateY(-6px)
      rotate(-45deg);
  }

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  .navbar__mobile {
    position: fixed;
    inset: 0;

    z-index: 49;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding:
      105px
      24px
      34px;

    overflow: hidden;

    background: #070707;

    opacity: 0;
    visibility: hidden;

    pointer-events: none;

    transform: translateY(-20px);

    transition:
      opacity 220ms ease,
      visibility 220ms ease,
      transform 260ms
      cubic-bezier(
        0.76,
        0,
        0.24,
        1
      );
  }

  .navbar__mobile::before {
    content: 'DA TAIBI';

    position: absolute;

    right: -18px;
    bottom: 60px;

    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size:
      clamp(
        100px,
        30vw,
        190px
      );

    font-style: italic;
    font-weight: 800;

    line-height: 0.7;
    letter-spacing: -0.07em;

    color:
      rgba(255, 255, 255, 0.025);

    white-space: nowrap;

    pointer-events: none;
  }

  .navbar__mobile--open {
    opacity: 1;
    visibility: visible;

    pointer-events: auto;

    transform: translateY(0);
  }

  .navbar__mobile-header {
    position: absolute;

    top: 105px;
    left: 24px;

    display: flex;
    align-items: center;

    gap: 9px;

    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.18em;

    color:
      rgba(255, 255, 255, 0.4);
  }

  .navbar__mobile-header-line {
    width: 28px;
    height: 1px;

    background:
      rgba(255, 255, 255, 0.35);
  }

  .navbar__mobile-menu {
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;

    border-top:
      1px solid
      rgba(255, 255, 255, 0.16);
  }

  .navbar__mobile-link {
    display: grid;

    grid-template-columns:
      34px
      1fr
      auto;

    align-items: center;

    min-height: 65px;

    border-bottom:
      1px solid
      rgba(255, 255, 255, 0.16);

    color: #f3f1eb;

    transition:
      padding-left 180ms ease,
      background 180ms ease;
  }

  .navbar__mobile-number {
    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    color:
      rgba(255, 255, 255, 0.32);
  }

  .navbar__mobile-label {
    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size:
      clamp(
        31px,
        9vw,
        48px
      );

    font-style: italic;
    font-weight: 800;

    line-height: 0.9;
    letter-spacing: -0.035em;

    text-transform: uppercase;
  }

  .navbar__mobile-arrow {
    font-size: 15px;

    color:
      rgba(255, 255, 255, 0.4);

    transition:
      transform 180ms ease,
      color 180ms ease;
  }

  .navbar__mobile-link:hover,
  .navbar__mobile-link:focus-visible {
    padding-left: 8px;

    background:
      rgba(255, 255, 255, 0.04);
  }

  .navbar__mobile-link:hover
  .navbar__mobile-arrow,
  .navbar__mobile-link:focus-visible
  .navbar__mobile-arrow {
    color: #ffffff;

    transform:
      translateX(-4px)
      translateY(4px);
  }

  .navbar__mobile-footer {
    position: absolute;

    left: 24px;
    right: 24px;
    bottom: 28px;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 20px;

    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size: 9px;
    font-weight: 600;

    line-height: 1.4;
    letter-spacing: 0.13em;

    color:
      rgba(255, 255, 255, 0.4);
  }

  .navbar__mobile-footer-right {
    text-align: right;
  }

  /* =========================================================
     GARAGE TRANSITION
  ========================================================= */

  .garage-transition {
    position: fixed;
    inset: 0;

    z-index: 9999;

    overflow: hidden;

    visibility: hidden;

    pointer-events: none;

    background: transparent;
  }

  .garage-transition--active {
    visibility: visible;
    pointer-events: auto;
  }

  /* =========================================================
     BLACKOUT
  ========================================================= */

  .garage-transition__blackout {
    position: absolute;
    inset: 0;

    z-index: 1;

    background:
      radial-gradient(
        ellipse at center,
        #080808 0%,
        #020202 58%,
        #000000 100%
      );

    opacity: 0;

    transition:
      opacity 280ms ease;
  }

  .garage-transition--closing
  .garage-transition__blackout,
  .garage-transition--closed
  .garage-transition__blackout,
  .garage-transition--opening
  .garage-transition__blackout {
    opacity: 1;
  }

  /* =========================================================
     REALISTIC SATIN SHUTTER
  ========================================================= */

  .garage-transition__shutter {
    position: absolute;

    top: 0;
    left: 0;

    z-index: 7;

    width: 100%;
    height: 100%;

    overflow: hidden;

    background:
      linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.12) 0%,
        rgba(255, 255, 255, 0.025) 8%,
        rgba(255, 255, 255, 0.06) 20%,
        rgba(0, 0, 0, 0.04) 34%,
        rgba(255, 255, 255, 0.035) 48%,
        rgba(0, 0, 0, 0.08) 64%,
        rgba(255, 255, 255, 0.045) 79%,
        rgba(0, 0, 0, 0.14) 100%
      ),
      repeating-linear-gradient(
        to bottom,
        #727577 0px,
        #75787a 3px,
        #6e7173 9px,
        #696c6e 18px,
        #626567 27px,
        #585b5d 31px,
        #4a4d4f 34px,
        #383b3d 36px,
        #55585a 38px,
        #686b6d 41px
      );

    box-shadow:
      inset 0 0 140px
      rgba(0, 0, 0, 0.3),

      inset 0 0 2px
      rgba(255, 255, 255, 0.2),

      0 20px 70px
      rgba(0, 0, 0, 0.85);

    transform:
      translate3d(
        0,
        -101%,
        0
      );

    will-change: transform;

    backface-visibility: hidden;
  }

  .garage-transition__shutter::before {
    content: '';

    position: absolute;
    inset: 0;

    z-index: 1;

    background:
      linear-gradient(
        104deg,
        transparent 0%,
        rgba(255, 255, 255, 0.018) 20%,
        rgba(255, 255, 255, 0.065) 34%,
        rgba(255, 255, 255, 0.015) 47%,
        transparent 62%
      );

    mix-blend-mode: soft-light;

    pointer-events: none;
  }

  .garage-transition__shutter::after {
    content: '';

    position: absolute;

    left: 0;
    right: 0;
    bottom: 0;

    z-index: 5;

    height: 13px;

    background:
      linear-gradient(
        180deg,
        #747779 0%,
        #56595b 15%,
        #36393a 42%,
        #181a1b 72%,
        #080909 100%
      );

    border-top:
      1px solid
      rgba(255, 255, 255, 0.2);

    box-shadow:
      0 7px 8px
      rgba(0, 0, 0, 0.55),

      0 18px 38px
      rgba(0, 0, 0, 0.38);
  }

  .garage-transition__grain {
    position: absolute;
    inset: 0;

    z-index: 2;

    opacity: 0.13;

    background:
      repeating-linear-gradient(
        90deg,
        transparent 0px,
        rgba(255, 255, 255, 0.025) 1px,
        transparent 2px,
        transparent 4px
      );

    mix-blend-mode: overlay;

    pointer-events: none;
  }

  .garage-transition__reflection {
    position: absolute;

    top: 0;
    bottom: 0;

    left: -30%;

    z-index: 3;

    width: 26%;

    opacity: 0;

    background:
      linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.07) 38%,
        rgba(255, 255, 255, 0.13) 50%,
        rgba(255, 255, 255, 0.035) 62%,
        transparent 100%
      );

    transform:
      skewX(-10deg);

    pointer-events: none;
  }

  .garage-transition--closing
  .garage-transition__reflection {
    animation:
      shutter-reflection
      ${CLOSE_MS}ms
      ease-out
      forwards;
  }

  .garage-transition__shutter-label {
    position: absolute;

    left: 50%;
    bottom: 47px;

    z-index: 4;

    transform:
      translateX(-50%);

    font-family:
      'Barlow Condensed',
      sans-serif;

    font-size: 8px;
    font-weight: 500;

    line-height: 1;

    letter-spacing: 0.36em;

    color:
      rgba(255, 255, 255, 0.16);

    text-shadow:
      0 1px 1px
      rgba(0, 0, 0, 0.7);

    white-space: nowrap;
  }

  .garage-transition--closing
  .garage-transition__shutter {
    transform:
      translate3d(
        0,
        0,
        0
      );

    transition:
      transform
      ${CLOSE_MS}ms
      cubic-bezier(
        0.72,
        0.02,
        0.24,
        1
      );
  }

  .garage-transition--closed
  .garage-transition__shutter {
    transform:
      translate3d(
        0,
        0,
        0
      );
  }

  .garage-transition--opening
  .garage-transition__shutter {
    transform:
      translate3d(
        0,
        -101%,
        0
      );

    transition:
      transform
      ${OPEN_MS}ms
      cubic-bezier(
        0.52,
        0.02,
        0.2,
        1
      );
  }

  /* =========================================================
     CAR SILHOUETTE / DARK SPACE
  ========================================================= */

  .garage-transition__interior {
    position: absolute;
    inset: 0;

    z-index: 2;

    overflow: hidden;

    opacity: 0;

    background:
      radial-gradient(
        ellipse at 50% 67%,
        rgba(16, 18, 20, 0.95) 0%,
        rgba(5, 6, 7, 0.98) 44%,
        #000000 76%
      );
  }

  .garage-transition--opening
  .garage-transition__interior {
    opacity: 1;
  }

  .garage-transition__car-shadow {
    position: absolute;

    left: 50%;
    top: 53%;

    width:
      min(
        760px,
        76vw
      );

    height:
      min(
        250px,
        30vh
      );

    transform:
      translate(
        -50%,
        -50%
      );

    border-radius:
      48% 48% 24% 24% /
      44% 44% 20% 20%;

    background:
      radial-gradient(
        ellipse at center,
        rgba(18, 20, 22, 0.96) 0%,
        rgba(6, 7, 8, 0.8) 58%,
        transparent 72%
      );

    filter:
      blur(8px);

    opacity: 0.72;
  }

  /* =========================================================
     HEADLIGHT SYSTEM
  ========================================================= */

  .garage-transition__lighting {
    position: absolute;
    inset: 0;

    z-index: 5;

    opacity: 0;

    pointer-events: none;
  }

  .garage-transition--opening
  .garage-transition__lighting {
    opacity: 1;
  }

  /* =========================================================
     LED HEADLIGHT UNITS
  ========================================================= */

  .garage-transition__lamp {
    position: absolute;

    top: 61%;

    width:
      clamp(
        120px,
        15vw,
        255px
      );

    height:
      clamp(
        17px,
        1.55vw,
        25px
      );

    opacity: 0;

    transform:
      translateY(-50%)
      scaleX(0.92);

    will-change:
      opacity,
      transform,
      filter;
  }

  .garage-transition__lamp--left {
    left: 20%;
  }

  .garage-transition__lamp--right {
    right: 20%;
  }

  /*
   * Physical LED housing.
   */

  .garage-transition__lamp-housing {
    position: absolute;
    inset: 0;

    overflow: hidden;

    border-radius:
      48% 52% 44% 48% /
      58% 60% 42% 45%;

    background:
      linear-gradient(
        180deg,
        #0d1012 0%,
        #020303 100%
      );

    box-shadow:
      inset 0 0 1px
      rgba(255, 255, 255, 0.35),

      0 1px 4px
      rgba(0, 0, 0, 0.9);
  }

  .garage-transition__lamp--right
  .garage-transition__lamp-housing {
    transform: scaleX(-1);
  }

  /*
   * Thin LED / neon signature.
   */

  .garage-transition__lamp-led {
    position: absolute;

    left: 5%;
    right: 5%;

    top: 50%;

    height:
      clamp(
        3px,
        0.38vw,
        6px
      );

    transform:
      translateY(-50%)
      skewX(-12deg);

    border-radius: 100%;

    background:
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 0%,
        #ffffff 9%,
        #ffffff 88%,
        rgba(255, 255, 255, 0.15) 100%
      );

    box-shadow:
      0 0 3px
      #ffffff,

      0 0 7px
      rgba(255, 255, 255, 1),

      0 0 15px
      rgba(246, 252, 255, 0.98),

      0 0 34px
      rgba(232, 247, 255, 0.9),

      0 0 75px
      rgba(215, 239, 255, 0.62);
  }

  .garage-transition__lamp--right
  .garage-transition__lamp-led {
    transform:
      translateY(-50%)
      skewX(12deg);
  }

  .garage-transition--opening
  .garage-transition__lamp {
    animation:
      realistic-lamp
      ${OPEN_MS}ms
      linear
      forwards;
  }

  /* =========================================================
     OPTICAL HORIZONTAL FLARE
  ========================================================= */

  .garage-transition__flare {
    position: absolute;

    top: 61%;

    width: 43vw;
    height: 2px;

    opacity: 0;

    transform:
      translateY(-50%);

    background:
      linear-gradient(
        90deg,
        transparent 0%,
        rgba(238, 248, 255, 0.04) 14%,
        rgba(248, 253, 255, 0.48) 42%,
        rgba(255, 255, 255, 0.95) 50%,
        rgba(248, 253, 255, 0.48) 58%,
        rgba(238, 248, 255, 0.04) 86%,
        transparent 100%
      );

    filter:
      blur(0.7px);

    box-shadow:
      0 0 6px
      rgba(255, 255, 255, 0.8),

      0 0 18px
      rgba(226, 243, 255, 0.38);
  }

  .garage-transition__flare--left {
    left: 1%;
  }

  .garage-transition__flare--right {
    right: 1%;
  }

  .garage-transition--opening
  .garage-transition__flare {
    animation:
      realistic-flare
      ${OPEN_MS}ms
      linear
      forwards;
  }

  /* =========================================================
     LOCAL LIGHT BLOOM
  ========================================================= */

  .garage-transition__lamp-bloom {
    position: absolute;

    top: 61%;

    width: 42vw;
    height: 38vh;

    opacity: 0;

    transform:
      translateY(-50%)
      scale(0.6);

    border-radius: 50%;

    filter:
      blur(32px);

    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 0.94) 0%,
        rgba(249, 253, 255, 0.68) 8%,
        rgba(235, 247, 255, 0.27) 27%,
        rgba(218, 239, 255, 0.07) 48%,
        transparent 72%
      );
  }

  .garage-transition__lamp-bloom--left {
    left: 0;
  }

  .garage-transition__lamp-bloom--right {
    right: 0;
  }

  .garage-transition--opening
  .garage-transition__lamp-bloom {
    animation:
      realistic-bloom
      ${OPEN_MS}ms
      ease-out
      forwards;
  }

  /* =========================================================
     CAMERA EXPOSURE
  ========================================================= */

  .garage-transition__exposure {
    position: absolute;
    inset: 0;

    z-index: 6;

    opacity: 0;

    background:
      radial-gradient(
        ellipse at 25% 61%,
        rgba(255, 255, 255, 0.96) 0%,
        rgba(253, 254, 255, 0.74) 9%,
        rgba(243, 250, 255, 0.28) 27%,
        transparent 54%
      ),
      radial-gradient(
        ellipse at 75% 61%,
        rgba(255, 255, 255, 0.96) 0%,
        rgba(253, 254, 255, 0.74) 9%,
        rgba(243, 250, 255, 0.28) 27%,
        transparent 54%
      );

    mix-blend-mode: screen;

    pointer-events: none;
  }

  .garage-transition--opening
  .garage-transition__exposure {
    animation:
      camera-exposure
      ${OPEN_MS}ms
      ease-out
      forwards;
  }

  /* =========================================================
     SENSOR GLARE
  ========================================================= */

  .garage-transition__sensor-glare {
    position: absolute;
    inset: 0;

    z-index: 7;

    opacity: 0;

    background:
      rgba(
        250,
        253,
        255,
        0.96
      );

    pointer-events: none;
  }

  .garage-transition--opening
  .garage-transition__sensor-glare {
    animation:
      sensor-glare
      ${OPEN_MS}ms
      ease-out
      forwards;
  }

  /* =========================================================
     FLOOR REFLECTION
  ========================================================= */

  .garage-transition__floor {
    position: absolute;

    left: 50%;
    bottom: -24%;

    z-index: 4;

    width: 120vw;
    height: 55vh;

    opacity: 0;

    transform:
      translateX(-50%)
      scaleX(0.45);

    transform-origin:
      center bottom;

    border-radius: 50%;

    filter:
      blur(35px);

    background:
      radial-gradient(
        ellipse at center,
        rgba(247, 252, 255, 0.7) 0%,
        rgba(229, 244, 255, 0.24) 31%,
        rgba(210, 235, 255, 0.04) 56%,
        transparent 72%
      );
  }

  .garage-transition--opening
  .garage-transition__floor {
    animation:
      floor-reflection
      ${OPEN_MS}ms
      ease-out
      forwards;
  }

  /* =========================================================
     ANIMATIONS
  ========================================================= */

  @keyframes shutter-reflection {
    0% {
      left: -30%;
      opacity: 0;
    }

    22% {
      opacity: 0.55;
    }

    75% {
      opacity: 0.4;
    }

    100% {
      left: 112%;
      opacity: 0;
    }
  }

  @keyframes realistic-lamp {
    0%,
    18% {
      opacity: 0;

      transform:
        translateY(-50%)
        scaleX(0.92);
    }

    22% {
      opacity: 0.18;
    }

    25% {
      opacity: 0.92;
    }

    28% {
      opacity: 0.48;
    }

    31% {
      opacity: 1;

      transform:
        translateY(-50%)
        scaleX(1);
    }

    76% {
      opacity: 1;

      transform:
        translateY(-50%)
        scaleX(1);
    }

    88% {
      opacity: 0.9;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes realistic-flare {
    0%,
    24% {
      opacity: 0;
    }

    31% {
      opacity: 0.62;
    }

    76% {
      opacity: 0.68;
    }

    90% {
      opacity: 0.25;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes realistic-bloom {
    0%,
    24% {
      opacity: 0;

      transform:
        translateY(-50%)
        scale(0.55);
    }

    34% {
      opacity: 0.48;
    }

    52% {
      opacity: 0.78;

      transform:
        translateY(-50%)
        scale(1);
    }

    76% {
      opacity: 0.88;

      transform:
        translateY(-50%)
        scale(1.18);
    }

    91% {
      opacity: 0.36;
    }

    100% {
      opacity: 0;

      transform:
        translateY(-50%)
        scale(1.3);
    }
  }

  @keyframes camera-exposure {
    0%,
    27% {
      opacity: 0;
    }

    39% {
      opacity: 0.16;
    }

    54% {
      opacity: 0.48;
    }

    69% {
      opacity: 0.74;
    }

    79% {
      opacity: 0.9;
    }

    88% {
      opacity: 0.52;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes sensor-glare {
    0%,
    42% {
      opacity: 0;
    }

    58% {
      opacity: 0.06;
    }

    70% {
      opacity: 0.22;
    }

    78% {
      opacity: 0.58;
    }

    84% {
      opacity: 0.82;
    }

    91% {
      opacity: 0.24;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes floor-reflection {
    0%,
    28% {
      opacity: 0;

      transform:
        translateX(-50%)
        scaleX(0.45);
    }

    46% {
      opacity: 0.32;
    }

    72% {
      opacity: 0.58;

      transform:
        translateX(-50%)
        scaleX(1);
    }

    90% {
      opacity: 0.24;
    }

    100% {
      opacity: 0;

      transform:
        translateX(-50%)
        scaleX(1.15);
    }
  }

  /* =========================================================
     RESPONSIVE
  ========================================================= */

  @media (max-width: 1180px) {
    .navbar {
      padding:
        24px
        28px;
    }

    .navbar__link {
      padding:
        0
        11px;
    }

    .navbar__label {
      font-size: 12px;
    }
  }

  @media (max-width: 980px) {
    .navbar__menu {
      display: none;
    }

    .navbar__toggle {
      display: block;
    }
  }

  @media (max-width: 768px) {
    .navbar {
      padding: 20px;
    }

    .navbar__brand-mark {
      width: 34px;
      height: 34px;

      font-size: 13px;
    }

    .navbar__brand-name {
      font-size: 18px;
    }

    .navbar__brand-subtitle {
      margin-top: 5px;

      font-size: 7px;
    }

    .garage-transition__lamp {
      top: 62%;

      width: 25vw;
      min-width: 100px;

      height: 16px;
    }

    .garage-transition__lamp--left {
      left: 10%;
    }

    .garage-transition__lamp--right {
      right: 10%;
    }

    .garage-transition__flare {
      top: 62%;

      width: 48vw;
    }

    .garage-transition__lamp-bloom {
      top: 62%;

      width: 55vw;
    }

    .garage-transition__lamp-bloom--left {
      left: -11%;
    }

    .garage-transition__lamp-bloom--right {
      right: -11%;
    }
  }

  @media (max-width: 480px) {
    .navbar {
      padding: 17px;
    }

    .navbar__brand {
      gap: 10px;
    }

    .navbar__brand-mark {
      width: 32px;
      height: 32px;
    }

    .navbar__brand-name {
      font-size: 17px;
    }

    .navbar__brand-subtitle {
      letter-spacing: 0.23em;
    }

    .navbar__toggle {
      width: 43px;
      height: 38px;
    }

    .navbar__mobile {
      padding:
        100px
        17px
        30px;
    }

    .navbar__mobile-header {
      top: 91px;
      left: 17px;
    }

    .navbar__mobile-link {
      grid-template-columns:
        30px
        1fr
        auto;

      min-height: 61px;
    }

    .navbar__mobile-footer {
      left: 17px;
      right: 17px;
      bottom: 22px;
    }

    .garage-transition__shutter {
      background:
        linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.12) 0%,
          rgba(255, 255, 255, 0.04) 21%,
          rgba(0, 0, 0, 0.04) 45%,
          rgba(255, 255, 255, 0.035) 68%,
          rgba(0, 0, 0, 0.13) 100%
        ),
        repeating-linear-gradient(
          to bottom,
          #727577 0px,
          #75787a 3px,
          #6e7173 8px,
          #696c6e 15px,
          #626567 22px,
          #585b5d 25px,
          #414446 28px,
          #5c5f61 31px
        );
    }

    .garage-transition__lamp {
      top: 62%;

      width: 30vw;
      min-width: 104px;

      height: 15px;
    }

    .garage-transition__lamp--left {
      left: 5%;
    }

    .garage-transition__lamp--right {
      right: 5%;
    }

    .garage-transition__flare {
      top: 62%;
      width: 52vw;
    }

    .garage-transition__lamp-bloom {
      top: 62%;
      width: 66vw;
    }

    .garage-transition__lamp-bloom--left {
      left: -18%;
    }

    .garage-transition__lamp-bloom--right {
      right: -18%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .navbar__link,
    .navbar__link::before,
    .navbar__label,
    .navbar__toggle-line,
    .navbar__mobile,
    .navbar__mobile-link,
    .navbar__mobile-arrow {
      transition: none;
    }

    .garage-transition__reflection,
    .garage-transition__lamp,
    .garage-transition__flare,
    .garage-transition__lamp-bloom,
    .garage-transition__exposure,
    .garage-transition__sensor-glare,
    .garage-transition__floor {
      animation: none;
    }
  }
`;

type TransitionPhase =
  | 'idle'
  | 'closing'
  | 'closed'
  | 'opening';

export default function Navbar() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [
    transitionPhase,
    setTransitionPhase,
  ] =
    useState<TransitionPhase>('idle');

  const isTransitioningRef =
    useRef(false);

  const timersRef =
    useRef<number[]>([]);

  useEffect(() => {
    if (!isOpen) {
      if (
        !isTransitioningRef.current
      ) {
        document.body.style.overflow =
          '';
      }

      return;
    }

    document.body.style.overflow =
      'hidden';

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(
        (timer) => {
          window.clearTimeout(timer);
        }
      );

      document.body.style.overflow =
        '';
    };
  }, []);

  const wait = (
    callback: () => void,
    delay: number
  ) => {
    const timer =
      window.setTimeout(
        callback,
        delay
      );

    timersRef.current.push(timer);
  };

  const scrollToTarget = (
    href: string
  ) => {
    const target =
      document.querySelector<HTMLElement>(
        href
      );

    if (!target) return;

    const html =
      document.documentElement;

    const previousScrollBehavior =
      html.style.scrollBehavior;

    html.style.scrollBehavior =
      'auto';

    target.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    });

    window.requestAnimationFrame(
      () => {
        html.style.scrollBehavior =
          previousScrollBehavior;
      }
    );

    window.history.replaceState(
      null,
      '',
      href
    );
  };

  const navigateWithTransition = (
    event:
      MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    if (
      isTransitioningRef.current
    ) {
      return;
    }

    const target =
      document.querySelector<HTMLElement>(
        href
      );

    if (!target) return;

    const prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    if (prefersReducedMotion) {
      setIsOpen(false);
      scrollToTarget(href);
      return;
    }

    isTransitioningRef.current =
      true;

    setIsOpen(false);

    document.body.style.overflow =
      'hidden';

    /*
     * 1. Serranda in chiusura.
     */
    setTransitionPhase(
      'closing'
    );

    wait(() => {
      /*
       * 2. Serranda completamente chiusa.
       * Lo spostamento avviene mentre
       * l'utente non può vedere la pagina.
       */
      setTransitionPhase(
        'closed'
      );

      scrollToTarget(href);

      /*
       * 3. Brevissima pausa meccanica.
       */
      wait(() => {
        /*
         * 4. La serranda comincia a salire.
         * I fari sono dietro la serranda:
         * diventano quindi visibili solo
         * mentre questa si apre.
         */
        setTransitionPhase(
          'opening'
        );

        /*
         * 5. Fine sequenza.
         */
        wait(() => {
          setTransitionPhase(
            'idle'
          );

          isTransitioningRef.current =
            false;

          document.body.style.overflow =
            '';
        }, OPEN_MS);
      }, CLOSED_HOLD_MS);
    }, CLOSE_MS);
  };

  const handleBrandClick = (
    event:
      MouseEvent<HTMLAnchorElement>
  ) => {
    navigateWithTransition(
      event,
      '#top'
    );
  };

  const transitionClassName =
    transitionPhase === 'idle'
      ? 'garage-transition'
      : `garage-transition garage-transition--active garage-transition--${transitionPhase}`;

  return (
    <>
      <header className="navbar">
        <a
          href="#top"
          className="navbar__brand"
          aria-label="Autorimessa Da Taibi - Home"
          onClick={handleBrandClick}
        >
          <span className="navbar__brand-mark">
            <span>DT</span>
          </span>

          <span className="navbar__brand-copy">
            <span className="navbar__brand-name">
              DA TAIBI
            </span>

            <span className="navbar__brand-subtitle">
              AUTORIMESSA · TORINO
            </span>
          </span>
        </a>

        <nav
          className="navbar__menu"
          aria-label="Navigazione principale"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
              onClick={(event) =>
                navigateWithTransition(
                  event,
                  link.href
                )
              }
            >
              <span className="navbar__number">
                {link.number}
              </span>

              <span className="navbar__label">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={
            isOpen
              ? 'navbar__toggle navbar__toggle--open'
              : 'navbar__toggle'
          }
          aria-label={
            isOpen
              ? 'Chiudi menu'
              : 'Apri menu'
          }
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setIsOpen(
              (current) => !current
            )
          }
        >
          <span className="navbar__toggle-inner">
            <span className="navbar__toggle-line" />
            <span className="navbar__toggle-line" />
            <span className="navbar__toggle-line" />
          </span>
        </button>
      </header>

      <div
        id="mobile-navigation"
        className={
          isOpen
            ? 'navbar__mobile navbar__mobile--open'
            : 'navbar__mobile'
        }
        aria-hidden={!isOpen}
      >
        <div className="navbar__mobile-header">
          <span className="navbar__mobile-header-line" />

          <span>
            NAVIGATION SYSTEM
          </span>
        </div>

        <nav
          className="navbar__mobile-menu"
          aria-label="Navigazione mobile"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              onClick={(event) =>
                navigateWithTransition(
                  event,
                  link.href
                )
              }
            >
              <span className="navbar__mobile-number">
                {link.number}
              </span>

              <span className="navbar__mobile-label">
                {link.label}
              </span>

              <span
                className="navbar__mobile-arrow"
                aria-hidden="true"
              >
                ↘
              </span>
            </a>
          ))}
        </nav>

        <div className="navbar__mobile-footer">
          <span>
            DA TAIBI
            <br />
            AUTORIMESSA
          </span>

          <span className="navbar__mobile-footer-right">
            VIA BREGLIO 111
            <br />
            TORINO
          </span>
        </div>
      </div>

      <div
        className={
          transitionClassName
        }
        aria-hidden="true"
      >
        <div className="garage-transition__blackout" />

        <div className="garage-transition__interior">
          <div className="garage-transition__car-shadow" />
        </div>

        <div className="garage-transition__lighting">
          <div className="garage-transition__floor" />

          <div className="garage-transition__lamp-bloom garage-transition__lamp-bloom--left" />

          <div className="garage-transition__lamp-bloom garage-transition__lamp-bloom--right" />

          <div className="garage-transition__flare garage-transition__flare--left" />

          <div className="garage-transition__flare garage-transition__flare--right" />

          <div className="garage-transition__lamp garage-transition__lamp--left">
            <div className="garage-transition__lamp-housing" />

            <div className="garage-transition__lamp-led" />
          </div>

          <div className="garage-transition__lamp garage-transition__lamp--right">
            <div className="garage-transition__lamp-housing" />

            <div className="garage-transition__lamp-led" />
          </div>

          <div className="garage-transition__exposure" />

          <div className="garage-transition__sensor-glare" />
        </div>

        <div className="garage-transition__shutter">
          <div className="garage-transition__grain" />

          <div className="garage-transition__reflection" />

          <span className="garage-transition__shutter-label">
            AUTORIMESSA DA TAIBI
          </span>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: navbarStyles,
        }}
      />
    </>
  );
}