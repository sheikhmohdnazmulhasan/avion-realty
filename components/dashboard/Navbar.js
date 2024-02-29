"use client";

import Image from "next/image";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const Navbar = ({ title, user }) => {
  const [openModal, setOpenModal] = useState(false);
  const profile = user?.image;

  return (
    <div className="px-12 py-10 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex justify-end items-center">
        <div className="w-12  rounded-full ">
          {profile ? (
            <Image src={profile} alt={user?.name} className="rounded-full" />
          ) : (
            <FaUserCircle size={40} />
          )}
        </div>
        <button onClick={() => setOpenModal(!openModal)} className="mt-2">
          {openModal ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
