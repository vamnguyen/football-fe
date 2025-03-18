import { FOOTBALL_TEAMS } from "@/lib/enum";

export interface ProfileFormProps {
  initialData: User;
}

export interface UserPreferences {
  favoriteTeam: FOOTBALL_TEAMS | null;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  preferences: UserPreferences;
  createdAt: Date;
}

export interface ChangePasswordFormProps {
  currentPassword: string;
  newPassword: string;
}
