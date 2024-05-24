'use client'

import Inquiry from "@/components/shared/Inquiry";
import usePodcast from "@/hooks/usePodcast";
import banner from '@/public/images/root/podcast/podcast-banner.png';
import imgX from '@/public/images/root/podcast/podcast2.png';
import Image from "next/image";
import Link from "next/link";

const Podcasts = () => {
    const [data] = usePodcast();

    return (
        <div>

            {/* banner */}
            <div className="">
                <Image src={banner} alt="Podcast banner image" />
            </div>

            {data.length ?
                <div className="px-5 mt-20 md:px-36 grid grid-cols-1 md:grid-cols-3 gap-4">

                    {data.map(podcast => <Link key={podcast._id} href={`/podcasts/${podcast._id}`}> <div className="h-80  border border-[#956900] rounded-t-xl">
                        <Image src={podcast?.thumbnail} height={800} width={800} alt={podcast?.title} className="h-52 rounded-t-xl" />
                        <div className="p-4 mt-2">
                            <h3 className="text-xl">{podcast?.title}</h3>
                            <div className="flex justify-between mt-4">
                                <p>{new Date(podcast?.createdAt).toDateString()}</p>
                                <Link href={'/'} className="text-[#E4B649]">Click to view</Link>
                            </div>
                        </div>
                    </div> </Link>)}
                </div> : <div className="flex justify-center pt-20 items-center text-center">
                    <p className="text-xl font-semibold ">No podcasts have been published yet!</p>
                    </div>}

            {/* blog reference */}
            <div className=" md:flex flex-row-reverse justify-between mx-5 md:mx-36 mt-36 items-center bg-[#0E0E0E]">

                <div className="md:w-[50%]">
                    <Image src={imgX} alt="blog reference image" className="w-full" />
                </div>

                <div className=" md:w-[50%] text-center flex md:block items-center mt-6 md:mt-0">
                    <h3 className="text-xl mb-7 w-[60%] md:w-full font-semibold">Delve into Latest blog & News of Recent launch</h3>
                    <Link href={'/blogs'} className="bg-[#835C00] hover:bg-[#6e5a2d] py-2 h-10 px-3 transition-all">News & Blogs</Link>
                </div>


            </div>
            <Inquiry />
        </div>
    );
};

export default Podcasts;