import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, ViewStyle } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/theme';
import { AgentProvider } from './src/context/AgentContext';

const App = () => {
  return (
    <AgentProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <AppNavigator />
      </SafeAreaView>
    </AgentProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  } as const,
});

export default App; 