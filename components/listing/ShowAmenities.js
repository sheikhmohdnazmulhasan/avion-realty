'use client'

import axios from "axios";
import Image from "next/image";
import useSWR from "swr";

const ShowAmenities = ({amenity}) => {
    const fetcher = url => axios.get(url).then(res => res.data);
    const {data ={}} = useSWR(`https://avion-realty.vercel.app/api/admin/amenities?name=${amenity}`, fetcher);
    
    return (
        <div className="flex gap-4 items-center mb-4">
            <Image src={data[0]?.icon} alt={data[0]?.name} height={36} width={32}/>
            <p>{data[0]?.name}</p>
        </div>
    );
};

export default ShowAmenities;