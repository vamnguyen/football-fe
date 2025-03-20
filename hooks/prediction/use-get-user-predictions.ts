import { useQuery } from "@tanstack/react-query";
import { getUserPredictions } from "@/services/prediction";

export default function useGetUserPredictions() {
  return useQuery({
    queryKey: ["user-predictions"],
    queryFn: getUserPredictions,
    staleTime: Infinity,
  });
}
