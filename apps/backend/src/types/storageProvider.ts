interface StorageProvider {
  saveFile(
    fileStream: NodeJS.ReadableStream,
    filename: string,
    mimetype: string
  ): Promise<string>;
  deleteFile(url: string): Promise<void>;
}

export type { StorageProvider };
