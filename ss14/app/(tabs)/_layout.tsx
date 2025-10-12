import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function TabLayout() {
  const router = useRouter();

  // Set the default tab to 'todo'
  useEffect(() => {
    // This ensures the todo tab is selected by default
    const timer = setTimeout(() => {
      router.setParams({ screen: 'todo' });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          paddingBottom: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
      initialRouteName="todo"
    >
      <Tabs.Screen
        name="todo"
        options={{
          title: 'Công việc',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
