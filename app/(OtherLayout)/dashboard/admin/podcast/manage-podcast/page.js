"use client";
import Navbar from "@/components/dashboard/Navbar";
import usePodcast from "@/hooks/usePodcast";
import PodcastCard from "@/components/dashboard/admin/podcast/PodcastCard";
import useUser from "@/hooks/useUser";

const UploadPodcast = () => {
  const { data: user } = useUser();

  const [podcasts, isLoading] = usePodcast();

  if (user.role !== 'admin') {

    return (
      <div className="grid h-screen place-content-center bg-[#0A0909] px-4">
        <h1 className="uppercase tracking-widest text-gray-200">401 | Unauthorized</h1>
      </div>
    )
  }


  if (!podcasts.length) {
    return <h1 className="flex justify-center items-center h-screen font-semibold">No Data!</h1>

  } else if (isLoading) {
    return <h1 className="flex justify-center items-center h-screen font-semibold">Loading!</h1>

  } else {
    return (
      <div className="relative">
        <Navbar title="Manage Podcast" />
        <div className="border border-[#E4B649] mt-20 ">
          <div className=" grid grid-cols-5 text-center items-center border-b border-[#E4B649] py-3 font-semibold">
            <h2 className="border-r border-[#E4B649] col-span-2">Title</h2>
            <h2 className="border-r border-[#E4B649]">Agent</h2>
            <h2 className="border-r border-[#E4B649]">Updated On</h2>
            <h2>Action</h2>
          </div>
          {podcasts.map((podcast) => (<PodcastCard key={podcast._id} podcast={podcast} />))}
        </div>
      </div>
    );
  };
}

export default UploadPodcast;
