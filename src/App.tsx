import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import ScrollToTopButton from './components/scroll/ScrollToTopButton';
import { useLoading } from './contexts/LoadingContext';
import { Star, Sparkles, Moon, Compass, Calendar, ArrowRight, ChevronDown, Check } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const { startLoading, stopLoading } = useLoading();
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: 'Poziția Astrelor',
      description: 'Află pozițiile exacte ale planetelor în timp real și interpretarea influențelor astrologice curente.',
      icon: <Star className="w-7 h-7" />,
      link: '/servicii/pozitia-astrelor',
      badge: 'Gratuit',
    },
    {
      title: 'Lumina Natală',
      description: 'Descoperă-ți potențialul și provocările prin analiza detaliată a hărții tale astrologice de naștere.',
      icon: <Sparkles className="w-7 h-7" />,
      link: '/servicii/lumina-natala',
    },
    {
      title: 'Lumina Karmică',
      description: 'Explorează ciclurile karmice și lecțiile sufletului tău prin prisma astrologiei karmice.',
      icon: <Moon className="w-7 h-7" />,
      link: '/servicii/lumina-karmica',
    },
    {
      title: 'Previziuni și Tranzituri',
      description: 'Explorează influențele astrologice viitoare și pregătește-te pentru oportunitățile ce urmează.',
      icon: <Compass className="w-7 h-7" />,
      link: '/servicii/lumina-previzionala',
    },
    {
      title: 'Astrologie Relationala',
      description: 'Înțelege compatibilitatea și dinamica relațiilor tale prin analiza sinastriei.',
      icon: <Star className="w-7 h-7" />,
      link: '/servicii/lumina-relationala',
    },
    {
      title: 'Consultații Astrologice',
      description: 'Programează o consultație personalizată pentru ghidare detaliată pe tema care te interesează.',
      icon: <Calendar className="w-7 h-7" />,
      link: '/servicii/consultatii',
    },
  ];

  const features = [
    {
      icon: <Check className="w-5 h-5" />,
      title: 'Interpretări Profunde',
      description: 'Analize astrologice bazate pe tradiție și cunoștințe moderne.',
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: 'Ghidare Personalizată',
      description: 'Fiecare hartă este unică, iar interpretarea reflectă individualitatea ta.',
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: 'Dezvoltare Spirituală',
      description: 'Instrumente pentru autocunoaștere și evoluție personală.',
    },
    {
      icon: <Moon className="w-5 h-5" />,
      title: 'Conexiune Cosmică',
      description: 'Înțelege relația dintre ciclurile cosmice și viața ta.',
    },
  ];

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
      <Navbar isScrolled={isScrolled} />

      <main className="relative">
        {/* ═══════ HERO SECTION ═══════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Starry background */}
          <div className="absolute inset-0 stars">
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
          </div>

          {/* Cosmic orbs */}
          <div className="cosmic-orb cosmic-orb-purple w-[500px] h-[500px] -top-20 -right-20 animate-pulse-soft"></div>
          <div className="cosmic-orb cosmic-orb-gold w-[300px] h-[300px] bottom-20 -left-20 animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 py-32 text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                <Star className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-cosmic-200">Astrologie Profesionistă</span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="text-white">Astro</span>
                <span className="bg-gradient-to-r from-cosmic-400 to-gold-400 bg-clip-text text-transparent">Lumina</span>
              </h1>

              <p className="text-lg md:text-xl text-cosmic-200 mb-4 max-w-2xl mx-auto font-display italic">
                by Carmen Ilie
              </p>

              <p className="text-xl md:text-2xl text-cosmic-100/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Deblochează secretele propriului destin prin înțelepciunea străveche a stelelor
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection('services')}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white px-8 py-4 rounded-full font-semibold hover:from-cosmic-500 hover:to-cosmic-400 transition-all duration-300 shadow-glow-purple hover:shadow-glow-lg cursor-pointer"
                >
                  Explorează Servicii
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 bg-white/5 text-cosmic-200 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer backdrop-blur-sm"
                >
                  Contactează-mă
                </button>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-6 h-6 text-cosmic-300/50" />
            </div>
          </div>

          {/* Gradient fade */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-midnight-950 to-transparent"></div>
        </section>

        {/* ═══════ SERVICES SECTION ═══════ */}
        <section
          id="services"
          data-animate
          className={`py-24 relative overflow-hidden transition-all duration-700 ${
            visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] top-0 right-0 opacity-20"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
                Servicii Astrologice
              </h2>
              <p className="text-cosmic-300 text-lg max-w-2xl mx-auto">
                Descoperă gama completă de servicii astrologice, de la analize gratuite la consultații personalizate
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={service.link}
                  className="group glass-card p-6 hover:bg-white/[0.12] transition-all duration-300 cursor-pointer relative overflow-hidden"
                >
                  {service.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-gold-500/20 text-gold-400 rounded-full border border-gold-500/30">
                      {service.badge}
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-cosmic-500/20 flex items-center justify-center text-cosmic-400 mb-4 group-hover:bg-cosmic-500/30 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-cosmic-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-cosmic-300/80 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-cosmic-400 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                    Află mai multe <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ DIVIDER ═══════ */}
        <div className="cosmic-divider mx-auto max-w-4xl"></div>

        {/* ═══════ FEATURES SECTION ═══════ */}
        <section
          id="features"
          data-animate
          className={`py-24 relative transition-all duration-700 ${
            visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
                De ce AstroLumina?
              </h2>
              <p className="text-cosmic-300 text-lg max-w-2xl mx-auto">
                O abordare autentică a astrologiei, bazată pe cunoștințe profunde și dedicare
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cosmic-500/20 to-gold-500/20 flex items-center justify-center text-cosmic-400 mx-auto mb-5 group-hover:from-cosmic-500/30 group-hover:to-gold-500/30 transition-all duration-300 border border-white/5">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-cosmic-300/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ DIVIDER ═══════ */}
        <div className="cosmic-divider mx-auto max-w-4xl"></div>

        {/* ═══════ CONTACT SECTION ═══════ */}
        <section
          id="contact"
          data-animate
          className={`py-24 relative transition-all duration-700 ${
            visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="cosmic-orb cosmic-orb-gold w-[300px] h-[300px] bottom-0 left-0 opacity-20"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
                  Contact
                </h2>
                <p className="text-cosmic-300 text-lg">
                  Ai întrebări sau dorești o consultație? Ia legătura cu mine.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact info */}
                <div className="glass-card p-8 space-y-6">
                  <h3 className="font-display text-xl font-semibold text-white mb-6">Date de Contact</h3>

                  <div className="space-y-4">
                    <a href="mailto:contact@astrolumina.ro" className="flex items-center gap-3 text-cosmic-200 hover:text-white transition-colors group cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-cosmic-500/20 flex items-center justify-center text-cosmic-400 group-hover:bg-cosmic-500/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span>contact@astrolumina.ro</span>
                    </a>

                    <a href="tel:+40123456789" className="flex items-center gap-3 text-cosmic-200 hover:text-white transition-colors group cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-cosmic-500/20 flex items-center justify-center text-cosmic-400 group-hover:bg-cosmic-500/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span>+40 123 456 789</span>
                    </a>

                    <div className="flex items-center gap-3 text-cosmic-200">
                      <div className="w-10 h-10 rounded-lg bg-cosmic-500/20 flex items-center justify-center text-cosmic-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span>Luni - Vineri, 10:00 - 18:00</span>
                    </div>

                    <div className="flex items-center gap-3 text-cosmic-200">
                      <div className="w-10 h-10 rounded-lg bg-cosmic-500/20 flex items-center justify-center text-cosmic-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span>București, România</span>
                    </div>
                  </div>
                </div>

                {/* CTA card */}
                <div className="glass-card p-8 flex flex-col justify-center">
                  <h3 className="font-display text-xl font-semibold text-white mb-4">Hai să Discutăm</h3>
                  <p className="text-cosmic-300/80 mb-6 leading-relaxed">
                    Ai întrebări despre serviciile noastre sau dorești să programezi o consultație?
                    Vizitează pagina noastră de contact pentru mai multe detalii și răspunsuri la întrebările frecvente.
                  </p>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white px-6 py-3 rounded-full font-semibold hover:from-cosmic-500 hover:to-cosmic-400 transition-all duration-300 shadow-glow-purple self-start cursor-pointer"
                  >
                    Vezi Pagina de Contact
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer className="py-8 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center text-cosmic-400 text-sm">
            <p>&copy; {new Date().getFullYear()} AstroLumina by Carmen Ilie. Toate drepturile rezervate.</p>
          </div>
        </footer>

        <ScrollToTopButton />
      </main>
    </div>
  );
}

export default App;
