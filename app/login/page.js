import image from '@/public/images/login.jpg';
import Image from 'next/image';
import React from 'react';

const page = () => {
    return (
        <>
            <div className="flex w-full">
                <div className="w-[40%]"></div>
                <div className="w-[60%]">
                    <Image src={image} alt='login image' />
                </div>
            </div>
        </>
    );
};

export default page;