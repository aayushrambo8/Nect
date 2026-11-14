export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://neckt.in').replace(/\/$/, '');

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'NECKT',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  email: 'hello@neckt.in',
  telephone: '+91-9546646668',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Startup Bihar Incubation Center Near ATC',
    addressLocality: 'Patna',
    postalCode: '800014',
    addressRegion: 'Bihar',
    addressCountry: 'IN',
  },
  sameAs: ['https://www.instagram.com/neckt.india/'],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'NECKT',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export function createPageJsonLd(title: string, description: string, path: string) {
  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;

  const graph: any[] = [
    organizationSchema,
    websiteSchema,
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        ...(path === '/'
          ? []
          : [
              {
                '@type': 'ListItem',
                position: 2,
                name: title.split(' | ')[0],
                item: canonicalUrl,
              },
            ]),
      ],
    },
  ];

  if (path === '/services') {
    graph.push(
      {
        '@type': 'Service',
        name: 'Parties',
        description:
          'End-to-end party experiences brought to life through premium production, staging, lighting, sound and coordination.',
        provider: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Service',
        name: 'Concerts and Live Shows',
        description:
          'Concert and live show experiences shaped through staging, production, lighting, sound and artist coordination.',
        provider: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Service',
        name: 'Corporate Events',
        description:
          'Corporate events delivered with a design-led identity and coordinated production, vendors, artists and venues.',
        provider: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Service',
        name: 'Artist Bookings',
        description:
          'Artist bookings supported by coordination across artists, vendors, venues and the wider live experience.',
        provider: { '@id': `${SITE_URL}/#organization` },
      }
    );
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
