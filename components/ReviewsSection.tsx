'use client';

import { useEffect, useRef } from 'react';
import { subscribeScrollFrame } from '../lib/scrollFrame';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place//data=!4m2!3m1!1s0x47886d20eae2a6d9:0xef1441f915874180?sa=X&ved=1t:8290&ictx=111';

const reviews = [
  {
    name: 'ERMEREST TAHIRAJ',
    rating: 5,
    text: 'Posto davvero sicuro e ben organizzato. È tutto telecomandato e videosorvegliato, quindi mi sento tranquillo ogni volta che entro ed esco, anche in orari diversi. Posso accedere quando voglio in totale autonomia, ed è una comodità enorme.',
  },
  {
    name: 'LUCA PICARIELLO',
    rating: 5,
    text: 'Frequento quest’autorimessa da anni ormai e mi trovo benissimo, ora più che mai. Un punto di riferimento in zona Borgo Vittoria. Ibra è super disponibile e cordiale, un vero professionista che sa come trattare i clienti.',
  },
  {
    name: 'GF ADR',
    rating: 5,
    text: 'Autorimessa comodissima per la zona con comodo autolavaggio interno. Titolare gentile, competente e professionale. Videoaorvegliata H24 e ben organizzata. Consigliata e promossa a pieni voti.',
  },
];

const reviewsStyles = `
  .reviews-section {
    --transition-progress: 0;
    --out-progress: 0;

    position: sticky;
    top: 0;
    z-index: 35;

    width: 100%;
    height: var(--viewport-height, 100svh);
    min-height: 620px;

    overflow: hidden;

    background: #080808;
    color: #f3f1eb;

    border-radius: 30px 30px 0 0;

    box-shadow:
      0 -40px 120px
      rgba(0, 0, 0, 0.72);

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

  .reviews-section::before {
    content: '';

    position: absolute;

    top: 0;
    left: var(--layout-inline);
    right: var(--layout-inline);

    height: 1px;

    background:
      rgba(255, 255, 255, 0.14);
  }

  .reviews-section__noise {
    position: absolute;
    inset: 0;

    pointer-events: none;

    background:
      radial-gradient(
        circle at 78% 36%,
        rgba(255, 255, 255, 0.055),
        transparent 34%
      ),
      repeating-linear-gradient(
        115deg,
        transparent 0,
        transparent 130px,
        rgba(255, 255, 255, 0.012) 131px,
        transparent 132px
      );
  }

  .reviews-section__inner {
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

  .reviews-section__top {
    display: flex;
    align-items: center;
  }

  .reviews-section__section-id {
    display: flex;
    align-items: center;

    gap: 16px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.17em;
  }

  .reviews-section__section-id span:first-child {
    color:
      rgba(255, 255, 255, 0.3);
  }

  .reviews-section__section-id span:last-child {
    color:
      rgba(255, 255, 255, 0.72);
  }

  .reviews-section__heading {
    display: grid;

    grid-template-columns:
      minmax(0, 1.35fr)
      minmax(250px, 0.65fr);

    align-items: end;

    gap:
      clamp(50px, 8vw, 130px);

    margin-top: auto;

    padding:
      clamp(28px, 4vh, 48px)
      0
      clamp(26px, 3.5vh, 40px);
  }

  .reviews-section__eyebrow {
    margin:
      0 0 16px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.18em;

    color:
      rgba(255, 255, 255, 0.62);
  }

  .reviews-section__title {
    display: flex;
    flex-direction: column;

    margin: 0;

    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(50px, 6.7vw, 106px);

    font-weight: 400;

    line-height: 0.82;

    letter-spacing: -0.07em;

    text-transform: uppercase;
  }

  .reviews-section__title span {
    color: transparent;

    -webkit-text-stroke:
      1.3px
      rgba(255, 255, 255, 0.72);
  }

  .reviews-section__side {
    display: flex;
    flex-direction: column;

    align-items: flex-start;

    gap: 22px;

    padding-bottom: 2px;
  }

  .reviews-section__copy {
    max-width: 340px;

    margin: 0;

    font-size: 12px;
    line-height: 1.6;

    color:
      rgba(255, 255, 255, 0.52);
  }

  .reviews-section__google-link {
    display: inline-flex;
    align-items: center;

    gap: 14px;

    padding-bottom: 7px;

    border-bottom:
      1px solid
      rgba(255, 255, 255, 0.34);

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.14em;

    color:
      rgba(255, 255, 255, 0.82);

    transition:
      gap 200ms ease,
      border-color 200ms ease;
  }

  .reviews-section__google-link:hover,
  .reviews-section__google-link:focus-visible {
    gap: 22px;

    border-color: #ffffff;
  }

  .reviews-section__cards {
    display: grid;

    grid-template-columns:
      repeat(3, minmax(0, 1fr));

    border-top:
      1px solid
      rgba(255, 255, 255, 0.14);

    border-bottom:
      1px solid
      rgba(255, 255, 255, 0.14);
  }

  .reviews-section__cards:focus-visible {
    outline: 2px solid #f3f1eb;
    outline-offset: 4px;
  }

  .review-card {
    position: relative;

    display: flex;
    flex-direction: column;

    min-height: 210px;

    padding:
      20px
      24px
      18px;

    border-right:
      1px solid
      rgba(255, 255, 255, 0.14);

    transition:
      background 220ms ease,
      padding 220ms ease;
  }

  .review-card:last-child {
    border-right: 0;
  }

  .review-card:hover {
    padding-top: 16px;

    background:
      rgba(255, 255, 255, 0.035);
  }

  .review-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;
  }

  .review-card__index {
    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.16em;

    color:
      rgba(255, 255, 255, 0.7);
  }

  .review-card__stars {
    font-size: 9px;

    letter-spacing: 0.1em;

    color:
      rgba(255, 255, 255, 0.9);
  }

  .review-card__quote {
    margin:
      24px 0
      22px;

    max-width: 420px;

    font-size:
      clamp(13px, 1vw, 15px);

    line-height: 1.55;

    color:
      rgba(255, 255, 255, 0.82);
  }

  .review-card__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 20px;

    margin-top: auto;
  }

  .review-card__author {
    display: flex;
    flex-direction: column;

    gap: 5px;
  }

  .review-card__name {
    font-family:
      'Archivo Black',
      sans-serif;

    font-size:
      clamp(12px, 1vw, 16px);

    font-weight: 400;

    line-height: 1;

    letter-spacing: -0.03em;
  }

  .review-card__google {
    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.14em;

    color:
      rgba(255, 255, 255, 0.7);
  }

  .reviews-section__bottom {
    display: grid;

    grid-template-columns:
      1fr auto;

    align-items: end;

    margin-top: auto;

    padding-top: 18px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.15em;

    color:
      rgba(255, 255, 255, 0.62);
  }

  .reviews-section__bottom-center {
    justify-self: start;
  }

  .reviews-section__bottom a {
    display: inline-flex;
    align-items: center;

    justify-self: end;

    gap: 14px;

    padding-bottom: 6px;

    border-bottom:
      1px solid
      rgba(255, 255, 255, 0.3);

    color:
      rgba(255, 255, 255, 0.78);

    transition:
      gap 200ms ease,
      border-color 200ms ease;
  }

  .reviews-section__bottom a:hover,
  .reviews-section__bottom a:focus-visible {
    gap: 22px;

    border-color: #ffffff;
  }

  @media (max-width: 1100px) {
    .reviews-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .reviews-section__inner {
      padding-left: var(--layout-inline);
      padding-right: var(--layout-inline);
    }

    .review-card {
      padding-left: 18px;
      padding-right: 18px;
    }
  }

  @media (min-width: 769px) and (max-height: 800px) {
    .reviews-section__inner {
      padding-top: 38px;
      padding-bottom: 17px;
    }

    .reviews-section__heading {
      padding-top: 20px;
      padding-bottom: 22px;
    }

    .reviews-section__title {
      font-size:
        clamp(44px, 5.6vw, 78px);
    }

    .review-card {
      min-height: 170px;

      padding-top: 15px;
      padding-bottom: 14px;
    }

    .review-card__quote {
      margin:
        15px 0
        14px;

      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    .reviews-section {
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

    .reviews-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .reviews-section__inner {
      padding:
        48px
        var(--layout-inline)
        22px;
    }

    .reviews-section__heading {
      display: block;

      margin-top: 0;

      padding:
        38px 0
        22px;
    }

    .reviews-section__title {
      font-size:
        clamp(42px, 12vw, 66px);
    }

    .reviews-section__side {
      gap: 15px;

      margin-top: 18px;
    }

    .reviews-section__copy {
      max-width: 330px;

      font-size: 11px;
    }

    .reviews-section__cards {
      display: grid;
      grid-template-columns: none;
      grid-auto-flow: column;
      grid-auto-columns: 88%;
      overflow-x: auto;
      overscroll-behavior-inline: contain;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }

    .reviews-section__cards::-webkit-scrollbar {
      display: none;
    }

    .review-card {
      min-height: 220px;
      scroll-snap-align: start;

      padding:
        16px 18px;

      border-right:
        1px solid
        rgba(255, 255, 255, 0.12);
    }

    .review-card:last-child {
      border-right: 0;
    }

    .review-card:hover {
      padding-top: 16px;

      background: transparent;
    }

    .review-card__quote {
      margin:
        9px 0
        10px;

      max-width: none;

      font-size: 13px;

      line-height: 1.5;
    }

    .review-card__name {
      font-size: 12px;
    }

    .reviews-section__bottom {
      grid-template-columns:
        1fr auto;

      padding-top: 14px;
    }

    .reviews-section__bottom-center {
      display: none;
    }

    .reviews-section__bottom a {
      grid-column: 2;
    }
  }

  @media (max-width: 480px) {
    .reviews-section::before {
      left: var(--layout-inline);
      right: var(--layout-inline);
    }

    .reviews-section__inner {
      padding:
        42px
        var(--layout-inline)
        18px;
    }

    .reviews-section__heading {
      padding-top: 30px;
      padding-bottom: 18px;
    }

    .reviews-section__title {
      font-size:
        clamp(39px, 12vw, 56px);
    }

    .reviews-section__side {
      margin-top: 15px;
    }

    .review-card {
      padding:
        12px 14px;
    }

    .review-card:hover {
      padding-top: 12px;
    }
  }

  @media (max-width: 768px) and (max-height: 700px) {
    .reviews-section__inner {
      padding-top: 38px;
      padding-bottom: 16px;
    }

    .reviews-section__heading {
      padding: 24px 0 12px;
    }

    .reviews-section__title {
      font-size:
        clamp(38px, 11vw, 58px);
    }

    .reviews-section__side {
      gap: 10px;

      margin-top: 10px;
    }

    .review-card,
    .review-card:hover {
      padding-top: 7px;
      padding-bottom: 7px;
    }

    .review-card__quote {
      margin-top: 6px;
      margin-bottom: 6px;
    }

    .reviews-section__bottom {
      padding-top: 8px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .reviews-section {
      transform: none;
      filter: none;
    }

    .review-card,
    .reviews-section__google-link,
    .reviews-section__bottom a {
      transition: none;
    }
  }
`;

export default function ReviewsSection() {
  const reviewsRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const reviewsSection =
      reviewsRef.current;

    const contact =
      document.querySelector<HTMLElement>(
        '#contatti'
      );

    if (!reviewsSection || !contact) return;

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

    let contactDocumentTop =
      getDocumentTop(contact);

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
        contactDocumentTop =
          getDocumentTop(contact);
      }

      const distanceIntoTransition =
        scrollY -
        (
          contactDocumentTop -
          viewportHeight
        );

      const progress = clamp(
        distanceIntoTransition /
          viewportHeight
      );

      reviewsSection.style.setProperty(
        '--out-progress',
        progress.toString()
      );

      contact.style.setProperty(
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
        ref={reviewsRef}
        id="recensioni"
        className="reviews-section"
        aria-labelledby="reviews-title"
      >
        <div
          className="reviews-section__noise"
          aria-hidden="true"
        />

        <div className="reviews-section__inner">
          <div className="reviews-section__top">
            <div className="reviews-section__section-id">
              <span>07</span>
              <span>RECENSIONI</span>
            </div>

          </div>

          <div className="reviews-section__heading">
            <div>
              <p className="reviews-section__eyebrow">
                GOOGLE REVIEWS · DA TAIBI
              </p>

              <h2
                id="reviews-title"
                className="reviews-section__title"
              >
                PARLANO
                <span>I CLIENTI.</span>
              </h2>
            </div>

            <div className="reviews-section__side">
              <p className="reviews-section__copy">
                Esperienze pubblicate dai clienti
                sulla scheda Google di
                Autorimessa Da Taibi.
              </p>

              <a
                href={GOOGLE_MAPS_URL}
                className="reviews-section__google-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Leggi tutte le recensioni di Autorimessa Da Taibi su Google"
              >
                <span>VEDI TUTTE SU GOOGLE</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div
            className="reviews-section__cards"
            role="region"
            aria-label="Recensioni dei clienti"
            tabIndex={0}
          >
            {reviews.map((review, index) => (
              <article
                className="review-card"
                key={review.name}
              >
                <div className="review-card__top">
                  <span className="review-card__index">
                    {String(index + 1).padStart(
                      2,
                      '0'
                    )}
                  </span>

                  <span
                    className="review-card__stars"
                    aria-label={`${review.rating} stelle su 5`}
                  >
                    ★★★★★
                  </span>
                </div>

                <blockquote className="review-card__quote">
                  “{review.text}”
                </blockquote>

                <div className="review-card__footer">
                  <div className="review-card__author">
                    <strong className="review-card__name">
                      {review.name}
                    </strong>
                  </div>

                  <span className="review-card__google">
                    GOOGLE
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="reviews-section__bottom">
            <span className="reviews-section__bottom-center">
              VIA BREGLIO 111 · TORINO
            </span>

            <a href="#contatti">
              <span>CONTATTI</span>
              <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: reviewsStyles,
        }}
      />
    </>
  );
}
