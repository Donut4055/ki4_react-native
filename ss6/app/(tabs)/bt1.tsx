import React from 'react';
import { StyleSheet, View, FlatList, Text, SafeAreaView } from 'react-native';

type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
};

const EmployeeList = () => {
  const employees: Employee[] = [
    { id: '1', name: 'Nguyễn Văn A', position: 'Developer', department: 'IT' },
    { id: '2', name: 'Trần Thị B', position: 'Designer', department: 'Design' },
    { id: '3', name: 'Lê Văn C', position: 'Manager', department: 'HR' },
    { id: '4', name: 'Phạm Thị D', position: 'Tester', department: 'QA' },
    { id: '5', name: 'Hoàng Văn E', position: 'DevOps', department: 'IT' },
    { id: '6', name: 'Vũ Thị F', position: 'Analyst', department: 'Business' },
    { id: '7', name: 'Đặng Văn G', position: 'Developer', department: 'IT' },
    { id: '8', name: 'Bùi Thị H', position: 'Designer', department: 'Design' },
    { id: '9', name: 'Đỗ Văn I', position: 'Manager', department: 'Sales' },
    { id: '10', name: 'Hồ Thị K', position: 'Marketer', department: 'Marketing' },
  ];

  const renderItem = ({ item }: { item: Employee }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.position}>{item.position}</Text>
      <Text style={styles.department}>{item.department}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách nhân viên</Text>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  position: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  department: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default EmployeeList;
