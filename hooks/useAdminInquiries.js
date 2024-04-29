import axios from "axios";
import useSWR from "swr";

const useAdminInquiries = () => {
    const fetcher = (url) => axios.get(url).then((res) => res.data);

    const { data, isLoading } = useSWR(`/api/admin/inquiry`, fetcher);

    return [data, isLoading]

};

export default useAdminInquiries;