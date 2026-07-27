// Zentrale Geschäftsdaten — überall sonst im Code wird von hier importiert,
// statt Telefonnummer/Adresse mehrfach hart zu codieren.
//
// HINWEIS: Dies ist ein Demo-/Akquise-Projekt. Adresse und rechtliche Angaben
// sind Platzhalter und MÜSSEN vor dem Live-Betrieb durch echte Daten ersetzt werden.

export const business = {
  name: 'Gespräch & Wirkung',
  legalName: 'Gespräch & Wirkung Coaching GmbH',
  tagline: 'Conversation Leadership Coaching',

  phone: '0511 – 123 456 78',
  phoneHref: '+4951112345678',
  email: 'hallo@gespraech-und-wirkung.de',
  whatsapp: '4951112345678',

  address: {
    street: 'Musterstraße 12',
    zip: '30159',
    city: 'Hannover',
    region: 'Niedersachsen',
    country: 'DE',
  },

  areaServed: ['Hannover', 'Hamburg', 'Berlin', 'München', 'Online deutschlandweit'],

  openingHours: {
    display: 'Mo–Fr, 9–18 Uhr (Erstgespräch auf Anfrage)',
    schema: 'Mo-Fr 09:00-18:00',
  },

  founded: '2016',
  stats: {
    yearsExperience: '8+',
    clientsCoached: '1.200+',
    recommendationRate: '98%',
    countriesActive: '4',
  },

  social: {
    instagram: '',
    facebook: '',
    linkedIn: '',
    googleReviewUrl: '',
  },

  legal: {
    vertretungsberechtigt: 'Jana Richter, Geschäftsführerin',
    berufsbezeichnung: 'Zertifizierter Business Coach (ICF, verliehen in Deutschland)',
    register: 'Amtsgericht Hannover, HRB DEMO00000',
    ustId: 'DE000000000',
  },
} as const;

export type Business = typeof business;

export type Business = typeof business;
