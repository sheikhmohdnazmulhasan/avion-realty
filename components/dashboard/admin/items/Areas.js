"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

const Areas = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-[#161616] p-6 rounded-2xl">
      <h2 className="text-xl font-semibold">Add/Remove Areas</h2>
      <div className="my-10 h-[60vh] overflow-y-scroll pr-2">
        <ul>
          <li className="flex items-center justify-between">
            <span>Business Bay</span>
            <button>
              <IoMdCloseCircle className="text-red-600 text-xl" />
            </button>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <button className="bg-[#835C00] rounded-3xl px-3 py-1 flex items-center justify-center">
          <FaPlus size={16} />
          <span className="mt-1 ml-1">Add More</span>
        </button>
      </div>
    </div>
  );
};

export default Areas;
