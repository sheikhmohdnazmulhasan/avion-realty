'use client'

import Navbar from "@/components/dashboard/Navbar";
import InquiryCard from "@/components/dashboard/admin/InquiryCard";
import useUser from "@/hooks/useUser";

const Inquiry = () => {
  const { data: user } = useUser();

  if (user.role !== 'admin') {
    return (
      <div className="grid h-screen place-content-center bg-[#0A0909] px-4">
        <h1 className="uppercase tracking-widest text-gray-200">401 | Unauthorized</h1>
      </div>
    )

  }

  return (
    <div>
      <Navbar title="Inquiry" />
      <div className="flex justify-end mt-20 mb-3">
        <button className="py-2 px-3 bg-[#886c2b] hover:bg-[#8f7537] transition-all hover:scale-105">Download All</button>
      </div>

      <div className=" mb-8 w-full text-sm border border-[#E4B649]">

        <div className="flex w-full items-center py-2 border-b border-[#E4B649]">
          <div className="w-[28.33%] border-r border-[#E4B649] py-2 text-center">
            <p className="font-semibold">Name</p>
          </div>
          <div className="w-[28.33%]  border-r border-[#E4B649] py-2 text-center">
            <p className="font-semibold">Email</p>
          </div>
          <div className="w-[28.33%]  border-r border-[#E4B649] py-2 text-center">
            <p className="font-semibold">Mobile</p>
          </div>
          <div className="w-[15%]  py-2 text-center">
            <p className="font-semibold">Action</p>
          </div>
          <hr />
        </div>

        <InquiryCard />
        <InquiryCard />
        <InquiryCard />

      </div>
    </div>
  );
};

export default Inquiry;
