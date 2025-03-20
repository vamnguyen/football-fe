import { LEAGUES } from "./enum";

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type getUpcomingMatchesParams = PaginationParams & {
  league?: LEAGUES;
};

export type getUserPredictionsParams = PaginationParams;
