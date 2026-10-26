// src/navigation/ProfileStack.tsx
// Luồng điều hướng cho Tab Cá nhân & Điểm

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import GradeListScreen from '../screens/profile/GradeListScreen';
import GradeDetailScreen from '../screens/profile/GradeDetailScreen';
import { ROUTES } from './routes';
import colors from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.PROFILE}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{ title: 'Thông tin sinh viên' }}
      />
      <Stack.Screen
        name={ROUTES.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{ title: 'Chỉnh sửa thông tin' }}
      />
      <Stack.Screen
        name={ROUTES.GRADE_LIST}
        component={GradeListScreen}
        options={{ title: 'Bảng điểm chi tiết' }}
      />
      <Stack.Screen
        name={ROUTES.GRADE_DETAIL}
        component={GradeDetailScreen}
        options={{ title: 'Chi tiết điểm môn học' }}
      />
    </Stack.Navigator>
  );
}
