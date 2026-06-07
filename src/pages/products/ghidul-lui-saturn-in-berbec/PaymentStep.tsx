import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { STRIPE_PK, PAYMENT_API_URL } from "@/config";

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
      <div className="p-4 mb-6 border rounded-xl bg-white/5 border-white/10">
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
