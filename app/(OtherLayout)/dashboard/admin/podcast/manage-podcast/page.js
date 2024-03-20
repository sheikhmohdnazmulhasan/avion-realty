"use client";
import Navbar from "@/components/dashboard/Navbar";
import usePodcast from "@/hooks/usePodcast";
import Image from "next/image";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { RiEditBoxFill } from "react-icons/ri";

import dummyImg from "@/public/images/icon.svg";

const UploadPodcast = () => {
  const podcasts = usePodcast();
  console.log(podcasts);

  return (
    <div>
      <Navbar title="Manage Podcast" />
      <div className="border border-[#E4B649] mt-20 ">
        <div className=" grid grid-cols-5 text-center items-center border-b border-[#E4B649] py-3">
          <h2 className="border-r border-[#E4B649] col-span-2">Title</h2>
          <h2 className="border-r border-[#E4B649]">Agent</h2>
          <h2 className="border-r border-[#E4B649]">Updated On</h2>
          <h2>Action</h2>
        </div>
        {podcasts.map((podcast) => (
          <div
            key={podcast._id}
            className=" mx-4 border-b border-[#E4B649] grid grid-cols-5 text-center items-center p-2"
          >
            <div className="col-span-2 flex items-center gap-4">
              <Image
                src={dummyImg}
                alt={podcast.title}
                className="h-24 w-24 object-fill"
              />
              <h2>{podcast.title}</h2>
            </div>
            <h2>{podcast.agent}</h2>
            <h2>{podcast.updatedAt}</h2>
            <div className="flex justify-center items-center gap-4">
              <button>
                <IoMdCloseCircle className="text-red-600 text-xl" />
              </button>
              <Link href="/">
                <RiEditBoxFill />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadPodcast;
