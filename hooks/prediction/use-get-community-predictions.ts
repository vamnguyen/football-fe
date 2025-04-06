import { getCommunityPredictions } from "@/services/prediction";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";

export default function useGetCommunityPredictions(
  matchId: number,
  paginationParams: PaginationParams
) {
  return useQuery({
    queryKey: ["community-predictions", matchId, paginationParams],
    queryFn: () => getCommunityPredictions(matchId, paginationParams),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
