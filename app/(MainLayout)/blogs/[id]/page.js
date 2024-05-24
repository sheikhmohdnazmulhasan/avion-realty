'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import useSWR from 'swr';
import share from '@/public/images/root/blog/share.svg';
import Link from 'next/link';
import BlogCard from '@/components/root/BlogCard';
import Inquiry from '@/components/shared/Inquiry';
import facebook from "@/public/share/facebook.png";
import linkedin from "@/public/share/linkedin.png";
import mail from "@/public/share/mail.png";
import wp from "@/public/share/wp.png";
import twitter from "@/public/share/twitter.png";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const BlogDetails = ({ params }) => {
    const [coped, setCoped] = useState(false);
    const [loading, setLoading] = useState(true);
    setTimeout(() => { setLoading(false); }, 1000);

    const { data = [] } = useSWR(`/api/agent/blog?id=${params.id}`, fetcher);
    const updatedDate = new Date(data?.createdAt).toLocaleDateString();

    const { data: allBlog = [] } = useSWR(`/api/agent/blog`, fetcher);
    const blogExceptThisBlog = allBlog.filter(blog => blog._id !== data._id);


    // share

    // copy link
    function handleCopyLink() {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCoped(true);

        setTimeout(() => {
            setCoped(false);
        }, 1000);
    };

    function handleSocialShare(media) {
        if (media === "facebook") {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
            )}`;
            window.open(url, "_blank", "width=600,height=400");
        } else if (media === "mail") {
            const subject = `Check out ${data.title}`;
            const body = `I thought you might be interested in this property: ${window.location.href}`;
            const mailtoUrl = `mailto:?subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;
        } else if (media === "linkedin") {
            const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                window.location.href
            )}`;
            window.open(url, "_blank");
        } else if (media === "twitter") {
            const text = `Check out ${data.title}`;
            const url = encodeURIComponent(window.location.href);
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                text
            )}&url=${url}`;
            window.open(twitterUrl, "_blank", "width=600,height=400");
        } else if (media === "whatsapp") {
            const text = `Check out ${data.title}` + " " + window.location.href;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, "_blank");
        }
    }

    if (loading) {
        return (
            <>


                <div className="w-[90%] mx-auto my-10 animate-pulse bg-transparent hidden md:flex justify-between  items-center gap-6 p-36 rounded-md shadow-xl ">


                    {/* User profile  Skeleton */}
                    <div className="mt-8 w-full flex  flex-col justify-center">
                        <div className="w-[60%] rounded-lg bg-[#1f2123] h-7 mb-5"></div>
                        <div className="w-[100%] rounded-lg bg-[#1f2123] h-5 mb-3"></div>
                        <div className="w-[40%] rounded-lg bg-[#1f2123] h-[13px] mb-3"></div>
                        <div className="w-[80%] rounded-lg bg-[#1f2123] h-5 mb-3"></div>
                        <div className="w-[40%] rounded-lg bg-[#1f2123] h-3 mb-3"></div>
                        <div className="w-[20%] rounded-lg bg-[#1f2123] h-2 mb-3"></div>
                        <div className="w-[70%] rounded-lg bg-[#1f2123] h-1 mb-3"></div>
                        <div className="w-[30%] rounded-lg bg-[#1f2123] h-4 mb-3"></div>
                    </div>

                    {/* user post skeleton */}
                    <div className=" flex ">
                        <div className="w-96 h-96 rounded-lg bg-[#1f2123] animate-pulse"></div>
                    </div>
                </div>

                <div className=" min-h-screen flex justify-center items-center">
                    <div className="w-20 h-20 md:hidden border-l-2 border-green-500 rounded-full flex justify-center items-center animate-[spin_1.8s_linear_infinite]"><div className="w-16 h-16  border-b-2 border-indigo-500 rounded-full flex justify-center items-center animate-[spin_1.8s_linear_infinite]"><div className="w-10 h-10  border-r-2  border-sky-500 rounded-full animate-[spin_1.8s_linear_infinite]"></div></div></div>
                </div>
            </>
        );
    }

    return (
        <div className='px-5 md:px-36 mt-10 '>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-gray-900">
                    <h3 className="">
                        {" "}
                        <span className="font-bold text-lg">Share</span> {data.title}
                    </h3>
                    <div className="flex gap-4 justify-center items-center mt-8">
                        <Image
                            src={facebook}
                            alt="Facebook icon"
                            className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
                            onClick={() => handleSocialShare("facebook")}
                        />
                        <Image
                            src={mail}
                            alt="Facebook icon"
                            className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
                            onClick={() => handleSocialShare("mail")}
                        />
                        {/* <Image src={instagram} alt="Facebook icon" className="w-10 transition-all hover:scale-110 hover:cursor-pointer" onClick={() => handleSocialShare('instagram')} /> */}
                        <Image
                            src={linkedin}
                            alt="Facebook icon"
                            className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
                            onClick={() => handleSocialShare("linkedin")}
                        />
                        <Image
                            src={twitter}
                            alt="Facebook icon"
                            className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
                            onClick={() => handleSocialShare("twitter")}
                        />
                        <Image
                            src={wp}
                            alt="Facebook icon"
                            className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
                            onClick={() => handleSocialShare("whatsapp")}
                        />
                    </div>

                    {/* copy link */}
                    <div className="mt-10 flex justify-center items-center ">
                        <button
                            className="py-2 flex justify-center text-center hover:scale-105 gap-2 px-6 rounded-md hover:bg-sky-700 transition-all bg-sky-600 "
                            onClick={handleCopyLink}
                        >
                            Copy Link{" "}
                            {!coped ? (
                                <FaClipboard size={20} />
                            ) : (
                                <FaClipboardCheck size={20} />
                            )}{" "}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <Image src={data?.blogImg} width={800} height={800} alt={`${data.title}'s Image`} className='w-full h-60 md:h-[500px]' />
            <h1 className='text-3xl mt-3'>{data?.title}</h1>

            {/* updated info */}
            <div className="mt-3 text-[#E4B649] flex justify-between">
                <p className='font-semibold'>Updated: {updatedDate}</p>
                <div className="bg-[#373636] flex items-center gap-2 py-1 px-3 hover:cursor-pointer text-white rounded-md" onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                }>
                    <p>Share</p>
                    <Image src={share} alt='Share Icon' />
                </div>
            </div>

            {/* publisher info */}
            <div className="flex justify-between mt-6">

                <div className="flex items-center gap-3">
                    <Image src={data.agentImg} width={40} height={40} alt='agent Profile Picture' className='h-12 w-12 object-cover rounded-full' />
                    <div className="">
                        <p>{data?.agentName}</p>
                        <p className='text-sm'>{data?.agentDesignation}</p>
                    </div>
                </div>
                <Link href={`/agents/${data?.agentId}`} className='px-2 pt-3 rounded-md text-center border border-[#e4b549a6]'>View Agent</Link>
            </div>

            {/* main Content */}
            <div className="my-16">
                <p>{data?.description}</p>
            </div>

            <div className="">
                <h1 className='text-2xl mb-4'>More News & Blog</h1>
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
                    {blogExceptThisBlog.slice(0, 3).map(blog => <BlogCard key={blog._id} blog={blog} />)}
                </div>
            </div>
            <Inquiry />
        </div>

    );
};

export default BlogDetails;