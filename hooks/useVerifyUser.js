'use client'
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

const useVerifyUser = () => {
    const { status, data } = useSession();
    // const [agent, setAgent] = useState([]);


    if (status === 'loading') {
        return { access: 'loading' };

    } else if (status === 'unauthenticated') {
        return { access: 'unauthenticated' };
 
    } else if (status === 'authenticated') {

        axios.get(`/api/users?email=${data?.user?.email}`).then(res => {

            return { access: 'authenticated', role: res.data.role}

        }).catch(err => console.log(err));


    } else {
        return null
    }

    // console.log(data);

    // console.log(agent);


};

export default useVerifyUser;