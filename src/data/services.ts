export interface Service {
  slug: string;
  icon: string;
  name: string;
  shortDesc: string;
}

export const services: Service[] = [
  { slug: 'einzelcoaching', icon: '🎯', name: 'Einzelcoaching', shortDesc: '1:1 Sessions für maximale persönliche Wirkung' },
  { slug: 'fuehrungskraefte', icon: '💼', name: 'Führungskräfte-Coaching', shortDesc: 'Autoritativ führen und überzeugen auf Top-Level' },
  { slug: 'kommunikationstraining', icon: '🗣️', name: 'Kommunikationstraining', shortDesc: 'Gruppentraining für Teams und Abteilungen' },
  { slug: 'online-kurs', icon: '🎓', name: 'Online-Kurs', shortDesc: 'Selbstlernprogramm im eigenen Tempo absolvieren' },
  { slug: 'team-workshop', icon: '🤝', name: 'Team-Workshop', shortDesc: 'Gesprächskultur im Team nachhaltig verbessern' },
  { slug: 'konfliktgespraeche', icon: '🧠', name: 'Schwierige Gespräche', shortDesc: 'Konflikte deeskalieren und Lösungen erzielen' },
  { slug: 'vortrag-praesentation', icon: '🎤', name: 'Präsentation & Vortrag', shortDesc: 'Überzeugend auftreten vor jeder Zuhörerschaft' },
  { slug: 'intensiv-wochenende', icon: '⚡', name: 'Intensiv-Retreat', shortDesc: 'Zweitägiges Tiefentauchen mit messbaren Ergebnissen' },
];
