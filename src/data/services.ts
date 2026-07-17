export interface Service {
  slug: string;
  icon: string;
  name: string;
  shortDesc: string;
}

export const services: Service[] = [
  { slug: 'einzelcoaching', icon: '💬', name: 'Einzelcoaching', shortDesc: 'Individuelle Begleitung für mehr Selbstsicherheit beim Dating' },
  { slug: 'flirtcoaching', icon: '✨', name: 'Flirtcoaching', shortDesc: 'Praxisnahes Training für den ersten Eindruck und echte Verbindungen' },
  { slug: 'online-dating', icon: '📱', name: 'Online-Dating-Optimierung', shortDesc: 'Profil, Fotos und Nachrichten, die wirklich Anklang finden' },
  { slug: 'kommunikationstraining', icon: '🗣️', name: 'Kommunikationstraining', shortDesc: 'Klarer ausdrücken und Missverständnisse vermeiden' },
  { slug: 'selbstsicherheit', icon: '🌱', name: 'Selbstsicherheits-Coaching', shortDesc: 'Innere Blockaden lösen und mit mehr Ausstrahlung auftreten' },
  { slug: 'paarberatung', icon: '❤️', name: 'Paarberatung', shortDesc: 'Gemeinsam Konflikte klären und die Beziehung stärken' },
  { slug: 'workshops', icon: '🎓', name: 'Workshops & Seminare', shortDesc: 'Gruppentraining für Flirten, Dating und Beziehungspsychologie' },
  { slug: 'nachbetreuung', icon: '🤝', name: 'Nachbetreuung', shortDesc: 'Langfristige Begleitung mit regelmäßigen Check-ins' },
];
