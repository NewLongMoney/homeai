export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: '#000000',
  textSecondary: '#6B6B6B',
  border: '#E5E5EA',
  shadow: '#000000',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
} as const;

export type Colors = typeof colors; 