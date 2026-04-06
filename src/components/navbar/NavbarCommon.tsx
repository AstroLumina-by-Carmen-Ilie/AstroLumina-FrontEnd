import { Link } from 'react-router-dom';

export interface NavbarProps {
  isScrolled: boolean;
}

export const getNavbarStyles = () => {
  return {
    navClasses: "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-midnight-950/80 backdrop-blur-xl border-b border-white/5",
    linkClasses: "text-cosmic-200 hover:text-white px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 hover:bg-white/10 cursor-pointer",
    mobileLinkClasses: "text-cosmic-200 hover:text-white block px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:bg-white/10 cursor-pointer",
    logoClasses: "font-display text-xl font-bold text-white hover:text-cosmic-300 transition-colors",
  };
};

export const NavbarLogo: React.FC = () => (
  <div className="flex-shrink-0 flex items-center">
    <Link to="/" className="flex items-center cursor-pointer">
      <img
        src="https://pub-3a468a81beab43daa28dba00d60409d6.r2.dev/logo/Banner.png"
        alt="AstroLumina"
        className="h-14 w-auto"
      />
    </Link>
  </div>
);

export const NavbarLinks: React.FC<{ linkClasses: string }> = ({ linkClasses }) => {
  return (
    <>
      {/* <Link to="/servicii" className={linkClasses}>
        Servicii
      </Link>
      <Link to="/produse" className={linkClasses}>
        Produse
      </Link>
      <Link to="/evenimente" className={linkClasses}>
        Evenimente
      </Link>
      <Link to="/despre-mine" className={linkClasses}>
        Despre mine
      </Link>
      <Link to="/contact" className={linkClasses}>
        Contact
      </Link> */}
    </>
  );
};
