import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dxajy8moa",
  api_key: "927347685678659",
  api_secret: "W1EPwDkwHvrazBZjR0O-QY_XWVo",
});

const storage = new multer.memoryStorage();

async function handleImageFunction(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });

export { upload, handleImageFunction };
