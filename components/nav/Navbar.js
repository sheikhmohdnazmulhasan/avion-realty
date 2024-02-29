"use client"
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/logo.svg";
import icon from "@/public/images/icon.svg";
import whatsapp from "@/public/images/whatsapp.svg";
import Dropdown from "./Dropdown";
import MobileMenu from "./MobileMenu";

const Navbar = () => {

  return (
    <>
      <nav className="px-8 lg:px-16 py-4 bg-[#101010] hidden md:block">
        <div className="flex justify-between items-center text-[#E8BF44]">
          {/* logo image */}
          <div>
            <Image src={logo} alt="avion realty" className="hidden lg:block" />
            <Image src={icon} alt="avion realty" className="lg:hidden" />
          </div>
          {/* nav links */}
          <ul className="uppercase flex text-xs gap-4 lg:gap-6">
            <li>
              <Link href="/">Ready</Link>
            </li>
            <li>
              <Link href="/">Off-Plan</Link>
            </li>
            <li>
              <Link href="/">Rent</Link>
            </li>
            <li>
              <Link href="/">Buy</Link>
            </li>
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
            <li>
              <Link href="/">Media</Link>
            </li>
            {/* <li onClick={() => signOut({ redirect: false })}>
              <Link href="/">Sign Out</Link>
            </li> */}
          </ul>
          {/* social contact */}
          <ul className="flex gap-6 items-center">
            <li className="uppercase text-xs flex gap-4 items-center relative">
              <span>Follow Us</span>
              <Dropdown />
            </li>
            <li className="w-5">
              <Link href="">
                <Image src={whatsapp} alt="avion realty whatsapp" size="16px" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* moble devices */}
      <nav className="md:hidden">
        <MobileMenu />
      </nav>
    </>
  );
};

export default Navbar;
