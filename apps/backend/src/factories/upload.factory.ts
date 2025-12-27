import { CloudinaryStorageProvider } from "../providers/CloudinaryStorageProvider";
import { UploadService } from "../services/upload.service";
import { IStorageProvider } from "../types/StorageProvider";

export function makeUploadService() {
  const uploadProvider: IStorageProvider = new CloudinaryStorageProvider();
  const uploadService = new UploadService(uploadProvider);
  return uploadService;
}
