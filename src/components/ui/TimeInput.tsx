import { useState, useRef, useEffect, useCallback } from "react";
import { Clock, ChevronDown } from "lucide-react";

interface TimeInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  id?: string;
  required?: boolean;
}

const pad = (n: number) => n.toString().padStart(2, "0");

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  placeholder = "Selectează ora...",
  id,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    value ? `${pad(value.getHours())}:${pad(value.getMinutes())}` : "",
  );
  const [selectedHour, setSelectedHour] = useState<number>(
    value?.getHours() ?? 0,
  );
  const [selectedMinute, setSelectedMinute] = useState<number>(
    value?.getMinutes() ?? 0,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const h = value.getHours();
      const m = value.getMinutes();
      setInputValue(`${pad(h)}:${pad(m)}`);
      setSelectedHour(h);
      setSelectedMinute(m);
    } else {
      setInputValue("");
      setSelectedHour(0);
      setSelectedMinute(0);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d:]/g, "");
    setInputValue(raw);
  };

  const commitTime = useCallback(
    (raw: string) => {
      const timeMatch = raw.match(/^(\d{1,2}):(\d{1,2})$/);
      if (
        timeMatch &&
        timeMatch[1] !== undefined &&
        timeMatch[2] !== undefined
      ) {
        const h = parseInt(timeMatch[1]);
        const m = parseInt(timeMatch[2]);
        if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
          const base = value ? new Date(value) : new Date();
          base.setHours(h, m, 0, 0);
          onChange(base);
          setSelectedHour(h);
          setSelectedMinute(m);
          return true;
        }
      }
      return false;
    },
    [value, onChange],
  );

  const handleInputBlur = () => {
    if (!commitTime(inputValue)) {
      setInputValue(
        value ? `${pad(value.getHours())}:${pad(value.getMinutes())}` : "",
      );
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (commitTime(inputValue)) {
        setIsOpen(false);
      } else {
        setInputValue(
          value ? `${pad(value.getHours())}:${pad(value.getMinutes())}` : "",
        );
      }
    } else if (e.key === "Tab") {
      if (commitTime(inputValue)) {
        setIsOpen(false);
      }
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const h = parseInt(e.target.value);
    setSelectedHour(h);
    const base = value ? new Date(value) : new Date();
    base.setHours(h, selectedMinute, 0, 0);
    onChange(base);
    setInputValue(`${pad(h)}:${pad(selectedMinute)}`);
  };

  const handleMinuteChange = useCallback(
    (m: number) => {
      setSelectedMinute(m);
      const h = value ? value.getHours() : selectedHour;
      const base = value ? new Date(value) : new Date();
      base.setHours(h, m, 0, 0);
      onChange(base);
      setInputValue(`${pad(h)}:${pad(m)}`);
      setIsOpen(false);
    },
    [value, onChange, selectedHour],
  );

  return (
    <div ref={containerRef} className="relative w-full" id={id}>
      <div className="relative">
        <Clock className="absolute z-10 w-4 h-4 -translate-y-1/2 pointer-events-none left-3 top-1/2 text-cosmic-500" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-10 pr-3 py-3 bg-white/5 border rounded-xl text-cosmic-100 placeholder-cosmic-500 focus:outline-none transition-colors ${
            isOpen
              ? "ring-1 border-cosmic-500 ring-cosmic-500"
              : "border-white/15 hover:border-white/25"
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full p-3 bg-[#1e1b4b] border border-white/10 rounded-xl shadow-2xl shadow-purple-500/10">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <select
                value={selectedHour}
                onChange={handleHourChange}
                className="w-full px-3 py-2 pr-8 text-sm text-purple-200 border rounded-lg appearance-none cursor-pointer bg-white/10 border-white/15 focus:outline-none focus:border-purple-400"
              >
                {HOURS.map((h) => (
                  <option
                    key={h}
                    value={h}
                    className="bg-[#1e1b4b] text-purple-200"
                  >
                    {pad(h)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400 pointer-events-none" />
            </div>
            <div className="text-xl font-light text-purple-400">:</div>
            <div className="relative flex-1">
              <select
                value={selectedMinute}
                onChange={(e) => handleMinuteChange(parseInt(e.target.value))}
                className="w-full px-3 py-2 pr-8 text-sm text-purple-200 border rounded-lg appearance-none cursor-pointer bg-white/10 border-white/15 focus:outline-none focus:border-purple-400"
              >
                {MINUTES.map((m) => (
                  <option
                    key={m}
                    value={m}
                    className="bg-[#1e1b4b] text-purple-200"
                  >
                    {pad(m)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400 pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeInput;
