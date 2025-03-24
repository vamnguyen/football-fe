import axiosInstance from "@/lib/axiosInstance";
import { PaginatedResponse, Match } from "@/lib/interface";
import { getUpcomingMatchesParams } from "@/lib/types";

export const getUpcomingMatches = async (
  params: getUpcomingMatchesParams
): Promise<PaginatedResponse<Match>> => {
  const response = await axiosInstance.get("/matches", {
    params,
  });
  return response.data;
};

export const getMatchById = async (id: string): Promise<Match> => {
  const response = await axiosInstance.get(`/matches/${id}`);
  return response.data;
};
