'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const PodcastDetails = ({ params }) => {
    const [loading, setLoading] = useState(true);
    const [agent, setAgent] = useState([]);
    setTimeout(() => { setLoading(false); }, 1000);

    const { data = [] } = useSWR(`http://localhost:3000/api/admin/podcast?id=${params.id}`, fetcher);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/users?email=${data?.agent}`).then(res => setAgent(res.data));

    }, [data])

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
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${data?.videoUrl?.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1]}`} title="ddddd" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>

            {/* updated info */}
            <div className="mt-3 text-[#E4B649]">
                <p className='font-semibold'>Publish Date: {new Date(data.createdAt).toLocaleDateString()}</p>

            </div>
        </div>
    );
};

export default PodcastDetails;