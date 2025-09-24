import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, COMMON_STYLES, createStyles, useTheme } from '../../styles/GlobalStyles';

const LoginScreen = () => {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    console.log('Login attempt with:', { username, password });
  };
  
  const styles = StyleSheet.create({
    container: {
      ...COMMON_STYLES.container,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: SPACING.lg,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: SPACING.xl,
    },
    logo: {
      width: 300,
      height: 110,
    },
    formContainer: {
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
    },
    inputContainer: {
      marginBottom: SPACING.lg,
      width: '100%',
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      padding: SPACING.md,
      marginBottom: SPACING.sm,
      fontSize: FONT_SIZES.md,
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      padding: SPACING.md,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: SPACING.md,
    },
    loginButtonText: {
      color: theme.colors.text,
      fontSize: FONT_SIZES.md,
      fontWeight: '600',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    passwordInput: {
      flex: 1,
    },
    toggleButton: {
      position: 'absolute',
      right: SPACING.sm,
      padding: SPACING.xs,
    },
    toggleText: {
      color: theme.colors.primary,
      fontSize: FONT_SIZES.sm,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://rikkei.edu.vn/wp-content/uploads/2024/12/logo-rikkei2.png' }} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tên đăng nhập"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default LoginScreen;
