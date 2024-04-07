import axios from "axios";
import useSWR from "swr";

const useGetDevelopers = () => {
    const fetcher = url => axios.get(url).then(res =>res.data);
    const {
        data = []
    } = useSWR("hhttps://avion-realty.vercel.app/api/admin/items/dev", fetcher)

    return data;
};

export default useGetDevelopers;