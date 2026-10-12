import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useApp } from '../context/AppContext';

type AssignmentDetailRouteProp = RouteProp<
  RootStackParamList,
  'AssignmentDetail'
>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AssignmentDetailScreen: React.FC = () => {
  const route = useRoute<AssignmentDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { assignments, toggleAssignment } = useApp();

  const { assignment: initialAssignment } = route.params;
  const current =
    assignments.find(a => a.id === initialAssignment.id) || initialAssignment;

  const handleToggle = () => {
    toggleAssignment(current.id);
    Alert.alert(
      'Thông báo',
      `Đã chuyển trạng thái sang: ${
        !current.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'
      }`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.line}>Môn học: <Text style={styles.bold}>{current.subjectName}</Text></Text>
        <Text style={styles.line}>Mã môn: <Text style={styles.bold}>{current.subjectCode}</Text></Text>
        <Text style={styles.line}>
          Hạn nộp: <Text style={styles.deadlineText}>{current.deadline}</Text>
        </Text>
        <Text style={styles.line}>
          Trạng thái:{' '}
          <Text style={current.isCompleted ? styles.doneText : styles.pendingText}>
            {current.isCompleted ? 'Đã hoàn thành' : 'Chưa nộp bài'}
          </Text>
        </Text>
        <Text style={styles.line}>Yêu cầu: {current.description}</Text>
      </View>

      <TouchableOpacity
        style={current.isCompleted ? styles.btnUndo : styles.btnDone}
        onPress={handleToggle}>
        <Text style={styles.btnText}>
          {current.isCompleted ? 'Chuyển sang Chưa nộp' : 'Đánh dấu Đã hoàn thành'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>Quay lại danh sách</Text>
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
  line: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: '#111111',
  },
  deadlineText: {
    color: '#cc0000',
    fontWeight: 'bold',
  },
  doneText: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  pendingText: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  btnDone: {
    backgroundColor: '#2e7d32',
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnUndo: {
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
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
