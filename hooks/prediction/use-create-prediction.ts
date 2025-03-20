import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPrediction } from "@/services/prediction";
import { toast } from "react-hot-toast";

export default function useCreatePrediction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      matchId,
      additionalContext,
    }: {
      matchId: string;
      additionalContext: string;
    }) => createPrediction(matchId, additionalContext),
    onSuccess: () => {
      toast.success("Prediction created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-predictions"] });
    },
  });
}
