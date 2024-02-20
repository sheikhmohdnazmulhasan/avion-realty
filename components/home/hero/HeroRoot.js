import React from 'react';
import RightContent from './RightContent';
import LeftForm from './LeftForm';

const HeroRoot = () => {
    return (
        <div className='bg-[url("https://i.ibb.co/BGrLjZm/hero-bg.png")] bg-cover w-full h-[550px]'>
            <div className="bg-black bg-opacity-40 h-full w-full flex items-center justify-center px-20">

                <div className="flex-1"><LeftForm /></div>
                <div className="flex-1"><RightContent /></div>

            </div>
        </div>
    );
};

export default HeroRoot;