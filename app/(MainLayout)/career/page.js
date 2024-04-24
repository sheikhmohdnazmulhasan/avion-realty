"use client";
import careerBanner from "@/public/images/root/career/careerBanner.svg";
import culture from "@/public/images/root/career/culture.svg";
import technology from "@/public/images/root/career/technology.svg";
import excellence from "@/public/images/root/career/excellence.svg";
import development from "@/public/images/root/career/development.svg";
import Image from "next/image";
import { GrFormAttachment } from "react-icons/gr";

const Career = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const number = form.number.value;
    const email = form.email.value;
    const resume = form.resume.files[0];

    // Construct the mailto link with form data
    const mailtoLink = `mailto:hr@avionrealty.ae?subject=Avion Reality - Mail From Career Page&body=Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${number}`;

    // Open the user's email client
    window.location.href = mailtoLink;

    // console.log(name, number, email);
  };

  return (
    <div>
      {/* banner */}
      <div
        style={{
          backgroundImage: `url(${careerBanner.src})`,
          backgroundSize: "cover",
        }}
        className="flex lg:pl-48 lg:py-32 justify-center lg:justify-start items-center lg:items-end h-[30vh] md:h-[50vh] lg:h-[70vh]"
      >
        <h2 className="text-xl md:text-3xl  font-bold uppercase">
          Join Our Team
        </h2>
      </div>
      {/* content container */}
      <div className="px-4 md:px-16 lg:px-48 py-8 lg:py-24">
        {/* about the team */}
        <div className="lg:flex justify-between">
          {/* description */}
          <div className="lg:w-[30%]">
            <h2 className="text-2xl font-semibold mb-6">
              Why you Should Join Our Awesome Team
            </h2>
            <p className="text-justify">
              At Avion Realty Properties LLC, we believe in empowering
              individuals to achieve their fullest potential while contributing
              to a dynamic and innovative real estate industry. As a leading
              real estate agency, we are dedicated to delivering exceptional
              service to our clients and fostering a collaborative and
              supportive work environment for our team members.
            </p>
          </div>

          {/* facilities */}
          <div className="mt-12 lg:mt-0 lg:w-[57%] grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* 1 */}
            <div>
              <div className="bg-[#A87600] w-16 h-16 flex justify-center items-center rounded-sm">
                <Image src={culture} alt="culture svg" width={32} height={32} />
              </div>
              <h2 className="mb-3 mt-8 text-xl font-semibold">
                Supportive Culture
              </h2>
              <p>
                Our team-oriented culture encourages collaboration, growth, and
                mutual success. We believe in supporting each other every step
                of the way.
              </p>
            </div>
            {/* 2 */}
            <div>
              <div className="bg-[#A87600] w-16 h-16 flex justify-center items-center rounded-sm">
                <Image
                  src={technology}
                  alt="technology svg"
                  width={32}
                  height={32}
                />
              </div>
              <h2 className="mb-3 mt-8 text-xl font-semibold">
                Innovative Technology
              </h2>
              <p>
                We embrace cutting-edge technology to streamline processes and
                provide our agents with the tools they need to succeed in
                today&apos;s competitive market.
              </p>
            </div>
            {/* 3 */}
            <div>
              <div className="bg-[#A87600] w-16 h-16 flex justify-center items-center rounded-sm">
                <Image
                  src={excellence}
                  alt="excellence svg"
                  width={32}
                  height={32}
                />
              </div>
              <h2 className="mb-3 mt-8 text-xl font-semibold">
                Commitment to Excellence
              </h2>
              <p>
                We strive for excellence in everything we do, from client
                interactions to professional development opportunities for our
                team members.
              </p>
            </div>
            {/* 4 */}
            <div>
              <div className="bg-[#A87600] w-16 h-16 flex justify-center items-center rounded-sm">
                <Image
                  src={development}
                  alt="development svg"
                  width={32}
                  height={32}
                />
              </div>
              <h2 className="mb-3 mt-8 text-xl font-semibold">
                Professional Development
              </h2>
              <p>
                We are committed to investing in the growth and development of
                our team members through ongoing training, mentorship programs,
                and career advancement opportunities.
              </p>
            </div>
          </div>
        </div>
        {/* join the team */}
        <div className="lg:flex justify-between pt-8 lg:pt-32 ">
          {/* description */}
          <div className="lg:w-[30%]">
            <h2 className="text-2xl font-semibold mb-6">Send Your Resume</h2>
            <p className="text-justify mb-4">
              Ready to take the next step in your career with Avion Realty
              Properties LLC? We&apos;re excited to hear from talented
              individuals like you who are passionate about real estate and
              eager to make a difference in the industry.
            </p>
            <p>
              Join us in shaping the future of real estate at Avion Realty
              Properties LLC. We look forward to reviewing your application and
              potentially welcoming you to our team!
            </p>
          </div>
          {/* form */}
          <div className="mt-12 lg:mt-0 lg:w-[57%]">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full bg-transparent px-8 py-3 rounded-3xl border border-[#E4B649] outline-none md:text-xl mb-4 md:mb-6"
              />
              <input
                type="number"
                name="number"
                placeholder="Your Number"
                className="w-full bg-transparent px-8 py-3 rounded-3xl border border-[#E4B649] outline-none md:text-xl mb-4 md:mb-6"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full bg-transparent px-8 py-3 rounded-3xl border border-[#E4B649] outline-none md:text-xl mb-4 md:mb-6"
              />
              <input
                type="file"
                name="resume"
                className="hidden"
                id="resume-input"
              />
              <label
                for="resume-input"
                className="w-full bg-[#835C00] hover:cursor-pointer rounded-3xl md:text-xl flex justify-center items-center gap-2 py-3"
              >
                <span>Upload Your Resume</span>
                <GrFormAttachment size={32} />
              </label>

              <div className="w-40 bg-[#835C00] py-3 text-center rounded-2xl mt-6 mx-auto">
                <input type="submit" value="Send" className="md:text-xl  " />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
