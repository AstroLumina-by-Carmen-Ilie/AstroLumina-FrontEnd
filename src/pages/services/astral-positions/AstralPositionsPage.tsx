import React, { useState, useEffect } from 'react';
import { AstralElements } from '../../../types';
import Navbar from '../../../components/navbar/Navbar';
import astralChartSvg from '../../../assets/astral-chart.svg';
import BirthDataForm from './BirthDataForm';
import ResultsDisplay from './ResultsDisplay';
import { useLoading } from '../../../contexts/LoadingContext';

const AstralPositionsPage: React.FC = () => {
  const [result, setResult] = useState<{astral_elements: AstralElements, astral_houses: AstralElements} | null>(null);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    birthDate: Date;
    birthHour: Date;
    location: string;
  } | null>(null);
  const { startLoading, stopLoading } = useLoading();
  const [isFormMounted, setIsFormMounted] = useState(false);

  // Loading effect
  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
      setIsFormMounted(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  const renderContent = () => {
    if (!isFormMounted) {
      return null; // Don't render anything until loading is complete
    }

    if (result && userInfo) {
      try {
        return <ResultsDisplay result={result} userInfo={userInfo} />;
      } catch (error) {
        console.error('Eroare la afișarea rezultatelor:', error);
        return <div>A apărut o eroare la afișarea rezultatelor</div>;
      }
    }

    try {
      return <BirthDataForm setResult={setResult} setUserInfo={setUserInfo} />;
    } catch (error) {
      console.error('Eroare la afișarea formularului:', error);
      return <div>A apărut o eroare la afișarea formularului</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Navbar isScrolled={true} lightTheme={true} />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
            
            {/* Left Panel - Illustration and Info */}
            <div className="w-full md:w-1/2 bg-indigo-50 p-6 flex flex-col justify-center items-center">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-900 mb-4">Pozițiile astrelor</h1>
                <p className="text-gray-700 p-8">
                  Descoperă pozițiile exacte ale corpurilor cerești în momentul nașterii tale
                  și înțelege influența lor asupra căii tale de viață
                </p>
              </div>
              
              <img 
                src={astralChartSvg} 
                alt="Astral Chart Illustration" 
                className="object-contain mb-8"
              />
              
              <div className="w-full p-8">
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">Ce vei primi:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    <span>Pozițiile astrelor precise la momentul nașterii tale</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    <span>Semnele zodiacale în care se află casele</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    <span>Înțelegerea planului tău celestial</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Panel - Form or Results */}
            <div className="w-full md:w-1/2 p-4 sm:p-8">
              {/* Mobile Title */}
              <div className="md:hidden text-center mb-6">
                  <h2 className="text-2xl font-bold text-indigo-900">
                    Descoperă Planul Tău Celestial
                  </h2>
              </div>

              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstralPositionsPage;
