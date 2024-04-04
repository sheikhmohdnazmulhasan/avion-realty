'use client';
import readyRentImg from "@/public/images/root/home/readyRent.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ExploreRentReady = () => {
    const [isHoverRent, setIsHoverRent] = useState(false);
    const [isHoverBuy, setIsHoverBuy] = useState(false);

    return (
        <div>
            <p className="px-4 text-xl pb-6 md:hidden">Find your perfect place in Dubai – whether you want to own it or rent it. Your dream home is just a step away!</p>

            <div className="my-4 rounded-xl flex flex-col gap-6 md:flex-row justify-between items-center p-4 bg-[#171717]">
                <div className="px-4 lg:px-12 space-y-3 lg:space-y-6 md:w-1/2">
                    <Link href='/listing/Rent' className="grid grid-cols-3" onMouseEnter={() => setIsHoverRent(true)} onMouseLeave={() => setIsHoverRent(false)}>
                        <h2 className="text-2xl lg:text-4xl md:font-extrabold ">RENT</h2>
                        <div className="flex items-center col-span-2">
                            <progress className={`progress progress-warning ${isHoverRent ? 'w-40 lg:w-80' : 'w-32 lg:w-56'}`} value="100" max="100"></progress>
                            <div className="p-2.5 bg-[#FFBE00] rounded-full -ml-2 z-10"></div>
                        </div>
                    </Link>
                    <Link href='/listing/Ready' className="grid grid-cols-3" onMouseEnter={() => setIsHoverBuy(true)} onMouseLeave={() => setIsHoverBuy(false)}>
                        <h2 className="text-2xl lg:text-4xl md:font-extrabold">BUY</h2>
                        <div className="flex items-center col-span-2">
                            <progress className={`progress progress-warning ${isHoverBuy ? 'w-40 lg:w-80' : 'w-32 lg:w-56'}`} value="100" max="100"></progress>
                            <div className="p-2.5 bg-[#FFBE00] rounded-full -ml-2 z-10"></div>
                        </div>
                    </Link>

                    <p className="lg:text-xl hidden md:block">Find your perfect place in Dubai – whether you want to own it or rent it. Your dream home is just a step away!</p>
                </div>

                <div className="md:w-1/2">
                    <Image src={readyRentImg} alt='ready rent png' className="w-full md:rounded-l rounded-xl " />
                </div>
            </div>
        </div>
    );
};

export default ExploreRentReady;