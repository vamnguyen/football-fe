import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserPredictions } from "@/hooks/prediction";
import MyPredictionsSkeleton from "@/components/skeleton/my-predictions-skeleton";
import { Pagination } from "@/components/shared/pagination";

export function MyPredictions() {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: userPredictions, isLoading: isLoadingUserPredictions } =
    useGetUserPredictions({
      page,
      limit,
    });

  if (isLoadingUserPredictions) {
    return <MyPredictionsSkeleton />;
  }

  if (userPredictions?.data.length === 0) {
    return (
      <div className="text-center text-gray-600">Bạn chưa có dự đoán nào</div>
    );
  }

  return (
    <div className="md:col-span-2">
      <h2 className="text-2xl font-semibold mb-4">Lịch sử dự đoán của tôi</h2>
      <div className="space-y-4">
        {userPredictions?.data?.map((prediction) => (
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
        <Pagination
          page={page}
          limit={limit}
          totalResults={userPredictions?.total || 0}
          totalPages={Math.ceil((userPredictions?.total || 0) / limit)}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
