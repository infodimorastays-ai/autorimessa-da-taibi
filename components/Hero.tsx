'use client';

import { useEffect, useRef } from 'react';
import {
  requestScrollFrame,
  subscribeScrollFrame,
} from '../lib/scrollFrame';

const HERO_VIDEO_URL =
  'https://pub-fd03e0c0deb14bfda1dea88f5eb37f8b.r2.dev/hero_video_nu1atx.mp4';

const WHATSAPP_URL =
  'https://wa.me/393281693326';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place//data=!4m2!3m1!1s0x47886d20eae2a6d9:0xef1441f915874180?sa=X&ved=1t:8290&ictx=111';

const heroStyles = `
  .hero {
    --transition-progress: 0;

    position: sticky;
    top: 0;
    z-index: 1;

    width: 100%;
    height: var(--viewport-height, 100svh);
    min-height: 620px;

    overflow: hidden;
    isolation: isolate;

    background: #050505;

    transform-origin: 50% 15%;

    transform:
      perspective(1400px)
      translateY(
        calc(
          var(--transition-progress) *
          -7vh
        )
      )
      translateZ(
        calc(
          var(--transition-progress) *
          -240px
        )
      )
      rotateX(
        calc(
          var(--transition-progress) *
          4deg
        )
      )
      scale(
        calc(
          1 -
          var(--transition-progress) *
          0.075
        )
      );

    filter:
      brightness(
        calc(
          1 -
          var(--transition-progress) *
          0.48
        )
      );

    border-radius:
      calc(
        var(--transition-progress) *
        28px
      );

    will-change: transform;

    backface-visibility: hidden;
  }

  .hero.hero--covered {
    visibility: hidden;
    pointer-events: none;
  }

  .hero__video {
    position: absolute;
    inset: 0;
    z-index: 0;

    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;
  }

  .hero__overlay {
    position: absolute;
    inset: 0;
    z-index: 1;

    background:
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.68) 0%,
        rgba(0, 0, 0, 0.12) 32%,
        rgba(0, 0, 0, 0.18) 55%,
        rgba(0, 0, 0, 0.84) 100%
      ),
      linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.34) 0%,
        rgba(0, 0, 0, 0) 58%
      );
  }

  .hero__content {
    position: absolute;

    left: var(--layout-inline);
    right: var(--layout-inline);
    bottom: 92px;

    z-index: 3;

    width: auto;
    max-width: 1120px;
  }

  .hero__eyebrow {
    margin: 0 0 14px;

    font-size: 10px;
    font-weight: 600;
    line-height: 1;

    letter-spacing: 0.22em;

    color:
      rgba(255, 255, 255, 0.7);
  }

  .hero__title {
    display: flex;
    flex-direction: column;

    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(
        54px,
        7.5vw,
        122px
      );

    font-weight: 400;

    line-height: 0.84;

    letter-spacing: -0.065em;

    text-transform: uppercase;
  }

  .hero__title-line {
    display: block;
  }

  .hero__title-line--outline {
    color: transparent;

    -webkit-text-stroke:
      1.25px
      rgba(255, 255, 255, 0.9);
  }

  .hero__info {
    display: flex;

    align-items: flex-end;

    justify-content: space-between;

    gap: 40px;

    width:
      min(
        960px,
        100%
      );

    margin-top: 24px;
  }

  .hero__description {
    max-width: 500px;

    margin: 0;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size:
      clamp(
        17px,
        1.45vw,
        21px
      );

    font-weight: 500;

    line-height: 1.32;

    letter-spacing: -0.018em;

    color:
      rgba(255, 255, 255, 0.84);
  }

  .hero__cta {
    display: inline-flex;

    align-items: center;

    gap: 14px;

    flex-shrink: 0;

    padding-bottom: 7px;

    border-bottom:
      1px solid
      rgba(255, 255, 255, 0.3);

    font-size: 10px;
    font-weight: 600;
    line-height: 1;

    letter-spacing: 0.12em;

    transition:
      gap 200ms ease,
      border-color 200ms ease;
  }

  .hero__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    flex-shrink: 0;
  }

  .hero__whatsapp {
    position: relative;

    display: inline-flex;
    align-items: center;
    gap: 12px;

    overflow: hidden;
    isolation: isolate;

    padding: 13px 16px;

    background: #f7f6f1;
    color: #07985f;

    border:
      1px solid
      rgba(255, 255, 255, 0.72);

    box-shadow:
      0 9px 26px
      rgba(0, 0, 0, 0.24),
      0 0 22px
      rgba(38, 190, 119, 0.08);

    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;

    text-shadow:
      0 1px 10px
      rgba(7, 152, 95, 0.2);

    transition:
      color 220ms ease,
      box-shadow 260ms ease,
      transform 220ms ease;
  }

  .hero__whatsapp::before {
    content: '';

    position: absolute;
    z-index: -1;
    inset: -2px;

    background:
      linear-gradient(
        112deg,
        transparent 26%,
        rgba(81, 224, 156, 0.08) 38%,
        rgba(81, 224, 156, 0.42) 50%,
        rgba(255, 255, 255, 0.72) 58%,
        transparent 72%
      );

    transform:
      translateX(-125%);

    transition:
      transform 620ms
      cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hero__whatsapp span {
    position: relative;
    z-index: 1;
  }

  .hero__whatsapp:hover,
  .hero__whatsapp:focus-visible {
    color: #00ad69;

    box-shadow:
      0 13px 34px
      rgba(0, 0, 0, 0.28),
      0 0 30px
      rgba(38, 203, 127, 0.18);

    transform:
      translateY(-2px);
  }

  .hero__whatsapp:hover::before,
  .hero__whatsapp:focus-visible::before {
    transform:
      translateX(125%);
  }

  .hero__cta:hover,
  .hero__cta:focus-visible {
    gap: 21px;

    border-color: #ffffff;
  }

  .hero__bottom {
    position: absolute;

    left: var(--layout-inline);
    right: var(--layout-inline);
    bottom: 24px;

    z-index: 4;

    display: flex;
    align-items: flex-end;

    justify-content: space-between;
  }

  .hero__address {
    display: flex;
    align-items: center;

    gap: 9px;

    font-size: 9px;
    font-weight: 500;
    line-height: 1;

    letter-spacing: 0.13em;

    color:
      rgba(255, 255, 255, 0.72);
  }

  .hero__address-label {
    color:
      rgba(255, 255, 255, 0.42);
  }

  .hero__address-arrow {
    font-size: 12px;
  }

  .hero__scroll {
    display: flex;
    align-items: center;

    gap: 12px;

    font-size: 9px;
    font-weight: 500;
    line-height: 1;

    letter-spacing: 0.18em;

    color:
      rgba(255, 255, 255, 0.52);
  }

  .hero__scroll-line {
    width: 38px;
    height: 1px;

    background:
      rgba(255, 255, 255, 0.55);
  }

  @media (max-width: 1100px) {
    .hero__content {
      left: var(--layout-inline);
      right: var(--layout-inline);
      bottom: 88px;
    }

    .hero__title {
      font-size:
        clamp(
          52px,
          8.2vw,
          92px
        );
    }

    .hero__bottom {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }
  }

  @media (max-width: 768px) {
    .hero {
      min-height: 640px;

      transform:
        perspective(1000px)
        translateY(
          calc(
            var(--transition-progress) *
            -5vh
          )
        )
        translateZ(
          calc(
            var(--transition-progress) *
            -140px
          )
        )
        rotateX(
          calc(
            var(--transition-progress) *
            2.5deg
          )
        )
        scale(
          calc(
            1 -
            var(--transition-progress) *
            0.055
          )
        );
    }

    .hero__content {
      left: var(--layout-inline);
      right: var(--layout-inline);
      bottom: 105px;
    }

    .hero__title {
      font-size:
        clamp(
          46px,
          14vw,
          78px
        );

      line-height: 0.88;
    }

    .hero__info {
      display: block;

      width: 100%;

      margin-top: 22px;
    }

    .hero__description {
      max-width: 390px;

      font-size: 18px;

      line-height: 1.32;
    }

    .hero__cta {
      margin-top: 0;
    }

    .hero__actions {
      margin-top: 22px;
    }

    .hero__bottom {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .hero__address-label {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .hero__content {
      left: var(--layout-inline);
      right: var(--layout-inline);
      bottom: 98px;
    }

    .hero__title {
      font-size:
        clamp(
          43px,
          14.5vw,
          68px
        );
    }

    .hero__description {
      max-width: 330px;

      font-size: 17px;

      line-height: 1.32;
    }

    .hero__bottom {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .hero__address {
      font-size: 10px;
    }

    .hero__scroll span {
      display: none;
    }

    .hero__scroll-line {
      width: 28px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero {
      transform: none;
      filter: none;
    }

    .hero__cta {
      transition: none;
    }

    .hero__whatsapp {
      transition: none;
    }

    .hero__whatsapp::before {
      display: none;
    }
  }
`;

export default function Hero() {
  const heroRef =
    useRef<HTMLElement>(null);

  const videoRef =
    useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;

    const intro =
      document.querySelector<HTMLElement>(
        '#autorimessa'
      );

    if (!hero || !intro || !video) return;

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

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

    let introDocumentTop =
      getDocumentTop(intro);

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
        introDocumentTop =
          getDocumentTop(intro);
      }

      const distanceIntoTransition =
        scrollY -
        (
          introDocumentTop -
          viewportHeight
        );

      const progress = clamp(
        distanceIntoTransition /
          viewportHeight
      );

      hero.style.setProperty(
        '--transition-progress',
        progress.toString()
      );

      intro.style.setProperty(
        '--transition-progress',
        progress.toString()
      );

      if (progress === 1) {
        hero.classList.add(
          'hero--covered'
        );
      } else {
        hero.classList.remove(
          'hero--covered'
        );
      }

      const shouldPlay =
        !motionPreference.matches &&
        !document.hidden &&
        progress < 0.995;

      if (shouldPlay && video.paused) {
        void video.play().catch(() => {});
      } else if (!shouldPlay && !video.paused) {
        video.pause();
      }
    };

    const unsubscribe =
      subscribeScrollFrame(
        updateAnimation
      );

    const requestUpdate = () => {
      requestScrollFrame();
    };

    motionPreference.addEventListener(
      'change',
      requestUpdate
    );

    document.addEventListener(
      'visibilitychange',
      requestUpdate
    );

    return () => {
      unsubscribe();

      motionPreference.removeEventListener(
        'change',
        requestUpdate
      );

      document.removeEventListener(
        'visibilitychange',
        requestUpdate
      );
    };
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="hero"
        aria-labelledby="hero-title"
      >
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src={HERO_VIDEO_URL}
            type="video/mp4"
          />
        </video>

        <div
          className="hero__overlay"
          aria-hidden="true"
        />

        <div className="hero__content">
          <p className="hero__eyebrow">
            AUTORIMESSA · TORINO
          </p>

          <h1
            id="hero-title"
            className="hero__title"
          >
            <span className="hero__title-line">
              IL TUO POSTO.
            </span>

            <span className="hero__title-line hero__title-line--outline">
              LA TUA CITTÀ.
            </span>
          </h1>

          <div className="hero__info">
            <p className="hero__description">
              Parcheggio custodito a Torino
              per auto, moto, SUV, furgoni,
              van e camper. Accesso H24 e
              videosorveglianza.
            </p>

            <div className="hero__actions">
              <a
                href={WHATSAPP_URL}
                className="hero__whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contatta Autorimessa Da Taibi su WhatsApp"
              >
                <span>SCRIVICI SU WHATSAPP</span>
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href="#autorimessa"
                className="hero__cta"
              >
                <span>
                  SCOPRI L&apos;AUTORIMESSA
                </span>

                <span aria-hidden="true">
                  ↘
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero__bottom">
          <a
            href={GOOGLE_MAPS_URL}
            className="hero__address"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apri Autorimessa Da Taibi, Via Breglio 111 Torino, su Google Maps"
          >
            <span className="hero__address-label">
              TORINO
            </span>

            <span>
              VIA BREGLIO, 111
            </span>

            <span
              className="hero__address-arrow"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>

          <div
            className="hero__scroll"
            aria-hidden="true"
          >
            <span>SCROLL</span>

            <div className="hero__scroll-line" />
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: heroStyles,
        }}
      />
    </>
  );
}
