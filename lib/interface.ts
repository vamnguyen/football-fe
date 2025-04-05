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

// export interface Match {
//   id: string;
//   homeTeam: string;
//   awayTeam: string;
//   matchDate: string;
//   matchTime: string;
//   league: League;
//   sport: SPORTS;
//   thumbnail?: string;
//   score?: string;
//   isFinished: boolean;
//   additionalInfo?: {
//     games?: number;
//     platform?: string;
//     gameTitle?: string;
//   };
//   predictions: Prediction[];
// }

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
  chatRoomId: string;
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

// --------- Football Data API ---------
export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  area: Area;
  lastUpdated: string;
  numberOfAvailableSeasons: number;
  currentSeason: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: any;
  };
  seasons: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  }[];
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  area: Area;
}

export interface Match {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group: string;
  lastUpdated: string;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    winner: string;
    duration: string;
    fullTime: {
      home: number;
      away: number;
    };
    halfTime: {
      home: number;
      away: number;
    };
  };
  referees: {
    id: number;
    name: string;
    type: string;
    nationality: string;
  }[];
  area: Area;
  competition: Competition;
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: string | null;
  };
}
// --------- Football Data API ---------
