"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Developers = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-[#161616] p-6 rounded-2xl">
      <h2 className="text-xl font-semibold">Developers</h2>
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
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#835C00] rounded-3xl px-3 py-1 flex items-center justify-center"
        >
          <FaPlus size={16} />
          <span className="mt-1 ml-1">Add More</span>
        </button>
      </div>

      {/* modal for add more items */}
      {openModal && (
        <div className=" w-1/3 absolute top-1/4 left-1/3">
          <div className="text-right">
            <button onClick={() => setOpenModal(false)}>
              <IoMdClose size={24} />
            </button>
          </div>
          <div className="bg-[#161616] p-8 rounded-lg shadow shadow-gray-500  text-center">
            <h2 className="mb-6 text-xl font-semibold">Add Developers</h2>
            <form className=" space-y-6 ">
              <input
                type="text"
                name="developer"
                placeholder="write property name"
                className="bg-black w-full p-2 outline-none border border-dotted rounded-lg"
              />

              <br />
              <input
                type="submit"
                value="+ Submit"
                className="bg-[#835C00] px-8 py-1 rounded-2xl"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Developers;
