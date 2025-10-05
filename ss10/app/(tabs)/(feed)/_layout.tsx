import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function FeedLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Stack
      screenOptions={{
        headerTintColor: Colors[colorScheme ?? 'light'].tint,
        headerBackTitle: 'Quay lại',
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Bảng tin',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Chi tiết bài viết',
        }}
      />
    </Stack>
  );
}
