// src/screens/profile/EditProfileScreen.tsx
// Màn hình Chỉnh sửa thông tin sinh viên (Họ tên, Email, Số điện thoại)

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import FormInput from '../../components/common/FormInput';
import AppButton from '../../components/common/AppButton';
import { useAppData } from '../../context/AppDataContext';
import { useSync } from '../../context/SyncContext';
import { validateStudent } from '../../utils/validators';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function EditProfileScreen() {
  const navigation = useNavigation<any>();
  const { student, updateStudentInfo } = useAppData();
  const { isOnline } = useSync();

  const [fullName, setFullName] = useState(student?.fullName || '');
  const [email, setEmail] = useState(student?.email || '');
  const [phone, setPhone] = useState(student?.phone || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const validation = validateStudent(fullName, email, phone);
    if (!validation.isValid) {
      setErrors({ form: validation.error || 'Dữ liệu không hợp lệ' });
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const success = await updateStudentInfo({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });

      if (success) {
        if (!isOnline) {
          Alert.alert(
            'Lưu ngoại tuyến thành công',
            'Dữ liệu đã được lưu vào bộ nhớ đệm và sẽ tự động đồng bộ lên máy chủ khi có kết nối mạng.',
            [{ text: 'Đồng ý', onPress: () => navigation.goBack() }]
          );
        } else {
          Alert.alert('Thành công', 'Thông tin sinh viên đã được cập nhật!', [
            { text: 'Đồng ý', onPress: () => navigation.goBack() },
          ]);
        }
      }
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Không thể cập nhật thông tin');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenContainer scroll>
      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>CHỈNH SỬA THÔNG TIN CÁ NHÂN</Text>

        {/* Thông tin cố định */}
        <View style={styles.readOnlyBox}>
          <Text style={styles.readOnlyLabel}>
            Mã sinh viên: <Text style={styles.readOnlyValue}>{student?.studentCode || '—'}</Text>
          </Text>
          <Text style={styles.readOnlyLabel}>
            Lớp sinh hoạt: <Text style={styles.readOnlyValue}>{student?.className || '—'}</Text>
          </Text>
          <Text style={styles.readOnlyLabel}>
            Ngành học: <Text style={styles.readOnlyValue}>{student?.major || '—'}</Text>
          </Text>
        </View>

        {/* Các trường cho phép chỉnh sửa */}
        <FormInput
          label="Họ và tên sinh viên (*)"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Nhập họ và tên..."
        />

        <FormInput
          label="Địa chỉ Email (*)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="example@student.ptit.edu.vn"
        />

        <FormInput
          label="Số điện thoại liên hệ (*)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="0987654321"
        />

        {errors.form ? <Text style={styles.formError}>{errors.form}</Text> : null}

        <View style={styles.btnRow}>
          <AppButton
            title={submitting ? 'Đang lưu…' : 'Lưu thay đổi'}
            variant="primary"
            onPress={handleSubmit}
            disabled={submitting}
          />
          <AppButton
            title="Hủy bỏ"
            variant="outline"
            onPress={() => navigation.goBack()}
            disabled={submitting}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: spacing.md,
    margin: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.xs,
  },
  readOnlyBox: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 4,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  readOnlyLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 2,
  },
  readOnlyValue: {
    fontWeight: 'bold',
    color: colors.text,
  },
  formError: {
    ...typography.caption,
    color: colors.danger,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  btnRow: {
    marginTop: spacing.sm,
  },
});
