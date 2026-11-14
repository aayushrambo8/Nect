import React from 'react';
import type { Metadata } from 'next';
import PageIntro from '../../components/PageIntro';
import EventGallery from '../../components/EventGallery';
import { createPageJsonLd } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Moments | NECKT Visual Archive',
  description:
    'Explore the NECKT visual archive of crowd energy, stage craft, lighting and live entertainment moments from India.',
  alternates: {
    canonical: '/moments',
  },
};

export default function MomentsPage() {
  const jsonLd = createPageJsonLd(
    'Moments | NECKT Visual Archive',
    'Explore the NECKT visual archive of crowd energy, stage craft, lighting and live entertainment moments from India.',
    '/moments'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageIntro page="moments" />
      <EventGallery />
    </>
  );
}
