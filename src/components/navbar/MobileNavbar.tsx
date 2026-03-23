import React, { useState, useEffect, useRef } from 'react';
import {
  NavbarProps,
  getNavbarStyles,
  NavbarLogo,
  NavbarLinks
} from './NavbarCommon';
import { Menu, X } from 'lucide-react';

const MobileNavbar: React.FC<NavbarProps> = ({ isScrolled, lightTheme = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { mobileLinkClasses, logoClasses } = getNavbarStyles(lightTheme);

  const navClasses = lightTheme
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-xl border-b border-gray-200/50`
    : `fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-midnight-950/80 backdrop-blur-xl border-b border-white/5`;

  const buttonClasses = lightTheme
    ? "inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-cosmic-600 hover:bg-cosmic-50 transition-all cursor-pointer"
    : "inline-flex items-center justify-center p-2 rounded-lg text-cosmic-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer";

  const mobileMenuClasses = lightTheme
    ? `${isOpen ? 'animate-slide-down' : 'hidden'} md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50`
    : `${isOpen ? 'animate-slide-down' : 'hidden'} md:hidden bg-midnight-950/95 backdrop-blur-xl border-t border-white/5`;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <nav className={`${navClasses} ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <NavbarLogo logoClasses={logoClasses} />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={buttonClasses}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Închide meniul' : 'Deschide meniul'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div ref={navbarRef} className={mobileMenuClasses}>
          <div className="px-4 py-3 space-y-1">
            <NavbarLinks linkClasses={mobileLinkClasses} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavbar;
