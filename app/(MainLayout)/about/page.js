import MeetTeam from "@/components/home/MeetTeam";
import Banner from "@/components/shared/Banner";
import Image from "next/image";

import aboutImg from "@/public/images/root/about.svg";
import ashrafImg from "@/public/images/root/ashraf.svg";
import Inquiry from "@/components/shared/Inquiry";
import Link from "next/link";

const About = () => {
  const title = (
    <>
      <span>About</span>
      <br />
      <span className="md:mt-2">Avion Realty</span>
    </>
  );
  return (
    <div className="space-y-8 md:space-y-16 lg:space-y-24">
      <Banner title={title} />
      {/* about section */}
      <div className="lg:flex lg:pl-40">
        <div className="w-full lg:w-1/3 relative p-4">
          <Image
            src={aboutImg}
            alt="about svg"
            className="h-[200px] lg:h-auto w-full object-cover"
          />
          <div className="p-16 md:p-24 border border-[#E4B649] absolute bottom-2 lg:bottom-8 right-2 lg:-right-4 z-20"></div>
        </div>
        <div className="lg:flex-1 lg:mt-12 lg:-ml-6 z-10 ">
          <div className="space-y-4 w-full bg-[#191919] p-4 lg:p-24 lg:pr-40 text-justify">
            <p>
              At Avion Realty Properties LLC, we understand that buying,
              selling, or leasing a property is a significant decision, and we
              strive to make the process seamless and rewarding for our clients.
              With a team of seasoned professionals, we bring extensive
              knowledge of the Dubai real estate market, ensuring that our
              clients make informed decisions to achieve their property goals.
            </p>
          </div>
        </div>
      </div>

      {/* services section */}
      <div className="lg:flex">
        <div className="w-2/3 lg:w-[40%] bg-[#191919] pt-8 md:pt-12 h-24 md:h-40">
          <h2 className="text-right text-2xl md:text-3xl font-medium -mr-16">
            Our Services
          </h2>
        </div>
        <div className="lg:w-[60%] md:grid grid-cols-2 gap-6 mt-4 md:mt-16 lg:mt-32 md:px-12">
          <div className="p-6 border border-[#E4B649] my-4 ml-4 md:my-0 md:ml-0">
            <h3 className="text-xl mb-2">Real Estate Consulting</h3>
            <p>
              Avion Realty Properties LLC provides personalized consulting
              services, guiding you through Dubai&apos;s real estate landscape.
              Our experts offer insights tailored to your goals, ensuring a
              strategic and successful journey.
            </p>
          </div>
          <div className="p-6 border border-[#E4B649] my-4 mr-4 md:my-0 md:mr-0">
            <h3 className="text-xl mb-2">Purchasing Support</h3>
            <p>
              Navigate property acquisition effortlessly with Avion Realty. From
              due diligence to legal considerations, our support activities make
              the buying process straightforward and rewarding.
            </p>
          </div>
          <div className="p-6 border border-[#E4B649] my-4 ml-4 md:my-0 md:ml-0">
            <h3 className="text-xl mb-2">After-Sales Excellence</h3>
            <p>
              Avion Realty stands by you post-transaction, offering
              comprehensive after-sales service. From handover assistance to
              ongoing support, we&apos;re committed to ensuring a smooth
              transition into your new investment.
            </p>
          </div>
          <div className="p-6 border border-[#E4B649] my-4 mr-4 md:my-0 md:mr-0">
            <h3 className="text-xl mb-2">Selecting and Viewing</h3>
            <p>
              Discover your dream property with Avion Realty. We understand your
              preferences, curating a selection that aligns with your vision.
              Your perfect home awaits, and Avion Realty is here to guide you
              every step of the way.
            </p>
          </div>
        </div>
      </div>

      {/* property section */}
      <div>
        <div className=" hidden lg:flex pl-56">
          <div className="w-1/3 relative p-4">
            <Image
              src={aboutImg}
              alt="about svg"
              className=" w-full object-cover"
            />
            <div className="p-24 border border-[#E4B649] absolute top-60 -left-4 z-20"></div>
          </div>
          <div className="w-2/3 mt-36 -ml-20 z-10 ">
            <div className=" w-full bg-[#191919] p-24 text-sm grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl mb-2">Off-Plan Investment</h3>
                <p>
                  Embark on a journey of foresight with Avion Realty Properties
                  LLC as we redefine the landscape of off-plan investments in
                  Dubai. Our team of seasoned professionals leverages extensive
                  market knowledge to guide you through the dynamic world of
                  pre-construction opportunities. Explore the potential for
                  substantial returns as we help you secure exclusive off-plan
                  properties, ensuring you&apos;re at the forefront of
                  Dubai&apos;s real estate evolution. With Avion Realty, turn
                  your investment dreams into a reality, unlocking the door to
                  tomorrow&apos;s prime locations today.
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-2">Ready Homes</h3>
                <p>
                  Experience the epitome of comfort and style with Avion Realty
                  Properties LLC&apos;s curated collection of ready homes. Our
                  portfolio boasts meticulously crafted residences in
                  Dubai&apos;s most sought-after neighborhoods, each promising
                  an unparalleled blend of sophistication and functionality.
                  Whether you seek a contemporary city apartment or a serene
                  suburban villa, our dedicated team is committed to finding
                  your perfect match. Trust Avion Realty to navigate the
                  ready-home market, ensuring that your next property purchase
                  is not just a house but a statement of refined living.
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-2">Rental Residences</h3>
                <p>
                  Discover a curated selection of rental properties that
                  redefine the concept of temporary living with Avion Realty
                  Properties LLC. Whether you seek short-term luxury or a
                  long-term home, our comprehensive portfolio spans across
                  Dubai&apos;s diverse landscapes. Our dedicated rental
                  consultants work tirelessly to match your preferences with the
                  perfect property, ensuring that every moment spent in your
                  rental residence is an experience in comfort and convenience.
                  Elevate your lifestyle with Avion Realty&apos;s rental
                  solutions, where every property is a temporary haven crafted
                  for your unique needs.
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-2">Seamless Selling</h3>
                <p>
                  Selling your property in Dubai is a journey that demands
                  precision, strategy, and a touch of finesse. Avion Realty
                  Properties LLC takes pride in offering a seamless selling
                  experience, backed by a team of experts adept at understanding
                  market dynamics. From strategic pricing to targeted marketing,
                  we tailor our approach to maximize your property&apos;s
                  potential. Trust us to navigate the complexities, negotiate
                  skillfully, and secure the optimal value for your property.
                  Let Avion Realty be your partner in realizing the true worth
                  of your investment..
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* founder details */}
      <div className="lg:flex lg:pl-40">
        <div className="w-full lg:w-1/3 relative p-4 z-10">
          <Image
            src={ashrafImg}
            alt="ashraf khan"
            className="mt-16 h-[200px] lg:h-auto md:w-[70%] object-cover"
          />
          <div className="p-12 md:p-20 border border-[#E4B649] absolute bottom-2 lg:bottom-24 left-2 lg:-left-4 z-20"></div>
        </div>
        <div className="lg:flex-1 lg:-ml-56 ">
          <div className="space-y-4 w-full bg-[#0E0E0E] py-4 lg:py-12 px-4 lg:pl-48 lg:pr-24">
            <h2 className="text-3xl">Ashraf Khan </h2>
            <h3 className="md:text-xl">
              Founder & CEO of Avion Realty Properties LLC
            </h3>
            <div className="text-sm space-y-6">
              <p>
                Since 2006, Mr. Ashaf Khan has been a prominent figure in the
                Dubai Real Estate Market, showcasing an unwavering commitment to
                excellence. Starting as a property consultant, his meteoric rise
                saw him assume the role of Sales Manager, successfully managing
                a team of 10 individuals. His exceptional leadership led to
                further promotion as Sales Director, where he oversaw the entire
                sales process, contributing to real estate transactions totaling
                more than 1 billion dirhams.
              </p>

              <p>
                At the helm of Avion Realty Properties LLC, Mr. Khan&apos;s
                visionary leadership has propelled the firm to prominence. As
                Founder & CEO, he brings a wealth of experience and industry
                connections to the company. His strong rapport with major
                developers such as Emaar, Dubai Properties, Meraas, and Damac
                ensures that Avion Realty is at the forefront of exclusive
                opportunities in the Dubai real estate market.
              </p>

              <p>
                Mr. Ashaf Khan&apos;s influence extends beyond transactions; he
                envisions Avion Realty as a beacon of personalized service,
                integrity, and client-centric values. With a reputation for
                success, a robust network, and an in-depth understanding of
                market dynamics, Mr. Khan continues to shape the real estate
                landscape in Dubai, leading Avion Realty Properties LLC to new
                horizons.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:px-16 lg:px-40 ">
        <MeetTeam  admin={true}/>
      </div>

      <div className="hidden md:flex justify-end items-center md:px-16 lg:px-40 ">
          <Link className="py-2 px-4 bg-[#604000] hover:scale-105 transition-all rounded-sm" href={'/agents'}> All Agents</Link>
        </div>

      <Inquiry />
    </div>
  );
};

export default About;
