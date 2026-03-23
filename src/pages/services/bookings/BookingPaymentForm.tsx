import React, { useCallback, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const STRIPE_URL = import.meta.env.VITE_PAYMENT_API_URL;
const stripePromise = loadStripe(STRIPE_PK);

interface BookingPaymentFormProps {
  onNext: (paymentStatus: boolean) => void;
}

const CheckoutForm: React.FC<{
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsComplete }) => {
  const handleComplete = () => setIsComplete(true);

  const fetchClientSecret = useCallback(() => {
    return fetch(`${STRIPE_URL}/create-checkout-session/booking`, {
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

const BookingPaymentForm: React.FC<BookingPaymentFormProps> = ({ onNext }) => {
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onNext(isComplete);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold text-white mb-3">Plată Consultație</h2>
        <p className="text-cosmic-300/80 text-sm leading-relaxed">
          Pentru a programa o consultație, vă rugăm să efectuați plata. După confirmarea plății, veți putea alege data și ora dorită.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <CheckoutForm setIsComplete={setIsComplete} />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isComplete}
            className={`px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
              isComplete
                ? 'bg-gradient-to-r from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple cursor-pointer'
                : 'bg-white/10 cursor-not-allowed opacity-50'
            }`}
          >
            Continuă
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingPaymentForm;
