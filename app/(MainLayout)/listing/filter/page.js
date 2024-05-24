"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Inquiry from "@/components/shared/Inquiry";
import ListingCard from "@/components/listing/ListingCard";
import useAgents from "@/hooks/useAgents";
import Link from "next/link";
import whatsapp from "@/public/images/whatsapp.svg";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const ListingStatus = ({ params }) => {
    const [openInquiry, setOpenInquiry] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const selectedAgent = useAgents().filter((agent) => agent.name === "Ashraf Khan" || agent.name === "Zaid Khan");
    const [listings, setListings] = useState([]);

    const searchParams = useSearchParams();
    const from = searchParams.get('from');
    const status = searchParams.get('status');
    const pt = searchParams.get('pt');
    const br = searchParams.get('br');
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const query = searchParams.get('query');

    const { data = [] } = useSWR(`/api/filter?${from === 'hero' ? `from=hero&status=${status}&pt=${pt}&br=${br}&min=${min}&max=${max}` : `query=${query}`}`, fetcher);

    console.log(listings)

    const handleOpenInquiry = (id) => {
        setOpenInquiry(!openInquiry);
        setSelectedId(id);
    }

    // handle inquiry
    const handleInquiry = async (event) => {

        event.preventDefault();
        const name = event.target.name.value;
        const phone = event.target.phone.value;
        const email = event.target.email.value;

        const dataForBackend = { agent: selectedId, name, email, mobile: phone };

        try {
            const serverResponse = await axios.post(
                `/api/agent/inquiry`,
                dataForBackend
            );

            if (serverResponse.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Message sent successfully",
                    text: `Dear ${name}, Thank you for your interest. One of our agents will contact you shortly.`,
                });

                event.target.reset();
                setOpenInquiry(false);
                setSelectedId(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setListings(data.data)
    }, [data])

    return (
        <div>
            <div className=" px-4 md:px-12 lg:px-20 py-4 md:py-12 lg:py-16 border-b border-[#262626]">
                {/* description */}
                {status === "Off-Plan" ? (
                    <>
                        <h2 className="text-3xl lg:hidden">
                            Dubai Off-Plan Investment Opportunities
                        </h2>
                        <h2 className="text-2xl hidden lg:block">
                            Discover Luxury Off-Plan Investment Potential in Dubai Real Estate
                        </h2>
                        <p className="text-[#999] my-2 lg:hidden">
                            The city&apos;s cultural fusion is mirrored in its real estate
                            offerings, from waterfront residences to golf course estates.
                            Dubai&apos;s inclusive atmosphere and diverse communities create
                            an inviting lifestyle for residents and a robust market for
                            investors.
                        </p>
                        <p className="text-[#999] text-xl my-4 hidden lg:block">
                            Dubai, nestled between desert and sea, epitomizes modern opulence
                            and enticing investment prospects. Its iconic skyline, adorned
                            with structures like the Burj Khalifa, showcases prime real estate
                            opportunities. Boasting a global business hub, Dubai attracts
                            investors seeking both innovative spaces and thriving communities.
                            <br /> <br />
                            The city&apos;s cultural fusion is mirrored in its real estate
                            offerings, from waterfront residences to golf course estates.
                            Dubai&apos;s inclusive atmosphere and diverse communities create
                            an inviting lifestyle for residents and a robust market for
                            investors.
                            <br /> <br />
                            In conclusion, Dubai&apos;s real estate landscape unfolds a
                            tapestry of possibilities, where dreams come to life amidst
                            modernity and tradition. It beckons those in search of a property
                            and a lifestyle beyond the ordinary, making every investment an
                            invitation to an extraordinary future.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl lg:text-3xl">Find Your Dream Property</h2>
                        <p className="text-[#999] lg:text-xl my-4">
                            Welcome to Estatein, where your dream property awaits in every
                            corner of our beautiful world. Explore our curated selection of
                            properties, each offering a unique story and a chance to redefine
                            your life. With categories to suit every dreamer, your journey{" "}
                        </p>
                    </>
                )}
            </div>
            <div className="px-4 md:px-12 lg:px-20 py-4 space-y-4">
              
                {/* section header */}
                <div className="hidden md:block text-center py-4 lg:py-16">
                    <h2 className="text-[#E4B649] text-3xl font-medium">
                        The Query outcome is presented here.
                    </h2>
                    <p className="lg:w-1/2 my-4 mx-auto">
                        Our portfolio of properties is as diverse as your dreams. Explore
                        the following categories to find the perfect property that resonates
                        with your vision of home
                    </p>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    <div className="col-span-3">
                        {listings?.length ? (
                            <div
                                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 ${openInquiry && "opacity-60 blur-sm"
                                    }`}
                            >
                                {/* listing card */}
                                {listings.map((item) => (
                                    <ListingCard
                                        key={item._id}
                                        item={item}
                                        status={status}
                                    />
                                ))}
                            </div>
                        ) : (
                            <h1 className="h-12 lg:h-screen text-center lg:pl-52 flex-1 text-2xl font-semibold">
                                No Property Available !
                            </h1>
                        )}
                    </div>
                    <div className="hidden lg:block">
                        {selectedAgent.map((agent) => (
                            // <AgentInfo
                            //   key={agent._id}
                            //   agent={agent}
                            //   openInquiry={openInquiry}
                            //   setOpenInquiry={setOpenInquiry}
                            //   // inquiryId ={inquiryId}
                            //   // handleOpenInquiry = {(id)=>{setOpenInquiry(!openInquiry); setInquiryId(id)}}

                            // />
                            <div key={agent._id} agent={agent}><div className="mt-4 border border-[#BE8500] p-4 mb-8">
                                <div className="flex items-end justify-between gap-2 ">
                                    <div className="space-y-2">
                                        <h2 className=" font-semibold">{agent?.name}</h2>
                                        <h3 className="text-sm font-medium">
                                            {agent?.designation}
                                        </h3>
                                        {agent?.reraID && (
                                            <h3 className="text-sm font-medium">
                                                RERA - {agent?.reraID}
                                            </h3>
                                        )}
                                    </div>
                                    <div className="md:w-[30%]">
                                        <Image
                                            src={agent?.photo}
                                            alt={agent?.name}
                                            height={30}
                                            width={100}
                                            className="w-full object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="flex mt-6 gap-2 md:gap-4">

                                    <Link href={`tel:${agent?.wpNum}`}
                                       
                                        className="flex items-center hover:scale-105 transition-all border-[#e4b5499e] gap-3 border px-3 py-1 w-1/2 rounded-3xl justify-center"
                                    >
                                        <p className="text-sm">Call Now</p>
                                    </Link>

                                    <button
                                        onClick={() => { handleOpenInquiry(agent._id) }}
                                        className="flex items-center hover:scale-105 transition-all border-[#e4b5499e] gap-3 border px-3 py-1 w-1/2 rounded-3xl justify-center"
                                    >
                                        <p className="text-sm">Inquiry</p>
                                    </button>
                                </div>

                                {/* inquiry */}

                                {openInquiry && (
                                    <div className="w-full absolute top-4 md:top-36 md:-left-[5px] lg:-left-[70px] z-50 rounded px-5 ">
                                        <div
                                            className="md:w-[80%] lg:w-[60%] mx-auto flex justify-end font-semibold"
                                            onClick={() => { handleOpenInquiry(agent._id) }}
                                        >
                                            <span className="cursor-pointer ">Close</span>
                                        </div>
                                        <div className="md:w-[80%] lg:w-[60%] mx-auto md:h-48 pt-4 pb-8 lg:py-16 bg-[#000] rounded">
                                            <h1 className="text-xl md:text-2xl text-center pt-3">
                                                Get call back for inquiry
                                            </h1>
                                            <form onSubmit={handleInquiry} className="px-10 mt-4">
                                                <div className="md:flex gap-4 space-y-3 md:space-y-0">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id=""
                                                        placeholder="Name"
                                                        className="w-full bg-transparent py-2 px-4 border border-[#E4B649] rounded-3xl"
                                                        required
                                                    />

                                                    <input
                                                        type="number"
                                                        name="phone"
                                                        id=""
                                                        placeholder="Mobile"
                                                        className="w-full bg-transparent py-2 px-4 border border-[#E4B649] rounded-3xl"
                                                        required
                                                    />

                                                    <input
                                                        type="text"
                                                        name="email"
                                                        id=""
                                                        placeholder="Email"
                                                        className="w-full bg-transparent py-2 px-4 border border-[#E4B649] rounded-3xl"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex w-full justify-center mt-4">
                                                    <button
                                                        type="submit"
                                                        className="py-2 w-full md:w-fit px-3 border border-[#E4B649] text-xl transition-all rounded-3xl hover:bg-[#625129]"
                                                    >
                                                        Send Now
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                <div className="text-center mt-3">

                                    <Link href={`/agents/${agent._id}`} className="text-[#E4B649]">
                                        View All Properties
                                    </Link>
                                    <div className="mx-4 border-t border-[#E4B649] my-4"></div>

                                    <Link href={`https://wa.me/${agent?.wpNum}`} className="flex gap-3 justify-center text-sm items-center">

                                        <Image src={whatsapp} alt="whatsapp" width={16} height={16} />

                                        <p>Get Inquiry On <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD87C] to-[#A27100]">Whatsapp</span></p>

                                    </Link>

                                </div>
                            </div></div>
                        ))}
                    </div>
                </div>
                {/*  Strategic Investment */}
                <div className="py-4 md:py-12 lg:py-16">
                    <h2 className="text-2xl lg:text-3xl">
                        A Strategic Investment Oasis for Prosperity and Luxury
                    </h2>
                    <p className="my-4">
                        Investing in Dubai&apos;s real estate market offers a compelling
                        opportunity for astute investors seeking both stability and
                        lucrative returns. Renowned for its dynamic economy and visionary
                        development initiatives, Dubai stands as a global hub for business
                        and luxury living. The city&apos;s strategic location, at the
                        crossroads of Europe, Asia, and Africa, positions it as a prime
                        destination for international trade and commerce, fostering a
                        diverse and resilient economy.{" "}
                    </p>
                </div>
            </div>
            <Inquiry />
        </div>
    );
};

export default ListingStatus;
