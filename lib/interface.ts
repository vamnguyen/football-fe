import { FOOTBALL_TEAMS, LEAGUES } from "@/lib/enum";

export interface ProfileFormProps {
  initialData: Pick<User, "firstName" | "lastName" | "favoriteTeam">;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  favoriteTeam: FOOTBALL_TEAMS | null;
  createdAt: Date;
}

export interface ChangePasswordFormProps {
  currentPassword: string;
  newPassword: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  league: LEAGUES;
}

export interface Prediction {
  id: string;
  prediction: string;
  confidence: number;
  match: Match;
  createdAt: string;
}
