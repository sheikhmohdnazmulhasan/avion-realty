'use client'
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Swal from "sweetalert2";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const SetPassword = ({ params }) => {
    const token = params.id;
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [error2, setError2] = useState('');
    const router = useRouter();

    const { data = [], error } = useSWR(`/api/auth/forgot-password?token=${token}`, fetcher);

    async function handleSetPassword(event) {
        event.preventDefault();
        setError2('');
        const password = event.target.password.value;
        const password2 = event.target.password2.value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            setError2(`🥢Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.`);

        } else if (password !== password2) {
            setError2('🥢Password did not match!');

        } else {

            try {
                const dataForForgotPassword = { token, newPassword: password };
                const response = await axios.patch(`/api/auth/forgot-password`, dataForForgotPassword);

                if (response.data.message === 'Invalid Token') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Token',
                        text: 'The token you requested is incorrect. Please request a password reset from the login page again!'
                    });
                    router.replace('/login');

                } else if (response.data.message === 'Token expired') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Token expired',
                        text: 'The token you requested is expired. Please request a password reset from the login page again!'
                    });
                    router.replace('/login');


                } else if (response.data.message === 'Same Password') {
                    setError2('Old password and new password cannot be same!');

                } else if (response.data.message === 'Something Wrong') {
                    Swal.fire({
                        icon: 'info',
                        title: 'Something Wrong',
                        text: 'We cannot identify you. Please try again from the beginning after a while'
                    });
                    router.replace('/login');

                } else if (response.data.message === 'password update successfully') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Password Updated.',
                        text: 'Your password has been successfully changed. Please login with new password from the login page'
                    });
                    router.replace('/login');

                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Something Wrong',
                        text: 'We cannot identify you. Please try again from the beginning after a while'
                    });
                    router.replace('/login');
                }


            } catch (error) {
                console.log(error);
                setError2('🥢Something Wrong')
            }
        }

    }

    if (!data.success) {
        return (
            <div className="grid h-screen place-content-center bg-[#0A0909] px-4">
                <h1 className="uppercase tracking-widest text-gray-200">401 | Unauthorized</h1>
            </div>
        );
    }

    return (
        <div className=" h-screen w-full flex justify-center items-center">
            <div className="md:w-[40%] w-full flex flex-col gap-3 justify-center items-center px-10">
                <h2 className='text-2xl md:text-3xl mb-16'>Create New Password </h2>
                <form className='w-full' onSubmit={handleSetPassword}>

                    <div className="flex flex-col w-full relative">
                        <label className='mb-2'>New Password</label>
                        <input className='p-3  bg-black border border-[#E4B649] rounded-lg' placeholder='Enter New Password' type={showPassword ? 'text' : 'password'} name="password" id="" />

                        <div className="absolute text-[#E4B649] right-3 bottom-3.5 cursor-pointer hover:scale-125 duration-150" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                        </div>
                    </div>
                    <div className="flex flex-col w-full relative">
                        <label className='mb-2 mt-5'>Confirm New Password</label>
                        <input className='p-3  bg-black border border-[#E4B649] rounded-lg' placeholder='Confirm New Password' type={showPassword2 ? 'text' : 'password'} name="password2" id="" />

                        <div className="absolute text-[#E4B649] right-3 bottom-3.5 cursor-pointer hover:scale-125 duration-150" onClick={() => setShowPassword2(!showPassword2)}>
                            {showPassword2 ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                        </div>
                    </div>
                    <p className="mt-2 text-red-400">{error2}</p>


                    <input className='p-3 rounded-md mt-9 font-semibold tracking-widest cursor-pointer duration-150 hover:bg-[#6d5a2c] bg-[#835C00] w-full' type="submit" value="Change Password" />
                </form>
            </div>
        </div>
    );
};

export default SetPassword;