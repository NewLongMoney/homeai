import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

const TaskManager = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
  },
});

export default TaskManager; 