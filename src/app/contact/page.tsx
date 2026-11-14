import React from 'react';
import type { Metadata } from 'next';
import PageIntro from '../../components/PageIntro';
import ContactSection from '../../components/ContactSection';
import { createPageJsonLd } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Contact NECKT | Plan a Live Experience',
  description:
    'Contact NECKT to discuss live shows, parties, corporate events, artist bookings and new collaborations across India.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const jsonLd = createPageJsonLd(
    'Contact NECKT | Plan a Live Experience',
    'Contact NECKT to discuss live shows, parties, corporate events, artist bookings and new collaborations across India.',
    '/contact'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageIntro page="contact" />
      <ContactSection />
    </>
  );
}
