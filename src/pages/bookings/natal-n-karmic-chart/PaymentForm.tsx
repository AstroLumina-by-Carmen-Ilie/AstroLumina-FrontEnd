import React, { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { AvailableSlot, PaymentFormProps } from "@/types";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL;
const stripePromise = loadStripe(STRIPE_PK);

/** Stripe client_secret is always `${resourceId}_secret_${random}` (Checkout Session `cs_…` or PaymentIntent `pi_…`). */
function stripeIdFromClientSecret(clientSecret: string | undefined): string {
  if (!clientSecret || typeof clientSecret !== "string") return "";
  const i = clientSecret.indexOf("_secret_");
  if (i === -1) return "";
  return clientSecret.slice(0, i);
}

const CheckoutForm: React.FC<{
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSlot: AvailableSlot;
  setPaymentIntentId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setIsComplete, selectedSlot, setPaymentIntentId }) => {
  const handleComplete = () => setIsComplete(true);

  const fetchClientSecret = useCallback(() => {
    // Send slot information to payment API
    return fetch(
      `${PAYMENT_API_URL}/create-checkout-session/astrograma-natala-si-karmica`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionType: "astrograma-natala-si-karmica",
          selectedSlot: selectedSlot.time,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        const fromApi =
          (typeof data.paymentIntentId === "string" && data.paymentIntentId) ||
          (typeof data.payment_intent === "string" && data.payment_intent) ||
          "";
        const fromSecret = stripeIdFromClientSecret(data.clientSecret);
        setPaymentIntentId(fromApi || fromSecret);
        return data.clientSecret;
      });
  }, [selectedSlot, setPaymentIntentId]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          ...options,
          onComplete: handleComplete,
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = ({
  selectedSlot,
  existingPaymentIntentId,
  onNext,
  onBack,
}) => {
  const [isComplete, setIsComplete] = useState(!!existingPaymentIntentId);
  const [paymentIntentId, setPaymentIntentId] = useState<string>(
    existingPaymentIntentId || "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      onNext(paymentIntentId);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 mb-6 rounded-xl border bg-white/5 border-white/10">
        <div className="pb-4 mb-6 border-b border-white/10">
          <p className="text-sm text-cosmic-200">
            <span className="font-semibold">Plată pentru:</span> Astrograma
            Natală și Karmică
          </p>
          <p className="mt-2 text-xs text-cosmic-300">
            {new Date(selectedSlot.time).toLocaleDateString("ro-RO")} ora{" "}
            {new Date(selectedSlot.time).toLocaleTimeString("ro-RO", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {existingPaymentIntentId ? (
          <div className="py-8 text-center">
            <div className="inline-flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-emerald-500/20">
              <span className="text-2xl text-emerald-400">✓</span>
            </div>
            <p className="font-medium text-emerald-300">
              Plata a fost realizată cu succes
            </p>
          </div>
        ) : (
          <CheckoutForm
            setIsComplete={setIsComplete}
            selectedSlot={selectedSlot}
            setPaymentIntentId={setPaymentIntentId}
          />
        )}
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-6 py-3 rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
        >
          Pasul anterior
        </button>
        <button
          type="submit"
          disabled={!isComplete}
          className={`group flex-1 bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white py-3 px-6 rounded-xl transition-all duration-300 ${
            !isComplete
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple"
          }`}
        >
          Pasul următor
          {!isComplete && (
            <div className="absolute -top-10 left-1/2 px-3 py-2 w-max text-xs text-center whitespace-nowrap rounded-lg opacity-0 transition-opacity -translate-x-1/2 pointer-events-none bg-cosmic-900/90 text-cosmic-200 group-hover:opacity-100">
              Plata este obligatorie pentru a continua
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
