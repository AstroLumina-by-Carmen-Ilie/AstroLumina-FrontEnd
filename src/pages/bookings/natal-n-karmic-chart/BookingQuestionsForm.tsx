import React, { useState } from 'react';
import { BookingQuestions } from '@/types';

interface BookingQuestionsFormProps {
  onNext: (questions: BookingQuestions) => void;
  onBack: () => void;
}

const BookingQuestionsForm: React.FC<BookingQuestionsFormProps> = ({ onNext, onBack }) => {
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string>('');

  const validateForm = () => {
    if (!notes.trim()) {
      setError('Te rog descriei motivul discuției');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onNext({ notes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-cosmic-200 text-lg font-semibold mb-4">
          Motivul discuției
        </h3>
        <p className="text-cosmic-300 text-sm mb-6">
          Descrie pe scurt care este subiectul pe care vrei să îl explorezi.
        </p>
      </div>

      <div>
        <label className="block text-cosmic-300 text-sm mb-2" htmlFor="notes">
          Care este motivul discuției? *
        </label>
        <textarea
          id="notes"
          className="w-full p-3 bg-white/5 border border-white/15 rounded-xl text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500 transition-colors resize-none"
          placeholder="Descrie subiectul pe care vrei să îl explorezi în consultație..."
          rows={4}
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            if (error) setError('');
          }}
          required
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-white/5 text-cosmic-200 py-3 px-6 rounded-xl hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
        >
          Înapoi
        </button>
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white py-3 px-6 rounded-xl hover:from-cosmic-500 hover:to-cosmic-400 transition-all duration-300 shadow-glow-purple cursor-pointer font-medium"
        >
          Pasul următor
        </button>
      </div>
    </form>
  );
};

export default BookingQuestionsForm;