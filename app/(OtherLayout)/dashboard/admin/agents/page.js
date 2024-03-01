import Navbar from "@/components/dashboard/Navbar";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  return (
    <div>
      <Navbar title="Agents" />
      <div className="px-12 grid">
        <button className="bg-[#835C00] rounded-xl py-2 px-3 flex items-center gap-2 justify-center justify-self-end">
          <FaPlus />
          <span className="mt-1">Add Agent</span>
        </button>
      </div>
    </div>
  );
};

export default page;