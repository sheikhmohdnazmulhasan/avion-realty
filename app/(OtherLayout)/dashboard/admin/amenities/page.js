"use client";
import Navbar from "@/components/dashboard/Navbar";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Amenities = () => {
  const [openModal, setOpenModal] = useState(false);

  async function handleAddNew(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const icon = event.target.icon.files[0];

    // console.log(name, icon);
    const image = new FormData();
    image.append(image, icon);

    const toastId = toast.loading("Working...");

    try {
      // host icon to imgbb
      // const imgbbAPI = process.env.IMGBB_API;
      // console.log(imgbbAPI);
      const imgBbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=10a0343a75c20fe85ce07c1d5561bfa1`,
        image
      );
      console.log(imgBbResponse);
    } catch (error) {
      console.log(error);
      throw new Error("Something wrong");
    }
  }

  return (
    <div className="relative">
      <Navbar title="Amenities" />
      <div className="mt-12 flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#835C00] rounded-xl px-3 py-1 flex items-center justify-center"
        >
          <FaPlus size={16} />
          <span className="mt-1 ml-1">Add New</span>
        </button>
      </div>

      {/* form for add new amenities */}
      {openModal && (
        <div className="w-2/5 absolute top-1/4 left-1/3">
          <div className="text-right">
            <button onClick={() => setOpenModal(false)}>
              <IoMdClose size={24} />
            </button>
          </div>
          <div className="bg-[#161616] p-8 rounded-lg shadow shadow-gray-500  text-center">
            <h2 className="mb-6 text-xl font-semibold">Add New Amenity</h2>
            <form className=" space-y-6" onSubmit={handleAddNew}>
              <input
                type="text"
                name="name"
                placeholder="write new amenity name"
                className="bg-black w-full p-2 outline-none border border-dotted rounded-lg"
              />
              <br />
              <input
                type="file"
                name="icon"
                placeholder="Add Icon"
                className="bg-black w-full p-2  outline-none border border-dotted rounded-lg "
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

export default Amenities;
