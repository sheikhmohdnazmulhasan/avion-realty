'use client'
import axios from "axios";
import useUser from "./useUser";
import useSWR from "swr";


const useAgentInquiries = () => {
    const { data: user } = useUser();
    const fetcher = (url) => axios.get(url).then((res) => res.data);

    const { data, isLoading } = useSWR(`/api/agent/inquiry?agent=${user._id}`, fetcher);

    return [data, isLoading]


};

export default useAgentInquiries;