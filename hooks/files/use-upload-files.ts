import { uploadMultipleFiles } from "@/services/file";
import { useMutation } from "@tanstack/react-query";

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: uploadMultipleFiles,
  });
};
