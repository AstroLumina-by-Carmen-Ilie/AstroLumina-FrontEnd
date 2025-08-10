import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import { BirthDataPayload, UserInfo, ContactInfo } from '../../../types/astralChart';
import karmicChartIllustration from '../../../assets/astral-chart.svg';
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

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        try {
        return <BirthDataForm onNext={(payload, userInfo) => {
          setPayload(payload)
          setUserInfo(userInfo);
          setCurrentStep(2);
        }} />;
        } catch (error) {
          console.error('Error rendering birth data form:', error);
          return <div>An error occurred while rendering the birth data form</div>;
        }
      case 2:
        try {
        return <ContactForm onNext={(contactInfo) => {
          setContactInfo(contactInfo);
          setCurrentStep(3);
        }} onBack={handleBack} />;
        } catch (error) {
          console.error('Error rendering contact form:', error);
          return <div>An error occurred while rendering the contact form</div>;
        }
      case 3:
        try {
        return <PaymentForm onNext={(paymentStatus) => {
          setPaymentStatus(paymentStatus);
          setCurrentStep(4);
        }} onBack={handleBack} />;
        } catch (error) {
          console.error('Error rendering payment form:', error);
          return <div>An error occurred while rendering the payment form</div>;
        }
      case 4:
        try {
          return <FinalStep
            payload={payload!}
            userInfo={userInfo!}
            contactInfo={contactInfo!}
            paymentStatus={paymentStatus!} />;
        } catch (error) {
          console.error('Error rendering final step:', error);
          return <div>An error occurred while rendering the final step</div>;
        }
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Navbar isScrolled={true} lightTheme={true} />

      <main className="container mx-auto px-6 pt-24">
        <h1 className="text-4xl font-bold text-center mb-8">Karmic Chart Reading</h1>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Panel - Service Description - Hidden on mobile */}
              <div className="hidden md:block md:w-1/2 p-8 bg-gradient-to-br from-purple-50 to-indigo-50">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Discover Your Celestial Blueprint
                </h2>
                <div className="mb-8">
                  <img
                    src={karmicChartIllustration}
                    alt="Karmic Chart"
                    className="w-full max-w-md mx-auto mb-6"
                  />
                </div>
                <div className="prose prose-indigo">
                  <p className="text-lg text-gray-600 mb-4">
                    Discover your unique astrological blueprint with our comprehensive karmic chart reading.
                    This multi-step process will guide you through providing your birth details and receiving your personalized reading.
                  </p>
                </div>
              </div>
              {/* Right Panel - Form or Results */}
              <div className="w-full md:w-1/2 p-4 sm:p-8">
                {/* Mobile Title */}
                <div className="block md:hidden mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Discover Your Celestial Blueprint
                  </h2>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      {[1, 2, 3, 4].map((step) => (
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
                          {step < currentStep ? '✓' : step}
                        </div>
                      ))}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                      />
                    </div>
                  </div>
                  {renderStep()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KarmicChartPage;
