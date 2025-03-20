import axiosInstance from "@/lib/axiosInstance";
import { Match, PaginatedResponse, Prediction } from "@/lib/interface";
import {
  getUpcomingMatchesParams,
  getUserPredictionsParams,
} from "@/lib/types";

export const getUpcomingMatches = async (
  params: getUpcomingMatchesParams
): Promise<PaginatedResponse<Match>> => {
  const response = await axiosInstance.get("/predictions/matches", {
    params,
  });
  return response.data;
};

export const getUserPredictions = async (
  params: getUserPredictionsParams
): Promise<PaginatedResponse<Prediction>> => {
  const response = await axiosInstance.get("/predictions/my-predictions", {
    params,
  });
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
