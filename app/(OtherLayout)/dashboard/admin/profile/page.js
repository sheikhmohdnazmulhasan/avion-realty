"use client";
import EditProfile from "@/components/dashboard/EditProfile";
import Navbar from "@/components/dashboard/Navbar";
import UserProfile from "@/components/dashboard/UserProfile";
import useUser from "@/hooks/useUser";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import useSWR from "swr";

const Profile = () => {
  const { data, error, mutate } = useUser();
  // const user = useSession();

  // const fetcher = (url) => axios.get(url).then((res) => res.data);

  // const {
  //   data = [],
  //   error,
  //   mutate,
  // } = useSWR(
  //   `http://localhost:3000/api/users?email=${user?.data?.user?.email}`,
  //   fetcher
  // );

  return (
    <div className=" px-12 py-10">
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
