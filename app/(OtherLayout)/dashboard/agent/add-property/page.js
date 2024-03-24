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
import { LuClipboardCheck } from "react-icons/lu";
import Image from "next/image";
import "./drag-drop.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import publish from "@/public/images/dashboard/listing/publish.svg";

const AddProperty = () => {
  // document.title = 'Avion Realty | Dashboard | Add-Off-Plan';
  const properties = useGetProperties();
  const areas = useGetAreas();
  const developers = useGetDevelopers();
  const agents = useAgents();
  const amenities = useGetAmenities();
  const user = useUser();
  const [files, setFiles] = useState([]);
  const [agent, setAgent] = useState(user?.data?.email);
  const [preview, setPreview] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [clickedButton, setClickedButton] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  

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
      setSelectedAmenities((prevAmenities) => [...prevAmenities, value]);
    } else {
      setSelectedAmenities(
        selectedAmenities.filter((amenity) => amenity !== value)
      );
    }
  };

  // handle submission of off plan form
  const handleSubmitPlan = async (event, clickedButton) => {
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

    if (user?.data?.role !== "agent") {
      setAgent(form.agent.value);
    }

    const description = form.description.value;
    const location = form.location.value;
    const amenities = selectedAmenities;
    let images = [];

    const toastId = toast.loading("Working...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    // iteration for host images in imgbb
    for (let i = 0; i < files.length; i++) {
      const image = new FormData();
      image.append("image", files[i]);

      const imgBbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=10a0343a75c20fe85ce07c1d5561bfa1`,
        image
      );

      images.push(imgBbResponse.data.data.display_url);
    }

    // upload file
    // const floorPlan = new FormData();
    // floorPlan.append("file", file);
    // console.log(file);

    // const result = await axios.post(
    //   "http://localhost:3000/upload-files",
    //   floorPlan,
    //   {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }
    // );
    // console.log(result);
    // if (result.data.status == "ok") {
    //   alert("Uploaded Successfully!!!");
    // }
  
  

    const dataForBackend = {
      leads: 0,
      status: "Off-Plan",
      title,
      startingPrice,
      propertyType,
      area,
      developer,
      bedroom,
      areaSqFt,
      completion,
      views,
      agent,
      description,
      location,
      amenities,
      images,
      // floorPlan
    };

    if (clickedButton === "button1") {
      try {
        const serverResponse = await axios.post(
          "http://localhost:3000/api/offplans",
          dataForBackend
        );

        if (serverResponse.data.success) {
          toast.success(`${title} added`, { id: toastId });
          form.reset();
          setFiles([]);
          setPreview([]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const serverResponse = await axios.post(
          "http://localhost:3000/api/inventory",
          dataForBackend
        );

        if (serverResponse.data.success) {
          toast.success(`${title} is saved in Inventory`, { id: toastId });
          form.reset();
          setFiles([]);
          setPreview([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Navbar title="Add Property" />
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* add off plan form */}
      <form
        onSubmit={(event) => {
          if (clickedButton) {
            handleSubmitPlan(event, clickedButton);
          }
        }}
        className="mt-16 space-y-8 mr-8 "
      >
        <div className="flex justify-between w-full gap-12 ">
          {/* title */}
          <div className="w-3/5">
            <label>Title</label>
            <br />
            <input
              type="text"
              name="title"
              placeholder="write listing title"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
          </div>

          {/* property price AED */}
          <div className="w-2/5">
            <label>Property Price AED</label>
            <br />
            <input
              type="number"
              name="propertyPrice"
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
              <option value="" disabled selected>
                Select Property type
              </option>
              {properties.map((property) => (
                <option key={property._id} value={property.propertyName}>
                  {property.propertyName}
                </option>
              ))}
            </select>
          </div>

          {/* property status */}
          <div>
            <label>Property Status</label>
            <br />
            <select
              name="propertyStatus"
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
            >
              <option value="" disabled selected>
               Ready/Rental
              </option>
              <option value="Ready">Ready</option>
              <option value="Rental">Rental</option>
            </select>
          </div>

          {/* Views */}
          <div>
            <label>Views</label>
            <br />
            <input
              type="text"
              name="views"
              placeholder="Eg. (Sea View)"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
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
                defaultValue="1"
                name="bedroom"
                className="bg-transparent outline-none w-12"
              />
            </div>
          </div>
          {/* Bathroom */}
          <div>
            <label>Bathrooms</label>
            <br />
            <div className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted flex justify-between">
              <span>BR</span>
              <input
                type="number"
                min="1"
                max="7"
                defaultValue="1"
                name="bathroom"
                className="bg-transparent outline-none w-12"
              />
            </div>
          </div>

          {/* Area Sq.ft. */}
          <div>
            <label>Area Sq.ft.</label>
            <br />
            <input
              type="number"
              name="areaSqFt"
              placeholder="write property area (sq.ft.)"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
          </div>

          {/* area */}
          <div>
            <label>Area</label>
            <br />
            <select
              name="area"
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
            >
              <option value="" disabled selected>
                Select Property location
              </option>
              {areas.map((area) => (
                <option key={area._id} value={area.itemName}>
                  {area.itemName}
                </option>
              ))}
            </select>
          </div>

           {/* Furnishing */}
           <div>
            <label>Furnishing</label>
            <br />
            <select
              name="furnishing"
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
            >
              <option value="" disabled selected>
               Select
              </option>
              <option value="Furnished">Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          {/* Completion */}
          <div>
            <label> Completion Status</label>
            <br />
            <input
              type="text"
              name="completion"
              placeholder="write completion status (optional)"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
          </div>
          
        </div>
        {/* description */}
        <div>
          <label>Description</label>
          <textarea
            name="description"
            placeholder="write description"
            rows={12}
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
            className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
          />
        </div>

        {/* amenities */}
        <div>
          <label>Amenities</label>
          <br />
          <div className="grid grid-cols-3 gap-6 mt-3">
            {showAll
              ? amenities.slice(0, 12).map((amenity) => (
                  <div
                    key={amenity._id}
                    amenity={amenity}
                    className="flex items-center gap-4"
                  >
                    <input
                      onChange={handleCheckboxChanged}
                      type="checkbox"
                      value={amenity.name}
                      name="amenity"
                      className="toggle bg-[#FFD673] border-4 border-[#CB9107]"
                    />
                    <label>{amenity.name}</label>
                  </div>
                ))
              : amenities.map((amenity) => (
                  <div
                    key={amenity._id}
                    amenity={amenity}
                    className="flex items-center gap-4"
                  >
                    <input
                      onChange={handleCheckboxChanged}
                      type="checkbox"
                      value={amenity.name}
                      name="amenity"
                      className="toggle bg-[#FFD673] border-4 border-[#CB9107]"
                    />
                    <label>{amenity.name}</label>
                  </div>
                ))}
          </div>
          {amenities.length > 12 &&
            (showAll ? (
              <button
                onClick={() => setShowAll(!showAll)}
                type="button"
                className="text-[#E4B649] my-2"
              >
                Show All
              </button>
            ) : (
              <button
                onClick={() => setShowAll(!showAll)}
                type="button"
                className="text-[#E4B649] my-2"
              >
                Show Less
              </button>
            ))}
        </div>

        {/* add picture */}
        <div className="drag-drop w-full h-auto bg-transparent">
          <div
            className={`document-uploader ${
              files.length > 0 ? "upload-box active" : "upload-box"
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

            {files.length > 0 && (
              <div className="grid grid-cols-5 gap-8 my-4">
                {preview.map((url, ind) => (
                  <div key={ind} url={url} className="relative">
                    <Image
                      src={url}
                      alt={url}
                      width={200}
                      height={120}
                      className="w-[200px] h-[120px] object-cover"
                    />
                    <div className="bg-white text-[#835C00] absolute p-1 border border-[#835C00] rounded-full -top-2 -right-3">
                      <MdClear
                        onClick={() => handleRemoveFile(ind)}
                        size={20}
                        color="#835C00"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* upload pdf */}
        {/* <div>
          <label>Upload Floorplan</label>
          <br />
          <input
            type="file"
            name="floorPlan"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
          />
        </div> */}

        <div className="flex justify-between my-8 font-semibold">
          <button
            onClick={() => setClickedButton("button2")}
            type="submit"
            className="bg-white text-black ml-2 hover:cursor-pointer px-24 py-2 rounded-md flex gap-2 items-center"
          >
            <span>Add to Inventory</span>
            <LuClipboardCheck />
          </button>
          <button
            onClick={() => setClickedButton("button1")}
            type="submit"
            className="bg-[#835C00] ml-2 hover:cursor-pointer px-24 py-2 rounded-md flex gap-2 items-center"
          >
            <span>Publish Listing</span>
            <Image src={publish} alt="publish" height={16} width={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
