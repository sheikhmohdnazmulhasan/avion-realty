"use client";

import Navbar from "@/components/dashboard/Navbar";
import useAgents from "@/hooks/useAgents";
import { FaPlus } from "react-icons/fa6";

const UploadPodcast = () => {
  const agents = useAgents();

  return (
    <div>
      <Navbar title="Upload A Podcast" />
      <form className="mt-20 mb-8 pr-24 text-sm space-y-6">
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="podcastTitle"
            placeholder="Write podcast title"
            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
          />
        </div>

        <div>
          <label>Description</label>
          <br />
          <textarea
            name="podcastDescription"
            placeholder="Write description"
            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
            rows={12}
          />
        </div>
        <div>
          <label>Select Agents</label>
          <br />
          <select
            name="selectedAgents"
            // multiple
            placeholder="Select multiple agents"
            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
          >
            <option value="" disabled selected>
              Select multiple agents
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
            name="podcastUrl"
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
