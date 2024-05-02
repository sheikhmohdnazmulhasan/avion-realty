"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import location from "@/public/images/dashboard/listing/location.svg";
import property from "@/public/images/dashboard/listing/property.svg";
import bed from "@/public/images/dashboard/listing/bed.svg";
import Inquiry from "@/components/shared/Inquiry";
import { HiOutlineSearch } from "react-icons/hi";
import useGetAreas from "@/hooks/useGetAreas";
import useGetProperties from "@/hooks/useGetProperties";
import ListingCard from "@/components/listing/ListingCard";

import useAgents from "@/hooks/useAgents";
// import AgentInfo from "@/components/listing/AgentInfo";
import Link from "next/link";

import call from "@/public/images/root/call.svg";
import whatsapp from "@/public/images/whatsapp.svg";
import Swal from "sweetalert2";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ListingStatus = ({ params }) => {
  const [openInquiry, setOpenInquiry] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // const handleOpenInquiry = (openInquiry) =>{
  //   setOpenInquiry(!openInquiry);
  // }

  const {
    data = [],
    isLoading,
    error,
  } = useSWR(
    `/api/offplans?${
      params.status === "Off-Plan" ||
      params.status === "Ready" ||
      params.status === "Rental"
        ? `status=${params.status}`
        : `area=${params.status}`
    }`,
    fetcher
  );

  const areas = useGetAreas();
  const properties = useGetProperties();
  const selectedAgent = useAgents().filter(
    (agent) => agent.name === "Ashraf Khan" || agent.name === "Zaid Khan"
  );

  const [listings, setListings] = useState([]);
  // const [inquiryId, setInquiryId] = useState(null);

  const dataFilterByArea = (value) => {
    axios
      .get(`/api/offplans?area=${value}`)
      .then((res) => setListings(res.data))
      .catch((err) => console.log(err));
  };

  const dataFilterByProperty = (value) => {
    axios
      .get(`/api/offplans?propertyType=${value}`)
      .then((res) => setListings(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setListings(data);
  }, [data]);

  const handleOpenInquiry = (id)=>{
    setOpenInquiry(!openInquiry);
    setSelectedId(id);
  }

  // handle inquiry
  const handleInquiry = async (event ) => {
    
    event.preventDefault();
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;
    // const agent = event.target.id.value;
    // const id = agent._id

    const dataForBackend = { agent : selectedId , name, email, mobile: phone };
    

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

  return (
    <div>
      <div className=" px-4 md:px-12 lg:px-20 py-4 md:py-12 lg:py-16 border-b border-[#262626]">
        {/* description */}
        {params.status === "Off-Plan" ? (
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
        {/* search bar */}
        <form className="hidden md:flex items-center bg-[#0F0F0F] w-full pl-8 pr-4 justify-around py-3 rounded-3xl my-8">
          <span className="w-1 ">
            <HiOutlineSearch />
          </span>
          <input
            type="text"
            placeholder="Search For A Property or Location"
            className="bg-transparent w-2/3 lg:w-4/5"
          />
          <button className="bg-[#E4B649] text-black flex items-center font-extrabold gap-2 py-2 px-4 rounded-3xl">
            <span>
              <HiOutlineSearch />
            </span>
            <span>Find Property</span>
          </button>
        </form>

        {/* multiple search */}
        <div className="hidden md:grid grid-cols-4 items-center gap-6 bg-[#0F0F0F] w-full px-6 py-3 rounded-3xl my-8">
          {/* area */}
          <div className="bg-[#272727] rounded-lg py-2 px-4 flex gap-3">
            <Image src={location} alt="loaction svg" className="w-6" />
            <select
              name="area"
              className=" w-full border-l bg-transparent px-2 "
              onChange={(event) => dataFilterByArea(event.target.value)}
            >
              <option value="" selected disabled>
                Area
              </option>
              {areas.map((area) => (
                <option
                  key={area._id}
                  value={area.itemName}
                  className="bg-[#272727]"
                >
                  {area.itemName}
                </option>
              ))}
            </select>
          </div>
          {/* property */}
          <div className="bg-[#272727] rounded-lg py-2 px-4 flex gap-3">
            <Image src={property} alt="property svg" className="w-8" />
            <select
              name="propertyType"
              className=" w-full border-l bg-transparent px-2 "
              onChange={(event) => dataFilterByProperty(event.target.value)}
            >
              <option value="" selected disabled>
                Property type
              </option>
              {properties.map((property) => (
                <option
                  key={property._id}
                  value={property.propertyName}
                  className="bg-[#272727]"
                >
                  {property.propertyName}
                </option>
              ))}
            </select>
          </div>
          {/* Bedrooms */}
          <div className="bg-[#272727] rounded-lg py-2 px-4 flex gap-3">
            <Image src={bed} alt="bed svg" className="w-4 " />
            <div className="bg-transparent px-2 border-l w-full items-center flex justify-between">
              <p>Bedrooms</p>
              <input
                type="number"
                min="1"
                max="7"
                name="bedroom"
                className="bg-transparent"
                // onChange={(event)=>setListings(data.filter(item => item.bedroom === event.target.value))}
              />
            </div>
          </div>
        </div>

        {/* section header */}
        <div className="hidden md:block text-center py-4 lg:py-16">
          <h2 className="text-[#E4B649] text-3xl font-medium">
            Discover a World of Possibilities
          </h2>
          <p className="lg:w-1/2 my-4 mx-auto">
            Our portfolio of properties is as diverse as your dreams. Explore
            the following categories to find the perfect property that resonates
            with your vision of home
          </p>
        </div>
        <div className="flex gap-8 relative">
          {listings.length ? (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 lg:w-3/4 ${
                openInquiry && "opacity-60 blur-sm"
              }`}
            >
              {/* listing card */}
              {listings.map((item) => (
                <ListingCard
                  key={item._id}
                  item={item}
                  status={params.status}
                />
              ))}
            </div>
          ) : (
            <h1 className="h-12 lg:h-screen text-center lg:pl-52 flex-1 text-2xl font-semibold">
              No Property Available !
            </h1>
          )}
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
              <div key={agent._id} agent={agent}><div className="mt-4 lg:h-[320px] border border-[#BE8500] p-4 mb-8">
              <div className="flex items-end justify-between gap-2 ">
                <div className="space-y-2">
                  <h2 className="md:text-xl font-semibold">{agent?.name}</h2>
                  <h3 className="text-sm md:text-base font-medium">
                    {agent?.designation}
                  </h3>
                  {agent?.reraID && (
                    <h3 className="text-sm md:text-base font-medium">
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
                <Link href={`tel:${agent?.wpNum}`} className="w-1/2">
                  {" "}
                  <div className="flex items-center hover:scale-105 transition-all gap-3 border border-[#e4b5499e] px-2 py-1 rounded-3xl w-full">
                    <Image src={call} alt="Phone Icon" width={20} height={20} />
                    <p>Call Now</p>
                  </div>
                </Link>
      
                <button
                  onClick={()=>{handleOpenInquiry(agent._id)}}
                  className="flex items-center hover:scale-105 transition-all border-[#e4b5499e] gap-3 border px-3 py-1 w-1/2 rounded-3xl justify-center"
                >
                  <p>Inquiry</p>
                </button>
              </div>
      
              {/* inquiry */}
      
              {openInquiry && (
                <div className="w-full absolute top-4 md:top-36 md:-left-[5px] lg:-left-[70px] z-50 rounded px-5 ">
                  <div
                    className="md:w-[80%] lg:w-[60%] mx-auto flex justify-end font-semibold"
                    onClick={()=>{handleOpenInquiry(agent._id)}}
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
                <Link
                  href={`https://wa.me/${agent?.wpNum}`}
                  className="text-sm md:text-base flex justify-center gap-1 items-center"
                >
                  <span className="w-4 md:w-8">
                    <Image src={whatsapp} alt="whatsapp" width={24} height={24} />
                  </span>
      
                  <span className="mt-1">
                    Get your inquiry on{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD87C] to-[#A27100] hover:scale-105">
                      WhatsApp
                    </span>
                  </span>
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
