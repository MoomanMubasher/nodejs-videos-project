import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';    

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadToCloudinary = async (filePath) => {
    try {
         if(!filePath) return null
         const response = await cloudinary.uploader.upload(filePath,{ resource_type: "auto" });
         console.log("File Successfully Uploaded");
         console.log(response.url,'FILE URL');
         return response;
    } catch (error) {
        fs.unlinkSync(filePath)
        return null;
    }
   
}

export {uploadToCloudinary}