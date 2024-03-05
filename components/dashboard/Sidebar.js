'use client'

import logo from "@/public/images/dashboard/d-logo.svg";
import Image from "next/image";
import Link from "next/link";
import offPlanIcon from "@/public/images/off-plan.svg"
import useUser from "@/hooks/useUser";

import { VscGraph } from "react-icons/vsc";
import { TiThListOutline } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { GrVideo } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { BsCollection } from "react-icons/bs";
import { RiFileList3Line } from "react-icons/ri";
import { useState } from "react";

const Sidebar = () => {
  const {data} = useUser();

  const [isDropdown , setDropdown] = useState(false);

  return (
    <nav className="p-16  min-h-screen">
      {/* logo */}
      <Image src={logo} alt="Avion Realty" />
      {/* nav links */}
      <ul className=" font-bold mt-16 space-y-4">
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <VscGraph size={24} />
            <span>Overview</span>
          </Link>
        </li>
        {/* role based nav links */}
        {
          data?.role !== "admin" ?(
            // for agent nav links
            <>
            <li className="flex gap-4 items-center">
          
            <TiThListOutline size={24} />
            <button
              onClick={() => setDropdown(!isDropdown)}
              className=" flex items-center justify-between w-full"
            >
              <span>Listings</span>
              {isDropdown ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />}
            </button>
            
        </li>
        {isDropdown && (
              
              <ul className=" ml-8 space-y-1">
                <li>
                  <Link href="/">
                    <span>Manage Listing</span>
                  </Link>
                </li>
                <li>
                <Link href="/">
                    <span>Private Inventory</span>
                  </Link>
                </li>
              </ul>
          )}
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <GoGraph size={24} />
            <span>Insights</span>
          </Link>
        </li>
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <BsCollection size={24} />
            <span>Leads</span>
          </Link>
        </li>
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <RiFileList3Line size={24} />
            <span>Blog</span>
          </Link>
        </li>
            </>
          )
          :
          // for admin nav links
          <>
          <li>
          <Link href="/" className="flex gap-4 items-center">
            <TiThListOutline size={24} />
            <span>Items</span>
          </Link>
        </li>
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <CgProfile size={24} />
            <span>Agent</span>
          </Link>
        </li>
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <HiOutlineHomeModern size={24} />
            <span>Listings</span>
          </Link>
        </li>
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <GrVideo size={24} />
            <span>Podcasts</span>
          </Link>
        </li>
          </>
        }
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <Image src={offPlanIcon} alt="off-plan"/>
            <span>Add-Off-plan</span>
          </Link>
        </li>
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <FaUserCircle size={24} />
            <span>My Profile</span>
          </Link>
        </li>
      </ul>
      {/* add property */}
      <div className="mt-12 ">
        <Link
          href="/"
          className="bg-[#835C00] rounded-2xl p-3 flex items-center gap-2 text-xl justify-center"
        >
          <FaPlus />
          <span>Add Property</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
