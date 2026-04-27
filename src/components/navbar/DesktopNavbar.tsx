import React from "react";
import {
  NavbarProps,
  getNavbarStyles,
  NavbarLogo,
  NavbarLinks,
} from "@/components/navbar/NavbarCommon";

const DesktopNavbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const { navClasses, linkClasses } = getNavbarStyles();

  return (
    <div className="hidden md:block">
      <nav className={`${navClasses} ${isScrolled ? "shadow-lg" : ""}`}>
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex justify-between items-center h-20">
            <NavbarLogo />

            <div className="flex gap-1 items-center">
              <NavbarLinks linkClasses={linkClasses} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DesktopNavbar;
