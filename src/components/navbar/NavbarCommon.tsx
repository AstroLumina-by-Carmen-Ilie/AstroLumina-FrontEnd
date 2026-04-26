import { Link } from "react-router-dom";

export interface NavbarProps {
  isScrolled: boolean;
}

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

export const NavbarLogo: React.FC = () => (
  <div className="flex flex-shrink-0 items-center">
    <Link to="/" className="flex items-center cursor-pointer group">
      <img
        src="https://pub-3a468a81beab43daa28dba00d60409d6.r2.dev/logo/Banner.png"
        alt="AstroLumina"
        className="h-12 w-auto transition-transform duration-500 group-hover:scale-105"
      />
    </Link>
  </div>
);

export const NavbarLinks: React.FC<{ linkClasses: string }> = ({
  linkClasses,
}) => {
  return (
    <>
      <Link to="/servicii" className={linkClasses}>
        <span className="relative z-10">Servicii</span>
        <span className="absolute inset-0 bg-gradient-to-r from-cosmic-500/20 to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
      </Link>
      <Link to="/produse" className={linkClasses}>
        <span className="relative z-10">Produse</span>
        <span className="absolute inset-0 bg-gradient-to-r from-cosmic-500/20 to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
      </Link>
      <Link to="/evenimente" className={linkClasses}>
        <span className="relative z-10">Evenimente</span>
        <span className="absolute inset-0 bg-gradient-to-r from-cosmic-500/20 to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
      </Link>
      <Link to="/despre-mine" className={linkClasses}>
        <span className="relative z-10">Despre mine</span>
        <span className="absolute inset-0 bg-gradient-to-r from-cosmic-500/20 to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
      </Link>
      <Link to="/contact" className={linkClasses}>
        <span className="relative z-10">Contact</span>
        <span className="absolute inset-0 bg-gradient-to-r from-cosmic-500/20 to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
      </Link>
    </>
  );
};
