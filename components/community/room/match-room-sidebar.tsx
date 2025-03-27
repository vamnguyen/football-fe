"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TeamLogo } from "@/components/shared/team-logo";
import { useGetRooms } from "@/hooks/rooms";
import { useRouter } from "next/navigation";

export const MatchRoomsSidebar = () => {
  const router = useRouter();
  const {
    data: rooms,
    isLoading: isLoadingRooms,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetRooms();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoadingRooms) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs defaultValue="active" className="w-full lg:col-span-8 space-y-4">
      <TabsList>
        <TabsTrigger value="active">Đang diễn ra</TabsTrigger>
        <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
        <TabsTrigger value="finished">Đã kết thúc</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="space-y-4">
        {isFetchingNextPage ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 w-48 bg-muted rounded" />
                  <div className="h-4 w-32 bg-muted rounded mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-48 bg-muted rounded" />
                    <div className="h-8 w-8 bg-muted rounded" />
                    <div className="h-12 w-48 bg-muted rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          rooms?.pages.map((page) =>
            page.data.map((room) => (
              <Card
                key={room.id}
                className={"cursor-pointer transition-colors hover:bg-accent"}
                onClick={() => router.push(`/community/room/${room.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <TeamLogo
                          teamName={room.match.homeTeam}
                          size="sm"
                          showName={false}
                        />
                        <span>vs</span>
                        <TeamLogo
                          teamName={room.match.awayTeam}
                          size="sm"
                          showName={false}
                        />
                      </CardTitle>
                      <CardDescription>
                        {room.match.league.name} -{" "}
                        {new Date(room.match.matchDate).toLocaleDateString(
                          "vi-VN"
                        )}{" "}
                        {room.match.matchTime}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {room.users.length} người tham gia
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))
          )
        )}
        <div ref={ref} className="h-1" />
      </TabsContent>

      {/* Similar structure for upcoming and finished tabs */}
    </Tabs>
  );
};
