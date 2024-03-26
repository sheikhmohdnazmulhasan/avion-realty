'use client'

import Banner from "@/components/shared/Banner";
import Inquiry from "@/components/shared/Inquiry";
import Image from "next/image";
import xx from '@/public/images/x.png';
import wp from '@/public/images/root/wp.svg';
import Link from "next/link";
import useAgents from "@/hooks/useAgents";

const Agents = () => {
    const data = useAgents();

    return (
        <div>
            <Banner title={'All Agents'} />
            <div className="md:px-36 pt-10 w-full min-h-screen">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

                    {/* Mapping */}
                    {data.map(agent => <div key={agent._id} className="relative">
                        <Image className="w-full" src={agent?.photo} width={150} height={120} alt="Agent Image" />
                        <div className="absolute py-2 text-center justify-center bottom-0 w-full h-32 bg-black bg-opacity-60 ">
                            <h3 className="font-bold text-xl uppercase">{agent?.name}</h3>
                            <div className="flex gap-2 justify-center px-2">
                                <p className="w-fit">Language:</p>
                                <p> {agent?.languagesSpeak}</p>
                            </div>
                            <div className="flex gap-2 justify-center">
                                <p>Specialty:</p>
                                <p className="w-fit">{agent?.specializes}</p>
                            </div>

                            <div className="flex gap-2 justify-between px-3">
                                <Link href={`https://wa.me/${agent?.wpNum}`} target="_blank" className="flex border p-1 hover:scale-105 transition-all gap-1 border-[#A87600]">
                                    <Image src={wp} alt="whatsapp icon" />
                                    <p>WhatsApp</p>
                                </Link>
                                <Link href={`/agents/${agent._id}`} className="flex border p-1 hover:scale-105 transition-all gap-1 border-[#A87600]">

                                    <p>View Agent</p>
                                </Link>
                            </div>
                        </div>
                    </div>)}

                </div>
            </div>
            <Inquiry />
        </div>
    );
};

export default Agents;