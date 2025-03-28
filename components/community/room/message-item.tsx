import Hint from "@/components/shared/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TIME_THRESHOLD } from "@/lib/constants";
import { Message, User } from "@/lib/interface";
import { cn, formatDateLabel } from "@/lib/utils";
import { differenceInMinutes, format } from "date-fns";
import { FileText, Reply } from "lucide-react";
import Image from "next/image";
import MessageAction from "./message-action";
import Thumbnail from "./thumbnail";

interface MessageItemProps {
  group: { time: Date; messages: Message[] };
  user?: User;
}

export const MessageItem = ({ group, user }: MessageItemProps) => {
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
        const gridCols =
          message.attachments.length === 1
            ? "grid-cols-1"
            : message.attachments.length === 2
            ? "grid-cols-2"
            : "grid-cols-3";

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
              {message.content !== "" && (
                <>
                  {message.parentMessage !== null ? (
                    <div
                      className={cn(
                        "flex flex-col relative",
                        isCurrentUser ? "items-end" : "items-start"
                      )}
                    >
                      <span className="flex items-center gap-1 text-foreground/50">
                        <Reply size={12} />
                        {message.author.id === user?.id ? (
                          message.parentMessage.author.id === user?.id ? (
                            <span className="text-xs">
                              You replied to yourself
                            </span>
                          ) : (
                            <span className="text-xs">
                              You replied to{" "}
                              {message.parentMessage.author.firstName +
                                " " +
                                message.parentMessage.author.lastName}
                            </span>
                          )
                        ) : message.parentMessage.author.id === user?.id ? (
                          <span className="text-xs">
                            {message.author.firstName +
                              " " +
                              message.author.lastName}{" "}
                            replied to you
                          </span>
                        ) : message.author.id ===
                          message.parentMessage.author.id ? (
                          <span className="text-xs">
                            {message.author.firstName +
                              " " +
                              message.author.lastName}{" "}
                            replied to themself
                          </span>
                        ) : (
                          <span className="text-xs">
                            {message.author.firstName +
                              " " +
                              message.author.lastName}{" "}
                            replied to{" "}
                            {message.parentMessage.author.firstName +
                              " " +
                              message.parentMessage.author.lastName}
                          </span>
                        )}
                      </span>
                      {message.parentMessage.content !== "" ? (
                        <div
                          className={cn(
                            "max-w-[350px] opacity-50 bg-muted text-muted-foreground px-4 pb-3 pt-2 w-fit rounded-t-2xl truncate -mb-3",
                            isCurrentUser ? "rounded-bl-2xl" : "rounded-br-2xl"
                          )}
                        >
                          {message.parentMessage.content}
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "max-w-[350px] opacity-50 bg-muted w-fit rounded-t-2xl px-4 pb-3 pt-2 -mb-3",
                            isCurrentUser ? "rounded-bl-2xl" : "rounded-br-2xl"
                          )}
                        >
                          {message.parentMessage.attachments.length > 0 && (
                            <div>
                              {message.parentMessage.attachments[0].mimetype.includes(
                                "image"
                              ) && (
                                <Image
                                  src={message.parentMessage.attachments[0].url}
                                  height={150}
                                  width={150}
                                  alt={
                                    message.parentMessage.attachments[0].key ||
                                    "Attachment"
                                  }
                                  className="rounded-xl opacity-50"
                                />
                              )}
                              {message.parentMessage.attachments[0].mimetype.includes(
                                "video"
                              ) && (
                                <video
                                  src={message.parentMessage.attachments[0].url}
                                  controls
                                  className="rounded-xl h-[100px] w-[150px] object-cover opacity-50"
                                />
                              )}
                              {message.parentMessage.attachments[0].mimetype.includes(
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
                          <p className="max-w-[550px] w-fit break-words bg-secondary dark:bg-secondary/80 px-3.5 py-2 rounded-2xl">
                            {message.content}
                          </p>
                        </Hint>
                        <MessageAction
                          message={message}
                          isCurrentUser={isCurrentUser}
                          onReplyClick={() => {}}
                          onEditClick={() => {}}
                          handleDeleteMessage={() => {}}
                        />
                      </div>
                    </div>
                  ) : (
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
                        <p className="max-w-[550px] w-fit break-words bg-secondary dark:bg-secondary/80 px-3.5 py-2 rounded-2xl">
                          {message.content}
                        </p>
                      </Hint>
                      <MessageAction
                        message={message}
                        isCurrentUser={isCurrentUser}
                        onReplyClick={() => {}}
                        onEditClick={() => {}}
                        handleDeleteMessage={() => {}}
                      />
                    </div>
                  )}
                </>
              )}
              {message.attachments.length > 0 && (
                <>
                  {message.parentMessage !== null ? (
                    <div
                      className={cn(
                        "flex flex-col relative",
                        isCurrentUser ? "items-end" : "items-start"
                      )}
                    >
                      <span className="flex items-center gap-1 text-foreground/50">
                        <Reply size={12} />
                        {message.author.id === user?.id ? (
                          message.parentMessage.author.id === user?.id ? (
                            <span className="text-xs">
                              You replied to yourself
                            </span>
                          ) : (
                            <span className="text-xs">
                              You replied to{" "}
                              {message.parentMessage.author.firstName +
                                " " +
                                message.parentMessage.author.lastName}
                            </span>
                          )
                        ) : message.parentMessage.author.id === user?.id ? (
                          <span className="text-xs">
                            {message.author.firstName +
                              " " +
                              message.author.lastName}{" "}
                            replied to you
                          </span>
                        ) : message.author.id ===
                          message.parentMessage.author.id ? (
                          <span className="text-xs">
                            {message.author.firstName +
                              " " +
                              message.author.lastName}{" "}
                            replied to themself
                          </span>
                        ) : (
                          <span className="text-xs">
                            {message.author.firstName +
                              " " +
                              message.author.lastName}{" "}
                            replied to{" "}
                            {message.parentMessage.author.firstName +
                              " " +
                              message.parentMessage.author.lastName}
                          </span>
                        )}
                      </span>
                      {message.parentMessage.content !== "" ? (
                        <div
                          className={cn(
                            "max-w-[350px] opacity-50 bg-muted text-muted-foreground px-4 pb-3 pt-2 w-fit rounded-t-2xl truncate -mb-3",
                            isCurrentUser ? "rounded-bl-2xl" : "rounded-br-2xl"
                          )}
                        >
                          {message.parentMessage.content}
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "max-w-[350px] bg-muted w-fit rounded-t-2xl px-4 pb-3 pt-2 -mb-3",
                            isCurrentUser ? "rounded-bl-2xl" : "rounded-br-2xl"
                          )}
                        >
                          {message.parentMessage.attachments.length > 0 && (
                            <div>
                              {message.parentMessage.attachments[0].mimetype.includes(
                                "image"
                              ) && (
                                <Image
                                  src={message.parentMessage.attachments[0].url}
                                  height={150}
                                  width={150}
                                  alt={
                                    message.parentMessage.attachments[0].key ||
                                    "Attachment"
                                  }
                                  className="rounded-xl opacity-50"
                                />
                              )}
                              {message.parentMessage.attachments[0].mimetype.includes(
                                "video"
                              ) && (
                                <video
                                  src={message.parentMessage.attachments[0].url}
                                  controls
                                  className="rounded-xl h-[100px] w-[150px] object-cover opacity-50"
                                />
                              )}
                              {message.parentMessage.attachments[0].mimetype.includes(
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
                          <div
                            className={`grid ${gridCols} gap-1 rounded-2xl overflow-hidden max-w-[400px]`}
                          >
                            {message.attachments.length > 0 &&
                              message.attachments.map((attachment) => {
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
                                if (
                                  attachment.mimetype.includes("application")
                                ) {
                                  return (
                                    <div
                                      key={attachment.id}
                                      className="bg-accent flex items-center gap-3 p-2"
                                    >
                                      <a
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
                                      </a>
                                    </div>
                                  );
                                }
                                return (
                                  <Thumbnail
                                    key={attachment.id}
                                    attachment={attachment}
                                  />
                                );
                              })}
                          </div>
                        </Hint>
                        <MessageAction
                          message={message}
                          isCurrentUser={isCurrentUser}
                          onReplyClick={() => {}}
                          onEditClick={() => {}}
                          handleDeleteMessage={() => {}}
                        />
                      </div>
                    </div>
                  ) : (
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
                        <div
                          className={`grid ${gridCols} gap-1 rounded-2xl overflow-hidden max-w-[400px]`}
                        >
                          {message.attachments.length > 0 &&
                            message.attachments.map((attachment) => {
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
                                    <a
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
                                    </a>
                                  </div>
                                );
                              }
                              return (
                                <Thumbnail
                                  key={attachment.id}
                                  attachment={attachment}
                                />
                              );
                            })}
                        </div>
                      </Hint>
                      <MessageAction
                        message={message}
                        isCurrentUser={isCurrentUser}
                        onReplyClick={() => {}}
                        onEditClick={() => {}}
                        handleDeleteMessage={() => {}}
                      />
                    </div>
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
