import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";

const Navbar = ({ title, user }) => {
  console.log(user);
  const profile = user?.image;

  return (
    <div className="px-12 py-10 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div>
        <div className="w-12  rounded-full ">
          {profile ? (
            <Image src={profile} alt={user?.name} className="rounded-full" />
          ) : (
            <FaUserCircle size={40} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
