import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BirthDataPayload, UserInfo } from '@/types';

interface SynastryBirthDataFormProps {
  onNext: (firstPayload: BirthDataPayload, secondPayload: BirthDataPayload) => void;
}

const SynastryBirthDataForm: React.FC<SynastryBirthDataFormProps> = ({ onNext }) => {
  const navigate = useNavigate();
  
  const [firstPerson, setFirstPerson] = useState({
    name: '',
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    city: '',
    nation: ''
  });

  const [secondPerson, setSecondPerson] = useState({
    name: '',
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    city: '',
    nation: ''
  });

  const [errors, setErrors] = useState<{ first?: string; second?: string }>({});

  const generateYears = () => {
    const years = [];
    for (let y = new Date().getFullYear(); y >= 1900; y--) {
      years.push(y);
    }
    return years;
  };

  const generateDays = () => Array.from({ length: 31 }, (_, i) => i + 1);
  const generateMonths = () => Array.from({ length: 12 }, (_, i) => i + 1);
  const generateHours = () => Array.from({ length: 24 }, (_, i) => i);
  const generateMinutes = () => Array.from({ length: 60 }, (_, i) => i);

  const validateAndSubmit = () => {
    const newErrors: { first?: string; second?: string } = {};

    if (!firstPerson.name || !firstPerson.day || !firstPerson.month || !firstPerson.year || 
        !firstPerson.hour || !firstPerson.minute || !firstPerson.city) {
      newErrors.first = 'Completează toate câmpurile pentru prima persoană';
    }

    if (!secondPerson.name || !secondPerson.day || !secondPerson.month || !secondPerson.year || 
        !secondPerson.hour || !secondPerson.minute || !secondPerson.city) {
      newErrors.second = 'Completează toate câmpurile pentru a doua persoană';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const firstPayload: BirthDataPayload = {
      name: firstPerson.name,
      day: parseInt(firstPerson.day),
      month: parseInt(firstPerson.month),
      year: parseInt(firstPerson.year),
      hour: parseInt(firstPerson.hour),
      minute: parseInt(firstPerson.minute),
      city: firstPerson.city,
      nation: firstPerson.nation || 'RO',
      latitude: 0,
      longitude: 0
    };

    const secondPayload: BirthDataPayload = {
      name: secondPerson.name,
      day: parseInt(secondPerson.day),
      month: parseInt(secondPerson.month),
      year: parseInt(secondPerson.year),
      hour: parseInt(secondPerson.hour),
      minute: parseInt(secondPerson.minute),
      city: secondPerson.city,
      nation: secondPerson.nation || 'RO',
      latitude: 0,
      longitude: 0
    };

    onNext(firstPayload, secondPayload);
  };

  return (
    <div className="space-y-8">
      {/* First Person Section */}
      <div>
        <h3 className="font-display text-xl font-bold text-white mb-4">Prima Persoană</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Nume</label>
            <input
              type="text"
              value={firstPerson.name}
              onChange={(e) => setFirstPerson({ ...firstPerson, name: e.target.value })}
              className="input-field w-full"
              placeholder="Numele tău"
            />
          </div>
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Ziua</label>
            <select
              value={firstPerson.day}
              onChange={(e) => setFirstPerson({ ...firstPerson, day: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Selectează</option>
              {generateDays().map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Luna</label>
            <select
              value={firstPerson.month}
              onChange={(e) => setFirstPerson({ ...firstPerson, month: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Selectează</option>
              {generateMonths().map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Anul</label>
            <select
              value={firstPerson.year}
              onChange={(e) => setFirstPerson({ ...firstPerson, year: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Selectează</option>
              {generateYears().map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Ora</label>
            <select
              value={firstPerson.hour}
              onChange={(e) => setFirstFirstPerson({ ...firstPerson, hour: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Selectează</option>
              {generateHours().map(h => (
                <option key={h} value={h}>{h.toString().padStart(2, '0')}:00</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Minutul</label>
            <select
              value={firstPerson.minute}
              onChange={(e) => setFirstPerson({ ...firstPerson, minute: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Selectează</option>
              {generateMinutes().map(m => (
                <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-cosmic-300 mb-2">Orașul nașterii</label>
            <input
              type="text"
              value={firstPerson.city}
              onChange={(e) => setFirstPerson({ ...firstPerson, city: e.target.value })}
              className="input-field w-full"
              placeholder="ex: București"
            />
          </div>
        </div>
        {errors.first && <p className="text-red-400 text-sm mt-2">{errors.first}</p>}
      </div>

      {/* Second Person Section */}
      <div>
        <h3 className="font-display text-xl font-bold text-white mb-4">A Doua Persoană</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Nume</label>
            <input
              type="text"
              value={secondPerson.name}
              onChange={(e) => setSecondPerson({ ...secondPerson, name: e.target.value })}
              className="input-field w-full"
              placeholder="Numele celeilalte persoane"
            />
          </div>
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Ziua</label>
            <select
              value={secondPerson.day}
              onChange={(e) => setSecondPerson({ ...secondPerson, day: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Selectează</option>
              {generateDays().map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Luna</label>
            <select
              value={secondPerson.month}
              onChange={(e) => setSecondPerson({ ...secondPerson, month: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Selectează</option>
              {generateMonths().map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-comic-300 mb-2">Anul</label>
            <select
              value={secondPerson.year}
              onChange={(e) => setSecondPerson({ ...secondPerson, year: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Selectează</option>
              {generateYears().map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Ora</label>
            <select
              value={secondPerson.hour}
              onChange={(e) => setSecondPerson({ ...secondPerson, hour: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Selectează</option>
              {generateHours().map(h => (
                <option key={h} value={h}>{h.toString().padStart(2, '0')}:00</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cosmic-300 mb-2">Minutul</label>
            <select
              value={secondPerson.minute}
              onChange={(e) => setSecondPerson({ ...secondPerson, minute: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Selectează</option>
              {generateMinutes().map(m => (
                <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-cosmic-300 mb-2">Orașul nașterii</label>
            <input
              type="text"
              value={secondPerson.city}
              onChange={(e) => setSecondPerson({ ...secondPerson, city: e.target.value })}
              className="input-field w-full"
              placeholder="ex: București"
            />
          </div>
        </div>
        {errors.second && <p className="text-red-400 text-sm mt-2">{errors.second}</p>}
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={() => navigate(-1)} className="btn-secondary">
          Înapoi
        </button>
        <button onClick={validateAndSubmit} className="btn-primary">
          Continuă
        </button>
      </div>
    </div>
  );
};

export default SynastryBirthDataForm;
