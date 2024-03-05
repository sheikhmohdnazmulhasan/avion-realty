import axios from "axios";
import useSWR from "swr";

const useGetDevelopers = () => {
    const fetcher = url => axios.get(url).then(res =>res.data);
    const {
        data = [],
        error,
        mutate
    } = useSWR("http://localhost:3000/api/admin/items/dev", fetcher)

    return {data, error, mutate}
};

export default useGetDevelopers;