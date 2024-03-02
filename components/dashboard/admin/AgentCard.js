import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const AgentCard = ({ agent }) => {
  return (
    <div className="bg-[#171717] p-4 shadow-md shadow-gray-800 rounded-md">
      <div className="flex gap-2">
      <div className="w-12 rounded-full ">
        {agent?.image ? (
          <Image
            src={agent?.image}
            alt={agent?.name}
            className="rounded-full"
          />
        ) : (
          <FaUserCircle size={48} />
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold">{agent?.name}</h2>
        <h3 className="text-xl font-medium text-[#E4B649]">
          {agent?.designation}
        </h3>
        <div className="grid grid-cols-3 mt-2 text-xs ">
          <p className="mt-2">Email : </p>
          <p className="mt-2">{agent?.email}</p>
          <p/>
          <p className="mt-2">Phone : </p>
          <p className="mt-2">{agent?.wpNum}</p>
          <p/>
          <p className="mt-2">Properties : </p>
          <p className="mt-2">{agent?.properties || 0} properties</p>
          <p/>
        </div>
        <div className="flex gap-4 text-xs ">
          <button className="bg-[#835C00] py-1 px-2 rounded-2xl mt-4 ">
            Edit Agent
          </button>
          <button className="bg-red-600 py-1 px-2 rounded-2xl mt-4 ">
            Delete Agent
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AgentCard;
