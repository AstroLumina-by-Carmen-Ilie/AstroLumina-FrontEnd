import React, { useState } from "react";
import { Mail, User, Phone } from "lucide-react";
import { ConstellationEvent } from "@/data/events";

interface TicketHolder {
  fullName: string;
}

interface AttendeesFormProps {
  ticketCount: number;
  event?: ConstellationEvent;
  onComplete: (holders: TicketHolder[]) => void;
  onBack: () => void;
}

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10;
};

const AttendeesForm: React.FC<AttendeesFormProps> = ({
  ticketCount,
  event,
  onComplete,
  onBack,
}) => {
  const [fullNames, setFullNames] = useState<string[]>(
    Array(ticketCount).fill(""),
  );
  const [sharedEmail, setSharedEmail] = useState("");
  const [sharedPhone, setSharedPhone] = useState("");
  const [nameErrors, setNameErrors] = useState<Record<number, string>>({});
  const [contactError, setContactError] = useState<string | null>(null);

  const updateFullName = (index: number, value: string) => {
    setFullNames((prev) => {
      const newNames = [...prev];
      newNames[index] = value;
      return newNames;
    });

    if (nameErrors[index]) {
      setNameErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<number, string> = {};
    let allNamesValid = true;

    fullNames.forEach((name, index) => {
      if (!name.trim()) {
        newErrors[index] = "Numele complet este obligatoriu";
        allNamesValid = false;
      }
    });

    if (!allNamesValid) {
      setNameErrors(newErrors);
      return false;
    }

    const emailValid = sharedEmail.trim() === "" || validateEmail(sharedEmail);
    const phoneValid = sharedPhone.trim() === "" || validatePhone(sharedPhone);

    if (!emailValid && !phoneValid) {
      setContactError("Trebuie să introduci un email sau telefon valid");
      return false;
    }

    setContactError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const holders = fullNames.map((fullName) => ({ fullName }));
      onComplete(holders);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-4 mb-6 rounded-xl border bg-white/5 border-white/10">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Persoane care vor participa
          </h3>
          <p className="mb-4 text-sm text-cosmic-400">
            Completează numele complet pentru fiecare bilet
          </p>

          <div className="space-y-4">
            {fullNames.map((name, index) => (
              <div key={index}>
                <label className="block mb-2 text-sm text-cosmic-300">
                  Bilet {index + 1} - Nume complet *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-cosmic-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => updateFullName(index, e.target.value)}
                    placeholder="Nume Prenume"
                    className="py-3 pr-4 pl-10 w-full text-white rounded-lg border bg-white/10 border-white/10 placeholder-cosmic-400 focus:outline-none focus:border-cosmic-500"
                  />
                </div>
                {nameErrors[index] && (
                  <p className="mt-1 text-sm text-red-400">
                    {nameErrors[index]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 mb-6 rounded-xl border bg-white/5 border-white/10">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Date de contact principale
          </h3>
          <p className="mb-4 text-sm text-cosmic-400">
            Email sau telefon este necesar - le vom folosi pentru a trimite
            detaliile evenimentului
          </p>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm text-cosmic-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-cosmic-400" />
                <input
                  type="email"
                  value={sharedEmail}
                  onChange={(e) => setSharedEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="py-3 pr-4 pl-10 w-full text-white rounded-lg border bg-white/10 border-white/10 placeholder-cosmic-400 focus:outline-none focus:border-cosmic-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm text-cosmic-300">
                Telefon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-cosmic-400" />
                <input
                  type="tel"
                  value={sharedPhone}
                  onChange={(e) => setSharedPhone(e.target.value)}
                  placeholder="+40 123 456 789"
                  className="py-3 pr-4 pl-10 w-full text-white rounded-lg border bg-white/10 border-white/10 placeholder-cosmic-400 focus:outline-none focus:border-cosmic-500"
                />
              </div>
            </div>
          </div>

          {contactError && (
            <p className="mt-3 text-sm text-red-400">{contactError}</p>
          )}
        </div>

        <div className="flex gap-4">
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
            Confirmă rezervarea
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendeesForm;
