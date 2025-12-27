export async function createFormData(
  uri: string,
  type: string,
  fileName: string
) {
  const formData = new FormData();

  // @ts-ignore
  formData.append("file", {
    uri: uri,
    name: fileName,
    type: type,
  });

  return formData;
}
