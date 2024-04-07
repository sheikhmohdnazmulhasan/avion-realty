"use client";

import Navbar from "@/components/dashboard/Navbar";
import AgentCard from "@/components/dashboard/admin/AgentCard";
import useAgents from "@/hooks/useAgents";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";;
import { PiKeyLight } from "react-icons/pi";
import Swal from "sweetalert2";
import { mutate } from "swr";


const Agents = () => {
  const data = useAgents();
  const { data: user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const handleScroll = () => {
    const scrollContainer = document.getElementById("scrollID");

    if (
      scrollContainer.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  // Attach the handleScroll function to the scroll event
  window.onscroll = handleScroll;

  async function handleAddAgent(event) {
    event.preventDefault();
    const form = event.target;
    const agentName = form.agentName.value;
    const agentEmail = form.agentEmail.value;
    const newPassword = form.newPassword.value;
    const confirmNewPassword = form.confirmNewPassword.value;
    const agentDesignation = form.agentDesignation.value;
    const agentWhatsApp = form.agentWhatsApp.value;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add a new agent?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do It!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        const newAgentData = {
          name: agentName,
          email: agentEmail,
          password: newPassword,
          designation: agentDesignation,
          wpNum: agentWhatsApp,
          role: "agent",
          properties: 0
        };

        if (!passwordRegex.test(newPassword)) {
          toast.error(
            "Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.",
            {
              style: {
                background: "#333",
                color: "#fff",
              },
            }
          );
          return;
        } else if (newPassword !== confirmNewPassword) {
          toast.error("Password did not match!", {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
          return;
        } else {
          try {
            const res = await axios.post(
              "hhttps://avion-realty.vercel.app/api/users",
              newAgentData
            );

            if (res.data.message !== "User Already Exist!") {
              Swal.fire({
                title: "Agent Created",
                text: `You have successfully created a new agent. Email: ${agentEmail},  Password: ${newPassword}. Please note it down!`,
                icon: "success",
              });
              mutate("hhttps://avion-realty.vercel.app/api/users?agent=all");
              setOpenModal(false);

            } else {
              Swal.fire({
                title: "Email Exist",
                text: "The agent's email already exists in the database!",
                icon: "error",
              });
            }
          } catch (error) {
            console.log(error);
          }
        }

      }
    });
  }

  if (user.role !== 'admin') {

    return (
      <div className="grid h-screen place-content-center bg-[#0A0909] px-4">
        <h1 className="uppercase tracking-widest text-gray-200">401 | Unauthorized</h1>
      </div>
    );

  };

  return (
    <div className="max-h-screen">
      <Navbar title="Agents" />
      <Toaster position="bottom-right" reverseOrder={false} />
      <div id="scrollID">
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
          <div className="w-2/5 absolute top-1/4 left-1/3 z-30 ">
            <div className="text-right">
              <button onClick={() => setOpenModal(false)}>
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-8 rounded-lg shadow shadow-gray-500 bg-black">
              <h2 className="mb-6 text-xl font-semibold">Add Agent</h2>
              <form className="mt-4 text-sm" onSubmit={handleAddAgent}>
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
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="New PassWord"
                        className="bg-black w-full p-2 outline-none"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="mr-2">
                        {
                          showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />
                        }
                      </button>
                    </div>
                  </div>
                  {/* re type pass */}
                  <div className="w-1/2">
                    <label>Re-type New Password</label>
                    <br />
                    <div className="bg-black rounded-lg mt-1 w-full flex items-center gap-1 border border-dotted">
                      <PiKeyLight className="text-xl rotate-180 ml-2" />
                      <input
                        type={showRetypePassword ? "text" : "password"}
                        name="confirmNewPassword"
                        placeholder="Re-type New Password"
                        className="bg-black w-full p-2 outline-none"
                      />
                      <button type="button" onClick={() => setShowRetypePassword(!showRetypePassword)} className="mr-2">
                        {
                          showRetypePassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />
                        }
                      </button>
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
                      placeholder="Write your WhatsApp number"
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
        <div className="pt-4 pb-12 grid grid-cols-3 gap-6">
          {data?.map((agent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
        </div>
      </div>

      {/* scroll add agent feature */}
      {isScroll && (
        <div className="fixed bottom-4 right-8 z-20">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#835C00] rounded-full p-3 "
          >
            <FaPlus size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Agents;
