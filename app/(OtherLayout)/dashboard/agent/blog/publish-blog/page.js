'use client'

import Navbar from '@/components/dashboard/Navbar';
import Image from 'next/image';
import React from 'react';
import { useRef, useState } from 'react';
import publish from "@/public/images/dashboard/listing/publish.svg";
import axios from 'axios';
import useUser from '@/hooks/useUser';
import toast, { Toaster } from 'react-hot-toast';

const PublishBlog = () => {
    const user = useUser();
    const [showName, setShowName] = useState(null);
    const [showImagePreview, setShowImagePreview] = useState({});
    const fileInputRef = useRef();

    const handleClearFile = () => {
        setShowName('');
        setShowImagePreview('');
        fileInputRef.current.value = '';
    };

    function handleCreateNewBlog(event) {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;

        const image = new FormData();
        image.append('image', showName);

        const toastId = toast.loading("Working...", {
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
        });

        if (!showName) {
            toast.error(`Please Select One Image`, { id: toastId });

        }else if (!user.data.photo){
            toast.error(`Before publish a blog, you must be set your profile picture.`, { id: toastId });
        }
        else if (!user.data.designation){
            toast.error(`Before publish a blog, you must be set your designation.`, { id: toastId });
        }
        else {
            axios.post(`https://api.imgbb.com/1/upload?key=10a0343a75c20fe85ce07c1d5561bfa1`, image).then(res => {

                const dataForBackend = { title, description, blogImg: res.data.data.display_url, agentEmail: user.data.email, agentName: user.data.name, agentImg: user.data.photo, agentDesignation: user.data.designation, agentId: user.data._id };

                axios.post(`http://localhost:3000/api/agent/blog`, dataForBackend).then(res => {

                    if (res.data.success) {
                        toast.success(`${title} Published!`, { id: toastId })
                        event.target.reset();
                        handleClearFile();

                    } else {
                        toast.error(`Something Wrong!`, { id: toastId })
                    }

                }).catch((error) =>{ toast.error(`Something Wrong!`, { id: toastId })
                console.log(error);
            })

            }).catch((error) =>{ toast.error(`Something Wrong!`, { id: toastId })
                console.log(error);
            })
        }
    }

    return (
        <div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <Navbar title={'Publish A Blog'} />

            <form className='mt-16 mr-8 space-y-8' onSubmit={handleCreateNewBlog}>
                <div className="">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id='title' placeholder="Write Blog Title" className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted" required />
                </div>

                <div className="">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder='Write Your Content Here' className='w-full p-2 h-64 bg-transparent border border-dotted rounded-md mt-1' required />
                </div>

                <div className="">
                    <label htmlFor="">Picture</label>
                    <div className=" mt-1 mb-10 ">
                        {showName?.name ? (
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
                        ) : (
                            <label className=" mx-auto flex w-full flex-col items-center justify-center bg-black space-y-3 rounded-md border border-dotted p-6" htmlFor="file5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                </svg>

                                <div className="space-y-1.5 text-center">
                                    <h5 className="whitespace-nowrap text-lg font-medium tracking-tight ">Upload your file</h5>
                                    <p className="text-sm text-gray-500">File Should be in PNG, JPEG or JPG formate</p>
                                </div>
                            </label>
                        )}

                        <input ref={fileInputRef} onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const imageFile = e.target.files[0];
                                setShowName(imageFile);
                                setShowImagePreview(URL.createObjectURL(imageFile));
                            }
                        }} className="hidden" id="file5" type="file" />
                    </div>
                </div>

                <div className="flex  justify-end">
                    <button className="bg-[#835C00] ml-2 flex hover:cursor-pointer px-24 py-2 rounded-md  gap-2 items-center" >
                        <span>Publish Blog</span>
                        <Image src={publish} alt="publish" height={16} width={16} />
                    </button>
                </div>
            </form>

        </div>
    );
};

export default PublishBlog;