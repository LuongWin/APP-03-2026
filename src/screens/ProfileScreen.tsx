import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { student, updateStudent, grades } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [phone, setPhone] = useState(student.phone);

  const totalCredits = grades.reduce((s, g) => s + g.credits, 0);
  const gpa =
    grades.reduce((s, g) => s + g.gpaScore * g.credits, 0) / (totalCredits || 1);

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }
    updateStudent({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    setIsModalOpen(false);
    Alert.alert('Thành công', 'Đã lưu thông tin mới.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Box thông tin cá nhân */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>THÔNG TIN CÁ NHÂN</Text>
        <Text style={styles.line}>Họ và tên: <Text style={styles.bold}>{student.name}</Text></Text>
        <Text style={styles.line}>Mã sinh viên: <Text style={styles.bold}>{student.studentCode}</Text></Text>
        <Text style={styles.line}>Lớp sinh hoạt: {student.className}</Text>
        <Text style={styles.line}>Ngành đào tạo: {student.major}</Text>
        <Text style={styles.line}>Khóa học: {student.academicYear}</Text>
        <Text style={styles.line}>Email: {student.email}</Text>
        <Text style={styles.line}>Số điện thoại: {student.phone}</Text>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => {
            setName(student.name);
            setEmail(student.email);
            setPhone(student.phone);
            setIsModalOpen(true);
          }}>
          <Text style={styles.btnTextSecondary}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
      </View>

      {/* Box kết quả học tập */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>KẾT QUẢ HỌC TẬP</Text>
        <Text style={styles.line}>• Điểm GPA (hệ 4.0): <Text style={styles.bold}>{gpa.toFixed(2)}</Text></Text>
        <Text style={styles.line}>• Tổng số tín chỉ: <Text style={styles.bold}>{totalCredits}</Text></Text>
        <Text style={styles.line}>
          • Xếp loại học tập:{' '}
          <Text style={styles.bold}>
            {gpa >= 3.6 ? 'Xuất sắc' : gpa >= 3.2 ? 'Giỏi' : gpa >= 2.5 ? 'Khá' : 'Trung bình'}
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => navigation.navigate('GradeDetail')}>
          <Text style={styles.btnTextPrimary}>Xem bảng điểm chi tiết</Text>
        </TouchableOpacity>
      </View>

      {/* Modal chỉnh sửa */}
      <Modal visible={isModalOpen} animationType="slide" transparent={true}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Cập nhật thông tin</Text>

            <Text style={styles.inputLabel}>Họ tên:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.inputLabel}>Email:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />

            <Text style={styles.inputLabel}>Số điện thoại:</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setIsModalOpen(false)}>
                <Text style={styles.modalCancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSave}>
                <Text style={styles.modalSaveText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: '#111111',
  },
  btnSecondary: {
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  btnTextSecondary: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },
  btnPrimary: {
    backgroundColor: '#0066cc',
    borderRadius: 4,
    paddingVertical: 9,
    alignItems: 'center',
    marginTop: 8,
  },
  btnTextPrimary: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    color: '#444444',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 38,
    fontSize: 13,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  modalCancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  modalCancelText: {
    color: '#666666',
  },
  modalSaveBtn: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  modalSaveText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
