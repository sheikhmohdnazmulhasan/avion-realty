"use client";
import React, { useState } from "react";

const RightContent = () => {
  const [openInquiry, setOpenInquiry] = useState(false);

  return (
    <div className=" w-full ">
      <div className="my-24 md:mt-0 ">
        <h1 className="text-3xl text-center md:text-left md:text-5xl">
          Easy way to find a perfect property
        </h1>
        <p className="text-xl pt-5 mb-5 hidden md:block">
          Looking for a home in Dubai? Choose to buy or rent, <br /> and let us
          help you find the perfect place for you!
        </p>

        <div className="flex mt-10 justify-center md:justify-end md:mr-16">
          <button
            onClick={() => setOpenInquiry(true)}
            className="bg-[#604004] bg-opacity-20 p-3 font-semibold text-sm text-[#E8BF44] "
          >
            GET CONSULT
          </button>
        </div>
      </div>
      {/* inquiry */}

      {openInquiry && (
        <div className="w-full absolute top-4 md:top-36 md:-left-[5px] lg:-left-[70px] z-50 rounded px-5">
          <div
            className="md:w-[80%] lg:w-[60%] mx-auto flex justify-end font-semibold"
            onClick={() => setOpenInquiry(false)}
          >
            <span className="cursor-pointer ">Close</span>
          </div>
          <div className="md:w-[80%] lg:w-[60%] mx-auto md:h-48 pt-4 pb-8  bg-[#000] rounded">
            <h1 className="text-xl md:text-2xl text-center pt-3">
              Get call back for inquiry
            </h1>
            <form className="px-10 mt-4">
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
                  name="mobile"
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
    </div>
  );
};

export default RightContent;
