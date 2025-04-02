import { Message } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { FileText, Reply } from "lucide-react";
import Image from "next/image";

interface MessageReplyPreviewProps {
  message: Message;
  parentMessage: Message;
  isCurrentUser: boolean;
}

export const MessageReplyPreview = ({
  message,
  parentMessage,
  isCurrentUser,
}: MessageReplyPreviewProps) => {
  return (
    <div
      className={cn(
        "flex flex-col relative",
        isCurrentUser ? "items-end" : "items-start"
      )}
    >
      <span className="flex items-center gap-1 text-foreground/50">
        <Reply size={12} />
        {message.author.id === message.parentMessage.author?.id ? (
          <span className="text-xs">
            {message.author.firstName + " " + message.author.lastName} replied
            to themself
          </span>
        ) : (
          <span className="text-xs">
            {message.author.firstName + " " + message.author.lastName} replied
            to{" "}
            {parentMessage.author?.firstName +
              " " +
              parentMessage.author?.lastName}
          </span>
        )}
      </span>
      {parentMessage.content ? (
        <div
          className={cn(
            "max-w-[350px] opacity-50 bg-muted text-muted-foreground px-4 pb-3 pt-2 w-fit rounded-t-2xl truncate -mb-3",
            isCurrentUser ? "rounded-bl-2xl" : "rounded-br-2xl"
          )}
        >
          {parentMessage.content}
        </div>
      ) : (
        <div
          className={cn(
            "max-w-[350px] opacity-50 bg-muted w-fit rounded-t-2xl px-4 pb-3 pt-2 -mb-3",
            isCurrentUser ? "rounded-bl-2xl" : "rounded-br-2xl"
          )}
        >
          {parentMessage.attachments?.length > 0 && (
            <div>
              {parentMessage.attachments[0].mimetype.includes("image") && (
                <Image
                  src={parentMessage.attachments[0].url}
                  height={150}
                  width={150}
                  alt={parentMessage.attachments[0].key || "Attachment"}
                  className="rounded-xl opacity-50"
                />
              )}
              {parentMessage.attachments[0].mimetype.includes("video") && (
                <video
                  src={parentMessage.attachments[0].url}
                  controls
                  className="rounded-xl h-[100px] w-[150px] object-cover opacity-50"
                />
              )}
              {parentMessage.attachments[0].mimetype.includes(
                "application"
              ) && (
                <div className="bg-accent flex items-center gap-3 p-2 opacity-50">
                  <span className="text-sm">Attachment</span>
                  <FileText size={14} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
