import React from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Star, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <div className="flex overflow-hidden relative justify-center items-center min-h-screen">
        <div className="cosmic-orb cosmic-orb-purple w-[500px] h-[500px] -top-40 -right-40 opacity-15"></div>
        <div className="cosmic-orb cosmic-orb-gold w-[400px] h-[400px] bottom-40 -left-40 opacity-10"></div>

        <div className="relative z-10 px-6 mx-auto text-center">
          <div className="mb-10">
            <div className="inline-block relative mb-8">
              <Moon className="w-20 h-20 text-cosmic-400" />
              <Star className="absolute right-0 top-2 w-4 h-4 animate-pulse text-gold-400" />
              <Star
                className="absolute left-0 bottom-2 w-5 h-5 animate-pulse text-gold-400"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <h1 className="mb-4 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white font-display via-cosmic-100 to-cosmic-200">
              404
            </h1>
            <h2 className="mb-4 text-2xl font-semibold text-white font-display">
              Pagină Negăsită
            </h2>
            <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-cosmic-200/70">
              Stelele s-au aliniat, dar această pagină pare să fie în altă
              constelație.
            </p>

            <button
              onClick={() => navigate("/")}
              className="inline-flex gap-2 items-center px-8 py-4 font-semibold text-white bg-gradient-to-r rounded-full luxury-button from-cosmic-600 via-cosmic-500 to-cosmic-600 hover:from-cosmic-500 hover:to-cosmic-500 shadow-luxury-purple"
            >
              <ArrowLeft className="w-5 h-5" />
              Înapoi acasă
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
