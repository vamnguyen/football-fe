import { Prediction } from "@/lib/interface";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";

interface UserPredictionProps {
  userPrediction: Prediction;
}

export default function UserPrediction({
  userPrediction,
}: UserPredictionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Dự đoán của bạn: {userPrediction.match.homeTeam.name} vs{" "}
          {userPrediction.match.awayTeam.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{userPrediction.result}</p>
        <div
          className="mb-2 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: userPrediction.explanation }}
        />
      </CardContent>
    </Card>
  );
}
