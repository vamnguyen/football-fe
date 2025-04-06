import { useCallback, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Match } from "@/lib/interface";
import { useGetCommunityPredictions } from "@/hooks/prediction";
import CommunityPredictList from "@/components/predictions/community-predict-list";

interface CommunityPredictionTabProps {
  match: Match;
}

export default function CommunityPredictionTab({
  match,
}: CommunityPredictionTabProps) {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: communityPredictions } = useGetCommunityPredictions(match.id, {
    page,
    limit,
  });

  // Calculate prediction statistics
  const calculatePredictionStats = useCallback(() => {
    if (!communityPredictions?.data) return null;

    const totalPredictions = communityPredictions.data.length;
    const homeTeamWins = communityPredictions.data.filter(
      (pred) => pred.result === `${match.homeTeam.name} win`
    ).length;
    const awayTeamWins = communityPredictions.data.filter(
      (pred) => pred.result === `${match.awayTeam.name} win`
    ).length;
    const draws = communityPredictions.data.filter(
      (pred) => pred.result === "hòa"
    ).length;

    return [
      {
        name: `${match.homeTeam.name} thắng`,
        value: (homeTeamWins / totalPredictions) * 100,
        color: "#22c55e",
      },
      {
        name: "Hòa",
        value: (draws / totalPredictions) * 100,
        color: "#f59e0b",
      },
      {
        name: `${match.awayTeam.name} thắng`,
        value: (awayTeamWins / totalPredictions) * 100,
        color: "#ef4444",
      },
    ];
  }, [communityPredictions, match]);

  const communityPredictionData = calculatePredictionStats() || [
    { name: `${match.homeTeam.name} thắng`, value: 0, color: "#22c55e" },
    { name: "Hòa", value: 0, color: "#f59e0b" },
    { name: `${match.awayTeam.name} thắng`, value: 0, color: "#ef4444" },
  ];

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Dự đoán cộng đồng</CardTitle>
          <CardDescription>
            Dựa trên {communityPredictions?.total || 0} dự đoán từ cộng đồng
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={communityPredictionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({
                    name,
                    percent,
                  }: {
                    name: string;
                    percent: number;
                  }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {communityPredictionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <CommunityPredictList
        communityPredictions={communityPredictions?.data || []}
        page={page}
        limit={limit}
        totalResults={communityPredictions?.total || 0}
        totalPages={Math.ceil((communityPredictions?.total || 0) / limit)}
        onPageChange={setPage}
      />
    </>
  );
}
