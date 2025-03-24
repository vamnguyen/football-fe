import { StaticImageData } from "next/image";
import { FOOTBALL_TEAMS, PREDICTION_TYPE, SPORTS } from "@/lib/enum";

export interface ProfileFormProps {
  initialData: Pick<User, "firstName" | "lastName">;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
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

export interface FootballTeam {
  name: FOOTBALL_TEAMS;
  logo: string | StaticImageData;
}

export interface League {
  id: string;
  name: string;
  sport: SPORTS;
  logo?: string;
  description?: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  matchTime: string;
  league: League;
  sport: SPORTS;
  thumbnail?: string;
  score?: string;
  isFinished: boolean;
  additionalInfo?: {
    games?: number;
    platform?: string;
    gameTitle?: string;
  };
  predictions: Prediction[];
}

export interface Prediction {
  id: string;
  type: PREDICTION_TYPE;
  result: string;
  explanation: string;
  confidence: number;
  probabilities?: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
  match: Match;
  createdAt: string;
  user: User;
}

export interface AIPredictionChartData {
  name: string;
  value: number;
  color: string;
}
