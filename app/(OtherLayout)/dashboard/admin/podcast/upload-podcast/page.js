"use client";

import Navbar from "@/components/dashboard/Navbar";
import useAgents from "@/hooks/useAgents";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { IoCamera } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

const UploadPodcast = () => {
  const agents = useAgents();
  const { data: user } = useUser();

  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const fileInputRef = useRef();

  const handleClearFile = () => {
    setShowName('');
    setShowImagePreview('');
    fileInputRef.current.value = '';
  };

  function handleAddPodcast(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const agent = event.target.agent.value;
    const videoUrl = event.target.videoUrl.value;

    const image = new FormData();
    image.append('image', showName);

    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    if (!urlRegex.test(videoUrl)) {

      toast.error('Places Provide Valid YouTube Video URL',
        {

          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );

      return

    } else {

      const toastId = toast.loading('Working...',
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );

      axios.post(`https://api.imgbb.com/1/upload?key=10a0343a75c20fe85ce07c1d5561bfa1`, image).then(res => {

        if (res.data.success) {

          const dataForBackend = { title, description, agent, videoUrl, thumbnail: res.data.data.display_url };

          axios.post('hhttps://avion-realty.vercel.app/api/admin/podcast', dataForBackend).then(res => {

            if (res.data.success) {

              toast.success(`Podcast Published`, { id: toastId });
              event.target.reset();
              handleClearFile();

            }

          }).catch(err => {

            toast.error('Something Wrong!',
              {
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }
            );
          });

        }

      }).catch(err => toast.error(`Something Wrong`, { id: toastId }));



    }

  }

  if (user.role !== 'admin') {

    return (
      <div className="grid h-screen place-content-center bg-[#0A0909] px-4">
        <h1 className="uppercase tracking-widest text-gray-200">401 | Unauthorized</h1>
      </div>
    )
  }

  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <Navbar title="Upload A Podcast" />
      <form className="mt-20 mb-8 pr-24 text-sm space-y-6" onSubmit={handleAddPodcast}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            placeholder="Write podcast title"
            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
          />
        </div>

        <div>
          <label>Description</label>
          <br />
          <textarea
            name="description"
            placeholder="Write description"
            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
            rows={12}
          />
        </div>
        <div>
          <label>Select Agents</label>
          <br />
          <select
            name="agent"
            // multiple
            placeholder="Select multiple agents"
            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
          >
            <option value="" disabled selected>
              Select Agent
            </option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent.email}>
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
            placeholder="Write url of podcast video"
            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
          />
        </div>

        <div className="my-10">
          <label className="">Thumbnail</label>
          {showName?.name ? (
            <div className=" mx-auto mt-1.5 flex w-full items-center gap-x-6  rounded-lg border border-dotted p-5 ">
              <img className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover" src={showImagePreview} alt={showName?.name} />
              <div className="flex-1 space-y-1.5 overflow-hidden">
                <h5 className=" text-xl font-medium tracking-tight truncate">{showName?.name}</h5>
                <p className=" text-gray-500">{(showName.size / 1024).toFixed(1)} KB</p>
              </div>
              <div onClick={handleClearFile}>
                <MdOutlineCancel size={24} />
              </div>
            </div>
          ) : (
            <label className=" mx-auto mt-1.5 flex w-full flex-col items-center justify-center space-y-3 rounded-lg border border-dotted  p-6" htmlFor="file5">
              <IoCamera size={24} />
              <div className="space-y-1.5 text-center">
                <h5 className="whitespace-nowrap text-lg font-medium tracking-tight ">Upload your file</h5>
                <p className="text-sm text-gray-500">File Should be in PNG, JPEG or JPG formate</p>
              </div>
            </label>
          )}

          <input ref={fileInputRef} onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const imageFile = e.target.files[0];
              setShowName(imageFile);
              setShowImagePreview(URL.createObjectURL(imageFile));
            }
          }} className="hidden" id="file5" type="file" />
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-[#835C00] rounded-3xl px-4 py-2 flex items-center gap-1 justify-center ">
            <FaPlus className="" />
            <span className="font-bold">Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPodcast;
