import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";

export const MatchRoomSidebarSkeleton = () => {
  return (
    <Tabs defaultValue="active" className="w-full lg:col-span-8 space-y-4">
      <TabsList className="w-full">
        <TabsTrigger value="active" className="flex-1">
          Đang diễn ra
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="flex-1">
          Sắp tới
        </TabsTrigger>
        <TabsTrigger value="finished" className="flex-1">
          Đã kết thúc
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <span className="text-muted-foreground">vs</span>
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="upcoming" className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <span className="text-muted-foreground">vs</span>
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="finished" className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <span className="text-muted-foreground">vs</span>
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  );
};
