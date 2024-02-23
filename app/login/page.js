"use client"
import image from '@/public/images/login.jpg';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    // Defining an asynchronous function called handleLogin which takes an 'event' parameter
    const handleLogin = async (event) => {
        // Preventing the default form submission behavior
        event.preventDefault();

        // Extracting email and password from the form fields
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            // Attempting to sign in using the provided email and password
            const res = await signIn('credential', { email, password, redirect: false });

            // Logging the result of the sign-in attempt
            console.log(res);

        } catch (error) {
            // Handling errors that occur during sign-in attempts
            console.log(error);
        }
    }


    return (
        <>
            <div className="flex w-full h-screen justify-between">
                <div className="md:w-[40%] w-full flex flex-col gap-3 justify-center items-center px-10">
                    <h2 className='text-2xl md:text-3xl mb-16'>Sign in your account </h2>
                    <form className='w-full' onSubmit={handleLogin}>

                        <div className="flex flex-col w-full ">
                            <label className='mb-2'>Mail Address</label>
                            <input className='p-3 bg-black border border-[#E4B649] rounded-lg' placeholder='Enter Email Address' type="email" name="email" id="" />
                        </div>

                        <div className="flex flex-col w-full relative">
                            <label className='mb-2 mt-10'>Password</label>
                            <input className='p-3  bg-black border border-[#E4B649] rounded-lg' placeholder='Enter Password' type={showPassword ? 'text' : 'password'} name="password" id="" />

                            <div className="absolute text-[#E4B649] right-3 bottom-3.5 cursor-pointer hover:scale-125 duration-150" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                            </div>
                        </div>

                        <div className="flex items-center mt-4 md:mt-10 gap-3 justify-between">
                            <div className="hidden md:flex gap-2">
                                <input className='w-4 h-4 rounded-md appearance-none checked:bg-[#E4B649] border border-[#E4B649]' type="checkbox" name="" id="" />
                                <span className='text-sm'>Remember my preference</span>
                            </div>
                            <div className=""><p className='cursor-pointer hover:underline text-sm'>Forgot Password?</p></div>
                        </div>
                        <input className='p-3 rounded-md mt-9 font-semibold tracking-widest cursor-pointer duration-150 hover:bg-[#6d5a2c] bg-[#835C00] w-full' type="submit" value="Sign In" />
                    </form>
                </div>
                <div className="w-[60%] hidden md:block"><Image className='h-screen' src={image} alt='login image' /></div>
            </div>
        </>
    );
};

export default Login;