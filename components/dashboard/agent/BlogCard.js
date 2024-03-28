'use client'
import Image from 'next/image';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import edit from '@/public/images/dashboard/listing/edit.svg';
import live from '@/public/images/dashboard/listing/live.svg';

const BlogCard = ({ blog }) => {
    const { title, agentName, blogImg, updatedAt } = blog;
    const updatedDate = new Date(updatedAt).toLocaleDateString();

    return (
        <>
            <div className="flex items-center">

                <div className="w-[45%] p-5">
                    <div className="flex items-center gap-3">
                        <Image width={96} height={96} src={blogImg} alt="Listing image" className="w-16 h-16 rounded-md" />
                        <div className="">
                            <h3 className="text-[20px] font-bold mb-2">{title}</h3>
                        </div>
                    </div>
                </div>

                <div className="w-[25%] text-center ">
                    <span className="font-semibold">{agentName}</span>
                </div>

                <div className="w-[15%] text-center ">
                    <span className="font-semibold"> {updatedDate} </span>
                </div>

                <div className="w-[15%] text-center gap-3 flex items-center justify-center">
                    <Image src={live} alt="Live svg" className="w-4 cursor-pointer hover:scale-125 transition-all" />
                    <Link href={''}>  <Image src={edit} alt="Live svg" className="w-4 cursor-pointer hover:scale-125 transition-all" /></Link>
                    <MdDelete size={20} className="text-red-500 hover:text-red-600 cursor-pointer hover:scale-125 transition-all" />
                </div>

            </div>
            <div className="mx-3">
                <hr className="opacity-20" />
            </div>
        </>
    );
};

export default BlogCard;