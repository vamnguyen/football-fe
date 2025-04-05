"use client";

import { useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { TeamLogo } from "@/components/shared/team-logo";
import { getMatch, Match } from "@/services/football-data";
import { format } from "date-fns";

export default function MatchIdPredictionPage() {
  const { matchId } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const data = await getMatch(Number(matchId));
        setMatch(data);
      } catch (error) {
        console.error("Error fetching match:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto mt-2" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-12 w-48" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!match) {
    return <div>Match not found</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Match Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <Badge variant="outline">{match.competition.name}</Badge>
            <CardTitle className="mt-2">Matchday {match.matchday}</CardTitle>
            <CardDescription>
              {format(new Date(match.utcDate), "MMM dd, yyyy HH:mm")}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TeamLogo
                teamName={match.homeTeam.name}
                size="lg"
                showName={false}
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
          <Card>
            <CardHeader>
              <CardTitle>AI Prediction</CardTitle>
              <CardDescription>
                Our AI model&apos;s prediction for this match
              </CardDescription>
            </CardHeader>
            <CardContent>{/* Add AI prediction content here */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle>Community Predictions</CardTitle>
              <CardDescription>
                See what the community thinks about this match
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add community predictions content here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="your-prediction">
          <Card>
            <CardHeader>
              <CardTitle>Your Prediction</CardTitle>
              <CardDescription>
                Make your prediction for this match
              </CardDescription>
            </CardHeader>
            <CardContent>{/* Add your prediction form here */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
