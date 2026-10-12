import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type ScheduleDetailRouteProp = RouteProp<RootStackParamList, 'ScheduleDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ScheduleDetailScreen: React.FC = () => {
  const route = useRoute<ScheduleDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { schedule } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>{schedule.subjectName}</Text>
        <Text style={styles.line}>Mã môn học: <Text style={styles.bold}>{schedule.subjectCode}</Text></Text>
        <Text style={styles.line}>Ngày học: <Text style={styles.bold}>{schedule.dayOfWeek}</Text></Text>
        <Text style={styles.line}>Thời gian: <Text style={styles.bold}>{schedule.time}</Text></Text>
        <Text style={styles.line}>Phòng học: <Text style={styles.bold}>{schedule.room}</Text></Text>
        <Text style={styles.line}>Giảng viên: {schedule.lecturer}</Text>
        <Text style={styles.line}>Ghi chú: {schedule.note || 'Không có ghi chú'}</Text>
      </View>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>Quay lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  box: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: 4,
  },
  line: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: '#111111',
  },
  backBtn: {
    backgroundColor: '#0066cc',
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
