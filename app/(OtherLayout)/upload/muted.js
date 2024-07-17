// 'use client'
// import { useDropzone } from "react-dropzone";
// import { useCallback, useState } from "react";
// import axios from "axios";
// import UploadImages from "@/app/utils/uploadImages";

// export default function Home() {
//     const [selectedImages, setSelectedImages] = useState([]);
//     const [uploadStatus, setUploadStatus] = useState("");

//     const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
//         acceptedFiles.forEach((file) => {
//             setSelectedImages((prevState) => [...prevState, file]);
//         });
//     }, []);


//     const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop });

//     const onUpload = async () => {
//         setUploadStatus("Uploading....");
//         const formData = new FormData();

//         selectedImages.forEach((image) => {
//             formData.append("file", image);
//         });

//         try {
//             const response = await axios.post("/api/upload/images", { cc: 'da' });
//             console.log(response.data);
//             setUploadStatus("upload successful");

//         } catch (error) {
//             console.log("imageUpload" + error);
//             setUploadStatus("Upload failed..");
//         }
//     };

//     return (
//         <div className=" flex h-screen w-full justify-center items-center flex-col gap-5">

//             <button onClick={UploadImages()}>Upload</button>

//             <div {...getRootProps()}>
//                 <input {...getInputProps()} />
//                 {isDragActive ? (
//                     <p>Drop file(s) here ...</p>
//                 ) : (
//                     <p>Drag and drop file(s) here, or click to select files</p>
//                 )}
//             </div>
//             <div className="max-w-7xl mx-auto grid grid-cols-5 gap-4">
//                 {selectedImages.length > 0 &&
//                     selectedImages.map((image, index) => (
//                         <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
//                     ))}
//             </div>

//             {selectedImages.length > 0 && (
//                 <div>
//                     <button onClick={onUpload}>Upload</button>
//                     <p>{uploadStatus}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
