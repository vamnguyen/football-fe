import { format } from "date-fns";
import { Message } from "@/lib/interface";

interface MessageEditedLabelProps {
  message: Message;
}

export const MessageEditedLabel = ({ message }: MessageEditedLabelProps) => {
  if (!message.isEdited) return null;

  return (
    <span className="text-xs text-foreground/50">
      Đã sửa {format(new Date(message.updatedAt), "HH:mm")}
    </span>
  );
};
