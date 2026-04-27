import { useState, useEffect } from "react";
import { LunarDataResponse } from "@/types";
import Navbar from "@/components/navbar/Navbar";
import LunarDataForm from "@/pages/services/moon-phase-calculator/LunarDataForm";
import LunarResultsDisplay from "@/pages/services/moon-phase-calculator/LunarResultsDisplay";
import { useLoading } from "@/hooks/useLoading";
import { calculateLunarPhasePosition } from "@/utils/astrologicalCalculations";
import { getRomanianCityCoordinates } from "@/data";

type SelectionMode = "none" | "specific-date" | "current-date";

const MoonPhaseCalculatorPage = () => {
  const [result, setResult] = useState<LunarDataResponse | null>(null);
  const [userInfo, setUserInfo] = useState<{ location: string } | null>(null);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>("none");
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
    setSelectionMode("current-date");
    setResult(null);
    setUserInfo(null);

    startLoading();
    try {
      const now = new Date();
      const defaultCoords = getRomanianCityCoordinates("B", "București");

      const payload = {
        longitude: defaultCoords?.lng || 26.1025,
        latitude: defaultCoords?.lat || 44.4268,
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
      };

      const lunarResult = await calculateLunarPhasePosition("ro", payload);
      setResult(lunarResult);
      setUserInfo({
        location: "București, România",
      });
    } catch (error) {
      console.error("Error calculating current lunar phase:", error);
    } finally {
      stopLoading();
    }
  };

  const renderContent = () => {
    if (!isFormMounted) return null;

    if (result && userInfo) {
      return <LunarResultsDisplay result={result} userInfo={userInfo} />;
    }

    if (selectionMode === "none") {
      return (
        <div className="space-y-5">
          <p className="mb-8 text-lg text-center text-cosmic-200/70">
            Alegeți modalitatea de calcul a fazei lunare
          </p>
          <button
            type="button"
            className="flex gap-3 justify-center items-center px-8 py-5 w-full font-semibold text-white bg-gradient-to-r rounded-xl luxury-button from-cosmic-600 via-cosmic-500 to-cosmic-600 hover:from-cosmic-500 hover:to-cosmic-500 shadow-luxury-purple"
            onClick={() => setSelectionMode("specific-date")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Alege o dată specifică</span>
          </button>
          <button
            type="button"
            className="flex gap-3 justify-center items-center px-8 py-5 w-full font-semibold text-white bg-gradient-to-r rounded-xl luxury-button from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-500 shadow-luxury-gold"
            onClick={handleCurrentDate}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <span>Vezi luna acum</span>
          </button>
        </div>
      );
    }

    return <LunarDataForm setResult={setResult} setUserInfo={setUserInfo} />;
  };

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={true} />

      <div className="relative pt-24 pb-16">
        <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] top-0 right-0 opacity-20"></div>

        <div className="container relative z-10 px-6 mx-auto">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden glass-card">
              <div className="flex flex-col md:flex-row">
                {/* Left Panel */}
                <div className="hidden flex-col justify-center p-10 bg-gradient-to-br to-transparent from-cosmic-900/40 via-cosmic-800/20 md:flex md:w-1/2">
                  <h2 className="mb-6 text-3xl font-bold text-white font-display">
                    Calculatorul Fazelor Lunare
                  </h2>
                  <div className="mb-8 space-y-4 leading-relaxed text-cosmic-200/80">
                    <p>
                      Descoperă faza lunii pentru orice dată și locație sau vezi
                      cum arată luna în acest moment. Luna are o influență
                      profundă asupra energiei noastre și a ritmurilor naturale.
                    </p>
                    <p>Ce vei primi:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Faza curentă a lunii cu reprezentare vizuală</li>
                      <li>Semnul zodiacal al lunii și soarelui</li>
                      <li>Orele de răsărit și apus pentru locația ta</li>
                      <li>Următoarele faze importante ale lunii</li>
                    </ul>
                    <p>
                      Informațiile despre fazele lunare te pot ajuta să îți
                      planifici activitățile în funcție de energia ciclurilor
                      cosmice.
                    </p>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="p-10 w-full md:w-1/2">{renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoonPhaseCalculatorPage;
