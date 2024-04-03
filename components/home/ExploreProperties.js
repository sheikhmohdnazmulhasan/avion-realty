'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const ExploreProperties = () => {
    const { data = [], isLoading, error } = useSWR(`http://localhost:3000/api/offplans?propertyType=hhhhh`, fetcher);

    const [listings, setListings] = useState(data);
    console.log(listings);
    

    const handlePropertyType = (propertyType) => {
        console.log(propertyType);
    }
    return (
        <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-center">EXPLORE LUXURY PROPERTIES</h2>
            {/*property types*/}
            <div className="flex justify-center gap-12 my-6">
                <button onClick={()=> handlePropertyType('hhhhh')} className="uppercase">hhhhh</button>
                <button onClick={()=> handlePropertyType('asdf')} className="uppercase">asdf</button>
                <button onClick={()=> handlePropertyType('kISAIH')} className="uppercase">kISAIH</button>
                <button onClick={()=> handlePropertyType('xxx')} className="uppercase">xxx</button>
            </div>

            <div>

            </div>

        </div>
    );
};

export default ExploreProperties;