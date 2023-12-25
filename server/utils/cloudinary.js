import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //uploading file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: 'auto'
            })
        // function (error, result) { console.log(result); });
        //file has been uploaded successfully
        console.log("file has been uploaded successfully", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove locally saved temporary file as the upload operations got failed
        console.log("Error while storing file on cloudinary", error);
        return null;
    }
}

