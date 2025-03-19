import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/auth";

export default function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: Infinity,
  });
}
