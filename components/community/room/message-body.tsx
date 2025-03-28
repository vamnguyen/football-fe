import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, User } from "@/lib/interface";
import { format } from "date-fns";
import { MessageItem } from "@/components/community/room/message-item";

interface MessageBodyProps {
  messages: Message[];
  user?: User;
}

export const MessageBody = ({ messages, user }: MessageBodyProps) => {
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
        <MessageItem group={group} key={dateKey} user={user} />
      ))}
      {/* {isRecipientTyping && <MessageTyping user={user} />} */}
    </ScrollArea>
  );
};
