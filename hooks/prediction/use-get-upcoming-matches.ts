import { useQuery } from "@tanstack/react-query";
import { getUpcomingMatches } from "@/services/prediction";

export default function useGetUpcomingMatches() {
  return useQuery({
    queryKey: ["upcoming-matches"],
    queryFn: getUpcomingMatches,
    staleTime: Infinity,
    refetchInterval: 1000 * 60 * 60 * 24,
  });
}
