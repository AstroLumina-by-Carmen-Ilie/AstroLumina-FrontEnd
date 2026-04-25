import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import { useEventSeats } from "@/hooks/useEventSeats";
import { CONSTELLATION_EVENTS } from "@/data/events";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";

const Events = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { seatsCache, loading, fetchSeatsForEvents } = useEventSeats();

  useEffect(() => {
    const eventIds = CONSTELLATION_EVENTS.map((e) => e.id);
    fetchSeatsForEvents(eventIds);
  }, [fetchSeatsForEvents]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsScrolled]);

  const now = new Date();
  const upcomingEvents = CONSTELLATION_EVENTS.filter(
    (event) => event.date >= now,
  );

  if (loading) {
    return (
      <div className="min-h-screen text-white bg-midnight-950">
        <div className="flex justify-center items-center pt-48">
          <LoadingAnimation />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pt-24 pb-16">
        <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] top-0 right-0 opacity-20"></div>

        <div className="relative z-10 px-6 mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display md:text-5xl from-cosmic-300 to-gold-400">
              Evenimente Astrologice
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-cosmic-300">
              Workshopuri și sesiuni de grup pentru explorarea energiilor
              cosmice
            </p>
          </div>

          <div className="grid gap-8">
            {upcomingEvents.map((event) => {
              const seatInfo = seatsCache[event.id];
              const availableSeats = seatInfo?.availableSeats;
              const eventFull = availableSeats && availableSeats <= 0;

              return (
                <div
                  key={event.id}
                  className="glass-card overflow-hidden hover:bg-white/[0.1] transition-all duration-300 group"
                >
                  <div className="p-8">
                    <div className="flex flex-col gap-4 justify-between items-start mb-6 md:flex-row md:items-center">
                      <div className="flex gap-4 items-center">
                        <div className="flex justify-center items-center w-12 h-12 rounded-xl transition-colors bg-cosmic-500/20 text-cosmic-400 group-hover:bg-cosmic-500/30">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-white transition-colors font-display group-hover:text-cosmic-300">
                          {event.title}
                        </h2>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="flex gap-2 items-center text-sm text-cosmic-300">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex gap-2 items-center text-sm text-cosmic-300">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="text-lg font-semibold text-gold-400">
                          {event.price} €
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center mb-6 text-sm text-cosmic-300">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {event.date.toLocaleDateString("ro-RO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <p className="mb-6 leading-relaxed text-cosmic-200/80">
                      {event.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-cosmic-400">
                        Ce include
                      </h3>
                      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {event.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 items-start text-sm text-cosmic-200/70"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-cosmic-500 mt-1.5 flex-shrink-0"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-4 items-center">
                      <button
                        onClick={() =>
                          navigate(`/evenimente/rezervare/${event.id}`)
                        }
                        disabled={eventFull}
                        className={`inline-flex gap-2 items-center px-6 py-3 font-medium rounded-full transition-all duration-300 cursor-pointer ${
                          eventFull
                            ? "cursor-not-allowed bg-white/5 text-cosmic-400"
                            : "text-white bg-gradient-to-r from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple"
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        {eventFull ? "Lista de așteptare" : "Rezervă locul"}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      <span className="text-sm text-cosmic-400">
                        {eventFull ? (
                          <span className="text-red-400">Eveniment plin</span>
                        ) : (
                          <span>{availableSeats} locuri disponibile</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
