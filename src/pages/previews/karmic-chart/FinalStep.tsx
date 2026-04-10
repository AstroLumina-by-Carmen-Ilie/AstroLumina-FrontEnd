import { useState, useEffect } from 'react';
import { BirthDataPayload, UserInfo, ContactInfo, AstralElements, AstralAspects } from '@/types';
import { calculateKarmicChart } from '@/utils/astrologicalCalculations';
import { generateKarmicChartPDF } from '@/templates/pdf/karmicChart';

interface FinalStepProps {
  payload: BirthDataPayload;
  userInfo: UserInfo;
  contactInfo: ContactInfo;
  result?: {astral_elements: AstralElements, astral_houses: AstralElements} | null;
}

const FinalStep: React.FC<FinalStepProps> = ({ payload, userInfo, contactInfo, result: preCalculatedResult }) => {
  const [result, setResult] = useState<{
      astral_elements: AstralElements,
      astral_houses: AstralElements,
      astral_aspects: AstralAspects,
      astral_chart: string
    } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatDate = (date: Date): string => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatTime = (date: Date): string => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDegrees = (position: number | any): string => {
    const degrees = Math.floor(position);
    const minutes = Math.round((position - degrees) * 60);
    return `${degrees}° ${minutes}'`;
  };

  const calculateResults = async () => {
    // If we have pre-calculated result from the form, use it
    if (preCalculatedResult) {
      setIsCalculating(true);
      try {
        // Get the full karmic chart data including aspects and chart
        const fullResult = await calculateKarmicChart('ro', payload);
        setResult(fullResult);
      } catch (error) {
        console.error('Error fetching reading:', error);
        setErrorMessage('A apărut o eroare la calcularea astrogramei karmice. Te rog încearcă din nou.');
        setResult(null);
      } finally {
        setIsCalculating(false);
      }
    } else {
      // Fallback to original calculation
      setIsCalculating(true);
      setErrorMessage(null);

      try {
        const astralPositions = await calculateKarmicChart('ro', payload);
        setResult(astralPositions);
      } catch (error) {
        console.error('Error fetching reading:', error);
        setErrorMessage('A apărut o eroare la calcularea astrogramei karmice. Te rog încearcă din nou.');
        setResult(null);
      } finally {
        setIsCalculating(false);
      }
    }
  };

  useEffect(() => {
    calculateResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, preCalculatedResult]);

  const handleDownloadPDF = async () => {
    if (!result) return;

    setIsDownloading(true);
    try {
      const doc = await generateKarmicChartPDF(result.astral_elements, result.astral_chart, userInfo, contactInfo);
      doc.save(`Harta_Karmica_${userInfo.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setErrorMessage('Nu am putut genera PDF-ul. Te rog încearcă din nou.');
    } finally {
      setIsDownloading(false);
    }
  };

  const renderPlanets = (elements: AstralElements) => (
    <div className="grid gap-4 md:grid-cols-2">
      {elements.filter(el => el.point_type === "Planetă").map((element, index) => (
        <div key={`${element.name}-${element.position}-${index}`} className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <p className="text-cosmic-100 font-semibold">{element.name}</p>
              <p className="text-sm font-medium">
                {element.retrograde ? (
                  <span className="text-amber-400">♻️ Retrograd</span>
                ) : (
                  <span className="text-emerald-400">Direct</span>
                )}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-cosmic-300 text-sm">{element.sign}</span>
              <span className="text-cosmic-300 text-xs">{formatDegrees(element.position)}</span>
            </div>
          </div>
          {element.description && <p className="text-cosmic-300 text-sm mt-2">{element.description}</p>}
        </div>
      ))}
    </div>
  );

  const renderHouses = (elements: AstralElements) => (
    <div className="grid gap-4 md:grid-cols-2">
      {elements.filter(el => el.point_type === "House").map((element, index) => (
        <div key={`${element.name}-${element.position}-${index}`} className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-cosmic-100 font-semibold">{element.name}</p>
            <div className="flex flex-col items-end gap-1">
              <span className="text-cosmic-300 text-sm">{element.sign}</span>
              <span className="text-cosmic-300 text-xs">{formatDegrees(element.position)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAspects = () => (
    <div className="overflow-x-auto">
      <div className="max-h-72 overflow-y-auto rounded-3xl border border-white/10">
        <table className="min-w-full text-left text-sm border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-3 text-cosmic-100 border-b border-white/10">Planetă 1</th>
              <th className="px-4 py-3 text-cosmic-100 border-b border-white/10">Aspect</th>
              <th className="px-4 py-3 text-cosmic-100 border-b border-white/10">Planetă 2</th>
              <th className="px-4 py-3 text-cosmic-100 border-b border-white/10">Orb</th>
            </tr>
          </thead>
          <tbody>
            {result?.astral_aspects.map((aspect, index) => (
              <tr key={`${aspect.p1_name}-${aspect.p2_name}-${index}`} className="odd:bg-white/5 even:bg-white/10">
                <td className="px-4 py-3 text-cosmic-300">{aspect.p1_name}</td>
                <td className="px-4 py-3 text-cosmic-300">{aspect.aspect}</td>
                <td className="px-4 py-3 text-cosmic-300">{aspect.p2_name}</td>
                <td className="px-4 py-3 text-cosmic-300">{formatDegrees(aspect.orb ?? aspect.orbit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const chartImageSrc = result?.astral_chart?.startsWith('data:image') ? result.astral_chart : undefined;

  return (
    <div className="space-y-6 text-center">
      <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-left">
        <h2 className="text-2xl font-bold text-cosmic-100 mb-4">Datele tale astrologice</h2>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="space-y-2">
            <p className="text-cosmic-300"><span className="font-semibold text-cosmic-200">Nume:</span> {userInfo.name}</p>
            <p className="text-cosmic-300"><span className="font-semibold text-cosmic-200">Data nașterii:</span> {formatDate(userInfo.birthDate)}</p>
            <p className="text-cosmic-300"><span className="font-semibold text-cosmic-200">Ora nașterii:</span> {formatTime(userInfo.birthHour)}</p>
            <p className="text-cosmic-300"><span className="font-semibold text-cosmic-200">Locație:</span> {userInfo.location}</p>
          </div>

          <div className="space-y-2">
            <p className="text-cosmic-300"><span className="font-semibold text-cosmic-200">Email:</span> {contactInfo.email}</p>
            <p className="text-cosmic-300"><span className="font-semibold text-cosmic-200">Telefon:</span> {contactInfo.phone}</p>
          </div>
        </div>

        {isCalculating && (
          <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
            <p className="text-cosmic-200 font-medium mb-4">Se calculează datele astrologice...</p>
            <div className="mx-auto w-14 h-14 rounded-full border-4 border-white/15 border-t-cosmic-500 animate-spin" />
          </div>
        )}

        {errorMessage && (
          <div className="rounded-2xl bg-red-950/70 p-5 border border-red-500 text-left">
            <p className="text-red-300 font-medium">{errorMessage}</p>
            <button
              onClick={calculateResults}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-500 transition-colors"
            >
              Reîncearcă calculul
            </button>
          </div>
        )}

        {result && !isCalculating && (
          <div className="space-y-6">
            {chartImageSrc && (
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img src={chartImageSrc} alt="Astrograma Karmică" className="w-full object-cover" />
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Poziții planetare</h3>
                {renderPlanets(result.astral_elements)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Case astrologice</h3>
                {renderHouses(result.astral_houses)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Aspecte importante</h3>
                {renderAspects()}
              </div>

              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full py-3 px-6 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-midnight-950 font-semibold rounded-xl shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="22" strokeDashoffset="0" />
                  </svg>
                ) : null}
                {isDownloading ? 'Se generează PDF-ul...' : 'Descarcă PDF'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalStep;
