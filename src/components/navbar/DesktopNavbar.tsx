import React from 'react';
import {
  NavbarProps,
  getNavbarStyles,
  NavbarLogo,
  NavbarLinks
} from '@/components/navbar/NavbarCommon';

const DesktopNavbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const { navClasses, linkClasses } = getNavbarStyles();

  return (
    <div className="hidden md:block">
      <nav className={`${navClasses} ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <NavbarLogo />

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
