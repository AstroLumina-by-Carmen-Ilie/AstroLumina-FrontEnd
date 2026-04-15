import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BirthDataPayload,
  UserInfo,
  ContactInfo,
  BookingQuestions,
} from "@/types";
import { AvailableSlot } from "./AvailabilitySelector";

interface ConfirmationStepProps {
  payload: BirthDataPayload;
  userInfo: UserInfo;
  contactInfo: ContactInfo;
  bookingQuestions: BookingQuestions;
  selectedSlot: AvailableSlot;
  paymentIntentId: string;
  onBack: () => void;
  onComplete: () => void;
}

interface BookingResponse {
  booking: {
    uid: string;
    eventTypeId: number;
    title: string;
    startTime: string;
    endTime: string;
    attendees: [
      {
        name: string;
        phoneNumber: string;
        email: string;
        timeZone: string;
        [key: string]: unknown;
      },
    ];
    status: string;
    location: string;
    bookingFieldsResponses: {
      "birth-date": string;
      "birth-place": string;
      "birth-time": string;
      notes: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  payload,
  userInfo,
  contactInfo,
  bookingQuestions,
  selectedSlot,
  paymentIntentId,
  onBack,
  onComplete,
}) => {
  const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL;

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingConfirmation, setBookingConfirmation] = useState<
    BookingResponse["booking"] | null
  >(null);

  useEffect(() => {
    let controller = new AbortController();

    const createBooking = async () => {
      try {
        setIsProcessing(true);
        setError(null);

        const metadata: Record<string, string> = {
          source: "astrolumina-website",
        };
        if (paymentIntentId.trim() !== "") {
          metadata.paymentIntentId = paymentIntentId;
        }

        // sessionKey: BookingAPI rezolvă eventTypeId după slug (ca la disponibilitate) — nu hardcoda id-ul din Cal.com
        const bookingResponse = await axios.post<BookingResponse>(
          `${BOOKING_API_URL}/api/bookings`,
          {
            sessionKey: "astrograma-previzionala",
            start: selectedSlot.time,
            attendee: {
              name: userInfo.name,
              email: contactInfo.email,
              timeZone: "Europe/Bucharest",
              phoneNumber: contactInfo.phone,
              language: "ro",
            },
            metadata,
            bookingFieldsResponses: {
              attendeePhoneNumber: contactInfo.phone,
              "birth-date": `${payload.day}/${payload.month}/${payload.year}`,
              "birth-time": `${payload.hour}:${payload.minute}`,
              "birth-place": userInfo.location,
              notes: bookingQuestions.notes,
            },
          },
          { signal: controller.signal },
        );

        setBookingConfirmation(bookingResponse.data.booking);
        setIsProcessing(false);
      } catch (err) {
        if (axios.isCancel(err) || (err as Error).name === "CanceledError") {
          return;
        }
        if (axios.isAxiosError(err)) {
          const data = err.response?.data as { error?: unknown } | undefined;
          const raw = data?.error;
          const message =
            typeof raw === "string"
              ? raw
              : raw != null && typeof raw === "object"
                ? JSON.stringify(raw)
                : "Nu am putut crea sesiunea. Te rog contactează suportul.";
          setError(message);
        } else {
          setError("A apărut o eroare neprevăzută. Te rog încearcă din nou.");
        }
        setIsProcessing(false);
      }
    };

    createBooking();

    return () => {
      controller.abort();
    };
  }, [
    payload,
    userInfo,
    contactInfo,
    bookingQuestions,
    selectedSlot,
    paymentIntentId,
    BOOKING_API_URL,
  ]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isProcessing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-cosmic-600 border-t-cosmic-300 rounded-full animate-spin"></div>
            </div>
            <p className="text-cosmic-200 mt-4">Se crează sesiunea ta...</p>
            <p className="text-cosmic-400 text-sm mt-2">
              Ne conectăm cu sistemul de programare
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6">
          <h3 className="text-red-300 font-semibold mb-2">
            A apărut o problemă
          </h3>
          <p className="text-red-200 text-sm mb-4">{error}</p>
          <p className="text-red-300/80 text-xs">
            Referință de caz: {paymentIntentId}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 bg-white/5 text-cosmic-200 py-3 px-6 rounded-xl hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
          >
            Înapoi
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-cosmic-600 text-white py-3 px-6 rounded-xl hover:bg-cosmic-500 transition-colors cursor-pointer"
          >
            Încearcă din nou
          </button>
        </div>
      </div>
    );
  }

  if (bookingConfirmation) {
    return (
      <div className="space-y-6">
        {/* Success Message */}
        <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-emerald-400 text-2xl">✓</div>
            <h3 className="text-emerald-300 font-semibold">
              Sesiune programată cu succes!
            </h3>
          </div>
          <p className="text-emerald-200/80 text-sm">
            Confirmarea a fost trimisă pe adresa de email {contactInfo.email}
          </p>
        </div>

        {/* Booking Details */}
        {bookingConfirmation && (
          <div className="bg-white/5 rounded-xl border border-white/10 p-6 space-y-4">
            <h3 className="text-cosmic-200 font-semibold">Detalii sesiune</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-cosmic-400 text-xs font-semibold uppercase mb-1">
                  Titlu
                </p>
                <p className="text-cosmic-100">
                  {bookingConfirmation.title}
                </p>
              </div>
              <div>
                <p className="text-cosmic-400 text-xs font-semibold uppercase mb-1">
                  Cand?
                </p>
                <p className="text-cosmic-100">
                  {formatDate(bookingConfirmation.startTime)}
                </p>
                <p className="text-cosmic-100">
                  {formatDate(bookingConfirmation.endTime)}
                </p>
              </div>
              <div>
                <p className="text-cosmic-400 text-xs font-semibold uppercase mb-1">
                  Participant
                </p>
                <p className="text-cosmic-100">
                  {bookingConfirmation.attendees[0].name}
                </p>
              </div>
              <div>
                <p className="text-cosmic-400 text-xs font-semibold uppercase mb-1">
                  Email
                </p>
                <p className="text-cosmic-100 text-sm break-all">
                  {bookingConfirmation.attendees[0].email}
                </p>
              </div>
              <div>
                <p className="text-cosmic-400 text-xs font-semibold uppercase mb-1">
                  Zonă orară
                </p>
                <p className="text-cosmic-100">
                  {bookingConfirmation.attendees[0].timeZone}
                </p>
              </div>
              <div>
                <p className="text-cosmic-400 text-xs font-semibold uppercase mb-1">
                  Status
                </p>
                <p className="text-emerald-400 capitalize">
                  {bookingConfirmation.status}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-cosmic-400 text-xs font-semibold uppercase mb-2">
                Locatia
              </p>
              <p className="text-cosmic-300 font-mono text-xs break-all">
                {bookingConfirmation.location}
              </p>
            </div>
          </div>
        )}

        {/* What Happens Next */}
        <div className="bg-cosmic-900/30 rounded-xl border border-cosmic-700/30 p-6 space-y-4">
          <h3 className="text-cosmic-200 font-semibold">Ce urmează?</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-cosmic-400 font-bold">1.</span>
              <span className="text-cosmic-300 text-sm">
                Vei primi o confirmare pe email cu link-ul Zoom și toate detaliile sesiunii
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-cosmic-400 font-bold">2.</span>
              <span className="text-cosmic-300 text-sm">
                În ziua sesiunii, conectează-te 10 minute mai devreme prin link-ul din email
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-cosmic-400 font-bold">3.</span>
              <span className="text-cosmic-300 text-sm">
                După sesiune, vei primi o înregistrare dacă ai acordat consimțământul
              </span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={onComplete}
            className="flex-1 bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white py-3 px-6 rounded-xl hover:from-cosmic-500 hover:to-cosmic-400 transition-all duration-300 shadow-glow-purple cursor-pointer font-medium"
          >
            Finalizează
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ConfirmationStep;
