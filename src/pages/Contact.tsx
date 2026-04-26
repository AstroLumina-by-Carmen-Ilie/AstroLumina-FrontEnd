import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useLoading } from "@/hooks/useLoading";
import { ChevronDown, ChevronUp, Send } from "lucide-react";

const Contact = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const faqItems = [
    {
      question: "Ce informații sunt necesare pentru o lectură astrologică?",
      answer:
        "Pentru o lectură astrologică precisă, sunt necesare data nașterii (zi, lună, an), ora exactă a nașterii și locul nașterii (oraș, țară). Aceste detalii sunt esențiale pentru calcularea poziției exacte a planetelor în momentul nașterii.",
    },
    {
      question: "Cât durează o ședință de consiliere astrologică?",
      answer:
        "O ședință standard durează aproximativ 60 de minute. În acest timp, analizăm harta natală, tranzitele curente și răspund la întrebările specifice pe care le aveți.",
    },
    {
      question: "Cum se desfășoară o consultație online?",
      answer:
        "Consultațiile online se desfășoară prin platforme de video conferință (Zoom, Skype, etc.). Veți primi un link înainte de ședință, iar materialele și interpretările vor fi trimise pe email după consultație.",
    },
    {
      question: "Ce este o sinastrie și când este utilă?",
      answer:
        "Sinastria este comparația între două hărți astrologice, utilă pentru înțelegerea dinamicii relațiilor. Este recomandată pentru cupluri, parteneri de afaceri sau pentru înțelegerea relației părinte-copil.",
    },
    {
      question: "Cum mă pregătesc pentru o consultație astrologică?",
      answer:
        "Pregătiți-vă o listă cu întrebări specifice pe care doriți să le adresați. Asigurați-vă că aveți informațiile exacte despre naștere și fiți deschiși să împărtășiți contextul situațiilor despre care doriți să discutăm.",
    },
    {
      question: "Ce reprezintă tranzitele și de ce sunt importante?",
      answer:
        "Tranzitele reprezintă pozițiile curente ale planetelor în raport cu harta dvs. natală. Acestea indică perioade importante de oportunități, provocări și transformări în viața dvs.",
    },
    {
      question: "Cât de des este recomandat să fac o consultație?",
      answer:
        "Recomand o consultație detaliată la fiecare 6-12 luni pentru a analiza ciclurile majore. Pentru situații specifice sau perioade de tranziție, putem programa ședințe suplimentare.",
    },
    {
      question: "Ce metode de plată acceptați?",
      answer:
        "Accept plăți online prin card bancar (Stripe), precum și transfer bancar. Detaliile complete de plată sunt disponibile în procesul de programare.",
    },
    {
      question: "Cum pot reprograma sau anula o programare?",
      answer:
        "Reprogramările sau anulările trebuie făcute cu cel puțin 24 de ore înainte de consultație. Contactați-mă prin email sau telefon pentru a face modificările necesare.",
    },
    {
      question: "Ce sunt nodurile lunare și cum îmi influențează viața?",
      answer:
        "Nodurile lunare reprezintă puncte matematice care indică direcția karmică a vieții dvs. Nodul Nord arată direcția de creștere, iar Nodul Sud reprezintă abilitățile din trecut.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pt-28 pb-20">
        <div className="cosmic-orb cosmic-orb-purple w-[500px] h-[500px] top-0 right-0 opacity-15"></div>
        <div className="cosmic-orb cosmic-orb-gold w-[400px] h-[400px] bottom-0 left-0 opacity-10"></div>

        <div className="relative z-10 px-6 mx-auto max-w-6xl">
          <div className="mb-20 text-center">
            <p className="mb-4 text-sm font-medium tracking-[0.25em] uppercase text-gold-400/70 font-display">
              Legătura Cu Noi
            </p>
            <h1 className="mb-5 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display md:text-5xl from-white via-cosmic-100 to-cosmic-200">
              Contact
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-cosmic-300/70">
              Ai întrebări sau dorești o consultație? Trimite-mi un mesaj.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="glass-luxury-hover p-10">
              <h2 className="mb-8 text-2xl font-semibold text-white font-display">
                Trimite un mesaj
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-3 text-sm font-medium text-cosmic-300"
                  >
                    Nume complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="p-4 w-full text-white rounded-xl border transition-all duration-300 bg-white/5 border-white/10 placeholder-cosmic-400/50 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500/30 focus:bg-white/10"
                    placeholder="Numele tău"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-3 text-sm font-medium text-cosmic-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="p-4 w-full text-white rounded-xl border transition-all duration-300 bg-white/5 border-white/10 placeholder-cosmic-400/50 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500/30 focus:bg-white/10"
                    placeholder="email@exemplu.ro"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-3 text-sm font-medium text-cosmic-300"
                  >
                    Subiect
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="p-4 w-full text-white rounded-xl border transition-all duration-300 bg-white/5 border-white/10 placeholder-cosmic-400/50 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500/30 focus:bg-white/10"
                    placeholder="Despre ce dorești să discutăm?"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-3 text-sm font-medium text-cosmic-300"
                  >
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="p-4 w-full text-white rounded-xl border transition-all duration-300 resize-none bg-white/5 border-white/10 placeholder-cosmic-400/50 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500/30 focus:bg-white/10"
                    placeholder="Scrie mesajul tău aici..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="luxury-button flex gap-3 justify-center items-center px-8 py-4 w-full font-semibold text-white bg-gradient-to-r rounded-full from-cosmic-600 via-cosmic-500 to-cosmic-600 hover:from-cosmic-500 hover:to-cosmic-500 shadow-luxury-purple"
                >
                  <Send className="w-5 h-5" />
                  <span>Trimite mesaj</span>
                </button>
              </form>
            </div>

            <div className="glass-luxury-hover p-10">
              <h2 className="mb-8 text-2xl font-semibold text-white font-display">
                Întrebări frecvente
              </h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-white/5 last:border-0"
                  >
                    <button
                      className="flex justify-between items-center py-5 w-full text-left transition-colors cursor-pointer text-cosmic-200 hover:text-white group"
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                    >
                      <span className="pr-4 text-base font-medium">
                        {item.question}
                      </span>
                      {openFaq === index ? (
                        <ChevronUp className="flex-shrink-0 w-5 h-5 text-gold-400 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="flex-shrink-0 w-5 h-5 text-cosmic-400 group-hover:text-gold-400 transition-colors duration-300" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="pb-6 text-base leading-relaxed text-cosmic-300/80 animate-fade-in-down">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
