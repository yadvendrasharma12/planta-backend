import cloudinary from "../config/cloudinary.js";


export const uploadImage = async (fileBuffer, folder = "ecommerce") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

