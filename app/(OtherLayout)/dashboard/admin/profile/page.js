"use client";
import EditProfile from "@/components/dashboard/EditProfile";
import UserProfile from "@/components/dashboard/UserProfile";
import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const Profile = () => {
  const user = useSession();

  const fetcher = (url) => axios.get(url).then(res => res.data);

  const { data = [], error, mutate } = useSWR(`http://localhost:3000/api/users?email=${user?.data?.user?.email}`, fetcher);


  return (
    <div className="max-h-screen overflow-hidden">
      <h2>profile</h2>
      <div className="flex py-8 px-12 gap-8 h-full ">
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
