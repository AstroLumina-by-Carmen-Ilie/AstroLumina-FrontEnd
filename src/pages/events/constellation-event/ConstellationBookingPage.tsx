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

type Step = "payment" | "contact" | "confirmation";

const ConstellationBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isEventFull } = useEventSeats();

  const eventId = id || "";
  const event = getEventById(eventId);

  const [step, setStep] = useState<Step>("payment");
  const [ticketCount, setTicketCount] = useState(1);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [ticketHolders, setTicketHolders] = useState<TicketHolder[]>([]);

  const eventFull = isEventFull(eventId);

  if (step === "payment") {
    if (eventFull) {
      return (
        <div className="min-h-screen text-white bg-midnight-950">
          <Navbar isScrolled={false} />
          <div className="container px-6 pt-24 pb-16 mx-auto max-w-2xl">
            <div className="p-8 text-center glass-card">
              <h1 className="mb-4 text-2xl font-bold text-white font-display">
                Evenimentul este plin
              </h1>
              <p className="mb-6 text-cosmic-300">
                Ne pare rău, toate cele 20 de locuri au fost rezervate pentru acest eveniment.
              </p>
              <p className="mb-8 text-cosmic-200/70">
                Singura opțiune rămasă este să ne contactezi la numărul de telefon pentru a fi adăugat pe lista de așteptare.
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
      );
    }

    return (
      <div className="min-h-screen text-white bg-midnight-950">
        <Navbar isScrolled={false} />
        <TicketPaymentForm
          event={event}
          ticketCount={ticketCount}
          onTicketCountChange={setTicketCount}
          onPaymentComplete={(paymentId) => {
            setPaymentIntentId(paymentId);
            setStep("contact");
          }}
          onBack={() => navigate("/evenimente")}
        />
      </div>
    );
  }

  if (step === "contact") {
    return (
      <div className="min-h-screen text-white bg-midnight-950">
        <Navbar isScrolled={false} />
        <AttendeesForm
          ticketCount={ticketCount}
          event={event}
          onComplete={(holders) => {
            setTicketHolders(holders);
            setStep("confirmation");
          }}
          onBack={() => setStep("payment")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={false} />
      <BookingConfirmation
        event={event}
        ticketCount={ticketCount}
        ticketHolders={ticketHolders}
        paymentIntentId={paymentIntentId}
        onBack={() => navigate("/evenimente")}
        onComplete={() => navigate("/")}
      />
    </div>
  );
};

export default ConstellationBookingPage;