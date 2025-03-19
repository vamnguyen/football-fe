import { FOOTBALL_TEAMS } from "@/lib/enum";

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
