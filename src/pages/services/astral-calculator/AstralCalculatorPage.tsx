import { useState, useEffect } from "react";
import { AstralElements } from "@/types";
import Navbar from "@/components/navbar/Navbar";
import BirthDataForm from "@/pages/services/astral-calculator/BirthDataForm";
import ResultsDisplay from "@/pages/services/astral-calculator/ResultsDisplay";
import { useLoading } from "@/hooks/useLoading";

const AstralCalculatorPage = () => {
  const [result, setResult] = useState<{
    astral_elements: AstralElements;
    astral_houses: AstralElements;
  } | null>(null);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    birthDate: Date;
    birthHour: Date;
    location: string;
  } | null>(null);
  const { startLoading, stopLoading } = useLoading();
  const [isFormMounted, setIsFormMounted] = useState(false);

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
      setIsFormMounted(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  const renderContent = () => {
    if (!isFormMounted) return null;

    if (result && userInfo) {
      return <ResultsDisplay result={result} userInfo={userInfo} />;
    }

    return <BirthDataForm setResult={setResult} setUserInfo={setUserInfo} />;
  };

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={true} />

      <div className="relative pt-24 pb-16">
        <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] top-0 right-0 opacity-20"></div>

        <div className="container relative z-10 px-6 mx-auto">
          <div className="mx-auto max-w-8xl">
            <div className="overflow-hidden glass-card">
              <div className="flex flex-col md:flex-row">
                {/* Left Panel */}
                <div className="flex flex-col justify-center items-center p-8 w-full bg-gradient-to-br to-transparent md:w-1/2 from-cosmic-900/30">
                  <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display from-cosmic-300 to-gold-400">
                      Calculatorul Astral
                    </h1>
                    <p className="leading-relaxed text-cosmic-200/80">
                      Descoperă pozițiile planetelor și asteroizilor în semnele
                      zodiacale la momentul nașterii tale
                    </p>
                  </div>

                  <div className="p-6 w-full glass-card-light">
                    <h3 className="mb-4 text-lg font-semibold font-display text-cosmic-900">
                      Ce vei primi:
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {[
                        "Pozițiile tuturor planetelor în semne zodiacale",
                        "Pozițiile în case astrologice",
                        "Indicii despre asteroizii importanți",
                        "Planete retrograde în harta ta",
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-cosmic-500 mt-1.5 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="p-8 w-full md:w-1/2">{renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstralCalculatorPage;
