import { useQuery } from "@tanstack/react-query";
import { getRoomMessages } from "@/services/message";

export const useGetRoomMessages = (roomId: string) => {
  return useQuery({
    queryKey: ["room-messages", roomId],
    queryFn: () => getRoomMessages(roomId),
    staleTime: Infinity,
    enabled: !!roomId,
  });
};
