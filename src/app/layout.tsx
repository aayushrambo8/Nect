import type { Metadata, Viewport } from 'next';
import React from 'react';
import '../index.css';
import '../styles/creators.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackgroundLighting from '../components/BackgroundLighting';
import { CreatorAuthProvider } from '../context/CreatorAuthContext';
import { SITE_URL } from '../lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NECKT | Live Experiences That Move People',
    template: '%s | NECKT',
  },
  description:
    'NECKT creates, curates and delivers live entertainment experiences, concerts and events that bring people together across India.',
  applicationName: 'NECKT',
  authors: [{ name: 'NECKT' }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'NECKT',
    title: 'NECKT | Live Experiences That Move People',
    description:
      'NECKT creates, curates and delivers live entertainment experiences, concerts and events that bring people together across India.',
  },
  twitter: {
    card: 'summary',
    title: 'NECKT | Live Experiences That Move People',
    description:
      'NECKT creates, curates and delivers live entertainment experiences, concerts and events that bring people together across India.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#050507',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CreatorAuthProvider>
          <BackgroundLighting />
          <div className="landing-shell">
            <Header />
            <main className="landing-main" id="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </CreatorAuthProvider>
      </body>
    </html>
  );
}
