import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  useColorScheme,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Bt5Screen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    loadTodos();
  }, []);
  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos !== null) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách công việc');
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addTodo = () => {
    if (text.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập công việc');
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa công việc này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={[styles.todoItem, isDarkMode && styles.darkTodoItem]}>
      <TouchableOpacity 
        onPress={() => toggleTodo(item.id)}
        style={styles.todoContent}
      >
        <Ionicons 
          name={item.completed ? 'checkmark-circle' : 'ellipse-outline'} 
          size={24} 
          color={item.completed ? '#4CAF50' : (isDarkMode ? '#fff' : '#000')} 
          style={styles.checkbox}
        />
        <Text 
          style={[
            styles.todoText, 
            item.completed && styles.completedText,
            isDarkMode && styles.darkText
          ]}
          numberOfLines={2}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => deleteTodo(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Công việc của tôi</Text>
        <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>
          {todos.filter(todo => !todo.completed).length} việc chưa hoàn thành
        </Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Thêm công việc mới..."
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity 
          style={[styles.addButton, (!text.trim() || !text) && styles.disabledButton]}
          onPress={addTodo}
          disabled={!text.trim()}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-done-circle-outline" size={60} color={isDarkMode ? '#444' : '#ddd'} />
            <Text style={[styles.emptyText, isDarkMode && styles.darkText]}>
              Chưa có công việc nào
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  darkText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  darkInput: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
    color: '#fff',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 15,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkTodoItem: {
    backgroundColor: '#1e1e1e',
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
