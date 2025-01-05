import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from './Text';
import { colors, spacing } from '@/theme';

type ActionButtonProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Icon name={icon} size={24} color={colors.primary} />
    </View>
    <View>
      <Text variant="caption" style={styles.label}>
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    textAlign: 'center',
  },
}); 