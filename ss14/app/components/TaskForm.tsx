import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface TaskFormProps {
  visible: boolean;
  task: {
    id?: string;
    title: string;
    completed?: boolean;
  } | null;
  onClose: () => void;
  onSubmit: (task: { title: string }) => void;
  isEditing: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  visible,
  task,
  onClose,
  onSubmit,
  isEditing,
}) => {
  const [title, setTitle] = React.useState(task?.title || '');

  React.useEffect(() => {
    setTitle(task?.title || '');
  }, [task]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({ title });
      setTitle('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {isEditing ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
          </Text>
          <TextInput
            style={styles.taskInput}
            placeholder="Nhập tên công việc..."
            value={title}
            onChangeText={setTitle}
            autoFocus
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.saveButton,
                !title.trim() && styles.disabledButton
              ]}
              onPress={handleSubmit}
              disabled={!title.trim()}
            >
              <Text style={styles.saveButtonText}>
                {isEditing ? 'Lưu' : 'Thêm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#212121',
  },
  taskInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  disabledButton: {
    opacity: 0.5,
  },
  cancelButtonText: {
    color: '#757575',
    fontWeight: '500',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default TaskForm;
