"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/account/profile-form";
import { ChangePasswordForm } from "@/components/account/change-password-form";
import { landingAvatar2 } from "@/assets/images";
import { User } from "@/lib/interface";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="flex flex-col gap-6">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-6 w-32 mt-4" />
                  <Skeleton className="h-4 w-48 mt-2" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>
                    Cập nhật thông tin tài khoản của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  <AvatarFallback>
                    {user?.firstName?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "Chưa cập nhật"}
                </CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Đội yêu thích</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-8 w-8 rounded-full bg-primary" />
                    <span>
                      {user?.preferences?.favoriteTeam || "Chưa chọn"}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Thành viên từ</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user?.createdAt || "").toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
                <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    <CardDescription>
                      Cập nhật thông tin tài khoản của bạn
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user && <ProfileForm initialData={user} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Đổi mật khẩu</CardTitle>
                    <CardDescription>
                      Cập nhật mật khẩu tài khoản của bạn
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChangePasswordForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
