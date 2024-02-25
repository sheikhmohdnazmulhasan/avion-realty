import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = ({ user }) => {
  const currentUser = user?.data?.user;
  console.log(currentUser);

  //   const { name } = currentUser;

  return (
    <div className="bg-[#161616] p-8 rounded-2xl">
      <h2 className="text-2xl font-semibold">My Profile</h2>

      {/* profile */}
      <div className="my-8 flex items-center gap-4">
        <div className="w-16  rounded-full ">
          {currentUser?.image ? (
            <Image
              src={currentUser?.image}
              alt={currentUser?.name}
              className="rounded-full"
            />
          ) : (
            <FaUserCircle size={60} />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
          <p>Marketing And IT</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
