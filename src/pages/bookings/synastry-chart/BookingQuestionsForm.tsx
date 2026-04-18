import React, { useState } from "react";
import { BookingQuestionsFormProps } from "@/types";

const BookingQuestionsForm: React.FC<BookingQuestionsFormProps> = ({
  initialValues,
  onNext,
  onBack,
}) => {
  const [notes, setNotes] = useState(initialValues?.notes || "");
  const [error, setError] = useState<string>("");

  const validateForm = () => {
    if (!notes.trim()) {
      setError("Te rog descrie motivul discuției");
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
        <h3 className="mb-4 text-lg font-semibold text-cosmic-200">
          Motivul discuției
        </h3>
        <p className="mb-6 text-sm text-cosmic-300">
          Descrie pe scurt care este subiectul pe care vrei să îl explorezi.
        </p>
      </div>

      <div>
        <label className="block mb-2 text-sm text-cosmic-300" htmlFor="notes">
          Care este motivul discuției? *
        </label>
        <textarea
          id="notes"
          className="p-3 w-full rounded-xl border transition-colors resize-none bg-white/5 border-white/15 text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500"
          placeholder="Descrie subiectul pe care vrei să îl explorezi în consultație..."
          rows={4}
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            if (error) setError("");
          }}
          required
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
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

export default BookingQuestionsForm;
