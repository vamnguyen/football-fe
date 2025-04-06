import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prediction } from "@/lib/interface";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { COLORS_CHART_PREDICTION } from "@/lib/constants";

interface AIPredictionCardProps {
  AIPrediction: Prediction;
}

export default function AIPredictionCard({
  AIPrediction,
}: AIPredictionCardProps) {
  const chartData = AIPrediction.probabilities
    ? [
        {
          name: `${AIPrediction.match.homeTeam.name} Thắng`,
          value: AIPrediction.probabilities.homeWin,
          color: COLORS_CHART_PREDICTION[0],
        },
        {
          name: "Hòa",
          value: AIPrediction.probabilities.draw,
          color: COLORS_CHART_PREDICTION[1],
        },
        {
          name: `${AIPrediction.match.awayTeam.name} Thắng`,
          value: AIPrediction.probabilities.awayWin,
          color: COLORS_CHART_PREDICTION[2],
        },
      ]
    : [];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="text-foreground font-medium">{payload[0].name}</p>
          <p className="text-foreground">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Dự đoán AI</CardTitle>
          <Badge variant="outline" className="text-sm">
            Độ tin cậy: {AIPrediction.confidence}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart Section */}
          <div className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>Dựa trên phân tích dữ liệu và lịch sử đối đầu</p>
            </div>
          </div>

          {/* Prediction Text Section */}
          <div className="space-y-4">
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: AIPrediction.explanation,
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
