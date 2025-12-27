import { IStorageProvider } from "../types/StorageProvider";

export class UploadService {
  constructor(private readonly CloudinaryStorageProvider: IStorageProvider) {}

  async uploadFile(
    stream: NodeJS.ReadableStream,
    filename: string,
    mimetype: string
  ) {
    console.log(stream);
    console.log(filename);
    console.log(mimetype);

    if (!stream) {
      throw new Error("Você precisa enviar um arquivo.");
    }

    const avatarUrl = await this.CloudinaryStorageProvider.saveFile(
      stream,
      filename,
      mimetype
    );

    return avatarUrl;
  }
}
