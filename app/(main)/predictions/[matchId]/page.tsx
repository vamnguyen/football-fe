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
import useGetMatch from "@/hooks/matches/use-get-match";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamLogo } from "@/components/shared/team-logo";
import YourPredictionTab from "@/components/predictions/tab/your-prediction-tab";
import CommunityPredictionTab from "@/components/predictions/tab/community-prediction-tab";
import AIPredictionTab from "@/components/predictions/tab/ai-prediction-tab";

export default function MatchIdPredictionPage() {
  const { matchId } = useParams();
  const { data: match, isLoading } = useGetMatch(matchId as string);

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
    return <div>Không tìm thấy trận đấu</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Match Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <Badge variant="outline">{match.sport}</Badge>
            <CardTitle className="mt-2">{match.league.name}</CardTitle>
            <CardDescription>
              {new Date(match.matchDate || "").toLocaleDateString("vi-VN")}{" "}
              {match.matchTime}
            </CardDescription>
          </div>

          {match.thumbnail && (
            <div className="mt-4 relative h-32 w-full">
              <Image
                src={match.thumbnail}
                alt="Match thumbnail"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TeamLogo teamName={match.homeTeam} size="lg" showName={false} />
              <div className="text-right">
                <div className="text-xl font-bold">{match.homeTeam}</div>
                <div className="text-sm text-muted-foreground">Sân nhà</div>
              </div>
            </div>

            <div className="text-center">
              {match.isFinished && match.score ? (
                <div className="text-2xl font-bold bg-primary/10 px-4 py-2 rounded-md">
                  {match.score}
                </div>
              ) : (
                <div className="text-2xl font-bold">VS</div>
              )}
              {match.isFinished && <Badge className="mt-2">Đã kết thúc</Badge>}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-left">
                <div className="text-xl font-bold">{match.awayTeam}</div>
                <div className="text-sm text-muted-foreground">Sân khách</div>
              </div>
              <TeamLogo teamName={match.awayTeam} size="lg" showName={false} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Content */}
      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai">Dự đoán AI</TabsTrigger>
          <TabsTrigger value="community">Cộng đồng</TabsTrigger>
          <TabsTrigger value="your-prediction">Dự đoán của bạn</TabsTrigger>
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
