"use client";

import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { FaChevronDown, FaChevronRight, FaFacebookF, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

import icon from "@/public/images/icon.svg";
import whatsapp from "@/public/images/whatsapp.svg";
import home from "@/public/images/home.svg";
import contact from "@/public/images/contact.svg";
import search from "@/public/images/search.svg";

import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);

  return (
    <div className="h-screen absolute w-full">
      <div className={`flex justify-between px-4 py-4 items-center ${isOpen && 'bg-black'}` }>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={isOpen ? "hidden" : "block"}
        >
          <LuMenu color="#E8BF44" size="24px" />
        </button>

        <Link href="/" className="w-10">
          <Image src={icon} alt="avion realty" />
        </Link>

        {isOpen ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            <RxCross2 size="24px" />
          </button>
        ) : (
          <Link href="" className="w-6">
            <Image src={whatsapp} alt="avion realty whatsapp" />
          </Link>
        )}
      </div>
      {isOpen && (
        <div className="px-3 h-screen absolute w-full z-10 bg-black font-extralight">
          <ul className="grid grid-cols-3 gap-2 ">
            <li className=" bg-[#0E0E0E] rounded-md">
              <Link
                href="/"
                className="flex gap-1 flex-col justify-center text-xs py-2 text-center"
              >
                <span className="w-4 mx-auto">
                  <Image src={home} alt="home" />
                </span>
                <span>Home</span>
              </Link>
            </li>
            <li className=" bg-[#0E0E0E] rounded-md">
              <Link
                href="/contact"
                className="flex gap-1 flex-col justify-center text-xs py-2 text-center"
              >
                <span className="w-4 mx-auto">
                  <Image src={contact} alt="contact" />
                </span>
                <span>Contact Us</span>
              </Link>
            </li>
            <li className=" bg-[#0E0E0E] rounded-md">
              <Link
                href="/"
                className="flex gap-1 flex-col justify-center text-xs py-2 text-center"
              >
                <span className="w-4 mx-auto">
                  <Image src={search} alt="search icon" />
                </span>
                <span>Search Property</span>
              </Link>
            </li>
          </ul>

          <ul className="uppercase mt-6 text-xs space-y-3 ">
            <li>
              <Link
                href="/listing/Ready"
                className="bg-[#0E0E0E] flex items-center justify-between p-3 rounded-md"
              >
                <span>Buy</span>
                <FaChevronRight />
              </Link>
            </li>
            <li>
              <Link
                href="/listing/Off-Plan"
                className="bg-[#0E0E0E] flex items-center justify-between p-3 rounded-md"
              >
                <span>Off-Plan</span>
                <FaChevronRight />
              </Link>
            </li>
            <li>
              <Link
                href="/listing/Ready"
                className="bg-[#0E0E0E] flex items-center justify-between p-3 rounded-md"
              >
                <span>Ready</span>
                <FaChevronRight />
              </Link>
            </li>
            <li>
              <Link
                href="/listing/Rent"
                className="bg-[#0E0E0E] flex items-center justify-between p-3 rounded-md"
              >
                <span>Rent</span>
                <FaChevronRight />
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="bg-[#0E0E0E] flex items-center justify-between p-3 rounded-md"
              >
                <span>About Us</span>
                <FaChevronRight />
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="bg-[#0E0E0E] flex items-center justify-between p-3 rounded-md"
              >
                <span>Contact Us</span>
                <FaChevronRight />
              </Link>
            </li>
            <button onClick={()=>setOpenMedia(!openMedia)} className="relative bg-[#0E0E0E] w-full flex items-center justify-between p-3 rounded-md">
              <span>Media</span>
              {
                openMedia && <ul className="capitalize absolute top-10 right-2  z-20 space-y-2 px-4 py-3 bg-[#0E0E0E]">
                  <li>
                    <Link href="/blogs">News & Blog</Link>
                  </li>
                  <li>
                    <Link href='/podcasts'>Podcast</Link>
                  </li>
                </ul>
              }
              {
                openMedia ? <FaChevronDown /> : <FaChevronRight />
              }
            </button>
            

            {/* social */}
      <ul className="text-xl px-4 pt-4 flex justify-between">
          
          <li>
            <Link href="/">
              <FaInstagram color="#E8BF44" />
            </Link>
          </li>
          <li>
            <Link href="/">
              <FaXTwitter color="#E8BF44" />
            </Link>
          </li>
          <li>
            <Link href="/">
              <FaLinkedin color="#E8BF44" />
            </Link>
          </li>
          <li>
            <Link href="/">
              <FaFacebookF color="#E8BF44" />
            </Link>
          </li>
          
        </ul>
          </ul>
        </div>
      )}

      
    </div>
  );
};

export default MobileMenu;
