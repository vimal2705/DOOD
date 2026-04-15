import { httpRequest } from './httpClient';

// Adjust these endpoints to match your backend.
export const authApi = {
  login: ({ email, password }) =>
    httpRequest({
      path: '/api/auth/login',
      method: 'POST',
      body: { email, password },
    }),

  signup: ({ name, email, username, password, phoneNumber, dob }) =>
    httpRequest({
      path: '/api/auth/signup',
      method: 'POST',
      body: { name, email, username, password, phoneNumber, dob },
    }),

  sendOtp: ({ email }) =>
    httpRequest({
      path: '/api/auth/forgot-password',
      method: 'POST',
      body: { email },
    }),

  verifyOtp: ({ email, otp }) =>
    httpRequest({
      path: '/api/auth/verify-otp',
      method: 'POST',
      body: { email, otp },
    }),

  resetPassword: ({ email, resetToken, newPassword }) =>
    httpRequest({
      path: '/api/auth/reset-password',
      method: 'POST',
      body: { email, resetToken, newPassword },
    }),

  getProfile: ({ token }) =>
    httpRequest({
      path: '/api/auth/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
