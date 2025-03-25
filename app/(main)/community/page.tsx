import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { landingAvatar2 } from "@/assets/images";

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

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Chat Room</CardTitle>
              <CardDescription>Thảo luận trực tiếp về trận đấu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[600px]">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {/* Chat Messages */}
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={landingAvatar2.src} alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">username</span>
                          <span className="text-sm text-muted-foreground">
                            2 phút trước
                          </span>
                        </div>
                        <p className="text-sm">Man Utd sẽ thắng trận này!</p>
                      </div>
                    </div>
                    {/* Add more chat messages */}
                  </div>
                </ScrollArea>
                <div className="flex gap-2 mt-4">
                  <Input placeholder="Nhập tin nhắn..." />
                  <Button>Gửi</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
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
                        src={landingAvatar2.src}
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
        </div>
      </div>
    </div>
  );
}
