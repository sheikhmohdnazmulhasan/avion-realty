'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import useSWR from 'swr';
import share from '@/public/images/root/blog/share.svg';
import Link from 'next/link';
import BlogCard from '@/components/root/BlogCard';
import Inquiry from '@/components/shared/Inquiry';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const BlogDetails = ({ params }) => {
    const [loading, setLoading] = useState(true);

    const { data = [] } = useSWR(`https://avion-realty.vercel.app/api/agent/blog?id=${params.id}`, fetcher);
    const updatedDate = new Date(data?.createdAt).toLocaleDateString();

    const { data: allBlog = [] } = useSWR(`https://avion-realty.vercel.app/api/agent/blog`, fetcher);
    const blogExceptThisBlog = allBlog.filter(blog => blog._id !== data._id);

    setTimeout(() => { setLoading(false); }, 1000);

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
            <Image src={data?.blogImg} width={800} height={800} alt='Blog Image' className='w-full h-60 md:h-[500px]' />
            <h1 className='text-3xl mt-3'>{data?.title}</h1>

            {/* updated info */}
            <div className="mt-3 text-[#E4B649] flex justify-between">
                <p className='font-semibold'>Updated: {updatedDate}</p>
                <div className="bg-[#373636] flex items-center gap-2 py-1 px-3 text-white rounded-md">
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