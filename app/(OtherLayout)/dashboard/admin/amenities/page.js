"use client";
import Navbar from "@/components/dashboard/Navbar";
import useGetAmenities from "@/hooks/useGetAmenities";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";
import { mutate } from "swr";

const Amenities = () => {
  const [openModal, setOpenModal] = useState(false);
  const data = useGetAmenities();
  const { data: user } = useUser();

  async function handleDelete(_id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",

    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`hhttps://avion-realty.vercel.app/api/admin/amenities?id=${_id}`)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Amenity has been deleted.",
                icon: "success",
              });

              mutate(`hhttps://avion-realty.vercel.app/api/admin/amenities`);
            }
          })
          .catch((err) => console.log(err));
      }
    });
  }

  async function handleAddNew(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const icon = event.target.icon.files[0];

    const image = new FormData();
    image.append("image", icon);

    const toastId = toast.loading("Working...");

    const isExist = data.find(amenities => amenities.name === name);

    if (isExist) {

      toast.error('Amenities Already Exist.', { id: toastId });

      return

    } else {

      try {

        const imgBbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=1b9645a0c9d0c40edbb7d243c9167c7c`,
          image
        );
        if (imgBbResponse.data.success) {
          const dataForBackend = {
            name,
            icon: imgBbResponse.data.data.display_url,
          };

          // post data to database
          const serverResponse = await axios.post(
            "hhttps://avion-realty.vercel.app/api/admin/amenities",
            dataForBackend
          );
          if (serverResponse.data.success) {
            toast.success("Amenity Successfully Added", { id: toastId });
            setOpenModal(false);
            mutate(`hhttps://avion-realty.vercel.app/api/admin/amenities`);
          }
        }
      } catch (error) {
        console.log(error);
        throw new Error("Something wrong");
      }
    }



  }

  if (user.role !== 'admin') {

    return (
      <div className="grid h-screen place-content-center bg-[#0A0909] px-4">
        <h1 className="uppercase tracking-widest text-gray-200">401 | Unauthorized</h1>
      </div>
    );
  };

  return (
    <div className="relative">
      <Toaster />
      <Navbar title="Amenities" />
      {data.length && (
        <div className="mt-12 flex justify-end">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#835C00] rounded-xl px-3 py-1 flex items-center justify-center"
          >
            <FaPlus size={16} />
            <span className="mt-1 ml-1">Add New</span>
          </button>
        </div>
      )}

      {/* show data */}
      <div className="my-8 bg-[#161616] rounded-2xl p-8">
        {!data.length ? (
          <div className="h-[70vh] w-full flex flex-col items-center justify-center text-center">
            <h2 className="font-bold mb-5">No Data Found</h2>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#835C00] rounded-xl px-3 py-1 flex items-center justify-center"
            >
              <FaPlus size={16} />
              <span className="mt-1 ml-1">Add One</span>
            </button>
          </div>
        ) : (
          <ul className=" grid grid-cols-3 gap-8 h-[60vh] overflow-y-scroll ">
            {data?.map((amenity) => (
              <li
                key={amenity?._id}
                className="flex items-center gap-2 text-xl bg-[#171717] p-4 rounded-lg shadow-md shadow-gray-800"
              >
                <button onClick={() => handleDelete(amenity?._id)}>
                  <IoMdCloseCircle className="text-red-600 text-2xl" />
                </button>
                <h2>{amenity?.name}</h2>
              </li>
            ))}
          </ul>
        )}
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
                required
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
