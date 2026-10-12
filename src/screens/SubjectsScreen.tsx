import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { RootStackParamList, Subject } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SubjectsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { subjects } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>(subjects);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSubjects(subjects);
    } else {
      const q = searchQuery.toLowerCase().trim();
      setFilteredSubjects(
        subjects.filter(
          s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, subjects]);

  const renderItem = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      style={styles.itemBox}
      onPress={() => navigation.navigate('SubjectDetail', { subject: item })}>
      <Text style={styles.subjectName}>{item.name}</Text>
      <Text style={styles.line}>Mã môn: {item.code} | Số tín chỉ: {item.credits}</Text>
      <Text style={styles.line}>Giảng viên: {item.lecturer}</Text>
      <Text style={styles.line}>Phòng: {item.room} - {item.scheduleSummary}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm môn học..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={styles.countText}>
        Danh sách môn học ({filteredSubjects.length} môn):
      </Text>

      <FlatList
        data={filteredSubjects}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy môn học nào.</Text>
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
  emptyText: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
