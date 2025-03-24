import { useState } from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Match } from "@/lib/interface";
import {
  useCreateUserPrediction,
  useGetUserPrediction,
} from "@/hooks/prediction";
import UserPrediction from "@/components/predictions/user-prediction";

interface YourPredictionTabProps {
  match: Match;
}

export default function YourPredictionTab({ match }: YourPredictionTabProps) {
  const [result, setResult] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");

  const { data: userPrediction, isLoading: isLoadingUserPrediction } =
    useGetUserPrediction(match.id);
  const { mutate: createUserPrediction, isPending: isCreatingUserPrediction } =
    useCreateUserPrediction(match.id);

  if (isLoadingUserPrediction) {
    return <div>Loading...</div>;
  }

  if (userPrediction) {
    return <UserPrediction userPrediction={userPrediction} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dự đoán của bạn</CardTitle>
        <CardDescription>
          Chọn kết quả dự đoán của bạn cho trận đấu này
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          className="grid grid-cols-3 gap-4"
          value={result}
          onValueChange={setResult}
        >
          <div>
            <RadioGroupItem
              value={`${match.homeTeam} win`}
              id="win"
              className="peer sr-only"
            />
            <Label
              htmlFor="win"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <span className="text-lg font-bold">Thắng</span>
              <span className="text-sm text-muted-foreground mt-1">
                {match.homeTeam} thắng
              </span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="hòa" id="draw" className="peer sr-only" />
            <Label
              htmlFor="draw"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <span className="text-lg font-bold">Hòa</span>
              <span className="text-sm text-muted-foreground mt-1">
                Kết quả hòa
              </span>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value={`${match.awayTeam} win`}
              id="lose"
              className="peer sr-only"
            />
            <Label
              htmlFor="lose"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <span className="text-lg font-bold">Thua</span>
              <span className="text-sm text-muted-foreground mt-1">
                {match.awayTeam} thắng
              </span>
            </Label>
          </div>
        </RadioGroup>

        <div className="mt-6">
          <h4 className="font-medium mb-2">Chú thích</h4>
          <textarea
            className="w-full min-h-[100px] p-3 border rounded-md"
            placeholder="Nhập phân tích và lý do dự đoán của bạn..."
            value={explanation || ""}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            disabled={!result || !explanation || isCreatingUserPrediction}
            onClick={() => {
              createUserPrediction({
                result,
                explanation,
              });
            }}
          >
            Xác nhận dự đoán
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
