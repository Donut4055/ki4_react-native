import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Switch, 
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  useColorScheme
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type Settings = {
  username: string;
  email: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
};

export default function Bt6Screen() {
  const [settings, setSettings] = useState<Settings>({
    username: 'Khách',
    email: '',
    notificationsEnabled: true,
    theme: 'system'
  });
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('userSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        if (!['light', 'dark', 'system'].includes(parsedSettings.theme)) {
          parsedSettings.theme = 'system'; 
        }
        setSettings(parsedSettings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      Alert.alert('Lỗi', 'Không thể tải cài đặt');
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: Settings) => {
    try {
      await AsyncStorage.setItem('userSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Lỗi', 'Không thể lưu cài đặt');
    }
  };

  const handleInputChange = <K extends keyof Settings>(field: K, value: Settings[K]) => {
    const updatedSettings = { ...settings, [field]: value };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  const resetToDefault = () => {
    const defaultSettings: Settings = {
      username: 'Khách',
      email: '',
      notificationsEnabled: true,
      theme: 'system'
    };
    setSettings(defaultSettings);
    saveSettings(defaultSettings);
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={[styles.section, isDarkMode && styles.darkSection]}>
      <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>{title}</Text>
      {children}
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, isDarkMode && styles.darkContainer]}>
        <Ionicons name="settings" size={48} color={isDarkMode ? '#666' : '#ccc'} />
        <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>Đang tải cài đặt...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={[styles.container, isDarkMode && styles.darkContainer]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderSection(
          'Thông tin cá nhân',
          <>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, isDarkMode && styles.darkText]}>Tên hiển thị</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                value={settings.username}
                onChangeText={(text) => handleInputChange('username', text)}
                placeholder="Nhập tên của bạn"
                placeholderTextColor={isDarkMode ? '#666' : '#999'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, isDarkMode && styles.darkText]}>Email</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                value={settings.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="email@example.com"
                placeholderTextColor={isDarkMode ? '#666' : '#999'}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </>
        )}

        {renderSection(
          'Tùy chọn',
          <>
            <View style={[styles.settingItem, isDarkMode && styles.darkSettingItem]}>
              <View>
                <Text style={[styles.settingTitle, isDarkMode && styles.darkText]}>
                  Thông báo
                </Text>
                <Text style={[styles.settingDescription, isDarkMode && styles.darkText]}>
                  Cho phép gửi thông báo đến thiết bị của bạn
                </Text>
              </View>
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={(value) => handleInputChange('notificationsEnabled', value)}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={settings.notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>

            <View style={[styles.settingItem, isDarkMode && styles.darkSettingItem]}>
              <View>
                <Text style={[styles.settingTitle, isDarkMode && styles.darkText]}>
                  Giao diện
                </Text>
                <Text style={[styles.settingDescription, isDarkMode && styles.darkText]}>
                  {settings.theme === 'system' 
                    ? 'Theo hệ thống' 
                    : settings.theme === 'dark' 
                      ? 'Tối' 
                      : 'Sáng'}
                </Text>
              </View>
              <View style={[styles.themeButtons, isDarkMode && styles.darkThemeButtons]}>
                <TouchableOpacity
                  style={[
                    styles.themeButton,
                    settings.theme === 'light' && styles.themeButtonActive,
                    isDarkMode && settings.theme !== 'light' && styles.darkThemeButton
                  ]}
                  onPress={() => handleInputChange('theme', 'light')}
                >
                  <Ionicons 
                    name="sunny" 
                    size={20} 
                    color={settings.theme === 'light' ? '#fff' : (isDarkMode ? '#fff' : '#000')} 
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.themeButton,
                    settings.theme === 'dark' && styles.themeButtonActive,
                    isDarkMode && settings.theme !== 'dark' && styles.darkThemeButton
                  ]}
                  onPress={() => handleInputChange('theme', 'dark')}
                >
                  <Ionicons 
                    name="moon" 
                    size={20} 
                    color={settings.theme === 'dark' ? '#fff' : (isDarkMode ? '#fff' : '#000')} 
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.themeButton,
                    settings.theme === 'system' && styles.themeButtonActive,
                    isDarkMode && settings.theme !== 'system' && styles.darkThemeButton
                  ]}
                  onPress={() => handleInputChange('theme', 'system')}
                >
                  <Ionicons 
                    name="phone-portrait" 
                    size={20} 
                    color={settings.theme === 'system' ? '#fff' : (isDarkMode ? '#fff' : '#000')} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        <TouchableOpacity 
          style={[styles.resetButton, isDarkMode && styles.darkResetButton]}
          onPress={() => {
            Alert.alert(
              'Đặt lại cài đặt',
              'Bạn có chắc chắn muốn đặt lại tất cả cài đặt về mặc định?',
              [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Đặt lại', style: 'destructive', onPress: resetToDefault }
              ]
            );
          }}
        >
          <Ionicons name="refresh" size={16} color="#FF3B30" style={styles.resetIcon} />
          <Text style={styles.resetButtonText}>Đặt lại về mặc định</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkSection: {
    backgroundColor: '#1e1e1e',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  darkInput: {
    backgroundColor: '#2c2c2e',
    borderColor: '#444',
    color: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  darkSettingItem: {
    borderBottomColor: '#333',
  },
  settingTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#888',
  },
  themeButtons: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 2,
  },
  darkThemeButtons: {
    backgroundColor: '#2c2c2e',
  },
  themeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  themeButtonActive: {
    backgroundColor: '#007AFF',
  },
  darkThemeButton: {
    backgroundColor: '#2c2c2e',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkResetButton: {
    backgroundColor: '#1e1e1e',
  },
  resetIcon: {
    marginRight: 8,
  },
  resetButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
  },
  darkText: {
    color: '#fff',
  },
});
