export const downloadBlob = (data: Blob, filenameWithoutExt?: string) => {
  const url = window.URL.createObjectURL(data);

  const mimeType = data.type;

  const mimeToExtensionMap: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/tiff": "tiff",
    "image/x-icon": "ico",
    "application/octet-stream": "bin",
    "application/zip": "zip",
    "application/vnd.oasis.opendocument.presentation": "odp",
    "application/vnd.oasis.opendocument.spreadsheet": "ods",
    "application/vnd.oasis.opendocument.text": "odt",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "pptx",
  };

  const extension =
    mimeToExtensionMap[mimeType] || mimeType.split("/")[1] || "bin";

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

// export const downloadBlob = (data: Blob, filenameWithoutExt?: string) => {
//   const url = window.URL.createObjectURL(data);

//   // Extract extension from MIME type
//   const mimeType = data.type; // e.g. image/png
//   const extension = mimeType.split("/")[1] || "bin";

//   const finalFilename = filenameWithoutExt
//     ? `${filenameWithoutExt}.${extension}`
//     : `download.${extension}`;

//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", finalFilename);

//   document.body.appendChild(link);
//   link.click();

//   link.remove();
//   window.URL.revokeObjectURL(url);
// };
