'use client'

import Image from "next/image";
import img from '@/public/images/root/blog/blog-cover.png';
import img2 from '@/public/images/root/blog/blog-x.png';
import axios from "axios";
import useSWR from "swr";
import BlogCard from "@/components/root/BlogCard";
import Link from "next/link";
import Inquiry from "@/components/shared/Inquiry";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const Blog = () => {
    const { data = [] } = useSWR(`https://avion-realty.vercel.app/api/agent/blog`, fetcher);

    return (
        <div>

            {/* banner */}
            <div className="">
                <Image className='relative' src={img} alt='bannerImg' />

            </div>

            {/*  */}
            <div className=" text-center">
                <h1 className="text-2xl">NEWS</h1>
                <p>Stay informed about the most recent developments</p>
            </div>

            {/* card */}
            <div className="px-5 min-h-screen md:px-36 grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                {data?.map(blog => <BlogCard key={blog._id} blog={blog} />)}
            </div>

            {/* podcast reference */}
            <div className="md:flex px-5 md:px-36 justify-center items-center mt-20 bg-[#0E0E0E]">
                <div className="flex-1 hidden md:block">
                    <h2 className="text-3xl font-semibold">Delve into our <br /> insightful podcast</h2>
                    <Link href={'/podcasts'}>
                        <button className="bg-[#835C00] py-2 px-3 uppercase rounded mt-3">All Podcast</button>
                    </Link>
                </div>
                <div className="flex-1">
                    <Image src={img2} alt="Image 2" />
                </div>

                <div className="flex-1 md:hidden flex gap-3">
                    <h2 className="text-xl font-semibold">Delve into our <br /> insightful podcast</h2>
                    <Link href={'/podcasts'}>
                        <button className="bg-[#835C00] py-2 px-3 uppercase rounded mt-3">All Podcast</button>
                    </Link>
                </div>
            </div>
            <Inquiry />
        </div>
    );
};

export default Blog;