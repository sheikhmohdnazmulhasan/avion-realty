"use client";
import Navbar from "@/components/dashboard/Navbar";
import useAgents from "@/hooks/useAgents";
import useGetAmenities from "@/hooks/useGetAmenities";
import useGetAreas from "@/hooks/useGetAreas";
import useGetDevelopers from "@/hooks/useGetDevelopers";
import useGetProperties from "@/hooks/useGetProperties";
import useUser from "@/hooks/useUser";
import { CiCamera } from "react-icons/ci";
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import Image from "next/image";
import './drag-drop.css';
import { RiEditBoxFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import useViews from "@/hooks/useViews";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const EditList = ({ params }) => {

    const { data = [], isLoading } = useSWR(`/api/offplans?id=${params.id}`, fetcher);

    const properties = useGetProperties();
    const areas = useGetAreas();
    const developers = useGetDevelopers();
    const agents = useAgents();
    const amenities = useGetAmenities();
    const [views] = useViews();
    const user = useUser();
    const [files, setFiles] = useState([]);
    const [previousFile, setPreviousFile] = useState(!isLoading ? data?.images : []);
    const [preview, setPreview] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const router = useRouter()
    const [selectedAmenities, setSelectedAmenities] = useState([]);


    const handleRemovePrevFile = url => {
        const newImages = previousFile.filter(file => file !== url);
        setPreviousFile(newImages);
    }

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const newFiles = Array.from(selectedFiles);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const newFiles = Array.from(droppedFiles);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    // preview files
    useEffect(() => {
        if (files.length) {
            const previewUrl = files.map((file) => URL.createObjectURL(file));
            setPreview(previewUrl);
        }
    }, [files]);

    const handleCheckboxChanged = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setSelectedAmenities(prevAmenities => [...prevAmenities, value]);

            console.log(selectedAmenities);

        } else {
            setSelectedAmenities(selectedAmenities.filter(amenity => amenity !== value));
        }
    }

    // handle submission of off plan form
    const handleEditPlan = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const startingPrice = parseFloat(form.startingPrice.value);
        const propertyType = form.propertyType.value;
        const area = form.area.value;
        const developer = form.developer.value;
        const bedroom = parseInt(form.bedroom.value);
        const areaSqFt = parseFloat(form.areaSqFt.value);
        const completion = form.completion.value;
        const views = form.views.value;
        const agent = form.agent.value || '';
        const description = form.description.value;
        const location = form.location.value;
        const amenities = selectedAmenities;
        const firstInstallment = form.firstInstallment.value;
        const underConstruction = form.underConstruction.value;
        const onHandover = form.onHandover.value;
        const postHandover = form.postHandover.value;
        const payment = { firstInstallment, underConstruction, onHandover, postHandover };

        let images = [...previousFile];

        const toastId = toast.loading('Working...', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff'
            }
        })

        // iteration for host images in imgbb
        for (let i = 0; i < files.length; i++) {
            const image = new FormData();
            image.append("image", files[i]);

            const imgBbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=10a0343a75c20fe85ce07c1d5561bfa1`, image);

            images.push(imgBbResponse.data.data.display_url);
        }

        const dataForBackend = { title, startingPrice, propertyType, area, developer, bedroom, areaSqFt, completion, views, agent, description, location, amenities, images, payment };

        try {
            const serverResponse = await axios.put(`/api/offplans?id=${params.id}`, dataForBackend);

            if (serverResponse.data.success) {

                toast.success(`${title} Updated`, { id: toastId });

                setTimeout(() => {
                    router.push('/dashboard/admin/listings')
                }, 1000)
            }

        } catch (error) {

            console.log(error);
        }

    }

    return (
        <div>
            <Navbar title={`Edit ${data.title}`} />
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            {/* add off plan form */}
            <form onSubmit={handleEditPlan} className="mt-16 space-y-8 mr-8 ">
                <div className="flex justify-between w-full gap-12 ">
                    {/* title */}
                    <div className="w-3/5">
                        <label>Title</label>
                        <br />
                        <input
                            type="text"
                            name="title"
                            defaultValue={data.title}
                            placeholder="write listing title"
                            className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                        />
                    </div>

                    {/* starting price AED */}
                    <div className="w-2/5">
                        <label>Starting Price AED</label>
                        <br />
                        <input
                            type="text"
                            name="startingPrice"
                            defaultValue={data.startingPrice}
                            placeholder="write property price"
                            className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-12 ">
                    {/* property type */}
                    <div>
                        <label>Property Type</label>
                        <br />
                        <select
                            name="propertyType"
                            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
                        >
                            <option value="" disabled>
                                Select Property type
                            </option>
                            <option selected value={data.propertyType}>{data.propertyType}</option>
                            {properties.map((property) => (
                                <option key={property._id} value={property.propertyName}>
                                    {property.propertyName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* area */}
                    <div>
                        <label>Area</label>
                        <br />
                        <select
                            name="area"
                            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
                        >
                            <option value="" disabled >
                                Select Property location
                            </option>
                            <option selected value={data.area}>{data.area}</option>
                            {areas.map((area) => (
                                <option key={area._id} value={area.itemName}>
                                    {area.itemName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* developer */}
                    <div>
                        <label>Developer</label>
                        <br />
                        <select
                            name="developer"
                            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
                        >
                            <option value="" disabled selected>
                                Developer name
                            </option>
                            <option value={data.developer}>{data.developer}</option>
                            {developers.map((developer) => (
                                <option key={developer._id} value={developer.devName}>
                                    {developer.devName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* bedroom */}
                    <div>
                        <label>Bedrooms</label>
                        <br />
                        <div className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted flex justify-between">
                            <span>BR</span>
                            <input
                                type="number"
                                min="1"
                                max="7"
                                defaultValue={data.bedroom}
                                name="bedroom"
                                className="bg-transparent outline-none w-12"

                            />
                        </div>
                    </div>

                    {/* Starting Area Sq.ft. */}
                    <div>
                        <label>Starting Area Sq.ft.</label>
                        <br />
                        <input
                            type="number"
                            name="areaSqFt"
                            placeholder="write property area (sq.ft.)"
                            defaultValue={data.areaSqFt}
                            className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                        />
                    </div>

                    {/* Estimated Completion */}
                    <div>
                        <label>Estimated Completion</label>
                        <br />
                        <input
                            type="text"
                            name="completion"
                            placeholder="write completion"
                            defaultValue={data.completion}
                            className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                        />
                    </div>

                    {/* Views */}
                    <div>
                        <label>Views</label>
                        <br />
                        <select
                            name="views"
                            className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
                        >
                            <option value="" disabled selected>
                                Eg. (Sea View)
                            </option>
                            <option selected value={data.views}>{data.views}</option>
                            {views.map((view) => (
                                <option key={view._id} value={view.name}>
                                    {view.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* only for admin role to select agent*/}
                    {user?.data?.role === "admin" && (
                        <div>
                            <label>Select Agent</label>
                            <br />
                            <select
                                name="agent"
                                placeholder="Select agent"
                                className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                            >
                                <option value="" disabled>
                                    Select agent
                                </option>
                                <option selected value={data.agent}>{data.agent}</option>
                                {agents.map((agent) => (
                                    <option key={agent._id} value={agent.name}>
                                        {agent.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                {/* description */}
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="write description"
                        rows={12}
                        defaultValue={data.description}
                        className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                    />
                </div>
                {/* location input field */}
                <div>
                    <label>Location</label>
                    <br />
                    <input
                        type="text"
                        name="location"
                        placeholder="write location (eg. Address downtown, Burj Khalifa)"
                        defaultValue={data.location}
                        className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                    />
                </div>

                {/* amenities */}
                <div>
                    <label>Amenities</label>
                    <br />
                    <div className="grid grid-cols-3 gap-6 mt-3">
                        {
                            showAll ?
                                (amenities.slice(0, 12).map(amenity => (
                                    <div key={amenity._id} amenity={amenity} className="flex items-center gap-4">
                                        <input onChange={handleCheckboxChanged} type="checkbox" value={amenity?.name} name="amenity" className="toggle bg-[#FFD673] border-4 border-[#CB9107]" checked={data?.amenities?.find(item => item === amenity.name)} />
                                        <label>{amenity.name}</label>
                                    </div>
                                )
                                ))
                                :
                                (amenities.map(amenity => (
                                    <div key={amenity._id} amenity={amenity} className="flex items-center gap-4">
                                        <input onChange={handleCheckboxChanged} type="checkbox" value={amenity.name} name="amenity" className="toggle bg-[#FFD673] border-4 border-[#CB9107]" />
                                        <label>{amenity.name}</label>
                                    </div>
                                )
                                ))
                        }
                    </div>
                    {
                        amenities.length > 12 && (showAll ? <button onClick={() => setShowAll(!showAll)} type="button" className="text-[#E4B649] my-2">Show All</button> : <button onClick={() => setShowAll(!showAll)} type="button" className="text-[#E4B649] my-2">Show Less</button>)

                    }
                </div>

                {/* payment */}

                {/* payment */}
                <div>
                    <label>Payment Plan</label>
                    <br />

                    <div className="grid grid-cols-2 mt-4 gap-6">
                        <div>
                            <label>First Installment</label>
                            <input defaultValue={data?.payment?.firstInstallment} type="number" placeholder="Place your payment in %" name="firstInstallment"
                                className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                            />
                        </div>
                        <div>
                            <label>Under Construction</label>
                            <input defaultValue={data?.payment?.underConstruction} type="number" placeholder="Place your payment in %" name="underConstruction"
                                className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                            />
                        </div>
                        <div>
                            <label>On Handover</label>
                            <input defaultValue={data?.payment?.onHandover} type="number" placeholder="Place your payment in %" name="onHandover"
                                className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                            />
                        </div>
                        <div>
                            <label>Post Handover</label>
                            <input defaultValue={data?.payment?.postHandover} type="number" placeholder="Place your payment in %" name="postHandover"
                                className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
                            />
                        </div>

                    </div>
                </div>

                {/* add picture */}
                <div className="drag-drop w-full h-auto bg-transparent" >
                    <div
                        className={`document-uploader ${files.length > 0 ? "upload-box active" : "upload-box"
                            }`}
                        onDrop={handleDrop}
                        onDragOver={(event) => event.preventDefault()}
                    >
                        <>
                            <div className="upload-info">
                                <div className="text-xl font-bold flex items-center  justify-center">
                                    <h2 className="mt-2">Add Pictures </h2>
                                    <CiCamera size={32} />
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>Drag or drop your pictures here</span>
                                <label htmlFor="browse" className="browse-btn text-[#FFD167]">
                                    {`"Browse"`}
                                </label>
                                <input
                                    type="file"
                                    hidden
                                    id="browse"
                                    onChange={handleFileChange}
                                    multiple
                                />
                            </div>

                        </>

                        {/* preview of selected images */}
                        {previousFile?.length > 0 && (
                            <div className="grid grid-cols-5 gap-8 my-4">
                                {
                                    previousFile.map((url, ind) => (<div key={ind} url={url} className="relative">
                                        <Image src={url} alt={url} width={200} height={120} className="w-[200px] h-[120px] object-cover" />
                                        <div className="bg-white text-[#835C00] absolute p-1 border border-[#835C00] rounded-full -top-2 -right-3">
                                            <MdClear onClick={() => handleRemovePrevFile(url)} size={20} color="#835C00" />
                                        </div>
                                    </div>))
                                }
                            </div>
                        )}

                        {files.length > 0 && (
                            <div className="grid grid-cols-5 gap-8 my-4">
                                {
                                    preview.map((url, ind) => (<div key={ind} url={url} className="relative">
                                        <Image src={url} alt={url} width={200} height={120} className="w-[200px] h-[120px] object-cover" />
                                        <div className="bg-white text-[#835C00] absolute p-1 border border-[#835C00] rounded-full -top-2 -right-3">
                                            <MdClear onClick={() => handleRemoveFile(ind)} size={20} color="#835C00" />
                                        </div>
                                    </div>))
                                }
                            </div>
                        )}
                    </div>
                </div>


                <div className="flex justify-end mt-6">
                    <input
                        type="submit"
                        value="Save Changes"
                        className="bg-[#835C00] hover:cursor-pointer px-8 py-2 rounded-md"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditList;
