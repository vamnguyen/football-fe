import { useQuery } from "@tanstack/react-query";
import { getLeagues } from "@/services/league";
import { SPORTS } from "@/lib/enum";

export default function useGetLeagues(sport: SPORTS) {
  return useQuery({
    queryKey: ["leagues", sport],
    queryFn: () => getLeagues(sport),
    staleTime: Infinity,
  });
}
