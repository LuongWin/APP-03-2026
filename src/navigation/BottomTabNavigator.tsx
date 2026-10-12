import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabParamList } from '../types';

import { HomeScreen } from '../screens/HomeScreen';
import { SubjectsScreen } from '../screens/SubjectsScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { AssignmentsScreen } from '../screens/AssignmentsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

// 1. Icon Trang chủ nét đơn
const HomeIcon = ({ color }: { color: string }) => (
  <View style={iconStyles.container}>
    <View style={[iconStyles.roof, { borderBottomColor: color }]} />
    <View style={[iconStyles.houseBody, { borderColor: color }]} />
  </View>
);

// 2. Icon Môn học (3 vạch ngang nét đơn)
const SubjectsIcon = ({ color }: { color: string }) => (
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
const AssignmentsIcon = ({ color }: { color: string }) => (
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

export const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
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
        tabBarActiveTintColor: '#0066cc',
        tabBarInactiveTintColor: '#555555',
        tabBarStyle: {
          height: 56 + (insets.bottom > 0 ? insets.bottom : 8),
          paddingBottom: insets.bottom > 0 ? insets.bottom + 4 : 8,
          paddingTop: 6,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#cccccc',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />

      <Tab.Screen
        name="SubjectsTab"
        component={SubjectsScreen}
        options={{
          title: 'Môn học',
          tabBarLabel: 'Môn học',
          tabBarIcon: ({ color }) => <SubjectsIcon color={color} />,
        }}
      />

      <Tab.Screen
        name="ScheduleTab"
        component={ScheduleScreen}
        options={{
          title: 'Thời khóa biểu',
          tabBarLabel: 'Lịch học',
          tabBarIcon: ({ color }) => <ScheduleIcon color={color} />,
        }}
      />

      <Tab.Screen
        name="AssignmentsTab"
        component={AssignmentsScreen}
        options={{
          title: 'Bài tập',
          tabBarLabel: 'Bài tập',
          tabBarIcon: ({ color }) => <AssignmentsIcon color={color} />,
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Cá nhân & Điểm',
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

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
  // Subjects
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
