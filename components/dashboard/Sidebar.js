"use client";

import logo from "@/public/images/dashboard/d-logo.svg";
import Image from "next/image";
import Link from "next/link";
import offPlanIcon from "@/public/images/off-plan.svg";
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
import { BsHouseCheck } from "react-icons/bs";

import { useState } from "react";

const Sidebar = () => {
  const { data } = useUser();

  const [isDropdown, setDropdown] = useState(false);

  return (
    <nav className="p-16  min-h-screen">
      {/* logo */}
      <Image src={logo} alt="Avion Realty" />
      {/* nav links */}
      <ul className=" font-bold mt-16 space-y-4">
        <li>
          <Link href="/dashboard" className="flex gap-4 items-center">
            <VscGraph size={24} />
            <span>Overview</span>
          </Link>
        </li>
        {/* role based nav links */}
        {data?.role !== "admin" ? (
          // for agent nav links
          <>
            <li className="flex gap-4 items-center">
              <TiThListOutline size={24} />
              <button
                onClick={() => setDropdown(!isDropdown)}
                className=" flex items-center justify-between w-full"
              >
                <span>Listings</span>
                {isDropdown ? (
                  <FaAngleUp size={12} />
                ) : (
                  <FaAngleDown size={12} />
                )}
              </button>
            </li>
            {isDropdown && (
              <ul className=" ml-8 space-y-1">
                <li>
                  <Link href="/dashboard/agent/listing/manage-listing">
                    <span>Manage Listing</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/agent/listing/private-inventory">
                    <span>Private Inventory</span>
                  </Link>
                </li>
              </ul>
            )}
            <li>
              <Link
                href="/dashboard/agent/Insights"
                className="flex gap-4 items-center"
              >
                <GoGraph size={24} />
                <span>Insights</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/agent/leads"
                className="flex gap-4 items-center"
              >
                <BsCollection size={24} />
                <span>Leads</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/agent/blog"
                className="flex gap-4 items-center"
              >
                <RiFileList3Line size={24} />
                <span>Blog</span>
              </Link>
            </li>
          </>
        ) : (
          // for admin nav links
          <>
            <li>
              <Link
                href="/dashboard/admin/items"
                className="flex gap-4 items-center"
              >
                <TiThListOutline size={24} />
                <span>Items</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/amenities"
                className="flex gap-4 items-center"
              >
                <BsHouseCheck size={24} />
                <span>Amenities</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/agents"
                className="flex gap-4 items-center"
              >
                <CgProfile size={24} />
                <span>Agents</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/listings"
                className="flex gap-4 items-center"
              >
                <HiOutlineHomeModern size={24} />
                <span>Listings</span>
              </Link>
            </li>
            <li className="flex gap-4 items-center">
              <GrVideo size={24} />
              <button
                onClick={() => setDropdown(!isDropdown)}
                className=" flex items-center justify-between w-full"
              >
                <span>Podcasts</span>
                {isDropdown ? (
                  <FaAngleUp size={12} />
                ) : (
                  <FaAngleDown size={12} />
                )}
              </button>
            </li>
            {isDropdown && (
              <ul className=" ml-8 space-y-1">
                <li>
                  <Link href="/dashboard/admin/podcast/upload-podcast">
                    <span>Upload Podcast</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/admin/podcast/manage-podcast">
                    <span>Manage Podcast</span>
                  </Link>
                </li>
              </ul>
            )}
          </>
        )}
        <li>
          <Link
            href="/dashboard/add-off-plan"
            className="flex gap-4 items-center"
          >
            <Image src={offPlanIcon} alt="off-plan" />
            <span>Add-Off-plan</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/profile" className="flex gap-4 items-center">
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
