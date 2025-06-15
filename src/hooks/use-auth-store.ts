"use client";

import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email, name = 'User') => {
    // In a real app, you'd verify credentials here
    set({ isAuthenticated: true, user: { name, email } });
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));
