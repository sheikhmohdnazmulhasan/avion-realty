'use client'
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
import BlogCard from "../root/BlogCard";

const fetcher = url => axios.get(url).then(res => res.data);

const LatestBlog = () => {
    const {data = []} = useSWR(`https://avion-realty.vercel.app/api/agent/blog?&sort=createdAt_desc`, fetcher)
    return (
        <div className="lg:flex pt-8 md:pt-16 gap-8 items-end">
            <div className=" lg:w-1/2">
                <div className="flex items-end justify-between mb-8 lg:mb-16">
                    <div className=" md:hidden lg:block text-2xl lg:text-6xl space-y-2 lg:space-y-4 ">
                        <h2>LATEST NEWS</h2>
                        <h2> & EVENTS</h2>
                    </div>
                    <h2 className="text-3xl hidden md:block lg:hidden">LATEST NEWS & EVENTS</h2>
                    <Link href="/blogs" className="px-4 py-2 border border-[#D5A022] rounded-2xl lg:text-2xl md:hidden lg:block">Explore ALL</Link>
                </div>
                <div >
                    {
                        data.length && <BlogCard blog={data[0]}/>
                    }
                </div>
            </div>
            <div className="hidden  mt-8 lg:mt-0 md:grid grid-cols-4 lg:grid-cols-2 gap-2 lg:gap-4 lg:w-1/2">
                {
                    data?.slice(1, 5).map(blog => <BlogCard key={blog._id} blog={blog}/>)
                }
            </div>
            <div className="hidden md:flex justify-end mt-4 lg:hidden ">
                <Link href="/blogs" className="px-4 py-2 border border-[#D5A022] rounded-2xl text-xl ">Explore ALL</Link>
            </div>
        </div>
    );
};

export default LatestBlog;