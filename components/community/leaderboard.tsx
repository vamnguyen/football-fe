import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

export const Leaderboard = () => {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Bảng xếp hạng</CardTitle>
        <CardDescription>Top dự đoán viên tuần này</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((rank) => (
            <div key={rank} className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {rank}
              </div>
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${rank}`}
                  alt={`User ${rank}`}
                />
                <AvatarFallback>U{rank}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">User {rank}</div>
                <div className="text-sm text-muted-foreground">
                  {Math.floor(Math.random() * 100)}% chính xác
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
