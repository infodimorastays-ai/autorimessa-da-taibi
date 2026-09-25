'use client';

import { useEffect, useRef } from 'react';

const introStyles = `
  .intro-section {
    --transition-progress: 0;
    --out-progress: 0;

    position: sticky;
    top: 0;
    z-index: 5;

    width: 100%;
    height: 100svh;
    min-height: 620px;

    background: #0a0a0a;

    border-radius: 30px 30px 0 0;

    box-shadow:
      0 -35px 100px
      rgba(0, 0, 0, 0.55);

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

    will-change:
      transform,
      filter;

    backface-visibility: hidden;
  }

  .intro-section::before {
    content: '';

    position: absolute;

    top: 0;
    left: 40px;
    right: 40px;

    height: 1px;

    background:
      rgba(255, 255, 255, 0.12);
  }

  .intro-section__inner {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding:
      clamp(70px, 8vw, 120px)
      40px
      34px;
  }

  .intro-section__top {
    display: flex;
    align-items: center;

    gap: 16px;
  }

  .intro-section__index {
    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;
    line-height: 1;

    letter-spacing: 0.14em;

    color:
      rgba(255, 255, 255, 0.35);
  }

  .intro-section__label {
    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 10px;
    font-weight: 600;
    line-height: 1;

    letter-spacing: 0.18em;

    color:
      rgba(255, 255, 255, 0.72);
  }

  .intro-section__content {
    display: grid;

    grid-template-columns:
      minmax(0, 1.5fr)
      minmax(280px, 0.5fr);

    align-items: end;

    gap:
      clamp(50px, 8vw, 140px);

    flex: 1;

    padding:
      clamp(80px, 12vh, 150px)
      0;
  }

  .intro-section__title {
    display: flex;
    flex-direction: column;

    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(58px, 8vw, 138px);

    font-weight: 400;

    line-height: 0.85;

    letter-spacing: -0.065em;

    text-transform: uppercase;
  }

  .intro-section__title span {
    color: transparent;

    -webkit-text-stroke:
      1.2px
      rgba(255, 255, 255, 0.72);
  }

  .intro-section__copy {
    display: flex;
    flex-direction: column;

    gap: 18px;

    max-width: 420px;

    padding-bottom: 10px;
  }

  .intro-section__copy p {
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
      rgba(255, 255, 255, 0.6);
  }

  .intro-section__copy p:first-child {
    color:
      rgba(255, 255, 255, 0.9);
  }

  .intro-section__footer {
    display: grid;

    grid-template-columns:
      repeat(3, 1fr);

    gap: 24px;

    padding-top: 24px;

    border-top:
      1px solid
      rgba(255, 255, 255, 0.12);
  }

  .intro-section__detail {
    display: flex;
    flex-direction: column;

    gap: 8px;

    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 12px;
    font-weight: 500;

    letter-spacing: 0.02em;

    color:
      rgba(255, 255, 255, 0.82);
  }

  .intro-section__detail-label {
    font-family:
      var(--font-clash-display),
      sans-serif;

    font-size: 8px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(255, 255, 255, 0.35);
  }

  @media (max-width: 1100px) {
    .intro-section::before {
      left: 28px;
      right: 28px;
    }

    .intro-section__inner {
      padding-left: 28px;
      padding-right: 28px;
    }

    .intro-section__content {
      gap: 60px;
    }
  }

  @media (max-width: 768px) {
    .intro-section {
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

    .intro-section::before {
      left: 20px;
      right: 20px;
    }

    .intro-section__inner {
      padding:
        68px
        20px
        28px;
    }

    .intro-section__content {
      display: block;

      padding: 90px 0;
    }

    .intro-section__title {
      font-size:
        clamp(48px, 13vw, 78px);

      line-height: 0.88;
    }

    .intro-section__copy {
      max-width: 390px;

      margin-top: 52px;
    }

    .intro-section__copy p {
      font-size: 17px;

      line-height: 1.38;
    }

    .intro-section__footer {
      grid-template-columns: 1fr;

      gap: 20px;
    }

    .intro-section__detail {
      flex-direction: row;
      align-items: center;

      justify-content:
        space-between;

      padding-bottom: 16px;

      border-bottom:
        1px solid
        rgba(255, 255, 255, 0.1);
    }

    .intro-section__detail:last-child {
      border-bottom: 0;
    }
  }

  @media (max-width: 480px) {
    .intro-section::before {
      left: 17px;
      right: 17px;
    }

    .intro-section__inner {
      padding-left: 17px;
      padding-right: 17px;
    }

    .intro-section__content {
      padding-top: 75px;
      padding-bottom: 75px;
    }

    .intro-section__title {
      font-size:
        clamp(42px, 13.5vw, 64px);
    }

    .intro-section__copy {
      margin-top: 44px;
    }

    .intro-section__copy p {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) and (max-height: 700px) {
    .intro-section__inner {
      padding-top: 42px;
      padding-bottom: 18px;
    }

    .intro-section__content {
      padding: 35px 0;
    }

    .intro-section__copy {
      margin-top: 28px;
    }

    .intro-section__footer {
      gap: 10px;
    }

    .intro-section__detail {
      padding-bottom: 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .intro-section {
      transform: none;
      filter: none;
    }
  }
`;

export default function IntroSection() {
  const introRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const intro = introRef.current;

    const services =
      document.querySelector<HTMLElement>(
        '#servizi'
      );

    if (!intro || !services) return;

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

      const servicesDocumentTop =
        getDocumentTop(services);

      const distanceIntoTransition =
        window.scrollY -
        (
          servicesDocumentTop -
          viewportHeight
        );

      const progress = clamp(
        distanceIntoTransition /
          viewportHeight
      );

      intro.style.setProperty(
        '--out-progress',
        progress.toString()
      );

      services.style.setProperty(
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
        ref={introRef}
        id="autorimessa"
        className="intro-section"
        aria-labelledby="intro-title"
      >
        <div className="intro-section__inner">
          <div className="intro-section__top">
            <span className="intro-section__index">
              01
            </span>

            <span className="intro-section__label">
              AUTORIMESSA
            </span>
          </div>

          <div className="intro-section__content">
            <h2
              id="intro-title"
              className="intro-section__title"
            >
              NON È SOLO
              <span>UN POSTO AUTO.</span>
            </h2>

            <div className="intro-section__copy">
              <p>
                Da Taibi è uno spazio urbano
                pensato per chi cerca comodità,
                sicurezza e praticità ogni giorno.
              </p>

              <p>
                Auto e moto, soste brevi o
                soluzioni continuative:
                un&apos;autorimessa pensata per
                muoversi in città senza
                complicazioni.
              </p>
            </div>
          </div>

          <div className="intro-section__footer">
            <div className="intro-section__detail">
              <span className="intro-section__detail-label">
                LOCATION
              </span>

              <span>
                Via Breglio, 111
              </span>
            </div>

            <div className="intro-section__detail">
              <span className="intro-section__detail-label">
                CITY
              </span>

              <span>
                Torino
              </span>
            </div>

            <div className="intro-section__detail">
              <span className="intro-section__detail-label">
                PARKING
              </span>

              <span>
                Auto / Moto
              </span>
            </div>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: introStyles,
        }}
      />
    </>
  );
}
