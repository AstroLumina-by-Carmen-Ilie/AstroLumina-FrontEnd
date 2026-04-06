import React, { useState } from 'react';
import { AstralElements } from '../../../types';
import { generateAstralElementsPDF } from '../../../templates/pdf/astralCalculator';

// Utility functions
const formatDate = (date: Date): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const formatTime = (date: Date): string => {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const formatDegreesMinutes = (decimal: number): string => {
  const degrees = Math.floor(Math.abs(decimal));
  const minutes = Math.round((Math.abs(decimal) - degrees) * 60);
  return `${degrees}° ${minutes.toString().padStart(1)}'`;
};

const ResultsDisplay: React.FC<{
  result: {astral_elements: AstralElements, astral_houses: AstralElements};
  userInfo: {
    name: string;
    birthDate: Date;
    birthHour: Date;
    location: string;
  };
}> = ({ result, userInfo }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);

  const splitIndex = result.astral_elements.findIndex((item: any) => item.name === 'Chiron');
  
  const planetsData = splitIndex === -1 ? result.astral_elements : result.astral_elements.slice(0, splitIndex);
  const asteroidsData = splitIndex === -1 ? [] : result.astral_elements.slice(splitIndex);
  const housesData = result.astral_houses;

  const displayedData = activeTab === 1 ? planetsData : activeTab === 2 ? housesData : asteroidsData;

  const handleDownloadPDF = async () => {
    if (result && userInfo) {
    setIsGeneratingPDF(true);
    try {
      const doc = await generateAstralElementsPDF(result, userInfo);
      await doc.save(`Pozitia_Astrelor_${userInfo.name.replace(/\s+/g, '_')}.pdf`);
    } finally {
      setTimeout(() => setIsGeneratingPDF(false), 1000);
      }
    }
  };

  return (
    <div className="w-full text-center">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-cosmic-100 mb-2">{userInfo.name}</h3>
        <p className="text-lg text-cosmic-300">
          {formatDate(userInfo.birthDate)} la {formatTime(userInfo.birthHour)}
        </p>
        <p className="text-lg text-cosmic-300 mb-4">{userInfo.location}</p>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10">
        <h4 className="text-xl font-semibold text-cosmic-100 mb-4 p-4 pb-0">Pozițiile astrelor</h4>

        <div className="flex mb-4 border-b border-white/10 px-4">
          <button
            type="button"
            className={`flex-1 py-2 text-sm sm:text-base font-medium ${
              activeTab === 1
                ? 'text-cosmic-100 border-b-2 border-cosmic-500'
                : 'text-cosmic-400 hover:text-cosmic-300'
            }`}
            onClick={() => setActiveTab(1)}
          >
            Planete și Puncte Virtuale
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm sm:text-base font-medium ${
              activeTab === 2
                ? 'text-cosmic-100 border-b-2 border-cosmic-500'
                : 'text-cosmic-400 hover:text-cosmic-300'
            }`}
            onClick={() => setActiveTab(2)}
          >
            Case
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm sm:text-base font-medium ${
              activeTab === 3
                ? 'text-cosmic-100 border-b-2 border-cosmic-500'
                : 'text-cosmic-400 hover:text-cosmic-300'
            }`}
            onClick={() => setActiveTab(3)}
          >
            Asteroizi și Stele Fixe
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="p-2 sm:p-3 font-medium text-cosmic-300 text-sm sm:text-base">Nume</th>
                <th className="p-2 sm:p-3 font-medium text-cosmic-300 text-sm sm:text-base">Semn</th>
                <th className="p-2 sm:p-3 font-medium text-cosmic-300 text-sm sm:text-base">Poziție</th>
                {activeTab !== 2 && (
                  <>
                    <th className="p-2 sm:p-3 font-medium text-cosmic-300 text-sm sm:text-base">Casa</th>
                    <th className="p-2 sm:p-3 font-medium text-cosmic-300 text-sm sm:text-base">Retrograd</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {displayedData.map((info: any, index: number) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="p-2 sm:p-3 text-cosmic-200 text-sm sm:text-base whitespace-normal">
                    {activeTab === 2 ? (
                      info.name
                    ) : (
                      <>
                        <span className="astronomicon-symbol-fallback mr-2 font-semibold">{info.symbol || ''}</span>
                        {info.name}
                      </>
                    )}
                  </td>
                  <td className="p-2 sm:p-3 text-cosmic-200 text-sm sm:text-base whitespace-normal">
                    <span className="mr-2 font-semibold">{info.emoji}</span>
                    {info.sign}
                  </td>
                  <td className="p-2 sm:p-3 text-cosmic-200 text-sm sm:text-base whitespace-normal">
                    {formatDegreesMinutes(info.position)}
                  </td>
                  {activeTab !== 2 && (
                    <>
                      <td className="p-2 sm:p-3 text-cosmic-200 text-sm sm:text-base whitespace-normal">
                        {info.house}
                      </td>
                      <td className="p-2 sm:p-3 text-cosmic-200 text-sm sm:text-base whitespace-normal">
                        {info.retrograde ? '✓' : ''}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 pt-2">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="w-full py-3 px-6 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-midnight-950 font-semibold rounded-xl shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF ? (
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="22" strokeDashoffset="0" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 11v3H2v-3H0v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4l-1.41-1.41L8 9.17V0H6v9.17L2.41 5.59 1 7l6 6 6-6z"
                  fill="currentColor"
                />
              </svg>
            )}
            {isGeneratingPDF ? 'Se generează...' : 'Descarcă PDF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
