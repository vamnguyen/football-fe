"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TeamLogo } from "@/components/shared/team-logo";
import { Message } from "@/lib/interface";
import { useGetRoomMessages } from "@/hooks/messages";
import { useGetRoomById } from "@/hooks/rooms/use-get-room-by-id";
import { Separator } from "@/components/ui/separator";
import { MessageEditor } from "./message-editor";
import { useState } from "react";
import { useGetMe } from "@/hooks/auth";
import { MessageBody } from "./message-body";

export const RoomMessages = ({ roomId }: { roomId: string }) => {
  const { data: room, isLoading: isLoadingRoom } = useGetRoomById(roomId);
  const { data: messages, isLoading: isLoadingMessages } = useGetRoomMessages(
    room?.id || ""
  );
  const { data: user } = useGetMe();

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
      <CardContent className="bg-background flex flex-col gap-4 h-[calc(100vh-260px)]">
        {isLoadingMessages ? (
          <div>Loading...</div>
        ) : (
          <MessageBody messages={messages || []} user={user} />
        )}

        <MessageEditor
          roomId={roomId}
          replyingState={replyingState}
          setReplyingState={setReplyingState}
          editingState={editingState}
          setEditingState={setEditingState}
        />
      </CardContent>
    </Card>
  );
};
