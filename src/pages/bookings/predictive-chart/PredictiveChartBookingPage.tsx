import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import { BirthDataPayload, UserInfo, ContactInfo, BookingQuestions } from '@/types';
import BirthDataForm from './BirthDataForm';
import ContactForm from './ContactForm';
import BookingQuestionsForm from './BookingQuestionsForm';
import AvailabilitySelector, { AvailableSlot } from './AvailabilitySelector';
import PaymentFormNatal from './PaymentFormNatal';
import ConfirmationStep from './ConfirmationStep';

const PredictiveChartBookingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [payload, setPayload] = useState<BirthDataPayload | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [bookingQuestions, setBookingQuestions] = useState<BookingQuestions | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');

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
          <BookingQuestionsForm
            onNext={(questions) => {
              setBookingQuestions(questions);
              setCurrentStep(4);
            }}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <AvailabilitySelector
            onNext={(slot) => {
              setSelectedSlot(slot);
              setCurrentStep(5);
            }}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <PaymentFormNatal
            selectedSlot={selectedSlot!}
            onNext={(intentId) => {
              setPaymentIntentId(intentId);
              setCurrentStep(6);
            }}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <ConfirmationStep
            payload={payload!}
            userInfo={userInfo!}
            contactInfo={contactInfo!}
            bookingQuestions={bookingQuestions!}
            selectedSlot={selectedSlot!}
            paymentIntentId={paymentIntentId}
            onBack={handleBack}
            onComplete={() => navigate('/')}
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
            Astrograma Previzională
          </h1>
          <p className="text-cosmic-300 mt-4 max-w-2xl mx-auto">
            Sesiune live în care studiem predispozițiile tale pe anul următor
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Panel */}
              <div className="hidden md:flex md:w-1/2 p-8 flex-col justify-center bg-gradient-to-br from-cosmic-900/30 to-transparent">
                <h2 className="font-display text-3xl font-bold text-white mb-6">
                  Astrograma Previzională
                </h2>
                <div className="text-cosmic-200/80 leading-relaxed mb-8 space-y-4">
                  <p>
                    Această sesiune live îți oferă o privire detaliată asupra predispozițiilor și evenimentelor semnificative din următoarele 12 luni, așa cum se reflectă în harta ta previzională.
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Vei înțelege ce teme sunt în prim-plan și cum să le abordezi în mod conștient</li>
                    <li>Descoperi care sunt perioadele favorabile pentru relații, carieră, mutări, proiecte sau decizii importante</li>
                    <li>Primești răspunsuri pentru întrebări concrete, pentru a-ți organiza cât mai bine planurile și resursele</li>
                  </ul>
                  <p>
                    Dacă ai întrebări legate de un eveniment trecut din viața ta și lecțiile pe care ai nevoie să le înveți în urma sa, le putem discuta, de asemenea.
                  </p>
                  <p>
                    Deși această analiză se axează, în principiu, pe tranzitele următoarelor 12 luni, dacă ai întrebări punctuale în privința unui eveniment mult mai în viitor, răspundem și acestor curiozități.
                  </p>
                  <p>
                    Este o experiență prin care primești ghidaj personalizat, menită să-ți aducă claritate și încredere în pașii pe care îi ai de făcut.
                  </p>
                  <p>
                    Consultația este oferită prin Zoom.
                  </p>
                  <p>
                    Poți lua notițe, dacă dorești, iar sesiunea va fi înregistrată, cu acordul tău, pentru ca tu să o primești ulterior și să o poți reasculta.
                  </p>
                </div>

                {/* Step indicators */}
                <div className="space-y-3">
                  {[
                    { num: 1, label: 'Date naștere' },
                    { num: 2, label: 'Date contact' },
                    { num: 3, label: 'Motivul discuției' },
                    { num: 4, label: 'Disponibilitate' },
                    { num: 5, label: 'Plată' },
                    { num: 6, label: 'Confirmare' },
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
                    {[1, 2, 3, 4, 5, 6].map((step) => (
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
                      style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
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

export default PredictiveChartBookingPage;
