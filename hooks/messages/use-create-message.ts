import { createMessage } from "@/services/message";
import { useMutation } from "@tanstack/react-query";
import { CreateMessageParams } from "@/lib/types";

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: ({
      roomId,
      createMessageParams,
    }: {
      roomId: string;
      createMessageParams: CreateMessageParams;
    }) => createMessage(roomId, createMessageParams),
  });
};
