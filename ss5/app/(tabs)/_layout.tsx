import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="bt1"
        options={{
          title: 'Bài 1',
          tabBarIcon: ({ color }) => <Ionicons name="card" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt2"
        options={{
          title: 'Bài 2',
          tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt3"
        options={{
          title: 'Bài 3',
          tabBarIcon: ({ color }) => <Ionicons name="add" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt4"
        options={{
          title: 'Bài 4',
          tabBarIcon: ({ color }) => <Ionicons name="thumbs-up" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt5"
        options={{
          title: 'Bài 5',
          tabBarIcon: ({ color }) => <Ionicons name="log-in" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt6"
        options={{
          title: 'Bài 6 + 7',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt8"
        options={{
          title: 'Bài 8',
          tabBarIcon: ({ color }) => <Ionicons name="calculator" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt9"
        options={{
          title: 'Bài 9',
          tabBarIcon: ({ color }) => <Ionicons name="trail-sign" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt10"
        options={{
          title: 'Bài 10',
          tabBarIcon: ({ color }) => <Ionicons name="color-palette" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
