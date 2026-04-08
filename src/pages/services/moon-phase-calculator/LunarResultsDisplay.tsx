import React from 'react';
import { LunarDataResponse } from '../../../types';

const LunarResultsDisplay: React.FC<{
  result: LunarDataResponse;
  userInfo: {
    location: string;
  };
}> = ({ result, userInfo }) => {

  const getMoonPhaseImage = (phaseName: string, emoji: string): string => {
    const phaseImages: Record<string, string> = {
      'Lună nouă': '🌑',
      'Lună plină': '🌕',
      'Primul pătrar': '🌓',
      'Ultimul pătrar': '🌗',
      'New Moon': '🌑',
      'Full Moon': '🌕',
      'First Quarter': '🌓',
      'Last Quarter': '🌗',
    };
    return phaseImages[phaseName] || emoji;
  };

  const formatDateFromDatestamp = (datestamp: string): string => {
    try {
      const date = new Date(datestamp);
      return date.toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return datestamp;
    }
  };

  const moonPhaseEmoji = getMoonPhaseImage(result.moon.major_phase, result.moon.emoji);

  return (
    <div className="w-full text-center">
      <div className="mb-6">
        <p className="text-lg text-cosmic-300 mb-1">{userInfo.location}</p>
        <p className="text-lg text-cosmic-300">{formatDateFromDatestamp(result.datestamp)}</p>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 mb-4">
        <h4 className="text-xl font-semibold text-cosmic-100 mb-4 p-4 pb-0">🌙 Fază Lună</h4>
        
        <div className="p-4 pt-0">
          <div className="flex flex-col items-center mb-6">
            <div className="text-8xl mb-4 filter drop-shadow-lg">
              {moonPhaseEmoji}
            </div>
            <h3 className="text-2xl font-bold text-cosmic-100 mb-1">
              {result.moon.phase_name}
            </h3>
            <p className="text-lg text-cosmic-300">
              {result.moon.major_phase}
            </p>
            <p className="text-sm text-cosmic-400 mt-2">
              Iluminare: {result.moon.illumination}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">Semn Zodiacal</p>
              <p className="text-cosmic-100 font-semibold">{result.moon.zodiac.moon_sign}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">Etapa</p>
              <p className="text-cosmic-100 font-semibold capitalize">{result.moon.stage}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">Vârsta</p>
              <p className="text-cosmic-100 font-semibold">{result.moon.age_days} zile</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">Ciclul Lunar</p>
              <p className="text-cosmic-100 font-semibold">{result.moon.lunar_cycle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 mb-4">
        <h4 className="text-xl font-semibold text-cosmic-100 mb-4 p-4 pb-0">☀️ Soare</h4>
        
        <div className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">Răsărit</p>
              <p className="text-cosmic-100 font-semibold text-lg">{result.sun.sunrise_timestamp}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">Apus</p>
              <p className="text-cosmic-100 font-semibold text-lg">{result.sun.sunset_timestamp}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 col-span-2">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">Semn Zodiacal</p>
              <p className="text-cosmic-100 font-semibold">{result.moon.zodiac.sun_sign}</p>
            </div>
          </div>

          <div className="mt-4 bg-white/5 rounded-lg p-3">
            <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">Durata Zilei</p>
            <p className="text-cosmic-100 font-semibold">{result.sun.day_length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10">
        <h4 className="text-xl font-semibold text-cosmic-100 mb-4 p-4 pb-0">🔮 Fazele Lunii</h4>
        
        <div className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">🌑 Ultima Lună Nouă</p>
              <p className="text-cosmic-100 text-sm">
                {result.moon.detailed?.upcoming_phases?.new_moon?.last?.days_ago !== null 
                  ? `Acum ${result.moon.detailed.upcoming_phases.new_moon.last.days_ago} zile` 
                  : 'N/A'}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">🌑 Următoarea Lună Nouă</p>
              <p className="text-cosmic-100 text-sm">
                {result.moon.detailed?.upcoming_phases?.new_moon?.next?.days_ahead !== null 
                  ? `În ${result.moon.detailed.upcoming_phases.new_moon.next.days_ahead} zile` 
                  : 'N/A'}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">🌓 Ultimul Pătrar</p>
              <p className="text-cosmic-100 text-sm">
                {result.moon.detailed?.upcoming_phases?.last_quarter?.last?.days_ago !== null 
                  ? `Acum ${result.moon.detailed.upcoming_phases.last_quarter.last.days_ago} zile` 
                  : 'N/A'}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">🌓 Primul Pătrar</p>
              <p className="text-cosmic-100 text-sm">
                {result.moon.detailed?.upcoming_phases?.first_quarter?.next?.days_ahead !== null 
                  ? `În ${result.moon.detailed.upcoming_phases.first_quarter.next.days_ahead} zile` 
                  : 'N/A'}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 col-span-2">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">🌕 Ultima Lună Plină</p>
              <p className="text-cosmic-100 text-sm">
                {result.moon.detailed?.upcoming_phases?.full_moon?.last?.days_ago !== null 
                  ? `Acum ${result.moon.detailed.upcoming_phases.full_moon.last.days_ago} zile` 
                  : 'N/A'}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 col-span-2">
              <p className="text-xs text-cosmic-400 uppercase tracking-wide mb-1">🌕 Următoarea Lună Plină</p>
              <p className="text-cosmic-100 text-sm">
                {result.moon.detailed?.upcoming_phases?.full_moon?.next?.days_ahead !== null 
                  ? `În ${result.moon.detailed.upcoming_phases.full_moon.next.days_ahead} zile` 
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LunarResultsDisplay;
