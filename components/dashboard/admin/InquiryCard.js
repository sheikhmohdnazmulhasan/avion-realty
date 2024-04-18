import React from 'react';

const InquiryCard = ({ inquiry }) => {

    return (
        <div className='flex justify-center items-center py-2 border-b border-[#e4b54958]'>

            <div className="w-[28.33%] flex justify-center">
                <p>{inquiry?.name}</p>
            </div>
            <div className="w-[28.33%] flex justify-center">
                <p>{inquiry?.email}</p>
            </div>
            <div className="w-[28.33%] flex justify-center">
                <p>{inquiry?.mobile}</p>
            </div>
            <div className="w-[15%] flex justify-center">
                <button className='py-1 px-2 bg-red-600 hover:bg-red-700 transition-all hover:scale-105'>Delete</button>
            </div>

        </div>
    );
};

export default InquiryCard;