import { useState, useCallback } from "react";

const BOOKING_API_URL =
  import.meta.env.VITE_BOOKING_API_URL || "http://localhost:3033";

interface SeatInfo {
  eventId: string;
  availableSeats: number;
  maxSeats: number;
  bookedSeats: number;
}

export const useEventSeats = () => {
  const [loading, setLoading] = useState(false);
  const [seatsCache, setSeatsCache] = useState<Record<string, SeatInfo>>({});

  const fetchSeatsForEvents = useCallback(
    async (eventIds: string[]): Promise<void> => {
      setLoading(true);
      const newCache: Record<string, SeatInfo> = {};

      for (const eventId of eventIds) {
        const response = await fetch(
          `${BOOKING_API_URL}/events/seats/${eventId}`,
        );

        if (!response.ok) {
          console.error(`API error for ${eventId}:`, response.status);
          continue;
        }

        const data = await response.json();

        newCache[eventId] = {
          eventId,
          availableSeats: data.availableSeats,
          maxSeats: data.maxSeats,
          bookedSeats: data.bookedSeats,
        };
      }

      setSeatsCache(newCache);
      setLoading(false);
    },
    [],
  );

  const fetchSeats = useCallback(async (eventId: string): Promise<SeatInfo> => {
    setLoading(true);

    const response = await fetch(`${BOOKING_API_URL}/events/seats/${eventId}`);
    if (!response.ok) {
      setLoading(false);
      throw new Error("Failed to fetch seats");
    }

    const data = await response.json();

    const info: SeatInfo = {
      eventId,
      availableSeats: data.availableSeats,
      maxSeats: data.maxSeats,
      bookedSeats: data.bookedSeats,
    };

    setSeatsCache((prev) => ({ ...prev, [eventId]: info }));
    setLoading(false);
    return info;
  }, []);

  const getAvailableSeats = useCallback(
    (eventId: string): number => {
      return seatsCache[eventId]?.availableSeats ?? 20;
    },
    [seatsCache],
  );

  const getBookedSeats = useCallback(
    (eventId: string): number => {
      return seatsCache[eventId]?.bookedSeats ?? 0;
    },
    [seatsCache],
  );

  const isEventFull = useCallback(
    (eventId: string): boolean => {
      const available = seatsCache[eventId]?.availableSeats;
      return available !== undefined && available <= 0;
    },
    [seatsCache],
  );

  const bookSeats = useCallback(
    async (
      eventId: string,
      holders: Array<{ fullName: string; email?: string; phone?: string }>,
      ticketCount: number,
      paymentIntentId: string,
      eventTitle?: string,
      eventDate?: string,
    ): Promise<boolean> => {
      setLoading(true);

      const response = await fetch(
        `${BOOKING_API_URL}/events/send-event-confirmation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            eventTitle,
            eventDate,
            ticketCount,
            holders,
            paymentIntentId,
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setLoading(false);
        throw new Error(data.message || "Booking failed");
      }

      setLoading(false);
      return true;
    },
    [],
  );

  return {
    seatsCache,
    loading,
    fetchSeats,
    fetchSeatsForEvents,
    getAvailableSeats,
    getBookedSeats,
    isEventFull,
    bookSeats,
    MAX_SEATS: 20,
  };
};