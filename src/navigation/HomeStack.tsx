// src/navigation/HomeStack.tsx
// Luồng điều hướng cho Tab Trang chủ

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import CourseDetailScreen from '../screens/courses/CourseDetailScreen';
import AssignmentDetailScreen from '../screens/assignments/AssignmentDetailScreen';
import { ROUTES } from './routes';
import colors from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ title: 'Tổng quan học tập' }}
      />
      <Stack.Screen
        name={ROUTES.COURSE_DETAIL}
        component={CourseDetailScreen}
        options={{ title: 'Chi tiết môn học' }}
      />
      <Stack.Screen
        name={ROUTES.ASSIGNMENT_DETAIL}
        component={AssignmentDetailScreen}
        options={{ title: 'Chi tiết bài tập' }}
      />
    </Stack.Navigator>
  );
}
