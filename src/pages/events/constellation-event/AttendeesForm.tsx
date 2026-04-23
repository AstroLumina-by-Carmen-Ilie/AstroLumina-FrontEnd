import { useState } from "react";
import { Mail, User, Phone } from "lucide-react";
import { ConstellationEvent } from "@/data/events";

interface TicketHolder {
  fullName: string;
  email?: string;
  phone?: string;
}

interface AttendeesFormProps {
  ticketCount: number;
  event?: ConstellationEvent;
  availableSeats?: number;
  onTicketCountChange: (count: number) => void;
  onComplete: (holders: TicketHolder[]) => void;
  onBack: () => void;
}

const validateEmail = (email: string): boolean => {
  if (!email.trim()) return true; // Optional, so empty is valid
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone: string): boolean => {
  if (!phone.trim()) return true; // Optional, so empty is valid
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10;
};

interface HolderData {
  fullName: string;
  email: string;
  phone: string;
}

const AttendeesForm: React.FC<AttendeesFormProps> = ({
  ticketCount,
  event,
  availableSeats = 20,
  onTicketCountChange,
  onComplete,
  onBack,
}) => {
  const [holders, setHolders] = useState<HolderData[]>(
    Array(ticketCount).fill(null).map(() => ({ fullName: "", email: "", phone: "" }))
  );
  const [nameErrors, setNameErrors] = useState<Record<number, string>>({});

  const handleTicketCountChange = (newCount: number) => {
    onTicketCountChange(newCount);
    setHolders(
      Array(newCount).fill(null).map((_, i) =>
        holders[i] || { fullName: "", email: "", phone: "" }
      )
    );
    setNameErrors({});
  };

  const updateHolder = (index: number, field: keyof HolderData, value: string) => {
    setHolders((prev) => {
      const newHolders = [...prev];
      newHolders[index] = { ...newHolders[index], [field]: value };
      return newHolders;
    });

    if (field === "fullName" && nameErrors[index]) {
      setNameErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<number, string> = {};
    let allValid = true;

    holders.forEach((holder, index) => {
      if (!holder.fullName.trim()) {
        newErrors[index] = "Numele complet este obligatoriu";
        allValid = false;
      }
    });

    if (!allValid) {
      setNameErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const result: TicketHolder[] = holders.map((holder) => ({
        fullName: holder.fullName.trim(),
        email: holder.email.trim() || undefined,
        phone: holder.phone.trim() || undefined,
      }));
      onComplete(result);
    }
  };

  const totalPrice = ticketCount * (event?.price || 120);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-6 mb-6 rounded-xl border bg-white/5 border-white/10">
          <label className="block mb-3 text-sm font-medium text-cosmic-200">
            Număr de persoane
          </label>
          <div className="flex gap-3 items-center">
            <button
              type="button"
              onClick={() => handleTicketCountChange(Math.max(1, ticketCount - 1))}
              className="flex justify-center items-center w-10 h-10 rounded-lg transition-colors cursor-pointer bg-white/10 hover:bg-white/20"
            >
              -
            </button>
            <span className="flex-1 text-xl font-semibold text-center">
              {ticketCount}
            </span>
            <button
              type="button"
              onClick={() => handleTicketCountChange(Math.min(availableSeats, ticketCount + 1))}
              disabled={ticketCount >= availableSeats}
              className="flex justify-center items-center w-10 h-10 rounded-lg transition-colors cursor-pointer bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
          <p className="mt-2 text-sm text-cosmic-400 text-center">
            {availableSeats} locuri disponibile
          </p>
        </div>

        <div className="space-y-6">
          {holders.map((holder, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border bg-white/5 border-white/10"
            >
              <h3 className="mb-4 text-lg font-semibold text-white">
                Persoana {index + 1}
              </h3>

              <div className="space-y-4">
                {/* Full Name - REQUIRED */}
                <div>
                  <label className="block mb-2 text-sm text-cosmic-300">
                    Nume complet <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-cosmic-400" />
                    <input
                      type="text"
                      value={holder.fullName}
                      onChange={(e) => updateHolder(index, "fullName", e.target.value)}
                      placeholder="Nume Prenume"
                      className="py-3 pr-4 pl-10 w-full text-white rounded-lg border bg-white/10 border-white/10 placeholder-cosmic-400 focus:outline-none focus:border-cosmic-500"
                    />
                  </div>
                  {nameErrors[index] && (
                    <p className="mt-1 text-sm text-red-400">{nameErrors[index]}</p>
                  )}
                </div>

                {/* Email - OPTIONAL */}
                <div>
                  <label className="block mb-2 text-sm text-cosmic-300">
                    Email <span className="text-cosmic-500">(opțional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-cosmic-400" />
                    <input
                      type="email"
                      value={holder.email}
                      onChange={(e) => updateHolder(index, "email", e.target.value)}
                      placeholder="email@example.com"
                      className="py-3 pr-4 pl-10 w-full text-white rounded-lg border bg-white/10 border-white/10 placeholder-cosmic-400 focus:outline-none focus:border-cosmic-500"
                    />
                  </div>
                </div>

                {/* Phone - OPTIONAL */}
                <div>
                  <label className="block mb-2 text-sm text-cosmic-300">
                    Telefon <span className="text-cosmic-500">(opțional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-cosmic-400" />
                    <input
                      type="tel"
                      value={holder.phone}
                      onChange={(e) => updateHolder(index, "phone", e.target.value)}
                      placeholder="+40 123 456 789"
                      className="py-3 pr-4 pl-10 w-full text-white rounded-lg border bg-white/10 border-white/10 placeholder-cosmic-400 focus:outline-none focus:border-cosmic-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 mt-6 rounded-xl border bg-white/5 border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-cosmic-200">Total de plată:</span>
            <span className="text-xl font-bold text-gold-400">{totalPrice} €</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-4 rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
          >
            Înapoi
          </button>
          <button
            type="submit"
            className="flex-1 py-4 font-semibold text-white bg-gradient-to-r rounded-xl transition-all cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400"
          >
            Continuă la plată
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendeesForm;