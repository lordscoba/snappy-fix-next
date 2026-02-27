export const downloadBlob = (data: Blob, filenameWithoutExt?: string) => {
  const url = window.URL.createObjectURL(data);

  // Extract extension from MIME type
  const mimeType = data.type; // e.g. image/png
  const extension = mimeType.split("/")[1] || "bin";

  const finalFilename = filenameWithoutExt
    ? `${filenameWithoutExt}.${extension}`
    : `download.${extension}`;

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", finalFilename);

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};
