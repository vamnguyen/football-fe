import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TIME_THRESHOLD } from "@/lib/constants";
import { Message, User } from "@/lib/interface";
import { cn, formatDateLabel } from "@/lib/utils";
import { differenceInMinutes } from "date-fns";
import Hint from "@/components/shared/hint";
import { MessageContent } from "./message-content";
import { MessageReplyPreview } from "./message-reply-preview";

interface MessageItemProps {
  group: { time: Date; messages: Message[] };
  user?: User;
  handleClickEditMessage: (message: Message) => void;
  handleClickReplyMessage: (message: Message) => void;
}

export const MessageItem = ({
  group,
  user,
  handleClickEditMessage,
  handleClickReplyMessage,
}: MessageItemProps) => {
  return (
    <>
      <div className="relative my-2 text-center">
        <span className="relative inline-block px-4 py-1 text-xs text-foreground/70">
          {formatDateLabel(group.time)}
        </span>
      </div>
      {group.messages.map((message, index) => {
        const prevMessage = group.messages[index - 1];
        const isCompact =
          prevMessage &&
          message.author.id === prevMessage.author.id &&
          differenceInMinutes(
            new Date(message.createdAt),
            new Date(prevMessage.createdAt)
          ) < TIME_THRESHOLD;

        const isCurrentUser = message.author.id === user?.id;

        return (
          <div
            key={message.id}
            className={`flex items-end mb-1 ${
              isCurrentUser && "flex-row-reverse"
            }`}
          >
            {!isCurrentUser && !isCompact && (
              <Hint
                side="left"
                label={message.author.firstName + " " + message.author.lastName}
              >
                <Avatar className="size-10 mr-2">
                  <AvatarImage src={message.author.avatar ?? undefined} />
                  <AvatarFallback>
                    {message.author.firstName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Hint>
            )}
            <div
              className={cn(
                isCompact
                  ? isCurrentUser
                    ? ""
                    : "ml-14"
                  : isCurrentUser
                  ? ""
                  : "ml-2"
              )}
            >
              {(message.content || message.attachments?.length > 0) && (
                <>
                  {message.parentMessage ? (
                    <>
                      <MessageReplyPreview
                        message={message}
                        parentMessage={message.parentMessage}
                        isCurrentUser={isCurrentUser}
                      />
                      <MessageContent
                        message={message}
                        isCurrentUser={isCurrentUser}
                        handleClickEditMessage={handleClickEditMessage}
                        handleClickReplyMessage={handleClickReplyMessage}
                      />
                    </>
                  ) : (
                    <MessageContent
                      message={message}
                      isCurrentUser={isCurrentUser}
                      handleClickEditMessage={handleClickEditMessage}
                      handleClickReplyMessage={handleClickReplyMessage}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
