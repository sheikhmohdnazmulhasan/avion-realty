'use client'
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import call from '@/public/images/root/call.svg';
import whatsapp from "@/public/images/whatsapp.svg"

const fetcher = (url) => axios.get(url).then((res) => res.data);
const ListingDetail = ({params}) => {

    const {data = []} = useSWR(`http://localhost:3000/api/offplans?id=${params.id}`, fetcher);
    console.log(data);
    const {data : agent = []} = useSWR(`http://localhost:3000/api/users?email=${data.agent}`, fetcher);
    return (
        <div className='md:px-16 lg:px-20 mt-10 min-h-screen'>
            {/* image section will be added soon */}
            <h2 className='text-center'>image section will be added soon </h2>

            {/* details  */}
            <div className='flex justify-between gap-4'>
                {/* listing details */}
                <div className='w-[70%] border'></div>
                {/* agent information */}
                <div className='w-[30%] border border-[#BE8500] rounded-2xl p-4'>
                    <div className='flex items-end justify-between gap-2 '>
                        <div className='space-y-2'>
                            <h2 className='text-xl font-semibold'>{agent?.name}</h2>
                            <h3 className='font-medium'>{agent?.designation}</h3>
                            <h3 className='font-medium'>RERA - {agent?.reraID}</h3>
                        </div>
                        <div className='w-[40%]'>
                            <Image src={agent.photo} alt={agent?.name} height={30} width={60} className='w-full object-contain'/>
                        </div>
                    </div>
                    <div className="flex mt-6 gap-6">
                                <Link href={`tel:${agent?.wpNum}`} className='w-1/2'>  <div className="flex items-center hover:scale-105 transition-all gap-3 border border-[#e4b5499e] px-2 py-1 rounded-3xl w-full">
                                    <Image src={call} alt="Phone Icon" />
                                    <p>Call Now</p>
                                </div></Link>

                                <div className="flex items-center hover:scale-105 transition-all border-[#e4b5499e] gap-3 border px-3 py-1 w-1/2 rounded-3xl justify-center">
                                    <Link href={''}><p>Inquiry</p></Link>
                                </div>
                    </div>
                    <div className='text-center my-6'>
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
    );
};

export default ListingDetail;