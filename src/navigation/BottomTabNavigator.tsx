// src/navigation/BottomTabNavigator.tsx
// Thanh điều hướng 5 Tab chính của ứng dụng với icon nét đơn tối giản và badge bài tập cần làm

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeStack from './HomeStack';
import CourseStack from './CourseStack';
import ScheduleStack from './ScheduleStack';
import AssignmentStack from './AssignmentStack';
import ProfileStack from './ProfileStack';

import { ROUTES } from './routes';
import { useAppData } from '../context/AppDataContext';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

// 1. Icon Trang chủ nét đơn
const HomeIcon = ({ color }: { color: string }) => (
  <View style={iconStyles.container}>
    <View style={[iconStyles.roof, { borderBottomColor: color }]} />
    <View style={[iconStyles.houseBody, { borderColor: color }]} />
  </View>
);

// 2. Icon Môn học (3 vạch ngang nét đơn)
const CourseIcon = ({ color }: { color: string }) => (
  <View style={[iconStyles.container, iconStyles.linesBox]}>
    <View style={[iconStyles.line, { backgroundColor: color }]} />
    <View style={[iconStyles.line, { backgroundColor: color }]} />
    <View style={[iconStyles.line, { backgroundColor: color }]} />
  </View>
);

// 3. Icon Thời khóa biểu (Ô lịch nét đơn)
const ScheduleIcon = ({ color }: { color: string }) => (
  <View style={[iconStyles.container, iconStyles.calBox, { borderColor: color }]}>
    <View style={[iconStyles.calHeader, { backgroundColor: color }]} />
    <View style={iconStyles.calBody}>
      <View style={[iconStyles.calDot, { backgroundColor: color }]} />
      <View style={[iconStyles.calDot, { backgroundColor: color }]} />
    </View>
  </View>
);

// 4. Icon Bài tập (Danh sách công việc nét đơn)
const AssignmentIcon = ({ color }: { color: string }) => (
  <View style={[iconStyles.container, iconStyles.taskBox, { borderColor: color }]}>
    <View style={[iconStyles.taskClip, { backgroundColor: color }]} />
    <View style={[iconStyles.taskLine, { backgroundColor: color }]} />
    <View style={[iconStyles.taskLine, { backgroundColor: color }]} />
  </View>
);

// 5. Icon Cá nhân (Hình người nét đơn)
const ProfileIcon = ({ color }: { color: string }) => (
  <View style={iconStyles.container}>
    <View style={[iconStyles.userHead, { borderColor: color }]} />
    <View style={[iconStyles.userBody, { borderColor: color }]} />
  </View>
);

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  const { assignments } = useAppData();

  // Đếm số bài tập chưa hoàn thành để gán badge lên tab Bài tập
  const todoCount = assignments.filter(a => a.status === 'todo').length;

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME_TAB}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          height: 56 + (insets.bottom > 0 ? insets.bottom : 8),
          paddingBottom: insets.bottom > 0 ? insets.bottom + 4 : 8,
          paddingTop: 6,
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={HomeStack}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />

      <Tab.Screen
        name={ROUTES.COURSE_TAB}
        component={CourseStack}
        options={{
          tabBarLabel: 'Môn học',
          tabBarIcon: ({ color }) => <CourseIcon color={color} />,
        }}
      />

      <Tab.Screen
        name={ROUTES.SCHEDULE_TAB}
        component={ScheduleStack}
        options={{
          tabBarLabel: 'Lịch học',
          tabBarIcon: ({ color }) => <ScheduleIcon color={color} />,
        }}
      />

      <Tab.Screen
        name={ROUTES.ASSIGNMENT_TAB}
        component={AssignmentStack}
        options={{
          tabBarLabel: 'Bài tập',
          tabBarBadge: todoCount > 0 ? todoCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.danger,
            fontSize: 10,
            lineHeight: 14,
          },
          tabBarIcon: ({ color }) => <AssignmentIcon color={color} />,
        }}
      />

      <Tab.Screen
        name={ROUTES.PROFILE_TAB}
        component={ProfileStack}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const iconStyles = StyleSheet.create({
  container: {
    width: 24,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Home
  roof: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  houseBody: {
    width: 13,
    height: 8,
    borderWidth: 1.5,
    borderTopWidth: 0,
  },
  // Courses
  linesBox: {
    justifyContent: 'space-evenly',
    paddingVertical: 3,
  },
  line: {
    width: 15,
    height: 2,
    borderRadius: 1,
  },
  // Schedule
  calBox: {
    width: 16,
    height: 15,
    borderWidth: 1.5,
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  calHeader: {
    height: 4,
    width: '100%',
  },
  calBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  calDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1,
  },
  // Assignments
  taskBox: {
    width: 14,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 2,
    alignItems: 'center',
    paddingTop: 2,
  },
  taskClip: {
    width: 6,
    height: 2,
    borderRadius: 1,
    marginBottom: 2,
  },
  taskLine: {
    width: 8,
    height: 1.5,
    borderRadius: 1,
    marginTop: 2,
  },
  // Profile
  userHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    marginBottom: 1,
  },
  userBody: {
    width: 15,
    height: 6,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderWidth: 1.5,
    borderBottomWidth: 0,
  },
});
