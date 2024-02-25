"use client";
import UserProfile from "@/components/dashboard/UserProfile";
import { useSession } from "next-auth/react";

const Profile = () => {
  const user = useSession();

  return (
    <div>
      <h2>profie</h2>
      <div className="flex py-12 px-12">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default Profile;
