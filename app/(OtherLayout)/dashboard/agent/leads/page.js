'use client'

import Navbar from "@/components/dashboard/Navbar";
import LeadsCard from "@/components/dashboard/agent/LeadsCard";
import useAgentLists from "@/hooks/useAgentLists";
import useUser from "@/hooks/useUser";

const Leads = () => {
    const user = useUser();
    const [data, isLoading] = useAgentLists();

    if (user.data.role !== 'agent') {

        return (
            <div className="grid h-screen place-content-center bg-[#0A0909] px-4">
                <h1 className="uppercase tracking-widest text-gray-200">401 | Unauthorized</h1>
            </div>
        )
    }

    if (!data) {
        return <h1 className="flex justify-center items-center h-screen font-semibold">No Data!</h1>

    } else if (isLoading) {
        return <h1 className="flex justify-center items-center h-screen font-semibold">Loading..</h1>

    } else {
        return (
            <div>
                <Navbar title={'Manage Leads'} />
                <div className="mt-20 mb-8 w-full text-sm border border-[#E4B649]">
                    <div className="flex w-full items-center py-2 border-b border-[#E4B649]">
                        <div className="w-[45%] border-r border-[#E4B649] py-2 text-center">
                            <p className="font-semibold">Property</p>
                        </div>

                        <div className="w-[30%]  border-r border-[#E4B649] py-2 text-center">
                            <p className="font-semibold">Leads</p>
                        </div>

                        <div className="w-[25%]  py-2 text-center">
                            <p className="font-semibold">Action</p>
                        </div>
                        <hr />
                    </div>

                    {data.map(list => <LeadsCard key={list._id} list={list} />)}
                </div>
            </div>
        );
    }


};

export default Leads;