import { useQuery } from "@tanstack/react-query";
import { getMatchById } from "@/services/match";

export default function useGetMatch(id: string) {
  return useQuery({
    queryKey: ["match", id],
    queryFn: () => getMatchById(id),
    staleTime: Infinity,
  });
}
