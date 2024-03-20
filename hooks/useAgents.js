
import axios from "axios";
import useSWR from "swr";

const useAgents = () => {
  // fetch all agent
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data = [] } = useSWR(
    "http://localhost:3000/api/users?agent=all",
    fetcher
  );  
  //   console.log(data);
  return data;
};

export default useAgents;
