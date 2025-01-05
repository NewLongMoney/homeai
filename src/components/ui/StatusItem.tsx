import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from './Text';
import { colors, spacing } from '@/theme';

type StatusItemProps = {
  icon: string;
  label: string;
  value: string;
};

export const StatusItem: React.FC<StatusItemProps> = ({ icon, label, value }) => (
  <View style={styles.container}>
    <Icon name={icon} size={24} color={colors.primary} />
    <View>
      <Text variant="caption" color="textSecondary" style={styles.label}>
        {label}
      </Text>
    </View>
    <View>
      <Text variant="body" style={styles.value}>
        {value}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.sm,
    width: '48%',
    marginBottom: spacing.md,
  },
  label: {
    marginTop: spacing.xs,
  },
  value: {
    marginTop: spacing.xs,
    fontWeight: '600',
  },
}); 