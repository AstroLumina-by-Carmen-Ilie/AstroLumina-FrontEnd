import { useState, useEffect } from 'react';
import { BirthDataPayload, UserInfo, ContactInfo, InterpretedAstralPositions } from '../../../types';
import { calculateNatalChart } from '../utilities/astrologicalCalculations';
import { generateNatalChartPDF } from '../../../templates/pdf/natalChart';

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
  const [chart, setChart] = useState('');

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
      const AstralPositions = await calculateNatalChart('ro', payload);
      setResult(AstralPositions.data);
      setChart(AstralPositions.chart);
    } catch (error) {
      console.error('Error fetching reading:', error);
      setResult(null);
      setChart('');
    } finally {
      // stopLoading();
      setTimeout(() => setIsGettingData(false), 1500);
    }
  };

  useEffect(() => {
    if (result && chart && userInfo && contactInfo && paymentStatus) {
      const generatePDF = async () => {
        const doc = await generateNatalChartPDF(result, chart, userInfo, contactInfo);
        doc.save(`Harta_Natala_${userInfo.name.replace(/\s+/g, '_')}.pdf`);
      };
      generatePDF();
    }
  }, [result, chart, userInfo, contactInfo, paymentStatus]);

  const handleNatalChart = async () => {
    await handleFormSubmit();
  };

  return (
    <div className="space-y-6 text-center">
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold text-cosmic-100 mb-4">Harta ta natală este pregătită!</h2>

        <div className="space-y-2 text-left mb-6">
          <p className="text-cosmic-300"><span className="font-semibold text-cosmic-200">Nume:</span> {userInfo.name}</p>
          <p className="text-cosmic-300"><span className="font-semibold text-cosmic-200">Data nașterii:</span> {formatDate(userInfo.birthDate)}</p>
          <p className="text-cosmic-300"><span className="font-semibold text-cosmic-200">Ora nașterii:</span> {formatTime(userInfo.birthHour)}</p>
          <p className="text-cosmic-300"><span className="font-semibold text-cosmic-200">Locație:</span> {userInfo.location}</p>
        </div>

        <div className="space-y-4">
          <p className="text-cosmic-400 text-sm">
            Interpretarea personalizată a hărții tale natale a fost generată. Apasă mai jos pentru a descărca interpretarea detaliată.
          </p>

          <button
            onClick={handleNatalChart}
            disabled={isGettingData}
            className="w-full py-3 px-6 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-midnight-950 font-semibold rounded-xl shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGettingData ? (
              <svg
                className="animate-spin w-4 h-4"
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
            {isGettingData ? 'Se generează PDF-ul...' : 'Descarcă PDF'}
          </button>
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-cosmic-100 mb-4">Ce urmează?</h3>
        <p className="text-cosmic-300 text-sm">
          Ia-ți timp să parcurgi în liniște interpretarea hărții tale natale. Dacă ai întrebări sau îți dorești o consultație mai detaliată,
          mă poți contacta oricând folosind datele de contact din PDF.
        </p>
      </div>
    </div>
  );
};

export default FinalStep;
