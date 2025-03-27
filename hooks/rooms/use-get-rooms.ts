import { useInfiniteQuery } from "@tanstack/react-query";
import { getRooms } from "@/services/room";

export const useGetRooms = () => {
  return useInfiniteQuery({
    queryKey: ["rooms"],
    queryFn: ({ pageParam = 1 }) => getRooms({ page: pageParam, limit: 10 }),
    staleTime: Infinity,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });
};
