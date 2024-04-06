"use client";

import Link from "next/link";

import {
  FaAngleUp,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

const Dropdown = ({ isDrop }) => {


  return (
    <span className="mt-1 ">
      <button>
        {isDrop ? <FaAngleUp size={16} /> : <FaAngleDown size={16} />}
      </button>

      {isDrop && (
        <ul className=" normal-case text-white bg-[#262626] px-4 py-2 absolute z-10 -left-2 space-y-2">
          <li className="hover:scale-105 transition-all hover:text-[#E8BF44]">
            <Link href="https://www.facebook.com/avionrealtyuae/" target="_blank" className="flex items-center gap-6 justify-between">
              <span>Facebook</span>
              <FaFacebookF color="#E8BF44" />
            </Link>
          </li>
          <li className="hover:scale-105 transition-all hover:text-[#E8BF44]">
            <Link href="https://www.instagram.com/avionrealtyuae/" target="_blank" className="flex items-center justify-between">
              <span>Instagram</span>
              <FaInstagram color="#E8BF44" />
            </Link>
          </li>
          <li className="hover:scale-105 transition-all hover:text-[#E8BF44]">
            <Link href="https://twitter.com/avionrealtyuae" target="_blank" className="flex items-center justify-between">
              <span>Twitter</span>
              <FaXTwitter color="#E8BF44" />
            </Link>
          </li>
          <li className="hover:scale-105 transition-all hover:text-[#E8BF44]">
            <Link href="https://www.linkedin.com/company/avionrealtyuae/" target="_blank" className="flex items-center justify-between">
              <span>Linkedin</span>
              <FaLinkedin color="#E8BF44" />
            </Link>
          </li>
          <li className="hover:scale-105 transition-all hover:text-[#E8BF44]">
            <Link href="https://www.youtube.com/channel/UCipWW3lRblDBIyhzUIby99Q" target="_blank" className="flex items-center justify-between">
              <span>Youtube</span>
              <FaYoutube color="#E8BF44" />
            </Link>
          </li>
        </ul>
      )}
    </span>
  );
};

export default Dropdown;
