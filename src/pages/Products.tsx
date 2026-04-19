import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { useLoading } from "@/hooks/useLoading";
import { Package, ArrowRight } from "lucide-react";

const Products = () => {
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

  const products = [
    {
      id: "soarele-stralucirea-ta",
      title: "Soarele, strălucirea ta",
      description: "Prin care descoperi semnificația zodiei tale",
      details: [
        "Interpretarea poziției Soarelui în semnul tău zodiacal",
        "Descoperirea caracteristicilor esențiale ale personalității tale solare",
        "Înțelegerea modului în care te exprimi și strălucești",
        "Ghid pentru valorificarea energiei solare în viața daily",
        "PDF gratuit descărcabil",
      ],
      price: "Gratuit",
      type: "PDF"
    },
    {
      id: "ghidul-lui-saturn-in-berbec",
      title: "Ghidul lui Saturn în Berbec",
      description:
        "Un ghid complet cu tot ce ai nevoie să știi despre tranzitul lui Saturn",
      details: [
        "Interpretarea detaliată a tranzitului Saturn în Berbec",
        "Influența asupra fiecărui ascendent zodiacal",
        "Lecții karmice și oportunități de creștere personală",
        "Strategii practice pentru a naviga provocările lui Saturn",
        "Exerciții și meditații pentru transformarea energiilor",
      ],
      price: "15€",
      type: "Ghid digital"
    },
  ];

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pt-24 pb-16">
        <div className="cosmic-orb cosmic-orb-gold w-[400px] h-[400px] top-0 left-0 opacity-15"></div>

        <div className="relative z-10 px-6 mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display md:text-5xl from-cosmic-300 to-gold-400">
              Produse Astrologice
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-cosmic-300">
              Ghiduri digitale și rapoarte pentru auto-cunoaștere prin
              astrologie
            </p>
          </div>

          <div className="grid gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="glass-card overflow-hidden hover:bg-white/[0.1] transition-all duration-300 group"
              >
                <div className="p-8">
                  <div className="flex flex-col gap-4 justify-between items-start mb-6 md:flex-row md:items-center">
                    <div className="flex gap-4 items-center">
                      <div className="flex justify-center items-center w-12 h-12 rounded-xl transition-colors bg-cosmic-500/20 text-cosmic-400 group-hover:bg-cosmic-500/30">
                        <Package className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-white transition-colors font-display group-hover:text-cosmic-300">
                        {product.title}
                      </h2>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-lg font-semibold text-gold-400">
                        {product.price}
                      </span>
                    </div>
                  </div>

                  <p className="mb-6 leading-relaxed text-cosmic-200/80">
                    {product.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-cosmic-400">
                      Ce include
                    </h3>
                    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {product.details.map((detail, index) => (
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

                  <Link to={`/produse/${product.id}`} className="inline-flex gap-2 items-center px-6 py-3 font-medium text-white bg-gradient-to-r rounded-full transition-all duration-300 cursor-pointer group from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple">
                    Vezi detalii
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

export default Products;
