// src/utils/validators.ts
// Kiểm tra tính hợp lệ của dữ liệu biểu mẫu

export function validateAssignment(title?: string, dueDate?: string): { isValid: boolean; error?: string } {
  if (!title || !title.trim()) {
    return { isValid: false, error: 'Tiêu đề bài tập không được để trống' };
  }

  if (!dueDate) {
    return { isValid: false, error: 'Vui lòng chọn hạn nộp' };
  }

  const due = new Date(dueDate).getTime();
  const now = new Date().getTime();
  if (due <= now) {
    return { isValid: false, error: 'Hạn nộp không được ở trong quá khứ' };
  }

  return { isValid: true };
}

export function validateStudent(fullName?: string, email?: string, phone?: string): { isValid: boolean; error?: string } {
  if (!fullName || !fullName.trim()) {
    return { isValid: false, error: 'Họ và tên không được để trống' };
  }

  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email không được để trống' };
  }

  if (!phone || !phone.trim()) {
    return { isValid: false, error: 'Số điện thoại không được để trống' };
  }

  return { isValid: true };
}
