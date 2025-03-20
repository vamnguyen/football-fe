import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetUpcomingMatches } from "@/hooks/prediction";
import { TeamLogo } from "@/components/shared/team-logo";
import { LEAGUES } from "@/lib/enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Match } from "@/lib/interface";
import PredictionModal from "@/components/modal/prediction-modal";
import UpcomingMatchesSkeleton from "@/components/skeleton/upcoming-matches-skeleton";

export function UpcomingMatches() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<LEAGUES>(LEAGUES.ALL);
  const { data: upcomingMatches, isLoading: isLoadingUpcomingMatches } =
    useGetUpcomingMatches();

  // Get unique leagues from upcoming matches
  const leagues = useMemo(() => {
    if (!upcomingMatches) return [];
    return [
      LEAGUES.ALL,
      ...Array.from(
        new Set(
          upcomingMatches
            .filter(
              (match) => match.league !== undefined && match.league !== null
            )
            .map((match) => match.league)
        )
      ),
    ];
  }, [upcomingMatches]);

  const filteredMatches = useMemo(() => {
    if (selectedLeague === LEAGUES.ALL) return upcomingMatches;
    return upcomingMatches?.filter((match) => match.league === selectedLeague);
  }, [upcomingMatches, selectedLeague]);

  if (isLoadingUpcomingMatches) {
    return <UpcomingMatchesSkeleton />;
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold mb-4">
            Các trận đấu HOT sắp diễn ra 🔥
          </h2>
          <Select
            value={selectedLeague}
            onValueChange={(value) => setSelectedLeague(value as LEAGUES)}
          >
            <SelectTrigger className="min-w-[180px] w-fit">
              <SelectValue placeholder="Chọn giải đấu" />
            </SelectTrigger>
            <SelectContent>
              {leagues.map((league) => (
                <SelectItem key={league} value={league}>
                  {league}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches?.map((match) => (
            <Card key={match.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-center gap-4">
                  <TeamLogo teamName={match.homeTeam} size="lg" />
                  <span className="text-lg font-semibold">VS</span>
                  <TeamLogo teamName={match.awayTeam} size="lg" />
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  {match.league} •{" "}
                  {new Date(match.matchDate).toLocaleDateString("vi-VN")}
                </p>
                <Button
                  className="w-full"
                  onClick={() => setSelectedMatch(match)}
                  disabled={isLoadingUpcomingMatches}
                >
                  Nhờ AI dự đoán
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <PredictionModal
        selectedMatch={selectedMatch}
        setSelectedMatch={setSelectedMatch}
      />
    </>
  );
}
