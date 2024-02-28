"use client";

// import connectMongoDB from "@/libs/mongodb";
// import AreaItem from "@/models/items/area";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import useSWR, { mutate } from "swr";

// define fetcher to fetch data in json format
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Areas = () => {
  const [openModal, setOpenModal] = useState(false);

  // get all data from api using swr
  const { data = [], error, } = useSWR(
    "http://localhost:3000/api/admin/items/area",
    fetcher
  );

  async function handleDeleteArea(_id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"

    }).then((result) => {
      if (result.isConfirmed) {


        axios.delete(`http://localhost:3000/api/admin/items/area?id=${_id}`).then(res => {

          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Area has been deleted.",
              icon: "success"
            });

            mutate(`http://localhost:3000/api/admin/items/area`);
          }

        }).catch(err => console.log(err))

      }
    });

  }

  async function handleAddNew(event) {
    event.preventDefault();
    const area = event.target.area.value;
    const areaImage = event.target.areaImage.files[0];

    const image = new FormData();
    image.append("image", areaImage);

    const toastId = toast.loading("Working...");

    try {
      // ***TODO: With this logic I used to match all the previous area names with the new area given by the admin.
      // If that data was already there, I would not have added it.
      // But when trying to do this (TypeError: Cannot read properties of undefined (reading 'models')) it shows this error!!

      // ***logic begging

      // await connectMongoDB();
      // const isExist = await AreaItem.findOne({ itemName: area });
      // console.log(isExist);

      // if (isExist) {
      //   toast.error('Area Already Exist!', { id: toastId });
      // return
      // }

      // ***logic end

      // (import commented! line: 3 and 4)

      // ***

      const imgBbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=10a0343a75c20fe85ce07c1d5561bfa1`,
        image
      );

      if (imgBbResponse.data.success) {
        const dataForBackend = {
          itemName: area,
          itemImg: imgBbResponse.data.data.display_url,
        };

        const serverResponse = await axios.post(
          "http://localhost:3000/api/admin/items/area",
          dataForBackend
        );

        if (serverResponse.data.success) {
          toast.success("Area Successfully Added", { id: toastId });
          setOpenModal(false);

          mutate(`http://localhost:3000/api/admin/items/area`)
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("Something wrong");
    }
  }

  return (
    <div className="bg-[#161616] p-6 rounded-2xl">
      <Toaster />
      <h2 className="text-xl font-semibold">Add/Remove Areas</h2>
      <div className="my-10 h-[60vh]  overflow-y-scroll pr-2">
        <ul className="h-full">
          {!data.length ? <>
            <div className="flex justify-center flex-col items-center h-full">
              <p className="font-bold mb-5">No Data Found</p>
              <button
                onClick={() => setOpenModal(true)}
                className="bg-[#835C00] rounded-3xl px-3 py-1 flex items-center justify-center"
              >
                <FaPlus size={16} />
                <span className="mt-1 ml-1">Add One</span>
              </button>
            </div>
          </> : <>
            {data?.map((area) => (
              <li key={area?._id} className="flex  items-center justify-between">
                <span>{area?.itemName}</span>
                <button onClick={() => handleDeleteArea(area?._id)}>
                  <IoMdCloseCircle className="text-red-600 text-xl" />
                </button>
              </li>
            ))}
          </>}
        </ul>
      </div>
      {data.length && <div className="flex justify-center">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#835C00] rounded-3xl px-3 py-1 flex items-center justify-center"
        >
          <FaPlus size={16} />
          <span className="mt-1 ml-1">Add More</span>
        </button>
      </div>}

      {/* modal for add more items */}
      {openModal && (
        <div className=" w-1/3 absolute top-1/4 left-1/3">
          <div className="text-right">
            <button onClick={() => setOpenModal(false)}>
              <IoMdClose size={24} />
            </button>
          </div>
          <div className="bg-[#161616] p-8 rounded-lg shadow shadow-gray-500  text-center">
            <h2 className="mb-6 text-xl font-semibold">Add Areas</h2>
            <form className=" space-y-6 " onSubmit={handleAddNew}>
              <input
                type="text"
                name="area"
                placeholder="write area name"
                className="bg-black w-full p-2 outline-none border border-dotted rounded-lg"
              />
              <br />
              <input
                type="file"
                name="areaImage"
                placeholder="write area name"
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

export default Areas;
