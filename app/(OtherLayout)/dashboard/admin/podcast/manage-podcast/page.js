"use client";
import Navbar from "@/components/dashboard/Navbar";
import usePodcast from "@/hooks/usePodcast";
import Image from "next/image";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { RiEditBoxFill } from "react-icons/ri";

import dummyImg from "@/public/images/icon.svg";
import Swal from "sweetalert2";
import { mutate } from "swr";
import axios from "axios";

const UploadPodcast = () => {
  const podcasts = usePodcast();
  
  async function handleDeletePodcast(id){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete podcast!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const serverResponse = await axios.delete(
            `http://localhost:3000/api/admin/podcast?id=${id}`
          );

          if (serverResponse.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: `Podcast has been deleted.`,
              icon: "success",
            });

            mutate("http://localhost:3000/api/admin/podcast");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }


  return (
    <div>
      <Navbar title="Manage Podcast" />
      <div className="border border-[#E4B649] mt-20 ">
        <div className=" grid grid-cols-5 text-center items-center border-b border-[#E4B649] py-3 font-semibold">
          <h2 className="border-r border-[#E4B649] col-span-2">Title</h2>
          <h2 className="border-r border-[#E4B649]">Agent</h2>
          <h2 className="border-r border-[#E4B649]">Updated On</h2>
          <h2>Action</h2>
        </div>
        {podcasts.map((podcast) => (
          <div
            key={podcast._id}
            className=" mx-4 border-b border-[#E4B649] border-opacity-50 grid grid-cols-5 text-center items-center p-2"
          >
            <div className="col-span-2 flex items-center gap-4">
              <Image
                src={dummyImg}
                alt={podcast.title}
                className="h-24 w-24 object-fill rounded-md"
              />
              <h2 className="font-semibold">{podcast.title}</h2>
            </div>
            <h2>{podcast.agent}</h2>
            <h2>{podcast.updatedAt}</h2>
            <div className="flex justify-center items-center gap-4">
              <button onClick={()=>handleDeletePodcast(podcast._id)}>
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
