import React, { useCallback, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { AvailableSlot } from "./AvailabilitySelector";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL;
const stripePromise = loadStripe(STRIPE_PK);

interface PaymentFormRelationalProps {
  selectedSlot: AvailableSlot;
  onNext: (paymentIntentId: string) => void;
  onBack: () => void;
}

/** Stripe client_secret is always `${resourceId}_secret_${random}` (Checkout Session `cs_…` or PaymentIntent `pi_…`). */
function stripeIdFromClientSecret(clientSecret: string | undefined): string {
  if (!clientSecret || typeof clientSecret !== 'string') return '';
  const i = clientSecret.indexOf('_secret_');
  if (i === -1) return '';
  return clientSecret.slice(0, i);
}

const CheckoutFormRelational: React.FC<{
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSlot: AvailableSlot;
  setPaymentIntentId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setIsComplete, selectedSlot, setPaymentIntentId }) => {
  const handleComplete = () => setIsComplete(true);

  const fetchClientSecret = useCallback(() => {
    // Send slot information to payment API
    return fetch(`${PAYMENT_API_URL}/create-checkout-session/astrograma-relationala`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionType: 'astrograma-relationala',
        selectedSlot: selectedSlot.time,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const fromApi =
          (typeof data.paymentIntentId === 'string' && data.paymentIntentId) ||
          (typeof data.payment_intent === 'string' && data.payment_intent) ||
          '';
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

const PaymentFormRelational: React.FC<PaymentFormRelationalProps> = ({ selectedSlot, onNext, onBack }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // După Embedded Checkout, `onComplete` setează isComplete; API-ul poate să nu trimită paymentIntentId,
    // dar avem deja id-ul din clientSecret (cs_… sau pi_…). Continuăm mereu după plată reușită.
    if (isComplete) {
      onNext(paymentIntentId);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
        <div className="mb-6 pb-4 border-b border-white/10">
          <p className="text-cosmic-200 text-sm">
            <span className="font-semibold">Plată pentru:</span> Astrograma Relatională
          </p>
          <p className="text-cosmic-300 text-xs mt-2">
            {new Date(selectedSlot.time).toLocaleDateString('ro-RO')} ora{' '}
            {new Date(selectedSlot.time).toLocaleTimeString('ro-RO', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <CheckoutFormRelational 
          setIsComplete={setIsComplete} 
          selectedSlot={selectedSlot}
          setPaymentIntentId={setPaymentIntentId}
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-white/5 text-cosmic-200 py-3 px-6 rounded-xl hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
        >
          Pasul anterior
        </button>
        <div className="flex-1 relative">
          <button
            type="submit"
            disabled={!isComplete}
            className={`group w-full bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white py-3 px-6 rounded-xl transition-all duration-300 ${
              !isComplete
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple cursor-pointer'
            }`}
          >
            Finalizează plata
            {!isComplete && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-max text-center px-3 py-2 bg-cosmic-900/90 text-cosmic-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Plata este obligatorie pentru a continua
              </div>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PaymentFormRelational;
