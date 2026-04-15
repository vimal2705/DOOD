import { authApi } from '../api/authApi';
import { sessionStore } from '../storage/session';

export const authService = {
  async login({ email, password }) {
    const data = await authApi.login({ email, password });

    // Expected shape from your backend:
    // { success, message, token, user }
    if (data?.token || data?.user) {
      sessionStore.set({
        accessToken: data?.token ?? null,
        user: data?.user ?? null,
      });
    }

    return data;
  },

  async signup(payload) {
    const data = await authApi.signup(payload);

    // Expected shape from your backend:
    // { success, message, token, user }
    if (data?.token || data?.user) {
      sessionStore.set({
        accessToken: data?.token ?? null,
        user: data?.user ?? null,
      });
    }

    return data;
  },

  async sendOtp({ email }) {
    return authApi.sendOtp({ email });
  },

  async verifyOtp({ email, otp }) {
    return authApi.verifyOtp({ email, otp });
  },

  async resetPassword({ email, resetToken, newPassword }) {
    const data = await authApi.resetPassword({ email, resetToken, newPassword });

    if (data?.token || data?.user) {
      sessionStore.set({
        accessToken: data?.token ?? null,
        user: data?.user ?? null,
      });
    }

    return data;
  },

  async getProfile() {
    const session = sessionStore.get();
    if (!session?.accessToken) {
      throw new Error('No token found. Please login first.');
    }

    const data = await authApi.getProfile({ token: session.accessToken });

    if (data?.success && data?.user) {
      sessionStore.set({
        user: data.user,
      });
    }

    return data;
  },

  logout() {
    sessionStore.clear();
  },
};
