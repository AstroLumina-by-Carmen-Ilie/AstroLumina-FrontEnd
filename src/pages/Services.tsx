import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { useLoading } from '../hooks/useLoading';
import { ArrowRight, Clock, Star, Sparkles, Moon, Compass, Calendar } from 'lucide-react';

const Services = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => stopLoading(), 1500);
    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  const services = [
    {
      id: 'pozitia-astrelor',
      title: 'Poziția Astrelor',
      description: 'Află pozițiile exacte ale planetelor în timp real și interpretarea influențelor astrologice curente.',
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
      id: 'faza-lunara',
      title: 'Faza Lunara',
      description: 'Descoperă influența fazelor lunare asupra vieții tale și profită de energia fiecărei luni.',
      details: [
        'Informații despre faza lunii în timp real',
        'Interpretarea influenței fazei lunare curente',
        'Sfaturi pentru valorificarea energiei lunare',
        'Ritualuri și practici pentru fiecare fază',
        'Acces gratuit 24/7',
      ],
      duration: 'Acces instant',
      price: 'Gratuit',
      link: '/servicii/faza-lunara',
      icon: <Moon className="w-6 h-6" />,
      highlight: true,
    },
    {
      id: 'astrograma-natala-karmica',
      title: 'Astrograma Natală și Karmică',
      description: 'Sesiune live în care aducem claritate și direcție prin înțelegerea astrogramei tale!',
      details: [
        'Analiza detaliată a hărții tale astrologice de naștere',
        'Interpretarea poziției Soarelui, Lunii și Ascendentului',
        'Explorarea ciclurilor karmice și a lecțiilor de viață',
        'Identificarea nodurilor lunare și a destinului personal',
        'Recomandări pentru dezvoltare personală și spirituală',
      ],
      duration: '90 minute',
      price: '75€',
      link: '/servicii/lumina-natala',
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      id: 'astrograma-relationala',
      title: 'Astrograma Relațională',
      description: 'Descoperă dinamica relației tale!',
      details: [
        'Analiza compatibilității prin sinastrie',
        'Compararea hărților natale ale celor două persoane',
        'Evaluarea compatibilității emoționale și intelectuale',
        'Identificarea punctelor forte și a provocărilor în relație',
        'Sfaturi pentru îmbunătățirea comunicării și conexiunii',
      ],
      duration: '90 minute',
      price: '75€',
      link: '/servicii/lumina-relationala',
      icon: <Star className="w-6 h-6" />,
    },
    {
      id: 'astrograma-previzionala',
      title: 'Astrograma Previzională',
      description: 'Sesiune live în care studiem predispozițiile tale pe următorul an',
      details: [
        'Analiza tranzitelor planetare pentru anul următor',
        'Identificarea perioadelor favorabile și provocărilor',
        'Interpretarea influențelor planetare majore',
        'Strategii pentru maximizarea oportunităților',
        'Recomandări personalizate pentru dezvoltare',
      ],
      duration: '90 minute',
      price: '75€',
      link: '/servicii/lumina-previzionala',
      icon: <Compass className="w-6 h-6" />,
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
