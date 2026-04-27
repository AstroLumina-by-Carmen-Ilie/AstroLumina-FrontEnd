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
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden glass-card">
              <div className="flex flex-col md:flex-row">
                {/* Left Panel */}
                <div className="hidden flex-col justify-center p-10 bg-gradient-to-br to-transparent from-cosmic-900/40 via-cosmic-800/20 md:flex md:w-1/2">
                  <h2 className="mb-6 text-3xl font-bold text-white font-display">
                    Calculatorul Astral
                  </h2>
                  <div className="mb-8 space-y-4 leading-relaxed text-cosmic-200/80">
                    <p>
                      Descoperă pozițiile planetelor și asteroizilor în semnele
                      zodiacale la momentul nașterii tale. Această hartă astrală
                      îți oferă o imagine completă a cerului din momentul în
                      care te-ai născut.
                    </p>
                    <p>Ce vei primi:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Pozițiile tuturor planetelor în semne zodiacale</li>
                      <li>Pozițiile în case astrologice</li>
                      <li>Indicii despre asteroizii importanți</li>
                      <li>Planete retrograde în harta ta</li>
                    </ul>
                    <p>
                      Completează formularul și vei primi o analiză detaliată a
                      astrogramei tale.
                    </p>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="p-10 w-full md:w-1/2">{renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstralCalculatorPage;
