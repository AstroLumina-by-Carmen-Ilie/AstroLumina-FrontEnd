import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import { BirthDataPayload, UserInfo, ContactInfo } from '../../../types';
import BirthDataForm from './BirthDataForm';
import ContactForm from './ContactForm';
import PaymentForm from './PaymentForm';
import FinalStep from './FinalStep';

const KarmicChartPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [payload, setPayload] = useState<BirthDataPayload | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<boolean | null>(false);

  const handleBack = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BirthDataForm
            onNext={(payload, userInfo) => {
              setPayload(payload);
              setUserInfo(userInfo);
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
            payload={payload!}
            userInfo={userInfo!}
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
      <Navbar isScrolled={true} lightTheme={false} />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
            Interpretare Hartă Karmică
          </h1>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Panel */}
              <div className="hidden md:flex md:w-1/2 p-8 flex-col justify-center bg-gradient-to-br from-cosmic-900/30 to-transparent">
                <h2 className="font-display text-3xl font-bold text-white mb-6">
                  Explorează Ciclurile Karmice
                </h2>
                <p className="text-cosmic-200/80 leading-relaxed mb-8">
                  Descoperă lecțiile sufletului tău și ciclurile karmice prin prisma astrologiei.
                  Acest proces te va ghida în înțelegerea pattern-urilor karmice din viața ta.
                </p>

                <div className="space-y-3">
                  {[
                    { num: 1, label: 'Date naștere' },
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

export default KarmicChartPage;
