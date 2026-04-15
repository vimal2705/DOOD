import { StyleSheet } from 'react-native';
import { COLORS } from '../../color/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },

  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMuted,
  },

  slide: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },

  contentContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 16,
    lineHeight: 36,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textMuted,
    lineHeight: 22,
    textAlign: 'center',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 28,
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    backgroundColor: COLORS.gray200,
  },

  button: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 24,
    marginBottom: 32,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});
