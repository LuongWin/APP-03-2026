// src/utils/gpa.ts
// Quy đổi và tính toán điểm GPA theo quy định của trường

/**
 * Quy đổi điểm hệ 10 sang điểm hệ 4 và điểm chữ
 */
export function toScale4(score10: number): { gpaScore: number; letter: string } {
  if (score10 >= 8.5) return { gpaScore: 4.0, letter: 'A' };
  if (score10 >= 8.0) return { gpaScore: 3.5, letter: 'B+' };
  if (score10 >= 7.0) return { gpaScore: 3.0, letter: 'B' };
  if (score10 >= 6.5) return { gpaScore: 2.5, letter: 'C+' };
  if (score10 >= 5.5) return { gpaScore: 2.0, letter: 'C' };
  if (score10 >= 5.0) return { gpaScore: 1.5, letter: 'D+' };
  if (score10 >= 4.0) return { gpaScore: 1.0, letter: 'D' };
  return { gpaScore: 0.0, letter: 'F' };
}

/**
 * Tính điểm trung bình tích lũy GPA hệ 4 có trọng số tín chỉ
 * Quy định: Môn điểm F không tính vào số tín chỉ tích lũy
 */
export function calcGpa(
  grades: Array<{ total?: number; course?: { credits?: number }; courseId?: number }>,
  courses: Array<{ id: number; credits: number }> = []
): { gpa: number; totalCredits: number; rank: string } {
  if (!grades || grades.length === 0) {
    return { gpa: 0, totalCredits: 0, rank: 'Chưa có điểm' };
  }

  let totalWeightedScore = 0;
  let totalCredits = 0;

  grades.forEach(g => {
    // Tìm số tín chỉ của môn học
    const courseCredits =
      g.course?.credits ||
      courses.find(c => c.id === g.courseId)?.credits ||
      3;

    const total10 = g.total ?? 0;
    const { gpaScore, letter } = toScale4(total10);

    // Môn F không tính vào tín chỉ tích lũy
    if (letter !== 'F') {
      totalWeightedScore += gpaScore * courseCredits;
      totalCredits += courseCredits;
    }
  });

  const gpa = totalCredits > 0 ? totalWeightedScore / totalCredits : 0;

  let rank = 'Trung bình';
  if (gpa >= 3.6) rank = 'Xuất sắc';
  else if (gpa >= 3.2) rank = 'Giỏi';
  else if (gpa >= 2.5) rank = 'Khá';
  else if (gpa >= 2.0) rank = 'Trung bình';
  else rank = 'Yếu';

  return {
    gpa: Number(gpa.toFixed(2)),
    totalCredits,
    rank,
  };
}
