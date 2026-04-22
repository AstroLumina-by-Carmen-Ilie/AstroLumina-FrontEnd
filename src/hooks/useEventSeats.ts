import { useState, useEffect } from "react";

const STORAGE_KEY = "constelatii-event-seats";

export interface EventSeats {
  [eventId: string]: {
    booked: number;
    waitlist: string[];
  };
}

const MAX_SEATS = 20;

const getInitialSeats = (): EventSeats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse event seats from localStorage:", e);
  }
  return {};
};

const saveSeats = (seats: EventSeats) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seats));
  } catch (e) {
    console.error("Failed to save event seats to localStorage:", e);
  }
};

export const useEventSeats = () => {
  const [seats, setSeats] = useState<EventSeats>(getInitialSeats);

  useEffect(() => {
    saveSeats(seats);
  }, [seats]);

  const getBookedSeats = (eventId: string): number => {
    return seats[eventId]?.booked ?? 0;
  };

  const getAvailableSeats = (eventId: string): number => {
    return MAX_SEATS - (seats[eventId]?.booked ?? 0);
  };

  const isEventFull = (eventId: string): boolean => {
    return getAvailableSeats(eventId) <= 0;
  };

  const bookSeats = (eventId: string, count: number): boolean => {
    const available = getAvailableSeats(eventId);
    if (available < count) {
      return false;
    }

    setSeats((prev) => ({
      ...prev,
      [eventId]: {
        booked: (prev[eventId]?.booked ?? 0) + count,
        waitlist: prev[eventId]?.waitlist ?? [],
      },
    }));
    return true;
  };

  const addToWaitlist = (eventId: string, email: string) => {
    setSeats((prev) => {
      const currentWaitlist = prev[eventId]?.waitlist ?? [];
      if (currentWaitlist.includes(email)) {
        return prev;
      }
      return {
        ...prev,
        [eventId]: {
          booked: prev[eventId]?.booked ?? 0,
          waitlist: [...currentWaitlist, email],
        },
      };
    });
  };

  const getWaitlistPosition = (eventId: string, email: string): number => {
    const waitlist = seats[eventId]?.waitlist ?? [];
    const position = waitlist.indexOf(email);
    return position >= 0 ? position + 1 : 0;
  };

  const resetSeats = (eventId?: string) => {
    if (eventId) {
      setSeats((prev) => {
        const newSeats = { ...prev };
        delete newSeats[eventId];
        return newSeats;
      });
    } else {
      setSeats({});
    }
  };

  return {
    seats,
    getBookedSeats,
    getAvailableSeats,
    isEventFull,
    bookSeats,
    addToWaitlist,
    getWaitlistPosition,
    resetSeats,
    MAX_SEATS,
  };
};