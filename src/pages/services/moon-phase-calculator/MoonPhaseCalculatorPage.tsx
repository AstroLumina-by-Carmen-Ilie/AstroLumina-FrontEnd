import { useState, useEffect } from 'react';
import { LunarDataResponse } from '@/types';
import Navbar from '@/components/navbar/Navbar';
import LunarDataForm from '@/pages/services/moon-phase-calculator/LunarDataForm';
import LunarResultsDisplay from '@/pages/services/moon-phase-calculator/LunarResultsDisplay';
import { useLoading } from '@/hooks/useLoading';
import { calculateLunarPhasePosition } from '@/utils/astrologicalCalculations';
import { ROMANIAN_COUNTIES, getRomanianCountyName, getRomanianCityCoordinates } from '@/data/romanian-locations';

type SelectionMode = 'none' | 'specific-date' | 'current-date';

const MoonPhaseCalculatorPage = () => {
  const [result, setResult] = useState<LunarDataResponse | null>(null);
  const [userInfo, setUserInfo] = useState<{ location: string } | null>(null);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('none');
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

  const handleCurrentDate = async () => {
    setSelectionMode('current-date');
    setResult(null);
    setUserInfo(null);
    
    startLoading();
    try {
      const now = new Date();
      const defaultCoords = getRomanianCityCoordinates('B', 'București');
      
      const payload = {
        longitude: defaultCoords?.lng || 26.1025,
        latitude: defaultCoords?.lat || 44.4268,
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
      };

      const lunarResult = await calculateLunarPhasePosition('ro', payload);
      setResult(lunarResult);
      setUserInfo({
        location: 'București, România'
      });
    } catch (error) {
      console.error('Error calculating current lunar phase:', error);
    } finally {
      stopLoading();
    }
  };

  const renderContent = () => {
    if (!isFormMounted) return null;

    if (result && userInfo) {
      return <LunarResultsDisplay result={result} userInfo={userInfo} />;
    }

    if (selectionMode === 'none') {
      return (
        <div className="space-y-4">
          <p className="text-cosmic-200 text-center mb-6">
            Alegeți modalitatea de calcul a fazei lunare
          </p>
          <button
            type="button"
            className="w-full py-4 px-6 bg-gradient-to-r from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 text-white font-semibold rounded-xl shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            onClick={() => setSelectionMode('specific-date')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Calculează pentru o dată specifică
          </button>
          <button
            type="button"
            className="w-full py-4 px-6 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-midnight-950 font-semibold rounded-xl shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            onClick={handleCurrentDate}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Faza lunii pentru acum
          </button>
        </div>
      );
    }

    return (
      <div>
        <button
          type="button"
          className="mb-4 text-cosmic-300 hover:text-cosmic-100 flex items-center gap-2 text-sm"
          onClick={() => {
            setSelectionMode('none');
            setResult(null);
            setUserInfo(null);
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Înapoi la opțiuni
        </button>
        <LunarDataForm setResult={setResult} setUserInfo={setUserInfo} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
      <Navbar isScrolled={true} />

      <div className="relative pt-24 pb-16">
        <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] top-0 right-0 opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="glass-card overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Left Panel */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-cosmic-900/30 to-transparent">
                  <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
                      Calculatorul Fazelor Lunare
                    </h1>
                    <p className="text-cosmic-200/80 leading-relaxed">
                      Descoperă faza lunii pentru orice dată și locație
                      sau vezi cum arată luna în acest moment
                    </p>
                  </div>

                  <div className="w-full p-6 glass-card-light">
                    <h3 className="font-display text-lg font-semibold text-cosmic-900 mb-4">Ce vei primi:</h3>
                    <ul className="space-y-3 text-gray-700 text-sm">
                      {[
                        'Faza curentă a lunii cu reprezentare vizuală',
                        'Semnul zodiacal al lunii și soarelui',
                        'Orele de răsărit și apus pentru locația ta',
                        'Următoarele faze importante ale lunii',
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

export default MoonPhaseCalculatorPage;
