import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="bt1"
        options={{
          title: 'Bài tập 1',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bt2"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ color }) => (
            <Ionicons name="moon-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bt3"
        options={{
          title: 'Đếm',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calculator-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bt4"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-remove-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bt5"
        options={{
          title: 'Công việc',
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bt6"
        options={{
          title: 'Cài đặt nâng cao',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bt7"
        options={{
          title: 'Mua sắm',
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bt8"
        options={{
          title: 'Migrating',
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
