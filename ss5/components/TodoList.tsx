import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { TodoItem } from './TodoItem';

type TodoItemType = {
  id: string;
  text: string;
};

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([
    { id: '1', text: 'Học React Native' },
    { id: '2', text: 'Làm bài tập' },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập công việc');
      return;
    }

    const newTodoItem: TodoItemType = {
      id: Date.now().toString(),
      text: newTodo.trim(),
    };

    setTodos(prevTodos => [newTodoItem, ...prevTodos]);
    setNewTodo('');
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc mới..."
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <Button
          title="Thêm"
          onPress={addTodo}
          color="#007AFF"
        />
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            task={item.text}
            onDelete={() => deleteTodo(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có công việc nào</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});
