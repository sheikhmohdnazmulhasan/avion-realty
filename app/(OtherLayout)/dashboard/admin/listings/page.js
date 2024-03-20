import Navbar from "@/components/dashboard/Navbar";
import Image from "next/image";
import img from '@/public/images/banner.png';
import bed from '@/public/images/dashboard/listing/bed.svg';
import bathroom from '@/public/images/dashboard/listing/bathroom.svg';
import sqft from '@/public/images/dashboard/listing/sqft.svg';
import location from '@/public/images/dashboard/listing/location.svg';
import live from '@/public/images/dashboard/listing/live.svg';
import edit from '@/public/images/dashboard/listing/edit.svg';
import { MdDelete } from "react-icons/md";


const Listing = () => {
    return (
        <div>
            <Navbar title={'Manage Listing'} />
            <div className="mt-20 mb-8 w-full text-sm border border-[#E4B649] min-h-screen">

                <div className="flex w-full">
                    <div className="w-[40%] py-3 border border-[#E4B649] text-center">
                        <p className="font-semibold">Property</p>
                    </div>
                    <div className="w-[15%] py-3 border border-[#E4B649] text-center">
                        <p className="font-semibold">Agent</p>
                    </div>
                    <div className="w-[15%] py-3 border border-[#E4B649] text-center">
                        <p className="font-semibold">Status</p>
                    </div>
                    <div className="w-[15%] py-3 border border-[#E4B649] text-center">
                        <p className="font-semibold">Leads</p>
                    </div>
                    <div className="w-[15%] py-3 border border-[#E4B649] text-center">
                        <p className="font-semibold">Action</p>
                    </div>
                </div>

                {/* each data */}
                <div className="">
                    <div className="flex items-center">
                        <div className="w-[40%] p-5">
                            <div className="flex items-center gap-3">
                                <Image width={96} height={96} src={img} alt="Listing image" className="w-16 h-16 rounded-md" />
                                <div className="">
                                    <h3 className="text-[20px] font-bold mb-2">Apartment for Rent</h3>
                                    <div className="flex gap-5">

                                        {/* bed */}
                                        <div className="flex items-center gap-2">
                                            <Image src={bed} alt="Bedroom svg" />
                                            <span>12</span>
                                        </div>

                                        {/* bathroom */}
                                        <div className="flex items-center gap-2">
                                            <Image src={bathroom} alt="bathroom svg" />
                                            <span>12</span>
                                        </div>

                                        {/* sqft */}
                                        <div className="flex items-center gap-2">
                                            <Image src={sqft} alt="scale svg" />
                                            <span>12 sq. ft.</span>
                                        </div>
                                    </div>

                                    {/* location */}
                                    <div className="flex items-center gap-2">
                                        <Image src={location} alt="Apartment Location svg" />
                                        <span className="mt-2">3811 Ditmars Blvd</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Agent */}
                        <div className="w-[15%] text-center ">
                            <span className="font-semibold"> Nazmul </span>
                        </div>

                        {/* Status */}
                        <div className="w-[15%] text-center ">
                            <span className="font-semibold">Ready </span>
                        </div>

                        {/* Leads */}
                        <div className="w-[15%] text-center ">
                            <span className="font-semibold">5 Leads </span>
                        </div>

                        {/* Leads */}
                        <div className="w-[15%] text-center gap-3 flex items-center justify-center">
                            <Image src={live} alt="Live svg" className="w-4 cursor-pointer hover:scale-125 transition-all" />
                            <Image src={edit} alt="Live svg" className="w-4 cursor-pointer hover:scale-125 transition-all" />
                            <MdDelete size={20} className="text-red-500 hover:text-red-600 cursor-pointer hover:scale-125 transition-all" />
                        </div>
                    </div>
                    <div className="mx-3">
                        <hr className="opacity-20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listing;