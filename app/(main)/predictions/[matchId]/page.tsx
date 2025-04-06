"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { TeamLogo } from "@/components/shared/team-logo";
import { format } from "date-fns";
import { useGetMatch } from "@/hooks/football-data/match/use-get-match";
import { toast } from "sonner";
import { MatchIdPageSkeleton } from "@/components/skeleton/match-id-page-skeleton";
import AIPredictionTab from "@/components/predictions/tab/ai-prediction-tab";
import CommunityPredictionTab from "@/components/predictions/tab/community-prediction-tab";
import YourPredictionTab from "@/components/predictions/tab/your-prediction-tab";

export default function MatchIdPredictionPage() {
  const { matchId } = useParams();
  const {
    data: match,
    isLoading,
    isError,
    error,
  } = useGetMatch(Number(matchId));

  if (isLoading) {
    return <MatchIdPageSkeleton />;
  }

  if (isError && error) {
    toast.error(error.message);
  }

  if (!match) {
    return <div>Match not found</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Match Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center gap-4">
            <Badge variant="outline">{match.competition.name}</Badge>
            <CardTitle>
              {format(new Date(match.utcDate), "MMM dd, yyyy")}
            </CardTitle>
            <CardDescription>Matchday {match.matchday}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TeamLogo
                teamName={match.homeTeam.name}
                size="lg"
                showName={false}
                logo={match.homeTeam.crest}
              />
              <div className="text-right">
                <div className="text-xl font-bold">{match.homeTeam.name}</div>
                <div className="text-sm text-muted-foreground">Home</div>
              </div>
            </div>

            <div className="text-center">
              {match.status === "FINISHED" && match.score ? (
                <div className="text-2xl font-bold bg-primary/10 px-4 py-2 rounded-md">
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                </div>
              ) : (
                <div className="text-2xl font-bold">VS</div>
              )}
              <Badge className="mt-2">{match.status}</Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-left">
                <div className="text-xl font-bold">{match.awayTeam.name}</div>
                <div className="text-sm text-muted-foreground">Away</div>
              </div>
              <TeamLogo
                teamName={match.awayTeam.name}
                size="lg"
                showName={false}
                logo={match.awayTeam.crest}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Content */}
      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai">AI Prediction</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="your-prediction">Your Prediction</TabsTrigger>
        </TabsList>

        <TabsContent value="ai">
          <AIPredictionTab match={match} />
        </TabsContent>

        <TabsContent value="community">
          <CommunityPredictionTab match={match} />
        </TabsContent>

        <TabsContent value="your-prediction">
          <YourPredictionTab match={match} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
