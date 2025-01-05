import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card = ({ children, style, variant = 'default' }: CardProps) => (
  <View style={[styles.base, styles[variant], style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  base: {
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  default: {
    backgroundColor: colors.background,
  },
  elevated: {
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
}); 