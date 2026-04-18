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
        <div className="space-y-4">
          <p className="mb-6 text-center text-cosmic-200">
            Alegeți modalitatea de calcul a fazei lunare
          </p>
          <button
            type="button"
            className="flex gap-3 justify-center items-center px-6 py-4 w-full font-semibold text-white bg-gradient-to-r rounded-xl transition-all duration-300 cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple"
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
            Calculează pentru o dată specifică
          </button>
          <button
            type="button"
            className="flex gap-3 justify-center items-center px-6 py-4 w-full font-semibold bg-gradient-to-r rounded-xl transition-all duration-300 cursor-pointer from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-midnight-950 shadow-glow-gold"
            onClick={handleCurrentDate}
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
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
          className="flex gap-2 items-center mb-4 text-sm text-cosmic-300 hover:text-cosmic-100"
          onClick={() => {
            setSelectionMode("none");
            setResult(null);
            setUserInfo(null);
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Înapoi la opțiuni
        </button>
        <LunarDataForm setResult={setResult} setUserInfo={setUserInfo} />
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={true} />

      <div className="relative pt-24 pb-16">
        <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] top-0 right-0 opacity-20"></div>

        <div className="container relative z-10 px-6 mx-auto">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden glass-card">
              <div className="flex flex-col md:flex-row">
                {/* Left Panel */}
                <div className="flex flex-col justify-center items-center p-8 w-full bg-gradient-to-br to-transparent md:w-1/2 from-cosmic-900/30">
                  <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display from-cosmic-300 to-gold-400">
                      Calculatorul Fazelor Lunare
                    </h1>
                    <p className="leading-relaxed text-cosmic-200/80">
                      Descoperă faza lunii pentru orice dată și locație sau vezi
                      cum arată luna în acest moment
                    </p>
                  </div>

                  <div className="p-6 w-full glass-card-light">
                    <h3 className="mb-4 text-lg font-semibold font-display text-cosmic-900">
                      Ce vei primi:
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {[
                        "Faza curentă a lunii cu reprezentare vizuală",
                        "Semnul zodiacal al lunii și soarelui",
                        "Orele de răsărit și apus pentru locația ta",
                        "Următoarele faze importante ale lunii",
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-cosmic-500 mt-1.5 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="p-8 w-full md:w-1/2">{renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoonPhaseCalculatorPage;
