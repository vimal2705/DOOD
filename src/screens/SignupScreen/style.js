import { StyleSheet } from 'react-native';
import { COLORS } from '../../color/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  headerContainer: {
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textMuted,
  },

  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.gray100,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textLight,
    paddingVertical: 0,
  },

  iconButton: {
    paddingLeft: 10,
    paddingVertical: 4,
  },

  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: -6,
    marginBottom: 10,
    fontWeight: '600',
  },

  signupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  signupButtonDisabled: {
    opacity: 0.7,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
});
