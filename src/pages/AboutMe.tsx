import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar/Navbar';
import { useLoading } from '@/hooks/useLoading';
import { Sparkles, Star, Compass } from 'lucide-react';

const AboutMe = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => stopLoading(), 1500);
    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pt-24 pb-16 overflow-x-hidden">
        <div className="cosmic-orb cosmic-orb-purple w-[400px] h-[400px] -top-20 -right-20 opacity-20"></div>
        <div className="cosmic-orb cosmic-orb-gold w-[300px] h-[300px] bottom-20 -left-20 opacity-15"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            {/* Photo placeholder */}
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-cosmic-500/30 to-gold-500/30 border-2 border-white/10 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-cosmic-400/50" />
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 to-gold-400 bg-clip-text text-transparent">
              Carmen Ilie
            </h1>
            <p className="font-display text-lg italic text-cosmic-300 mb-2">
              Astrolog & Consultant Spiritual
            </p>
            <blockquote className="text-cosmic-200/60 italic text-base mt-4">
              "Călătoria este scopul, nu destinația"
            </blockquote>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cosmic-500/20 flex items-center justify-center text-cosmic-400">
                  <Star className="w-5 h-5" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white">Despre mine</h2>
              </div>
              <p className="text-cosmic-200/80 leading-relaxed">
                Pasionată de misterele cerului și de înțelepciunea antică a stelelor, am descoperit astrologia
                ca un instrument puternic pentru autocunoaștere și ghidare. Cu ani de studiu și practică,
                ofer interpretări profunde și personalizate care ajută oamenii să-și înțeleagă mai bine
                drumul în viață.
              </p>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white">Cum am ales astrologia</h2>
              </div>
              <p className="text-cosmic-200/80 leading-relaxed">
                Drumul meu spre astrologie a fost unul natural, ghidat de curiozitate și de nevoia de a
                înțelege mai profund conexiunile dintre cosmos și viața noastră de zi cu zi. Am studiat
                diverse ramuri ale astrologiei — de la cea natală și karmică, la tranzituri și sinastrie —
                și am dezvoltat o abordare holistică care combină tradiția cu perspectiva modernă.
              </p>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cosmic-500/20 flex items-center justify-center text-cosmic-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white">Planuri viitoare</h2>
              </div>
              <p className="text-cosmic-200/80 leading-relaxed">
                Îmi doresc să fac astrologia accesibilă tuturor, oferind servicii care combină profunzimea
                interpretărilor tradiționale cu instrumentele moderne. De la hărți natale și karmice
                personalizate, la workshopuri interactive și ghiduri digitale, scopul meu este să te ajut
                să-ți descoperi potențialul cosmic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
