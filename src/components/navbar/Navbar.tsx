import React from 'react';
import { NavbarProps } from './NavbarCommon';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  return (
    <>
      <DesktopNavbar isScrolled={isScrolled} />
      <MobileNavbar isScrolled={isScrolled} />
    </>
  );
};

export default Navbar;
