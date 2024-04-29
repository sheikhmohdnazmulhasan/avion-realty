"use client";

import whatsapp from "@/public/images/whatsapp.svg";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

const Inquiry = () => {
  async function handleInquiry(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;

    const dataForBackend = { name, email, mobile: phone };

    try {
      const serverResponse = await axios.post(
        `/api/admin/inquiry`,
        dataForBackend
      );

      if (serverResponse.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message sent successfully",
          text: `Dear ${name}, Thank you for your interest. One of our agents will contact you shortly.`,
        });

        event.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="px-4 md:px-12 lg:px-20 py-8 md:py-16 text-center">
      <div className="uppercase font-light pb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl ">
          Immediate Assistance With Your Inquiry
        </h2>
        <p className="lg:w-3/5 mx-auto my-4 text-base md:text-xl lg:text-2xl ">
          Explore premier property consultation services in Dubai for a tailored
          and insightful real estate experience.
        </p>
      </div>

      {/* form */}
      <form
        className="flex flex-col lg:flex-row justify-center gap-6"
        onSubmit={handleInquiry}
      >
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          className="bg-transparent border border-[#E4B649] p-3 rounded-2xl"
          required
        />
        <input
          type="number"
          placeholder="Your Phone"
          name="phone"
          className="bg-transparent border border-[#E4B649] p-3 rounded-2xl"
        />
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          className="bg-transparent border border-[#E4B649] p-3 rounded-2xl"
          required
        />

        <input
          type="submit"
          value="Send"
          className="bg-[#b9943f] hover:bg-[#a58b4d] text-xl transition-all hover:cursor-pointer  font-extrabold text-black py-2 px-10 rounded-2xl"
          required
        />
      </form>

      <Link href={"https://wa.me/+971504597167"} target="_blank" className="">
        <div className="mt-12 flex justify-center gap-1 items-center hover:scale-105 transition-all">
          <span className="w-8 md:w-12">
            <Image src={whatsapp} alt="whatsapp" />
          </span>

          <span className=" md:text-2xl">
            Get your inquiry on{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD87C] to-[#A27100]">
              WhatsApp
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Inquiry;
