'use client'

import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';

import location from '@/public/images/dashboard/listing/location.svg'
import bed from '@/public/images/dashboard/listing/bed.svg';
import bathroomSvg from '@/public/images/dashboard/listing/bathroom.svg';
import sqft from '@/public/images/dashboard/listing/sqft.svg';
import whatsapp from '@/public/images/contact/whatsapp.svg'
import call from '@/public/images/contact/call.svg'
import Inquiry from '@/components/shared/Inquiry';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ListingDetail = ({ params }) => {

    const { data = [], isLoading, error } = useSWR(`http://localhost:3000/api/offplans?status=${params.status}`, fetcher);

    return (
        <div>
            <div className='px-4 md:px-12 lg:px-20 py-8 md:py-16 text-center space-y-4'>
                <div className='hidden md:block'>
                    <h2 className='text-[#E4B649] text-3xl font-medium'>Discover a World of Possibilities</h2>
                    <p className='lg:w-3/5 mx-auto'>Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
                    {
                        data.map(item => <div key={item._id} className='border border-[#CC9107]'>
                            <div>
                                <Image src={item.images[0]} alt={item.title} width={100} height={300} className='w-full h-52 object-fill'/>
                            </div>
                            <div className='p-4 text-left space-y-2'>
                                <h2 className='capitalize text-xl font-medium'>{item.title}</h2>

                                {/* location */}
                                <div className="flex items-center gap-2">
                                    <Image src={location} alt="location svg"  />
                                    <span className='text-sm'>{item.location}</span>
                                </div>

                                {/* price */}
                                <h2 className='text-xl font-extrabold'><span>AED </span>{item.startingPrice}</h2>

                                <div className="flex gap-5 pb-4">

                                    {/* bed */}
                                    <div className="flex items-center gap-2">
                                        <Image src={bed} alt="Bedroom svg" />
                                        <span>{item.bedroom}</span>
                                    </div>

                                    {/* bathroom */}
                                    <div className="flex items-center gap-2">
                                        <Image src={bathroomSvg} alt="bathroom svg" />
                                        <span>{item.bathroom}</span>
                                    </div>

                                    {/* sqft */}
                                    <div className="flex items-center gap-2">
                                        <Image src={sqft} alt="scale svg" />
                                        <span>{item.areaSqFt} sq. ft.</span>
                                    </div>
                                </div>

                                <hr className='opacity-60'/>

                                {/* contact */}
                                <div className='flex justify-evenly'>
                                    <button>
                                        <Image src={whatsapp} alt='whatsapp svg'/>
                                    </button>
                                    <button>
                                        <Image src={call} alt='call svg'/>
                                    </button>
                                    <button>
                                        <Image src={whatsapp} alt='whatsapp svg'/>
                                    </button>
                                </div>

                            </div>
                        </div>)
                    }

                </div>
            </div>
            <Inquiry/>
        </div>
        
    );
};

export default ListingDetail;