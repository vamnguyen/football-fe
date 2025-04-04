"use client";

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
import { useGetMe, useLogout } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import AccountPageSkeleton from "@/components/skeleton/account-page-skeleton";

export default function AccountPage() {
  const { data: user, isLoading } = useGetMe();
  const { mutate: logout, isPending } = useLogout();

  if (isLoading) {
    return <AccountPageSkeleton />;
  }

  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tài khoản</h1>
            <p className="text-muted-foreground">
              Quản lý thông tin tài khoản và hoạt động của bạn
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={() => logout()}
            disabled={isPending}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user?.avatar ?? undefined}
                    alt="user avatar"
                  />
                  <AvatarFallback>{user?.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "Chưa cập nhật"}
                </CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium">Thành viên từ:</h4>
                  <span className="text-sm text-muted-foreground">
                    {new Date(user?.createdAt || "").toLocaleDateString(
                      "vi-VN"
                    )}
                  </span>
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
