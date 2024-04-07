'use client'

import axios from "axios";
import useSWR from "swr";

const usePodcast = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data = [], isLoading } = useSWR("http://localhost:3000/api/admin/podcast", fetcher);
  return [data, isLoading];
};

export default usePodcast;
