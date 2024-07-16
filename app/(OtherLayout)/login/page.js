"use client"
import image from '@/public/images/login.jpg';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [email2, setEmail2] = useState(null);
    const [forgotError, setForgotError] = useState('');

    // email js configaration
    const SERVICE_ID = "service_0fnmxk3";
    const TEMPLATE_ID = "template_3q6ydlj";
    const PUBLIC_KEY = "f8-NuZZSnWNj4M3eS";


    async function handleForgotPassword(event) {
        event.preventDefault();
        setForgotError('');
        const forgotEmail = event.target.forgotEmail.value;

        try {
            const response = await axios.post('/api/auth/forgot-password', { email: forgotEmail });

            if (response.data.message === 'invalid email') {
                setForgotError('Sorry! Email does not match any accounts');

            } else if (response.data.message === 'Something Wrong') {
                setForgotError('Sorry! Something Wrong.');
                
            } else if (response.data.message === 'Internal Server Error') {
                setForgotError('Sorry !Internal Server Error');

            } else if (response.data.message === 'Email send successfully') {

                // TODO:  send the verification email;
                // http://localhost:3000/auth/account/verification/forgot-password/token/${response.data.token}
                

                const templateParams = {
                    forgotEmail,
                    link: `http://localhost:3000/auth/account/verification/forgot-password/token/${response.data.token}`
                };
                console.log(templateParams );

                // for testing
                // setForgotError(response.data.token);
                //email js
                emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams , PUBLIC_KEY)
                    .then((result) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Verification Email Send!',
                            text: "If you don't find the email in your inbox, please check your spam folder!"
                        });
                        
                    }, (error) => {
                        console.log(error.text);
                    });

                

            } else {
                setForgotError('Something Wrong.');
            }

        } catch (error) {
            console.log(error);
            setForgotError('Something Wrong!')
        }
    }


    // Defining an asynchronous function called handleLogin which takes an 'event' parameter
    const handleLogin = async (event) => {
        // Preventing the default form submission behavior
        event.preventDefault();
        setErrMsg('');

        // Extracting email and password from the form fields
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            // Attempting to sign in using the provided email and password
            const res = await signIn('credentials', { email, password, redirect: false });

            if (res.ok) {
                router.replace('/dashboard');

            } else {
                setErrMsg('Invalid Email Or Password!');
            }

        } catch (error) {
            // Handling errors that occur during sign-in attempts
            console.log(error);
        }
    };



    return (
        <>

            {/* forgot pass modal */}
            <div className="mx-auto flex w-72 items-center justify-center">
                <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}>
                    <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-full rounded-lg bg-gray-900 drop-shadow-2xl sm:w-[500px] ${openModal ? 'opacity-1 translate-y-0 duration-300' : '-translate-y-20 opacity-0 duration-150'}`}>
                        <form className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10" onSubmit={handleForgotPassword}>
                            <svg onClick={() => setOpenModal(false)} className="mx-auto mr-0 w-10 cursor-pointer fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                            <h1 className="pb-8 text-2xl backdrop-blur-sm">Forgot Password</h1>
                            <div className="space-y-5">
                                <label htmlFor="email_navigate_ui_modal" className="block">
                                    Email
                                </label>
                                <div className="relative">
                                    <input defaultValue={email2} id="email_navigate_ui_modal" name='forgotEmail' type="email" placeholder="example@gmail.com" className="block w-full rounded-lg p-3 pl-10 outline-none drop-shadow-lg  bg-gray-700 text-white" />
                                    <span className="absolute left-2 top-1/4">
                                        <svg viewBox="0 0 24 24" fill="none" className="inline-block w-6" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10ZM7.73867 16.4465C8.96118 15.5085 10.4591 15 12 15C13.5409 15 15.0388 15.5085 16.2613 16.4465C17.4838 17.3846 18.3627 18.6998 18.7615 20.1883C18.9044 20.7217 18.5878 21.2701 18.0544 21.413C17.5209 21.556 16.9726 21.2394 16.8296 20.7059C16.5448 19.6427 15.917 18.7033 15.0438 18.0332C14.1706 17.3632 13.1007 17 12 17C10.8993 17 9.82942 17.3632 8.95619 18.0332C8.08297 18.7033 7.45525 19.6427 7.17037 20.7059C7.02743 21.2394 6.47909 21.556 5.94563 21.413C5.41216 21.2701 5.09558 20.7217 5.23852 20.1883C5.63734 18.6998 6.51616 17.3846 7.73867 16.4465ZM10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9ZM12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5Z" className=' fill-white'></path><rect x="2.5" y="2.5" width="19" height="19" rx="3.5" className=' stroke-white'></rect></g></svg>
                                    </span>
                                    <p className=' text-red-400 mt-2'>{forgotError}</p>
                                </div>

                            </div>
                            {/* button type will be submit for handling form submission*/}
                            <div className="  flex justify-end mt-6">

                                <button type="submit" className="  py-2.5 px-5 rounded-lg drop-shadow-lg bg-gray-700 hover:bg-gray-800">
                                    Send Verification Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* login form */}
            <div className="flex w-full h-screen justify-between">
                <div className="md:w-[40%] w-full flex flex-col gap-3 justify-center items-center px-10">
                    <h2 className='text-2xl md:text-3xl mb-16'>Sign in your account </h2>
                    <form className='w-full' onSubmit={handleLogin}>

                        <div className="flex flex-col w-full ">
                            <label className='mb-2'>Mail Address</label>
                            <input onBlur={(e) => setEmail2(e.target.value)} className='p-3 bg-black border border-[#E4B649] rounded-lg' placeholder='Enter Email Address' type="email" name="email" id="" />
                        </div>

                        <div className="flex flex-col w-full relative">
                            <label className='mb-2 mt-10'>Password</label>
                            <input className='p-3  bg-black border border-[#E4B649] rounded-lg' placeholder='Enter Password' type={showPassword ? 'text' : 'password'} name="password" id="" />

                            <div className="absolute text-[#E4B649] right-3 bottom-3.5 cursor-pointer hover:scale-125 duration-150" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                            </div>
                        </div>
                        <p className='mt-2 text-red-500'>{errMsg}</p>

                        <div className="flex items-center mt-4 md:mt-10 gap-3 justify-between">
                            <div className="hidden md:flex gap-2">
                                <input className='w-4 h-4 rounded-md appearance-none checked:bg-[#E4B649] border border-[#E4B649]' type="checkbox" name="" id="" />
                                <span className='text-sm'>Remember my preference</span>
                            </div>
                            <div className="" onClick={() => setOpenModal(true)}><p className='cursor-pointer hover:underline text-sm'>Forgot Password?</p></div>
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