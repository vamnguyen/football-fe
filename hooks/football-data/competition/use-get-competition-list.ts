import { getCompetitionList } from "@/services/football-data";
import { useQuery } from "@tanstack/react-query";

export const useGetCompetitionList = () => {
  return useQuery({
    queryKey: ["competition-list"],
    queryFn: () => getCompetitionList(),
    staleTime: Infinity,
  });
};
