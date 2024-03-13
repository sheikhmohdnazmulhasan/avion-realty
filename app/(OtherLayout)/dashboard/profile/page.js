"use client";
import EditProfile from "@/components/dashboard/EditProfile";
import Navbar from "@/components/dashboard/Navbar";
import UserProfile from "@/components/dashboard/UserProfile";
import useUser from "@/hooks/useUser";

const Profile = () => {
  const { data, error, mutate } = useUser();


  return (
    <div>
      <Navbar title="My Profile" />
      <div className="flex mt-12 gap-8 h-full ">
        <div className="w-1/3">
          <UserProfile user={data} mutate={mutate} />
        </div>
        <div className="w-2/3">
          <EditProfile user={data} mutate={mutate} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
