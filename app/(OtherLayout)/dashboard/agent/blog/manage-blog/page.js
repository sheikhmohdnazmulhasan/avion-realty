'use client'

import Navbar from "@/components/dashboard/Navbar";
import useUser from "@/hooks/useUser";

const ManageBlog = () => {
    const user = useUser();

    // console.log(user.data.email);

    return (
        <div className="">
            <Navbar title={'Manage Blogs'} />

            <div className="mt-20 mb-8 w-full text-sm border border-[#E4B649]">

                <div className="flex w-full items-center py-2 border-b border-[#E4B649]">
                    <div className="w-[45%] border-r border-[#E4B649] py-2 text-center">
                        <p className="font-semibold">Title</p>
                    </div>
                    <div className="w-[18.33%]  border-r border-[#E4B649] py-2 text-center">
                        <p className="font-semibold">Agent</p>
                    </div>

                    <div className="w-[18.33%]  border-r border-[#E4B649] py-2 text-center">
                        <p className="font-semibold">Updated on</p>
                    </div>

                    <div className="w-[18.33%]  py-2 text-center">
                        <p className="font-semibold">Action</p>
                    </div>
                    <hr />
                </div>

                {/* dynamic card */}

            </div>
        </div>
    );
};

export default ManageBlog;