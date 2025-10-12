import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useProducts } from '../contexts/ProductContext';
import { ProductStatus, productStatusMap } from '../models/Product';

type RootStackParamList = {
  ProductForm: { productId?: string };
  // Add other screen params as needed
};

type ProductFormRouteProp = RouteProp<RootStackParamList, 'ProductForm'>;
type ProductFormNavigationProp = NavigationProp<RootStackParamList, 'ProductForm'>;

const ProductFormScreen = () => {
  const navigation = useNavigation<ProductFormNavigationProp>();
  const route = useRoute<ProductFormRouteProp>();
  const { addProduct, updateProduct, getProductById } = useProducts();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    status: 'not_selling' as ProductStatus,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    if (route.params?.productId) {
      const product = getProductById(route.params.productId);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price.toString(),
          description: product.description || '',
          status: product.status,
        });
        setProductId(product.id);
        setIsEditMode(true);
        
        // Set header title for edit mode
        navigation.setOptions({ title: 'Chỉnh sửa sản phẩm' });
      }
    }
  }, [route.params]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tên sản phẩm không được để trống';
    }
    
    if (!formData.price) {
      newErrors.price = 'Giá tiền không được để trống';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Giá tiền phải là số lớn hơn 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const productData = {
      name: formData.name.trim(),
      price: Number(formData.price),
      description: formData.description.trim(),
      status: formData.status,
    };

    try {
      if (isEditMode && productId) {
        await updateProduct(productId, productData);
        Alert.alert('Thành công', 'Cập nhật sản phẩm thành công!');
      } else {
        await addProduct(productData);
        Alert.alert('Thành công', 'Thêm sản phẩm mới thành công!');
      }
      
      // Navigate back after a short delay to show the success message
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      console.error('Error saving product:', error);
    }
  };

  const handleInputChange = <K extends keyof typeof formData>(
    field: K,
    value: typeof formData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tên sản phẩm <Text style={styles.required}>*</Text></Text>
          <View style={[styles.inputContainer, errors.name && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên sản phẩm"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Giá tiền (VND) <Text style={styles.required}>*</Text></Text>
          <View style={[styles.inputContainer, errors.price && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Nhập giá tiền"
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(text) => handleInputChange('price', text.replace(/[^0-9]/g, ''))}
            />
          </View>
          {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Mô tả</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Nhập mô tả sản phẩm"
              multiline
              numberOfLines={4}
              value={formData.description}
              onChangeText={(text) => handleInputChange('description', text)}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Trạng thái <Text style={styles.required}>*</Text></Text>
          <View style={[styles.inputContainer, styles.pickerContainer]}>
            <Picker
              selectedValue={formData.status}
              onValueChange={(value) => handleInputChange('status', value)}
              style={styles.picker}
            >
              {Object.entries(productStatusMap).map(([value, label]) => (
                <Picker.Item key={value} label={label} value={value} />
              ))}
            </Picker>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Hủy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            {isEditMode ? 'Cập nhật' : 'Thêm mới'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100, // Extra space for the footer
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: '#FF3B30',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  input: {
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  textAreaContainer: {
    height: 120,
    paddingTop: 12,
  },
  textArea: {
    height: '100%',
    textAlignVertical: 'top',
  },
  pickerContainer: {
    padding: 0,
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    marginTop: -8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProductFormScreen;
