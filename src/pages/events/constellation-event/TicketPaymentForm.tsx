import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { ConstellationEvent } from "@/data/events";
import { useEventSeats } from "@/hooks/useEventSeats";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL;
const stripePromise = loadStripe(STRIPE_PK);

interface TicketPaymentFormProps {
  event: ConstellationEvent | undefined;
  ticketCount: number;
  onTicketCountChange: (count: number) => void;
  onPaymentComplete: (paymentIntentId: string) => void;
  onBack: () => void;
}

const TicketPaymentForm: React.FC<TicketPaymentFormProps> = ({
  event,
  ticketCount,
  onTicketCountChange,
  onPaymentComplete,
  onBack,
}) => {
  const { getAvailableSeats } = useEventSeats();

  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState("");

  const eventId = event?.id || "";
  const availableSeats = getAvailableSeats(eventId);
  const totalPrice = ticketCount * (event?.price || 120);

  const fetchClientSecret = useCallback(() => {
    return fetch(`${PAYMENT_API_URL}/create-checkout-session/eveniment-constelatii`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionType: "eveniment-constelatii",
        ticketCount,
        eventId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const paymentId = data.paymentIntentId || data.payment_intent || "";
        setPaymentIntentId(paymentId);
        return data.clientSecret;
      });
  }, [ticketCount, eventId]);

  const handleContinue = () => {
    if (paymentComplete && paymentIntentId) {
      onPaymentComplete(paymentIntentId);
    }
  };

  return (
    <div className="container px-6 pt-24 pb-16 mx-auto max-w-2xl">
      <button
        onClick={onBack}
        className="mb-6 text-sm transition-colors text-cosmic-400 hover:text-white"
      >
        ← Înapoi la evenimente
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-display">
          Rezervă locul
        </h1>
        <p className="mt-2 text-cosmic-300">
          {event?.title || "Eveniment Constelații"} -{" "}
          {event?.date.toLocaleDateString("ro-RO", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="p-6 mb-6 rounded-xl border bg-white/5 border-white/10">
        <label className="block mb-3 text-sm font-medium text-cosmic-200">
          Număr de bilete
        </label>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => onTicketCountChange(Math.max(1, ticketCount - 1))}
            className="flex justify-center items-center w-10 h-10 rounded-lg transition-colors cursor-pointer bg-white/10 hover:bg-white/20"
          >
            -
          </button>
          <span className="flex-1 text-xl font-semibold text-center">
            {ticketCount}
          </span>
          <button
            onClick={() =>
              onTicketCountChange(Math.min(availableSeats, ticketCount + 1))
            }
            disabled={ticketCount >= availableSeats}
            className="flex justify-center items-center w-10 h-10 rounded-lg transition-colors cursor-pointer bg-white/10 hover:bg-white/20 disabled:opacity-50"
          >
            +
          </button>
        </div>
        <p className="mt-3 text-sm text-cosmic-400">
          {availableSeats} locuri disponibile
        </p>
      </div>

      <div className="p-4 mb-6 rounded-xl border bg-white/5 border-white/10">
        <div className="pb-4 mb-4 border-b border-white/10">
          <p className="text-sm text-cosmic-200">
            <span className="font-semibold">Plată pentru:</span> {ticketCount} bilet(e) x{" "}
            {event?.price || 120} RON
          </p>
          <p className="mt-2 text-lg font-bold text-gold-400">
            Total: {totalPrice} RON
          </p>
        </div>

        {paymentComplete ? (
          <div className="py-8 text-center">
            <div className="inline-flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-emerald-500/20">
              <span className="text-2xl text-emerald-400">✓</span>
            </div>
            <p className="font-medium text-emerald-300">
              Plata a fost realizată cu succes
            </p>
          </div>
        ) : (
          <div id="checkout">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{
                fetchClientSecret,
                onComplete: () => setPaymentComplete(true),
              }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </div>

      <button
        onClick={handleContinue}
        disabled={!paymentComplete}
        className={`w-full py-4 rounded-xl font-semibold transition-all ${
          paymentComplete
            ? "text-white bg-gradient-to-r cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400"
            : "opacity-50 cursor-not-allowed bg-white/10 text-cosmic-300"
        }`}
      >
        Continuă cu datele de contact
      </button>
    </div>
  );
};

export default TicketPaymentForm;