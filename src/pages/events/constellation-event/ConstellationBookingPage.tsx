import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { useEventSeats } from "@/hooks/useEventSeats";
import { getEventById } from "@/data/events";
import TicketPaymentForm from "./TicketPaymentForm";
import AttendeesForm from "./AttendeesForm";
import BookingConfirmation from "./BookingConfirmation";

interface TicketHolder {
  fullName: string;
}

const ConstellationBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isEventFull } = useEventSeats();

  const eventId = id || "";
  const event = getEventById(eventId);

  const [currentStep, setCurrentStep] = useState(1);
  const [ticketCount, setTicketCount] = useState(1);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [ticketHolders, setTicketHolders] = useState<TicketHolder[]>([]);

  const eventFull = isEventFull(eventId);
  const handleBack = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TicketPaymentForm
            event={event}
            ticketCount={ticketCount}
            onTicketCountChange={setTicketCount}
            onPaymentComplete={(paymentId) => {
              setPaymentIntentId(paymentId);
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <AttendeesForm
            ticketCount={ticketCount}
            event={event}
            onComplete={(holders) => {
              setTicketHolders(holders);
              setCurrentStep(3);
            }}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <BookingConfirmation
            event={event}
            ticketCount={ticketCount}
            ticketHolders={ticketHolders}
            paymentIntentId={paymentIntentId}
            onBack={handleBack}
            onComplete={() => navigate("/")}
          />
        );
      default:
        return null;
    }
  };

  if (currentStep === 1 && eventFull) {
    return (
      <div className="min-h-screen text-white bg-midnight-950">
        <Navbar isScrolled={true} />

        <main className="container px-6 pt-24 pb-16 mx-auto">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden glass-card">
              <div className="flex flex-col md:flex-row">
                <div className="hidden flex-col justify-center p-8 bg-gradient-to-br to-transparent md:flex md:w-1/2 from-cosmic-900/30">
                  <h2 className="mb-6 text-3xl font-bold text-white font-display">
                    {event?.title || "Eveniment Constelații"}
                  </h2>
                  <div className="space-y-4 leading-relaxed text-cosmic-200/80">
                    <p>
                      Ne pare rău, toate cele 20 de locuri au fost rezervate
                      pentru acest eveniment.
                    </p>
                    <p>
                      Singura opțiune rămasă este să ne contactezi la numărul de
                      telefon pentru a fi adăugat pe lista de așteptare.
                    </p>
                  </div>
                </div>

                <div className="p-8 w-full md:w-1/2">
                  <div className="p-8 text-center">
                    <h1 className="mb-4 text-2xl font-bold text-white font-display">
                      Evenimentul este plin
                    </h1>
                    <p className="mb-8 text-cosmic-300">
                      Toate cele 20 de locuri au fost rezervate.
                    </p>
                    <button
                      onClick={() => navigate("/evenimente")}
                      className="inline-flex gap-2 items-center px-6 py-3 font-medium text-white bg-gradient-to-r rounded-full transition-all duration-300 cursor-pointer group from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400"
                    >
                      Înapoi la evenimente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={true} />

      <main className="container px-6 pt-24 pb-16 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display from-cosmic-300 to-gold-400">
            Rezervare Eveniment
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-cosmic-300">
            {event?.title || "Eveniment Constelații"} -{" "}
            {event?.date.toLocaleDateString("ro-RO", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden glass-card">
            <div className="flex flex-col md:flex-row">
              <div className="hidden flex-col justify-center p-8 bg-gradient-to-br to-transparent md:flex md:w-1/2 from-cosmic-900/30">
                <h2 className="mb-6 text-3xl font-bold text-white font-display">
                  {event?.title || "Constelații"}
                </h2>
                <div className="mb-8 space-y-4 leading-relaxed text-cosmic-200/80">
                  <p>
                    O seară magică de explorare a energiilor cosmice. Vom
                    analiza configurațiile astrale curente și impactul lor
                    asupra evoluției noastre spirituale.
                  </p>
                  <p>Ce include workshop-ul:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Analiza tranzitelor planetare principale</li>
                    <li>Interpretarea energiei lunii</li>
                    <li>Meditații ghidate de aliniere cosmică</li>
                    <li>Exerciții practice de integrare a energiilor</li>
                    <li>Materiale suport și ghiduri personalizate</li>
                  </ul>
                  <p>
                    Completează formularul pentru a rezerva locul tău la acest
                    eveniment exclusiv.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { num: 1, label: "Rezervare bilete" },
                    { num: 2, label: "Date participanți" },
                    { num: 3, label: "Confirmare" },
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
                        className={`text-sm ${
                          step.num === currentStep
                            ? "text-white"
                            : "text-cosmic-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 w-full md:w-1/2">
                <div className="mb-8 md:hidden">
                  <div className="flex justify-between items-center mb-4">
                    {[
                      { num: 1, label: "Rezervare bilete" },
                      { num: 2, label: "Date participanți" },
                      { num: 3, label: "Confirmare" },
                    ].map((step) => (
                      <div
                        key={step.num}
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
                    ))}
                  </div>
                  <div className="h-1 rounded-full bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r rounded-full transition-all duration-500 from-cosmic-500 to-cosmic-400"
                      style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
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

export default ConstellationBookingPage;
