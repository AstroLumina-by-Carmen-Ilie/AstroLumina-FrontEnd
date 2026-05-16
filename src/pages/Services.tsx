import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { useLoading } from "@/hooks/useLoading";
import { ArrowRight, Clock, Star, Sparkles, Moon, Compass } from "lucide-react";

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsScrolled]);

  const services = [
    {
      id: "calculatorul-astral",
      title: "Calculatorul Astral",
      description:
        "Află pozițiile exacte ale planetelor în timp real și interpretarea influențelor astrologice curente.",
      details: [
        "Poziții planetare actualizate în timp real",
        "Interpretarea influențelor planetare curente",
        "Vizualizare grafică a pozițiilor planetare",
        "Informații despre semnele zodiacale curente",
        "Acces gratuit 24/7",
      ],
      duration: "Acces instant",
      price: "Gratuit",
      link: "/servicii/calculatorul-astral",
      icon: <Star className="w-6 h-6" />,
      highlight: true,
    },
    {
      id: "calculatorul-fazei-lunare",
      title: "Calculatorul Fazei Lunare",
      description:
        "Descoperă influența fazelor lunare asupra vieții tale și profită de energia fiecărei luni.",
      details: [
        "Informații despre faza lunii în timp real",
        "Interpretarea influenței fazei lunare curente",
        "Sfaturi pentru valorificarea energiei lunare",
        "Ritualuri și practici pentru fiecare fază",
        "Acces gratuit 24/7",
      ],
      duration: "Acces instant",
      price: "Gratuit",
      link: "/servicii/calculatorul-fazei-lunare",
      icon: <Moon className="w-6 h-6" />,
      highlight: true,
    },
    {
      id: "astrograma-natala-si-karmica",
      title: "Astrograma Natală și Karmică",
      description:
        "Sesiune live în care aducem claritate și direcție prin înțelegerea astrogramei tale!",
      details: [
        "Analiza detaliată a hărții tale astrologice de naștere",
        "Interpretarea poziției Soarelui, Lunii și Ascendentului",
        "Explorarea ciclurilor karmice și a lecțiilor de viață",
        "Identificarea nodurilor lunare și a destinului personal",
        "Recomandări pentru dezvoltare personală și spirituală",
      ],
      duration: "90 minute",
      price: "75€",
      link: "/astrograma/lumina-natala-si-karmica",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      id: "astrograma-relationala",
      title: "Astrograma Relațională",
      description: "Descoperă dinamica relației tale!",
      details: [
        "Analiza compatibilității prin sinastrie",
        "Compararea hărților natale ale celor două persoane",
        "Evaluarea compatibilității emoționale și intelectuale",
        "Identificarea punctelor forte și a provocărilor în relație",
        "Sfaturi pentru îmbunătățirea comunicării și conexiunii",
      ],
      duration: "90 minute",
      price: "75€",
      link: "/astrograma/lumina-relationala",
      icon: <Star className="w-6 h-6" />,
    },
    {
      id: "astrograma-previzionala",
      title: "Astrograma Previzională",
      description:
        "Sesiune live în care studiem predispozițiile tale pe următorul an",
      details: [
        "Analiza tranzitelor planetare pentru anul următor",
        "Identificarea perioadelor favorabile și provocărilor",
        "Interpretarea influențelor planetare majore",
        "Strategii pentru maximizarea oportunităților",
        "Recomandări personalizate pentru dezvoltare",
      ],
      duration: "90 minute",
      price: "75€",
      link: "/astrograma/lumina-previzionala",
      icon: <Compass className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pb-20 overflow-x-hidden pt-28">
        <div className="cosmic-orb cosmic-orb-purple w-[600px] h-[600px] -top-40 -right-40 opacity-15"></div>
        <div className="cosmic-orb cosmic-orb-gold w-[400px] h-[400px] bottom-40 -left-40 opacity-10"></div>

        <div className="relative z-10 max-w-6xl px-6 mx-auto">
          <div className="mb-20 text-center">
            <h1 className="mb-5 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white font-display md:text-5xl via-cosmic-100 to-cosmic-200">
              Servicii Astrologice
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-cosmic-300/70">
              Descoperă gama completă de servicii disponibile
            </p>
          </div>

          <div className="grid gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="overflow-hidden glass-luxury-hover group"
              >
                <div className="p-10">
                  <div className="flex flex-col items-start justify-between gap-6 mb-8 md:flex-row md:items-center">
                    <div className="flex items-center gap-5">
                      <div className="flex items-center justify-center transition-all duration-500 w-14 h-14 bg-gradient-to-br rounded-2xl from-cosmic-500/30 to-gold-500/20 text-cosmic-400 group-hover:scale-110">
                        {service.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-white transition-colors font-display group-hover:text-gold-300 duration-400">
                        {service.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-base text-cosmic-300/70">
                        <Clock className="w-4 h-4 text-gold-400" />
                        <span>{service.duration}</span>
                      </div>
                      <div
                        className={`text-lg font-semibold ${service.highlight ? "text-gold-400" : "text-cosmic-300"}`}
                      >
                        {service.price}
                      </div>
                    </div>
                  </div>

                  <p className="mb-8 text-lg leading-relaxed text-cosmic-200/70">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="mb-5 text-sm font-semibold tracking-wider uppercase text-gold-400/70">
                      Ce include
                    </h3>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {service.details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-base text-cosmic-200/70"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white rounded-full bg-gradient-to-r luxury-button group from-cosmic-600 via-cosmic-500 to-cosmic-600 hover:from-cosmic-500 hover:to-cosmic-500 shadow-luxury-purple"
                  >
                    <span>Află mai multe</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-400 group-hover:translate-x-1.5" />
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
