import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui/Card';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { StatusItem } from '../components/ui/StatusItem';
import { ActionButton } from '../components/ui/ActionButton';
import { useAgent } from '../context/AgentContext';
import { AgentAction } from '../services/agent/types';
import { colors, spacing } from '../theme';

export const Dashboard = () => {
  const { isProcessing, lastAction } = useAgent();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Status Overview */}
        <Card variant="elevated" style={styles.statusCard}>
          <Text variant="h2">Home Status</Text>
          <View style={styles.statusGrid}>
            <StatusItem 
              icon="thermometer" 
              label="Temperature" 
              value="72°F" 
            />
            <StatusItem 
              icon="water-percent" 
              label="Humidity" 
              value="45%" 
            />
            <StatusItem 
              icon="lightbulb" 
              label="Lights" 
              value="4 On" 
            />
            <StatusItem 
              icon="shield-check" 
              label="Security" 
              value="Armed" 
            />
          </View>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Text variant="h2">Quick Actions</Text>
          <View style={styles.actionButtons}>
            <ActionButton 
              icon="food" 
              label="Order Groceries" 
              onPress={() => {}} 
            />
            <ActionButton 
              icon="calendar" 
              label="Schedule Tasks" 
              onPress={() => {}} 
            />
            <ActionButton 
              icon="chart-line" 
              label="View Budget" 
              onPress={() => {}} 
            />
          </View>
        </Card>

        {/* AI Assistant */}
        <Card variant="outlined" style={styles.aiCard}>
          <Text variant="h2">AI Assistant</Text>
          <Text variant="body">
            {isProcessing 
              ? "Thinking..." 
              : lastAction?.reason || "How can I help you today?"}
          </Text>
          <Button 
            label="Ask Assistant"
            onPress={() => {}}
            style={styles.askButton}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statusCard: {
    margin: spacing.md,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  actionsCard: {
    margin: spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.sm,
  },
  aiCard: {
    margin: spacing.md,
  },
  askButton: {
    marginTop: spacing.md,
  },
}); 