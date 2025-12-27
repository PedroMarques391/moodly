import { v2 as cloudinary } from "cloudinary";
import { IStorageProvider } from "../types/StorageProvider";
import { IUploadResult } from "../types/uploadResult";

export class CloudinaryStorageProvider implements IStorageProvider {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }

  async saveFile(
    fileStream: NodeJS.ReadableStream,
    filename: string,
    mimetype: string
  ): Promise<string> {
    const uploadResult: IUploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "@moodly_api/avatars",
          use_filename: true,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          return resolve(result);
        }
      );
      fileStream.pipe(uploadStream);
    });

    return uploadResult.secure_url;
  }

  async deleteFile(url: string): Promise<void> {
    // TODO
  }
}
