import { useState, useCallback, useEffect } from 'react';

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || 'http://localhost:3033';
const MAX_SEATS = 20;

interface SeatInfo {
  eventId: string;
  availableSeats: number;
  maxSeats: number;
  bookedSeats: number;
}

interface AttendeeData {
  eventId: string;
  fullName: string;
  email?: string;
  phone?: string;
  paymentIntentId: string;
}

export const useEventSeats = () => {
  const [seatsCache, setSeatsCache] = useState<Record<string, SeatInfo>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSeats = useCallback(async (eventId: string): Promise<SeatInfo> => {
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

      setSeatsCache((prev) => ({ ...prev, [eventId]: info }));
      return info;
    } catch (err) {
      console.error('Fetch seats error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Fallback to cached or default
      const cached = seatsCache[eventId];
      if (cached) return cached;
      
      return {
        eventId,
        availableSeats: MAX_SEATS,
        maxSeats: MAX_SEATS,
        bookedSeats: 0,
      };
    } finally {
      setLoading(false);
    }
  }, [seatsCache]);

  const fetchSeatsForEvents = useCallback(async (eventIds: string[]): Promise<Record<string, SeatInfo>> => {
    setLoading(true);
    setError(null);

    try {
      const results: Record<string, SeatInfo> = {};
      
      // Fetch all events in parallel
      const promises = eventIds.map(async (eventId) => {
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
        } catch {
          results[eventId] = {
            eventId,
            availableSeats: MAX_SEATS,
            maxSeats: MAX_SEATS,
            bookedSeats: 0,
          };
        }
      });

      await Promise.all(promises);
      setSeatsCache((prev) => ({ ...prev, ...results }));
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return seatsCache;
    } finally {
      setLoading(false);
    }
  }, [seatsCache]);

  const getAvailableSeats = (eventId: string): number => {
    return seatsCache[eventId]?.availableSeats ?? MAX_SEATS;
  };

  const getBookedSeats = (eventId: string): number => {
    return seatsCache[eventId]?.bookedSeats ?? 0;
  };

  const isEventFull = (eventId: string): boolean => {
    return getAvailableSeats(eventId) <= 0;
  };

  const bookSeats = async (
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
      // Get email/phone from first holder or shared contact
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

      // Refresh seat count after booking
      await fetchSeats(eventId);
      
      return true;
    } catch (err) {
      console.error('Book seats error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  };

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
    MAX_SEATS,
  };
};