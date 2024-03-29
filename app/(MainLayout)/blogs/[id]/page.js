'use client'
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';
import share from '@/public/images/root/blog/share.svg';
import Link from 'next/link';
import BlogCard from '@/components/root/BlogCard';
import Inquiry from '@/components/shared/Inquiry';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const BlogDetails = ({ params }) => {
    const { data = [] } = useSWR(`http://localhost:3000/api/agent/blog?id=${params.id}`, fetcher);
    const updatedDate = new Date(data?.createdAt).toLocaleDateString();

    const { data: allBlog = [] } = useSWR(`http://localhost:3000/api/agent/blog`, fetcher);
    const blogExceptThisBlog = allBlog.filter(blog => blog._id !== data._id);

    // {
    //     title: 'dhdhhd',
    //     description: 'dweded',
    //     blogImg: 'https://i.ibb.co/GHfBJjS/Screenshot-2023-06-07-093917.png',
    //     agentEmail: 'nazmul123@gmail.com',
    //     agentName: 'Nazmul X',
    //     agentImg: 'https://i.ibb.co/TBBFz5F/IMG-6209.jpg',
    //     agentDesignation: 'hfhfhfhd',
    //     agentId: '65f1f6aae781bf30e2c85b9c'
    //   }

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