'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";


const useAgentLists = () => {
    const user = useSession();
    const fetcher = (url) => axios.get(url).then((res) => res.data);

    const { data = [], isLoading } = useSWR(`hhttps://avion-realty.vercel.app/api/offplans?agent=${user?.data?.user?.email}`, fetcher);

    return [data, isLoading]

};

export default useAgentLists;