import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { RootStackParamList, ScheduleItem } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DAYS = [
  'Tất cả',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
];

export const ScheduleScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { schedules } = useApp();
  const [selectedDay, setSelectedDay] = useState('Tất cả');

  const filtered =
    selectedDay === 'Tất cả'
      ? schedules
      : schedules.filter(s => s.dayOfWeek === selectedDay);

  const renderItem = ({ item }: { item: ScheduleItem }) => (
    <TouchableOpacity
      style={styles.itemBox}
      onPress={() => navigation.navigate('ScheduleDetail', { schedule: item })}>
      <Text style={styles.timeTitle}>
        {item.dayOfWeek} ({item.time})
      </Text>
      <Text style={styles.subjectName}>{item.subjectName}</Text>
      <Text style={styles.line}>Mã môn: {item.subjectCode} | Phòng: {item.room}</Text>
      <Text style={styles.line}>Giảng viên: {item.lecturer}</Text>
      {item.note ? <Text style={styles.noteLine}>Ghi chú: {item.note}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Nút lọc thứ đơn giản */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DAYS.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.filterBtn,
                selectedDay === day && styles.filterBtnActive,
              ]}
              onPress={() => setSelectedDay(day)}>
              <Text
                style={[
                  styles.filterBtnText,
                  selectedDay === day && styles.filterBtnTextActive,
                ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.countText}>
        Lịch học ({filtered.length} buổi):
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có lịch học nào.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  filterBar: {
    marginBottom: 8,
  },
  filterBtn: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 6,
  },
  filterBtnActive: {
    backgroundColor: '#0066cc',
  },
  filterBtnText: {
    fontSize: 12,
    color: '#333333',
  },
  filterBtnTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  countText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  itemBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  timeTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 2,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 3,
  },
  line: {
    fontSize: 12,
    color: '#444444',
    marginBottom: 2,
  },
  noteLine: {
    fontSize: 12,
    color: '#888888',
    fontStyle: 'italic',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
