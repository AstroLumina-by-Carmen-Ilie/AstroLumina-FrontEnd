import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import PaymentStep from "./PaymentStep";
import EmailStep from "./EmailStep";

const GhidulLuiSaturnInBerbecPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleBack = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PaymentStep onComplete={() => setCurrentStep(2)} />;
      case 2:
        return <EmailStep onBack={handleBack} />;
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
            Ghidul lui Saturn în Berbec
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-cosmic-300">
            Navighează cu înțelepciune energiile lui Saturn în semnul Berbecului
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
                  Ghidul lui Saturn în Berbec
                </h2>
                <div className="mb-8 space-y-4 leading-relaxed text-cosmic-200/80">
                  <p>
                    Saturn în Berbec este o poziție astrologică unică care aduce
                    încercări și lecții importante.
                  </p>
                  <p>Acest ghid te ajută să înțelegi:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Ce înseamnă Saturn în Berbec pentru tine</li>
                    <li>Cum să folosești această energie constructiv</li>
                    <li>Provocările specifice acestei poziții</li>
                    <li>Strategii pentru depășirea blocajelor</li>
                  </ul>
                  <p>
                    Include sfaturi practice și insight-uri profunde pentru a
                    transforma aceste energii în aliati.
                  </p>
                </div>

                <div aria-label="Indicatorii pașilor" className="space-y-3">
                  {[
                    { num: 1, label: "Plată" },
                    { num: 2, label: "Descarcă ghidul" },
                  ].map((step) => (
                    <div key={step.num} className="flex items-center gap-3">
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
                className="w-full p-8 md:w-1/2"
              >
                <div className="mb-8 md:hidden">
                  <div className="flex items-center justify-between mb-4">
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
                      className="h-full transition-all duration-500 rounded-full bg-gradient-to-r from-cosmic-500 to-cosmic-400"
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

export default GhidulLuiSaturnInBerbecPage;
