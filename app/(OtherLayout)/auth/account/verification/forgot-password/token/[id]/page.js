'use client'
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SetPassword = ({ params }) => {
    const token = params.id;
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [error, setError] = useState('')

    async function handleSetPassword(event) {
        event.preventDefault();
        setError('');
        const password = event.target.password.value;
        const password2 = event.target.password2.value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            setError(`🥢Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.`);

        } else if (password !== password2) {
            setError('🥢Password did not match!');

        } else {

            try {
                // req to server for change pass


            } catch (error) {
                console.log(error);
                setError('🥢Something Wrong')
            }
        }


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
                    <p className="mt-2 text-red-400">{error}</p>


                    <input className='p-3 rounded-md mt-9 font-semibold tracking-widest cursor-pointer duration-150 hover:bg-[#6d5a2c] bg-[#835C00] w-full' type="submit" value="Change Password" />
                </form>
            </div>
        </div>
    );
};

export default SetPassword;