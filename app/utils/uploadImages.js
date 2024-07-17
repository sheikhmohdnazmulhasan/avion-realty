// // utils/cloudinary.js

// import cloudinary from 'cloudinary';

// // Configure Cloudinary with your credentials
// cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Function to upload image to Cloudinary
// export const uploadToCloudinary = async (file) => {
//     try {
//         const result = await cloudinary.uploader.upload(file.path);
//         return result;
//     } catch (error) {
//         console.error('Error uploading to Cloudinary:', error);
//         throw new Error('Could not upload image to Cloudinary');
//     }
// };
