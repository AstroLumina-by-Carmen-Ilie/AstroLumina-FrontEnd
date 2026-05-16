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
      type: "PDF",
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
      type: "Ghid digital",
    },
  ];

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pb-20 pt-28">
        <div className="cosmic-orb cosmic-orb-gold w-[500px] h-[500px] top-0 left-0 opacity-10"></div>
        <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] bottom-0 right-0 opacity-10"></div>

        <div className="relative z-10 max-w-6xl px-6 mx-auto">
          <div className="mb-20 text-center">
            <h1 className="mb-5 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white font-display md:text-5xl via-cosmic-100 to-cosmic-200">
              Produse Astrologice
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-cosmic-300/70">
              Ghiduri digitale și rapoarte pentru auto-cunoaștere prin
              astrologie
            </p>
          </div>

          <div className="grid gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden glass-luxury-hover group"
              >
                <div className="p-10">
                  <div className="flex flex-col items-start justify-between gap-6 mb-8 md:flex-row md:items-center">
                    <div className="flex items-center gap-5">
                      <div className="flex items-center justify-center transition-all duration-500 w-14 h-14 rounded-2xl bg-cosmic-500/20 text-cosmic-400 group-hover:scale-110 group-hover:bg-cosmic-500/30">
                        <Package className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-white transition-colors font-display group-hover:text-gold-300 duration-400">
                        {product.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-gold-400">
                        {product.price}
                      </span>
                    </div>
                  </div>

                  <p className="mb-8 text-lg leading-relaxed text-cosmic-200/70">
                    {product.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="mb-5 text-sm font-semibold tracking-wider uppercase text-gold-400/70">
                      Ce include
                    </h3>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {product.details.map((detail, index) => (
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
                    to={`/produse/${product.id}`}
                    className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white rounded-full bg-gradient-to-r luxury-button group from-cosmic-600 via-cosmic-500 to-cosmic-600 hover:from-cosmic-500 hover:to-cosmic-500 shadow-luxury-purple"
                  >
                    <span>Vezi detalii</span>
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

export default Products;
