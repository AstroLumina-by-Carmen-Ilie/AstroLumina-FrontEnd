import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import BirthDataStep from "./BirthDataStep";
import EmailStep from "./EmailStep";

const SoareleStralucireaTaPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sunSign, setSunSign] = useState("");

  const handleBack = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BirthDataStep
            onNext={(sign) => {
              setSunSign(sign);
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return <EmailStep sunSign={sunSign} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={true} />

      <main className="container px-6 pt-24 pb-16 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display from-cosmic-300 to-gold-400">
            Soarele, Strălucirea Ta
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-cosmic-300">
            Descoperă care este zodia Soarelui tău și cadoul pe care ți-l oferim
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden glass-card">
            <div className="flex flex-col md:flex-row">
              <div
                aria-label="Panoul de informare"
                className="flex-col justify-center p-8 bg-gradient-to-br to-transparent md:flex md:w-1/2 from-cosmic-900/30"
              >
                <h2 className="mb-6 text-3xl font-bold text-white font-display">
                  Soarele, Strălucirea Ta
                </h2>
                <div className="mb-8 space-y-4 leading-relaxed text-cosmic-200/80">
                  <p>
                    Soarele natal reprezintă esența ta - cine ești tu cu
                    adevărat, forța ta interioară și modul în care te exprimi în
                    lume.
                  </p>
                  <p>
                    De la ce semn zodiacal aparține Soarele tău? Această
                    informație simplă poate dezvălui multe despre:
                  </p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Cum îți exprimi creativitatea</li>
                    <li>Care sunt talentele tale naturale</li>
                    <li>Ce te face să strălucești</li>
                    <li>Rolul tău în relații</li>
                  </ul>
                  <p>
                    Completează formularul și vei primi un PDF cadou cu toate
                    detaliile despre zodia ta solară.
                  </p>
                </div>

                <div aria-label="Indicatorii pașilor" className="space-y-3">
                  {[
                    { num: 1, label: "Data nașterii" },
                    { num: 2, label: "Email" },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-3 items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          step.num === currentStep
                            ? "step-active text-white"
                            : step.num < currentStep
                              ? "step-completed text-white"
                              : "step-pending text-cosmic-400"
                        }`}
                      >
                        {step.num < currentStep ? "✓" : step.num}
                      </div>
                      <span
                        className={`text-sm ${step.num === currentStep ? "text-white" : "text-cosmic-400"}`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                aria-label="Formularul principal"
                className="p-8 w-full md:w-1/2"
              >
                <div className="mb-8 md:hidden">
                  <div className="flex justify-between items-center mb-4">
                    {[1, 2].map((step) => (
                      <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          step === currentStep
                            ? "step-active text-white"
                            : step < currentStep
                              ? "step-completed text-white"
                              : "step-pending text-cosmic-400"
                        }`}
                      >
                        {step < currentStep ? "✓" : step}
                      </div>
                    ))}
                  </div>
                  <div className="h-1 rounded-full bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r rounded-full transition-all duration-500 from-cosmic-500 to-cosmic-400"
                      style={{ width: `${((currentStep - 1) / 1) * 100}%` }}
                    />
                  </div>
                </div>

                {renderStep()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SoareleStralucireaTaPage;
