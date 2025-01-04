import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList, TabParamList } from './types';

import Dashboard from '../screens/Dashboard';
import TaskManager from '../screens/TaskManager';
import GroceryManager from '../screens/GroceryManager';
import BudgetTracker from '../screens/BudgetTracker';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: RouteProp<TabParamList> }): BottomTabNavigationOptions => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'home';

          switch (route.name) {
            case 'Dashboard':
              iconName = 'home';
              break;
            case 'Tasks':
              iconName = 'checkbox-marked-outline';
              break;
            case 'Grocery':
              iconName = 'cart';
              break;
            case 'Budget':
              iconName = 'wallet';
              break;
          }

          return MaterialCommunityIcons.getImageSource(iconName, size, color);
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Tasks" component={TaskManager} />
      <Tab.Screen name="Grocery" component={GroceryManager} />
      <Tab.Screen name="Budget" component={BudgetTracker} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 