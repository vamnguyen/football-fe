import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/services/user";
import { toast } from "react-hot-toast";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Cập nhật thông tin thành công");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
