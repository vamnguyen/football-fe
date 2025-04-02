"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Message, User } from "@/lib/interface";
import { useGetRoomMessages } from "@/hooks/messages";
import { useGetRoomById } from "@/hooks/rooms/use-get-room-by-id";
import { Separator } from "@/components/ui/separator";
import { MessageEditor } from "./message-editor";
import { useEffect, useState } from "react";
import { useGetMe } from "@/hooks/auth";
import { MessageBody } from "./message-body";
import { useSocket } from "@/providers/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { RoomHeader } from "./room-header";
import { RoomMessagesSkeleton } from "@/components/skeleton/room-messages-skeleton";

export const RoomMessages = ({ roomId }: { roomId: string }) => {
  const { data: room, isLoading: isLoadingRoom } = useGetRoomById(roomId);
  const { data: messages, isLoading: isLoadingMessages } = useGetRoomMessages(
    room?.id || ""
  );
  const { data: me } = useGetMe();
  const socket = useSocket();
  const queryClient = useQueryClient();

  const [replyingState, setReplyingState] = useState<{
    isReplying: boolean;
    message: Message | null;
  }>({ isReplying: false, message: null });

  const [editingState, setEditingState] = useState<{
    isEditing: boolean;
    message: Message | null;
  }>({ isEditing: false, message: null });

  const [participantTyping, setParticipantTyping] = useState<{
    isTyping: boolean;
    user: User;
  }>({ isTyping: false, user: {} as User });
  const [activeParticipants, setActiveParticipants] = useState<number>(0);

  let typingTimeout: NodeJS.Timeout | null = null;
  const sendTypingStatus = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    socket.emit("onTypingStart", { roomId, user: me });

    typingTimeout = setTimeout(() => {
      socket.emit("onTypingStop", { roomId, user: me });
    }, 1000);
  };

  useEffect(() => {
    socket.emit("onJoinRoom", { roomId });
    socket.emit("getRoomParticipants", { roomId });

    const handleUserJoined = () => {
      setActiveParticipants((prev) => prev + 1);
    };
    const handleUserLeft = () => {
      setActiveParticipants((prev) => Math.max(0, prev - 1));
    };

    const handleMessageCreated = (payload: {
      message: Message;
      roomId: string;
    }) => {
      queryClient.setQueryData(
        ["room-messages", roomId],
        (prev: Message[] | undefined) => {
          if (!prev) return [payload.message];
          return [...prev, payload.message];
        }
      );
    };

    const handleMessageUpdated = (payload: {
      message: Message;
      roomId: string;
    }) => {
      queryClient.setQueryData(
        ["room-messages", roomId],
        (prev: Message[] | undefined) => {
          if (!prev) return [];
          return prev.map((msg) =>
            msg.id === payload.message.id ? payload.message : msg
          );
        }
      );
    };

    const handleMessageDeleted = (payload: {
      messageId: string;
      roomId: string;
    }) => {
      queryClient.setQueryData(
        ["room-messages", roomId],
        (prev: Message[] | undefined) => {
          if (!prev) return [];
          return prev.filter((msg) => msg.id !== payload.messageId);
        }
      );
    };

    socket.on("userTypingStart", (data) => {
      setParticipantTyping({
        isTyping: data.isTyping,
        user: data.user,
      });
    });
    socket.on("userTypingStop", (data) => {
      setParticipantTyping({
        isTyping: data.isTyping,
        user: data.user,
      });
    });

    // Subscribe to all events
    socket.on("userJoinedRoom", handleUserJoined);
    socket.on("userLeftRoom", handleUserLeft);
    socket.on("onRoomMessageCreated", handleMessageCreated);
    socket.on("onRoomMessageUpdated", handleMessageUpdated);
    socket.on("onRoomMessageDeleted", handleMessageDeleted);
    socket.on("getRoomParticipants", (count: number) => {
      setActiveParticipants(count);
    });

    return () => {
      socket.emit("onLeaveRoom", { roomId });
      socket.off("userJoinedRoom");
      socket.off("userLeftRoom");
      socket.off("userTypingStart");
      socket.off("userTypingStop");
      socket.off("onRoomMessageCreated");
      socket.off("onRoomMessageUpdated");
      socket.off("onRoomMessageDeleted");
      socket.off("getRoomParticipants");
    };
  }, [roomId, socket, queryClient]);

  const handleClickEditMessage = (message: Message) => {
    setEditingState({
      isEditing: true,
      message,
    });
    setReplyingState({
      isReplying: false,
      message: null,
    });
  };

  const handleClickReplyMessage = (message: Message) => {
    setReplyingState({
      isReplying: true,
      message,
    });
    setEditingState({
      isEditing: false,
      message: null,
    });
  };

  if (isLoadingRoom || isLoadingMessages) {
    return <RoomMessagesSkeleton />;
  }

  return (
    <Card>
      <RoomHeader room={room} activeParticipants={activeParticipants} />
      <Separator className="mb-5" />
      <CardContent className="bg-background flex flex-col gap-4 h-[calc(100vh-260px)]">
        <MessageBody
          messages={messages || []}
          user={me}
          participantTyping={participantTyping}
          handleClickEditMessage={handleClickEditMessage}
          handleClickReplyMessage={handleClickReplyMessage}
        />

        <MessageEditor
          roomId={roomId}
          replyingState={replyingState}
          setReplyingState={setReplyingState}
          editingState={editingState}
          setEditingState={setEditingState}
          sendTypingStatus={sendTypingStatus}
        />
      </CardContent>
    </Card>
  );
};
