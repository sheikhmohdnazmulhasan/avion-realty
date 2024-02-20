import Image from "next/image";
import { LuMenu } from "react-icons/lu";

import icon from "@/public/images/icon.svg";
import whatsapp from "@/public/images/whatsapp.svg";
import Link from "next/link";

const MobileMenu = () => {
  return (
    <div className="flex justify-between px-4 py-4 items-center">
      <LuMenu color="#E8BF44" size="24px" />

      <Link href="" className="w-10">
        <Image src={icon} alt="avion realty" />
      </Link>
      <Link href="" className="w-6">
        <Image src={whatsapp} alt="avion realty whatsapp" />
      </Link>
    </div>
  );
};

export default MobileMenu;
