"use client";
import useGetAreas from "@/hooks/useGetAreas";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ExploreAreas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const areas = useGetAreas();

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextSm = () => {
    if (currentIndex < areas?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handleNextMd = () => {
    if (currentIndex < areas?.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handleNextLg = () => {
    if (currentIndex < areas?.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-center">
        Popular Areas
      </h2>
      <p className="px-4 md:px-0 md:w-1/2 lg:w-2/5 my-4 mx-auto md:text-xl text-center">
        Discover the most sought-after neighborhoods and popular areas in Dubai
      </p>

      {/* sm device slieder */}
      <div className="md:hidden pt-8 ">
        {areas?.slice(currentIndex, currentIndex + 1).map((area) => (
          <div key={area._id}>
            <div className="relative w-full">
              <div
                className="bg-no-repeat bg-cover w-full relative  "
                style={{
                  backgroundImage: `url(${area.itemImg})`,
                  filter: "blur(8px)",
                  height: "342px",
                }}
              ></div>
              <div className="w-[85%] mx-auto flex justify-center">
                <img
                  src={area.itemImg}
                  alt={area.itemName}
                  height={360}
                  width={100}
                  className="w-[300px] h-[360px] rounded-t rounded-xl z-10 absolute -top-4  "
                />
              </div>
              <div className="  bg-black opacity-70 absolute -bottom-1 w-full hover:opacity-80 z-20">
                <div className="w-full text-center p-4">
                  <h2 className="text-xl uppercase py-2">{area.itemName}</h2>
                  <Link href={`/listing/${area.itemName}`}>Explore More</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* md device slieder */}
      <div className="hidden md:grid grid-cols-2 lg:hidden gap-4">
        {areas?.slice(currentIndex, currentIndex + 2).map((area) => (
          <div key={area._id}>
            <div className="relative">
              <img
                src={area.itemImg}
                alt={area.itemName}
                height={360}
                width={120}
                className="w-full h-[360px]"
              />
              <div className="  bg-black opacity-70 absolute bottom-0 w-full hover:opacity-80">
                <div className="w-full text-center p-4">
                  <h2 className="text-xl uppercase py-2">{area.itemName}</h2>
                  <Link href={`/listing/${area.itemName}`}>Explore More</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* lg device slieder */}
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {areas?.slice(currentIndex, currentIndex + 4).map((area) => (
          <Link key={area._id} href={`/listing/${area.itemName}`}>
            {" "}
            <div>
              <div className="relative">
                <img
                  src={area.itemImg}
                  alt={area.itemName}
                  height={360}
                  width={120}
                  className="w-full h-[450px]"
                />
                <div className="  bg-black opacity-70 absolute bottom-0 w-full hover:opacity-80">
                  <div className="w-full text-center p-4">
                    <h2 className="text-xl uppercase py-2">{area.itemName}</h2>
                    <p>Explore More</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* silde controller */}
      <div className=" flex justify-between items-center text-xs px-4 my-6">
        {
          <button
            onClick={handlePrev}
            className={currentIndex < 1 && "text-gray-500 cursor-not-allowed"}
          >
            PREV
          </button>
        }
        {/* sm */}
        <button
          onClick={handleNextSm}
          className={`md:hidden ${
            currentIndex == areas?.length - 1 &&
            "text-gray-500 cursor-not-allowed"
          }`}
        >
          NEXT
        </button>
        {/* lg */}
        <button
          onClick={handleNextMd}
          className={`hidden md:block lg:hidden ${
            currentIndex == areas?.length - 2 &&
            "text-gray-500 cursor-not-allowed"
          }`}
        >
          NEXT
        </button>
        {/* lg */}
        <button
          onClick={handleNextLg}
          className={`hidden lg:block ${
            currentIndex == areas?.length - 4 &&
            "text-gray-500 cursor-not-allowed"
          }`}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default ExploreAreas;
