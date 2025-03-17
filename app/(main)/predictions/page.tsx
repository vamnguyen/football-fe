import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PredictionsPage() {
  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dự đoán trận đấu</h1>
          <p className="text-muted-foreground">
            Xem dự đoán AI và đưa ra dự đoán của bạn
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn giải đấu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="premier-league">Premier League</SelectItem>
                <SelectItem value="la-liga">La Liga</SelectItem>
                <SelectItem value="bundesliga">Bundesliga</SelectItem>
                <SelectItem value="v-league">V.League</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Input type="date" />
          </div>
        </div>

        {/* Match List */}
        <Tabs defaultValue="today" className="w-full">
          <TabsList>
            <TabsTrigger value="today">Hôm nay</TabsTrigger>
            <TabsTrigger value="tomorrow">Ngày mai</TabsTrigger>
            <TabsTrigger value="week">Tuần này</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Premier League</CardTitle>
                    <CardDescription>20:00 - 20/03/2024</CardDescription>
                  </div>
                  <Button variant="outline">Xem chi tiết</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-full bg-red-500" />
                      <span>Manchester United</span>
                    </div>
                    <span className="font-bold">VS</span>
                    <div className="flex items-center gap-4">
                      <span>Liverpool</span>
                      <div className="h-8 w-8 rounded-full bg-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Dự đoán AI:</span>
                      <span className="font-semibold">60% Man Utd thắng</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Dự đoán cộng đồng:</span>
                      <span className="font-semibold">45% Man Utd thắng</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tomorrow">
            {/* Similar structure for tomorrow's matches */}
          </TabsContent>
          <TabsContent value="week">
            {/* Similar structure for week's matches */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
