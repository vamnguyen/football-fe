import { deleteMessage } from "@/services/message";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: ({
      roomId,
      messageId,
    }: {
      roomId: string;
      messageId: string;
    }) => deleteMessage(roomId, messageId),
  });
};
