import { useState, useEffect } from 'react';
import { AstralElements } from '../../../types';
import Navbar from '../../../components/navbar/Navbar';
import BirthDataForm from './BirthDataForm';
import ResultsDisplay from './ResultsDisplay';
import { useLoading } from '../../../hooks/useLoading';

const AstralCalculatorPage = () => {
  const [result, setResult] = useState<{ astral_elements: AstralElements; astral_houses: AstralElements } | null>(null);
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
    <div className="min-h-screen bg-midnight-950 text-white">
      <Navbar isScrolled={true} />

      <div className="relative pt-24 pb-16">
        <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] top-0 right-0 opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-8xl mx-auto">
            <div className="glass-card overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Left Panel */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-cosmic-900/30 to-transparent">
                  <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
                      Pozițiile Astrelor
                    </h1>
                    <p className="text-cosmic-200/80 leading-relaxed">
                      Descoperă pozițiile exacte ale corpurilor cerești în momentul nașterii tale
                      și înțelege influența lor asupra căii tale de viață
                    </p>
                  </div>

                  <div className="w-full p-6 glass-card-light">
                    <h3 className="font-display text-lg font-semibold text-cosmic-900 mb-4">Ce vei primi:</h3>
                    <ul className="space-y-3 text-gray-700 text-sm">
                      {[
                        'Pozițiile astrelor precise la momentul nașterii tale',
                        'Semnele zodiacale în care se află casele',
                        'Înțelegerea planului tău celestial',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cosmic-500 mt-1.5 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/2 p-8">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstralCalculatorPage;
