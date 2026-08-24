const cbamSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://rennystrips.com/#organization',
      name: 'Renny Strips Limited',
      url: 'https://rennystrips.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rennystrips.com/assets/RennyLogo-BDsLMpd2.webp',
      },
      image: 'https://rennystrips.com/assets/RennyLogo-BDsLMpd2.webp',
      description:
        'Renny Strips Limited is a leading integrated steel manufacturing company in India specializing in ERW pipes, scaffolding and formwork systems, wire rods, billets, and engineered steel solutions. Founded in 1996, the company serves domestic and international markets through advanced manufacturing facilities, innovation, quality excellence, and sustainable steel production.',
      email: 'info@rennystrips.com',
      telephone: '+91-82880-01300',
      foundingDate: '1996',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Lakhowal Road, Opposite PSPCL, Kohara',
        addressLocality: 'Ludhiana',
        addressRegion: 'Punjab',
        postalCode: '141112',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://x.com/rennystrips?t=Zv74JfuWaVw3CHAxPHAQSA&s=08',
        'https://www.facebook.com/rennypvtltd',
        'https://www.instagram.com/rennystrips/',
        'https://www.linkedin.com/company/rennystrips/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://rennystrips.com/#website',
      url: 'https://rennystrips.com/',
      name: 'Renny Strips Limited',
      publisher: {
        '@id': 'https://rennystrips.com/#organization',
      },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://rennystrips.com/cbam#webpage',
      url: 'https://rennystrips.com/cbam',
      name: 'Carbon Border Adjustment Mechanism (CBAM) | Renny Strips',
      description:
        'Explore CBAM requirements, its impact on steel imports and how Renny Strips supports European buyers with verified emissions data, traceability and reporting.',
      isPartOf: {
        '@id': 'https://rennystrips.com/#website',
      },
      about: {
        '@type': 'Thing',
        name: 'Carbon Border Adjustment Mechanism (CBAM)',
      },
      publisher: {
        '@id': 'https://rennystrips.com/#organization',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://rennystrips.com/assets/RennyLogo-BDsLMpd2.webp',
      },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://rennystrips.com/cbam#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://rennystrips.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sustainability',
          item: 'https://rennystrips.com/sustainability',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'CBAM',
          item: 'https://rennystrips.com/cbam',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://rennystrips.com/cbam#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is CBAM a tax?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Carbon Border Adjustment Mechanism (CBAM) functions like a tax on carbon emissions embedded in specific goods imported into the EU, ensuring that foreign products face equivalent carbon pricing to internal EU alternatives.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does CBAM work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Importers buy electronic certificates representing the embedded carbon price of their goods. The cost matches the EU Emissions Trading System (ETS) allowance prices, adjusting dynamically for any carbon price already paid in the originating jurisdiction.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does CBAM apply to finished goods?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CBAM targets iron, steel, cement, aluminum, fertilizers, electricity, and hydrogen, covering both foundational raw substances and select downstream industrial finished goods derived directly from them.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which greenhouse gas emissions are covered under CBAM, and what reporting metrics are used for different product categories?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It covers direct emissions released during industrial synthesis alongside specific indirect emissions, like electricity consumed in manufacturing. Importers measure embedded intensity metrics using specific metric tons of CO2 equivalent (tCO2e) per ton of output.',
          },
        },
        {
          '@type': 'Question',
          name: 'What CBAM services does RENNY provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RENNY provides end-to-end software integration to automate direct emission tracking, cross-border supply chain verification matrices, compliance documentation compilation, and real-time ledger auditing tools tailored to international customs standards.',
          },
        },
      ],
    },
  ],
};
export default cbamSchema;
