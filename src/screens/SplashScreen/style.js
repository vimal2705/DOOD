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
    justifyContent: 'space-between',
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 160,
    height: 160,
    marginBottom: 12,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 2,
    marginTop: 6,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: COLORS.gray500,
  },

  footer: {
    alignItems: 'center',
    paddingBottom: 24,
  },

  poweredBy: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 6,
  },

  brand: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textLight,
    letterSpacing: 1,
  },
});
