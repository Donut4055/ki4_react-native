import React from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTheme, useThemeToggle, createStyles } from '../../styles/GlobalStyles';

const SettingsScreen = () => {
  const theme = useTheme();
  const toggleTheme = useThemeToggle();
  const globalStyles = createStyles(theme);
  const styles = { ...globalStyles, ...localStyles(theme) };
  
  const settingsSections = [
    {
      title: 'Tài khoản',
      items: [
        { id: 'profile', label: 'Thông tin cá nhân' },
        { id: 'security', label: 'Bảo mật' },
        { id: 'privacy', label: 'Riêng tư' },
      ],
    },
    {
      title: 'Thông báo',
      items: [
        { id: 'push', label: 'Thông báo đẩy' },
        { id: 'email', label: 'Email' },
        { id: 'sounds', label: 'Âm thanh' },
      ],
    },
    {
      title: 'Giao diện',
      items: [
        { 
          id: 'darkMode', 
          label: 'Chế độ tối',
          isSwitch: true,
          value: theme.isDark,
          onValueChange: toggleTheme,
        },
        { id: 'fontSize', label: 'Cỡ chữ' },
        { id: 'theme', label: 'Chủ đề' },
      ],
    },
  ];

  return (
    <View style={[styles.container, { flex: 1, backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
        {settingsSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>
                {section.title}
              </Text>
            </View>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View 
                  key={item.id}
                  style={[
                    styles.settingRow,
                    itemIndex === section.items.length - 1 && styles.lastItem,
                  ]}
                >
                  <Text style={styles.settingText}>{item.label}</Text>
                  {item.isSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: '#767577', true: theme.colors.primary }}
                      thumbColor={Platform.OS === 'android' ? theme.colors.primary : ''}
                    />
                  ) : (
                    <Text style={styles.arrow}>›</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Styles specific to this component
const localStyles = (theme: any) => StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  arrow: {
    fontSize: 24,
    color: theme.colors.textSecondary,
    marginLeft: 8,
  },
});

export default SettingsScreen;
