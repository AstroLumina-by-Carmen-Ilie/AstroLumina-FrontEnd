import { useState, useCallback, useRef } from 'react';

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || 'http://localhost:3033';
const MAX_SEATS = 20;

// Module-level cache shared across all hook instances so any component
// that books a seat immediately updates the data for every other component
const globalSeatsCache: Record<string, SeatInfo> = {};
const globalFetchedRef: Set<string> = new Set();

interface SeatInfo {
  eventId: string;
  availableSeats: number;
  maxSeats: number;
  bookedSeats: number;
}

export const useEventSeats = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce timer to prevent 304 spam when multiple components request seats simultaneously
  const pendingFetchesRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const recentlyFetchedRef = useRef<Set<string>>(new Set());

  const fetchSeats = useCallback(async (eventId: string): Promise<SeatInfo> => {
    // Return cached data immediately if available
    if (globalSeatsCache[eventId]) {
      return globalSeatsCache[eventId];
    }

    // Debounce: if a fetch for this event is already pending, wait for it
    if (pendingFetchesRef.current.has(eventId)) {
      return new Promise((resolve) => {
        const checkCache = setInterval(() => {
          if (globalSeatsCache[eventId]) {
            clearInterval(checkCache);
            resolve(globalSeatsCache[eventId]);
          }
        }, 50);
      });
    }

    // Debounce by 100ms to coalesce rapid concurrent requests
    const timer = setTimeout(async () => {
      pendingFetchesRef.current.delete(eventId);
      recentlyFetchedRef.current.add(eventId);

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BOOKING_API_URL}/events/seats/${eventId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch seats');
        }

        const data = await response.json();

        const info: SeatInfo = {
          eventId,
          availableSeats: data.availableSeats ?? MAX_SEATS,
          maxSeats: data.maxSeats ?? MAX_SEATS,
          bookedSeats: data.bookedSeats ?? 0,
        };

        globalSeatsCache[eventId] = info;
        globalFetchedRef.add(eventId);
        setLoading(false);
        return info;
      } catch (err) {
        console.error('Fetch seats error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');

        const defaultInfo: SeatInfo = {
          eventId,
          availableSeats: MAX_SEATS,
          maxSeats: MAX_SEATS,
          bookedSeats: 0,
        };
        globalSeatsCache[eventId] = defaultInfo;
        globalFetchedRef.add(eventId);
        setLoading(false);
        return defaultInfo;
      }
    }, 100);

    pendingFetchesRef.current.set(eventId, timer);
    return new Promise((resolve) => {
      const checkCache = setInterval(() => {
        if (globalSeatsCache[eventId]) {
          clearInterval(checkCache);
          resolve(globalSeatsCache[eventId]);
        }
      }, 50);
    });
  }, []);

  const fetchSeatsForEvents = useCallback(async (eventIds: string[]): Promise<Record<string, SeatInfo>> => {
    const results: Record<string, SeatInfo> = {};
    const toFetch: string[] = [];

    for (const id of eventIds) {
      if (globalSeatsCache[id]) {
        results[id] = globalSeatsCache[id];
      } else {
        toFetch.push(id);
      }
    }

    if (toFetch.length === 0) {
      return results;
    }

    setLoading(true);
    setError(null);

    try {
      await Promise.all(toFetch.map(async (eventId) => {
        try {
          const response = await fetch(`${BOOKING_API_URL}/events/seats/${eventId}`);
          if (!response.ok) throw new Error('Failed');

          const data = await response.json();
          const info: SeatInfo = {
            eventId,
            availableSeats: data.availableSeats ?? MAX_SEATS,
            maxSeats: data.maxSeats ?? MAX_SEATS,
            bookedSeats: data.bookedSeats ?? 0,
          };
          globalSeatsCache[eventId] = info;
          globalFetchedRef.add(eventId);
          results[eventId] = info;
        } catch (err) {
          console.error(`Failed to fetch seats for ${eventId}:`, err);
          const defaultInfo: SeatInfo = {
            eventId,
            availableSeats: MAX_SEATS,
            maxSeats: MAX_SEATS,
            bookedSeats: 0,
          };
          globalSeatsCache[eventId] = defaultInfo;
          globalFetchedRef.add(eventId);
          results[eventId] = defaultInfo;
        }
      }));

      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return results;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAvailableSeats = useCallback((eventId: string): number => {
    return globalSeatsCache[eventId]?.availableSeats ?? MAX_SEATS;
  }, []);

  const getBookedSeats = useCallback((eventId: string): number => {
    return globalSeatsCache[eventId]?.bookedSeats ?? 0;
  }, []);

  const isEventFull = useCallback((eventId: string): boolean => {
    return getAvailableSeats(eventId) <= 0;
  }, [getAvailableSeats]);

  const bookSeats = useCallback(async (
    eventId: string,
    holders: Array<{ fullName: string; email?: string; phone?: string }>,
    ticketCount: number,
    paymentIntentId: string,
    eventTitle?: string,
    eventDate?: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const contactEmail = holders[0]?.email;
      const contactPhone = holders[0]?.phone;

      const response = await fetch(`${BOOKING_API_URL}/events/send-event-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          eventTitle,
          eventDate,
          ticketCount,
          holders,
          paymentIntentId,
          email: contactEmail,
          phone: contactPhone,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Booking failed');
      }

      const current = globalSeatsCache[eventId];
      if (current) {
        globalSeatsCache[eventId] = {
          ...current,
          availableSeats: Math.max(0, current.availableSeats - ticketCount),
          bookedSeats: current.bookedSeats + ticketCount,
        };
      }

      return true;
    } catch (err) {
      console.error('Book seats error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshEventSeats = useCallback((eventId: string) => {
    delete globalSeatsCache[eventId];
    globalFetchedRef.delete(eventId);
  }, []);

  return {
    loading,
    error,
    fetchSeats,
    fetchSeatsForEvents,
    getAvailableSeats,
    getBookedSeats,
    isEventFull,
    bookSeats,
    refreshEventSeats,
    MAX_SEATS,
  };
};