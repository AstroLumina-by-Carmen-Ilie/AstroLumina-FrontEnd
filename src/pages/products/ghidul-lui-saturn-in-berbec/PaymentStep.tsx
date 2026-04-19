import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL;

const stripePromise = loadStripe(STRIPE_PK);

interface PaymentStepProps {
  onComplete: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ onComplete }) => {
  const fetchClientSecret = useCallback(() => {
    return fetch(
      `${PAYMENT_API_URL}/create-checkout-session/ghid-saturn-in-berbec`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionType: "ghid-saturn-in-berbec" }),
      },
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  return (
    <div id="checkout">
      <div className="p-4 mb-6 rounded-xl border bg-white/5 border-white/10">
        <div className="pb-4 mb-6 border-b border-white/10">
          <p className="text-sm text-cosmic-200">
            <span className="font-semibold">Produs:</span> Ghidul lui Saturn în
            Berbec
          </p>
          <p className="mt-2 text-xs text-cosmic-300">Preț: €15.00</p>
        </div>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{
            fetchClientSecret,
            onComplete,
          }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

export default PaymentStep;
