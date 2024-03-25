'use client'
import axios from "axios";
import useSWR from "swr";
import homeIcon from '@/public/images/root/home.svg';
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const AgentDetails = ({ params }) => {

    const { data: fullAgent = [], isLoading } = useSWR(`http://localhost:3000/api/users?id=${params.id}`, fetcher);

    const { data: properties = [] } = useSWR(`http://localhost:3000/api/offplans?agent=${fullAgent.email}`, fetcher);

    return (
        <div className="">

            {/* Route Definition */}
            <div className="md:px-16 lg:px-20 mt-10 hidden md:block">
                <div className="flex items-center gap-2">
                    <Link href={'/'}><Image src={homeIcon} alt="home icon" /></Link>
                    <Link href={'/agents'} className="hover:underline">Agents</Link>
                    <IoIosArrowForward />
                    <Link href={`/agents/${fullAgent._id}`}><p className="hover:cursor-pointer hover:underline">{fullAgent?.name}</p></Link>
                </div>
            </div>

            <div className="md:mx-36 mt-20">

                {/* hero */}
                <div className="flex gap-20">
                    <div className="w-[70%] border"></div>
                     <div className="w-[30%] border"></div>
                </div>
            </div>
        </div>
    );
};

export default AgentDetails;