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
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import Swal from 'sweetalert2'

const Navbar = ({ title }) => {
  const [openModal, setOpenModal] = useState(false);
  const user = useSession();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const {
    data = [],
    error,
    mutate,
  } = useSWR(
    `https://www.avionrealty.ae/api/users?email=${user?.data?.user?.email}`,
    fetcher
  );

  const profile = data?.photo;

  function handleLogOut() {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to be logged out ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!"

    }).then((result) => {
      if (result.isConfirmed) {
        signOut({ redirect: false });
      }
    });
  }

  return (
    <div className=" fixed top-0 w-full z-50 bg-[#0A0909]">
      <div className="pt-8 pb-4 flex justify-between items-center z-20  ">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="fixed right-0 px-16">
          <div className="flex justify-end items-center">
            <IoNotificationsOutline size={32} className="mr-8 mt-2" />
            <div className="w-10 rounded-full mr-2 cursor-pointer" onClick={() => setOpenModal(!openModal)}>
              {profile ? (
                <Image
                  src={profile}
                  alt={data?.name}
                  width={40}
                  height={40}
                  className="rounded-full h-10 w-10 object-cover"
                />
              ) : (
                <FaUserCircle size={40} />
              )}
            </div>
            <button onClick={() => setOpenModal(!openModal)}
              className="mt-2 relative"
            >
              {openModal ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />}
            </button>
            {openModal && (
              <div className="bg-[#0A0909] border border-[#3b2d0c] p-8 font-semibold absolute top-12">
                <ul className="space-y-3">
                  <li className="hover:scale-105 transition-all">
                    <Link href="/dashboard/profile" className="flex gap-3 items-center">
                      <FaRegUser className=" text-[#E4B649]" size={20} />
                      <span className="hover:text-[#E4B649]">My Profile</span>
                    </Link>
                  </li>
                  <li className="hover:scale-105 transition-all">
                    <div
                      className="flex gap-3 cursor-pointer items-center"
                      onClick={handleLogOut}
                    >
                      <MdLogout className=" text-[#E4B649]" size={24} />
                      <span className="hover:text-[#E4B649]">Log Out</span>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


