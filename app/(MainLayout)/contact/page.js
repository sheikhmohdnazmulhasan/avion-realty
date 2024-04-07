import Banner from '@/components/shared/Banner';
import Inquiry from '@/components/shared/Inquiry';
import logo from "@/public/images/dashboard/d-logo.svg"
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

const Contact = () => {
    return (
        <div>
            <Banner title={'Contact US'} />
            <div className='md:flex mt-20'>
                <div className='bg-[#121212] h-[500px] lg:h-[700px] w-1/3 lg:w-1/2 hidden md:block '></div>
                <div className='bg-[#242424] md:h-56 lg:h-48 p-8 lg:px-16 lg:py-12 md:w-2/3 lg:w-1/2 md:-ml-12 lg:-ml-48 mt-16 ml-4 '>
                    <p>Thank you for considering Avion Realty Properties LLC as your trusted partner in Dubai&apos;s real estate journey. Whether you are looking to buy, sell, invest, or seek expert advice, our dedicated team is here to assist you. Feel free to reach out to us through the following channels </p>
                </div>
            </div>

            {/* map, location, contact */}
            <div className='md:flex mt-12 md:-mt-24 lg:-mt-48 mb-20 bg-[#0D0D0D] md:bg-transparent'>
                <div className='md:w-1/2 md:ml-16 mr-4 md:mr-0'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.504100094383!2d55.2811433!3d25.186217100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69055cbbfdff%3A0x90ffa0ed00a0ad49!2sAvion%20Realty!5e0!3m2!1sen!2sbd!4v1712493979863!5m2!1sen!2sbd" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full h-full'></iframe>
                </div>
                <div className='flex-1 relative mt-12 md:mt-0'>

                    <div className='px-8 py-10 lg:py-16 shadow-sm shadow-gray-800 bg-black w-1/2 lg:w-1/3 mt-12 md:mt-0 md:ml-16 lg:ml-28 z-20 absolute -top-12 right-4 lg:right-1/2 md:-top-20 lg:-top-28 '>
                        <Image src={logo} alt='avion realty' />
                    </div>
                    <div className='w-full bg-[#0D0D0D]  mx-auto h-[400px] md:h-80 lg:h-96 flex items-end pb-20' >
                        <ul className="space-y-2 text-sm lg:text-base md:w-2/3 mx-auto">
                            <li className="flex gap-2 items-center">
                                <span className="text-[#E4B649] ">
                                    <FaMapMarkerAlt size={20} />
                                </span>
                                <a>
                                    Office 707, Building No 13
                                    <br /> Business Bay, Bay Square, Dubai
                                </a>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="text-[#E4B649] ">
                                    <MdEmail size={20} />
                                </span>
                                <a>info@avionrealty.ae</a>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="text-[#E4B649] ">
                                    <IoCall size={20} />
                                </span>
                                <span>
                                    <a>+971 50 459 71 67</a>
                                    <br />
                                    <a>+971 4 876 6085</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <Inquiry />
        </div>
    );
};

export default Contact;