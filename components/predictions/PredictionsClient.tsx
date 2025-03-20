"use client";

import { UpcomingMatches } from "./UpcomingMatches";
import { MyPredictions } from "./MyPredictions";

export function PredictionsClient() {
  return (
    <div className="flex flex-col gap-8">
      <UpcomingMatches />
      <MyPredictions />
    </div>
  );
}
