const eventsSchema={
    "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://rennystrips.com/events#webpage",
      "url": "https://rennystrips.com/events",
      "name": "Events & Exhibitions | Renny Strips",
      "description": "Explore Renny Strips' industry exhibitions, social initiatives, national celebrations, and sustainability activities.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://rennystrips.com/#website",
        "url": "https://rennystrips.com/"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://rennystrips.com/#organization",
        "name": "Renny Strips",
        "url": "https://rennystrips.com/"
      },
      "mainEntity": {
        "@id": "https://rennystrips.com/events#event-list"
      }
    },
    {
      "@type": "ItemList",
      "@id": "https://rennystrips.com/events#event-list",
      "name": "Renny Strips Events and Exhibitions",
      "numberOfItems": 11,
      "itemListOrder": "https://schema.org/ItemListOrderDescending",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Event",
            "name": "Renny @ bauma CONEXPO INDIA 2026",
            "startDate": "2026-09-15",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Event",
            "name": "Empowering Young Minds, Shaping Brighter Futures",
            "startDate": "2026-09-08",
            "description": "On International Literacy Day, Renny Strips celebrates the power of education and its commitment to helping every child learn, dream, and confidently write their own future.",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Event",
            "name": "Celebrating the Spirit That Builds a Stronger India on Independence Day",
            "startDate": "2026-08-15",
            "description": "Honouring the dedication and hard work of the people who keep India moving, growing, and building a brighter tomorrow.",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Event",
            "name": "Empowering Through Skills, Building a Sustainable Future",
            "startDate": "2026-07-15",
            "description": "Celebrating World Youth Skills Day by promoting learning, self-reliance, practical skills, and empowerment for women and children.",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "Event",
            "name": "World Day Against Child Labour",
            "startDate": "2026-06-12",
            "description": "Supporting education and brighter futures by empowering children with opportunities to learn, grow, and dream.",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "Event",
            "name": "Celebrating the Strength Behind Every Steel Strip on Labour Day",
            "startDate": "2026-05-01",
            "description": "Honouring the dedication, skill, and hard work of the workforce that drives precision, quality, and innovation at Renny Strips.",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 7,
          "item": {
            "@type": "Event",
            "name": "Celebrating Women Who Shape the Future on International Women's Day",
            "startDate": "2026-03-08",
            "description": "Honouring the strength, resilience, leadership, and vision of women driving progress and building a stronger tomorrow.",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 8,
          "item": {
            "@type": "Event",
            "name": "Diwali Celebration",
            "startDate": "2025-10-20",
            "description": "Diwali celebration at Renny Strips.",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 9,
          "item": {
            "@type": "Event",
            "name": "Renny @ bauma CONEXPO INDIA 2024",
            "startDate": "2024-12-21",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 10,
          "item": {
            "@type": "Event",
            "name": "Strengthening Tomorrow",
            "startDate": "2024-10-19",
            "description": "An exposure event organized by the Bureau of Indian Standards (BIS).",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 11,
          "item": {
            "@type": "Event",
            "name": "World Nature Conservation Day",
            "startDate": "2024-10-19",
            "description": "Renny Strips' commitment to sustainability and environmentally responsible practices.",
            "organizer": {
              "@id": "https://rennystrips.com/#organization"
            }
          }
        }
      ]
    }
  ]

}
export default eventsSchema;