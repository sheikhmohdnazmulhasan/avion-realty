"use client";

import Navbar from "@/components/dashboard/Navbar";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { PiKeyLight } from "react-icons/pi";

const Agents = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Navbar title="Agents" />
      <div className=" mt-12 flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#835C00] rounded-xl py-2 px-3 flex items-center gap-2 justify-center "
        >
          <FaPlus />
          <span className="mt-1">Add Agent</span>
        </button>
      </div>
      {/* modal for add more items */}
      {openModal && (
        <div className="w-2/5 absolute top-1/4 left-1/3">
          <div className="text-right">
            <button onClick={() => setOpenModal(false)}>
              <IoMdClose size={24} />
            </button>
          </div>
          <div className="p-8 rounded-lg shadow shadow-gray-500 ">
            <h2 className="mb-6 text-xl font-semibold">Add Agent</h2>
            <form className="mt-4 text-sm">
              <div className="flex justify-between w-full gap-12 mb-6">
                {/* name */}
                <div className="w-1/2">
                  <label>Agent Name</label>
                  <br />
                  <input
                    type="text"
                    name="agentName"
                    placeholder="Write agent name"
                    className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                  />
                </div>
                {/* email */}
                <div className="w-1/2">
                  <label>Email Address</label>
                  <br />
                  <input
                    type="email"
                    name="agentEmail"
                    disabled
                    placeholder="Write email address"
                    className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                  />
                </div>
              </div>
              <div className="flex justify-between w-full gap-12 mb-6">
                {/* password */}
                <div className="w-1/2">
                  <label>New Password</label>
                  <br />
                  <div className="bg-black rounded-lg mt-1 w-full flex items-center gap-1 border border-dotted">
                    <PiKeyLight className="text-xl rotate-180 ml-2" />
                    <input
                      type="text"
                      name="newPassword"
                      placeholder="New PassWord"
                      className="bg-black w-full p-2 outline-none"
                    />
                  </div>
                </div>
                {/* re type pass */}
                <div className="w-1/2">
                  <label>Re-type New Password</label>
                  <br />
                  <div className="bg-black rounded-lg mt-1 w-full flex items-center gap-1 border border-dotted">
                    <PiKeyLight className="text-xl rotate-180 ml-2" />
                    <input
                      type="text"
                      name="confirmNewPassword"
                      placeholder="Re-type New Password"
                      className="bg-black w-full p-2 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full gap-12 mb-6">
                {/* designation */}
                <div className="w-1/2">
                  <label>Designation</label>
                  <br />
                  <input
                    type="text"
                    name="agentDesignation"
                    placeholder="Write agent designation"
                    className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                  />
                </div>
                {/* whats app number */}
                <div className="w-1/2">
                  <label>WhatsApp Number</label>
                  <br />
                  <input
                    type="number"
                    name="agentWhatsApp"
                    placeholder="Write your whatsapp number"
                    className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <input
                  type="submit"
                  value="Add Agent"
                  className="bg-[#835C00] hover:cursor-pointer px-8 py-2 rounded-md"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agents;
