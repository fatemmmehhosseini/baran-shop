
import { create } from "zustand";
import { User } from "@/types/auth.type";
import { authService } from "@/services/auth.service";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  logout: () => {
    set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false });

  },

  checkAuth: async () => {
  try {
    const user = await authService.getMe();

    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  } catch {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }
},
}));

