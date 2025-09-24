import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  View
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

const LOGO_IMAGE = require('@/assets/images/logo.png');

export default function Bt5Screen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    console.log('Login attempt with:', { email, password });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={LOGO_IMAGE} 
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText style={styles.title}>Chào mừng trở lại</ThemedText>
          <ThemedText style={styles.subtitle}>Đăng nhập để tiếp tục</ThemedText>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Nhập email của bạn"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={[styles.inputContainer, { marginTop: 16 }]}>
            <ThemedText style={styles.label}>Mật khẩu</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <ThemedText style={styles.loginButtonText}>
              {isLoading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordButton}>
            <ThemedText style={styles.forgotPasswordText}>Quên mật khẩu?</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>Chưa có tài khoản? </ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.signUpText}>Đăng ký ngay</ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loginButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#6200ee',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  footerText: {
    color: '#666',
  },
  signUpText: {
    color: '#6200ee',
    fontWeight: '500',
  },
});
