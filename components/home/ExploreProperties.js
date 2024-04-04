'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ListingCard from "../listing/ListingCard";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const ExploreProperties = () => {
    const [listings, setListings] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data = [], isLoading, error } = useSWR(`http://localhost:3000/api/offplans`, fetcher);

    useEffect(()=>{
        setListings(data.filter(item => item.propertyType === 'hhhhh'));
    }, [data])

    const handlePropertyType = (propertyType) => {
        setListings(data.filter(item => item.propertyType === propertyType));
        setIsActive(!isActive);
    }

    const handlePrev = () => {

        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);

        }

    }

    const handleNext = () => {

        if (currentIndex < data.length - 4) {
            setCurrentIndex(currentIndex + 1);
        }
    }
    
    return (
        <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-center">EXPLORE LUXURY PROPERTIES</h2>
            {/*property types*/}
            <div className="flex justify-center gap-12 my-6">
                <button onClick={()=> handlePropertyType('hhhhh')} className={`uppercase ${isActive ? 'text-[#E4B649] underline' : ''}`}>hhhhh</button>
                <button onClick={()=> handlePropertyType('asdf')} className={`uppercase ${isActive ? 'text-[#E4B649] underline' : ''}`}>asdf</button>
                <button onClick={()=> handlePropertyType('kISAIH')} className={`uppercase ${isActive ? 'text-[#E4B649] underline' : ''}`}>kISAIH</button>
                <button onClick={()=> handlePropertyType('xxx')} className={`uppercase ${isActive ? 'text-[#E4B649] underline' : ''}`}>xxx</button>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {
                    listings?.slice(currentIndex, currentIndex + 4).map(item => <ListingCard key={item._id} item={item} status={item.status}/>)
                }
            </div>

            {/* silde controller */}
            <div className="flex justify-between items-center text-xs px-4 my-6">
                {<button onClick={handlePrev} className={currentIndex < 1 && 'text-gray-500 cursor-not-allowed'}>PREV</button>}
                <button onClick={handleNext} className={currentIndex == data.length - 4 && 'text-gray-500 cursor-not-allowed'}>NEXT</button>

            </div>

        </div>
    );
};

export default ExploreProperties;