"use client"

const Register = () => {

    const handleRegister = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(name, email, password);
    }

    return (
        <div>
            <form className='flex flex-col gap-3 max-w-3xl mx-auto mt-10' onSubmit={handleRegister}>
                <input className='py-2 px-3 bg-black border' placeholder="Enter Your Name" type="text" name="name" id="" />

                <input className='py-2 px-3 bg-black border' placeholder="Enter Your Email Address" type="email" name="email" id="" />
                <input className='py-2 px-3 bg-black border' placeholder="Enter Your Password" type="password" name="password" id="" />
                <input className='py-2 px-3 bg-blue-400 font-bold text-black' type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;