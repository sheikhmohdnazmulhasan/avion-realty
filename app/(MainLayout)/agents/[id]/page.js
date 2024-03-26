'use client'
import axios from "axios";
import useSWR from "swr";
import homeIcon from '@/public/images/root/home.svg';
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import call from '@/public/images/root/call.svg';
import wp from '@/public/images/root/wp.svg';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const AgentDetails = ({ params }) => {

    const { data: agent = [], isLoading } = useSWR(`http://localhost:3000/api/users?id=${params.id}`, fetcher);

    const { data: properties = [] } = useSWR(`http://localhost:3000/api/offplans?agent=${agent.email}`, fetcher);

    return (
        <div className="">

            {/* Route Definition */}
            <div className="md:px-16 lg:px-20 mt-10 hidden md:block">
                <div className="flex items-center gap-2">
                    <Link href={'/'}><Image src={homeIcon} alt="home icon" /></Link>
                    <Link href={'/agents'} className="hover:underline">Agents</Link>
                    <IoIosArrowForward />
                    <Link href={`/agents/${agent._id}`}><p className="hover:cursor-pointer hover:underline">{agent?.name}</p></Link>
                </div>
            </div>

            <div className="md:mx-36 md:mt-20">

                {/* hero */}
                <div className="flex gap-20">
                    <div className="w-[70%] hidden md:block">
                        <div className="border-b border-[#e4b5499e] pb-8">
                            <h1 className="text-3xl">{agent?.name}</h1>
                            <h4 className="text-xl text-[#E4B649]">{agent?.designation}</h4>
                        </div>
                        <div className="mt-10">
                            <div className="flex gap-60">
                                <p className="text-[#E4B649]">RERA: </p>
                                <p>{agent?.reraID} </p>
                            </div>

                            <div className="flex gap-48 mt-8">
                                <p className="text-[#E4B649]">Specialized: </p>
                                <p>{agent?.specializes} </p>
                            </div>

                            <div className="flex gap-48 mt-8">
                                <p className="text-[#E4B649]">Language: </p>
                                <p>{agent?.languagesSpeak} </p>
                            </div>
                        </div>

                        <div className="flex mt-10 gap-10">
                            <div className="flex items-center hover:scale-105 transition-all gap-3 border border-[#e4b5499e] px-2 py-1 rounded-3xl">
                                <Image src={call} alt="Phone Icon" />
                                <Link href={''}><p>Call Now</p></Link>
                            </div>
                            
                            <div className="flex items-center hover:scale-105 transition-all border-[#e4b5499e] gap-3 border px-2 py-1 rounded-3xl">
                                <Link href={''}><p>Call Now</p></Link>
                            </div>
                            <div className="flex items-center hover:scale-105 transition-all gap-3 px-2 py-1 rounded-3xl">
                                <Image src={wp} alt="Phone Icon" />
                                <Link href={''}><p>Inquiry on <span className="text-[#e4b549]">WhatsApp</span> </p></Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[30%] ">
                        <Image src={agent.photo} height={120} width={150} alt="Agent Picture" className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDetails;