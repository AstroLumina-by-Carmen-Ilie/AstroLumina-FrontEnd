import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import Navbar from "@/components/navbar/Navbar";
import { sendGhidulSaturnEmail } from "@/utils/email";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL;

const stripePromise = loadStripe(STRIPE_PK);

const GhidulLuiSaturnInBerbecPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  const handleBack = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const handlePaymentComplete = () => {
    setPaymentComplete(true);
    setCurrentStep(2);
  };

  const handleSendGhid = async () => {
    if (!customerEmail) {
      alert("Te rugăm să introduci un email valid.");
      return;
    }

    setIsSendingEmail(true);
    try {
      const result = await sendGhidulSaturnEmail(customerEmail);
      if (result.success) {
        setEmailSent(true);
      } else {
        alert(
          "A apărut o eroare la trimiterea email-ului. Te rugăm să încerci din nou.",
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("A apărut o eroare. Te rugăm să încerci din nou.");
    } finally {
      setIsSendingEmail(false);
    }
  };

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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div id="checkout">
            <div className="p-4 mb-6 rounded-xl border bg-white/5 border-white/10">
              <div className="pb-4 mb-6 border-b border-white/10">
                <p className="text-sm text-cosmic-200">
                  <span className="font-semibold">Produs:</span> Ghidul lui
                  Saturn în Berbec
                </p>
                <p className="mt-2 text-xs text-cosmic-300">Preț: €15.00</p>
              </div>
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{
                  fetchClientSecret,
                  onComplete: handlePaymentComplete,
                }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </div>
        );

      case 2:
        if (emailSent) {
          return (
            <div className="py-12 text-center">
              <div className="inline-flex justify-center items-center mb-6 w-20 h-20 rounded-full bg-emerald-500/20">
                <span className="text-4xl text-emerald-400">✓</span>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-white">
                Ghidul ajunge la tine în câteva minute!
              </h2>
              <p className="mb-8 text-cosmic-300">
                Verifică-ți inbox-ul (și spam-ul) - acolo vei găsi ghidul.
              </p>
              <button
                onClick={() => navigate("/produse")}
                className="px-6 py-3 rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
              >
                Înapoi la produse
              </button>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <div className="p-6 rounded-xl border bg-emerald-500/10 border-emerald-500/20">
              <div className="flex gap-3 items-center mb-4">
                <div className="flex justify-center items-center w-10 h-10 rounded-full bg-emerald-500/20">
                  <span className="text-xl text-emerald-400">✓</span>
                </div>
                <div>
                  <p className="font-medium text-emerald-300">
                    Plata a fost realizată cu succes
                  </p>
                  <p className="text-sm text-cosmic-400">
                    Acum descarcă-ți ghidul
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label
                className="block mb-2 text-sm text-cosmic-300"
                htmlFor="email"
              >
                Email pentru trimitere ghid{" "}
              </label>
              <input
                type="email"
                id="email"
                className="p-3 w-full rounded-xl border transition-colors bg-white/5 border-white/15 text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500"
                placeholder="email@exemplu.ro"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              onClick={handleSendGhid}
              disabled={isSendingEmail}
              className="flex justify-center items-center px-6 py-3 w-full font-semibold text-white bg-gradient-to-r rounded-xl transition-all duration-300 cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSendingEmail ? (
                <>
                  <svg
                    className="mr-2 w-4 h-4 animate-spin"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="22"
                      strokeDashoffset="0"
                    />
                  </svg>
                  Se trimite...
                </>
              ) : (
                "Trimite-mi ghidul"
              )}
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 w-full rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
            >
              Pasul anterior
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={true} />

      <main className="container px-6 pt-24 pb-16 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display from-cosmic-300 to-gold-400">
            Ghidul lui Saturn în Berbec
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-cosmic-300">
            Navighează cu înțelepciune energiile lui Saturn în semnul Berbecului
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden glass-card">
            <div className="flex flex-col md:flex-row">
              <div
                aria-label="Panoul de informare"
                className="hidden flex-col justify-center p-8 bg-gradient-to-br to-transparent md:flex md:w-1/2 from-cosmic-900/30"
              >
                <h2 className="mb-6 text-3xl font-bold text-white font-display">
                  Ghidul lui Saturn în Berbec
                </h2>
                <div className="mb-8 space-y-4 leading-relaxed text-cosmic-200/80">
                  <p>
                    Saturn în Berbec este o poziție astrologică unică care aduce
                    încercări și lecții importante.
                  </p>
                  <p>Acest ghid te ajută să înțelegi:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Ce înseamnă Saturn în Berbec pentru tine</li>
                    <li>Cum să folosești această energie constructiv</li>
                    <li>Provocările specifice acestei poziții</li>
                    <li>Strategii pentru depășirea blocajelor</li>
                  </ul>
                  <p>
                    Include sfaturi practice și insight-uri profunde pentru a
                    transforma aceste energii în aliati.
                  </p>
                </div>

                {/* Step indicators */}
                <div aria-label="Indicatorii pașilor" className="space-y-3">
                  {[
                    { num: 1, label: "Plată" },
                    { num: 2, label: "Descarcă ghidul" },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-3 items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          step.num === currentStep
                            ? "step-active text-white"
                            : step.num < currentStep
                              ? "step-completed text-white"
                              : "step-pending text-cosmic-400"
                        }`}
                      >
                        {step.num < currentStep ? "✓" : step.num}
                      </div>
                      <span
                        className={`text-sm ${step.num === currentStep ? "text-white" : "text-cosmic-400"}`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                aria-label="Formularul principal"
                className="p-8 w-full md:w-1/2"
              >
                <div className="mb-8 md:hidden">
                  <div className="flex justify-between items-center mb-4">
                    {[1, 2].map((step) => (
                      <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          step === currentStep
                            ? "step-active text-white"
                            : step < currentStep
                              ? "step-completed text-white"
                              : "step-pending text-cosmic-400"
                        }`}
                      >
                        {step < currentStep ? "✓" : step}
                      </div>
                    ))}
                  </div>
                  <div className="h-1 rounded-full bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r rounded-full transition-all duration-500 from-cosmic-500 to-cosmic-400"
                      style={{ width: `${((currentStep - 1) / 1) * 100}%` }}
                    />
                  </div>
                </div>

                {renderStep()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GhidulLuiSaturnInBerbecPage;
