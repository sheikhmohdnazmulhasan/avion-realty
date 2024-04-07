'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const useInventory = () => {
    const session = useSession();
    const fetcher = (url) => axios.get(url).then((res) => res.data);

    const { data = [], isLoading } = useSWR(`https://avion-realty.vercel.app/api/inventory?agent=${session?.data?.user?.email}`, fetcher);

    return [data, isLoading];

};

export default useInventory;