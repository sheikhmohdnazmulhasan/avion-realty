import Image from "next/image";
import Link from "next/link";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import { RiEditBoxFill } from "react-icons/ri";

import dummyImg from "@/public/images/dashboard/dummy.svg";
import Swal from "sweetalert2";
import axios from "axios";
import { mutate } from "swr";
import { useRef, useState } from "react";
import useAgents from "@/hooks/useAgents";
import toast, { Toaster } from "react-hot-toast";

const PodcastCard = ({ podcast }) => {
  const agents = useAgents();
  const [openModal, setOpenModal] = useState(false);

  const [showName, setShowName] = useState('prev');
  const [showImagePreview, setShowImagePreview] = useState(null);
  const fileInputRef = useRef();

  const handleClearFile = () => {
    setShowName('');
    setShowImagePreview('');
    fileInputRef.current.value = '';
  };

  async function handleDeletePodcast(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete podcast!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const serverResponse = await axios.delete(
            `hhttps://avion-realty.vercel.app/api/admin/podcast?id=${id}`
          );

          if (serverResponse.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: `Podcast has been deleted.`,
              icon: "success",
            });

            mutate("hhttps://avion-realty.vercel.app/api/admin/podcast");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  async function handleUpdatePodcast(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    const agent = event.target.agent.value;
    const videoUrl = event.target.videoUrl.value;

    const image = new FormData();
    image.append('image', showName);

    const toastId = toast.loading('Working',
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );

    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    if (!urlRegex.test(videoUrl)) {

      toast.error('Places Provide Valid YouTube Video URL', { id: toastId });

      return

    } else if (showName === 'prev') {

      const newData = { title, description, agent, videoUrl };

      axios.put(`hhttps://avion-realty.vercel.app/api/admin/podcast?id=${podcast._id}`, newData).then(res => {

        if (res.data.success) {
          toast.success('Podcast Updated without thumbnail!', { id: toastId });

          mutate("hhttps://avion-realty.vercel.app/api/admin/podcast");
          setOpenModal(false);
        }

      }).catch(err => toast.error(`There was a problem updating the database!`, { id: toastId }))


    } else {

      axios.post(`https://api.imgbb.com/1/upload?key=10a0343a75c20fe85ce07c1d5561bfa1`, image).then(res => {

        if (res.data.success) {

          const newData = { title, description, agent, videoUrl, thumbnail: res.data.data.display_url };

          axios.put(`hhttps://avion-realty.vercel.app/api/admin/podcast?id=${podcast._id}`, newData).then(res => {

            if (res.data.success) {
              toast.success('Podcast Updated with thumbnail!', { id: toastId });

              mutate("hhttps://avion-realty.vercel.app/api/admin/podcast");
              setOpenModal(false);
            }

          }).catch(err => toast.error(`There was a problem updating the database!`, { id: toastId }))

        }

      }).catch(err => toast.error(`There was a problem updating the image!`, { id: toastId }));

    }
  }

  return (
    <div className=" mx-4 py-2 border-b border-[#E4B649] border-opacity-50 grid grid-cols-5 text-center items-center p-2"
    >
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="col-span-2 flex items-center gap-4">
        <Image
          src={podcast?.thumbnail}
          height={100}
          width={100}
          alt={podcast.title}
          className="h-16 w-16 object-fill rounded-md"
        />
        <h2 className="font-semibold">{podcast.title.slice(0, 26)} {podcast.title.length > 26 && ' ...'}</h2>
      </div>
      <h2>{podcast.agent}</h2>
      <h2>{podcast.updatedAt}</h2>
      <div className="flex justify-center items-center gap-4">
        <button onClick={() => handleDeletePodcast(podcast._id)}>
          <IoMdCloseCircle className="text-red-600 text-xl" />
        </button>
        <button onClick={() => setOpenModal(!openModal)}>
          <RiEditBoxFill />
        </button>
      </div>

      {/* for edit , modal of form */}
      {
        openModal &&
        (<div className="w-2/3 absolute top-[1%] left-[15%] px-8 py-3 rounded-lg shadow shadow-gray-500 bg-black">
          <div className="text-right">
            <button onClick={() => setOpenModal(false)}>
              <IoMdClose size={24} />
            </button>
          </div>
          <h2 className="mb-6 text-xl font-semibold text-left">Edit Podcast</h2>
          <form onSubmit={handleUpdatePodcast} className="mt-3 text-sm text-left space-y-3">
            <div>
              <label>Title</label>
              <br />
              <input
                type="text"
                name="title"
                defaultValue={podcast.title}
                placeholder="Write podcast title"
                className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
              />
            </div>

            <div>
              <label>Description</label>
              <br />
              <textarea
                name="description"
                defaultValue={podcast.description}
                placeholder="Write description"
                className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
                rows={6}
              />
            </div>
            <div>
              <label>Select Agents</label>
              <br />
              <select
                name="agent"
                placeholder="Select multiple agents"
                defaultValue={podcast.agent}
                defaultChecked={podcast.agent}
                className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
              >

                {agents.map((agent) => (
                  <option key={agent._id} value={agent.name}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Add Video</label>
              <br />
              <input
                type="text"
                name="videoUrl"
                defaultValue={podcast.videoUrl}
                placeholder="Write url of podcast video"
                className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted "
              />
            </div>


            <div className="">
              <label htmlFor="">Picture</label>
              <div className=" mt-1 mb-10 ">

                {showName == 'prev' && (
                  <div className=" mx-auto flex items-center gap-x-6  rounded-md border border-dotted p-5">
                    <img className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover" src={podcast?.thumbnail} alt={podcast.title} />
                    <div className="flex-1 space-y-1.5 overflow-hidden">
                      <h5 className=" text-xl font-medium tracking-tight truncate">{showName?.name}</h5>
                      {/* <p className=" text-gray-500">{(showName.size / 1024).toFixed(1)} KB</p> */}
                    </div>
                    <div onClick={handleClearFile}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>

                    </div>
                  </div>
                )}

                {showName?.name && (
                  <div className=" mx-auto flex items-center gap-x-6  rounded-md border border-dotted p-5">
                    <img className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover" src={showImagePreview} alt={showName?.name} />
                    <div className="flex-1 space-y-1.5 overflow-hidden">
                      <h5 className=" text-xl font-medium tracking-tight truncate">{showName?.name}</h5>
                      <p className=" text-gray-500">{(showName.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <div onClick={handleClearFile}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>

                    </div>
                  </div>
                )}

                {showName !== 'prev' && !showName.name && <label className=" mx-auto flex w-full flex-col items-center justify-center bg-black space-y-3 rounded-md border border-dotted p-6" htmlFor="file5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>

                  <div className="space-y-1.5 text-center">
                    <h5 className="whitespace-nowrap text-lg font-medium tracking-tight ">Upload your file</h5>
                    <p className="text-sm text-gray-500">File Should be in PNG, JPEG or JPG formate</p>
                  </div>
                </label>}

                <input ref={fileInputRef} onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const imageFile = e.target.files[0];
                    setShowName(imageFile);
                    setShowImagePreview(URL.createObjectURL(imageFile));
                  }
                }} className="hidden" id="file5" type="file" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="bg-[#835C00] rounded-3xl px-4 py-2 flex items-center gap-1 justify-center font-bold ">
                Save Changes
              </button>
            </div>
          </form>
        </div>)}
    </div>

  );
};

export default PodcastCard;