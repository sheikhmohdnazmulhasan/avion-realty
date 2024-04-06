"use client"
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/logo.svg";
import icon from "@/public/images/icon.svg";
import whatsapp from "@/public/images/whatsapp.svg";
import Dropdown from "./Dropdown";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

const Navbar = () => {

  const [openMedia, setOpenMedia] = useState(false);

  return (
    <>
      <nav className="px-8 lg:px-16 py-4 bg-[#101010] hidden md:block">
        <div className="flex justify-between items-center text-[#E8BF44]">
          {/* logo image */}
          <Link href="/">
            <Image src={logo} alt="avion realty" className="hidden lg:block" />
            <Image src={icon} alt="avion realty" className="lg:hidden" />
          </Link>
          {/* nav links */}
          <ul className="uppercase flex text-xs gap-4 lg:gap-6">
            <li>
              <Link href="/listing/Ready">Ready</Link>
            </li>
            <li>
              <Link href="/listing/Off-Plan">Off-Plan</Link>
            </li>
            <li>
              <Link href="/listing/Rent">Rent</Link>
            </li>
            <li>
              <Link href="/listing/Ready">Buy</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li className="relative">
              <button onClick={()=>setOpenMedia(!openMedia)}>Media</button>
              {
                openMedia && <ul className="capitalize absolute top-10 z-20 bg-black text-white w-32 space-y-2 px-4 py-3 ">
                  <li>
                    <Link href="/blogs">News & Blog</Link>
                  </li>
                  <li>
                    <Link href='/podcasts'>Podcast</Link>
                  </li>
                </ul>
              }
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
