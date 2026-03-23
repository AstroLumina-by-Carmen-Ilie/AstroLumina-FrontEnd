import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { useLoading } from '../contexts/LoadingContext';
import { ArrowRight, Clock, Star, Sparkles, Moon, Compass, Calendar } from 'lucide-react';

const Services = () => {
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

  const services = [
    {
      id: 'astral-positions',
      title: 'Poziția Planetelor în Timp Real',
      description: 'Află pozițiile exacte ale planetelor în acest moment și cum acestea influențează energia zilei.',
      details: [
        'Poziții planetare actualizate în timp real',
        'Interpretarea influențelor planetare curente',
        'Vizualizare grafică a pozițiilor planetare',
        'Informații despre semnele zodiacale curente',
        'Acces gratuit 24/7',
      ],
      duration: 'Acces instant',
      price: 'Gratuit',
      link: '/servicii/pozitia-astrelor',
      icon: <Star className="w-6 h-6" />,
      highlight: true,
    },
    {
      id: 'natal-chart',
      title: 'Interpretare Hartă Natală',
      description: 'O analiză detaliată a hărții tale astrologice de naștere, care dezvăluie aspectele cheie ale personalității tale.',
      details: [
        'Analiza detaliată a poziției Soarelui, Lunii și Ascendentului',
        'Interpretarea plasamentelor planetare în case și semne',
        'Identificarea aspectelor majore și impactul lor',
        'Descoperirea nodurilor lunare și a destinului personal',
        'Recomandări pentru dezvoltare personală bazate pe hartă',
      ],
      duration: '90 minute',
      price: '350 RON',
      link: '/servicii/lumina-natala',
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      id: 'karmic-chart',
      title: 'Interpretare Hartă Karmică',
      description: 'O explorare a ciclurilor karmice și a lecțiilor sufletului prin prisma astrologiei.',
      details: [
        'Analiza nodurilor lunare karmice',
        'Interpretarea planetelor retrograde',
        'Descoperirea lecțiilor de viață',
        'Identificarea pattern-urilor karmice',
        'Ghidare pentru evoluție spirituală',
      ],
      duration: '90 minute',
      price: '350 RON',
      link: '/servicii/lumina-karmica',
      icon: <Moon className="w-6 h-6" />,
    },
    {
      id: 'transit-forecast',
      title: 'Previziuni și Tranzituri',
      description: 'O explorare a influențelor astrologice curente și viitoare în viața ta.',
      details: [
        'Analiza tranzitelor planetare curente',
        'Previziuni pentru următoarele 12 luni',
        'Identificarea perioadelor favorabile',
        'Strategii pentru gestionarea provocărilor',
        'Sfaturi practice pentru maximizarea oportunităților',
      ],
      duration: '60 minute',
      price: '300 RON',
      link: '/servicii/consultatii',
      icon: <Compass className="w-6 h-6" />,
    },
    {
      id: 'relationship-synastry',
      title: 'Astrologie Relațională și Sinastrie',
      description: 'O analiză profundă a compatibilității și dinamicii dintre două persoane.',
      details: [
        'Compararea hărților natale ale celor două persoane',
        'Analiza aspectelor interplanetare',
        'Evaluarea compatibilității emoționale și intelectuale',
        'Identificarea punctelor forte și a provocărilor',
        'Sfaturi pentru îmbunătățirea comunicării',
      ],
      duration: '120 minute',
      price: '400 RON',
      link: '/servicii/consultatii',
      icon: <Star className="w-6 h-6" />,
    },
    {
      id: 'career-guidance',
      title: 'Ghidare în Carieră',
      description: 'O analiză specializată a potențialului profesional bazată pe harta natală.',
      details: [
        'Analiza casei a 10-a și a plasamentelor profesionale',
        'Identificarea talentelor și abilităților naturale',
        'Evaluarea ciclurilor planetare pentru schimbări în carieră',
        'Recomandări pentru dezvoltare profesională',
        'Strategii de aliniere a carierei cu scopul personal',
      ],
      duration: '90 minute',
      price: '350 RON',
      link: '/servicii/consultatii',
      icon: <Calendar className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pt-24 pb-16">
        {/* Cosmic orbs */}
        <div className="cosmic-orb cosmic-orb-purple w-[500px] h-[500px] -top-20 -right-40 opacity-20"></div>
        <div className="cosmic-orb cosmic-orb-gold w-[300px] h-[300px] bottom-20 -left-20 opacity-15"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
              Servicii Astrologice
            </h1>
            <p className="text-cosmic-300 text-lg max-w-2xl mx-auto">
              Descoperă gama completă de servicii disponibile
            </p>
          </div>

          <div className="grid gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="glass-card overflow-hidden hover:bg-white/[0.1] transition-all duration-300 group"
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cosmic-500/20 flex items-center justify-center text-cosmic-400 group-hover:bg-cosmic-500/30 transition-colors">
                        {service.icon}
                      </div>
                      <h2 className="font-display text-2xl font-bold text-white">
                        {service.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-cosmic-300 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className={`text-lg font-semibold ${service.highlight ? 'text-gold-400' : 'text-cosmic-300'}`}>
                        {service.price}
                      </div>
                    </div>
                  </div>

                  <p className="text-cosmic-200/80 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-cosmic-400 uppercase tracking-wider mb-4">Ce include</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3 text-cosmic-200/70 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-cosmic-500 mt-1.5 flex-shrink-0"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={service.link}
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white px-6 py-3 rounded-full font-medium hover:from-cosmic-500 hover:to-cosmic-400 transition-all duration-300 shadow-glow-purple cursor-pointer"
                  >
                    Află mai multe
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
