// Primary Colors
export const COLORS = {
  // Brand Colors
  primary: '#FF5A3D',
  primaryLight: '#FFB5A3',
  primaryDark: '#E64C31',

  // Background Colors
  light: '#FFF5EC',
  dark: '#0F0F10',

  // Text Colors
  textLight: '#0F0F10',
  textDark: '#FFF5EC',
  textMuted: '#9CA3AF',

  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Neutral
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
} as const;

export const getColors = (isDarkMode: boolean) => ({
  backgroundColor: isDarkMode ? COLORS.dark : COLORS.light,
  textColor: isDarkMode ? COLORS.textDark : COLORS.textLight,
  textSecondary: COLORS.textMuted,
  accentColor: COLORS.primary,
});
