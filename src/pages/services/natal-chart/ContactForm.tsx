import React, { useState } from 'react';
import { ContactInfo } from '../../../types';

interface ContactFormProps {
  onNext: (contactInfo: ContactInfo) => void;
  onBack: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onNext, onBack }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!phone) newErrors.phone = 'Numărul de telefon este obligatoriu';
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

    onNext({ phone, email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="phone">Număr de telefon</label>
        <input
          type="tel"
          id="phone"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-1/2 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Înapoi
        </button>
        <button
          type="submit"
          className="w-1/2 bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Pasul următor
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
