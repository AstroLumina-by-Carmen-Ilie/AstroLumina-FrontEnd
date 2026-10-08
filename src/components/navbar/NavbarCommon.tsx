import { Link } from "react-router-dom";
import { R2_BASE_URL } from "@/config";

export interface NavbarProps {
  isScrolled: boolean;
}

const R2_LOGO_URL = R2_BASE_URL + "/logo";

export const NavbarLogo: React.FC = () => (
  <div className="flex items-center shrink-0">
    <Link to="/" className="flex items-center cursor-pointer group">
      <img
        src={`${R2_LOGO_URL}/Banner.png`}
        alt="AstroLumina"
        className="w-auto h-12 transition-transform duration-500 group-hover:scale-105"
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
        <span className="absolute inset-0 transition-opacity opacity-0 bg-linear-to-r from-cosmic-500/20 to-gold-500/20 group-hover:opacity-100 duration-400"></span>
      </Link>
      <Link to="/produse" className={linkClasses}>
        <span className="relative z-10">Produse</span>
        <span className="absolute inset-0 transition-opacity opacity-0 bg-linear-to-r from-cosmic-500/20 to-gold-500/20 group-hover:opacity-100 duration-400"></span>
      </Link>
      <Link to="/evenimente" className={linkClasses}>
        <span className="relative z-10">Evenimente</span>
        <span className="absolute inset-0 transition-opacity opacity-0 bg-linear-to-r from-cosmic-500/20 to-gold-500/20 group-hover:opacity-100 duration-400"></span>
      </Link>
      <Link to="/despre-mine" className={linkClasses}>
        <span className="relative z-10">Despre mine</span>
        <span className="absolute inset-0 transition-opacity opacity-0 bg-linear-to-r from-cosmic-500/20 to-gold-500/20 group-hover:opacity-100 duration-400"></span>
      </Link>
      <Link to="/contact" className={linkClasses}>
        <span className="relative z-10">Contact</span>
        <span className="absolute inset-0 transition-opacity opacity-0 bg-linear-to-r from-cosmic-500/20 to-gold-500/20 group-hover:opacity-100 duration-400"></span>
      </Link>
    </>
  );
};
