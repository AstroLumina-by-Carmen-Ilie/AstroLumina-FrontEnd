import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendSoareleStralucireaEmail } from "@/utils/email";

interface EmailStepProps {
  sunSign: string;
  onBack: () => void;
}

const EmailStep: React.FC<EmailStepProps> = ({ sunSign, onBack }) => {
  const navigate = useNavigate();
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!customerEmail) {
      setError("Te rugăm să introduci un email valid.");
      return;
    }

    setIsSendingEmail(true);
    setError("");

    try {
      const result = await sendSoareleStralucireaEmail(customerEmail, sunSign);
      if (result.success) {
        setEmailSent(true);
      } else {
        setError("A apărut o eroare. Te rugăm să încerci din nou.");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setError("A apărut o eroare. Te rugăm să încerci din nou.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (emailSent) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex justify-center items-center mb-6 w-20 h-20 rounded-full bg-emerald-500/20">
          <span className="text-4xl text-emerald-400">✓</span>
        </div>
        <h2 className="mb-4 text-2xl font-bold text-white">
          Produsul ajunge la tine în câteva minute!
        </h2>
        <p className="mb-8 text-cosmic-300">
          Verifică-ți inbox-ul (și spam-ul) - acolo vei găsi informațiile.
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
      <div className="p-6 bg-gradient-to-r rounded-xl border from-cosmic-900/30 to-gold-900/20 border-white/10">
        <p className="mb-2 text-center text-cosmic-300">Zodia Soarelui tău</p>
        <h3 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cosmic-300 to-gold-400">
          {sunSign}
        </h3>
      </div>

      <div>
        <label className="block mb-2 text-sm text-cosmic-300" htmlFor="email">
          Email pentru trimitere informații
        </label>
        <input
          type="email"
          id="email"
          className="p-3 w-full rounded-xl border bg-white/5 border-white/15 text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500"
          placeholder="email@exemplu.ro"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
      </div>

      {error && (
        <div className="p-3 text-sm text-red-400 rounded-xl border bg-red-500/10 border-red-500/20">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleSend}
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
          "Trimite-mi informațiile"
        )}
      </button>
    </div>
  );
};

export default EmailStep;
