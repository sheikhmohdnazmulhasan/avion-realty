"use client";

import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

import icon from "@/public/images/icon.svg";
import whatsapp from "@/public/images/whatsapp.svg";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between px-4 py-4 items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? "hidden" : "block"}
      >
        <LuMenu color="#E8BF44" size="24px" />
      </button>

      <Link href="" className="w-10">
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
  );
};

export default MobileMenu;
