import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  Switch
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface PositionFormData {
  positionName: string;
  positionStatus: 'ACTIVE' | 'INACTIVE';
  description: string;
}

interface PositionFormProps {
  visible: boolean;
  position: Partial<PositionFormData> | null;
  onClose: () => void;
  onSubmit: (data: PositionFormData) => void;
  isEditing: boolean;
}

const PositionForm: React.FC<PositionFormProps> = ({ 
  visible, 
  position, 
  onClose, 
  onSubmit,
  isEditing 
}) => {
  const [formData, setFormData] = useState<PositionFormData>({
    positionName: '',
    positionStatus: 'ACTIVE',
    description: ''
  });

  useEffect(() => {
    if (position) {
      setFormData({
        positionName: position.positionName || '',
        positionStatus: position.positionStatus || 'ACTIVE',
        description: position.description || ''
      });
    } else {
      setFormData({
        positionName: '',
        positionStatus: 'ACTIVE',
        description: ''
      });
    }
  }, [position]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleStatus = () => {
    setFormData(prev => ({
      ...prev,
      positionStatus: prev.positionStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    }));
  };

  const handleSubmit = () => {
    if (!formData.positionName.trim() || !formData.description.trim()) {
      return;
    }
    onSubmit(formData);
  };

  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {isEditing ? 'Chỉnh sửa vị trí' : 'Thêm vị trí mới'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#757575" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tên vị trí *</Text>
              <TextInput
                style={styles.input}
                value={formData.positionName}
                onChangeText={(text) => handleChange('positionName', text)}
                placeholder="Nhập tên vị trí"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Mô tả công việc *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => handleChange('description', text)}
                placeholder="Mô tả chi tiết công việc"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={[styles.formGroup, styles.statusContainer]}>
              <Text style={styles.label}>Trạng thái</Text>
              <Switch
                value={formData.positionStatus === 'ACTIVE'}
                onValueChange={toggleStatus}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={formData.positionStatus === 'ACTIVE' ? '#2196F3' : '#f4f3f4'}
              />
              <Text style={styles.statusText}>
                {formData.positionStatus === 'ACTIVE' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.submitButton,
                (!formData.positionName.trim() || !formData.description.trim()) && styles.disabledButton
              ]} 
              onPress={handleSubmit}
              disabled={!formData.positionName.trim() || !formData.description.trim()}
            >
              <Text style={styles.submitButtonText}>
                {isEditing ? 'Cập nhật' : 'Thêm mới'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#212121',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  statusText: {
    marginLeft: 10,
    color: '#424242',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  submitButton: {
    backgroundColor: '#2196F3',
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: '#757575',
    fontWeight: '500',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default PositionForm;