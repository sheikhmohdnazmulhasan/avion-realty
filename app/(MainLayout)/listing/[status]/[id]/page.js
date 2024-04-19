"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import call from "@/public/images/root/call.svg";
import whatsapp from "@/public/images/whatsapp.svg";
import { CiShare2 } from "react-icons/ci";
import bathroom from "@/public/images/dashboard/listing/bathroom.svg";
import bed from "@/public/images/dashboard/listing/bed.svg";
import triangleSqrft from "@/public/images/dashboard/listing/triangleSqrft.svg";
import floorPlan from "@/public/images/dashboard/listing/floorPlan.svg";
import location from "@/public/images/dashboard/listing/location.svg";
import ShowAmenities from "@/components/listing/ShowAmenities";
import { ImSwitch } from "react-icons/im";
import { IoKeyOutline, IoSettingsOutline } from "react-icons/io5";
import { FaRegHandshake } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import logo from "@/public/images/icon.svg";
import PhoneSlider from "@/components/listing/PhoneSlider";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const ListingDetail = ({ params }) => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openInquiry, setOpenInquiry] = useState(false);

  const { data = [] } = useSWR(`/api/offplans?id=${params.id}`, fetcher);
  const { data: agent = [] } = useSWR(
    `/api/users?email=${data.agent}`,
    fetcher
  );

  useEffect(() => {
    setPhotos(data?.images);
  }, [data]);

  const showFloorplan = () => {
    Swal.fire({
      icon: "info",
      title: "Floorplan is not ready yet!",
      text: "Thank You For Connecting, Stay With Us",
    });
  };

  function handleCreateNewLeads(event) {
    event.preventDefault();

    const leadFor = params.id;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const mobile = event.target.mobile.value;

    const dataForBackend = { leadFor, name, email, mobile };

    axios
      .post("/api/agent/leads", dataForBackend)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Message sent successfully",
            text: `Dear ${name}, Thank you for your interest. One of our agents will contact you shortly.`,
          });

          setOpenInquiry(false);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="">
      {/* inquiry */}

      {openInquiry && (
        <div className="w-full absolute bottom-[35%] md:top-[15%] z-50 rounded px-5">
          <div
            className="md:w-[60%] mx-auto flex justify-end font-semibold"
            onClick={() => setOpenInquiry(false)}
          >
            <span className="cursor-pointer ">Close</span>
          </div>
          <div className="md:w-[60%] mx-auto h-44  bg-[#000] rounded">
            <h1 className="text-2xl text-center pt-3">
              Get call back for inquiry
            </h1>
            <form className="px-10 mt-4" onSubmit={handleCreateNewLeads}>
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

      <div
        className={`mx-4 md:mx-12 lg:mx-36 md:my-20 min-h-screen ${openInquiry && "opacity-60 blur-sm"
          }`}
      >
        {photos?.length && (
          <div>
            <div className=" md:hidden">
              <PhoneSlider photos={photos} />
            </div>
            {/* desktop */}
            <div className="h-[500px] hidden md:flex gap-4 ">
              <div
                className="w-[65%] flex justify-center items-center rounded-l-lg"
                style={{
                  backgroundImage: `url(${photos[currentIndex]})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="flex justify-center items-center flex-col opacity-15">
                  <Image src={logo} alt="logo" className="w-20" />
                  <h3 className="text-3xl font-serif font-light uppercase">
                    avion realty
                  </h3>
                </div>

                {/* big image
                            <Image src={photos[currentIndex]} alt='avion realty' width={790} height={200} className='w-full h-[500px] object-fill  rounded-l-lg' /> */}
              </div>

              <div className="w-[35%] space-y-4 ">
                <div
                  className="h-[48.5%]  rounded-r-lg flex justify-center"
                  style={{
                    backgroundImage: `url(${photos[currentIndex + 1]})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="flex justify-center items-center flex-col opacity-15">
                    <Image src={logo} alt="logo" className="w-12" />
                    <h3 className="text-xl font-serif font-light uppercase">
                      avion realty
                    </h3>
                  </div>
                </div>

                <div
                  className="h-[48.5%]  rounded-r-lg flex justify-center"
                  style={{
                    backgroundImage: `url(${photos[currentIndex + 2]})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="flex justify-center items-center flex-col opacity-15">
                    <Image src={logo} alt="logo" className="w-12" />
                    <h3 className="text-xl font-serif font-light uppercase">
                      avion realty
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex justify-end gap-3 mt-4">
          {/* prev */}
          <FaArrowAltCircleLeft
            size={36}
            className={`hover:text-[#b4914b] cursor-pointer ${currentIndex === 0 &&
              "text-gray-800 hover:text-gray-800 !cursor-not-allowed"
              }`}
            onClick={() =>
              currentIndex >= 3 && setCurrentIndex(currentIndex - 3)
            }
          />

          {/* next */}
          <FaArrowAltCircleRight
            size={36}
            className={`hover:text-[#b4914b] cursor-pointer ${currentIndex == photos?.length - 3 &&
              "text-gray-800 hover:text-gray-800 !cursor-not-allowed"
              } `}
            onClick={() =>
              currentIndex < photos?.length - 4 &&
              setCurrentIndex(currentIndex + 3)
            }
          />
        </div>

        {/* details  */}
        <div className="lg:flex justify-between gap-12 mt-8 md:mt-16">
          {/* listing info */}
          <div className="lg:w-[70%]">
            {/* title */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              {data.title}
            </h2>
            {/* location for mobile devices*/}
            <div className="flex gap-2 items-center mt-4 md:hidden">
              <Image src={location} alt="location svg" width={24} height={24} />
              <span>{data.location}</span>
            </div>
            {/* price */}
            <div className=" flex justify-between items-center">
              <div className="flex gap-0 md:gap-4 justify-between md:justify-normal w-full">
                <h2 className="  lg:text-3xl font-semibold">
                  {data.status === "Off-Plan" && (
                    <span className="text-xs lg:text-xl text-[#E4B649]">
                      Starting Prices
                    </span>
                  )}{" "}
                  AED {data.startingPrice}
                </h2>
                <select className="bg-transparent px-2 md:px-3 py-1 md:text-xl border rounded-2xl">
                  <option selected value="AED" className="bg-black">
                    AED
                  </option>
                  <option value="usd" className="bg-black">
                    USD
                  </option>
                  <option value="bdt" className="bg-black">
                    BDT
                  </option>
                </select>
              </div>
              {/* price converter and share */}
              <div className=" md:gap-8 my-6 flex">
                {/* price converter */}

                {/* share */}
                <button className=" gap-3 items-center text-xl px-3 py-1 border rounded-2xl hidden md:flex">
                  <CiShare2 size={24} />
                  <span>Share</span>
                </button>
              </div>
            </div>
            {/* bed, bath, sqrft, floorplan */}
            <div className="md:mt-8 md:text-xl space-y-4 md:space-y-0 md:flex justify-between items-center">
              {/* bed */}
              <div className="flex gap-3 items-center">
                <Image src={bed} alt="bed svg" width={24} height={24} />
                <span>{data.bedroom} Beds</span>
              </div>
              {/* bathroom  */}
              {data.status !== "Off-Plan" && (
                <div className="flex gap-3 items-center">
                  <Image
                    src={bathroom}
                    alt="bathroom svg"
                    width={24}
                    height={24}
                  />
                  <span>{data.bathroom} Baths</span>
                </div>
              )}
              {/* area sqrft  */}
              <div className="flex gap-3 items-center">
                <Image
                  src={triangleSqrft}
                  alt="triangleSqrft svg"
                  width={24}
                  height={24}
                />
                {data.status === "Off-Plan" && (
                  <span className="text-[#E4B649]">Area From</span>
                )}
                <span>{data.areaSqFt} Sq.Ft.</span>
              </div>
              {/* download floorplan */}
              <button
                onClick={showFloorplan}
                className="bg-gradient-to-r from-[#A87601] to-[#835C00] text-sm items-center flex gap-2 px-2 py-2 rounded-md w-2/3 md:w-auto"
              >
                <Image
                  src={floorPlan}
                  alt="floorPlan svg"
                  width={24}
                  height={24}
                />
                <span>Download Floorplan</span>
              </button>
            </div>
            {/* description for mobile */}
            <div className="mt-12 md:hidden">
              <h2 className="text-xl">Description</h2>
              <p className="mt-4 text-sm">{data.description}</p>
            </div>
            {/* location for md lg devices*/}
            <div className="hidden md:flex text-xl gap-3 items-center my-10">
              <Image src={location} alt="location svg" width={24} height={24} />
              <span>{data.location}</span>
            </div>

            {/* listing details */}
            <div className="mt-12 md:mt-16">
              <h2 className="text-xl">Listing Details</h2>
              <div className="md:border border-[#d6d6d6] md:p-6 mt-4 grid md:grid-cols-2 gap-6">
                <div className="flex justify-between border-b">
                  <p>Location</p>
                  <p>{data.area}</p>
                </div>
                <div className="flex justify-between border-b">
                  <p>Price Per sq.ft</p>
                  <p>
                    {parseFloat(data.startingPrice / data.areaSqFt).toFixed(2)}{" "}
                    AED
                  </p>
                </div>
                {data?.status === "Off-Plan" ? (
                  <div className="flex justify-between border-b">
                    <p>Developer</p>
                    <p>{data.developer}</p>
                  </div>
                ) : (
                  <div className="flex justify-between border-b">
                    <p>Furnishing</p>
                    <p>{data.furnishing}</p>
                  </div>
                )}
                <div className="flex justify-between border-b">
                  <p>Completion Status</p>
                  <p>{data.completion}</p>
                </div>
                <div className="flex justify-between border-b">
                  <p>Property Type</p>
                  <p>{data.propertyType}</p>
                </div>
                <div className="flex justify-between border-b">
                  <p>Views</p>
                  <p>{data.views}</p>
                </div>
              </div>
            </div>

            {/* payment */}
            {data?.status === "Off-Plan" && (
              <div className="mt-12 md:mt-16">
                <h2 className="text-xl">Payment Plan</h2>
                <div className="mt-4 grid md:grid-cols-2 gap-8">
                  <div className="shadow-gray-800 shadow px-4 md:px-8 py-4 md:py-6 rounded-md hover:scale-105 transition-all">
                    {/* first installment */}
                    <div className="flex justify-end text-[#E4B649]">
                      <ImSwitch size={32} />
                    </div>
                    <h2 className="text-xl md:text-3xl font-semibold">
                      {data?.payment?.firstInstallment} %
                    </h2>
                    <p className="md:text-xl text-gray-400 mt-2">
                      First Installment
                    </p>
                  </div>
                  {/* under construction */}
                  <div className="shadow-gray-800 shadow px-4 md:px-8 py-4 md:py-6 rounded-md hover:scale-105 transition-all">
                    <div className="flex justify-end text-[#E4B649]">
                      <IoSettingsOutline size={32} />
                    </div>
                    <h2 className="text-xl md:text-3xl font-semibold">
                      {data?.payment?.underConstruction} %
                    </h2>
                    <p className="md:text-xl text-gray-400 mt-2">
                      Under Constraction
                    </p>
                  </div>
                  {/* on handover */}
                  <div className="shadow-gray-800 shadow px-4 md:px-8 py-4 md:py-6 rounded-md hover:scale-105 transition-all">
                    <div className="flex justify-end text-[#E4B649]">
                      <IoKeyOutline size={32} className="" />
                    </div>
                    <h2 className="text-xl md:text-3xl font-semibold">
                      {data?.payment?.onHandover} %
                    </h2>
                    <p className="md:text-xl text-gray-400 mt-2">On Handover</p>
                  </div>
                  {/* post handover */}
                  {data.payment?.postHandover && (
                    <div className="shadow-gray-800 shadow px-4 md:px-8 py-4 md:py-6 rounded-md hover:scale-105 transition-all">
                      <div className="flex justify-end text-[#E4B649]">
                        <FaRegHandshake size={32} className="" />
                      </div>
                      <h2 className="text-xl md:text-3xl font-semibold">
                        {data?.payment?.postHandover} %
                      </h2>
                      <p className="md:text-xl text-gray-400 mt-2">
                        Post Handover
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* amenities */}
            <div className="mt-12 md:mt-16">
              <h2 className="text-xl">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 justify-between mt-4">
                {data?.amenities?.map((amenity, ind) => (
                  <ShowAmenities key={ind} amenity={amenity} />
                ))}
              </div>
            </div>

            {/* description  for md lg*/}
            <div className="mt-16 hidden md:block">
              <h2 className="text-xl">Description</h2>
              <p className="mt-4">{data.description}</p>
            </div>
          </div>
          {/* agent information */}
          <div className="mt-10 lg:mt-0 lg:w-[30%] lg:h-[300px] border border-[#BE8500] rounded-2xl p-4">
            <div>
              <div className="flex items-end justify-between gap-2 ">
                <div className="space-y-2">
                  <h2 className="md:text-xl font-semibold">{agent?.name}</h2>
                  <h3 className="text-sm md:text-base font-medium">
                    {agent?.designation}
                  </h3>
                  <h3 className="text-sm md:text-base font-medium">
                    RERA - {agent?.reraID}
                  </h3>
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
              <div className="flex mt-6 gap-2 md:gap-6">
                <Link href={`tel:${agent?.wpNum}`} className="w-1/2">
                  {" "}
                  <div className="flex items-center hover:scale-105 transition-all gap-3 border border-[#e4b5499e] px-2 py-1 rounded-3xl w-full">
                    <Image src={call} alt="Phone Icon" width={24} height={24} />
                    <p>Call Now</p>
                  </div>
                </Link>

                <div
                  className="flex items-center hover:scale-105 transition-all hover:cursor-pointer border-[#e4b5499e] gap-3 border px-3 py-1 w-1/2 rounded-3xl justify-center"
                  onClick={() => setOpenInquiry(true)}
                >
                  <p>Inquiry</p>
                </div>
              </div>
              <div className="text-center mt-3">
                <Link href={`/agents/${agent?._id}`} className="text-[#E4B649]">
                  View All Properties
                </Link>
                <div className="mx-4 border-t border-[#E4B649] my-4"></div>
                <Link
                  href={`https://wa.me/${agent?.wpNum}`}
                  className="text-sm md:text-base flex justify-center gap-1 items-center"
                >
                  <span className="w-4 md:w-8">
                    <Image
                      src={whatsapp}
                      alt="whatsapp"
                      width={24}
                      height={24}
                    />
                  </span>

                  <span className="mt-1">
                    Get your inquiry on{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD87C] to-[#A27100] hover:scale-105">
                      WhatsApp
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* schedule */}
      <div className="border-t mt-10 py-8 px-4 md:px-12 lg:px-36 lg:flex gap-8">
        <div className="space-y-2 hidden lg:block">
          <Image src={agent?.photo} alt={agent?.name} height={80} width={280} />
          <h2 className="text-xl font-semibold">{agent?.name}</h2>
          <h3 className="font-medium">{agent?.designation}</h3>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">
            SCHEDULE PROPERTY TOUR
          </h2>
          <p>Our representative will guide you through the property viewing.</p>
          {/* call section */}
          <div className="mt-4 flex gap-4">
            <button className="bg-[#393939] opacity-70 py-1 md:py-2 px-4 border border-[#E4B649]">
              VIDEO CALL
            </button>
            <button className="py-1 md:py-2 px-4 opacity-70 border border-[#E4B649]">
              IN PERSON
            </button>
          </div>
          {/*schedule form */}
          <form className="mt-4 opacity-80 lg:text-xl">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-transparent  border-b border-[#E4B649] w-full outline-none "
            />
            <input
              type="number"
              placeholder="Your Phone"
              className="bg-transparent border-b border-[#E4B649] w-full outline-none mt-4"
            />
            <input
              type="email"
              placeholder="Mail"
              className="bg-transparent border-b border-[#E4B649] w-full outline-none mt-4"
            />
            <div className="flex justify-between items-center mt-4">
              <label>select Date</label>
              <input type="date" className="bg-transparent outline-none " />
            </div>
            <div className="flex justify-center md:justify-end mt-4">
              <input
                type="submit"
                value="Send Now"
                className="border border-[#E4B649] px-2 py-1"
              />
            </div>
          </form>
          <Link
            href={`tel:${agent?.wpNum}`}
            className="mt-4 mb-8 flex justify-center gap-1 items-center"
          >
            <span className="w-8 md:w-12">
              <Image src={whatsapp} alt="whatsapp" />
            </span>

            <span className=" md:text-2xl">
              Get your inquiry on{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD87C] to-[#A27100]">
                WhatsApp
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
