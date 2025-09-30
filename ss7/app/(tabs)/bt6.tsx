import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      <Text style={[styles.headerText, { color: 'white' }]}>
        Ứng dụng Chủ đề
      </Text>
    </View>
  );
};

const Card = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>Thẻ thông tin</Text>
      <Text style={{ color: colors.text }}>
        Đây là một thẻ có thể thay đổi giao diện dựa trên theme hiện tại.
      </Text>
    </View>
  );
};

const SettingsSection = () => {
  const { colors, theme, toggleTheme } = useTheme();
  
  return (
    <View style={[styles.settings, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.settingsTitle, { color: colors.text }]}>Cài đặt</Text>
      <View style={styles.settingItem}>
        <Text style={{ color: colors.text }}>Chế độ tối</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
    </View>
  );
};

const Footer = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.footer, { borderTopColor: colors.border }]}>
      <Text style={[styles.footerText, { color: colors.text }]}>
        Ứng dụng mẫu - Theme Switcher
      </Text>
    </View>
  );
};

function ThemeSwitcherScreen() {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      <Header />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Chào mừng đến với ứng dụng
          </Text>
          <Text style={{ color: colors.text, marginBottom: 20 }}>
            Ứng dụng này minh họa cách sử dụng React Context để chuyển đổi giao diện sáng/tối.
          </Text>
          
          <Card />
          
          <View style={[styles.infoBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.infoTitle, { color: colors.primary }]}>
              Thông tin thêm
            </Text>
            <Text style={{ color: colors.text }}>
              Tất cả các thành phần trong ứng dụng này đều tự động cập nhật màu sắc dựa trên theme hiện tại.
            </Text>
          </View>
          
          <SettingsSection />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

export default function Bt6Screen() {
  return (
    <ThemeProvider>
      <ThemeSwitcherScreen />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoBox: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settings: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
