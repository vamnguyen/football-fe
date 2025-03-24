import { UpcomingMatches } from "@/components/predictions/upcoming-matches";

export default function PredictionsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        💩 Dự đoán trận đấu cùng AI 🤖
      </h1>
      <UpcomingMatches />
    </div>
  );
}
