import { sessionStore } from '../storage/session';

export const tokenUtils = {
  // Check if token exists and is valid
  isTokenValid: () => {
    const session = sessionStore.get();
    return !!(session?.accessToken && session?.user);
  },

  // Get the current token
  getToken: () => {
    const session = sessionStore.get();
    return session?.accessToken || null;
  },

  // Get the current user
  getUser: () => {
    const session = sessionStore.get();
    return session?.user || null;
  },

  // Clear token (logout)
  clearToken: () => {
    sessionStore.clear();
  },

  // Store token and user (login/signup)
  setToken: (token, user) => {
    sessionStore.set({
      accessToken: token,
      user: user,
    });
  },
};
