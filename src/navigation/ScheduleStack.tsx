// src/navigation/ScheduleStack.tsx
// Luồng điều hướng cho Tab Thời khóa biểu

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import SessionDetailScreen from '../screens/schedule/SessionDetailScreen';
import { ROUTES } from './routes';
import colors from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function ScheduleStack() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SCHEDULE}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={ROUTES.SCHEDULE}
        component={ScheduleScreen}
        options={{ title: 'Lịch học trong tuần' }}
      />
      <Stack.Screen
        name={ROUTES.SESSION_DETAIL}
        component={SessionDetailScreen}
        options={{ title: 'Chi tiết buổi học' }}
      />
    </Stack.Navigator>
  );
}
