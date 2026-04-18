import React, { useState } from "react";
import axios from "axios";
import {
  TwoPersonsBookingResponse,
  TwoPersonsConfirmationStepProps,
} from "@/types";

const ConfirmationStep: React.FC<TwoPersonsConfirmationStepProps> = ({
  firstPayload,
  secondPayload,
  firstMemberUserInfo,
  secondMemberUserInfo,
  contactInfo,
  bookingQuestions,
  selectedSlot,
  paymentIntentId,
  onBack,
  onComplete,
}) => {
  const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL;

  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingConfirmation, setBookingConfirmation] = useState<
    TwoPersonsBookingResponse["booking"] | null
  >(null);

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

  const handleConfirmBooking = async () => {
    setIsConfirming(true);

    try {
      setIsProcessing(true);
      setError(null);

      const metadata: Record<string, string> = {
        source: "astrolumina-website",
      };
      if (paymentIntentId.trim() !== "") {
        metadata.paymentIntentId = paymentIntentId;
      }

      const TwoPersonsBookingResponse =
        await axios.post<TwoPersonsBookingResponse>(
          `${BOOKING_API_URL}/api/bookings`,
          {
            sessionKey: "astrograma-relationala",
            start: selectedSlot.time,
            attendee: {
              name: firstMemberUserInfo.name,
              email: contactInfo.email,
              timeZone: "Europe/Bucharest",
              phoneNumber: contactInfo.phone,
              language: "ro",
            },
            metadata,
            bookingFieldsResponses: {
              attendeePhoneNumber: contactInfo.phone,
              first_member_data: `${firstPayload.day}/${firstPayload.month}/${firstPayload.year} 
                ${String(firstPayload.hour).padStart(2, "0")}:${String(firstPayload.minute).padStart(2, "0")} 
                ${firstMemberUserInfo.location}`,
              second_member_data: `${secondPayload.day}/${secondPayload.month}/${secondPayload.year} 
                ${String(secondPayload.hour).padStart(2, "0")}:${String(secondPayload.minute).padStart(2, "0")} 
                ${secondMemberUserInfo.location}`,
              notes: bookingQuestions.notes,
            },
          },
        );

      setBookingConfirmation(TwoPersonsBookingResponse.data.booking);
    } catch (err) {
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
    } finally {
      setIsConfirming(false);
      setIsProcessing(false);
    }
  };

  if (isProcessing || isConfirming) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-12 h-12 rounded-full border-4 animate-spin border-cosmic-600 border-t-cosmic-300"></div>
            </div>
            <p className="mt-4 text-cosmic-200">Se crează sesiunea ta...</p>
            <p className="mt-2 text-sm text-cosmic-400">
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
        <div className="p-6 rounded-xl border bg-red-500/20 border-red-500/50">
          <h3 className="mb-2 font-semibold text-red-300">
            A apărut o problemă
          </h3>
          <p className="mb-4 text-sm text-red-200">{error}</p>
          <p className="text-xs text-red-300/80">
            Referință de caz: {paymentIntentId}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
          >
            Pasul anterior
          </button>
          <button
            onClick={() => {
              setError(null);
              handleConfirmBooking();
            }}
            className="flex-1 px-6 py-3 text-white rounded-xl transition-colors cursor-pointer bg-cosmic-600 hover:bg-cosmic-500"
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
        <div className="p-6 rounded-xl border bg-emerald-500/20 border-emerald-500/50">
          <div className="flex gap-3 items-center mb-2">
            <div className="text-2xl text-emerald-400">✓</div>
            <h3 className="font-semibold text-emerald-300">
              Sesiune programată cu succes!
            </h3>
          </div>
          <p className="text-sm text-emerald-200/80">
            Confirmarea a fost trimisă pe adresa de email {contactInfo.email}
          </p>
        </div>

        <div className="p-6 space-y-4 rounded-xl border bg-white/5 border-white/10">
          <h3 className="font-semibold text-cosmic-200">Detalii sesiune</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-cosmic-400">
                Titlu
              </p>
              <p className="text-cosmic-100">{bookingConfirmation.title}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-cosmic-400">
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
              <p className="mb-1 text-xs font-semibold uppercase text-cosmic-400">
                Participant
              </p>
              <p className="text-cosmic-100">
                {bookingConfirmation.attendees[0].name}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-cosmic-400">
                Email
              </p>
              <p className="text-sm break-all text-cosmic-100">
                {bookingConfirmation.attendees[0].email}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-cosmic-400">
                Zonă orară
              </p>
              <p className="text-cosmic-100">
                {bookingConfirmation.attendees[0].timeZone}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-cosmic-400">
                Status
              </p>
              <p className="text-emerald-400 capitalize">
                {bookingConfirmation.status}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <p className="mb-2 text-xs font-semibold uppercase text-cosmic-400">
              Locația
            </p>
            <p className="font-mono text-xs break-all text-cosmic-300">
              {bookingConfirmation.location}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4 rounded-xl border bg-cosmic-900/30 border-cosmic-700/30">
          <h3 className="font-semibold text-cosmic-200">Ce urmează?</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="font-bold text-cosmic-400">1.</span>
              <span className="text-sm text-cosmic-300">
                Vei primi o confirmare pe email cu link-ul Zoom și toate
                detaliile sesiunii
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-cosmic-400">2.</span>
              <span className="text-sm text-cosmic-300">
                În ziua sesiunii, conectează-te 10 minute mai devreme prin
                link-ul din email
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-cosmic-400">3.</span>
              <span className="text-sm text-cosmic-300">
                După sesiune, vei primi o înregistrare dacă ai acordat
                consimțământul
              </span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onComplete}
            className="flex-1 px-6 py-3 font-medium text-white bg-gradient-to-r rounded-xl transition-all duration-300 cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple"
          >
            Înapoi la pagina principală
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-cosmic-200">
          Confirmă datele
        </h3>
        <p className="mb-6 text-sm text-cosmic-300">
          Verifică datele completate înainte de a confirma programarea sesiunii.
        </p>
      </div>

      <div className="p-6 space-y-4 rounded-xl border bg-white/5 border-white/10">
        <h4 className="font-semibold text-cosmic-200">Date personale</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-xs uppercase text-cosmic-400">Nume</p>
            <p className="text-cosmic-100">{firstMemberUserInfo.name}</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase text-cosmic-400">Email</p>
            <p className="text-cosmic-100">{contactInfo.email}</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase text-cosmic-400">Telefon</p>
            <p className="text-cosmic-100">{contactInfo.phone}</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase text-cosmic-400">
              Data nașterii membrului 1
            </p>
            <p className="text-cosmic-100">
              {firstMemberUserInfo.birthDate.toLocaleDateString("ro-RO")}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase text-cosmic-400">
              Ora nașterii membrului 1
            </p>
            <p className="text-cosmic-100">
              {firstMemberUserInfo.birthHour.toLocaleTimeString("ro-RO", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="col-span-2">
            <p className="mb-1 text-xs uppercase text-cosmic-400">
              Locul nașterii membrului 1
            </p>
            <p className="text-cosmic-100">{firstMemberUserInfo.location}</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase text-cosmic-400">
              Data nașterii membrului 2
            </p>
            <p className="text-cosmic-100">
              {secondMemberUserInfo.birthDate.toLocaleDateString("ro-RO")}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase text-cosmic-400">
              Ora nașterii membrului 2
            </p>
            <p className="text-cosmic-100">
              {secondMemberUserInfo.birthHour.toLocaleTimeString("ro-RO", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="col-span-2">
            <p className="mb-1 text-xs uppercase text-cosmic-400">
              Locul nașterii membrului 2
            </p>
            <p className="text-cosmic-100">{secondMemberUserInfo.location}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 rounded-xl border bg-white/5 border-white/10">
        <h4 className="font-semibold text-cosmic-200">Motivul discuției</h4>
        <p className="text-sm text-cosmic-100">{bookingQuestions.notes}</p>
      </div>

      <div className="p-6 space-y-4 rounded-xl border bg-white/5 border-white/10">
        <h4 className="font-semibold text-cosmic-200">Programare</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-xs uppercase text-cosmic-400">Data</p>
            <p className="text-cosmic-100">
              {new Date(selectedSlot.time).toLocaleDateString("ro-RO", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase text-cosmic-400">Ora</p>
            <p className="text-cosmic-100">
              {new Date(selectedSlot.time).toLocaleTimeString("ro-RO", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
        >
          Pasul anterior
        </button>
        <button
          onClick={handleConfirmBooking}
          className="flex-1 px-6 py-3 font-medium text-white bg-gradient-to-r rounded-xl transition-all duration-300 cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple"
        >
          Confirmă sesiunea
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
