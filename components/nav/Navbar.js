"use client";
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/logo.svg";
import icon from "@/public/images/icon.svg";
import whatsapp from "@/public/images/whatsapp.svg";
import Dropdown from "./Dropdown";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import Headroom from "react-headroom";

const Navbar = () => {
  const [openMedia, setOpenMedia] = useState(false);
  const [openFollow, setOpenFollow] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [isActive, setIsActive] = useState("");

  return (
    <>
      <Headroom className="">
        <nav className="px-8 lg:px-16 py-4 bg-[#101010] hidden md:block">
          <div className="flex justify-between items-center text-[#E8BF44]">
            {/* logo image */}
            <Link href="/" onClick={() => setIsActive("")}>
              <Image
                src={logo}
                alt="avion realty"
                className="hidden lg:block"
              />
              <Image src={icon} alt="avion realty" className="lg:hidden" />
            </Link>
            {/* nav links */}
            <ul className="uppercase flex text-xs gap-4 lg:gap-6">
              <li
                className={`hover:scale-105 transition-all hover:font-bold ${
                  isActive === "Ready" && "scale-105 font-bold"
                }`}
                onClick={() => setIsActive("Ready")}
              >
                <Link href="/listing/Ready">Ready</Link>
              </li>
              <li
                className={`hover:scale-105 transition-all hover:font-bold ${
                  isActive === "Off-Plan" && "scale-105 font-bold"
                }`}
                onClick={() => setIsActive(`Off-Plan`)}
              >
                <Link href="/listing/Off-Plan">Off-Plan</Link>
              </li>
              <li
                className={`hover:scale-105 transition-all hover:font-bold ${
                  isActive === "Rent" && "scale-105 font-bold"
                }`}
                onClick={() => setIsActive("Rent")}
              >
                <Link href="/listing/Rent">Rent</Link>
              </li>
              <li
                className={`hover:scale-105 transition-all hover:font-bold ${
                  isActive === "Buy" && "scale-105 font-bold"
                }`}
                onClick={() => setIsActive("Buy")}
              >
                <Link href="/listing/Ready">Buy</Link>
              </li>
              <li
                className={`hover:scale-105 transition-all hover:font-bold ${
                  isActive === "About" && "scale-105 font-bold"
                }`}
                onClick={() => setIsActive("About")}
              >
                <Link href="/about">About Us</Link>
              </li>
              <li
                className={`hover:scale-105 transition-all hover:font-bold ${
                  isActive === "Contact" && "scale-105 font-bold"
                }`}
                onClick={() => setIsActive("Contact")}
              >
                <Link href="/contact">Contact</Link>
              </li>
              <li
                className={`hover:scale-105 transition-all hover:font-bold relative `}
              >
                <button onMouseEnter={() => setOpenMedia(true)}>Media</button>
                {openMedia && (
                  <ul
                    className="capitalize absolute top-10 z-20 bg-black text-white w-32 space-y-2 px-4 py-3 "
                    onMouseLeave={() => setOpenMedia(false)}
                  >
                    <li>
                      <Link href="/blogs" className="hover:text-[#E8BF44]">
                        News & Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/podcasts" className="hover:text-[#E8BF44]">
                        Podcast
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* <li onClick={() => signOut({ redirect: false })}>
              <Link href="/">Sign Out</Link>
            </li> */}
            </ul>
            {/* social contact */}
            <ul className="flex gap-6 items-center">
              <li className="uppercase text-xs flex gap-4 items-center relative">
                <button onMouseEnter={() => setOpenFollow(true)}>
                  Follow Us
                </button>
                {/* <span className="cursor-pointer">Follow Us</span> */}
                <Dropdown
                  openFollow={openFollow}
                  setOpenFollow={setOpenFollow}
                />
              </li>
              <li className="w-5 hover:cursor-pointer hover:scale-110 transition-all">
                <Link href="https://wa.me/+971504597167" target="_blank">
                  <Image
                    src={whatsapp}
                    alt="avion realty whatsapp"
                    size="16px"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Headroom>

      {/* moble devices */}
      <nav className="md:hidden">
        <MobileMenu />
      </nav>
    </>
  );
};

export default Navbar;
