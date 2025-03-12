import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ChallengesPage() {
  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Thách đấu</h1>
            <p className="text-muted-foreground">
              Thách đấu và cá cược với người chơi khác
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Tạo thách đấu mới</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo thách đấu mới</DialogTitle>
                <DialogDescription>
                  Tạo một thách đấu mới để mời người chơi khác tham gia
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="match">Chọn trận đấu</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trận đấu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manutd-liverpool">
                        Man Utd vs Liverpool
                      </SelectItem>
                      <SelectItem value="arsenal-chelsea">
                        Arsenal vs Chelsea
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Số tiền thách đấu</Label>
                  <Input id="amount" type="number" placeholder="Nhập số tiền" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prediction">Dự đoán của bạn</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kết quả" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="win">Thắng</SelectItem>
                      <SelectItem value="draw">Hòa</SelectItem>
                      <SelectItem value="lose">Thua</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Tạo thách đấu</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="public" className="w-full">
          <TabsList>
            <TabsTrigger value="public">Công khai</TabsTrigger>
            <TabsTrigger value="private">Phòng riêng</TabsTrigger>
            <TabsTrigger value="history">Lịch sử</TabsTrigger>
          </TabsList>

          {/* Public Challenges */}
          <TabsContent value="public" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Man Utd vs Liverpool</CardTitle>
                    <CardDescription>
                      Premier League - 20:00 20/03/2024
                    </CardDescription>
                  </div>
                  <Button variant="outline">Tham gia</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/avatars/01.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">username</div>
                        <div className="text-sm text-muted-foreground">
                          Dự đoán: Man Utd thắng
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">100,000đ</div>
                      <div className="text-sm text-muted-foreground">
                        Còn 2 chỗ
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                    <Button variant="outline" size="sm">
                      Chia sẻ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Private Challenges */}
          <TabsContent value="private" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Phòng riêng</CardTitle>
                    <CardDescription>
                      Tham gia phòng riêng bằng mã mời
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Tạo phòng riêng</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tạo phòng riêng</DialogTitle>
                        <DialogDescription>
                          Tạo phòng riêng và mời bạn bè tham gia
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="room-name">Tên phòng</Label>
                          <Input id="room-name" placeholder="Nhập tên phòng" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="room-code">Mã phòng</Label>
                          <div className="flex gap-2">
                            <Input id="room-code" placeholder="Nhập mã phòng" />
                            <Button variant="outline">Tạo mã</Button>
                          </div>
                        </div>
                        <Button className="w-full">Tạo phòng</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/avatars/01.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Phòng của username</div>
                        <div className="text-sm text-muted-foreground">
                          4 người tham gia
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">Tham gia</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenge History */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử thách đấu</CardTitle>
                <CardDescription>
                  Xem lại các thách đấu đã tham gia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/avatars/01.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Man Utd vs Liverpool</div>
                        <div className="text-sm text-muted-foreground">
                          20/03/2024
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">
                        +100,000đ
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Đã hoàn thành
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
