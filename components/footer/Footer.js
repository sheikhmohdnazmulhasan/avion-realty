import logo from "@/public/images/logo.svg";
import Image from "next/image";

import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaFacebookF, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";
import { HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";

const Footer = () => {
  return (

    <div className='lg:bg-[url("https://i.ibb.co/JzgqCkk/footer-bg.png")] bg-no-repeat bg-left-bottom  border-t border-[#9E9E9E]  '>
      <div className="px-4 md:px-8 lg:px-20 pt-16 pb-8">
        <div className="md:border-b border-[#E4B649] pb-4 md:pb-8">
          <Image src={logo} alt="avion realty" />
        </div>
        <div className="flex flex-col-reverse  lg:flex-row justify-between gap-y-6 mt-4 md:mt-8 px-4 md:px-2">
          {/* items list div */}
          <div className=" text-base lg:text-xl font-light flex flex-col md:flex-row  gap-4 md:justify-between lg:gap-12">
            {/* property type */}
            <ul>
              <h3 className="font-semibold text-[#CC9107] md:hidden">
                Property Type
              </h3>
              <li>
                <Link href="/">Apartment</Link>
              </li>
              <li>
                <Link href="/">Penthouse</Link>
              </li>
              <li>
                <Link href="/">Villa</Link>
              </li>
              <li>
                <Link href="/">Townhouse</Link>
              </li>
            </ul>
            {/* popular area */}
            <ul>
              <h3 className="font-semibold text-[#CC9107]  md:hidden">
                Popular Area{" "}
              </h3>
              <li>
                <Link href="/">Business bay</Link>
              </li>
              <li>
                <Link href="/">Dubai Marina</Link>
              </li>
              <li>
                <Link href="/">Damac Hills</Link>
              </li>
              <li>
                <Link href="/">Downtown Dubai</Link>
              </li>
            </ul>
            {/* quick links */}
            <ul>
              <h3 className="font-semibold text-[#CC9107]  md:hidden">
                Quick Links{" "}
              </h3>
              <li>
                <Link href="/listing/Off-Plan">Off-Plan</Link>
              </li>
              <li>
                <Link href="/listing/Ready">Ready</Link>
              </li>
              <li>
                <Link href="/listing/Rent">Rent</Link>
              </li>
              <li>
                <Link href="/">Sell your property</Link>
              </li>
            </ul>
            {/*  */}
            <ul>
              {/* <h3 className="font-semibold text-[#CC9107]  md:hidden">
                  Quick Links{" "}
                </h3> */}
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/career">Career</Link>
              </li>
              <li>
                <Link href="/blogs">Blog</Link>
              </li>
              <li>
                <Link href="/podcasts">Podcast</Link>
              </li>
            </ul>
          </div>
          {/* contact list */}
          <ul className="space-y-2 text-sm lg:text-base">
            <li className="flex gap-2 items-center">
              <span className="text-[#E4B649] ">
                <FaMapMarkerAlt size={20} />
              </span>
              <a>
                Office 707, Building No 13
                <br /> Business Bay, Bay Square, Dubai
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <span className="text-[#E4B649] ">
                <MdEmail size={20} />
              </span>
              <a>info@avionrealty.ae</a>
            </li>
            <li className="flex gap-2 items-center">
              <span className="text-[#E4B649] ">
                <IoCall size={20} />
              </span>
              <span>
                <a>+971 50 459 71 67</a>
                <br />
                <a>+971 4 876 6085</a>
              </span>
            </li>
          </ul>
        </div>

        {/* search bar */}
        <form className="hidden md:flex items-center bg-[#0F0F0F] w-full pl-8 pr-4 justify-around py-3 rounded-3xl my-8">
          <span className="w-1 ">
            <HiOutlineSearch />
          </span>
          <input
            type="text"
            placeholder="Search For A Property or Location"
            className="bg-transparent w-2/3 lg:w-4/5"
          />
          <button className="bg-[#E4B649] text-black flex items-center font-extrabold gap-2 py-2 px-4 rounded-3xl">
            <span>
              <HiOutlineSearch />
            </span>
            <span>Find Property</span>
          </button>
        </form>

        {/* copyright and social media  */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 mt-12 ">
          <div className="flex flex-col md:flex-row gap-4 justify-center text-center text-sm lg:text-base ">
            <p>&copy; 2024 Avion Realty All Rights Reserved.</p>
            <Link href="/privacy-policy">Privacy Policy</Link>

            <Link href={'https://intellitixdev.com/'} target="_blank" className="hidden">
              Powered by
              <a className="text-[#CC9107]"> INTELLITIX TECHNOLOGY</a>{" "}
            </Link>
          </div>
          <ul className="text-[#E8BF44] md:text-2xl flex gap-4">
            <li>
              <Link href="/">
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link href="/">
                <FaLinkedin />
              </Link>
            </li>
            <li>
              <Link href="/">
                <FaTwitter />
              </Link>
            </li>

            <li>
              <Link href="/">
                <FaYoutube />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
