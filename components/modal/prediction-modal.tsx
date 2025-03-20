import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TeamLogo } from "@/components/shared/team-logo";
import { PredictionForm } from "@/components/predictions/PredictionForm";
import { useCreatePrediction } from "@/hooks/prediction";
import { Match } from "@/lib/interface";

interface PredictionModalProps {
  selectedMatch: Match | null;
  setSelectedMatch: (match: Match | null) => void;
}

export default function PredictionModal({
  selectedMatch,
  setSelectedMatch,
}: PredictionModalProps) {
  const [additionalContext, setAdditionalContext] = useState("");
  const { mutate: createPrediction, isPending: isLoadingCreatePrediction } =
    useCreatePrediction();

  const handlePredict = () => {
    if (!selectedMatch) return;
    createPrediction({
      matchId: selectedMatch.id,
      additionalContext,
    });
    // Reset form and close dialog after prediction
    setAdditionalContext("");
    setSelectedMatch(null);
  };

  return (
    <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
      <DialogContent className="sm:max-w-[600px]" aria-describedby={undefined}>
        {selectedMatch && (
          <>
            <DialogHeader>
              <DialogTitle className="sr-only">
                Dự đoán trận đấu {selectedMatch.homeTeam} vs{" "}
                {selectedMatch.awayTeam}
              </DialogTitle>
              <div className="flex items-center justify-center gap-4">
                <TeamLogo teamName={selectedMatch.homeTeam} size="lg" />
                <span className="text-xl font-semibold">VS</span>
                <TeamLogo teamName={selectedMatch.awayTeam} size="lg" />
              </div>
            </DialogHeader>

            <PredictionForm
              match={selectedMatch}
              loading={isLoadingCreatePrediction}
              additionalContext={additionalContext}
              onContextChange={setAdditionalContext}
              onSubmit={handlePredict}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
