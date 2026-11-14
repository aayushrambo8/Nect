import React from 'react';
import type { Metadata } from 'next';
import PageIntro from '../../components/PageIntro';
import UpcomingEvents from '../../components/UpcomingEvents';
import { createPageJsonLd } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Upcoming Events | NECKT Live Entertainment',
  description:
    'Explore upcoming NECKT live events across India, including AFTER DARK, a concert experience shaped around live music, energy and performance.',
  alternates: {
    canonical: '/events',
  },
};

export default function EventsPage() {
  const jsonLd = createPageJsonLd(
    'Upcoming Events | NECKT Live Entertainment',
    'Explore upcoming NECKT live events across India, including AFTER DARK, a concert experience shaped around live music, energy and performance.',
    '/events'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageIntro page="events" />
      <UpcomingEvents />
    </>
  );
}
