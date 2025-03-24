import axiosInstance from "@/lib/axiosInstance";
import { SPORTS } from "@/lib/enum";

export const getLeagues = async (sport: SPORTS) => {
  const response = await axiosInstance.get(`/leagues?sport=${sport}`);
  return response.data;
};

export const getLeagueById = async (id: string) => {
  const response = await axiosInstance.get(`/leagues/${id}`);
  return response.data;
};
