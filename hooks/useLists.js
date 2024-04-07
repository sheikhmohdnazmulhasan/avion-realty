import axios from "axios";
import useSWR from "swr";

const useLists = () => {
    const fetcher = (url) => axios.get(url).then((res) => res.data);

    const { data = [], isLoading } = useSWR('https://avion-realty.vercel.app/api/offplans', fetcher);

    return [data, isLoading];
};

export default useLists;