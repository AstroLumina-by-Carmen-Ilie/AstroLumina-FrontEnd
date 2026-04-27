import { useState, useEffect, useRef } from "react";
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
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
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

      <div className="relative pt-28 pb-20">
        <div className="cosmic-orb cosmic-orb-purple w-[500px] h-[500px] top-0 right-0 opacity-15"></div>
        <div className="cosmic-orb cosmic-orb-gold w-[400px] h-[400px] bottom-0 left-0 opacity-10"></div>

        <div className="relative z-10 px-6 mx-auto max-w-6xl">
          <div className="mb-20 text-center">
            <h1 className="mb-5 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white font-display md:text-5xl via-cosmic-100 to-cosmic-200">
              Evenimente Astrologice
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-cosmic-300/70">
              Workshopuri și sesiuni de grup pentru explorarea energiilor
              cosmice
            </p>
          </div>

          <div className="grid gap-8">
            {upcomingEvents.map((event) => {
              const seatInfo = seatsCache[event.id];
              const availableSeats = seatInfo?.availableSeats;
              const eventFull =
                availableSeats !== undefined ? availableSeats <= 0 : false;

              return (
                <div
                  key={event.id}
                  className="overflow-hidden glass-luxury-hover group"
                >
                  <div className="p-10">
                    <div className="flex flex-col gap-6 justify-between items-start mb-8 md:flex-row md:items-center">
                      <div className="flex gap-5 items-center">
                        <div className="flex justify-center items-center w-14 h-14 bg-gradient-to-br rounded-2xl transition-all duration-500 from-cosmic-500/30 to-gold-500/20 text-cosmic-400 group-hover:scale-110">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-white transition-colors font-display group-hover:text-gold-300 duration-400">
                          {event.title}
                        </h2>
                      </div>
                      <div className="flex gap-6 items-center">
                        <div className="flex gap-2 items-center text-base text-cosmic-300/70">
                          <Clock className="w-4 h-4 text-gold-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex gap-2 items-center text-base text-cosmic-300/70">
                          <MapPin className="w-4 h-4 text-gold-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="text-lg font-semibold text-gold-400">
                          {event.price} €
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 items-center mb-8 text-base text-cosmic-300/70">
                      <Calendar className="w-5 h-5 text-gold-400" />
                      <span>
                        {event.date.toLocaleDateString("ro-RO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <p className="mb-8 text-lg leading-relaxed text-cosmic-200/70">
                      {event.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="mb-5 text-sm font-semibold tracking-wider uppercase text-gold-400/70">
                        Ce include
                      </h3>
                      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {event.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 items-start text-base text-cosmic-200/70"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-6 items-center">
                      <button
                        onClick={() =>
                          navigate(`/evenimente/rezervare/${event.id}`)
                        }
                        disabled={eventFull}
                        className={`luxury-button group inline-flex gap-3 items-center px-8 py-4 font-semibold rounded-full transition-all duration-300 ${
                          eventFull
                            ? "cursor-not-allowed bg-white/5 text-cosmic-400"
                            : "text-white bg-gradient-to-r from-cosmic-600 via-cosmic-500 to-cosmic-600 hover:from-cosmic-500 hover:to-cosmic-500 shadow-luxury-purple"
                        }`}
                      >
                        <Users className="w-5 h-5" />
                        <span>
                          {eventFull ? "Lista de așteptare" : "Rezervă locul"}
                        </span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-400 group-hover:translate-x-1.5" />
                      </button>
                      <span className="text-base text-cosmic-400">
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
