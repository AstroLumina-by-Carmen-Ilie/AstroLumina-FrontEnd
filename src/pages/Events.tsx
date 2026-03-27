import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useLoading } from '../contexts/LoadingContext';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

interface ConstelatieEvent {
  title: string;
  date: Date;
  time: string;
  location: string;
  price: string;
}

const generateConstelatiiEvents = (): ConstelatieEvent[] => {
  const events: ConstelatieEvent[] = [];
  const months = [
    { year: 2027, month: 3 },
    { year: 2027, month: 4 },
    { year: 2027, month: 5 },
    { year: 2027, month: 6 },
    { year: 2027, month: 7 },
    { year: 2027, month: 8 },
    { year: 2027, month: 9 },
    { year: 2027, month: 10 },
    { year: 2027, month: 11 },
    { year: 2027, month: 12 },
    { year: 2028, month: 1 },
    { year: 2028, month: 2 },
    { year: 2028, month: 3 },
    { year: 2028, month: 4 },
    { year: 2028, month: 5 },
    { year: 2028, month: 6 },
    { year: 2028, month: 7 },
    { year: 2028, month: 8 },
    { year: 2028, month: 9 },
    { year: 2028, month: 10 },
    { year: 2028, month: 11 },
    { year: 2028, month: 12 },
  ];

  const monthNames = [
    'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
  ];

  months.forEach(({ year, month }) => {
    const day = Math.floor(Math.random() * (25 - 20 + 1)) + 20;
    const date = new Date(year, month - 1, day);
    events.push({
      title: `Constelații ${monthNames[month - 1]}`,
      date,
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
    });
  });

  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
};

const eventDescriptions: Record<string, { description: string; details: string[] }> = {
  'Martie': {
    description: 'O seară magică de explorare a energiilor cosmice ale lunii martie. Vom analiza configurațiile astrale curente și impactul lor asupra evoluției noastre spirituale.',
    details: [
      'Analiza tranzitelor planetare principale',
      'Interpretarea energiei lunii martie',
      'Meditații ghidate de aliniere cosmică',
      'Exerciții practice de integrare a energiilor',
      'Discuții de grup și împărtășire experiențe',
      'Materiale suport și ghiduri personalizate',
    ],
  },
  'Aprilie': {
    description: 'Explorăm energiile de transformare ale lunii aprilie. Un workshop intensiv despre cum să folosim influențele planetare pentru creștere personală și spirituală.',
    details: [
      'Energii de transformare și renaștere',
      'Analiza aspectelor majore ale lunii',
      'Tehnici de manifestare și creare',
      'Ritualuri de eliberare și reînnoire',
      'Interacțiuni de grup și suport comunitar',
      'Resurse continue după workshop',
    ],
  },
  'Mai': {
    description: 'Luna mai aduce energii de expansiune și comunicare. Vom explora cum să folosim aceste influențe pentru a ne exprima autentic și a ne conecta cu ceilalți.',
    details: [
      'Energii de comunicare și expresie',
      'Explorarea relațiilor și conexiunilor',
      'Tehnici de exprimare personală',
      'Exerciții de comunicare conștientă',
      'Meditații de conectare în grup',
      'Suport continuu și comunitate',
    ],
  },
  'Iunie': {
    description: 'Luna iunie aduce energii de expansiune și comunicare. Vom explora cum să folosim aceste influențe pentru a ne exprima autentic și a ne conecta cu ceilalți.',
    details: [
      'Energii de comunicare și expresie',
      'Explorarea relațiilor și conexiunilor',
      'Tehnici de exprimare personală',
      'Exerciții de comunicare conștientă',
      'Meditații de conectare în grup',
      'Suport continuu și comunitate',
    ],
  },
  'Iulie': {
    description: 'Luna iulie ne invită la explorarea emoțiilor profunde și a intuiției. Un workshop despre cum să navigăm apele emoționale cu înțelepciune și grație.',
    details: [
      'Explorarea emoțiilor și intuiției',
      'Tehnici de echilibrare emoțională',
      'Meditații de conectare cu sinele interior',
      'Exerciții de dezvoltare a intuiției',
      'Sprijin emoțional și vindecare în grup',
      'Instrumente practice pentru viața de zi cu zi',
    ],
  },
  'August': {
    description: 'Luna august aduce energii de manifestare și recoltare. Vom explora cum să folosim aceste influențe pentru a materializa visele și a ne bucura de roadele muncii noastre.',
    details: [
      'Energii de manifestare și abundență',
      'Tehnici de creare a realității dorite',
      'Exerciții de recunoștință și celebrare',
      'Planificare pentru sezonul următor',
      'Integrare și celebrare în comunitate',
      'Resurse pentru continuarea călătoriei',
    ],
  },
  'Septembrie': {
    description: 'Luna septembrie aduce energii de bilanț și evaluare. Vom explora cum să ne analizăm progresul și să ne pregătim pentru noi obiective.',
    details: [
      'Energii de reflecție și evaluare',
      'Analiza ciclurilor personale',
      'Tehnici de eliberare a ce nu mai serveste',
      'Planificare pentru viitor',
      'Meditații de clarificare',
      'Suport în grup pentru transformare',
    ],
  },
  'Octombrie': {
    description: 'Luna octombrie aduce energii de transformare profundă. Vom explora cum să ne eliberăm de blocaje și să ne îmbrățișăm potențialul.',
    details: [
      'Energii de transformare și vindecare',
      'Eliberarea pattern-urilor limitante',
      'Tehnici de auto-vindecare',
      'Meditații de transformare',
      'Sprijin în comunitate',
      'Resurse pentru continuarea vindecării',
    ],
  },
  'Noiembrie': {
    description: 'Luna noiembrie ne invită la recunoștință și completare. Vom explora cum să încheiem cicluri și să ne pregătim pentru nou început.',
    details: [
      'Energii de recunoștință și încheiere',
      'Tehnici de eliberare și completare',
      'Meditații de gratitudine',
      'Planificare pentru noul an',
      'Celebrarea realizărilor',
      'Suport comunitar',
    ],
  },
  'Decembrie': {
    description: 'Luna decembrie aduce energii de revelație și iluminare. Vom explora cum să ne conectăm cu adevărul interior și să ne manifestăm destiny.',
    details: [
      'Energii de revelație și înțelepciune',
      'Conectare cu scopul vieții',
      'Tehnici de manifestare',
      'Meditații de iluminare',
      'Împărtășire în comunitate',
      'Pregătire pentru noul an',
    ],
  },
};

const Events = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const constelatiiEvents = generateConstelatiiEvents();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => stopLoading(), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const now = new Date();
  const upcomingEvents = constelatiiEvents
    .filter(event => event.date >= now)
    .slice(0, 6);

  const getEventInfo = (title: string) => {
    const monthMatch = title.match(/Constelații (.+)/);
    if (monthMatch && monthMatch[1]) {
      return eventDescriptions[monthMatch[1]] || eventDescriptions['Martie'];
    }
    return eventDescriptions['Martie'];
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pt-24 pb-16">
        <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] top-0 right-0 opacity-20"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
              Evenimente Astrologice
            </h1>
            <p className="text-cosmic-300 text-lg max-w-2xl mx-auto">
              Workshopuri și sesiuni de grup pentru explorarea energiilor cosmice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => {
              const eventInfo = getEventInfo(event.title);
              return (
                <div
                  key={index}
                  className="glass-card overflow-hidden hover:bg-white/[0.1] transition-all duration-300 group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="font-display text-xl font-bold text-white group-hover:text-cosmic-300 transition-colors">
                        {event.title}
                      </h2>
                      <span className="text-gold-400 font-semibold text-lg flex-shrink-0 ml-4">
                        {event.price}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-cosmic-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-cosmic-400" />
                        <span>{event.date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-cosmic-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-cosmic-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-cosmic-200/80 text-sm leading-relaxed mb-4">
                      {eventInfo.description}
                    </p>

                    <div className="mb-5">
                      <h3 className="text-xs font-semibold text-cosmic-400 uppercase tracking-wider mb-3">Ce include</h3>
                      <ul className="space-y-2">
                        {eventInfo.details.slice(0, 4).map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-cosmic-200/70 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cosmic-500 mt-1.5 flex-shrink-0"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:from-cosmic-500 hover:to-cosmic-400 transition-all duration-300 shadow-glow-purple cursor-pointer">
                      <Users className="w-4 h-4" />
                      Rezervă locul
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
