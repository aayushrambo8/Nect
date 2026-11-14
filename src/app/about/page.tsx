import React from 'react';
import type { Metadata } from 'next';
import PageIntro from '../../components/PageIntro';
import AboutNeckt from '../../components/AboutNeckt';
import AudienceSection from '../../components/AudienceSection';
import { createPageJsonLd } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'About NECKT | Live Entertainment Across India',
  description:
    'Learn how NECKT is building a live entertainment culture across India and a new entertainment ecosystem for its audiences.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const jsonLd = createPageJsonLd(
    'About NECKT | Live Entertainment Across India',
    'Learn how NECKT is building a live entertainment culture across India and a new entertainment ecosystem for its audiences.',
    '/about'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageIntro page="about" />
      <AboutNeckt />
      <AudienceSection />
    </>
  );
}
