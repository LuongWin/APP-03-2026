// src/navigation/CourseStack.tsx
// Luồng điều hướng cho Tab Môn học

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CourseListScreen from '../screens/courses/CourseListScreen';
import CourseDetailScreen from '../screens/courses/CourseDetailScreen';
import { ROUTES } from './routes';
import colors from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function CourseStack() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.COURSE_LIST}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={ROUTES.COURSE_LIST}
        component={CourseListScreen}
        options={{ title: 'Danh sách môn học' }}
      />
      <Stack.Screen
        name={ROUTES.COURSE_DETAIL}
        component={CourseDetailScreen}
        options={{ title: 'Chi tiết môn học' }}
      />
    </Stack.Navigator>
  );
}
