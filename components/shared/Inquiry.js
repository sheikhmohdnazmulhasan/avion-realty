import whatsapp from "@/public/images/whatsapp.svg"
import Image from "next/image";

const Inquiry = () => {
    return (
        <div className='px-4 md:px-12 lg:px-20 py-8 md:py-24 text-center'>
            <div className='uppercase font-light pb-8'>
            <h2 className='text-xl md:text-2xl lg:text-3xl '>
                Immediate Assistance With Your Inquiry
            </h2>
            <p className='lg:w-3/5 mx-auto my-4 text-base md:text-xl lg:text-2xl '>Explore premier property consultation services in Dubai 
            for a tailored and insightful real estate experience.</p>
            </div>

            {/* form */}
            <form className="flex flex-col lg:flex-row justify-center gap-6">
                <input type='text' placeholder='Your Name' name="name" className='bg-transparent border border-[#E4B649] p-3 rounded-2xl'/>
                <input type='number' placeholder='Your Phone' name="phone" className='bg-transparent border border-[#E4B649] p-3 rounded-2xl'/>
                <input type='email' placeholder='Your Email' name="email" className='bg-transparent border border-[#E4B649] p-3 rounded-2xl'/>

                <input type="submit" value="Send" className='bg-[#FFD980] text-xl font-extrabold text-black py-2 px-10 rounded-2xl'/>
            </form>

            <div className='mt-16 flex justify-center gap-2 items-center'>

                <span className="w-8 md:w-12">
                <Image src={whatsapp} alt="whatsapp" />
                </span>

                <span className='text-xl md:text-2xl font-light'>Get your inquiry on <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#FFD87C] to-[#A27100]'>WhatsApp</span></span>
            </div>
            

        </div>
    );
};

export default Inquiry;