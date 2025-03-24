import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserPrediction } from "@/services/prediction";
import { UserCreatePredictionBody } from "@/lib/types";
import { toast } from "sonner";

export default function useCreateUserPrediction(matchId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UserCreatePredictionBody) =>
      createUserPrediction(matchId, body),
    onSuccess: () => {
      toast.success("Dự đoán đã được tạo thành công");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi tạo dự đoán");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-prediction", matchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["community-predictions", matchId],
      });
    },
  });
}
