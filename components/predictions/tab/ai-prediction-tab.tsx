import { Match } from "@/lib/interface";
import AIPredictionCard from "../ai-prediction-card";
import { useGetAIPrediction } from "@/hooks/prediction";
import AiPredictionSkeleton from "@/components/skeleton/ai-prediction-skeleton";

interface AIPredictionTabProps {
  match: Match;
}

export default function AIPredictionTab({ match }: AIPredictionTabProps) {
  const { data: AIPrediction, isLoading: isAIPredicting } = useGetAIPrediction(
    match.id
  );

  if (isAIPredicting) {
    return <AiPredictionSkeleton />;
  }

  if (!AIPrediction) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Chưa có dự đoán AI cho trận đấu này.
      </div>
    );
  }

  return <AIPredictionCard AIPrediction={AIPrediction} />;
}
