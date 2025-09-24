import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
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
          title: 'Bài 1',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="1.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt2"
        options={{
          title: 'Bài 2',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt3"
        options={{
          title: 'Bài 3',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt4"
        options={{
          title: 'Bài 4',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt6"
        options={{
          title: 'Bài 6',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.stack.3d.up.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt7"
        options={{
          title: 'Bài 7',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.grid.2x2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt9"
        options={{
          title: 'Bài 9',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.grid.2x2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bt10"
        options={{
          title: 'Bài 10',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
