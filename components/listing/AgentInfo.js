"use client";
import Image from "next/image";
import Link from "next/link";
import call from "@/public/images/root/call.svg";
import whatsapp from "@/public/images/whatsapp.svg";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

<<<<<<< HEAD
const AgentInfo = ({ agent, openInquiry, setOpenInquiry }) => {

  async function handleInquiry(event, id) {
=======
const AgentInfo = ({ agent , openInquiry, setOpenInquiry }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenInquiry = (id)=>{
    setOpenInquiry(!openInquiry);
    setSelectedId(id);
  }

  // handle inquiry
  const handleInquiry = async (event ) => {
    
>>>>>>> 27957e85019c14c6035cd75831b55cb09e043de0
    event.preventDefault();
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;
    // const agent = event.target.id.value;
    // const id = agent._id

    const dataForBackend = { agent : selectedId , name, email, mobile: phone };
    console.log(dataForBackend);

    try {
      const serverResponse = await axios.post(
        `/api/agent/inquiry`,
        dataForBackend
      );

      if (serverResponse.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message sent successfully",
          text: `Dear ${name}, Thank you for your interest. One of our agents will contact you shortly.`,
        });

        event.target.reset();
        setOpenInquiry(false);
        setSelectedId(null);
      }
    } catch (error) {
      console.log(error);
    }
<<<<<<< HEAD
  }
  
=======
  };

>>>>>>> 27957e85019c14c6035cd75831b55cb09e043de0
  return (
    <>
      <div className="mt-4 lg:h-[320px] border border-[#BE8500] p-4 mb-8">
        <div className="flex items-end justify-between gap-2 ">
          <div className="space-y-2">
            <h2 className="md:text-xl font-semibold">{agent?.name}</h2>
            <h3 className="text-sm md:text-base font-medium">
              {agent?.designation}
            </h3>
            {agent?.reraID && (
              <h3 className="text-sm md:text-base font-medium">
                RERA - {agent?.reraID}
              </h3>
            )}
          </div>
          <div className="md:w-[30%]">
            <Image
              src={agent?.photo}
              alt={agent?.name}
              height={30}
              width={100}
              className="w-full object-contain"
            />
          </div>
        </div>
        <div className="flex mt-6 gap-2 md:gap-4">
          <Link href={`tel:${agent?.wpNum}`} className="w-1/2">
            {" "}
            <div className="flex items-center hover:scale-105 transition-all gap-3 border border-[#e4b5499e] px-2 py-1 rounded-3xl w-full">
              <Image src={call} alt="Phone Icon" width={20} height={20} />
              <p>Call Now</p>
            </div>
          </Link>

          <button
            onClick={()=>{handleOpenInquiry(agent._id)}}
            className="flex items-center hover:scale-105 transition-all border-[#e4b5499e] gap-3 border px-3 py-1 w-1/2 rounded-3xl justify-center"
          >
            <p>Inquiry</p>
          </button>
        </div>

        {/* inquiry */}

        {openInquiry && (
          <div className="w-full absolute top-4 md:top-36 md:-left-[5px] lg:-left-[70px] z-50 rounded px-5 ">
            <div
              className="md:w-[80%] lg:w-[60%] mx-auto flex justify-end font-semibold"
              onClick={()=>{handleOpenInquiry(agent._id)}}
            >
              <span className="cursor-pointer ">Close</span>
            </div>
            <div className="md:w-[80%] lg:w-[60%] mx-auto md:h-48 pt-4 pb-8 lg:py-16 bg-[#000] rounded">
              <h1 className="text-xl md:text-2xl text-center pt-3">
                Get call back for inquiry
              </h1>
              <form onSubmit={handleInquiry} className="px-10 mt-4">
                <div className="md:flex gap-4 space-y-3 md:space-y-0">
                  <input
                    type="text"
                    name="name"
                    id=""
                    placeholder="Name"
                    className="w-full bg-transparent py-2 px-4 border border-[#E4B649] rounded-3xl"
                    required
                  />

                  <input
                    type="number"
                    name="phone"
                    id=""
                    placeholder="Mobile"
                    className="w-full bg-transparent py-2 px-4 border border-[#E4B649] rounded-3xl"
                    required
                  />

                  <input
                    type="text"
                    name="email"
                    id=""
                    placeholder="Email"
                    className="w-full bg-transparent py-2 px-4 border border-[#E4B649] rounded-3xl"
                    required
                  />
                </div>
                <div className="flex w-full justify-center mt-4">
                  <button
                    type="submit"
                    className="py-2 w-full md:w-fit px-3 border border-[#E4B649] text-xl transition-all rounded-3xl hover:bg-[#625129]"
                  >
                    Send Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="text-center mt-3">
          <Link href={`/agents/${agent._id}`} className="text-[#E4B649]">
            View All Properties
          </Link>
          <div className="mx-4 border-t border-[#E4B649] my-4"></div>
          <Link
            href={`https://wa.me/${agent?.wpNum}`}
            className="text-sm md:text-base flex justify-center gap-1 items-center"
          >
            <span className="w-4 md:w-8">
              <Image src={whatsapp} alt="whatsapp" width={24} height={24} />
            </span>

            <span className="mt-1">
              Get your inquiry on{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD87C] to-[#A27100] hover:scale-105">
                WhatsApp
              </span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AgentInfo;
