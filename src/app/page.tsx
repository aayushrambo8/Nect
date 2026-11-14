import React from 'react';
import type { Metadata } from 'next';
import Hero from '../components/Hero';
import HomeEventFeature from '../components/HomeEventFeature';
import HomeSummary from '../components/HomeSummary';
import { createPageJsonLd } from '../lib/seo';

export const metadata: Metadata = {
  title: 'NECKT | Live Experiences That Move People',
  description:
    'NECKT creates, curates and delivers live entertainment experiences, concerts and events that bring people together across India.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const jsonLd = createPageJsonLd(
    'NECKT | Live Experiences That Move People',
    'NECKT creates, curates and delivers live entertainment experiences, concerts and events that bring people together across India.',
    '/'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <HomeEventFeature />
      <HomeSummary />
    </>
  );
}
