import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useLoading } from '../contexts/LoadingContext';
import { Package, ArrowRight } from 'lucide-react';

const Products = () => {
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

  const products = [
    {
      id: 'saturn-in-aries',
      title: 'Ghidul lui Saturn în Berbec',
      description: 'O analiză completă a tranzitului lui Saturn prin semnul Berbecului și impactul său asupra vieții tale.',
      details: [
        'Interpretarea detaliată a tranzitului Saturn în Berbec',
        'Influența asupra fiecărui ascendent zodiacal',
        'Lecții karmice și oportunități de creștere',
        'Strategii pentru a naviga provocările lui Saturn',
        'Exerciții practice și meditații specifice',
      ],
      price: '150 RON',
      type: 'Ghid digital',
    },
    {
      id: 'sun-in-natal-chart',
      title: 'Soarele în Harta Natală',
      description: 'O explorare profundă a semnificației Soarelui în astrologie și rolul său central în harta ta natală.',
      details: [
        'Analiza Soarelui în semn, casă și aspecte',
        'Interpretarea casei Soarelui și a expresiei personale',
        'Influența aspectelor planetare asupra identității',
        'Soarele ca indicator al scopului vieții',
        'Exerciții pentru integrarea energiei solare',
      ],
      price: '120 RON',
      type: 'Ghid digital',
    },
    {
      id: 'mercury-retrograde',
      title: 'Ce înseamnă Mercur Retrograd',
      description: 'Un ghid complet pentru înțelegerea și navigarea perioadelor de Mercur retrograd.',
      details: [
        'Explicația fenomenului de retrogradare a lui Mercur',
        'Efecte specifice în funcție de semnul zodiacal',
        'Strategii de comunicare în perioadele retrograde',
        'Calendar al retrogradărilor Mercur pentru următorul an',
      ],
      price: '80 RON',
      type: 'Ghid digital',
    },
    {
      id: 'astral-positions-natal',
      title: 'Poziția Elementelor Astrale în Harta Natală',
      description: 'O analiză completă a tuturor elementelor astronomice din harta ta natală.',
      details: [
        'Interpretarea celor 10 planete principale',
        'Analiza asteroizilor Chiron, Ceres, Pallas, Juno și Vesta',
        'Semnificația Nodurilor Lunare Nord și Sud',
        'Puncte karmice: Lilith, Vertex și altele',
        'Grafice vizuale și tabele detaliate',
      ],
      price: '200 RON',
      type: 'Raport complet',
    },
    {
      id: 'moon-phases-guide',
      title: 'Ghidul Fazelor Lunare',
      description: 'Înțelege cum fazele lunare influențează emoțiile, energia și viața de zi cu zi.',
      details: [
        'Cele 8 faze lunare și semnificațiile lor',
        'Calendar lunar pentru anul în curs',
        'Ritualuri și practici pentru fiecare fază',
        'Influența lunii asupra emoțiilor și relațiilor',
        'Jurnal lunar pentru auto-observație',
      ],
      price: '90 RON',
      type: 'Ghid digital',
    },
    {
      id: 'venus-retrograde',
      title: 'Venus Retrograd - Ghid de Relații',
      description: 'O explorare a perioadelor Venus retrograd și impactul lor asupra relațiilor, valorilor și creativității.',
      details: [
        'Semnificația retrogradării lui Venus',
        'Efecte asupra relațiilor și parteneriatelor',
        'Vindecarea relațiilor din trecut',
        'Reevaluarea valorilor personale',
        'Exerciții de vindecare și auto-reflectare',
      ],
      price: '100 RON',
      type: 'Ghid digital',
    },
  ];

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pt-24 pb-16">
        <div className="cosmic-orb cosmic-orb-gold w-[400px] h-[400px] top-0 left-0 opacity-15"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
              Produse Astrologice
            </h1>
            <p className="text-cosmic-300 text-lg max-w-2xl mx-auto">
              Ghiduri digitale și rapoarte pentru auto-cunoaștere prin astrologie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="glass-card overflow-hidden hover:bg-white/[0.1] transition-all duration-300 group flex flex-col"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-cosmic-500/20 flex items-center justify-center text-cosmic-400">
                      <Package className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-cosmic-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      {product.type}
                    </span>
                  </div>

                  <h2 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cosmic-300 transition-colors">
                    {product.title}
                  </h2>

                  <p className="text-cosmic-200/70 text-sm leading-relaxed mb-4 flex-1">
                    {product.description}
                  </p>

                  <ul className="space-y-1.5 mb-5">
                    {product.details.slice(0, 3).map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-cosmic-200/60 text-xs">
                        <div className="w-1 h-1 rounded-full bg-cosmic-500 mt-1.5 flex-shrink-0"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-gold-400 font-semibold text-lg">{product.price}</span>
                    <button className="group inline-flex items-center gap-1.5 text-cosmic-400 text-sm font-medium hover:text-white transition-colors cursor-pointer">
                      Comandă
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
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
