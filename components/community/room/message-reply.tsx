import { Button } from "@/components/ui/button";
import { Message, User } from "@/lib/interface";
import { X } from "lucide-react";

interface MessageReplyProps {
  replyingMessage: Message;
  setReplyingState: (state: {
    isReplying: boolean;
    message: Message | null;
  }) => void;
  user: User | undefined;
}

export const MessageReply = ({
  replyingMessage,
  setReplyingState,
  user,
}: MessageReplyProps) => {
  const getReplyPreview = (replyingMessage: Message) => {
    if (replyingMessage.content) {
      return replyingMessage.content.length > 60
        ? replyingMessage.content.slice(0, 60) + "..."
        : replyingMessage.content;
    } else if (replyingMessage.attachments.length > 0) {
      const mimeType = replyingMessage.attachments[0].mimetype;
      if (mimeType.startsWith("image")) {
        return "Image";
      } else if (mimeType.startsWith("video")) {
        return "Video";
      } else if (mimeType.startsWith("audio")) {
        return "Audio";
      } else {
        return "File";
      }
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start flex-col">
        <p className="text-base">
          Replying to{" "}
          {replyingMessage.author.id === user?.id
            ? "yourself"
            : `${replyingMessage.author.firstName} ${replyingMessage.author.lastName}`}
        </p>
        <p className="text-sm text-foreground/70">
          {getReplyPreview(replyingMessage)}
        </p>
      </div>
      <Button
        variant="ghost"
        className="rounded-full"
        size="icon"
        onClick={() => setReplyingState({ isReplying: false, message: null })}
      >
        <X />
      </Button>
    </div>
  );
};
