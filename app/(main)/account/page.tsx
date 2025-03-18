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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { landingAvatar2 } from "@/assets/images";

export default function AccountPage() {
  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Tài khoản</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin tài khoản và hoạt động của bạn
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={landingAvatar2.src} alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">username</CardTitle>
                <CardDescription>user@example.com</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Đội yêu thích</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-8 w-8 rounded-full bg-red-500" />
                    <span>Manchester United</span>
                  </div>
                </div>
                <div>
                  <Label>Thành viên từ</Label>
                  <p className="text-sm text-muted-foreground">01/01/2024</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Chỉnh sửa hồ sơ</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
                      <DialogDescription>
                        Cập nhật thông tin cá nhân của bạn
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Tên hiển thị</Label>
                        <Input id="name" defaultValue="username" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="user@example.com"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="team">Đội yêu thích</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn đội" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manutd">
                              Manchester United
                            </SelectItem>
                            <SelectItem value="liverpool">Liverpool</SelectItem>
                            <SelectItem value="arsenal">Arsenal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Lưu thay đổi</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Wallet Card */}
            <Card>
              <CardHeader>
                <CardTitle>Ví tiền</CardTitle>
                <CardDescription>Quản lý số dư và giao dịch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">1,000,000đ</div>
                      <div className="text-sm text-muted-foreground">
                        Số dư hiện tại
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Nạp tiền</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Nạp tiền</DialogTitle>
                          <DialogDescription>
                            Chọn phương thức nạp tiền
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="amount">Số tiền</Label>
                            <Input
                              id="amount"
                              type="number"
                              placeholder="Nhập số tiền"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="method">Phương thức</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn phương thức" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bank">
                                  Chuyển khoản ngân hàng
                                </SelectItem>
                                <SelectItem value="momo">Ví MoMo</SelectItem>
                                <SelectItem value="zalo">Ví ZaloPay</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full">Nạp tiền</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-4">Lịch sử giao dịch</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Nạp tiền</div>
                          <div className="text-sm text-muted-foreground">
                            20/03/2024
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">
                            +500,000đ
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Chuyển khoản
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Thách đấu</div>
                          <div className="text-sm text-muted-foreground">
                            19/03/2024
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-red-600">
                            -100,000đ
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Man Utd vs Liverpool
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card */}
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
                <CardDescription>Xem lại các hoạt động của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="predictions" className="w-full">
                  <TabsList>
                    <TabsTrigger value="predictions">Dự đoán</TabsTrigger>
                    <TabsTrigger value="challenges">Thách đấu</TabsTrigger>
                    <TabsTrigger value="community">Cộng đồng</TabsTrigger>
                  </TabsList>
                  <TabsContent value="predictions" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Man Utd vs Liverpool</div>
                        <div className="text-sm text-muted-foreground">
                          Dự đoán: Man Utd thắng
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">Đúng</div>
                        <div className="text-sm text-muted-foreground">
                          20/03/2024
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="challenges" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">
                          Thách đấu Man Utd vs Liverpool
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Tham gia thách đấu
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">
                          +100,000đ
                        </div>
                        <div className="text-sm text-muted-foreground">
                          20/03/2024
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="community" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Bài đăng mới</div>
                        <div className="text-sm text-muted-foreground">
                          Phân tích trận Man Utd vs Liverpool
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          20/03/2024
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
