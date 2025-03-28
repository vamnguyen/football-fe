import axiosInstance from "@/lib/axiosInstance";
import { FILE_TYPE } from "@/lib/enum";

export type UploadFileBody = {
  files: File[];
  type: FILE_TYPE;
};

export type FileResponse = {
  id: string;
  key: string;
  url: string;
  mimetype: string;
}[];

export const uploadMultipleFiles = async (
  body: UploadFileBody
): Promise<FileResponse> => {
  const formData = new FormData();
  body.files.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("type", body.type);

  const response = await axiosInstance.post("/files/multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
