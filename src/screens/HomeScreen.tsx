import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { student, subjects, assignments } = useApp();

  const pendingAssignments = assignments.filter(item => !item.isCompleted);
  const completedAssignments = assignments.filter(item => item.isCompleted);

  return (
    <ScrollView style={styles.container}>
      {/* Thông tin sinh viên cơ bản */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>THÔNG TIN SINH VIÊN</Text>
        <Text style={styles.line}>Họ tên: <Text style={styles.bold}>{student.name}</Text></Text>
        <Text style={styles.line}>Mã SV: <Text style={styles.bold}>{student.studentCode}</Text></Text>
        <Text style={styles.line}>Lớp: {student.className} - Ngành: {student.major}</Text>
      </View>

      {/* Thống kê đơn giản */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>TỔNG QUAN HỌC KỲ</Text>
        <Text style={styles.line}>• Số môn đang học: {subjects.length} môn</Text>
        <Text style={styles.line}>• Bài tập chưa nộp: {pendingAssignments.length} bài</Text>
        <Text style={styles.line}>• Bài tập đã nộp: {completedAssignments.length} bài</Text>
      </View>

      {/* Danh sách môn học */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>DANH SÁCH MÔN HỌC ({subjects.length})</Text>
        {subjects.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => navigation.navigate('SubjectDetail', { subject: item })}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.subText}>Mã: {item.code} | {item.credits} tín chỉ | Phòng: {item.room}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách bài tập cần làm */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>BÀI TẬP CẦN NỘP ({pendingAssignments.length})</Text>
        {pendingAssignments.length === 0 ? (
          <Text style={styles.emptyText}>Đã hoàn thành hết bài tập.</Text>
        ) : (
          pendingAssignments.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() =>
                navigation.navigate('AssignmentDetail', { assignment: item })
              }>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.subText}>Môn: {item.subjectName}</Text>
              <Text style={styles.deadlineText}>Hạn nộp: {item.deadline}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
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
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 14,
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
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#111111',
  },
  item: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
    borderRadius: 4,
    padding: 8,
    marginTop: 6,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222222',
  },
  subText: {
    fontSize: 12,
    color: '#555555',
    marginTop: 2,
  },
  deadlineText: {
    fontSize: 12,
    color: '#cc0000',
    marginTop: 2,
  },
  emptyText: {
    fontSize: 13,
    color: '#666666',
    fontStyle: 'italic',
  },
});
