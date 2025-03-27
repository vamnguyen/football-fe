import { Leaderboard } from "@/components/community/leaderboard";
import { MatchRoomsSidebar } from "@/components/community/room/match-room-sidebar";

export default function CommunityPage() {
  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Cộng đồng</h1>
          <p className="text-muted-foreground">
            Kết nối, chia sẻ và thảo luận với cộng đồng người chơi
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Match List & Chat Rooms - 8 columns */}
          <MatchRoomsSidebar />

          {/* Leaderboard - 4 columns */}
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
