import { getRoomById } from "@/services/room";
import { useQuery } from "@tanstack/react-query";

export const useGetRoomById = (roomId: string) => {
  return useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoomById(roomId),
    staleTime: Infinity,
    enabled: !!roomId,
  });
};
