import { useQuery } from "@tanstack/react-query";
import { getAIPrediction } from "@/services/prediction";

export default function useGetAIPrediction(matchId: number) {
  return useQuery({
    queryKey: ["ai-prediction", matchId],
    queryFn: () => getAIPrediction(matchId),
    staleTime: Infinity,
  });
}
