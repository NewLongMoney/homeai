import { ThemeColors, ThemeSpacing, TypographyStyle } from './types';

export const colors: ThemeColors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  text: '#000000',
  gray: '#8E8E93',
  lightGray: '#C7C7CC',
  error: '#FF3B30',
  success: '#34C759',
};

export const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography: Record<string, TypographyStyle> = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
    color: colors.gray,
  },
}; 