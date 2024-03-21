import Image from "next/image";
import Link from "next/link";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import { RiEditBoxFill } from "react-icons/ri";

import dummyImg from "@/public/images/dashboard/dummy.svg";
import Swal from "sweetalert2";
import axios from "axios";
import { mutate } from "swr";
import { useState } from "react";
import useAgents from "@/hooks/useAgents";
import toast, { Toaster } from "react-hot-toast";

const PodcastCard = ({podcast}) => {
    const agents = useAgents();
    const [openModal, setOpenModal] = useState(false);

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

    async function handleUpdatePodcast(event) {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const agent = event.target.agent.value;
        const videoUrl = event.target.videoUrl.value;

        const newData = { title, description, agent, videoUrl };

        const urlRegex = new RegExp('^(https?|ftp|file):\\/\\/[\\w\\d\\-\\.%\\?\\=\\+\\&\\/]+', 'i');

        if (!urlRegex.test(videoUrl)) {

            toast.error('Places Provide Valid Video URL',
              {
                icon: '👏',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }
            );
      
            return
      
          } else {
            try {
                const serverResponse = await axios.put(
                  `http://localhost:3000/api/admin/podcast?id=${podcast._id}`,
                  newData
                );
          
                if (serverResponse.data.success) {
                  toast.success(`Podcast Updated`, {
                    icon: "👏",
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
          
                  mutate("http://localhost:3000/api/admin/podcast");
                  setOpenModal(false);
                }
              } catch (error) {
                console.log(error);
              }
            }
    }

    return (
        <div className=" mx-4 py-2 border-b border-[#E4B649] border-opacity-50 grid grid-cols-5 text-center items-center p-2"
        >
            <Toaster position="bottom-right" reverseOrder={false} />
            <div className="col-span-2 flex items-center gap-4">
                <Image
                  src={dummyImg}
                  alt={podcast.title}
                  className="h-16 w-16 object-fill rounded-md"
                />
                <h2 className="font-semibold">{podcast.title}</h2>
              </div>
              <h2>{podcast.agent}</h2>
              <h2>{podcast.updatedAt}</h2>
              <div className="flex justify-center items-center gap-4">
                <button onClick={()=>handleDeletePodcast(podcast._id)}>
                  <IoMdCloseCircle className="text-red-600 text-xl" />
                </button>
                <button onClick={()=>setOpenModal(!openModal)}>
                  <RiEditBoxFill />
                </button>
              </div>

              {/* for edit , modal of form */}
              {
               openModal && 
               (<div className="w-2/3 absolute top-1/4 left-1/5 px-8 py-3 rounded-lg shadow shadow-gray-500 bg-black">
                    <div className="text-right">
                        <button onClick={() => setOpenModal(false)}>
                        <IoMdClose size={24} />
                        </button>
                    </div>
                    <h2 className="mb-6 text-xl font-semibold text-left">Edit Podcast</h2>
                    <form onSubmit={handleUpdatePodcast} className="mt-3 text-sm text-left space-y-3">
                       <div>
                        <label>Title</label>
                        <br />
                        <input
                            type="text"
                            name="title"
                            defaultValue={podcast.title}
                            placeholder="Write podcast title"
                            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
                        />
                        </div>

                        <div>
                        <label>Description</label>
                        <br />
                        <textarea
                            name="description"
                            defaultValue={podcast.description}
                            placeholder="Write description"
                            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
                            rows={6}
                        />
                        </div>
                        <div>
                        <label>Select Agents</label>
                        <br />
                        <select
                            name="agent"
                            placeholder="Select multiple agents"
                            defaultValue={podcast.agent}
                            defaultChecked={podcast.agent}
                            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
                        >
                            
                            {agents.map((agent) => (
                            <option key={agent._id} value={agent.name}>
                                {agent.name}
                            </option>
                            ))}
                        </select>
                        </div>
                        <div>
                        <label>Add Video</label>
                        <br />
                        <input
                            type="text"
                            name="videoUrl"
                            defaultValue={podcast.videoUrl}
                            placeholder="Write url of podcast video"
                            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
                        />
                        </div>
                        <div className="flex justify-end mt-6">
                        <button className="bg-[#835C00] rounded-3xl px-4 py-2 flex items-center gap-1 justify-center font-bold ">
                            Save Changes
                        </button>
                        </div>
                    </form>
                </div>)}
        </div>
    
    );
};

export default PodcastCard;