import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const AgentCard = ({ agent }) => {
  return (
    <div className="bg-[#171717] px-6 py-4 flex gap-4 w-full shadow-md shadow-gray-800 rounded-md">
      <div className="w-16 rounded-full ">
        {agent?.image ? (
          <Image
            src={agent?.image}
            alt={agent?.name}
            className="rounded-full"
          />
        ) : (
          <FaUserCircle size={60} />
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold">{agent?.name}</h2>
        <h3 className="text-xl font-medium text-[#E4B649]">
          {agent?.designation}
        </h3>
        <div className="grid grid-cols-2 mt-2 text-xs ">
          <p className="mt-2">Email : </p>
          <p className="mt-2">{agent?.email}</p>
          <p className="mt-2">Phone : </p>
          <p className="mt-2">{agent?.wpNum}</p>
          <p className="mt-2">Properties : </p>
          <p className="mt-2">{agent?.properties || 0} properties</p>
        </div>
        <div className="flex gap-6 tex-xs">
          <button className="bg-[#835C00] font-bold px-3 py-2 rounded-2xl mt-4 ">
            Edit Agent
          </button>
          <button className="bg-red-600 font-bold px-3 py-2 rounded-2xl mt-4 ">
            Delete Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
