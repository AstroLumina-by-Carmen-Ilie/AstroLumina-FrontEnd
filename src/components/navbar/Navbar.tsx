import React from 'react';
import { NavbarProps } from '@/components/navbar/NavbarCommon';
import DesktopNavbar from '@/components/navbar/DesktopNavbar';
import MobileNavbar from '@/components/navbar/MobileNavbar';

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  return (
    <>
      <DesktopNavbar isScrolled={isScrolled} />
      <MobileNavbar isScrolled={isScrolled} />
    </>
  );
};

export default Navbar;
