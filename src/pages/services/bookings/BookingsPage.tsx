import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import BookingWidget from './BookingsWidget';
import BookingPaymentForm from './BookingPaymentForm';
import consultationIllustration from '../../../assets/consultation.svg';

const BookingsPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Navbar isScrolled={true} lightTheme={true} />

      <main className="container mx-auto px-6 pt-24">
        <h1 className="text-4xl font-bold text-center mb-8">Consultații</h1>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Panel - Service Description - Hidden on mobile */}
              <div className="hidden md:block md:w-1/2 p-8 bg-gradient-to-br from-purple-50 to-indigo-50">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Programează o Consultație Astrologică
                </h2>
                <div className="mb-8">
                  <img
                    src={consultationIllustration}
                    alt="Consultație Astrologică"
                    className="w-full max-w-md mx-auto mb-6"
                  />
                </div>
                <div className="prose prose-indigo">
                  <p className="text-lg text-gray-600 mb-4">
                    Explorează-ți destinul și potențialul cu o consultație astrologică personalizată. 
                    Vei primi îndrumări valoroase despre viața ta, relații, carieră și dezvoltare personală.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>✨ Analiză detaliată a temei natale</li>
                    <li>🌟 Previziuni astrologice personalizate</li>
                    <li>💫 Răspunsuri la întrebările tale specifice</li>
                    <li>🌙 Ghidare pentru dezvoltare personală</li>
                  </ul>
                </div>
              </div>

              {/* Right Panel - Form or Widget */}
              <div className="w-full md:w-1/2 p-4 sm:p-8">
                {/* Mobile Title */}
                <div className="block md:hidden mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Programează o Consultație Astrologică
                  </h2>
                </div>
                <div className="bg-white rounded-lg">
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      {[1, 2].map((step) => (
                        <div
                          key={step}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step === currentStep
                              ? 'bg-amber-500 text-white'
                              : step < currentStep
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className={currentStep === 1 ? 'text-amber-500 font-medium' : ''}>
                        Plată
                      </span>
                      <span className={currentStep === 2 ? 'text-amber-500 font-medium' : ''}>
                        Programare
                      </span>
                    </div>
                  </div>
                  {/* {renderStep()} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingsPage;
