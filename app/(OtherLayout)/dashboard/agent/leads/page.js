'use client'

import useUser from "@/hooks/useUser";

const Leads = () => {
    const user = useUser();
    
    if (user.data.role !== 'agent') {

        return (
            <div className="grid h-screen place-content-center bg-[#0A0909] px-4">
                <h1 className="uppercase tracking-widest text-gray-200">401 | Unauthorized</h1>
            </div>
        )
    }

    return (
        <div>
            <div className="h-screen flex justify-center items-center flex-col">
                <h2 className="text-2xl">leads Coming Soon</h2>
                <p>We’re working hard to enhance your experience.
                    Please check back later. Thank you for
                    your patience!</p>
            </div>
        </div>
    );
};

export default Leads;