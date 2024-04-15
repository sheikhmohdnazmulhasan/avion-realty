'use client';

import axios from "axios";
import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";
import useSWR from "swr";

import location from '@/public/images/dashboard/listing/location.svg'
import bed from '@/public/images/dashboard/listing/bed.svg';
import sqft from '@/public/images/dashboard/listing/sqft.svg';


const ExploreOffPlans = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetcher = (url) => axios.get(url).then((res) => res.data);

    const { data = [], isLoading, error } = useSWR(`http://localhost:3000/api/offplans?status=Off-Plan`, fetcher);

    const handlePrev = () => {

        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);

        }

    }

    const handleNext = () => {

        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    return (
        <div className="">
            <h2 className="text-xl  md:text-2xl lg:text-3xl text-center lg:text-left">Explore Off-Plan Investment Opportunities in Dubai</h2>
            <p className="text-xl my-4 hidden lg:block">Explore exclusive off-plan investment opportunities in Dubai. Uncover unrivaled luxury, futuristic architecture, and prime locations. Discover a city where innovation meets opulence, creating a lucrative landscape for smart investors. Secure your stake in Dubai&apos;s dynamic real estate market for promising returns and a lifestyle beyond ordinary. Embrace the future of property investment with confidence. </p>

            {/* slider  */}
            <Link href={`/listing/Off-Plan/${data[currentIndex]?._id}`}> <div className="my-4 md:rounded-xl hover:scale-105 transition-all flex flex-col-reverse md:flex-row justify-between md:p-4 md:bg-[#171717] border border-[#E4B649] md:border-none ">

                <div className="md:m-4 space-y-4 p-3">
                    {/* status */}
                    <span className='hidden md:block w-24 bg-black px-4 py-2 rounded-xl text-xs uppercase'>{data[currentIndex]?.status}</span>
                    {/* property type */}
                    <h3 className="uppercase">{data[currentIndex]?.propertyType}</h3>
                    {/* title */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl">{data[currentIndex]?.title}</h2>
                    {/* location */}
                    <div className="flex items-center gap-2">
                        <Image quality={100} src={location} alt="location svg" />
                        <span className=''>{data[currentIndex]?.location}</span>
                    </div>
                    {/* price */}
                    <h2 className='text-xl font-extrabold'>
                        <span className='text-sm md:text-base text-[#E4B649]  mr-2 font-normal'>Start From</span>
                        <span>AED </span>{data[currentIndex]?.startingPrice} </h2>

                    <div className="flex gap-5 pb-4 text-xl">

                        {/* bed */}
                        <div className="flex items-center gap-2">
                            <Image quality={100} src={bed} alt="Bedroom svg" />
                            <span>{data[currentIndex]?.bedroom}</span>
                        </div>
                        {/* sqft */}
                        <div className="flex items-center gap-2">
                            <Image quality={100} src={sqft} alt="scale svg" />
                            <span className='text-sm md:text-base text-[#E4B649] font-normal'>Start From</span>
                            <span>{data[currentIndex]?.areaSqFt} sq. ft.</span>
                        </div>
                    </div>

                </div>

                {/* image */}
                <div className="relative md:static">
                    <Image quality={100} src={data[currentIndex]?.images[0]} alt={data[currentIndex]?.title} width={280} height={320} className="w-full h-[280px] md:h-full lg:w[280px] lg:h-[320px] object-fill md:rounded-l md:rounded-xl" />
                    <div className='bg-black px-4 py-1 rounded-2xl absolute top-4 left-4 text-xs uppercase md:hidden'><span>{data[currentIndex]?.status}</span></div>

                </div>
            </div></Link>

            {/* silde controller */}
            <div className="flex justify-between items-center text-xs px-4">
                {<button onClick={handlePrev} className={currentIndex < 1 && 'text-gray-500 cursor-not-allowed'}>PREV</button>}
                {/* <button>SHOW ALLL</button> */}
                <button onClick={handleNext} className={currentIndex == data.length - 1 && 'text-gray-500 cursor-not-allowed'}>NEXT</button>

            </div>
        </div>
    );
};

export default ExploreOffPlans;