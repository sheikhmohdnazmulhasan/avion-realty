'use client'

import Image from "next/image";
import img from '@/public/images/root/blog/blog-cover.png';
import axios from "axios";
import useSWR from "swr";
import BlogCard from "@/components/root/BlogCard";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const Blog = () => {
    const { data = [] } = useSWR(`http://localhost:3000/api/agent/blog`, fetcher);

    console.log(data);

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
                {data.map(blog => <BlogCard key={blog._id} blog={blog} />)}
            </div>
        </div>
    );
};

export default Blog;