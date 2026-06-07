import { useState, useCallback, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { ConstellationEvent } from "@/data/events";
import { STRIPE_PK, PAYMENT_API_URL } from "@/config";

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
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (hasNavigatedRef.current) return;
    if (paymentComplete) {
      hasNavigatedRef.current = true;
      onPaymentComplete(paymentIntentId);
    }
  }, [paymentComplete, paymentIntentId, onPaymentComplete]);

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

  return (
    <div>
      <div className="p-4 mb-6 border rounded-xl bg-white/5 border-white/10">
        <div className="pb-4 mb-4 border-b border-white/10">
          <p className="text-sm text-cosmic-200">
            <span className="font-semibold">Plată pentru:</span> {ticketCount}{" "}
            bilet(e) x {event?.price || 120} €
          </p>
          <p className="mt-2 text-lg font-bold text-gold-400">
            Total: {totalPrice} €
          </p>
        </div>

        {paymentComplete ? (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-emerald-500/20">
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
    </div>
  );
};

export default TicketPaymentForm;
