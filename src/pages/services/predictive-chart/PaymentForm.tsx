import React, { useCallback, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const STRIPE_URL = import.meta.env.VITE_PAYMENT_API_URL;
const stripePromise = loadStripe(STRIPE_PK);

interface PaymentFormProps {
  onNext: (paymentStatus: boolean) => void;
  onBack: () => void;
}

const CheckoutForm: React.FC<{
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsComplete }) => {
  const handleComplete = () => setIsComplete(true);

  const fetchClientSecret = useCallback(() => {
    return fetch(`${STRIPE_URL}/create-checkout-session/natal-chart`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

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

const PaymentForm: React.FC<PaymentFormProps> = ({ onNext, onBack }) => {
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onNext(isComplete);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
          <CheckoutForm setIsComplete={setIsComplete} />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-white/5 text-cosmic-200 py-3 px-6 rounded-xl hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
          >
            Înapoi
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
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full text-center px-3 py-2 bg-cosmic-900/90 text-cosmic-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Plata este obligatorie pentru a putea continua
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
