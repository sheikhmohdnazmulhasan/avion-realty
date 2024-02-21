"use client"
import image from '@/public/images/login.jpg';
import Image from 'next/image';
import React from 'react';

const page = () => {
    return (
        <>
            <div className="flex w-full h-screen justify-between">
                <div className="md:w-[40%] w-full flex flex-col gap-3 justify-center items-center px-10">
                    <h2 className='text-2xl md:text-3xl mb-16'>Sign in your account </h2>
                    <form className='flex flex-col w-full'>

                        <label className='mb-2'>Mail Address</label>
                        <input className='p-3 bg-black border border-[#E4B649] rounded-lg' placeholder='Enter Email Address' type="email" name="" id="" />

                        <label className='mb-2 mt-10'>Password</label>
                        <input className='p-3 bg-black border border-[#E4B649] rounded-lg' placeholder='Enter Password' type="password" name="" id="" />
                        <div className="flex items-center mt-4 md:mt-10 gap-3 justify-between">
                           <div className="hidden md:flex gap-2">
                           <input className='w-4 h-4  rounded-md appearance-none checked:bg-[#E4B649] border border-[#E4B649]' type="checkbox" name="" id="" />
                            <span className='text-sm'>Remember my preference</span>
                           </div>
                           <div className=""><p className='cursor-pointer hover:underline'>Forgot Password?</p></div>
                        </div>
                        <input className='p-3 rounded-md mt-9 font-semibold tracking-widest cursor-pointer duration-150 hover:bg-[#6d5a2c] bg-[#835C00]' type="submit" value="Sign In" />
                    </form>
                </div>
                <div className="w-[60%] hidden md:block"><Image className='h-screen' src={image} alt='login image' /></div>
            </div>
        </>
    );
};

export default page;