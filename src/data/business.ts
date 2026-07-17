// Zentrale Geschäftsdaten — überall sonst im Code wird von hier importiert,
// statt Telefonnummer/Adresse mehrfach hart zu codieren.
//
// HINWEIS: Flirt Psychologie ist ein Demo-/Akquise-Projekt, keine reale Firma.
// Adresse, HRB-Nummer und USt-IdNr unten sind Platzhalter. Sobald diese Seite
// für einen echten Kunden läuft, MÜSSEN diese Werte durch echte Daten ersetzt
// werden — vor allem im Impressum (§5 TMG-Pflichtangaben).

export const business = {
  name: 'Flirt Psychologie',
  legalName: 'Flirt Psychologie GmbH',
  tagline: 'Beziehungscoaching & Flirtseminare',

  phone: '030 – 123 456 78',
  phoneHref: '+493012345678',
  email: 'info@flirt-psychologie.de',
  whatsapp: '493012345678',

  address: {
    street: 'Musterstraße 12',
    zip: '10115',
    city: 'Berlin',
    region: 'Berlin',
    country: 'DE',
  },

  areaServed: ['Berlin', 'Deutschland (online)', 'Hamburg', 'München', 'Köln'],

  openingHours: {
    display: 'Mo–Sa, 9–20 Uhr (nach Terminvereinbarung)',
    schema: 'Mo-Sa 09:00-20:00',
  },

  founded: '2016',
  stats: {
    yearsExperience: '9+',
    projectsCompleted: '1200+',
    availability: 'Online',
    satisfaction: '98%',
  },

  social: {
    instagram: '',
    facebook: '',
    googleMapsUrl: 'https://maps.google.com/?q=Flirt+Psychologie+Berlin',
    googleReviewUrl: '',
  },

  legal: {
    vertretungsberechtigt: 'Dr. Anna Voss, Geschäftsführerin',
    register: 'Amtsgericht Berlin (Charlottenburg), HRB DEMO00000',
    ustId: 'DE000000000',
  },
} as const;

export type Business = typeof business;
