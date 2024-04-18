import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import { mutate } from 'swr';

const InquiryCard = ({ inquiry }) => {

    function handleDeleteInquiry(_id) {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {


                try {
                    const serverResponse = await axios.delete(`/api/admin/inquiry?id=${_id}`);

                    if (serverResponse.data.success) {

                        Swal.fire({
                            title: "Deleted!",
                            text: "Inquiry has been deleted.",
                            icon: "success"
                        });

                        mutate(`/api/admin/inquiry`);
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

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
                <button className='py-1 px-2 bg-red-600 hover:bg-red-700 transition-all hover:scale-105' onClick={() => handleDeleteInquiry(inquiry._id)}>Delete</button>
            </div>

        </div>
    );
};

export default InquiryCard;