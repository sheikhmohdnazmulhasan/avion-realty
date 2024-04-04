'use client';
import useGetAreas from "@/hooks/useGetAreas";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ExploreAreas = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const areas = useGetAreas();

    console.log(areas);

    const handlePrev = () => {

        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);

        }

    }

    const handleNextSm = () => {

        if (currentIndex < areas?.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }
    const handleNextMd = () => {

        if (currentIndex < areas?.length - 2) {
            setCurrentIndex(currentIndex + 1);
        }
    }
    const handleNextLg = () => {

        if (currentIndex < areas?.length - 4) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    return (
        <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-center">Popular Areas</h2>
            <p className='md:w-1/2 lg:w-2/5 my-4 mx-auto md:text-xl text-center'>Discover the most sought-after neighborhoods and popular areas in Dubai</p>

            {/* sm device slieder */}
            <div className="md:hidden">
                {
                    areas?.slice(currentIndex, currentIndex + 1).map(area => <div key={area._id}>
                        <div className="relative">
                            <Image src={area.itemImg} alt={area.itemName} height={360} width={120} className="w-full h-[360px]"/>
                            <div className="  bg-black opacity-70 absolute bottom-0 w-full hover:bg-transparent hover:opacity-100">
                                <div className="w-full text-center p-4">
                                    <h2 className="text-xl uppercase py-2">{area.itemName}</h2>
                                    <Link href={`/listing/${area.itemName}`}>Explore More</Link>
                                </div>
                            </div>
                        </div>
                    </div>  )
                }
            </div>
            {/* md device slieder */}
            <div className="hidden md:grid grid-cols-2 lg:hidden">
                {
                    areas?.slice(currentIndex, currentIndex + 2).map(area => <div key={area._id}>
                        <div className="relative">
                            <Image src={area.itemImg} alt={area.itemName} height={360} width={120} className="w-full h-[360px]"/>
                            <div className="  bg-black opacity-70 absolute bottom-0 w-full hover:bg-transparent hover:opacity-100">
                                <div className="w-full text-center p-4">
                                    <h2 className="text-xl uppercase py-2">{area.itemName}</h2>
                                    <Link href={`/listing/${area.itemName}`}>Explore More</Link>
                                </div>
                            </div>
                        </div>
                    </div>  )
                }
            </div>
            {/* lg device slieder */}
            <div className="hidden lg:grid grid-cols-4">
                {
                    areas?.slice(currentIndex, currentIndex + 4).map(area => <div key={area._id}>
                        <div className="relative">
                            <Image src={area.itemImg} alt={area.itemName} height={360} width={120} className="w-full h-[360px]"/>
                            <div className="  bg-black opacity-70 absolute bottom-0 w-full hover:bg-transparent hover:opacity-100">
                                <div className="w-full text-center p-4">
                                    <h2 className="text-xl uppercase py-2">{area.itemName}</h2>
                                    <Link href={`/listing/${area.itemName}`}>Explore More</Link>
                                </div>
                            </div>
                        </div>
                    </div> )
                }
            </div>

            {/* silde controller */}
            <div className=" flex justify-between items-center text-xs px-4 my-6">
                {<button onClick={handlePrev} className={currentIndex < 1 && 'text-gray-500 cursor-not-allowed'}>PREV</button>}
                {/* sm */}
                <button onClick={handleNextSm} className={`md:hidden ${currentIndex == areas?.length - 1 && 'text-gray-500 cursor-not-allowed'}`}>NEXT</button>
                {/* lg */}
                <button onClick={handleNextMd} className={`hidden md:block lg:hidden ${currentIndex == areas?.length - 2 && 'text-gray-500 cursor-not-allowed'}`}>NEXT</button>
                {/* lg */}
                <button onClick={handleNextLg} className={`hidden lg:block ${currentIndex == areas?.length - 4 && 'text-gray-500 cursor-not-allowed'}`}>NEXT</button>

            </div>

        </div>
    );
};

export default ExploreAreas;