import { Link } from 'react-router-dom';

export interface NavbarProps {
  isScrolled: boolean;
  lightTheme?: boolean;
}

export const getNavbarStyles = (lightTheme: boolean) => {
  return {
    navClasses: lightTheme
      ? `fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-md`
      : `fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md`,

    linkClasses: lightTheme
      ? "text-gray-800 hover:text-amber-600 px-4 py-3 rounded-md text-lg font-semibold transition-colors"
      : "text-white hover:text-yellow-200 px-4 py-3 rounded-md text-lg font-semibold transition-colors",

    mobileLinkClasses: lightTheme
      ? "text-gray-800 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-semibold transition-colors"
      : "text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-semibold transition-colors",

    logoClasses: lightTheme
      ? "text-xl font-bold text-gray-800 hover:text-amber-600 transition-colors"
      : "text-xl font-bold text-white hover:text-yellow-200 transition-colors",
  };
};

export const NavbarLogo: React.FC<{ logoClasses: string }> = ({ logoClasses }) => (
  <div className="flex-shrink-0 flex items-center justify-center">
    <Link to="/" className="flex items-center">
      <span className={logoClasses}>
        <img src="/src/assets/icon/Logo_Transparent_Wide.png" alt="AstroLumina" className="h-auto w-auto max-h-[130px]" />
      </span>
    </Link>
  </div>
);

export const NavbarLinks: React.FC<{ linkClasses: string }> = ({ linkClasses }) => {
  return (
    <>
      <Link to="/servicii" className={linkClasses}>
        Servicii
      </Link>
      <Link to="/evenimente" className={linkClasses}>
        Evenimente
      </Link>
      <Link to="/produse" className={linkClasses}>
        Produse
      </Link>
      <Link to="/despre-mine" className={linkClasses}>
        Despre mine
      </Link>
      <Link to="/contact" className={linkClasses}>
        Contact
      </Link>
    </>
  );
};
