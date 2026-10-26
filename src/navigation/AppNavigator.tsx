// src/navigation/AppNavigator.tsx
// Bộ điều hướng gốc NavigationContainer bọc toàn bộ BottomTabNavigator

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';

export function AppNavigator() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;
