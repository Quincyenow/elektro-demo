// Zentrale Geschäftsdaten — überall sonst im Code wird von hier importiert,
// statt Telefonnummer/Adresse mehrfach hart zu codieren.
//
// HINWEIS: Elektro Stebel ist ein Demo-/Akquise-Projekt, keine reale Firma.
// Adresse, HRB-Nummer und USt-IdNr unten sind Platzhalter. Sobald diese Seite
// für einen echten Kunden läuft, MÜSSEN diese Werte durch echte Daten ersetzt
// werden — vor allem im Impressum (§5 TMG-Pflichtangaben).

export const business = {
  name: 'Elektro Stebel',
  legalName: 'Elektro Stebel GmbH',
  tagline: 'Elektromeisterbetrieb Hannover',

  phone: '0511 – 123 456 78',
  phoneHref: '+4951112345678',
  email: 'info@elektrostebel.de',
  whatsapp: '4951112345678',

  address: {
    street: 'Musterstraße 12',
    zip: '30159',
    city: 'Hannover',
    region: 'Niedersachsen',
    country: 'DE',
  },

  areaServed: ['Hannover', 'Langenhagen', 'Garbsen', 'Laatzen', 'Burgwedel'],

  openingHours: {
    display: 'Mo–So, 24h erreichbar (Notdienst)',
    schema: 'Mo-Su 00:00-23:59',
  },

  founded: '2014',
  stats: {
    yearsExperience: '10+',
    projectsCompleted: '500+',
    availability: '24h',
    satisfaction: '100%',
  },

  social: {
    instagram: '',
    facebook: '',
    googleMapsUrl: 'https://maps.google.com/?q=Elektro+Stebel+Hannover',
    googleReviewUrl: '',
  },

  legal: {
    vertretungsberechtigt: 'Max Stebel, Geschäftsführer',
    handwerkskammer: 'Handwerkskammer Hannover, Mitglieds-Nr. HWK-DEMO-00000',
    berufsbezeichnung: 'Elektrotechnikermeister (verliehen in Deutschland)',
    register: 'Amtsgericht Hannover, HRB DEMO00000',
    ustId: 'DE000000000',
  },
} as const;

export type Business = typeof business;
