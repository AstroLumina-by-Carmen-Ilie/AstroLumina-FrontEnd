import React, { useState, useEffect } from 'react';
import { BirthDataPayload, UserInfo, ContactInfo, InterpretedAstralPositions } from '../../../types/astralChart';
import { calculateKarmicChart } from '../utilities/astrologicalCalculations';
import { generateKarmicChartPDF } from '../../../templates/pdf/karmicChart';

interface FinalStepProps {
  payload: BirthDataPayload;
  userInfo: UserInfo;
  contactInfo: ContactInfo;
  paymentStatus: boolean;
}

const FinalStep: React.FC<FinalStepProps> = ({ payload, userInfo, contactInfo, paymentStatus }) => {
  // const { startLoading, stopLoading } = useLoading();
  const [result, setResult] = useState<InterpretedAstralPositions | null>(null);
  const [isGettingData, setIsGettingData] = useState(false);

  const formatDate = (date: Date): string => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatTime = (date: Date): string => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleFormSubmit = async () => {
    // startLoading();
    setIsGettingData(true);
    try {
      const AstralPositions = await calculateKarmicChart('ro', payload);
      setResult(AstralPositions);
    } catch (error) {
      console.error('Error fetching reading:', error);
      setResult(null);
    } finally {
      // stopLoading();
      setTimeout(() => setIsGettingData(false), 1500);
    }
  };

  useEffect(() => {
    if (result && userInfo && contactInfo && paymentStatus) {
      const generatePDF = async () => {
        const doc = generateKarmicChartPDF(result, userInfo, contactInfo);
        await doc.save(`karmic-chart-${userInfo.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      };
      generatePDF();
    }
  }, [result, userInfo, contactInfo, paymentStatus]);

  const handleKarmicChart = async () => {
    await handleFormSubmit();
  };

  return (
    <div className="space-y-6 text-center">
      <div className="bg-amber-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Your Karmic Chart is Ready!</h2>

        <div className="space-y-2 text-left mb-6">
          <p className="text-amber-700"><span className="font-semibold">Name:</span> {userInfo.name}</p>
          <p className="text-amber-700"><span className="font-semibold">Birth Date:</span> {formatDate(userInfo.birthDate)}</p>
          <p className="text-amber-700"><span className="font-semibold">Birth Time:</span> {formatTime(userInfo.birthHour)}</p>
          <p className="text-amber-700"><span className="font-semibold">Location:</span> {userInfo.location}</p>
        </div>

        <div className="space-y-4">
          <p className="text-amber-600">
            Your personalized karmic chart reading has been generated. Click below to download your detailed interpretation.
          </p>

          <button
            onClick={handleKarmicChart}
            className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
            style={{
              marginTop: '20px',
              padding: '12px 20px',
              backgroundColor: '#FFD700',
              color: '#1a1a1a',
              border: '1px solid #FFD700',
              borderRadius: '4px',
              cursor: isGettingData ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: '500',
              boxShadow: '0 2px 4px rgba(255, 215, 0, 0.3)',
              opacity: isGettingData ? 0.7 : 1
            }}
            disabled={isGettingData}
          >
            {isGettingData ? (
              <svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="22" strokeDashoffset="0" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd" />
              </svg>
            )}
            {isGettingData ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h3>
        <p className="text-gray-600">
          Take your time to review your karmic chart interpretation. If you have any questions or would like a more detailed consultation,
          feel free to contact us using the provided contact information in your PDF.
        </p>
      </div>
    </div>
  );
};

export default FinalStep;
