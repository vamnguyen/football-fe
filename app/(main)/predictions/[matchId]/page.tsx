import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function MatchPredictionPage() {
  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        {/* Match Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Premier League</CardTitle>
                <CardDescription>20:00 - 20/03/2024</CardDescription>
              </div>
              <Button variant="outline">Quay lại</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-red-500" />
                <div className="text-right">
                  <div className="text-xl font-bold">Manchester United</div>
                  <div className="text-sm text-muted-foreground">Sân nhà</div>
                </div>
              </div>
              <div className="text-2xl font-bold">VS</div>
              <div className="flex items-center gap-4">
                <div className="text-left">
                  <div className="text-xl font-bold">Liverpool</div>
                  <div className="text-sm text-muted-foreground">Sân khách</div>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prediction Content */}
        <Tabs defaultValue="ai" className="w-full">
          <TabsList>
            <TabsTrigger value="ai">Dự đoán AI</TabsTrigger>
            <TabsTrigger value="community">Cộng đồng</TabsTrigger>
            <TabsTrigger value="your-prediction">Dự đoán của bạn</TabsTrigger>
          </TabsList>

          {/* AI Prediction Tab */}
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dự đoán AI</CardTitle>
                <CardDescription>
                  Dựa trên phân tích dữ liệu và lịch sử đối đầu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Thắng</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Hòa</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Thua</span>
                    <span>15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chi tiết dự đoán</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Phong độ gần đây</h4>
                  <p className="text-sm text-muted-foreground">
                    Man Utd: Thắng 3, Hòa 1, Thua 1 trong 5 trận gần nhất
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Lịch sử đối đầu</h4>
                  <p className="text-sm text-muted-foreground">
                    Man Utd thắng 2, Hòa 2, Thua 1 trong 5 lần gặp gần nhất
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Prediction Tab */}
          <TabsContent value="community" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dự đoán cộng đồng</CardTitle>
                <CardDescription>
                  Dựa trên 1,234 dự đoán từ cộng đồng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Thắng</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Hòa</span>
                    <span>35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Thua</span>
                    <span>20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Your Prediction Tab */}
          <TabsContent value="your-prediction" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dự đoán của bạn</CardTitle>
                <CardDescription>
                  Chọn kết quả dự đoán của bạn cho trận đấu này
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem
                      value="win"
                      id="win"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="win"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="text-lg font-bold">Thắng</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="draw"
                      id="draw"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="draw"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="text-lg font-bold">Hòa</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="lose"
                      id="lose"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="lose"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="text-lg font-bold">Thua</span>
                    </Label>
                  </div>
                </RadioGroup>
                <Button className="w-full mt-4">Xác nhận dự đoán</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
