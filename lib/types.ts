import { SPORTS } from "./enum";
import { MessageAttachment } from "./interface";

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

export type CreateRoomParams = {
  name: string;
  description?: string;
};

export type CreateMessageParams = {
  content?: string;
  parentMessageId?: string;
  attachments?: MessageAttachment[];
};
