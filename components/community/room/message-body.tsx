import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, User } from "@/lib/interface";
import { format } from "date-fns";
import { MessageItem } from "@/components/community/room/message-item";
import MessageTyping from "./message-typing";

interface MessageBodyProps {
  messages: Message[];
  user?: User;
  participantTyping: {
    isTyping: boolean;
    user: User;
  };
  handleClickEditMessage: (message: Message) => void;
  handleClickReplyMessage: (message: Message) => void;
}

export const MessageBody = ({
  messages,
  user,
  participantTyping,
  handleClickEditMessage,
  handleClickReplyMessage,
}: MessageBodyProps) => {
  const groupMessagesByDate = messages.reduce((groups, message) => {
    if (!message) return groups;

    const dateKey = format(message.createdAt, "yyyy-MM-dd HH:mm");

    if (!groups[dateKey]) {
      groups[dateKey] = { time: message.createdAt, messages: [] };
    }

    groups[dateKey].messages.push(message);

    return groups;
  }, {} as Record<string, { time: Date; messages: Message[] }>);

  return (
    <ScrollArea scrollToBottom={true} className="flex-1 py-2 pr-3">
      {Object.entries(groupMessagesByDate).map(([dateKey, group]) => (
        <MessageItem
          group={group}
          key={dateKey}
          user={user}
          handleClickEditMessage={handleClickEditMessage}
          handleClickReplyMessage={handleClickReplyMessage}
        />
      ))}
      {participantTyping.isTyping && (
        <MessageTyping user={participantTyping.user} />
      )}
    </ScrollArea>
  );
};
