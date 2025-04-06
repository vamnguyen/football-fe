import { useQuery } from "@tanstack/react-query";
import { getUserPrediction } from "@/services/prediction";

export default function useGetUserPrediction(matchId: number) {
  return useQuery({
    queryKey: ["user-prediction", matchId],
    queryFn: () => getUserPrediction(matchId),
    staleTime: Infinity,
  });
}
