import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Mail, ArrowRight } from "lucide-react";
import { useEventSeats } from "@/hooks/useEventSeats";
import { ConstellationEvent } from "@/data/events";

interface TicketHolder {
  fullName: string;
  email?: string;
  phone?: string;
}

interface BookingConfirmationProps {
  event?: ConstellationEvent;
  ticketCount: number;
  ticketHolders: TicketHolder[];
  paymentIntentId: string;
  onBack?: () => void;
  onComplete: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  event,
  ticketCount,
  ticketHolders,
  paymentIntentId,
  onBack,
  onComplete,
}) => {
  const navigate = useNavigate();
  const { bookSeats, fetchSeats } = useEventSeats();
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(true);

  const eventId = event?.id || "";

  useEffect(() => {
    const confirmBooking = async () => {
      try {
        // Filter out holders without name and use their individual email/phone
        const holders = ticketHolders.filter((h) => h.fullName.trim());

        const success = await bookSeats(
          eventId,
          holders,
          ticketCount,
          paymentIntentId,
          event?.title,
          event?.date?.toISOString()
        );
        if (success) {
          setEmailSent(true);
          await fetchSeats(eventId);
        }
      } catch (error) {
        console.error("Failed to confirm booking:", error);
        setEmailError(
          "Notificările nu au putut fi trimise, dar rezervarea a fost confirmată."
        );
      } finally {
        setIsConfirming(false);
      }
    };

    confirmBooking();
  }, [eventId, ticketCount, ticketHolders, paymentIntentId, bookSeats, fetchSeats, event]);

  if (isConfirming) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block">
          <div className="w-12 h-12 rounded-full border-4 animate-spin border-cosmic-600 border-t-cosmic-300"></div>
        </div>
        <p className="mt-4 text-cosmic-200">Se confirmă rezervarea...</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-center glass-card">
      <div className="flex justify-center items-center mx-auto mb-6 w-16 h-16 rounded-full bg-emerald-500/20">
        <CheckCircle className="w-8 h-8 text-emerald-400" />
      </div>

      <h1 className="mb-4 text-2xl font-bold text-white font-display">
        Rezervare confirmată!
      </h1>

      <p className="mb-6 text-cosmic-300">
        {ticketCount} bilet(e) rezervat(e) pentru{" "}
        {event?.title || "Constelații"}
      </p>

      <div className="p-4 mb-8 text-left rounded-lg bg-white/5">
        <h3 className="mb-3 font-semibold text-white">Detalii rezervare:</h3>
        <ul className="space-y-2 text-sm text-cosmic-300">
          <li>Eveniment: {event?.title}</li>
          <li>
            Data:{" "}
            {event?.date.toLocaleDateString("ro-RO", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            - {event?.time}
          </li>
          <li>Număr bilete: {ticketCount}</li>
          <li>Total: {ticketCount * (event?.price || 70)} €</li>
        </ul>
      </div>

      <div className="mb-6 text-sm text-cosmic-300">
        {emailSent ? (
          <p className="flex gap-2 justify-center items-center text-emerald-400">
            <Mail className="w-4 h-4" />
            Un email cu detaliile evenimentului a fost trimis
          </p>
        ) : emailError ? (
          <p className="text-yellow-400">{emailError}</p>
        ) : (
          <p>Se trimit notificări...</p>
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={onComplete}
          className="py-3 w-full font-medium text-white bg-gradient-to-r rounded-xl transition-all cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400"
        >
          Înapoi la pagina principală
          <ArrowRight className="inline ml-2 w-4 h-4" />
        </button>

        {onBack && (
          <button
            onClick={() => navigate("/events")}
            className="py-3 w-full rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
          >
            Vezi toate evenimentele
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmation;