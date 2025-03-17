import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-full max-w-[900px] grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Form */}
        <Card className="w-full shadow-lg backdrop-blur-sm bg-white/70">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Đăng ký</CardTitle>
            <CardDescription>
              Tạo tài khoản để tham gia FootPred Community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Tên</Label>
                <Input
                  id="firstName"
                  placeholder="Nhập tên"
                  className="bg-white/90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Họ</Label>
                <Input
                  id="lastName"
                  placeholder="Nhập họ"
                  className="bg-white/90"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-white/90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-white/90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="bg-white/90"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Tôi đồng ý với{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Điều khoản
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Đăng ký
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/70 px-2 text-muted-foreground">
                  Hoặc đăng ký với
                </span>
              </div>
            </div>

            <div>
              <Button variant="outline" className="w-full bg-white/90">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link href="/sign-in" className="text-primary hover:underline">
                Đăng nhập
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Right side - Info */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-green-600/80 to-green-800/80 backdrop-blur-sm rounded-lg p-8 text-white shadow-lg">
          <div className="mb-4">
            <Globe className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            FootPred Community
          </h2>
          <p className="text-center mb-6">
            Tham gia cộng đồng dự đoán bóng đá, nhận phân tích chuyên sâu và
            thách đấu với bạn bè.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">Miễn phí</div>
              <span className="text-sm">Đăng ký</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">Dễ dàng</div>
              <span className="text-sm">Sử dụng</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">Cập nhật</div>
              <span className="text-sm">Liên tục</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">Bảo mật</div>
              <span className="text-sm">Thông tin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
