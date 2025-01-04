import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
import { colors, typography, spacing } from '../theme';

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcome}>Welcome to HomeAI</Text>
      
      <Card>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Shopping List</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Budget Overview</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  welcome: {
    ...typography.h1,
    margin: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
});

export default Dashboard; 