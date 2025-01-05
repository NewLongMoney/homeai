import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  ViewStyle as RNViewStyle, 
  ActivityIndicator,
  View 
} from 'react-native';
import { Text } from './Text';
import { colors, spacing } from '@/theme';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: RNViewStyle;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}) => (
  <TouchableOpacity
    style={[styles.base, styles[variant], disabled && styles.disabled, style]}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.background} />
    ) : (
      <View>
        <Text
          variant="body"
          color={variant === 'outline' ? 'primary' : 'background'}
          style={styles.label}
        >
          {label}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontWeight: '600',
  },
}); 