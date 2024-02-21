import logo from "@/public/images/logo.svg";
import Image from "next/image";

import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaFacebookF, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <div className='bg-[url("https://i.ibb.co/JzgqCkk/footer-bg.png")] bg-no-repeat bg-left-bottom  border-t border-[#9E9E9E] '>
      <div className="px-4 md:px-20 pt-16 pb-8">
        <div className="border-b border-[#E4B649] pb-8">
          <Image src={logo} alt="avion realty" />
        </div>
        <div className="flex justify-between mt-8">
          {/* items list div */}
          <div className="text-xl font-light flex gap-12">
            {/* property type */}
            <ul>
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
              <li>
                <Link href="/">Off-Plan</Link>
              </li>
              <li>
                <Link href="/">Ready</Link>
              </li>
              <li>
                <Link href="/">Rent</Link>
              </li>
              <li>
                <Link href="/">Sell your property</Link>
              </li>
            </ul>
          </div>
          {/* contact list */}
          <ul className="space-y-2">
            <li className="flex gap-2 items-center">
              <span className="text-[#E4B649] ">
                <FaMapMarkerAlt size={24} />
              </span>
              <a>
                Office 707, Building No 13
                <br /> Business Bay, Bay Square, Dubai
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <span className="text-[#E4B649] ">
                <MdEmail size={24} />
              </span>
              <a>info@avionrealty.ae</a>
            </li>
            <li className="flex gap-2 items-center">
              <span className="text-[#E4B649] ">
                <IoCall size={24} />
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
        {/* <form>
          <input type="text" />
        </form> */}

        {/* copyright and social media  */}
        <div className="flex justify-between items-center mt-12 ">
          <div className="flex gap-4 text-base">
            <p>@2024 Avion Realty All Rights Reserved.</p>
            <span>
              <a>Privacy Policy</a>
            </span>
          </div>
          <ul className="text-[#E8BF44] text-2xl flex gap-4">
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
