import axios from "axios";
import useSWR from "swr";

const useGetAmenities = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data = [] } = useSWR(`/api/admin/amenities`,fetcher);

  return data;
};

export default useGetAmenities;
