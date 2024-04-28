'use client';
import sellBanner from "@/public/images/root/sell/sellBanner.svg";
import homeVisit from "@/public/images/root/sell/homeVisit.svg";
import marketing from "@/public/images/root/sell/marketing.svg";
import sell from "@/public/images/root/sell/sell.svg";
import viwing from "@/public/images/root/sell/viwing.svg";
import location from "@/public/images/dashboard/listing/location.svg";
import bed from "@/public/images/dashboard/listing/bed.svg";
import floorPlan from "@/public/images/dashboard/listing/floorPlan.svg";
import price from "@/public/images/dashboard/listing/price.svg";
import sqft from "@/public/images/dashboard/listing/sqft.svg";
import Image from "next/image";
import { GrFormAttachment } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";

import { useState } from "react";
import useGetProperties from "@/hooks/useGetProperties";

const SellProperty = () => {
  const [selectStatus, setSelectStatus] = useState("Sell");
  const properties = useGetProperties();
  console.log(properties);

  return (
    <div>
      {/* banner */}
      <div
        style={{
          backgroundImage: `url(${sellBanner.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" h-[550px]"
      >
        <div className="bg-black bg-opacity-70 h-full w-full relative ">
          <div className="w-[320px] md:w-[480px] lg:w-[436px] bg-black bg-opacity-70 p-4 md:p-8 rounded-xl absolute top-[10%] md:top-[20%] left-[10%] md:left-[20%] lg:left-[15%] text-center md:text-left">
            <h2 className=" text-2xl font-bold mb-4 ">
              Sell/Rent Your Property with Avion Realty Properties LLC
            </h2>
            <p className="text-sm md:text-[16px] text-left">
              Looking to sell or rent your property? Avion Realty Properties LLC
              is here to help you navigate the process with ease and confidence.
              As a leading real estate agency, we specialize in connecting
              property owners with qualified buyers and tenants while maximizing
              the value of their investments.
            </p>
            <button className="my-4 bg-[#A87600] px-4 py-2 rounded-md text-sm font-medium">
              Register Your Interest
            </button>
          </div>
        </div>
      </div>

      {/* how it works */}
      <div className="my-12 lg:relative">
        <div className="mt-12 bg-[#A87600] lg:w-1/2 lg:h-[460px] bg-opacity-20 py-16 px-6 md:px-36 lg:pt-20 lg:pl-60 lg:pr-28 text-center md:text-left ">
          <h2 className="text-2xl font-bold">How it works?</h2>
          <p className="mt-3">
            Avion Realty Properties LLC offers a streamlined process for selling
            or renting your property. From the initial home visit to
            personalized marketing strategies, viewings, and negotiation
            expertise, we guide you through every step. Trust us to maximize the
            value of your property with efficiency and confidence. Contact us
            today to get started!
          </p>
        </div>

        {/* services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12 lg:px-60 my-12 lg:my-0 lg:absolute top-[76%]">
          {/* home visit */}
          <div className="bg-white rounded-xl hover:scale-105 transition-all">
            <div className="bg-[#A87600] p-3 rounded-xl flex justify-between items-end">
              <h2 className="text-xl font-semibold">Home Visit</h2>
              <Image src={homeVisit} alt="home svg" width={56} height={56}/>
            </div>
            <p className="text-black p-4 text-left font-medium">Our team conducts a thorough assessment of your property to determine its value and unique selling points.</p>
          </div>
          {/* marketing */}
          <div className="bg-white rounded-xl hover:scale-105 transition-all">
            <div className="bg-[#A87600] p-3 rounded-xl flex justify-between items-end">
              <h2 className="text-xl font-semibold">Marketing</h2>
              <Image src={marketing} alt="Marketing svg" width={44} height={44}/>
            </div>
            <p className="text-black p-4 text-left font-medium">We develop a tailored marketing strategy, including professional photography and targeted advertising, to attract qualified buyers or tenants.</p>
          </div>
          {/* Viwing */}
          <div className="bg-white rounded-xl hover:scale-105 transition-all">
            <div className="bg-[#A87600] p-3 rounded-xl flex justify-between items-end">
              <h2 className="text-xl font-semibold">Viwing</h2>
              <Image src={viwing} alt="Viwing svg" width={56} height={56}/>
            </div>
            <p className="text-black p-4 text-left font-medium">We schedule and manage viewings and open houses to showcase your property to interested parties.</p>
          </div>
          {/* sell / rent */}
          <div className="bg-white rounded-xl hover:scale-105 transition-all">
            <div className="bg-[#A87600] p-3 rounded-xl flex justify-between items-end">
              <h2 className="text-xl font-semibold">Sell / Rent</h2>
              <Image src={sell} alt="sell svg" width={56} height={56}/>
            </div>
            <p className="text-black p-4 text-left font-medium">Our skilled negotiators work to secure the best terms and price for your property, handling all paperwork for a smooth transaction.</p>
          </div>
        </div>
      </div>

      {/* Sell/Rent Your Property  */}
      <div className="my-12 lg:mt-72 px-6 md:px-12 lg:px-60 ">
        <h2 className="text-2xl font-bold">Sell/Rent Your Property </h2>
        <form className="my-12">
          {/* about yourself */}
          <h2 className="text-xl font-semibold">Tell us about yourself</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4">
              {/* name */}
              <input type="text" name="name" placeholder="Your Name" className="bg-transparent outline-none border border-[#E4B649] text-xl px-4 py-2 rounded-2xl"/>
              {/* phone */}
              <input type="number" name="phone" placeholder="Your Phonne" className="bg-transparent outline-none border border-[#E4B649] text-xl px-4 py-2 rounded-2xl"/>
              {/* email */}
              <input type="email" name="email" placeholder="Your Email" className="bg-transparent outline-none border border-[#E4B649] text-xl px-4 py-2 rounded-2xl"/>
          </div>
          {/* about property */}
          <h2 className="text-xl font-semibold mt-12">Tell us about your property</h2>
          {/* property sell or rent */}
          <div className="flex my-4 font-semibold w-36 border border-[#E4B649]">
            <div
              onClick={() => setSelectStatus("Sell")}
              className={`${
                selectStatus === "Sell" && "bg-[#A87600]"
              } px-4 text-center py-1 w-1/2 cursor-pointer`}
            >
              <span>Sell</span>
            </div>
            <div
              onClick={() => setSelectStatus("Rent")}
              className={`${
                selectStatus === "Rent" && "bg-[#A87600]"
              } px-4 text-center py-1 w-1/2 cursor-pointer`}
            >
              <span>Rent</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 my-8 gap-4 lg:gap-8">
            {/* location */}
              <div className="flex items-center border border-[#E4B649] ">
                <div className="bg-[#A87600] p-2"> 
                  <Image src={location} alt="location svg" width={24} height={24} />
                </div>
                <input type="text" name="location" placeholder="Location" className="bg-transparent outline-none text-xl md:text-sm lg:text-xl px-4 py-2"/>
              </div>
            {/* property type */}
              <div className="flex items-center border border-[#E4B649] ">
                <div className="bg-[#A87600] p-2">
                  <Image src={homeVisit} alt="homeVisit svg" width={42} height={42}/>
                </div>
                <select
                  name="propertyType"
                  className=" w-full  bg-transparent outline-none text-xl md:text-sm lg:text-xl px-4 opacity-60  "
                >
                  <option value="" selected disabled>
                  Property Type
                  </option>
                  {properties.map((property) => (
                    <option
                      key={property._id}
                      value={property.propertyName}
                      className="bg-[#000000C7]"
                    >
                      {property.propertyName}
                    </option>
                  ))}
                </select> 
                {/* <input type="text" name="location" placeholder="Location" className="bg-transparent outline-none text-xl md:text-sm lg:text-xl px-4 py-2"/> */}
              </div>
            {/* bedroom */}
              <div className="flex items-center border border-[#E4B649] ">
                <div className="bg-[#A87600] p-2">
                  <Image src={bed} alt="bed svg" width={38} height={38}/>
                </div>
                <input type="number" min={1} max={7} name="bedroom" placeholder="Bedroom" className="bg-transparent outline-none text-xl md:text-sm lg:text-xl px-4 py-2 w-2/3"/>
              </div>
            {/* size */}
              <div className="flex items-center border border-[#E4B649] ">
                <div className="bg-[#A87600] p-2">
                  <Image src={sqft} alt="sqft svg" width={36} height={36}/>
                </div>
                <input type="text" name="areaSqFt" placeholder="Size sqft" className="bg-transparent outline-none text-xl md:text-sm lg:text-xl px-4 py-2"/>
              </div>
            {/* unit no */}
              <div className="flex items-center border border-[#E4B649] ">
                <div className="bg-[#A87600] p-2">
                  <Image src={floorPlan} alt="floorPlan svg" width={36} height={36}/>
                </div>
                <input type="number" name="unit" placeholder="Unit No." className="bg-transparent outline-none text-xl md:text-sm lg:text-xl px-4 py-2"/>
              </div>
            {/* price */}
              <div className="flex items-center border border-[#E4B649] ">
                <div className="bg-[#A87600] p-2">
                  <Image src={price} alt="price svg" width={38} height={38}/>
                </div>
                <input type="number" name="price" placeholder="Location" className="bg-transparent outline-none text-xl md:text-sm lg:text-xl px-4 py-2"/>
              </div>

              {/* title deeds */}
              <div className="my-4 flex flex-col">
                <label className="font-semibold text-xl md:text-sm lg:text-xl">
                  Upload title deeds <span className="text-sm font-light">(optional)</span>
                </label>
                <input type="file" name="titleDeeds" id="title-deeds" className="hidden"/>
                <label for="title-deeds" className="bg-[#A87600] py-12 bg-opacity-20 mt-4 flex items-center justify-center gap-2 font-semibold cursor-pointer"><span>Select File here</span>
                <GrFormAttachment size={32} /></label>
              </div>

              {/* Upload passpor */}
              <div className="my-4 flex flex-col">
                <label className="font-semibold text-xl md:text-sm lg:text-xl">
                Upload passport <span className="text-sm font-light">(optional)</span>
                </label>
                <input type="file" name="passport" id="passport" className="hidden"/>
                <label for="passport" className="bg-[#A87600] py-12 bg-opacity-20 mt-4 flex items-center justify-center gap-2 font-semibold cursor-pointer"><span>Select File here</span>
                <GrFormAttachment size={32} /></label>
              </div>

              {/* images */}
              <div className="my-4 flex flex-col">
                <label className="font-semibold text-xl md:text-sm lg:text-xl">
                  Upload images <span className="text-sm font-light">(optional)</span>
                </label>
                <input type="file" name="images" id="images" multiple className="hidden"/>
                <label for="images" className="bg-[#A87600] py-12 bg-opacity-20 mt-4 flex items-center justify-center gap-2 font-semibold cursor-pointer"><span>Select File here</span>
                <GrFormAttachment size={32} /></label>
              </div>

          </div>
          
          <div className="flex justify-center pb-12">
            <button className="bg-[#835C00] flex gap-2 items-center justify-center px-12 py-2 font-semibold rounded-lg"><span>Submit Here</span> <FaCheckCircle/></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellProperty;
