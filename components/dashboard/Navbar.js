"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import axios from "axios";

const Navbar = ({ title }) => {
  const [openModal, setOpenModal] = useState(false);
  const user = useSession();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const {
    data = [],
    error,
    mutate,
  } = useSWR(
    `http://localhost:3000/api/users?email=${user?.data?.user?.email}`,
    fetcher
  );

  console.log(data);

  const profile = data?.image;

  return (
    <div className="px-12 py-10 flex justify-between items-center ">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex justify-end items-center">
        <IoNotificationsOutline size={32} className="mr-8 mt-2" />
        <div className="w-12  rounded-full ">
          {profile ? (
            <Image src={profile} alt={data?.name} className="rounded-full" />
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
