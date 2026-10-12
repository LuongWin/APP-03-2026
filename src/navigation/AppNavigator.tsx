import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import { BottomTabNavigator } from './BottomTabNavigator';
import { SubjectDetailScreen } from '../screens/SubjectDetailScreen';
import { ScheduleDetailScreen } from '../screens/ScheduleDetailScreen';
import { AssignmentDetailScreen } from '../screens/AssignmentDetailScreen';
import { GradeDetailScreen } from '../screens/GradeDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0066cc',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SubjectDetail"
          component={SubjectDetailScreen}
          options={{ title: 'Chi tiết môn học' }}
        />

        <Stack.Screen
          name="ScheduleDetail"
          component={ScheduleDetailScreen}
          options={{ title: 'Chi tiết buổi học' }}
        />

        <Stack.Screen
          name="AssignmentDetail"
          component={AssignmentDetailScreen}
          options={{ title: 'Chi tiết bài tập' }}
        />

        <Stack.Screen
          name="GradeDetail"
          component={GradeDetailScreen}
          options={{ title: 'Bảng điểm chi tiết' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
