import Image from 'next/image';
import bathroomSvg from '@/public/images/dashboard/listing/bathroom.svg';
import sqft from '@/public/images/dashboard/listing/sqft.svg';
import whatsapp from '@/public/images/contact/whatsapp.svg';
import call from '@/public/images/contact/call.svg';
import bed from '@/public/images/dashboard/listing/bed.svg';

const ListingCard = ({item}) => {
    return (
       <div className='border border-[#CC9107]'>
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
                            </div>
    );
};

export default ListingCard;