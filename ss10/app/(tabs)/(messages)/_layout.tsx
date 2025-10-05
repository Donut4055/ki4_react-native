import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function MessagesLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Stack
      screenOptions={{
        headerTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Tin nhắn',
        }}
      />
    </Stack>
  );
}
