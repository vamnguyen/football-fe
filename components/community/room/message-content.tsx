import { Message } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FileText } from "lucide-react";
import Hint from "@/components/shared/hint";
import MessageAction from "./message-action";
import Thumbnail from "./thumbnail";
import { MessageEditedLabel } from "./message-edited-label";
import Link from "next/link";

interface MessageContentProps {
  message: Message;
  isCurrentUser: boolean;
  handleClickEditMessage: (message: Message) => void;
  handleClickReplyMessage: (message: Message) => void;
}

export const MessageContent = ({
  message,
  isCurrentUser,
  handleClickEditMessage,
  handleClickReplyMessage,
}: MessageContentProps) => {
  const gridCols =
    message.attachments?.length === 1
      ? "grid-cols-1"
      : message.attachments?.length === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <div
      className={cn(
        "flex items-center gap-2 group/message",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Hint
        side="left"
        label={format(new Date(message.createdAt), "hh:mm")}
        duration={500}
      >
        <div className="flex flex-col gap-1">
          {message.content && (
            <div className="flex flex-col gap-1">
              <p className="max-w-[550px] w-fit break-words bg-secondary dark:bg-secondary/80 px-3.5 py-2 rounded-2xl">
                {message.content}
              </p>
              <MessageEditedLabel message={message} />
            </div>
          )}
          {message.attachments?.length > 0 && (
            <div
              className={`grid ${gridCols} gap-1 rounded-2xl overflow-hidden max-w-[400px]`}
            >
              {message.attachments.map((attachment) => {
                if (attachment.mimetype.includes("video")) {
                  return (
                    <video
                      key={attachment.id}
                      src={attachment.url}
                      controls
                      className="rounded-xl overflow-hidden border object-cover"
                    />
                  );
                }
                if (attachment.mimetype.includes("application")) {
                  return (
                    <div
                      key={attachment.id}
                      className="bg-accent flex items-center gap-3 p-2"
                    >
                      <Link
                        href={attachment.url}
                        download={attachment.key}
                        target="_blank"
                        className="flex items-center gap-3"
                      >
                        <span className="p-1.5 rounded-full bg-accent-foreground/10">
                          <FileText size={16} />
                        </span>
                        <div className="flex flex-col items-start text-sm">
                          <span>{attachment.key}</span>
                          <span>{attachment.mimetype}</span>
                        </div>
                      </Link>
                    </div>
                  );
                }
                return (
                  <Thumbnail key={attachment.id} attachment={attachment} />
                );
              })}
            </div>
          )}
        </div>
      </Hint>
      <MessageAction
        message={message}
        isCurrentUser={isCurrentUser}
        handleClickEditMessage={handleClickEditMessage}
        handleClickReplyMessage={handleClickReplyMessage}
      />
    </div>
  );
};
