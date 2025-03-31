import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TeamLogo } from "@/components/shared/team-logo";
import { ChatRoom } from "@/lib/interface";

interface RoomHeaderProps {
  room: ChatRoom | undefined;
  activeParticipants?: number;
}

export const RoomHeader = ({ room, activeParticipants }: RoomHeaderProps) => {
  if (!room) return null;

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-2">
            <TeamLogo
              teamName={room.match.homeTeam || ""}
              size="lg"
              showName={false}
            />
            <span>vs</span>
            <TeamLogo
              teamName={room.match.awayTeam || ""}
              size="lg"
              showName={false}
            />
          </CardTitle>
          <CardDescription>
            {room.match.league.name} -{" "}
            {new Date(room.match.matchDate || "").toLocaleDateString("vi-VN")}{" "}
            {room.match.matchTime}
          </CardDescription>
        </div>
        <Badge variant="outline">{activeParticipants} người tham gia</Badge>
      </div>
    </CardHeader>
  );
};
