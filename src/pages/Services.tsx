import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { useLoading } from "@/hooks/useLoading";
import {
  ArrowRight,
  Clock,
  Star,
  Sparkles,
  Moon,
  Compass,
  Calendar,
} from "lucide-react";

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

      <div className="overflow-x-hidden relative pt-24 pb-16">
        {/* Cosmic orbs */}
        <div className="cosmic-orb cosmic-orb-purple w-[500px] h-[500px] -top-20 -right-40 opacity-20"></div>
        <div className="cosmic-orb cosmic-orb-gold w-[300px] h-[300px] bottom-20 -left-20 opacity-15"></div>

        <div className="relative z-10 px-6 mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display md:text-5xl from-cosmic-300 to-gold-400">
              Servicii Astrologice
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-cosmic-300">
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
                  <div className="flex flex-col gap-4 justify-between items-start mb-6 md:flex-row md:items-center">
                    <div className="flex gap-4 items-center">
                      <div className="flex justify-center items-center w-12 h-12 rounded-xl transition-colors bg-cosmic-500/20 text-cosmic-400 group-hover:bg-cosmic-500/30">
                        {service.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-white font-display">
                        {service.title}
                      </h2>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-2 items-center text-sm text-cosmic-300">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div
                        className={`text-lg font-semibold ${service.highlight ? "text-gold-400" : "text-cosmic-300"}`}
                      >
                        {service.price}
                      </div>
                    </div>
                  </div>

                  <p className="mb-6 leading-relaxed text-cosmic-200/80">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-cosmic-400">
                      Ce include
                    </h3>
                    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {service.details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex gap-3 items-start text-sm text-cosmic-200/70"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-cosmic-500 mt-1.5 flex-shrink-0"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={service.link}
                    className="inline-flex gap-2 items-center px-6 py-3 font-medium text-white bg-gradient-to-r rounded-full transition-all duration-300 cursor-pointer group from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple"
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
