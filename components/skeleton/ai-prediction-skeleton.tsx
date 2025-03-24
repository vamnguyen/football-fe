import { Brain } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function AiPredictionSkeleton() {
  return (
    <Card>
      <CardContent className="py-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <Brain className="w-16 h-16 text-primary animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">
              AI đang phân tích trận đấu...
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Đang xử lý dữ liệu và đưa ra dự đoán. Quá trình này có thể mất 30
              giây. Trong lúc chờ, bạn có thể xem lại lịch sử đối đầu hoặc thống
              kê của hai đội.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
