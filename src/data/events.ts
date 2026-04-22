export interface ConstellationEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  price: number;
  description: string;
  details: string[];
}

export const CONSTELLATION_EVENTS: ConstellationEvent[] = [
  {
    id: "constelatie-mai-2026",
    title: "Constelații Mai 2026",
    date: new Date(2026, 4, 20),
    time: "19:00 - 22:00",
    location: "Online (Zoom)",
    price: 120,
    description:
      "O seară magică de explorare a energiilor cosmice ale lunii mai. Vom analiza configurațiile astrale curente și impactul lor asupra evoluției noastre spirituale.",
    details: [
      "Analiza tranzitelor planetare principale",
      "Interpretarea energiei lunii mai",
      "Meditații ghidate de aliniere cosmică",
      "Exerciții practice de integrare a energiilor",
      "Discuții de grup și împărtășire experiențe",
      "Materiale suport și ghiduri personalizate",
    ],
  },
  {
    id: "constelatie-iunie-2026",
    title: "Constelații Iunie 2026",
    date: new Date(2026, 5, 22),
    time: "19:00 - 22:00",
    location: "Online (Zoom)",
    price: 120,
    description:
      "Explorăm energiile de transformare ale verii. Un workshop intensiv despre cum să folosim influențele planetare pentru creștere personală și spirituală.",
    details: [
      "Energii de transformare și renaștere",
      "Analiza aspectelor majore ale verii",
      "Tehnici de manifestare și creare",
      "Ritualuri de eliberare și reînnoire",
      "Interacțiuni de grup și suport comunitar",
      "Resurse continue după workshop",
    ],
  },
  {
    id: "constelatie-iulie-2026",
    title: "Constelații Iulie 2026",
    date: new Date(2026, 6, 21),
    time: "19:00 - 22:00",
    location: "Online (Zoom)",
    price: 120,
    description:
      "Luna iulie ne invită la explorarea emoțiilor profunde și a intuiției. Un workshop despre cum să navigăm apele emoționale cu înțelepciune și grație.",
    details: [
      "Explorarea emoțiilor și intuiției",
      "Tehnici de echilibrare emoțională",
      "Meditații de conectare cu sinele interior",
      "Exerciții de dezvoltare a intuiției",
      "Sprijin emoțional și vindecare în grup",
      "Instrumente practice pentru viața de zi cu zi",
    ],
  },
  {
    id: "constelatie-august-2026",
    title: "Constelații August 2026",
    date: new Date(2026, 7, 18),
    time: "19:00 - 22:00",
    location: "Online (Zoom)",
    price: 120,
    description:
      "Luna august aduce energii de manifestare și recoltare. Vom explora cum să folosim aceste influențe pentru a materializa visele și a ne bucura de roadele muncii noastre.",
    details: [
      "Energii de manifestare și abundență",
      "Tehnici de creare a realității dorite",
      "Exerciții de recunoștință și celebrare",
      "Planificare pentru sezonul următor",
      "Integrare și celebrare în comunitate",
      "Resurse pentru continuarea călătoriei",
    ],
  },
  {
    id: "constelatie-septembrie-2026",
    title: "Constelații Septembrie 2026",
    date: new Date(2026, 8, 23),
    time: "19:00 - 22:00",
    location: "Online (Zoom)",
    price: 120,
    description:
      "Luna septembrie aduce energii de bilanț și evaluare. Vom explora cum să ne analizăm progresul și să ne pregătim pentru noi obiective.",
    details: [
      "Energii de reflecție și evaluare",
      "Analiza ciclurilor personale",
      "Tehnici de eliberare a ce nu mai serveste",
      "Planificare pentru viitor",
      "Meditații de clarificare",
      "Suport în grup pentru transformare",
    ],
  },
];

export const getEventById = (id: string): ConstellationEvent | undefined => {
  return CONSTELLATION_EVENTS.find((event) => event.id === id);
};

export const getUpcomingEvents = (): ConstellationEvent[] => {
  const now = new Date();
  return CONSTELLATION_EVENTS.filter((event) => event.date >= now);
};