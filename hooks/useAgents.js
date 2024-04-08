
import axios from "axios";
import useSWR from "swr";

const useAgents = () => {
  // fetch all agent
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data = [] } = useSWR("https://www.avionrealty.ae/api/users?agent=all&sort=properties_desc", fetcher);
  //   console.log(data);
  return data;
};

export default useAgents;
