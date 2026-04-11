import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import { BirthDataPayload, UserInfo, ContactInfo } from '@/types';
import BirthDataForm from '@/pages/bookings/synastry-chart/BirthDataForm';
import ContactForm from '@/pages/bookings/synastry-chart/ContactForm';
import PaymentForm from '@/pages/bookings/synastry-chart/PaymentForm';
import FinalStep from '@/pages/bookings/synastry-chart/FinalStep';

const SynastryChartBookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [firstPayload, setFirstPayload] = useState<BirthDataPayload | null>(null);
  const [secondPayload, setSecondPayload] = useState<BirthDataPayload | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<boolean | null>(false);

  const handleBack = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BirthDataForm
            onNext={(firstPayload, secondPayload) => {
              setFirstPayload(firstPayload);
              setSecondPayload(secondPayload);
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <ContactForm
            onNext={(contactInfo) => {
              setContactInfo(contactInfo);
              setCurrentStep(3);
            }}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <PaymentForm
            onNext={(paymentStatus) => {
              setPaymentStatus(paymentStatus);
              setCurrentStep(4);
            }}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <FinalStep
            firstPayload={firstPayload!}
            secondPayload={secondPayload!}
            contactInfo={contactInfo!}
            paymentStatus={paymentStatus!}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
      <Navbar isScrolled={true} />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
            Astrograma Relațională
          </h1>
          <p className="text-cosmic-300 mt-4 max-w-2xl mx-auto">
            Descoperă dinamiciile relației tale!
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Panel */}
              <div className="hidden md:flex md:w-1/2 p-8 flex-col justify-center bg-gradient-to-br from-cosmic-900/30 to-transparent">
                <h2 className="font-display text-3xl font-bold text-white mb-6">
                  Astrograma Relațională
                </h2>
                <div className="text-cosmic-200/80 leading-relaxed mb-8 space-y-4">
                  <p>
                    În această sesiune live, explorăm dinamicile profunde ale relației tale cu partenerul, părinții, copiii, prietenii sau orice altă persoană de interes.
                  </p>
                  <p>
                    Această sesiune este pentru tine dacă îți dorești:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Să înțelegi tiparele și dinamicile subtile ale relației</li>
                    <li>Să afli care este potențialul vostru împreună</li>
                    <li>Să aduci claritate asupra punctelor de vulnerabilitate</li>
                    <li>Să clarifici care sunt lecțiile pe care le puteți învăța împreună</li>
                    <li>Să înțelegi ce rol aveți unul în evoluția celuilalt</li>
                    <li>Să cunoști gradul vostru de compatibilitate și căile de evoluție</li>
                  </ul>
                  <p>
                    Astrologia nu oferă verdicte de compatibilitate, ci îți arată natura relației: ce vă apropie, ce vă provoacă, ce este necesar pentru ca relația să se maturizeze în mod armonios.
                  </p>
                  <p>
                    Poți solicita o Astrogramă Relațională pentru orice tip de relație - romantică, familială, profesională sau de prietenie.
                  </p>
                  <p>
                    Consultația este oferită prin Zoom.
                  </p>
                  <p>
                    Poți lua notițe, dacă dorești, iar sesiunea va fi înregistrată, cu acordul tău, pentru ca tu să o primești ulterior și să o poți reasculta.
                  </p>
                  <p>
                    Notă: Dacă nu cunoști ora nașterii, dar știi un interval, notează mijlocul intervalului. Dacă ora este complet necunoscută, folosește 12:00 (PM).
                  </p>
                </div>

                {/* Step indicators */}
                <div className="space-y-3">
                  {[
                    { num: 1, label: 'Date naștere ambii' },
                    { num: 2, label: 'Date contact' },
                    { num: 3, label: 'Plată' },
                    { num: 4, label: 'Rezultat' },
                  ].map((step) => (
                    <div key={step.num} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          step.num === currentStep
                            ? 'step-active text-white'
                            : step.num < currentStep
                            ? 'step-completed text-white'
                            : 'step-pending text-cosmic-400'
                        }`}
                      >
                        {step.num < currentStep ? '✓' : step.num}
                      </div>
                      <span className={`text-sm ${step.num === currentStep ? 'text-white' : 'text-cosmic-400'}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel */}
              <div className="w-full md:w-1/2 p-8">
                {/* Mobile step indicator */}
                <div className="md:hidden mb-8">
                  <div className="flex justify-between items-center mb-4">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          step === currentStep
                            ? 'step-active text-white'
                            : step < currentStep
                            ? 'step-completed text-white'
                            : 'step-pending text-cosmic-400'
                        }`}
                      >
                        {step < currentStep ? '✓' : step}
                      </div>
                    ))}
                  </div>
                  <div className="h-1 bg-white/10 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-cosmic-500 to-cosmic-400 rounded-full transition-all duration-500"
                      style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
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

export default SynastryChartBookingPage;
