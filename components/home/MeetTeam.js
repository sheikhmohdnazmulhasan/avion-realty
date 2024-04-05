'use client'
import useAgents from '@/hooks/useAgents';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const MeetTeam = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const agents = useAgents().slice(0, 4);

    // console.log(agents);

    const handlePrev = () => {

        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);

        }

    }

    const handleNext = () => {

        if (currentIndex < agents?.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    return (
        <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-center">Meet Our Team</h2>
            <p className='px-4 md:px-0 lg:w-2/3 my-4 mx-auto md:text-xl md:text-center'>Meet our team of experienced real estate agents at Avion Realty, specializing in helping you buy property in Dubai. Dedicated and knowledgeable,</p>

            {/* sm device slider */}
            <div className="md:hidden pt-8 w-full">
                {
                    agents?.slice(currentIndex, currentIndex + 1).map(agent => <Link href={`/agents/${agent._id}`} key={agent._id} >
                        <div className="relative w-full">
                            <div className="bg-no-repeat bg-cover w-full relative " style={{
                                backgroundImage: `url(${agent.photo})`,
                                filter: 'blur(8px)',
                                height: '342px'
                            }}></div>
                            <div className="w-[85%] mx-auto flex justify-center">
                                <Image src={agent.photo} alt={agent.name} height={360} width={100} className="w-[300px] h-[360px] rounded-t rounded-xl z-10 absolute -top-4  " />
                            </div>
                            <div className="  bg-black opacity-70 absolute -bottom-1 w-full  z-20">
                                <div className="w-full text-center p-2">
                                    <h2 className="font-bold">{agent.name}</h2>
                                    <p className='text-xs'>Languages : {agent.languagesSpeak}</p>
                                    <p className='text-xs'>Specialty : {agent.specializes}</p>
                                </div>
                            </div>
                        </div>
                    </Link>)
                }
            </div>

            {/* slide controller */}
            <div className=" flex justify-between items-center text-xs px-4 my-6 md:hidden">
                {<button onClick={handlePrev} className={currentIndex < 1 && 'text-gray-500 cursor-not-allowed'}>PREV</button>}
                {/* sm */}
                <button onClick={handleNext} className={`md:hidden ${currentIndex == agents?.length - 1 && 'text-gray-500 cursor-not-allowed'}`}>NEXT</button>

            </div>

            {/* md and lg devices */}
            <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    agents?.map(agent => <Link href={`/agents/${agent._id}`} key={agent._id} className='hover:scale-105 transition-all'> <div>
                        <div className="relative">
                            <Image src={agent.photo} alt={agent.name} height={360} width={120} className="w-full h-[360px]" />
                            <div className="  bg-black opacity-70 absolute bottom-0 w-full hover:opacity-80 hover:cursor-pointer">
                                <div className="w-full text-center p-2">
                                    <h2 className="text-xl font-bold">{agent.name}</h2>
                                    <p className='text-sm'>Languages : {agent.languagesSpeak}</p>
                                    <p className='text-sm'>Specialty : {agent.specializes}</p>
                                </div>
                            </div>
                        </div>
                    </div> </Link>)
                }
            </div>
        </div>
    );
};

export default MeetTeam;