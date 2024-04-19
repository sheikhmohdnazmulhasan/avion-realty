import Image from 'next/image';
import location from '@/public/images/dashboard/listing/location.svg'
import bathroomSvg from '@/public/images/dashboard/listing/bathroom.svg';
import sqft from '@/public/images/dashboard/listing/sqft.svg';
import whatsapp from '@/public/images/contact/whatsapp.svg';
import call from '@/public/images/contact/call.svg';
import bed from '@/public/images/dashboard/listing/bed.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ListingCard = ({ item, status }) => {
    const [price, setPrice] = useState(null);

    useEffect(() => {
        if (item?.startingPrice) {
            setPrice(item.startingPrice.toLocaleString('en-AE', { style: 'currency', currency: 'AED' }));
        }

    }, [item])

    return (
        <div className='border border-[#CC9107] hover:scale-105 transition-all h-[420px]'>
            <Link href={`/listing/${status}/${item._id}`} className='relative'>
                <Image quality={100} src={item?.images[0]} alt={item.title} width={100} height={300} className='w-full h-52 object-fill ' />
                <div className='bg-black px-4 py-1 rounded-2xl absolute top-4 left-4 text-xs uppercase'><span>{item.status}</span></div>
            </Link>
            <div className='p-4 text-left space-y-2'>
                <h2 className='capitalize text-xl font-medium'>{item.title.slice(0, 20)} {item.title.length > 20 && '...'}</h2>

                {/* location */}
                <div className="flex items-center gap-2">
                    <Image quality={100} src={location} alt="location svg" />
                    <span className='text-sm'>{item.location.slice(0, 26)} {item.location.length > 26 && "..."}</span>
                </div>

                {/* price */}
                <h2 className='text-xl font-extrabold'>
                    {item.status === 'Off-Plan' && <span className='text-xs text-[#E4B649]  mr-2 font-normal'>Start From</span>}{price} </h2>

                <div className="flex gap-5 pb-4 text-xs">

                    {/* bed */}
                    <div className="flex items-center gap-2">
                        <Image quality={100} src={bed} alt="Bedroom svg" />
                        <span>{item.bedroom}</span>
                    </div>

                    {/* bathroom */}
                    {item.status === 'Off-Plan' &&
                        <div className="flex items-center gap-2">
                            <Image quality={100} src={bathroomSvg} alt="bathroom svg" />
                            <span>{item.bathroom}</span>
                        </div>
                    }
                    {/* sqft */}
                    <div className="flex items-center gap-2">
                        <Image quality={100} src={sqft} alt="scale svg" />
                        {item.status === 'Off-Plan' && <span className='text-xs text-[#E4B649] font-normal'>Start From</span>}
                        <span>{item.areaSqFt} sq. ft.</span>
                    </div>
                </div>

                <hr className='opacity-60' />

                {/* contact */}
                <div className='flex justify-evenly'>
                    <button>
                        <Image quality={100} src={whatsapp} alt='whatsapp svg' />
                    </button>
                    <button>
                        <Image quality={100} src={call} alt='call svg' />
                    </button>
                    <button>
                        <Image quality={100} src={whatsapp} alt='whatsapp svg' />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ListingCard;