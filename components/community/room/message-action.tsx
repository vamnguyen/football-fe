import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Reply, Smile } from "lucide-react";
import { Message } from "@/lib/interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IMessageActionProps {
  message: Message;
  isCurrentUser: boolean;
  onReplyClick: (message: Message) => void;
  onEditClick: (message: Message) => void;
  handleDeleteMessage: (messageId: string) => void;
}

const MessageAction = ({
  message,
  isCurrentUser,
  onReplyClick,
  onEditClick,
  handleDeleteMessage,
}: IMessageActionProps) => {
  return (
    <div
      className={cn(
        "opacity-0 group-hover/message:opacity-100 transition-opacity flex items-center gap-1",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Button variant="ghost" size="icon" className="rounded-full">
        <Smile className="size-2 text-foreground/50" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => onReplyClick(message)}
      >
        <Reply className="size-2 text-foreground/50" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <EllipsisVertical className="size-2 text-foreground/50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-28" align="center">
          {isCurrentUser && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onEditClick(message)}
              >
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleDeleteMessage(message.id)}
              >
                <span>Unsent</span>
              </DropdownMenuItem>
            </>
          )}
          {!isCurrentUser && (
            <DropdownMenuItem className="cursor-pointer">
              <span>Remove</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="cursor-pointer">
            <span>Forward</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <span>Pin</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MessageAction;
