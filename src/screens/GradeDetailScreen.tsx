import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

export const GradeDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const { grades, student } = useApp();

  const totalCredits = grades.reduce((acc, g) => acc + g.credits, 0);
  const weightedGpa4 =
    grades.reduce((acc, g) => acc + g.gpaScore * g.credits, 0) /
    (totalCredits || 1);
  const weightedGpa10 =
    grades.reduce((acc, g) => acc + g.totalScore * g.credits, 0) /
    (totalCredits || 1);

  const getRank = (gpa: number) => {
    if (gpa >= 3.6) return 'Xuất sắc';
    if (gpa >= 3.2) return 'Giỏi';
    if (gpa >= 2.5) return 'Khá';
    if (gpa >= 2.0) return 'Trung bình';
    return 'Yếu';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Box tổng kết */}
      <View style={styles.box}>
        <Text style={styles.title}>KẾT QUẢ HỌC TẬP TỔNG HỢP</Text>
        <Text style={styles.line}>Sinh viên: <Text style={styles.bold}>{student.name}</Text> ({student.studentCode})</Text>
        <Text style={styles.line}>Lớp: {student.className} - Ngành: {student.major}</Text>
        <Text style={styles.line}>• Điểm GPA (Hệ 4.0): <Text style={styles.bold}>{weightedGpa4.toFixed(2)}</Text></Text>
        <Text style={styles.line}>• Điểm TB (Hệ 10): <Text style={styles.bold}>{weightedGpa10.toFixed(2)}</Text></Text>
        <Text style={styles.line}>• Tín chỉ tích lũy: <Text style={styles.bold}>{totalCredits}</Text></Text>
        <Text style={styles.line}>• Xếp loại học lực: <Text style={styles.bold}>{getRank(weightedGpa4)}</Text></Text>
      </View>

      {/* Danh sách điểm chi tiết */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>CHI TIẾT ĐIỂM CÁC MÔN HỌC ({grades.length})</Text>
        {grades.map(item => (
          <View key={item.subjectId} style={styles.item}>
            <Text style={styles.itemTitle}>{item.subjectName}</Text>
            <Text style={styles.subText}>Mã môn: {item.subjectCode} | Số tín chỉ: {item.credits}</Text>
            <Text style={styles.subText}>
              Chuyên cần: {item.attendanceScore} | Giữa kỳ: {item.midtermScore} | Cuối kỳ: {item.finalScore}
            </Text>
            <Text style={styles.scoreResult}>
              Tổng kết: {item.totalScore.toFixed(1)} (Hệ 10) | Điểm chữ: {item.letterGrade} | Hệ 4: {item.gpaScore.toFixed(1)}
            </Text>
          </View>
        ))}
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
    fontSize: 15,
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
  scoreResult: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0066cc',
    marginTop: 3,
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
