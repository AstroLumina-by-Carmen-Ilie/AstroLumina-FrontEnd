import { useState, useRef, useEffect, useCallback } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parse, isValid } from "date-fns";
import { ro } from "date-fns/locale";
import { Calendar, ChevronDown } from "lucide-react";

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  id?: string;
  required?: boolean;
}

const MONTHS = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 120 }, (_, i) => CURRENT_YEAR - i);

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder = "Selectează data...",
  id,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    value ? format(value, "dd/MM/yyyy") : "",
  );
  const [calendarMonth, setCalendarMonth] = useState<Date>(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setInputValue(format(value, "dd/MM/yyyy"));
      setCalendarMonth(value);
    } else {
      setInputValue("");
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Ignore native select/option elements — they render outside the DOM tree
      if (target.tagName === "SELECT" || target.tagName === "OPTION") return;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^\d/]/g, "");
    setInputValue(raw);

    if (raw.length === 10) {
      const parsed = parse(raw, "dd/MM/yyyy", new Date());
      if (isValid(parsed)) {
        onChange(parsed);
        setCalendarMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
      }
    } else if (raw.length === 0) {
      onChange(null);
    }
  };

  const handleInputBlur = () => {
    if (inputValue.length === 10) {
      const parsed = parse(inputValue, "dd/MM/yyyy", new Date());
      if (!isValid(parsed)) {
        setInputValue(value ? format(value, "dd/MM/yyyy") : "");
      }
    } else if (inputValue.length > 0) {
      setInputValue(value ? format(value, "dd/MM/yyyy") : "");
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.length === 10) {
        const parsed = parse(inputValue, "dd/MM/yyyy", new Date());
        if (isValid(parsed)) {
          onChange(parsed);
          setCalendarMonth(
            new Date(parsed.getFullYear(), parsed.getMonth(), 1),
          );
          setIsOpen(false);
        }
      }
    } else if (e.key === "Tab") {
      if (inputValue.length === 10) {
        const parsed = parse(inputValue, "dd/MM/yyyy", new Date());
        if (isValid(parsed)) {
          setIsOpen(false);
        }
      }
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleDayClick = useCallback(
    (day: Date) => {
      if (value && day.toDateString() === value.toDateString()) {
        setIsOpen(false);
        return;
      }
      onChange(day);
      setInputValue(format(day, "dd/MM/yyyy"));
      setCalendarMonth(new Date(day.getFullYear(), day.getMonth(), 1));
      requestAnimationFrame(() => setIsOpen(false));
    },
    [onChange, value],
  );

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    const newDate = new Date(calendarMonth.getFullYear(), newMonth, 1);
    setCalendarMonth(newDate);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    const newDate = new Date(newYear, calendarMonth.getMonth(), 1);
    setCalendarMonth(newDate);
  };

  return (
    <div ref={containerRef} className="relative w-full" id={id}>
      <div className="relative">
        <Calendar className="absolute z-10 w-4 h-4 -translate-y-1/2 pointer-events-none left-3 top-1/2 text-cosmic-500" />
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
          <style>{`
            .rdp-month_grid { width: 100%; table-layout: fixed; border-spacing: 0; }
            .rdp-month_grid td { padding: 0; }
            .rdp-day_button { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
          `}</style>
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <select
                value={calendarMonth.getMonth()}
                onChange={handleMonthChange}
                className="w-full appearance-none bg-white/10 border border-white/15 rounded-lg px-3 py-1.5 pr-8 text-sm text-purple-200 focus:outline-none focus:border-purple-400 cursor-pointer"
              >
                {MONTHS.map((m, i) => (
                  <option
                    key={i}
                    value={i}
                    className="bg-[#1e1b4b] text-purple-200"
                  >
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <select
                value={calendarMonth.getFullYear()}
                onChange={handleYearChange}
                className="w-full appearance-none bg-white/10 border border-white/15 rounded-lg px-3 py-1.5 pr-8 text-sm text-purple-200 focus:outline-none focus:border-purple-400 cursor-pointer"
              >
                {YEARS.map((y) => (
                  <option
                    key={y}
                    value={y}
                    className="bg-[#1e1b4b] text-purple-200"
                  >
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400 pointer-events-none" />
            </div>
          </div>

          <DayPicker
            mode="single"
            selected={value || undefined}
            onDayClick={handleDayClick}
            month={calendarMonth}
            locale={ro}
            showOutsideDays
            classNames={{
              months: "flex flex-col",
              month: "space-y-4",
              caption: "hidden",
              nav: "hidden",
              table: "w-full table-fixed",
              head_row: "flex",
              head_cell:
                "text-purple-400/60 rounded-md flex-1 font-normal text-[0.7rem] text-center",
              row: "flex w-full mt-1",
              cell: "h-8 flex-1 flex items-center justify-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-purple-500/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-8 w-8 p-0 font-normal text-purple-200 hover:bg-purple-500/20 rounded-md transition-colors cursor-pointer",
              day_selected:
                "bg-purple-600/40 text-purple-100 hover:bg-purple-600/50 hover:text-purple-100 focus:bg-purple-600/50 focus:text-purple-100",
              day_today: "ring-1 ring-purple-400/50",
              day_outside: "text-purple-400/40",
              day_disabled: "text-purple-400/30 opacity-50",
              day_range_middle: "bg-purple-500/20 text-purple-200",
              day_hidden: "invisible",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;
