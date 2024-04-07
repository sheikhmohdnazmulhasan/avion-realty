"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const useUser = () => {
  const user = useSession();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const {
    data = [],
    error,
    mutate,
  } = useSWR(
    `https://avion-realty.vercel.app/api/users?email=${user?.data?.user?.email}`,
    fetcher
  );
  
  return { data, error, mutate };
};

export default useUser;
