import { editMessage } from "@/services/message";
import { useMutation } from "@tanstack/react-query";

export const useEditMessage = () => {
  return useMutation({
    mutationFn: ({
      roomId,
      messageId,
      content,
    }: {
      roomId: string;
      messageId: string;
      content: string;
    }) => editMessage(roomId, messageId, content),
  });
};
