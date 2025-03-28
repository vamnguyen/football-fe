import { StaticImageData } from "next/image";
import { FOOTBALL_TEAMS, PREDICTION_TYPE, ROLE, SPORTS } from "@/lib/enum";

export interface ProfileFormProps {
  initialData: Pick<User, "firstName" | "lastName">;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  role: ROLE;
  createdAt: Date;
  isOnline: boolean;
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
  totalPages: number;
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
  createdAt: Date;
  user: User;
}

export interface AIPredictionChartData {
  name: string;
  value: number;
  color: string;
}

export interface MessageAttachment {
  id: string;
  key: string;
  url: string;
  mimetype: string;
}

export interface Message {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  content: string;
  isEdited: boolean;
  author: User;
  parentMessage: Message;
  replies: Message[];
  attachments: MessageAttachment[];
}

export interface ChatRoom {
  id: string;
  createdAt: Date;
  name: string;
  description: string;
  match: Match;
  messages: Message[];
  admin: User;
  users: User[];
}
