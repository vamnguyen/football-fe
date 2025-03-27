"use client";

import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TeamLogo } from "@/components/shared/team-logo";
import { Message } from "@/lib/interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetRoomMessages } from "@/hooks/messages";
import { useGetRoomById } from "@/hooks/rooms/use-get-room-by-id";
import { Separator } from "@/components/ui/separator";
import { MessageEditor } from "@/components/community/room/message-editor";
import { useState } from "react";

export const RoomMessages = ({ roomId }: { roomId: string }) => {
  const { data: room, isLoading: isLoadingRoom } = useGetRoomById(roomId);
  const { data: messages, isLoading: isLoadingMessages } = useGetRoomMessages(
    room?.id || ""
  );

  const [replyingState, setReplyingState] = useState<{
    isReplying: boolean;
    message: Message | null;
  }>({ isReplying: false, message: null });
  const [editingState, setEditingState] = useState<{
    isEditing: boolean;
    message: Message | null;
  }>({ isEditing: false, message: null });

  return (
    <Card>
      {isLoadingRoom ? (
        <div>Loading...</div>
      ) : (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2">
                <TeamLogo
                  teamName={room?.match.homeTeam || ""}
                  size="lg"
                  showName={false}
                />
                <span>vs</span>
                <TeamLogo
                  teamName={room?.match.awayTeam || ""}
                  size="lg"
                  showName={false}
                />
              </CardTitle>
              <CardDescription>
                {room?.match.league.name} -{" "}
                {new Date(room?.match.matchDate || "").toLocaleDateString(
                  "vi-VN"
                )}{" "}
                {room?.match.matchTime}
              </CardDescription>
            </div>
            <Badge variant="outline">{room?.users.length} người tham gia</Badge>
          </div>
        </CardHeader>
      )}
      <Separator className="mb-5" />
      <CardContent>
        <div className="flex flex-col gap-4 h-[calc(100vh-300px)]">
          <ScrollArea className="flex-1">
            <div className="space-y-4">
              {isLoadingMessages ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 animate-pulse">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-24 bg-muted rounded" />
                        <div className="h-4 w-48 bg-muted rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                messages?.map((message: Message) => (
                  <div key={message.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage
                        src={message.author.avatar || undefined}
                        alt={message.author.firstName}
                      />
                      <AvatarFallback>
                        {message.author.firstName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {message.author.firstName} {message.author.lastName}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(message.createdAt), {
                            addSuffix: true,
                            locale: vi,
                          })}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <MessageEditor
            roomId={roomId}
            replyingState={replyingState}
            setReplyingState={setReplyingState}
            editingState={editingState}
            setEditingState={setEditingState}
          />
        </div>
      </CardContent>
    </Card>
  );
};
