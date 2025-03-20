import { useQuery } from "@tanstack/react-query";
import { getUserPredictions } from "@/services/prediction";
import { getUserPredictionsParams } from "@/lib/types";

export default function useGetUserPredictions(
  params: getUserPredictionsParams
) {
  return useQuery({
    queryKey: ["user-predictions", params],
    queryFn: () => getUserPredictions(params),
    staleTime: Infinity,
  });
}
