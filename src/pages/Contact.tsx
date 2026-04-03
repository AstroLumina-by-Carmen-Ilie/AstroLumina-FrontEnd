import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useLoading } from '../hooks/useLoading';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  const faqItems = [
    {
      question: "Ce informații sunt necesare pentru o lectură astrologică?",
      answer: "Pentru o lectură astrologică precisă, sunt necesare data nașterii (zi, lună, an), ora exactă a nașterii și locul nașterii (oraș, țară). Aceste detalii sunt esențiale pentru calcularea poziției exacte a planetelor în momentul nașterii.",
    },
    {
      question: "Cât durează o ședință de consiliere astrologică?",
      answer: "O ședință standard durează aproximativ 60 de minute. În acest timp, analizăm harta natală, tranzitele curente și răspund la întrebările specifice pe care le aveți.",
    },
    {
      question: "Cum se desfășoară o consultație online?",
      answer: "Consultațiile online se desfășoară prin platforme de video conferință (Zoom, Skype, etc.). Veți primi un link înainte de ședință, iar materialele și interpretările vor fi trimise pe email după consultație.",
    },
    {
      question: "Ce este o sinastrie și când este utilă?",
      answer: "Sinastria este comparația între două hărți astrologice, utilă pentru înțelegerea dinamicii relațiilor. Este recomandată pentru cupluri, parteneri de afaceri sau pentru înțelegerea relației părinte-copil.",
    },
    {
      question: "Cum mă pregătesc pentru o consultație astrologică?",
      answer: "Pregătiți-vă o listă cu întrebări specifice pe care doriți să le adresați. Asigurați-vă că aveți informațiile exacte despre naștere și fiți deschiși să împărtășiți contextul situațiilor despre care doriți să discutăm.",
    },
    {
      question: "Ce reprezintă tranzitele și de ce sunt importante?",
      answer: "Tranzitele reprezintă pozițiile curente ale planetelor în raport cu harta dvs. natală. Acestea indică perioade importante de oportunități, provocări și transformări în viața dvs.",
    },
    {
      question: "Cât de des este recomandat să fac o consultație?",
      answer: "Recomand o consultație detaliată la fiecare 6-12 luni pentru a analiza ciclurile majore. Pentru situații specifice sau perioade de tranziție, putem programa ședințe suplimentare.",
    },
    {
      question: "Ce metode de plată acceptați?",
      answer: "Accept plăți online prin card bancar (Stripe), precum și transfer bancar. Detaliile complete de plată sunt disponibile în procesul de programare.",
    },
    {
      question: "Cum pot reprograma sau anula o programare?",
      answer: "Reprogramările sau anulările trebuie făcute cu cel puțin 24 de ore înainte de consultație. Contactați-mă prin email sau telefon pentru a face modificările necesare.",
    },
    {
      question: "Ce sunt nodurile lunare și cum îmi influențează viața?",
      answer: "Nodurile lunare reprezintă puncte matematice care indică direcția karmică a vieții dvs. Nodul Nord arată direcția de creștere, iar Nodul Sud reprezintă abilitățile din trecut.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pt-24 pb-16">
        <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] top-0 right-0 opacity-20"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
              Contact
            </h1>
            <p className="text-cosmic-300 text-lg max-w-2xl mx-auto">
              Ai întrebări sau dorești o consultație? Trimite-mi un mesaj.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass-card p-8">
              <h2 className="font-display text-xl font-semibold text-white mb-6">Trimite un mesaj</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-cosmic-300 text-sm mb-2">Nume complet</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-cosmic-400 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500 transition-colors"
                    placeholder="Numele tău"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-cosmic-300 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-cosmic-400 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500 transition-colors"
                    placeholder="email@exemplu.ro"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-cosmic-300 text-sm mb-2">Subiect</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-cosmic-400 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500 transition-colors"
                    placeholder="Despre ce dorești să discutăm?"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-cosmic-300 text-sm mb-2">Mesaj</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-cosmic-400 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500 transition-colors resize-none"
                    placeholder="Scrie mesajul tău aici..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white py-3 px-6 rounded-xl font-medium hover:from-cosmic-500 hover:to-cosmic-400 transition-all duration-300 shadow-glow-purple cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Trimite mesaj
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="glass-card p-8">
              <h2 className="font-display text-xl font-semibold text-white mb-6">Întrebări frecvente</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-white/5 last:border-0">
                    <button
                      className="w-full text-left py-4 flex justify-between items-center text-cosmic-200 hover:text-white transition-colors cursor-pointer"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="font-medium text-sm pr-4">{item.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-4 h-4 flex-shrink-0 text-cosmic-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 flex-shrink-0 text-cosmic-400" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="pb-4 text-cosmic-300/80 text-sm leading-relaxed animate-slide-down">
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
