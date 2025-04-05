import { getCompetitionMatches } from "@/services/football-data";
import { useQuery } from "@tanstack/react-query";

export const useGetCompetitionMatches = (data: {
  code: string;
  dateFrom?: string;
  dateTo?: string;
  stage?: string;
  status?: string;
  matchday?: string;
  group?: string;
  season?: string;
}) => {
  return useQuery({
    queryKey: ["competition-matches", data],
    queryFn: () => getCompetitionMatches(data),
    staleTime: Infinity,
  });
};
