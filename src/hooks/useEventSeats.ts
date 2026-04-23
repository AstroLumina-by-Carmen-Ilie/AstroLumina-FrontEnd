import { useState, useCallback, useRef } from 'react';

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || 'http://localhost:3033';
const MAX_SEATS = 20;

interface SeatInfo {
  eventId: string;
  availableSeats: number;
  maxSeats: number;
  bookedSeats: number;
}

export const useEventSeats = () => {
  const [seatsCache, setSeatsCache] = useState<Record<string, SeatInfo>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Track which events have been fetched to avoid duplicate calls
  const fetchedRef = useRef<Set<string>>(new Set());

  const fetchSeats = useCallback(async (eventId: string): Promise<SeatInfo> => {
    // If already fetched, return cached immediately without loading
    if (fetchedRef.current.has(eventId) && seatsCache[eventId]) {
      return seatsCache[eventId];
    }

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

      fetchedRef.current.add(eventId);
      setSeatsCache((prev) => ({ ...prev, [eventId]: info }));
      return info;
    } catch (err) {
      console.error('Fetch seats error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Return default value on error, mark as fetched to avoid retry loop
      fetchedRef.current.add(eventId);
      const defaultInfo: SeatInfo = {
        eventId,
        availableSeats: MAX_SEATS,
        maxSeats: MAX_SEATS,
        bookedSeats: 0,
      };
      setSeatsCache((prev) => ({ ...prev, [eventId]: defaultInfo }));
      return defaultInfo;
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies - use ref to track fetched events

  const fetchSeatsForEvents = useCallback(async (eventIds: string[]): Promise<Record<string, SeatInfo>> => {
    // Filter out already fetched events
    const newEventIds = eventIds.filter(id => !fetchedRef.current.has(id));
    
    if (newEventIds.length === 0) {
      // Return cached data for all requested events
      const result: Record<string, SeatInfo> = {};
      eventIds.forEach(id => {
        if (seatsCache[id]) {
          result[id] = seatsCache[id];
        } else {
          result[id] = {
            eventId: id,
            availableSeats: MAX_SEATS,
            maxSeats: MAX_SEATS,
            bookedSeats: 0,
          };
        }
      });
      return result;
    }

    setLoading(true);
    setError(null);

    try {
      const results: Record<string, SeatInfo> = {};
      
      // Fetch all events in parallel
      await Promise.all(newEventIds.map(async (eventId) => {
        try {
          const response = await fetch(`${BOOKING_API_URL}/events/seats/${eventId}`);
          if (!response.ok) throw new Error('Failed');
          
          const data = await response.json();
          results[eventId] = {
            eventId,
            availableSeats: data.availableSeats ?? MAX_SEATS,
            maxSeats: data.maxSeats ?? MAX_SEATS,
            bookedSeats: data.bookedSeats ?? 0,
          };
          fetchedRef.current.add(eventId);
        } catch (err) {
          console.error(`Failed to fetch seats for ${eventId}:`, err);
          results[eventId] = {
            eventId,
            availableSeats: MAX_SEATS,
            maxSeats: MAX_SEATS,
            bookedSeats: 0,
          };
          fetchedRef.current.add(eventId);
        }
      }));

      setSeatsCache((prev) => ({ ...prev, ...results }));
      
      // Also include cached data for already-fetched events
      const allResults: Record<string, SeatInfo> = { ...results };
      eventIds.forEach(id => {
        if (seatsCache[id] && !allResults[id]) {
          allResults[id] = seatsCache[id];
        }
      });
      
      return allResults;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return seatsCache;
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies

  const getAvailableSeats = useCallback((eventId: string): number => {
    return seatsCache[eventId]?.availableSeats ?? MAX_SEATS;
  }, [seatsCache]);

  const getBookedSeats = useCallback((eventId: string): number => {
    return seatsCache[eventId]?.bookedSeats ?? 0;
  }, [seatsCache]);

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

      // Refresh seat count after booking (invalidate cache)
      fetchedRef.current.delete(eventId);
      await fetchSeats(eventId);
      
      return true;
    } catch (err) {
      console.error('Book seats error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchSeats]);

  const refreshEventSeats = useCallback((eventId: string) => {
    fetchedRef.current.delete(eventId);
  }, []);

  return {
    seatsCache,
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