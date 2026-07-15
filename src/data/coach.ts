// Zentrale Inhalte für die Dr.-Quincy-Homepage.
// Alle Texte sind eigener Platzhalter-Content im Stil einer Dating-Coach-Seite
// (kein 1:1-Übernehmen fremder Inhalte). Zahlen/Angaben sind Platzhalter und
// sollten vor dem Live-Gang durch echte Werte ersetzt werden.

export const coach = {
  name: 'Dr. Quincy',
  role: 'Dating-Coach',
  claim: 'Dating mit System. Psychologisch fundiert.',
  phone: '+49 30 000 00 00',
  phoneHref: '+493000000000',
  email: 'kontakt@dr-quincy.de',

  // Kopfnavigation
  nav: [
    { label: 'Dating-Apps', href: '#apps' },
    { label: 'Dating-Tipps', href: '#tipps' },
    { label: 'Referenzen', href: '#referenzen' },
    { label: 'Artikel', href: '#artikel' },
    { label: 'Über mich', href: '#ueber' },
  ],

  // Statistik-Leiste (Platzhalter-Zahlen)
  stats: [
    { icon: 'heart', value: '10+ Jahre', label: 'Dating-Coach' },
    { icon: 'mail', value: '50.000+', label: 'Newsletter-Abonnenten' },
    { icon: 'play', value: '13 Mio.+', label: 'Views auf YouTube' },
    { icon: 'eye', value: '41 Mio.+', label: 'Views gesamt' },
    { icon: 'star', value: '14.000+', label: 'zufriedene Klienten' },
  ],

  // Hero (ohne Buch-/Produktwerbung – Fokus auf Person + Erstgespräch)
  hero: {
    kicker: 'Dating-Coach · Psychologisch fundiert',
    title: 'Dating mit System –\nfinde die Frau, die wirklich zu dir passt.',
    text: 'Psychologisch fundierte Strategien für Kennenlernen, Anziehung und echte Beziehungen – klar erklärt, sofort anwendbar.',
    highlight: 'Starte mit einem kostenlosen Erstgespräch.',
    cta: 'Kostenloses Erstgespräch sichern',
    ctaHref: '#kontakt',
    image: '/dr-quincy.png',
  },

  // Über mich
  about: {
    title: 'Hi, ich bin Dr. Quincy …',
    lead: 'seit über 10 Jahren',
    text: 'helfe ich Männern dabei, mit Klarheit und echtem Selbstvertrauen die Frau zu gewinnen, die wirklich zu ihnen passt. Mein Ansatz ist psychologisch fundiert statt Zufall: verständlich erklärt, Schritt für Schritt, ohne Anmachsprüche und ohne Verstellen. Schau dir gerne meine Referenzen an.',
    signoff: 'Dein',
    signature: 'Dr. Quincy',
    photo: '/dr-quincy.png',
  },

  // Testimonials (eigene Platzhalter-Stimmen)
  testimonialsTitle: 'Was Klienten über die Arbeit mit Dr. Quincy sagen',
  testimonials: [
    { quote: 'Endlich verstehe ich, worauf es beim Kennenlernen wirklich ankommt. Kein Spiel, keine Tricks – einfach klar und ehrlich. Es funktioniert.', name: 'Michael K.', role: 'Ingenieur, 34' },
    { quote: 'Der psychologische Ansatz hat bei mir den Knoten gelöst. Ich gehe heute viel entspannter und selbstsicherer in Dates.', name: 'Daniel R.', role: 'Selbstständig, 29' },
    { quote: 'Ich war skeptisch, ob „noch ein Coach“ etwas bringt. Aber die Inhalte sind fundiert und praxisnah – das hat meinen Blick auf Beziehungen verändert.', name: 'Sebastian W.', role: 'Lehrer, 41' },
    { quote: 'Zum ersten Mal hatte ich das Gefühl, verstanden zu werden – und konkrete Schritte an der Hand. Nach ein paar Wochen kam die erste echte Beziehung.', name: 'Tobias M.', role: 'Student, 26' },
    { quote: 'Klar strukturiert, ehrlich und ohne leere Versprechen. Genau das, was ich gesucht habe.', name: 'Andreas P.', role: 'Vertrieb, 38' },
    { quote: 'Die Kombination aus Psychologie und praktischen Übungen ist Gold wert. Absolute Empfehlung.', name: 'Jonas L.', role: 'Designer, 31' },
  ],

  // Dating-Tipps – Themen-Spalten
  topicsTitle: 'Dating-Tipps',
  topicsSub: 'Die besten Tipps, um die richtige Partnerin zu finden',
  topics: [
    { head: 'Kennenlernen', links: ['Frauen kennenlernen', 'Frauen ansprechen', 'Erstes Date', 'Was Frauen wollen'] },
    { head: 'Flirten', links: ['Flirttipps für Männer', 'Richtig flirten', 'Gesprächsthemen', 'Körpersprache'] },
    { head: 'Beziehung', links: ['Beziehungstipps', 'Glückliche Beziehung', 'Frauen verstehen', 'Vertrauen aufbauen'] },
    { head: 'Nach der Trennung', links: ['Trennung verarbeiten', 'Trennungsschmerz', 'Neuanfang', 'Wieder Vertrauen fassen'] },
    { head: 'Persönlichkeit', links: ['Selbstvertrauen stärken', 'Schüchternheit überwinden', 'Selbstentwicklung', 'Ausstrahlung'] },
    { head: 'Online-Dating', links: ['Online-Dating-Tipps', 'Perfektes Profil', 'Erste Nachricht', 'Match zu Date'] },
    { head: 'Psychologie', links: ['Anziehung verstehen', 'Bindungstypen', 'Emotionale Intelligenz', 'Grenzen setzen'] },
    { head: 'Weitere Themen', links: ['Interviews', 'Buchtipps', 'FAQ', 'Fragen an Dr. Quincy'] },
  ],

  // Dating-Apps im Test (Platzhalter-Bewertungen)
  appsTitle: 'Dating-Apps im Test',
  appsSub: 'Die besten Apps, um die richtige Partnerin zu finden',
  apps: [
    { rank: 1, name: 'Parship', winner: true,  rating: 4.5, question: 'Funktioniert seriöses Matching wirklich?', text: 'Seriöse Partnervermittlung mit wissenschaftlichem Matching – ideal für alle, die eine feste Beziehung suchen.' },
    { rank: 2, name: 'Bumble', winner: false, rating: 4.0, question: 'Frauen machen den ersten Schritt – lohnt sich das?', text: 'Frischer Ansatz, der Druck rausnimmt und für Qualität sorgt. Ideal für selbstbewusste Singles.' },
    { rank: 3, name: 'ElitePartner', winner: false, rating: 3.5, question: 'Die richtige Wahl für Akademiker-Singles?', text: 'Gehobene Plattform mit hohem Akademiker-Anteil – für Singles, die es ernst meinen.' },
  ],

  // Artikel
  popularTitle: 'Beliebteste Artikel',
  popularSub: 'Die meistgelesenen Ratgeber',
  popular: [
    { cat: 'Kennenlernen', title: 'Frauen ansprechen – der ehrliche A-bis-Z-Guide', excerpt: 'Ansprechen fällt vielen Männern schwer. Mit diesen psychologisch fundierten Schritten gelingt der Einstieg natürlich und ohne Druck.' },
    { cat: 'Flirten', title: 'Die Kunst des guten Gesprächs', excerpt: 'Wie du Gespräche führst, die verbinden – statt Small Talk, der ins Leere läuft. Praktische Techniken zum Sofort-Anwenden.' },
    { cat: 'Beziehung', title: 'Anziehung verstehen: was wirklich zählt', excerpt: 'Kein Sixpack, kein teures Auto. Die echten psychologischen Faktoren, die Anziehung entstehen lassen.' },
  ],

  newestTitle: 'Neueste Artikel',
  newest: [
    { cat: 'Psychologie', title: 'Emotionale Intelligenz beim Dating', excerpt: 'Wie du Gefühle – deine und ihre – besser liest und dadurch echte Nähe aufbaust.' },
    { cat: 'Selbstvertrauen', title: 'Souverän bleiben, auch wenn es unangenehm wird', excerpt: 'Umgang mit Ablehnung und peinlichen Momenten, ohne dein Selbstwertgefühl zu verlieren.' },
    { cat: 'Kennenlernen', title: 'Komplimente, die wirklich ankommen', excerpt: 'Warum die meisten Komplimente floppen – und wie du es besser machst.' },
    { cat: 'Online-Dating', title: 'Vom Match zum echten Date', excerpt: 'Der rote Faden für Nachrichten, die nicht im Sande verlaufen.' },
  ],

  // Referenzen
  referencesTitle: 'Über 14.000 Männer vertrauen auf Dr. Quincy',
  referencesText: 'Echte Rückmeldungen aus Coachings, Kursen und der Community.',
  referencesCta: 'Alle Referenzen ansehen',
  referencesCtaHref: '#referenzen',

  // Footer
  footer: {
    apps: ['Bumble', 'C-Date', 'ElitePartner', 'Hinge', 'Lovescout24', 'Parship', 'Tinder', 'Zweisam'],
    legal: [
      { label: 'Über mich', href: '#ueber' },
      { label: 'Kontakt', href: '#kontakt' },
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'AGB', href: '#agb' },
    ],
    social: [
      { label: 'YouTube', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'Facebook', href: '#' },
    ],
  },
} as const;

export type Coach = typeof coach;
