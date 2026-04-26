import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import ScrollToTopButton from "@/components/scroll/ScrollToTopButton";
import { useLoading } from "@/hooks/useLoading";
import { CONSTELLATION_EVENTS } from "@/data/events";
import {
  Star,
  Sparkles,
  Moon,
  Compass,
  ArrowRight,
  ChevronDown,
  Check,
  Package,
  Calendar,
  Users,
} from "lucide-react";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(),
  );
  const { startLoading, stopLoading } = useLoading();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => stopLoading(), 1500);
    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, [visibleSections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const services = [
    {
      title: "Calculatorul Astral",
      description:
        "Află pozițiile exacte ale planetelor în timp real și interpretarea influențelor astrologice curente.",
      icon: <Star className="w-7 h-7" />,
      link: "/servicii/calculatorul-astral",
      badge: "Gratuit",
    },
    {
      title: "Calculatorul Fazei Lunare",
      description:
        "Descopera influența fazelor lunare asupra vieții tale și profită de energia fiecărei luni.",
      icon: <Moon className="w-7 h-7" />,
      link: "/servicii/calculatorul-fazei-lunare",
      badge: "Gratuit",
    },
    {
      title: "Astrograma Natală și Karmică",
      description:
        "Sesiune live în care aducem claritate și direcție prin înțelegerea astrogramei tale!",
      icon: <Sparkles className="w-7 h-7" />,
      link: "/astrograma/lumina-natala-si-karmica",
      price: "75€",
    },
    {
      title: "Astrograma Relațională",
      description: "Descoperă dinamica relației tale!",
      icon: <Star className="w-7 h-7" />,
      link: "/astrograma/lumina-relationala",
      price: "75€",
    },
    {
      title: "Astrograma Previzională",
      description:
        "Sesiune live în care studiem predispozițiile tale pe următorul an",
      icon: <Compass className="w-7 h-7" />,
      link: "/astrograma/lumina-previzionala",
      price: "75€",
    },
  ];

  const products = [
    {
      title: "Soarele, strălucirea ta",
      price: "Gratuit",
      type: "PDF",
      badge: "Gratuit",
      description: "Prin care descoperi semnificația zodiei tale",
      link: "/produse/soarele-stralucirea-ta",
    },
    {
      title: "Ghid Saturn în Berbec",
      price: "15€",
      type: "Ghid digital",
      description:
        "Un ghid complet cu tot ce ai nevoie să știi despre tranzitul lui Saturn",
      link: "/produse/ghidul-lui-saturn-in-berbec",
    },
  ];

  const features = [
    {
      icon: <Check className="w-5 h-5" />,
      title: "Interpretări Profunde",
      description:
        "Analize astrologice bazate pe tradiție și cunoștințe moderne.",
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Ghidare Personalizată",
      description:
        "Fiecare hartă este unică, iar interpretarea reflectă individualitatea ta.",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Dezvoltare Spirituală",
      description: "Instrumente pentru autocunoaștere și evoluție personală.",
    },
    {
      icon: <Moon className="w-5 h-5" />,
      title: "Conexiune Cosmică",
      description: "Înțelege relația dintre ciclurile cosmice și viața ta.",
    },
  ];

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={isScrolled} />

      <main className="relative">
        {/* ═══════ HERO SECTION ═══════ */}
        <section className="flex overflow-hidden relative justify-center items-center min-h-screen">
          <div className="absolute inset-0 stars">
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
          </div>

          <div className="cosmic-orb cosmic-orb-purple w-[600px] h-[600px] -top-40 -right-40 opacity-25 animate-pulse-soft"></div>
          <div
            className="cosmic-orb cosmic-orb-gold w-[400px] h-[400px] bottom-20 -left-40 opacity-20 animate-pulse-soft"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="cosmic-orb cosmic-orb-purple w-[200px] h-[200px] top-1/3 left-1/4 opacity-15 animate-pulse-soft"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="container relative z-10 px-6 py-32 mx-auto text-center">
            <div className="mx-auto max-w-4xl">
              <p className="mb-6 text-sm font-medium tracking-[0.3em] uppercase text-gold-400/80 font-display animate-fade-in-down">
                Servicii de Astrologie
              </p>

              <h1
                className="mb-8 text-6xl font-bold leading-tight font-display md:text-7xl lg:text-8xl animate-fade-in-up"
                style={{ animationDelay: "0.15s" }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cosmic-200 to-cosmic-300">
                  Astro
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
                  Lumin
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-cosmic-400">
                  a
                </span>
              </h1>

              <p
                className="mx-auto mb-4 max-w-2xl text-lg italic md:text-xl text-cosmic-200/70 font-display animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                by Carmen Ilie
              </p>

              <p
                className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed md:text-2xl text-cosmic-100/60 font-body animate-fade-in-up"
                style={{ animationDelay: "0.45s" }}
              >
                Deblochează secretele propriului destin prin înțelepciunea
                străveche a stelelor
              </p>

              <div
                className="flex flex-col gap-5 justify-center sm:flex-row animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <button
                  onClick={() => scrollToSection("services")}
                  className="inline-flex relative gap-3 items-center px-10 py-5 font-semibold text-white bg-gradient-to-r rounded-full luxury-button group from-cosmic-600 via-cosmic-500 to-cosmic-600 hover:from-cosmic-500 hover:to-cosmic-500 shadow-luxury-purple"
                >
                  <span>Explorează Servicii</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-400 group-hover:translate-x-1.5" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex gap-3 items-center px-10 py-5 font-semibold rounded-full glass-luxury-hover text-cosmic-100 hover:text-white"
                >
                  <span>Contactează-mă</span>
                </button>
              </div>
            </div>

            <div className="flex absolute bottom-12 left-1/2 flex-col gap-3 items-center -translate-x-1/2 animate-float-gentle">
              <span className="text-xs tracking-widest uppercase text-cosmic-400/50">
                Descoperă
              </span>
              <div className="flex justify-center pt-2 w-6 h-10 rounded-full border border-cosmic-400/30">
                <div className="w-1.5 h-3 bg-cosmic-400/50 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t to-transparent pointer-events-none from-midnight-950 via-midnight-950/80"></div>
        </section>

        {/* ═══════ SERVICES SECTION ═══════ */}
        <section
          id="services"
          data-animate
          className={`py-28 relative overflow-hidden transition-all duration-700 ${
            visibleSections.has("services")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="cosmic-orb cosmic-orb-purple w-[500px] h-[500px] top-0 right-0 opacity-15"></div>
          <div className="cosmic-orb cosmic-orb-gold w-[300px] h-[300px] bottom-0 left-0 opacity-10"></div>

          <div className="container relative z-10 px-6 mx-auto">
            <div className="mb-20 text-center">
              <p className="mb-4 text-sm font-medium tracking-[0.25em] uppercase text-gold-400/70 font-display">
                Ofertele Noastre
              </p>
              <h2 className="mb-6 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white font-display md:text-5xl via-cosmic-100 to-cosmic-200">
                Servicii Astrologice
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-cosmic-300/70">
                Descoperă gama completă de servicii astrologice, de la analize
                gratuite la consultații personalizate
              </p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {services.slice(0, 2).map((service, index) => (
                  <Link
                    key={index}
                    to={service.link}
                    className="overflow-hidden relative p-8 cursor-pointer group glass-luxury-hover"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br to-transparent rounded-bl-full from-cosmic-500/10"></div>

                    {service.badge && (
                      <span className="absolute top-6 right-6 px-4 py-1.5 text-xs font-semibold rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                        {service.badge}
                      </span>
                    )}
                    {service.price && (
                      <span className="absolute top-6 right-6 px-4 py-1.5 text-xs font-semibold rounded-full bg-cosmic-500/20 text-cosmic-300 border border-cosmic-500/30">
                        {service.price}
                      </span>
                    )}

                    <div className="flex justify-center items-center mb-6 w-14 h-14 bg-gradient-to-br rounded-2xl transition-transform duration-500 from-cosmic-500/30 to-gold-500/20 text-cosmic-400 group-hover:scale-110">
                      {service.icon}
                    </div>

                    <h3 className="mb-3 text-2xl font-semibold text-white transition-colors font-display group-hover:text-gold-300 duration-400">
                      {service.title}
                    </h3>
                    <p className="mb-6 text-base leading-relaxed text-cosmic-300/70">
                      {service.description}
                    </p>

                    <span className="text-sm font-medium luxury-link text-cosmic-400 group-hover:text-gold-300">
                      Află mai multe <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {services.slice(2, 5).map((service, index) => (
                  <Link
                    key={index}
                    to={service.link}
                    className="overflow-hidden relative p-7 cursor-pointer group glass-luxury-hover"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl to-transparent rounded-bl-full from-gold-500/10"></div>

                    {service.badge && (
                      <span className="absolute top-5 right-5 px-3 py-1 text-xs font-semibold rounded-full border bg-gold-500/20 text-gold-400 border-gold-500/30">
                        {service.badge}
                      </span>
                    )}
                    {service.price && (
                      <span className="absolute top-5 right-5 px-3 py-1 text-xs font-semibold rounded-full border bg-cosmic-500/20 text-cosmic-300 border-cosmic-500/30">
                        {service.price}
                      </span>
                    )}

                    <div className="flex justify-center items-center mb-5 w-12 h-12 rounded-xl transition-all bg-cosmic-500/20 text-cosmic-400 group-hover:scale-110 group-hover:bg-cosmic-500/30 duration-400">
                      {service.icon}
                    </div>

                    <h3 className="mb-2 text-xl font-semibold text-white transition-colors font-display group-hover:text-gold-300 duration-400">
                      {service.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-cosmic-300/70">
                      {service.description}
                    </p>

                    <span className="text-sm font-medium luxury-link text-cosmic-400 group-hover:text-gold-300">
                      Descoperă <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ DIVIDER ═══════ */}
        <div className="mx-auto max-w-4xl cosmic-divider"></div>

        {/* ═══════ PRODUCTS SECTION ═══════ */}
        <section
          id="products-preview"
          data-animate
          className={`py-28 relative transition-all duration-700 ${
            visibleSections.has("products-preview")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] bottom-0 right-0 opacity-10"></div>

          <div className="container relative z-10 px-6 mx-auto">
            <div className="mb-20 text-center">
              <p className="mb-4 text-sm font-medium tracking-[0.25em] uppercase text-gold-400/70 font-display">
                Resurse Exclusive
              </p>
              <h2 className="mb-4 text-4xl font-bold text-white font-display md:text-5xl">
                Produse Digitale
              </h2>
              <p className="mx-auto max-w-xl text-lg text-cosmic-300/70">
                Ghiduri și rapoarte pentru auto-cunoaștere prin astrologie
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 mx-auto mb-8 max-w-4xl md:grid-cols-2">
              {products.map((product, index) => (
                <Link
                  key={index}
                  to={product.link}
                  className="overflow-hidden relative p-8 cursor-pointer group glass-luxury-hover"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl to-transparent rounded-bl-full from-gold-500/10"></div>

                  {product.badge ? (
                    <span className="absolute top-6 right-6 px-4 py-1.5 text-xs font-semibold rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                      {product.badge}
                    </span>
                  ) : (
                    <span className="absolute top-6 right-6 px-4 py-1.5 text-xs font-semibold rounded-full bg-cosmic-500/20 text-cosmic-300 border border-cosmic-500/30">
                      {product.price}
                    </span>
                  )}

                  <div className="flex justify-center items-center mb-6 w-14 h-14 rounded-2xl transition-all duration-500 bg-cosmic-500/20 text-cosmic-400 group-hover:scale-110 group-hover:bg-cosmic-500/30">
                    <Package className="w-6 h-6" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-white transition-colors font-display group-hover:text-gold-300 duration-400">
                    {product.title}
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-cosmic-300/70">
                    {product.description}
                  </p>

                  <span className="text-sm font-medium luxury-link text-cosmic-400 group-hover:text-gold-300">
                    Vezi produsul <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ DIVIDER ═══════ */}
        <div className="mx-auto max-w-4xl cosmic-divider"></div>

        {/* ═══════ EVENTS SECTION ═══════ */}
        <section
          id="events-preview"
          data-animate
          className={`py-28 relative transition-all duration-700 ${
            visibleSections.has("events-preview")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="cosmic-orb cosmic-orb-gold w-[400px] h-[400px] top-0 left-0 opacity-10"></div>
          <div className="cosmic-orb cosmic-orb-purple w-[300px] h-[300px] bottom-0 right-0 opacity-10"></div>

          <div className="container relative z-10 px-6 mx-auto">
            <div className="mb-20 text-center">
              <p className="mb-4 text-sm font-medium tracking-[0.25em] uppercase text-gold-400/70 font-display">
                Experiențe Unice
              </p>
              <h2 className="mb-4 text-4xl font-bold text-white font-display md:text-5xl">
                Evenimente
              </h2>
              <p className="mx-auto max-w-xl text-lg text-cosmic-300/70">
                Workshopuri și sesiuni de grup pentru explorarea energiilor
                cosmice
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 mx-auto mb-8 max-w-4xl md:grid-cols-2">
              {(() => {
                const now = new Date();
                const upcomingEvents = CONSTELLATION_EVENTS.filter(
                  (event) => event.date >= now,
                ).slice(0, 2);
                return upcomingEvents.map((event, index) => (
                  <Link
                    key={index}
                    to={`/evenimente/rezervare/${event.id}`}
                    className="overflow-hidden relative p-8 cursor-pointer group glass-luxury-hover"
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl to-transparent rounded-bl-full from-cosmic-500/10"></div>

                    <span className="absolute top-6 right-6 px-4 py-1.5 text-xs font-semibold rounded-full bg-cosmic-500/20 text-cosmic-300 border border-cosmic-500/30">
                      {event.price} €
                    </span>

                    <div className="flex justify-center items-center mb-6 w-14 h-14 rounded-2xl transition-all duration-500 bg-cosmic-500/20 text-cosmic-400 group-hover:scale-110 group-hover:bg-cosmic-500/30">
                      <Calendar className="w-6 h-6" />
                    </div>

                    <h3 className="mb-4 text-xl font-semibold text-white transition-colors font-display group-hover:text-gold-300 duration-400">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap gap-5 mb-6 text-sm text-cosmic-300/70">
                      <div className="flex gap-2 items-center">
                        <Calendar className="w-4 h-4 text-gold-400" />
                        <span>
                          {event.date.toLocaleDateString("ro-RO", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Users className="w-4 h-4 text-gold-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <span className="text-sm font-medium luxury-link text-cosmic-400 group-hover:text-gold-300">
                      Rezervă <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ));
              })()}
            </div>
          </div>
        </section>

        {/* ═══════ DIVIDER ═══════ */}
        <div className="mx-auto max-w-4xl cosmic-divider"></div>

        {/* ═══════ FEATURES SECTION ═══════ */}
        <section
          id="features"
          data-animate
          className={`py-28 relative transition-all duration-700 ${
            visibleSections.has("features")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"></div>

          <div className="container px-6 mx-auto">
            <div className="mb-20 text-center">
              <p className="mb-4 text-sm font-medium tracking-[0.25em] uppercase text-gold-400/70 font-display">
                De Ce Să Ne Alegi
              </p>
              <h2 className="mb-5 text-4xl font-bold text-white font-display md:text-5xl">
                De ce AstroLumina?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-cosmic-300/70">
                O abordare autentică a astrologiei, bazată pe cunoștințe
                profunde și dedicare
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center items-center mx-auto mb-6 w-16 h-16 bg-gradient-to-br rounded-2xl transition-all duration-500 glass-luxury-hover from-cosmic-500/20 to-gold-500/10 text-cosmic-400 group-hover:scale-110 group-hover:from-cosmic-500/30 group-hover:to-gold-500/20">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white transition-colors font-display group-hover:text-gold-300 duration-400">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-cosmic-300/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ DIVIDER ═══════ */}
        <div className="mx-auto max-w-4xl cosmic-divider"></div>

        {/* ═══════ CONTACT SECTION ═══════ */}
        <section
          id="contact"
          data-animate
          className={`py-28 relative transition-all duration-700 ${
            visibleSections.has("contact")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="cosmic-orb cosmic-orb-gold w-[400px] h-[400px] bottom-0 left-0 opacity-15"></div>
          <div className="cosmic-orb cosmic-orb-purple w-[300px] h-[300px] top-0 right-0 opacity-10"></div>

          <div className="container relative z-10 px-6 mx-auto">
            <div className="mx-auto max-w-5xl">
              <div className="mb-16 text-center">
                <p className="mb-4 text-sm font-medium tracking-[0.25em] uppercase text-gold-400/70 font-display">
                  Legătura Cu Noi
                </p>
                <h2 className="mb-5 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white font-display md:text-5xl via-cosmic-100 to-cosmic-200">
                  Contact
                </h2>
                <p className="text-lg text-cosmic-300/70">
                  Ai întrebări sau dorești o consultație? Ia legătura cu mine.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="p-10 space-y-8 glass-luxury-hover">
                  <h3 className="mb-8 text-2xl font-semibold text-white font-display">
                    Date de Contact
                  </h3>

                  <div className="space-y-6">
                    <a
                      href="mailto:contact@astrolumina.ro"
                      className="flex gap-4 items-center transition-all cursor-pointer duration-400 text-cosmic-200 hover:text-white group"
                    >
                      <div className="flex justify-center items-center w-12 h-12 rounded-xl transition-all bg-cosmic-500/20 text-cosmic-400 group-hover:scale-110 group-hover:bg-cosmic-500/30 duration-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="mb-1 text-xs tracking-wider uppercase text-cosmic-400/60">
                          Email
                        </p>
                        <span className="text-base transition-transform group-hover:translate-x-1 duration-400">
                          contact@astrolumina.ro
                        </span>
                      </div>
                    </a>

                    <a
                      href="tel:+40123456789"
                      className="flex gap-4 items-center transition-all cursor-pointer duration-400 text-cosmic-200 hover:text-white group"
                    >
                      <div className="flex justify-center items-center w-12 h-12 rounded-xl transition-all bg-cosmic-500/20 text-cosmic-400 group-hover:scale-110 group-hover:bg-cosmic-500/30 duration-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="mb-1 text-xs tracking-wider uppercase text-cosmic-400/60">
                          Telefon
                        </p>
                        <span className="text-base transition-transform group-hover:translate-x-1 duration-400">
                          +40 123 456 789
                        </span>
                      </div>
                    </a>

                    <div className="flex gap-4 items-center text-cosmic-200">
                      <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-cosmic-500/20 text-cosmic-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="mb-1 text-xs tracking-wider uppercase text-cosmic-400/60">
                          Program
                        </p>
                        <span className="text-base">
                          Luni - Vineri, 10:00 - 18:00
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center text-cosmic-200">
                      <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-cosmic-500/20 text-cosmic-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="mb-1 text-xs tracking-wider uppercase text-cosmic-400/60">
                          Locație
                        </p>
                        <span className="text-base">București, România</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-10 glass-luxury-hover">
                  <h3 className="mb-5 text-2xl font-semibold text-white font-display">
                    Hai să Discutăm
                  </h3>
                  <p className="mb-8 text-base leading-relaxed text-cosmic-300/70">
                    Ai întrebări despre serviciile noastre sau dorești să
                    programezi o consultație? Vizitează pagina noastră de
                    contact pentru mai multe detalii și răspunsuri la
                    întrebările frecvente.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex gap-3 items-center self-start px-8 py-4 font-semibold text-white bg-gradient-to-r rounded-full luxury-button group from-cosmic-600 via-cosmic-500 to-cosmic-600 hover:from-cosmic-500 hover:to-cosmic-500 shadow-luxury-purple"
                  >
                    <span>Vezi Pagina de Contact</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-400 group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer className="px-6 py-8 border-t border-white/5">
          <div className="mx-auto max-w-6xl text-sm text-center text-cosmic-400">
            <p>
              &copy; {new Date().getFullYear()} AstroLumina by Carmen Ilie.
              Toate drepturile rezervate.
            </p>
          </div>
        </footer>

        <ScrollToTopButton />
      </main>
    </div>
  );
}

export default App;
