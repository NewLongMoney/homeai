import React from 'react';
import { Text as RNText, StyleSheet, TextStyle as RNTextStyle } from 'react-native';
import { typography, colors } from '@/theme';

type TextProps = {
  children: React.ReactNode;
  variant?: keyof typeof typography;
  style?: RNTextStyle;
  color?: keyof typeof colors;
};

export const Text: React.FC<TextProps> = ({ 
  children, 
  variant = 'body', 
  style, 
  color = 'text' 
}) => (
  <RNText style={[styles[variant], { color: colors[color] }, style]}>
    {children}
  </RNText>
);

const styles = StyleSheet.create(typography); 