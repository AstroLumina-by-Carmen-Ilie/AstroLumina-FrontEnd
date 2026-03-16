import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useLoading } from '../contexts/LoadingContext';

const Products = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  // Loading effect
  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      id: 'saturn-in-aries',
      title: 'Ghidul lui Saturn în Berbec',
      description: 'O analiză completă a tranzitului lui Saturn prin semnul Berbecului și impactul său asupra vieții tale. Descoperă cum această energie planetară influențează responsabilitățile, structura și creșterea personală.',
      details: [
        'Interpretarea detaliată a tranzitului Saturn în Berbec',
        'Influența asupra fiecărui ascendent zodiacal',
        'Lecții karmice și oportunități de creștere',
        'Strategii pentru a naviga provocările lui Saturn',
        'Timp de maturare și structurare (aproximativ 2.5 ani)',
        'Exerciții practice și meditații specifice'
      ],
      price: '150 RON',
      type: 'Ghid digital'
    },
    {
      id: 'sun-in-natal-chart',
      title: 'Soarele în Harta Natală',
      description: 'O explorare profundă a semnificației Soarelui în astrologie și rolul său central în harta ta natală. Înțelege esența ta, vitalitatea și scopul vieții prin interpretarea poziției Soarelui.',
      details: [
        'Analiza Soarelui în semn, casă și aspecte',
        'Interpretarea casei Soarelui și a expresiei personale',
        'Influența aspectelor planetare asupra identității',
        'Soarele ca indicator al scopului vieții',
        'Relația Soarelui cu Ascendentul și imaginea personală',
        'Exerciții pentru integrarea energiei solare'
      ],
      price: '120 RON',
      type: 'Ghid digital'
    },
    {
      id: 'mercury-retrograde',
      title: 'Ce înseamnă Mercur Retrograd',
      description: 'Un ghid complet pentru înțelegerea și navigarea perioadelor de Mercur retrograd. Transformă provocările de comunicare în oportunități de reflecție și creștere.',
      details: [
        'Explicația fenomenului de retrogradare a lui Mercur',
        'Efecte specifice în funcție de semnul zodiacal',
        'Strategii de comunicare în perioadele retrograde',
        'Planificarea activităților și evitarea problemelor',
        'Interpretarea personală a retrogradărilor Mercur în harta natală',
        'Calendar al retrogradărilor Mercur pentru următorul an'
      ],
      price: '80 RON',
      type: 'Ghid digital'
    },
    {
      id: 'astral-positions-natal',
      title: 'Poziția Elementelor Astrale în Harta Natală',
      description: 'O analiză completă a tuturor elementelor astronomice din harta ta natală - planete, asteroizi, noduri lunare și puncte karmice. Un instrument esențial pentru auto-cunoaștere.',
      details: [
        'Interpretarea celor 10 planete principale',
        'Analiza asteroizilor Chiron, Ceres, Pallas, Juno și Vesta',
        'Semnificația Nodurilor Lunare Nord și Sud',
        'Puncte karmice: Lilith, Vertex și altele',
        'Calcul și interpretare automată a pozițiilor',
        'Grafice vizuale și tabele detaliate'
      ],
      price: '200 RON',
      type: 'Raport complet'
    },
    {
      id: 'moon-phases-guide',
      title: 'Ghidul Fazelor Lunare',
      description: 'Înțelege cum fazele lunare influențează emoțiile, energia și viața de zi cu zi. Un ghid practic pentru a te alinia cu ritmurile naturale ale lunii.',
      details: [
        'Cele 8 faze lunare și semnificațiile lor',
        'Calendar lunar pentru anul în curs',
        'Ritualuri și practici pentru fiecare fază',
        'Influența lunii asupra emoțiilor și relațiilor',
        'Gardening lunar și activități practice',
        'Jurnal lunar pentru auto-observație'
      ],
      price: '90 RON',
      type: 'Ghid digital'
    },
    {
      id: 'venus-retrograde',
      title: 'Venus Retrograd - Ghid de Relații',
      description: 'O explorare a perioadelor Venus retrograd și impactul lor asupra relațiilor, valorilor și creativității. Transformă provocările în oportunități de vindecare.',
      details: [
        'Semnificația retrogradării lui Venus',
        'Efecte asupra relațiilor și parteneriatelor',
        'Vindecarea relațiilor din trecut',
        'Reevaluarea valorilor personale',
        'Calendar al retrogradărilor Venus',
        'Exerciții de vindecare și auto-reflectare'
      ],
      price: '100 RON',
      type: 'Ghid digital'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Starry background - fixed position */}
      <div className="fixed inset-0 bg-black stars">
        {/* Shooting stars */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      {/* Navbar */}
      <Navbar isScrolled={isScrolled} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-amber-200 mb-12">
          Produse Astrologice
        </h1>
        
        <div className="grid gap-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-3xl font-bold text-amber-800 mb-4 md:mb-0">
                    {product.title}
                  </h2>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                      {product.type}
                    </div>
                    <div className="text-xl font-semibold text-amber-600">
                      {product.price}
                    </div>
                  </div>
                </div>

                <p className="text-lg text-amber-700 mb-6">
                  {product.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-amber-800 mb-4">Ce include:</h3>
                  <ul className="space-y-3">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-amber-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors duration-200">
                  Comandă acum
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
