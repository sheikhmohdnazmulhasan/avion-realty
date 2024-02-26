import logo from "@/public/images/dashboard/d-logo.svg";
import Image from "next/image";
import Link from "next/link";

import { VscGraph } from "react-icons/vsc";
import { TiThListOutline } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { GrVideo } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <nav className="p-16  min-h-screen">
      {/* logo */}
      <Image src={logo} alt="Avion Realty" />
      {/* nav links */}
      <ul className="text-xl font-bold mt-16 space-y-6">
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <VscGraph size={24} />
            <span>Overview</span>
          </Link>
        </li>
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
        <li>
          <Link href="/" className="flex gap-4 items-center">
            <GrVideo size={24} />
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
          className="bg-[#835C00] rounded-2xl p-3 flex items-center gap-2 text-xl "
        >
          <FaPlus />
          <span>Add Property</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
