import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="py-6">
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Dự đoán bóng đá thông minh với AI
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Tham gia cộng đồng dự đoán bóng đá lớn nhất, kết nối với người chơi
          khác và thách đấu trí tuệ của bạn.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg">Bắt đầu ngay</Button>
          <Button variant="outline" size="lg">
            Tìm hiểu thêm
          </Button>
        </div>
      </section>

      {/* Featured Matches */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Trận đấu nổi bật</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Premier League</CardTitle>
              <CardDescription>Manchester United vs Liverpool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Dự đoán AI:</span>
                  <span className="font-semibold">60% Man Utd thắng</span>
                </div>
                <Button className="w-full">Xem chi tiết</Button>
              </div>
            </CardContent>
          </Card>
          {/* Add more match cards here */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Tính năng nổi bật</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>AI Dự đoán</CardTitle>
              <CardDescription>
                Dự đoán chính xác dựa trên dữ liệu thực tế
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cộng đồng</CardTitle>
              <CardDescription>
                Kết nối và tương tác với người chơi khác
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Thách đấu</CardTitle>
              <CardDescription>Thách đấu và cá cược với bạn bè</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}
