import React from 'react';
import {
  NavbarProps,
  getNavbarStyles,
  NavbarLogo,
  NavbarLinks
} from './NavbarCommon';

const DesktopNavbar: React.FC<NavbarProps> = ({ lightTheme = false }) => {
  const { navClasses, linkClasses, logoClasses } = getNavbarStyles(lightTheme);

  return (
    <div className="hidden md:block">
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[100px] py-4">
            <div className="flex items-center space-x-8">
              <NavbarLogo logoClasses={logoClasses} />
              
              <div className="flex items-center justify-center space-x-6">
                <NavbarLinks linkClasses={linkClasses} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DesktopNavbar;
