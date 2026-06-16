export interface Service {
  slug: string;
  icon: string;
  name: string;
  shortDesc: string;
}

export const services: Service[] = [
  { slug: 'elektroinstallation', icon: '🔌', name: 'Elektroinstallation', shortDesc: 'Neuinstallation und Modernisierung elektrischer Anlagen' },
  { slug: 'beleuchtung-led', icon: '💡', name: 'Beleuchtung & LED', shortDesc: 'Energieeffiziente Lichttechnik für jeden Bereich' },
  { slug: 'smart-home', icon: '🏠', name: 'Smart Home', shortDesc: 'Intelligente Haussteuerung und Automatisierung' },
  { slug: 'photovoltaik', icon: '☀️', name: 'Photovoltaik', shortDesc: 'Solaranlagen für nachhaltige Energieerzeugung' },
  { slug: 'wallbox', icon: '🚗', name: 'Wallbox', shortDesc: 'E-Ladestation für zuhause – schnell und sicher' },
  { slug: 'stoerungsdienst', icon: '🚨', name: 'Störungsdienst', shortDesc: '24h Notfallservice bei Stromausfall & Störungen' },
  { slug: 'sicherheitstechnik', icon: '🔒', name: 'Sicherheitstechnik', shortDesc: 'Alarmanlage, Kamera und Zugangskontrolle' },
  { slug: 'gebaeudeinstallation', icon: '🏗️', name: 'Gebäudeinstallation', shortDesc: 'Elektrik für Neubauten und Gewerbegebäude' },
];
