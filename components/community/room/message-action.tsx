import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Reply } from "lucide-react";
import { Message } from "@/lib/interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMessage } from "@/hooks/messages";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface IMessageActionProps {
  message: Message;
  isCurrentUser: boolean;
  handleClickEditMessage: (message: Message) => void;
  handleClickReplyMessage: (message: Message) => void;
}

const MessageAction = ({
  message,
  isCurrentUser,
  handleClickEditMessage,
  handleClickReplyMessage,
}: IMessageActionProps) => {
  const { roomId } = useParams();
  const { mutate: deleteMessage } = useDeleteMessage();

  const handleDeleteMessage = (messageId: string) => {
    if (!roomId) {
      toast.error("Không thể xóa tin nhắn: Thiếu thông tin phòng chat");
      return;
    }

    deleteMessage(
      {
        messageId,
        roomId: roomId as string,
      },
      {
        onError: (error) => {
          toast.error(`Có lỗi xảy ra khi xóa tin nhắn: ${error.message}`);
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "opacity-0 group-hover/message:opacity-100 transition-opacity flex items-center gap-1",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => handleClickReplyMessage(message)}
      >
        <Reply className="size-2 text-foreground/50" />
      </Button>
      {isCurrentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <EllipsisVertical className="size-2 text-foreground/50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleClickEditMessage(message)}
            >
              <span>Sửa</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleDeleteMessage(message.id)}
            >
              <span>Xóa</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default MessageAction;
