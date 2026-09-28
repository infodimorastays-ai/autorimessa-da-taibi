import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';

import './globals.css';

const SITE_URL =
  'https://autorimessadataibi.com';

const clashDisplay = localFont({
  src: './fonts/ClashDisplay-Variable.woff2',
  variable: '--font-clash-display',
  display: 'swap',
  weight: '200 700',
  style: 'normal',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title:
    'Autorimessa Da Taibi | Parcheggio Custodito H24 a Torino',

  description:
    'Autorimessa Da Taibi a Torino, in Via Breglio 111. Parcheggio custodito per auto, moto, SUV, furgoni, van e camper, accesso H24, videosorveglianza e autolavaggio su richiesta.',

  alternates: {
    canonical: SITE_URL,
  },

  manifest: '/manifest.webmanifest',

  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
      {
        url: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },

  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: SITE_URL,
    siteName: 'Autorimessa Da Taibi',

    title:
      'Autorimessa Da Taibi | Parcheggio Custodito H24 a Torino',

    description:
      'Parcheggio custodito a Torino in Via Breglio 111 per auto, moto, SUV, furgoni, van e camper. Accesso H24, videosorveglianza e autolavaggio su richiesta.',
  },

  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ParkingFacility',
  '@id':
    'https://autorimessadataibi.com/#autorimessa',

  name: 'Autorimessa Da Taibi',

  url:
    'https://autorimessadataibi.com',

  telephone:
    '+39 328 169 3326',

  email:
    'Autorimessadataibi@gmail.com',

  description:
    'Autorimessa e parcheggio custodito a Torino per auto, moto, SUV, furgoni, van e camper. Accesso H24, videosorveglianza e servizio di autolavaggio su richiesta.',

  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'Via Breglio 111',
    postalCode:
      '10147',
    addressLocality:
      'Torino',
    addressRegion:
      'TO',
    addressCountry:
      'IT',
  },

  areaServed: {
    '@type': 'City',
    name: 'Torino',
  },

  contactPoint: {
    '@type': 'ContactPoint',

    telephone:
      '+39 328 169 3326',

    contactType:
      'customer service',

    availableLanguage:
      'Italian',
  },

};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="it"
      className={
        clashDisplay.variable
      }
    >
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
        <link
          rel="icon"
          href="/icon-192.png"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="/icon-512.png"
          type="image/png"
          sizes="512x512"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
      </head>
      <body>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                structuredData
              ).replace(
                /</g,
                '\\u003c'
              ),
          }}
        />
      </body>
    </html>
  );
}
