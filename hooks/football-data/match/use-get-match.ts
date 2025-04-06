import { getMatch } from "@/services/football-data";
import { useQuery } from "@tanstack/react-query";

export const useGetMatch = (id: number) => {
  return useQuery({
    queryKey: ["match", id],
    queryFn: () => getMatch(id),
    staleTime: Infinity,
  });
};
