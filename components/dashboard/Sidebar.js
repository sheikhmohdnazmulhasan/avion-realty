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
import { TbLiveView } from "react-icons/tb";
import { useState } from "react";

const Sidebar = () => {
  const { data } = useUser();
  const [isDropdown, setDropdown] = useState(false);
  const [isDropdown2, setDropdown2] = useState(false);
  const [isActive, setIsActive] = useState('Overview');

  return (
    <nav className="p-16  min-h-screen">
      {/* logo */}
      <Image src={logo} alt="Avion Realty" />
      {/* nav links */}
      <ul className=" font-bold mt-16 space-y-4">
        <li onClick={() => setIsActive('Overview')}>
          <Link href="/dashboard" className={`flex gap-4 items-center ${isActive === 'Overview' && 'text-[#E4B649] scale-105'} hover:text-[#E4B649] hover:scale-105 transition-all`}>
            <VscGraph size={24} />
            <span>Overview</span>
          </Link>
        </li>

        {/* role based nav links */}
        {data?.role !== "admin" ? (
          // for agent nav links
          <>
            <li className={`flex gap-4 items-center hover:text-[#E4B649] ${isActive === 'Manage Listing' && !isDropdown && 'text-[#E4B649] scale-105'} ${isActive === 'Private Inventory' && !isDropdown && 'text-[#E4B649] scale-105'} hover:scale-105 transition-all`}>
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
                <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Manage Listing' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Manage Listing')}>
                  <Link href="/dashboard/agent/listing/manage-listing">
                    <span>Manage Listing</span>
                  </Link>
                </li>
                <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Private Inventory' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive(`Private Inventory`)}>
                  <Link href="/dashboard/agent/listing/private-inventory">
                    <span>Private Inventory</span>
                  </Link>
                </li>
              </ul>
            )}
            <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Insights' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Insights')}>
              <Link
                href="/dashboard/agent/Insights"
                className="flex gap-4 items-center"
              >
                <GoGraph size={24} />
                <span>Insights</span>
              </Link>
            </li>
            <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Leads' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Leads')}>
              <Link
                href="/dashboard/agent/leads"
                className="flex gap-4 items-center"
              >
                <BsCollection size={24} />
                <span>Leads</span>
              </Link>
            </li>
            <li className={`flex gap-4 items-center hover:text-[#E4B649] ${isActive === 'Publish Blog' && !isDropdown2 && 'text-[#E4B649] scale-105'} ${isActive === 'Manage Blog' && !isDropdown2 && 'text-[#E4B649] scale-105'} hover:scale-105 transition-all`}>
              <RiFileList3Line size={24} />
              <button
                onClick={() => setDropdown2(!isDropdown2)}
                className=" flex items-center justify-between w-full"
              >
                <span>Blogs</span>
                {isDropdown2 ? (
                  <FaAngleUp size={12} />
                ) : (
                  <FaAngleDown size={12} />
                )}
              </button>
            </li>

            {isDropdown2 && <ul className=" ml-8 space-y-1">
              <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Publish Blog' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive(`Publish Blog`)}>
                <Link href="/dashboard/agent/blog/publish-blog">
                  <span>Publish Blog</span>
                </Link>
              </li>
              <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Manage Blog' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Manage Blog')}>
                <Link href="/dashboard/agent/blog/manage-blog">
                  <span>Manage Blog</span>
                </Link>
              </li>
            </ul>}
          </>
        ) : (
          // for admin nav links
          <>
            <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Items' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Items')}>
              <Link
                href="/dashboard/admin/items"
                className="flex gap-4 items-center"
              >
                <TiThListOutline size={24} />
                <span>Items</span>
              </Link>
            </li>
            <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Amenities' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Amenities')}>
              <Link
                href="/dashboard/admin/amenities"
                className="flex gap-4 items-center"
              >
                <BsHouseCheck size={24} />
                <span>Amenities</span>
              </Link>
            </li>
            <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Views' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Views')}>
              <Link
                href="/dashboard/admin/views"
                className="flex gap-4 items-center"
              >
                <TbLiveView size={24} />
                <span>Views</span>
              </Link>
            </li>
            <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Agents' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Agents')}>
              <Link
                href="/dashboard/admin/agents"
                className="flex gap-4 items-center"
              >
                <CgProfile size={24} />
                <span>Agents</span>
              </Link>
            </li>
            <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Listings' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Listings')}>
              <Link
                href="/dashboard/admin/listings"
                className="flex gap-4 items-center"
              >
                <HiOutlineHomeModern size={24} />
                <span>Listings</span>
              </Link>
            </li>
            <li className={`flex gap-4 items-center hover:text-[#E4B649] ${isActive === 'Upload Podcast' && !isDropdown && 'text-[#E4B649] scale-105'} ${isActive === 'Manage Podcast' && !isDropdown && 'text-[#E4B649] scale-105'} hover:scale-105 transition-all`}>
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
                <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Upload Podcast' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Upload Podcast')}>
                  <Link href="/dashboard/admin/podcast/upload-podcast">
                    <span>Upload Podcast</span>
                  </Link>
                </li>
                <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Manage Podcast' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Manage Podcast')}>
                  <Link href="/dashboard/admin/podcast/manage-podcast">
                    <span>Manage Podcast</span>
                  </Link>
                </li>
              </ul>
            )}
          </>
        )}
        <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'Add-Off-plan' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('Add-Off-plan')}>
          <Link
            href="/dashboard/add-off-plan"
            className="flex gap-4 items-center"
          >
            <Image src={offPlanIcon} alt="off-plan" />
            <span>Add-Off-plan</span>
          </Link>
        </li>
        <li className={`hover:text-[#E4B649] hover:scale-105 ${isActive === 'My Profile' && 'text-[#E4B649] scale-105'} transition-all`} onClick={() => setIsActive('My Profile')}>
          <Link href="/dashboard/profile" className="flex gap-4 items-center">
            <FaUserCircle size={24} />
            <span>My Profile</span>
          </Link>
        </li>
      </ul>


      {/* add property */}
      {data?.role !== 'admin' && <div className="mt-12">
        <Link
          href="/dashboard/agent/add-property"
          className={`bg-[#835C00] rounded-2xl p-3 flex items-center gap-2 text-xl justify-center hover:scale-105 transition-all`}
          onClick={() => setIsActive('')} >
          <FaPlus />
          <span>Add Property</span>
        </Link>
      </div>}

    </nav>
  );
};

export default Sidebar;
