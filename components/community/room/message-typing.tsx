import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/interface";

interface MessageTypingProps {
  user: User;
}

const MessageTyping = ({ user }: MessageTypingProps) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-10 mr-2">
        <AvatarImage src={user?.avatar ?? undefined} />
        <AvatarFallback>
          {user?.firstName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="h-10 flex space-x-2 justify-center items-center bg-secondary dark:bg-secondary/80 px-3.5 py-2 rounded-2xl">
        <div className="size-1.5 bg-foreground/70 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="size-1.5 bg-foreground/70 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="size-1.5 bg-foreground/70 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default MessageTyping;
