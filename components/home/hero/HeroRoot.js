import React from 'react';
import RightContent from './RightContent';

const HeroRoot = () => {
    return (
        <div className='bg-[url("https://i.ibb.co/BGrLjZm/hero-bg.png")] bg-cover w-full h-[550px]'>
            <div className="bg-black bg-opacity-40 h-full w-full flex items-center">
                <div className="flex-1"></div>
                <div className="flex-1"><RightContent /></div>
            </div>
        </div>
    );
};

export default HeroRoot;