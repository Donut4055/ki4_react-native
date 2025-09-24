import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import { ThemedText } from '@/components/themed-text';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text === '') {
      setEmailError('');
    } else if (!validateEmail(text)) {
      setEmailError('Email không hợp lệ');
    } else {
      setEmailError('');
    }
    validateForm(text, password);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validateForm(email, text);
  };

  const validateForm = (email: string, password: string) => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 6;
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      Alert.alert('Thành công', 'Đăng ký thành công!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText style={styles.title}>Đăng ký tài khoản</ThemedText>
        
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <TextInput
            style={[
              styles.input, 
              emailError ? styles.inputError : {},
              email && !emailError && styles.inputSuccess
            ]}
            placeholder="Nhập email của bạn"
            placeholderTextColor="#999"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Mật khẩu</ThemedText>
          <TextInput
            style={[
              styles.input,
              password.length > 0 && styles.inputSuccess
            ]}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
          />
          <ThemedText style={styles.hintText}>
            Mật khẩu phải có ít nhất 6 ký tự
          </ThemedText>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            !isFormValid && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <ThemedText style={styles.buttonText}>Đăng ký</ThemedText>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <ThemedText style={styles.infoTitle}>Trạng thái form:</ThemedText>
          <ThemedText style={styles.infoText}>
            {!email && !password ? 'Chưa nhập dữ liệu' : 
             !isFormValid ? 'Dữ liệu không hợp lệ' : 'Dữ liệu hợp lệ'}
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff6f6',
  },
  inputSuccess: {
    borderColor: '#4CAF50',
    backgroundColor: '#f6fff6',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 5,
  },
  hintText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  infoText: {
    color: '#666',
    lineHeight: 22,
  },
});

export default RegisterForm;
