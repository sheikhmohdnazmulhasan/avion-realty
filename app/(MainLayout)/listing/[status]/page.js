'use client'

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import location from '@/public/images/dashboard/listing/location.svg'
import property from '@/public/images/dashboard/listing/property.svg'
import bed from '@/public/images/dashboard/listing/bed.svg';
import Inquiry from '@/components/shared/Inquiry';
import { HiOutlineSearch } from 'react-icons/hi';
import useGetAreas from '@/hooks/useGetAreas';
import useGetProperties from '@/hooks/useGetProperties';
import ListingCard from '@/components/listing/ListingCard';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const ListingDetail = ({ params }) => {
    const { data = [], isLoading, error } = useSWR(`http://localhost:3000/api/offplans?status=${params.status}`, fetcher);

    const areas = useGetAreas();
    const properties = useGetProperties();

    const [listings, setListings] = useState([]);

    const dataFilterByArea = (value) => {
        axios.get(`http://localhost:3000/api/offplans?area=${value}`).then(res => setListings(res.data)).catch(err => console.log(err))
    }

    const dataFilterByProperty = (value) => {
        axios.get(`http://localhost:3000/api/offplans?propertyType=${value}`).then(res => setListings(res.data)).catch(err => console.log(err))
    }

    useEffect(()=>{
        setListings(data);
    },[data])

    return (
        <div>
                <div className=' px-4 md:px-12 lg:px-20 py-4 md:py-12 lg:py-16 border-b border-[#262626]'>
                    {/* description */}
                    {
                        params.status === 'Off-Plan' ? (
                            <>
                                <h2 className='text-3xl lg:hidden'>Dubai Off-Plan Investment Opportunities</h2>
                                <h2 className='text-2xl hidden lg:block'>Discover Luxury Off-Plan Investment Potential in Dubai Real Estate</h2>
                                <p className='text-[#999] my-2 lg:hidden'>The city&apos;s cultural fusion is mirrored in its real estate offerings, from waterfront residences to golf course estates. Dubai&apos;s inclusive atmosphere and diverse communities create an inviting lifestyle for residents and a robust market for investors.</p>
                                <p className='text-[#999] text-xl my-4 hidden lg:block'>Dubai, nestled between desert and sea, epitomizes modern opulence and enticing investment prospects. Its iconic skyline, adorned with structures like the Burj Khalifa, showcases prime real estate opportunities. Boasting a global business hub, Dubai attracts investors seeking both innovative spaces and thriving communities.
                                <br/> <br/>
                                The city&apos;s cultural fusion is mirrored in its real estate offerings, from waterfront residences to golf course estates. Dubai&apos;s inclusive atmosphere and diverse communities create an inviting lifestyle for residents and a robust market for investors.
                                <br/> <br/>
                                In conclusion, Dubai&apos;s real estate landscape unfolds a tapestry of possibilities, where dreams come to life amidst modernity and tradition. It beckons those in search of a property and a lifestyle beyond the ordinary, making every investment an invitation to an extraordinary future.</p>
                            </>
                        ) : (
                            <>
                                <h2 className='text-2xl lg:text-3xl'>Find Your Dream Property</h2>
                                <p className='text-[#999] lg:text-xl my-4'>Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey </p>
                            </>
                        )
                    }
                </div>
                <div className='px-4 md:px-12 lg:px-20 py-4 space-y-4'>
                    {/* search bar */}
                    <form className="hidden md:flex items-center bg-[#0F0F0F] w-full pl-8 pr-4 justify-around py-3 rounded-3xl my-8">
                        <span className="w-1 ">
                        <HiOutlineSearch />
                        </span>
                        <input
                        type="text"
                        placeholder="Search For A Property or Location"
                        className="bg-transparent w-2/3 lg:w-4/5"
                        />
                        <button className="bg-[#E4B649] text-black flex items-center font-extrabold gap-2 py-2 px-4 rounded-3xl">
                        <span>
                            <HiOutlineSearch />
                        </span>
                        <span>Find Property</span>
                        </button>
                    </form>

                    {/* multiple search */}
                    <div className="hidden md:grid grid-cols-4 items-center gap-6 bg-[#0F0F0F] w-full px-6 py-3 rounded-3xl my-8">
                       {/* area */}
                        <div className='bg-[#272727] rounded-lg py-2 px-4 flex gap-3'>
                            <Image src={location} alt='loaction svg' className='w-6'/>
                            <select
                                name="area"
                                className=" w-full border-l bg-transparent px-2 "
                                onChange={(event)=>dataFilterByArea(event.target.value)}
                                >
                                <option value="" selected disabled>
                                    Area
                                </option>
                                {areas.map((area) => (
                                    <option key={area._id} value={area.itemName} className='bg-[#272727]'>
                                    {area.itemName}
                                    </option>
                                ))}
                            </select>
                        </div>
                       {/* property */}
                        <div className='bg-[#272727] rounded-lg py-2 px-4 flex gap-3'>
                            <Image src={property} alt='property svg' className='w-8' />
                            <select
                                name="propertyType"
                                className=" w-full border-l bg-transparent px-2 "
                                onChange={(event)=>dataFilterByProperty(event.target.value)}
                                >
                                <option value="" selected disabled>
                                    Property type
                                </option>
                                {properties.map((property) => (
                                    <option key={property._id} value={property.propertyName} className='bg-[#272727]'>
                                    {property.propertyName}
                                    </option>
                                ))}
                            </select>
                        </div>
                       {/* Bedrooms */}
                        <div className='bg-[#272727] rounded-lg py-2 px-4 flex gap-3'>
                            <Image src={bed} alt='bed svg' className='w-4 '/>
                            <div className="bg-transparent px-2 border-l w-full items-center flex justify-between">
                            <p>Bedrooms</p>
                            <input
                                type="number"
                                min="1"
                                max="7"
                                name="bedroom"
                                className="bg-transparent"
                                // onChange={(event)=>setListings(data.filter(item => item.bedroom === event.target.value))}
                            />
                            </div>      
                        </div>
                       
                    </div>

                    {/* section header */}
                    <div className='hidden md:block text-center py-4 lg:py-16'>
                        <h2 className='text-[#E4B649] text-3xl font-medium'>Discover a World of Possibilities</h2>
                        <p className='lg:w-1/2 my-4 mx-auto'>Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 py-4'>
                        {/* listing card */}
                        {
                            listings.map(item => <ListingCard key={item._id} item={item} status={params.status} />)
                        }

                    </div>
                    {/*  Strategic Investment */}
                    <div className='py-4 md:py-12 lg:py-16'>
                        <h2 className='text-2xl lg:text-3xl'>A Strategic Investment Oasis for Prosperity and Luxury</h2>
                        <p className='my-4'>Investing in Dubai&apos;s real estate market offers a compelling opportunity for astute investors seeking both stability and lucrative returns. Renowned for its dynamic economy and visionary development initiatives, Dubai stands as a global hub for business and luxury living. The city&apos;s strategic location, at the crossroads of Europe, Asia, and Africa, positions it as a prime destination for international trade and commerce, fostering a diverse and resilient economy. </p>
                    </div>
                </div>
            <Inquiry/>
        </div>
        
    );
};

export default ListingDetail;