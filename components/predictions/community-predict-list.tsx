import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Prediction } from "@/lib/interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination } from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";

interface CommunityPredictListProps {
  communityPredictions: Prediction[];
  page: number;
  limit: number;
  totalResults: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CommunityPredictList({
  communityPredictions,
  page,
  limit,
  totalResults,
  totalPages,
  onPageChange,
}: CommunityPredictListProps) {
  return (
    <>
      {communityPredictions && communityPredictions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Dự đoán gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityPredictions.map((prediction: Prediction) => (
                <div key={prediction.id} className="border-b pb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={prediction.user.avatar || undefined}
                        alt={`user avatar`}
                      />
                      <AvatarFallback>
                        {prediction.user.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {prediction.user.firstName} {prediction.user.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(prediction.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                    </div>
                    <Badge variant="outline">
                      Đã dự đoán: {prediction.result}
                    </Badge>
                  </div>
                  <div
                    className="mt-2 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: prediction.explanation,
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {totalPages > 1 && (
        <Pagination
          totalResults={totalResults}
          totalPages={totalPages}
          page={page}
          limit={limit}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
