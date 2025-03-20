import { useQuery } from "@tanstack/react-query";
import { getUpcomingMatches } from "@/services/prediction";
import { getUpcomingMatchesParams } from "@/lib/types";

export default function useGetUpcomingMatches(
  params: getUpcomingMatchesParams
) {
  return useQuery({
    queryKey: ["upcoming-matches", params],
    queryFn: () => getUpcomingMatches(params),
    staleTime: Infinity,
    refetchInterval: 1000 * 60 * 60 * 24,
  });
}
