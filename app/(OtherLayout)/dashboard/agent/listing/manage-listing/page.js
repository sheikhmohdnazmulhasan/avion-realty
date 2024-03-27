'use client'
import Navbar from "@/components/dashboard/Navbar";
import ListingCard from "@/components/dashboard/agent/ListingCard";
import useAgentLists from "@/hooks/useAgentLists";
// import ListingCard from "@/components/dashboard/agent/ListingCard";


const ManageListing = () => {
    const [data, isLoading] = useAgentLists();

    if (!data.length) {
        return <h1 className="flex justify-center items-center h-screen font-semibold">No Data!</h1>

    } else if (isLoading) {
        return <h1 className="flex justify-center items-center h-screen font-semibold">Loading!</h1>

    } else {

        return (
            <div className="">
                <Navbar title={'Manage Listing'} />

                <div className="mt-20 mb-8 w-full text-sm border border-[#E4B649]">

                    <div className="flex w-full items-center py-2 border-b border-[#E4B649]">
                        <div className="w-[40%] border-r border-[#E4B649] py-2 text-center">
                            <p className="font-semibold">Property</p>
                        </div>
                        <div className="w-[15%]  border-r border-[#E4B649] py-2 text-center">
                            <p className="font-semibold">Price</p>
                        </div>
                        <div className="w-[15%]  border-r border-[#E4B649] py-2 text-center">
                            <p className="font-semibold">Type</p>
                        </div>
                        <div className="w-[15%]  border-r border-[#E4B649] py-2 text-center">
                            <p className="font-semibold">Updated on</p>
                        </div>

                        <div className="w-[15%]  py-2 text-center">
                            <p className="font-semibold">Action</p>
                        </div>
                        <hr />
                    </div>
                    
                    {data.map(item => <ListingCard key={item._id} list={item} />)}
                </div>
            </div>
        );
    }
};

export default ManageListing;