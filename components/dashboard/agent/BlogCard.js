'use client'
import Image from 'next/image';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import edit from '@/public/images/dashboard/listing/edit.svg';
import live from '@/public/images/dashboard/listing/live.svg';
import Swal from 'sweetalert2';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { mutate } from 'swr';
import useUser from '@/hooks/useUser';

const BlogCard = ({ blog }) => {
    const { title, agentName, blogImg, updatedAt, _id } = blog;
    const updatedDate = new Date(updatedAt).toLocaleDateString();
    const user = useUser()

    function handleDeleteBlog(_id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`/api/agent/blog?id=${_id}`).then(res => {

                    if (res.data.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: `${title} has been deleted.`,
                            icon: "success"
                        });

                        mutate(`/api/agent/blog?email=${user?.data?.email}`)
                    }

                }).catch(() => toast.error('Something Wrong!'))
            }
        });
    }

    return (
        <>
            <div className="flex items-center">
                <Toaster />
                <div className="w-[45%] p-5">
                    <div className="flex items-center gap-3">
                        <Image width={96} height={96} src={blogImg} alt="Listing image" className="w-16 h-16 rounded-md" />
                        <div className="">
                            <h3 className="text-[20px] font-bold mb-2">{title?.slice(0, 26)} {title?.length > 26 && '...'}</h3>
                        </div>
                    </div>
                </div>

                <div className="w-[25%] text-center ">
                    <span className="font-semibold">{agentName}</span>
                </div>

                <div className="w-[15%] text-center ">
                    <span className="font-semibold"> {updatedDate} </span>
                </div>

                <div className="w-[15%] text-center gap-3 flex items-center justify-center">
                    <Image src={live} alt="Live svg" className="w-4 cursor-pointer hover:scale-125 transition-all" />
                    <Link href={`manage-blog/edit/${_id}`}>  <Image src={edit} alt="Live svg" className="w-4 cursor-pointer hover:scale-125 transition-all" /></Link>
                    <MdDelete size={20} className="text-red-500 hover:text-red-600 cursor-pointer hover:scale-125 transition-all" onClick={() => handleDeleteBlog(_id)} />
                </div>

            </div>
            <div className="mx-3">
                <hr className="opacity-20" />
            </div>
        </>
    );
};

export default BlogCard;