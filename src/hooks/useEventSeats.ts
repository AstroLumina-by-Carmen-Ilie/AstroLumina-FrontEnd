import { useState, useCallback, useRef } from 'react';

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || 'http://localhost:3033';
interface SeatInfo {
  eventId: string;
  availableSeats: number;
  maxSeats: number;
  bookedSeats: number;
}

export const useEventSeats = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seatsCacheRef = useRef<Record<string, SeatInfo>>({});

  const fetchSeats = useCallback(async (eventId: string): Promise<SeatInfo> => {
    setLoading(true);
    setError(null);

    const response = await fetch(`${BOOKING_API_URL}/events/seats/${eventId}`);
    if (!response.ok) {
      const err = new Error('Failed to fetch seats');
      setError(err.message);
      setLoading(false);
      throw err;
    }
    
    const data = await response.json();
    const info: SeatInfo = {
      eventId,
      availableSeats: data.availableSeats,
      maxSeats: data.maxSeats,
      bookedSeats: data.bookedSeats,
    };
    
    seatsCacheRef.current[eventId] = info;
    setLoading(false);
    return info;
  }, []);

  const fetchSeatsForEvents = useCallback(async (eventIds: string[]): Promise<Record<string, SeatInfo>> => {
    setLoading(true);
    setError(null);

    const results: Record<string, SeatInfo> = {};
    
    for (const eventId of eventIds) {
      const response = await fetch(`${BOOKING_API_URL}/events/seats/${eventId}`);
      if (!response.ok) {
        const err = new Error(`Failed to fetch seats for ${eventId}`);
        setError(err.message);
        setLoading(false);
        throw err;
      }
      
      const data = await response.json();
      results[eventId] = {
        eventId,
        availableSeats: data.availableSeats,
        maxSeats: data.maxSeats,
        bookedSeats: data.bookedSeats,
      };
    }

    seatsCacheRef.current = { ...seatsCacheRef.current, ...results };
    setLoading(false);
    return results;
  }, []);

  const getAvailableSeats = (eventId: string): number => {
    return seatsCacheRef.current[eventId]?.availableSeats;
  };

  const getBookedSeats = (eventId: string): number => {
    return seatsCacheRef.current[eventId]?.bookedSeats;
  };

  const isEventFull = (eventId: string): boolean => {
    return (seatsCacheRef.current[eventId]?.availableSeats ?? 0) <= 0;
  };

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
      const err = new Error(data.message || 'Booking failed');
      setError(err.message);
      setLoading(false);
      throw err;
    }

    setLoading(false);
    return true;
  }, []);

  return {
    seatsCache: seatsCacheRef.current,
    loading,
    error,
    fetchSeats,
    fetchSeatsForEvents,
    getAvailableSeats,
    getBookedSeats,
    isEventFull,
    bookSeats,
    MAX_SEATS: 20,
  };
};