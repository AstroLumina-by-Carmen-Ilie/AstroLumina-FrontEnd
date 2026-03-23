import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useLoading } from '../contexts/LoadingContext';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

const Events = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { startLoading, stopLoading } = useLoading();

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

  const events = [
    {
      id: 'constellations-april',
      title: 'Constelații Aprilie',
      description: 'O seară magică de explorare a energiilor cosmice ale lunii aprilie. Vom analiza configurațiile astrale curente și impactul lor asupra evoluției noastre spirituale.',
      details: [
        'Analiza tranzitelor planetare principale',
        'Interpretarea energiei lunii aprilie',
        'Meditații ghidate de aliniere cosmică',
        'Exerciții practice de integrare a energiilor',
        'Discuții de grup și împărtășire experiențe',
        'Materiale suport și ghiduri personalizate',
      ],
      date: '15 Aprilie 2026',
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
    },
    {
      id: 'constellations-may',
      title: 'Constelații Mai',
      description: 'Explorăm energiile de transformare ale lunii mai. Un workshop intensiv despre cum să folosim influențele planetare pentru creștere personală și spirituală.',
      details: [
        'Energii de transformare și renaștere',
        'Analiza aspectelor majore ale lunii',
        'Tehnici de manifestare și creare',
        'Ritualuri de eliberare și reînnoire',
        'Interacțiuni de grup și suport comunitar',
        'Resurse continue după workshop',
      ],
      date: '20 Mai 2026',
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
    },
    {
      id: 'constellations-june',
      title: 'Constelații Iunie',
      description: 'Luna iunie aduce energii de expansiune și comunicare. Vom explora cum să folosim aceste influențe pentru a ne exprima autentic și a ne conecta cu ceilalți.',
      details: [
        'Energii de comunicare și expresie',
        'Explorarea relațiilor și conexiunilor',
        'Tehnici de exprimare personală',
        'Exerciții de comunicare conștientă',
        'Meditații de conectare în grup',
        'Suport continuu și comunitate',
      ],
      date: '18 Iunie 2026',
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
    },
    {
      id: 'constellations-july',
      title: 'Constelații Iulie',
      description: 'Luna iulie ne invită la explorarea emoțiilor profunde și a intuiției. Un workshop despre cum să navigăm apele emoționale cu înțelepciune și grație.',
      details: [
        'Explorarea emoțiilor și intuiției',
        'Tehnici de echilibrare emoțională',
        'Meditații de conectare cu sinele interior',
        'Exerciții de dezvoltare a intuiției',
        'Sprijin emoțional și vindecare în grup',
        'Instrumente practice pentru viața de zi cu zi',
      ],
      date: '16 Iulie 2026',
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
    },
    {
      id: 'constellations-august',
      title: 'Constelații August',
      description: 'Luna august aduce energii de manifestare și recoltare. Vom explora cum să folosim aceste influențe pentru a materializa visele și a ne bucura de roadele muncii noastre.',
      details: [
        'Energii de manifestare și abundență',
        'Tehnici de creare a realității dorite',
        'Exerciții de recunoștință și celebrare',
        'Planificare pentru sezonul următor',
        'Integrare și celebrare în comunitate',
        'Resurse pentru continuarea călătoriei',
      ],
      date: '20 August 2026',
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
    },
  ];

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
            {events.map((event) => (
              <div
                key={event.id}
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
                      <span>{event.date}</span>
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
                    {event.description}
                  </p>

                  <div className="mb-5">
                    <h3 className="text-xs font-semibold text-cosmic-400 uppercase tracking-wider mb-3">Ce include</h3>
                    <ul className="space-y-2">
                      {event.details.slice(0, 4).map((detail, index) => (
                        <li key={index} className="flex items-start gap-2 text-cosmic-200/70 text-sm">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
