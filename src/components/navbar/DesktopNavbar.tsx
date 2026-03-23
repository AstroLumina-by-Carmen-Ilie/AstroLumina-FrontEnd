import React from 'react';
import {
  NavbarProps,
  getNavbarStyles,
  NavbarLogo,
  NavbarLinks
} from './NavbarCommon';

const DesktopNavbar: React.FC<NavbarProps> = ({ isScrolled, lightTheme = false }) => {
  const { navClasses, linkClasses, logoClasses } = getNavbarStyles(lightTheme);

  return (
    <div className="hidden md:block">
      <nav className={`${navClasses} ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <NavbarLogo logoClasses={logoClasses} />

            <div className="flex items-center gap-1">
              <NavbarLinks linkClasses={linkClasses} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DesktopNavbar;
