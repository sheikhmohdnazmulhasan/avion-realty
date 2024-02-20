import logo from "@/public/images/logo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className='bg-[url("https://i.ibb.co/JzgqCkk/footer-bg.png)] border-t border-[#9E9E9E] '>
      <div className="px-4 md:px-8 lg:px-16 mt-16 mb-10">
        <div className="border-b border-[#E4B649] pb-8">
          <Image src={logo} alt="avion realty" />
        </div>
        <div>
          {/* items list div */}
          <div></div>
          {/* contact list */}
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
