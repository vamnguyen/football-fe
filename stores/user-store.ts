import { create } from "zustand";
import { User } from "@/lib/interface";

export type UserState = {
  user: User | null;
};

export type UserActions = {
  setUser: (user: User) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: null,
};

const createUserStore = create<UserStore>((set) => ({
  ...defaultInitState,
  setUser: (user) => set({ user }),
}));

export const useUserStore = createUserStore((state) => state.user);
