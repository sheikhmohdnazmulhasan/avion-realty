"use client";

import Navbar from "@/components/dashboard/Navbar";
import useAgents from "@/hooks/useAgents";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

const UploadPodcast = () => {
  const agents = useAgents();

  function handleAddPodcast(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const agent = event.target.agent.value;
    const videoUrl = event.target.videoUrl.value;

    const dataForBackend = { title, description, agent, videoUrl };

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

      axios.post('http://localhost:3000/api/admin/podcast', dataForBackend).then(res => {

        if (res.data.success) {

          toast('Podcast Published',
            {
              icon: '👏',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
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
            placeholder="Write url of podcast video"
            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
          />
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
