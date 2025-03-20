import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserPredictions } from "@/hooks/prediction";
import MyPredictionsSkeleton from "@/components/skeleton/my-predictions-skeleton";

export function MyPredictions() {
  const { data: userPredictions, isLoading: isLoadingUserPredictions } =
    useGetUserPredictions();

  if (isLoadingUserPredictions) {
    return <MyPredictionsSkeleton />;
  }

  return (
    <div className="md:col-span-2">
      <h2 className="text-2xl font-semibold mb-4">Lịch sử dự đoán của tôi</h2>
      <div className="space-y-4">
        {userPredictions?.map((prediction) => (
          <Card key={prediction.id}>
            <CardHeader>
              <CardTitle>
                {prediction.match.homeTeam} vs {prediction.match.awayTeam}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                {prediction.match.league} •{" "}
                {new Date(prediction.match.matchDate).toLocaleDateString(
                  "vi-VN"
                )}
              </p>
              <div
                className="mb-2 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: prediction.prediction }}
              />
              <p className="text-sm text-gray-500">
                Độ tin cậy: {prediction.confidence}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
