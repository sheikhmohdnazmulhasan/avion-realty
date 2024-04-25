import sellBanner from "@/public/images/root/sell/sellBanner.svg";
const page = () => {
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
      <div className="mt-12">
        <div className="mt-12 bg-[#A87600] lg:w-1/2 lg:h-[440px] bg-opacity-20 py-16 px-6 md:px-36 lg:pt-20 lg:pl-60 lg:pr-28 text-center md:text-left">
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
      </div>
    </div>
  );
};

export default page;
