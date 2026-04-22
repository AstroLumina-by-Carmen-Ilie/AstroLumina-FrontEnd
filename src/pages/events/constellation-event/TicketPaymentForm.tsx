import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { ConstellationEvent } from "@/data/events";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL;
const stripePromise = loadStripe(STRIPE_PK);

interface TicketPaymentFormProps {
  event: ConstellationEvent | undefined;
  ticketCount: number;
  onPaymentComplete: (paymentIntentId: string) => void;
  onBack: () => void;
}

const TicketPaymentForm: React.FC<TicketPaymentFormProps> = ({
  event,
  ticketCount,
  onPaymentComplete,
  onBack,
}) => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState("");

  const eventId = event?.id || "";
  const totalPrice = ticketCount * (event?.price || 120);

  const fetchClientSecret = useCallback(() => {
    return fetch(
      `${PAYMENT_API_URL}/create-checkout-session/eveniment-constelatii`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionType: "eveniment-constelatii",
          ticketCount,
          eventId,
        }),
      },
    )
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
    <div>
      <div className="p-4 mb-6 rounded-xl border bg-white/5 border-white/10">
        <div className="pb-4 mb-4 border-b border-white/10">
          <p className="text-sm text-cosmic-200">
            <span className="font-semibold">Plată pentru:</span> {ticketCount} bilet(e) x {event?.price || 120} €
          </p>
          <p className="mt-2 text-lg font-bold text-gold-400">
            Total: {totalPrice} €
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

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-4 rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
        >
          Înapoi
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!paymentComplete}
          className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
            paymentComplete
              ? "text-white bg-gradient-to-r cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400"
              : "opacity-50 cursor-not-allowed bg-white/10 text-cosmic-300"
          }`}
        >
          Confirmă rezervarea
        </button>
      </div>
    </div>
  );
};

export default TicketPaymentForm;