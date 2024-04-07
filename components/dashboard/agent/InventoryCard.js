import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import bed from '@/public/images/dashboard/listing/bed.svg';
import bathroomSvg from '@/public/images/dashboard/listing/bathroom.svg';
import sqft from '@/public/images/dashboard/listing/sqft.svg';
import locationSvg from '@/public/images/dashboard/listing/location.svg';
import live from '@/public/images/dashboard/listing/live.svg';
import edit from '@/public/images/dashboard/listing/edit.svg';
import Swal from "sweetalert2";
import axios from "axios";
import { mutate } from "swr";

const InventoryCard = ({ list }) => {
    const { title, bedroom, bathroom, areaSqFt, location, images, status, startingPrice, updatedAt, agent } = list;

    const updatedDate = new Date(updatedAt).toLocaleDateString();

    async function handleDeleteList(_id) {

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

                axios.delete(`hhttps://avion-realty.vercel.app/api/inventory?id=${_id}`).then(res => {

                    if (res.data.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: `${title} has been deleted.`,
                            icon: "success"
                        });

                        mutate(`hhttps://avion-realty.vercel.app/api/inventory?agent=${agent}`);
                    }

                }).catch(err => console.log(err))

            }
        });
    };

    return (
        <div>
            <div>
                <div className="">
                    <div className="flex items-center">
                        <div className="w-[40%] p-5">
                            <div className="flex items-center gap-3">
                                <Image width={96} height={96} src={images[0]} alt="Listing image" className="w-16 h-16 rounded-md" />
                                <div className="">
                                    <h3 className="text-[20px] font-bold mb-2">{title}</h3>
                                    <div className="flex gap-5">

                                        {/* bed */}
                                        <div className="flex items-center gap-2">
                                            <Image src={bed} alt="Bedroom svg" />
                                            <span>{bedroom}</span>
                                        </div>

                                        {/* bathroom */}
                                        <div className="flex items-center gap-2">
                                            <Image src={bathroomSvg} alt="bathroom svg" />
                                            <span>{bathroom}</span>
                                        </div>

                                        {/* sqft */}
                                        <div className="flex items-center gap-2">
                                            <Image src={sqft} alt="scale svg" />
                                            <span>{areaSqFt} sq. ft.</span>
                                        </div>
                                    </div>

                                    {/* location */}
                                    <div className="flex items-center gap-2">
                                        <Image src={locationSvg} alt="Apartment Location svg" />
                                        <span className="mt-2">{location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* price */}
                        <div className="w-[15%] text-center ">
                            <span className="font-semibold">AED {startingPrice} </span>
                        </div>

                        {/* Status */}
                        <div className="w-[15%] text-center ">
                            <span className="font-semibold"> {status} </span>
                        </div>

                        {/* updated on */}
                        <div className="w-[15%] text-center ">
                            <span className="font-semibold"> {updatedDate} </span>
                        </div>

                        {/* action */}
                        <div className="w-[15%] text-center gap-3 flex items-center justify-center">
                            <Image src={live} alt="Live svg" className="w-4 cursor-pointer hover:scale-125 transition-all" />
                            <Link href={`private-inventory/edit/${list._id}`}>  <Image src={edit} alt="Live svg" className="w-4 cursor-pointer hover:scale-125 transition-all" /></Link>
                            <MdDelete size={20} className="text-red-500 hover:text-red-600 cursor-pointer hover:scale-125 transition-all" onClick={() => handleDeleteList(list._id)} />
                        </div>
                    </div>
                    <div className="mx-3">
                        <hr className="opacity-20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryCard;