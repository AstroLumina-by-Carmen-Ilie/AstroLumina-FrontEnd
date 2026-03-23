import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Star, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-midnight-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <Moon className="w-20 h-20 mx-auto text-cosmic-400" />
          <Star className="w-4 h-4 text-gold-400 animate-pulse absolute top-4 right-1/3" />
          <Star className="w-5 h-5 text-gold-400 animate-pulse absolute bottom-4 left-1/3" style={{ animationDelay: '0.5s' }} />
        </div>

        <h1 className="font-display text-6xl font-bold text-cosmic-400 mb-4">404</h1>
        <h2 className="font-display text-xl font-semibold text-white mb-3">Pagină Negăsită</h2>
        <p className="text-cosmic-300/70 mb-8 text-sm leading-relaxed">
          Stelele s-au aliniat, dar această pagină pare să fie în altă constelație.
        </p>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white rounded-full font-medium hover:from-cosmic-500 hover:to-cosmic-400 transition-all duration-300 shadow-glow-purple cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi acasă
        </button>
      </div>
    </div>
  );
};

export default NotFound;
