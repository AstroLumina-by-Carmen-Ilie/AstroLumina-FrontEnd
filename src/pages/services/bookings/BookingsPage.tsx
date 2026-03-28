import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import BookingWidget from './BookingsWidget';
import BookingPaymentForm from './BookingPaymentForm';

const BookingsPage = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BookingPaymentForm
            onNext={(paymentStatus) => {
              setPaymentStatus(paymentStatus);
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return <BookingWidget />;
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
            Consultații
          </h1>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Panel */}
              <div className="hidden md:flex md:w-1/2 p-8 flex-col justify-center bg-gradient-to-br from-cosmic-900/30 to-transparent">
                <h2 className="font-display text-3xl font-bold text-white mb-6">
                  Programează o Consultație Astrologică
                </h2>
                <p className="text-cosmic-200/80 leading-relaxed mb-6">
                  Explorează-ți destinul și potențialul cu o consultație astrologică personalizată.
                  Vei primi îndrumări valoroase despre viața ta, relații, carieră și dezvoltare personală.
                </p>
                <ul className="space-y-2 text-cosmic-200/70 text-sm">
                  {[
                    'Analiză detaliată a temei natale',
                    'Previziuni astrologice personalizate',
                    'Răspunsuri la întrebările tale specifice',
                    'Ghidare pentru dezvoltare personală',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cosmic-500 mt-1.5 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Panel */}
              <div className="w-full md:w-1/2 p-8">
                {/* Mobile step indicator */}
                <div className="md:hidden mb-8">
                  <div className="flex justify-between items-center mb-4">
                    {[1, 2].map((step) => (
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
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-cosmic-400">
                    <span>Plată</span>
                    <span>Programare</span>
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

export default BookingsPage;
