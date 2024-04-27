"use client";
import useGetProperties from "@/hooks/useGetProperties";
import Link from "next/link";
import { useState } from "react";

const LeftForm = () => {
  const [selectStatus, setSelectStatus] = useState("Ready");
  const [selectedCurrency, setSelectedCurrency] = useState("AED");
  const [totalProperties, setTotalProperties] = useState([1, 2, 3]);
  const properties = useGetProperties();

  const currencies = ["GBP", "CYN", "AED", "USD", "EUR"];

  const handleCurrency = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <div>
      <div className="w-96 bg-[#1c14005a] bg-opacity-5 p-4 text-sm">
        <form className="space-y-4">
          {/* status */}
          <div className="flex bg-[#000000C7] p-1 uppercase font-semibold ">
            <div
              onClick={() => setSelectStatus("Ready")}
              className={`${
                selectStatus === "Ready" && "bg-[#604000]"
              } w-1/2 text-center py-1 cursor-pointer`}
            >
              <span>Ready</span>
            </div>
            <div
              onClick={() => setSelectStatus("Off-Plan")}
              className={`${
                selectStatus === "Off-Plan" && "bg-[#604000]"
              } w-1/2 text-center py-1 cursor-pointer`}
            >
              <span>Off-Plan</span>
            </div>
          </div>
          {/* property type */}
          <div>
            <label className="uppercase font-semibold">Property Type</label>
            <select
              name="propertyType"
              className=" w-full py-2 outline-none bg-[#000000C7] px-2  opacity-70 italic"
            >
              <option value="" selected disabled>
                PROPERTY TYPE
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
          </div>
          {/* bedrooms*/}
          <div>
            <label className="uppercase font-semibold">Bedrooms</label>
            <div className=" w-full py-2 outline-none bg-[#000000C7] px-2 items-center flex justify-between opacity-70 italic">
              <p>Bedrooms</p>
              <input
                type="number"
                min="1"
                max="7"
                name="bedroom"
                className="bg-transparent w-full"
              />
            </div>
          </div>
          {/* currency */}
          <div>
            <div className="flex justify-between items-center">
              <label className="uppercase font-semibold">Currency</label>
              {/* currency type */}
              <div className="flex gap-1 text-sm text-gray-300">
                {currencies.map((currency, ind) => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => handleCurrency(currency)}
                    className={`${
                      selectedCurrency === currency && "text-white font-bold"
                    }`}
                  >
                    {currency}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* price range */}
          <div className="flex bg-[#000000C7] opacity-70 w-full px-2 py-2">
            <div className="flex w-1/2">
              <h2 className="opacity-70 italic w-1/3">MIN</h2>
              <input
                type="number"
                name="minPrice"
                className="bg-transparent w-2/3"
              />
            </div>
            <div className="flex w-1/2">
              <h2 className="opacity-70 italic w-1/3">MAX</h2>
              <input
                type="number"
                name="maxPrice"
                className="bg-transparent w-2/3"
              />
            </div>
          </div>
        </form>

        {totalProperties.length && (
          <div className="w-full my-4 bg-[#604000] text-center py-2 uppercase">
            <Link href="/">{`Show ${totalProperties.length} Properties `}</Link>
          </div>
        )}
        <div className="w-full mb-4 bg-[#000000C7] text-center py-2 uppercase">
          <Link href="/">Properties on map</Link>
        </div>
      </div>
    </div>
  );
};

export default LeftForm;
