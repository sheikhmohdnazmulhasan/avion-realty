'use client'
import Image from 'next/image';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import edit from '@/public/images/dashboard/listing/edit.svg';

const BlogCard = ({ blog }) => {
    const { title, img, } = blog

    return (

        <div className="">
            <div className="flex items-center">
                
                <div className="w-[45%] p-5">
                    <div className="flex items-center gap-3">
                        <Image width={96} height={96} src={images[0]} alt="Listing image" className="w-16 h-16 rounded-md" />
                        <div className="">
                            <h3 className="text-[20px] font-bold mb-2">{title}</h3>
                        </div>
                    </div>
                </div>

                <div className="w-[18.33%] text-center ">
                    <span className="font-semibold">AED {startingPrice} </span>
                </div>
              
                <div className="w-[18.33%] text-center ">
                    <span className="font-semibold"> {status} </span>
                </div>

                <div className="w-[18.33%] text-center gap-3 flex items-center justify-center">
                    <Image src={live} alt="Live svg" className="w-4 cursor-pointer hover:scale-125 transition-all" />
                    <Link href={''}>  <Image src={edit} alt="Live svg" className="w-4 cursor-pointer hover:scale-125 transition-all" /></Link>
                    <MdDelete size={20} className="text-red-500 hover:text-red-600 cursor-pointer hover:scale-125 transition-all" />
                </div>

            </div>
            <div className="mx-3">
                <hr className="opacity-20" />
            </div>
        </div>
    );
};

export default BlogCard;