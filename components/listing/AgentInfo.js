import Image from 'next/image';
import Link from 'next/link';
import call from '@/public/images/root/call.svg';
import whatsapp from "@/public/images/whatsapp.svg"

const AgentInfo = ({ agent }) => {
    return (
        <Link href={`/agents/${agent._id}`}>
            <div className='mt-4 lg:h-[320px] border border-[#BE8500] p-4 mb-8'>
                <div className='flex items-end justify-between gap-2 '>
                    <div className='space-y-2'>
                        <h2 className='md:text-xl font-semibold'>{agent?.name}</h2>
                        <h3 className='text-sm md:text-base font-medium'>{agent?.designation}</h3>
                        {agent?.reraID && <h3 className='text-sm md:text-base font-medium'>RERA - {agent?.reraID}</h3>}
                    </div>
                    <div className='md:w-[30%]'>
                        <Image src={agent?.photo} alt={agent?.name} height={30} width={100} className='w-full object-contain' />
                    </div>
                </div>
                <div className="flex mt-6 gap-2 md:gap-4">
                    <Link href={`tel:${agent?.wpNum}`} className='w-1/2'>  <div className="flex items-center hover:scale-105 transition-all gap-3 border border-[#e4b5499e] px-2 py-1 rounded-3xl w-full">
                        <Image src={call} alt="Phone Icon" width={20} height={20} />
                        <p>Call Now</p>
                    </div></Link>

                    <div className="flex items-center hover:scale-105 transition-all border-[#e4b5499e] gap-3 border px-3 py-1 w-1/2 rounded-3xl justify-center">
                        <Link href={''}><p>Inquiry</p></Link>
                    </div>
                </div>
                <div className='text-center mt-3'>
                    <Link href='/' className='text-[#E4B649]'>View All Properties</Link>
                    <div className='mx-4 border-t border-[#E4B649] my-4'></div>
                    <Link href={`https://wa.me/${agent?.wpNum}`} className='text-sm md:text-base flex justify-center gap-1 items-center'>

                        <span className="w-4 md:w-8">
                            <Image src={whatsapp} alt="whatsapp" width={24} height={24} />
                        </span>

                        <span className='mt-1'>Get your inquiry on <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#FFD87C] to-[#A27100] hover:scale-105'>WhatsApp</span></span>
                    </Link>
                </div>
            </div>
        </Link>
    );
};

export default AgentInfo;