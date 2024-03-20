'use client'
import Navbar from "@/components/dashboard/Navbar";
import ListingCard from "@/components/dashboard/admin/ListingCard";
import useLists from "@/hooks/useLists";

const Listing = () => {
    const [data, isLoading] = useLists();

    if (!data.length) {
        return <h1 className="flex justify-center items-center h-screen font-semibold">No Data!</h1>

    } else if (isLoading) {
        return <h1 className="flex justify-center items-center h-screen font-semibold">Loading!</h1>

    } else {
        return (
            <div>
                <Navbar title={'Manage Listing'} />
                <div className="mt-20 mb-8 w-full text-sm border border-[#E4B649]">

                    <div className="flex w-full">
                        <div className="w-[40%] py-3 border border-[#E4B649] text-center">
                            <p className="font-semibold">Property</p>
                        </div>
                        <div className="w-[15%] py-3 border border-[#E4B649] text-center">
                            <p className="font-semibold">Agent</p>
                        </div>
                        <div className="w-[15%] py-3 border border-[#E4B649] text-center">
                            <p className="font-semibold">Status</p>
                        </div>
                        <div className="w-[15%] py-3 border border-[#E4B649] text-center">
                            <p className="font-semibold">Leads</p>
                        </div>
                        <div className="w-[15%] py-3 border border-[#E4B649] text-center">
                            <p className="font-semibold">Action</p>
                        </div>
                    </div>

                    {/* each data */}
                    {data.map(item => <ListingCard key={item.id} list={item} />)}
                </div>
            </div>
        );
    }


};

export default Listing;