import { StyleSheet } from 'react-native';
import { COLORS } from '../../color/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },

  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  backButton: {
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

  header: {
    marginTop: 8,
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.gray500,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.gray100,
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: COLORS.textLight,
    paddingVertical: 0,
  },

  otpLabel: {
    fontSize: 14,
    color: COLORS.gray500,
    marginBottom: 12,
    textAlign: 'center',
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  otpBox: {
    width: 44,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  otpBoxActive: {
    borderColor: COLORS.primary,
  },
  otpDigit: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  hiddenOtpInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },

  resendRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  timerText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginLeft: 6,
  },
});
