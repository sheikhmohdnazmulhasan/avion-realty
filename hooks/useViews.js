import axios from "axios";
import useSWR from "swr";

const useViews = () => {
    const fetcher = (url) => axios.get(url).then((res) => res.data);

    const { data = [], isLoading } = useSWR('http://localhost:3000/api/admin/view', fetcher);

    return [data, isLoading];
};

export default useViews;