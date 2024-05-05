"use client";
import useGetProperties from "@/hooks/useGetProperties";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { BarLoader } from "react-spinners";
import Swal from "sweetalert2";

const LeftForm = () => {
  const [selectStatus, setSelectStatus] = useState("Ready");
  const [selectedCurrency, setSelectedCurrency] = useState("AED");
  const properties = useGetProperties();
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState([]);

  // quary 17-21
  const [quaryStatus, setQuaryStatus] = useState('');
  const [quaryPropertyType, setQuaryPropertyType] = useState('');
  const [quaryBedroom, setQuaryBedroom] = useState('');
  const [quaryMinBudget, setQuaryMinBudget] = useState('');
  const [quaryMaxBudget, setQuaryMaxBudget] = useState('');

  const currencies = ["AED", "GBP", "CNY", "USD", "EUR"];

  const handleCurrency = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleFliter = async (event) => {
    event.preventDefault();
    setIsloading(true);
    setData([])
    const status = selectStatus === 'Ready' ? 'Ready' : 'Off-Plan'
    const propertyType = event.target.propertyType.value;
    const bedroom = event.target.bedroom.value;
    let minBudget = event.target.minbudget.value;
    let maxBudget = event.target.maxbudget.value;

    if (selectedCurrency !== 'AED') {

      try {

        // min
        const exchangeRateApiResponse = await axios.get(`https://v6.exchangerate-api.com/v6/fae5e182931399ecc7dd590a/pair/${selectedCurrency}/AED/${minBudget}`);

        console.log('Min Budget', exchangeRateApiResponse);

        if (exchangeRateApiResponse.data.result === "success") {
          minBudget = String(exchangeRateApiResponse?.data?.conversion_result).split('.')[0];

        }

        // max
        const exchangeRateApiResponse2 = await axios.get(`https://v6.exchangerate-api.com/v6/fae5e182931399ecc7dd590a/pair/${selectedCurrency}/AED/${maxBudget}`);

        console.log('Max Budget', exchangeRateApiResponse);

        if (exchangeRateApiResponse2.data.result === "success") {
          maxBudget = String(exchangeRateApiResponse2?.data?.conversion_result).split('.')[0];
        }

      } catch (error) {
        console.log(error);
        setIsloading(false);
      };

    };


    try {
      const data = await axios.get(`/api/filter?status=${status}&pt=${propertyType}&br=${bedroom}&min=${minBudget}&max=${maxBudget}`);

      if (data.data.success) {
        setIsloading(false);

      };

      if (data.data.data.length) {
        setData(data.data.data);

        setQuaryStatus(status);
        setQuaryBedroom(bedroom);
        setQuaryMaxBudget(maxBudget);
        setQuaryMinBudget(minBudget);
        setQuaryPropertyType(propertyType);

        console.log(data.data.data);

      } else {

        Swal.fire({
          title: 'No Result Found!',
          text: 'No properties were found in the database filtered by your query. Please try another way',
          icon: 'info'
        })

      }

    } catch (error) {
      setIsloading(false)
    }


  }


  return (
    <div>
      <div className="w-96 bg-[#1c14005a] bg-opacity-5 p-4 text-sm">
        <form className="space-y-4" onSubmit={handleFliter}>
          {/* status */}
          <div className="flex bg-[#000000C7] p-1 uppercase font-semibold ">
            <div
              onClick={() => setSelectStatus("Ready")}
              className={`${selectStatus === "Ready" && "bg-[#604000]"
                } w-1/2 text-center py-1 cursor-pointer`}
            >
              <span>Ready</span>
            </div>
            <div
              onClick={() => setSelectStatus("Off-Plan")}
              className={`${selectStatus === "Off-Plan" && "bg-[#604000]"
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
                className="bg-transparent w-full ml-4"
                required />
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
                    className={`${selectedCurrency === currency && "text-white font-bold"
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
                name="minbudget"
                className="bg-transparent w-2/3"
                required />
            </div>
            <div className="flex w-1/2">
              <h2 className="opacity-70 italic w-1/3">MAX</h2>
              <input
                type="number"
                name="maxbudget"
                className="bg-transparent w-2/3"
                required />
            </div>
          </div>
          <div className={`w-full my-4 bg-[#604000] text-center py-2 uppercase `}>

            {!data.length ? <button type="submit">{isLoading ? <BarLoader color="#36d7b7" /> : 'Search Properties'}</button> : <Link href={`/listing/filter?status=${quaryStatus}&pt=${quaryPropertyType}&br=${quaryBedroom}&min=${quaryMinBudget}&max=${quaryMaxBudget}`}>
              {`View ${data.length} Properties`}
            </Link>}



          </div>

        </form>

        <div className="w-full mb-4 mt-4 bg-[#000000C7] text-center py-2 uppercase">
          <Link href="/">Properties on map</Link>
        </div>
      </div>
    </div>
  );
};

export default LeftForm;
