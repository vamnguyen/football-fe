import axiosInstance from "@/lib/axiosInstance";
import { PaginatedResponse, Prediction } from "@/lib/interface";
import { UserCreatePredictionBody } from "@/lib/types";
import { PaginationParams } from "@/lib/types";

export const createUserPrediction = async (
  matchId: string,
  body: UserCreatePredictionBody
): Promise<Prediction> => {
  const response = await axiosInstance.post(
    `/predictions/user-prediction/${matchId}`,
    body
  );
  return response.data;
};

export const getUserPrediction = async (matchId: string) => {
  const response = await axiosInstance.get(
    `/predictions/my-prediction/${matchId}`
  );
  return response.data;
};

export const getAIPrediction = async (matchId: string) => {
  const response = await axiosInstance.get(
    `/predictions/ai-prediction/${matchId}`
  );
  return response.data;
};

export const getCommunityPredictions = async (
  matchId: string,
  paginationParams: PaginationParams
): Promise<PaginatedResponse<Prediction>> => {
  const response = await axiosInstance.get(
    `/predictions/community/${matchId}`,
    { params: paginationParams }
  );
  return response.data;
};
