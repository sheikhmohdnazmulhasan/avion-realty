import axios from "axios";
import useSWR from "swr";

const useLists = () => {
    const fetcher = (url) => axios.get(url).then((res) => res.data);

    const { data = [] } = useSWR('http://localhost:3000/api/offplans', fetcher);

    return data;
};

export default useLists;