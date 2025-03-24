import { useQuery } from "@tanstack/react-query";
import { getUserPrediction } from "@/services/prediction";

export default function useGetUserPrediction(matchId: string) {
  return useQuery({
    queryKey: ["user-prediction", matchId],
    queryFn: () => getUserPrediction(matchId),
    staleTime: Infinity,
  });
}
