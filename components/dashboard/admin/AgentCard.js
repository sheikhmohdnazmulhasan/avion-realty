"use client";

import Image from "next/image";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const AgentCard = ({ agent }) => {
  const [openModal, setOpenModal] = useState(false);

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
            <p />
            <p className="mt-2">Phone : </p>
            <p className="mt-2">{agent?.wpNum}</p>
            <p />
            <p className="mt-2">Properties : </p>
            <p className="mt-2">{agent?.properties || 0} properties</p>
            <p />
          </div>
          <div className="flex gap-4 text-xs ">
            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#835C00] py-1 px-2 rounded-2xl mt-4 "
            >
              Edit Agent
            </button>
            <button className="bg-red-600 py-1 px-2 rounded-2xl mt-4 ">
              Delete Agent
            </button>
          </div>
        </div>
      </div>
      {/* modal for add more items */}
      {openModal && (
        <div className="w-2/5 absolute top-1/4 left-1/3 ">
          <div className="text-right">
            <button onClick={() => setOpenModal(false)}>
              <IoMdClose size={24} />
            </button>
          </div>
          <div className="p-8 rounded-lg shadow shadow-gray-500 bg-black">
            <h2 className="mb-6 text-xl font-semibold">Edit Agent</h2>
            <form className="mt-4 text-sm">
              <div className="flex justify-between w-full gap-12 mb-6">
                {/* name */}
                <div className="w-1/2">
                  <label>Agent Name</label>
                  <br />
                  <input
                    type="text"
                    name="agentName"
                    defaultValue={agent?.name}
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
                    defaultValue={agent?.email}
                    placeholder="Write email address"
                    className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                  />
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
                    defaultValue={agent?.designation}
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
                    defaultValue={agent?.wpNum}
                    placeholder="Write agent WhatsApp number"
                    className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted"
                  />
                </div>
              </div>
              <div className="flex justify-between w-full gap-12 mb-6">
                {/* RERA ID */}
                <div className="w-1/2">
                  <label>RERA ID</label>
                  <br />
                  <input
                    type="text"
                    name="reraID"
                    defaultValue={agent?.reraID}
                    placeholder="Write agent RERA ID"
                    className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                  />
                </div>
                {/* Specializes */}
                <div className="w-1/2">
                  <label>Specializes</label>
                  <br />
                  <input
                    type="text"
                    name="specializes"
                    defaultValue={agent?.specializes}
                    placeholder="Write agent specializes"
                    className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <input
                  type="submit"
                  value="Edit Agent"
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

export default AgentCard;
