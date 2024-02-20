import Link from 'next/link';
import React from 'react';

const RightContent = () => {
    return (
        <div>
            <h1 className='text-5xl'>Easy way to find <br /> a perfect property</h1>
            <p className='text-xl pt-5 mb-5'>Looking for a home in Dubai? Choose to buy or rent, <br /> and let us help you find the perfect place for you!</p>

            <Link href={'/'} className='bg-[#604004] bg-opacity-20 p-3 font-semibold text-sm text-[#E8BF44]'>GET CONSULT</Link>
        </div>
    );
};

export default RightContent;