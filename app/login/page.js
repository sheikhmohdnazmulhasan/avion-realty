"use client"
import image from '@/public/images/login.jpg';
import Image from 'next/image';
import React from 'react';

const page = () => {
    return (
        <>
            <div className="flex w-full h-screen justify-between">
                <div className="w-[40%] flex flex-col gap-3 justify-center items-center px-10">
                    <h2 className='text-3xl mb-16'>Sign in your account </h2>
                    <form className='flex flex-col w-full'>

                        <label className='mb-2'>Mail Address</label>
                        <input className='p-3 bg-black border border-[#E4B649] rounded-lg' placeholder='Enter Email Address' type="email" name="" id="" />

                        <label className='mb-2 mt-10'>Password</label>
                        <input className='p-3 bg-black border border-[#E4B649] rounded-lg' placeholder='Enter Email Address' type="email" name="" id="" />
                       
                    </form>
                </div>
                <div className="w-[60%]"><Image className='h-screen' src={image} alt='login image' /></div>
            </div>
        </>
    );
};

export default page;