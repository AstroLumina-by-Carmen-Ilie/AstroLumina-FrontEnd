import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useLoading } from '../contexts/LoadingContext';

const Events = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  // Loading effect
  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
        'Materiale suport și ghiduri personalizate'
      ],
      date: '15 Aprilie 2024',
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
      type: 'Workshop online'
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
        'Resurse continue după workshop'
      ],
      date: '20 Mai 2024',
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
      type: 'Workshop online'
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
        'Suport continuu și comunitate'
      ],
      date: '18 Iunie 2024',
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
      type: 'Workshop online'
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
        'Instrumente practice pentru viața de zi cu zi'
      ],
      date: '16 Iulie 2024',
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
      type: 'Workshop online'
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
        'Resurse pentru continuarea călătoriei'
      ],
      date: '20 August 2024',
      time: '19:00 - 22:00',
      location: 'Online (Zoom)',
      price: '120 RON',
      type: 'Workshop online'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Starry background - fixed position */}
      <div className="fixed inset-0 bg-black stars">
        {/* Shooting stars */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      {/* Navbar */}
      <Navbar isScrolled={isScrolled} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-amber-200 mb-12">
          Evenimente Astrologice
        </h1>
        
        <div className="grid gap-12">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-3xl font-bold text-amber-800 mb-4 md:mb-0">
                    {event.title}
                  </h2>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                      {event.type}
                    </div>
                    <div className="text-xl font-semibold text-amber-600">
                      {event.price}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-amber-700">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-amber-700">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-amber-700">{event.location}</span>
                  </div>
                </div>

                <p className="text-lg text-amber-700 mb-6">
                  {event.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-amber-800 mb-4">Ce include:</h3>
                  <ul className="space-y-3">
                    {event.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-amber-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors duration-200">
                  Rezervă locul
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
