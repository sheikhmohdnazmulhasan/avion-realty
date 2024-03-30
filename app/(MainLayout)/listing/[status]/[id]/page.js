'use client'
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import call from '@/public/images/root/call.svg';
import whatsapp from "@/public/images/whatsapp.svg"
import { CiShare2 } from "react-icons/ci";
import bathroom from '@/public/images/dashboard/listing/bathroom.svg'
import bed from '@/public/images/dashboard/listing/bed.svg'
import triangleSqrft from '@/public/images/dashboard/listing/triangleSqrft.svg'
import floorPlan from '@/public/images/dashboard/listing/floorPlan.svg'
import location from '@/public/images/dashboard/listing/location.svg'
import ShowAmenities from '@/components/listing/ShowAmenities';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const ListingDetail = ({params}) => {

    const {data = []} = useSWR(`http://localhost:3000/api/offplans?id=${params.id}`, fetcher);
    console.log(data);
    const {data : agent = []} = useSWR(`http://localhost:3000/api/users?email=${data.agent}`, fetcher);
    return (
        <div >
            <div className='md:mx-36 md:my-20 min-h-screen'>
                {/* image section will be added soon */}
                <h2 className='text-center'>image section will be added soon </h2>

                {/* details  */}
                <div className='flex justify-between gap-12 mt-12'>
                    {/* listing info */}
                    <div className='w-[70%]'>
                        {/* title */}
                        <h2 className='text-3xl font-medium'>{data.title}</h2>
                        {/* price */}
                        <div className='my-10 flex justify-between items-center'>
                            <h2 className='text-3xl font-medium'>{data.status === 'Off-Plan' && <span className='text-xl'>Starting Prices</span>} AED {data.startingPrice}</h2>
                            {/* price converter and share */}
                            <div className='flex gap-8 my-6'>
                                {/* price converter */}
                                <select className='bg-transparent px-3 py-1 text-xl border rounded-2xl'>
                                    <option selected value="usd" className='bg-black'>USD</option>
                                    <option value="bdt" className='bg-black'>BDT</option>
                                </select>
                                {/* share */}
                                <button className='flex gap-3 items-center text-xl px-3 py-1 border rounded-2xl'>
                                    <CiShare2 size={24}/>
                                    <span>Share</span>
                                </button>
                            </div>
                            
                        </div>
                        {/* bed, bath, sqrft, floorplan */}
                        <div className='text-xl  flex justify-between items-center'>
                            {/* bed */}
                            <div className='flex gap-3 items-center'>
                                <Image src={bed} alt='bed svg' width={24} height={24}/>
                                <span>{data.bedroom} Beds</span>
                            </div>
                            {/* bathroom  */}
                            {
                                data.status !=='Off-Plan' &&(
                                    <div className='flex gap-3 items-center'>
                                        <Image src={bathroom} alt='bathroom svg' width={24} height={24}/>
                                        <span>{data.bathroom} Baths</span>
                                    </div>
                                )
                            }
                            {/* area sqrft  */}
                            <div className='flex gap-3 items-center'>
                                <Image src={triangleSqrft} alt='triangleSqrft svg' width={24} height={24}/>
                                {data.status === 'Off-Plan' && <span className='text-[#E4B649]'>Area From</span>} 
                                <span>{data.areaSqFt} Sq.Ft.</span>
                            </div>
                            {/* download floorplan */}
                            <a className='bg-gradient-to-r from-[#A87601] to-[#835C00] text-sm items-center flex gap-2 px-2 py-2 rounded-md'>
                                <Image src={floorPlan} alt='floorPlan svg' width={24} height={24}/>
                                <span>Download Floorplan</span>
                            </a>
                        </div>
                        {/* location */}
                        <div className='text-xl flex gap-3 items-center my-10'>
                            <Image src={location} alt='location svg' width={24} height={24}/>
                            <span>{data.location}</span>
                        </div>

                        {/* listing details */}
                        <div className='mt-20'>
                            <h2 className='text-xl'>Listing Details</h2>
                            <div className='border border-[#d6d6d6] p-6 mt-4 grid grid-cols-2 gap-6'>
                                <div className='flex justify-between border-b'>
                                    <p>Location</p>
                                    <p>{data.area}</p>
                                </div>
                                <div className='flex justify-between border-b'>
                                    <p>Price Per sq.ft</p>
                                    <p>{parseFloat(data.startingPrice / data.areaSqFt).toFixed(2)} AED</p>
                                </div>
                                <div className='flex justify-between border-b'>
                                    <p>Developer</p>
                                    <p>{data.developer}</p>
                                </div>
                                <div className='flex justify-between border-b'>
                                    <p>Completion Status</p>
                                    <p>{data.completion}</p>
                                </div>
                                <div className='flex justify-between border-b'>
                                    <p>Property Type</p>
                                    <p>{data.propertyType}</p>
                                </div>
                                <div className='flex justify-between border-b'>
                                    <p>Views</p>
                                    <p>{data.views}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* payment */}
                        <div></div>

                        {/* amenities */}
                        <div className='mt-20'>
                            <h2 className='text-xl'>Amenities</h2>
                            <div className='grid grid-cols-3 justify-between mt-4'>
                                {data?.amenities?.map((amenity,ind) => <ShowAmenities key={ind} amenity={amenity}/>)}
                            </div>
                        </div>

                        {/* description */}
                        <div className='mt-20'>
                            <h2 className='text-xl'>Description</h2>
                            <p className='mt-4'>{data.description}</p>
                        </div>
                    </div>
                    {/* agent information */}
                    <div className='w-[30%] h-[300px] border border-[#BE8500] rounded-2xl p-4'>
                        <div className='flex items-end justify-between gap-2 '>
                            <div className='space-y-2'>
                                <h2 className='text-xl font-semibold'>{agent?.name}</h2>
                                <h3 className='font-medium'>{agent?.designation}</h3>
                                <h3 className='font-medium'>RERA - {agent?.reraID}</h3>
                            </div>
                            <div className='w-[30%]'>
                                <Image src={agent?.photo} alt={agent?.name} height={30} width={100} className='w-full object-contain'/>
                            </div>
                        </div>
                        <div className="flex mt-6 gap-6">
                                    <Link href={`tel:${agent?.wpNum}`} className='w-1/2'>  <div className="flex items-center hover:scale-105 transition-all gap-3 border border-[#e4b5499e] px-2 py-1 rounded-3xl w-full">
                                        <Image src={call} alt="Phone Icon" width={24} height={24} />
                                        <p>Call Now</p>
                                    </div></Link>

                                    <div className="flex items-center hover:scale-105 transition-all border-[#e4b5499e] gap-3 border px-3 py-1 w-1/2 rounded-3xl justify-center">
                                        <Link href={''}><p>Inquiry</p></Link>
                                    </div>
                        </div>
                        <div className='text-center mt-3'>
                            <Link href='/' className='text-[#E4B649]'>View All Properties</Link>
                            <div className='mx-4 border-t border-[#E4B649] my-4'></div>
                            <Link href={`https://wa.me/${agent?.wpNum}`} className=' flex justify-center gap-1 items-center'>

                                <span className="w-4 md:w-8">
                                <Image src={whatsapp} alt="whatsapp" width={24} height={24} />
                                </span>

                                <span>Get your inquiry on <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#FFD87C] to-[#A27100] hover:scale-105'>WhatsApp</span></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* schedule */}
            <div className='border-t py-8 md:px-36 flex gap-8'>
                <div className='space-y-2'>
                    <Image src={agent?.photo} alt={agent?.name} height={80} width={280}/>
                    <h2 className='text-xl font-semibold'>{agent?.name}</h2>
                    <h3 className='font-medium'>{agent?.designation}</h3>
                </div>
                <div>
                    <h2 className='text-2xl font-medium'>SCHEDULE PROPERTY TOUR</h2>
                    <p>Our representative will guide you through the property viewing.</p>
                    {/* call section */}
                    <div className='mt-4 flex gap-4'>
                        <button className='bg-[#393939] opacity-70 py-2 px-4 border border-[#E4B649]'>VIDEO CALL</button>
                        <button className='py-2 px-4 opacity-70 border border-[#E4B649]'>IN PERSON</button>
                    </div>
                    {/*schedule form */}
                    <form className='mt-4 opacity-80'>
                        <input type='text' placeholder='Your Name' className='bg-transparent text-xl border-b border-[#E4B649] w-full outline-none '/>
                        <input type='number' placeholder='Your Phone' className='bg-transparent text-xl border-b border-[#E4B649] w-full outline-none mt-4'/>
                        <input type='email' placeholder='Mail' className='bg-transparent text-xl border-b border-[#E4B649] w-full outline-none mt-4'/>
                        <div className='flex justify-between mt-4'>
                            <label className='text-xl'>select Date</label>
                            <input type='date' className='bg-transparent text-xl outline-none '/>
                        </div>
                        <div className='flex justify-end mt-4'>
                            <input type='submit' value="Send Now" className='border border-[#E4B649] px-2 py-1'/>
                        </div>
                    </form>
                    <Link href={`tel:${agent?.wpNum}`}  className='mt-4 mb-8 flex justify-center gap-1 items-center'>

                        <span className="w-8 md:w-12">
                        <Image src={whatsapp} alt="whatsapp" />
                        </span>

                        <span className=' md:text-2xl'>Get your inquiry on <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#FFD87C] to-[#A27100]'>WhatsApp</span></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ListingDetail;