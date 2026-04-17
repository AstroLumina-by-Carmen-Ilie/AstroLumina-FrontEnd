import React, { useState, useEffect } from 'react';
import { ContactFormProps } from '@/types';
import { COUNTRY_CODES, CountryCode } from '@/data';

const ContactForm: React.FC<ContactFormProps> = ({ initialValues, onNext, onBack }) => {
  const getInitialCountryCode = (): CountryCode => {
    if (!initialValues?.phone) return COUNTRY_CODES[0] ?? { value: '+40', isoCode: 'RO', label: '', digitCount: 9 };
    for (const cc of COUNTRY_CODES) {
      if (initialValues.phone.startsWith(cc.value)) return cc;
    }
    return COUNTRY_CODES[0] ?? { value: '+40', isoCode: 'RO', label: '', digitCount: 9 };
  };

  const getInitialPhone = (): string => {
    if (!initialValues?.phone) return '';
    for (const cc of COUNTRY_CODES) {
      if (initialValues.phone.startsWith(cc.value)) {
        return initialValues.phone.slice(cc.value.length).replace(/\D/g, '');
      }
    }
    return initialValues.phone.replace(/\D/g, '');
  };

  const [countryCode, setCountryCode] = useState<CountryCode>(getInitialCountryCode);
  const [phone, setPhone] = useState(getInitialPhone);
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (phone && countryCode) {
      const digitsOnly = phone.replace(/\D/g, '');
      if (digitsOnly.length !== countryCode.digitCount) {
        setPhoneError(`Trebuie să conțină exact ${countryCode.digitCount} cifre`);
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('');
    }
  }, [phone, countryCode]);

  const formatPhoneDisplay = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < digits.length && i < countryCode.digitCount; i++) {
      if (i === 3 || i === 6) formatted += ' ';
      formatted += digits[i];
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, '');
    const limited = digitsOnly.slice(0, countryCode.digitCount);
    setPhone(limited);
  };

  const handleCountryCodeChange = (value: string) => {
    const selected = COUNTRY_CODES.find(c => c.value === value);
    if (selected) {
      setCountryCode(selected);
      setPhone('');
      setPhoneError('');
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const digitsOnly = phone.replace(/\D/g, '');

    if (!phone.trim()) {
      setPhoneError('Numărul de telefon este obligatoriu');
      isValid = false;
    } else if (digitsOnly.length !== countryCode.digitCount) {
      setPhoneError(`Trebuie să conțină exact ${countryCode.digitCount} cifre`);
      isValid = false;
    }

    if (!email) {
      setEmailError('Emailul este obligatoriu');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Te rog introdu o adresă de email validă');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const fullPhone = `${countryCode.value} ${formatPhoneDisplay(phone)}`;
    onNext({ phone: fullPhone, email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-2 text-sm text-cosmic-300" htmlFor="countryCode">Codul țării</label>
        <select
          id="countryCode"
          value={countryCode.value}
          onChange={(e) => handleCountryCodeChange(e.target.value)}
          className="p-3 w-full rounded-xl border transition-colors cursor-pointer bg-white/5 border-white/15 text-cosmic-100 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500"
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: '#e9d5ff',
            appearance: 'none',
            WebkitAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23a855f7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.25rem 1.25rem',
            paddingRight: '2.5rem',
          }}
        >
          {COUNTRY_CODES.map((cc) => (
            <option 
              key={`${cc.value}-${cc.isoCode}`} 
              value={cc.value}
              style={{ backgroundColor: '#1e1b4b', color: '#c084fc' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(236,72,153,0.3)';
                e.currentTarget.style.color = '#fce7f3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1e1b4b';
                e.currentTarget.style.color = '#c084fc';
              }}
            >
              {cc.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm text-cosmic-300" htmlFor="phone">
          Număr de telefon <span className="text-cosmic-500">(fără prefix)</span>
        </label>
        <input
          type="tel"
          id="phone"
          className={`w-full p-3 rounded-xl border transition-colors bg-white/5 text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:ring-1 ${
            phoneError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-white/15 focus:border-cosmic-500 focus:ring-cosmic-500'
          }`}
          placeholder={`${countryCode.digitCount} cifre`}
          value={formatPhoneDisplay(phone)}
          onChange={handlePhoneChange}
          required
        />
        {phoneError && <p className="mt-1 text-xs text-red-400">{phoneError}</p>}
      </div>

      <div>
        <label className="block mb-2 text-sm text-cosmic-300" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className={`w-full p-3 rounded-xl border transition-colors bg-white/5 text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:ring-1 ${
            emailError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-white/15 focus:border-cosmic-500 focus:ring-cosmic-500'
          }`}
          placeholder="email@exemplu.ro"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError('');
          }}
          required
        />
        {emailError && <p className="mt-1 text-xs text-red-400">{emailError}</p>}
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