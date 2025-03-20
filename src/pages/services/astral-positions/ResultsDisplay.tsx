import React, { useState } from 'react';
import { AstralPositions } from '../../../types/astralPositions';
import { planetSymbols } from '../../../constants/astrology';
import { generateAstralPositionsPDF } from '../../../templates/pdf/astralPositions';

// Utility functions
const formatDate = (date: Date): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const formatTime = (date: Date): string => {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const ResultsDisplay: React.FC<{
  result: AstralPositions;
  userInfo: {
    name: string;
    birthDate: Date;
    birthHour: Date;
    location: string;
  };
}> = ({ result, userInfo }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    if (result && userInfo) {
      setIsGeneratingPDF(true);
      try {
        const doc = generateAstralPositionsPDF(result, {
          name: userInfo.name,
          date: new Date(userInfo.birthDate).toLocaleDateString(),
          time: new Date(userInfo.birthHour).toLocaleTimeString(),
          location: userInfo.location
        });
        await doc.save(`astral_positions_${userInfo.name.toLowerCase().replace(/\s+/g, '_')}.pdf`);
      } finally {
        // Ensure the spinner runs for at least 1 second
        setTimeout(() => setIsGeneratingPDF(false), 1000);
      }
    }
  };

  return (
    <div className="w-full text-center">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-amber-900 mb-2">{userInfo.name}</h3>
        <p className="text-lg text-amber-700">
          {formatDate(userInfo.birthDate)} at {formatTime(userInfo.birthHour)}
        </p>
        <p className="text-lg text-amber-700 mb-4">{userInfo.location}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <h4 className="text-xl font-semibold text-amber-900 mb-4">Planetary Positions</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-50">
                <th className="p-2 sm:p-3 font-medium text-amber-900 text-sm sm:text-base">Planet</th>
                <th className="p-2 sm:p-3 font-medium text-amber-900 text-sm sm:text-base">Sign</th>
                <th className="p-2 sm:p-3 font-medium text-amber-900 text-sm sm:text-base">House</th>
              </tr>
            </thead>
            <tbody>
              {result.data.map((info, index) => (
                <tr key={index} className="border-b border-amber-100">
                  <td className="p-2 sm:p-3 text-amber-700 text-sm sm:text-base whitespace-normal">
                    <span className="mr-2 font-semibold">{planetSymbols['ro'][info.planet] || ''}</span>
                    {info.planet}
                  </td>
                  <td className="p-2 sm:p-3 text-amber-700 text-sm sm:text-base whitespace-normal">
                    {info.sign}
                  </td>
                  <td className="p-2 sm:p-3 text-amber-700 text-sm sm:text-base whitespace-normal">
                    {info.house}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button 
          onClick={handleDownloadPDF}
          className="download-pdf-btn hover:bg-amber-300 transition-colors duration-300 w-full"
          style={{
            marginTop: '20px',
            padding: '12px 20px',
            backgroundColor: '#FFD700',
            color: '#1a1a1a',
            border: '1px solid #FFD700',
            borderRadius: '4px',
            cursor: isGeneratingPDF ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(255, 215, 0, 0.3)',
            opacity: isGeneratingPDF ? 0.7 : 1
          }}
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? (
            <svg 
              className="animate-spin"
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="22" strokeDashoffset="0"/>
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
          {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
