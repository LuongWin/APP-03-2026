// src/config.js
// Cấu hình URL server, timeout và thời gian sống của cache

export const BASE_URL = 'http://10.0.2.2:3000'; // Dùng 10.0.2.2 cho máy ảo Android kết nối localhost máy tính
// export const BASE_URL = 'http://192.168.1.x:3000'; // Dùng IP LAN nếu chạy trên điện thoại thật cùng Wi-Fi

export const TIMEOUT = 10000; // Hết hạn kết nối sau 10 giây (theo yêu cầu đề bài)

export const CACHE_TTL = 24 * 60 * 60 * 1000; // Thời gian giữ cache: 24 giờ
