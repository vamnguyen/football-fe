import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Match } from "@/lib/interface";

interface PredictionFormProps {
  match: Match;
  loading: boolean;
  additionalContext: string;
  onContextChange: (value: string) => void;
  onSubmit: () => void;
}

export function PredictionForm({
  match,
  loading,
  additionalContext,
  onContextChange,
  onSubmit,
}: PredictionFormProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 text-center">
        <p className="mb-2">
          <span className="font-medium">Giải đấu:</span>{" "}
          {match.league?.name ?? "Chưa xác định"}
        </p>
        <p>
          <span className="font-medium">Ngày thi đấu:</span>{" "}
          {new Date(match.matchDate).toLocaleDateString("vi-VN")}
        </p>
      </div>
      <Textarea
        placeholder="Bổ sung thêm thông tin để giúp AI dự đoán chính xác hơn (tùy chọn)"
        value={additionalContext}
        onChange={(e) => onContextChange(e.target.value)}
        className="min-h-[120px]"
      />
      <Button onClick={onSubmit} disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Đang dự đoán...
          </>
        ) : (
          "Dự đoán"
        )}
      </Button>
    </div>
  );
}
