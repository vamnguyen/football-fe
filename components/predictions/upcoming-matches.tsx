"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetUpcomingMatches } from "@/hooks/prediction";
import useGetLeagues from "@/hooks/league/use-get-leagues";
import { TeamLogo } from "@/components/shared/team-logo";
import { LEAGUES, SPORTS } from "@/lib/enum";
import { Match, League } from "@/lib/interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import UpcomingMatchesSkeleton from "@/components/skeleton/upcoming-matches-skeleton";
import { Pagination } from "@/components/shared/pagination";
import Image from "next/image";

export function UpcomingMatches() {
  const sports = useMemo(() => Object.values(SPORTS), []);

  const [selectedLeague, setSelectedLeague] = useState<LEAGUES>(LEAGUES.ALL);
  const [selectedSport, setSelectedSport] = useState<SPORTS>(SPORTS.FOOTBALL);
  const [page, setPage] = useState(1);
  const limit = 6;

  // Fetch leagues based on selected sport
  const { data: leagues, isLoading: isLoadingLeagues } =
    useGetLeagues(selectedSport);

  const { data: upcomingMatches, isLoading: isLoadingUpcomingMatches } =
    useGetUpcomingMatches({
      leagueId: selectedLeague,
      sport: selectedSport,
      page,
      limit,
    });

  // Reset league when sport changes
  const handleSportChange = (sport: SPORTS) => {
    setSelectedSport(sport);
    setSelectedLeague(LEAGUES.ALL);
    setPage(1);
  };

  if (isLoadingUpcomingMatches || isLoadingLeagues) {
    return <UpcomingMatchesSkeleton />;
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            Các trận đấu HOT sắp diễn ra 🔥
          </h2>
          <div className="flex gap-2">
            <Select
              value={selectedSport}
              onValueChange={(value) => handleSportChange(value as SPORTS)}
            >
              <SelectTrigger className="min-w-[100px]">
                <SelectValue placeholder="Loại thể thao" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedLeague}
              onValueChange={(value) => {
                setSelectedLeague(value as LEAGUES);
                setPage(1);
              }}
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Chọn giải đấu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={LEAGUES.ALL}>Tất cả giải đấu</SelectItem>
                {leagues?.map((league: League) => (
                  <SelectItem key={league.id} value={league.id}>
                    {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {upcomingMatches?.data.length === 0 ? (
          <div className="text-center py-8 text-primary">
            Không có trận đấu nào
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingMatches?.data?.map((match: Match) => (
                <Card
                  key={match.id}
                  className="hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {match.thumbnail && (
                    <div className="relative w-full h-36">
                      <Image
                        src={match.thumbnail}
                        alt={`${match.homeTeam} vs ${match.awayTeam}`}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2">
                        {match.sport}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className={!match.thumbnail ? "pt-6" : ""}>
                    <div className="flex items-center justify-center gap-4">
                      <TeamLogo teamName={match.homeTeam} size="lg" />
                      <span className="text-lg font-semibold">VS</span>
                      <TeamLogo teamName={match.awayTeam} size="lg" />
                    </div>
                    {!match.thumbnail && (
                      <Badge className="self-end">{match.sport}</Badge>
                    )}
                  </CardHeader>
                  <CardContent className="text-center pb-2">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-sm text-gray-600">
                        {match.league.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-600">
                        {new Date(match.matchDate).toLocaleDateString("vi-VN")}{" "}
                        {match.matchTime}
                      </span>
                    </div>
                    {match.sport === SPORTS.ESPORTS &&
                      match.additionalInfo?.gameTitle && (
                        <Badge variant="outline" className="mt-2">
                          {match.additionalInfo.gameTitle}
                        </Badge>
                      )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/predictions/${match.id}`}>
                        Xem chi tiết & Dự đoán
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <Pagination
              page={page}
              limit={limit}
              totalResults={upcomingMatches?.total || 0}
              totalPages={Math.ceil((upcomingMatches?.total || 0) / limit)}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}
