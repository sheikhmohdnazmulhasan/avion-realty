import Link from 'next/link';
import React from 'react';

const RightContent = () => {
    return (
        <div className='my-24 md:mt-0'>
            <h1 className='text-3xl text-center md:text-left md:text-5xl'>Easy way to find a perfect property</h1>
            <p className='text-xl pt-5 mb-5 hidden md:block'>Looking for a home in Dubai? Choose to buy or rent, <br /> and let us help you find the perfect place for you!</p>

            <div className="flex mt-10 justify-center md:justify-end md:mr-16">
                <Link href={'/'} className='bg-[#604004] bg-opacity-20 p-3 font-semibold text-sm text-[#E8BF44]'>GET CONSULT</Link>
            </div>
        </div>
    );
};

export default RightContent;