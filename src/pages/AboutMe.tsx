import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useLoading } from "@/hooks/useLoading";
import { Sparkles, Star, Compass } from "lucide-react";

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsScrolled]);

  return (
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={isScrolled} />

      <div className="relative pb-20 overflow-x-hidden pt-28">
        <div className="cosmic-orb cosmic-orb-purple w-[500px] h-[500px] -top-40 -right-40 opacity-15"></div>
        <div className="cosmic-orb cosmic-orb-gold w-[400px] h-[400px] bottom-40 -left-40 opacity-10"></div>

        <div className="relative z-10 max-w-4xl px-6 mx-auto">
          <div className="mb-20 text-center">
            <div className="relative inline-block mb-8">
              <div className="flex items-center justify-center w-40 h-40 mx-auto transition-transform duration-500 border-2 rounded-full bg-gradient-to-br from-cosmic-500/30 to-gold-500/30 border-white/10 group-hover:scale-105">
                <Sparkles className="w-10 h-10 text-cosmic-400/50" />
              </div>
              <div className="absolute flex items-center justify-center w-12 h-12 border rounded-full -bottom-2 -right-2 bg-gradient-to-br from-gold-500/30 to-cosmic-500/30 border-white/10">
                <Star className="w-5 h-5 text-gold-400" />
              </div>
            </div>

            <p className="mb-4 text-sm font-medium tracking-[0.25em] uppercase text-gold-400/70 font-display">
              Astrolog & Consultant Spiritual
            </p>
            <h1 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display md:text-5xl from-white via-cosmic-100 to-cosmic-200">
              Carmen Ilie
            </h1>
            <blockquote className="mt-6 text-lg italic text-cosmic-300/60 font-display">
              "Călătoria este scopul, nu destinația"
            </blockquote>
          </div>

          <div className="space-y-8">
            <div className="p-10 glass-luxury-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cosmic-500/30 to-gold-500/20 text-cosmic-400">
                  <Star className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">
                  Despre mine
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-cosmic-200/70">
                Pasionată de misterele cerului și de înțelepciunea antică a
                stelelor, am descoperit astrologia ca un instrument puternic
                pentru autocunoaștere și ghidare. Cu ani de studiu și practică,
                ofer interpretări profunde și personalizate care ajută oamenii
                să-și înțeleagă mai bine drumul în viață.
              </p>
            </div>

            <div className="p-10 glass-luxury-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/30 to-cosmic-500/20 text-gold-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">
                  Cum am ales astrologia
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-cosmic-200/70">
                Drumul meu spre astrologie a fost unul natural, ghidat de
                curiozitate și de nevoia de a înțelege mai profund conexiunile
                dintre cosmos și viața noastră de zi cu zi. Am studiat diverse
                ramuri ale astrologiei — de la cea natală și karmică, la
                tranzituri și sinastrie — și am dezvoltat o abordare holistică
                care combină tradiția cu perspectiva modernă.
              </p>
            </div>

            <div className="p-10 glass-luxury-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cosmic-500/30 to-gold-500/20 text-cosmic-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">
                  Planuri viitoare
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-cosmic-200/70">
                Îmi doresc să fac astrologia accesibilă tuturor, oferind
                servicii care combină profunzimea interpretărilor tradiționale
                cu instrumentele moderne. De la hărți natale și karmice
                personalizate, la workshopuri interactive și ghiduri digitale,
                scopul meu este să te ajut să-ți descoperi potențialul cosmic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
