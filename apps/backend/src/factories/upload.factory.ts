import { CloudinaryStorageProvider } from "../providers/CloudinaryStorageProvider";
import { UploadService } from "../services/upload.service";
import { StorageProvider } from "../types/storageProvider";

export function makeUploadService() {
  const uploadProvider: StorageProvider = new CloudinaryStorageProvider();
  const uploadService = new UploadService(uploadProvider);
  return uploadService;
}
