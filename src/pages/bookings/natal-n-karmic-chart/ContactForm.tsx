import React, { useState } from 'react';
import { ContactFormProps } from '@/types';
import { COUNTRY_CODES } from '@/data/romanian-locations';

const ContactForm: React.FC<ContactFormProps> = ({ initialValues, onNext, onBack }) => {
  const getInitialCountryCode = () => {
    if (!initialValues?.phone) return '+40';
    for (const cc of COUNTRY_CODES) {
      if (initialValues.phone.startsWith(cc.value)) return cc.value;
    }
    return '+40';
  };

  const getInitialPhone = () => {
    if (!initialValues?.phone) return '';
    for (const cc of COUNTRY_CODES) {
      if (initialValues.phone.startsWith(cc.value)) {
        return initialValues.phone.slice(cc.value.length);
      }
    }
    return initialValues.phone;
  };

  const [countryCode, setCountryCode] = useState(getInitialCountryCode);
  const [phone, setPhone] = useState(getInitialPhone);
  const [email, setEmail] = useState(initialValues?.email || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!phone.trim()) newErrors.phone = 'Numărul de telefon este obligatoriu';
    if (!email) newErrors.email = 'Emailul este obligatoriu';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Te rog introdu o adresă de email validă';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Combine country code with phone number for international format
    const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`;
    onNext({ phone: fullPhone, email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-2 text-sm text-cosmic-300" htmlFor="phone">Număr de telefon</label>
        <div className="flex gap-3">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="p-3 w-32 rounded-xl border transition-colors cursor-pointer bg-white/5 border-white/15 text-cosmic-100 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500"
          >
            {COUNTRY_CODES.map((cc) => (
              <option key={cc.value} value={cc.value} className="bg-[#1e1b4b]">
                {cc.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phone"
            className="flex-1 p-3 rounded-xl border transition-colors bg-white/5 border-white/15 text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500"
            placeholder="123 456 789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
      </div>

      <div>
        <label className="block mb-2 text-sm text-cosmic-300" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="p-3 w-full rounded-xl border transition-colors bg-white/5 border-white/15 text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500"
          placeholder="email@exemplu.ro"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-6 py-3 rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
        >
          Pasul anterior
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-3 font-medium text-white bg-gradient-to-r rounded-xl transition-all duration-300 cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple"
        >
          Pasul următor
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
