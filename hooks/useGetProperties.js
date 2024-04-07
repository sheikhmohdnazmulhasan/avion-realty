import axios from "axios";
import useSWR from "swr";

const useGetProperties = () => {
    const fetcher = url => axios.get(url).then(res => res.data);
    const {
        data = []
    } = useSWR('hhttps://avion-realty.vercel.app/api/admin/items/property', fetcher);

    return data;
};

export default useGetProperties;