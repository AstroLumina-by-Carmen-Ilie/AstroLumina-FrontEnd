import React, { useCallback, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const STRIPE_URL = import.meta.env.VITE_STRIPE_URL;
const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const stripePromise = loadStripe(STRIPE_PK);

interface PaymentFormProps {
  onNext: (paymentStatus: boolean) => void;
  onBack: () => void;
}
const CheckoutForm: React.FC<{ 
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({setIsComplete}) => {
  const handleComplete = () => setIsComplete(true);

  const fetchClientSecret = useCallback(() => {
    return fetch(`${STRIPE_URL}/create-session-karmic-chart`, {
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
          onComplete: handleComplete
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

  const Tooltip = ({ message }: { message: string }) => (
    <div className="absolute -top-8 w-full text-center px-3 py-2 bg-red-100 text-red-700 text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      {message}
    </div>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="bg-amber-50 p-4 rounded-lg mb-6">
          <CheckoutForm setIsComplete={setIsComplete}/>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Înapoi
          </button>
          <div className="flex-1 relative">
            <button
              type="submit"
              disabled={!isComplete}
              className={`group w-full bg-amber-500 text-white py-3 px-6 rounded-lg transition-colors ${
                !isComplete
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:bg-amber-600 cursor-pointer'
              }`}
            >
              Finalizează plata
              {!isComplete && (
                <Tooltip message="Plata este obligatorie pentru a putea continua" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
