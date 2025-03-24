import { SPORTS } from "./enum";

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type getUpcomingMatchesParams = PaginationParams & {
  leagueId?: string;
  sport: SPORTS;
};

export type UserCreatePredictionBody = {
  result: string;
  explanation: string;
};
