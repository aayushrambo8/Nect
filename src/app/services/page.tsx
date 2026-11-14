import React from 'react';
import type { Metadata } from 'next';
import PageIntro from '../../components/PageIntro';
import FeaturedExperiences from '../../components/FeaturedExperiences';
import { createPageJsonLd } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Services | NECKT Experiences and Event Production',
  description:
    'Discover NECKT event formats across India for parties, concerts, corporate events and artist bookings, from concept through professional production.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  const jsonLd = createPageJsonLd(
    'Services | NECKT Experiences and Event Production',
    'Discover NECKT event formats across India for parties, concerts, corporate events and artist bookings, from concept through professional production.',
    '/services'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageIntro page="services" />
      <FeaturedExperiences />
    </>
  );
}
