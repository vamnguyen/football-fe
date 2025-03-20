import axiosInstance from "@/lib/axiosInstance";
import { Match, Prediction } from "@/lib/interface";

export const getUpcomingMatches = async (): Promise<Match[]> => {
  const response = await axiosInstance.get("/predictions/matches");
  return response.data;
};

export const getUserPredictions = async (): Promise<Prediction[]> => {
  const response = await axiosInstance.get("/predictions/my-predictions");
  return response.data;
};

export const createPrediction = async (
  matchId: string,
  additionalContext?: string
) => {
  const response = await axiosInstance.post("/predictions/predict", {
    matchId,
    additionalContext,
  });
  return response.data;
};
