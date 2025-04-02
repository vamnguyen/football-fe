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
    <CardHeader className="flex-row items-center justify-between">
      <CardDescription>
        {room.match.league.name} <br />
        {new Date(room.match.matchDate || "").toLocaleDateString("vi-VN")}{" "}
        {room.match.matchTime}
      </CardDescription>
      <CardTitle className="flex items-center gap-2">
        <TeamLogo
          teamName={room.match.homeTeam || ""}
          size="lg"
          showName={true}
        />
        <span>vs</span>
        <TeamLogo
          teamName={room.match.awayTeam || ""}
          size="lg"
          showName={true}
        />
      </CardTitle>
      <Badge variant="outline">{activeParticipants} người đang tham gia</Badge>
    </CardHeader>
  );
};
