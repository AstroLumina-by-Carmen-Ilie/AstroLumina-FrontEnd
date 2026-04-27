import React from "react";
import { LunarDataResponse } from "@/types";

const LunarResultsDisplay: React.FC<{
  result: LunarDataResponse;
  userInfo: {
    location: string;
  };
}> = ({ result, userInfo }) => {
  const formatDateFromDatestamp = (datestamp: string): string => {
    try {
      const date = new Date(datestamp);
      return date.toLocaleDateString("ro-RO", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return datestamp;
    }
  };

  return (
    <div className="w-full text-center">
      <div className="mb-6">
        <p className="mb-1 text-lg text-cosmic-300">{userInfo.location}</p>
        <p className="text-lg text-cosmic-300">
          {formatDateFromDatestamp(result.datestamp)}
        </p>
      </div>

      <div className="mb-4 rounded-xl border bg-white/5 border-white/10">
        <h4 className="p-4 pb-0 mb-4 text-xl font-semibold text-cosmic-100">
          🌙 Faza lunară
        </h4>

        <div className="p-4 pt-0">
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4 text-8xl filter drop-shadow-lg">
              {result.moon.emoji}
            </div>
            <h3 className="mb-1 text-2xl font-bold text-cosmic-100">
              {result.moon.phase_name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="mb-1 text-xs tracking-wide uppercase text-cosmic-400">
                Semn Zodiacal
              </p>
              <p className="font-semibold text-cosmic-100">
                {result.moon.zodiac.moon_sign}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="mb-1 text-xs tracking-wide uppercase text-cosmic-400">
                Iluminare
              </p>
              <p className="font-semibold capitalize text-cosmic-100">
                {result.moon.illumination}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-xl border bg-white/5 border-white/10">
        <h4 className="p-4 pb-0 mb-4 text-xl font-semibold text-cosmic-100">
          ☀️ Soare
        </h4>

        <div className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="mb-1 text-xs tracking-wide uppercase text-cosmic-400">
                Răsărit
              </p>
              <p className="text-lg font-semibold text-cosmic-100">
                {result.sun.sunrise_timestamp}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="mb-1 text-xs tracking-wide uppercase text-cosmic-400">
                Apus
              </p>
              <p className="text-lg font-semibold text-cosmic-100">
                {result.sun.sunset_timestamp}
              </p>
            </div>
            <div className="col-span-2 p-3 rounded-lg bg-white/5">
              <p className="mb-1 text-xs tracking-wide uppercase text-cosmic-400">
                Semn Zodiacal
              </p>
              <p className="font-semibold text-cosmic-100">
                {result.moon.zodiac.sun_sign}
              </p>
            </div>
          </div>

          <div className="p-3 mt-4 rounded-lg bg-white/5">
            <p className="mb-1 text-xs tracking-wide uppercase text-cosmic-400">
              Durata Zilei
            </p>
            <p className="font-semibold text-cosmic-100">
              {result.sun.day_length}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white/5 border-white/10">
        <h4 className="p-4 pb-0 mb-4 text-xl font-semibold text-cosmic-100">
          🔮 Fazele Lunii
        </h4>

        <div className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-3 text-left">      
            <div className="col-span-2 p-3 rounded-lg bg-white/5">
              <p className="mb-1 text-xs tracking-wide uppercase text-cosmic-400">
                🌑 Ultima Lună Nouă
              </p>
              <p className="text-sm text-cosmic-100">
                {result.moon.detailed?.upcoming_phases?.full_moon?.last
                  ?.datestamp !== null
                  ? formatDateFromDatestamp(result.moon.detailed.upcoming_phases.full_moon.last.datestamp)
                  : "N/A"}
              </p>
            </div>
            <div className="col-span-2 p-3 rounded-lg bg-white/5">
              <p className="mb-1 text-xs tracking-wide uppercase text-cosmic-400">
                🌑 Următoarea Lună Nouă
              </p>
              <p className="text-sm text-cosmic-100">
                {result.moon.detailed?.upcoming_phases?.new_moon?.next
                  ?.datestamp !== null
                  ? formatDateFromDatestamp(result.moon.detailed.upcoming_phases.new_moon.next.datestamp)
                  : "N/A"}
              </p>
            </div>
            <div className="col-span-2 p-3 rounded-lg bg-white/5">
              <p className="mb-1 text-xs tracking-wide uppercase text-cosmic-400">
                🌕 Ultima Lună Plină
              </p>
              <p className="text-sm text-cosmic-100">
                {result.moon.detailed?.upcoming_phases?.new_moon?.last
                  ?.datestamp !== null
                  ? formatDateFromDatestamp(result.moon.detailed.upcoming_phases.new_moon.last.datestamp)
                  : "N/A"}
              </p>
            </div>
            <div className="col-span-2 p-3 rounded-lg bg-white/5">
              <p className="mb-1 text-xs tracking-wide uppercase text-cosmic-400">
                🌕 Următoarea Lună Plină
              </p>
              <p className="text-sm text-cosmic-100">
                {result.moon.detailed?.upcoming_phases?.full_moon?.next
                  ?.datestamp !== null
                  ? formatDateFromDatestamp(result.moon.detailed.upcoming_phases.full_moon.next.datestamp)
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LunarResultsDisplay;
