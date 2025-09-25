import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TodoItem from '../../components/TodoItem';

interface Note {
  id: string;
  text: string;
  createdAt: number;
}

const NotesScreen: React.FC = () => {
  const [noteText, setNoteText] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = () => {
    if (noteText.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung ghi chú');
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      text: noteText.trim(),
      createdAt: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setNoteText('');
  };

  const handleDeleteNote = (id: string) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa ghi chú này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            setNotes(notes.filter(note => note.id !== id));
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập ghi chú mới..."
          value={noteText}
          onChangeText={setNoteText}
          onSubmitEditing={handleAddNote}
          returnKeyType="done"
        />
        <TouchableOpacity 
          style={[styles.addButton, !noteText && styles.disabledButton]}
          onPress={handleAddNote}
          disabled={!noteText}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.notesTitle}>
        {notes.length > 0 ? `Có ${notes.length} ghi chú` : 'Chưa có ghi chú nào'}
      </Text>

      <ScrollView 
        style={styles.notesContainer}
        contentContainerStyle={styles.notesContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {notes.map((note) => (
          <TodoItem
            key={note.id}
            id={note.id}
            text={note.text}
            onDelete={handleDeleteNote}
          />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
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
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#555',
  },
  notesContainer: {
    flex: 1,
  },
  notesContentContainer: {
    paddingBottom: 20,
  },
});

export default NotesScreen;
