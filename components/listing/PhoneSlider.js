"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/public/images/icon.svg";

const PhoneSlider = ({ photos }) => {
  const [currentSlider, setCurrentSlider] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCurrentSlider(
          currentSlider === photos.length - 1 ? 0 : currentSlider + 1
        ),
      5000
    );
    return () => clearInterval(intervalId);
  }, [currentSlider, photos.length]);
  return (
    <>
      <div
        className="w-full h-60 flex flex-col items-center justify-center  bg-cover bg-center before:absolute transform duration-1000 ease-linear"
        style={{ backgroundImage: `url(${photos[currentSlider]})` }}
      >
        <div className="flex justify-center items-center flex-col opacity-20">
          <Image src={logo} alt="logo" className="w-20" />
          <h3 className="text-xl font-serif font-light uppercase">
            avion realty
          </h3>
        </div>
      </div>

      {/* slider container */}
      <div className="grid grid-cols-5 justify-center items-center gap-3 py-2">
        {/* sliders */}
        {photos.map((slide, inx) => (
          <div
            onClick={() => setCurrentSlider(inx)}
            key={inx}
            className={`w-16 h-12 bg-black/20 ${
              currentSlider === inx ? "border-2 border-black p-px" : ""
            } box-content cursor-pointer flex flex-col items-center justify-center gap-3 bg-cover bg-center before:absolute  transform duration-1000 ease-linear`}
            style={{ backgroundImage: `url(${slide})` }}
          >
            <div className="flex justify-center items-center flex-col opacity-20">
              <Image src={logo} alt="logo" className="w-6" />
              <h3 className="text-[6px] font-serif font-light uppercase">
                avion realty
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PhoneSlider;
