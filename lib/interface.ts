import { FOOTBALL_TEAMS } from "@/lib/enum";

export interface ProfileFormProps {
  initialData: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  favoriteTeam: FOOTBALL_TEAMS;
  createdAt: Date;
}

export interface ChangePasswordFormProps {
  currentPassword: string;
  newPassword: string;
}
