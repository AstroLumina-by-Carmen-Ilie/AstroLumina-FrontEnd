import React from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Star, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center p-6 min-h-screen bg-midnight-950">
      <div className="w-full max-w-md text-center">
        <div className="relative mb-8">
          <Moon className="mx-auto w-20 h-20 text-cosmic-400" />
          <Star className="absolute top-4 right-1/3 w-4 h-4 animate-pulse text-gold-400" />
          <Star
            className="absolute bottom-4 left-1/3 w-5 h-5 animate-pulse text-gold-400"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <h1 className="mb-4 text-6xl font-bold font-display text-cosmic-400">
          404
        </h1>
        <h2 className="mb-3 text-xl font-semibold text-white font-display">
          Pagină Negăsită
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-cosmic-300/70">
          Stelele s-au aliniat, dar această pagină pare să fie în altă
          constelație.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex gap-2 items-center px-6 py-3 font-medium text-white bg-gradient-to-r rounded-full transition-all duration-300 cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi acasă
        </button>
      </div>
    </div>
  );
};

export default NotFound;
