"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const Navbar = ({ title, user }) => {
  const [openModal, setOpenModal] = useState(false);
  const profile = user?.image;

  return (
    <div className="px-12 py-10 flex justify-between items-center ">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex justify-end items-center">
        <div className="w-12  rounded-full ">
          {profile ? (
            <Image src={profile} alt={user?.name} className="rounded-full" />
          ) : (
            <FaUserCircle size={40} />
          )}
        </div>
        <button
          onClick={() => setOpenModal(!openModal)}
          className="mt-2 relative"
        >
          {openModal ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />}
        </button>
        {openModal && (
          <div className="bg-[#0A0909] border border-[#3b2d0c] p-8 font-semibold absolute top-24">
            <ul className="space-y-3">
              <li>
                <Link href="/" className="flex gap-3 items-center">
                  <FaRegUser className=" text-[#E4B649]" size={20} />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="flex gap-3 items-center">
                  <MdLogout className=" text-[#E4B649]" size={24} />
                  <span>Log Out</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
