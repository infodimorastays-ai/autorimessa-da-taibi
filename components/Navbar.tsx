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

const BRAND_LOGO_URL =
  'https://pub-fd03e0c0deb14bfda1dea88f5eb37f8b.r2.dev/brand/autorimessa-da-taibi-logo.webp';

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
    padding:
      24px
      var(--layout-inline);

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
    display: block;

    flex-shrink: 0;

    color: #ffffff;
  }

  .navbar__brand-logo {
    display: block;

    width:
      clamp(148px, 11.5vw, 176px);
    height: auto;

    filter:
      drop-shadow(
        0 8px 18px
        rgba(0, 0, 0, 0.5)
      );
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
      var(--layout-inline)
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
    left: var(--layout-inline);

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

    left: var(--layout-inline);
    right: var(--layout-inline);
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

  .garage-transition::before,
  .garage-transition::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 8;
    width: clamp(11px, 1.45vw, 25px);
    pointer-events: none;
  }

  .garage-transition::before {
    left: 0;
    background: linear-gradient(90deg, #090d0e, #374043 34%, #a3abad 48%, #343d40 65%, #111719);
    box-shadow: 8px 0 22px rgba(0, 0, 0, 0.55);
  }

  .garage-transition::after {
    right: 0;
    background: linear-gradient(90deg, #111719, #343d40 35%, #a3abad 52%, #374043 66%, #090d0e);
    box-shadow: -8px 0 22px rgba(0, 0, 0, 0.55);
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
     BRUSHED ALUMINUM SHUTTER
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
        rgba(0, 0, 0, 0.34) 0%,
        rgba(255, 255, 255, 0.13) 14%,
        rgba(0, 0, 0, 0.05) 38%,
        rgba(255, 255, 255, 0.08) 69%,
        rgba(0, 0, 0, 0.33) 100%
      ),
      repeating-linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.018) 0px,
        transparent 1px,
        rgba(0, 0, 0, 0.022) 3px,
        transparent 5px
      ),
      repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent 88px,
        rgba(0, 0, 0, 0.055) 91px,
        transparent 177px,
        rgba(255, 255, 255, 0.035) 181px,
        transparent 263px
      ),
      repeating-linear-gradient(
        to bottom,
        #939b9d 0px,
        #cbd0d0 2px,
        #d2d5d4 4px,
        #afb7b8 11px,
        #929b9d 23px,
        #747e80 34px,
        #4a5457 41px,
        #283134 44px,
        #1c2427 46px,
        #9da7a9 49px,
        #bac1c1 52px
      );

    box-shadow:
      inset 0 0 130px
      rgba(0, 0, 0, 0.23),

      inset 0 0 2px
      rgba(255, 255, 255, 0.2),

      0 24px 76px
      rgba(0, 0, 0, 0.88);

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
      repeating-linear-gradient(
        to bottom,
        transparent 0px,
        rgba(255, 255, 255, 0.016) 2px,
        transparent 3px,
        rgba(0, 0, 0, 0.012) 5px,
        transparent 7px
      ),
      linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.2) 0%,
        transparent 21%,
        rgba(255, 255, 255, 0.06) 37%,
        transparent 53%,
        rgba(255, 255, 255, 0.03) 77%,
        rgba(0, 0, 0, 0.19) 100%
      );

    mix-blend-mode: overlay;

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
      0 10px 14px
      rgba(0, 0, 0, 0.72),

      0 30px 52px
      rgba(0, 0, 0, 0.44);
  }

  .garage-transition__grain {
    position: absolute;
    inset: 0;

    z-index: 2;

    opacity: 0.1;

    background:
      repeating-linear-gradient(
        to bottom,
        transparent 0px,
        rgba(255, 255, 255, 0.02) 1px,
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

    width: 20%;

    opacity: 0;

    background:
      linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.025) 38%,
        rgba(255, 255, 255, 0.06) 50%,
        rgba(255, 255, 255, 0.018) 62%,
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
    top: 45%;

    z-index: 4;

    transform:
      translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;

    width: min(90vw, 1100px);

    font-family:
      'Archivo Black',
      sans-serif;

    font-weight: 900;

    line-height: 0.96;

    letter-spacing: 0.015em;

    color: #1b262a;

    text-shadow:
      0 1px 0 rgba(255, 255, 255, 0.28),
      1px 2px 3px rgba(0, 0, 0, 0.23);

    white-space: nowrap;
  }

  .garage-transition__shutter-label span:first-child {
    font-size: clamp(32px, 5.8vw, 94px);
  }

  .garage-transition__shutter-label span:last-child {
    font-size: clamp(44px, 7.4vw, 120px);
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
    top: 72%;

    width:
      min(
        690px,
        68vw
      );

    height:
      min(
        95px,
        12vh
      );

    transform:
      translate(
        -50%,
        -50%
      );

    border-radius: 50%;

    background:
      radial-gradient(
        ellipse at center,
        rgba(35, 40, 43, 0.26) 0%,
        rgba(7, 8, 9, 0.12) 48%,
        transparent 72%
      );

    filter:
      blur(18px);

    opacity: 0.45;
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

    top: 60.8%;

    width:
      clamp(
        150px,
        17vw,
        295px
      );

    height:
      clamp(
        22px,
        2vw,
        34px
      );

    opacity: 0;

    transform:
      translateY(-50%)
      scaleX(0.92);

    will-change:
      opacity,
      transform;
  }

  .garage-transition__lamp--left {
    left: 18.5%;
  }

  .garage-transition__lamp--right {
    top: 61.5%;
    right: 18%;
    width: clamp(140px, 16vw, 275px);
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
        5px,
        0.55vw,
        9px
      );

    transform:
      translateY(-50%)
      skewX(-12deg);

    border-radius: 100%;

    background:
      linear-gradient(
        90deg,
        rgba(190, 225, 245, 0.15) 0%,
        #dcf4ff 7%,
        #ffffff 22%,
        #ffffff 80%,
        #d2efff 93%,
        rgba(190, 225, 245, 0.2) 100%
      );

    box-shadow:
      0 0 4px 2px
      rgba(255, 255, 255, 1),

      0 0 13px 5px
      rgba(240, 251, 255, 0.98),

      0 0 32px 11px
      rgba(220, 242, 255, 0.85),

      0 0 76px 18px
      rgba(196, 229, 255, 0.58),

      0 0 130px 30px
      rgba(179, 216, 248, 0.33);
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

  .garage-transition--opening
  .garage-transition__lamp--right {
    animation-delay: 70ms;
    animation-duration: ${OPEN_MS - 70}ms;
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
        rgba(215, 239, 255, 0.1) 14%,
        rgba(248, 253, 255, 0.58) 42%,
        rgba(255, 255, 255, 1) 50%,
        rgba(248, 253, 255, 0.58) 58%,
        rgba(215, 239, 255, 0.1) 86%,
        transparent 100%
      );

    filter:
      blur(0.7px);

    box-shadow:
      0 0 10px
      rgba(255, 255, 255, 0.95),

      0 0 32px
      rgba(226, 243, 255, 0.75);
  }

  .garage-transition__flare--left {
    left: 5%;
  }

  .garage-transition__flare--right {
    top: 61.5%;
    right: 5%;
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

    width: 44vw;
    height: 41vh;

    opacity: 0;

    transform:
      translateY(-50%)
      scale(0.6);

    border-radius: 50%;

    filter:
      blur(26px);

    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(249, 253, 255, 0.9) 8%,
        rgba(224, 244, 255, 0.56) 27%,
        rgba(200, 233, 255, 0.18) 48%,
        transparent 72%
      );
  }

  .garage-transition__lamp-bloom--left {
    left: 0;
  }

  .garage-transition__lamp-bloom--right {
    top: 61.5%;
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
        ellipse at 23% 61%,
        rgba(255, 255, 255, 0.96) 0%,
        rgba(247, 253, 255, 0.72) 9%,
        rgba(220, 242, 255, 0.24) 27%,
        transparent 51%
      ),
      radial-gradient(
        ellipse at 76% 62%,
        rgba(255, 255, 255, 0.94) 0%,
        rgba(247, 253, 255, 0.68) 9%,
        rgba(220, 242, 255, 0.22) 27%,
        transparent 51%
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
        233,
        246,
        255,
        0.54
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
        rgba(247, 252, 255, 0.72) 0%,
        rgba(229, 244, 255, 0.36) 31%,
        rgba(210, 235, 255, 0.08) 56%,
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
      opacity: 0.16;
    }

    75% {
      opacity: 0.09;
    }

    100% {
      left: 112%;
      opacity: 0;
    }
  }

  @keyframes realistic-lamp {
    0%,
    21% {
      opacity: 0;

      transform:
        translateY(-50%)
        scaleX(0.92);
    }

    28% {
      opacity: 0.26;
    }

    32% {
      opacity: 0.84;
    }

    37% {
      opacity: 0.65;
    }

    43% {
      opacity: 1;

      transform:
        translateY(-50%)
        scaleX(1);
    }

    78% {
      opacity: 1;

      transform:
        translateY(-50%)
        scaleX(1);
    }

    90% {
      opacity: 0.72;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes realistic-flare {
    0%,
    38% {
      opacity: 0;
    }

    50% {
      opacity: 0.62;
    }

    78% {
      opacity: 0.88;
    }

    90% {
      opacity: 0.32;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes realistic-bloom {
    0%,
    33% {
      opacity: 0;

      transform:
        translateY(-50%)
        scale(0.55);
    }

    43% {
      opacity: 0.38;
    }

    65% {
      opacity: 0.86;

      transform:
        translateY(-50%)
        scale(1);
    }

    80% {
      opacity: 0.98;

      transform:
        translateY(-50%)
        scale(1.18);
    }

    91% {
      opacity: 0.42;
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
    32% {
      opacity: 0;
    }

    52% {
      opacity: 0.32;
    }

    75% {
      opacity: 0.58;
    }

    92% {
      opacity: 0.32;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes sensor-glare {
    0%,
    57% {
      opacity: 0;
    }

    78% {
      opacity: 0.36;
    }

    88% {
      opacity: 0.3;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes floor-reflection {
    0%,
    35% {
      opacity: 0;

      transform:
        translateX(-50%)
        scaleX(0.45);
    }

    52% {
      opacity: 0.3;
    }

    76% {
      opacity: 0.68;

      transform:
        translateX(-50%)
        scaleX(1);
    }

    90% {
      opacity: 0.28;
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
        var(--layout-inline);
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
      padding:
        20px
        var(--layout-inline);
    }

    .navbar__brand-logo {
      width: 148px;
    }

    .garage-transition__lamp {
      top: 62%;

      width: 29vw;
      min-width: 130px;

      height: 23px;
    }

    .garage-transition__lamp--left {
      left: 8%;
    }

    .garage-transition__lamp--right {
      top: 62.4%;
      right: 7%;
    }

    .garage-transition__flare {
      top: 62%;

      width: 46vw;
    }

    .garage-transition__lamp-bloom {
      top: 62%;

      width: 53vw;
    }

    .garage-transition__lamp-bloom--left {
      left: -5%;
    }

    .garage-transition__lamp-bloom--right {
      top: 62.4%;
      right: -5%;
    }
  }

  @media (max-width: 480px) {
    .navbar {
      padding:
        17px
        var(--layout-inline);
    }

    .navbar__brand-logo {
      width: 132px;
    }

    .navbar__toggle {
      width: 43px;
      height: 38px;
    }

    .navbar__mobile {
      padding:
        100px
        var(--layout-inline)
        30px;
    }

    .navbar__mobile-header {
      top: 91px;
      left: var(--layout-inline);
    }

    .navbar__mobile-link {
      grid-template-columns:
        30px
        1fr
        auto;

      min-height: 61px;
    }

    .navbar__mobile-footer {
      left: var(--layout-inline);
      right: var(--layout-inline);
      bottom: 22px;
    }

    .garage-transition__shutter {
      background:
        linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.31) 0%,
          rgba(255, 255, 255, 0.11) 23%,
          rgba(0, 0, 0, 0.05) 51%,
          rgba(255, 255, 255, 0.08) 74%,
          rgba(0, 0, 0, 0.31) 100%
        ),
        repeating-linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.018) 0px,
          transparent 1px,
          rgba(0, 0, 0, 0.022) 3px,
          transparent 5px
        ),
        repeating-linear-gradient(
          to bottom,
          transparent 0px,
          transparent 73px,
          rgba(0, 0, 0, 0.055) 76px,
          transparent 145px,
          rgba(255, 255, 255, 0.035) 149px,
          transparent 211px
        ),
        repeating-linear-gradient(
          to bottom,
          #939b9d 0px,
          #cbd0d0 2px,
          #d2d5d4 4px,
          #aeb6b7 8px,
          #929b9d 17px,
          #737d80 26px,
          #4b5558 31px,
          #283134 34px,
          #1c2427 36px,
          #9da7a9 39px,
          #bac1c1 42px
        );
    }

    .garage-transition__lamp {
      top: 62%;

      width: 34vw;
      min-width: 120px;

      height: 22px;
    }

    .garage-transition__lamp--left {
      left: 6%;
    }

    .garage-transition__lamp--right {
      top: 62.4%;
      right: 5%;
      width: 32vw;
      min-width: 112px;
    }

    .garage-transition__flare {
      top: 62%;
      width: 52vw;
    }

    .garage-transition__lamp-bloom {
      top: 62%;
      width: 60vw;
    }

    .garage-transition__lamp-bloom--left {
      left: -9%;
    }

    .garage-transition__lamp-bloom--right {
      top: 62.4%;
      right: -9%;
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

const scrollToTarget = (
  href: string,
  behavior: ScrollBehavior = 'auto',
  historyMode: 'push' | 'replace' = 'replace'
) => {
  const target = document.getElementById(
    href.slice(1)
  );

  if (!target) return;

  let top = 0;

  if (target !== document.querySelector('main')) {
    const sections = document.querySelectorAll<HTMLElement>('main > section');

    for (const section of Array.from(sections)) {
      if (section === target) break;
      top += parseFloat(window.getComputedStyle(section).height);
    }
  }

  const html = document.documentElement;
  const previousScrollBehavior = html.style.scrollBehavior;

  if (behavior === 'auto') {
    html.style.scrollBehavior = 'auto';
  }

  window.scrollTo({ top, behavior });

  if (behavior === 'auto') {
    window.requestAnimationFrame(() => {
      html.style.scrollBehavior = previousScrollBehavior;
    });
  }

  window.history[historyMode === 'push' ? 'pushState' : 'replaceState'](
    null,
    '',
    href
  );

  const heading = target.querySelector<HTMLElement>('h1, h2');

  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
};

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

  const toggleRef =
    useRef<HTMLButtonElement>(null);

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
        toggleRef.current?.focus();
      }

      if (event.key === 'Tab') {
        const first = toggleRef.current;
        const last = document.querySelector<HTMLAnchorElement>(
          '.navbar__mobile-link:last-child'
        );

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
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
    const timers = timersRef.current;

    return () => {
      timers.forEach(
        (timer) => {
          window.clearTimeout(timer);
        }
      );

      document.body.style.overflow =
        '';
    };
  }, []);

  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash) {
        scrollToTarget(window.location.hash);
      }
    };

    const initialFrame = window.requestAnimationFrame(syncHash);

    window.addEventListener('hashchange', syncHash);

    const handleSectionLink = (event: globalThis.MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) return;

      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = anchor?.getAttribute('href');

      if (
        !href ||
        href.length < 2 ||
        anchor?.closest('.navbar, .navbar__mobile')
      ) return;

      event.preventDefault();

      scrollToTarget(
        href,
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        'push'
      );
    };

    document.addEventListener('click', handleSectionLink);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('hashchange', syncHash);
      document.removeEventListener('click', handleSectionLink);
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="navbar__brand-logo"
            src={BRAND_LOGO_URL}
            alt=""
            width="720"
            height="208"
            decoding="async"
          />
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
          ref={toggleRef}
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
            <span>AUTORIMESSA</span>
            <span>DA TAIBI</span>
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
