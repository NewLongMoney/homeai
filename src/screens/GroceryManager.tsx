import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

const GroceryManager = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery Manager</Text>
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

export default GroceryManager; 