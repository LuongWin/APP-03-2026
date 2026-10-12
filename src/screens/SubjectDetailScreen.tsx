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
import { RootStackParamList, Assignment } from '../types';
import { useApp } from '../context/AppContext';

type SubjectDetailRouteProp = RouteProp<RootStackParamList, 'SubjectDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SubjectDetailScreen: React.FC = () => {
  const route = useRoute<SubjectDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { assignments } = useApp();

  const { subject } = route.params;
  const subjectAssignments = assignments.filter(
    item => item.subjectId === subject.id || item.subjectCode === subject.code
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>{subject.name}</Text>
        <Text style={styles.line}>Mã môn học: <Text style={styles.bold}>{subject.code}</Text></Text>
        <Text style={styles.line}>Số tín chỉ: <Text style={styles.bold}>{subject.credits}</Text></Text>
        <Text style={styles.line}>Giảng viên: {subject.lecturer}</Text>
        <Text style={styles.line}>Email giảng viên: {subject.emailLecturer}</Text>
        <Text style={styles.line}>Phòng học: {subject.room}</Text>
        <Text style={styles.line}>Thời khóa biểu: {subject.scheduleSummary}</Text>
        <Text style={styles.line}>Mô tả: {subject.description}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>BÀI TẬP CỦA MÔN ({subjectAssignments.length})</Text>
        {subjectAssignments.length === 0 ? (
          <Text style={styles.emptyText}>Chưa có bài tập nào cho môn này.</Text>
        ) : (
          subjectAssignments.map((asn: Assignment) => (
            <TouchableOpacity
              key={asn.id}
              style={styles.item}
              onPress={() =>
                navigation.navigate('AssignmentDetail', { assignment: asn })
              }>
              <Text style={styles.itemTitle}>{asn.title}</Text>
              <Text style={styles.subText}>Hạn nộp: {asn.deadline}</Text>
              <Text style={asn.isCompleted ? styles.doneText : styles.pendingText}>
                Trạng thái: {asn.isCompleted ? 'Đã nộp' : 'Chưa nộp'}
              </Text>
            </TouchableOpacity>
          ))
        )}
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
    marginBottom: 10,
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
  boxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
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
    borderColor: '#eeeeee',
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
  doneText: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginTop: 2,
  },
  pendingText: {
    fontSize: 12,
    color: '#d9534f',
    fontWeight: 'bold',
    marginTop: 2,
  },
  emptyText: {
    fontSize: 13,
    color: '#777777',
    fontStyle: 'italic',
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
