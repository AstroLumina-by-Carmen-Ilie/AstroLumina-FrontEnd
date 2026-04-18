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
import BirthDataForm from "@/pages/bookings/synastry-chart/BirthDataForm";
import ContactForm from "@/pages/bookings/synastry-chart/ContactForm";
import BookingQuestionsForm from "@/pages/bookings/synastry-chart/BookingQuestionsForm";
import AvailabilitySelector from "@/pages/bookings/synastry-chart/AvailabilitySelector";
import PaymentForm from "@/pages/bookings/synastry-chart/PaymentForm";
import ConfirmationStep from "@/pages/bookings/synastry-chart/ConfirmationStep";

const SynastryChartBookingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [firstPayload, setFirstPayload] = useState<BirthDataPayload | null>(
    null,
  );
  const [secondPayload, setSecondPayload] = useState<BirthDataPayload | null>(
    null,
  );
  const [firstMemberUserInfo, setFirstMemberUserInfo] =
    useState<UserInfo | null>(null);
  const [secondMemberUserInfo, setSecondMemberUserInfo] =
    useState<UserInfo | null>(null);
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
            key="step1"
            initialValues={
              firstPayload && firstMemberUserInfo
                ? { payload: firstPayload, userInfo: firstMemberUserInfo }
                : undefined
            }
            onNext={(payload, userInfo) => {
              setFirstPayload(payload);
              setFirstMemberUserInfo(userInfo);
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <BirthDataForm
            key="step2"
            initialValues={
              secondPayload && secondMemberUserInfo
                ? { payload: secondPayload, userInfo: secondMemberUserInfo }
                : undefined
            }
            onNext={(payload, userInfo) => {
              setSecondPayload(payload);
              setSecondMemberUserInfo(userInfo);
              setCurrentStep(3);
            }}
            onBack={handleBack}
            showBackButton
          />
        );
      case 3:
        return (
          <ContactForm
            initialValues={contactInfo || undefined}
            onNext={(contactInfo) => {
              setContactInfo(contactInfo);
              setCurrentStep(4);
            }}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <BookingQuestionsForm

            initialValues={bookingQuestions || undefined}
            onNext={(questions) => {
              setBookingQuestions(questions);
              setCurrentStep(5);
            }}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <AvailabilitySelector
          
            initialValues={selectedSlot || undefined}
            onNext={(slot) => {
              setSelectedSlot(slot);
              setCurrentStep(6);
            }}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <PaymentForm
            selectedSlot={selectedSlot!}
            existingPaymentIntentId={paymentIntentId!}
            onNext={(intentId) => {
              setPaymentIntentId(intentId);
              setCurrentStep(7);
            }}
            onBack={handleBack}
          />
        );
      case 7:
        return (
          <ConfirmationStep
            firstPayload={firstPayload!}
            secondPayload={secondPayload!}
            firstMemberUserInfo={firstMemberUserInfo!}
            secondMemberUserInfo={secondMemberUserInfo!}
            contactInfo={contactInfo!}
            bookingQuestions={bookingQuestions!}
            selectedSlot={selectedSlot!}
            paymentIntentId={paymentIntentId}
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
            Astrograma Relațională
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-cosmic-300">
            Descoperă dinamiciile relației tale!
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden glass-card">
            <div className="flex flex-col md:flex-row">
              {/* Left Panel */}
              <div className="hidden flex-col justify-center p-8 bg-gradient-to-br to-transparent md:flex md:w-1/2 from-cosmic-900/30">
                <h2 className="mb-6 text-3xl font-bold text-white font-display">
                  Astrograma Relațională
                </h2>
                <div className="mb-8 space-y-4 leading-relaxed text-cosmic-200/80">
                  <p>
                    În această sesiune live, explorăm dinamicile profunde ale
                    relației tale cu partenerul, părinții, copiii, prietenii sau
                    orice altă persoană de interes.
                  </p>
                  <p>Această sesiune este pentru tine dacă îți dorești:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>
                      Să înțelegi tiparele și dinamicile subtile ale relației
                    </li>
                    <li>Să afli care este potențialul vostru împreună</li>
                    <li>
                      Să aduci claritate asupra punctelor de vulnerabilitate
                    </li>
                    <li>
                      Să clarifici care sunt lecțiile pe care le puteți învăța
                      împreună
                    </li>
                    <li>Să înțelegi ce rol aveți unul în evoluția celuilalt</li>
                    <li>
                      Să cunoști gradul vostru de compatibilitate și căile de
                      evoluție
                    </li>
                  </ul>
                  <p>
                    Astrologia nu oferă verdicte de compatibilitate, ci îți
                    arată natura relației: ce vă apropie, ce vă provoacă, ce
                    este necesar pentru ca relația să se maturizeze în mod
                    armonios.
                  </p>
                  <p>
                    Poți solicita o Astrogramă Relațională pentru orice tip de
                    relație - romantică, familială, profesională sau de
                    prietenie.
                  </p>
                  <p>Consultația este oferită prin Zoom.</p>
                  <p>
                    Poți lua notițe, dacă dorești, iar sesiunea va fi
                    înregistrată, cu acordul tău, pentru ca tu să o primești
                    ulterior și să o poți reasculta.
                  </p>
                  <p>
                    Notă: Dacă nu cunoști ora nașterii, dar știi un interval,
                    notează mijlocul intervalului. Dacă ora este complet
                    necunoscută, folosește 12:00 (PM).
                  </p>
                </div>

                {/* Step indicators */}
                <div className="space-y-3">
                  {[
                    { num: 1, label: "Date naștere 1" },
                    { num: 2, label: "Date naștere 2" },
                    { num: 3, label: "Date contact" },
                    { num: 4, label: "Motivul discuției" },
                    { num: 5, label: "Disponibilitate" },
                    { num: 6, label: "Plată" },
                    { num: 7, label: "Confirmare" },
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
                    {[1, 2, 3, 4, 5, 6, 7].map((step) => (
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
                      style={{ width: `${((currentStep - 1) / 6) * 100}%` }}
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
