import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { RootStackParamList, Assignment } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type FilterType = 'ALL' | 'PENDING' | 'COMPLETED';

export const AssignmentsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { assignments, toggleAssignment } = useApp();

  const [filter, setFilter] = useState<FilterType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = assignments.filter(item => {
    const matchesFilter =
      filter === 'ALL'
        ? true
        : filter === 'PENDING'
        ? !item.isCompleted
        : item.isCompleted;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      item.title.toLowerCase().includes(q) ||
      item.subjectName.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const handleToggle = (item: Assignment) => {
    toggleAssignment(item.id);
    Alert.alert(
      'Thông báo',
      `Đã chuyển bài "${item.title}" sang: ${
        !item.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'
      }`
    );
  };

  const renderItem = ({ item }: { item: Assignment }) => (
    <View style={styles.itemBox}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AssignmentDetail', { assignment: item })
        }>
        <Text style={styles.subjectName}>{item.subjectName}</Text>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.line}>Hạn nộp: <Text style={styles.deadlineText}>{item.deadline}</Text></Text>
        <Text style={styles.line}>
          Trạng thái:{' '}
          <Text style={item.isCompleted ? styles.statusDone : styles.statusPending}>
            {item.isCompleted ? 'Đã nộp bài' : 'Chưa nộp'}
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toggleBtn}
        onPress={() => handleToggle(item)}>
        <Text style={styles.toggleBtnText}>
          {item.isCompleted ? 'Đánh dấu Chưa làm' : 'Đánh dấu Đã nộp'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm bài tập..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* 3 nút lọc cơ bản */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === 'ALL' && styles.filterBtnActive]}
          onPress={() => setFilter('ALL')}>
          <Text style={[styles.filterText, filter === 'ALL' && styles.filterTextActive]}>
            Tất cả ({assignments.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === 'PENDING' && styles.filterBtnActive]}
          onPress={() => setFilter('PENDING')}>
          <Text style={[styles.filterText, filter === 'PENDING' && styles.filterTextActive]}>
            Chưa làm ({assignments.filter(a => !a.isCompleted).length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === 'COMPLETED' && styles.filterBtnActive]}
          onPress={() => setFilter('COMPLETED')}>
          <Text style={[styles.filterText, filter === 'COMPLETED' && styles.filterTextActive]}>
            Đã nộp ({assignments.filter(a => a.isCompleted).length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có bài tập nào.</Text>
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
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 14,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterBtn: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 2,
  },
  filterBtnActive: {
    backgroundColor: '#0066cc',
  },
  filterText: {
    fontSize: 12,
    color: '#333333',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  itemBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 12,
    color: '#0066cc',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 4,
  },
  line: {
    fontSize: 12,
    color: '#444444',
    marginBottom: 2,
  },
  deadlineText: {
    color: '#cc0000',
    fontWeight: 'bold',
  },
  statusDone: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  statusPending: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  toggleBtn: {
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  toggleBtnText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
