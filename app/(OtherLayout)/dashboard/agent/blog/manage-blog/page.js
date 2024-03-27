'use client'

import Navbar from "@/components/dashboard/Navbar";
import BlogCard from "@/components/dashboard/agent/BlogCard";
import useUser from "@/hooks/useUser";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ManageBlog = () => {
    const user = useUser();

    const { data = [], isLoading } = useSWR(`http://localhost:3000/api/agent/blog?email=${user?.data?.email}`, fetcher);

    if (!data.length) {
        return <h1 className="flex justify-center items-center h-screen font-semibold">No Data!</h1>

    } else if (isLoading) {
        return <h1 className="flex justify-center items-center h-screen font-semibold">Loading!</h1>

    } else {
        
        return (
            <div className="">
                <Navbar title={'Manage Blogs'} />

                <div className="mt-20 mb-8 w-full text-sm border border-[#E4B649]">

                    <div className="flex w-full items-center py-2 border-b border-[#E4B649]">
                        <div className="w-[45%] border-r border-[#E4B649] py-2 text-center">
                            <p className="font-semibold">Title</p>
                        </div>
                        <div className="w-[25%]  border-r border-[#E4B649] py-2 text-center">
                            <p className="font-semibold">Agent</p>
                        </div>

                        <div className="w-[15%]  border-r border-[#E4B649] py-2 text-center">
                            <p className="font-semibold">Updated on</p>
                        </div>

                        <div className="w-[15%]  py-2 text-center">
                            <p className="font-semibold">Action</p>
                        </div>
                        <hr />
                    </div>

                    {data.map(blog => <BlogCard key={blog._id} blog={blog} />)}

                </div>
            </div>
        );

    }
};

export default ManageBlog;