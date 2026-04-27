import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import {
  BirthDataPayload,
  UserInfo,
  ContactInfo,
  BookingQuestions,
  AvailableSlot,
} from "@/types";
import BirthDataForm from "@/pages/bookings/natal-n-karmic-chart/BirthDataForm";
import ContactForm from "@/pages/bookings/natal-n-karmic-chart/ContactForm";
import BookingQuestionsForm from "@/pages/bookings/natal-n-karmic-chart/BookingQuestionsForm";
import AvailabilitySelector from "@/pages/bookings/natal-n-karmic-chart/AvailabilitySelector";
import PaymentForm from "@/pages/bookings/natal-n-karmic-chart/PaymentForm";
import ConfirmationStep from "@/pages/bookings/natal-n-karmic-chart/ConfirmationStep";

const NatalNKarmicChartBookingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [payload, setPayload] = useState<BirthDataPayload | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [bookingQuestions, setBookingQuestions] =
    useState<BookingQuestions | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");

  const handleBack = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BirthDataForm
            initialValues={
              payload && userInfo ? { payload, userInfo } : undefined
            }
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
            initialValues={contactInfo || undefined}
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
            initialValues={bookingQuestions || undefined}
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
            initialValues={selectedSlot || undefined}
            onNext={(slot) => {
              setSelectedSlot(slot);
              setCurrentStep(5);
            }}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <PaymentForm
            selectedSlot={selectedSlot!}
            existingPaymentIntentId={paymentIntentId!}
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
            paymentIntentId={paymentIntentId!}
            onBack={handleBack}
            onComplete={() => navigate("/")}
          />
        );
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
            Astrograma Natală și Karmică
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-cosmic-300">
            Sesiune live în care aducem claritate și direcție prin înțelegerea
            astrogramei tale!
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden glass-card">
            <div className="flex flex-col md:flex-row">
              {/* Left Panel */}
              <div className="flex flex-col justify-center p-8 bg-gradient-to-br to-transparent md:flex md:w-1/2 from-cosmic-900/30">
                <h2 className="mb-6 text-3xl font-bold text-white font-display">
                  Astrograma Natală și Karmică
                </h2>
                <div className="mb-8 space-y-4 leading-relaxed text-cosmic-200/80">
                  <p>
                    În această sesiune live, explorăm împreună harta ta natală –
                    "poza cerului" din momentul nașterii tale. Fiecare planetă
                    vorbește despre o parte din tine, de la felul în care
                    iubești, până la cum îți exprimi talentele sau ce tipare te
                    pot bloca.
                  </p>
                  <p>
                    Astrograma este mai mult decât o hartă - ea este un
                    instrument profund de autocunoaștere care îți oferă
                    răspunsuri clare despre:
                  </p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>direcția ta profesională și resursele interioare</li>
                    <li>
                      tiparele în iubire și ce tip de partener ți se potrivește
                    </li>
                    <li>
                      cum îți poți valorifica talentele și câștiga banii în mod
                      benefic
                    </li>
                    <li>
                      lecțiile și blocajele personale, dar și cum le poți depăși
                    </li>
                    <li>linia destinului și misiunea ta personală</li>
                  </ul>
                  <p>
                    Dacă simți că e timpul să înțelegi mai bine cine ești, de ce
                    atragi anumite provocări și cum îți poți folosi potențialul
                    la maximum, această sesiune îți aduce claritate și direcție.
                  </p>
                  <p>Include și analiza transgenerațională a hărții tale.</p>
                  <p>Consultația este oferită prin Zoom.</p>
                  <p>
                    Poți lua notițe, dacă dorești, iar sesiunea va fi
                    înregistrată, cu acordul tău, pentru ca tu să o primești
                    ulterior și să o poți reasculta.
                  </p>
                </div>

                {/* Step indicators */}
                <div className="space-y-3">
                  {[
                    { num: 1, label: "Date naștere" },
                    { num: 2, label: "Date contact" },
                    { num: 3, label: "Motivul discuției" },
                    { num: 4, label: "Disponibilitate" },
                    { num: 5, label: "Plată" },
                    { num: 6, label: "Confirmare" },
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

              {/* Right Panel */}
              <div className="p-8 w-full md:w-1/2">
                {/* Mobile step indicator */}
                <div className="mb-8 md:hidden">
                  <div className="flex justify-between items-center mb-4">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
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

export default NatalNKarmicChartBookingPage;
