'use client'

import Inquiry from '@/components/shared/Inquiry';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const PodcastDetails = ({ params }) => {
    const [loading, setLoading] = useState(true);
    const [agent, setAgent] = useState([]);

    setTimeout(() => { setLoading(false); }, 1000);

    const { data = [] } = useSWR(`/api/admin/podcast?id=${params.id}`, fetcher);
    axios.get(`/api/users?email=${data?.agent}`).then(res => setAgent(res.data)).catch(err => console.log(err));

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
        <div className='px-5 md:px-36 mt-10'>
            {/* video */}
            <div className="">
                <iframe className='w-full h-64 md:h-[350px] lg:h-[550px]' src={`https://www.youtube.com/embed/${data?.videoUrl?.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1]}`} title={data?.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>

            <h1 className='text-3xl font-semibold mt-2'>{data?.title}</h1>

            {/* updated info */}
            <div className="mt-3 text-[#E4B649]">
                <p className='font-semibold'>Publish Date: {new Date(data.createdAt).toLocaleDateString()}</p>

            </div>

            {/* publisher info */}
            <div className="flex justify-between mt-6">

                <div className="flex items-center gap-3">
                    <Image src={agent?.photo} width={40} height={40} alt='agent Profile Picture' className='h-12 w-12 object-cover rounded-full' />
                    <div className="">
                        <p>{agent?.name}</p>
                        <p className='text-sm'>{agent?.designation}</p>
                    </div>
                </div>
                <Link href={`/agents/${agent?._id}`} className='px-2 pt-3 rounded-md text-center border border-[#e4b549a6]'>View Agent</Link>
            </div>

            {/* Description */}
            <div className="mt-10">
                <h1 className='text-xl font-semibold mb-3'>Description</h1>
                <p>{data?.description}</p>
            </div>
            <Inquiry />
        </div>
    );
};

export default PodcastDetails;