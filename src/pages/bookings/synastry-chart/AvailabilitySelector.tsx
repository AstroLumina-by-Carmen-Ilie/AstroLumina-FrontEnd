import React, { useState, useEffect, useCallback } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ro } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { AvailableSlot, AvailabilitySelectorProps } from "@/types";
import { BOOKING_API_URL } from "@/config";

/** Local YYYY-MM-DD (avoids UTC shift from toISOString). */
function toLocalYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Cal.com / Booking API returns either a map date -> [{ start, end }] or a flat array.
 */
function normalizeSlotsFromApi(slotsRaw: unknown): AvailableSlot[] {
  if (!slotsRaw) return [];

  if (Array.isArray(slotsRaw)) {
    return slotsRaw
      .map(
        (slot: { time?: string; start?: string; date?: string } | string) => {
          const raw =
            typeof slot === "string" ? slot : (slot.start ?? slot.time);
          if (!raw) return null;
          const d = new Date(raw);
          return {
            time: raw,
            date:
              typeof slot === "object" && slot.date ? slot.date : toLocalYmd(d),
            timezone: "Europe/Bucharest",
          };
        },
      )
      .filter(Boolean) as AvailableSlot[];
  }

  if (typeof slotsRaw === "object") {
    const out: AvailableSlot[] = [];
    for (const [dateKey, slotList] of Object.entries(
      slotsRaw as Record<string, unknown>,
    )) {
      if (!Array.isArray(slotList)) continue;
      for (const item of slotList) {
        const start =
          typeof item === "string"
            ? item
            : item && typeof item === "object" && "start" in item
              ? String((item as { start: string }).start)
              : null;
        if (!start) continue;
        const d = new Date(start);
        const date =
          /^\d{4}-\d{2}-\d{2}$/.test(dateKey) && !dateKey.includes("T")
            ? dateKey
            : toLocalYmd(d);
        out.push({ time: start, date, timezone: "Europe/Bucharest" });
      }
    }
    return out;
  }

  return [];
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
const YEARS = Array.from({ length: 3 }, (_, i) => CURRENT_YEAR + i);

/** Horizon for one request — availability limits come from Cal.com; widen here if needed. */
const AVAILABILITY_RANGE_DAYS = 90;

const AvailabilitySelector: React.FC<AvailabilitySelectorProps> = ({
  initialValues,
  onNext,
  onBack,
}) => {
  const SESSION_KEY = "astrograma-relationala";

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialValues ? new Date(initialValues.time) : undefined,
  );
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(
    initialValues || null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [datesWithSlots, setDatesWithSlots] = useState<Set<string>>(new Set());
  const [calendarMonth, setCalendarMonth] = useState<Date>(
    initialValues ? new Date(initialValues.time) : new Date(),
  );

  const fetchSlotsForRange = useCallback(
    async (startDate: Date, endDate: Date) => {
      setIsLoading(true);
      setError(null);
      try {
        const startTime = startDate.toISOString();
        const endTime = new Date(endDate.getTime() + 86400000).toISOString();

        const response = await axios.get(
          `${BOOKING_API_URL}/api/availability/slots/session/${SESSION_KEY}`,
          {
            params: {
              startTime,
              endTime,
              timeZone: "Europe/Bucharest",
            },
          },
        );

        const slots = normalizeSlotsFromApi(response.data.slots);
        setAvailableSlots(slots);

        const dateSet = new Set<string>();
        slots.forEach((slot) => {
          dateSet.add(slot.date);
        });
        setDatesWithSlots(dateSet);
      } catch (err) {
        console.error("Error fetching availability slots:", err);
        setError(
          "Nu am putut încărca disponibilitatea. Te rog încearcă din nou.",
        );
        setAvailableSlots([]);
        setDatesWithSlots(new Set());
      } finally {
        setIsLoading(false);
      }
    },
    [BOOKING_API_URL],
  );

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(today.getTime() + AVAILABILITY_RANGE_DAYS * 86400000);
    fetchSlotsForRange(today, end);
  }, [fetchSlotsForRange]);

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    if (date) {
      setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  const slotsForSelectedDate = selectedDate
    ? availableSlots.filter((slot) => {
        const ymd = toLocalYmd(new Date(slot.time));
        const sel = toLocalYmd(selectedDate);
        return ymd === sel;
      })
    : [];

  const disabledDates = (date: Date) => {
    const dateString = toLocalYmd(date);
    if (datesWithSlots.size === 0 && isLoading) return false;
    if (datesWithSlots.size === 0) return true;
    return !datesWithSlots.has(dateString);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setCalendarMonth(new Date(calendarMonth.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setCalendarMonth(new Date(newYear, calendarMonth.getMonth(), 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setError("Te rog selectează un slot disponibil");
      return;
    }
    onNext(selectedSlot);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold text-cosmic-200">
          Selectează data și ora disponibilă
        </h3>

        <div className="grid min-w-0 gap-6 md:grid-cols-2">
          <div className="min-w-0">
            <div className="w-full max-w-full p-3 bg-[#1e1b4b] border border-white/10 rounded-xl shadow-2xl shadow-purple-500/10 overflow-hidden">
              <style>{`
                .availability-rdp .rdp-month_grid { width: 100%; table-layout: fixed; border-spacing: 0; }
                .availability-rdp .rdp-month_grid td { padding: 0; }
                .availability-rdp .rdp-day_button { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
              `}</style>
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1 min-w-0">
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
                <div className="relative flex-1 min-w-0">
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

              <div className="w-full min-w-0 overflow-x-auto">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelectDate}
                  month={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  disabled={disabledDates}
                  locale={ro}
                  showOutsideDays
                  className="w-full availability-rdp"
                  classNames={{
                    months: "flex flex-col",
                    month: "space-y-4 w-full",
                    caption: "hidden",
                    nav: "hidden",
                    month_caption: "hidden",
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
                    day_disabled:
                      "text-purple-400/30 opacity-50 cursor-not-allowed",
                    day_range_middle: "bg-purple-500/20 text-purple-200",
                    day_hidden: "invisible",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 p-4 border rounded-xl bg-white/5 border-white/10">
            {selectedDate ? (
              <>
                <p className="mb-4 text-sm font-semibold text-cosmic-200">
                  Orar disponibil pentru{" "}
                  {selectedDate.toLocaleDateString("ro-RO")}
                </p>
                {isLoading ? (
                  <p className="text-sm text-cosmic-400">Se încarcă...</p>
                ) : slotsForSelectedDate.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 max-h-[min(320px,50vh)] overflow-y-auto pr-1">
                    {slotsForSelectedDate.map((slot, idx) => (
                      <button
                        key={`${slot.time}-${idx}`}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          selectedSlot?.time === slot.time
                            ? "bg-cosmic-600 text-white ring-2 ring-cosmic-500"
                            : "bg-white/5 text-cosmic-200 hover:bg-white/10"
                        }`}
                      >
                        {new Date(slot.time).toLocaleTimeString("ro-RO", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-cosmic-400">
                    Nu sunt sloturi disponibile în această dată. Te rog alege
                    altă dată.
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-cosmic-400">
                Selectează o dată pentru a vedea orarul disponibil
              </p>
            )}
          </div>
        </div>

        {error && <p className="mt-4 text-xs text-red-400">{error}</p>}
      </div>

      {selectedSlot && (
        <div className="p-4 border rounded-xl bg-cosmic-600/20 border-cosmic-600/50">
          <p className="text-sm text-cosmic-200">
            <span className="font-semibold">Slot selectat:</span>{" "}
            {new Date(selectedSlot.time).toLocaleDateString("ro-RO")} ora{" "}
            {new Date(selectedSlot.time).toLocaleTimeString("ro-RO", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      )}

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-6 py-3 transition-colors border cursor-pointer rounded-xl bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
        >
          Pasul anterior
        </button>
        <button
          type="submit"
          disabled={!selectedSlot}
          className={`flex-1 bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white py-3 px-6 rounded-xl transition-all duration-300 ${
            !selectedSlot
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple"
          } font-medium`}
        >
          Pasul următor
        </button>
      </div>
    </form>
  );
};

export default AvailabilitySelector;
