import { create } from 'zustand';

interface IUser {
  _id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const useUser = () => {
  return {
    user: useUserStore((state) => state.user),
    setUser: useUserStore((state) => state.setUser),
    clearUser: useUserStore((state) => state.clearUser),
  };
};
