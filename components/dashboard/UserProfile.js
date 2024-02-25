import Image from "next/image";
import { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";

const UserProfile = ({ user }) => {
  const [editBio, setEditBio] = useState(false);

  const currentUser = user?.data?.user;

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

      {/* bio */}
      <div>
        <div className="flex justify-between items-center my-2">
          <h3>Bio</h3>
          <button onClick={() => setEditBio(true)}>
            <RiEditBoxFill />
          </button>
        </div>
        <form>
          <textarea
            defaultValue={currentUser?.bio}
            disabled={!editBio}
            placeholder="Write your bio within 200 letters."
            className="bg-black rounded-md text-xs w-full p-4"
          />
        </form>
      </div>

      {/* other information */}
      <div className="my-8 space-y-4 text-sm">
        <div className="space-y-2">
          <h3>Email Address</h3>
          <p className="text-xs bg-black p-2 rounded-md">
            {currentUser?.email}
          </p>
        </div>
        <div className="space-y-2">
          <h3>WhatsApp Number</h3>
          <p className="text-xs bg-black p-2 rounded-md">
            {currentUser?.whatsApp || "+xxx xx xxx xxxx"}
          </p>
        </div>
        <div className="space-y-2">
          <h3>Languages Speak</h3>
          <p className="text-xs bg-black p-2 rounded-md">
            {currentUser?.langs || "English"}
          </p>
        </div>
      </div>

      {/* change password */}
      <div>
        <button className="text-xs hover:underline text-[#FFD167]">
          Are You Want to Change Password?{" "}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
