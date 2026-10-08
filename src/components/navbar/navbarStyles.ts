export const getNavbarStyles = () => {
  return {
    navClasses:
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury bg-midnight-950/80 backdrop-blur-2xl border-b border-white/5 hover:bg-midnight-950/90",
    linkClasses:
      "relative text-cosmic-200 hover:text-white px-5 py-2.5 rounded-lg text-base font-medium transition-all duration-400 ease-luxury cursor-pointer group overflow-hidden",
    mobileLinkClasses:
      "text-cosmic-200 hover:text-white block px-5 py-3 rounded-lg text-lg font-medium transition-all duration-400 ease-luxury cursor-pointer",
    logoClasses:
      "font-display text-xl font-bold text-white hover:text-gold-400 transition-all duration-400 ease-luxury cursor-pointer",
  };
};
