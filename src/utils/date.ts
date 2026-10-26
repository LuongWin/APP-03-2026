// src/utils/date.ts
// Tiện ích xử lý định dạng ngày giờ theo chuẩn tiếng Việt

/**
 * Định dạng chuỗi ISO thành dd/MM/yyyy, HH:mm
 */
export function formatDate(isoString?: string | null): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

/**
 * Kiểm tra xem bài tập có bị quá hạn hay không
 */
export function isOverdue(dueDate?: string, status?: string): boolean {
  if (!dueDate || status === 'done') return false;
  const due = new Date(dueDate).getTime();
  const now = new Date().getTime();
  return due < now;
}

/**
 * Tính số ngày còn lại đến hạn nộp
 */
export function daysLeft(dueDate?: string): number {
  if (!dueDate) return 0;
  const due = new Date(dueDate).getTime();
  const now = new Date().getTime();
  const diffTime = due - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
